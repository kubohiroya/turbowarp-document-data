import {readFile} from 'node:fs/promises';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {fromValue, parseValue, PARSE_LIMITS} from '@kubohiroya/turbowarp-yaml-json/codec';
import {
  createDocumentTreeRegistry, DocumentTreeError, documentTreeErrorCodes, documentTreeRegistrySymbol,
  getDocumentTreeRegistry, type DocumentTreeProvider
} from '../src/composition.js';
import {copyDocumentNode, DocumentTreeCaptureProvider} from '../src/document-tree-provider.js';
import {parseHtmlDocument, parseMarkdownDocument, replaceDocumentText, type DocumentTree} from '../src/document.js';
import {DocumentDataExtension} from '../src/extension.js';

const LIMITS = {maxDepth: PARSE_LIMITS.maxDepth, maxNodes: PARSE_LIMITS.maxNodes};
const UNLIMITED = {maxDepth: Number.MAX_SAFE_INTEGER, maxNodes: Number.MAX_SAFE_INTEGER};
const capture = {kind: 'html' as const, revision: '1', root: {type: 'root', children: []}};
const providerOf = (trees: Record<string, DocumentTree>, target: object) =>
  new DocumentTreeCaptureProvider({get: (actual, name) => actual === target && trees[name] ? {tree: trees[name], revision: 3} : undefined});
/** Count values the way the shared codec counts a parsed JSON value. */
const measure = (value: unknown, depth = 0): {nodes: number; depth: number} => {
  let nodes = 1;
  let deepest = depth;
  if (typeof value === 'object' && value !== null) {
    for (const child of Object.values(value)) {
      const inner = measure(child, depth + 1);
      nodes += inner.nodes;
      deepest = Math.max(deepest, inner.depth);
    }
  }
  return {nodes, depth: deepest};
};

describe('shared document tree registry', () => {
  it('uses a fixed Symbol.for slot per scope and stays parser-free', async () => {
    expect(documentTreeRegistrySymbol).toBe(Symbol.for('@kubohiroya/turbowarp-document-data/document-tree-registry/v1'));
    const scope = {};
    const registry = getDocumentTreeRegistry(scope);
    expect(getDocumentTreeRegistry(scope)).toBe(registry);
    expect(getDocumentTreeRegistry({})).not.toBe(registry);
    expect(Object.keys(scope)).toEqual([]);
    expect(Object.getOwnPropertyDescriptor(scope, documentTreeRegistrySymbol)?.value).toBe(registry);
    expect(Object.keys(registry).sort()).toEqual(['apiVersion', 'capture', 'register']);
    expect(Object.isFrozen(registry)).toBe(true);
    const source = await readFile(new URL('../src/document-tree/registry.js', import.meta.url), 'utf8');
    expect(source).not.toMatch(/\bimport\b/);
  });

  it('rejects invalid scopes and incompatible occupants', () => {
    expect(() => getDocumentTreeRegistry(null as unknown as object)).toThrow(expect.objectContaining({code: 'REGISTRY_SCOPE_INVALID'}));
    const accessor = {};
    Object.defineProperty(accessor, documentTreeRegistrySymbol, {get: () => createDocumentTreeRegistry()});
    expect(() => getDocumentTreeRegistry(accessor)).toThrow(expect.objectContaining({code: 'REGISTRY_SCOPE_INVALID'}));
    const occupied = {[documentTreeRegistrySymbol]: {apiVersion: 2}};
    expect(() => getDocumentTreeRegistry(occupied)).toThrow(expect.objectContaining({code: 'REGISTRY_INCOMPATIBLE'}));
  });

  it('reports a stable code when no provider is registered', () => {
    const registry = createDocumentTreeRegistry();
    expect(() => registry.capture({}, 'page', {location: '$', limits: LIMITS})).toThrow(DocumentTreeError);
    expect(() => registry.capture({}, 'page', {location: '$', limits: LIMITS})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_UNAVAILABLE'}));
    expect(documentTreeErrorCodes).toContain('DOCUMENT_TREE_UNAVAILABLE');
  });

  it('forwards normalized options to the newest registration and unregisters idempotently', () => {
    const registry = createDocumentTreeRegistry();
    const older = {capture: vi.fn(() => ({...capture, revision: 'older'}))};
    const newer = {capture: vi.fn(() => ({...capture, revision: 'newer'}))};
    const unregisterOlder = registry.register(older);
    const unregisterNewer = registry.register(newer);
    const target = {};
    expect(registry.capture(target, 'page', {location: '$[0]', limits: {maxDepth: 3, maxNodes: 9, extra: true} as never}).revision).toBe('newer');
    expect(newer.capture).toHaveBeenCalledWith(target, 'page', {location: '$[0]', positions: false, limits: {maxDepth: 3, maxNodes: 9}});
    const options = newer.capture.mock.calls[0] as unknown as [object, string, object];
    expect(Object.isFrozen(options[2])).toBe(true);
    unregisterNewer();
    unregisterNewer();
    expect(registry.capture(target, 'page', {location: '$', positions: true, limits: LIMITS}).revision).toBe('older');
    expect(older.capture).toHaveBeenLastCalledWith(target, 'page', {location: '$', positions: true, limits: LIMITS});
    unregisterOlder();
    expect(() => registry.capture(target, 'page', {location: '$', limits: LIMITS})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_UNAVAILABLE'}));
  });

  it('validates providers, options and provider results', () => {
    const registry = createDocumentTreeRegistry();
    expect(() => registry.register({} as DocumentTreeProvider)).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_PROVIDER_INVALID'}));
    const provider = {capture: vi.fn((): unknown => capture)};
    registry.register(provider as unknown as DocumentTreeProvider);
    const call = (options: unknown) => () => registry.capture({}, 'page', options as never);
    expect(call(undefined)).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_OPTIONS_INVALID'}));
    expect(call({location: 1, limits: LIMITS})).toThrow(expect.objectContaining({code: 'INVALID_LOCATION'}));
    expect(call({location: '$', positions: 'yes', limits: LIMITS})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_OPTIONS_INVALID'}));
    expect(call({location: '$'})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_OPTIONS_INVALID'}));
    expect(call({location: '$', limits: {maxDepth: -1, maxNodes: 1}})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_OPTIONS_INVALID'}));
    expect(call({location: '$', limits: {maxDepth: 1, maxNodes: 1.5}})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_OPTIONS_INVALID'}));
    expect(provider.capture).not.toHaveBeenCalled();
    provider.capture.mockReturnValueOnce({kind: 'json', revision: '1', root: {}});
    expect(call({location: '$', limits: LIMITS})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_PROVIDER_INVALID'}));
    provider.capture.mockReturnValueOnce({kind: 'html', revision: 1, root: {}});
    expect(call({location: '$', limits: LIMITS})).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_PROVIDER_INVALID'}));
  });
});

describe('document tree capture', () => {
  const target = {};
  const html = parseHtmlDocument('<main id="x"><p class="c">Hi <b>there</b></p><!--note--></main>');
  const markdown = parseMarkdownDocument('# Title\n\n- one\n- two\n');
  const registry = createDocumentTreeRegistry();
  registry.register(providerOf({html, markdown}, target));

  it('copies the whole tree without positions by default', () => {
    expect(registry.capture(target, 'html', {location: '$', limits: LIMITS})).toEqual({
      kind: 'html',
      revision: '3',
      root: {type: 'root', children: [{type: 'element', tagName: 'main', attributes: {id: 'x'}, children: [
        {type: 'element', tagName: 'p', attributes: {class: 'c'}, children: [
          {type: 'text', value: 'Hi '},
          {type: 'element', tagName: 'b', attributes: {}, children: [{type: 'text', value: 'there'}]}
        ]},
        {type: 'comment', value: 'note'}
      ]}]}
    });
  });

  it('keeps positions only when asked', () => {
    const located = registry.capture(target, 'markdown', {location: '$[1][0]', positions: true, limits: LIMITS}).root;
    expect(located).toMatchObject({type: 'listItem', position: {start: {line: 3, column: 1, offset: 9}}});
    expect(located.children).toEqual([expect.objectContaining({type: 'paragraph', position: expect.any(Object)})]);
    const plain = registry.capture(target, 'markdown', {location: '$[1][0]', positions: false, limits: LIMITS}).root;
    expect(JSON.stringify(plain)).not.toContain('position');
    expect(plain).toEqual({type: 'listItem', spread: false, checked: null, children: [{type: 'paragraph', children: [{type: 'text', value: 'one'}]}]});
  });

  it('resolves subtree paths and simple HTML selectors like the blocks', () => {
    const at = (location: string) => registry.capture(target, 'html', {location: ` ${location} `, limits: LIMITS}).root;
    expect(at('$[0][0][1]')).toEqual({type: 'element', tagName: 'b', attributes: {}, children: [{type: 'text', value: 'there'}]});
    expect(at('$[0][1]')).toEqual({type: 'comment', value: 'note'});
    expect(at('#x')).toMatchObject({tagName: 'main'});
    expect(at('.c')).toMatchObject({tagName: 'p'});
    expect(at('b')).toMatchObject({tagName: 'b'});
  });

  it('throws stable codes for missing documents, invalid locations and missing nodes', () => {
    const fails = (name: string, location: string, code: string, actualTarget: object = target) =>
      expect(() => registry.capture(actualTarget, name, {location, limits: LIMITS})).toThrow(expect.objectContaining({code, name: 'DocumentTreeError'}));
    fails('missing', '$', 'DOCUMENT_NOT_FOUND');
    fails('html', '$', 'DOCUMENT_NOT_FOUND', {});
    fails('  ', '$', 'DOCUMENT_NOT_FOUND');
    fails('html', '$.children', 'INVALID_LOCATION');
    fails('markdown', '#x', 'INVALID_LOCATION');
    fails('html', '$[9]', 'LOCATION_NOT_FOUND');
    fails('html', '#missing', 'LOCATION_NOT_FOUND');
    expect(() => registry.capture(target, 'html', {location: '$', limits: {maxDepth: 64, maxNodes: 3}})).toThrow(expect.objectContaining({code: 'DOCUMENT_LIMIT_EXCEEDED'}));
  });

  it('returns a deep copy that callers own', () => {
    const first = registry.capture(target, 'html', {location: '$', positions: true, limits: LIMITS}).root;
    (first.children as Array<Record<string, unknown>>)[0]!.tagName = 'changed';
    (first.position as {start: {line: number}}).start.line = 99;
    const second = registry.capture(target, 'html', {location: '$', positions: true, limits: LIMITS}).root;
    expect(second).toMatchObject({children: [{tagName: 'main'}], position: {start: {line: 1}}});
    expect(html.root.children[0]).toMatchObject({tagName: 'main'});
  });

  it('copies an edited tree with positions requested as a tree without positions', () => {
    const edited = replaceDocumentText(html, '.c', 'Bye');
    const local = createDocumentTreeRegistry();
    local.register(providerOf({edited}, target));
    const root = local.capture(target, 'edited', {location: '$', positions: true, limits: LIMITS}).root;
    expect(JSON.stringify(root)).not.toContain('position');
  });

  it('keeps an attribute named __proto__ as ordinary JSON data', () => {
    const tree = parseHtmlDocument('<p __proto__="x" position="y">a</p>');
    const root = copyDocumentNode(tree.root, {positions: false, limits: LIMITS}) as {children: Array<{attributes: object}>};
    const attributes = root.children[0]!.attributes;
    expect(Object.getPrototypeOf(attributes)).toBe(Object.prototype);
    expect(Object.hasOwn(attributes, '__proto__')).toBe(true);
    expect(JSON.stringify(attributes)).toBe('{"__proto__":"x","position":"y"}');
  });
});

describe('capture limits', () => {
  it('counts every value with the captured node at depth 0', () => {
    const tree = parseMarkdownDocument('# A *b*\n\n> c\n\n1. d\n');
    for (const positions of [false, true]) {
      const copy = copyDocumentNode(tree.root, {positions, limits: UNLIMITED});
      const {nodes, depth} = measure(copy);
      expect(copyDocumentNode(tree.root, {positions, limits: {maxDepth: depth, maxNodes: nodes}})).toEqual(copy);
      expect(() => copyDocumentNode(tree.root, {positions, limits: {maxDepth: depth - 1, maxNodes: nodes}})).toThrow(expect.objectContaining({code: 'DOCUMENT_LIMIT_EXCEEDED'}));
      expect(() => copyDocumentNode(tree.root, {positions, limits: {maxDepth: depth, maxNodes: nodes - 1}})).toThrow(expect.objectContaining({code: 'DOCUMENT_LIMIT_EXCEEDED'}));
    }
    // A node is an object plus its children array, so each tree level adds two to the depth.
    expect(measure(copyDocumentNode(parseHtmlDocument('<p>a</p>').root, {positions: false, limits: UNLIMITED}))).toEqual({nodes: 11, depth: 5});
  });

  it('passes exactly when the shared codec accepts the parsed JSON text within its depth and node limits', () => {
    // fromValue applies the codec's depth/node budget without the 256 KiB text limit a copy avoids.
    const codecAccepts = (json: string) => {
      try {fromValue(JSON.parse(json)); return true;} catch {return false;}
    };
    const deep = parseMarkdownDocument(`${'> '.repeat(29)}x\n`);
    const wide = parseHtmlDocument('<b></b>'.repeat(5_500));
    for (const [tree, positions, expected] of [
      [deep, false, true], [deep, true, false], [wide, false, true], [wide, true, false]
    ] as const) {
      const json = JSON.stringify(copyDocumentNode(tree.root, {positions, limits: UNLIMITED}));
      expect(codecAccepts(json)).toBe(expected);
      if (tree === deep) expect(parseValue(json, 'json').diagnostic?.code).toBe(expected ? undefined : 'MAX_DEPTH_EXCEEDED');
      const captured = () => copyDocumentNode(tree.root, {positions, limits: LIMITS});
      if (expected) expect(JSON.stringify(captured())).toBe(json);
      else expect(captured).toThrow(expect.objectContaining({code: 'DOCUMENT_LIMIT_EXCEEDED'}));
    }
  });

  it('stops copying at the first value over a limit', () => {
    let reads = 0;
    const children = Array.from({length: 1_000}, () => Object.defineProperty({type: 'text'}, 'value', {
      enumerable: true,
      get: () => {reads++; return 'x';}
    }));
    expect(() => copyDocumentNode({type: 'root', children}, {positions: false, limits: {maxDepth: 64, maxNodes: 10}})).toThrow(expect.objectContaining({code: 'DOCUMENT_LIMIT_EXCEEDED'}));
    expect(reads).toBeLessThanOrEqual(3);
  });
});

describe('extension registration', () => {
  let listeners: Array<{event: string; listener: () => void}>;
  beforeEach(() => {
    listeners = [];
    vi.stubGlobal('Scratch', {
      BlockType: {COMMAND: 'command', REPORTER: 'reporter', BOOLEAN: 'boolean'},
      ArgumentType: {STRING: 'string'},
      Cast: {toString: (value: unknown) => String(value)},
      translate: (message: string | {default: string}) => typeof message === 'string' ? message : message.default,
      vm: {runtime: {on: (event: string, listener: () => void) => listeners.push({event, listener})}}
    });
  });
  afterEach(() => vi.unstubAllGlobals());
  const emit = (event: string) => listeners.filter(entry => entry.event === event).forEach(entry => entry.listener());
  const options = {location: '$', limits: LIMITS};

  it('does not register while DOCUMENT_DATA_MVP is off', async () => {
    const extension = new DocumentDataExtension(false);
    expect(() => getDocumentTreeRegistry(Scratch.vm!).capture({}, 'page', options)).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_UNAVAILABLE'}));
    await extension.dispose();
  });

  it('serves named documents per target, keeps the registration across project stop and unregisters on dispose', async () => {
    const extension = new DocumentDataExtension(true);
    const registry = getDocumentTreeRegistry(Scratch.vm!);
    const target = {};
    extension.parseMarkdown({TEXT: '# One', NAME: 'page'}, {target});
    expect(registry.capture(target, 'page', options)).toEqual({kind: 'markdown', revision: '1', root: {type: 'root', children: [{type: 'heading', depth: 1, children: [{type: 'text', value: 'One'}]}]}});
    expect(() => registry.capture({}, 'page', options)).toThrow(expect.objectContaining({code: 'DOCUMENT_NOT_FOUND'}));
    extension.replaceDocumentText({NAME: 'page', LOCATION: '$[0]', TEXT: 'Two'}, {target});
    expect(registry.capture(target, 'page', {...options, positions: true})).toMatchObject({revision: '2', root: {children: [{children: [{value: 'Two'}]}]}});
    expect(JSON.stringify(registry.capture(target, 'page', {...options, positions: true}))).not.toContain('position');

    emit('PROJECT_STOP_ALL');
    expect(() => registry.capture(target, 'page', options)).toThrow(expect.objectContaining({code: 'DOCUMENT_NOT_FOUND'}));
    extension.parseHtml({TEXT: '<p>Three</p>', NAME: 'page'}, {target});
    emit('RUNTIME_DISPOSED');
    emit('PROJECT_LOADED');
    expect(() => registry.capture(target, 'page', options)).toThrow(expect.objectContaining({code: 'DOCUMENT_NOT_FOUND'}));
    extension.parseHtml({TEXT: '<p>Four</p>', NAME: 'page'}, {target});
    expect(registry.capture(target, 'page', options)).toMatchObject({kind: 'html', revision: '4'});

    await extension.dispose();
    expect(() => registry.capture(target, 'page', options)).toThrow(expect.objectContaining({code: 'DOCUMENT_TREE_UNAVAILABLE'}));
  });
});

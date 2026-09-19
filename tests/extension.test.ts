import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {DocumentDataExtension} from '../src/extension.js';

let stopListener: (() => void) | undefined;
let stopListeners: Array<{event: string; listener: () => void}>;
beforeEach(() => {
  stopListener = undefined;
  stopListeners = [];
  vi.stubGlobal('Scratch', {
    BlockType: {COMMAND: 'command', REPORTER: 'reporter', BOOLEAN: 'boolean'},
    ArgumentType: {STRING: 'string'},
    Cast: {toString: (value: unknown) => String(value)},
    translate: (message: string | {default: string}) => typeof message === 'string' ? message : message.default,
    vm: {runtime: {on: (event: string, listener: () => void) => {
      stopListener = listener;
      stopListeners.push({event, listener});
    }}}
  });
});
afterEach(() => vi.unstubAllGlobals());
const util = (target: object) => ({target});

describe('DocumentDataExtension', () => {
  it('keeps blocks disabled by default', () => {
    expect((new DocumentDataExtension().getInfo() as {blocks: unknown[]}).blocks).toEqual([]);
  });

  it('stores same names independently per target and edits a typed tree', () => {
    const extension = new DocumentDataExtension(true);
    const first = {};
    const second = {};
    extension.parseHtml({TEXT: '<p id="x">one</p>', NAME: 'page'}, util(first));
    extension.parseMarkdown({TEXT: '# Two', NAME: 'page'}, util(second));
    expect(extension.documentKind({NAME: 'page'}, util(first))).toBe('html');
    expect(extension.documentKind({NAME: 'page'}, util(second))).toBe('markdown');
    expect(extension.getDocumentText({NAME: 'page', LOCATION: '#x'}, util(first))).toBe('one');
    extension.replaceDocumentText({NAME: 'page', LOCATION: '#x', TEXT: 'updated'}, util(first));
    expect(extension.serializeDocument({NAME: 'page', FORMAT: 'html'}, util(first))).toBe('<p id="x">updated</p>');
  });

  it('does not replace an existing binding when parsing exceeds a limit', () => {
    const extension = new DocumentDataExtension(true);
    const target = {};
    extension.parseHtml({TEXT: '<p>safe</p>', NAME: 'page'}, util(target));
    expect(() => extension.parseHtml({TEXT: 'x'.repeat(300_000), NAME: 'page'}, util(target))).toThrow('DOCUMENT_LIMIT_EXCEEDED');
    expect(extension.serializeDocument({NAME: 'page', FORMAT: 'html'}, util(target))).toBe('<p>safe</p>');
  });

  it('rejects implicit lossy conversion and clears bindings on project stop', () => {
    const extension = new DocumentDataExtension(true);
    const target = {};
    extension.parseMarkdown({TEXT: '# Title', NAME: 'page'}, util(target));
    expect(() => extension.serializeDocument({NAME: 'page', FORMAT: 'html'}, util(target))).toThrow('LOSSY_CONVERSION');
    stopListener?.();
    expect(extension.hasDocument({NAME: 'page'}, util(target))).toBe(false);
  });

  it('registers a persistent provider in the real shared runtime registry', async () => {
    const extension = new DocumentDataExtension(true);
    const registry = extension.getNamedDataRegistry();
    const target = {};
    const reference = {
      namespace: 'document',
      name: 'page',
      kind: 'document',
      scope: 'target'
    } as const;
    extension.parseHtml({TEXT: '<main>Hello</main>', NAME: 'page'}, util(target));
    expect(registry?.canResolve(reference, 'html')).toBe(true);
    const body = await registry?.openBody(reference, 'html', {target});
    expect(new TextDecoder().decode(body?.body as Uint8Array)).toBe('<main>Hello</main>');
    expect(body).toMatchObject({
      nativeRepresentation: 'html',
      representation: 'html',
      mediaType: 'text/html; charset=utf-8',
      revision: '1'
    });
    await body?.release('complete');

    for (const {event, listener} of stopListeners) {
      if (event === 'PROJECT_STOP_ALL') listener();
    }
    await Promise.resolve();

    expect(registry?.canResolve(reference, 'html')).toBe(true);
    await expect(registry?.stat(reference, 'html', {target})).rejects.toMatchObject({
      code: 'NAMED_DATA_NOT_FOUND'
    });
    await extension.dispose();
    expect(registry?.canResolve(reference, 'html')).toBe(false);
  });
});

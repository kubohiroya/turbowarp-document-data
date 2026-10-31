import {fromMarkdown} from 'mdast-util-from-markdown';
import {toMarkdown} from 'mdast-util-to-markdown';
import {parseFragment} from 'parse5';
import type {Root as MarkdownRoot, RootContent as MarkdownNode} from 'mdast';

export const DOCUMENT_MAX_SOURCE_BYTES = 256 * 1024;
export const DOCUMENT_MAX_OUTPUT_BYTES = 256 * 1024;
export const DOCUMENT_MAX_NODES = 50_000;
export const DOCUMENT_MAX_DEPTH = 64;

export type DocumentKind = 'html' | 'markdown';
/** A point in the parsed source: 1-based line/column, 0-based offset, UTF-16 code units. */
export interface SourcePoint {line: number; column: number; offset: number}
/** The mdast/unist position shape; `end` points just past the range. */
export interface SourcePosition {start: SourcePoint; end: SourcePoint}
export type HtmlNode =
  | {type: 'element'; tagName: string; attributes: Record<string, string>; children: HtmlNode[]; position?: SourcePosition}
  | {type: 'text'; value: string; position?: SourcePosition}
  | {type: 'comment'; value: string; position?: SourcePosition};
export interface HtmlRoot {type: 'root'; children: HtmlNode[]; position?: SourcePosition}
export type DocumentTree =
  | {kind: 'html'; root: HtmlRoot}
  | {kind: 'markdown'; root: MarkdownRoot};

export type DocumentErrorCode =
  | 'INVALID_DOCUMENT'
  | 'INVALID_NAME'
  | 'DOCUMENT_NOT_FOUND'
  | 'DOCUMENT_LIMIT_EXCEEDED'
  | 'INVALID_LOCATION'
  | 'LOCATION_NOT_FOUND'
  | 'LOSSY_CONVERSION';

export class DocumentDataError extends Error {
  public constructor(public readonly code: DocumentErrorCode, public readonly detail: string) {
    super(`${code}: ${detail}`);
    this.name = 'DocumentDataError';
  }
}

interface Parse5Location {
  startLine?: number;
  startCol?: number;
  startOffset?: number;
  endLine?: number;
  endCol?: number;
  endOffset?: number;
}

interface Parse5Node {
  nodeName: string;
  tagName?: string;
  value?: string;
  data?: string;
  attrs?: Array<{name: string; value: string}>;
  childNodes?: Parse5Node[];
  sourceCodeLocation?: Parse5Location | null;
}

export function parseHtmlDocument(source: string): DocumentTree {
  checkSource(source);
  let parsed: Parse5Node;
  try {
    parsed = parseFragment(source, {sourceCodeLocationInfo: true}) as unknown as Parse5Node;
  } catch (error) {
    throw new DocumentDataError('INVALID_DOCUMENT', errorMessage(error, 'Invalid HTML.'));
  }
  const root: HtmlRoot = {
    type: 'root',
    children: (parsed.childNodes ?? []).map(convertHtmlNode).filter((node): node is HtmlNode => !!node),
    position: {start: {line: 1, column: 1, offset: 0}, end: sourceEnd(source)}
  };
  checkTree(root);
  return {kind: 'html', root};
}

export function parseMarkdownDocument(source: string): DocumentTree {
  checkSource(source);
  let root: MarkdownRoot;
  try {
    root = fromMarkdown(source);
  } catch (error) {
    throw new DocumentDataError('INVALID_DOCUMENT', errorMessage(error, 'Invalid Markdown.'));
  }
  checkTree(root);
  return {kind: 'markdown', root};
}

export function serializeDocument(tree: DocumentTree, format: DocumentKind = tree.kind): string {
  if (format !== tree.kind) {
    throw new DocumentDataError(
      'LOSSY_CONVERSION',
      `Converting ${tree.kind} to ${format} is not supported because it may be lossy.`
    );
  }
  const output =
    tree.kind === 'html'
      ? tree.root.children.map((node) => serializeHtmlNode(node)).join('')
      : toMarkdown(tree.root, {bullet: '-', emphasis: '*', strong: '*', fences: true});
  if (new TextEncoder().encode(output).byteLength > DOCUMENT_MAX_OUTPUT_BYTES) {
    throw new DocumentDataError('DOCUMENT_LIMIT_EXCEEDED', 'Serialized document is too large.');
  }
  return output.replaceAll('\r\n', '\n').replaceAll('\r', '\n');
}

export function getDocumentText(tree: DocumentTree, location: string): string {
  const node = resolveLocation(tree, location);
  return collectText(node);
}

export function replaceDocumentText(
  tree: DocumentTree,
  location: string,
  text: string
): DocumentTree {
  const copy = structuredClone(tree);
  const node = resolveLocation(copy, location);
  if (copy.kind === 'html') replaceHtmlNodeText(node as HtmlRoot | HtmlNode, text);
  else replaceMarkdownNodeText(node as MarkdownRoot | MarkdownNode, text);
  // Positions describe the parsed source only; an edited tree carries none at all.
  removeNodePositions(copy.root);
  checkTree(copy.root);
  return copy;
}

function convertHtmlNode(node: Parse5Node): HtmlNode | undefined {
  const position = htmlPosition(node.sourceCodeLocation);
  const located = position ? {position} : {};
  if (node.nodeName === '#text') return {type: 'text', value: node.value ?? '', ...located};
  if (node.nodeName === '#comment') return {type: 'comment', value: node.data ?? '', ...located};
  if (!node.tagName) return undefined;
  return {
    type: 'element',
    tagName: node.tagName,
    attributes: Object.fromEntries(
      (node.attrs ?? [])
        .map((attribute): [string, string] => [attribute.name, attribute.value])
        .sort(([a], [b]) => a.localeCompare(b))
    ),
    children: (node.childNodes ?? []).map(convertHtmlNode).filter((child): child is HtmlNode => !!child),
    ...located
  };
}

/** parse5 already reports 1-based lines/columns and 0-based UTF-16 offsets; synthesized nodes have none. */
function htmlPosition(location: Parse5Location | null | undefined): SourcePosition | undefined {
  const start = sourcePoint(location?.startLine, location?.startCol, location?.startOffset);
  const end = sourcePoint(location?.endLine, location?.endCol, location?.endOffset);
  return start && end ? {start, end} : undefined;
}

function sourcePoint(line: unknown, column: unknown, offset: unknown): SourcePoint | undefined {
  return Number.isSafeInteger(line) && Number.isSafeInteger(column) && Number.isSafeInteger(offset)
    ? {line: line as number, column: column as number, offset: offset as number}
    : undefined;
}

/** The point just past the last character, counting CRLF, LF and CR as one line break each like mdast. */
function sourceEnd(source: string): SourcePoint {
  let line = 1;
  let lineStart = 0;
  for (let index = 0; index < source.length; index++) {
    const code = source.charCodeAt(index);
    if (code === 13 && source.charCodeAt(index + 1) === 10) index++;
    if (code === 10 || code === 13) {
      line++;
      lineStart = index + 1;
    }
  }
  return {line, column: source.length - lineStart + 1, offset: source.length};
}

function removeNodePositions(node: unknown): void {
  if (typeof node !== 'object' || node === null) return;
  delete (node as {position?: unknown}).position;
  for (const child of childrenOf(node)) removeNodePositions(child);
}

export function resolveLocation(tree: DocumentTree, rawLocation: string): unknown {
  const location = rawLocation.trim();
  if (location === '$') return tree.root;
  if (tree.kind === 'html' && /^[#.a-zA-Z][\w-]*$/.test(location)) {
    const found = findHtml(tree.root.children, location);
    if (!found) throw new DocumentDataError('LOCATION_NOT_FOUND', `No HTML node matches ${location}.`);
    return found;
  }
  const indexes = parsePath(location);
  let current: unknown = tree.root;
  for (const index of indexes) {
    const children = childrenOf(current);
    current = children[index];
    if (current === undefined) {
      throw new DocumentDataError('LOCATION_NOT_FOUND', `Document location does not exist: ${location}`);
    }
  }
  return current;
}

function parsePath(location: string): number[] {
  if (!/^\$(?:\[\d+\])+$/.test(location)) {
    throw new DocumentDataError('INVALID_LOCATION', `Expected $, $[0][1], or a simple HTML selector: ${location}`);
  }
  return [...location.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]));
}

function childrenOf(value: unknown): unknown[] {
  if (typeof value !== 'object' || value === null || !('children' in value)) return [];
  const children = (value as {children?: unknown}).children;
  return Array.isArray(children) ? children : [];
}

function findHtml(nodes: HtmlNode[], selector: string): HtmlNode | undefined {
  for (const node of nodes) {
    if (node.type === 'element') {
      const matches = selector.startsWith('#')
        ? node.attributes.id === selector.slice(1)
        : selector.startsWith('.')
          ? (node.attributes.class ?? '').split(/\s+/).includes(selector.slice(1))
          : node.tagName === selector.toLowerCase();
      if (matches) return node;
      const nested = findHtml(node.children, selector);
      if (nested) return nested;
    }
  }
  return undefined;
}

function collectText(value: unknown): string {
  if (typeof value !== 'object' || value === null) return '';
  if ('type' in value && (value as {type: string}).type === 'comment') return '';
  if ('value' in value && typeof (value as {value?: unknown}).value === 'string') {
    return (value as {value: string}).value;
  }
  return childrenOf(value).map(collectText).join('');
}

function replaceHtmlNodeText(node: HtmlRoot | HtmlNode, text: string): void {
  if (node.type === 'text' || node.type === 'comment') {
    node.value = text;
    return;
  }
  node.children = [{type: 'text', value: text}];
}

function replaceMarkdownNodeText(node: MarkdownRoot | MarkdownNode, text: string): void {
  if ('value' in node && typeof node.value === 'string') {
    node.value = text;
    return;
  }
  if ('children' in node && Array.isArray(node.children)) {
    if (node.type === 'root') {
      node.children = [{type: 'paragraph', children: [{type: 'text', value: text}]}];
    } else {
      node.children = [{type: 'text', value: text}];
    }
    return;
  }
  throw new DocumentDataError('INVALID_LOCATION', 'The selected Markdown node has no text content.');
}

function serializeHtmlNode(node: HtmlNode, parentTag?: string): string {
  if (node.type === 'text') return parentTag && RAW_TEXT_ELEMENTS.has(parentTag) ? node.value : escapeHtmlText(node.value);
  if (node.type === 'comment') return `<!--${node.value.replaceAll('--', '- -')}-->`;
  const attributes = Object.entries(node.attributes)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, value]) => ` ${name}="${escapeHtmlAttribute(value)}"`)
    .join('');
  const start = `<${node.tagName}${attributes}>`;
  if (VOID_ELEMENTS.has(node.tagName)) return start;
  return `${start}${node.children.map((child) => serializeHtmlNode(child, node.tagName)).join('')}</${node.tagName}>`;
}

const VOID_ELEMENTS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr']);
const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext']);
const escapeHtmlText = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const escapeHtmlAttribute = (value: string) => escapeHtmlText(value).replaceAll('"', '&quot;');

function checkSource(source: string): void {
  if (new TextEncoder().encode(source).byteLength > DOCUMENT_MAX_SOURCE_BYTES) {
    throw new DocumentDataError('DOCUMENT_LIMIT_EXCEEDED', 'Document source is too large.');
  }
}

function checkTree(root: unknown): void {
  let count = 0;
  const visit = (node: unknown, depth: number): void => {
    count += 1;
    if (count > DOCUMENT_MAX_NODES || depth > DOCUMENT_MAX_DEPTH) {
      throw new DocumentDataError('DOCUMENT_LIMIT_EXCEEDED', 'Document tree exceeds its node or depth limit.');
    }
    for (const child of childrenOf(node)) visit(child, depth + 1);
  };
  visit(root, 0);
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

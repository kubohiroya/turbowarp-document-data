import {describe, expect, it} from 'vitest';
import {
  getDocumentText, parseHtmlDocument, parseMarkdownDocument, replaceDocumentText, serializeDocument,
  type DocumentTree
} from '../src/document.js';
import {copyDocumentNode} from '../src/document-tree-provider.js';

const LIMITS = {maxDepth: 64, maxNodes: 50_000};
const withoutPositions = (tree: DocumentTree): DocumentTree =>
  ({kind: tree.kind, root: copyDocumentNode(tree.root, {positions: false, limits: LIMITS})}) as unknown as DocumentTree;
const node = (root: unknown, ...path: number[]) => {
  let current = root;
  for (const index of path) current = (current as {children: unknown[]}).children[index];
  return current as {position?: unknown; children: unknown[]; value?: string};
};
const at = (line: number, column: number, offset: number) => ({line, column, offset});

describe('document trees', () => {
  it('canonicalizes HTML attributes and preserves parsed structure', () => {
    const tree = parseHtmlDocument('<DIV z="2" a="1">Hello<br>world</DIV>');
    expect(serializeDocument(tree)).toBe('<div a="1" z="2">Hello<br>world</div>');
    expect(getDocumentText(tree, 'div')).toBe('Helloworld');
  });

  it('preserves raw-text element semantics', () => {
    const tree = parseHtmlDocument('<script>if (a < b) run()</script>');
    expect(serializeDocument(tree)).toBe('<script>if (a < b) run()</script>');
  });

  it('captures a position-free Markdown AST and serializes deterministically', () => {
    const tree = parseMarkdownDocument('# Hello\r\n\r\nWorld');
    const captured = copyDocumentNode(tree.root, {positions: false, limits: LIMITS});
    expect(JSON.stringify(captured)).not.toContain('position');
    expect(captured).toEqual({
      type: 'root',
      children: [
        {type: 'heading', depth: 1, children: [{type: 'text', value: 'Hello'}]},
        {type: 'paragraph', children: [{type: 'text', value: 'World'}]}
      ]
    });
    expect(serializeDocument(tree)).toBe('# Hello\n\nWorld\n');
    expect(getDocumentText(tree, '$[0]')).toBe('Hello');
  });

  it('immutably replaces text', () => {
    const original = parseMarkdownDocument('Before');
    const updated = replaceDocumentText(original, '$[0]', 'After');
    expect(serializeDocument(original)).toBe('Before\n');
    expect(serializeDocument(updated)).toBe('After\n');
  });
});

describe('source positions', () => {
  it('keeps mdast positions in UTF-16 units with CRLF counted as one line break', () => {
    const source = '# A\r\n\r\n😀 b\r\n';
    const {root} = parseMarkdownDocument(source);
    expect(node(root, 0).position).toEqual({start: at(1, 1, 0), end: at(1, 4, 3)});
    expect(node(root, 1).position).toEqual({start: at(3, 1, 7), end: at(3, 5, 11)});
    expect(root.position).toEqual({start: at(1, 1, 0), end: at(4, 1, source.length)});
    expect(parseMarkdownDocument('').root.position).toEqual({start: at(1, 1, 0), end: at(1, 1, 0)});
  });

  it('converts parse5 locations to mdast-shaped HTML positions and leaves synthesized nodes without one', () => {
    const {root} = parseHtmlDocument('<table><tr><td>😀a</td></tr></table>');
    expect(node(root, 0).position).toEqual({start: at(1, 1, 0), end: at(1, 37, 36)});
    const tbody = node(root, 0, 0);
    expect(tbody).toMatchObject({type: 'element', tagName: 'tbody'});
    expect(tbody).not.toHaveProperty('position');
    expect(node(root, 0, 0, 0).position).toEqual({start: at(1, 8, 7), end: at(1, 29, 28)});
    expect(node(root, 0, 0, 0, 0, 0)).toEqual({type: 'text', value: '😀a', position: {start: at(1, 16, 15), end: at(1, 19, 18)}});
  });

  it('ends an element with an omitted end tag where it was implicitly closed', () => {
    const {root} = parseHtmlDocument('<p>a<p>b');
    expect(node(root, 0).position).toEqual({start: at(1, 1, 0), end: at(1, 5, 4)});
    expect(node(root, 1).position).toEqual({start: at(1, 5, 4), end: at(1, 9, 8)});
  });

  it('counts CR in offsets, CRLF/LF/CR as single line breaks and emoji as two units in HTML', () => {
    const source = '<p>x\r\ny</p>\r\n😀<i>q</i>\rz';
    const {root} = parseHtmlDocument(source);
    expect(node(root, 0, 0)).toEqual({type: 'text', value: 'x\ny', position: {start: at(1, 4, 3), end: at(2, 2, 7)}});
    expect(node(root, 2).position).toEqual({start: at(3, 3, 15), end: at(3, 11, 23)});
    expect(root.position).toEqual({start: at(1, 1, 0), end: at(4, 2, source.length)});
  });

  it('gives the HTML root a position covering the whole source', () => {
    expect(parseHtmlDocument('').root.position).toEqual({start: at(1, 1, 0), end: at(1, 1, 0)});
    expect(parseHtmlDocument('a\rb\n').root.position).toEqual({start: at(1, 1, 0), end: at(3, 1, 4)});
    expect(parseHtmlDocument('a\r\n\nb').root.position).toEqual({start: at(1, 1, 0), end: at(3, 2, 5)});
  });

  it('removes every position after replacing text, including the root, and keeps the original tree', () => {
    const markdown = parseMarkdownDocument('# A\n\nB');
    const editedMarkdown = replaceDocumentText(markdown, '$[1]', 'C');
    expect(JSON.stringify(editedMarkdown)).not.toContain('position');
    expect(markdown.root.position).toBeDefined();

    const html = parseHtmlDocument('<p id="x" position="kept">a</p><b>c</b>');
    const editedHtml = replaceDocumentText(html, '#x', 'b');
    expect(editedHtml.root).not.toHaveProperty('position');
    expect(node(editedHtml.root, 1)).not.toHaveProperty('position');
    expect(node(editedHtml.root, 1, 0)).not.toHaveProperty('position');
    expect(node(editedHtml.root, 0, 0)).toEqual({type: 'text', value: 'b'});
    // Only node positions are removed; an attribute that happens to be named position is data.
    expect(node(editedHtml.root, 0)).toMatchObject({attributes: {id: 'x', position: 'kept'}});
    expect(serializeDocument(editedHtml)).toBe('<p id="x" position="kept">b</p><b>c</b>');
    expect(node(html.root, 0).position).toBeDefined();
  });

  it('serializes the same output with or without positions', () => {
    const markdown = parseMarkdownDocument([
      '# Title\r\n', 'Text with *em*, **strong**, `code` and [link](https://example.com "t").\r\n\r\n',
      '- one\n- two\n  - nested\n\n1. first\n2. second\n\n> quote\n\n```js meta\nlet a = 1;\n```\n\n',
      '---\n\n![image](a.png) [ref]\n\n[ref]: https://example.org\n\n<div>html</div>\n\n😀 line  \nbreak\n'
    ].join(''));
    expect(JSON.stringify(markdown)).toContain('position');
    expect(serializeDocument(markdown)).toBe(serializeDocument(withoutPositions(markdown)));
    const html = parseHtmlDocument('<ul><li>one<li>two</ul><table><tr><td>x</table><!-- c --><p>a<p>b');
    expect(JSON.stringify(html)).toContain('position');
    expect(serializeDocument(html)).toBe(serializeDocument(withoutPositions(html)));
  });
});

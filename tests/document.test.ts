import {describe, expect, it} from 'vitest';
import {getDocumentText, parseHtmlDocument, parseMarkdownDocument, replaceDocumentText, serializeDocument} from '../src/document.js';

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

  it('uses a position-free Markdown AST and deterministic serialization', () => {
    const tree = parseMarkdownDocument('# Hello\r\n\r\nWorld');
    expect(JSON.stringify(tree)).not.toContain('position');
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

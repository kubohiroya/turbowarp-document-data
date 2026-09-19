import {describe, expect, it} from 'vitest';
import fixture from './fixtures/semantic-parity.json';
import {parseHtmlDocument, parseMarkdownDocument, serializeDocument} from '../src/document.js';
import {DocumentNamedDataProvider} from '../src/document-provider.js';

describe('browser/server semantic parity fixture', () => {
  for (const entry of fixture) {
    it(`matches ${entry.format} block serialization and provider bytes`, () => {
      const tree = entry.format === 'html' ? parseHtmlDocument(entry.source) : parseMarkdownDocument(entry.source);
      expect(serializeDocument(tree)).toBe(entry.serialized);
      const target = {};
      const provider = new DocumentNamedDataProvider({get: () => ({tree, revision: 1})});
      const reference = {namespace: 'document', name: 'page', kind: 'document', scope: 'target'} as const;
      const body = provider.openBody(reference, entry.format as 'html' | 'markdown', {target});
      expect(body.mediaType).toBe(entry.mediaType);
      expect(new TextDecoder().decode(body.body as Uint8Array)).toBe(entry.serialized);
      body.release();
    });
  }
});

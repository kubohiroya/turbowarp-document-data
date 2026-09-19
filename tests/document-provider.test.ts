import {describe, expect, it} from 'vitest';
import {parseHtmlDocument} from '../src/document.js';
import {DocumentNamedDataProvider} from '../src/document-provider.js';
import {NAMED_DATA_ERROR_CODES} from '@kubohiroya/turbowarp-named-data/composition';

describe('DocumentNamedDataProvider', () => {
  it('exposes replayable HTML bytes and opaque revision metadata', () => {
    const target = {};
    const provider = new DocumentNamedDataProvider({get: (actual, name) => actual === target && name === 'page' ? {tree: parseHtmlDocument('<h1>Hello</h1>'), revision: 7} : undefined});
    const reference = {namespace: 'document', name: 'page', kind: 'document', scope: 'target'} as const;
    expect(provider.canResolve(reference, 'html')).toBe(true);
    expect(provider.canResolve({...reference, scope: 'project'}, 'html')).toBe(false);
    expect(provider.canResolve(reference, 'json')).toBe(false);
    const body = provider.openBody(reference, 'html', {target});
    expect(body.mediaType).toBe('text/html; charset=utf-8');
    expect(body.nativeRepresentation).toBe('html');
    expect(body.representation).toBe('html');
    expect(body.revision).toBe('7');
    expect(body.replayable).toBe(true);
    expect(new TextDecoder().decode(body.body as Uint8Array)).toBe('<h1>Hello</h1>');
    body.release('complete');
    body.release('cancel');
  });

  it('rejects target mismatch, format conversion, and use after release', () => {
    const target = {};
    const provider = new DocumentNamedDataProvider({get: () => ({tree: parseHtmlDocument('<p>x</p>'), revision: 1})});
    const reference = {namespace: 'document', name: 'page', kind: 'document', scope: 'target'} as const;
    expect(() => provider.stat(reference, 'html', {})).toThrow('NAMED_DATA_SCOPE_MISMATCH');
    expect(() => provider.stat(reference, 'markdown', {target})).toThrow('NAMED_DATA_REPRESENTATION_UNSUPPORTED');
    provider.release('shutdown');
    provider.release('shutdown');
    expect(provider.canResolve(reference, 'html')).toBe(false);
    expect(() => provider.stat(reference, 'html', {target})).toThrow('NAMED_DATA_PROVIDER_RELEASED');
  });

  it('uses the canonical error vocabulary', () => {
    expect(NAMED_DATA_ERROR_CODES).toEqual([
      'NAMED_DATA_INVALID_REF',
      'NAMED_DATA_INVALID_REGISTRY',
      'NAMED_DATA_PROVIDER_CONFLICT',
      'NAMED_DATA_PROVIDER_NOT_FOUND',
      'NAMED_DATA_NOT_FOUND',
      'NAMED_DATA_KIND_MISMATCH',
      'NAMED_DATA_SCOPE_MISMATCH',
      'NAMED_DATA_REPRESENTATION_UNSUPPORTED',
      'NAMED_DATA_INVALID_METADATA',
      'NAMED_DATA_BODY_TOO_LARGE',
      'NAMED_DATA_ABORTED',
      'NAMED_DATA_PROVIDER_RELEASED'
    ]);
  });
});

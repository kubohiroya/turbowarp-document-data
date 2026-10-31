import {
  DocumentTreeError,
  type DocumentTreeCapture,
  type DocumentTreeJSON,
  type DocumentTreeLimits,
  type DocumentTreeProvider,
  type NormalizedDocumentTreeCaptureOptions
} from './composition.js';
import {DocumentDataError, resolveLocation} from './document.js';
import type {DocumentBindingStore} from './document-provider.js';

type JsonObject = {[key: string]: DocumentTreeJSON};

/** Read-only capture adapter over the same binding store as the blocks and the Named Data provider. */
export class DocumentTreeCaptureProvider implements DocumentTreeProvider {
  public constructor(private readonly store: DocumentBindingStore) {}

  public capture(target: object, name: string, options: NormalizedDocumentTreeCaptureOptions): DocumentTreeCapture {
    const key = typeof name === 'string' ? name.trim() : '';
    const binding = key ? this.store.get(target, key) : undefined;
    if (!binding) throw new DocumentTreeError('DOCUMENT_NOT_FOUND', `Document does not exist: ${key}`);
    let node: unknown;
    try {
      node = resolveLocation(binding.tree, options.location);
    } catch (error) {
      if (error instanceof DocumentDataError && (error.code === 'INVALID_LOCATION' || error.code === 'LOCATION_NOT_FOUND')) {
        throw new DocumentTreeError(error.code, error.detail);
      }
      throw error;
    }
    return {
      kind: binding.tree.kind,
      revision: String(binding.revision),
      root: copyDocumentNode(node, options) as JsonObject
    };
  }
}

/**
 * Deep-copy a stored node into plain JSON data. Values are counted exactly as the shared codec counts a
 * parsed JSON value (each value once, depth checked before the count, the copied node at depth 0), so the
 * copy fits the limits iff parsing its JSON text would. Copying stops at the first value over a limit.
 */
export function copyDocumentNode(
  node: unknown,
  {positions, limits}: {readonly positions: boolean; readonly limits: DocumentTreeLimits}
): DocumentTreeJSON {
  let count = 0;
  const copy = (value: unknown, depth: number, isNode: boolean, holdsNodes: boolean): DocumentTreeJSON => {
    if (depth > limits.maxDepth) {
      throw new DocumentTreeError('DOCUMENT_LIMIT_EXCEEDED', `The captured tree is deeper than ${limits.maxDepth}.`);
    }
    if (++count > limits.maxNodes) {
      throw new DocumentTreeError('DOCUMENT_LIMIT_EXCEEDED', `The captured tree has more than ${limits.maxNodes} values.`);
    }
    if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (Array.isArray(value)) {
      const items: DocumentTreeJSON[] = [];
      for (const item of value) items.push(copy(omittedInJson(item) ? null : item, depth + 1, holdsNodes, false));
      return items;
    }
    if (typeof value !== 'object') throw new TypeError('Document trees contain only JSON data.');
    const result: JsonObject = {};
    for (const [key, item] of Object.entries(value)) {
      if (omittedInJson(item) || (isNode && key === 'position' && !positions)) continue;
      // defineProperty keeps keys such as an HTML attribute named __proto__ as ordinary data.
      Object.defineProperty(result, key, {
        value: copy(item, depth + 1, false, isNode && key === 'children'),
        enumerable: true,
        writable: true,
        configurable: true
      });
    }
    return result;
  };
  return copy(node, 0, true, false);
}

const omittedInJson = (value: unknown): boolean =>
  value === undefined || typeof value === 'function' || typeof value === 'symbol';

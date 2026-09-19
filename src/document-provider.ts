import {DOCUMENT_MAX_OUTPUT_BYTES, serializeDocument, type DocumentTree} from './document.js';
import {
  NamedDataError,
  type NamedDataBody,
  type NamedDataMetadata,
  type NamedDataProvider,
  type NamedDataReference,
  type NamedDataReleaseReason,
  type NamedDataRepresentation,
  type NamedDataResolveContext
} from '@kubohiroya/turbowarp-named-data/composition';

export const DOCUMENT_DATA_NAMESPACE = 'document';
export interface DocumentBinding {tree: DocumentTree; revision: number}
export interface DocumentBindingStore {get(target: object, name: string): DocumentBinding | undefined}

export class DocumentNamedDataProvider implements NamedDataProvider {
  public readonly namespace = DOCUMENT_DATA_NAMESPACE;
  public readonly kind = 'document' as const;
  private readonly handles = new Set<symbol>();
  private released = false;

  public constructor(private readonly store: DocumentBindingStore) {}

  public canResolve(
    reference: NamedDataReference,
    representation: NamedDataRepresentation
  ): boolean {
    return (
      !this.released &&
      reference.namespace === this.namespace &&
      reference.name.trim().length > 0 &&
      reference.kind === this.kind &&
      reference.scope === 'target' &&
      (representation === 'html' || representation === 'markdown')
    );
  }

  public stat(reference: NamedDataReference, representation: NamedDataRepresentation, context: NamedDataResolveContext): NamedDataMetadata {
    const result = this.resolve(reference, representation, context);
    return this.metadata(reference, representation, result.bytes.byteLength, result.binding.revision);
  }

  public openBody(reference: NamedDataReference, representation: NamedDataRepresentation, context: NamedDataResolveContext): NamedDataBody {
    const result = this.resolve(reference, representation, context);
    const handle = Symbol('document-body');
    this.handles.add(handle);
    let released = false;
    return {
      ...this.metadata(reference, representation, result.bytes.byteLength, result.binding.revision),
      body: result.bytes,
      release: (reason?: NamedDataReleaseReason) => {
        void reason;
        if (!released) {
          released = true;
          this.handles.delete(handle);
        }
      }
    };
  }

  public clearSession(): void {this.handles.clear();}
  public release(reason?: NamedDataReleaseReason): void {
    void reason;
    this.released = true;
    this.handles.clear();
  }

  private resolve(reference: NamedDataReference, representation: NamedDataRepresentation, context: NamedDataResolveContext): {binding: DocumentBinding; bytes: Uint8Array} {
    if (this.released) throw new NamedDataError('NAMED_DATA_PROVIDER_RELEASED', 'The document provider was released.');
    if (context.signal?.aborted) throw new NamedDataError('NAMED_DATA_ABORTED', 'Body resolution was aborted.');
    if (reference.namespace !== this.namespace || reference.name.trim().length === 0) throw new NamedDataError('NAMED_DATA_INVALID_REF', 'Invalid document reference.');
    if (reference.kind !== this.kind) throw new NamedDataError('NAMED_DATA_KIND_MISMATCH', `Expected document, received ${reference.kind}.`);
    if (reference.scope !== 'target' || !context.target) throw new NamedDataError('NAMED_DATA_SCOPE_MISMATCH', 'Document data requires target scope and target context.');
    if (representation !== 'html' && representation !== 'markdown') throw new NamedDataError('NAMED_DATA_REPRESENTATION_UNSUPPORTED', `Documents cannot be rendered as ${representation}.`);
    const binding = this.store.get(context.target, reference.name);
    if (!binding) throw new NamedDataError('NAMED_DATA_NOT_FOUND', `Document does not exist: ${reference.name}`);
    if (binding.tree.kind !== representation) throw new NamedDataError('NAMED_DATA_REPRESENTATION_UNSUPPORTED', `Cross-format ${binding.tree.kind} to ${representation} conversion may be lossy.`);
    const bytes = new TextEncoder().encode(serializeDocument(binding.tree));
    if (bytes.byteLength > DOCUMENT_MAX_OUTPUT_BYTES) throw new NamedDataError('NAMED_DATA_BODY_TOO_LARGE', 'Serialized document is too large.');
    if (context.signal?.aborted) throw new NamedDataError('NAMED_DATA_ABORTED', 'Body resolution was aborted.');
    return {binding, bytes};
  }

  private metadata(reference: NamedDataReference, representation: NamedDataRepresentation, byteLength: number, revision: number): NamedDataMetadata {
    return {
      reference: {...reference}, nativeRepresentation: representation, representation,
      mediaType: representation === 'html' ? 'text/html; charset=utf-8' : 'text/markdown; charset=utf-8',
      byteLength, revision: String(revision), replayable: true
    };
  }
}

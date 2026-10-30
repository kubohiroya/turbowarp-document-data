import {
  NamedDataError, type NamedDataBody, type NamedDataMetadata, type NamedDataProvider,
  type NamedDataReference, type NamedDataRepresentation, type NamedDataResolveContext
} from '@kubohiroya/turbowarp-named-data/composition';
import type {SourceDocumentStore, PersistentSourceDocument} from './source-documents.js';

/** Project-scoped read-only native source; stop releases handles without removing source text. */
export class SourceDocumentNamedDataProvider implements NamedDataProvider {
  public readonly namespace = 'document-source';
  public readonly kind = 'document' as const;
  private released = false;
  private readonly handles = new Set<symbol>();
  public constructor(private readonly store: SourceDocumentStore) {}
  public canResolve(reference: NamedDataReference, representation: NamedDataRepresentation): boolean {
    return !this.released && reference.namespace === this.namespace && reference.kind === this.kind &&
      reference.scope === 'project' && reference.name.length > 0 && (representation === 'yaml' || representation === 'json');
  }
  private resolve(reference: NamedDataReference, representation: NamedDataRepresentation, context: NamedDataResolveContext): PersistentSourceDocument {
    if (this.released) throw new NamedDataError('NAMED_DATA_PROVIDER_RELEASED', 'The source document provider was released.');
    if (context.signal?.aborted) throw new NamedDataError('NAMED_DATA_ABORTED', 'Source body resolution was aborted.');
    if (reference.namespace !== this.namespace || !reference.name.length) throw new NamedDataError('NAMED_DATA_INVALID_REF', 'Invalid source document reference.');
    if (reference.kind !== this.kind) throw new NamedDataError('NAMED_DATA_KIND_MISMATCH', 'Expected a document reference.');
    if (reference.scope !== 'project' || !context.project) throw new NamedDataError('NAMED_DATA_SCOPE_MISMATCH', 'Source documents require project scope and context.');
    let document: PersistentSourceDocument;
    try {document = this.store.read(reference.name);} catch {throw new NamedDataError('NAMED_DATA_NOT_FOUND', 'The source document is unavailable.');}
    if (representation !== document.format) throw new NamedDataError('NAMED_DATA_REPRESENTATION_UNSUPPORTED', 'Native source is not converted to another format.');
    return document;
  }
  private metadata(reference: NamedDataReference, document: PersistentSourceDocument): NamedDataMetadata {
    return {reference: {...reference}, nativeRepresentation: document.format, representation: document.format,
      mediaType: document.format === 'yaml' ? 'application/yaml; charset=utf-8' : 'application/json; charset=utf-8',
      byteLength: new TextEncoder().encode(document.source).byteLength, revision: document.revision, replayable: true};
  }
  public stat(reference: NamedDataReference, representation: NamedDataRepresentation, context: NamedDataResolveContext): NamedDataMetadata {
    return this.metadata(reference, this.resolve(reference, representation, context));
  }
  public openBody(reference: NamedDataReference, representation: NamedDataRepresentation, context: NamedDataResolveContext): NamedDataBody {
    const document = this.resolve(reference, representation, context), handle = Symbol('source-document-body');
    this.handles.add(handle);
    return {...this.metadata(reference, document), body: new TextEncoder().encode(document.source), release: () => {this.handles.delete(handle);}};
  }
  public clearSession(): void {this.handles.clear();}
  public release(): void {this.released = true;this.clearSession();}
}

import {SourceDocumentError, encodeSourceDocumentReference, decodeSourceDocumentReference, sourceDocumentRegistrySymbol, sourceDocumentSchemaLimits, normalizeSourceDocumentSchema} from '@kubohiroya/turbowarp-document-source';
import type {SourceDocumentReference, SourceDocumentMetadata, RegisteredSourceDocumentMetadata, SourceDocumentAvailability, SourceDocumentSnapshot, SourceDocumentPrepared, SourceDocumentAdapter, SourceDocumentProvider, SourceDocumentRegistry, SourceDocumentSchemaMetadata} from '@kubohiroya/turbowarp-document-source';
export type * from '@kubohiroya/turbowarp-document-source';
export {SourceDocumentError, encodeSourceDocumentReference, decodeSourceDocumentReference, sourceDocumentRegistrySymbol, sourceDocumentSchemaLimits, normalizeSourceDocumentSchema, normalizeSourceDocumentPreview} from '@kubohiroya/turbowarp-document-source';
export function createSourceDocumentRegistry(): SourceDocumentRegistry;
export function getSourceDocumentRegistry(scope: object): SourceDocumentRegistry;
export type DocumentTreeKind = 'html' | 'markdown';
export type DocumentTreeErrorCode =
  | 'DOCUMENT_TREE_UNAVAILABLE'
  | 'DOCUMENT_NOT_FOUND'
  | 'INVALID_LOCATION'
  | 'LOCATION_NOT_FOUND'
  | 'DOCUMENT_LIMIT_EXCEEDED'
  | 'DOCUMENT_TREE_OPTIONS_INVALID'
  | 'DOCUMENT_TREE_PROVIDER_INVALID'
  | 'REGISTRY_SCOPE_INVALID'
  | 'REGISTRY_INCOMPATIBLE';
/** Counted like `@kubohiroya/turbowarp-yaml-json/codec` parsing JSON: every value is one node, the captured root has depth 0. */
export interface DocumentTreeLimits {readonly maxDepth: number; readonly maxNodes: number;}
export interface DocumentTreeCaptureOptions {
  /** `$`, `$[0][1]`, or a simple HTML selector (tag, `#id`, `.class`). */
  readonly location: string;
  /** Keep `position` on nodes that have one. Defaults to false. */
  readonly positions?: boolean;
  readonly limits: DocumentTreeLimits;
}
export interface NormalizedDocumentTreeCaptureOptions {
  readonly location: string;
  readonly positions: boolean;
  readonly limits: DocumentTreeLimits;
}
export type DocumentTreeJSON = null | boolean | number | string | DocumentTreeJSON[] | {[key: string]: DocumentTreeJSON};
export interface DocumentTreeCapture {
  readonly kind: DocumentTreeKind;
  readonly revision: string;
  /** A fresh deep copy owned by the caller; changing it never changes the stored tree. */
  readonly root: {[key: string]: DocumentTreeJSON};
}
export interface DocumentTreeProvider {
  capture(target: object, name: string, options: NormalizedDocumentTreeCaptureOptions): DocumentTreeCapture;
}
export interface DocumentTreeRegistry {
  readonly apiVersion: 1;
  /** The newest registration answers captures; the returned function removes only this registration. */
  register(provider: DocumentTreeProvider): () => void;
  capture(target: object, name: string, options: DocumentTreeCaptureOptions): DocumentTreeCapture;
}
export class DocumentTreeError extends Error { readonly code: DocumentTreeErrorCode; constructor(code: DocumentTreeErrorCode, message: string); }
export const documentTreeErrorCodes: readonly DocumentTreeErrorCode[];
export const documentTreeRegistrySymbol: symbol;
export function createDocumentTreeRegistry(): DocumentTreeRegistry;
export function getDocumentTreeRegistry(scope: object): DocumentTreeRegistry;

export type EmbeddedYamlReference = SourceDocumentReference;
export type EmbeddedYamlMetadata = SourceDocumentMetadata;
export type RegisteredEmbeddedYamlMetadata = RegisteredSourceDocumentMetadata;
export type EmbeddedYamlAvailability = SourceDocumentAvailability;
export type EmbeddedYamlSnapshot = SourceDocumentSnapshot;
export type EmbeddedYamlPrepared = SourceDocumentPrepared;
export type EmbeddedYamlDocumentAdapter = SourceDocumentAdapter;
export type EmbeddedYamlProvider = SourceDocumentProvider;
export type EmbeddedYamlProviderRegistry = SourceDocumentRegistry;
export type EmbeddedYamlSchemaMetadata = SourceDocumentSchemaMetadata;
export {
 SourceDocumentError as EmbeddedYamlError,
 encodeSourceDocumentReference as encodeReference,
 decodeSourceDocumentReference as decodeReference,
 createSourceDocumentRegistry as createProviderRegistry,
 getSourceDocumentRegistry as getProviderRegistry,
 sourceDocumentRegistrySymbol as providerRegistrySymbol,
 sourceDocumentSchemaLimits as embeddedYamlSchemaLimits,
 normalizeSourceDocumentSchema as normalizeSchemaMetadata
};

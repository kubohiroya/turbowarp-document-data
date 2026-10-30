export {
  SourceDocumentError, SourceDocumentError as EmbeddedYamlError,
  encodeSourceDocumentReference, encodeSourceDocumentReference as encodeReference,
  decodeSourceDocumentReference, decodeSourceDocumentReference as decodeReference
} from './source-document/reference.js';
export {
  normalizeSourceDocumentSchema, normalizeSourceDocumentSchema as normalizeSchemaMetadata,
  sourceDocumentSchemaLimits, sourceDocumentSchemaLimits as embeddedYamlSchemaLimits
} from './source-document/schema.js';
export {
  createProviderRegistry as createSourceDocumentRegistry, createProviderRegistry,
  getProviderRegistry as getSourceDocumentRegistry, getProviderRegistry,
  providerRegistrySymbol as sourceDocumentRegistrySymbol, providerRegistrySymbol
} from './source-document/registry.js';

export {normalizeSourceDocumentPreview} from './source-document/preview.js';

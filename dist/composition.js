// src/source-document/reference.js
import { SourceDocumentError, encodeSourceDocumentReference, decodeSourceDocumentReference } from "@kubohiroya/turbowarp-document-source";
import { fail, identifier, hasControlCharacters } from "@kubohiroya/turbowarp-document-source/protocol";

// src/source-document/schema.js
import { normalizeSourceDocumentSchema, sourceDocumentSchemaLimits } from "@kubohiroya/turbowarp-document-source";

// src/source-document/preview.js
import { normalizeSourceDocumentPreview } from "@kubohiroya/turbowarp-document-source";

// src/source-document/docs-url.js
function normalizeDocsURL(value) {
  if (typeof value !== "string" || value.length > 8192) fail("DOCUMENT_METADATA_INVALID", "Document documentation must use an HTTPS URL.");
  let url;
  try {
    url = new globalThis.URL(value);
  } catch {
    return fail("DOCUMENT_METADATA_INVALID", "Document documentation URL is invalid.");
  }
  if (url.protocol !== "https:" || url.username || url.password || (hasControlCharacters(value) || value.includes(" "))) fail("DOCUMENT_METADATA_INVALID", "Document documentation must use a fixed HTTPS URL without credentials.");
  return value;
}

// src/source-document/registry.js
import { sourceDocumentRegistrySymbol } from "@kubohiroya/turbowarp-document-source";
import { sourceDocumentRegistrySymbol as providerRegistrySymbol } from "@kubohiroya/turbowarp-document-source";
var validAdapter = (adapter) => adapter && ["inspect", "capture", "prepare", "commit", "dispose"].every((name) => typeof adapter[name] === "function");
var reference = (value) => typeof value === "string" ? decodeSourceDocumentReference(value) : decodeSourceDocumentReference(encodeSourceDocumentReference(value));
var sourceRepresentations = (value) => {
  if (!Array.isArray(value)) fail("DOCUMENT_METADATA_INVALID", "Source representation kinds must be a finite bounded array.");
  const length = value.length;
  if (!Number.isSafeInteger(length) || length > 16) fail("DOCUMENT_METADATA_INVALID", "Source representation kinds must be a finite bounded array.");
  const seen = /* @__PURE__ */ new Set(), result = [];
  for (let index = 0; index < length; index++) {
    if (!Object.hasOwn(value, index)) fail("DOCUMENT_METADATA_INVALID", "Source representation kinds cannot contain holes.");
    const kind = identifier(value[index], "source representation kind");
    if (seen.has(kind)) fail("DOCUMENT_METADATA_INVALID", "Source representation kinds must be unique.");
    seen.add(kind);
    result.push(kind);
  }
  return Object.freeze(result);
};
var representations = (value) => {
  if (!Array.isArray(value) || value.length > 32) fail("DOCUMENT_METADATA_INVALID", "Representation metadata must be a bounded array.");
  const seen = /* @__PURE__ */ new Set();
  return Object.freeze(value.map((item) => {
    const kind = identifier(item?.kind, "representation kind");
    if (seen.has(kind)) fail("DOCUMENT_METADATA_INVALID", "Representation kinds must be unique.");
    seen.add(kind);
    if (typeof item.label !== "string" || !item.label.length || item.label.length > 1024 || typeof item.fromSource !== "boolean" || typeof item.toSource !== "boolean" || item.available !== void 0 && typeof item.available !== "boolean" || item.reason !== void 0 && typeof item.reason !== "string") fail("DOCUMENT_METADATA_INVALID", "Invalid source representation metadata.");
    return Object.freeze({ kind, label: item.label, fromSource: item.fromSource, toSource: item.toSource, ...item.fromRepresentations === void 0 ? {} : { fromRepresentations: sourceRepresentations(item.fromRepresentations) }, ...item.available === void 0 ? {} : { available: item.available }, ...item.reason === void 0 ? {} : { reason: item.reason } });
  }));
};
var documentsFor = (provider) => {
  const documents = provider.list();
  if (!Array.isArray(documents)) fail("DOCUMENT_METADATA_INVALID", "Provider document lists must be synchronous arrays.");
  const seen = /* @__PURE__ */ new Set();
  return documents.map((document) => {
    const documentId = identifier(document?.documentId, "documentId");
    if (seen.has(documentId)) fail("DOCUMENT_DUPLICATE", `Duplicate document ID: ${documentId}`);
    seen.add(documentId);
    if (typeof document.filename !== "string" || !document.filename.length || document.filename.length > 4096 || hasControlCharacters(document.filename)) fail("DOCUMENT_METADATA_INVALID", "A bounded filename is required.");
    if (document.available !== void 0 && typeof document.available !== "boolean") fail("DOCUMENT_METADATA_INVALID", "Document availability must be boolean.");
    if (document.reason !== void 0 && typeof document.reason !== "string") fail("DOCUMENT_METADATA_INVALID", "Document reasons must be text.");
    if (document.format !== void 0 && document.format !== "yaml" && document.format !== "json") fail("DOCUMENT_METADATA_INVALID", "Document formats must be yaml or json.");
    return Object.freeze({
      reference: Object.freeze({ providerId: provider.id, documentId }),
      filename: document.filename,
      ...document.format === void 0 ? {} : { format: document.format },
      ...document.representations === void 0 ? {} : { representations: representations(document.representations) },
      ...document.activeRepresentation === void 0 ? {} : { activeRepresentation: identifier(document.activeRepresentation, "active representation") },
      ...document.docsURL === void 0 ? {} : { docsURL: normalizeDocsURL(document.docsURL) },
      ...document.available === void 0 ? {} : { available: document.available },
      ...document.reason === void 0 ? {} : { reason: document.reason },
      ...document.schema === void 0 ? {} : { schema: normalizeSourceDocumentSchema(document.schema) }
    });
  });
};
function createProviderRegistry() {
  const entries = /* @__PURE__ */ new Map();
  const listeners = /* @__PURE__ */ new Set();
  let disposed = false;
  const active = () => {
    if (disposed) fail("REGISTRY_DISPOSED", "The document registry is closed.");
  };
  const notify = () => {
    for (const listener of [...listeners]) {
      try {
        listener();
      } catch {
      }
    }
  };
  const cleanup = (entry) => {
    const failures = [];
    try {
      entry.unsubscribe?.();
    } catch (error) {
      failures.push(error);
    }
    for (const adapter of [...entry.adapters]) {
      try {
        adapter.dispose();
      } catch (error) {
        failures.push(error);
      }
    }
    try {
      entry.provider.dispose?.();
    } catch (error) {
      failures.push(error);
    }
    if (failures.length) throw new AggregateError(failures, "Some document resources could not be released.");
  };
  const registry = {
    apiVersion: 1,
    sourceDocumentApiVersion: 1,
    get disposed() {
      return disposed;
    },
    register(provider) {
      active();
      if (!provider || typeof provider.list !== "function" || typeof provider.open !== "function" || provider.dispose !== void 0 && typeof provider.dispose !== "function" || provider.subscribe !== void 0 && typeof provider.subscribe !== "function") fail("PROVIDER_INVALID", "A document provider is required.");
      const id = identifier(provider.id, "providerId");
      if (entries.has(id)) fail("PROVIDER_DUPLICATE", `A provider is already registered: ${id}`);
      const opcodes = provider.hatOpcodes ?? [];
      if (!Array.isArray(opcodes)) fail("PROVIDER_INVALID", "Known hat opcodes must be an array.");
      const known = Object.freeze([...new Set(opcodes.map((opcode) => identifier(opcode, "hat opcode")))]);
      const captured = {
        id,
        list: provider.list.bind(provider),
        open: provider.open.bind(provider),
        ...provider.dispose ? { dispose: provider.dispose.bind(provider) } : {}
      };
      documentsFor(captured);
      const entry = { provider: captured, opcodes: known, adapters: /* @__PURE__ */ new Set(), unsubscribe: null };
      entries.set(id, entry);
      try {
        if (provider.subscribe) {
          entry.unsubscribe = provider.subscribe(() => {
            if (entries.get(id) === entry) notify();
          });
          if (typeof entry.unsubscribe !== "function") fail("PROVIDER_INVALID", "Provider subscriptions must return an unsubscribe function.");
        }
      } catch (error) {
        entries.delete(id);
        throw error;
      }
      notify();
      let registered = true;
      return () => {
        if (!registered || entries.get(id) !== entry) return;
        registered = false;
        entries.delete(id);
        try {
          cleanup(entry);
        } finally {
          notify();
        }
      };
    },
    list() {
      active();
      return Object.freeze([...entries.values()].flatMap((entry) => documentsFor(entry.provider)));
    },
    getHatOpcodes() {
      active();
      return Object.freeze([...new Set([...entries.values()].flatMap((entry) => entry.opcodes))]);
    },
    open(value) {
      active();
      const ref = reference(value);
      const entry = entries.get(ref.providerId);
      if (!entry) fail("PROVIDER_UNKNOWN", `No document provider is registered: ${ref.providerId}`);
      const metadata = documentsFor(entry.provider).find((document) => document.reference.documentId === ref.documentId);
      if (!metadata) fail("DOCUMENT_UNKNOWN", `The provider does not contain this document: ${ref.documentId}`);
      if (metadata.available === false) fail("DOCUMENT_UNAVAILABLE", metadata.reason || "The embedded YAML document is unavailable.");
      const adapter = entry.provider.open(ref.documentId);
      if (!validAdapter(adapter) || adapter.previewRepresentation !== void 0 && typeof adapter.previewRepresentation !== "function" || typeof adapter.prepareRepresentation === "function" !== (typeof adapter.commitRepresentation === "function")) {
        adapter?.dispose?.();
        fail("DOCUMENT_ADAPTER_INVALID", "The provider did not return a document adapter.");
      }
      let closed = false;
      const ensure = () => {
        if (closed || disposed || entries.get(ref.providerId) !== entry) fail("DOCUMENT_CLOSED", "The document editing session is closed.");
      };
      const wrapped = Object.freeze({
        inspect() {
          if (closed || disposed || entries.get(ref.providerId) !== entry) return { available: false, code: "DOCUMENT_CLOSED", reason: "The document editing session is closed." };
          return adapter.inspect();
        },
        capture() {
          ensure();
          return adapter.capture();
        },
        async prepare(snapshot, source) {
          ensure();
          const prepared = await adapter.prepare(snapshot, source);
          ensure();
          return prepared;
        },
        async commit(snapshot, prepared) {
          ensure();
          return adapter.commit(snapshot, prepared);
        },
        ...typeof adapter.previewRepresentation === "function" ? {
          async previewRepresentation(snapshot, request) {
            ensure();
            const kind = identifier(request?.kind, "preview representation kind");
            const model = await adapter.previewRepresentation(snapshot, Object.freeze({ kind }));
            ensure();
            return normalizeSourceDocumentPreview(model, kind);
          }
        } : {},
        ...typeof adapter.prepareRepresentation === "function" ? {
          async prepareRepresentation(snapshot, request) {
            ensure();
            const option = metadata.representations?.find((item) => item.kind === request?.kind);
            const activeKind = metadata.activeRepresentation || "source";
            const permitted = request?.direction === "from-source" ? activeKind === "source" ? option?.fromSource : option?.fromRepresentations?.includes(activeKind) : request?.direction === "to-source" ? option?.toSource : false;
            if (!option || !permitted) fail("DOCUMENT_REPRESENTATION_UNKNOWN", "This representation conversion is not supported.");
            if (option.available === false) fail("DOCUMENT_REPRESENTATION_UNAVAILABLE", option.reason || "This representation is unavailable.");
            const candidate = await adapter.prepareRepresentation(snapshot, request);
            ensure();
            return candidate;
          },
          async commitRepresentation(snapshot, candidate) {
            ensure();
            return adapter.commitRepresentation(snapshot, candidate);
          }
        } : {},
        dispose() {
          if (closed) return;
          closed = true;
          entry.adapters.delete(wrapped);
          adapter.dispose();
        }
      });
      entry.adapters.add(wrapped);
      return wrapped;
    },
    subscribe(listener) {
      active();
      if (typeof listener !== "function") fail("REGISTRY_LISTENER_INVALID", "A change listener must be a function.");
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      const previous = [...entries.values()];
      entries.clear();
      const failures = [];
      for (const entry of previous) {
        try {
          cleanup(entry);
        } catch (error) {
          failures.push(error);
        }
      }
      notify();
      listeners.clear();
      if (failures.length) throw new AggregateError(failures, "Some providers could not be released.");
    }
  };
  return Object.freeze(registry);
}
function getProviderRegistry(scope) {
  if ((typeof scope !== "object" || scope === null) && typeof scope !== "function") fail("REGISTRY_SCOPE_INVALID", "A runtime-local scope object is required.");
  const previous = Object.getOwnPropertyDescriptor(scope, providerRegistrySymbol);
  if (previous) {
    if (!Object.hasOwn(previous, "value")) fail("REGISTRY_SCOPE_INVALID", "The registry slot cannot be an accessor.");
    const registry2 = previous.value;
    if (registry2?.apiVersion !== 1 || registry2.sourceDocumentApiVersion !== 1 || typeof registry2.register !== "function" || typeof registry2.open !== "function") throw new SourceDocumentError("REGISTRY_INCOMPATIBLE", "An incompatible registry occupies this scope.");
    if (!registry2.disposed) return registry2;
  }
  const registry = createProviderRegistry();
  Object.defineProperty(scope, providerRegistrySymbol, { value: registry, enumerable: false, writable: false, configurable: true });
  return registry;
}

// src/document-tree/registry.js
var documentTreeRegistrySymbol = /* @__PURE__ */ Symbol.for("@kubohiroya/turbowarp-document-data/document-tree-registry/v1");
var documentTreeErrorCodes = Object.freeze([
  "DOCUMENT_TREE_UNAVAILABLE",
  "DOCUMENT_NOT_FOUND",
  "INVALID_LOCATION",
  "LOCATION_NOT_FOUND",
  "DOCUMENT_LIMIT_EXCEEDED",
  "DOCUMENT_TREE_OPTIONS_INVALID",
  "DOCUMENT_TREE_PROVIDER_INVALID",
  "REGISTRY_SCOPE_INVALID",
  "REGISTRY_INCOMPATIBLE"
]);
var DocumentTreeError = class extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "DocumentTreeError";
    this.code = code;
  }
};
var fail2 = (code, message) => {
  throw new DocumentTreeError(code, message);
};
var isLimit = (value) => Number.isSafeInteger(value) && value >= 0;
var captureOptions = (options) => {
  if (typeof options !== "object" || options === null) fail2("DOCUMENT_TREE_OPTIONS_INVALID", "Capture options are required.");
  const { location, positions = false, limits } = options;
  if (typeof location !== "string") fail2("INVALID_LOCATION", "A document location must be text.");
  if (typeof positions !== "boolean") fail2("DOCUMENT_TREE_OPTIONS_INVALID", "positions must be true or false.");
  if (typeof limits !== "object" || limits === null || !isLimit(limits.maxDepth) || !isLimit(limits.maxNodes)) {
    fail2("DOCUMENT_TREE_OPTIONS_INVALID", "limits.maxDepth and limits.maxNodes must be non-negative integers.");
  }
  return Object.freeze({ location, positions, limits: Object.freeze({ maxDepth: limits.maxDepth, maxNodes: limits.maxNodes }) });
};
var captureResult = (result) => {
  if (typeof result !== "object" || result === null || result.kind !== "html" && result.kind !== "markdown" || typeof result.revision !== "string" || typeof result.root !== "object" || result.root === null || Array.isArray(result.root)) {
    fail2("DOCUMENT_TREE_PROVIDER_INVALID", "The document tree provider returned an invalid capture.");
  }
  return { kind: result.kind, revision: result.revision, root: result.root };
};
function createDocumentTreeRegistry() {
  const entries = [];
  return Object.freeze({
    apiVersion: 1,
    register(provider) {
      if (!provider || typeof provider.capture !== "function") fail2("DOCUMENT_TREE_PROVIDER_INVALID", "A document tree provider with capture() is required.");
      const entry = Object.freeze({ capture: provider.capture.bind(provider) });
      entries.push(entry);
      let registered = true;
      return () => {
        if (!registered) return;
        registered = false;
        const index = entries.indexOf(entry);
        if (index >= 0) entries.splice(index, 1);
      };
    },
    capture(target, name, options) {
      const normalized = captureOptions(options);
      const entry = entries.at(-1);
      if (!entry) fail2("DOCUMENT_TREE_UNAVAILABLE", "Document Data is not loaded with DOCUMENT_DATA_MVP enabled.");
      return captureResult(entry.capture(target, name, normalized));
    }
  });
}
function getDocumentTreeRegistry(scope) {
  if ((typeof scope !== "object" || scope === null) && typeof scope !== "function") fail2("REGISTRY_SCOPE_INVALID", "A runtime-local scope object is required.");
  const previous = Object.getOwnPropertyDescriptor(scope, documentTreeRegistrySymbol);
  if (previous) {
    if (!Object.hasOwn(previous, "value")) fail2("REGISTRY_SCOPE_INVALID", "The registry slot cannot be an accessor.");
    const registry2 = previous.value;
    if (registry2?.apiVersion !== 1 || typeof registry2.register !== "function" || typeof registry2.capture !== "function") fail2("REGISTRY_INCOMPATIBLE", "An incompatible document tree registry occupies this scope.");
    return registry2;
  }
  const registry = createDocumentTreeRegistry();
  Object.defineProperty(scope, documentTreeRegistrySymbol, { value: registry, enumerable: false, writable: false, configurable: true });
  return registry;
}
export {
  DocumentTreeError,
  SourceDocumentError as EmbeddedYamlError,
  SourceDocumentError,
  createDocumentTreeRegistry,
  createProviderRegistry,
  createProviderRegistry as createSourceDocumentRegistry,
  decodeSourceDocumentReference as decodeReference,
  decodeSourceDocumentReference,
  documentTreeErrorCodes,
  documentTreeRegistrySymbol,
  sourceDocumentSchemaLimits as embeddedYamlSchemaLimits,
  encodeSourceDocumentReference as encodeReference,
  encodeSourceDocumentReference,
  getDocumentTreeRegistry,
  getProviderRegistry,
  getProviderRegistry as getSourceDocumentRegistry,
  normalizeSourceDocumentSchema as normalizeSchemaMetadata,
  normalizeSourceDocumentPreview,
  normalizeSourceDocumentSchema,
  sourceDocumentRegistrySymbol as providerRegistrySymbol,
  sourceDocumentRegistrySymbol,
  sourceDocumentSchemaLimits
};

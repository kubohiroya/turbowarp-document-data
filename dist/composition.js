// src/source-document/reference.js
var PREFIX = "tw-embedded-yaml:1:";
var SourceDocumentError = class extends Error {
  constructor(code, message) {
    super(message);
    this.name = "SourceDocumentError";
    this.code = code;
  }
};
var fail = (code, message) => {
  throw new SourceDocumentError(code, message);
};
var hasControlCharacters = (value) => Array.from(value).some((character) => {
  const code = character.codePointAt(0);
  return code < 32 || code === 127;
});
var identifier = (value, name) => {
  if (typeof value !== "string" || !value.length || value.length > 1024 || hasControlCharacters(value)) {
    fail("REFERENCE_INVALID", `${name} must be a bounded nonempty identifier.`);
  }
  return value;
};
function encodeSourceDocumentReference(reference2) {
  if (!reference2 || typeof reference2 !== "object") fail("REFERENCE_INVALID", "A document reference is required.");
  const providerId = identifier(reference2.providerId, "providerId");
  const documentId = identifier(reference2.documentId, "documentId");
  try {
    return `${PREFIX}${encodeURIComponent(providerId)}:${encodeURIComponent(documentId)}`;
  } catch {
    return fail("REFERENCE_INVALID", "The reference contains invalid Unicode.");
  }
}
function decodeSourceDocumentReference(value) {
  if (typeof value !== "string" || value.length > 8192 || !value.startsWith(PREFIX)) fail("REFERENCE_INVALID", "The block does not contain a valid source document reference.");
  const parts = value.slice(PREFIX.length).split(":");
  if (parts.length !== 2) fail("REFERENCE_INVALID", "The source document reference is malformed.");
  let reference2;
  try {
    reference2 = { providerId: decodeURIComponent(parts[0]), documentId: decodeURIComponent(parts[1]) };
  } catch {
    return fail("REFERENCE_INVALID", "The source document reference encoding is invalid.");
  }
  if (encodeSourceDocumentReference(reference2) !== value) fail("REFERENCE_INVALID", "The source document reference is not canonical.");
  return Object.freeze(reference2);
}

// src/source-document/schema.js
var sourceDocumentSchemaLimits = Object.freeze({ maxBytes: 1024 * 1024, maxDepth: 64, maxNodes: 1e5 });
function normalizeSourceDocumentSchema(metadata) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) fail("SCHEMA_INVALID", "Inline schema metadata must be an object.");
  const properties = Object.getOwnPropertyDescriptors(metadata);
  if (!properties.id || !Object.hasOwn(properties.id, "value") || !properties.schema || !Object.hasOwn(properties.schema, "value") || Object.keys(properties).some((key) => key !== "id" && key !== "schema")) fail("SCHEMA_INVALID", "Inline schema metadata requires only id and schema.");
  const id = identifier(properties.id.value, "schema id");
  const root = properties.schema.value;
  if (!root || typeof root !== "object" || Array.isArray(root)) fail("SCHEMA_INVALID", "An inline JSON Schema object is required.");
  const path = /* @__PURE__ */ new Set();
  let nodes = 0, characters = 0;
  const clone = (value, depth) => {
    if (++nodes > sourceDocumentSchemaLimits.maxNodes || depth > sourceDocumentSchemaLimits.maxDepth) fail("SCHEMA_LIMIT", "The inline schema is too deeply nested or has too many values.");
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "number") {
      if (!Number.isFinite(value)) fail("SCHEMA_INVALID", "Schema numbers must be finite.");
      return value;
    }
    if (typeof value === "string") {
      characters += value.length;
      if (characters > sourceDocumentSchemaLimits.maxBytes) fail("SCHEMA_LIMIT", "The inline schema exceeds its size limit.");
      return value;
    }
    if (!value || typeof value !== "object") fail("SCHEMA_INVALID", "Schemas must contain only JSON values.");
    if (path.has(value)) fail("SCHEMA_INVALID", "Cyclic schema payloads are unsupported.");
    if (Object.getOwnPropertySymbols(value).length) fail("SCHEMA_INVALID", "Schemas cannot contain symbol properties.");
    const prototype = Object.getPrototypeOf(value);
    if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) fail("SCHEMA_INVALID", "Schemas must use plain JSON objects.");
    path.add(value);
    const result2 = Array.isArray(value) ? [] : {};
    const properties2 = Object.getOwnPropertyDescriptors(value);
    if (Array.isArray(value) && (value.length > sourceDocumentSchemaLimits.maxNodes || Object.keys(properties2).filter((key) => key !== "length").some((key, index) => key !== String(index)) || Object.keys(properties2).length !== value.length + 1)) fail("SCHEMA_INVALID", "Schema arrays must not contain holes or custom properties.");
    for (const [key, property] of Object.entries(properties2)) {
      if (Array.isArray(value) && key === "length") continue;
      if (!Object.hasOwn(property, "value") || !property.enumerable) fail("SCHEMA_INVALID", "Schema payloads cannot contain accessors or hidden properties.");
      characters += key.length;
      if (characters > sourceDocumentSchemaLimits.maxBytes) fail("SCHEMA_LIMIT", "The inline schema exceeds its size limit.");
      Object.defineProperty(result2, key, { value: clone(property.value, depth + 1), enumerable: true, writable: false, configurable: false });
    }
    path.delete(value);
    return Object.freeze(result2);
  };
  const schema = clone(root, 0);
  const result = Object.freeze({ id, schema });
  if (new globalThis.TextEncoder().encode(JSON.stringify(result)).byteLength > sourceDocumentSchemaLimits.maxBytes) fail("SCHEMA_LIMIT", "The inline schema exceeds its UTF-8 size limit.");
  return result;
}

// src/source-document/preview.js
var fail2 = (message) => {
  throw new SourceDocumentError("DOCUMENT_PREVIEW_INVALID", message);
};
var plain = (value) => value && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function normalizeSourceDocumentPreview(model, requestedKind) {
  identifier(requestedKind, "preview representation kind");
  if (!plain(model)) fail2("A declarative document preview is required.");
  const allowed = /* @__PURE__ */ new Set(["kind", "source", "blocks", "rootIds", "blockDefinitions", "menus"]);
  if (Object.keys(model).some((key) => !allowed.has(key))) fail2("A preview cannot contain project, archive or asset payloads.");
  const ancestors = /* @__PURE__ */ new Set();
  let nodes = 0, bytes = 0;
  const copy = (value, depth = 0) => {
    if (++nodes > 5e5 || depth > 80) fail2("The document preview exceeds its structural limit.");
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "number") {
      if (!Number.isFinite(value)) fail2("Preview numbers must be finite.");
      return value;
    }
    if (typeof value === "string") {
      bytes += new TextEncoder().encode(value).byteLength;
      if (bytes > 8 * 1024 * 1024) fail2("The document preview exceeds its byte limit.");
      return value;
    }
    if (!value || typeof value !== "object" || ancestors.has(value) || !Array.isArray(value) && !plain(value)) fail2("Preview data must be finite plain JSON without callbacks.");
    if (Object.getOwnPropertySymbols(value).length) fail2("Preview JSON cannot contain symbols.");
    const properties = Object.getOwnPropertyDescriptors(value), array = Array.isArray(value), result2 = array ? [] : {};
    if (array && (!Number.isSafeInteger(value.length) || Object.keys(properties).length !== value.length + 1)) fail2("Preview arrays cannot contain holes or custom fields.");
    ancestors.add(value);
    for (const [key, descriptor] of Object.entries(properties)) {
      if (array && key === "length") continue;
      if (!Object.hasOwn(descriptor, "value") || !descriptor.enumerable) fail2("Preview JSON cannot contain accessors or hidden fields.");
      bytes += new TextEncoder().encode(key).byteLength;
      if (bytes > 8 * 1024 * 1024) fail2("The document preview exceeds its byte limit.");
      Object.defineProperty(result2, key, { value: copy(descriptor.value, depth + 1), enumerable: true });
    }
    ancestors.delete(value);
    return Object.freeze(result2);
  };
  const result = copy(model);
  if (result.kind !== requestedKind || typeof result.source !== "string") fail2("A preview must identify the requested kind and its source.");
  if (result.blocks !== void 0 && (!plain(result.blocks) || Object.keys(result.blocks).length > 1e5 || Object.values(result.blocks).some((block) => !plain(block) || typeof block.opcode !== "string"))) fail2("Preview blocks must be a bounded serialized block dictionary.");
  if (result.rootIds !== void 0 && (!Array.isArray(result.rootIds) || result.rootIds.length > 256 || new Set(result.rootIds).size !== result.rootIds.length || result.rootIds.some((id) => typeof id !== "string" || !Object.hasOwn(result.blocks || {}, id)))) fail2("Preview roots must identify distinct included blocks.");
  if (result.blockDefinitions !== void 0) {
    if (!Array.isArray(result.blockDefinitions) || result.blockDefinitions.length > 4096) fail2("Preview block definitions must be a bounded array.");
    const seen = /* @__PURE__ */ new Set();
    for (const definition of result.blockDefinitions) {
      if (!plain(definition) || typeof definition.opcode !== "string" || !definition.opcode || definition.opcode.length > 1024 || seen.has(definition.opcode) || typeof definition.blockType !== "string" || !(typeof definition.text === "string" || Array.isArray(definition.text) && definition.text.every((text) => typeof text === "string"))) fail2("Preview definitions require distinct full opcodes and declarative labels.");
      if (definition.blockIconURI !== void 0) {
        if (typeof definition.blockIconURI !== "string") fail2("A preview block icon must be an image URI.");
        let uri;
        try {
          uri = new URL(definition.blockIconURI, "https://preview.invalid/");
        } catch {
          fail2("A preview block icon URI is invalid.");
        }
        if (!["http:", "https:", "data:"].includes(uri.protocol) || uri.protocol === "data:" && !/^data:image\//iu.test(definition.blockIconURI)) fail2("A preview cannot include executable icon URIs.");
      }
      seen.add(definition.opcode);
    }
  }
  if (result.menus !== void 0 && (!plain(result.menus) || Object.values(result.menus).some((menu) => !plain(menu) || !Array.isArray(menu.items)))) fail2("Preview menus must contain static item arrays.");
  if (new TextEncoder().encode(JSON.stringify(result)).byteLength > 8 * 1024 * 1024) fail2("The serialized preview exceeds its byte limit.");
  return result;
}

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
var providerRegistrySymbol = /* @__PURE__ */ Symbol.for("@kubohiroya/turbowarp-embedded-yaml/provider-registry/v1");
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
var fail3 = (code, message) => {
  throw new DocumentTreeError(code, message);
};
var isLimit = (value) => Number.isSafeInteger(value) && value >= 0;
var captureOptions = (options) => {
  if (typeof options !== "object" || options === null) fail3("DOCUMENT_TREE_OPTIONS_INVALID", "Capture options are required.");
  const { location, positions = false, limits } = options;
  if (typeof location !== "string") fail3("INVALID_LOCATION", "A document location must be text.");
  if (typeof positions !== "boolean") fail3("DOCUMENT_TREE_OPTIONS_INVALID", "positions must be true or false.");
  if (typeof limits !== "object" || limits === null || !isLimit(limits.maxDepth) || !isLimit(limits.maxNodes)) {
    fail3("DOCUMENT_TREE_OPTIONS_INVALID", "limits.maxDepth and limits.maxNodes must be non-negative integers.");
  }
  return Object.freeze({ location, positions, limits: Object.freeze({ maxDepth: limits.maxDepth, maxNodes: limits.maxNodes }) });
};
var captureResult = (result) => {
  if (typeof result !== "object" || result === null || result.kind !== "html" && result.kind !== "markdown" || typeof result.revision !== "string" || typeof result.root !== "object" || result.root === null || Array.isArray(result.root)) {
    fail3("DOCUMENT_TREE_PROVIDER_INVALID", "The document tree provider returned an invalid capture.");
  }
  return { kind: result.kind, revision: result.revision, root: result.root };
};
function createDocumentTreeRegistry() {
  const entries = [];
  return Object.freeze({
    apiVersion: 1,
    register(provider) {
      if (!provider || typeof provider.capture !== "function") fail3("DOCUMENT_TREE_PROVIDER_INVALID", "A document tree provider with capture() is required.");
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
      if (!entry) fail3("DOCUMENT_TREE_UNAVAILABLE", "Document Data is not loaded with DOCUMENT_DATA_MVP enabled.");
      return captureResult(entry.capture(target, name, normalized));
    }
  });
}
function getDocumentTreeRegistry(scope) {
  if ((typeof scope !== "object" || scope === null) && typeof scope !== "function") fail3("REGISTRY_SCOPE_INVALID", "A runtime-local scope object is required.");
  const previous = Object.getOwnPropertyDescriptor(scope, documentTreeRegistrySymbol);
  if (previous) {
    if (!Object.hasOwn(previous, "value")) fail3("REGISTRY_SCOPE_INVALID", "The registry slot cannot be an accessor.");
    const registry2 = previous.value;
    if (registry2?.apiVersion !== 1 || typeof registry2.register !== "function" || typeof registry2.capture !== "function") fail3("REGISTRY_INCOMPATIBLE", "An incompatible document tree registry occupies this scope.");
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
  providerRegistrySymbol,
  providerRegistrySymbol as sourceDocumentRegistrySymbol,
  sourceDocumentSchemaLimits
};

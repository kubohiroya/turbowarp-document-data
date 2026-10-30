// src/source-document/reference.js
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

// src/source-documents.js
import { parseValue } from "@kubohiroya/turbowarp-yaml-json/codec";
import { validateValueWithJsonSchema } from "@kubohiroya/turbowarp-yaml-json/schema";
import { SourceDocumentError as SourceDocumentError2, normalizeSourceDocumentSchema } from "./composition.js";
var sourceDocumentStorageId = "kubohiroyadocumentdata";
var MAX_DOCUMENTS = 256;
var MAX_TOTAL_BYTES = 4 * 1024 * 1024;
var copy = (value) => JSON.parse(JSON.stringify(value));
var record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var freeze = (value) => {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
var failure = (code, message) => {
  throw new SourceDocumentError2(code, message);
};
var normalizeDocsURL2 = (value) => {
  try {
    return normalizeDocsURL(value);
  } catch (error) {
    return failure(error.code || "DOCUMENT_METADATA_INVALID", error.message);
  }
};
var bounded = (value, name) => {
  if (typeof value !== "string" || !value.length || value.length > 1024 || Array.from(value).some((character) => {
    const code = character.codePointAt(0);
    return code < 32 || code === 127;
  })) failure("DOCUMENT_INVALID", `${name} must be bounded nonempty text.`);
  return value;
};
var normalize = (input, revision) => {
  if (!record(input)) failure("DOCUMENT_INVALID", "A source document record is required.");
  const id = bounded(input.id, "document ID"), filename = bounded(input.filename, "filename");
  if (input.format !== "yaml" && input.format !== "json") failure("DOCUMENT_FORMAT", "A source document must be YAML or JSON.");
  if (typeof input.source !== "string") failure("DOCUMENT_INVALID", "The source must be raw text.");
  if (typeof revision !== "string" || !/^[1-9][0-9]{0,14}$/u.test(revision) || !Number.isSafeInteger(Number(revision))) failure("DOCUMENT_INVALID", "A document revision must be a positive counter.");
  return freeze({
    id,
    filename,
    format: input.format,
    source: input.source,
    revision,
    ...input.schema === void 0 ? {} : { schema: normalizeSourceDocumentSchema(input.schema) },
    ...input.docsURL === void 0 ? {} : { docsURL: normalizeDocsURL2(input.docsURL) }
  });
};
var validate = (document) => {
  const parsed = parseValue(document.source, document.format);
  if (!parsed.success) failure("DOCUMENT_SOURCE_INVALID", parsed.diagnostic?.message || "Invalid source document.");
  if (document.schema) {
    const declared = document.schema.schema.$schema;
    const dialect = typeof declared === "string" && /^https?:\/\/json-schema\.org\/draft-07\/schema#?$/u.test(declared) ? "draft-07" : "2020-12";
    const result = validateValueWithJsonSchema(document.schema.schema, parsed.value, { dialect });
    if (!result.valid) failure("DOCUMENT_SCHEMA_INVALID", result.errors.join("\n") || "The source does not match its JSON Schema.");
  }
};
var originalTargets = (runtime) => (runtime.targets || []).filter((target) => target.isOriginal !== false);
var sameTargets = (saved, runtime) => {
  const now = originalTargets(runtime);
  return saved.length === now.length && saved.every((target, index) => target === now[index]);
};
function createSourceDocumentStore(vm) {
  const runtime = vm?.runtime;
  if (!runtime || !record(runtime.extensionStorage) || typeof runtime.emitProjectChanged !== "function") failure("VM_UNAVAILABLE", "A writable VM extension storage is required.");
  const listeners = /* @__PURE__ */ new Set();
  let generation = 0, disposed = false, writing = false;
  const notify = () => {
    for (const listener of [...listeners]) {
      try {
        listener();
      } catch {
      }
    }
  };
  const loaded = () => {
    generation++;
    notify();
  };
  runtime.on?.("PROJECT_LOADED", loaded);
  runtime.on?.("RUNTIME_DISPOSED", loaded);
  const projectChanged = () => {
    if (!writing) notify();
  };
  runtime.on?.("PROJECT_CHANGED", projectChanged);
  const active = () => {
    if (disposed) failure("DOCUMENT_CLOSED", "The source document store is closed.");
    if (vm.runtime !== runtime) failure("PROJECT_CONFLICT", "The project changed.");
  };
  const state = () => {
    active();
    const storage = runtime.extensionStorage;
    if (!record(storage)) failure("DOCUMENT_STORAGE_INVALID", "Extension storage is unavailable.");
    const owner = storage[sourceDocumentStorageId];
    if (owner === void 0) return { storage, owner: null, documents: null };
    if (!record(owner) || owner.formatVersion !== 1 || !record(owner.documents)) failure("DOCUMENT_STORAGE_INVALID", "Unsupported source document storage.");
    const entries = Object.entries(owner.documents);
    if (entries.length > MAX_DOCUMENTS) failure("DOCUMENT_LIMIT", "Too many source documents.");
    let total = 0;
    for (const [id, document] of entries) {
      const normalized = normalize(document, document?.revision);
      if (normalized.id !== id) failure("DOCUMENT_STORAGE_INVALID", "A stored document ID does not match its key.");
      total += new globalThis.TextEncoder().encode(normalized.source).byteLength;
    }
    if (total > MAX_TOTAL_BYTES) failure("DOCUMENT_LIMIT", "Source documents exceed their total size limit.");
    return { storage, owner, documents: owner.documents };
  };
  const changed = () => {
    writing = true;
    try {
      runtime.emitProjectChanged();
    } catch {
    } finally {
      writing = false;
    }
    notify();
  };
  const read = (id) => {
    bounded(id, "document ID");
    const current = state();
    if (!current.documents || !Object.hasOwn(current.documents, id)) failure("DOCUMENT_UNKNOWN", `No source document exists: ${id}`);
    const raw = current.documents[id];
    return { current, raw, document: normalize(raw, raw.revision) };
  };
  const write = (document) => {
    const current = state();
    const old = current.documents && Object.hasOwn(current.documents, document.id) ? current.documents[document.id] : null;
    if (old && JSON.stringify(normalize(old, document.revision)) === JSON.stringify(document)) return normalize(old, old.revision);
    const prospective = { ...current.documents || {} };
    Object.defineProperty(prospective, document.id, { value: document, enumerable: true, configurable: true, writable: true });
    if (Object.keys(prospective).length > MAX_DOCUMENTS || Object.values(prospective).reduce((bytes, item) => bytes + new globalThis.TextEncoder().encode(item.source).length, 0) > MAX_TOTAL_BYTES) failure("DOCUMENT_LIMIT", "Source document storage limits would be exceeded.");
    if (!current.owner) current.storage[sourceDocumentStorageId] = { formatVersion: 1, documents: {} };
    const documents = current.owner?.documents || current.storage[sourceDocumentStorageId].documents;
    const descriptor = Object.getOwnPropertyDescriptor(documents, document.id);
    if (descriptor && (!Object.hasOwn(descriptor, "value") || !descriptor.writable)) failure("DOCUMENT_STORAGE_INVALID", "The document slot is not writable.");
    Object.defineProperty(documents, document.id, { value: copy(document), enumerable: true, configurable: true, writable: true });
    changed();
    return document;
  };
  const store = {
    list() {
      const current = state();
      return Object.freeze(Object.values(current.documents || {}).map((document) => normalize(document, document.revision)));
    },
    read(id) {
      return read(id).document;
    },
    put(input) {
      const current = state();
      const previous = current.documents && Object.hasOwn(current.documents, input?.id) ? current.documents[input.id] : null;
      const revision = String(previous ? Number(previous.revision) + 1 : 1);
      const document = normalize(input, revision);
      validate(document);
      return write(document);
    },
    remove(id) {
      bounded(id, "document ID");
      const current = state();
      if (!current.documents || !Object.hasOwn(current.documents, id)) return false;
      const descriptor = Object.getOwnPropertyDescriptor(current.documents, id);
      if (!descriptor?.configurable) failure("DOCUMENT_STORAGE_INVALID", "The document cannot be removed.");
      delete current.documents[id];
      changed();
      return true;
    },
    subscribe(listener) {
      active();
      if (typeof listener !== "function") failure("DOCUMENT_LISTENER_INVALID", "A listener is required.");
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      generation++;
      runtime.off?.("PROJECT_LOADED", loaded);
      runtime.off?.("RUNTIME_DISPOSED", loaded);
      runtime.off?.("PROJECT_CHANGED", projectChanged);
      listeners.clear();
    }
  };
  internals.set(store, { runtime, state, read, generation: () => generation, write, active });
  return Object.freeze(store);
}
var internals = /* @__PURE__ */ new WeakMap();
function createSourceDocumentProvider(vm) {
  const store = createSourceDocumentStore(vm), port = internals.get(store);
  const adapters = /* @__PURE__ */ new Set();
  let disposed = false;
  const open = (documentId) => {
    store.read(documentId);
    const snapshots = /* @__PURE__ */ new WeakMap(), candidates = /* @__PURE__ */ new WeakMap();
    let closed = false;
    const active = () => {
      if (closed || disposed) failure("DOCUMENT_CLOSED", "The source document is closed.");
      port.active();
    };
    const baseline = (snapshot) => {
      active();
      const saved = snapshots.get(snapshot);
      if (!saved) failure("DOCUMENT_CONFLICT", "Capture this document before preparing it.");
      const now = port.read(documentId);
      if (saved.generation !== port.generation() || saved.storage !== now.current.storage || saved.owner !== now.current.owner || saved.documents !== now.current.documents || saved.raw !== now.raw || saved.fingerprint !== JSON.stringify(now.raw) || !sameTargets(saved.targets, port.runtime)) failure("PROJECT_CONFLICT", "The document or project changed. Open the source again.");
      return now;
    };
    const adapter = Object.freeze({
      inspect() {
        try {
          active();
          store.read(documentId);
          return { available: true };
        } catch (error) {
          return { available: false, code: error.code, reason: error.message };
        }
      },
      capture() {
        active();
        const now = port.read(documentId);
        const snapshot = Object.freeze({ source: now.document.source, sourceName: now.document.filename });
        snapshots.set(snapshot, { ...now, ...now.current, generation: port.generation(), fingerprint: JSON.stringify(now.raw), targets: originalTargets(port.runtime) });
        return snapshot;
      },
      async prepare(snapshot, source) {
        const now = baseline(snapshot);
        const document = normalize({ ...now.document, source }, String(Number(now.document.revision) + 1));
        validate(document);
        baseline(snapshot);
        const prepared = Object.freeze({ source: document.source });
        candidates.set(prepared, { snapshot, document });
        return prepared;
      },
      async commit(snapshot, prepared) {
        const candidate = candidates.get(prepared);
        if (!candidate || candidate.snapshot !== snapshot) failure("DOCUMENT_CONFLICT", "Prepare this source before applying it.");
        baseline(snapshot);
        if (prepared.source === snapshot.source) {
          candidates.delete(prepared);
          return { source: prepared.source };
        }
        vm.stopAll?.();
        baseline(snapshot);
        port.write(candidate.document);
        candidates.delete(prepared);
        snapshots.delete(snapshot);
        return { source: prepared.source };
      },
      dispose() {
        if (closed) return;
        closed = true;
        adapters.delete(adapter);
      }
    });
    adapters.add(adapter);
    return adapter;
  };
  return Object.freeze({
    id: "document-data",
    hatOpcodes: Object.freeze(["kubohiroyadocumentdata_sourceDocument"]),
    list: () => store.list().map((document) => ({ documentId: document.id, filename: document.filename, format: document.format, ...document.schema ? { schema: document.schema } : {}, ...document.docsURL ? { docsURL: document.docsURL } : {} })),
    open,
    subscribe: (listener) => store.subscribe(listener),
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const adapter of [...adapters]) adapter.dispose();
      store.dispose();
    }
  });
}
export {
  createSourceDocumentProvider,
  createSourceDocumentStore,
  sourceDocumentStorageId
};

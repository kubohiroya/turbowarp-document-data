import {normalizeSchemaMetadata} from './schema.js';
import {decodeReference, encodeReference, identifier, fail, EmbeddedYamlError} from './reference.js';
export const providerRegistrySymbol = Symbol.for('@kubohiroya/turbowarp-embedded-yaml/provider-registry/v1');
const validAdapter = adapter => adapter && ['inspect', 'capture', 'prepare', 'commit', 'dispose'].every(name => typeof adapter[name] === 'function');
const reference = value => typeof value === 'string' ? decodeReference(value) : decodeReference(encodeReference(value));
const documentsFor = provider => {
    const documents = provider.list();
    if (!Array.isArray(documents)) fail('DOCUMENT_METADATA_INVALID', 'Provider document lists must be synchronous arrays.');
    const seen = new Set();
    return documents.map(document => {
        const documentId = identifier(document?.documentId, 'documentId');
        if (seen.has(documentId)) fail('DOCUMENT_DUPLICATE', `Duplicate document ID: ${documentId}`);
        seen.add(documentId);
        if (typeof document.filename !== 'string' || !document.filename.length || document.filename.length > 4096 || /[\u0000-\u001f\u007f]/u.test(document.filename)) fail('DOCUMENT_METADATA_INVALID', 'A bounded filename is required.');
        if (document.available !== undefined && typeof document.available !== 'boolean') fail('DOCUMENT_METADATA_INVALID', 'Document availability must be boolean.');
        if (document.reason !== undefined && typeof document.reason !== 'string') fail('DOCUMENT_METADATA_INVALID', 'Document reasons must be text.');
        return Object.freeze({reference: Object.freeze({providerId: provider.id, documentId}), filename: document.filename,
            ...(document.available === undefined ? {} : {available: document.available}), ...(document.reason === undefined ? {} : {reason: document.reason}),
            ...(document.schema === undefined ? {} : {schema: normalizeSchemaMetadata(document.schema)})});
    });
};
export function createProviderRegistry() {
    const entries = new Map();
    const listeners = new Set();
    let disposed = false;
    const active = () => { if (disposed) fail('REGISTRY_DISPOSED', 'The document registry is closed.'); };
    const notify = () => { for (const listener of [...listeners]) { try { listener(); } catch { /* Observers cannot undo a completed registration. */ } } };
    const cleanup = entry => {
        const failures = [];
        try { entry.unsubscribe?.(); } catch (error) { failures.push(error); }
        for (const adapter of [...entry.adapters]) { try { adapter.dispose(); } catch (error) { failures.push(error); } }
        try { entry.provider.dispose?.(); } catch (error) { failures.push(error); }
        if (failures.length) throw new AggregateError(failures, 'Some document resources could not be released.');
    };
    const registry = {
        apiVersion: 1,
        get disposed() { return disposed; },
        register(provider) {
            active();
            if (!provider || typeof provider.list !== 'function' || typeof provider.open !== 'function' ||
                (provider.dispose !== undefined && typeof provider.dispose !== 'function') ||
                (provider.subscribe !== undefined && typeof provider.subscribe !== 'function')) fail('PROVIDER_INVALID', 'A document provider is required.');
            const id = identifier(provider.id, 'providerId');
            if (entries.has(id)) fail('PROVIDER_DUPLICATE', `A provider is already registered: ${id}`);
            const opcodes = provider.hatOpcodes ?? [];
            if (!Array.isArray(opcodes)) fail('PROVIDER_INVALID', 'Known hat opcodes must be an array.');
            const known = Object.freeze([...new Set(opcodes.map(opcode => identifier(opcode, 'hat opcode')))]);
            // Keep the registration identity fixed even if the owner later mutates its object.
            const captured = {id, list: provider.list.bind(provider), open: provider.open.bind(provider),
                ...(provider.dispose ? {dispose: provider.dispose.bind(provider)} : {})};
            documentsFor(captured);
            const entry = {provider: captured, opcodes: known, adapters: new Set(), unsubscribe: null};
            entries.set(id, entry);
            try {
                if (provider.subscribe) {
                    entry.unsubscribe = provider.subscribe(() => { if (entries.get(id) === entry) notify(); });
                    if (typeof entry.unsubscribe !== 'function') fail('PROVIDER_INVALID', 'Provider subscriptions must return an unsubscribe function.');
                }
            } catch (error) { entries.delete(id); throw error; }
            notify();
            let registered = true;
            return () => {
                if (!registered || entries.get(id) !== entry) return;
                registered = false; entries.delete(id);
                try { cleanup(entry); } finally { notify(); }
            };
        },
        list() {
            active();
            return Object.freeze([...entries.values()].flatMap(entry => documentsFor(entry.provider)));
        },
        getHatOpcodes() {
            active();
            return Object.freeze([...new Set([...entries.values()].flatMap(entry => entry.opcodes))]);
        },
        open(value) {
            active();
            const ref = reference(value);
            const entry = entries.get(ref.providerId);
            if (!entry) fail('PROVIDER_UNKNOWN', `No document provider is registered: ${ref.providerId}`);
            const metadata = documentsFor(entry.provider).find(document => document.reference.documentId === ref.documentId);
            if (!metadata) fail('DOCUMENT_UNKNOWN', `The provider does not contain this document: ${ref.documentId}`);
            if (metadata.available === false) fail('DOCUMENT_UNAVAILABLE', metadata.reason || 'The embedded YAML document is unavailable.');
            const adapter = entry.provider.open(ref.documentId);
            if (!validAdapter(adapter)) { adapter?.dispose?.(); fail('DOCUMENT_ADAPTER_INVALID', 'The provider did not return a document adapter.'); }
            let closed = false;
            const ensure = () => { if (closed || disposed || entries.get(ref.providerId) !== entry) fail('DOCUMENT_CLOSED', 'The document editing session is closed.'); };
            const wrapped = Object.freeze({
                inspect() { if (closed || disposed || entries.get(ref.providerId) !== entry) return {available: false, code: 'DOCUMENT_CLOSED', reason: 'The document editing session is closed.'}; return adapter.inspect(); },
                capture() { ensure(); return adapter.capture(); },
                async prepare(snapshot, source) { ensure(); const prepared = await adapter.prepare(snapshot, source); ensure(); return prepared; },
                async commit(snapshot, prepared) { ensure(); return adapter.commit(snapshot, prepared); },
                dispose() { if (closed) return; closed = true; entry.adapters.delete(wrapped); adapter.dispose(); }
            });
            entry.adapters.add(wrapped);
            return wrapped;
        },
        subscribe(listener) {
            active();
            if (typeof listener !== 'function') fail('REGISTRY_LISTENER_INVALID', 'A change listener must be a function.');
            listeners.add(listener);
            return () => { listeners.delete(listener); };
        },
        dispose() {
            if (disposed) return;
            disposed = true;
            const previous = [...entries.values()]; entries.clear();
            const failures = [];
            for (const entry of previous) { try { cleanup(entry); } catch (error) { failures.push(error); } }
            notify(); listeners.clear();
            if (failures.length) throw new AggregateError(failures, 'Some providers could not be released.');
        }
    };
    return Object.freeze(registry);
}
/** Share a registry across independently bundled owners without importing the Editor or VM. */
export function getProviderRegistry(scope) {
    if ((typeof scope !== 'object' || scope === null) && typeof scope !== 'function') fail('REGISTRY_SCOPE_INVALID', 'A runtime-local scope object is required.');
    const previous = Object.getOwnPropertyDescriptor(scope, providerRegistrySymbol);
    if (previous) {
        if (!Object.hasOwn(previous, 'value')) fail('REGISTRY_SCOPE_INVALID', 'The registry slot cannot be an accessor.');
        const registry = previous.value;
        if (registry?.apiVersion !== 1 || typeof registry.register !== 'function' || typeof registry.open !== 'function') throw new EmbeddedYamlError('REGISTRY_INCOMPATIBLE', 'An incompatible registry occupies this scope.');
        if (!registry.disposed) return registry;
    }
    const registry = createProviderRegistry();
    Object.defineProperty(scope, providerRegistrySymbol, {value: registry, enumerable: false, writable: false, configurable: true});
    return registry;
}

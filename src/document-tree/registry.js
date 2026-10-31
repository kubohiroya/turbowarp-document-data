// Parser-free sharing of named HTML/Markdown document trees between unsandboxed extensions.
export const documentTreeRegistrySymbol = Symbol.for('@kubohiroya/turbowarp-document-data/document-tree-registry/v1');

export const documentTreeErrorCodes = Object.freeze([
    'DOCUMENT_TREE_UNAVAILABLE',
    'DOCUMENT_NOT_FOUND',
    'INVALID_LOCATION',
    'LOCATION_NOT_FOUND',
    'DOCUMENT_LIMIT_EXCEEDED',
    'DOCUMENT_TREE_OPTIONS_INVALID',
    'DOCUMENT_TREE_PROVIDER_INVALID',
    'REGISTRY_SCOPE_INVALID',
    'REGISTRY_INCOMPATIBLE'
]);

export class DocumentTreeError extends Error {
    constructor(code, message) { super(`${code}: ${message}`); this.name = 'DocumentTreeError'; this.code = code; }
}
const fail = (code, message) => { throw new DocumentTreeError(code, message); };

const isLimit = value => Number.isSafeInteger(value) && value >= 0;
const captureOptions = options => {
    if (typeof options !== 'object' || options === null) fail('DOCUMENT_TREE_OPTIONS_INVALID', 'Capture options are required.');
    const {location, positions = false, limits} = options;
    if (typeof location !== 'string') fail('INVALID_LOCATION', 'A document location must be text.');
    if (typeof positions !== 'boolean') fail('DOCUMENT_TREE_OPTIONS_INVALID', 'positions must be true or false.');
    if (typeof limits !== 'object' || limits === null || !isLimit(limits.maxDepth) || !isLimit(limits.maxNodes)) {
        fail('DOCUMENT_TREE_OPTIONS_INVALID', 'limits.maxDepth and limits.maxNodes must be non-negative integers.');
    }
    return Object.freeze({location, positions, limits: Object.freeze({maxDepth: limits.maxDepth, maxNodes: limits.maxNodes})});
};
const captureResult = result => {
    if (typeof result !== 'object' || result === null || (result.kind !== 'html' && result.kind !== 'markdown') ||
        typeof result.revision !== 'string' || typeof result.root !== 'object' || result.root === null || Array.isArray(result.root)) {
        fail('DOCUMENT_TREE_PROVIDER_INVALID', 'The document tree provider returned an invalid capture.');
    }
    return {kind: result.kind, revision: result.revision, root: result.root};
};

/** The registry only forwards captures; it never keeps trees or copies. */
export function createDocumentTreeRegistry() {
    // Newest registration answers, so a reloaded owner replaces a stale one without failing to load.
    const entries = [];
    return Object.freeze({
        apiVersion: 1,
        register(provider) {
            if (!provider || typeof provider.capture !== 'function') fail('DOCUMENT_TREE_PROVIDER_INVALID', 'A document tree provider with capture() is required.');
            const entry = Object.freeze({capture: provider.capture.bind(provider)});
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
            if (!entry) fail('DOCUMENT_TREE_UNAVAILABLE', 'Document Data is not loaded with DOCUMENT_DATA_MVP enabled.');
            return captureResult(entry.capture(target, name, normalized));
        }
    });
}

/** Share one registry per runtime scope (the VM) across independently bundled extensions. */
export function getDocumentTreeRegistry(scope) {
    if ((typeof scope !== 'object' || scope === null) && typeof scope !== 'function') fail('REGISTRY_SCOPE_INVALID', 'A runtime-local scope object is required.');
    const previous = Object.getOwnPropertyDescriptor(scope, documentTreeRegistrySymbol);
    if (previous) {
        if (!Object.hasOwn(previous, 'value')) fail('REGISTRY_SCOPE_INVALID', 'The registry slot cannot be an accessor.');
        const registry = previous.value;
        if (registry?.apiVersion !== 1 || typeof registry.register !== 'function' || typeof registry.capture !== 'function') fail('REGISTRY_INCOMPATIBLE', 'An incompatible document tree registry occupies this scope.');
        return registry;
    }
    const registry = createDocumentTreeRegistry();
    Object.defineProperty(scope, documentTreeRegistrySymbol, {value: registry, enumerable: false, writable: false, configurable: true});
    return registry;
}

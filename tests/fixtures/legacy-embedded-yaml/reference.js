const PREFIX = 'tw-embedded-yaml:1:';
export class EmbeddedYamlError extends Error {
    constructor(code, message) { super(message); this.name = 'EmbeddedYamlError'; this.code = code; }
}
export const fail = (code, message) => { throw new EmbeddedYamlError(code, message); };
export const identifier = (value, name) => {
    if (typeof value !== 'string' || !value.length || value.length > 1024 || /[\u0000-\u001f\u007f]/u.test(value)) {
        fail('REFERENCE_INVALID', `${name} must be a bounded nonempty identifier.`);
    }
    return value;
};
export function encodeReference(reference) {
    if (!reference || typeof reference !== 'object') fail('REFERENCE_INVALID', 'A document reference is required.');
    const providerId = identifier(reference.providerId, 'providerId');
    const documentId = identifier(reference.documentId, 'documentId');
    try { return `${PREFIX}${encodeURIComponent(providerId)}:${encodeURIComponent(documentId)}`; }
    catch { return fail('REFERENCE_INVALID', 'The reference contains invalid Unicode.'); }
}
export function decodeReference(value) {
    if (typeof value !== 'string' || value.length > 8192 || !value.startsWith(PREFIX)) fail('REFERENCE_INVALID', 'The block does not contain a valid embedded YAML reference.');
    const parts = value.slice(PREFIX.length).split(':');
    if (parts.length !== 2) fail('REFERENCE_INVALID', 'The embedded YAML reference is malformed.');
    let reference;
    try { reference = {providerId: decodeURIComponent(parts[0]), documentId: decodeURIComponent(parts[1])}; }
    catch { return fail('REFERENCE_INVALID', 'The embedded YAML reference encoding is invalid.'); }
    if (encodeReference(reference) !== value) fail('REFERENCE_INVALID', 'The embedded YAML reference is not canonical.');
    return Object.freeze(reference);
}
const fieldValue = field => Array.isArray(field) ? field[0] : field && typeof field === 'object' ? field.value : field;
const literalField = block => {
    if (typeof block?.getFieldValue === 'function') {
        const direct = block.getFieldValue('DOCUMENT');
        if (direct !== null && direct !== undefined) return direct;
    }
    if (block?.fields && Object.hasOwn(block.fields, 'DOCUMENT')) return fieldValue(block.fields.DOCUMENT);
    return undefined;
};
const shadowValue = shadow => {
    if (!shadow) fail('REFERENCE_INVALID', 'The document reference shadow is missing.');
    const isShadow = typeof shadow.isShadow === 'function' ? shadow.isShadow() : shadow.shadow === true;
    if (!isShadow) fail('REFERENCE_REPORTER', 'Document references cannot be supplied by reporters.');
    const direct = literalField(shadow);
    if (direct !== undefined) return direct;
    if (typeof shadow.getFieldValue === 'function') {
        const text = shadow.getFieldValue('TEXT');
        if (text !== null && text !== undefined) return text;
    }
    const fields = Object.values(shadow.fields || {});
    if (fields.length !== 1) fail('REFERENCE_INVALID', 'A literal document reference is required.');
    return fieldValue(fields[0]);
};
/** Read direct dropdown fields and legacy literal shadows without evaluating expressions. */
export function readReference(block, target) {
    const direct = literalField(block);
    if (direct !== undefined) return decodeReference(direct);
    if (typeof block?.getInputTargetBlock === 'function') return decodeReference(shadowValue(block.getInputTargetBlock('DOCUMENT')));
    const input = block?.inputs?.DOCUMENT;
    if (!input) fail('REFERENCE_INVALID', 'The block has no DOCUMENT reference.');
    if (Array.isArray(input)) {
        if (input[0] !== 1) fail('REFERENCE_REPORTER', 'Document references cannot be supplied by reporters.');
        if (Array.isArray(input[1]) && input[1][0] === 10) return decodeReference(input[1][1]);
    } else if (!input.shadow || input.block !== input.shadow) {
        fail('REFERENCE_REPORTER', 'Document references cannot be supplied by reporters.');
    }
    const id = Array.isArray(input) ? input[1] : input.shadow;
    const blocks = target?.blocks;
    const shadow = typeof blocks?.getBlock === 'function' ? blocks.getBlock(id) : blocks?.[id];
    return decodeReference(shadowValue(shadow));
}

import {fail, hasControlCharacters} from './reference.js';
export function normalizeDocsURL(value) {
  if (typeof value !== 'string' || value.length > 8192) fail('DOCUMENT_METADATA_INVALID', 'Document documentation must use an HTTPS URL.');
  let url;
  try {url = new globalThis.URL(value);} catch {return fail('DOCUMENT_METADATA_INVALID', 'Document documentation URL is invalid.');}
  if (url.protocol !== 'https:' || url.username || url.password || (hasControlCharacters(value) || value.includes(' '))) fail('DOCUMENT_METADATA_INVALID', 'Document documentation must use a fixed HTTPS URL without credentials.');
  return value;
}

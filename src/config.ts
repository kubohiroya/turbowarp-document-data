export const DOCUMENT_DATA_MVP_DEFAULT = false;

export function isDocumentDataMvpEnabled(
  source: {DOCUMENT_DATA_MVP?: unknown} = globalThis as {DOCUMENT_DATA_MVP?: unknown}
): boolean {
  const value = source.DOCUMENT_DATA_MVP;
  return value === undefined ? DOCUMENT_DATA_MVP_DEFAULT : value === true || value === 'true';
}

export const extensionConfig = {
  id: 'kubohiroyadocumentdata',
  slug: 'document-data',
  name: 'Document Data',
  description: 'Named HTML and Markdown document trees for TurboWarp and HTTP bodies.',
  author: 'Hiroya Kubo',
  license: 'MPL-2.0',
  unsandboxed: true,
  docsURI: 'https://kubohiroya.github.io/turbowarp-document-data/',
  blockIconURI:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3QgeD0iNCIgeT0iOCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE0IiByeD0iMyIgZmlsbD0iIzRDOTdGRiIvPjxyZWN0IHg9IjI2IiB5PSI4IiB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHJ4PSIzIiBmaWxsPSIjNTlDMDU5Ii8+PHJlY3QgeD0iMTUiIHk9IjI2IiB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHJ4PSIzIiBmaWxsPSIjRkZBQjE5Ii8+PC9zdmc+'
} as const;

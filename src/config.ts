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
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3QgeD0iNCIgeT0iOCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzhBNTVENyIvPjxwYXRoIGQ9Ik0xNyAxNGg5bDYgNnYxNGEyIDIgMCAwIDEtMiAySDE3YTIgMiAwIDAgMS0yLTJWMTZhMiAyIDAgMCAxIDItMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjYgMTR2Nmg2IiBmaWxsPSIjOEE1NUQ3Ii8+PHBhdGggZD0iTTE5IDI3aDEwTTE5IDMyaDciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhBNTVENyIgc3Ryb2tlLXdpZHRoPSIyLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=='
} as const;

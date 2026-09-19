# TurboWarp-Document-Data

[日本語](README.ja.md)

Named, target-local HTML and Markdown document trees for TurboWarp. This package was initialized from `turbowarp-extension-template` and integrates with the canonical `@kubohiroya/turbowarp-named-data` registry.

## What it does

It parses HTML with parse5 and Markdown into mdast, stores the typed tree under a name, supports minimal text inspection/replacement, and deterministically serializes the native format. A Named Data provider exposes UTF-8 HTML or Markdown response bodies without depending on an unpublished shared package.

This extension does **not** sanitize HTML, execute scripts, mount a browser DOM, or promise lossless conversion between HTML and Markdown. The existing `turbowarp-html` and `turbowarp-markdown` packages remain the fragment-construction APIs; this package owns parsed named-document lifecycle and body-provider behavior.

## Requirements and safety

- TurboWarp unsandboxed custom extension mode is required.
- `DOCUMENT_DATA_MVP` is fixed at startup and defaults to `false`.
- Source/output size, node count, and depth are bounded.
- Parse and edit operations replace a binding only after the complete new tree passes validation.
- Bindings and open body handles are released on `PROJECT_STOP_ALL`.

Build with `pnpm run build`, then load `dist/document-data.js`. Package example: `@kubohiroya/turbowarp-document-data@0.1.0`.

## Block reference

<!-- BEGIN GENERATED BLOCKS -->

### `parse HTML [TEXT] as document [NAME]`

Parse HTML into a target-local named document tree. This does not sanitize HTML.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `parseHtml` |
| `TEXT` | String, default: `<p>Hello</p>` |
| `NAME` | String, default: `page` |

### `parse Markdown [TEXT] as document [NAME]`

Parse Markdown into a target-local named syntax tree.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `parseMarkdown` |
| `TEXT` | String, default: `# Hello` |
| `NAME` | String, default: `page` |

### `document [NAME] exists?`

Report whether the current target has the named document.

| Property | Value |
|---|---|
| Type | Boolean |
| Opcode | `hasDocument` |
| `NAME` | String, default: `page` |

### `delete document [NAME]`

Delete the named document from the current target.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `deleteDocument` |
| `NAME` | String, default: `page` |

### `kind of document [NAME]`

Return html or markdown.

| Property | Value |
|---|---|
| Type | Reporter |
| Opcode | `documentKind` |
| `NAME` | String, default: `page` |

### `text in document [NAME] at [LOCATION]`

Get text at the root, a numeric tree path, or a simple HTML selector.

| Property | Value |
|---|---|
| Type | Reporter |
| Opcode | `getDocumentText` |
| `NAME` | String, default: `page` |
| `LOCATION` | String, default: `$` |

### `replace text in document [NAME] at [LOCATION] with [TEXT]`

Immutably replace text at the selected node.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `replaceDocumentText` |
| `NAME` | String, default: `page` |
| `LOCATION` | String, default: `$` |
| `TEXT` | String, default: `Hello` |

### `serialize document [NAME] as [FORMAT]`

Deterministically serialize a document in its native format. Cross-format conversion is rejected as lossy.

| Property | Value |
|---|---|
| Type | Reporter |
| Opcode | `serializeDocument` |
| `NAME` | String, default: `page` |
| `FORMAT` | String, default: `html` |

<!-- END GENERATED BLOCKS -->

## Named Data provider

When the MVP is enabled, the provider is registered with the runtime registry using persistent lifetime. `PROJECT_STOP_ALL` clears target bindings and open session handles while keeping the provider registered. The provider exposes namespace `document`, kind `document`, target scope, opaque revisions, replayable byte bodies, and the shared `NAMED_DATA_*` error vocabulary. Only a document's native representation is accepted: HTML as `text/html; charset=utf-8`, Markdown as `text/markdown; charset=utf-8`.

## Development

Run `pnpm run check`.

## License

MPL-2.0. See `THIRD_PARTY_NOTICES.md` for bundled MIT-licensed dependencies.

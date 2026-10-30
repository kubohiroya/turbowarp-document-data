# TurboWarp-Document-Data

<img src="assets/block-icon.svg" alt="" width="48" height="48">

English | [日本語](README.ja.md)

Named, target-local HTML and Markdown document trees for TurboWarp. This package was initialized from `turbowarp-extension-template` and integrates with the canonical `@kubohiroya/turbowarp-named-data` registry.

## Runnable sample

[**Open the demo in TurboWarp Editor**](https://turbowarp.org/editor?project_url=https%3A%2F%2Fkubohiroya.github.io%2Fturbowarp-document-data%2Fsamples%2Freplace-document-text.sb3) · [Download the SB3](https://kubohiroya.github.io/turbowarp-document-data/samples/replace-document-text.sb3)

Select **Run without sandbox**, then **Allow**, and click the green flag.
The paragraph becomes Hello TurboWarp in text and HTML.

This sample enables `DOCUMENT_DATA_MVP` only while creating its extension instance, then restores the host flag. The extension default stays OFF.

Editable sources and expected results: [`samples/README.md`](samples/README.md).
Run `pnpm run samples:build` after source/bundle changes and `pnpm run samples:check` before committing.

## What it does

It parses HTML with parse5 and Markdown into mdast, stores the typed tree under a name, supports minimal text inspection/replacement, and deterministically serializes the native format. A Named Data provider exposes UTF-8 HTML or Markdown response bodies without depending on an unpublished shared package.

This extension does **not** sanitize HTML, execute scripts, mount a browser DOM, or promise lossless conversion between HTML and Markdown. The existing `turbowarp-html` and `turbowarp-markdown` packages remain the fragment-construction APIs; this package owns parsed named-document lifecycle and body-provider behavior.

## Requirements and safety

- TurboWarp unsandboxed custom extension mode is required.
- `DOCUMENT_DATA_MVP` is fixed at startup and defaults to `false`.
- Source/output size, node count, and depth are bounded.
- Parse and edit operations replace a binding only after the complete new tree passes validation.
- Bindings and open body handles are released on `PROJECT_STOP_ALL`.

Build with `pnpm run build`, then load `dist/document-data.js`. Package example: `@kubohiroya/turbowarp-document-data@0.5.0-rc.1`.

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

### `store YAML [TEXT] as source document [NAME] file [FILENAME]`

Validate YAML and retain its exact source in SB3 extension storage. Enabled by startup DOCUMENT_SOURCE.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `createYamlSource` |
| `TEXT` | String, default: `value: example\n` |
| `NAME` | String, default: `settings` |
| `FILENAME` | String, default: `settings.yaml` |

### `store JSON [TEXT] as source document [NAME] file [FILENAME]`

Validate JSON and retain its exact source in SB3 extension storage. Enabled by startup DOCUMENT_SOURCE.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `createJsonSource` |
| `TEXT` | String, default: `{"value":"example"}` |
| `NAME` | String, default: `settings` |
| `FILENAME` | String, default: `settings.json` |

### `source document [NAME] exists?`

Report whether the current project owns a persistent source document.

| Property | Value |
|---|---|
| Type | Boolean |
| Opcode | `hasSourceDocument` |
| `NAME` | String, default: `settings` |

### `original source of document [NAME]`

Return the original YAML/JSON text including comments and line endings.

| Property | Value |
|---|---|
| Type | Reporter |
| Opcode | `getSourceDocument` |
| `NAME` | String, default: `settings` |

### `format of source document [NAME]`

Return yaml or json without converting the source.

| Property | Value |
|---|---|
| Type | Reporter |
| Opcode | `sourceDocumentFormat` |
| `NAME` | String, default: `settings` |

### `delete source document [NAME]`

Remove one persistent source document from the project.

| Property | Value |
|---|---|
| Type | Command |
| Opcode | `deleteSourceDocument` |
| `NAME` | String, default: `settings` |

### `embedded document [DOCUMENT]`

Inert declaration referring to a persistent source document. It never executes a document.

| Property | Value |
|---|---|
| Type | Hat |
| Opcode | `sourceDocument` |
| `DOCUMENT` | String, default: `` |

<!-- END GENERATED BLOCKS -->

## Named Data provider

When the MVP is enabled, the provider is registered with the runtime registry using persistent lifetime. `PROJECT_STOP_ALL` clears target bindings and open session handles while keeping the provider registered. The provider exposes namespace `document`, kind `document`, target scope, opaque revisions, replayable byte bodies, and the shared `NAMED_DATA_*` error vocabulary. Only a document's native representation is accepted: HTML as `text/html; charset=utf-8`, Markdown as `text/markdown; charset=utf-8`.

## Development

Run `pnpm run check`.

## License

MPL-2.0. See `THIRD_PARTY_NOTICES.md` for bundled MIT-licensed dependencies.

固定入力の編集範囲・互換性・切戻しについては [固定入力の編集](docs/fixed-input-editors.ja.md) を参照してください。

## Persistent YAML/JSON source documents (prerelease opt-in)

`DOCUMENT_SOURCE` is captured when the extension is constructed and defaults to OFF. Set `globalThis.DOCUMENT_SOURCE = true` before loading the extension to expose the new source blocks. `DOCUMENT_DATA_MVP` still independently controls the existing target-local HTML/Markdown trees. Stopping a project clears those transient trees; it retains the canonical YAML/JSON source in `runtime.extensionStorage.kubohiroyadocumentdata`.

The storage has `{formatVersion: 1, documents: {[id]: {id, filename, format, source, revision, schema?, docsURL?}}}`. The owner validates YAML/JSON through the shared `turbowarp-yaml-json/codec`, and optional inline JSON Schema through its explicit Schema API, before changing the raw source. Comments, spacing, CRLF, and Unicode remain exactly as supplied. No parse/render roundtrip is used to save text. Schema metadata uses `{id, schema}`; documentation URLs must be fixed HTTPS URLs without credentials.

`./composition` exports only the canonical `getSourceDocumentRegistry`, provider/reference contracts, and Schema metadata normalization. It imports no YAML/JSON parser, GUI, App, Editor, DOM control, or native launcher. The prior embedded-YAML names are aliases to the same functions. The registry keeps the legacy v1 `Symbol.for` slot and opaque reference encoding, with a `sourceDocumentApiVersion: 1` capability. A real older registry that discards native format metadata is rejected explicitly; it is never silently replaced with a second registry. Reload compatible owner and host bundles together.

`./source-documents` separately exports `createSourceDocumentStore(vm)` and `createSourceDocumentProvider(vm)`. The latter uses provider ID `document-data`; `list()` reports document IDs, filenames, native formats and optional Schema/docs, and `open(id)` returns `inspect/capture/prepare/commit/dispose`. Captures use opaque owner baselines. Project replacement, stale documents, removed documents, and forged prepared results cannot overwrite current source. A normal stop may replace the VM target array without changing the source's project identity.

```js
import {getSourceDocumentRegistry} from '@kubohiroya/turbowarp-document-data/composition';
import {createSourceDocumentStore, createSourceDocumentProvider} from '@kubohiroya/turbowarp-document-data/source-documents';
const store = createSourceDocumentStore(vm);
store.put({id: 'settings', filename: 'settings.yaml', format: 'yaml', source: '# keep this comment\nvalue: 1\n'});
const unregister = getSourceDocumentRegistry(vm).register(createSourceDocumentProvider(vm));
```

The native `sourceDocument` hat refers to a document ID through a nonreporter dropdown and never runs the source. Keep a Document Data block in the project: TurboWarp's normal SB3 serializer retains extension storage for extension IDs used by project blocks. This library does not alter the VM serializer. Source blocks, the ordinary SB3 save, and the provider keep text in the same owner location; no text is duplicated in a hat argument.

The read-only Named Data namespace `document-source`, kind `document`, scope `project`, serves native `yaml` or `json` bytes and revisions. It refuses implicit cross-format conversion. Existing HTML/Markdown `document` namespace behavior is unchanged. The source provider caps one project at 256 documents and 4 MiB of total source; per-document parse limits come from the shared codec. Stop clears body handles without deleting canonical source.

This prerelease implements Issue #21 with an explicit startup opt-in. Roll back by leaving `DOCUMENT_SOURCE` OFF at startup or reverting the integration; retain original SB3 copies. Parsed value/AST and schema-specific block conversion are separate representations and are not silently substituted for raw text by this source layer.

Inline source Schema validation defaults to the explicit 2020-12 profile and selects the draft-07 profile for a declared draft-07 metaschema URI. Other unsupported metaschemas are rejected by the owner validator.


Project replacement (`RUNTIME_DISPOSED` followed by `PROJECT_LOADED`) reuses cached extension/store/provider instances. It invalidates old edit captures and clears transient HTML/Markdown/session handles, while persistent registrations remain available for the next project storage. Only explicit `dispose()` permanently unregisters them.

Representation providers may explicitly include their own active kind in `fromRepresentations` when they support saving edited blocks back to canonical source while retaining that representation. The registry otherwise rejects same-kind requests before invoking the owner; `fromSource` alone never opts an active block view into this Save path. Parsing, stale checks, and atomic commit remain the owner's responsibility. Update and reload both owner and host bundles together.

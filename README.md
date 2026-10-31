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

Parsed trees keep the source position of each node. Another unsandboxed extension can copy all or part of a named tree, without a string in between, through the shared document tree registry in `./composition`. No block is added for this.

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

## Source positions

Parsing keeps where each node came from in the parsed text. Markdown keeps the mdast `position`. HTML nodes get the same shape from parse5 source locations, and the HTML root covers the whole source.

- Shape: `position: {start: {line, column, offset}, end: {line, column, offset}}`, as in mdast and unist. Lines and columns start at 1, offsets at 0, and `end` points just past the range.
- Columns and offsets count UTF-16 code units, like JavaScript string indexes and Scratch `letter (n) of`; an emoji counts as 2. The CR of a CRLF counts in offsets, and CRLF, LF and CR each end one line.
- Positions refer to the exact string that was parsed. For text from the `turbowarp-markdown`/`turbowarp-html` builders, that is the rendered string. The source text itself is not retained.
- Nodes that parse5 adds without source text, such as an implicit `tbody`, have no `position`. An element with an omitted end tag ends where it was implicitly closed (the start of the next element).
- `replace text in document` removes `position` from every node of the result, including the root, and inserted nodes get none. A tree's positions are therefore either all valid for its parsed source or absent: they are valid exactly when the root has a `position`.
- `serialize document` and Named Data bodies are the same with or without positions.

## Shared document tree registry

`./composition` exports a parser-free registry for reading named document trees from another unsandboxed extension, such as `turbowarp-structured-data`. It keeps the tree in memory instead of serializing it, so no JSON text size limit applies.

```js
import {getDocumentTreeRegistry} from '@kubohiroya/turbowarp-document-data/composition';
const {kind, revision, root} = getDocumentTreeRegistry(vm).capture(target, 'page', {
  location: '$[1]',                       // $, $[0][1], or a simple HTML selector, as in the blocks
  positions: false,                       // true keeps position on nodes that have one
  limits: {maxDepth: 64, maxNodes: 50000}
});
```

- `getDocumentTreeRegistry(scope)` returns the registry stored on `scope` under `Symbol.for('@kubohiroya/turbowarp-document-data/document-tree-registry/v1')` (`documentTreeRegistrySymbol`), so independently bundled extensions reach the same registry. Document Data uses the VM (`Scratch.vm`), as for the source-document registry. Look the registry up when a block runs; the load order of the extensions does not matter.
- With `DOCUMENT_DATA_MVP` enabled, the extension registers its provider when constructed and unregisters it on `dispose()`. `PROJECT_STOP_ALL` and project replacement clear the documents and keep the registration. `register(provider)` returns a function that removes only that registration; the newest registration answers captures.
- `capture(target, name, {location, positions, limits})` reads the target's named document (the name is trimmed as in the blocks) and returns `{kind, revision, root}`. `kind` is `html` or `markdown`, `revision` is the opaque revision the Named Data provider reports, and `root` is a fresh deep copy, made of plain JSON objects, of the node at `location`.
- HTML nodes have the parsed shape: the whole document is `{"type": "root", "children": [...]}`, and nodes are `element` (`tagName`, `attributes`, `children`), `text` (`value`) and `comment` (`value`). Markdown nodes are mdast as produced by mdast-util-from-markdown v2; a major mdast update is a breaking change. Nodes have `position` only when `positions` is `true` (default `false`).
- Changing a copy never changes the document. The registry keeps neither trees nor copies.
- `limits` counts values like `@kubohiroya/turbowarp-yaml-json/codec` does when it parses JSON: every value (object, array, string, number, boolean or null) counts once, object keys do not count, and the copied node is at depth 0. Each tree level adds 2 to the depth (the node and its `children` array), and a `position` adds 3 below its node. A copy is accepted exactly when parsing its JSON text under the same depth and node limits would succeed. Copying stops at the first value over a limit, so an oversized copy is never built.
- Errors are `DocumentTreeError` with a stable `code`: `DOCUMENT_TREE_UNAVAILABLE` (no provider: Document Data is not loaded, `DOCUMENT_DATA_MVP` is off, or it was disposed), `DOCUMENT_NOT_FOUND`, `INVALID_LOCATION`, `LOCATION_NOT_FOUND`, and `DOCUMENT_LIMIT_EXCEEDED`. Invalid arguments use `DOCUMENT_TREE_OPTIONS_INVALID`, `DOCUMENT_TREE_PROVIDER_INVALID`, `REGISTRY_SCOPE_INVALID`, or `REGISTRY_INCOMPATIBLE`. Separate bundles have separate classes, so check `code` rather than `instanceof`.

## Development

Run `pnpm run check`.

## License

MPL-2.0. See `THIRD_PARTY_NOTICES.md` for bundled MIT-licensed dependencies.

固定入力の編集範囲・互換性・切戻しについては [固定入力の編集](docs/fixed-input-editors.ja.md) を参照してください。

## Persistent YAML/JSON source documents (prerelease opt-in)

`DOCUMENT_SOURCE` is captured when the extension is constructed and defaults to OFF. Set `globalThis.DOCUMENT_SOURCE = true` before loading the extension to expose the new source blocks. `DOCUMENT_DATA_MVP` still independently controls the existing target-local HTML/Markdown trees. Stopping a project clears those transient trees; it retains the canonical YAML/JSON source in `runtime.extensionStorage.kubohiroyadocumentdata`.

The storage has `{formatVersion: 1, documents: {[id]: {id, filename, format, source, revision, schema?, docsURL?}}}`. The owner validates YAML/JSON through the shared `turbowarp-yaml-json/codec`, and optional inline JSON Schema through its explicit Schema API, before changing the raw source. Comments, spacing, CRLF, and Unicode remain exactly as supplied. No parse/render roundtrip is used to save text. Schema metadata uses `{id, schema}`; documentation URLs must be fixed HTTPS URLs without credentials.

`./composition` exports the canonical `getSourceDocumentRegistry`, provider/reference contracts, Schema metadata normalization, and the document tree registry described above. It imports no YAML/JSON/HTML/Markdown parser, GUI, App, Editor, DOM control, or native launcher. The prior embedded-YAML names are aliases to the same functions. The registry keeps the legacy v1 `Symbol.for` slot and opaque reference encoding, with a `sourceDocumentApiVersion: 1` capability. A real older registry that discards native format metadata is rejected explicitly; it is never silently replaced with a second registry. Reload compatible owner and host bundles together.

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

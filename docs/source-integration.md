# Document source implementations

This guide carries forward the implementation documentation formerly kept in document-source, with imports updated to the split packages.

[English](source-integration.md) | [日本語](source-integration.ja.md)

Shared document-source and editing contracts for TurboWarp extensions and their hosts. Supports SB3 files, HTTPS URLs, YAML blocks and schema-specific blocks for configuration and other domain-specific languages (DSLs), including Kamishibai scripts.

## Role and dependencies

Document-source defines the shared protocol. Document-data implements the registry, original-source storage, HTTPS retrieval, hats and incremental project patches. Yaml-json implements YAML block views and source conversion. Owners retain their own validation and settings; all implementations share Document Data's single registry.

## Four source modes

| Kind | Location | Representation |
| --- | --- | --- |
| `embedded-file` | Document storage inside the SB3 | YAML/JSON text |
| `url` | External HTTPS URL | YAML/JSON text |
| `yaml-blocks` | Blocks inside the SB3 | Generic YAML structure |
| `schema-blocks` | Blocks inside the SB3 | Owner-defined, DSL-specific structure |

`providerId`, `documentId` and the document filename remain stable when the representation changes. A root hat carries a version and an entry-document filename and has no previous or next connection. Ordinary document filenames must be nonempty.

`normalizeDocumentSource` separates each mode into its location and representation. `getDocumentSourceRegistry(vm)` uses Document Data's single registry rather than duplicating documents.

## HTTPS sources

Fetching or previewing a URL in the Editor leaves the project unchanged. On save, the owner validates the source against its schema/DSL before the reference URL and the validated source cache are applied as an incremental patch. At runtime startup, the host fetches and validates the URL again. A failed fetch never silently falls back to an old cache.

To edit URL content in an external editor or convert it into blocks, first switch to an embedded SB3 file and save. The host does not send PUT requests or otherwise write to the remote site. Fetches require HTTPS and UTF-8, omit credentials and reject redirects. The default limits are 1 MiB and 15 seconds. The source server must allow CORS. Relative includes resolve registered SB3 document names; they do not automatically fetch unknown documents relative to the external URL.

The shared package never reads an ambient fetch function. Pass the host's network capability explicitly to `fetchDocumentSource` and to provider registrations that enable URL operations. App Core accepts an injected URL resolver callback and rejects URL references when no resolver is provided.

## Registering an owner

The host supplies the VM, a document provider and an owner implementation that validates the source and updates its own project data:

```js
import {getDocumentSourceRegistry} from '@kubohiroya/turbowarp-document-data/document-source';

const registry = getDocumentSourceRegistry(vm);
const unregister = registry.register(provider, {
  fetch: window.fetch.bind(window), // Inject the host's network capability explicitly.
  sourceStorageId: 'myextension', // Must be a loaded owner extension ID.
  dialogTitle: {ja: '台本データ', en: 'Script data'},
  async buildSourceCandidate({project, reference, source}) {
    // Validate the source and update only this owner's caller-owned project copy.
    return {project: await owner.replaceSource(project, reference, source), source};
  }
});
```

An opened document adapter's `prepareDataSource` returns a fetched and validated candidate. `commitDataSource` uses that same candidate to apply the document and source-location changes together. It rejects intervening project changes, candidates from another session and closed dialogs. It does not zip/save or reload the entire SB3 project.

URL settings are stored in `extensionStorage[ownerExtensionId].documentSourceLocations`. They must belong to a loaded owner extension: the standard SB3 serializer omits storage for an unused shared extension ID.

## Public entry points

| Import | Responsibility |
| --- | --- |
| `@kubohiroya/turbowarp-document-source` | Protocol types, references and validation |
| `@kubohiroya/turbowarp-document-data/document-source` | Registry, URL storage/fetching, hats and markers |
| `@kubohiroya/turbowarp-document-data/project-views` | Previews, conversions and project patches |
| `@kubohiroya/turbowarp-document-data/view-metadata` | Representation metadata |
| `@kubohiroya/turbowarp-document-data/document-views` | Document providers and stores |
| `@kubohiroya/turbowarp-yaml-json/yaml-blocks` | Generic YAML block views |
| `@kubohiroya/turbowarp-yaml-json/source-view` | Source/block conversion |
| `@kubohiroya/turbowarp-yaml-json/runtime` | Inert YAML companion runtime |

## Compatibility and rollout

Legacy embedded-yaml APIs remain available as aliases. The [compatibility package](https://github.com/kubohiroya/turbowarp-document-source/tree/main/compat/embedded-yaml) re-exports this package. Existing opcodes, document references, storage and the shared registry symbol remain unchanged.

In the Editor/App, enable the new source-location operations at startup with `twPlusDocumentSource=1`; the document UI uses the existing `twPlusYamlEditor=1` flag. Both default to OFF. To roll back, remove the new flag, restart and use the original SB3 without URL references. With the feature disabled, projects containing URL references reject fetching and do not silently use an old cache.

The GitHub repository was renamed to `turbowarp-document-source` while retaining its history and issues. The facade for the old npm name is in `compat/embedded-yaml`. Repository integration does not itself publish npm packages, tags or GitHub Releases.

For local compatibility checks, set `TW_LEGACY_EMBEDDED_YAML=/path/to/legacy-embedded-yaml`. Standalone checks do not require the legacy package and skip only that comparison when it is absent.

## Development

`pnpm run build:composition` builds the registry, source store and moved TypeScript implementations. Run `pnpm run typecheck:source-integration` for the implementation and test types, and `pnpm run test:source-integration` for the moved regression suite. Commit generated dist files alongside source changes.

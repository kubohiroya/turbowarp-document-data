import {fixedInputRegistration} from './fixed-input-editors.js';
import definitions from './block-definitions.json';
import {extensionConfig, isDocumentDataMvpEnabled, isDocumentSourceEnabled} from './config.js';
import {createSourceDocumentStore, createSourceDocumentProvider, type SourceDocumentVM} from './source-documents.js';
import {getDocumentTreeRegistry, getSourceDocumentRegistry, encodeSourceDocumentReference, SourceDocumentError} from './composition.js';
import {
  DocumentDataError, getDocumentText, parseHtmlDocument, parseMarkdownDocument,
  replaceDocumentText, serializeDocument, type DocumentKind, type DocumentTree
} from './document.js';
import {DocumentNamedDataProvider, type DocumentBinding} from './document-provider.js';
import {DocumentTreeCaptureProvider} from './document-tree-provider.js';
import {SourceDocumentNamedDataProvider} from './source-named-data-provider.js';
import {
  bindNamedDataRegistryLifecycle,
  installNamedDataRegistry,
  type NamedDataProviderRegistration,
  type NamedDataRegistryService
} from '@kubohiroya/turbowarp-named-data/composition';

type BlockTypeName = 'COMMAND' | 'REPORTER' | 'BOOLEAN' | 'HAT';
type ArgumentTypeName = 'STRING';
interface DefinitionArgument {type: ArgumentTypeName; defaultValue: string; menu?: string}
interface BlockDefinition {opcode: string; blockType: BlockTypeName; text: string; description: string; arguments: Record<string, DefinitionArgument>}
interface MenuDefinition {acceptReporters: boolean; items: string[]}
const blockDefinitions = definitions.blocks as readonly BlockDefinition[];
const sourceOpcodes = new Set(['createYamlSource', 'createJsonSource', 'hasSourceDocument', 'getSourceDocument', 'sourceDocumentFormat', 'deleteSourceDocument', 'sourceDocument']);

export class DocumentDataExtension implements TurboWarpExtension {
  private readonly fixedInputs = fixedInputRegistration(typeof Scratch === 'undefined' ? undefined : Scratch);

  private readonly sourceStore?: ReturnType<typeof createSourceDocumentStore>;
  private readonly sourceProvider?: ReturnType<typeof createSourceDocumentProvider>;
  private readonly unregisterSource?: () => void;
  private readonly sourceBodyProvider?: SourceDocumentNamedDataProvider;
  private readonly sourceBodyRegistration?: NamedDataProviderRegistration;

  private registries = new WeakMap<object, Map<string, DocumentBinding>>();
  private nextRevision = 1;
  private disposed = false;
  private readonly runtime = Scratch.vm?.runtime;
  private readonly projectReset = () => {this.clearRuntimeState();void this.namedDataRegistry?.clearSession();};
  private readonly provider?: DocumentNamedDataProvider;
  private readonly namedDataRegistry?: NamedDataRegistryService;
  private readonly namedDataRegistration?: NamedDataProviderRegistration;
  private readonly unbindNamedDataRegistryLifecycle?: () => void;
  private readonly unregisterTree?: () => void;

  public constructor(private readonly enabled = isDocumentDataMvpEnabled(), private readonly sourceEnabled = isDocumentSourceEnabled()) {
    const runtime = Scratch.vm?.runtime;
    if (enabled) {
      const bindings = {get: (target: object, name: string) => this.registries.get(target)?.get(name)};
      this.provider = new DocumentNamedDataProvider(bindings);
      // Same VM scope as the source-document registry; consumers look it up when their block runs.
      if (Scratch.vm) this.unregisterTree = getDocumentTreeRegistry(Scratch.vm).register(new DocumentTreeCaptureProvider(bindings));
      if (runtime) {
        this.namedDataRegistry = installNamedDataRegistry(runtime);
        this.namedDataRegistration = this.namedDataRegistry.registerProvider(
          this.provider,
          {lifetime: 'persistent'}
        );
        if (runtime.on) {
          this.unbindNamedDataRegistryLifecycle = bindNamedDataRegistryLifecycle(
            runtime as {on(event: string, listener: () => void): void},
            this.namedDataRegistry
          );
        }
      }
    }
    if (sourceEnabled) {
      const vm = Scratch.vm as unknown as SourceDocumentVM;
      this.sourceStore = createSourceDocumentStore(vm);
      this.sourceProvider = createSourceDocumentProvider(vm);
      this.unregisterSource = getSourceDocumentRegistry(vm).register(this.sourceProvider);
      this.sourceBodyProvider = new SourceDocumentNamedDataProvider(this.sourceStore);
      if (runtime) {
        if (!this.namedDataRegistry) {
          this.namedDataRegistry = installNamedDataRegistry(runtime);
          if (runtime.on) this.unbindNamedDataRegistryLifecycle = bindNamedDataRegistryLifecycle(runtime as {on(event: string, listener: () => void): void}, this.namedDataRegistry);
        }
        this.sourceBodyRegistration = this.namedDataRegistry.registerProvider(this.sourceBodyProvider, {lifetime: 'persistent'});
      }
    }
    runtime?.on?.('PROJECT_STOP_ALL', this.projectReset);
    // Project replacement reuses the cached extension instance in TurboWarp.
    runtime?.on?.('RUNTIME_DISPOSED', this.projectReset);
    runtime?.on?.('PROJECT_LOADED', this.projectReset);
  }

  public getNamedDataProvider(): DocumentNamedDataProvider | undefined {return this.provider;}
  public getNamedDataRegistry(): NamedDataRegistryService | undefined {
    return this.namedDataRegistry;
  }
  public async dispose(): Promise<void> {
    if (this.disposed) return;
    this.disposed = true;
    this.runtime?.off?.('PROJECT_STOP_ALL', this.projectReset);
    this.runtime?.off?.('RUNTIME_DISPOSED', this.projectReset);
    this.runtime?.off?.('PROJECT_LOADED', this.projectReset);
    this.clearRuntimeState();
    this.fixedInputs.dispose();
    this.unregisterTree?.();
    this.unregisterSource?.();
    this.sourceProvider?.dispose?.();
    this.sourceStore?.dispose();
    await this.namedDataRegistration?.unregister();
    await this.sourceBodyRegistration?.unregister();
    this.unbindNamedDataRegistryLifecycle?.();
  }

  public getInfo(): Record<string, unknown> {
    const visible = blockDefinitions.filter(block => sourceOpcodes.has(block.opcode) ? this.sourceEnabled : this.enabled);
    this.fixedInputs.ensure(visible.map(block => `${extensionConfig.id}_${block.opcode}`));
    return {
      id: extensionConfig.id,
      name: Scratch.translate(definitions.extensionName),
      docsURI: extensionConfig.docsURI,
      blockIconURI: extensionConfig.blockIconURI,
      blocks: visible.map((block) => this.toScratchBlock(block)),
      menus: {...Object.fromEntries(Object.entries(definitions.menus).filter(([id]) => id !== 'sourceDocuments' || this.sourceEnabled).map(([id, menu]) => [id, this.toScratchMenu(menu)])), ...(this.sourceEnabled ? {sourceDocuments: {acceptReporters: false, items: 'sourceDocumentMenu'}} : {})}
    };
  }

  public sourceDocument(): boolean {return false;}
  public sourceDocumentMenu(): Array<{text: string; value: string}> {
    const documents = this.sourceStore?.list() ?? [];
    return documents.length ? documents.map(document => ({text: document.filename, value: encodeSourceDocumentReference({providerId: 'document-data', documentId: document.id})})) : [{text: '—', value: ''}];
  }
  private sources(): ReturnType<typeof createSourceDocumentStore> {
    if (!this.sourceEnabled || !this.sourceStore) throw new SourceDocumentError('DOCUMENT_SOURCE_DISABLED', 'Persistent source documents are disabled.');
    return this.sourceStore;
  }
  public createYamlSource(args: {TEXT: unknown; NAME: unknown; FILENAME: unknown}): void {
    this.sources().put({id: this.name(args.NAME), filename: Scratch.Cast.toString(args.FILENAME), format: 'yaml', source: Scratch.Cast.toString(args.TEXT)});
  }
  public createJsonSource(args: {TEXT: unknown; NAME: unknown; FILENAME: unknown}): void {
    this.sources().put({id: this.name(args.NAME), filename: Scratch.Cast.toString(args.FILENAME), format: 'json', source: Scratch.Cast.toString(args.TEXT)});
  }
  public hasSourceDocument(args: {NAME: unknown}): boolean {return this.sources().list().some(document => document.id === this.name(args.NAME));}
  public getSourceDocument(args: {NAME: unknown}): string {return this.sources().read(this.name(args.NAME)).source;}
  public sourceDocumentFormat(args: {NAME: unknown}): string {return this.sources().read(this.name(args.NAME)).format;}
  public deleteSourceDocument(args: {NAME: unknown}): void {this.sources().remove(this.name(args.NAME));}

  public parseHtml(args: {TEXT: unknown; NAME: unknown}, util: ScratchBlockUtility): void {
    this.setBinding(util.target, this.name(args.NAME), parseHtmlDocument(Scratch.Cast.toString(args.TEXT)));
  }
  public parseMarkdown(args: {TEXT: unknown; NAME: unknown}, util: ScratchBlockUtility): void {
    this.setBinding(util.target, this.name(args.NAME), parseMarkdownDocument(Scratch.Cast.toString(args.TEXT)));
  }
  public hasDocument(args: {NAME: unknown}, util: ScratchBlockUtility): boolean {
    return this.registryFor(util.target).has(this.name(args.NAME));
  }
  public deleteDocument(args: {NAME: unknown}, util: ScratchBlockUtility): void {
    const name = this.name(args.NAME);
    if (!this.registryFor(util.target).delete(name)) this.notFound(name);
  }
  public documentKind(args: {NAME: unknown}, util: ScratchBlockUtility): DocumentKind {
    return this.requireBinding(util.target, args.NAME).tree.kind;
  }
  public getDocumentText(args: {NAME: unknown; LOCATION: unknown}, util: ScratchBlockUtility): string {
    return getDocumentText(this.requireBinding(util.target, args.NAME).tree, Scratch.Cast.toString(args.LOCATION));
  }
  public replaceDocumentText(args: {NAME: unknown; LOCATION: unknown; TEXT: unknown}, util: ScratchBlockUtility): void {
    const name = this.name(args.NAME);
    const updated = replaceDocumentText(this.requireBindingByName(util.target, name).tree, Scratch.Cast.toString(args.LOCATION), Scratch.Cast.toString(args.TEXT));
    this.setBinding(util.target, name, updated);
  }
  public serializeDocument(args: {NAME: unknown; FORMAT: unknown}, util: ScratchBlockUtility): string {
    const format = Scratch.Cast.toString(args.FORMAT);
    if (format !== 'html' && format !== 'markdown') throw new DocumentDataError('INVALID_DOCUMENT', `Unknown document format: ${format}`);
    return serializeDocument(this.requireBinding(util.target, args.NAME).tree, format);
  }

  private name(value: unknown): string {
    const name = Scratch.Cast.toString(value).trim();
    if (!name) throw new DocumentDataError('INVALID_NAME', 'Document name cannot be empty.');
    return name;
  }
  private registryFor(target: object): Map<string, DocumentBinding> {
    let registry = this.registries.get(target);
    if (!registry) {registry = new Map(); this.registries.set(target, registry);}
    return registry;
  }
  private setBinding(target: object, name: string, tree: DocumentTree): void {
    this.registryFor(target).set(name, {tree, revision: this.nextRevision++});
  }
  private requireBinding(target: object, rawName: unknown): DocumentBinding {return this.requireBindingByName(target, this.name(rawName));}
  private requireBindingByName(target: object, name: string): DocumentBinding {
    const binding = this.registries.get(target)?.get(name);
    if (!binding) this.notFound(name);
    return binding;
  }
  private notFound(name: string): never {throw new DocumentDataError('DOCUMENT_NOT_FOUND', `Document does not exist: ${name}`);}
  private clearRuntimeState(): void {this.registries = new WeakMap(); this.provider?.clearSession();this.sourceBodyProvider?.clearSession();}
  private toScratchBlock(block: BlockDefinition): Record<string, unknown> {
    return {opcode: block.opcode, blockType: Scratch.BlockType[block.blockType], text: Scratch.translate(block.text), ...(block.opcode === 'sourceDocument' ? {isEdgeActivated: false} : {}), arguments: Object.fromEntries(Object.entries(block.arguments).map(([name, argument]) => [name, {type: Scratch.ArgumentType[argument.type], defaultValue: block.opcode === 'sourceDocument' && name === 'DOCUMENT' ? this.sourceDocumentMenu()[0]?.value ?? '' : argument.defaultValue, ...(argument.menu ? {menu: argument.menu} : {})}]))};
  }
  private toScratchMenu(menu: MenuDefinition): Record<string, unknown> {return {acceptReporters: menu.acceptReporters, items: menu.items};}
}

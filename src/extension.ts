import definitions from './block-definitions.json';
import {extensionConfig, isDocumentDataMvpEnabled} from './config.js';
import {
  DocumentDataError, getDocumentText, parseHtmlDocument, parseMarkdownDocument,
  replaceDocumentText, serializeDocument, type DocumentKind, type DocumentTree
} from './document.js';
import {DocumentNamedDataProvider, type DocumentBinding} from './document-provider.js';
import {
  bindNamedDataRegistryLifecycle,
  installNamedDataRegistry,
  type NamedDataProviderRegistration,
  type NamedDataRegistryService
} from '@kubohiroya/turbowarp-named-data/composition';

type BlockTypeName = 'COMMAND' | 'REPORTER' | 'BOOLEAN';
type ArgumentTypeName = 'STRING';
interface DefinitionArgument {type: ArgumentTypeName; defaultValue: string; menu?: string}
interface BlockDefinition {opcode: string; blockType: BlockTypeName; text: string; description: string; arguments: Record<string, DefinitionArgument>}
interface MenuDefinition {acceptReporters: boolean; items: string[]}
const blockDefinitions = definitions.blocks as readonly BlockDefinition[];

export class DocumentDataExtension implements TurboWarpExtension {
  private registries = new WeakMap<object, Map<string, DocumentBinding>>();
  private nextRevision = 1;
  private readonly provider?: DocumentNamedDataProvider;
  private readonly namedDataRegistry?: NamedDataRegistryService;
  private readonly namedDataRegistration?: NamedDataProviderRegistration;
  private readonly unbindNamedDataRegistryLifecycle?: () => void;

  public constructor(private readonly enabled = isDocumentDataMvpEnabled()) {
    const runtime = Scratch.vm?.runtime;
    if (enabled) {
      this.provider = new DocumentNamedDataProvider({
        get: (target, name) => this.registries.get(target)?.get(name)
      });
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
          runtime.on('RUNTIME_DISPOSED', () => {
            void this.dispose();
          });
        }
      }
    }
    runtime?.on?.('PROJECT_STOP_ALL', () => this.clearRuntimeState());
  }

  public getNamedDataProvider(): DocumentNamedDataProvider | undefined {return this.provider;}
  public getNamedDataRegistry(): NamedDataRegistryService | undefined {
    return this.namedDataRegistry;
  }
  public async dispose(): Promise<void> {
    await this.namedDataRegistration?.unregister();
    this.unbindNamedDataRegistryLifecycle?.();
  }

  public getInfo(): Record<string, unknown> {
    return {
      id: extensionConfig.id,
      name: Scratch.translate(definitions.extensionName),
      docsURI: extensionConfig.docsURI,
      blockIconURI: extensionConfig.blockIconURI,
      blocks: this.enabled ? blockDefinitions.map((block) => this.toScratchBlock(block)) : [],
      menus: Object.fromEntries(Object.entries(definitions.menus).map(([id, menu]) => [id, this.toScratchMenu(menu)]))
    };
  }

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
  private clearRuntimeState(): void {this.registries = new WeakMap(); this.provider?.clearSession();}
  private toScratchBlock(block: BlockDefinition): Record<string, unknown> {
    return {opcode: block.opcode, blockType: Scratch.BlockType[block.blockType], text: Scratch.translate(block.text), arguments: Object.fromEntries(Object.entries(block.arguments).map(([name, argument]) => [name, {type: Scratch.ArgumentType[argument.type], defaultValue: argument.defaultValue, ...(argument.menu ? {menu: argument.menu} : {})}]))};
  }
  private toScratchMenu(menu: MenuDefinition): Record<string, unknown> {return {acceptReporters: menu.acceptReporters, items: menu.items};}
}

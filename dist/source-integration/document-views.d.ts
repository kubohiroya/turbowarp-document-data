import type { SourceDocumentProvider } from '@kubohiroya/turbowarp-document-source';
import { type SourceDocumentVM } from '@kubohiroya/turbowarp-document-data/source-documents';
import { type YamlBlockOpcodes } from '@kubohiroya/turbowarp-yaml-json/yaml-blocks';
import { type ProjectRepresentationVM } from './project-views.ts';
/** The VM surface shared by Document Data storage and representation patches. */
export type EmbeddedDocumentVM = SourceDocumentVM & ProjectRepresentationVM;
/** Both the plain and the view-enabled provider own resources that the host must release. */
export type EmbeddedDocumentProvider = SourceDocumentProvider & {
    dispose(): void;
};
export interface EmbeddedDocumentProviderOptions {
    enabled?: boolean;
    companionURL: string;
    opcodes?: YamlBlockOpcodes;
}
/** Optional derived representation owner; canonical text remains in Document Data storage. */
export declare function createEmbeddedDocumentProvider(vm: EmbeddedDocumentVM, { enabled, companionURL, opcodes: requestedOpcodes }?: EmbeddedDocumentProviderOptions): EmbeddedDocumentProvider;

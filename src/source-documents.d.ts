import type {SourceDocumentProvider, SourceDocumentSchemaMetadata} from './composition.js';
export interface PersistentSourceDocument {
 readonly id:string; readonly filename:string; readonly format:'yaml'|'json'; readonly source:string; readonly revision:string;
 readonly docsURL?:string; readonly schema?:SourceDocumentSchemaMetadata;
}
export interface SourceDocumentInput {
 readonly id:string; readonly filename:string; readonly format:'yaml'|'json'; readonly source:string; readonly docsURL?:string; readonly schema?:SourceDocumentSchemaMetadata;
}
export interface SourceDocumentVM {
 runtime:{extensionStorage:Record<string,unknown>;targets?:readonly unknown[];on?(event:string,listener:()=>void):unknown;off?(event:string,listener:()=>void):unknown;emitProjectChanged():void};
 stopAll?():unknown;
}
export interface SourceDocumentStore {
 list():readonly PersistentSourceDocument[];read(id:string):PersistentSourceDocument;put(document:SourceDocumentInput):PersistentSourceDocument;
 remove(id:string):boolean;subscribe(listener:()=>void):()=>void;dispose():void;
}
export const sourceDocumentStorageId:'kubohiroyadocumentdata';
export function createSourceDocumentStore(vm:SourceDocumentVM):SourceDocumentStore;
export function createSourceDocumentProvider(vm:SourceDocumentVM):SourceDocumentProvider;

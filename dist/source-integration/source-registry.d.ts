import { type DocumentSourceRegistry } from './document-source.ts';
/** The VM surface read here; project patches verify the rest themselves. */
export type { DocumentSourceVM } from '@kubohiroya/turbowarp-document-source';
import type { DocumentSourceVM } from '@kubohiroya/turbowarp-document-source';
/** Extends the canonical registry rather than creating a second source owner. */
export declare function getDocumentSourceRegistry(vm: DocumentSourceVM): DocumentSourceRegistry;

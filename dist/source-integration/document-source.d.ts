import type { SourceDocumentReference } from '@kubohiroya/turbowarp-document-source';
import { type DocumentSourceURLEntry, type FetchDocumentSourceOptions } from '@kubohiroya/turbowarp-document-source';
export * from '@kubohiroya/turbowarp-document-source';
/** Read persistent locations only. Owner view state remains the authority for block forms. */
export declare function readDocumentSourceURLs(project: unknown): readonly DocumentSourceURLEntry[];
/** Persist inside a loaded owner extension so standard SB3 serialization retains it. */
export declare function writeDocumentSourceURL(project: Record<string, any>, reference: SourceDocumentReference, url: string | null, ownerExtensionId: string): void;
/** Fetch only on explicit demand. Never send ambient credentials or write back remotely. */
export declare function fetchDocumentSource(url: string, options: FetchDocumentSourceOptions): Promise<{
    readonly source: string;
    readonly url: string;
}>;

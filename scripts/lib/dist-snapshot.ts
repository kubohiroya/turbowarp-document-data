import {readdir, readFile} from 'node:fs/promises';
import {join, relative} from 'node:path';

/** Capture every emitted file, including declarations in exported subdirectories. */
export async function readDist(directory: string): Promise<Map<string, Buffer>> {
  const names = (await readdir(directory, {recursive: true, withFileTypes: true}))
    .filter(entry => entry.isFile())
    .map(entry => relative(directory, join(entry.parentPath, entry.name)))
    .sort();
  return new Map(await Promise.all(names.map(async name => [name, await readFile(join(directory, name))] as const)));
}

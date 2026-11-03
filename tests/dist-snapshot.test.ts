import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {expect, it} from 'vitest';
import {readDist} from '../scripts/lib/dist-snapshot.ts';

it('detects changed and removed files inside an exported dist subdirectory', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'document-dist-'));
  try {
    await mkdir(join(directory, 'source-integration'));
    await writeFile(join(directory, 'document-data.js'), 'native extension');
    const implementation = join(directory, 'source-integration/index.js');
    const declarations = join(directory, 'source-integration/index.d.ts');
    await writeFile(implementation, 'export const version = 1;');
    await writeFile(declarations, 'export declare const version: number;');
    const before = await readDist(directory);
    expect([...before.keys()]).toEqual(['document-data.js', 'source-integration/index.d.ts', 'source-integration/index.js']);
    await writeFile(implementation, 'export const version = 2;');
    const changed = await readDist(directory);
    expect(before.get('document-data.js')?.equals(changed.get('document-data.js')!)).toBe(true);
    expect(before.get('source-integration/index.js')?.equals(changed.get('source-integration/index.js')!)).toBe(false);
    await rm(declarations);
    const removed = await readDist(directory);
    expect(removed.size).toBe(before.size - 1);
    expect(removed.has('source-integration/index.d.ts')).toBe(false);
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});

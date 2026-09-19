import {execFile} from 'node:child_process';
import {readdir, readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';

const root = fileURLToPath(new URL('..', import.meta.url));
const snapshot = await readDist();
await promisify(execFile)('pnpm', ['run', 'build'], {cwd: root});
const rebuilt = await readDist();
if (snapshot.size !== rebuilt.size || [...snapshot].some(([name, bytes]) => !rebuilt.get(name)?.equals(bytes))) {
  throw new Error('Generated dist output is not reproducible.');
}
process.stdout.write('Generated dist output is reproducible.\n');

async function readDist(): Promise<Map<string, Buffer>> {
  const directory = new URL('../dist/', import.meta.url);
  const names = (await readdir(directory)).sort();
  return new Map(await Promise.all(names.map(async (name) => [name, await readFile(new URL(name, directory))] as const)));
}

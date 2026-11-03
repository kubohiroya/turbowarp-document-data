import {execFile} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';
import {readDist} from './lib/dist-snapshot.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const directory = fileURLToPath(new URL('../dist/', import.meta.url));
const snapshot = await readDist(directory);
await promisify(execFile)('pnpm', ['run', 'build'], {cwd: root});
const rebuilt = await readDist(directory);
if (snapshot.size !== rebuilt.size || [...snapshot].some(([name, bytes]) => !rebuilt.get(name)?.equals(bytes))) {
  throw new Error('Generated dist output is not reproducible.');
}
process.stdout.write('Generated dist output is reproducible.\n');

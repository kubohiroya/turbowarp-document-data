import {readFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const readme = new URL('../README.md', import.meta.url);
const before = await readFile(readme, 'utf8');
await promisify(execFile)(process.execPath, ['scripts/generate-readme.ts']);
const after = await readFile(readme, 'utf8');
if (before !== after) {
  throw new Error('README.md generated block reference was stale; run pnpm run docs and retry.');
}
process.stdout.write('Generated documentation is up to date.\n');

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const patchesRoot = resolve(root, 'tmp', 'f47-full-recovery');
const failures = [];
let applied = 0;
let skipped = 0;

function normalizePath(sourcePath) {
  const absolutePath = isAbsolute(sourcePath)
    ? resolve(sourcePath)
    : resolve(root, sourcePath.replace(/^\.\.\/S-Tracker[\\/]/, ''));
  const relativePath = relative(root, absolutePath);

  if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
    throw new Error(`Patch path escapes S-Tracker: ${sourcePath}`);
  }

  return absolutePath;
}

function parseOperation(patch) {
  const header = patch.match(/^\*\*\* (Add|Update|Delete) File: ([^\r\n]+)/m);
  if (!header) throw new Error('Missing patch operation header');

  const bodyStart = header.index + header[0].length + 1;
  const bodyEnd = patch.lastIndexOf('*** End Patch');
  return {
    body: patch.slice(bodyStart, bodyEnd).replace(/\r\n/g, '\n'),
    kind: header[1],
    path: normalizePath(header[2]),
  };
}

function applyAdd(path, body) {
  const lines = body.split('\n');
  const content = lines
    .filter(line => line.startsWith('+'))
    .map(line => line.slice(1))
    .join('\n');
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

function applyUpdate(path, body) {
  if (!existsSync(path)) throw new Error(`Missing update target: ${path}`);

  let content = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const hunks = body.split(/^@@.*$/m).slice(1);
  if (hunks.length === 0) throw new Error(`No hunks for update: ${path}`);

  for (const hunk of hunks) {
    const lines = hunk.replace(/^\n/, '').split('\n');
    while (lines.length && lines.at(-1) === '') lines.pop();

    const oldFragment = lines
      .filter(line => line.startsWith(' ') || line.startsWith('-'))
      .map(line => line.slice(1))
      .join('\n');
    const newFragment = lines
      .filter(line => line.startsWith(' ') || line.startsWith('+'))
      .map(line => line.slice(1))
      .join('\n');

    const oldIndex = content.indexOf(oldFragment);
    if (oldIndex >= 0) {
      content = content.slice(0, oldIndex) + newFragment + content.slice(oldIndex + oldFragment.length);
      continue;
    }

    if (content.includes(newFragment)) {
      skipped += 1;
      continue;
    }

    throw new Error(`Hunk context not found in ${path}: ${oldFragment.slice(0, 120)}`);
  }

  writeFileSync(path, content, 'utf8');
}

const patchFiles = readdirSync(patchesRoot)
  .filter(file => file.endsWith('.patch'))
  .sort();

for (const patchFile of patchFiles) {
  try {
    const operation = parseOperation(readFileSync(resolve(patchesRoot, patchFile), 'utf8'));
    if (operation.kind === 'Add') applyAdd(operation.path, operation.body);
    else if (operation.kind === 'Update') applyUpdate(operation.path, operation.body);
    else throw new Error(`Unexpected delete operation: ${operation.path}`);
    applied += 1;
  } catch (error) {
    failures.push({ patchFile, error: error.message });
  }
}

console.log(JSON.stringify({ applied, skipped, failures }, null, 2));

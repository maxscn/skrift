import { existsSync, promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const previewServerRoot = path.resolve(dirname, '..');
const documentsDirectoryPath = path.join(previewServerRoot, 'documents');

const seedPath = path.join(dirname, './utils/default-seed/');

if (existsSync(documentsDirectoryPath)) {
  console.info('Deleting previous documents directory');
  await fs.rm(documentsDirectoryPath, { recursive: true, force: true });
}

console.info('Copying over the defalt seed to the documents directory');
await fs.cp(seedPath, documentsDirectoryPath, {
  recursive: true,
});

'use server';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { documentsDirectoryAbsolutePath } from '../app/env';

// eslint-disable-next-line @typescript-eslint/require-await
export const getDocumentPathFromSlug = cache(async (slug: string) => {
  if (['.tsx', '.jsx', '.ts', '.js'].includes(path.extname(slug)))
    return path.join(documentsDirectoryAbsolutePath, slug);

  const pathWithoutExtension = path.join(documentsDirectoryAbsolutePath, slug);

  if (fs.existsSync(`${pathWithoutExtension}.tsx`)) {
    return `${pathWithoutExtension}.tsx`;
  }
  if (fs.existsSync(`${pathWithoutExtension}.jsx`)) {
    return `${pathWithoutExtension}.jsx`;
  }
  if (fs.existsSync(`${pathWithoutExtension}.ts`)) {
    return `${pathWithoutExtension}.ts`;
  }
  if (fs.existsSync(`${pathWithoutExtension}.js`)) {
    return `${pathWithoutExtension}.js`;
  }

  throw new Error(
    `Could not find your document file based on the slug (${slug}) by guessing the file extension. Tried .tsx, .jsx, .ts and .js.

    This is most likely not an issue with the preview server. It most likely is that the document doesn't exist.`,
  );
});

'use server';

import type { DocumentsDirectory } from '../utils/get-documents-directory-metadata';
import { getDocumentsDirectoryMetadata } from '../utils/get-documents-directory-metadata';

export const getDocumentsDirectoryMetadataAction = async (
  absolutePathToDocumentsDirectory: string,
  keepFileExtensions = false,
  isSubDirectory = false,

  baseDirectoryPath = absolutePathToDocumentsDirectory,
): Promise<DocumentsDirectory | undefined> => {
  return getDocumentsDirectoryMetadata(
    absolutePathToDocumentsDirectory,
    keepFileExtensions,
    isSubDirectory,
    baseDirectoryPath,
  );
};

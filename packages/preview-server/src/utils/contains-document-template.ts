import type { DocumentsDirectory } from './get-documents-directory-metadata';

export const removeFilenameExtension = (filename: string): string => {
  const parts = filename.split('.');

  if (parts.length > 1) {
    return parts.slice(0, -1).join('.');
  }

  return filename;
};

export const containsDocumentTemplate = (
  relativeDocumentPath: string,
  directory: DocumentsDirectory,
) => {
  const documentPathSegments = relativeDocumentPath
    .replace(directory.relativePath, '')
    .split('/')
    .filter(Boolean);

  return containsDocumentPathSegments(documentPathSegments, directory);
};

const containsDocumentPathSegments = (
  relativeDocumentSegments: string[],
  directory: DocumentsDirectory,
) => {
  if (relativeDocumentSegments.length === 1) {
    const documentFilename = removeFilenameExtension(relativeDocumentSegments[0]!);
    return directory.documentFilenames.includes(documentFilename);
  }

  const remainingPath = relativeDocumentSegments.join('/');

  for (const subDirectory of directory.subDirectories) {
    if (remainingPath.startsWith(subDirectory.directoryName)) {
      const matchedSegments = subDirectory.directoryName
        .split('/')
        .filter(Boolean).length;

      return containsDocumentPathSegments(
        relativeDocumentSegments.slice(matchedSegments),
        subDirectory,
      );
    }
  }

  return false;
};

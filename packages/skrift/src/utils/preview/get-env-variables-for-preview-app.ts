import path from 'node:path';

export const getEnvVariablesForPreviewApp = (
  relativePathToDocumentsDirectory: string,
  cwd: string,
) => {
  return {
    DOCUMENTS_DIR_RELATIVE_PATH: relativePathToDocumentsDirectory,
    DOCUMENTS_DIR_ABSOLUTE_PATH: path.resolve(cwd, relativePathToDocumentsDirectory),
    USER_PROJECT_LOCATION: cwd,
  } as const;
};

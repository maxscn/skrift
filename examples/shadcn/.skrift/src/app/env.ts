/* eslint-disable @typescript-eslint/no-non-null-assertion */
/** ONLY ACCESSIBLE ON THE SERVER */
export const documentsDirRelativePath = process.env.DOCUMENTS_DIR_RELATIVE_PATH!;

/** ONLY ACCESSIBLE ON THE SERVER */
export const userProjectLocation = process.env.USER_PROJECT_LOCATION!;

/** ONLY ACCESSIBLE ON THE SERVER */
export const documentsDirectoryAbsolutePath =
  process.env.DOCUMENTS_DIR_ABSOLUTE_PATH!;

export const isBuilding = process.env.NEXT_PUBLIC_IS_BUILDING === 'true';

export const isPreviewDevelopment =
  process.env.NEXT_PUBLIC_IS_PREVIEW_DEVELOPMENT === 'true';

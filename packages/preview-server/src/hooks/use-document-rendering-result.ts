import { useState } from 'react';
import { getDocumentPathFromSlug } from '../actions/get-document-path-from-slug';
import {
  type DocumentRenderingResult,
  renderDocumentByPath,
} from '../actions/render-document-by-path';
import { isBuilding, isPreviewDevelopment } from '../app/env';
import { useDocuments } from '../contexts/documents';
import { containsDocumentTemplate } from '../utils/contains-document-template';
import { useHotreload } from './use-hot-reload';

export const useDocumentRenderingResult = (
  documentPath: string,
  serverDocumentRenderedResult: DocumentRenderingResult,
) => {
  const [renderingResult, setRenderingResult] = useState(
    serverDocumentRenderedResult,
  );

  const { documentsDirectoryMetadata } = useDocuments();

  if (!isBuilding && !isPreviewDevelopment) {
    // biome-ignore lint/correctness/useHookAtTopLevel: This is fine since isBuilding does not change at runtime
    useHotreload(async (changes) => {
      for await (const change of changes) {
        const relativePathForChangedFile =
          // ex: apple-receipt.tsx
          // it will be the path relative to the documents directory, so it is already
          // going to be equivalent to the slug
          change.filename;

        if (
          !containsDocumentTemplate(
            relativePathForChangedFile,
            documentsDirectoryMetadata,
          )
        ) {
          continue;
        }

        const pathForChangedDocument = await getDocumentPathFromSlug(
          relativePathForChangedFile,
        );

        const newRenderingResult = await renderDocumentByPath(
          pathForChangedDocument,
          true,
        );

        if (pathForChangedDocument === documentPath) {
          setRenderingResult(newRenderingResult);
        }
      }
    });
  }

  return renderingResult;
};

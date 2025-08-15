'use client';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import type {
  DocumentRenderingResult,
  RenderedDocumentMetadata,
} from '../actions/render-document-by-path';
import { isBuilding, isPreviewDevelopment } from '../app/env';
import { useDocumentRenderingResult } from '../hooks/use-document-rendering-result';
import { useHotreload } from '../hooks/use-hot-reload';
import { useRenderingMetadata } from '../hooks/use-rendering-metadata';

export const PreviewContext = createContext<
  | {
      renderedDocumentMetadata: RenderedDocumentMetadata | undefined;
      renderingResult: DocumentRenderingResult;

      documentSlug: string;
      documentPath: string;
    }
  | undefined
>(undefined);

interface PreviewProvider {
  documentSlug: string;
  documentPath: string;

  serverRenderingResult: DocumentRenderingResult;

  children: React.ReactNode;
}

export const PreviewProvider = ({
  documentSlug,
  documentPath,
  serverRenderingResult,
  children,
}: PreviewProvider) => {
  const router = useRouter();

  const renderingResult = useDocumentRenderingResult(
    documentPath,
    serverRenderingResult,
  );

  const renderedDocumentMetadata = useRenderingMetadata(
    documentPath,
    renderingResult,
    serverRenderingResult,
  );

  if (!isBuilding && !isPreviewDevelopment) {
    // biome-ignore lint/correctness/useHookAtTopLevel: this will not change on runtime so it doesn't violate the rules of hooks
    useHotreload((changes) => {
      const changeForThisDocument = changes.find((change) =>
        change.filename.includes(documentSlug),
      );

      if (typeof changeForThisDocument !== 'undefined') {
        if (changeForThisDocument.event === 'unlink') {
          router.push('/');
        }
      }
    });
  }

  return (
    <PreviewContext.Provider
      value={{
        documentPath,
        documentSlug,
        renderedDocumentMetadata,
        renderingResult,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

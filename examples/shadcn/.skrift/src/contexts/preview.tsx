'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext } from 'react';
import type {
  DocumentRenderingResult,
  RenderedDocumentMetadata,
} from '../actions/render-document-by-path';
import { isBuilding, isPreviewDevelopment } from '../app/env';
import { useDocumentRenderingResult } from '../hooks/use-document-rendering-result';
import { useHotreload } from '../hooks/use-hot-reload';
import { usePageSizeRendering } from '../hooks/use-page-size-rendering';
import { useRenderingMetadata } from '../hooks/use-rendering-metadata';
import { PAGE_SIZES } from '@skrift/components';

export const PreviewContext = createContext<
  | {
      renderedDocumentMetadata: RenderedDocumentMetadata | undefined;
      renderingResult: DocumentRenderingResult;
      pageSize?: typeof PAGE_SIZES[number]['name'];
      documentSlug: string;
      documentPath: string;
    }
  | undefined
>(undefined);

export const usePreviewContext = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreviewContext must be used within a PreviewProvider');
  }
  return context;
};

interface PreviewProvider {
  documentSlug: string;
  documentPath: string;
  pageSize?: typeof PAGE_SIZES[number]['name'];
  serverRenderingResult: DocumentRenderingResult;

  children: React.ReactNode;
}

export const PreviewProvider = ({
  documentSlug,
  documentPath,
  pageSize,
  serverRenderingResult,
  children,
}: PreviewProvider) => {
  const router = useRouter();
  const baseRenderingResult = useDocumentRenderingResult(
    documentPath,
    serverRenderingResult,
  );


  const { renderingResult } = usePageSizeRendering(
    documentPath,
    baseRenderingResult,
    pageSize,
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
        pageSize,
        renderedDocumentMetadata,
        renderingResult,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

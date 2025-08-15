'use client';
import { useEffect, useState } from 'react';
import { renderDocumentByPath, type DocumentRenderingResult } from '../actions/render-document-by-path';

export const usePageSizeRendering = (
  documentPath: string,
  baseRenderingResult: DocumentRenderingResult,
  pageSize?: string | null,
) => {
  const [renderingResult, setRenderingResult] = useState(baseRenderingResult);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pageSize) {
      setRenderingResult(baseRenderingResult);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    const reRenderWithPageSize = async () => {
      try {
        const newResult = await renderDocumentByPath(documentPath, false, pageSize);
        if (!isCancelled) {
          setRenderingResult(newResult);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to re-render with page size:', error);
          setRenderingResult(baseRenderingResult);
          setIsLoading(false);
        }
      }
    };

    reRenderWithPageSize();

    return () => {
      isCancelled = true;
    };
  }, [pageSize, documentPath, baseRenderingResult]);

  return { renderingResult, isLoading };
};
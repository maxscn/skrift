import { useEffect } from 'react';
import type {
  DocumentRenderingResult,
  RenderedDocumentMetadata,
} from '../actions/render-document-by-path';

const lastRenderingMetadataPerDocumentPath = {} as Record<
  string,
  RenderedDocumentMetadata
>;

/**
 * Returns the rendering metadata if the given `renderingResult`
 * does not error. If it does error it returns the last value it had for the hook.
 */
export const useRenderingMetadata = (
  documentPath: string,
  renderingResult: DocumentRenderingResult,
  serverRenderingMetadata: DocumentRenderingResult,
): RenderedDocumentMetadata | undefined => {
  useEffect(() => {
    if ('markup' in renderingResult) {
      lastRenderingMetadataPerDocumentPath[documentPath] = renderingResult;
    } else if (
      typeof serverRenderingMetadata !== 'undefined' &&
      'markup' in serverRenderingMetadata &&
      typeof lastRenderingMetadataPerDocumentPath[documentPath] === 'undefined'
    ) {
      lastRenderingMetadataPerDocumentPath[documentPath] = serverRenderingMetadata;
    }
  }, [renderingResult, documentPath, serverRenderingMetadata]);

  return 'error' in renderingResult
    ? lastRenderingMetadataPerDocumentPath[documentPath]
    : renderingResult;
};

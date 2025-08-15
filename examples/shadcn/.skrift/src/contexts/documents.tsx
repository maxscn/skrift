'use client';
import { createContext, useContext, useState } from 'react';
import { getDocumentsDirectoryMetadataAction } from '../actions/get-documents-directory-metadata-action';
import { isBuilding, isPreviewDevelopment } from '../app/env';
import { useHotreload } from '../hooks/use-hot-reload';
import type { DocumentsDirectory } from '../utils/get-documents-directory-metadata';

const DocumentsContext = createContext<
  | {
      documentsDirectoryMetadata: DocumentsDirectory;
    }
  | undefined
>(undefined);

export const useDocuments = () => {
  const providerValue = useContext(DocumentsContext);

  if (typeof providerValue === 'undefined') {
    throw new Error(
      'Cannot call `useDocument()` outside of an DocumentsContext provider!',
    );
  }

  return providerValue;
};

export const DocumentsProvider = (props: {
  initialDocumentsDirectoryMetadata: DocumentsDirectory;
  children: React.ReactNode;
}) => {
  const [documentsDirectoryMetadata, setDocumentsDirectoryMetadata] =
    useState<DocumentsDirectory>(props.initialDocumentsDirectoryMetadata);

  if (!isBuilding && !isPreviewDevelopment) {
    // biome-ignore lint/correctness/useHookAtTopLevel: this will not change on runtime so it doesn't violate the rules of hooks
    useHotreload(async () => {
      const metadata = await getDocumentsDirectoryMetadataAction(
        props.initialDocumentsDirectoryMetadata.absolutePath,
      );
      if (metadata) {
        setDocumentsDirectoryMetadata(metadata);
      } else {
        throw new Error(
          'Hot reloading: unable to find the documents directory to update the sidebar',
        );
      }
    });
  }

  return (
    <DocumentsContext.Provider
      value={{
        documentsDirectoryMetadata,
      }}
    >
      {props.children}
    </DocumentsContext.Provider>
  );
};

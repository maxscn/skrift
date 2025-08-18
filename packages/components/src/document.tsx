"use client"
import React, { createContext, useContext, useEffect } from 'react';
import { PAGE_SIZES } from './page';

const GlobalPageSizeContext = createContext<string | undefined>("A4");

export const useGlobalPageSize = () => {
  return useContext(GlobalPageSizeContext);
};

interface DocumentProps {
  children: React.ReactNode;
  pageSize?: typeof PAGE_SIZES[number]["name"]; // Optional page size prop
}

export const Document: React.FC<DocumentProps> = ({
  children,
  pageSize = "A4", // Default page size
}) => {
  const dimensions = PAGE_SIZES.find(p => p.name === pageSize);
  return (
    <GlobalPageSizeContext.Provider value={pageSize}>
      <html style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>
        <style>
          {`@page {
              size: ${pageSize};
              margin: 0;
            }
            .pagedjs_page {
              background-color: white;
              display: block;
              position: relative !important;
              page-break-after: always;
              width: ${dimensions?.dimensions.width}px !important;
              height: ${dimensions?.dimensions.height}px !important;
            }
            .pagedjs_sheet {
              width: ${dimensions?.dimensions.width}px !important;
              height: ${dimensions?.dimensions.height}px !important;
            }
            .pagedjs_pages {
              display: flex;
              flex-direction: column;
              gap: 1em; /* space between pages */
            }

            table[data-split-from] thead,
            table[data-split-from] thead :is(th, tr) {
              visibility: unset !important;
              margin-top: unset !important;
              margin-bottom: unset !important;
              padding-top: unset !important;
              padding-bottom: unset !important;
              border-top: unset !important;
              border-bottom: unset !important;
              line-height: unset !important;
              opacity: unset !important;
            }
            `}
        </style>
        <body style={{ margin: 0, padding: 0, backgroundColor: "oklch(92.8% 0.006 264.531)" }}>
          {children}
        </body>
      </html>
    </GlobalPageSizeContext.Provider>
  );
};
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
          {children}
      </html>
    </GlobalPageSizeContext.Provider>
  );
};
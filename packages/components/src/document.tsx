"use client"
import React, { createContext, useContext, useEffect } from 'react';

const GlobalPageSizeContext = createContext<string | undefined>("A4");

export const useGlobalPageSize = () => {
  return useContext(GlobalPageSizeContext);
};

interface DocumentProps {
  children: React.ReactNode;
  pageSize?: string; // Optional page size prop
}

export const Document: React.FC<DocumentProps> = ({ 
  children,
  pageSize = "A4", // Default page size
}) => {
  
  return (
    <GlobalPageSizeContext.Provider value={pageSize}>
      <html style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>
        <body style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    </GlobalPageSizeContext.Provider>
  );
};
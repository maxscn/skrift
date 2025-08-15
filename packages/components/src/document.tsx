import React, { createContext, useContext } from 'react';

const GlobalPageSizeContext = createContext<string | null>(null);

export const useGlobalPageSize = () => {
  return useContext(GlobalPageSizeContext);
};

interface DocumentProps {
  children: React.ReactNode;
  pageSize?: string;
}

export const Document: React.FC<DocumentProps> = ({ 
  children,
  pageSize,
}) => {

  return (
    <GlobalPageSizeContext.Provider value={pageSize || null}>
      <html style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>
        <body style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    </GlobalPageSizeContext.Provider>
  );
};
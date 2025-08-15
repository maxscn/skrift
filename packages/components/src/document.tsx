import React from 'react';

interface DocumentProps {
  children: React.ReactNode;
}

export const Document: React.FC<DocumentProps> = ({ 
  children, 
}) => {

  return (
   <html style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>
    <body style={{ overflow: "hidden !important", margin: 0, padding: 0 }}>

    {children}
    </body>
   </html>
  );
};
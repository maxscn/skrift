"use client"
import React from 'react';

interface BodyProps {
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({
  children,
}) => {
  return (

    <body style={{ margin: 0, padding: 0, backgroundColor: "oklch(92.8% 0.006 264.531)" }}>
      {children}
    </body>
  );
};
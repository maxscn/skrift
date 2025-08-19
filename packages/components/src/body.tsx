"use client"
import React from 'react';

interface BodyProps {
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({
  children,
}) => {
  return (

    <body style={{ backgroundColor: "white", margin: 0, padding: 0 }}>
      {children}
    </body>
  );
};
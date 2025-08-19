"use client"
import React from 'react';

interface BodyProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({
  backgroundColor = "white",
  children,
}) => {
  return (

    <body style={{ backgroundColor, margin: 0, padding: 0 }}>
      {children}
    </body>
  );
};
import React from 'react';

interface UnbreakableProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Unbreakable: React.FC<UnbreakableProps> = ({ 
  children, 
  className = '', 
  style = {},
  ...props 
}) => {
  const unbreakableStyle: React.CSSProperties = {
    breakInside: 'avoid',
    breakAfter: 'auto',
    breakBefore: 'auto',
    pageBreakInside: 'avoid',
    
    ...style
  };

  return (
    <div 
      className={`skrift-unbreakable ${className}`}
      style={unbreakableStyle}
      data-unbreakable="true"
      {...props}
    >
      {children}
    </div>
  );
};
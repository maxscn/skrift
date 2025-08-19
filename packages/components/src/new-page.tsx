import React from 'react';



export const NewPage: React.FC = () => {
  const unbreakableStyle: React.CSSProperties = {
    breakAfter: 'column',
  };

  return (
    <div 
      className={`skrift-new-page`}
      style={unbreakableStyle}
      />
  );
};
import React from 'react';

export const createDefaultPages = (pagesNeeded: number, effectivePageHeight: number, processedChildren: React.ReactNode) => {
  const newPages: React.ReactNode[] = [];
  for (let i = 0; i < pagesNeeded; i++) {
    const pageContent = React.createElement('div', {
      key: i,
      style: {
        transform: `translateY(-${i * effectivePageHeight}px)`,
        width: '100%',
        position: 'relative'
      }
    }, processedChildren);
    newPages.push(pageContent);
  }
  return newPages;
};

export const useHeightStabilization = (
  measureRef: React.RefObject<HTMLDivElement | null>, 
  measureAndPaginate: () => Promise<void>
) => {
  let correctInARow = 0;
  let frame: number;
  let lastHeight = -1;

  const checkHeight = () => {
    const height = measureRef.current?.scrollHeight ?? 0;
    if (height !== lastHeight) {
      lastHeight = height;
      frame = requestAnimationFrame(checkHeight);
      correctInARow = 0;
    } else if (correctInARow >= 10) {
      measureAndPaginate();
    } else {
      correctInARow += 1;
      frame = requestAnimationFrame(checkHeight);
    }
  };

  frame = requestAnimationFrame(checkHeight);
  return () => cancelAnimationFrame(frame);
};
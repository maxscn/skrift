import React, { useLayoutEffect, useRef, useState } from 'react';

interface PageProps {
  children: React.ReactNode;
  pageHeight?: number;
  pageWidth?: number;
  pageNumber: number;
}

const Page: React.FC<PageProps> = ({ children, pageHeight = 1000, pageWidth = 1000, pageNumber }) => {
  return (
    <div
      className="page-container"
      style={{
        height: `${pageHeight}px`,
        width: `${pageWidth}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: `${pageHeight}px`,
        width: `${pageWidth}px`,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {children}
      </div>

      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '10px',
        color: '#9ca3af',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        zIndex: 10
      }}>
        Page {pageNumber} - {pageHeight}px
      </div>
    </div>
  );
};

interface PageGapProps {
  gapSize?: number;
}

const PageGap: React.FC<PageGapProps> = ({ gapSize = 20 }) => {
  return (
    <div
      style={{
        height: `${gapSize}px`,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: '20px 0'
      }}
    >
   ´
    </div>
  );
};

interface PagedContentProps {
  children: React.ReactNode;
  pageHeight?: number;
  pageWidth?: number;
  gapSize?: number;
}

export const PagedContent: React.FC<PagedContentProps> = ({
  children,
  pageHeight = 1000,
  pageWidth = 800,
  gapSize = 20
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current || !measureRef.current || !children) return;
    console.log(children)
    const measureAndPaginate = () => {
      if (!measureRef.current) return;

      measureRef.current.style.height = 'auto';
      measureRef.current.style.overflow = 'visible';

      const contentHeight = measureRef.current.scrollHeight;
      const effectivePageHeight = pageHeight; // Account for padding
      const pagesNeeded = Math.max(1, Math.ceil(contentHeight / effectivePageHeight));
      console.log(pagesNeeded)
      console.log(contentHeight);
      const newPages: React.ReactNode[] = [];
      for (let i = 0; i < pagesNeeded; i++) {
        const pageContent = (
          <div
            key={i}
            style={{
              transform: `translateY(-${i * effectivePageHeight}px)`,
              width: '100%',
              position: 'relative'
            }}
          >
            {children}
          </div>
        );
        newPages.push(pageContent);
      }

      setPages(newPages);
      setIsReady(true);
    };

    measureAndPaginate();

    const resizeObserver = new ResizeObserver(measureAndPaginate);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, pageHeight]);

  return (
    <div ref={containerRef} style={{ padding: '20px' }}>
      {/* Hidden measurement container */}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          width: `${pageWidth}px`,
          boxSizing: 'border-box',
          visibility: 'hidden'
        }}
      >
        {children}
      </div>
      {
        pages.map((pageContent, index) => (
          <React.Fragment key={index}>
            <Page
              pageHeight={pageHeight}
              pageWidth={pageWidth}
              pageNumber={index + 1}
            >
              {pageContent}
            </Page>
            {index < pages.length - 1 && <PageGap gapSize={gapSize} />}
          </React.Fragment>
        ))
      }
    </div>
  );
};
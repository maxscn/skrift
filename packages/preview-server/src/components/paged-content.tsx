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
    </div>
  );
};

interface PagedContentProps {
  children: React.ReactNode;
  pageHeight?: number;
  pageWidth?: number;
  gapSize?: number;
}

// Helper function to parse srcDoc content and find unbreakable elements
const parseSrcDocForUnbreakableElements = async (srcDoc: string): Promise<DOMRect[]> => {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.visibility = 'hidden';
    iframe.style.width = '800px'; // Match pageWidth
    iframe.style.height = 'auto';
    iframe.srcdoc = srcDoc;
    
    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          resolve([]);
          return;
        }
        
        const elements = iframeDoc.querySelectorAll('.skrift-unbreakable');
        const bounds = Array.from(elements).map(el => el.getBoundingClientRect());
        
        document.body.removeChild(iframe);
        resolve(bounds);
      } catch (error) {
        console.warn('Error parsing iframe srcDoc:', error);
        document.body.removeChild(iframe);
        resolve([]);
      }
    };
    
    iframe.onerror = () => {
      document.body.removeChild(iframe);
      resolve([]);
    };
    
    document.body.appendChild(iframe);
  });
};

// Helper function to recursively find unbreakable elements and iframes
const findUnbreakableElements = (children: React.ReactNode, container?: HTMLElement): { 
  element: React.ReactElement, 
  bounds?: DOMRect,
  isIframe?: boolean,
  srcDoc?: string 
}[] => {
  const unbreakableElements: { 
    element: React.ReactElement, 
    bounds?: DOMRect,
    isIframe?: boolean,
    srcDoc?: string 
  }[] = [];
  
  const traverse = (node: React.ReactNode) => {
    if (!node) return;
    console.log('Traversing node:', node);
    if (React.isValidElement(node)) {
      const props = node.props as any;
      
      // Check if this is an iframe with srcDoc
      if (props.srcDoc) {
        console.log('Found iframe with srcDoc');
        unbreakableElements.push({ 
          element: node, 
          isIframe: true, 
          srcDoc: props.srcDoc 
        });
        return; // Don't traverse children of iframe
      }
      
      // Check if this element has className="unbreakable"
      if (typeof props.className === 'string' && 
          props.className.includes('skrift-unbreakable')) {
        unbreakableElements.push({ element: node });
      }
      
      // Recursively check children
      if (props.children) {
        traverse(props.children);
      }
    } else if (Array.isArray(node)) {
      node.forEach(traverse);
    }
  };
  
  traverse(children);
  return unbreakableElements;
};

// Helper function to get element bounds by className
const getUnbreakableElementBounds = (container: HTMLElement, className: string = 'unbreakable'): DOMRect[] => {
  const elements = container.querySelectorAll(`.${className}`);
  return Array.from(elements).map(el => el.getBoundingClientRect());
};

// Helper function to check if an element spans multiple pages
const checkElementPageSpan = (elementBounds: DOMRect, containerBounds: DOMRect, pageHeight: number): { 
  spansMultiplePages: boolean, 
  startPage: number, 
  endPage: number,
  elementHeight: number 
} => {
  // Calculate relative position within the container
  const relativeTop = elementBounds.top - containerBounds.top;
  const relativeBottom = relativeTop + elementBounds.height;
  
  // Calculate which pages this element spans
  const startPage = Math.floor(relativeTop / pageHeight) + 1;
  const endPage = Math.floor((relativeBottom - 1) / pageHeight) + 1;
  
  return {
    spansMultiplePages: startPage !== endPage,
    startPage,
    endPage,
    elementHeight: elementBounds.height
  };
};

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
    
    const measureAndPaginate = async () => {
      if (!measureRef.current) return;

      // Find all unbreakable elements
      const unbreakableElements = findUnbreakableElements(children);
      console.log('Found unbreakable elements:', unbreakableElements.map(item => item.element));

      measureRef.current.style.height = 'auto';
      measureRef.current.style.overflow = 'visible';

      const contentHeight = measureRef.current.scrollHeight;
      const effectivePageHeight = pageHeight;
      const pagesNeeded = Math.max(1, Math.ceil(contentHeight / effectivePageHeight));
      
      console.log('Pages needed:', pagesNeeded);
      console.log('Content height:', contentHeight);

      // Process iframe elements with srcDoc
      const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
      let iframeBounds: DOMRect[] = [];

      if (iframeElements.length > 0) {
        console.log('Processing iframe elements with srcDoc...');
        try {
          for (const iframeItem of iframeElements) {
            if (iframeItem.srcDoc) {
              const bounds = await parseSrcDocForUnbreakableElements(iframeItem.srcDoc);
              iframeBounds.push(...bounds);
            }
          }
          console.log('Found unbreakable elements in iframes:', iframeBounds.length);
        } catch (error) {
          console.warn('Error processing iframe srcDoc:', error);
        }
      }

      // After the content is rendered, check for page spans
      setTimeout(() => {
        if (measureRef.current) {
          const containerBounds = measureRef.current.getBoundingClientRect();
          const regularUnbreakableBounds = getUnbreakableElementBounds(measureRef.current);
          const allUnbreakableBounds = [...regularUnbreakableBounds, ...iframeBounds];
          
          console.log('=== UNBREAKABLE ELEMENTS PAGE SPAN ANALYSIS ===');
          console.log(`Regular elements: ${regularUnbreakableBounds.length}, Iframe elements: ${iframeBounds.length}`);
          
          allUnbreakableBounds.forEach((bounds, index) => {
            const spanInfo = checkElementPageSpan(bounds, containerBounds, effectivePageHeight);
            
            console.log(`Unbreakable element ${index + 1}:`, {
              height: `${spanInfo.elementHeight}px`,
              spansMultiplePages: spanInfo.spansMultiplePages,
              pageRange: spanInfo.spansMultiplePages 
                ? `Pages ${spanInfo.startPage}-${spanInfo.endPage}` 
                : `Page ${spanInfo.startPage}`,
              warning: spanInfo.spansMultiplePages ? '⚠️ SPANS MULTIPLE PAGES!' : '✅ Contained in single page'
            });
          });
          
          // Find elements that span multiple pages
          const spanningElements = allUnbreakableBounds
            .map((bounds, index) => ({ 
              index, 
              bounds, 
              spanInfo: checkElementPageSpan(bounds, containerBounds, effectivePageHeight) 
            }))
            .filter(item => item.spanInfo.spansMultiplePages);
          
          if (spanningElements.length > 0) {
            console.warn(`🚨 ${spanningElements.length} unbreakable elements span multiple pages:`, 
              spanningElements.map(item => ({
                elementIndex: item.index + 1,
                pageRange: `${item.spanInfo.startPage}-${item.spanInfo.endPage}`,
                height: `${item.spanInfo.elementHeight}px`
              }))
            );
          } else {
            console.log('✅ All unbreakable elements are contained within single pages');
          }
        }
      }, 100); // Increased timeout to allow iframe processing

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

    const resizeObserver = new ResizeObserver(() => {
      measureAndPaginate();
    });
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
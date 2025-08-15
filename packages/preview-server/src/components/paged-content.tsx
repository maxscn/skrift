"use client"
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
        zIndex: 0
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
const parseSrcDocForUnbreakableElements = async (srcDoc: string): Promise<{bounds: DOMRect, existingMarginTop: number}[]> => {
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
        const results = Array.from(elements).map(el => {
          const bounds = el.getBoundingClientRect();
          
          // Check margin on the unbreakable container itself
          const containerStyle = iframeDoc.defaultView?.getComputedStyle(el);
          const containerMarginTop = containerStyle ? parseFloat(containerStyle.marginTop) || 0 : 0;
          
          // Check margin on the first child element (which might be where the actual margin is)
          const firstChild = el.firstElementChild;
          const firstChildMarginTop = firstChild && iframeDoc.defaultView ? 
            parseFloat(iframeDoc.defaultView.getComputedStyle(firstChild).marginTop) || 0 : 0;
          
          // Use the maximum of container and first child margins (accounting for margin collapse)
          const existingMarginTop = Math.max(containerMarginTop, firstChildMarginTop);
          
          console.log('Iframe element margin detection:', {
            containerMarginTop,
            firstChildMarginTop,
            effectiveMarginTop: existingMarginTop,
            firstChildTagName: firstChild?.tagName,
            firstChildClasses: firstChild?.className
          });
          
          return { bounds, existingMarginTop };
        });
        
        document.body.removeChild(iframe);
        resolve(results);
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

// Helper function to apply margin to iframe srcDoc content
const applyMarginToIframeSrcDoc = (srcDoc: string, marginTop: number): string => {
  // Parse the srcDoc HTML and add margin-top to first .skrift-unbreakable element
  const parser = new DOMParser();
  const doc = parser.parseFromString(srcDoc, 'text/html');
  const unbreakableElement = doc.querySelector('.skrift-unbreakable');
  
  if (unbreakableElement) {
    const currentStyle = unbreakableElement.getAttribute('style') || '';
    
    // For iframe content, we can't easily compute styles from CSS classes,
    // so we'll apply the margin directly and let CSS handle any conflicts
    // Apply the margin with !important to override any existing styles
    const newStyle = currentStyle.replace(/margin-top:\s*[^;]+;?/g, '') + `; margin-top: ${marginTop}px !important;`;
    unbreakableElement.setAttribute('style', newStyle);
    
    // Return the modified HTML
    return doc.documentElement.outerHTML;
  }
  
  return srcDoc;
};

// Helper function to apply margin to unbreakable elements
const applyMarginToUnbreakableElements = (
  children: React.ReactNode,
  unbreakableMargins: Map<string, number>,
  iframeMargins: Map<string, number> = new Map()
): React.ReactNode => {
  const applyMargin = (node: React.ReactNode, path: number[] = []): React.ReactNode => {
    if (!node) return node;
    console.log('Applying margin to node:', node, 'at path:', path);
    if (React.isValidElement(node)) {
      const pathKey = path.join('-');
      const marginTop = unbreakableMargins.get(pathKey);
      const iframeMargin = iframeMargins.get(pathKey);
      const props = node.props as any;
      
      // Handle iframe with srcDoc that needs margin
      if (props.srcDoc && iframeMargin && iframeMargin > 0) {
        console.log(`Applying ${iframeMargin}px margin to iframe srcDoc at path ${pathKey}`);
        const modifiedSrcDoc = applyMarginToIframeSrcDoc(props.srcDoc, iframeMargin);
        return React.cloneElement(node, {
          ...props,
          srcDoc: modifiedSrcDoc
        });
      }
      
      // Check if this element needs margin (regular unbreakable elements)
      if (marginTop && marginTop > 0 && 
          typeof props.className === 'string' && 
          props.className.includes('skrift-unbreakable')) {
        console.log(`Applying ${marginTop}px margin to unbreakable element at path ${pathKey}`);
        console.log('Element props:', {
          className: props.className,
          existingStyle: props.style,
          existingMarginTop: props.style?.marginTop
        });
        
        return React.cloneElement(node, {
          ...props,
          style: {
            ...props.style,
            marginTop: `${marginTop}px !important`
          }
        });
      }
      
      // Recursively process children
      if (props.children) {
        let processedChildren: React.ReactNode;
        if (Array.isArray(props.children)) {
          processedChildren = props.children.map((child: any, index: number) => 
            applyMargin(child, [...path, index])
          );
        } else {
          processedChildren = applyMargin(props.children, [...path, 0]);
        }
        
        return React.cloneElement(node, props, processedChildren);
      }
      
      return node;
    } else if (Array.isArray(node)) {
      return node.map((child: any, index: number) => 
        applyMargin(child, [...path, index])
      );
    }
    
    return node;
  };
  
  return applyMargin(children);
};

// Helper function to recursively find unbreakable elements and iframes
const findUnbreakableElements = (children: React.ReactNode): { 
  element: React.ReactElement, 
  bounds?: DOMRect,
  isIframe?: boolean,
  srcDoc?: string,
  path: number[]
}[] => {
  const unbreakableElements: { 
    element: React.ReactElement, 
    bounds?: DOMRect,
    isIframe?: boolean,
    srcDoc?: string,
    path: number[]
  }[] = [];
  
  const traverse = (node: React.ReactNode, path: number[] = []) => {
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
          srcDoc: props.srcDoc,
          path
        });
        return; // Don't traverse children of iframe
      }
      
      // Check if this element has className="unbreakable"
      if (typeof props.className === 'string' && 
          props.className.includes('skrift-unbreakable')) {
        unbreakableElements.push({ element: node, path });
      }
      
      // Recursively check children
      if (props.children) {
        if (Array.isArray(props.children)) {
          props.children.forEach((child: any, index: number) => {
            traverse(child, [...path, index]);
          });
        } else {
          traverse(props.children, [...path, 0]);
        }
      }
    } else if (Array.isArray(node)) {
      node.forEach((child: any, index: number) => {
        traverse(child, [...path, index]);
      });
    }
  };
  
  traverse(children);
  return unbreakableElements;
};

// Helper function to get element bounds by className
const getUnbreakableElementBounds = (container: HTMLElement, className: string = 'skrift-unbreakable'): DOMRect[] => {
  const elements = container.querySelectorAll(`.${className}`);
  return Array.from(elements).map(el => el.getBoundingClientRect());
};

// Helper function to calculate existing margins that affect positioning
const getExistingMargins = (element: Element): {
  precedingMarginBottom: number,
  elementMarginTop: number,
  firstChildMarginTop: number,
  totalVerticalMargin: number
} => {
  let precedingMarginBottom = 0;
  let elementMarginTop = 0;
  let firstChildMarginTop = 0;

  try {
    // Get the element's own margin-top from computed styles (includes CSS classes)
    const elementStyles = getComputedStyle(element);
    elementMarginTop = parseFloat(elementStyles.marginTop) || 0;

    // Find the preceding sibling element
    let precedingSibling = element.previousElementSibling;
    while (precedingSibling && getComputedStyle(precedingSibling).display === 'none') {
      precedingSibling = precedingSibling.previousElementSibling;
    }

    if (precedingSibling) {
      const siblingStyles = getComputedStyle(precedingSibling);
      precedingMarginBottom = parseFloat(siblingStyles.marginBottom) || 0;
    }

    // Get the first child's margin-top (for margin collapse scenarios)
    const firstChild = element.firstElementChild;
    if (firstChild) {
      const firstChildStyles = getComputedStyle(firstChild);
      firstChildMarginTop = parseFloat(firstChildStyles.marginTop) || 0;
    }
  } catch (error) {
    console.warn('Error calculating existing margins:', error);
  }

  // Calculate total vertical margin that would affect the element's effective position
  // In margin collapse scenarios, we want the larger of the margins
  const totalVerticalMargin = Math.max(precedingMarginBottom, elementMarginTop, firstChildMarginTop);

  console.log('Regular element margin detection:', {
    elementTagName: element.tagName,
    elementClasses: element.className,
    precedingMarginBottom,
    elementMarginTop,
    firstChildMarginTop,
    firstChildTagName: element.firstElementChild?.tagName,
    firstChildClasses: element.firstElementChild?.className,
    effectiveMargin: totalVerticalMargin
  });

  return {
    precedingMarginBottom,
    elementMarginTop,
    firstChildMarginTop,
    totalVerticalMargin
  };
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
  const [processedChildren, setProcessedChildren] = useState<React.ReactNode>(children);
  const [hasAppliedMargins, setHasAppliedMargins] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current || !measureRef.current || !children) return;
    
    const measureAndPaginate = async () => {
      if (!measureRef.current) return;
      
      // Reset margins flag when children change
      setHasAppliedMargins(false);

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
      console.log('Page dimensions:', {
        pageHeight: pageHeight,
        effectivePageHeight: effectivePageHeight,
        pageWidth: pageWidth
      });

      // Process iframe elements with srcDoc
      const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
      let iframeElementsData: {bounds: DOMRect, existingMarginTop: number}[] = [];

      if (iframeElements.length > 0) {
        console.log('Processing iframe elements with srcDoc...');
        try {
          for (const iframeItem of iframeElements) {
            if (iframeItem.srcDoc) {
              const elementsData = await parseSrcDocForUnbreakableElements(iframeItem.srcDoc);
              iframeElementsData.push(...elementsData);
            }
          }
          console.log('Found unbreakable elements in iframes:', iframeElementsData.length);
        } catch (error) {
          console.warn('Error processing iframe srcDoc:', error);
        }
      }

      // After the content is rendered, check for page spans
      setTimeout(() => {
        if (measureRef.current) {
          const containerBounds = measureRef.current.getBoundingClientRect();
          const regularUnbreakableBounds = getUnbreakableElementBounds(measureRef.current);
          const iframeBounds = iframeElementsData.map(item => item.bounds);
          const allUnbreakableBounds = [...regularUnbreakableBounds, ...iframeBounds];
          
          console.log('=== CONTAINER AND BOUNDS DEBUG ===');
          console.log('Container bounds:', {
            top: containerBounds.top,
            left: containerBounds.left,
            width: containerBounds.width,
            height: containerBounds.height
          });
          console.log('Container computed style:', {
            padding: getComputedStyle(measureRef.current).padding,
            margin: getComputedStyle(measureRef.current).margin,
            border: getComputedStyle(measureRef.current).border
          });
          console.log(`Page height: ${effectivePageHeight}px`);
          console.log('=== UNBREAKABLE ELEMENTS PAGE SPAN ANALYSIS ===');
          console.log(`Regular elements: ${regularUnbreakableBounds.length}, Iframe elements: ${iframeElementsData.length}`);
          
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
          
          if (spanningElements.length > 0 && !hasAppliedMargins) {
            console.warn(`🚨 ${spanningElements.length} unbreakable elements span multiple pages:`, 
              spanningElements.map(item => ({
                elementIndex: item.index + 1,
                pageRange: `${item.spanInfo.startPage}-${item.spanInfo.endPage}`,
                height: `${item.spanInfo.elementHeight}px`
              }))
            );
            
            // Calculate margins for spanning elements
            const unbreakableMargins = new Map<string, number>();
            const iframeMargins = new Map<string, number>();
            const domUnbreakables = Array.from(measureRef.current.querySelectorAll('.skrift-unbreakable'));

            // Create a mapping between DOM elements and React elements with paths
            const domToReactElementMap = new Map<Element, { path: number[], isIframe: boolean }>();
            
            // First pass: map regular unbreakable elements
            unbreakableElements
              .filter(item => !item.isIframe)
              .forEach((reactElement, reactIndex) => {
                const domElement = domUnbreakables[reactIndex];
                if (domElement) {
                  domToReactElementMap.set(domElement, {
                    path: reactElement.path,
                    isIframe: false
                  });
                }
              });
            
            spanningElements.forEach((item, itemIndex) => {
              const relativeTop = item.bounds.top - containerBounds.top;
              const currentPage = Math.floor(relativeTop / effectivePageHeight) + 1;
              const nextPageStart = currentPage * effectivePageHeight;
              // Calculate how much margin is needed to push the element to the next page
              const baseMarginNeeded = nextPageStart - relativeTop;
              
              console.log(`=== MARGIN CALCULATION DEBUG for element ${itemIndex} ===`);
              console.log('Element bounds:', {
                top: item.bounds.top,
                left: item.bounds.left,
                width: item.bounds.width,
                height: item.bounds.height
              });
              console.log('Position calculations:', {
                containerTop: containerBounds.top,
                elementAbsoluteTop: item.bounds.top,
                relativeTop: relativeTop,
                currentPage: currentPage,
                nextPageStart: nextPageStart,
                baseMarginNeeded: baseMarginNeeded,
                effectivePageHeight: effectivePageHeight
              });
              
              // Check if this is an element inside an iframe (from iframe bounds)
              const isFromIframe = item.index >= regularUnbreakableBounds.length;
              
              if (isFromIframe) {
                // This is an unbreakable element inside an iframe
                // Get the existing margin for this specific iframe element
                const iframeDataIndex = item.index - regularUnbreakableBounds.length;
                const iframeElementData = iframeElementsData[iframeDataIndex];
                const existingMarginTop = iframeElementData?.existingMarginTop || 0;
                
                // Add existing margin to base margin needed because the element's current position
                // already factors in its existing margin, so we need additional margin on top
                const adjustedMarginNeeded = baseMarginNeeded + existingMarginTop;
                
                // Apply to all iframes that contain unbreakable elements
                iframeElements.forEach((iframeElement) => {
                  if (iframeElement && iframeElement.path) {
                    const pathKey = iframeElement.path.join('-');
                    // Only set if not already set (avoid overwriting with smaller values)
                    const existingMargin = iframeMargins.get(pathKey) || 0;
                    if (adjustedMarginNeeded > existingMargin) {
                      iframeMargins.set(pathKey, adjustedMarginNeeded);
                      console.log(`Applied margin ${adjustedMarginNeeded}px to iframe at path ${pathKey} (base: ${baseMarginNeeded}px + existing: ${existingMarginTop}px)`);
                    }
                  }
                });
              } else {
                // This is a regular unbreakable element - account for existing margins
                const domElement = domUnbreakables[item.index];
                if (domElement) {
                  const reactElementInfo = domToReactElementMap.get(domElement);
                  
                  if (reactElementInfo) {
                    const existingMargins = getExistingMargins(domElement);
                    
                    // Add existing margins because the element's measured position already includes them
                    // and we need additional margin on top to push it to the next page
                    const adjustedMarginNeeded = baseMarginNeeded + existingMargins.totalVerticalMargin;
                    
                    const pathKey = reactElementInfo.path.join('-');
                    unbreakableMargins.set(pathKey, adjustedMarginNeeded);
                    
                    console.log(`Applied margin ${adjustedMarginNeeded}px to unbreakable element at path ${pathKey}`, {
                      baseMarginNeeded,
                      totalVerticalMargin: existingMargins.totalVerticalMargin,
                      existingMargins,
                      finalMargin: adjustedMarginNeeded,
                      elementBounds: {
                        top: item.bounds.top,
                        height: item.bounds.height,
                        relativeTop: relativeTop,
                        nextPageStart: nextPageStart
                      }
                    });
                  }
                }
              }
            });
            
            // Apply margins to children
            const updatedChildren = applyMarginToUnbreakableElements(children, unbreakableMargins, iframeMargins);
            setProcessedChildren(updatedChildren);
            setHasAppliedMargins(true);
            
            // Continue with pagination using updated children
            setTimeout(() => {
              if (measureRef.current) {
                const newContentHeight = measureRef.current.scrollHeight;
                const newPagesNeeded = Math.max(1, Math.ceil(newContentHeight / effectivePageHeight));
                
                const finalPages: React.ReactNode[] = [];
                for (let i = 0; i < newPagesNeeded; i++) {
                  const pageContent = (
                    <div
                      key={i}
                      style={{
                        transform: `translateY(-${i * effectivePageHeight}px)`,
                        width: '100%',
                        position: 'relative'
                      }}
                    >
                      {updatedChildren}
                    </div>
                  );
                  finalPages.push(pageContent);
                }
                setPages(finalPages);
              }
            }, 50);
            return; // Exit early to prevent normal pagination
          } else if (!hasAppliedMargins) {
            console.log('✅ All unbreakable elements are contained within single pages');
            setProcessedChildren(children);
          }
        }
      }, 100); // Increased timeout to allow iframe processing

      const newPages: React.ReactNode[] = [];

      // Only create pages if we haven't applied margins (normal case) or if we're not in the margin application phase
      if (!hasAppliedMargins) {
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
              {processedChildren}
            </div>
          );
          newPages.push(pageContent);
        }

        setPages(newPages);
      }
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
          visibility: 'hidden',
          padding: '0',
          margin: '0',
          border: 'none'
        }}
      >
        {processedChildren}
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
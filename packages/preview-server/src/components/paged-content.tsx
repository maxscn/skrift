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
const parseSrcDocForUnbreakableElements = async (srcDoc: string): Promise<{ bounds: DOMRect, existingMarginTop: number }[]> => {
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

          // Use recursive function to find effective top margin from any nested child
          const existingMarginTop = getEffectiveTopMargin(el, iframeDoc);

          console.log('Iframe element margin detection:', {
            elementTagName: el.tagName,
            elementClasses: el.className,
            effectiveMarginTop: existingMarginTop,
            elementTree: getElementHierarchy(el, iframeDoc, 3) // Show first 3 levels for debugging
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

// Helper function to insert table headers at page breaks
const insertTableHeaders = (
  children: React.ReactNode,
  spanningTables: Array<{
    index: number,
    tableInfo: {
      table: React.ReactElement,
      header: React.ReactElement | null,
      estimatedHeight: number,
      estimatedTop: number,
      path: number[]
    },
    spanInfo: { spansMultiplePages: boolean, startPage: number, endPage: number, pageBreaks: number[] },
    tableWithHeader?: { table: React.ReactElement, header: React.ReactElement | null, path: number[] }
  }>
): React.ReactNode => {
  if (spanningTables.length === 0) return children;

  const processNode = (node: React.ReactNode, path: number[] = []): React.ReactNode => {
    if (!node) return node;
    
    if (React.isValidElement(node)) {
      const props = node.props as any;
      const pathKey = path.join('-');
      
      // Check if this is a table that spans multiple pages
      const spanningTable = spanningTables.find(table => 
        table.tableWithHeader && 
        table.tableWithHeader.path.join('-') === pathKey
      );

      if (spanningTable && spanningTable.tableWithHeader?.header) {
        console.log(`Adding header repetition to table at path ${pathKey}`);
        
        // Clone the table and modify its structure to include repeated headers
        const tableHeader = spanningTable.tableWithHeader.header;
        const tableBody = React.Children.toArray(props.children).find((child: any) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as any;
            return (childProps['data-skrift-table-body'] === 'true' || 
                   (typeof childProps.className === 'string' && childProps.className.includes('skrift-table-body')));
          }
          return false;
        });

        if (tableBody && React.isValidElement(tableBody)) {
          // Add CSS to repeat headers at page breaks
          const enhancedTableStyle = {
            ...props.style,
            // CSS for table header repetition
            '--skrift-table-header': 'repeat'
          };

          // Add a data attribute to mark this table for header repetition
          return React.cloneElement(node, {
            ...props,
            style: enhancedTableStyle,
            'data-skrift-table-repeat-header': 'true',
            children: React.Children.map(props.children, (child: any) => {
              if (React.isValidElement(child) && child === tableHeader) {
                // Mark header for repetition
                const childProps = child.props as any;
                return React.cloneElement(child, {
                  ...childProps,
                  style: {
                    ...childProps.style,
                    // Ensure header appears at page breaks
                    breakAfter: 'avoid',
                    breakInside: 'avoid'
                  },
                  'data-skrift-repeat-header': 'true'
                });
              }
              return child;
            })
          });
        }
      }

      // Recursively process children
      if (props.children) {
        let processedChildren: React.ReactNode;
        if (Array.isArray(props.children)) {
          processedChildren = props.children.map((child: any, index: number) =>
            processNode(child, [...path, index])
          );
        } else {
          processedChildren = processNode(props.children, [...path, 0]);
        }

        return React.cloneElement(node, props, processedChildren);
      }

      return node;
    } else if (Array.isArray(node)) {
      return node.map((child: any, index: number) =>
        processNode(child, [...path, index])
      );
    }

    return node;
  };

  return processNode(children);
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

// Helper function to find tables and extract their headers
const findTablesWithHeaders = (children: React.ReactNode): {
  table: React.ReactElement,
  header: React.ReactElement | null,
  path: number[]
}[] => {
  const tablesWithHeaders: {
    table: React.ReactElement,
    header: React.ReactElement | null,
    path: number[]
  }[] = [];

  const traverse = (node: React.ReactNode, path: number[] = []) => {
    if (!node) return;
    
    if (React.isValidElement(node)) {
      const props = node.props as any;

      // Check if this is a table element
      if (props['data-skrift-table'] === 'true' || 
          (typeof props.className === 'string' && props.className.includes('skrift-table'))) {
        
        // Extract header from table children
        let header: React.ReactElement | null = null;
        
        const extractHeader = (tableChildren: React.ReactNode) => {
          if (React.isValidElement(tableChildren)) {
            const childProps = tableChildren.props as any;
            if (childProps['data-skrift-table-header'] === 'true' || 
                (typeof childProps.className === 'string' && childProps.className.includes('skrift-table-header'))) {
              header = tableChildren;
            }
          } else if (Array.isArray(tableChildren)) {
            tableChildren.forEach(extractHeader);
          }
        };

        if (props.children) {
          extractHeader(props.children);
        }

        tablesWithHeaders.push({ 
          table: node, 
          header, 
          path 
        });
        return; // Don't traverse children of table
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
  return tablesWithHeaders;
};



// Helper function to estimate table dimensions in React tree
const estimateTableDimensions = (
  children: React.ReactNode
): Array<{
  table: React.ReactElement,
  header: React.ReactElement | null,
  estimatedHeight: number,
  estimatedTop: number,
  path: number[]
}> => {
  const tables: Array<{
    table: React.ReactElement,
    header: React.ReactElement | null,
    estimatedHeight: number,
    estimatedTop: number,
    path: number[]
  }> = [];
  
  let currentY = 0;
  
  const traverse = (node: React.ReactNode, path: number[] = []) => {
    if (!node) return;
    
    if (React.isValidElement(node)) {
      const props = node.props as any;
      const elementType = node.type;
      
      // Debug: Log all elements we encounter
      if (typeof elementType === 'string') {
        console.log(`Found element: ${elementType}`, {
          className: props.className,
          dataAttributes: Object.keys(props).filter(key => key.startsWith('data-')),
          hasChildren: !!props.children
        });
      }
      
      // Check if this is a table element - expanded detection
      const isTable = props['data-skrift-table'] === 'true' || 
                     (typeof props.className === 'string' && props.className.includes('skrift-table')) ||
                     elementType === 'table' ||
                     (typeof elementType === 'string' && elementType.toLowerCase() === 'table');
      
      if (isTable) {
        console.log('🎯 FOUND TABLE!', {
          type: elementType,
          className: props.className,
          dataAttributes: Object.keys(props).filter(key => key.startsWith('data-')),
          path: path.join('-')
        });
        
        // Extract table header
        let header: React.ReactElement | null = null;
        let rowCount = 0;
        let headerRowCount = 0;
        
        const analyzeTableContent = (child: React.ReactNode) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as any;
            const childType = child.type;
            
            // Found table header - expanded detection
            const isTableHeader = childProps['data-skrift-table-header'] === 'true' || 
                                 (typeof childProps.className === 'string' && childProps.className.includes('skrift-table-header')) ||
                                 childType === 'thead' ||
                                 (typeof childType === 'string' && childType.toLowerCase() === 'thead');
                                 
            if (isTableHeader) {
              header = child;
              console.log('📋 Found table header!', { type: childType, className: childProps.className });
              // Count header rows
              const countHeaderRows = (headerChild: React.ReactNode) => {
                if (React.isValidElement(headerChild)) {
                  const headerChildProps = headerChild.props as any;
                  const headerChildType = headerChild.type;
                  
                  const isTableRow = headerChildProps['data-skrift-table-row'] === 'true' || 
                                   (typeof headerChildProps.className === 'string' && headerChildProps.className.includes('skrift-table-row')) ||
                                   headerChildType === 'tr' ||
                                   (typeof headerChildType === 'string' && headerChildType.toLowerCase() === 'tr');
                                   
                  if (isTableRow) {
                    headerRowCount++;
                    console.log('📊 Found header row!', { type: headerChildType, count: headerRowCount });
                  }
                  if (headerChildProps.children) {
                    if (Array.isArray(headerChildProps.children)) {
                      headerChildProps.children.forEach(countHeaderRows);
                    } else {
                      countHeaderRows(headerChildProps.children);
                    }
                  }
                } else if (Array.isArray(headerChild)) {
                  headerChild.forEach(countHeaderRows);
                }
              };
              countHeaderRows(child);
            }
            
            // Found table body - count total rows
            const isTableBody = childProps['data-skrift-table-body'] === 'true' || 
                               (typeof childProps.className === 'string' && childProps.className.includes('skrift-table-body')) ||
                               childType === 'tbody' ||
                               (typeof childType === 'string' && childType.toLowerCase() === 'tbody');
                               
            if (isTableBody) {
              console.log('📝 Found table body!', { type: childType, className: childProps.className });
              const countRows = (bodyChild: React.ReactNode) => {
                if (React.isValidElement(bodyChild)) {
                  const bodyChildProps = bodyChild.props as any;
                  const bodyChildType = bodyChild.type;
                  
                  const isTableRow = bodyChildProps['data-skrift-table-row'] === 'true' || 
                                   (typeof bodyChildProps.className === 'string' && bodyChildProps.className.includes('skrift-table-row')) ||
                                   bodyChildType === 'tr' ||
                                   (typeof bodyChildType === 'string' && bodyChildType.toLowerCase() === 'tr');
                                   
                  if (isTableRow) {
                    rowCount++;
                    console.log('📋 Found body row!', { type: bodyChildType, count: rowCount });
                  }
                  if (bodyChildProps.children) {
                    if (Array.isArray(bodyChildProps.children)) {
                      bodyChildProps.children.forEach(countRows);
                    } else {
                      countRows(bodyChildProps.children);
                    }
                  }
                } else if (Array.isArray(bodyChild)) {
                  bodyChild.forEach(countRows);
                }
              };
              countRows(child);
            }
            
            if (childProps.children) {
              if (Array.isArray(childProps.children)) {
                childProps.children.forEach(analyzeTableContent);
              } else {
                analyzeTableContent(childProps.children);
              }
            }
          } else if (Array.isArray(child)) {
            child.forEach(analyzeTableContent);
          }
        };
        
        analyzeTableContent(props.children);
        
        // Estimate table height (rough calculation)
        const estimatedRowHeight = 40; // Average row height in pixels
        const totalRows = headerRowCount + rowCount;
        const estimatedHeight = Math.max(100, totalRows * estimatedRowHeight);
        
        tables.push({
          table: node,
          header,
          estimatedHeight,
          estimatedTop: currentY,
          path
        });
        
        console.log(`Table found: ${totalRows} rows (${headerRowCount} header, ${rowCount} body), estimated height: ${estimatedHeight}px at Y: ${currentY}px`);
        
        currentY += estimatedHeight;
        return; // Don't traverse children as we've analyzed them
      }
      
      // For non-table elements, estimate their contribution to height
      const elementHeight = estimateElementHeight(node);
      currentY += elementHeight;
      
      // Recursively check children for non-table elements
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
  return tables;
};

// Helper function to estimate element height
const estimateElementHeight = (element: React.ReactElement): number => {
  const props = element.props as any;
  const tagName = element.type;
  
  // Basic height estimates based on element type
  if (typeof tagName === 'string') {
    switch (tagName) {
      case 'h1': return 60;
      case 'h2': return 50;
      case 'h3': return 40;
      case 'h4': case 'h5': case 'h6': return 35;
      case 'p': return 25;
      case 'div': return props.children ? 20 : 10;
      case 'span': return 20;
      case 'br': return 20;
      default: return 25;
    }
  }
  
  return 25; // Default for custom components
};

// Helper function to check if a table spans multiple pages using virtual dimensions
const checkTablePageSpanVirtual = (
  tableInfo: {
    table: React.ReactElement,
    header: React.ReactElement | null,
    estimatedHeight: number,
    estimatedTop: number,
    path: number[]
  },
  pageHeight: number
): {
  spansMultiplePages: boolean,
  startPage: number,
  endPage: number,
  pageBreaks: number[]
} => {
  const relativeTop = tableInfo.estimatedTop;
  const relativeBottom = relativeTop + tableInfo.estimatedHeight;

  const startPage = Math.floor(relativeTop / pageHeight) + 1;
  const endPage = Math.floor((relativeBottom - 1) / pageHeight) + 1;
  
  // Calculate page break positions within the table
  const pageBreaks: number[] = [];
  for (let page = startPage; page < endPage; page++) {
    const pageBreakPosition = page * pageHeight - relativeTop;
    pageBreaks.push(pageBreakPosition);
  }

  return {
    spansMultiplePages: startPage !== endPage,
    startPage,
    endPage,
    pageBreaks
  };
};

// Helper function to create page content with repeated table headers
const createPageContentWithTableHeaders = (
  originalContent: React.ReactNode,
  pageIndex: number,
  pageHeight: number,
  spanningTables: Array<{
    index: number,
    tableInfo: {
      table: React.ReactElement,
      header: React.ReactElement | null,
      estimatedHeight: number,
      estimatedTop: number,
      path: number[]
    },
    spanInfo: { spansMultiplePages: boolean, startPage: number, endPage: number, pageBreaks: number[] },
    tableWithHeader: { table: React.ReactElement, header: React.ReactElement | null, path: number[] } | undefined
  }>
): React.ReactNode => {
  const currentPage = pageIndex + 1;
  
  // Find tables that need headers on this page (tables that continue from previous page)
  const tablesNeedingHeaders = spanningTables.filter(item => {
    return (item.tableWithHeader?.header || item.tableInfo.header) && 
           currentPage > item.spanInfo.startPage && 
           currentPage <= item.spanInfo.endPage;
  });

  if (tablesNeedingHeaders.length === 0) {
    return originalContent;
  }

  console.log(`Page ${currentPage}: Adding headers for ${tablesNeedingHeaders.length} tables`);

  // Calculate where headers should be inserted
  const headerInsertions: Array<{
    yPosition: number,
    header: React.ReactElement,
    tableIndex: number
  }> = [];

  tablesNeedingHeaders.forEach(item => {
    const header = item.tableWithHeader?.header || item.tableInfo.header;
    if (header) {
      // Calculate the relative position of table within container using estimated dimensions
      const relativeTableTop = item.tableInfo.estimatedTop;
      const pageStartY = (currentPage - 1) * pageHeight;
      
      // Position header at the beginning of current page where table continues
      const headerY = Math.max(0, pageStartY - relativeTableTop);
      
      headerInsertions.push({
        yPosition: headerY,
        header: header,
        tableIndex: item.index
      });

      console.log(`Table ${item.index}: Header at Y=${headerY}, Page ${currentPage}, TableTop=${relativeTableTop}, PageStart=${pageStartY}`);
    }
  });

  // Create content with headers inserted
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {originalContent}
      {headerInsertions.map((insertion) => (
        <div
          key={`table-header-${insertion.tableIndex}-page-${pageIndex}`}
          style={{
            position: 'absolute',
            top: `${insertion.yPosition}px`,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }}>
            {React.cloneElement(insertion.header)}
          </table>
        </div>
      ))}
    </div>
  );
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

// Helper function to show element hierarchy for debugging
const getElementHierarchy = (element: Element, doc: Document, maxDepth: number = 3): any => {
  const getHierarchy = (el: Element, depth: number): any => {
    if (depth <= 0) return '...';

    const computedStyle = doc.defaultView?.getComputedStyle(el);
    const marginTop = computedStyle ? parseFloat(computedStyle.marginTop) || 0 : 0;

    return {
      tag: el.tagName,
      classes: el.className,
      marginTop: marginTop,
      firstChild: el.firstElementChild ? getHierarchy(el.firstElementChild, depth - 1) : null
    };
  };

  return getHierarchy(element, maxDepth);
};

// Helper function to recursively find the effective top margin
const getEffectiveTopMargin = (element: Element, doc: Document = document): number => {
  try {
    const computedStyle = doc.defaultView?.getComputedStyle(element);
    const elementMarginTop = computedStyle ? parseFloat(computedStyle.marginTop) || 0 : 0;

    // Start with this element's margin
    let maxMargin = elementMarginTop;

    // Recursively check children for margins that might collapse/contribute
    const firstChild = element.firstElementChild;
    if (firstChild) {
      const childMargin = getEffectiveTopMargin(firstChild, doc);
      // In CSS margin collapse, nested margins can contribute to the effective margin
      maxMargin = Math.max(maxMargin, childMargin);
    }

    return maxMargin;
  } catch (error) {
    console.warn('Error calculating effective top margin:', error);
    return 0;
  }
};

// Helper function to calculate existing margins that affect positioning
const getExistingMargins = (element: Element): {
  precedingMarginBottom: number,
  elementMarginTop: number,
  firstChildMarginTop: number,
  effectiveTopMargin: number,
  totalVerticalMargin: number
} => {
  let precedingMarginBottom = 0;
  let elementMarginTop = 0;
  let firstChildMarginTop = 0;
  let effectiveTopMargin = 0;

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

    // Use recursive function to get the effective top margin from nested children
    effectiveTopMargin = getEffectiveTopMargin(element);
  } catch (error) {
    console.warn('Error calculating existing margins:', error);
  }

  // Calculate total vertical margin that would affect the element's effective position
  // In margin collapse scenarios, we want the larger of the margins
  const totalVerticalMargin = Math.max(precedingMarginBottom, elementMarginTop, firstChildMarginTop, effectiveTopMargin);

  console.log('Regular element margin detection:', {
    elementTagName: element.tagName,
    elementClasses: element.className,
    precedingMarginBottom,
    elementMarginTop,
    firstChildMarginTop,
    effectiveTopMargin,
    firstChildTagName: element.firstElementChild?.tagName,
    firstChildClasses: element.firstElementChild?.className,
    effectiveMargin: totalVerticalMargin
  });

  return {
    precedingMarginBottom,
    elementMarginTop,
    firstChildMarginTop,
    effectiveTopMargin,
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

      // Find all tables with headers
      const tablesWithHeaders = findTablesWithHeaders(children);
      console.log('Found tables with headers:', tablesWithHeaders.length);

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
      let iframeElementsData: { bounds: DOMRect, existingMarginTop: number }[] = [];

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
          console.log('=== TABLE PAGE SPAN ANALYSIS ===');
          // Analyze tables in React tree with estimated dimensions
          const tableAnalysis = estimateTableDimensions(children);
          console.log('Table analysis:', tableAnalysis);

          const spanningTables = tableAnalysis
            .map((tableInfo, index) => ({
              index,
              tableInfo,
              spanInfo: checkTablePageSpanVirtual(tableInfo, effectivePageHeight),
              tableWithHeader: tablesWithHeaders.find(t => t.table === tableInfo.table) || tablesWithHeaders[index]
            }))
            .filter(item => item.spanInfo.spansMultiplePages);

          if (spanningTables.length > 0) {
            console.log(`🔍 ${spanningTables.length} tables span multiple pages:`,
              spanningTables.map(item => ({
                tableIndex: item.index + 1,
                pageRange: `${item.spanInfo.startPage}-${item.spanInfo.endPage}`,
                height: `${item.tableInfo.estimatedHeight}px`,
                hasHeader: item.tableWithHeader?.header !== null,
                pageBreaks: item.spanInfo.pageBreaks
              }))
            );

            // Create pages with repeated table headers
            const pagesWithHeaders: React.ReactNode[] = [];
            for (let i = 0; i < pagesNeeded; i++) {
              const basePageContent = (
                <div
                  style={{
                    transform: `translateY(-${i * effectivePageHeight}px)`,
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  {processedChildren}
                </div>
              );

              const pageContentWithHeaders = createPageContentWithTableHeaders(
                basePageContent,
                i,
                effectivePageHeight,
                spanningTables
              );

              pagesWithHeaders.push(pageContentWithHeaders);
            }

            setPages(pagesWithHeaders);
            return; // Exit early to use pages with headers
          }

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
                console.log("reactElement", reactElement)
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

                // Do not apply margin if it's bigger than the page height
                if (adjustedMarginNeeded <= effectivePageHeight) {
                  // Apply to all iframes that contain unbreakable elements
                  iframeElements.forEach((iframeElement) => {
                    if (iframeElement && iframeElement.path?.length > 0) {
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
                  console.log(`Skipping margin application for iframe: ${adjustedMarginNeeded}px exceeds page height ${effectivePageHeight}px`);
                }
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

                    // Do not apply margin if it's bigger than the page height
                    if (adjustedMarginNeeded <= effectivePageHeight) {
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
                    } else {
                      console.log(`Skipping margin application for element: ${adjustedMarginNeeded}px exceeds page height ${effectivePageHeight}px`);
                    }
                  }
                }
              }
            });

            // Apply table header repetition and margins to children
            const childrenWithHeaders = insertTableHeaders(children, spanningTables);
            const updatedChildren = applyMarginToUnbreakableElements(childrenWithHeaders, unbreakableMargins, iframeMargins);
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

    // measureAndPaginate();
      let correctInARow = 0;
      let frame: number;
      let lastHeight = -1;

      const checkHeight = () => {
        const height = measureRef.current?.scrollHeight ?? 0;
        if (height !== lastHeight ) {
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
  }, [children, pageHeight, pageWidth, containerRef, measureRef]);

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
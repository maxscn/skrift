import React from 'react';

export interface UnbreakableElement {
  element: React.ReactElement;
  bounds?: DOMRect;
  isIframe?: boolean;
  srcDoc?: string;
  path: number[];
}

export interface TableWithHeader {
  table: React.ReactElement;
  header: React.ReactElement | null;
  path: number[];
}

export const findUnbreakableElements = (children: React.ReactNode): UnbreakableElement[] => {
  console.log('=== FIND UNBREAKABLE ELEMENTS START ===');
  const unbreakableElements: UnbreakableElement[] = [];

  const traverse = (node: React.ReactNode, path: number[] = []) => {
    if (!node) return;
    
    if (React.isValidElement(node)) {
      const props = node.props as any;

      if (props.srcDoc) {
        console.log(`🔍 Found iframe with srcDoc at path ${path.join('-')}`);
        unbreakableElements.push({
          element: node,
          isIframe: true,
          srcDoc: props.srcDoc,
          path
        });
        return;
      }

      if (typeof props.className === 'string' &&
        props.className.includes('skrift-unbreakable')) {
        console.log(`🔍 Found unbreakable element at path ${path.join('-')}:`, {
          className: props.className,
          tagName: node.type,
          path: path,
          pathKey: path.join('-')
        });
        unbreakableElements.push({ element: node, path });
      }

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
  console.log(`✅ FOUND ${unbreakableElements.length} UNBREAKABLE ELEMENTS:`, 
    unbreakableElements.map((item, index) => ({
      index,
      path: item.path,
      pathKey: item.path.join('-'),
      isIframe: item.isIframe,
      className: (item.element.props as any)?.className
    }))
  );
  return unbreakableElements;
};

export const findTablesWithHeaders = (children: React.ReactNode): TableWithHeader[] => {
  const tablesWithHeaders: TableWithHeader[] = [];

  const traverse = (node: React.ReactNode, path: number[] = []) => {
    if (!node) return;
    
    if (React.isValidElement(node)) {
      const props = node.props as any;

      if (props['data-skrift-table'] === 'true' || 
          (typeof props.className === 'string' && props.className.includes('skrift-table'))) {
        
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
        return;
      }

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

export const getUnbreakableElementBounds = (container: HTMLElement, className: string = 'skrift-unbreakable'): DOMRect[] => {
  const elements = container.querySelectorAll(`.${className}`);
  return Array.from(elements).map(el => el.getBoundingClientRect());
};

export const checkElementPageSpan = (elementBounds: DOMRect, containerBounds: DOMRect, pageHeight: number): {
  spansMultiplePages: boolean,
  startPage: number,
  endPage: number,
  elementHeight: number
} => {
  const relativeTop = elementBounds.top - containerBounds.top;
  const relativeBottom = relativeTop + elementBounds.height;

  const startPage = Math.floor(relativeTop / pageHeight) + 1;
  const endPage = Math.floor((relativeBottom - 1) / pageHeight) + 1;

  return {
    spansMultiplePages: startPage !== endPage,
    startPage,
    endPage,
    elementHeight: elementBounds.height
  };
};

export const analyzePageSpans = (
  allUnbreakableBounds: DOMRect[],
  containerBounds: DOMRect,
  effectivePageHeight: number
) => {
  console.log('=== UNBREAKABLE ELEMENTS PAGE SPAN ANALYSIS ===');
  console.log(`Total elements: ${allUnbreakableBounds.length}`);

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

  const spanningElements = allUnbreakableBounds
    .map((bounds, index) => ({
      index,
      bounds,
      spanInfo: checkElementPageSpan(bounds, containerBounds, effectivePageHeight)
    }))
    .filter(item => item.spanInfo.spansMultiplePages);

  return spanningElements;
};
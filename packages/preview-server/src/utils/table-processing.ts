import React from 'react';
import type { TableWithHeader } from './element-analysis';

export interface TableInfo {
  table: React.ReactElement;
  header: React.ReactElement | null;
  estimatedHeight: number;
  estimatedTop: number;
  path: number[];
}

export const estimateElementHeight = (element: React.ReactElement): number => {
  const props = element.props as any;
  const tagName = element.type;
  
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
  
  return 25;
};

export const estimateTableDimensions = (children: React.ReactNode): TableInfo[] => {
  const tables: TableInfo[] = [];
  let currentY = 0;
  
  const traverse = (node: React.ReactNode, path: number[] = []) => {
    if (!node) return;
    
    if (React.isValidElement(node)) {
      const props = node.props as any;
      const elementType = node.type;
      
      if (typeof elementType === 'string') {
        console.log(`Found element: ${elementType}`, {
          className: props.className,
          dataAttributes: Object.keys(props).filter(key => key.startsWith('data-')),
          hasChildren: !!props.children
        });
      }
      
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
        
        let header: React.ReactElement | null = null;
        let rowCount = 0;
        let headerRowCount = 0;
        
        const analyzeTableContent = (child: React.ReactNode) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as any;
            const childType = child.type;
            
            const isTableHeader = childProps['data-skrift-table-header'] === 'true' || 
                                 (typeof childProps.className === 'string' && childProps.className.includes('skrift-table-header')) ||
                                 childType === 'thead' ||
                                 (typeof childType === 'string' && childType.toLowerCase() === 'thead');
                                 
            if (isTableHeader) {
              header = child;
              console.log('📋 Found table header!', { type: childType, className: childProps.className });
              
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
        
        const estimatedRowHeight = 40;
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
        return;
      }
      
      const elementHeight = estimateElementHeight(node);
      currentY += elementHeight;
      
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

export const checkTablePageSpanVirtual = (
  tableInfo: TableInfo,
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

export const analyzeTableSpanning = (children: React.ReactNode, tablesWithHeaders: TableWithHeader[], effectivePageHeight: number) => {
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

  return spanningTables;
};

export const createPagesWithTableHeaders = (spanningTables: Array<any>, pagesNeeded: number, effectivePageHeight: number, processedChildren: React.ReactNode) => {
  const pagesWithHeaders: React.ReactNode[] = [];
  for (let i = 0; i < pagesNeeded; i++) {
    const basePageContent = React.createElement('div', {
      style: {
        transform: `translateY(-${i * effectivePageHeight}px)`,
        width: '100%',
        position: 'relative'
      }
    }, processedChildren);

    const pageContentWithHeaders = createPageContentWithTableHeaders(
      basePageContent,
      i,
      effectivePageHeight,
      spanningTables
    );

    pagesWithHeaders.push(pageContentWithHeaders);
  }
  return pagesWithHeaders;
};

export const createPageContentWithTableHeaders = (
  originalContent: React.ReactNode,
  pageIndex: number,
  pageHeight: number,
  spanningTables: Array<{
    index: number,
    tableInfo: TableInfo,
    spanInfo: { spansMultiplePages: boolean, startPage: number, endPage: number, pageBreaks: number[] },
    tableWithHeader?: { table: React.ReactElement, header: React.ReactElement | null, path: number[] }
  }>
): React.ReactNode => {
  const currentPage = pageIndex + 1;
  
  const tablesNeedingHeaders = spanningTables.filter(item => {
    return (item.tableWithHeader?.header || item.tableInfo.header) && 
           currentPage > item.spanInfo.startPage && 
           currentPage <= item.spanInfo.endPage;
  });

  if (tablesNeedingHeaders.length === 0) {
    return originalContent;
  }

  console.log(`Page ${currentPage}: Adding headers for ${tablesNeedingHeaders.length} tables`);

  const headerInsertions: Array<{
    yPosition: number,
    header: React.ReactElement,
    tableIndex: number
  }> = [];

  tablesNeedingHeaders.forEach(item => {
    const header = item.tableWithHeader?.header || item.tableInfo.header;
    if (header) {
      const relativeTableTop = item.tableInfo.estimatedTop;
      const pageStartY = (currentPage - 1) * pageHeight;
      const headerY = Math.max(0, pageStartY - relativeTableTop);
      
      headerInsertions.push({
        yPosition: headerY,
        header: header,
        tableIndex: item.index
      });

      console.log(`Table ${item.index}: Header at Y=${headerY}, Page ${currentPage}, TableTop=${relativeTableTop}, PageStart=${pageStartY}`);
    }
  });

  return React.createElement('div', {
    style: { position: 'relative', width: '100%', height: '100%' }
  }, [
    originalContent,
    ...headerInsertions.map((insertion) => 
      React.createElement('div', {
        key: `table-header-${insertion.tableIndex}-page-${pageIndex}`,
        style: {
          position: 'absolute',
          top: `${insertion.yPosition}px`,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid #e5e7eb'
        }
      }, React.createElement('table', {
        style: { width: '100%', borderCollapse: 'collapse', margin: 0, padding: 0 }
      }, React.cloneElement(insertion.header)))
    )
  ]);
};

export const insertTableHeaders = (
  children: React.ReactNode,
  spanningTables: Array<{
    index: number,
    tableInfo: TableInfo,
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
      
      const spanningTable = spanningTables.find(table => 
        table.tableWithHeader && 
        table.tableWithHeader.path.join('-') === pathKey
      );

      if (spanningTable && spanningTable.tableWithHeader?.header) {
        console.log(`Adding header repetition to table at path ${pathKey}`);
        
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
          const enhancedTableStyle = {
            ...props.style,
            '--skrift-table-header': 'repeat'
          };

          return React.cloneElement(node, {
            ...props,
            style: enhancedTableStyle,
            'data-skrift-table-repeat-header': 'true',
            children: React.Children.map(props.children, (child: any) => {
              if (React.isValidElement(child) && child === tableHeader) {
                const childProps = child.props as any;
                return React.cloneElement(child, {
                  ...childProps,
                  style: {
                    ...childProps.style,
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
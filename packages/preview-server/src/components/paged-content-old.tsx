"use client"
import React, { useLayoutEffect, useRef, useState } from 'react';
import { findUnbreakableElements, findTablesWithHeaders, getUnbreakableElementBounds, analyzePageSpans } from '../utils/element-analysis';
import { processIframeElements } from '../utils/iframe-processing';
import { calculateMargins, applyMarginToUnbreakableElements } from '../utils/margin-calculation';
import { analyzeTableSpanning, createPagesWithTableHeaders, insertTableHeaders } from '../utils/table-processing';
import { createDefaultPages, useHeightStabilization } from '../utils/pagination-core';

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

  const handleDOMAnalysis = async (
    containerBounds: DOMRect,
    regularUnbreakableBounds: DOMRect[],
    iframeElementsData: Array<{ bounds: DOMRect, existingMarginTop: number }>,
    effectivePageHeight: number,
    unbreakableElements: Array<any>,
    iframeElements: Array<any>,
    spanningTables: Array<any>,
    pagesNeeded: number
  ) => {
    const allUnbreakableBounds = [...regularUnbreakableBounds, ...iframeElementsData.map(item => item.bounds)];

    console.log('=== CONTAINER AND BOUNDS DEBUG ===');
    console.log('Container bounds:', {
      top: containerBounds.top,
      left: containerBounds.left,
      width: containerBounds.width,
      height: containerBounds.height
    });
    console.log('Container computed style:', {
      padding: getComputedStyle(measureRef.current!).padding,
      margin: getComputedStyle(measureRef.current!).margin,
      border: getComputedStyle(measureRef.current!).border
    });
    console.log(`Page height: ${effectivePageHeight}px`);

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

      const pagesWithHeaders = createPagesWithTableHeaders(spanningTables, pagesNeeded, effectivePageHeight, processedChildren);
      setPages(pagesWithHeaders);
      return true;
    }

    const spanningElements = analyzePageSpans(allUnbreakableBounds, containerBounds, effectivePageHeight);

    console.log('=== MARGIN APPLICATION DECISION ===');
    console.log('Spanning elements count:', spanningElements.length);
    console.log('Has applied margins already:', hasAppliedMargins);
    console.log('Will apply margins:', spanningElements.length > 0 && !hasAppliedMargins);

    if (spanningElements.length > 0 && !hasAppliedMargins) {
      console.warn(`🚨 ${spanningElements.length} unbreakable elements span multiple pages:`,
        spanningElements.map(item => ({
          elementIndex: item.index + 1,
          pageRange: `${item.spanInfo.startPage}-${item.spanInfo.endPage}`,
          height: `${item.spanInfo.elementHeight}px`
        }))
      );

      const { unbreakableMargins, iframeMargins } = calculateMargins(
        spanningElements,
        containerBounds,
        effectivePageHeight,
        regularUnbreakableBounds,
        iframeElementsData,
        unbreakableElements,
        iframeElements,
        measureRef
      );

      const childrenWithHeaders = insertTableHeaders(children, spanningTables);
      const updatedChildren = applyMarginToUnbreakableElements(childrenWithHeaders, unbreakableMargins, iframeMargins);
      setProcessedChildren(updatedChildren);
      setHasAppliedMargins(true);

      setTimeout(() => {
        if (measureRef.current) {
          const newContentHeight = measureRef.current.scrollHeight;
          const newPagesNeeded = Math.max(1, Math.ceil(newContentHeight / effectivePageHeight));
          const finalPages = createDefaultPages(newPagesNeeded, effectivePageHeight, updatedChildren);
          setPages(finalPages);
        }
      }, 50);
      return true;
    } else if (!hasAppliedMargins) {
      console.log('✅ All unbreakable elements are contained within single pages');
      setProcessedChildren(children);
    }

    return false;
  };

  const measureAndPaginate = async () => {
    if (!measureRef.current) return;

    setHasAppliedMargins(false);

    const unbreakableElements = findUnbreakableElements(children);
    console.log('Found unbreakable elements:', unbreakableElements.map(item => item.element));

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

    const { iframeElements, iframeElementsData } = await processIframeElements(unbreakableElements);

    setTimeout(async () => {
      if (measureRef.current) {
        const containerBounds = measureRef.current.getBoundingClientRect();
        const regularUnbreakableBounds = getUnbreakableElementBounds(measureRef.current);

        console.log('=== TABLE PAGE SPAN ANALYSIS ===');
        const spanningTables = analyzeTableSpanning(children, tablesWithHeaders, effectivePageHeight);

        const earlyReturn = await handleDOMAnalysis(
          containerBounds,
          regularUnbreakableBounds,
          iframeElementsData,
          effectivePageHeight,
          unbreakableElements,
          iframeElements,
          spanningTables,
          pagesNeeded
        );

        if (earlyReturn) return;
      }
    }, 100);

    if (!hasAppliedMargins) {
      const newPages = createDefaultPages(pagesNeeded, effectivePageHeight, processedChildren);
      setPages(newPages);
    }
  };

  useLayoutEffect(() => {
    if (!containerRef.current || !measureRef.current || !children) return;
    return useHeightStabilization(measureRef, measureAndPaginate);
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
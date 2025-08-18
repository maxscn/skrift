import type { UnbreakableElement } from './element-analysis';

export const parseSrcDocForUnbreakableElements = async (srcDoc: string): Promise<{ bounds: DOMRect, existingMarginTop: number }[]> => {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.visibility = 'hidden';
    iframe.style.width = '800px';
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
          const existingMarginTop = getEffectiveTopMargin(el, iframeDoc);

          console.log('Iframe element margin detection:', {
            elementTagName: el.tagName,
            elementClasses: el.className,
            effectiveMarginTop: existingMarginTop,
            elementTree: getElementHierarchy(el, iframeDoc, 3)
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

export const applyMarginToIframeSrcDoc = (srcDoc: string, marginTop: number): string => {
  const style = `<style>
    .skrift-unbreakable:first-of-type {
      margin-top: ${marginTop}px !important;
    }
  </style>`;
  
  if (srcDoc.includes('</head>')) {
    return srcDoc.replace('</head>', `${style}</head>`);
  } else if (srcDoc.includes('<body>')) {
    return srcDoc.replace('<body>', `<head>${style}</head><body>`);
  } else {
    return `<head>${style}</head>${srcDoc}`;
  }
};

export const applyMarginsToSpecificIframeElements = (srcDoc: string, elementMargins: Map<number, number>): string => {
  console.log('=== APPLY MARGINS TO IFRAME SRCDOC START ===');
  console.log('Element margins to apply:', Array.from(elementMargins.entries()));
  
  if (elementMargins.size === 0) {
    console.log('❌ No margins to apply');
    return srcDoc;
  }
  
  // Parse the HTML and apply inline styles directly to elements
  const parser = new DOMParser();
  const doc = parser.parseFromString(srcDoc, 'text/html');
  
  // Find all elements with skrift-unbreakable class
  const unbreakableElements = doc.querySelectorAll('.skrift-unbreakable');
  console.log(`Found ${unbreakableElements.length} unbreakable elements in iframe`);
  
  // Apply margins to specific elements by index
  for (const [elementIndex, margin] of elementMargins.entries()) {
    if (elementIndex < unbreakableElements.length) {
      const element = unbreakableElements[elementIndex] as HTMLElement;
      const existingStyle = element.getAttribute('style') || '';
      const newStyle = existingStyle + `; margin-top: ${margin}px !important`;
      element.setAttribute('style', newStyle);
      console.log(`✅ Applied ${margin}px margin to element ${elementIndex}:`, {
        tagName: element.tagName,
        className: element.className,
        existingStyle,
        newStyle
      });
    } else {
      console.warn(`❌ Element index ${elementIndex} out of range (only ${unbreakableElements.length} elements)`);
    }
  }
  
  // Convert back to string
  const modifiedSrcDoc = doc.documentElement.outerHTML;
  console.log('=== APPLY MARGINS TO IFRAME SRCDOC COMPLETE ===');
  
  return modifiedSrcDoc;
};

export const processIframeElements = async (unbreakableElements: UnbreakableElement[]) => {
  const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
  let iframeElementsData: { bounds: DOMRect, existingMarginTop: number, iframeContainer: UnbreakableElement, elementIndex: number }[] = [];

  if (iframeElements.length > 0) {
    console.log('Processing iframe elements with srcDoc...');
    try {
      for (const iframeItem of iframeElements) {
        if (iframeItem.srcDoc) {
          const elementsData = await parseSrcDocForUnbreakableElements(iframeItem.srcDoc);
          
          // Add iframe container reference and element index to each data entry
          elementsData.forEach((data, index) => {
            iframeElementsData.push({
              ...data,
              iframeContainer: iframeItem,
              elementIndex: index
            });
          });
        }
      }
      console.log('Found unbreakable elements in iframes:', iframeElementsData.length);
    } catch (error) {
      console.warn('Error processing iframe srcDoc:', error);
    }
  }

  return { iframeElements, iframeElementsData };
};

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

const getEffectiveTopMargin = (element: Element, doc: Document = document): number => {
  try {
    const computedStyle = doc.defaultView?.getComputedStyle(element);
    const elementMarginTop = computedStyle ? parseFloat(computedStyle.marginTop) || 0 : 0;

    let maxMargin = elementMarginTop;

    const firstChild = element.firstElementChild;
    if (firstChild) {
      const childMargin = getEffectiveTopMargin(firstChild, doc);
      maxMargin = Math.max(maxMargin, childMargin);
    }

    return maxMargin;
  } catch (error) {
    console.warn('Error calculating effective top margin:', error);
    return 0;
  }
};
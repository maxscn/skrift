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
  const parser = new DOMParser();
  const doc = parser.parseFromString(srcDoc, 'text/html');
  const unbreakableElement = doc.querySelector('.skrift-unbreakable');

  if (unbreakableElement) {
    const currentStyle = unbreakableElement.getAttribute('style') || '';
    const newStyle = currentStyle.replace(/margin-top:\s*[^;]+;?/g, '') + `; margin-top: ${marginTop}px !important;`;
    unbreakableElement.setAttribute('style', newStyle);
    return doc.documentElement.outerHTML;
  }

  return srcDoc;
};

export const processIframeElements = async (unbreakableElements: UnbreakableElement[]) => {
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
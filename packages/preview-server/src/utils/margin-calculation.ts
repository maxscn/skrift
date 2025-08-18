import React from 'react';
import type { UnbreakableElement } from './element-analysis';
import { applyMarginsToSpecificIframeElements } from './iframe-processing';

export const getExistingMargins = (element: Element): {
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
    const elementStyles = getComputedStyle(element);
    elementMarginTop = parseFloat(elementStyles.marginTop) || 0;

    let precedingSibling = element.previousElementSibling;
    while (precedingSibling && getComputedStyle(precedingSibling).display === 'none') {
      precedingSibling = precedingSibling.previousElementSibling;
    }

    if (precedingSibling) {
      const siblingStyles = getComputedStyle(precedingSibling);
      precedingMarginBottom = parseFloat(siblingStyles.marginBottom) || 0;
    }

    const firstChild = element.firstElementChild;
    if (firstChild) {
      const firstChildStyles = getComputedStyle(firstChild);
      firstChildMarginTop = parseFloat(firstChildStyles.marginTop) || 0;
    }

    effectiveTopMargin = getEffectiveTopMargin(element);
  } catch (error) {
    console.warn('Error calculating existing margins:', error);
  }

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

export const calculateMargins = (
  spanningElements: Array<any>,
  containerBounds: DOMRect,
  effectivePageHeight: number,
  regularUnbreakableBounds: DOMRect[],
  iframeElementsData: Array<{ bounds: DOMRect, existingMarginTop: number, iframeContainer?: UnbreakableElement, elementIndex?: number }>,
  unbreakableElements: UnbreakableElement[],
  iframeElements: UnbreakableElement[],
  measureRef: React.RefObject<HTMLDivElement | null>
) => {
  console.log('=== CALCULATE MARGINS START ===');
  console.log('Spanning elements count:', spanningElements.length);
  console.log('Regular unbreakable bounds count:', regularUnbreakableBounds.length);
  console.log('Unbreakable elements count:', unbreakableElements.length);
  console.log('Iframe elements count:', iframeElements.length);
  console.log('Iframe elements:', iframeElements.map((el, i) => ({
    index: i,
    path: el?.path,
    pathKey: el?.path?.join('-'),
    isIframe: el?.isIframe
  })));
  console.log('Iframe elements data count:', iframeElementsData.length);
  console.log('Iframe elements data:', iframeElementsData);
  
  const unbreakableMargins = new Map<string, number>();
  const iframeMargins = new Map<string, number>();
  const domUnbreakables = Array.from(measureRef.current!.querySelectorAll('.skrift-unbreakable'));
  
  console.log('DOM unbreakables found:', domUnbreakables.length);
  console.log('DOM unbreakables elements:', domUnbreakables.map((el, i) => ({
    index: i,
    tagName: el.tagName,
    className: el.className,
    textContent: el.textContent?.substring(0, 50) + '...'
  })));
  
  // Let's see what IS in the measurement div
  console.log('=== MEASUREMENT DIV CONTENT DEBUG ===');
  console.log('Measurement div exists:', !!measureRef.current);
  console.log('Measurement div innerHTML length:', measureRef.current?.innerHTML?.length);
  console.log('All elements in measurement div:', measureRef.current?.querySelectorAll('*').length);
  console.log('Elements with class containing "skrift":', Array.from(measureRef.current?.querySelectorAll('*') || [])
    .filter(el => el.className && el.className.includes('skrift'))
    .map(el => ({
      tagName: el.tagName,
      className: el.className,
      textContent: el.textContent?.substring(0, 30) + '...'
    })));
  console.log('All classes in measurement div:', Array.from(new Set(
    Array.from(measureRef.current?.querySelectorAll('*') || [])
      .map(el => el.className)
      .filter(className => className && className.includes('skrift'))
  )));

  const domToReactElementMap = new Map<Element, { path: number[], isIframe: boolean }>();

  console.log('=== BUILDING DOM TO REACT MAPPING ===');
  unbreakableElements
    .filter(item => !item.isIframe)
    .forEach((reactElement, reactIndex) => {
      console.log(`Mapping React element ${reactIndex}:`, {
        path: reactElement.path,
        pathKey: reactElement.path.join('-'),
        element: reactElement.element
      });
      const domElement = domUnbreakables[reactIndex];
      if (domElement) {
        console.log(`  -> Mapped to DOM element:`, {
          tagName: domElement.tagName,
          className: domElement.className,
          textContent: domElement.textContent?.substring(0, 50) + '...'
        });
        domToReactElementMap.set(domElement, {
          path: reactElement.path,
          isIframe: false
        });
      } else {
        console.warn(`  -> No DOM element found for React element ${reactIndex}`);
      }
    });
  
  console.log('Final DOM to React mapping size:', domToReactElementMap.size);

  spanningElements.forEach((item, itemIndex) => {
    const relativeTop = item.bounds.top - containerBounds.top;
    const currentPage = Math.floor(relativeTop / effectivePageHeight) + 1;
    const nextPageStart = currentPage * effectivePageHeight;
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

    const isFromIframe = item.index >= regularUnbreakableBounds.length;

    if (isFromIframe) {
      console.log(`🔍 Processing iframe element ${itemIndex} at spanning index ${item.index}`);
      const iframeDataIndex = item.index - regularUnbreakableBounds.length;
      console.log('Iframe data index calculation:', {
        spanningIndex: item.index,
        regularUnbreakableCount: regularUnbreakableBounds.length,
        iframeDataIndex: iframeDataIndex,
        availableIframeData: iframeElementsData.length
      });
      
      const iframeElementData = iframeElementsData[iframeDataIndex];
      console.log('Iframe element data found:', {
        exists: !!iframeElementData,
        data: iframeElementData
      });
      
      if (iframeElementData && iframeElementData.iframeContainer && iframeElementData.elementIndex !== undefined) {
        const existingMarginTop = iframeElementData.existingMarginTop || 0;
        const adjustedMarginNeeded = baseMarginNeeded + existingMarginTop;

        console.log('Iframe margin calculation:', {
          baseMarginNeeded,
          existingMarginTop,
          adjustedMarginNeeded,
          pageHeightLimit: effectivePageHeight,
          willApply: adjustedMarginNeeded <= effectivePageHeight,
          iframeContainerPath: iframeElementData.iframeContainer.path,
          elementIndex: iframeElementData.elementIndex
        });

        if (adjustedMarginNeeded <= effectivePageHeight) {
          // Store margin for specific element inside iframe
          const iframeContainerPath = iframeElementData.iframeContainer.path.join('-');
          console.log('Iframe container path details:', {
            path: iframeElementData.iframeContainer.path,
            pathLength: iframeElementData.iframeContainer.path.length,
            pathString: iframeContainerPath,
            elementIndex: iframeElementData.elementIndex
          });
          
          const elementKey = iframeContainerPath ? `${iframeContainerPath}-element-${iframeElementData.elementIndex}` : `element-${iframeElementData.elementIndex}`;
          
          const existingMargin = iframeMargins.get(elementKey) || 0;
          if (adjustedMarginNeeded > existingMargin) {
            iframeMargins.set(elementKey, adjustedMarginNeeded);
            console.log(`✅ IFRAME ELEMENT MARGIN SET: ${adjustedMarginNeeded}px for element ${iframeElementData.elementIndex} in iframe at path "${iframeContainerPath}" (key: ${elementKey})`);
          } else {
            console.log(`⏭️ IFRAME ELEMENT MARGIN SKIPPED: existing margin ${existingMargin}px >= needed ${adjustedMarginNeeded}px`);
          }
        } else {
          console.log(`❌ IFRAME MARGIN EXCEEDS LIMIT: ${adjustedMarginNeeded}px > ${effectivePageHeight}px`);
        }
      } else {
        console.warn(`❌ IFRAME ELEMENT DATA MISSING: container or element index not found`);
      }
    } else {
      console.log(`Processing regular unbreakable element ${itemIndex} at index ${item.index}`);
      console.log('Available DOM unbreakables total:', domUnbreakables.length);
      console.log('Trying to access DOM element at index:', item.index);
      const domElement = domUnbreakables[item.index];
      console.log('DOM element found:', {
        exists: !!domElement,
        tagName: domElement?.tagName,
        className: domElement?.className,
        textContent: domElement?.textContent?.substring(0, 50) + '...'
      });
      
      if (!domElement) {
        console.warn(`❌ CRITICAL: DOM element at index ${item.index} not found. This suggests the unbreakable element is in an iframe.`);
      }
      
      if (domElement) {
        const reactElementInfo = domToReactElementMap.get(domElement);
        console.log('React element info found:', {
          exists: !!reactElementInfo,
          path: reactElementInfo?.path,
          pathKey: reactElementInfo?.path?.join('-')
        });

        if (reactElementInfo) {
          const existingMargins = getExistingMargins(domElement);
          const adjustedMarginNeeded = baseMarginNeeded + existingMargins.totalVerticalMargin;

          console.log('Margin calculation details:', {
            baseMarginNeeded,
            existingTotalVerticalMargin: existingMargins.totalVerticalMargin,
            adjustedMarginNeeded,
            pageHeightLimit: effectivePageHeight,
            willApply: adjustedMarginNeeded <= effectivePageHeight
          });

          if (adjustedMarginNeeded <= effectivePageHeight) {
            const pathKey = reactElementInfo.path.join('-');
            unbreakableMargins.set(pathKey, adjustedMarginNeeded);

            console.log(`✅ MARGIN STORED: ${adjustedMarginNeeded}px for path ${pathKey}`, {
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
            console.log(`❌ SKIPPING MARGIN: ${adjustedMarginNeeded}px exceeds page height ${effectivePageHeight}px`);
          }
        } else {
          console.warn(`❌ NO REACT ELEMENT INFO found for DOM element at index ${item.index}`);
        }
      } else {
        console.warn(`❌ NO DOM ELEMENT found at index ${item.index}`);
      }
    }
  });

  console.log('=== CALCULATE MARGINS COMPLETE ===');
  console.log('Final unbreakable margins:', Array.from(unbreakableMargins.entries()));
  console.log('Final iframe margins:', Array.from(iframeMargins.entries()));

  return { unbreakableMargins, iframeMargins };
};

export const applyMarginToUnbreakableElements = (
  children: React.ReactNode,
  unbreakableMargins: Map<string, number>,
  iframeMargins: Map<string, number> = new Map()
): React.ReactNode => {
  console.log('=== APPLY MARGIN TO UNBREAKABLE ELEMENTS START ===');
  console.log('Unbreakable margins map:', Array.from(unbreakableMargins.entries()));
  console.log('Iframe margins map:', Array.from(iframeMargins.entries()));
  
  const applyMargin = (node: React.ReactNode, path: number[] = []): React.ReactNode => {
    if (!node) return node;
    
    if (React.isValidElement(node)) {
      const pathKey = path.join('-');
      const props = node.props as any;

      if (props.srcDoc && typeof props.srcDoc === 'string') {
        // Check if any iframe element margins apply to this iframe
        console.log(`🔍 CHECKING IFRAME for margins at path "${pathKey}"`);
        console.log('Available iframe margins:', Array.from(iframeMargins.entries()));
        
        const applicableMargins = new Map<number, number>();
        
        // Check for margins - handle both empty path case and regular path case
        for (const [key, margin] of iframeMargins.entries()) {
          console.log(`Checking key "${key}" against path "${pathKey}"`);
          
          let isMatch = false;
          let elementIndex = -1;
          
          // Case 1: Key format "element-X" (stored with empty path)
          if (key.startsWith('element-')) {
            const parts = key.split('element-');
            if (parts.length > 1 && parts[1]) {
              elementIndex = parseInt(parts[1]);
              isMatch = !isNaN(elementIndex);
              console.log(`Checking format "element-X": elementIndex=${elementIndex}, isMatch=${isMatch}`);
            }
          }
          // Case 2: Key format "pathKey-element-X" (stored with specific path)
          else if (key.startsWith(`${pathKey}-element-`)) {
            const parts = key.split('-element-');
            if (parts.length > 1 && parts[1]) {
              elementIndex = parseInt(parts[1]);
              isMatch = !isNaN(elementIndex);
              console.log(`Checking format "path-element-X": elementIndex=${elementIndex}, isMatch=${isMatch}`);
            }
          }
          
          if (isMatch && elementIndex >= 0) {
            console.log(`✅ FOUND APPLICABLE MARGIN: element ${elementIndex} = ${margin}px`);
            applicableMargins.set(elementIndex, margin);
          }
        }
        
        if (applicableMargins.size > 0) {
          console.log(`✅ APPLYING IFRAME ELEMENT MARGINS to iframe at path "${pathKey}":`, Array.from(applicableMargins.entries()));
          const modifiedSrcDoc = applyMarginsToSpecificIframeElements(props.srcDoc as string, applicableMargins);
          return React.cloneElement(node, {
            ...props,
            srcDoc: modifiedSrcDoc
          });
        } else {
          console.log(`❌ NO APPLICABLE MARGINS found for iframe at path "${pathKey}"`);
        }
      }

      if (typeof props.className === 'string' && props.className.includes('skrift-unbreakable')) {
        const unbreakableMargin = unbreakableMargins.get(pathKey);
        
        console.log(`🔍 CHECKING UNBREAKABLE ELEMENT at path ${pathKey}:`, {
          className: props.className,
          marginFound: unbreakableMargin,
          hasMargin: unbreakableMargin && unbreakableMargin > 0,
          allAvailableMargins: Array.from(unbreakableMargins.entries())
        });
        
        if (unbreakableMargin && unbreakableMargin > 0) {
          console.log(`✅ APPLYING UNBREAKABLE MARGIN: ${unbreakableMargin}px to element at path ${pathKey}`);
          console.log('Element details:', {
            className: props.className,
            existingStyle: props.style,
            existingMarginTop: props.style?.marginTop,
            pathKey: pathKey,
            newMarginTop: `${unbreakableMargin}px`
          });

          return React.cloneElement(node, {
            ...props,
            style: {
              ...props.style,
              marginTop: `${unbreakableMargin}px !important`
            }
          });
        } else {
          console.log(`❌ NO MARGIN FOUND for unbreakable element at path ${pathKey}`);
        }
      }



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

  if (Array.isArray(children)) {
    return children.map((child: any, index: number) =>
      applyMargin(child, [index])
    );
  } else {
    return applyMargin(children, [0]);
  }
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
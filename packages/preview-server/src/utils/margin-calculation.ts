import React from 'react';
import type { UnbreakableElement } from './element-analysis';
import { applyMarginToIframeSrcDoc } from './iframe-processing';

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
  iframeElementsData: Array<{ bounds: DOMRect, existingMarginTop: number }>,
  unbreakableElements: UnbreakableElement[],
  iframeElements: UnbreakableElement[],
  measureRef: React.RefObject<HTMLDivElement | null>
) => {
  const unbreakableMargins = new Map<string, number>();
  const iframeMargins = new Map<string, number>();
  const domUnbreakables = Array.from(measureRef.current!.querySelectorAll('.skrift-unbreakable'));

  const domToReactElementMap = new Map<Element, { path: number[], isIframe: boolean }>();

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
      const iframeDataIndex = item.index - regularUnbreakableBounds.length;
      const iframeElementData = iframeElementsData[iframeDataIndex];
      const existingMarginTop = iframeElementData?.existingMarginTop || 0;
      const adjustedMarginNeeded = baseMarginNeeded + existingMarginTop;

      if (adjustedMarginNeeded <= effectivePageHeight) {
        iframeElements.forEach((iframeElement) => {
          if (iframeElement && iframeElement.path?.length > 0) {
            const pathKey = iframeElement.path.join('-');
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
      const domElement = domUnbreakables[item.index];
      if (domElement) {
        const reactElementInfo = domToReactElementMap.get(domElement);

        if (reactElementInfo) {
          const existingMargins = getExistingMargins(domElement);
          const adjustedMarginNeeded = baseMarginNeeded + existingMargins.totalVerticalMargin;

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

  return { unbreakableMargins, iframeMargins };
};

export const applyMarginToUnbreakableElements = (
  children: React.ReactNode,
  unbreakableMargins: Map<string, number>,
  iframeMargins: Map<string, number> = new Map()
): React.ReactNode => {
  let unbreakableIndex = 0;
  
  const applyMargin = (node: React.ReactNode, path: number[] = []): React.ReactNode => {
    if (!node) return node;
    console.log('Applying margin to node:', node, 'at path:', path);
    if (React.isValidElement(node)) {
      const pathKey = path.join('-');
      const iframeMargin = iframeMargins.get(pathKey);
      const props = node.props as any;

      if (props.srcDoc && iframeMargin && iframeMargin > 0) {
        console.log(`Applying ${iframeMargin}px margin to iframe srcDoc at path ${pathKey}`);
        const modifiedSrcDoc = applyMarginToIframeSrcDoc(props.srcDoc, iframeMargin);
        return React.cloneElement(node, {
          ...props,
          srcDoc: modifiedSrcDoc
        });
      }

      if (typeof props.className === 'string' && props.className.includes('skrift-unbreakable')) {
        const unbreakableKey = unbreakableIndex.toString();
        const unbreakableMargin = unbreakableMargins.get(unbreakableKey);
        unbreakableIndex++;
        
        if (unbreakableMargin && unbreakableMargin > 0) {
          console.log(`Applying ${unbreakableMargin}px margin to unbreakable element at index ${unbreakableKey}`);
          console.log('Element props:', {
            className: props.className,
            existingStyle: props.style,
            existingMarginTop: props.style?.marginTop
          });

          return React.cloneElement(node, {
            ...props,
            style: {
              ...props.style,
              marginTop: `${unbreakableMargin}px !important`
            }
          });
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
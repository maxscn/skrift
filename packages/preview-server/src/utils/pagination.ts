interface PresetDimensions {
  name: string;
  width: number;
  height: number;
}

interface SplitResult {
  canFit: boolean;
  splitElements?: HTMLElement[];
}

export const checkAndSplitOversizedElement = (
  element: HTMLElement, 
  pageHeight: number,
  doc: Document
): SplitResult => {
  const rect = element.getBoundingClientRect();
  const offsetHeight = element.offsetHeight;
  const scrollHeight = element.scrollHeight;
  const elementHeight = Math.max(rect.height, offsetHeight, scrollHeight);

  console.log(`checkAndSplitOversizedElement: element=${element.tagName}, pageHeight=${pageHeight}px, elementHeight=${elementHeight}px (rect=${rect.height}, offset=${offsetHeight}, scroll=${scrollHeight})`);

  if (elementHeight <= pageHeight) {
    console.log(`Element fits on page (${elementHeight}px <= ${pageHeight}px)`);
    return { canFit: true };
  }

  console.log(`Element is oversized (${elementHeight}px > ${pageHeight}px), attempting to split...`);

  // Element is oversized, check if it has children that can be split
  const children = Array.from(element.children).filter((child): child is HTMLElement => 
    child instanceof HTMLElement
  );
  
  console.log(`Element has ${children.length} children`);
  
  if (children.length === 0) {
    // No children to split, element must stay as is
    console.log(`No children to split, element cannot be split`);
    return { canFit: false };
  }

  // Find the breaking point in children
  let currentHeight = 0;
  let splitIndex = -1;
  
  // Calculate height without children first (padding, margins, etc.)
  const elementClone = element.cloneNode(false) as HTMLElement;
  elementClone.innerHTML = '';
  doc.body.appendChild(elementClone);
  const baseHeight = elementClone.offsetHeight;
  doc.body.removeChild(elementClone);
  
  currentHeight = baseHeight;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child) continue;
    
    const childHeight = Math.max(
      child.getBoundingClientRect().height,
      child.offsetHeight,
      child.scrollHeight
    );

    if (currentHeight + childHeight > pageHeight) {
      splitIndex = i;
      break;
    }
    currentHeight += childHeight;
  }

  if (splitIndex === -1) {
    // All children fit, but element still oversized (likely due to styling)
    console.log(`All children fit within page height, but element is still oversized (likely due to padding/margins/styling)`);
    
    // If the element is significantly larger than the page, try to force split anyway
    if (elementHeight > pageHeight * 1.5 && children.length > 1) {
      console.log(`Element is ${Math.round(elementHeight / pageHeight * 100)}% of page height, forcing split at optimal point`);
      
      // Try to find a better split point based on cumulative height
      let cumulativeHeight = 0;
      let bestSplitIndex = Math.floor(children.length / 2); // fallback to middle
      
      // Calculate height without children first (padding, margins, etc.)
      const elementClone = element.cloneNode(false) as HTMLElement;
      elementClone.innerHTML = '';
      doc.body.appendChild(elementClone);
      const baseHeight = elementClone.offsetHeight;
      doc.body.removeChild(elementClone);
      
      cumulativeHeight = baseHeight;
      
      // Find the split point closest to pageHeight
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child) continue;
        
        const childHeight = Math.max(
          child.getBoundingClientRect().height,
          child.offsetHeight,
          child.scrollHeight
        );
        
        if (cumulativeHeight + childHeight > pageHeight * 0.8) { // 80% of page height as target
          bestSplitIndex = Math.max(1, i); // ensure we don't split at 0
          break;
        }
        cumulativeHeight += childHeight;
      }
      
      console.log(`Using split index ${bestSplitIndex} out of ${children.length} children`);
      
      const splitElements: HTMLElement[] = [];

      // First element: parent with children before split
      if (bestSplitIndex > 0) {
        const firstParent = element.cloneNode(false) as HTMLElement;
        for (let i = 0; i < bestSplitIndex; i++) {
          const child = children[i];
          if (child) {
            firstParent.appendChild(child.cloneNode(true) as HTMLElement);
          }
        }
        splitElements.push(firstParent);
      }

      // Second element: parent with remaining children
      if (bestSplitIndex < children.length) {
        const secondParent = element.cloneNode(false) as HTMLElement;
        for (let i = bestSplitIndex; i < children.length; i++) {
          const child = children[i];
          if (child) {
            secondParent.appendChild(child.cloneNode(true) as HTMLElement);
          }
        }
        splitElements.push(secondParent);
      }

      console.log(`Forced split into ${splitElements.length} parts`);
      return { canFit: false, splitElements };
    }
    
    return { canFit: false };
  }

  console.log(`Split index found: ${splitIndex} (splitting at child ${splitIndex})`);

  if (splitIndex === 0) {
    // Even the first child doesn't fit, try to split the first child recursively
    const firstChild = children[0];
    if (!firstChild) return { canFit: false };
    
    const firstChildResult = checkAndSplitOversizedElement(firstChild, pageHeight - baseHeight, doc);
    if (firstChildResult.canFit || !firstChildResult.splitElements) {
      return { canFit: false };
    }

    // Create split elements with the parent structure
    const splitElements: HTMLElement[] = [];
    
    // First element: parent with first part of split child
    const firstParent = element.cloneNode(false) as HTMLElement;
    const firstSplitElement = firstChildResult.splitElements[0];
    if (firstSplitElement) {
      firstParent.appendChild(firstSplitElement);
      splitElements.push(firstParent);
    }

    // Subsequent elements: parent with remaining split children + remaining original children
    for (let i = 1; i < firstChildResult.splitElements.length; i++) {
      const splitElement = firstChildResult.splitElements[i];
      if (splitElement) {
        const parentCopy = element.cloneNode(false) as HTMLElement;
        parentCopy.appendChild(splitElement);
        splitElements.push(parentCopy);
      }
    }

    // Add remaining children to new parent elements
    for (let i = 1; i < children.length; i++) {
      const child = children[i];
      if (child) {
        const parentCopy = element.cloneNode(false) as HTMLElement;
        parentCopy.appendChild(child.cloneNode(true) as HTMLElement);
        splitElements.push(parentCopy);
      }
    }

    return { canFit: false, splitElements };
  }

  // Split at splitIndex
  const splitElements: HTMLElement[] = [];

  // First element: parent with children before split
  const firstParent = element.cloneNode(false) as HTMLElement;
  for (let i = 0; i < splitIndex; i++) {
    const child = children[i];
    if (child) {
      firstParent.appendChild(child.cloneNode(true) as HTMLElement);
    }
  }
  splitElements.push(firstParent);

  // Remaining elements: each child in its own parent copy
  for (let i = splitIndex; i < children.length; i++) {
    const child = children[i];
    if (child) {
      const parentCopy = element.cloneNode(false) as HTMLElement;
      parentCopy.appendChild(child.cloneNode(true) as HTMLElement);
      splitElements.push(parentCopy);
    }
  }

  return { canFit: false, splitElements };
};

const createViewportBasedPages = (
  element: HTMLElement,
  pageHeight: number,
  pageWidth: number,
  doc: Document
): string[] => {
  const elementHeight = Math.max(
    element.getBoundingClientRect().height,
    element.offsetHeight,
    element.scrollHeight
  );
  
  const numPages = Math.ceil(elementHeight / pageHeight);
  const pages: string[] = [];
  
  console.log(`Creating ${numPages} viewport pages for element of height ${elementHeight}px`);
  
  for (let i = 0; i < numPages; i++) {
    const offsetY = i * pageHeight;
    
    // Get the original document's head content
    const headContent = doc.head?.innerHTML || '';
    
    // Create a page with the element positioned to show the correct viewport
    const pageContent = `<!DOCTYPE html>
<html>
<head>
  ${headContent}
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      width: ${pageWidth}px; 
      height: ${pageHeight}px;
      overflow: hidden; 
      box-sizing: border-box;
      position: relative;
    }
    * { 
      box-sizing: border-box; 
    }
    .viewport-container {
      position: relative;
      transform: translateY(-${offsetY}px);
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="viewport-container">
    ${element.outerHTML}
  </div>
</body>
</html>`;

    pages.push(pageContent);
  }
  
  return pages;
};

export const createPageContent = (doc: Document, elements: Element[], width: number): string => {
  // Get the original document's head content
  const headContent = doc.head?.innerHTML || '';
  
  // Create page content with only the specified elements
  const bodyContent = elements.map(el => el.outerHTML).join('');
  
  return `<!DOCTYPE html>
<html>
<head>
  ${headContent}
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      width: ${width}px; 
      overflow: hidden; 
      box-sizing: border-box;
    }
    * { 
      box-sizing: border-box; 
    }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
};

export const distributeElementsToPages = (
  doc: Document,
  preset: PresetDimensions,
  srcDoc: string
): Array<{ id: number; content: string }> => {
  try {
    // Wait for body to be available
    const bodyElement = doc.body;
    if (!bodyElement) {
      console.log('No body element available for pagination');
      return [{ id: 1, content: srcDoc }];
    }

    // Get all top-level elements in the body
    const elements = Array.from(bodyElement.children);
    console.log(`Found ${elements.length} elements to paginate`);
    
    if (elements.length === 0) {
      console.log('No elements found, using single page');
      return [{ id: 1, content: srcDoc }];
    }

    const pageHeight = preset.height;
    console.log(`Page height: ${pageHeight}px, Page width: ${preset.width}px`);
    
    const pages: Array<{ id: number; content: string }> = [];
    let currentPageElements: Element[] = [];
    let currentPageHeight = 0;
    let pageId = 1;

    // Force layout calculation
    bodyElement.style.width = `${preset.width}px`;
    bodyElement.style.height = 'auto';
    bodyElement.offsetHeight; // Force reflow

    console.log(`Body dimensions after layout: ${bodyElement.offsetWidth}px x ${bodyElement.offsetHeight}px`);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      
      // Try multiple ways to get element height
      const rect = element.getBoundingClientRect();
      const offsetHeight = element.offsetHeight;
      const scrollHeight = element.scrollHeight;
      
      const elementHeight = Math.max(rect.height, offsetHeight, scrollHeight);
      console.log(`Element ${i}: rect=${rect.height}px, offset=${offsetHeight}px, scroll=${scrollHeight}px, using=${elementHeight}px`);
      
      // If this single element is larger than page height, use recursive splitting
      if (elementHeight > pageHeight) {
        console.log(`🔴 Element ${i} is oversized: ${elementHeight}px > ${pageHeight}px`);
        
        // If we have current elements, create a page for them first
        if (currentPageElements.length > 0) {
          console.log(`Creating page ${pageId} with ${currentPageElements.length} elements (${currentPageHeight}px) before oversized element`);
          const pageContent = createPageContent(doc, currentPageElements, preset.width);
          pages.push({ id: pageId++, content: pageContent });
          currentPageElements = [];
          currentPageHeight = 0;
        }
        
        // Check if element can be split recursively
        console.log(`🔧 Attempting to split element ${i} (${element.tagName})`);
        const splitResult = checkAndSplitOversizedElement(element, pageHeight, doc);
        
        if (splitResult.splitElements && splitResult.splitElements.length > 0) {
          // Element was successfully split, add each split part as separate pages
          console.log(`✅ Element split into ${splitResult.splitElements.length} parts`);
          for (let j = 0; j < splitResult.splitElements.length; j++) {
            const splitElement = splitResult.splitElements[j];
            if (splitElement) {
              console.log(`Creating page ${pageId} with split element ${j + 1}/${splitResult.splitElements.length}`);
              const pageContent = createPageContent(doc, [splitElement], preset.width);
              pages.push({ id: pageId++, content: pageContent });
            }
          }
        } else {
          // Element cannot be split structurally, create viewport-based pagination
          console.log(`❌ Element cannot be split structurally, creating viewport-based pages`);
          const viewportPages = createViewportBasedPages(element, pageHeight, preset.width, doc);
          
          for (const viewportPage of viewportPages) {
            console.log(`Creating viewport page ${pageId}`);
            pages.push({ id: pageId++, content: viewportPage });
          }
        }
      } else if (currentPageHeight + elementHeight > pageHeight && currentPageElements.length > 0) {
        // Current page is full, create it and start a new one
        console.log(`Creating page ${pageId} with ${currentPageElements.length} elements (${currentPageHeight}px)`);
        const pageContent = createPageContent(doc, currentPageElements, preset.width);
        pages.push({ id: pageId++, content: pageContent });
        
        // Start new page with this element
        currentPageElements = [element];
        currentPageHeight = elementHeight;
      } else {
        // Add element to current page
        currentPageElements.push(element);
        currentPageHeight += elementHeight;
      }
    }

    // Add the last page if it has elements
    if (currentPageElements.length > 0) {
      console.log(`Creating final page ${pageId} with ${currentPageElements.length} elements (${currentPageHeight}px)`);
      const pageContent = createPageContent(doc, currentPageElements, preset.width);
      pages.push({ id: pageId, content: pageContent });
    }

    console.log(`Total pages created: ${pages.length}`);
    return pages.length > 0 ? pages : [{ id: 1, content: srcDoc }];
  } catch (error) {
    console.error('Error in distributeElementsToPages:', error);
    return [{ id: 1, content: srcDoc }];
  }
};
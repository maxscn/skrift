import React from 'react';
import { 
  findUnbreakableElements, 
  findTablesWithHeaders, 
  getUnbreakableElementBounds,
  checkElementPageSpan,
  analyzePageSpans
} from './element-analysis';
import { setupDOM, cleanupDOM } from './test-setup';

describe('element-analysis', () => {
  beforeAll(() => {
    setupDOM();
  });
  
  beforeEach(() => {
    cleanupDOM();
  });
  describe('findUnbreakableElements', () => {
    it('finds elements with skrift-unbreakable class', () => {
      const children = React.createElement('div', {}, [
        React.createElement('div', { key: '1', className: 'skrift-unbreakable' }, 'Unbreakable 1'),
        React.createElement('div', { key: '2', className: 'normal' }, 'Normal'),
        React.createElement('div', { key: '3', className: 'skrift-unbreakable other-class' }, 'Unbreakable 2')
      ]);

      const result = findUnbreakableElements(children);
      
      expect(result).toHaveLength(2);
      expect(result[0]?.path).toEqual([0]);
      expect(result[1]?.path).toEqual([2]);
    });

    it('finds iframe elements with srcDoc', () => {
      const children = React.createElement('div', {}, [
        React.createElement('iframe', { 
          key: '1', 
          srcDoc: '<div class="skrift-unbreakable">Content</div>' 
        }),
        React.createElement('iframe', { key: '2' }) // No srcDoc
      ]);

      const result = findUnbreakableElements(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.isIframe).toBe(true);
      expect(result[0]?.srcDoc).toBe('<div class="skrift-unbreakable">Content</div>');
    });

    it('handles nested elements', () => {
      const children = React.createElement('div', {}, 
        React.createElement('div', {}, 
          React.createElement('div', { className: 'skrift-unbreakable' }, 'Nested')
        )
      );

      const result = findUnbreakableElements(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.path).toEqual([0, 0]);
    });

    it('handles null children', () => {
      const result = findUnbreakableElements(null);
      expect(result).toHaveLength(0);
    });

    it('handles array of children', () => {
      const children = [
        React.createElement('div', { key: '1', className: 'skrift-unbreakable' }, 'First'),
        React.createElement('div', { key: '2', className: 'skrift-unbreakable' }, 'Second')
      ];

      const result = findUnbreakableElements(children);
      
      expect(result).toHaveLength(2);
      expect(result[0]?.path).toEqual([0]);
      expect(result[1]?.path).toEqual([1]);
    });
  });

  describe('findTablesWithHeaders', () => {
    it('finds tables with data-skrift-table attribute', () => {
      const children = React.createElement('div', {}, 
        React.createElement('table', { 
          'data-skrift-table': 'true' 
        }, [
          React.createElement('thead', { 
            key: 'header',
            'data-skrift-table-header': 'true' 
          }, 'Header'),
          React.createElement('tbody', { key: 'body' }, 'Body')
        ])
      );

      const result = findTablesWithHeaders(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.header).not.toBeNull();
      expect(result[0]?.path).toEqual([0]);
    });

    it('finds tables with skrift-table class', () => {
      const children = React.createElement('div', { className: 'skrift-table' }, [
        React.createElement('div', { 
          key: 'header',
          className: 'skrift-table-header' 
        }, 'Header'),
        React.createElement('div', { key: 'body' }, 'Body')
      ]);

      const result = findTablesWithHeaders(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.header).not.toBeNull();
    });

    it('handles tables without headers', () => {
      const children = React.createElement('table', { 
        'data-skrift-table': 'true' 
      }, React.createElement('tbody', {}, 'Body only'));

      const result = findTablesWithHeaders(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.header).toBeNull();
    });

    it('handles non-table elements', () => {
      const children = React.createElement('div', {}, 'Not a table');

      const result = findTablesWithHeaders(children);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('getUnbreakableElementBounds', () => {

    it('returns bounds for elements with className', () => {
      const container = document.createElement('div');
      const element1 = document.createElement('div');
      element1.className = 'skrift-unbreakable';
      const element2 = document.createElement('div');
      element2.className = 'skrift-unbreakable other';
      
      container.appendChild(element1);
      container.appendChild(element2);
      
      // Mock getBoundingClientRect
      const mockRect = { top: 0, left: 0, width: 100, height: 50, bottom: 50, right: 100 } as DOMRect;
      element1.getBoundingClientRect = () => mockRect;
      element2.getBoundingClientRect = () => mockRect;

      const result = getUnbreakableElementBounds(container);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockRect);
    });

    it('handles empty container', () => {
      const container = document.createElement('div');
      const result = getUnbreakableElementBounds(container);
      
      expect(result).toHaveLength(0);
    });

    it('uses custom className', () => {
      const container = document.createElement('div');
      const element = document.createElement('div');
      element.className = 'custom-class';
      container.appendChild(element);
      
      const mockRect = { top: 0, left: 0, width: 100, height: 50, bottom: 50, right: 100 } as DOMRect;
      element.getBoundingClientRect = () => mockRect;

      const result = getUnbreakableElementBounds(container, 'custom-class');
      
      expect(result).toHaveLength(1);
    });
  });

  describe('checkElementPageSpan', () => {
    const containerBounds: DOMRect = {
      top: 0,
      left: 0,
      width: 800,
      height: 2000,
      bottom: 2000,
      right: 800,
      x: 0,
      y: 0,
      toJSON: () => ({})
    };

    it('detects element within single page', () => {
      const elementBounds: DOMRect = {
        top: 100,
        left: 0,
        width: 800,
        height: 200,
        bottom: 300,
        right: 800,
        x: 0,
        y: 100,
        toJSON: () => ({})
      };

      const result = checkElementPageSpan(elementBounds, containerBounds, 1000);
      
      expect(result.spansMultiplePages).toBe(false);
      expect(result.startPage).toBe(1);
      expect(result.endPage).toBe(1);
      expect(result.elementHeight).toBe(200);
    });

    it('detects element spanning multiple pages', () => {
      const elementBounds: DOMRect = {
        top: 900,
        left: 0,
        width: 800,
        height: 300,
        bottom: 1200,
        right: 800,
        x: 0,
        y: 900,
        toJSON: () => ({})
      };

      const result = checkElementPageSpan(elementBounds, containerBounds, 1000);
      
      expect(result.spansMultiplePages).toBe(true);
      expect(result.startPage).toBe(1);
      expect(result.endPage).toBe(2);
      expect(result.elementHeight).toBe(300);
    });

    it('handles element on second page', () => {
      const elementBounds: DOMRect = {
        top: 1100,
        left: 0,
        width: 800,
        height: 200,
        bottom: 1300,
        right: 800,
        x: 0,
        y: 1100,
        toJSON: () => ({})
      };

      const result = checkElementPageSpan(elementBounds, containerBounds, 1000);
      
      expect(result.spansMultiplePages).toBe(false);
      expect(result.startPage).toBe(2);
      expect(result.endPage).toBe(2);
    });
  });

  describe('analyzePageSpans', () => {
    const containerBounds: DOMRect = {
      top: 0,
      left: 0,
      width: 800,
      height: 2000,
      bottom: 2000,
      right: 800,
      x: 0,
      y: 0,
      toJSON: () => ({})
    };

    it('returns spanning elements only', () => {
      const allBounds = [
        {
          top: 100,
          left: 0,
          width: 800,
          height: 200,
          bottom: 300,
          right: 800,
          x: 0,
          y: 100,
          toJSON: () => ({})
        } as DOMRect,
        {
          top: 900,
          left: 0,
          width: 800,
          height: 300,
          bottom: 1200,
          right: 800,
          x: 0,
          y: 900,
          toJSON: () => ({})
        } as DOMRect
      ];

      const result = analyzePageSpans(allBounds, containerBounds, 1000);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.index).toBe(1);
      expect(result[0]?.spanInfo.spansMultiplePages).toBe(true);
    });

    it('handles no spanning elements', () => {
      const allBounds = [
        {
          top: 100,
          left: 0,
          width: 800,
          height: 200,
          bottom: 300,
          right: 800,
          x: 0,
          y: 100,
          toJSON: () => ({})
        } as DOMRect
      ];

      const result = analyzePageSpans(allBounds, containerBounds, 1000);
      
      expect(result).toHaveLength(0);
    });

    it('handles empty bounds array', () => {
      const result = analyzePageSpans([], containerBounds, 1000);
      
      expect(result).toHaveLength(0);
    });
  });
});
import React from 'react';
import { createDefaultPages } from './pagination-core';

describe('pagination-core', () => {
  describe('createDefaultPages', () => {
    it('creates correct number of pages', () => {
      const processedChildren = React.createElement('div', { className: 'test-content' }, 'Test content');
      const pages = createDefaultPages(3, 1000, processedChildren);
      
      expect(pages).toHaveLength(3);
    });

    it('applies correct transform for each page', () => {
      const processedChildren = React.createElement('div', { className: 'test-content' }, 'Test content');
      const pages = createDefaultPages(2, 500, processedChildren);
      
      const firstPage = pages[0] as React.ReactElement<any>;
      const secondPage = pages[1] as React.ReactElement<any>;
      
      expect(firstPage.props.style.transform).toBe('translateY(-0px)');
      expect(secondPage.props.style.transform).toBe('translateY(-500px)');
    });

    it('sets correct width and position styles', () => {
      const processedChildren = React.createElement('div', { className: 'test-content' }, 'Test content');
      const pages = createDefaultPages(1, 1000, processedChildren);
      
      const page = pages[0] as React.ReactElement<any>;
      
      expect(page.props.style.width).toBe('100%');
      expect(page.props.style.position).toBe('relative');
    });

    it('includes processed children in each page', () => {
      const processedChildren = React.createElement('div', { className: 'test-content' }, 'Test content');
      const pages = createDefaultPages(2, 1000, processedChildren);
      
      pages.forEach(page => {
        const pageElement = page as React.ReactElement<any>;
        expect(pageElement.props.children).toBe(processedChildren);
      });
    });

    it('handles zero pages gracefully', () => {
      const processedChildren = React.createElement('div', { className: 'test-content' }, 'Test content');
      const pages = createDefaultPages(0, 1000, processedChildren);
      
      expect(pages).toHaveLength(0);
    });

    it('handles single page', () => {
      const processedChildren = React.createElement('div', { className: 'test-content' }, 'Test content');
      const pages = createDefaultPages(1, 1000, processedChildren);
      
      expect(pages).toHaveLength(1);
      const page = pages[0] as React.ReactElement<any>;
      expect(page.props.style.transform).toBe('translateY(-0px)');
    });
  });
});
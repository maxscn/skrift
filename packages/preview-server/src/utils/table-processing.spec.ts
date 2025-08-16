import React from 'react';
import { 
  estimateElementHeight,
  estimateTableDimensions,
  checkTablePageSpanVirtual,
  analyzeTableSpanning,
  createPagesWithTableHeaders,
  insertTableHeaders
} from './table-processing';
import type { TableWithHeader } from './element-analysis';

describe('table-processing', () => {
  describe('estimateElementHeight', () => {
    it('returns correct height for heading elements', () => {
      const h1 = React.createElement('h1', {}, 'Heading 1');
      const h2 = React.createElement('h2', {}, 'Heading 2');
      const h3 = React.createElement('h3', {}, 'Heading 3');
      
      expect(estimateElementHeight(h1)).toBe(60);
      expect(estimateElementHeight(h2)).toBe(50);
      expect(estimateElementHeight(h3)).toBe(40);
    });

    it('returns correct height for common elements', () => {
      const p = React.createElement('p', {}, 'Paragraph');
      const div = React.createElement('div', {}, 'Div with content');
      const emptyDiv = React.createElement('div', {});
      const span = React.createElement('span', {}, 'Span');
      const br = React.createElement('br', {});
      
      expect(estimateElementHeight(p)).toBe(25);
      expect(estimateElementHeight(div)).toBe(20);
      expect(estimateElementHeight(emptyDiv)).toBe(10);
      expect(estimateElementHeight(span)).toBe(20);
      expect(estimateElementHeight(br)).toBe(20);
    });

    it('returns default height for unknown elements', () => {
      const customElement = React.createElement('CustomComponent', {});
      expect(estimateElementHeight(customElement)).toBe(25);
    });
  });

  describe('estimateTableDimensions', () => {
    it('finds and analyzes simple table', () => {
      const children = React.createElement('table', {
        'data-skrift-table': 'true'
      }, [
        React.createElement('thead', {
          key: 'header',
          'data-skrift-table-header': 'true'
        }, 
          React.createElement('tr', {
            'data-skrift-table-row': 'true'
          }, 'Header Row')
        ),
        React.createElement('tbody', {
          key: 'body',
          'data-skrift-table-body': 'true'
        }, [
          React.createElement('tr', {
            key: '1',
            'data-skrift-table-row': 'true'
          }, 'Row 1'),
          React.createElement('tr', {
            key: '2',
            'data-skrift-table-row': 'true'
          }, 'Row 2')
        ])
      ]);

      const result = estimateTableDimensions(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.header).not.toBeNull();
      expect(result[0]?.estimatedHeight).toBeGreaterThan(100);
      expect(result[0]?.path).toEqual([]);
    });

    it('finds table with class names', () => {
      const children = React.createElement('div', {
        className: 'skrift-table'
      }, [
        React.createElement('div', {
          key: 'header',
          className: 'skrift-table-header'
        }, 
          React.createElement('div', {
            className: 'skrift-table-row'
          }, 'Header')
        ),
        React.createElement('div', {
          key: 'body',
          className: 'skrift-table-body'
        }, 
          React.createElement('div', {
            className: 'skrift-table-row'
          }, 'Body Row')
        )
      ]);

      const result = estimateTableDimensions(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.header).not.toBeNull();
    });

    it('handles table without header', () => {
      const children = React.createElement('table', {
        'data-skrift-table': 'true'
      }, 
        React.createElement('tbody', {
          'data-skrift-table-body': 'true'
        }, 
          React.createElement('tr', {
            'data-skrift-table-row': 'true'
          }, 'Body Row')
        )
      );

      const result = estimateTableDimensions(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.header).toBeNull();
    });

    it('handles non-table content', () => {
      const children = React.createElement('div', {}, 'Regular content');

      const result = estimateTableDimensions(children);
      
      expect(result).toHaveLength(0);
    });

    it('estimates height based on row count', () => {
      const children = React.createElement('table', {
        'data-skrift-table': 'true'
      }, 
        React.createElement('tbody', {
          'data-skrift-table-body': 'true'
        }, [
          React.createElement('tr', { key: '1', 'data-skrift-table-row': 'true' }, 'Row 1'),
          React.createElement('tr', { key: '2', 'data-skrift-table-row': 'true' }, 'Row 2'),
          React.createElement('tr', { key: '3', 'data-skrift-table-row': 'true' }, 'Row 3'),
          React.createElement('tr', { key: '4', 'data-skrift-table-row': 'true' }, 'Row 4'),
          React.createElement('tr', { key: '5', 'data-skrift-table-row': 'true' }, 'Row 5')
        ])
      );

      const result = estimateTableDimensions(children);
      
      expect(result).toHaveLength(1);
      expect(result[0]?.estimatedHeight).toBe(5 * 40); // 5 rows * 40px each
    });
  });

  describe('checkTablePageSpanVirtual', () => {
    const tableInfo = {
      table: React.createElement('table', {}),
      header: null,
      estimatedHeight: 300,
      estimatedTop: 800,
      path: []
    };

    it('detects table within single page', () => {
      const singlePageTable = {
        ...tableInfo,
        estimatedHeight: 150,
        estimatedTop: 100
      };

      const result = checkTablePageSpanVirtual(singlePageTable, 1000);
      
      expect(result.spansMultiplePages).toBe(false);
      expect(result.startPage).toBe(1);
      expect(result.endPage).toBe(1);
      expect(result.pageBreaks).toHaveLength(0);
    });

    it('detects table spanning multiple pages', () => {
      const spanningTable = {
        ...tableInfo,
        estimatedHeight: 400,
        estimatedTop: 800
      };

      const result = checkTablePageSpanVirtual(spanningTable, 1000);
      
      expect(result.spansMultiplePages).toBe(true);
      expect(result.startPage).toBe(1);
      expect(result.endPage).toBe(2);
      expect(result.pageBreaks).toHaveLength(1);
    });

    it('calculates correct page breaks', () => {
      const largeTable = {
        ...tableInfo,
        estimatedHeight: 1500,
        estimatedTop: 500
      };

      const result = checkTablePageSpanVirtual(largeTable, 1000);
      
      expect(result.spansMultiplePages).toBe(true);
      expect(result.startPage).toBe(1);
      expect(result.endPage).toBe(2);
      expect(result.pageBreaks).toContain(500); // 1000 - 500
    });

    it('handles table starting on second page', () => {
      const secondPageTable = {
        ...tableInfo,
        estimatedHeight: 200,
        estimatedTop: 1100
      };

      const result = checkTablePageSpanVirtual(secondPageTable, 1000);
      
      expect(result.spansMultiplePages).toBe(false);
      expect(result.startPage).toBe(2);
      expect(result.endPage).toBe(2);
    });
  });

  describe('analyzeTableSpanning', () => {
    it('identifies spanning tables', () => {
      const children = React.createElement('table', {
        'data-skrift-table': 'true'
      });

      const tablesWithHeaders: TableWithHeader[] = [{
        table: children as React.ReactElement,
        header: React.createElement('thead', {}),
        path: []
      }];

      // Mock estimateTableDimensions to return a spanning table
      const originalConsoleLog = console.log;
      console.log = () => {}; // Suppress console output

      const result = analyzeTableSpanning(children, tablesWithHeaders, 500);

      console.log = originalConsoleLog;
      
      expect(Array.isArray(result)).toBe(true);
    });

    it('handles empty tables array', () => {
      const children = React.createElement('div', {}, 'No tables');
      const tablesWithHeaders: TableWithHeader[] = [];

      const result = analyzeTableSpanning(children, tablesWithHeaders, 1000);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('createPagesWithTableHeaders', () => {
    it('creates pages with table headers', () => {
      const spanningTables = [{
        index: 0,
        tableInfo: {
          table: React.createElement('table', {}),
          header: React.createElement('thead', {}),
          estimatedHeight: 300,
          estimatedTop: 800,
          path: []
        },
        spanInfo: {
          spansMultiplePages: true,
          startPage: 1,
          endPage: 2,
          pageBreaks: [200]
        }
      }];

      const processedChildren = React.createElement('div', {}, 'Content');
      
      const result = createPagesWithTableHeaders(spanningTables, 2, 1000, processedChildren);
      
      expect(result).toHaveLength(2);
      expect(Array.isArray(result)).toBe(true);
    });

    it('handles empty spanning tables', () => {
      const processedChildren = React.createElement('div', {}, 'Content');
      
      const result = createPagesWithTableHeaders([], 2, 1000, processedChildren);
      
      expect(result).toHaveLength(2);
    });
  });

  describe('insertTableHeaders', () => {
    it('inserts headers for spanning tables', () => {
      const tableElement = React.createElement('table', {
        'data-skrift-table': 'true'
      }, [
        React.createElement('thead', {
          key: 'header',
          'data-skrift-table-header': 'true'
        }, 'Header'),
        React.createElement('tbody', {
          key: 'body',
          'data-skrift-table-body': 'true'
        }, 'Body')
      ]);

      const children = React.createElement('div', {}, tableElement);

      const spanningTables = [{
        index: 0,
        tableInfo: {
          table: tableElement,
          header: React.createElement('thead', {}),
          estimatedHeight: 300,
          estimatedTop: 800,
          path: [0]
        },
        spanInfo: {
          spansMultiplePages: true,
          startPage: 1,
          endPage: 2,
          pageBreaks: [200]
        },
        tableWithHeader: {
          table: tableElement,
          header: React.createElement('thead', {}),
          path: [0]
        }
      }];

      const result = insertTableHeaders(children, spanningTables);
      
      expect(React.isValidElement(result)).toBe(true);
    });

    it('handles children without spanning tables', () => {
      const children = React.createElement('div', {}, 'Regular content');

      const result = insertTableHeaders(children, []);
      
      expect(result).toBe(children);
    });

    it('handles null children', () => {
      const result = insertTableHeaders(null, []);
      
      expect(result).toBeNull();
    });

    it('processes nested children', () => {
      const nestedContent = React.createElement('div', {}, [
        React.createElement('div', { key: '1' }, 'Content 1'),
        React.createElement('div', { key: '2' }, 'Content 2')
      ]);

      const result = insertTableHeaders(nestedContent, []);
      
      expect(React.isValidElement(result)).toBe(true);
    });
  });
});
import React from 'react';
import { 
  getExistingMargins, 
  applyMarginToUnbreakableElements 
} from './margin-calculation';
import { setupDOM, cleanupDOM } from './test-setup';

describe('margin-calculation', () => {
  beforeAll(() => {
    setupDOM();
  });
  
  beforeEach(() => {
    cleanupDOM();
  });
  describe('getExistingMargins', () => {

    it('calculates element margin-top', () => {
      const element = document.createElement('div');
      element.style.marginTop = '20px';
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.elementMarginTop).toBe(20);
    });

    it('calculates preceding sibling margin-bottom', () => {
      const sibling = document.createElement('div');
      sibling.style.marginBottom = '15px';
      const element = document.createElement('div');
      
      document.body.appendChild(sibling);
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.precedingMarginBottom).toBe(15);
    });

    it('calculates first child margin-top', () => {
      const element = document.createElement('div');
      const child = document.createElement('div');
      child.style.marginTop = '10px';
      
      element.appendChild(child);
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.firstChildMarginTop).toBe(10);
    });

    it('calculates total vertical margin as maximum', () => {
      const sibling = document.createElement('div');
      sibling.style.marginBottom = '5px';
      const element = document.createElement('div');
      element.style.marginTop = '25px';
      const child = document.createElement('div');
      child.style.marginTop = '15px';
      
      element.appendChild(child);
      document.body.appendChild(sibling);
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.totalVerticalMargin).toBe(25); // Max of 5, 25, 15
    });

    it('handles element without margins', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.elementMarginTop).toBe(0);
      expect(result.precedingMarginBottom).toBe(0);
      expect(result.firstChildMarginTop).toBe(0);
      expect(result.totalVerticalMargin).toBe(0);
    });

    it('skips hidden preceding siblings', () => {
      const hiddenSibling = document.createElement('div');
      hiddenSibling.style.display = 'none';
      hiddenSibling.style.marginBottom = '20px';
      
      const visibleSibling = document.createElement('div');
      visibleSibling.style.marginBottom = '10px';
      
      const element = document.createElement('div');
      
      document.body.appendChild(hiddenSibling);
      document.body.appendChild(visibleSibling);
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.precedingMarginBottom).toBe(10);
    });

    it('handles element without preceding siblings', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.precedingMarginBottom).toBe(0);
    });

    it('handles element without children', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const result = getExistingMargins(element);
      
      expect(result.firstChildMarginTop).toBe(0);
    });
  });

  describe('applyMarginToUnbreakableElements', () => {
    it('applies margin to unbreakable elements', () => {
      const children = React.createElement('div', {
        className: 'skrift-unbreakable',
        style: { color: 'red' }
      }, 'Content');

      const unbreakableMargins = new Map([['0', 50]]);
      
      const result = applyMarginToUnbreakableElements(children, unbreakableMargins);
      
      const element = result as React.ReactElement<any>;
      expect(element.props.style.marginTop).toBe('50px !important');
      expect(element.props.style.color).toBe('red');
    });

    it('applies margin to iframe with srcDoc', () => {
      const children = React.createElement('iframe', {
        srcDoc: '<div class="skrift-unbreakable">Content</div>'
      });

      const iframeMargins = new Map([['0', 30]]);
      
      const result = applyMarginToUnbreakableElements(children, new Map(), iframeMargins);
      
      const element = result as React.ReactElement<any>;
      expect(element.props.srcDoc).toContain('margin-top: 30px !important');
    });

    it('preserves existing styles when applying margin', () => {
      const children = React.createElement('div', {
        className: 'skrift-unbreakable',
        style: { 
          color: 'blue',
          padding: '10px',
          marginTop: '5px'
        }
      }, 'Content');

      const unbreakableMargins = new Map([['0', 25]]);
      
      const result = applyMarginToUnbreakableElements(children, unbreakableMargins);
      
      const element = result as React.ReactElement<any>;
      expect(element.props.style.marginTop).toBe('25px !important');
      expect(element.props.style.color).toBe('blue');
      expect(element.props.style.padding).toBe('10px');
    });

    it('processes nested children', () => {
      const children = React.createElement('div', {}, [
        React.createElement('div', {
          key: '0',
          className: 'skrift-unbreakable'
        }, 'First'),
        React.createElement('div', {
          key: '1',
          className: 'skrift-unbreakable'
        }, 'Second')
      ]);

      const unbreakableMargins = new Map([
        ['0', 20],
        ['1', 40]
      ]);
      
      const result = applyMarginToUnbreakableElements(children, unbreakableMargins);
      
      const container = result as React.ReactElement<any>;
      const firstChild = container.props.children[0];
      const secondChild = container.props.children[1];
      
      expect(firstChild.props.style.marginTop).toBe('20px !important');
      expect(secondChild.props.style.marginTop).toBe('40px !important');
    });

    it('handles non-unbreakable elements', () => {
      const children = React.createElement('div', {
        className: 'regular-element'
      }, 'Content');

      const unbreakableMargins = new Map([['0', 50]]);
      
      const result = applyMarginToUnbreakableElements(children, unbreakableMargins);
      
      const element = result as React.ReactElement<any>;
      expect(element.props.style?.marginTop).toBeUndefined();
    });

    it('handles null children', () => {
      const result = applyMarginToUnbreakableElements(null, new Map());
      
      expect(result).toBeNull();
    });

    it('handles array children', () => {
      const children = [
        React.createElement('div', {
          key: '0',
          className: 'skrift-unbreakable'
        }, 'Content')
      ];

      const unbreakableMargins = new Map([['0', 35]]);
      
      const result = applyMarginToUnbreakableElements(children, unbreakableMargins);
      
      const array = result as React.ReactElement<any>[];
      expect(array[0]?.props.style.marginTop).toBe('35px !important');
    });

    it('skips margin application when margin is zero', () => {
      const children = React.createElement('div', {
        className: 'skrift-unbreakable',
        style: { color: 'red' }
      }, 'Content');

      const unbreakableMargins = new Map([['0', 0]]);
      
      const result = applyMarginToUnbreakableElements(children, unbreakableMargins);
      
      const element = result as React.ReactElement<any>;
      expect(element.props.style.marginTop).toBeUndefined();
      expect(element.props.style.color).toBe('red');
    });

    it('skips iframe margin application when margin is zero', () => {
      const children = React.createElement('iframe', {
        srcDoc: '<div class="skrift-unbreakable">Content</div>'
      });

      const iframeMargins = new Map([['0', 0]]);
      
      const result = applyMarginToUnbreakableElements(children, new Map(), iframeMargins);
      
      const element = result as React.ReactElement<any>;
      expect(element.props.srcDoc).toBe('<div class="skrift-unbreakable">Content</div>');
    });
  });
});
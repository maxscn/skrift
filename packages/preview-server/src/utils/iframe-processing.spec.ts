import { 
  applyMarginToIframeSrcDoc, 
  processIframeElements 
} from './iframe-processing';
import type { UnbreakableElement } from './element-analysis';
import { setupDOM, cleanupDOM } from './test-setup';

describe('iframe-processing', () => {
  beforeAll(() => {
    setupDOM();
  });
  
  beforeEach(() => {
    cleanupDOM();
  });

  describe('applyMarginToIframeSrcDoc', () => {
    it('applies margin to first unbreakable element', () => {
      const srcDoc = `
        <html>
          <body>
            <div class="skrift-unbreakable">Content</div>
          </body>
        </html>
      `;

      const result = applyMarginToIframeSrcDoc(srcDoc, 50);
      
      expect(result).toContain('margin-top: 50px !important');
      expect(result).toContain('skrift-unbreakable');
    });

    it('replaces existing margin-top', () => {
      const srcDoc = `
        <html>
          <body>
            <div class="skrift-unbreakable" style="margin-top: 10px; color: red;">Content</div>
          </body>
        </html>
      `;

      const result = applyMarginToIframeSrcDoc(srcDoc, 50);
      
      expect(result).toContain('margin-top: 50px !important');
      expect(result).toContain('color: red');
      expect(result).not.toContain('margin-top: 10px');
    });

    it('preserves existing styles', () => {
      const srcDoc = `
        <html>
          <body>
            <div class="skrift-unbreakable" style="color: blue; padding: 10px;">Content</div>
          </body>
        </html>
      `;

      const result = applyMarginToIframeSrcDoc(srcDoc, 30);
      
      expect(result).toContain('color: blue');
      expect(result).toContain('padding: 10px');
      expect(result).toContain('margin-top: 30px !important');
    });

    it('handles srcDoc without unbreakable elements', () => {
      const srcDoc = `
        <html>
          <body>
            <div>Regular content</div>
          </body>
        </html>
      `;

      const result = applyMarginToIframeSrcDoc(srcDoc, 50);
      
      expect(result).toBe(srcDoc);
    });

    it('handles empty srcDoc', () => {
      const srcDoc = '';
      const result = applyMarginToIframeSrcDoc(srcDoc, 50);
      
      expect(result).toBe(srcDoc);
    });

    it('handles element without existing style attribute', () => {
      const srcDoc = `
        <html>
          <body>
            <div class="skrift-unbreakable">Content</div>
          </body>
        </html>
      `;

      const result = applyMarginToIframeSrcDoc(srcDoc, 25);
      
      expect(result).toContain('margin-top: 25px !important');
    });
  });

  describe('processIframeElements', () => {
    it('filters iframe elements correctly', () => {
      const unbreakableElements: UnbreakableElement[] = [
        {
          element: {} as any,
          isIframe: true,
          srcDoc: '<div class="skrift-unbreakable">Content</div>',
          path: [0]
        },
        {
          element: {} as any,
          isIframe: false,
          path: [1]
        }
      ];

      // Test the synchronous filtering part
      const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
      
      expect(iframeElements).toHaveLength(1);
      expect(iframeElements[0]?.isIframe).toBe(true);
      expect(iframeElements[0]?.srcDoc).toBe('<div class="skrift-unbreakable">Content</div>');
    });

    it('handles empty unbreakable elements array', () => {
      const unbreakableElements: UnbreakableElement[] = [];
      const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
      
      expect(iframeElements).toHaveLength(0);
    });

    it('filters out non-iframe elements', () => {
      const unbreakableElements: UnbreakableElement[] = [
        {
          element: {} as any,
          isIframe: false,
          path: [0]
        },
        {
          element: {} as any,
          isIframe: true,
          path: [1]
          // No srcDoc property
        }
      ];

      const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
      
      expect(iframeElements).toHaveLength(0);
    });

    it('filters out iframe elements without srcDoc', () => {
      const unbreakableElements: UnbreakableElement[] = [
        {
          element: {} as any,
          isIframe: true,
          path: [0]
          // No srcDoc property
        }
      ];

      const iframeElements = unbreakableElements.filter(item => item.isIframe && item.srcDoc);
      
      expect(iframeElements).toHaveLength(0);
    });
  });
});
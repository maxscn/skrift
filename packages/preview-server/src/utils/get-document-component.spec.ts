import path from 'node:path';
import { getDocumentComponent } from './get-document-component';

describe('getDocumentComponent()', () => {
  describe('Node internals support', () => {
    test('Request', async () => {
      const result = await getDocumentComponent(
        path.resolve(__dirname, './testing/request-response-document.tsx'),
      );
      if ('error' in result) {
        console.log(result.error);
        expect('error' in result, 'there should be no errors').toBe(false);
      }
    });
  });

  test('with a demo document template', async () => {
    const result = await getDocumentComponent(
      path.resolve(
        __dirname,
        '../../../../apps/demo/documents/notifications/vercel-invite-user.tsx',
      ),
    );

    if ('error' in result) {
      console.log(result.error);
      expect('error' in result).toBe(false);
    } else {
      expect(result.documentComponent).toBeTruthy();
      expect(result.sourceMapToOriginalFile).toBeTruthy();

      const documentHtml = await result.render(
        result.createElement(
          result.documentComponent,
          result.documentComponent.PreviewProps,
        ),
        {
          pretty: true,
        },
      );
      expect(documentHtml).toMatchSnapshot();
    }
  });
});

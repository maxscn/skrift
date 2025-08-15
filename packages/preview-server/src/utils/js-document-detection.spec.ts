import path from 'node:path';
import { getDocumentsDirectoryMetadata } from './get-documents-directory-metadata';

describe('JavaScript Document Detection', async () => {
  const testingDir = path.resolve(__dirname, 'testing');
  const documentsMetadata = await getDocumentsDirectoryMetadata(testingDir, true);

  it('should detect JavaScript files with ES6 export default syntax', async () => {
    expect(documentsMetadata).toBeDefined();
    expect(documentsMetadata?.documentFilenames).toContain(
      'js-document-export-default.js',
    );
  });

  it('should detect JavaScript files with CommonJS module.exports', async () => {
    expect(documentsMetadata).toBeDefined();
    expect(documentsMetadata?.documentFilenames).toContain('js-document-test.js');
  });

  it('should detect MDX-style JavaScript files with named exports', async () => {
    expect(documentsMetadata).toBeDefined();
    expect(documentsMetadata?.documentFilenames).toContain('mdx-document-test.js');
  });
});

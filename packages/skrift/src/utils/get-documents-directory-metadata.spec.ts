import path from 'node:path';
import { getDocumentsDirectoryMetadata } from './get-documents-directory-metadata.js';

test('getDocumentsDirectoryMetadata on demo documents', async () => {
  const documentsDirectoryPath = path.resolve(
    __dirname,
    '../../../../apps/demo/documents',
  );
  expect(await getDocumentsDirectoryMetadata(documentsDirectoryPath)).toEqual({
    absolutePath: documentsDirectoryPath,
    directoryName: 'documents',
    relativePath: '',
    documentFilenames: [],
    subDirectories: [
      {
        absolutePath: `${documentsDirectoryPath}/magic-links`,
        directoryName: 'magic-links',
        relativePath: 'magic-links',
        documentFilenames: [
          'aws-verify-document',
          'linear-login-code',
          'notion-magic-link',
          'plaid-verify-identity',
          'raycast-magic-link',
          'slack-confirm',
        ],
        subDirectories: [],
      },
      {
        absolutePath: `${documentsDirectoryPath}/newsletters`,
        directoryName: 'newsletters',
        relativePath: 'newsletters',
        documentFilenames: [
          'codepen-challengers',
          'google-play-policy-update',
          'stack-overflow-tips',
        ],
        subDirectories: [],
      },
      {
        absolutePath: `${documentsDirectoryPath}/notifications`,
        directoryName: 'notifications',
        relativePath: 'notifications',
        documentFilenames: [
          'github-access-token',
          'papermark-year-in-review',
          'vercel-invite-user',
          'yelp-recent-login',
        ],
        subDirectories: [],
      },
      {
        absolutePath: `${documentsDirectoryPath}/receipts`,
        directoryName: 'receipts',
        relativePath: 'receipts',
        documentFilenames: ['apple-receipt', 'nike-receipt'],
        subDirectories: [],
      },
      {
        absolutePath: `${documentsDirectoryPath}/reset-password`,
        directoryName: 'reset-password',
        relativePath: 'reset-password',
        documentFilenames: ['dropbox-reset-password', 'twitch-reset-password'],
        subDirectories: [],
      },
      {
        absolutePath: `${documentsDirectoryPath}/reviews`,
        directoryName: 'reviews',
        relativePath: 'reviews',
        documentFilenames: ['airbnb-review', 'amazon-review'],
        subDirectories: [],
      },
      {
        absolutePath: `${documentsDirectoryPath}/welcome`,
        directoryName: 'welcome',
        relativePath: 'welcome',
        documentFilenames: ['koala-welcome', 'netlify-welcome', 'stripe-welcome'],
        subDirectories: [],
      },
    ],
  });
});

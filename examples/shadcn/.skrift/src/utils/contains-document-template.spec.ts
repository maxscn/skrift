import {
  containsDocumentTemplate,
  removeFilenameExtension,
} from './contains-document-template';
import type { DocumentsDirectory } from './get-documents-directory-metadata';

describe('removeFilenameExtension()', () => {
  it('should work with a single .', () => {
    expect(removeFilenameExtension('document-template.tsx')).toBe(
      'document-template',
    );
  });

  it('should work with an example test file', () => {
    expect(removeFilenameExtension('document-template.spec.tsx')).toBe(
      'document-template.spec',
    );
  });

  it('should do nothing when there is no extension', () => {
    expect(removeFilenameExtension('document-template')).toBe('document-template');
  });
});

describe('containsDocumentTemplate()', () => {
  const directory: DocumentsDirectory = {
    absolutePath: '/fake/path/documents',
    directoryName: 'documents',
    relativePath: '',
    documentFilenames: [],
    subDirectories: [
      {
        absolutePath: '/fake/path/documents/magic-links',
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
        subDirectories: [
          {
            absolutePath: '/fake/path/documents/magic-links/skrift',
            directoryName: 'skrift',
            documentFilenames: ['verify-document'],
            relativePath: 'magic-links/skrift',
            subDirectories: [],
          },
        ],
      },
      {
        absolutePath: '/fake/path/documents/first/second',
        directoryName: 'first/second',
        relativePath: 'first/second',
        documentFilenames: ['document'],
        subDirectories: [],
      },
      {
        absolutePath: '/fake/path/documents/newsletters',
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
        absolutePath: '/fake/path/documents/notifications',
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
        absolutePath: '/fake/path/documents/receipts',
        directoryName: 'receipts',
        relativePath: 'receipts',
        documentFilenames: ['apple-receipt', 'nike-receipt'],
        subDirectories: [],
      },
      {
        absolutePath: '/fake/path/documents/reset-password',
        directoryName: 'reset-password',
        relativePath: 'reset-password',
        documentFilenames: ['dropbox-reset-password', 'twitch-reset-password'],
        subDirectories: [],
      },
      {
        absolutePath: '/fake/path/documents/reviews',
        directoryName: 'reviews',
        relativePath: 'reviews',
        documentFilenames: ['airbnb-review', 'amazon-review'],
        subDirectories: [],
      },
      {
        absolutePath: '/fake/path/documents/welcome',
        directoryName: 'welcome',
        relativePath: 'welcome',
        documentFilenames: ['koala-welcome', 'netlify-welcome', 'stripe-welcome'],
        subDirectories: [],
      },
    ],
  };

  it('should work with collapsed document directory', () => {
    expect(containsDocumentTemplate('first/second/document', directory)).toBe(true);
  });

  it('should work with document inside a single sub directory', () => {
    expect(containsDocumentTemplate('welcome/koala-welcome', directory)).toBe(
      true,
    );
    expect(containsDocumentTemplate('welcome/missing-template', directory)).toBe(
      false,
    );
  });

  it('should work with document inside a second sub directory', () => {
    expect(
      containsDocumentTemplate('magic-links/skrift/verify-document', directory),
    ).toBe(true);
    expect(
      containsDocumentTemplate('magic-links/skrift/missing-template', directory),
    ).toBe(false);
  });
});

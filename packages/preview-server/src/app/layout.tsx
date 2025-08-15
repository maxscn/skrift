import type { Metadata } from 'next';
import './globals.css';
import { DocumentsProvider } from '../contexts/documents';
import { getDocumentsDirectoryMetadata } from '../utils/get-documents-directory-metadata';
import { documentsDirectoryAbsolutePath } from './env';
import { inter, sfMono } from './fonts';

export const metadata: Metadata = {
  title: 'Skrift',
};

export const dynamic = 'force-dynamic';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const documentsDirectoryMetadata = await getDocumentsDirectoryMetadata(
    documentsDirectoryAbsolutePath,
  );

  if (typeof documentsDirectoryMetadata === 'undefined') {
    throw new Error(
      `Could not find the documents directory specified under ${documentsDirectoryAbsolutePath}!`,
    );
  }

  return (
    <html
      className={`${inter.variable} ${sfMono.variable} font-sans`}
      lang="en"
    >
      <body className="print:bg-white relative h-screen bg-black text-slate-11 leading-loose selection:bg-cyan-5 selection:text-cyan-12">
        <div className="bg-gradient-to-t from-slate-3 flex flex-col overflow-hidden ">
          <DocumentsProvider
            initialDocumentsDirectoryMetadata={documentsDirectoryMetadata}
          >
            {children}
          </DocumentsProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

import path from 'node:path';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import {
  type CompatibilityCheckingResult,
  checkCompatibility,
} from '../../../actions/document-validation/check-compatibility';
import { getDocumentPathFromSlug } from '../../../actions/get-document-path-from-slug';
import { renderDocumentByPath } from '../../../actions/render-document-by-path';
import { Shell } from '../../../components/shell';
import { Toolbar } from '../../../components/toolbar';
import type { LintingRow } from '../../../components/toolbar/linter';
import type { SpamCheckingResult } from '../../../components/toolbar/spam-assassin';
import { PreviewProvider } from '../../../contexts/preview';
import { getDocumentsDirectoryMetadata } from '../../../utils/get-documents-directory-metadata';
import { getLintingSources, loadLintingRowsFrom } from '../../../utils/linting';
import { loadStream } from '../../../utils/load-stream';
import { documentsDirectoryAbsolutePath, isBuilding } from '../../env';
import Preview from './preview';

export const dynamicParams = true;

export const dynamic = 'force-dynamic';

export interface PreviewParams {
  slug: string[];
}

const Page = async ({
  params: paramsPromise,
}: {
  params: Promise<PreviewParams>;
}) => {
  const params = await paramsPromise;
  // will come in here as segments of a relative path to the document
  // ex: ['authentication', 'verify-password.tsx']
  const slug = decodeURIComponent(params.slug.join('/'));
  const documentsDirMetadata = await getDocumentsDirectoryMetadata(
    documentsDirectoryAbsolutePath,
  );

  if (typeof documentsDirMetadata === 'undefined') {
    throw new Error(
      `Could not find the documents directory specified under ${documentsDirectoryAbsolutePath}!

This is most likely not an issue with the preview server. Maybe there was a typo on the "--dir" flag?`,
    );
  }

  let documentPath: string;
  try {
    documentPath = await getDocumentPathFromSlug(slug);
  } catch (exception) {
    if (exception instanceof Error) {
      console.warn(exception.message);
      redirect('/');
    }
    throw exception;
  }

  const serverDocumentRenderingResult = await renderDocumentByPath(documentPath);

  let lintingRows: LintingRow[] | undefined;
  let compatibilityCheckingResults: CompatibilityCheckingResult[] | undefined;

  if (isBuilding) {
    if ('error' in serverDocumentRenderingResult) {
      throw new Error(serverDocumentRenderingResult.error.message, {
        cause: serverDocumentRenderingResult.error,
      });
    }
    const lintingSources = getLintingSources(
      serverDocumentRenderingResult.markup,
      '',
    );
    lintingRows = [];
    for await (const row of loadLintingRowsFrom(lintingSources)) {
      lintingRows.push(row);
    }
    lintingRows.sort((a, b) => {
      if (a.result.status === 'error' && b.result.status === 'warning') {
        return -1;
      }

      if (a.result.status === 'warning' && b.result.status === 'error') {
        return 1;
      }

      return 0;
    });
    compatibilityCheckingResults = [];
    for await (const result of loadStream(
      await checkCompatibility(
        serverDocumentRenderingResult.reactMarkup,
        documentPath,
      ),
    )) {
      compatibilityCheckingResults.push(result);
    }



  }

  return (
    <PreviewProvider
      documentSlug={slug}
      documentPath={documentPath}
      serverRenderingResult={serverDocumentRenderingResult}
    >
      <Shell currentDocumentOpenSlug={slug}>
        {/* This suspense is so that this page doesn't throw warnings */}
        {/* on the build of the preview server de-opting into         */}
        {/* client-side rendering on build                            */}
        <Suspense>
          <Preview documentTitle={path.basename(documentPath)} />

          {/* <Toolbar
            serverLintingRows={lintingRows}
            serverSpamCheckingResult={spamCheckingResult}
            serverCompatibilityResults={compatibilityCheckingResults}
          /> */}
        </Suspense>
      </Shell>
    </PreviewProvider>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PreviewParams>;
}) {
  const { slug } = await params;

  return { title: `${path.basename(slug.join('/'))} — Skrift` };
}

export default Page;

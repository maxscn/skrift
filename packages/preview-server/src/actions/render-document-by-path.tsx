'use server';
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import ora, { type Ora } from 'ora';
import { isBuilding, isPreviewDevelopment } from '../app/env';
import { getDocumentComponent } from '../utils/get-document-component';
import { improveErrorWithSourceMap } from '../utils/improve-error-with-sourcemap';
import { registerSpinnerAutostopping } from '../utils/register-spinner-autostopping';
import type { ErrorObject } from '../utils/types/error-object';

export interface RenderedDocumentMetadata {
  markup: string;
  plainText: string;
  reactMarkup: string;
}

export type DocumentRenderingResult =
  | RenderedDocumentMetadata
  | {
      error: ErrorObject;
    };

const cache = new Map<string, DocumentRenderingResult>();

export const renderDocumentByPath = async (
  documentPath: string,
  invalidatingCache = false,
  pageSize?: string,
): Promise<DocumentRenderingResult> => {
  const cacheKey = `${documentPath}${pageSize ? `__${pageSize}` : ''}`;
  if (invalidatingCache) cache.delete(cacheKey);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  const timeBeforeDocumentRendered = performance.now();

  const documentFilename = path.basename(documentPath);
  let spinner: Ora | undefined;
  if (!isBuilding && !isPreviewDevelopment) {
    spinner = ora({
      text: `Rendering document template ${documentFilename}\n`,
      prefixText: ' ',
    }).start();
    registerSpinnerAutostopping(spinner);
  }

  const componentResult = await getDocumentComponent(documentPath);

  if ('error' in componentResult) {
    spinner?.stopAndPersist({
      symbol: logSymbols.error,
      text: `Failed while rendering ${documentFilename}`,
    });
    return { error: componentResult.error };
  }

  const {
    documentComponent: Document,
    createElement,
    render,
    sourceMapToOriginalFile,
  } = componentResult;

  const previewProps = Document.PreviewProps || {};
  const DocumentComponent = Document as React.FC<any>;
  const componentProps = { 
    ...previewProps,
    ...(pageSize && { pageSize })
  };
  
  try {
    const markup = await render(createElement(DocumentComponent, componentProps), {
      pretty: true,
    });
    const plainText = await render(
      createElement(DocumentComponent, componentProps),
      {
        plainText: true,
      },
    );

    const reactMarkup = await fs.promises.readFile(documentPath, 'utf-8');

    const millisecondsToRendered = performance.now() - timeBeforeDocumentRendered;
    let timeForConsole = `${millisecondsToRendered.toFixed(0)}ms`;
    if (millisecondsToRendered <= 450) {
      timeForConsole = chalk.green(timeForConsole);
    } else if (millisecondsToRendered <= 1000) {
      timeForConsole = chalk.yellow(timeForConsole);
    } else {
      timeForConsole = chalk.red(timeForConsole);
    }
    spinner?.stopAndPersist({
      symbol: logSymbols.success,
      text: `Successfully rendered ${documentFilename} in ${timeForConsole}`,
    });

    const renderingResult = {
      // This ensures that no null byte character ends up in the rendered
      // markup making users suspect of any issues. These null byte characters
      // only seem to happen with React 18, as it has no similar incident with React 19.
      markup: markup.replaceAll('\0', ''),
      plainText,
      reactMarkup,
    };

    cache.set(cacheKey, renderingResult);

    return renderingResult;
  } catch (exception) {
    const error = exception as Error;

    spinner?.stopAndPersist({
      symbol: logSymbols.error,
      text: `Failed while rendering ${documentFilename}`,
    });

    return {
      error: improveErrorWithSourceMap(
        error,
        documentPath,
        sourceMapToOriginalFile,
      ),
    };
  }
};

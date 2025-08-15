import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import logSymbols from 'log-symbols';
import ora from 'ora';
import {
  type DocumentsDirectory,
  getDocumentsDirectoryMetadata,
} from '../utils/get-documents-directory-metadata.js';
import { getPreviewServerLocation } from '../utils/get-preview-server-location.js';
import { registerSpinnerAutostopping } from '../utils/register-spinner-autostopping.js';

interface Args {
  dir: string;
  packageManager: string;
}

const buildPreviewApp = (absoluteDirectory: string) => {
  return new Promise<void>((resolve, reject) => {
    const nextBuild = spawn('npm', ['run', 'build'], {
      cwd: absoluteDirectory,
      shell: true,
    });
    nextBuild.stdout.pipe(process.stdout);
    nextBuild.stderr.pipe(process.stderr);

    nextBuild.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Unable to build the Next app and it exited with code: ${code}`,
          ),
        );
      }
    });
  });
};

const npmInstall = async (
  builtPreviewAppPath: string,
  packageManager: string,
) => {
  return new Promise<void>((resolve, reject) => {
    const childProc = spawn(
      packageManager,
      [
        'install',
        packageManager === 'deno' ? '' : '--include=dev',
        packageManager === 'deno' ? '--quiet' : '--silent',
      ],
      {
        cwd: builtPreviewAppPath,
        shell: true,
      },
    );
    childProc.stdout.pipe(process.stdout);
    childProc.stderr.pipe(process.stderr);
    childProc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Unable to install the dependencies and it exited with code: ${code}`,
          ),
        );
      }
    });
  });
};

const setNextEnvironmentVariablesForBuild = async (
  documentsDirRelativePath: string,
  builtPreviewAppPath: string,
) => {
  const nextConfigContents = `
const path = require('path');
const documentsDirRelativePath = path.normalize('${documentsDirRelativePath}');
const userProjectLocation = '${process.cwd()}';
/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_IS_BUILDING: 'true',
    DOCUMENTS_DIR_RELATIVE_PATH: documentsDirRelativePath,
    DOCUMENTS_DIR_ABSOLUTE_PATH: path.resolve(userProjectLocation, documentsDirRelativePath),
    USER_PROJECT_LOCATION: userProjectLocation
  },
  // this is needed so that the code for building documents works properly
  webpack: (
    /** @type {import('webpack').Configuration & { externals: string[] }} */
    config,
    { isServer }
  ) => {
    if (isServer) {
      config.externals.push('esbuild');
    }

    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    webpackBuildWorker: true
  },
}`;

  await fs.promises.writeFile(
    path.resolve(builtPreviewAppPath, './next.config.js'),
    nextConfigContents,
    'utf8',
  );
};

const getDocumentSlugsFromDocumentDirectory = (
  documentDirectory: DocumentsDirectory,
  documentsDirectoryAbsolutePath: string,
) => {
  const directoryPathRelativeToDocumentsDirectory = documentDirectory.absolutePath
    .replace(documentsDirectoryAbsolutePath, '')
    .trim();

  const slugs = [] as Array<string>[];
  documentDirectory.documentFilenames.forEach((filename) =>
    slugs.push(
      path
        .join(directoryPathRelativeToDocumentsDirectory, filename)
        .split(path.sep)
        // sometimes it gets empty segments due to trailing slashes
        .filter((segment) => segment.length > 0),
    ),
  );
  documentDirectory.subDirectories.forEach((directory) => {
    slugs.push(
      ...getDocumentSlugsFromDocumentDirectory(
        directory,
        documentsDirectoryAbsolutePath,
      ),
    );
  });

  return slugs;
};

// we do this because otherwise it won't be able to find the documents
// after build
const forceSSGForDocumentPreviews = async (
  documentsDirPath: string,
  builtPreviewAppPath: string,
) => {
  const documentDirectoryMetadata =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (await getDocumentsDirectoryMetadata(documentsDirPath))!;

  const parameters = getDocumentSlugsFromDocumentDirectory(
    documentDirectoryMetadata,
    documentsDirPath,
  ).map((slug) => ({ slug }));

  const removeForceDynamic = async (filePath: string) => {
    const contents = await fs.promises.readFile(filePath, 'utf8');

    await fs.promises.writeFile(
      filePath,
      contents.replace("export const dynamic = 'force-dynamic';", ''),
      'utf8',
    );
  };
  await removeForceDynamic(
    path.resolve(builtPreviewAppPath, './src/app/layout.tsx'),
  );
  await removeForceDynamic(
    path.resolve(builtPreviewAppPath, './src/app/preview/[...slug]/page.tsx'),
  );

  await fs.promises.appendFile(
    path.resolve(builtPreviewAppPath, './src/app/preview/[...slug]/page.tsx'),
    `

export function generateStaticParams() { 
  return Promise.resolve(
    ${JSON.stringify(parameters)}
  );
}`,
    'utf8',
  );
};

const updatePackageJson = async (builtPreviewAppPath: string) => {
  const packageJsonPath = path.resolve(builtPreviewAppPath, './package.json');
  const packageJson = JSON.parse(
    await fs.promises.readFile(packageJsonPath, 'utf8'),
  ) as {
    name: string;
    scripts: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  packageJson.scripts.build = 'next build';
  packageJson.scripts.start = 'next start';
  delete packageJson.scripts.postbuild;

  packageJson.name = 'preview-server';

  // We remove this one to avoid having resolve issues on our demo build process.
  // This is only used in the `export` command so it's irrelevant to have it here.
  //
  // See `src/actions/render-document-by-path` for more info on how we render the
  // document templates without `@skrift/render` being installed.
  delete packageJson.devDependencies['@skrift/render'];
  delete packageJson.devDependencies['@skrift/components'];
  delete packageJson.scripts.prepare;

  await fs.promises.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson),
    'utf8',
  );
};

export const build = async ({
  dir: documentsDirRelativePath,
  packageManager,
}: Args) => {
  try {
    const previewServerLocation = await getPreviewServerLocation();

    const spinner = ora({
      text: 'Starting build process...',
      prefixText: '  ',
    }).start();
    registerSpinnerAutostopping(spinner);

    spinner.text = `Checking if ${documentsDirRelativePath} folder exists`;
    if (!fs.existsSync(documentsDirRelativePath)) {
      process.exit(1);
    }

    const documentsDirPath = path.join(process.cwd(), documentsDirRelativePath);
    const staticPath = path.join(documentsDirPath, 'static');

    const builtPreviewAppPath = path.join(process.cwd(), '.skrift');

    if (fs.existsSync(builtPreviewAppPath)) {
      spinner.text = 'Deleting pre-existing `.skrift` folder';
      await fs.promises.rm(builtPreviewAppPath, { recursive: true });
    }

    spinner.text = 'Copying preview app from CLI to `.skrift`';
    await fs.promises.cp(previewServerLocation, builtPreviewAppPath, {
      recursive: true,
      filter: (source: string) => {
        // do not copy the CLI files
        return (
          !/(\/|\\)cli(\/|\\)?/.test(source) &&
          !/(\/|\\)\.next(\/|\\)?/.test(source) &&
          !/(\/|\\)\.turbo(\/|\\)?/.test(source) &&
          !/(\/|\\)node_modules(\/|\\)?$/.test(source)
        );
      },
    });

    if (fs.existsSync(staticPath)) {
      spinner.text =
        'Copying `static` folder into `.skrift/public/static`';
      const builtStaticDirectory = path.resolve(
        builtPreviewAppPath,
        './public/static',
      );
      await fs.promises.cp(staticPath, builtStaticDirectory, {
        recursive: true,
      });
    }

    spinner.text =
      'Setting Next environment variables for preview app to work properly';
    await setNextEnvironmentVariablesForBuild(
      documentsDirRelativePath,
      builtPreviewAppPath,
    );

    spinner.text = 'Setting server side generation for the document preview pages';
    await forceSSGForDocumentPreviews(documentsDirPath, builtPreviewAppPath);

    spinner.text = "Updating package.json's build and start scripts";
    await updatePackageJson(builtPreviewAppPath);

    spinner.text = 'Installing dependencies on `.skrift`';
    await npmInstall(builtPreviewAppPath, packageManager);

    spinner.stopAndPersist({
      text: 'Successfully prepared `.skrift` for `next build`',
      symbol: logSymbols.success,
    });

    await buildPreviewApp(builtPreviewAppPath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

import fs from 'node:fs';
import { setupHotreloading, startDevServer } from '../utils/index.js';

interface Args {
  dir: string;
  port: string;
}

export const dev = async ({ dir: documentsDirRelativePath, port }: Args) => {
  try {
    if (!fs.existsSync(documentsDirRelativePath)) {
      console.error(`Missing ${documentsDirRelativePath} folder`);
      process.exit(1);
    }

    const devServer = await startDevServer(
      documentsDirRelativePath,
      documentsDirRelativePath, // defaults to ./documents/static for the static files that are served to the preview
      Number.parseInt(port),
    );

    await setupHotreloading(devServer, documentsDirRelativePath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { getPreviewServerLocation } from '../utils/get-preview-server-location.js';

export const start = async () => {
  try {
    const previewServerLocation = await getPreviewServerLocation();

    const usersProjectLocation = process.cwd();
    const builtPreviewPath = path.resolve(
      usersProjectLocation,
      './.skrift',
    );
    if (!fs.existsSync(builtPreviewPath)) {
      console.error(
        "Could not find .skrift, maybe you haven't ran document build?",
      );
      process.exit(1);
    }

    const nextStart = spawn('npx', ['next', 'start', builtPreviewPath], {
      cwd: previewServerLocation,
      stdio: 'inherit',
    });

    process.on('SIGINT', () => {
      nextStart.kill('SIGINT');
    });

    nextStart.on('exit', (code) => {
      process.exit(code ?? 0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

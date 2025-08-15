
const path = require('path');
const documentsDirRelativePath = path.normalize('./documents');
const userProjectLocation = '/Users/maximilianschon/skrift/examples/shadcn';
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
}
#!/usr/bin/env node

// src/index.ts
import { program } from "commander";

// src/commands/build.ts
import { spawn } from "node:child_process";
import fs2 from "node:fs";
import path3 from "node:path";
import logSymbols2 from "log-symbols";
import ora from "ora";

// src/utils/get-documents-directory-metadata.ts
import fs from "node:fs";
import path from "node:path";
var isFileAnDocument = async (fullPath) => {
  let fileHandle;
  try {
    fileHandle = await fs.promises.open(fullPath, "r");
  } catch (exception) {
    console.warn(exception);
    return false;
  }
  const stat = await fileHandle.stat();
  if (stat.isDirectory()) {
    await fileHandle.close();
    return false;
  }
  const { ext } = path.parse(fullPath);
  if (![".js", ".tsx", ".jsx"].includes(ext)) {
    await fileHandle.close();
    return false;
  }
  const fileContents = await fileHandle.readFile("utf8");
  await fileHandle.close();
  const hasES6DefaultExport = /\bexport\s+default\b/gm.test(fileContents);
  const hasCommonJSExport = /\bmodule\.exports\s*=/gm.test(fileContents);
  const hasNamedExport = /\bexport\s+\{[^}]*\bdefault\b[^}]*\}/gm.test(
    fileContents
  );
  return hasES6DefaultExport || hasCommonJSExport || hasNamedExport;
};
var mergeDirectoriesWithSubDirectories = (documentsDirectoryMetadata) => {
  let currentResultingMergedDirectory = documentsDirectoryMetadata;
  while (currentResultingMergedDirectory.documentFilenames.length === 0 && currentResultingMergedDirectory.subDirectories.length === 1) {
    const onlySubDirectory = currentResultingMergedDirectory.subDirectories[0];
    currentResultingMergedDirectory = {
      ...onlySubDirectory,
      directoryName: path.join(
        currentResultingMergedDirectory.directoryName,
        onlySubDirectory.directoryName
      )
    };
  }
  return currentResultingMergedDirectory;
};
var getDocumentsDirectoryMetadata = async (absolutePathToDocumentsDirectory, keepFileExtensions = false, isSubDirectory = false, baseDirectoryPath = absolutePathToDocumentsDirectory) => {
  if (!fs.existsSync(absolutePathToDocumentsDirectory)) return;
  const dirents = await fs.promises.readdir(absolutePathToDocumentsDirectory, {
    withFileTypes: true
  });
  const isDocumentPredicates = await Promise.all(
    dirents.map(
      (dirent) => isFileAnDocument(path.join(absolutePathToDocumentsDirectory, dirent.name))
    )
  );
  const documentFilenames = dirents.filter((_, i) => isDocumentPredicates[i]).map(
    (dirent) => keepFileExtensions ? dirent.name : dirent.name.replace(path.extname(dirent.name), "")
  );
  const subDirectories = await Promise.all(
    dirents.filter(
      (dirent) => dirent.isDirectory() && !dirent.name.startsWith("_") && dirent.name !== "static"
    ).map((dirent) => {
      const direntAbsolutePath = path.join(
        absolutePathToDocumentsDirectory,
        dirent.name
      );
      return getDocumentsDirectoryMetadata(
        direntAbsolutePath,
        keepFileExtensions,
        true,
        baseDirectoryPath
      );
    })
  );
  const documentsMetadata = {
    absolutePath: absolutePathToDocumentsDirectory,
    relativePath: path.relative(
      baseDirectoryPath,
      absolutePathToDocumentsDirectory
    ),
    directoryName: absolutePathToDocumentsDirectory.split(path.sep).pop(),
    documentFilenames,
    subDirectories
  };
  return isSubDirectory ? mergeDirectoriesWithSubDirectories(documentsMetadata) : documentsMetadata;
};

// src/utils/get-preview-server-location.ts
import path2 from "node:path";
import url from "node:url";
import { createJiti } from "jiti";
import { addDevDependency } from "nypm";
import prompts from "prompts";

// package.json
var package_default = {
  name: "skrift",
  version: "0.0.1",
  description: "A live preview of your documents right in your browser.",
  bin: {
    skrift: "./dist/index.js"
  },
  type: "module",
  scripts: {
    build: "tsup-node",
    "build:watch": "tsup-node --watch src",
    clean: "rm -rf dist",
    test: "vitest run",
    "test:watch": "vitest"
  },
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/maxscn/skrift.git",
    directory: "packages/skrift"
  },
  keywords: [
    "skrift",
    "pdf",
    "react"
  ],
  engines: {
    node: ">=18.0.0"
  },
  dependencies: {
    "@babel/parser": "^7.27.0",
    "@babel/traverse": "^7.27.0",
    chalk: "^5.0.0",
    chokidar: "^4.0.3",
    commander: "^13.0.0",
    debounce: "^2.0.0",
    esbuild: "^0.25.0",
    glob: "^11.0.0",
    jiti: "2.4.2",
    "log-symbols": "^7.0.0",
    "mime-types": "^3.0.0",
    "normalize-path": "^3.0.0",
    nypm: "0.6.0",
    ora: "^8.0.0",
    prompts: "2.4.2",
    "socket.io": "^4.8.1",
    "tsconfig-paths": "4.2.0"
  },
  devDependencies: {
    "@skrift/components": "workspace:*",
    "@types/babel__core": "7.20.5",
    "@types/babel__traverse": "7.20.7",
    "@types/mime-types": "2.1.4",
    "@types/prompts": "2.4.9",
    next: "^15.3.2",
    react: "19.0.0",
    "react-dom": "19.0.0",
    tsup: "8.4.0",
    typescript: "5.8.3"
  }
};

// src/utils/get-preview-server-location.ts
var ensurePreviewServerInstalled = async (message) => {
  const response = await prompts({
    type: "confirm",
    name: "installPreviewServer",
    message,
    initial: true
  });
  if (response.installPreviewServer) {
    console.log('Installing "@skrift/preview-server"');
    await addDevDependency(
      `@skrift/preview-server@${package_default.version}`
    );
    process.exit(0);
  } else {
    process.exit(0);
  }
};
var getPreviewServerLocation = async () => {
  const usersProject = createJiti(process.cwd());
  let previewServerLocation;
  try {
    previewServerLocation = path2.dirname(
      url.fileURLToPath(usersProject.esmResolve("@skrift/preview-server"))
    );
  } catch (_exception) {
    await ensurePreviewServerInstalled(
      'To run the preview server, the package "@skrift/preview-server" must be installed. Would you like to install it?'
    );
  }
  const { version } = await usersProject.import("@skrift/preview-server");
  if (version !== package_default.version) {
    await ensurePreviewServerInstalled(
      `To run the preview server, the version of "@skrift/preview-server" must match the version of "skrift" (${package_default.version}). Would you like to install it?`
    );
  }
  return previewServerLocation;
};

// src/utils/register-spinner-autostopping.ts
import logSymbols from "log-symbols";
var spinners = /* @__PURE__ */ new Set();
process.on("SIGINT", () => {
  spinners.forEach((spinner) => {
    if (spinner.isSpinning) {
      spinner.stop();
    }
  });
});
process.on("exit", (code) => {
  if (code !== 0) {
    spinners.forEach((spinner) => {
      if (spinner.isSpinning) {
        spinner.stopAndPersist({
          symbol: logSymbols.error
        });
      }
    });
  }
});
var registerSpinnerAutostopping = (spinner) => {
  spinners.add(spinner);
};

// src/commands/build.ts
var buildPreviewApp = (absoluteDirectory) => {
  return new Promise((resolve, reject) => {
    const nextBuild = spawn("npm", ["run", "build"], {
      cwd: absoluteDirectory,
      shell: true
    });
    nextBuild.stdout.pipe(process.stdout);
    nextBuild.stderr.pipe(process.stderr);
    nextBuild.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Unable to build the Next app and it exited with code: ${code}`
          )
        );
      }
    });
  });
};
var npmInstall = async (builtPreviewAppPath, packageManager) => {
  return new Promise((resolve, reject) => {
    const childProc = spawn(
      packageManager,
      [
        "install",
        packageManager === "deno" ? "" : "--include=dev",
        packageManager === "deno" ? "--quiet" : "--silent"
      ],
      {
        cwd: builtPreviewAppPath,
        shell: true
      }
    );
    childProc.stdout.pipe(process.stdout);
    childProc.stderr.pipe(process.stderr);
    childProc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Unable to install the dependencies and it exited with code: ${code}`
          )
        );
      }
    });
  });
};
var setNextEnvironmentVariablesForBuild = async (documentsDirRelativePath, builtPreviewAppPath) => {
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
  await fs2.promises.writeFile(
    path3.resolve(builtPreviewAppPath, "./next.config.js"),
    nextConfigContents,
    "utf8"
  );
};
var getDocumentSlugsFromDocumentDirectory = (documentDirectory, documentsDirectoryAbsolutePath) => {
  const directoryPathRelativeToDocumentsDirectory = documentDirectory.absolutePath.replace(documentsDirectoryAbsolutePath, "").trim();
  const slugs = [];
  documentDirectory.documentFilenames.forEach(
    (filename2) => slugs.push(
      path3.join(directoryPathRelativeToDocumentsDirectory, filename2).split(path3.sep).filter((segment) => segment.length > 0)
    )
  );
  documentDirectory.subDirectories.forEach((directory) => {
    slugs.push(
      ...getDocumentSlugsFromDocumentDirectory(
        directory,
        documentsDirectoryAbsolutePath
      )
    );
  });
  return slugs;
};
var forceSSGForDocumentPreviews = async (documentsDirPath, builtPreviewAppPath) => {
  const documentDirectoryMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await getDocumentsDirectoryMetadata(documentsDirPath)
  );
  const parameters = getDocumentSlugsFromDocumentDirectory(
    documentDirectoryMetadata,
    documentsDirPath
  ).map((slug) => ({ slug }));
  const removeForceDynamic = async (filePath) => {
    const contents = await fs2.promises.readFile(filePath, "utf8");
    await fs2.promises.writeFile(
      filePath,
      contents.replace("export const dynamic = 'force-dynamic';", ""),
      "utf8"
    );
  };
  await removeForceDynamic(
    path3.resolve(builtPreviewAppPath, "./src/app/layout.tsx")
  );
  await removeForceDynamic(
    path3.resolve(builtPreviewAppPath, "./src/app/preview/[...slug]/page.tsx")
  );
  await fs2.promises.appendFile(
    path3.resolve(builtPreviewAppPath, "./src/app/preview/[...slug]/page.tsx"),
    `

export function generateStaticParams() { 
  return Promise.resolve(
    ${JSON.stringify(parameters)}
  );
}`,
    "utf8"
  );
};
var updatePackageJson = async (builtPreviewAppPath) => {
  const packageJsonPath = path3.resolve(builtPreviewAppPath, "./package.json");
  const packageJson = JSON.parse(
    await fs2.promises.readFile(packageJsonPath, "utf8")
  );
  packageJson.scripts.build = "next build";
  packageJson.scripts.start = "next start";
  delete packageJson.scripts.postbuild;
  packageJson.name = "preview-server";
  delete packageJson.devDependencies["@skrift/render"];
  delete packageJson.devDependencies["@skrift/components"];
  delete packageJson.scripts.prepare;
  await fs2.promises.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson),
    "utf8"
  );
};
var build = async ({
  dir: documentsDirRelativePath,
  packageManager
}) => {
  try {
    const previewServerLocation = await getPreviewServerLocation();
    const spinner = ora({
      text: "Starting build process...",
      prefixText: "  "
    }).start();
    registerSpinnerAutostopping(spinner);
    spinner.text = `Checking if ${documentsDirRelativePath} folder exists`;
    if (!fs2.existsSync(documentsDirRelativePath)) {
      process.exit(1);
    }
    const documentsDirPath = path3.join(process.cwd(), documentsDirRelativePath);
    const staticPath = path3.join(documentsDirPath, "static");
    const builtPreviewAppPath = path3.join(process.cwd(), ".skrift");
    if (fs2.existsSync(builtPreviewAppPath)) {
      spinner.text = "Deleting pre-existing `.skrift` folder";
      await fs2.promises.rm(builtPreviewAppPath, { recursive: true });
    }
    spinner.text = "Copying preview app from CLI to `.skrift`";
    await fs2.promises.cp(previewServerLocation, builtPreviewAppPath, {
      recursive: true,
      filter: (source) => {
        return !/(\/|\\)cli(\/|\\)?/.test(source) && !/(\/|\\)\.next(\/|\\)?/.test(source) && !/(\/|\\)\.turbo(\/|\\)?/.test(source) && !/(\/|\\)node_modules(\/|\\)?$/.test(source);
      }
    });
    if (fs2.existsSync(staticPath)) {
      spinner.text = "Copying `static` folder into `.skrift/public/static`";
      const builtStaticDirectory = path3.resolve(
        builtPreviewAppPath,
        "./public/static"
      );
      await fs2.promises.cp(staticPath, builtStaticDirectory, {
        recursive: true
      });
    }
    spinner.text = "Setting Next environment variables for preview app to work properly";
    await setNextEnvironmentVariablesForBuild(
      documentsDirRelativePath,
      builtPreviewAppPath
    );
    spinner.text = "Setting server side generation for the document preview pages";
    await forceSSGForDocumentPreviews(documentsDirPath, builtPreviewAppPath);
    spinner.text = "Updating package.json's build and start scripts";
    await updatePackageJson(builtPreviewAppPath);
    spinner.text = "Installing dependencies on `.skrift`";
    await npmInstall(builtPreviewAppPath, packageManager);
    spinner.stopAndPersist({
      text: "Successfully prepared `.skrift` for `next build`",
      symbol: logSymbols2.success
    });
    await buildPreviewApp(builtPreviewAppPath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// src/commands/dev.ts
import fs6 from "node:fs";

// src/utils/preview/hot-reloading/setup-hot-reloading.ts
import path6 from "node:path";
import { watch } from "chokidar";
import debounce from "debounce";
import { Server as SocketServer } from "socket.io";

// src/utils/preview/hot-reloading/create-dependency-graph.ts
import { existsSync, promises as fs3, statSync } from "node:fs";
import path5 from "node:path";

// src/utils/preview/hot-reloading/get-imported-modules.ts
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
var traverse = (
  // we keep this check here so that this still works with the dev:preview
  // script's use of tsx
  typeof traverseModule === "function" ? traverseModule : traverseModule.default
);
var getImportedModules = (contents) => {
  const importedPaths = [];
  const parsedContents = parse(contents, {
    sourceType: "unambiguous",
    strictMode: false,
    errorRecovery: true,
    plugins: ["jsx", "typescript", "decorators"]
  });
  traverse(parsedContents, {
    ImportDeclaration({ node }) {
      importedPaths.push(node.source.value);
    },
    ExportAllDeclaration({ node }) {
      importedPaths.push(node.source.value);
    },
    ExportNamedDeclaration({ node }) {
      if (node.source) {
        importedPaths.push(node.source.value);
      }
    },
    TSExternalModuleReference({ node }) {
      importedPaths.push(node.expression.value);
    },
    CallExpression({ node }) {
      if ("name" in node.callee && node.callee.name === "require") {
        if (node.arguments.length === 1) {
          const importPathNode = node.arguments[0];
          if (importPathNode.type === "StringLiteral") {
            importedPaths.push(importPathNode.value);
          }
        }
      }
    }
  });
  return importedPaths;
};

// src/utils/preview/hot-reloading/resolve-path-aliases.ts
import path4 from "node:path";
import { createMatchPath, loadConfig } from "tsconfig-paths";
var resolvePathAliases = (importPaths, projectPath) => {
  const configLoadResult = loadConfig(projectPath);
  if (configLoadResult.resultType === "success") {
    const matchPath = createMatchPath(
      configLoadResult.absoluteBaseUrl,
      configLoadResult.paths
    );
    return importPaths.map((importedPath) => {
      const unaliasedPath = matchPath(importedPath, void 0, void 0, [
        ".tsx",
        ".ts",
        ".js",
        ".jsx",
        ".cjs",
        ".mjs"
      ]);
      if (unaliasedPath) {
        return `./${path4.relative(projectPath, unaliasedPath)}`;
      }
      return importedPath;
    });
  }
  return importPaths;
};

// src/utils/preview/hot-reloading/create-dependency-graph.ts
var readAllFilesInsideDirectory = async (directory) => {
  let allFilePaths = [];
  const topLevelDirents = await fs3.readdir(directory, { withFileTypes: true });
  for await (const dirent of topLevelDirents) {
    const pathToDirent = path5.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      allFilePaths = allFilePaths.concat(
        await readAllFilesInsideDirectory(pathToDirent)
      );
    } else {
      allFilePaths.push(pathToDirent);
    }
  }
  return allFilePaths;
};
var isJavascriptModule = (filePath) => {
  const extensionName = path5.extname(filePath);
  return [".js", ".ts", ".jsx", ".tsx", ".mjs", ".cjs"].includes(extensionName);
};
var checkFileExtensionsUntilItExists = (pathWithoutExtension) => {
  if (existsSync(`${pathWithoutExtension}.ts`)) {
    return `${pathWithoutExtension}.ts`;
  }
  if (existsSync(`${pathWithoutExtension}.tsx`)) {
    return `${pathWithoutExtension}.tsx`;
  }
  if (existsSync(`${pathWithoutExtension}.js`)) {
    return `${pathWithoutExtension}.js`;
  }
  if (existsSync(`${pathWithoutExtension}.jsx`)) {
    return `${pathWithoutExtension}.jsx`;
  }
  if (existsSync(`${pathWithoutExtension}.mjs`)) {
    return `${pathWithoutExtension}.mjs`;
  }
  if (existsSync(`${pathWithoutExtension}.cjs`)) {
    return `${pathWithoutExtension}.cjs`;
  }
};
var createDependencyGraph = async (directory) => {
  const filePaths = await readAllFilesInsideDirectory(directory);
  const modulePaths = filePaths.filter(isJavascriptModule);
  const graph = Object.fromEntries(
    modulePaths.map((path14) => [
      path14,
      {
        path: path14,
        dependencyPaths: [],
        dependentPaths: [],
        moduleDependencies: []
      }
    ])
  );
  const getDependencyPaths = async (filePath) => {
    const contents = await fs3.readFile(filePath, "utf8");
    const importedPaths = isJavascriptModule(filePath) ? resolvePathAliases(getImportedModules(contents), path5.dirname(filePath)) : [];
    const importedPathsRelativeToDirectory = importedPaths.map(
      (dependencyPath) => {
        const isModulePath = !dependencyPath.startsWith(".");
        if (isModulePath || path5.isAbsolute(dependencyPath)) {
          return dependencyPath;
        }
        let pathToDependencyFromDirectory = path5.resolve(
          /*
                      path.resolve resolves paths differently from what imports on javascript do.
          
                      So if we wouldn't do this, for an document at "/path/to/document.tsx" with a dependency path of "./other-document" 
                      would end up going into /path/to/document.tsx/other-document instead of /path/to/other-document which is the
                      one the import is meant to go to
                    */
          path5.dirname(filePath),
          dependencyPath
        );
        let isDirectory = false;
        try {
          isDirectory = statSync(pathToDependencyFromDirectory).isDirectory();
        } catch (_) {
        }
        if (isDirectory) {
          const pathToSubDirectory = pathToDependencyFromDirectory;
          const pathWithExtension = checkFileExtensionsUntilItExists(
            `${pathToSubDirectory}/index`
          );
          if (pathWithExtension) {
            pathToDependencyFromDirectory = pathWithExtension;
          } else {
            console.warn(
              `Could not find index file for directory at ${pathToDependencyFromDirectory}. This is probably going to cause issues with both hot reloading and your code.`
            );
          }
        }
        const extension = path5.extname(pathToDependencyFromDirectory);
        const pathWithEnsuredExtension = (() => {
          if (extension.length > 0 && existsSync(pathToDependencyFromDirectory)) {
            return pathToDependencyFromDirectory;
          }
          return checkFileExtensionsUntilItExists(
            pathToDependencyFromDirectory.replace(extension, "")
          );
        })();
        if (pathWithEnsuredExtension) {
          pathToDependencyFromDirectory = pathWithEnsuredExtension;
        } else {
          console.warn(
            `Could not find file at ${pathToDependencyFromDirectory}`
          );
        }
        return pathToDependencyFromDirectory;
      }
    );
    const moduleDependencies = importedPathsRelativeToDirectory.filter(
      (dependencyPath) => !dependencyPath.startsWith(".") && !path5.isAbsolute(dependencyPath)
    );
    const nonNodeModuleImportPathsRelativeToDirectory = importedPathsRelativeToDirectory.filter(
      (dependencyPath) => dependencyPath.startsWith(".") || path5.isAbsolute(dependencyPath)
    );
    return {
      dependencyPaths: nonNodeModuleImportPathsRelativeToDirectory,
      moduleDependencies
    };
  };
  const updateModuleDependenciesInGraph = async (moduleFilePath) => {
    if (graph[moduleFilePath] === void 0) {
      graph[moduleFilePath] = {
        path: moduleFilePath,
        dependencyPaths: [],
        dependentPaths: [],
        moduleDependencies: []
      };
    }
    const { moduleDependencies, dependencyPaths: newDependencyPaths } = await getDependencyPaths(moduleFilePath);
    graph[moduleFilePath].moduleDependencies = moduleDependencies;
    for (const dependencyPath of graph[moduleFilePath].dependencyPaths) {
      if (newDependencyPaths.includes(dependencyPath)) continue;
      const dependencyModule = graph[dependencyPath];
      if (dependencyModule !== void 0) {
        dependencyModule.dependentPaths = dependencyModule.dependentPaths.filter(
          (dependentPath) => dependentPath !== moduleFilePath
        );
      }
    }
    graph[moduleFilePath].dependencyPaths = newDependencyPaths;
    for await (const dependencyPath of newDependencyPaths) {
      if (graph[dependencyPath] === void 0) {
        await updateModuleDependenciesInGraph(dependencyPath);
      }
      const dependencyModule = graph[dependencyPath];
      if (dependencyModule === void 0) {
        throw new Error(
          `Loading the dependency path ${dependencyPath} did not initialize it at all. This is a bug in Skrift.`
        );
      }
      if (!dependencyModule.dependentPaths.includes(moduleFilePath)) {
        dependencyModule.dependentPaths.push(moduleFilePath);
      }
    }
  };
  for (const filePath of modulePaths) {
    await updateModuleDependenciesInGraph(filePath);
  }
  const removeModuleFromGraph = (filePath) => {
    const module = graph[filePath];
    if (module) {
      for (const dependencyPath of module.dependencyPaths) {
        if (graph[dependencyPath]) {
          graph[dependencyPath].dependentPaths = graph[dependencyPath].dependentPaths.filter(
            (dependentPath) => dependentPath !== filePath
          );
        }
      }
      delete graph[filePath];
    }
  };
  return [
    graph,
    async (event, pathToModified) => {
      switch (event) {
        case "change":
          if (isJavascriptModule(pathToModified)) {
            await updateModuleDependenciesInGraph(pathToModified);
          }
          break;
        case "add":
          if (isJavascriptModule(pathToModified)) {
            await updateModuleDependenciesInGraph(pathToModified);
          }
          break;
        case "addDir": {
          const filesInsideAddedDirectory = await readAllFilesInsideDirectory(pathToModified);
          const modulesInsideAddedDirectory = filesInsideAddedDirectory.filter(isJavascriptModule);
          for await (const filePath of modulesInsideAddedDirectory) {
            await updateModuleDependenciesInGraph(filePath);
          }
          break;
        }
        case "unlink":
          if (isJavascriptModule(pathToModified)) {
            removeModuleFromGraph(pathToModified);
          }
          break;
        case "unlinkDir": {
          const filesInsideDeletedDirectory = await readAllFilesInsideDirectory(pathToModified);
          const modulesInsideDeletedDirectory = filesInsideDeletedDirectory.filter(isJavascriptModule);
          for await (const filePath of modulesInsideDeletedDirectory) {
            removeModuleFromGraph(filePath);
          }
          break;
        }
      }
    },
    {
      resolveDependentsOf: function resolveDependentsOf(pathToModule) {
        const moduleEntry = graph[pathToModule];
        const dependentPaths = [];
        if (moduleEntry) {
          for (const dependentPath of moduleEntry.dependentPaths) {
            const dependentsOfDependent = resolveDependentsOf(dependentPath);
            dependentPaths.push(...dependentsOfDependent);
            dependentPaths.push(dependentPath);
          }
        }
        return dependentPaths;
      }
    }
  ];
};

// src/utils/preview/hot-reloading/setup-hot-reloading.ts
var setupHotreloading = async (devServer2, documentDirRelativePath) => {
  let clients = [];
  const io = new SocketServer(devServer2);
  io.on("connection", (client) => {
    clients.push(client);
    client.on("disconnect", () => {
      clients = clients.filter((item) => item !== client);
    });
  });
  let changes = [];
  const reload = debounce(() => {
    clients.forEach((client) => {
      client.emit(
        "reload",
        changes.filter(
          (change) => (
            // Ensures only changes inside the documents directory are emitted
            path6.resolve(absolutePathToDocumentsDirectory, change.filename).startsWith(absolutePathToDocumentsDirectory)
          )
        )
      );
    });
    changes = [];
  }, 150);
  const absolutePathToDocumentsDirectory = path6.resolve(
    process.cwd(),
    documentDirRelativePath
  );
  const [dependencyGraph, updateDependencyGraph, { resolveDependentsOf }] = await createDependencyGraph(absolutePathToDocumentsDirectory);
  const watcher = watch("", {
    ignoreInitial: true,
    cwd: absolutePathToDocumentsDirectory
  });
  const getFilesOutsideDocumentsDirectory = () => Object.keys(dependencyGraph).filter(
    (p) => path6.relative(absolutePathToDocumentsDirectory, p).startsWith("..")
  );
  let filesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
  for (const p of filesOutsideDocumentsDirectory) {
    watcher.add(p);
  }
  const exit = async () => {
    await watcher.close();
  };
  process.on("SIGINT", exit);
  process.on("uncaughtException", exit);
  watcher.on("all", async (event, relativePathToChangeTarget) => {
    const file = relativePathToChangeTarget.split(path6.sep);
    if (file.length === 0) {
      return;
    }
    const pathToChangeTarget = path6.resolve(
      absolutePathToDocumentsDirectory,
      relativePathToChangeTarget
    );
    await updateDependencyGraph(event, pathToChangeTarget);
    const newFilesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
    for (const p of filesOutsideDocumentsDirectory) {
      if (!newFilesOutsideDocumentsDirectory.includes(p)) {
        watcher.unwatch(p);
      }
    }
    for (const p of newFilesOutsideDocumentsDirectory) {
      if (!filesOutsideDocumentsDirectory.includes(p)) {
        watcher.add(p);
      }
    }
    filesOutsideDocumentsDirectory = newFilesOutsideDocumentsDirectory;
    changes.push({
      event,
      filename: relativePathToChangeTarget
    });
    for (const dependentPath of resolveDependentsOf(pathToChangeTarget)) {
      changes.push({
        event: "change",
        filename: path6.relative(absolutePathToDocumentsDirectory, dependentPath)
      });
    }
    reload();
  });
  return watcher;
};

// src/utils/preview/start-dev-server.ts
import http from "node:http";
import path9 from "node:path";
import url2 from "node:url";
import chalk from "chalk";
import { createJiti as createJiti2 } from "jiti";
import logSymbols3 from "log-symbols";
import ora2 from "ora";

// src/utils/preview/get-env-variables-for-preview-app.ts
import path7 from "node:path";
var getEnvVariablesForPreviewApp = (relativePathToDocumentsDirectory, cwd) => {
  return {
    DOCUMENTS_DIR_RELATIVE_PATH: relativePathToDocumentsDirectory,
    DOCUMENTS_DIR_ABSOLUTE_PATH: path7.resolve(cwd, relativePathToDocumentsDirectory),
    USER_PROJECT_LOCATION: cwd
  };
};

// src/utils/preview/serve-static-file.ts
import { existsSync as existsSync2, promises as fs4 } from "node:fs";
import path8 from "node:path";
import { lookup } from "mime-types";
var serveStaticFile = async (res, parsedUrl, staticDirRelativePath) => {
  const pathname = parsedUrl.pathname.replace("/static", "./static");
  const ext = path8.parse(pathname).ext;
  const staticBaseDir = path8.resolve(process.cwd(), staticDirRelativePath);
  const fileAbsolutePath = path8.resolve(staticBaseDir, pathname);
  if (!fileAbsolutePath.startsWith(staticBaseDir)) {
    res.statusCode = 403;
    res.end();
    return;
  }
  try {
    const fileHandle = await fs4.open(fileAbsolutePath, "r");
    const fileData = await fs4.readFile(fileHandle);
    res.setHeader("Content-type", lookup(ext) || "text/plain");
    res.end(fileData);
    fileHandle.close();
  } catch (exception) {
    if (!existsSync2(fileAbsolutePath)) {
      res.statusCode = 404;
      res.end();
    } else {
      const sanitizedFilePath = fileAbsolutePath.replace(/\n|\r/g, "");
      console.error(
        `Could not read file at %s to be served, here's the exception:`,
        sanitizedFilePath,
        exception
      );
      res.statusCode = 500;
      res.end(
        "Could not read file to be served! Check your terminal for more information."
      );
    }
  }
};

// src/utils/preview/start-dev-server.ts
var devServer;
var safeAsyncServerListen = (server, port) => {
  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({ portAlreadyInUse: false });
    });
    server.on("error", (e) => {
      if (e.code === "EADDRINUSE") {
        resolve({ portAlreadyInUse: true });
      }
    });
  });
};
var startDevServer = async (documentsDirRelativePath, staticBaseDirRelativePath, port) => {
  const [majorNodeVersion] = process.versions.node.split(".");
  if (majorNodeVersion && Number.parseInt(majorNodeVersion) < 18) {
    console.error(
      ` ${logSymbols3.error}  Node ${majorNodeVersion} is not supported. Please upgrade to Node 18 or higher.`
    );
    process.exit(1);
  }
  const previewServerLocation = await getPreviewServerLocation();
  const previewServer = createJiti2(previewServerLocation);
  const { default: next } = await previewServer.import("next");
  devServer = http.createServer((req, res) => {
    if (!req.url) {
      res.end(404);
      return;
    }
    const parsedUrl = url2.parse(req.url, true);
    res.setHeader(
      "Cache-Control",
      "no-cache, max-age=0, must-revalidate, no-store"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "-1");
    try {
      if (parsedUrl.path?.includes("static/") && !parsedUrl.path.includes("_next/static/")) {
        void serveStaticFile(res, parsedUrl, staticBaseDirRelativePath);
      } else if (!isNextReady) {
        void nextReadyPromise.then(
          () => nextHandleRequest?.(req, res, parsedUrl)
        );
      } else {
        void nextHandleRequest?.(req, res, parsedUrl);
      }
    } catch (e) {
      console.error("caught error", e);
      res.writeHead(500);
      res.end();
    }
  });
  const { portAlreadyInUse } = await safeAsyncServerListen(devServer, port);
  if (!portAlreadyInUse) {
    console.log(chalk.greenBright(`    Skrift ${package_default.version}`));
    console.log(`    Running preview at:          http://localhost:${port}
`);
  } else {
    const nextPortToTry = port + 1;
    console.warn(
      ` ${logSymbols3.warning} Port ${port} is already in use, trying ${nextPortToTry}`
    );
    return startDevServer(
      documentsDirRelativePath,
      staticBaseDirRelativePath,
      nextPortToTry
    );
  }
  devServer.on("close", async () => {
    await app.close();
  });
  devServer.on("error", (e) => {
    spinner.stopAndPersist({
      symbol: logSymbols3.error,
      text: `Preview Server had an error: ${e}`
    });
    process.exit(1);
  });
  const spinner = ora2({
    text: "Getting skrift preview server ready...\n",
    prefixText: " "
  }).start();
  registerSpinnerAutostopping(spinner);
  const timeBeforeNextReady = performance.now();
  process.env = {
    NODE_ENV: "development",
    ...process.env,
    ...getEnvVariablesForPreviewApp(
      // If we don't do normalization here, stuff like https://github.com/maxscn/skrift/issues/1354 happens.
      path9.normalize(documentsDirRelativePath),
      process.cwd()
    )
  };
  const app = next({
    // passing in env here does not get the environment variables there
    dev: false,
    conf: {
      images: {
        // This is to avoid the warning with sharp
        unoptimized: true
      }
    },
    hostname: "localhost",
    port,
    dir: previewServerLocation
  });
  let isNextReady = false;
  const nextReadyPromise = app.prepare();
  try {
    await nextReadyPromise;
  } catch (exception) {
    spinner.stopAndPersist({
      symbol: logSymbols3.error,
      text: ` Preview Server had an error: ${exception}`
    });
    process.exit(1);
  }
  isNextReady = true;
  const nextHandleRequest = app.getRequestHandler();
  const secondsToNextReady = ((performance.now() - timeBeforeNextReady) / 1e3).toFixed(1);
  spinner.stopAndPersist({
    text: `Ready in ${secondsToNextReady}s
`,
    symbol: logSymbols3.success
  });
  return devServer;
};
var makeExitHandler = (options) => (codeSignalOrError) => {
  if (typeof devServer !== "undefined") {
    console.log("\nshutting down dev server");
    devServer.close();
    devServer = void 0;
  }
  if (codeSignalOrError instanceof Error) {
    console.error(codeSignalOrError);
  }
  if (options?.shouldKillProcess) {
    process.exit(options.killWithErrorCode ? 1 : 0);
  }
};
process.on("exit", makeExitHandler());
process.on(
  "SIGINT",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: false })
);
process.on(
  "SIGUSR1",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: false })
);
process.on(
  "SIGUSR2",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: false })
);
process.on(
  "uncaughtException",
  makeExitHandler({ shouldKillProcess: true, killWithErrorCode: true })
);

// src/utils/tree.ts
import { promises as fs5 } from "node:fs";
import os from "node:os";
import path10 from "node:path";
var SYMBOLS = {
  BRANCH: "\u251C\u2500\u2500 ",
  EMPTY: "",
  INDENT: "    ",
  LAST_BRANCH: "\u2514\u2500\u2500 ",
  VERTICAL: "\u2502   "
};
var getTreeLines = async (dirPath, depth, currentDepth = 0) => {
  const base = process.cwd();
  const dirFullpath = path10.resolve(base, dirPath);
  const dirname = path10.basename(dirFullpath);
  let lines = [dirname];
  const dirStat = await fs5.stat(dirFullpath);
  if (dirStat.isDirectory() && currentDepth < depth) {
    const childDirents = await fs5.readdir(dirFullpath, { withFileTypes: true });
    childDirents.sort((a, b) => {
      if (a.isDirectory() && b.isFile()) {
        return -1;
      }
      if (a.isFile() && b.isDirectory()) {
        return 1;
      }
      return b.name > a.name ? -1 : 1;
    });
    for (let i = 0; i < childDirents.length; i++) {
      const dirent = childDirents[i];
      const isLast = i === childDirents.length - 1;
      const branchingSymbol = isLast ? SYMBOLS.LAST_BRANCH : SYMBOLS.BRANCH;
      const verticalSymbol = isLast ? SYMBOLS.INDENT : SYMBOLS.VERTICAL;
      if (dirent.isFile()) {
        lines.push(`${branchingSymbol}${dirent.name}`);
      } else {
        const pathToDirectory = path10.join(dirFullpath, dirent.name);
        const treeLinesForSubDirectory = await getTreeLines(
          pathToDirectory,
          depth,
          currentDepth + 1
        );
        lines = lines.concat(
          treeLinesForSubDirectory.map(
            (line, index) => index === 0 ? `${branchingSymbol}${line}` : `${verticalSymbol}${line}`
          )
        );
      }
    }
  }
  return lines;
};
var tree = async (dirPath, depth) => {
  const lines = await getTreeLines(dirPath, depth);
  return lines.join(os.EOL);
};

// src/commands/dev.ts
var dev = async ({ dir: documentsDirRelativePath, port }) => {
  try {
    if (!fs6.existsSync(documentsDirRelativePath)) {
      console.error(`Missing ${documentsDirRelativePath} folder`);
      process.exit(1);
    }
    const devServer2 = await startDevServer(
      documentsDirRelativePath,
      documentsDirRelativePath,
      // defaults to ./documents/static for the static files that are served to the preview
      Number.parseInt(port)
    );
    await setupHotreloading(devServer2, documentsDirRelativePath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// src/commands/export.ts
import fs8, { unlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path12 from "node:path";
import url3 from "node:url";
import { build as build2 } from "esbuild";
import { glob } from "glob";
import logSymbols4 from "log-symbols";
import normalize from "normalize-path";
import ora3 from "ora";

// src/utils/esbuild/renderring-utilities-exporter.ts
import { promises as fs7 } from "node:fs";
import path11 from "node:path";

// src/utils/esbuild/escape-string-for-regex.ts
function escapeStringForRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// src/utils/esbuild/renderring-utilities-exporter.ts
var renderingUtilitiesExporter = (documentTemplates) => ({
  name: "rendering-utilities-exporter",
  setup: (b) => {
    b.onLoad(
      {
        filter: new RegExp(
          documentTemplates.map((documentPath) => escapeStringForRegex(documentPath)).join("|")
        )
      },
      async ({ path: pathToFile }) => {
        return {
          contents: `${await fs7.readFile(pathToFile, "utf8")};
          export { render } from 'skrift-module-that-will-export-render'
          export { createElement as reactDocumentCreateReactElement } from 'react';
        `,
          loader: path11.extname(pathToFile).slice(1)
        };
      }
    );
    b.onResolve(
      { filter: /^skrift-module-that-will-export-render$/ },
      async (args) => {
        const options = {
          kind: "import-statement",
          importer: args.importer,
          resolveDir: args.resolveDir,
          namespace: args.namespace
        };
        let result = await b.resolve("@skrift/render", options);
        if (result.errors.length === 0) {
          return result;
        }
        result = await b.resolve("@skrift/components", options);
        if (result.errors.length > 0 && result.errors[0]) {
          result.errors[0].text = "Failed trying to import `render` from either `@skrift/render` or `@skrift/components` to be able to render your document template.\n Maybe you don't have either of them installed?";
        }
        return result;
      }
    );
  }
});

// src/commands/export.ts
var getDocumentTemplatesFromDirectory = (documentDirectory) => {
  const templatePaths = [];
  documentDirectory.documentFilenames.forEach(
    (filename2) => templatePaths.push(path12.join(documentDirectory.absolutePath, filename2))
  );
  documentDirectory.subDirectories.forEach((directory) => {
    templatePaths.push(...getDocumentTemplatesFromDirectory(directory));
  });
  return templatePaths;
};
var filename = url3.fileURLToPath(import.meta.url);
var require2 = createRequire(filename);
var exportTemplates = async (pathToWhereDocumentMarkupShouldBeDumped, documentsDirectoryPath, options) => {
  if (fs8.existsSync(pathToWhereDocumentMarkupShouldBeDumped)) {
    fs8.rmSync(pathToWhereDocumentMarkupShouldBeDumped, { recursive: true });
  }
  let spinner;
  if (!options.silent) {
    spinner = ora3("Preparing files...\n").start();
    registerSpinnerAutostopping(spinner);
  }
  const documentsDirectoryMetadata = await getDocumentsDirectoryMetadata(
    path12.resolve(process.cwd(), documentsDirectoryPath),
    true
  );
  if (typeof documentsDirectoryMetadata === "undefined") {
    if (spinner) {
      spinner.stopAndPersist({
        symbol: logSymbols4.error,
        text: `Could not find the directory at ${documentsDirectoryPath}`
      });
    }
    return;
  }
  const allTemplates = getDocumentTemplatesFromDirectory(documentsDirectoryMetadata);
  try {
    await build2({
      bundle: true,
      entryPoints: allTemplates,
      format: "cjs",
      jsx: "transform",
      loader: { ".js": "jsx" },
      logLevel: "silent",
      outExtension: { ".js": ".cjs" },
      outdir: pathToWhereDocumentMarkupShouldBeDumped,
      platform: "node",
      plugins: [renderingUtilitiesExporter(allTemplates)],
      write: true
    });
  } catch (exception) {
    if (spinner) {
      spinner.stopAndPersist({
        symbol: logSymbols4.error,
        text: "Failed to build documents"
      });
    }
    const buildFailure = exception;
    console.error(`
${buildFailure.message}`);
    process.exit(1);
  }
  if (spinner) {
    spinner.succeed();
  }
  const allBuiltTemplates = glob.sync(
    normalize(`${pathToWhereDocumentMarkupShouldBeDumped}/**/*.cjs`),
    {
      absolute: true
    }
  );
  for await (const template of allBuiltTemplates) {
    try {
      if (spinner) {
        spinner.text = `rendering ${template.split("/").pop()}`;
        spinner.render();
      }
      delete require2.cache[template];
      const documentModule = require2(template);
      const rendered = await documentModule.render(
        documentModule.reactDocumentCreateReactElement(documentModule.default, {}),
        options
      );
      const htmlPath = template.replace(
        ".cjs",
        options.plainText ? ".txt" : ".html"
      );
      writeFileSync(htmlPath, rendered);
      unlinkSync(template);
    } catch (exception) {
      if (spinner) {
        spinner.stopAndPersist({
          symbol: logSymbols4.error,
          text: `failed when rendering ${template.split("/").pop()}`
        });
      }
      console.error(exception);
      process.exit(1);
    }
  }
  if (spinner) {
    spinner.succeed("Rendered all files");
    spinner.text = "Copying static files";
    spinner.render();
  }
  const staticDirectoryPath = path12.join(documentsDirectoryPath, "static");
  if (fs8.existsSync(staticDirectoryPath)) {
    const pathToDumpStaticFilesInto = path12.join(
      pathToWhereDocumentMarkupShouldBeDumped,
      "static"
    );
    if (fs8.existsSync(pathToDumpStaticFilesInto))
      await fs8.promises.rm(pathToDumpStaticFilesInto, { recursive: true });
    try {
      await fs8.promises.cp(staticDirectoryPath, pathToDumpStaticFilesInto, {
        recursive: true
      });
    } catch (exception) {
      console.error(exception);
      if (spinner) {
        spinner.stopAndPersist({
          symbol: logSymbols4.error,
          text: "Failed to copy static files"
        });
      }
      console.error(
        `Something went wrong while copying the file to ${pathToWhereDocumentMarkupShouldBeDumped}/static, ${exception}`
      );
      process.exit(1);
    }
  }
  if (spinner && !options.silent) {
    spinner.succeed();
    const fileTree = await tree(pathToWhereDocumentMarkupShouldBeDumped, 4);
    console.log(fileTree);
    spinner.stopAndPersist({
      symbol: logSymbols4.success,
      text: "Successfully exported documents"
    });
  }
};

// src/commands/start.ts
import { spawn as spawn2 } from "node:child_process";
import fs9 from "node:fs";
import path13 from "node:path";
var start = async () => {
  try {
    const previewServerLocation = await getPreviewServerLocation();
    const usersProjectLocation = process.cwd();
    const builtPreviewPath = path13.resolve(
      usersProjectLocation,
      "./.skrift"
    );
    if (!fs9.existsSync(builtPreviewPath)) {
      console.error(
        "Could not find .skrift, maybe you haven't ran document build?"
      );
      process.exit(1);
    }
    const nextStart = spawn2("npx", ["next", "start", builtPreviewPath], {
      cwd: previewServerLocation,
      stdio: "inherit"
    });
    process.on("SIGINT", () => {
      nextStart.kill("SIGINT");
    });
    nextStart.on("exit", (code) => {
      process.exit(code ?? 0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// src/index.ts
var PACKAGE_NAME = "reactskrift";
program.name(PACKAGE_NAME).description("A live preview of your documents right in your browser").version(package_default.version);
program.command("dev").description("Starts the preview pdf development app").option("-d, --dir <path>", "Directory with your pdf templates", "./documents").option("-p --port <port>", "Port to run dev server on", "3000").action(dev);
program.command("build").description("Copies the preview app for onto .skrift and builds it").option("-d, --dir <path>", "Directory with your skrift pdf templates", "./documents").option(
  "-p --packageManager <name>",
  "Package name to use on installation on `.skrift`",
  "npm"
).action(build);
program.command("start").description('Runs the built preview app that is inside of ".skrift"').action(start);
program.command("export").description("Build the templates to the `out` directory").option("--outDir <path>", "Output directory", "out").option("-p, --pretty", "Pretty print the output", false).option("-t, --plainText", "Set output format as plain text", false).option("-d, --dir <path>", "Directory with your document templates", "./documents").option(
  "-s, --silent",
  "To, or not to show a spinner with process information",
  false
).action(
  ({ outDir, pretty, plainText, silent, dir: srcDir }) => exportTemplates(outDir, srcDir, { silent, plainText, pretty })
);
program.parse();

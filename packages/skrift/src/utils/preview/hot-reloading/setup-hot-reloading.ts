import type http from 'node:http';
import path from 'node:path';
import { watch } from 'chokidar';
import debounce from 'debounce';
import { type Socket, Server as SocketServer } from 'socket.io';
import type { HotReloadChange } from '../../types/hot-reload-change.js';
import { createDependencyGraph } from './create-dependency-graph.js';

export const setupHotreloading = async (
  devServer: http.Server,
  documentDirRelativePath: string,
) => {
  let clients: Socket[] = [];
  const io = new SocketServer(devServer);

  io.on('connection', (client) => {
    clients.push(client);

    client.on('disconnect', () => {
      clients = clients.filter((item) => item !== client);
    });
  });

  // used to keep track of all changes
  // and send them at once to the preview app through the web socket
  let changes = [] as HotReloadChange[];

  const reload = debounce(() => {
    // we detect these using the useHotreload hook on the Next app
    clients.forEach((client) => {
      client.emit(
        'reload',
        changes.filter((change) =>
          // Ensures only changes inside the documents directory are emitted
          path
            .resolve(absolutePathToDocumentsDirectory, change.filename)
            .startsWith(absolutePathToDocumentsDirectory),
        ),
      );
    });

    changes = [];
  }, 150);

  const absolutePathToDocumentsDirectory = path.resolve(
    process.cwd(),
    documentDirRelativePath,
  );

  const [dependencyGraph, updateDependencyGraph, { resolveDependentsOf }] =
    await createDependencyGraph(absolutePathToDocumentsDirectory);

  const watcher = watch('', {
    ignoreInitial: true,
    cwd: absolutePathToDocumentsDirectory,
  });

  const getFilesOutsideDocumentsDirectory = () =>
    Object.keys(dependencyGraph).filter((p) =>
      path.relative(absolutePathToDocumentsDirectory, p).startsWith('..'),
    );
  let filesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
  // adds in to be watched separately all of the files that are outside of
  // the user's documents directory
  for (const p of filesOutsideDocumentsDirectory) {
    watcher.add(p);
  }

  const exit = async () => {
    await watcher.close();
  };
  process.on('SIGINT', exit);
  process.on('uncaughtException', exit);

  watcher.on('all', async (event, relativePathToChangeTarget) => {
    const file = relativePathToChangeTarget.split(path.sep);
    if (file.length === 0) {
      return;
    }
    const pathToChangeTarget = path.resolve(
      absolutePathToDocumentsDirectory,
      relativePathToChangeTarget,
    );

    await updateDependencyGraph(event, pathToChangeTarget);

    const newFilesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
    // updates the files outside of the user's documents directory by unwatching
    // the inexistent ones and watching the new ones
    //
    // this is necessary to avoid the issue mentioned here https://github.com/maxscn/skrift/issues/1433#issuecomment-2177515290
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
      filename: relativePathToChangeTarget,
    });

    // These dependents are dependents resolved recursively, so even dependents of dependents
    // will be notified of this change so that we ensure that things are updated in the preview.
    for (const dependentPath of resolveDependentsOf(pathToChangeTarget)) {
      changes.push({
        event: 'change' as const,
        filename: path.relative(absolutePathToDocumentsDirectory, dependentPath),
      });
    }
    reload();
  });

  return watcher;
};

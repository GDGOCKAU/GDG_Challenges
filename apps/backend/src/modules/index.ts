import { readdir } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { API_PREFIX } from '@gdg/shared';
import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback,
} from 'fastify';

type FastifyRoutePlugin = FastifyPluginAsync | FastifyPluginCallback;

const modulesDirectory = dirname(fileURLToPath(import.meta.url));
const routeFileSuffixes = ['.route.ts', '.route.js'] as const;

/**
 * Infrastructure modules that intentionally live outside the public API
 * prefix. Business modules are automatically mounted at `/api/<module>`.
 *
 * Keep this list small. Adding a normal feature should never require editing
 * this file; only a new root-level infrastructure endpoint belongs here.
 */
const rootModules = new Set(['health']);

async function findRouteFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findRouteFiles(fullPath)));
      continue;
    }

    if (routeFileSuffixes.some((suffix) => entry.name.endsWith(suffix))) {
      files.push(fullPath);
    }
  }

  return files;
}

function isRoutePlugin(value: unknown): value is FastifyRoutePlugin {
  return typeof value === 'function';
}

function moduleNameFromRouteFile(routeFile: string): string {
  return basename(dirname(routeFile));
}

/**
 * Automatically discovers and registers feature route plugins.
 *
 * Convention:
 * - Put a Fastify route plugin in `src/modules/<name>/<name>.route.ts`.
 * - Infrastructure modules such as `health` are mounted at the root.
 * - Every other module is mounted under `/api/<name>`.
 *
 * The loader itself is the only central file. Feature contributors should not
 * need to edit a registry whenever they add a new route module.
 */
export async function registerModules(app: FastifyInstance): Promise<void> {
  const routeFiles = (await findRouteFiles(modulesDirectory)).sort();

  for (const routeFile of routeFiles) {
    const importedModule: { default?: unknown } = await import(
      pathToFileURL(routeFile).href
    );
    const routePlugin = importedModule.default;

    if (!isRoutePlugin(routePlugin)) {
      throw new TypeError(
        `Route file ${routeFile} must have a default Fastify route plugin export`,
      );
    }

    const moduleName = moduleNameFromRouteFile(routeFile);
    const prefix = rootModules.has(moduleName)
      ? undefined
      : `${API_PREFIX}/${moduleName}`;

    if (prefix === undefined) {
      await app.register(routePlugin);
    } else {
      await app.register(routePlugin, { prefix });
    }

    app.log.info(
      { module: moduleName, file: routeFile, prefix: prefix ?? '/' },
      'registered route module',
    );
  }
}

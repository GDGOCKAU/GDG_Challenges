import type { FastifyInstance } from 'fastify';

import databasePlugin from './database.js';

/**
 * Cross-cutting, infrastructure-level Fastify plugins (database, CORS, rate
 * limiting, auth decorators, ...) are registered here, before any feature
 * module — so every module can rely on their decorators being present.
 *
 * Keep plugins infrastructure-focused. Anything domain specific belongs in
 * `src/modules/<name>/` instead. Plugins that expose a decorator must be
 * wrapped in `fastify-plugin` or it stays invisible outside the plugin.
 */
export async function registerPlugins(app: FastifyInstance): Promise<void> {
  await app.register(databasePlugin);
}

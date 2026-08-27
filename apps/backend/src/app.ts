import Fastify, { type FastifyInstance } from 'fastify';

import { env } from './config/index.js';
import { registerModules } from './modules/index.js';
import { registerPlugins } from './plugins/index.js';

/**
 * Builds a fully configured Fastify instance without listening on a port.
 *
 * Keeping creation separate from startup means tests can build an app and hit
 * it with `app.inject()`, and `server.ts` stays the only place that opens a
 * socket. Never call `Fastify()` anywhere else.
 */
export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    // Fastify's built-in pino logger — no extra logging library needed.
    logger: { level: env.LOG_LEVEL },
  });

  await registerPlugins(app);
  await registerModules(app);

  return app;
}

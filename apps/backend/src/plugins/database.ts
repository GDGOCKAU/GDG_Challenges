import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import postgres from 'postgres';

import { env } from '../config/index.js';

declare module 'fastify' {
  interface FastifyInstance {
    /** Drizzle query builder, available on `app.db` and `request.server.db`. */
    db: PostgresJsDatabase;
  }
}

/**
 * Owns the database connection for the whole process.
 *
 * Wrapped in `fastify-plugin` so the `db` decorator escapes this plugin's
 * encapsulation context and is visible to every module. The `onClose` hook ties
 * the connection pool to the Fastify lifecycle, so `app.close()` — which the
 * SIGINT/SIGTERM handlers in server.ts call — drains it instead of leaving the
 * process hanging on an open socket.
 *
 * postgres.js connects lazily, so registering this does not require a reachable
 * database at boot.
 */
async function databasePlugin(app: FastifyInstance): Promise<void> {
  const client = postgres(env.DATABASE_URL, { onnotice: () => {} });

  app.decorate('db', drizzle(client));

  app.addHook('onClose', async () => {
    app.log.info('closing database connection');
    await client.end();
  });
}

export default fp(databasePlugin, { name: 'database' });

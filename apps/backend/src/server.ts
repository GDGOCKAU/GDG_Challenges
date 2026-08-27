import { buildApp } from './app.js';
import { env } from './config/index.js';

/**
 * Process entry point: start the HTTP server and shut it down cleanly.
 * All application wiring lives in `app.ts`.
 */
const app = await buildApp();

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    app.log.info({ signal }, 'shutting down');
    void app.close().then(
      () => process.exit(0),
      (error: unknown) => {
        app.log.error(error, 'error during shutdown');
        process.exit(1);
      },
    );
  });
}

try {
  await app.listen({ port: env.PORT, host: env.HOST });
} catch (error) {
  app.log.error(error, 'failed to start server');
  process.exit(1);
}

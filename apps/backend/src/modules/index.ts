import type { FastifyInstance } from 'fastify';

import { healthRoutes } from './health/index.js';

/**
 * Single place where every feature module is mounted.
 *
 * Convention — one directory per domain, never global `controllers/`,
 * `services/` or `routes/` folders:
 *
 *   modules/<name>/
 *     ├── <name>.route.ts       route definitions + schemas wiring
 *     ├── <name>.controller.ts  HTTP layer, thin
 *     ├── <name>.service.ts     domain logic, no HTTP
 *     ├── <name>.schema.ts      JSON Schemas for validation/serialisation
 *     ├── <name>.types.ts       module types
 *     └── index.ts              the module's public surface
 *
 * Infrastructure endpoints (health) live at the root; business modules are
 * mounted under `API_PREFIX` so the frontend has one stable base path.
 */
export async function registerModules(app: FastifyInstance): Promise<void> {
  await app.register(healthRoutes);

  // Business modules go here as they are implemented, e.g.:
  //   await app.register(authRoutes, { prefix: `${API_PREFIX}/auth` });
  // Placeholder directories: auth, users, challenges, submissions,
  // leaderboard, admin.
}

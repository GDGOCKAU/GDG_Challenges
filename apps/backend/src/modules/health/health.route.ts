import type { FastifyPluginAsync } from 'fastify';

import { getHealthHandler } from './health.controller.js';
import { healthResponseSchema } from './health.schema.js';

const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    '/health',
    { schema: { response: { 200: healthResponseSchema } } },
    getHealthHandler,
  );
};

export default healthRoutes;

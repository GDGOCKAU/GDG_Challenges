import type { RouteHandler } from 'fastify';

import { getHealth } from './health.service.js';
import type { HealthResponse } from './health.types.js';

/**
 * The HTTP layer: reads the request, calls the service, shapes the reply.
 * Keep it thin — no domain logic here.
 */
export const getHealthHandler: RouteHandler<{ Reply: HealthResponse }> = async () => getHealth();

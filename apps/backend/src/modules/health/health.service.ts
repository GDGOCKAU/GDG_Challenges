import type { HealthResponse } from './health.types.js';

/**
 * Business/infrastructure logic of the module. Knows nothing about HTTP — no
 * request, no reply, no status codes — so it stays testable on its own.
 */
export function getHealth(): HealthResponse {
  return {
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}

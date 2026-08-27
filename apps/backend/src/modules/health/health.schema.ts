/**
 * JSON Schemas for this module's routes. Fastify uses them to validate input
 * and to serialise responses (which is also what makes serialisation fast), so
 * every route should declare one.
 */
export const healthResponseSchema = {
  type: 'object',
  required: ['status', 'uptime', 'timestamp'],
  properties: {
    status: { type: 'string', enum: ['ok'] },
    uptime: { type: 'number', description: 'Process uptime in seconds' },
    timestamp: { type: 'string', format: 'date-time' },
  },
} as const;

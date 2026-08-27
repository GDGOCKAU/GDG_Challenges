/**
 * Public surface of the shared package.
 *
 * Only put here what BOTH the backend and the frontend need: types, enums,
 * constants and API request/response contracts. Never backend-specific logic
 * (database access, Fastify plugins, ...) and never frontend-specific code.
 */
export * from './constants.js';
export * from './contracts/health.js';

import type { HealthResponse } from '@gdg/shared';

/**
 * The wire shape lives in `@gdg/shared` so the frontend can consume the exact
 * same contract. Module-local types that the frontend never sees belong here.
 */
export type { HealthResponse };

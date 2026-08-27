/**
 * Environment parsing and validation.
 *
 * The process environment is read exactly once, here. Everything else in the
 * app imports the typed `env` object instead of touching `process.env`, so a
 * missing or malformed variable fails loudly at startup rather than at the
 * first request that happens to need it.
 *
 * `.env` is loaded by Node itself (`--env-file-if-exists`, see package.json),
 * so no dotenv dependency is needed.
 */

export const NODE_ENVS = ['development', 'test', 'production'] as const;
export type NodeEnv = (typeof NODE_ENVS)[number];

export const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export interface Env {
  NODE_ENV: NodeEnv;
  PORT: number;
  HOST: string;
  LOG_LEVEL: LogLevel;
  /** PostgreSQL connection string. See apps/backend/database for the schema. */
  DATABASE_URL: string;
}

class EnvError extends Error {
  constructor(issues: string[]) {
    super(`Invalid environment configuration:\n  - ${issues.join('\n  - ')}`);
    this.name = 'EnvError';
  }
}

function parseEnv(source: NodeJS.ProcessEnv): Env {
  const issues: string[] = [];

  const oneOf = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
    const raw = source[key];
    if (raw === undefined || raw === '') return fallback;
    if (!(allowed as readonly string[]).includes(raw)) {
      issues.push(`${key} must be one of ${allowed.join(' | ')} (received "${raw}")`);
      return fallback;
    }
    return raw as T;
  };

  const port = (key: string, fallback: number): number => {
    const raw = source[key];
    if (raw === undefined || raw === '') return fallback;
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65_535) {
      issues.push(`${key} must be an integer between 1 and 65535 (received "${raw}")`);
      return fallback;
    }
    return parsed;
  };

  const required = (key: string): string => {
    const value = source[key]?.trim();
    if (!value) {
      issues.push(`${key} is required — copy .env.example to .env and fill it in`);
      return '';
    }
    return value;
  };

  const env: Env = {
    NODE_ENV: oneOf('NODE_ENV', NODE_ENVS, 'development'),
    PORT: port('PORT', 3000),
    HOST: source.HOST?.trim() || '0.0.0.0',
    LOG_LEVEL: oneOf('LOG_LEVEL', LOG_LEVELS, 'info'),
    DATABASE_URL: required('DATABASE_URL'),
  };

  if (issues.length > 0) throw new EnvError(issues);
  return env;
}

export const env: Env = parseEnv(process.env);

export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';

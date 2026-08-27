import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle is the single source of truth for the schema.
 *
 * Edit the `*.table.ts` files inside `src/modules/<name>/`, then run
 * `pnpm db:generate` to produce the SQL migration, and `pnpm db:migrate` to
 * apply it. Never hand-write a migration — it would drift from the types.
 *
 * drizzle-kit runs outside the app, so it loads .env itself. `generate` never
 * touches the database and works without one.
 *
 * An already-set DATABASE_URL wins, so you can target another database for one
 * command without editing .env:
 *   DATABASE_URL=postgresql://... pnpm db:migrate
 */
if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile('.env');
  } catch {
    // No .env — fine for `generate`.
  }
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/modules/**/*.table.ts',
  out: './database/migrations',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
  strict: true,
  verbose: true,
});

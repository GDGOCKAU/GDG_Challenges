# GDG Challenges — Agent Guide

This file is the working agreement for every agent and contributor. Follow it
before changing code and verify the relevant checks before declaring work done.

## Project map

This is a pnpm TypeScript monorepo:

```text
apps/frontend   React + Vite web application
apps/backend    Fastify HTTP API + Drizzle/PostgreSQL
packages/shared API contracts, enums, and constants used by both apps
```

Use pnpm from the repository root. Do not use npm or yarn for dependency
installation, and do not hand-edit `pnpm-lock.yaml`.

## Backend structure

The backend is feature-based. Keep code inside the domain that owns it:

```text
apps/backend/src/
  config/       environment parsing and typed configuration
  plugins/      Fastify lifecycle infrastructure (database, auth decorators, ...)
  modules/      feature modules
  app.ts        creates/configures Fastify; never listens on a port
  server.ts     process entry point; the only file that calls app.listen()
```

Do not create global `controllers/`, `services/`, `routes/`, or `models/`
folders. Add a feature under `src/modules/<feature>/` instead.

### Module responsibilities

Use only the files that the feature needs, but preserve their boundaries:

```text
<feature>.route.ts       HTTP method/path, schema wiring, and Fastify plugin
<feature>.controller.ts  request/reply translation; thin HTTP layer
<feature>.service.ts     domain rules and database orchestration; no HTTP objects
<feature>.schema.ts      runtime JSON Schema validation/response serialisation
<feature>.table.ts       Drizzle PostgreSQL table definitions
<feature>.types.ts       module-local TypeScript types when useful
<feature>.test.ts        tests colocated with the behaviour they cover
```

- A route chooses the URL and handler.
- A controller may read `request` and use `reply`; a service must not.
- A schema validates data shape at runtime; a service validates business rules.
- A table describes database columns and constraints; it does not contain HTTP
  logic.
- Do not create empty layers for a trivial endpoint. Split a file only when the
  responsibility is real.

### Automatic route loading

`src/modules/index.ts` discovers every `*.route.ts` / compiled `*.route.js`
file recursively. Each route file must default-export a Fastify plugin:

```ts
const userRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ users: [] }));
};

export default userRoutes;
```

Do not add a feature to a central route registry. A normal route at
`src/modules/users/users.route.ts` is mounted at `/api/users`; an inner route
`/profile` becomes `/api/users/profile`. `health` is the root-level
infrastructure exception and remains `/health`. Only add a name to
`rootModules` when introducing a genuinely root-level infrastructure endpoint.

Backend TypeScript uses `NodeNext`. Write `.js` in relative imports even though
the source file is `.ts`: TypeScript resolves the source now, while Node runs
the emitted `.js` file after build.

## Shared package

`@gdg/shared` is for values needed by both frontend and backend: API contracts,
enums, and constants. It must not import Fastify, Drizzle, database code, React,
or other app-specific logic. Build it before relying on its emitted exports.

## Configuration and database

- Runtime application code reads environment variables only through
  `src/config/env.ts`; do not use `process.env` elsewhere in application code.
- Never commit `.env` or credentials. Keep `.env.example` safe and current.
- Drizzle table definitions are the schema source of truth. Edit
  `*.table.ts`, run `pnpm db:generate`, then commit both the generated SQL and
  `database/migrations/meta/` changes. Never hand-write or hand-edit a
  migration.
- `database/seeds/seed.sql` is development data, not a migration. It may be
  hand-maintained.

Choose the correct database workflow before executing a command:

```text
Supabase/hosted DATABASE_URL: pnpm db:setup, then pnpm db:seed once
Local Docker PostgreSQL:     pnpm db:local-setup, then pnpm db:local-seed
```

`pnpm db:clear -- --confirm` deletes development rows from the database named
by the current `DATABASE_URL`; never run it casually or against a shared
database. `pnpm db:reset` deletes the Docker-local volume only. Treat both as
destructive operations and ask for explicit confirmation when the target is not
unambiguously local development data.

## Required working discipline

Before editing:

1. Read the relevant files and run `git status --short`.
2. Preserve unrelated user changes in a dirty worktree.
3. Identify the affected feature, public API path, database target, and package
   scripts before changing them.

While editing:

1. Keep the existing structure and naming conventions.
2. Update documentation and `scriptNotes` whenever commands or workflows
   change.
3. Do not silently change a destructive command's target or semantics.

Before reporting a change complete:

1. Run the narrowest relevant check, then `pnpm typecheck` for cross-workspace
   or structural changes.
2. Build or run the changed application when practical. For a backend route,
   start the backend and verify the endpoint (for example, `GET /health`).
3. For database changes, confirm the intended `DATABASE_URL` target, generate
   migrations when schema files changed, and verify the migration/seed outcome.
4. Re-read changed files and `git diff` to confirm no route prefix, schema,
   package script, generated migration, or module boundary was accidentally
   broken.
5. Report the commands run, their outcome, and any verification that could not
   run because of missing external state such as Docker.

Do not claim success merely because a command ran. Confirm that the relevant
program behaviour, structure, and constraints still hold.

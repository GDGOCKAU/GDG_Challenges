# Database

PostgreSQL schema for the **GDG Challenges MVP**.

## 🧭 Drizzle is the source of truth

The schema is **not** written here as SQL. It is defined in TypeScript, one file
per feature module:

```
src/modules/users/users.table.ts          users, user_role enum
src/modules/users/user-streaks.table.ts   user_streaks
src/modules/challenges/categories.table.ts    categories
src/modules/challenges/challenges.table.ts    challenges, challenge_type, difficulty_level
src/modules/submissions/attempts.table.ts     attempts
src/modules/scoring/points.table.ts            points
```

Everything in `migrations/` is **generated**. Never hand-edit it and never add a
migration by hand — it would drift from the types and Drizzle would not know
about it.

### Changing the schema

```bash
# 1. edit the relevant src/modules/<name>/*.table.ts
pnpm db:generate     # writes the next migration into migrations/
pnpm db:migrate      # applies pending migrations to DATABASE_URL
```

Commit the generated `.sql` **and** the `meta/` files together — `meta/` is the
journal Drizzle uses to know what has already run.

`db:generate` never touches a database. `db:migrate` uses `DATABASE_URL` from
`apps/backend/.env`, unless one is already set in the environment:

```bash
DATABASE_URL=postgresql://... pnpm db:migrate
```

## 🐳 Local PostgreSQL (optional)

Run these commands from the repository root:

```bash
pnpm db:setup       # apply Drizzle migrations to DATABASE_URL (Docker optional)
pnpm db:seed        # insert development/demo data into DATABASE_URL
```

`db:setup` creates the tables in the database identified by `DATABASE_URL`; it
does not start Docker. For a local Docker database, use `pnpm db:local-setup`.
The database is initially empty. `db:seed` runs `seeds/seed.sql` using the same
`DATABASE_URL` loaded by the backend.

Useful lifecycle commands:

```bash
pnpm db:up          # start PostgreSQL only
pnpm db:local-setup # start Docker PostgreSQL and apply migrations
pnpm db:local-seed  # load demo data into local Docker PostgreSQL
pnpm db:migrate     # apply pending migrations
pnpm db:seed        # load demo data (requires the schema)
pnpm db:clear -- --confirm # clear development rows; requires explicit confirmation
pnpm db:down        # stop the container; keeps its volume/data
pnpm db:reset       # DELETE the local volume, start clean, and migrate
```

`db:reset` is intentionally destructive and is only for local development.

The container starts **empty** — the schema comes from `db:migrate`, so Drizzle's
journal stays accurate. Defaults are `gdg_user` / `gdg_password` /
`gdg_challenges` on port `5432`, overridable via shell environment variables:

```
DATABASE_URL=postgresql://gdg_user:gdg_password@localhost:5432/gdg_challenges
```

For a full local reset, use `pnpm db:reset` from the repository root.

## 📊 Core Tables

- **users** — Authentication and roles (student, member, admin).
- **user_streaks** — Daily activity and streak tracking.
- **categories** — Technical tracks (Git, Web, AI, Databases, etc.).
- **challenges** — Daily challenges, difficulty, and metadata.
- **attempts** — Submissions, capped at 10 attempts.
- **points** — Points ledger, unique per (user, challenge).

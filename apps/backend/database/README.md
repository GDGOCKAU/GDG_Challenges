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
src/modules/leaderboard/points.table.ts       points
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

From this directory:

```bash
docker compose up -d
cd .. && pnpm db:migrate
```

The container starts **empty** — the schema comes from `db:migrate`, so Drizzle's
journal stays accurate. Defaults are `gdg_user` / `gdg_password` /
`gdg_challenges` on port `5432`, overridable via shell environment variables:

```
DATABASE_URL=postgresql://gdg_user:gdg_password@localhost:5432/gdg_challenges
```

Reset from scratch: `docker compose down -v && docker compose up -d`.

## 📊 Core Tables

- **users** — Authentication and roles (student, member, admin).
- **user_streaks** — Daily activity and streak tracking.
- **categories** — Technical tracks (Git, Web, AI, Databases, etc.).
- **challenges** — Daily challenges, difficulty, and metadata.
- **attempts** — Submissions, capped at 10 attempts.
- **points** — Points ledger, unique per (user, challenge).

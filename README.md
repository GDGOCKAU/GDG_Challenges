# GDG Challenges

**A daily & weekly technical challenge platform by GDG on Campus — King Abdulaziz University**

> Turn technical learning into a daily habit — not just something tied to courses and workshops.

---

## 📖 Overview

**GDG Challenges** is a website connected to the GDG KAU club portal where members, students, and visitors log in and solve short, recurring technical challenges. Instead of requiring long study sessions, the platform delivers bite-sized daily challenges — some solvable in just a few minutes — backed by a points system, streaks, and achievements that surface on each user's profile.

The goal is simple: get students engaging with technical content *consistently*, one small challenge at a time.

### Profile highlights

Every user profile tracks:

- Total points
- Daily streak
- Number of challenges solved
- Completed daily & weekly challenges
- Achievements / badges
- Leaderboard rank and per-category performance stats

---

## 🧩 Challenge Types

| Type | Description |
|---|---|
| **Multiple Choice** | A technical question with several options, covering Web Development, AI, Linux, Networking, Git, GitHub, Databases, Cybersecurity, Data Structures, Cloud, and Software Engineering. |
| **Coding Challenge** | A short coding task where the user writes a small piece of code — not competitive-programming scale, just enough to test understanding of a specific concept. |
| **Debugging Challenge** | The user is shown code containing a bug and must find and fix it. |
| **Scenario-Based Question** | The user is given a realistic situation and must choose the correct course of action — great for Git/GitHub, Backend, Databases, DevOps, Team Collaboration, and Security topics. |
| **Command Challenge** | The user must type the correct command for a given task (e.g., pushing local commits to GitHub). |
| **Code Output** | The user is shown a snippet of code and must predict what it will print/return when run. |

**Debugging Challenge — example**
```js
const numbers = [1, 2, 3];
for (let i = 0; i <= numbers.length; i++) {
  console.log(numbers[i]);
}
```

**Command Challenge — example**
> What command is used to push local commits to GitHub?
```
git push
```

---

## 📅 Daily Challenges & Points System

A new challenge appears every day and can come from any technical domain — not limited to coding. A flexible weekly rotation might look like:

| Day | Topic |
|---|---|
| Saturday | Git |
| Sunday | JavaScript |
| Monday | Databases |
| Tuesday | Linux |
| Wednesday | AI |
| Thursday | Debugging |
| Friday | General CS |

*(This order isn't strict — it's just an example rotation.)*

### Attempt-based scoring

Points decrease with each incorrect attempt, rewarding careful thinking over guesswork. Example for a 10-point challenge with 5 allowed attempts:

| Attempt | Points Earned |
|---|---|
| 1st | 10 |
| 2nd | 8 |
| 3rd | 6 |
| 4th | 4 |
| 5th | 2 |

Answering correctly on the first try earns the full 10 points; answering correctly only on the fifth attempt (after four wrong tries) earns just 2. The point of this taper isn't just reaching the right answer — it's encouraging users to think before submitting.

---

## 🔥 Streak System

Every user has a daily streak. Completing the Daily Challenge counts that day toward the streak.

**Streak-related achievements:**
- 🔥 7 Day Streak
- 🔥 30 Day Streak
- 🔥 100 Day Streak

---

## 🗓️ Weekly Challenge

In addition to the Daily Challenge, a bigger weekly challenge requires more time or deeper thinking. It's worth more than the daily question — typically **50–100 points**, depending on difficulty.

**Examples:**
- **Git Challenge** — You have a repository with a merge conflict. Explain or execute the steps to resolve it.
- **Backend Challenge** — Design a simple REST API for task management.
- **Database Challenge** — Design a schema for a booking system.
- **Debugging Challenge** — A small project contains several bugs; find as many as you can.
- **Security Challenge** — Given authentication code, identify the vulnerabilities present.

---

## 🎚️ Difficulty Levels & Categories

### Difficulty Levels

| Level | Base Points |
|---|---|
| 🟢 Easy | 10 |
| 🟡 Medium | 20 |
| 🔴 Hard | 30 |

### Categories

Git & GitHub · Web Development · Backend · Frontend · Databases · Artificial Intelligence · Cybersecurity · Linux · Cloud · Algorithms · Data Structures · Programming Fundamentals · Software Engineering · Networking

Users can later see their proficiency per category on their profile (e.g., *Git & GitHub — 82%, Backend — 71%, Databases — 68%*).

---

## 🏆 Leaderboard & Profile

### Leaderboard types
- **Daily Leaderboard** — Top results of the day
- **Weekly Leaderboard** — Top participants of the week
- **Monthly Leaderboard** — Top participants of the month
- **All-Time Leaderboard** — Total points since account creation

A separate leaderboard can also exist for club members vs. one for all students.

### Example user profile

| Field | Value |
|---|---|
| Username | — |
| 🔥 Current Streak | 14 days |
| ⭐ Total Points | 1,240 |
| 🏆 Rank | #8 |
| ✅ Challenges Solved | 93 |
| 📅 Weekly Challenges | 12 |

Plus a per-category skill bar, e.g.: *GitHub & Git — 82%, Backend — 73%, Database — 65%* — giving the profile itself something worth developing and showing off.

---

## 🥇 Achievements

| Achievement | Condition |
|---|---|
| **Perfect Week** | Solve all challenges of the week |
| **No Mistakes** | Solve 10 consecutive challenges on the first attempt |
| **Debug Hunter** | Solve 25 Debugging Challenges |
| **Git Master** | Solve 50 Git/GitHub questions |
| **30 Day Streak** | Maintain a streak for a month |

---

## 🛠️ Admin Dashboard

The technical team needs a dashboard to manage the platform. Admins can:

- Create a challenge and set its category, difficulty, points, and number of attempts
- Define the correct answer and add test cases for coding challenges
- Schedule a challenge to appear on a specific date, and create Weekly Challenges
- Edit or delete challenges
- View participant counts, correct-answer rate, and average number of attempts
- Manage users and achievements, and view the leaderboard

### Challenge Scheduling

Instead of adding a challenge every day, the team can prepare a full month of challenges in advance (e.g., Aug 16 → Git Challenge, Aug 17 → Python Challenge, Aug 18 → Database Challenge), and the platform publishes them automatically on schedule — reducing the admin workload needed to keep the platform running.

---

## 🔗 Integration with Club Activities

### Workshop follow-up challenges

After a workshop, a matching series of challenges appears to reinforce the material. Example — after a **GitHub Workshop**:

1. Git Basics
2. Branching
3. Pull Requests
4. Merge Conflicts
5. GitHub Actions

This lets the team measure whether participants actually absorbed the workshop content. The same idea applies to Web Development, Agentic Coding, TensorFlow, Backend, Linux, and any future workshop.

---

## 🎯 Target Audience & Goals

**Target audience:** GDG members · Computer science students · Beginners · Students from other majors interested in tech · Workshop participants · Any visitor who wants to test their technical knowledge

**For students** — turns technical learning into a short daily habit, instead of something tied only to courses and workshops.

**For the technical team** — an ongoing project that can be built out in phases, giving Tech Department members hands-on work across multiple areas: Frontend, Backend, Database, Authentication, UI/UX, DevOps, Testing, Question Creation, Analytics, and Gamification.

---

## 🚀 Roadmap

### MVP — Phase 1

No need to build everything from day one. The first version includes only:

- [ ] Login / Register
- [ ] Daily Challenge
- [ ] Multiple Choice Questions
- [ ] Simple Coding Questions
- [ ] Attempts System
- [ ] Points System
- [ ] Daily Streak
- [ ] User Profile
- [ ] Leaderboard
- [ ] Admin Dashboard (create & schedule challenges)

### Phase 2 — Post-launch

- [ ] Weekly Challenges
- [ ] Debugging Challenges
- [ ] Achievements
- [ ] Seasons
- [ ] Skill Statistics
- [ ] Advanced Code Judge
- [ ] Workshop Challenges
- [ ] Badges
- [ ] Notifications

---

## 💡 Proposed Improvements

Notes worth discussing with the team before or during development — some about UX quality, some about protecting the platform from abuse.

- **Anti-cheat & fair play** — Since points and the leaderboard are competitive, plan early for: preventing multiple accounts (tie accounts to the official university email), rate-limiting attempts within short time windows, and hidden test cases for coding questions so passing the visible examples isn't enough.
- **Streak Freeze** — Give users a limited number of monthly "freeze days" (à la Duolingo) so a single day missed for a valid reason doesn't break their streak.
- **Review before publishing** — Since multiple team members will be adding questions, an approval/review step before a challenge goes live helps ensure answer correctness and clear wording.
- **Team-based competition** — Alongside individual ranking, add a team leaderboard (e.g., competition between academic departments or student cohorts).
- **Simplified onboarding** — A short intro screen on first login explaining the points, streak, and attempts systems — especially important since the target audience includes beginners.
- **Clear privacy controls** — Let users hide their name from the public leaderboard (anonymous/display name), especially since the platform will be open to visitors outside the club.
- **Bilingual from day one** — Design the database with Arabic/English (i18n) support in mind from the start, even if the first UI ships in a single language, to avoid a costly restructure later.

---

## 📂 Project Structure

A **pnpm workspaces** monorepo. Everything TypeScript, end to end.

```
GDG_Challenges/
├── apps/
│   ├── backend/          # Fastify HTTP API
│   │   ├── database/     # PostgreSQL schema, migrations, local docker-compose
│   │   └── src/
│   │       ├── config/   # env parsing & validation (single source of truth)
│   │       ├── modules/  # feature modules — the heart of the backend
│   │       ├── plugins/  # cross-cutting Fastify plugins (db connection, CORS, …)
│   │       ├── utils/    # framework-agnostic helpers
│   │       ├── app.ts    # builds the Fastify instance (no listening)
│   │       └── server.ts # starts the HTTP server (only place that listens)
│   └── frontend/         # Vite + React web app
├── packages/
│   └── shared/           # types, enums, constants & API contracts shared by both
├── package.json          # workspace root + common scripts
├── pnpm-workspace.yaml
└── tsconfig.json         # base compiler options every package extends
```

> **Status:** base architecture only. No auth, no database access, no business
> endpoints yet — see the Roadmap above for what comes next.

---

## 🚀 Getting Started

**Requirements:** Node.js **≥ 22** and **pnpm ≥ 9** (`npm install -g pnpm`).
This repo uses pnpm workspaces — `npm install` / `yarn` will not work.

```bash
pnpm install          # install every workspace package
```

| Command | What it does |
|---|---|
| `pnpm dev` | Runs backend + frontend together |
| `pnpm dev:backend` | Backend only → http://localhost:3000 |
| `pnpm dev:frontend` | Frontend only → http://localhost:5173 |
| `pnpm build` | Builds every package (shared → apps) |
| `pnpm typecheck` | Type-checks the whole workspace |

Verify the backend is up:

```bash
curl http://localhost:3000/health
# {"status":"ok","uptime":3,"timestamp":"..."}
```

`GET /health` is currently the **only** endpoint — it exists to confirm the base works.

### Environment variables

```bash
cp apps/backend/.env.example apps/backend/.env
```

That is the **only** env file in the repo — `DATABASE_URL` included. It is loaded
by Node itself (`--env-file-if-exists`), read and validated once in
[`src/config/env.ts`](apps/backend/src/config/env.ts), and exposed as a typed
`env` object. **Never read `process.env` anywhere else** — a bad value should fail
at startup, not on the first request that needs it.

### Database

The PostgreSQL schema and migrations live in
[`apps/backend/database/`](apps/backend/database/), along with an optional
`docker-compose.yml` for a local instance — see the README there.

`DATABASE_URL` is **required**; the app refuses to start without it. The
connection is owned by one plugin,
[`src/plugins/database.ts`](apps/backend/src/plugins/database.ts), which exposes
Drizzle as `app.db` and closes the pool on shutdown. postgres.js connects lazily,
so the server still boots when the database is unreachable.

**Drizzle is the source of truth for the schema.** Tables are declared in
TypeScript next to the module that owns them (`src/modules/<name>/*.table.ts`),
and everything under `database/migrations/` is generated:

```bash
pnpm --filter @gdg/backend db:generate   # after editing a *.table.ts
pnpm --filter @gdg/backend db:migrate    # apply to DATABASE_URL
```

Never hand-write a migration — Drizzle would not know about it and the types
would drift from the database. No queries are written yet.

---

## 🧱 Backend Architecture

### Feature-based modules — not layered folders

Code is organised **by domain**, never by technical layer. There are no global
`controllers/`, `services/`, `routes/` or `models/` folders, and there never should be.

```
src/modules/
├── health/        ← the reference implementation, follow it
├── auth/          ← placeholders — empty until implemented
├── users/
├── challenges/
├── submissions/
├── leaderboard/
└── admin/
```

Each module owns everything it needs:

```
modules/<name>/
├── <name>.route.ts       route definitions + schema wiring
├── <name>.controller.ts  HTTP layer — thin, no domain logic
├── <name>.service.ts     domain logic — knows nothing about HTTP
├── <name>.schema.ts      JSON Schemas for validation & serialisation
├── <name>.table.ts       Drizzle table definitions (the database schema)
├── <name>.types.ts       module types
└── index.ts              the module's public surface
```

`.schema.ts` and `.table.ts` are deliberately different files: the first is the
HTTP contract Fastify validates against, the second is the database shape.

Not every file is mandatory, but the naming is. Modules are mounted in one place —
[`src/modules/index.ts`](apps/backend/src/modules/index.ts) — with business routes
under the `/api` prefix and infrastructure routes (health) at the root.

**When you add a feature, add a module.** Resist the pull toward shared layer folders:
they are what makes a codebase hard to change once it has ten features in it.

### Where the database connection lives

In `src/plugins/`, not a top-level `src/db/` folder. Anything that hooks into the
Fastify lifecycle — a connection to drain on shutdown, a decorator every module
reads — is infrastructure, and infrastructure is what `plugins/` is for. The
plugin is wrapped in `fastify-plugin` so its `db` decorator escapes the plugin's
encapsulation context; without that wrapper `app.db` would be invisible to the
modules registered next to it.

Use it from a service as `app.db` (or `request.server.db`); it is fully typed via
module augmentation.

### app.ts vs server.ts

`app.ts` builds and configures Fastify; `server.ts` starts it. That split keeps
server startup in exactly one place and lets tests build an app and call
`app.inject()` without binding a port. Do not call `Fastify()` anywhere else.

### Shared package

`@gdg/shared` holds only what **both** sides need — types, enums, constants, API
contracts. No backend logic (database, Fastify), no frontend code. Import it as
a normal package:

```ts
import { API_PREFIX, type HealthResponse } from '@gdg/shared';
```

It compiles ahead of the apps, so `pnpm dev:*` and `pnpm typecheck` build it first.

---

## 🤝 Contributing

This project is built by the **GDG on Campus KAU Tech Department**, with room to contribute across Frontend, Backend, Database, Authentication, UI/UX, DevOps, Testing, Question Creation, Analytics, and Gamification.

---

*Good luck to the GDG Challenges team — toward stronger challenges and a more engaged student community! 🚀*

# Database Architecture & Migrations

This folder contains the core PostgreSQL database schema, migrations, constraints, and indexes for the **GDG Challenges MVP**.

## Quick Start (Local Setup)

To run the database and automatically apply the initial schema:

```bash
cd database
docker compose up -d

Connection Details:
Host: localhost

Port: 5432

Database: gdg_challenges

User: gdg_user

Password: gdg_password

📊 Core Tables
users: Authentication and core user roles (student, member, admin).

categories: Challenge domains (Git, Web, AI, Databases, etc.).

challenges: Daily & Scheduled challenges with JSONB metadata.

attempts: User submission logs (strictly 1–5 attempts per challenge).

points: Points ledger preventing duplicate challenge points.

user_streaks: Daily streak tracker.

⚡ Key Indexes Included
idx_challenges_date -> Fast query for daily challenges.

idx_attempts_user_challenge -> Quick verification of remaining attempts.

idx_points_user_id & idx_points_created_at -> High-performance leaderboard queries.
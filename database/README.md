# Database Architecture & Migrations

PostgreSQL schema, migrations, constraints, and indexes for the **GDG Challenges MVP**.

## 🚀 Quick Start (Local Setup)

1. **Setup environment:**
   ```bash
   cp .env.example .env

   docker compose up -d

## 📊 Core Tables
users: Authentication and roles (student, member, admin).  

categories: Technical tracks (Git, Web, AI, Databases, etc.).  

challenges: Daily challenges, difficulty, and metadata.  

attempts: Submissions restricted to 1–5 attempts.  

points: Points log with unique constraint per challenge.  

user_streaks: Daily activity and streak tracking.
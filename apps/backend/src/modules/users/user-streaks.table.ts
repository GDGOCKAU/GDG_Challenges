import { sql } from 'drizzle-orm';
import { check, date, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users.table.js';

export const userStreaks = pgTable(
  'user_streaks',
  {
    userId: uuid('user_id')
      .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    currentStreak: integer('current_streak').notNull().default(0),
    maxStreak: integer('max_streak').notNull().default(0),
    lastCompletedDate: date('last_completed_date'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check(
      'chk_streak_non_negative',
      sql`${t.currentStreak} >= 0 AND ${t.maxStreak} >= 0`,
    ),
  ],
);

export type UserStreak = typeof userStreaks.$inferSelect;
export type NewUserStreak = typeof userStreaks.$inferInsert;

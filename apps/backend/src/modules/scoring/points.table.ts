import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { challenges } from '../challenges/challenges.table.js';
import { users } from '../users/users.table.js';

/** Append-only ledger: every point a user earns is one row. */
export const points = pgTable(
  'points',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    challengeId: uuid('challenge_id').references(() => challenges.id, {
      onDelete: 'set null',
    }),
    pointsAwarded: integer('points_awarded').notNull(),
    reason: varchar('reason', { length: 100 }).notNull().default('daily_challenge'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('uq_user_challenge_points').on(t.userId, t.challengeId),
    check('chk_points_positive', sql`${t.pointsAwarded} >= 0`),
    index('idx_points_user_id').on(t.userId),
    index('idx_points_created_at').on(t.createdAt),
  ],
);

export type Points = typeof points.$inferSelect;
export type NewPoints = typeof points.$inferInsert;

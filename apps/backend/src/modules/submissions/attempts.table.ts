import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { MAX_ATTEMPTS_LIMIT, challenges } from '../challenges/challenges.table.js';
import { users } from '../users/users.table.js';

export const attempts = pgTable(
  'attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    challengeId: uuid('challenge_id')
      .notNull()
      .references(() => challenges.id, { onDelete: 'cascade' }),
    attemptNumber: integer('attempt_number').notNull(),
    submittedAnswer: text('submitted_answer'),
    isCorrect: boolean('is_correct').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // Upper bound matches challenges.max_attempts' ceiling — the real per-challenge
    // limit is enforced in the service layer against that column.
    check(
      'chk_attempt_number',
      sql`${t.attemptNumber} >= 1 AND ${t.attemptNumber} <= ${sql.raw(String(MAX_ATTEMPTS_LIMIT))}`,
    ),
    index('idx_attempts_user_challenge').on(t.userId, t.challengeId),
  ],
);

export type Attempt = typeof attempts.$inferSelect;
export type NewAttempt = typeof attempts.$inferInsert;

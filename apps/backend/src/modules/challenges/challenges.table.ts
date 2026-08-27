import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { categories } from './categories.table.js';

export const challengeType = pgEnum('challenge_type', ['multiple_choice', 'simple_coding']);
export const difficultyLevel = pgEnum('difficulty_level', ['easy', 'medium', 'hard']);

/** Hard ceiling on attempts per challenge, enforced in the database. */
export const MAX_ATTEMPTS_LIMIT = 10;

export const challenges = pgTable(
  'challenges',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'restrict' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    type: challengeType('type').notNull(),
    difficulty: difficultyLevel('difficulty').notNull().default('easy'),
    basePoints: integer('base_points').notNull().default(10),
    maxAttempts: integer('max_attempts').notNull().default(5),
    challengeDate: date('challenge_date'),
    isActive: boolean('is_active').notNull().default(true),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check('chk_base_points', sql`${t.basePoints} > 0`),
    check(
      'chk_max_attempts',
      sql`${t.maxAttempts} > 0 AND ${t.maxAttempts} <= ${sql.raw(String(MAX_ATTEMPTS_LIMIT))}`,
    ),
    index('idx_challenges_date').on(t.challengeDate),
    index('idx_challenges_category').on(t.categoryId),
  ],
);

export type Challenge = typeof challenges.$inferSelect;
export type NewChallenge = typeof challenges.$inferInsert;

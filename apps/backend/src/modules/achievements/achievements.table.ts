import { boolean, integer, pgTable, text, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from '../users/users.table.js';

export const achievements = pgTable('achievements', {
  id: varchar('id', { length: 50 }).primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
  color: varchar('color', { length: 20 }).notNull().default('#4285F4'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const userAchievements = pgTable(
  'user_achievements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    achievementId: varchar('achievement_id', { length: 50 })
      .notNull()
      .references(() => achievements.id, { onDelete: 'cascade' }),
    unlocked: boolean('unlocked').notNull().default(false),
    progress: integer('progress').notNull().default(0),
    unlockedAt: timestamp('unlocked_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    unique('uq_user_achievement').on(t.userId, t.achievementId),
  ]
);

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;
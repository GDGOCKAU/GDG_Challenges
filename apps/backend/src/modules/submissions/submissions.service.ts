import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { and, count, eq, sum } from 'drizzle-orm';

import { attempts } from './attempts.table.js';
import { challenges } from '../challenges/challenges.table.js';
import { points } from '../scoring/points.table.js';
import { userStreaks } from '../users/user-streaks.table.js';

type Database = PostgresJsDatabase;

export async function getUserAttempts(
  db: Database,
  userId: string,
  challengeId: string,
) {
  const userAttempts = await db
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, userId),
        eq(attempts.challengeId, challengeId),
      ),
    );

  return userAttempts;
}

export async function hasUserSolvedChallenge(
  db: Database,
  userId: string,
  challengeId: string,
) {
  const userAttempts = await getUserAttempts(
    db,
    userId,
    challengeId,
  );

  return userAttempts.some((attempt) => attempt.isCorrect);
}

export async function getChallengeById(
  db: Database,
  challengeId: string,
) {
  const result = await db
    .select()
    .from(challenges)
    .where(eq(challenges.id, challengeId))
    .limit(1);

  return result[0];
}

export async function hasReachedMaxAttempts(
  db: Database,
  userId: string,
  challengeId: string,
) {
  const challenge = await getChallengeById(
    db,
    challengeId,
  );

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const userAttempts = await getUserAttempts(
    db,
    userId,
    challengeId,
  );

  return userAttempts.length >= challenge.maxAttempts;
}

export async function createAttempt(
  db: Database,
  userId: string,
  challengeId: string,
  submittedAnswer: string,
  isCorrect: boolean,
) {
  const userAttempts = await getUserAttempts(
    db,
    userId,
    challengeId,
  );

  const attemptNumber = userAttempts.length + 1;

  const [newAttempt] = await db
    .insert(attempts)
    .values({
      userId,
      challengeId,
      attemptNumber,
      submittedAnswer,
      isCorrect,
    })
    .returning();

  return newAttempt;
}

export function calculatePoints(
  basePoints: number,
  maxAttempts: number,
  attemptNumber: number,
) {
  const pointsLostPerAttempt = basePoints / maxAttempts;

  const calculatedPoints =
    basePoints - pointsLostPerAttempt * (attemptNumber - 1);

  return Math.max(Math.round(calculatedPoints), 0);
}

export async function awardPoints(
  db: Database,
  userId: string,
  challengeId: string,
  pointsAwarded: number,
) {
  const [newPoints] = await db
    .insert(points)
    .values({
      userId,
      challengeId,
      pointsAwarded,
      reason: 'daily_challenge',
    })
    .returning();

  return newPoints;
}

export async function getUserTotalPoints(
  db: Database,
  userId: string,
) {
  const [result] = await db
    .select({
      totalPoints: sum(points.pointsAwarded),
    })
    .from(points)
    .where(eq(points.userId, userId));

  return Number(result?.totalPoints ?? 0);
}

export async function getUserLeaderboardStats(
  db: Database,
  userId: string,
) {
  const totalPoints = await getUserTotalPoints(
    db,
    userId,
  );

  const [solvedResult] = await db
    .select({
      solved: count(points.id),
    })
    .from(points)
    .where(eq(points.userId, userId));

  const [streakResult] = await db
    .select({
      currentStreak: userStreaks.currentStreak,
      maxStreak: userStreaks.maxStreak,
    })
    .from(userStreaks)
    .where(eq(userStreaks.userId, userId))
    .limit(1);

  return {
    userId,
    points: totalPoints,
    solved: Number(solvedResult?.solved ?? 0),
    streak: streakResult?.currentStreak ?? 0,
    maxStreak: streakResult?.maxStreak ?? 0,
  };
}

function getPreviousDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`);

  date.setUTCDate(date.getUTCDate() - 1);

  return date.toISOString().slice(0, 10);
}

export async function updateDailyStreak(
  db: Database,
  userId: string,
  completionDate: string,
) {
  const [existingStreak] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, userId))
    .limit(1);

  if (!existingStreak) {
    const [newStreak] = await db
      .insert(userStreaks)
      .values({
        userId,
        currentStreak: 1,
        maxStreak: 1,
        lastCompletedDate: completionDate,
      })
      .returning();

    return newStreak;
  }

  if (existingStreak.lastCompletedDate === completionDate) {
    return existingStreak;
  }

  const yesterday = getPreviousDate(completionDate);

  const newCurrentStreak =
    existingStreak.lastCompletedDate === yesterday
      ? existingStreak.currentStreak + 1
      : 1;

  const newMaxStreak = Math.max(
    existingStreak.maxStreak,
    newCurrentStreak,
  );

  const [updatedStreak] = await db
    .update(userStreaks)
    .set({
      currentStreak: newCurrentStreak,
      maxStreak: newMaxStreak,
      lastCompletedDate: completionDate,
      updatedAt: new Date(),
    })
    .where(eq(userStreaks.userId, userId))
    .returning();

  return updatedStreak;
}

export async function submitAnswer(
  db: Database,
  userId: string,
  challengeId: string,
  submittedAnswer: string,
) {
  const challenge = await getChallengeById(
    db,
    challengeId,
  );

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const metadata = challenge.metadata as {
    correct_answer?: string;
  } | null;

  if (!metadata?.correct_answer) {
    throw new Error(
      'Challenge does not have a correct answer',
    );
  }

  const alreadySolved = await hasUserSolvedChallenge(
    db,
    userId,
    challengeId,
  );

  if (alreadySolved) {
    throw new Error('Challenge already solved');
  }

  const reachedMaxAttempts =
    await hasReachedMaxAttempts(
      db,
      userId,
      challengeId,
    );

  if (reachedMaxAttempts) {
    throw new Error('Maximum attempts reached');
  }

  const isCorrect =
    submittedAnswer.trim().toLowerCase() ===
    metadata.correct_answer.trim().toLowerCase();

  const newAttempt = await createAttempt(
    db,
    userId,
    challengeId,
    submittedAnswer,
    isCorrect,
  );

  let earnedPoints = 0;
  let streak = null;

  if (isCorrect) {
    earnedPoints = calculatePoints(
      challenge.basePoints,
      challenge.maxAttempts,
      newAttempt.attemptNumber,
    );

    await awardPoints(
      db,
      userId,
      challengeId,
      earnedPoints,
    );

    if (challenge.challengeDate) {
      streak = await updateDailyStreak(
        db,
        userId,
        challenge.challengeDate,
      );
    }
  }

  return {
    attempt: newAttempt,
    pointsEarned: earnedPoints,
    attemptsRemaining:
      challenge.maxAttempts - newAttempt.attemptNumber,
    streak,
  };
}


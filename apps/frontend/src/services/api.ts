import { MOCK_LEADERBOARD, MOCK_PROFILE, MOCK_DAILY_CHALLENGE } from '../data/mockData';
import type {
  LeaderboardResponse,
  LeaderboardScope,
  Profile,
  DailyChallengeData,
  ChallengeSubmissionPayload,
  ChallengeSubmissionResult,
} from '../types/gdg';

// Flip to false once the backend endpoints exist.
const USE_MOCK = true;

export const POLL_INTERVAL_MS = 15000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Persistent Storage Helpers for Mock Mode ---

function getStoredProfile(): Profile {
  const saved = localStorage.getItem('gdg_mock_profile');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback on corrupt JSON
    }
  }
  return { ...MOCK_PROFILE };
}

function saveStoredProfile(profile: Profile): void {
  localStorage.setItem('gdg_mock_profile', JSON.stringify(profile));
}

function getStoredAttempts(): number {
  const saved = localStorage.getItem('gdg_mock_attempts');
  return saved !== null ? Number(saved) : 5;
}

function saveStoredAttempts(attempts: number): void {
  localStorage.setItem('gdg_mock_attempts', String(attempts));
}

// --- Generic HTTP Request Helpers ---

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: 'include' });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

// --- Service Functions ---

export async function fetchProfile(): Promise<Profile> {
  if (USE_MOCK) {
    await delay(300);
    const profile = getStoredProfile();
    const me = MOCK_LEADERBOARD.allTime.find((row) => row.isCurrentUser);
    return { ...profile, rank: me ? me.rank : profile.rank };
  }
  return get<Profile>('/api/users/me/profile');
}

export async function fetchLeaderboard(
  scope: LeaderboardScope = 'allTime',
): Promise<LeaderboardResponse> {
  if (USE_MOCK) {
    await delay(300);
    const profile = getStoredProfile();
    const entries = (MOCK_LEADERBOARD[scope] ?? MOCK_LEADERBOARD.allTime).map((entry) => {
      if (entry.isCurrentUser) {
        return {
          ...entry,
          points: profile.points,
          solved: profile.solvedCount,
        };
      }
      return entry;
    });

    return {
      scope,
      entries,
      currentUser: entries.find((row) => row.isCurrentUser) ?? null,
    };
  }
  return get<LeaderboardResponse>(`/api/leaderboard?scope=${encodeURIComponent(scope)}`);
}

// --- Challenge Endpoints (Person 2) ---

export async function fetchDailyChallenge(): Promise<DailyChallengeData> {
  if (USE_MOCK) {
    await delay(300);
    return MOCK_DAILY_CHALLENGE;
  }
  return get<DailyChallengeData>('/api/challenges/daily');
}

export async function submitChallengeAnswer(
  payload: ChallengeSubmissionPayload
): Promise<ChallengeSubmissionResult> {
  if (USE_MOCK) {
    await delay(400);

    const isCorrect =
      payload.answer === 'opt_2' || payload.answer.includes('git push');

    if (isCorrect) {
      const currentAttempts = Number(localStorage.getItem('gdg_mock_attempts')) || 5;
      const attemptIdx = Math.min(
        5 - currentAttempts,
        MOCK_DAILY_CHALLENGE.pointsSchedule.length - 1
      );
      const points = MOCK_DAILY_CHALLENGE.pointsSchedule[attemptIdx] ?? 2;

      return {
        correct: true,
        pointsAwarded: points,
        remainingAttempts: currentAttempts,
        message: 'Correct solution!',
      };
    }

    // Read existing stored attempts, decrement by 1, default to 4 on first fail
    const stored = localStorage.getItem('gdg_mock_attempts');
    const prevAttempts = stored !== null ? Number(stored) : 5;
    const nextAttempts = Math.max(0, prevAttempts - 1);
    localStorage.setItem('gdg_mock_attempts', String(nextAttempts));

    return {
      correct: false,
      pointsAwarded: 0,
      remainingAttempts: nextAttempts,
      message: 'Incorrect solution.',
    };
  }

  return post<ChallengeSubmissionResult>('/api/challenges/submit', payload);
}
import { MOCK_LEADERBOARD, MOCK_PROFILE } from '../data/mockData';
import type { LeaderboardResponse, LeaderboardScope, Profile } from '../types/gdg';

// Flip to false once the profile and leaderboard endpoints exist on the backend.
const USE_MOCK = true;

export const POLL_INTERVAL_MS = 15000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: 'include' });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function fetchProfile(): Promise<Profile> {
  if (USE_MOCK) {
    await delay(650);
    const me = MOCK_LEADERBOARD.allTime.find((row) => row.isCurrentUser);
    return { ...MOCK_PROFILE, rank: me ? me.rank : MOCK_PROFILE.rank };
  }
  return get<Profile>('/api/users/me/profile');
}

export async function fetchLeaderboard(
  scope: LeaderboardScope = 'allTime',
): Promise<LeaderboardResponse> {
  if (USE_MOCK) {
    await delay(500);
    const entries = MOCK_LEADERBOARD[scope] ?? MOCK_LEADERBOARD.allTime;
    return { scope, entries, currentUser: entries.find((row) => row.isCurrentUser) ?? null };
  }
  return get<LeaderboardResponse>(`/api/leaderboard?scope=${encodeURIComponent(scope)}`);
}

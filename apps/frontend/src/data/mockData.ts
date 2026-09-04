import type { LeaderboardEntry, LeaderboardScope, Profile, StreakDay } from '../types/gdg';
import type { ScopeOption } from '../components/leaderboard/ScopeTabs';

const DAY = 24 * 60 * 60 * 1000;

function lastDays(count: number): string[] {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today.getTime() - (count - 1 - i) * DAY);
    return d.toISOString().slice(0, 10);
  });
}

const STREAK_DAYS: StreakDay[] = lastDays(91).map((date, i) => {
  const seed = (i * 37) % 11;
  const solved = seed > 7 ? 0 : seed % 4;
  const isRecent = i >= 79;
  return { date, solved: isRecent ? Math.max(1, solved) : solved };
});

export const MOCK_PROFILE: Profile = {
  id: 'u_1042',
  name: 'zo6',
  username: 'zo6',
  email: 'zo6@gdgkau.dev',
  title: 'Computer Science · KAU',
  joinedAt: '2025-02-11',
  theme: 'Light',

  points: 2480,
  rank: 4,
  rankDelta: 2,
  solvedCount: 87,
  totalChallenges: 140,
  accuracy: 78,

  streak: {
    current: 12,
    longest: 24,
    days: STREAK_DAYS,
  },

  trends: {
    points: [1820, 1905, 1990, 2120, 2210, 2360, 2480],
    streak: [6, 7, 8, 9, 10, 11, 12],
    solved: [72, 75, 78, 80, 83, 85, 87],
    rank: [11, 10, 8, 7, 6, 6, 4],
  },

  categories: [
    { name: 'Algorithms', solved: 31, total: 45, color: '#4285F4' },
    { name: 'Data Structures', solved: 24, total: 35, color: '#34A853' },
    { name: 'SQL', solved: 18, total: 25, color: '#FBBC04' },
    { name: 'Web', solved: 9, total: 20, color: '#EA4335' },
    { name: 'Logic', solved: 5, total: 15, color: '#9C27B0' },
  ],

  achievements: [
    { id: 'ach_first', title: 'First Blood', description: 'Solve your first challenge', icon: 'flag', color: '#4285F4', unlocked: true, unlockedAt: '2025-02-12' },
    { id: 'ach_week', title: 'Week Warrior', description: 'Keep a 7-day streak', icon: 'flame', color: '#EA4335', unlocked: true, unlockedAt: '2025-04-02' },
    { id: 'ach_fifty', title: 'Half Century', description: 'Solve 50 challenges', icon: 'trophy', color: '#FBBC04', unlocked: true, unlockedAt: '2025-06-18' },
    { id: 'ach_sniper', title: 'One Shot', description: 'Solve 10 in a row first-try', icon: 'target', color: '#34A853', unlocked: true, unlockedAt: '2025-07-09' },
    { id: 'ach_month', title: 'Month Machine', description: 'Keep a 30-day streak', icon: 'flame', color: '#9C27B0', unlocked: false, progress: 40 },
    { id: 'ach_top3', title: 'Podium', description: 'Reach the top 3 of the leaderboard', icon: 'medal', color: '#FF7043', unlocked: false, progress: 66 },
  ],
};

export const LEADERBOARD_SCOPES: readonly ScopeOption[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'allTime', label: 'All Time' },
];

const NAMES = [
  'Lama Alzahrani', 'Faisal Alotaibi', 'Noura Bakr', 'zo6', 'Yousef Alqahtani',
  'Sara Almutairi', 'Abdullah Nasser', 'Reem Alsaleh', 'Turki Alamri', 'Joud Alhazmi',
  'Mohammed Ali', 'Danah Alshehri', 'Omar Farouk', 'Hind Alghamdi', 'Ziyad Almalki',
  'Aseel Alharthi', 'Nawaf Alsubaie', 'Maha Aldosari', 'Salman Alrashid', 'Rana Alkhaldi',
];

function buildBoard(basePoints: number, spread: number): LeaderboardEntry[] {
  return NAMES.map((name, i) => {
    const points = Math.round(basePoints - i * spread + ((i * 53) % 17) * 3);
    return {
      id: `u_${100 + i}`,
      rank: 0,
      name,
      username: name.toLowerCase().replace(/\s+/g, '.'),
      points,
      solved: Math.max(1, Math.round(points / 28)),
      streak: Math.max(0, 21 - i + ((i * 7) % 5)),
      delta: ((i * 13) % 7) - 3,
      isCurrentUser: name === MOCK_PROFILE.name,
    };
  })
    .sort((a, b) => b.points - a.points)
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

export const MOCK_LEADERBOARD: Record<LeaderboardScope, LeaderboardEntry[]> = {
  daily: buildBoard(320, 14),
  weekly: buildBoard(980, 41),
  monthly: buildBoard(1740, 68),
  allTime: buildBoard(2900, 105),
};

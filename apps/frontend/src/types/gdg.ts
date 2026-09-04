export type LeaderboardScope = 'daily' | 'weekly' | 'monthly' | 'allTime';

export interface StreakDay {
  date: string;
  solved: number;
}

export interface Category {
  name: string;
  solved: number;
  total: number;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  title: string;
  joinedAt: string;
  theme: 'Light' | 'Dark';
  points: number;
  rank: number;
  rankDelta: number;
  solvedCount: number;
  totalChallenges: number;
  accuracy: number;
  streak: {
    current: number;
    longest: number;
    days: StreakDay[];
  };
  trends: {
    points: number[];
    streak: number[];
    solved: number[];
    rank: number[];
  };
  categories: Category[];
  achievements: Achievement[];
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  username: string;
  points: number;
  solved: number;
  streak: number;
  delta: number;
  isCurrentUser: boolean;
}

export interface LeaderboardResponse {
  scope: LeaderboardScope;
  entries: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
}

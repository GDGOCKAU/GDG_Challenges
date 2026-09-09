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
export type ChallengeType = 'mcq' | 'coding';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ChallengeOption {
  id: string;
  text: string;
}

export interface DailyChallengeData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  type: ChallengeType;
  points: number;
  pointsSchedule: number[]; // e.g. [10, 8, 6, 4, 2]
  options?: ChallengeOption[];
  starterCode?: string;
  codeSnippet?: string;
  hint?: string;
}

export interface ChallengeSubmissionPayload {
  challengeId: string;
  answer: string;
}

export interface ChallengeSubmissionResult {
  correct: boolean;
  pointsAwarded: number;
  remainingAttempts: number;
  message?: string;
}

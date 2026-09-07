import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import Card, { SectionCard } from '../components/Card';
import ErrorBanner from '../components/ErrorBanner';
import LoadingDots from '../components/LoadingDots';
import ProfileHeader from '../components/profile/ProfileHeader';
import StreakCalendar from '../components/profile/StreakCalendar';
import CategoryProgress from '../components/profile/CategoryProgress';
import Achievements from '../components/profile/Achievements';
import {
  TrophyIcon,
  FlameIcon,
  CheckCircleIcon,
  ChartIcon,
  CalendarIcon,
  ArrowUpIcon,
  MedalIcon,
} from '../components/Icons';
import { fetchProfile } from '../services/api';
import { theme } from '../theme';
import type { Profile as ProfileData } from '../types/gdg';

interface ProfileProps {
  darkMode?: boolean;
}

export default function Profile({ darkMode = false }: ProfileProps) {
  const t = theme(darkMode);

  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setUser(await fetchProfile());
    } catch (err) {
      console.error('Load profile error:', err);
      setError(err instanceof Error ? err.message : 'Could not load your profile.');
    } finally {
      setLoading(false);
    }
  }, []);

useEffect(() => {
    load();
  }, [load]);


  if (loading) {
    return (
      <div className="px-4 sm:px-8 py-6 sm:py-7 flex flex-col gap-5 sm:gap-6">
        <PageHeader
          darkMode={darkMode}
          title="Profile"
          description="Your points, streak and solved challenges at a glance."
        />
        <Card darkMode={darkMode}>
          <div className="py-14">
            <LoadingDots darkMode={darkMode} label="Loading your profile..." />
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="px-4 sm:px-8 py-6 sm:py-7 flex flex-col gap-5 sm:gap-6">
        <PageHeader
          darkMode={darkMode}
          title="Profile"
          description="Your points, streak and solved challenges at a glance."
        />
        <ErrorBanner
          darkMode={darkMode}
          message={error || 'Your profile could not be loaded.'}
          onRetry={load}
        />
      </div>
    );
  }

  const solvedPercent = user.totalChallenges
    ? Math.round((user.solvedCount / user.totalChallenges) * 100)
    : 0;
  const firstPoints = user.trends.points[0] ?? 0;
  const lastPoints = user.trends.points[user.trends.points.length - 1] ?? 0;
  const pointsThisWeek = lastPoints - firstPoints;

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-7 flex flex-col gap-5 sm:gap-6">
      <PageHeader
        darkMode={darkMode}
        title="Profile"
        description="Your points, streak and solved challenges at a glance."
      />

      {error && <ErrorBanner darkMode={darkMode} message={error} onRetry={load} />}

      <ProfileHeader darkMode={darkMode} user={user} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          darkMode={darkMode}
          label="Total Points"
          value={user.points.toLocaleString()}
          accent="#3A7CF5"
          tint={darkMode ? 'rgba(58,124,245,0.15)' : '#E8F0FE'}
          icon={<TrophyIcon size={20} color="#3A7CF5" />}
          points={user.trends.points}
          trend={
            <>
              <ArrowUpIcon size={12} color="#34A853" />
              <span style={{ color: '#34A853', fontWeight: 700 }}>+{pointsThisWeek}</span>
              this week
            </>
          }
        />

        <StatCard
          darkMode={darkMode}
          label="Current Streak"
          value={user.streak.current}
          suffix="days"
          accent="#EA4335"
          tint={darkMode ? 'rgba(234,67,53,0.15)' : '#FFEBEE'}
          icon={<FlameIcon size={20} color="#EA4335" />}
          points={user.trends.streak}
          trend={
            <>
              <CalendarIcon size={12} color={t.textMuted} />
              Longest {user.streak.longest} days
            </>
          }
        />

        <StatCard
          darkMode={darkMode}
          label="Challenges Solved"
          value={user.solvedCount}
          suffix={`/ ${user.totalChallenges}`}
          accent="#34A853"
          tint={darkMode ? 'rgba(52,168,83,0.15)' : '#E8F5E9'}
          icon={<CheckCircleIcon size={20} color="#34A853" />}
          points={user.trends.solved}
          trend={
            <>
              <ChartIcon size={12} color={t.textMuted} />
              {solvedPercent}% done · {user.accuracy}% accuracy
            </>
          }
        />

        <StatCard
          darkMode={darkMode}
          label="Global Rank"
          value={`#${user.rank}`}
          accent="#E65100"
          tint={darkMode ? 'rgba(251,188,4,0.15)' : '#FFF8E1'}
          icon={<MedalIcon size={20} color="#E65100" />}
          points={user.trends.rank.map((r) => -r)}
          trend={
            <>
              <ArrowUpIcon size={12} color="#34A853" />
              <span style={{ color: '#34A853', fontWeight: 700 }}>{user.rankDelta}</span>
              places this week
            </>
          }
        />
      </div>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 items-start">
        <SectionCard
          darkMode={darkMode}
          title="Daily Streak"
          icon={<FlameIcon size={16} color="#EA4335" />}
          action={
            <span
              className="text-[12px] whitespace-nowrap"
              style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
            >
              Longest: <strong style={{ color: t.textSecondary }}>{user.streak.longest} days</strong>
            </span>
          }
        >
          <StreakCalendar darkMode={darkMode} days={user.streak.days} />
        </SectionCard>

        <SectionCard
          darkMode={darkMode}
          title="Progress by Category"
          icon={<ChartIcon size={16} color="#4285F4" />}
        >
          <CategoryProgress darkMode={darkMode} categories={user.categories} />
        </SectionCard>
      </div>

      <SectionCard
        darkMode={darkMode}
        title="Achievements"
        icon={<TrophyIcon size={16} color="#FBBC04" />}
      >
        <Achievements darkMode={darkMode} items={user.achievements} />
      </SectionCard>
    </div>
  );
}

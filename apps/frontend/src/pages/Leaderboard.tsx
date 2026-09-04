import { useCallback, useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import SearchField from '../components/SearchField';
import ErrorBanner from '../components/ErrorBanner';
import ScopeTabs from '../components/leaderboard/ScopeTabs';
import Podium from '../components/leaderboard/Podium';
import YourRankCard from '../components/leaderboard/YourRankCard';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import { fetchLeaderboard, POLL_INTERVAL_MS } from '../services/api';
import { LEADERBOARD_SCOPES } from '../data/mockData';
import { theme } from '../theme';
import type { LeaderboardEntry, LeaderboardScope } from '../types/gdg';

interface LeaderboardProps {
  darkMode?: boolean;
}

export default function Leaderboard({ darkMode = false }: LeaderboardProps) {
  const t = theme(darkMode);

  const [scope, setScope] = useState<LeaderboardScope>('allTime');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (nextScope: LeaderboardScope, isPoll = false) => {
    if (!isPoll) {
      setLoading(true);
      setError('');
    }
    try {
      const data = await fetchLeaderboard(nextScope);
      setEntries(data.entries);
      setCurrentUser(data.currentUser);
      if (isPoll) setError('');
    } catch (err) {
      console.error('Load leaderboard error:', err);
      if (!isPoll) {
        setError(err instanceof Error ? err.message : 'Could not load the leaderboard.');
      }
    } finally {
      if (!isPoll) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = (isPoll = false) => {
      if (cancelled) return;
      void load(scope, isPoll);
    };

    run();

    const tick = () => {
      if (document.visibilityState !== 'visible') return;
      run(true);
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') run(true);
    };

    const interval = window.setInterval(tick, POLL_INTERVAL_MS);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [scope, load]);

  const term = search.trim().toLowerCase();
  const visibleRows = useMemo(() => {
    if (!term) return entries;
    return entries.filter(
      (row) => row.name.toLowerCase().includes(term) || row.username.toLowerCase().includes(term),
    );
  }, [entries, term]);

  const showPodium = !term && !loading && entries.length >= 3;

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-7 flex flex-col gap-5 sm:gap-6">
      <PageHeader
        darkMode={darkMode}
        title="Leaderboard"
        description="Where you stand against everyone else solving the daily challenges."
      >
        <SearchField
          darkMode={darkMode}
          value={search}
          onChange={setSearch}
          placeholder="Search participants..."
        />
      </PageHeader>

      {error && <ErrorBanner darkMode={darkMode} message={error} onRetry={() => void load(scope)} />}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <ScopeTabs
          darkMode={darkMode}
          scopes={LEADERBOARD_SCOPES}
          value={scope}
          onChange={setScope}
          disabled={loading}
        />

        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#34A853', animation: 'gdgLivePulse 1.6s ease-out infinite' }}
          />
          <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}>
            Live · every {POLL_INTERVAL_MS / 1000}s
          </span>
        </div>
      </div>

      <YourRankCard darkMode={darkMode} entry={currentUser} total={entries.length} />

      {showPodium && <Podium darkMode={darkMode} entries={entries.slice(0, 3)} />}

      <LeaderboardTable
        darkMode={darkMode}
        rows={visibleRows}
        total={entries.length}
        loading={loading}
        searchTerm={search.trim()}
      />

      <style>{`
        @keyframes gdgLivePulse {
          0% { box-shadow: 0 0 0 0 rgba(52,168,83,0.5); }
          70% { box-shadow: 0 0 0 6px rgba(52,168,83,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,168,83,0); }
        }
      `}</style>
    </div>
  );
}

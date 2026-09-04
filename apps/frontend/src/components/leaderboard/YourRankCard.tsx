import type { ReactNode } from 'react';
import Avatar from '../Avatar';
import RankBadge from './RankBadge';
import { FlameIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from '../Icons';
import { theme } from '../../theme';
import type { LeaderboardEntry } from '../../types/gdg';

interface MetricProps {
  darkMode: boolean;
  label: string;
  value: string | number;
  icon?: ReactNode;
}

function Metric({ darkMode, label, value, icon }: MetricProps) {
  const t = theme(darkMode);

  return (
    <div className="flex flex-col items-start sm:items-end gap-0.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <span
          className="text-[16px] font-bold tabular-nums"
          style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
        >
          {value}
        </span>
      </div>
      <span className="text-[11px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
        {label}
      </span>
    </div>
  );
}

interface YourRankCardProps {
  darkMode: boolean;
  entry: LeaderboardEntry | null;
  total: number;
}

export default function YourRankCard({ darkMode, entry, total }: YourRankCardProps) {
  const t = theme(darkMode);
  if (!entry) return null;

  const percentile = total ? Math.max(1, Math.round((entry.rank / total) * 100)) : null;
  const up = entry.delta > 0;
  const deltaColor = entry.delta === 0 ? t.textFaint : up ? '#34A853' : '#EA4335';

  return (
    <div
      className="rounded-[16px] px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
      style={{
        backgroundColor: darkMode ? '#1A2E4B' : '#E8F0FE',
        border: '1px solid #3A7CF5',
      }}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <RankBadge darkMode={darkMode} rank={entry.rank} size={40} />
        <Avatar name={entry.name} size={44} fontSize={15} isCurrentUser />

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[15px] font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
            >
              {entry.name}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
              style={{
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: '0.06em',
                backgroundColor: darkMode ? 'rgba(58,124,245,0.3)' : '#FFFFFF',
                color: '#1967D2',
              }}
            >
              You
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[13px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}>
              Rank #{entry.rank}
              {percentile ? ` · top ${percentile}%` : ''}
            </span>
            <span className="flex items-center gap-1">
              {entry.delta === 0 ? (
                <MinusIcon size={12} color={deltaColor} />
              ) : up ? (
                <ArrowUpIcon size={12} color={deltaColor} />
              ) : (
                <ArrowDownIcon size={12} color={deltaColor} />
              )}
              <span
                className="text-[12px] font-bold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: deltaColor }}
              >
                {entry.delta === 0 ? 'no change' : `${Math.abs(entry.delta)} this period`}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-7">
        <Metric darkMode={darkMode} label="Points" value={entry.points.toLocaleString()} />
        <Metric darkMode={darkMode} label="Solved" value={entry.solved} />
        <Metric
          darkMode={darkMode}
          label="Streak"
          value={entry.streak}
          icon={<FlameIcon size={13} color="#EA4335" />}
        />
      </div>
    </div>
  );
}

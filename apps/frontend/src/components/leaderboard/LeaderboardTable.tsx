import type { CSSProperties } from 'react';
import Avatar from '../Avatar';
import RankBadge from './RankBadge';
import LoadingDots from '../LoadingDots';
import EmptyState from '../EmptyState';
import { FlameIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from '../Icons';
import { theme } from '../../theme';
import type { LeaderboardEntry } from '../../types/gdg';

const COLS: CSSProperties = {
  gridTemplateColumns: '64px 1fr 110px 100px 100px 90px',
  gap: '16px',
};

const HEADERS = ['Rank', 'Participant', 'Points', 'Solved', 'Streak', 'Change'];

function DeltaCell({ darkMode, delta }: { darkMode: boolean; delta: number }) {
  const t = theme(darkMode);

  if (!delta) {
    return (
      <div className="flex items-center justify-center">
        <MinusIcon size={12} color={t.textFaint} />
      </div>
    );
  }

  const up = delta > 0;
  const color = up ? '#34A853' : '#EA4335';

  return (
    <div className="flex items-center justify-center gap-1">
      {up ? <ArrowUpIcon size={12} color={color} /> : <ArrowDownIcon size={12} color={color} />}
      <span className="text-[12px] font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color }}>
        {Math.abs(delta)}
      </span>
    </div>
  );
}

interface LeaderboardTableProps {
  darkMode: boolean;
  rows?: LeaderboardEntry[];
  total?: number;
  loading?: boolean;
  searchTerm?: string;
}

export default function LeaderboardTable({
  darkMode,
  rows = [],
  total = 0,
  loading = false,
  searchTerm = '',
}: LeaderboardTableProps) {
  const t = theme(darkMode);
  const headerBg = darkMode ? '#222222' : '#F8F9FA';

  return (
    <div
      className="rounded-[16px] overflow-hidden border shadow-sm"
      style={{ backgroundColor: t.surface, borderColor: t.border }}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div
            className="grid px-6 py-3.5 border-b"
            style={{ ...COLS, backgroundColor: headerBg, borderColor: t.border }}
          >
            {HEADERS.map((h, i) => (
              <div
                key={h}
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  color: t.textFaint,
                  textAlign: i >= 2 ? (i === 5 ? 'center' : 'right') : 'left',
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {loading ? (
            <div className="py-14">
              <LoadingDots darkMode={darkMode} label="Loading rankings..." />
            </div>
          ) : rows.length === 0 ? (
            <EmptyState
              darkMode={darkMode}
              title="No participant matches that search"
              hint={
                searchTerm
                  ? `Nothing found for "${searchTerm}". Try a different name or clear the search.`
                  : 'Rankings appear once participants start solving challenges.'
              }
            />
          ) : (
            rows.map((row, idx) => {
              const isMe = row.isCurrentUser;

              return (
                <div
                  key={row.id}
                  className="grid px-6 py-4 items-center transition-colors duration-150 relative"
                  style={{
                    ...COLS,
                    backgroundColor: isMe ? (darkMode ? '#1A2E4B' : '#E8F0FE') : 'transparent',
                    borderBottom:
                      idx < rows.length - 1 ? `1px solid ${darkMode ? '#2A2A2A' : '#F8F9FA'}` : 'none',
                  }}
                >
                  {isMe && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[3px]"
                      style={{ backgroundColor: '#3A7CF5' }}
                    />
                  )}

                  <div className="flex items-center">
                    <RankBadge darkMode={darkMode} rank={row.rank} />
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={row.name} size={36} fontSize={12} isCurrentUser={isMe} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[14px] font-semibold truncate"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
                        >
                          {row.name}
                        </span>
                        {isMe && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0"
                            style={{
                              fontFamily: "'Roboto', sans-serif",
                              letterSpacing: '0.06em',
                              backgroundColor: darkMode ? 'rgba(58,124,245,0.25)' : '#FFFFFF',
                              color: '#1967D2',
                            }}
                          >
                            You
                          </span>
                        )}
                      </div>
                      <div
                        className="text-[12px] truncate"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: t.textFaint }}
                      >
                        @{row.username}
                      </div>
                    </div>
                  </div>

                  <div
                    className="text-[15px] font-bold text-right tabular-nums"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: isMe ? '#3A7CF5' : t.textPrimary,
                    }}
                  >
                    {row.points.toLocaleString()}
                  </div>

                  <div
                    className="text-[14px] text-right tabular-nums"
                    style={{ fontFamily: "'Roboto', sans-serif", color: t.textSecondary }}
                  >
                    {row.solved}
                  </div>

                  <div className="flex items-center justify-end gap-1.5">
                    <FlameIcon size={13} color={row.streak > 0 ? '#EA4335' : t.textFaint} />
                    <span
                      className="text-[14px] tabular-nums"
                      style={{ fontFamily: "'Roboto', sans-serif", color: t.textSecondary }}
                    >
                      {row.streak}
                    </span>
                  </div>

                  <DeltaCell darkMode={darkMode} delta={row.delta} />
                </div>
              );
            })
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-between px-5 sm:px-6 py-3 border-t"
        style={{ backgroundColor: headerBg, borderColor: t.border }}
      >
        <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
          {loading ? '...' : `${rows.length} of ${total} participants`}
        </span>
        <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
          Updated live
        </span>
      </div>
    </div>
  );
}

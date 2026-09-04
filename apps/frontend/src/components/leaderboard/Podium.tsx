import Avatar from '../Avatar';
import { StarIcon, FlameIcon } from '../Icons';
import { podiumFor } from './RankBadge';
import { theme } from '../../theme';
import type { LeaderboardEntry } from '../../types/gdg';

interface PodiumCardProps {
  darkMode: boolean;
  entry: LeaderboardEntry;
  isFirst: boolean;
}

function PodiumCard({ darkMode, entry, isFirst }: PodiumCardProps) {
  const t = theme(darkMode);
  const podium = podiumFor(entry.rank, darkMode);
  if (!podium) return null;

  return (
    <div
      className={`relative rounded-[16px] flex flex-col items-center text-center px-5 pb-5 ${
        isFirst ? 'order-first sm:order-none pt-7' : 'pt-6 sm:mt-[18px]'
      }`}
      style={{
        backgroundColor: t.surface,
        border: `1px solid ${entry.isCurrentUser ? '#3A7CF5' : t.border}`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full"
        style={{ backgroundColor: podium.bg, border: `1.5px solid ${podium.border}` }}
      >
        <StarIcon size={11} color={podium.color} filled />
        <span
          className="text-[11px] font-bold"
          style={{ fontFamily: "'DM Sans', sans-serif", color: podium.color }}
        >
          #{entry.rank}
        </span>
      </div>

      <Avatar
        name={entry.name}
        size={isFirst ? 56 : 46}
        fontSize={isFirst ? 19 : 16}
        isCurrentUser={entry.isCurrentUser}
        ring={podium.bg}
      />

      <div
        className="mt-3 text-[14px] font-bold leading-snug"
        style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
      >
        {entry.name}
      </div>
      <div
        className="text-[11px] mt-0.5 truncate max-w-full"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: t.textFaint }}
      >
        @{entry.username}
      </div>

      <div
        className="mt-3 text-[24px] font-bold leading-none"
        style={{ fontFamily: "'DM Sans', sans-serif", color: podium.color }}
      >
        {entry.points.toLocaleString()}
      </div>
      <div className="text-[11px] mt-1" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
        points
      </div>

      <div
        className="mt-3 pt-3 w-full flex items-center justify-center gap-4 border-t"
        style={{ borderColor: t.borderSubtle }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#34A853' }} />
          <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}>
            {entry.solved} solved
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <FlameIcon size={12} color="#EA4335" />
          <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}>
            {entry.streak}
          </span>
        </div>
      </div>
    </div>
  );
}

interface PodiumProps {
  darkMode: boolean;
  entries?: LeaderboardEntry[];
}

export default function Podium({ darkMode, entries = [] }: PodiumProps) {
  const [first, second, third] = entries;
  if (!first) return null;

  const order = [second, first, third].filter((e): e is LeaderboardEntry => Boolean(e));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {order.map((entry) => (
        <PodiumCard key={entry.id} darkMode={darkMode} entry={entry} isFirst={entry.rank === 1} />
      ))}
    </div>
  );
}

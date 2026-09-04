import { StarIcon } from '../Icons';
import { theme } from '../../theme';

interface PodiumStyle {
  color: string;
  bgLight: string;
  bgDark: string;
  border: string;
}

export const PODIUM: Record<number, PodiumStyle> = {
  1: { color: '#FBBC04', bgLight: '#FFF8E1', bgDark: '#332A00', border: '#FFD54F' },
  2: { color: '#9E9E9E', bgLight: '#F5F5F5', bgDark: '#2A2A2A', border: '#BDBDBD' },
  3: { color: '#FF7043', bgLight: '#FBE9E7', bgDark: '#331811', border: '#FFAB91' },
};

export interface ResolvedPodium {
  color: string;
  bg: string;
  border: string;
}

export function podiumFor(rank: number, darkMode: boolean): ResolvedPodium | null {
  const p = PODIUM[rank];
  if (!p) return null;
  return { color: p.color, bg: darkMode ? p.bgDark : p.bgLight, border: p.border };
}

interface RankBadgeProps {
  darkMode: boolean;
  rank: number;
  size?: number;
}

export default function RankBadge({ darkMode, rank, size = 32 }: RankBadgeProps) {
  const t = theme(darkMode);
  const podium = podiumFor(rank, darkMode);

  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: podium ? podium.bg : t.surfaceAlt,
        border: podium ? `1.5px solid ${podium.border}` : 'none',
      }}
    >
      {podium ? (
        <StarIcon size={Math.round(size * 0.45)} color={podium.color} filled />
      ) : (
        <span
          className="text-[13px] font-bold"
          style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted }}
        >
          {rank}
        </span>
      )}
    </div>
  );
}

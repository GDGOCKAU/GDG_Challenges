import EmptyState from '../EmptyState';
import ProgressBar from '../ProgressBar';
import { ICONS, LockIcon, TrophyIcon } from '../Icons';
import { theme } from '../../theme';
import type { Achievement } from '../../types/gdg';

interface AchievementsProps {
  darkMode: boolean;
  items?: Achievement[];
}

export default function Achievements({ darkMode, items = [] }: AchievementsProps) {
  const t = theme(darkMode);

  if (!items.length) {
    return (
      <EmptyState
        darkMode={darkMode}
        icon={<TrophyIcon size={40} color={darkMode ? '#404040' : '#E0E0E0'} />}
        title="No achievements yet"
        hint="Badges unlock as you build streaks and clear categories."
      />
    );
  }

  const unlockedCount = items.filter((a) => a.unlocked).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((a) => {
          const IconComponent = ICONS[a.icon] ?? TrophyIcon;
          const locked = !a.unlocked;
          const accent = locked ? t.textFaint : a.color;

          return (
            <div
              key={a.id}
              title={locked ? `Locked — ${a.description}` : `Unlocked ${a.unlockedAt ?? ''}`}
              className="rounded-[12px] p-3.5 flex flex-col gap-2.5 transition-all duration-150"
              style={{
                backgroundColor: locked ? (darkMode ? '#222222' : '#FAFAFA') : t.surface,
                border: `1px solid ${locked ? t.border : `${accent}55`}`,
                opacity: locked ? 0.75 : 1,
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: locked ? (darkMode ? '#2A2A2A' : '#F1F3F4') : `${a.color}1F`,
                  }}
                >
                  <IconComponent size={18} color={accent} />
                </div>
                {locked && <LockIcon size={14} color={t.textFaint} />}
              </div>

              <div>
                <div
                  className="text-[13px] font-bold leading-snug"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: locked ? t.textMuted : t.textPrimary,
                  }}
                >
                  {a.title}
                </div>
                <div
                  className="text-[11px] leading-snug mt-0.5"
                  style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
                >
                  {a.description}
                </div>
              </div>

              {locked && typeof a.progress === 'number' && (
                <ProgressBar darkMode={darkMode} percent={a.progress} color={a.color} height={4} />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="text-[12px] text-center"
        style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
      >
        {unlockedCount} of {items.length} unlocked
      </div>
    </div>
  );
}

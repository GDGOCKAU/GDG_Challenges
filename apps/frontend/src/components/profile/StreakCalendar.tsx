import { theme } from '../../theme';
import type { StreakDay } from '../../types/gdg';

const LEVELS = ['rgba(52,168,83,0.25)', 'rgba(52,168,83,0.5)', 'rgba(52,168,83,0.75)', '#34A853'];

function levelFor(solved: number): string | null {
  if (!solved) return null;
  return LEVELS[Math.min(solved, LEVELS.length) - 1] ?? null;
}

interface StreakCalendarProps {
  darkMode: boolean;
  days?: StreakDay[];
}

export default function StreakCalendar({ darkMode, days = [] }: StreakCalendarProps) {
  const t = theme(darkMode);
  const emptyFill = darkMode ? '#2A2A2A' : '#F1F3F4';
  const emptyBorder = darkMode ? '#333333' : '#E8EAED';

  const firstDay = days[0];
  const firstWeekday = firstDay ? new Date(firstDay.date).getDay() : 0;
  const cells: (StreakDay | null)[] = [...Array<null>(firstWeekday).fill(null), ...days];

  const weeks: (StreakDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-[3px] overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, di) => {
              const day = week[di];
              if (!day) {
                return <div key={di} className="w-[13px] h-[13px] rounded-[3px]" style={{ opacity: 0 }} />;
              }
              const fill = levelFor(day.solved);
              return (
                <div
                  key={day.date}
                  title={`${day.date} — ${day.solved} solved`}
                  className="w-[13px] h-[13px] rounded-[3px] flex-shrink-0 transition-colors duration-150"
                  style={{
                    backgroundColor: fill ?? emptyFill,
                    border: fill ? 'none' : `1px solid ${emptyBorder}`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
          Last 13 weeks
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
            Less
          </span>
          <div
            className="w-[13px] h-[13px] rounded-[3px]"
            style={{ backgroundColor: emptyFill, border: `1px solid ${emptyBorder}` }}
          />
          {LEVELS.map((c) => (
            <div key={c} className="w-[13px] h-[13px] rounded-[3px]" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}>
            More
          </span>
        </div>
      </div>
    </div>
  );
}

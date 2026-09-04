import { theme } from '../theme';

interface ProgressBarProps {
  darkMode: boolean;
  percent: number;
  color?: string;
  height?: number;
  label?: string;
}

export default function ProgressBar({
  darkMode,
  percent,
  color = '#34A853',
  height = 6,
  label,
}: ProgressBarProps) {
  const t = theme(darkMode);
  const clamped = Math.max(0, Math.min(100, percent || 0));

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: `${height}px`, backgroundColor: darkMode ? '#333333' : '#E0E0E0' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
      {label && (
        <span
          className="text-[13px] flex-shrink-0"
          style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

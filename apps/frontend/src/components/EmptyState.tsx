import type { ReactNode } from 'react';
import { theme } from '../theme';

interface EmptyStateProps {
  darkMode: boolean;
  title: string;
  hint: string;
  icon?: ReactNode;
}

export default function EmptyState({ darkMode, title, hint, icon }: EmptyStateProps) {
  const t = theme(darkMode);
  const strokeColor = darkMode ? '#404040' : '#E0E0E0';

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      {icon || (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="18" cy="18" r="13" stroke={strokeColor} strokeWidth="2" />
          <path d="M28 28L36 36" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      <span
        className="text-[15px] font-bold"
        style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
      >
        {title}
      </span>
      <span
        className="text-[13px] text-center max-w-[320px]"
        style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
      >
        {hint}
      </span>
    </div>
  );
}

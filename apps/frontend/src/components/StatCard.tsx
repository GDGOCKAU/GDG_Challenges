import type { ReactNode } from 'react';
import Card from './Card';
import Sparkline from './Sparkline';
import { theme } from '../theme';

interface StatCardProps {
  darkMode: boolean;
  label: string;
  value: string | number;
  suffix?: string;
  accent?: string;
  tint?: string;
  icon?: ReactNode;
  points?: number[];
  trend?: ReactNode;
  loading?: boolean;
}

export default function StatCard({
  darkMode,
  label,
  value,
  suffix,
  accent = '#4285F4',
  tint,
  icon,
  points = [],
  trend,
  loading = false,
}: StatCardProps) {
  const t = theme(darkMode);
  const tileBg = tint || (darkMode ? 'rgba(66,133,244,0.15)' : '#E8F0FE');

  return (
    <Card darkMode={darkMode} padding="p-5 sm:p-6" className="flex flex-col gap-3 sm:gap-4">
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: tileBg }}
        >
          {icon}
        </div>
        <div className="hidden sm:block">
          <Sparkline color={accent} points={points} />
        </div>
      </div>

      <div>
        <div
          className="text-[13px] mb-1"
          style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
        >
          {label}
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-[26px] sm:text-[32px] font-bold leading-none"
            style={{ fontFamily: "'DM Sans', sans-serif", color: accent }}
          >
            {loading ? '...' : value}
          </span>
          {suffix && (
            <span
              className="text-[13px] sm:text-[14px]"
              style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
            >
              {suffix}
            </span>
          )}
        </div>
        {trend && (
          <div
            className="text-[12px] mt-2 flex items-center gap-1.5 flex-wrap"
            style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}
          >
            {trend}
          </div>
        )}
      </div>
    </Card>
  );
}

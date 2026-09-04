import type { ReactNode } from 'react';
import Avatar from '../Avatar';
import { FlameIcon, TrophyIcon, CalendarIcon } from '../Icons';
import { theme } from '../../theme';
import type { Profile } from '../../types/gdg';

interface MetaPillProps {
  darkMode: boolean;
  icon: ReactNode;
  label: string;
  value: string;
  tint: string;
  color: string;
}

function MetaPill({ darkMode, icon, label, value, tint, color }: MetaPillProps) {
  const t = theme(darkMode);

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-[10px]"
      style={{ backgroundColor: tint, border: `1px solid ${darkMode ? t.border : 'transparent'}` }}
    >
      {icon}
      <span className="text-[12px]" style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}>
        {label}
      </span>
      <span className="text-[13px] font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color }}>
        {value}
      </span>
    </div>
  );
}

interface ProfileHeaderProps {
  darkMode: boolean;
  user: Profile;
}

export default function ProfileHeader({ darkMode, user }: ProfileHeaderProps) {
  const t = theme(darkMode);
  const shapeOpacity = darkMode ? 0.12 : 0.045;
  const joined = new Date(user.joinedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] px-5 sm:px-8 py-6 sm:py-7"
      style={{
        backgroundColor: t.surface,
        border: `1px solid ${t.border}`,
        boxShadow: darkMode
          ? '0 1px 2px rgba(0,0,0,0.3)'
          : '0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
      }}
    >
      <svg
        className="absolute top-0 right-0 pointer-events-none"
        width="420"
        height="420"
        viewBox="0 0 420 420"
        fill="none"
        style={{ opacity: shapeOpacity }}
      >
        <circle cx="360" cy="60" r="180" stroke="#4285F4" strokeWidth="1.5" />
        <circle cx="360" cy="60" r="130" stroke="#EA4335" strokeWidth="1.5" />
        <circle cx="300" cy="120" r="180" stroke="#FBBC04" strokeWidth="1.5" />
        <circle cx="300" cy="120" r="100" stroke="#34A853" strokeWidth="1.5" />
        <circle cx="420" cy="0" r="90" stroke="#4285F4" strokeWidth="1.5" />
      </svg>

      <div className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
        <Avatar
          name={user.name}
          size={64}
          fontSize={24}
          isCurrentUser
          ring={darkMode ? 'rgba(58,124,245,0.2)' : '#E8F0FE'}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2
              className="text-[20px] sm:text-[22px] font-bold"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '-0.3px',
                color: t.textPrimary,
              }}
            >
              {user.name}
            </h2>
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold"
              style={{
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: darkMode ? 'rgba(66,133,244,0.15)' : '#E8F0FE',
                color: darkMode ? '#60A5FA' : '#1967D2',
              }}
            >
              RANK #{user.rank}
            </span>
          </div>

          <div
            className="text-[13px] mt-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: t.textFaint }}
          >
            @{user.username}
          </div>

          <div
            className="text-[13px] mt-1 truncate"
            style={{ fontFamily: "'Roboto', sans-serif", color: t.textMuted }}
          >
            {user.email}
          </div>

          <div
            className="text-[14px] mt-2"
            style={{ fontFamily: "'Roboto', sans-serif", color: t.textSecondary }}
          >
            {user.title}
          </div>

          <div className="flex items-center gap-2.5 mt-4 flex-wrap">
            <MetaPill
              darkMode={darkMode}
              icon={<TrophyIcon size={14} color="#3A7CF5" />}
              label="Points"
              value={user.points.toLocaleString()}
              tint={darkMode ? 'rgba(58,124,245,0.15)' : '#E8F0FE'}
              color="#3A7CF5"
            />
            <MetaPill
              darkMode={darkMode}
              icon={<FlameIcon size={14} color="#EA4335" />}
              label="Streak"
              value={`${user.streak.current} days`}
              tint={darkMode ? 'rgba(234,67,53,0.15)' : '#FFEBEE'}
              color="#EA4335"
            />
            <MetaPill
              darkMode={darkMode}
              icon={<CalendarIcon size={14} color={t.textMuted} />}
              label="Joined"
              value={joined}
              tint={darkMode ? 'rgba(148,163,184,0.15)' : '#F1F3F4'}
              color={t.textSecondary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

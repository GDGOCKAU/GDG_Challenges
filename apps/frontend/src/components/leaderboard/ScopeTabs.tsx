import { theme } from '../../theme';
import type { LeaderboardScope } from '../../types/gdg';

export interface ScopeOption {
  id: LeaderboardScope;
  label: string;
}

interface ScopeTabsProps {
  darkMode: boolean;
  scopes: readonly ScopeOption[];
  value: LeaderboardScope;
  onChange: (scope: LeaderboardScope) => void;
  disabled?: boolean;
}

export default function ScopeTabs({
  darkMode,
  scopes,
  value,
  onChange,
  disabled = false,
}: ScopeTabsProps) {
  const t = theme(darkMode);

  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-[10px]"
      style={{ backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}` }}
    >
      {scopes.map((scope) => {
        const active = scope.id === value;

        return (
          <button
            key={scope.id}
            type="button"
            onClick={() => onChange(scope.id)}
            disabled={disabled}
            className="px-4 py-1.5 rounded-[8px] text-[13px] transition-all duration-150 active:scale-[0.97] disabled:cursor-not-allowed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: active ? 600 : 500,
              color: active ? '#3A7CF5' : t.textMuted,
              backgroundColor: active ? t.surface : 'transparent',
              boxShadow: active ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
            }}
          >
            {scope.label}
          </button>
        );
      })}
    </div>
  );
}

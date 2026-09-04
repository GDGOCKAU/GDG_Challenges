import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { SearchIcon, CloseIcon } from './Icons';
import { theme } from '../theme';

interface SearchFieldProps {
  darkMode: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchField({
  darkMode,
  value,
  onChange,
  placeholder = 'Search...',
}: SearchFieldProps) {
  const [focused, setFocused] = useState(false);
  const t = theme(darkMode);

  return (
    <div className="relative w-full sm:w-[240px]">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchIcon size={16} color={focused ? '#3A7CF5' : t.textFaint} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 text-[14px] rounded-[10px] outline-none transition-all duration-150"
        style={{
          fontFamily: "'Roboto', sans-serif",
          backgroundColor: t.surface,
          color: t.textPrimary,
          border: focused ? '2px solid #3A7CF5' : `1.5px solid ${t.border}`,
        }}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-150"
          style={{ backgroundColor: t.surfaceAlt }}
        >
          <CloseIcon size={12} color={t.textMuted} />
        </button>
      )}
    </div>
  );
}

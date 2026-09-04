export const GOOGLE = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC04',
  green: '#34A853',
} as const;

export const GOOGLE_BAR = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'] as const;

export const AVATAR_COLORS = ['#4285F4', '#EA4335', '#34A853', '#FBBC04', '#9C27B0'] as const;

export const PRIMARY = {
  base: '#3A7CF5',
  hover: '#2563EB',
  tintLight: '#E8F0FE',
  tintDark: '#1A2E4B',
  onTint: '#1967D2',
} as const;

export interface Palette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  rowHover: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textFaint: string;
  primaryTint: string;
}

const LIGHT: Palette = {
  bg: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F3F4',
  rowHover: '#FAFAFA',
  border: '#E0E0E0',
  borderSubtle: '#F1F3F4',
  textPrimary: '#1C1B1F',
  textSecondary: '#3C4043',
  textMuted: '#5F6368',
  textFaint: '#9AA0A6',
  primaryTint: PRIMARY.tintLight,
};

const DARK: Palette = {
  bg: '#121212',
  surface: '#1E1E1E',
  surfaceAlt: '#2A2A2A',
  rowHover: '#2A2A2A',
  border: '#333333',
  borderSubtle: '#3C3C3C',
  textPrimary: '#E0E0E0',
  textSecondary: '#CCCCCC',
  textMuted: '#AAAAAA',
  textFaint: '#888888',
  primaryTint: PRIMARY.tintDark,
};

export function theme(darkMode: boolean): Palette {
  return darkMode ? DARK : LIGHT;
}

export const BANNER = {
  light: { bg: '#FFEBEE', border: '#FFCDD2', text: '#C62828' },
  dark: { bg: 'rgba(234,67,53,0.12)', border: 'rgba(234,67,53,0.35)', text: '#FCA5A5' },
} as const;

export const FONT = {
  display: "'DM Sans', sans-serif",
  body: "'Roboto', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
} as const;

export function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] as string;
}

export function getInitials(name: string): string {
  if (!name) return '--';
  return name
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

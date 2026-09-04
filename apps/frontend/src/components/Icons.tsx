import type { ComponentType, ReactNode } from 'react';

export interface IconProps {
  size?: number;
  color?: string;
}

function Icon({ size = 16, color = 'currentColor', children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth={size >= 22 ? 1.3 : size >= 18 ? 1.45 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      {children}
    </svg>
  );
}

export function FlagIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M4 14V2.4" />
      <path d="M4 3h8l-1.8 2.8L12 8.6H4" />
    </Icon>
  );
}

export function FlameIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M8 1.6c2.4 2.9 4.4 4.1 4.4 7a4.4 4.4 0 0 1-8.8 0c0-1.6.8-2.9 2-4.2" />
      <path d="M8 14.4a2 2 0 0 1-2-2c0-1.2 2-2.3 2-4 1.6 1.8 2 2.8 2 4a2 2 0 0 1-2 2z" />
    </Icon>
  );
}

export function TrophyIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M4.6 2.4h6.8v3.4a3.4 3.4 0 0 1-6.8 0z" />
      <path d="M4.6 3.6H2.7a1.9 1.9 0 0 0 1.9 2.6" />
      <path d="M11.4 3.6h1.9a1.9 1.9 0 0 1-1.9 2.6" />
      <path d="M8 9.2v2.5M5.6 13.6h4.8" />
    </Icon>
  );
}

export function MedalIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <circle cx="8" cy="10" r="4" />
      <path d="M5.6 6.4L4 1.8h8l-1.6 4.6" />
    </Icon>
  );
}

export function TargetIcon({ size, color = 'currentColor' }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <circle cx="8" cy="8" r="6.4" />
      <circle cx="8" cy="8" r="3.4" />
      <circle cx="8" cy="8" r="1" fill={color} stroke="none" />
    </Icon>
  );
}

export function BoltIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M9 1.8L4 9h3.4l-.6 5.2L12 6.8H8.4z" />
    </Icon>
  );
}

export function CheckCircleIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <circle cx="8" cy="8" r="6.4" />
      <path d="M5.2 8.2l2 2 3.6-4" />
    </Icon>
  );
}

export function StarIcon({ size = 16, color = 'currentColor', filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <path d="M8 2l1.85 3.75 4.15.6-3 2.93.71 4.12L8 11.45l-3.71 1.95.71-4.12-3-2.93 4.15-.6z" />
    </svg>
  );
}

export function LockIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <rect x="3.5" y="7" width="9" height="7" rx="1.6" />
      <path d="M5.8 7V5a2.2 2.2 0 0 1 4.4 0v2" />
    </Icon>
  );
}

export function SearchIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <circle cx="7.2" cy="7.2" r="5.2" />
      <path d="M11 11l3 3" />
    </Icon>
  );
}

export function CloseIcon({ size = 14, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
    </Icon>
  );
}

export function ArrowUpIcon({ size = 12, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M8 13V3.4M4 7.4L8 3.4l4 4" />
    </Icon>
  );
}

export function ArrowDownIcon({ size = 12, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M8 3v9.6M4 8.6l4 4 4-4" />
    </Icon>
  );
}

export function MinusIcon({ size = 12, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M4 8h8" />
    </Icon>
  );
}

export function ChartIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <path d="M2.2 13.8h11.6" />
      <path d="M4.6 11.4V7.2M8 11.4V3.4M11.4 11.4V8.8" />
    </Icon>
  );
}

export function CalendarIcon({ size, color }: IconProps) {
  return (
    <Icon size={size} color={color}>
      <rect x="2.2" y="3.4" width="11.6" height="10.4" rx="2" />
      <path d="M2.2 6.6h11.6M5.4 1.8v2.6M10.6 1.8v2.6" />
    </Icon>
  );
}

export const ICONS: Record<string, ComponentType<IconProps>> = {
  flag: FlagIcon,
  flame: FlameIcon,
  trophy: TrophyIcon,
  target: TargetIcon,
  medal: MedalIcon,
  bolt: BoltIcon,
  star: StarIcon,
  check: CheckCircleIcon,
};

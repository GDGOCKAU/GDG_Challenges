import type { CSSProperties, ReactNode } from 'react';
import { theme } from '../theme';

interface CardProps {
  darkMode: boolean;
  className?: string;
  style?: CSSProperties;
  padding?: string;
  children: ReactNode;
}

export default function Card({
  darkMode,
  className = '',
  style,
  padding = 'p-5 sm:p-6',
  children,
}: CardProps) {
  const t = theme(darkMode);

  return (
    <div
      className={`rounded-[16px] ${padding} border shadow-sm ${className}`}
      style={{ backgroundColor: t.surface, borderColor: t.border, ...style }}
    >
      {children}
    </div>
  );
}

interface SectionCardProps {
  darkMode: boolean;
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function SectionCard({
  darkMode,
  title,
  icon,
  action,
  className = '',
  children,
}: SectionCardProps) {
  const t = theme(darkMode);

  return (
    <Card darkMode={darkMode} padding="p-0" className={`flex flex-col ${className}`}>
      <div
        className="flex items-center gap-2.5 px-5 sm:px-6 py-4 border-b"
        style={{ borderColor: t.borderSubtle }}
      >
        {icon}
        <h3
          className="text-[15px] font-semibold"
          style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
        >
          {title}
        </h3>
        {action && <div className="ml-auto hidden sm:block">{action}</div>}
      </div>
      <div className="px-5 sm:px-6 py-5">{children}</div>
    </Card>
  );
}

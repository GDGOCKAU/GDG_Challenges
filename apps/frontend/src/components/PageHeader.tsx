import type { ReactNode } from 'react';

interface PageHeaderProps {
  darkMode: boolean;
  title: string;
  description: string;
  children?: ReactNode;
}

export default function PageHeader({ darkMode, title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1
          className="text-[22px] sm:text-[26px] font-bold"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '-0.4px',
            color: darkMode ? '#E0E0E0' : '#1C1B1F',
          }}
        >
          {title}
        </h1>
        <p
          className="text-[13px] sm:text-[14px] mt-1"
          style={{ fontFamily: "'Roboto', sans-serif", color: darkMode ? '#AAAAAA' : '#5F6368' }}
        >
          {description}
        </p>
      </div>
      {children && <div className="flex items-center gap-3 w-full sm:w-auto">{children}</div>}
    </div>
  );
}

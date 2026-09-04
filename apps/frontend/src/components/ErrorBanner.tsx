import { BANNER } from '../theme';

interface ErrorBannerProps {
  darkMode: boolean;
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ darkMode, message, onRetry }: ErrorBannerProps) {
  if (!message) return null;
  const c = darkMode ? BANNER.dark : BANNER.light;

  return (
    <div
      className="px-4 py-3 rounded-[10px] border text-[13px] flex items-center justify-between gap-4"
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: c.bg,
        borderColor: c.border,
        color: c.text,
      }}
    >
      <div className="flex items-start gap-2.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
          <circle cx="8" cy="8" r="6.4" stroke={c.text} strokeWidth="1.5" />
          <path d="M8 5v3.6" stroke={c.text} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.9" fill={c.text} />
        </svg>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-[13px] font-semibold whitespace-nowrap transition-all duration-150 active:scale-[0.97]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: c.text, textDecoration: 'underline' }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

interface LoadingDotsProps {
  label?: string;
  size?: number;
  darkMode?: boolean;
}

const DOTS = [
  { color: '#4285F4', delay: '0s' },
  { color: '#EA4335', delay: '0.15s' },
  { color: '#FBBC04', delay: '0.3s' },
  { color: '#34A853', delay: '0.45s' },
];

export default function LoadingDots({ label, size = 8, darkMode = false }: LoadingDotsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-2">
      <div className="flex items-center justify-center gap-2.5">
        {DOTS.map(({ color, delay }) => (
          <span
            key={color}
            style={{
              display: 'block',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: color,
              animation: `gdgDotsBounce 0.8s cubic-bezier(0.33, 0, 0.66, 1) ${delay} infinite`,
            }}
          />
        ))}
      </div>
      {label && (
        <span
          className="text-[13px]"
          style={{ fontFamily: "'Roboto', sans-serif", color: darkMode ? '#888888' : '#9AA0A6' }}
        >
          {label}
        </span>
      )}
      <style>{`
        @keyframes gdgDotsBounce {
          0%, 100% { transform: translateY(0); }
          45% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

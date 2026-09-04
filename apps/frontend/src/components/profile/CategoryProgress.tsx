import ProgressBar from '../ProgressBar';
import { theme } from '../../theme';
import type { Category } from '../../types/gdg';

interface CategoryProgressProps {
  darkMode: boolean;
  categories?: Category[];
}

export default function CategoryProgress({ darkMode, categories = [] }: CategoryProgressProps) {
  const t = theme(darkMode);

  return (
    <div className="flex flex-col gap-4">
      {categories.map((c) => {
        const percent = c.total ? Math.round((c.solved / c.total) * 100) : 0;

        return (
          <div key={c.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <span
                  className="text-[13px] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: t.textPrimary }}
                >
                  {c.name}
                </span>
              </div>
              <span
                className="text-[12px]"
                style={{ fontFamily: "'Roboto', sans-serif", color: t.textFaint }}
              >
                {c.solved} / {c.total}
              </span>
            </div>
            <ProgressBar darkMode={darkMode} percent={percent} color={c.color} height={6} />
          </div>
        );
      })}
    </div>
  );
}

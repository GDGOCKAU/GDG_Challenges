import type { FC } from 'react';

interface ChallengeFeedbackProps {
  status: 'idle' | 'correct' | 'incorrect' | 'exhausted';
  pointsAwarded?: number;
  remainingAttempts: number;
}

export const ChallengeFeedback: FC<ChallengeFeedbackProps> = ({
  status,
  pointsAwarded = 0,
  remainingAttempts,
}) => {
  if (status === 'idle') return null;

  if (status === 'correct') {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-500 shadow-sm transition-all duration-300 animate-in fade-in zoom-in-95">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-xl animate-bounce">
            🎉
          </span>
          <div>
            <h4 className="text-base font-bold text-foreground">Challenge Solved!</h4>
            <p className="text-xs text-muted-foreground">Points awarded and your daily streak is safe.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-500 px-3.5 py-1.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105">
            +{pointsAwarded} pts
          </span>
        </div>
      </div>
    );
  }

  if (status === 'incorrect') {
    return (
      <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-500 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex items-center gap-2">
          <span>❌</span>
          <span className="font-medium">Incorrect solution. Try again!</span>
        </div>
        <span className="text-xs font-semibold">
          {remainingAttempts} {remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4 text-center text-sm text-muted-foreground animate-in fade-in duration-200">
      🔒 No attempts remaining for today's challenge. Come back tomorrow!
    </div>
  );
};


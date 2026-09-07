import { useState } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { ChallengeFeedback } from './ChallengeFeedback';
import type { DailyChallengeData, Difficulty } from '../../types/gdg';
import { submitChallengeAnswer } from '../../services/api';

const sampleChallenge: DailyChallengeData = {
  id: 'daily-001',
  title: 'Git Push Remote Commits',
  category: 'Git & GitHub',
  difficulty: 'Easy',
  type: 'coding', // Toggle between 'mcq' and 'coding'
  description: 'What is the command used to push your local commits from your local repository to a remote repository on GitHub?',
  points: 10,
  pointsSchedule: [10, 8, 6, 4, 2],
  hint: 'Think of the keyword you use to upload changes: `git push <remote> <branch>` or just `git push`.',
  options: [
    { id: 'opt_1', text: 'git pull origin main' },
    { id: 'opt_2', text: 'git push' },
    { id: 'opt_3', text: 'git commit -m "feat"' },
    { id: 'opt_4', text: 'git checkout -b branch' },
  ],
  starterCode: '// Type your command or code here\n',
};

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Hard: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

export default function Challenge() {
  const challenge = sampleChallenge;

  // Read saved completion state from storage
  const isAlreadySolved = localStorage.getItem(`gdg_solved_${challenge.id}`) === 'true';

  const [remainingAttempts, setRemainingAttempts] = useState(() => {
    const saved = localStorage.getItem(`gdg_attempts_${challenge.id}`);
    return saved !== null ? Number(saved) : 5;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState(challenge.starterCode ?? '');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect' | 'exhausted'>(() => {
    if (isAlreadySolved) return 'correct';
    const savedAttempts = localStorage.getItem(`gdg_attempts_${challenge.id}`);
    if (savedAttempts !== null && Number(savedAttempts) <= 0) return 'exhausted';
    return 'idle';
  });

  const [submitting, setSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(() => {
    return Number(localStorage.getItem(`gdg_points_${challenge.id}`)) || 10;
  });

  // Calculate current potential points based on attempts used
  const attemptIndex = Math.min(Math.max(0, 5 - remainingAttempts), challenge.pointsSchedule.length - 1);
  const currentPotentialPoints = challenge.pointsSchedule[attemptIndex] ?? 2;
  const currentAttemptNumber = Math.min(Math.max(1, 5 - remainingAttempts + 1), 5);

  const handleSubmit = async () => {
    if (!challenge || remainingAttempts <= 0 || status === 'correct' || submitting) return;

    const answer = challenge.type === 'mcq' ? (selectedOptionId ?? '') : codeInput.trim();
    if (!answer) return;

    setSubmitting(true);

    try {
      const result = await submitChallengeAnswer({
        challengeId: challenge.id,
        answer,
      });

      if (result.correct) {
        setStatus('correct');
        setPointsEarned(result.pointsAwarded);
        localStorage.setItem(`gdg_solved_${challenge.id}`, 'true');
        localStorage.setItem(`gdg_points_${challenge.id}`, String(result.pointsAwarded));
      } else {
        const nextRemaining = result.remainingAttempts;
        setRemainingAttempts(nextRemaining);
        localStorage.setItem(`gdg_attempts_${challenge.id}`, String(nextRemaining));
        setStatus(nextRemaining <= 0 ? 'exhausted' : 'incorrect');
      }
    } catch {
      // Fallback local evaluation and storage sync
      const isFallbackCorrect =
        challenge.type === 'mcq' ? selectedOptionId === 'opt_2' : codeInput.includes('git push');

      if (isFallbackCorrect) {
        setStatus('correct');
        setPointsEarned(currentPotentialPoints);

        localStorage.setItem(`gdg_solved_${challenge.id}`, 'true');
        localStorage.setItem(`gdg_points_${challenge.id}`, String(currentPotentialPoints));

        const saved = localStorage.getItem('gdg_mock_profile');
        const profile = saved ? JSON.parse(saved) : { points: 2480, solvedCount: 87, trends: { points: [2480] } };
        profile.points += currentPotentialPoints;
        profile.solvedCount += 1;
        if (profile.trends?.points?.length) {
          profile.trends.points[profile.trends.points.length - 1] += currentPotentialPoints;
        }
        localStorage.setItem('gdg_mock_profile', JSON.stringify(profile));
      } else {
        const nextRemaining = remainingAttempts - 1;
        setRemainingAttempts(nextRemaining);
        localStorage.setItem(`gdg_attempts_${challenge.id}`, String(nextRemaining));
        setStatus(nextRemaining <= 0 ? 'exhausted' : 'incorrect');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isFormLocked = status === 'correct' || status === 'exhausted' || remainingAttempts === 0;
  const canSubmit =
    !isFormLocked &&
    !submitting &&
    (challenge.type === 'mcq' ? Boolean(selectedOptionId) : codeInput.trim().length > 0);

const handleResetForTesting = () => {
    // Clear challenge page storage
    localStorage.removeItem(`gdg_solved_${challenge.id}`);
    localStorage.removeItem(`gdg_attempts_${challenge.id}`);
    localStorage.removeItem(`gdg_points_${challenge.id}`);

    // Also clear the api service storage key
    localStorage.removeItem('gdg_mock_attempts');

    setRemainingAttempts(5);
    setSelectedOptionId(null);
    setCodeInput(challenge.starterCode ?? '');
    setStatus('idle');
    setShowHint(false);
    setPointsEarned(0);
  };

  // Condition: Show hint unlock only after at least 1 failed attempt
  const hasAttemptedWrong = remainingAttempts < 5;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-8">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Daily Challenge</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete today's problem to earn points, preserve your streak, and climb the leaderboard.
        </p>
      </div>

      {/* Challenge Metadata Card */}
      <Card className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              {challenge.category}
            </span>
            <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${difficultyColors[challenge.difficulty]}`}>
              {challenge.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="rounded-md border border-border bg-background px-3 py-1.5 text-muted-foreground">
              Attempt: <strong className="text-foreground">{currentAttemptNumber}/5</strong>
            </span>
            <span className="rounded-md bg-primary/10 border border-primary/20 px-3 py-1.5 text-primary">
              +{currentPotentialPoints} pts
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground">{challenge.title}</h2>
      </Card>

      {/* Success / Error / Exhausted Feedback */}
      <ChallengeFeedback
        status={status}
        pointsAwarded={pointsEarned}
        remainingAttempts={remainingAttempts}
      />

      {/* Question & Answer Workspace Card */}
      <Card className="flex flex-col gap-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Question</h3>
          <p className="mt-2 text-base text-foreground leading-relaxed">{challenge.description}</p>
        </div>

        {challenge.type === 'mcq' ? (
          <div className="flex flex-col gap-3">
            {challenge.options?.map((opt, i) => {
              const isSelected = selectedOptionId === opt.id;
              const letter = String.fromCharCode(65 + i);

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isFormLocked}
                  onClick={() => {
                    setSelectedOptionId(opt.id);
                    if (status === 'incorrect') setStatus('idle');
                  }}
                  className={`group flex items-center gap-4 rounded-lg border p-4 text-left font-mono text-sm transition ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary shadow-sm'
                      : 'border-border bg-background text-foreground hover:bg-muted/40'
                  } ${isFormLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-bold transition ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-inner">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 inline-block" />
                <span className="ml-2 font-semibold text-foreground">terminal.sh</span>
              </div>
              <span>Bash / Shell</span>
            </div>

            <textarea
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value);
                if (status === 'incorrect') setStatus('idle');
              }}
              disabled={isFormLocked}
              rows={6}
              spellCheck={false}
              placeholder="// Type your command or code here..."
              className="w-full resize-y bg-background p-4 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        )}

        {/* Hint Section (Unlocks after a wrong attempt) */}
        {hasAttemptedWrong && challenge.hint && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold text-amber-500">
                💡 Need a hint?
              </span>
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>

            {showHint && (
              <p className="mt-2.5 text-xs text-foreground/80 leading-relaxed border-t border-amber-500/10 pt-2 animate-in fade-in">
                {challenge.hint}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleResetForTesting}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition"
          >
            ↻ Reset (Dev Mode)
          </button>

          <Button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="px-6 py-2.5"
          >
            {submitting ? 'Submitting...' : status === 'correct' ? 'Solved' : 'Submit Answer'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
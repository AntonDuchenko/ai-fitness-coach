"use client";

interface RestTimerBarProps {
  restRemaining: number;
  restSeconds: number;
  onSkip: () => void;
}

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const CIRCLE_R = 14;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

export function RestTimerBar({
  restRemaining,
  restSeconds,
  onSkip,
}: RestTimerBarProps) {
  if (restRemaining <= 0) return null;

  const progress = restRemaining / restSeconds;
  const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex items-center justify-between bg-m3-secondary-container px-6 py-3 text-m3-on-secondary-container shadow-xl">
      <div className="flex items-center gap-3">
        {/* Circular timer */}
        <div className="relative size-8">
          <svg className="size-full -rotate-90" viewBox="0 0 32 32">
            <circle
              className="opacity-20"
              cx="16"
              cy="16"
              r={CIRCLE_R}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              cx="16"
              cy="16"
              r={CIRCLE_R}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">
            {restRemaining}
          </span>
        </div>
        <span className="text-sm font-bold uppercase tracking-tight">
          Resting — Next Set: {formatClock(restRemaining)}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="rounded-lg bg-m3-on-secondary-container/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-m3-on-secondary-container/20"
          aria-label="Add 15 seconds"
        >
          +15s
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-lg bg-m3-on-secondary-container px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-m3-secondary-container"
          aria-label="Skip rest"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

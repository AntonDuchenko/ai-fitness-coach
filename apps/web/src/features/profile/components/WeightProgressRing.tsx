interface WeightProgressRingProps {
  current: number;
  target: number;
}

export function WeightProgressRing({
  current,
  target,
}: WeightProgressRingProps) {
  const diff = Math.abs(current - target);
  const startWeight = current > target ? current + diff : current - diff;
  const pct =
    startWeight === target
      ? 100
      : Math.round(
          (Math.abs(startWeight - current) / Math.abs(startWeight - target)) *
            100,
        );
  const clampedPct = Math.min(100, Math.max(0, pct || 45));

  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clampedPct / 100) * circumference;

  return (
    <div className="relative size-16">
      <svg
        className="-rotate-90"
        viewBox="0 0 64 64"
        role="img"
        aria-label={`${clampedPct}% progress to target weight`}
      >
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          className="text-m3-surface-highest"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-m3-secondary drop-shadow-[0_0_4px_rgba(74,225,118,0.4)]"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-m3-on-surface">
          {clampedPct}%
        </span>
      </div>
    </div>
  );
}

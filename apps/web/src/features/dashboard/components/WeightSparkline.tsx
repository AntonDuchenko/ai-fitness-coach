"use client";

interface WeightSparklineProps {
  weights: number[];
}

export function WeightSparkline({ weights }: WeightSparklineProps) {
  if (weights.length === 0) return null;

  const maxW = Math.max(...weights, 1);
  const minW = Math.min(...weights, maxW - 1);
  const range = maxW - minW || 1;

  const path = weights
    .map((w, i) => {
      const x = (i / Math.max(weights.length - 1, 1)) * 200;
      const y = 55 - ((w - minW) / range) * 50;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const lastY = 55 - ((weights[weights.length - 1] - minW) / range) * 50;

  return (
    <div className="mb-10 h-16 w-full overflow-hidden">
      <svg className="h-full w-full" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path
          d={path}
          fill="none"
          stroke="var(--m3-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="200" cy={lastY} r="4" fill="var(--m3-primary)" />
      </svg>
    </div>
  );
}

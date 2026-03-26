interface MacroRingProps {
  label: string;
  current: number;
  target: number;
  colorClass: string;
  size?: "sm" | "lg";
}

export function MacroRing({
  label,
  current,
  target,
  colorClass,
  size = "sm",
}: MacroRingProps) {
  const pct = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
  const dashArray = `${pct}, 100`;
  const dim = size === "lg" ? "w-32 h-32" : "w-[140px] h-[140px]";
  const textSize = size === "lg" ? "text-2xl" : "text-3xl";

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${dim} mb-4`}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle
            className="stroke-muted/20"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2.5"
          />
          <circle
            className={colorClass}
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={dashArray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textSize} font-heading font-black text-foreground`}>
            {pct}%
          </span>
        </div>
      </div>
      <p className="mb-1 text-[13px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-bold text-foreground">
        {Math.round(current)}
        {label === "Calories" ? "" : "g"}{" "}
        <span className="font-medium text-muted-foreground">
          / {Math.round(target)}
          {label === "Calories" ? "" : "g"}
        </span>
      </p>
    </div>
  );
}

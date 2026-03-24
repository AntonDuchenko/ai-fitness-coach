/** Must match `PERIOD_ENUM` in `apps/api` progress controller */
export const PROGRESS_PERIOD_VALUES = [
  "1week",
  "1month",
  "3months",
  "6months",
  "1year",
  "all",
] as const;

export type ProgressPeriod = (typeof PROGRESS_PERIOD_VALUES)[number];

export const PROGRESS_PERIOD_LABELS: Record<ProgressPeriod, string> = {
  "1week": "Last week",
  "1month": "Last month",
  "3months": "Last 3 months",
  "6months": "Last 6 months",
  "1year": "Last year",
  all: "All time",
};

export const PERIOD_DAYS: Record<Exclude<ProgressPeriod, "all">, number> = {
  "1week": 7,
  "1month": 30,
  "3months": 90,
  "6months": 180,
  "1year": 365,
};

export function getPeriodStartDate(period: ProgressPeriod): Date | null {
  if (period === "all") return null;
  const days = PERIOD_DAYS[period];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d;
}

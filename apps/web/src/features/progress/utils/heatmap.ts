import type { DailyConsistency } from "../types";

function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseApiDateToLocalKey(iso: string): string {
  const d = new Date(iso);
  return localDayKey(d);
}

export function buildConsistencyCountMap(
  dailyData: DailyConsistency[],
): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of dailyData) {
    const key = parseApiDateToLocalKey(row.date);
    map.set(key, row.workoutCount);
  }
  return map;
}

/** 12 columns × 7 rows = 84 days, oldest top-left column-wise. */
export function buildHeatmapGrid(dailyData: DailyConsistency[]): {
  key: string;
  count: number;
}[][] {
  const map = buildConsistencyCountMap(dailyData);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const flat: { key: string; count: number }[] = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = localDayKey(d);
    flat.push({ key, count: map.get(key) ?? 0 });
  }

  const cols = 12;
  const rows = 7;
  const grid: { key: string; count: number }[][] = [];
  for (let c = 0; c < cols; c++) {
    const column: { key: string; count: number }[] = [];
    for (let r = 0; r < rows; r++) {
      const idx = c * rows + r;
      column.push(flat[idx] ?? { key: "", count: 0 });
    }
    grid.push(column);
  }
  return grid;
}

export function heatmapIntensity(count: number): 0 | 1 | 2 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  return 2;
}

"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { ProgressPeriod } from "../constants";
import { weightHistoryKey } from "../lib/query-keys";
import type { WeightHistoryResponse } from "../types";

/** @deprecated Use `weightHistoryKey(period)` for invalidation */
export const WEIGHT_HISTORY_KEY = ["progress", "weight"] as const;

export function useWeightHistoryQuery(period: ProgressPeriod = "3months") {
  return useQuery({
    queryKey: weightHistoryKey(period),
    queryFn: () =>
      apiClient<WeightHistoryResponse>(`/progress/weight?period=${period}`),
  });
}

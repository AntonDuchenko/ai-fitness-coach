"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { WeightHistoryResponse } from "../types";

export const WEIGHT_HISTORY_KEY = ["progress", "weight"] as const;

export function useWeightHistoryQuery(period = "3months") {
  return useQuery({
    queryKey: [...WEIGHT_HISTORY_KEY, period],
    queryFn: () =>
      apiClient<WeightHistoryResponse>(`/progress/weight?period=${period}`),
  });
}

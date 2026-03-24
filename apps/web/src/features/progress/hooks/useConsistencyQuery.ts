"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { ProgressPeriod } from "../constants";
import { consistencyKey } from "../lib/query-keys";
import type { ConsistencyResponse } from "../types";

export function useConsistencyQuery(period: ProgressPeriod) {
  return useQuery({
    queryKey: consistencyKey(period),
    queryFn: () =>
      apiClient<ConsistencyResponse>(`/progress/consistency?period=${period}`),
  });
}

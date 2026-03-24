"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { PROGRESS_SUMMARY_KEY } from "../lib/query-keys";
import type { ProgressSummaryResponse } from "../types";

export function useProgressSummaryQuery() {
  return useQuery({
    queryKey: PROGRESS_SUMMARY_KEY,
    queryFn: () => apiClient<ProgressSummaryResponse>("/progress/summary"),
  });
}

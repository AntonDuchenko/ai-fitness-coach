"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { ProgressPeriod } from "../constants";
import { strengthProgressKey } from "../lib/query-keys";
import type { StrengthProgressResponse } from "../types";

export function useStrengthProgressQuery(
  exercise: string,
  period: ProgressPeriod,
  enabled = true,
) {
  const encoded = encodeURIComponent(exercise.trim());
  return useQuery({
    queryKey: strengthProgressKey(exercise, period),
    queryFn: () =>
      apiClient<StrengthProgressResponse>(
        `/progress/strength/${encoded}?period=${period}`,
      ),
    enabled: enabled && exercise.trim().length > 0,
  });
}

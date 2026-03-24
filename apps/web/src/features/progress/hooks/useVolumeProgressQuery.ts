"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { ProgressPeriod } from "../constants";
import { volumeProgressKey } from "../lib/query-keys";
import type { VolumeProgressResponse } from "../types";

export function useVolumeProgressQuery(period: ProgressPeriod) {
  return useQuery({
    queryKey: volumeProgressKey(period),
    queryFn: () =>
      apiClient<VolumeProgressResponse>(`/progress/volume?period=${period}`),
  });
}

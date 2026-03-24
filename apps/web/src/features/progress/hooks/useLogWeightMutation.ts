"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROGRESS_SUMMARY_KEY } from "../lib/query-keys";
import type { CreateWeightLogPayload, WeightLogResponse } from "../types";
import { WEIGHT_HISTORY_KEY } from "./useWeightHistoryQuery";

export function useLogWeightMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWeightLogPayload) =>
      apiClient<WeightLogResponse>("/progress/weight", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WEIGHT_HISTORY_KEY });
      void queryClient.invalidateQueries({ queryKey: PROGRESS_SUMMARY_KEY });
      void queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

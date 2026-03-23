"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    },
  });
}

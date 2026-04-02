"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileData } from "../types";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ProfileData>) =>
      apiClient<ProfileData>("/users/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["users", "profile"], updated);
    },
  });
}

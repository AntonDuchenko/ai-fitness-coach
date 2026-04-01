"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Conversation } from "../types";

const CONVERSATIONS_KEY = ["chat", "conversations"] as const;

export function useConversations() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: CONVERSATIONS_KEY,
    queryFn: () => apiClient<Conversation[]>("/chat/conversations"),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      apiClient<Conversation>("/chat/conversations", { method: "POST" }),
    onSuccess: (data) => {
      queryClient.setQueryData<Conversation[]>(
        [...CONVERSATIONS_KEY],
        (old) => [data, ...(old ?? [])],
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<void>(`/chat/conversations/${id}`, { method: "DELETE" }),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Conversation[]>(
        [...CONVERSATIONS_KEY],
        (old) => (old ?? []).filter((c) => c.id !== deletedId),
      );
    },
  });

  const addConversationToCache = useCallback(
    (conversation: Conversation) => {
      queryClient.setQueryData<Conversation[]>(
        [...CONVERSATIONS_KEY],
        (old) => {
          const exists = old?.some((c) => c.id === conversation.id);
          if (exists) return old;
          return [conversation, ...(old ?? [])];
        },
      );
    },
    [queryClient],
  );

  return {
    conversations: query.data ?? [],
    isLoading: query.isLoading,
    createConversation: createMutation.mutateAsync,
    deleteConversation: deleteMutation.mutate,
    addConversationToCache,
  };
}

"use client";

import type { MutableRefObject } from "react";
import { useEffect } from "react";
import type { Conversation, SendMessageResponse } from "../types";

export function useActiveConversation(
  conversations: Conversation[],
  activeId: string | null,
  setActiveId: (id: string | null) => void,
  sendMutationData: SendMessageResponse | undefined,
  addConversationToCache: (c: Conversation) => void,
  isNewChatMode: MutableRefObject<boolean>,
) {
  useEffect(() => {
    if (!activeId && !isNewChatMode.current && conversations.length > 0) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId, setActiveId, isNewChatMode]);

  useEffect(() => {
    if (sendMutationData && !activeId) {
      const newId = sendMutationData.conversationId;
      setActiveId(newId);
      const content = sendMutationData.userMessage.content;
      const title =
        content.length > 50 ? `${content.slice(0, 47)}...` : content;
      addConversationToCache({
        id: newId,
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [sendMutationData, activeId, setActiveId, addConversationToCache]);
}

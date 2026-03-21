"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { ChatScreen } from "@/features/chat";

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatScreen />
    </ProtectedRoute>
  );
}

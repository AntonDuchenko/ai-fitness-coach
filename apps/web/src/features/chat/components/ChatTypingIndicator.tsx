"use client";

import { Bot } from "lucide-react";

export function ChatTypingIndicator() {
  return (
    <div className="flex max-w-3xl gap-3 sm:gap-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-m3-primary-container/20">
        <Bot className="size-4 text-m3-primary" aria-hidden />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-white/5 bg-m3-surface-high px-5 py-4 shadow-xl">
        <span className="size-2 animate-bounce rounded-full bg-m3-outline [animation-delay:0ms]" />
        <span className="size-2 animate-bounce rounded-full bg-m3-outline [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-m3-outline [animation-delay:300ms]" />
      </div>
    </div>
  );
}

"use client";

export function ChatTypingIndicator() {
  return (
    <div className="flex max-w-full gap-2 sm:gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground sm:size-9 sm:text-[11px]">
        AI
      </div>
      <div className="flex items-center gap-1.5 rounded-xl bg-card px-4 py-3">
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
      </div>
    </div>
  );
}

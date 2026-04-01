"use client";

import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { useCallback, useState } from "react";

interface ChatComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  isSending?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  onSend,
  disabled,
  isSending,
  placeholder = "Message your AI Coach...",
}: ChatComposerProps) {
  const [value, setValue] = useState("");

  const submit = useCallback(() => {
    if (disabled || isSending) return;
    const t = value.trim();
    if (!t) return;
    onSend(t);
    setValue("");
  }, [disabled, isSending, onSend, value]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled && !isSending;

  return (
    <footer className="relative shrink-0 bg-m3-surface-lowest/50 p-4 backdrop-blur-md sm:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl border border-white/5 bg-m3-surface-high shadow-2xl transition-all focus-within:border-m3-primary/30 focus-within:ring-2 focus-within:ring-m3-primary/20">
          <div className="flex items-end gap-2 p-3">
            <button
              type="button"
              className="p-2 text-m3-outline transition-colors hover:text-white"
              aria-label="Attach file"
            >
              <Paperclip className="size-5" />
            </button>

            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              disabled={disabled || isSending}
              rows={1}
              className="max-h-32 min-h-[44px] flex-1 resize-none border-none bg-transparent py-2 font-medium text-m3-on-surface placeholder:text-m3-outline/60 focus-visible:ring-0"
            />

            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-xl bg-m3-primary-container text-m3-on-primary-container transition-transform active:scale-90 disabled:opacity-50"
              onClick={submit}
              disabled={!canSend}
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-m3-outline/60">
          ForgeFit AI can make mistakes. Verify critical nutrition info.
        </p>
      </div>
    </footer>
  );
}

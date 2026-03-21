"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
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
  placeholder = "Ask your AI trainer anything...",
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
    <div className="flex w-full items-end gap-3 bg-background px-4 py-4 sm:px-6">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled || isSending}
        rows={1}
        className="min-h-12 max-h-24 resize-none rounded-xl border-border bg-card py-3 text-sm shadow-none focus-visible:ring-1"
      />
      <Button
        type="button"
        size="icon"
        className="size-12 shrink-0 rounded-xl"
        onClick={submit}
        disabled={!canSend}
        aria-label="Send message"
      >
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}

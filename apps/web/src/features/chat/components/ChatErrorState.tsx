import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ChatErrorStateProps {
  onRetry: () => void;
}

export function ChatErrorState({ onRetry }: ChatErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="flex size-12 items-center justify-center rounded-xl bg-m3-error-container/20">
        <AlertTriangle className="size-6 text-m3-error" aria-hidden />
      </div>
      <p className="text-sm text-m3-outline">
        Couldn&apos;t load messages.
      </p>
      <Button
        type="button"
        className="rounded-xl bg-m3-surface-high text-m3-on-surface hover:bg-m3-surface-highest"
        onClick={onRetry}
      >
        Try again
      </Button>
    </div>
  );
}

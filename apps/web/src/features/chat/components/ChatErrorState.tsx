import { Button } from "@/components/ui/button";

interface ChatErrorStateProps {
  onRetry: () => void;
}

export function ChatErrorState({ onRetry }: ChatErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p className="text-sm text-muted-foreground">
        Couldn&apos;t load messages.
      </p>
      <Button type="button" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

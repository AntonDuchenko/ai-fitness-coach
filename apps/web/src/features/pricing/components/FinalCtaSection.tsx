import { Button } from "@/components/ui/button";

interface FinalCtaSectionProps {
  onUpgrade: () => void;
  disabled?: boolean;
}

const avatarInitials = ["J", "S", "M", "A", "R"] as const;

export function FinalCtaSection({ onUpgrade, disabled }: FinalCtaSectionProps) {
  return (
    <section className="space-y-6 py-4 text-center">
      <div className="flex items-center justify-center gap-4">
        <div className="flex -space-x-2">
          {avatarInitials.map((letter) => (
            <div
              key={letter}
              className="flex size-12 items-center justify-center rounded-full border-2 border-background bg-primary text-sm font-bold text-primary-foreground"
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="h-10 w-px bg-muted-foreground/25" />
        <div className="text-left">
          <p className="font-heading text-lg font-bold text-foreground">
            50,000+ members
          </p>
          <p className="text-sm text-muted-foreground">
            already transforming their lives
          </p>
        </div>
      </div>
      <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Stop Guessing. Start Training.
      </h2>
      <p className="mx-auto max-w-lg text-muted-foreground">
        Join 50,000+ people who chose results over excuses.
      </p>
      <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
        <Button type="button" size="lg" onClick={onUpgrade} disabled={disabled}>
          Download Free
        </Button>
        <Button type="button" size="lg" variant="outline">
          See Pricing
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        No credit card required &nbsp;&bull;&nbsp; 7-day free trial &nbsp;&bull;&nbsp; Cancel anytime
      </p>
    </section>
  );
}

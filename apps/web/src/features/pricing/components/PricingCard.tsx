import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import type { PricingPlan } from "../types";

interface PricingCardProps {
  plan: PricingPlan;
  priceLabel: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
}

export function PricingCard({
  plan,
  priceLabel,
  ctaLabel,
  onCtaClick,
  ctaDisabled,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "h-full border-border bg-card/90",
        plan.highlighted &&
          "relative -mt-2 border-destructive/60 shadow-[0_0_40px_oklch(0.577_0.245_27/0.2)] lg:-mt-4",
      )}
    >
      <CardHeader className="gap-3">
        {plan.badge ? (
          <Badge className={cn(
            "w-fit",
            plan.highlighted
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}>
            {plan.badge}
          </Badge>
        ) : null}
        <CardTitle className="font-heading text-2xl">{plan.name}</CardTitle>
        <p className="font-heading text-4xl font-bold text-foreground">{priceLabel}</p>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={`${plan.id}-${feature}`} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
          {plan.excludedFeatures?.map((feature) => (
            <li key={`${plan.id}-ex-${feature}`} className="flex items-start gap-2 text-sm text-muted-foreground">
              <X className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto flex-col gap-2">
        <Button
          type="button"
          onClick={onCtaClick}
          disabled={ctaDisabled}
          variant={plan.highlighted ? "default" : "outline"}
          className="w-full"
        >
          {ctaLabel}
        </Button>
        {plan.highlighted && (
          <p className="text-xs text-muted-foreground">No credit card required</p>
        )}
      </CardFooter>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FreeUpgradeCardProps {
  actionPending: boolean;
  onUpgrade: () => void;
}

export function FreeUpgradeCard({
  actionPending,
  onUpgrade,
}: FreeUpgradeCardProps) {
  return (
    <Card className="border-border bg-card/60 py-0">
      <CardHeader className="px-5 py-4 sm:px-6">
        <CardTitle className="font-heading text-base">
          Free Plan Upgrade CTA
        </CardTitle>
        <CardDescription>Shown to users without Premium</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-5 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-6">
        <p className="text-sm text-muted-foreground">
          Upgrade to Premium for unlimited AI coaching, advanced analytics, and
          personalized plans.
        </p>
        <Button
          type="button"
          size="sm"
          disabled={actionPending}
          onClick={onUpgrade}
        >
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
}

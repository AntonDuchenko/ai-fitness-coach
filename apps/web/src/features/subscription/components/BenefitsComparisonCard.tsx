import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BenefitsComparisonCardProps {
  onViewPricing: () => void;
}

const COMPARISON_ROWS = [
  { feature: "Daily chat messages", free: "5", premium: "Unlimited" },
  { feature: "Workout plans", free: "Basic", premium: "Advanced" },
  { feature: "Nutrition", free: "Calorie-only", premium: "Full plans" },
  { feature: "Progress", free: "Basic charts", premium: "Advanced analytics" },
];

export function BenefitsComparisonCard({
  onViewPricing,
}: BenefitsComparisonCardProps) {
  return (
    <Card className="border-border bg-card/60 py-0">
      <CardHeader className="px-5 py-4 sm:px-6">
        <CardTitle className="font-heading text-base">
          Benefits Comparison
        </CardTitle>
        <CardDescription>Free vs Premium features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-0 pb-4 sm:pb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="py-3 pl-5 text-left font-semibold text-foreground sm:pl-6">
                  Feature
                </th>
                <th className="w-36 py-3 text-center font-semibold text-foreground">
                  Free
                </th>
                <th className="w-36 py-3 pr-5 text-center font-semibold text-primary sm:pr-6">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-t border-border">
                  <td className="border-t border-border py-3 pl-5 text-left text-muted-foreground sm:pl-6">
                    {row.feature}
                  </td>
                  <td className="border-t border-border py-3 text-center text-muted-foreground">
                    {row.free}
                  </td>
                  <td className="border-t border-border py-3 pr-5 text-center font-semibold text-success sm:pr-6">
                    {row.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end px-5 sm:px-6">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onViewPricing}
          >
            View Full Pricing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

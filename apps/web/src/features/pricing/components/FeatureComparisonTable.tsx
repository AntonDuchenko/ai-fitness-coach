import { Badge } from "@/components/ui/badge";

const rows = [
  { feature: "AI Chat Messages / day", free: "5", premium: "Unlimited" },
  { feature: "Workout Plans", free: "Basic", premium: "Advanced + Adaptive" },
  { feature: "Nutrition", free: "Calorie only", premium: "Full plans + recipes" },
  { feature: "Progress Insights", free: "Basic", premium: "Advanced analytics" },
];

export function FeatureComparisonTable() {
  return (
    <section className="-mx-4 space-y-8 bg-[color:oklch(0.208_0.042_265)] px-4 py-16 text-center sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <Badge className="bg-primary/15 text-primary">FEATURE COMPARISON</Badge>
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
          Choose the plan that scales with your goals
        </h2>
      </div>
      <div className="mx-auto max-w-4xl overflow-x-auto">
        <table className="w-full min-w-[540px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-white/10 bg-[color:oklch(0.145_0.03_265)] text-sm">
          <thead>
            <tr className="bg-[color:oklch(0.21_0.04_265)]">
              <th className="py-4 pl-6 text-left font-semibold text-white/90">
                Feature
              </th>
              <th className="w-44 py-4 text-center font-semibold text-white/90">
                Free
              </th>
              <th className="w-44 py-4 pr-6 text-center font-semibold text-destructive/70">
                Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-t border-white/10">
                <td className="border-t border-white/10 py-4 pl-6 text-left text-white/80">
                  {row.feature}
                </td>
                <td className="border-t border-white/10 py-4 text-center text-white/60">
                  {row.free}
                </td>
                <td className="border-t border-white/10 py-4 pr-6 text-center font-semibold text-success">
                  {row.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

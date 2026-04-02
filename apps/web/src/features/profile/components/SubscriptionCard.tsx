import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink } from "lucide-react";

interface SubscriptionCardProps {
  status: string;
  nextBillingDate: string;
  priceLabel: string | null;
  onManage: () => Promise<
    { ok: true; redirectUrl: string } | { ok: false; reason: string }
  >;
}

export function SubscriptionCard({
  status,
  nextBillingDate,
  priceLabel,
  onManage,
}: SubscriptionCardProps) {
  const handleClick = async () => {
    const result = await onManage();
    if (result.ok) {
      window.location.href = result.redirectUrl;
    }
  };

  const isActive = status === "active";

  return (
    <section className="glass-card flex flex-col gap-6 rounded-[24px] p-6 lg:flex-row lg:items-center lg:justify-between lg:rounded-[1.5rem] lg:bg-m3-surface-high lg:p-8">
      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="font-heading font-semibold text-m3-primary">
              Subscription
            </h3>
            <p className="mt-1 text-[11px] text-m3-outline">
              Next billing: {nextBillingDate}
            </p>
          </div>
          {priceLabel && (
            <div className="text-right">
              <p className="font-heading text-lg font-bold">{priceLabel}</p>
              {isActive && (
                <p className="text-[10px] font-bold uppercase text-m3-secondary">
                  Active
                </p>
              )}
            </div>
          )}
        </div>
        <Button
          variant="secondary"
          className="w-full rounded-xl border border-m3-outline-variant/20 bg-m3-surface-high text-sm font-semibold"
          onClick={handleClick}
        >
          <CreditCard className="mr-2 size-4" aria-hidden />
          Manage Subscription
        </Button>
      </div>

      {/* Desktop layout */}
      <div className="hidden items-center gap-5 lg:flex">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-m3-secondary-container/20">
          <CreditCard className="size-7 text-m3-secondary" aria-hidden />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold">Subscription</h3>
          <p className="text-sm text-m3-outline">
            Next billing on {nextBillingDate}
            {priceLabel && (
              <>
                {" "}
                &bull;{" "}
                <span className="font-bold text-m3-on-surface">
                  {priceLabel}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
      <Button
        variant="secondary"
        className="hidden items-center gap-2 rounded-xl bg-m3-surface-highest px-6 py-3 text-sm font-bold hover:bg-m3-surface-highest/80 lg:flex"
        onClick={handleClick}
      >
        Manage Subscription
        <ExternalLink className="size-4" aria-hidden />
      </Button>
    </section>
  );
}

export type BillingPeriod = "monthly" | "annual";

export interface PricingPrice {
  id: string;
  interval: string;
  amountCents: number;
  currency: string;
}

export interface PricingProductsResponse {
  monthly: PricingPrice | null;
  annual: PricingPrice | null;
}

export interface PricingPlan {
  id: "free" | "premium" | "enterprise";
  name: string;
  description: string;
  badge?: string;
  monthlyLabel: string;
  annualLabel?: string;
  features: string[];
  excludedFeatures?: string[];
  highlighted?: boolean;
}

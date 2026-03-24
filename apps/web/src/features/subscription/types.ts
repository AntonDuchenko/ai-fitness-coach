export type SubscriptionStatus = "active" | "canceled" | "past_due" | "none";

export interface SubscriptionResponse {
  isPremium: boolean;
  subscriptionStatus: string | null;
  subscriptionId: string | null;
  subscriptionEndsAt: string | null;
}

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

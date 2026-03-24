import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SubscriptionResponseDto {
  @ApiProperty({
    description: "Whether the user has an active premium subscription",
    example: true,
  })
  isPremium!: boolean;

  @ApiPropertyOptional({
    description: "Subscription status",
    example: "active",
  })
  subscriptionStatus!: string | null;

  @ApiPropertyOptional({
    description: "Stripe subscription ID",
    example: "sub_abc123",
  })
  subscriptionId!: string | null;

  @ApiPropertyOptional({
    description: "When the subscription ends (if canceled)",
    example: "2026-04-24T00:00:00.000Z",
  })
  subscriptionEndsAt!: Date | null;

  constructor(partial: Partial<SubscriptionResponseDto>) {
    Object.assign(this, partial);
  }
}

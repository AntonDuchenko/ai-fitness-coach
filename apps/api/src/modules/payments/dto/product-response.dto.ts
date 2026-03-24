import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PriceDto {
  @ApiProperty({ description: "Stripe price ID", example: "price_1abc" })
  id!: string;

  @ApiProperty({ description: "Billing interval", example: "month" })
  interval!: string;

  @ApiProperty({ description: "Price amount in cents", example: 2000 })
  amountCents!: number;

  @ApiProperty({ description: "Currency code", example: "usd" })
  currency!: string;

  constructor(partial: Partial<PriceDto>) {
    Object.assign(this, partial);
  }
}

export class ProductResponseDto {
  @ApiProperty({
    description: "Monthly price details",
    type: PriceDto,
    nullable: true,
  })
  monthly!: PriceDto | null;

  @ApiPropertyOptional({
    description: "Annual price details",
    type: PriceDto,
    nullable: true,
  })
  annual!: PriceDto | null;

  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}

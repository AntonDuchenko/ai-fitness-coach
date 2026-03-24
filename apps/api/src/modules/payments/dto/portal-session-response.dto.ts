import { ApiProperty } from "@nestjs/swagger";

export class PortalSessionResponseDto {
  @ApiProperty({
    description: "URL to redirect user to Stripe billing portal",
    example: "https://billing.stripe.com/p/session/test_abc123",
  })
  url!: string;

  constructor(partial: Partial<PortalSessionResponseDto>) {
    Object.assign(this, partial);
  }
}

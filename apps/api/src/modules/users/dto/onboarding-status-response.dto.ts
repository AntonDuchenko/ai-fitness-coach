import { ApiProperty } from "@nestjs/swagger";

export class OnboardingStatusResponseDto {
  @ApiProperty({
    enum: ["pending", "processing", "complete", "failed"],
    example: "processing",
  })
  status: "pending" | "processing" | "complete" | "failed";

  @ApiProperty({ example: 60, minimum: 0, maximum: 100 })
  progress: number;

  constructor(status: OnboardingStatusResponseDto["status"], progress: number) {
    this.status = status;
    this.progress = progress;
  }
}

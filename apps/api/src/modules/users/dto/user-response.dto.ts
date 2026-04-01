import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiPropertyOptional()
  name!: string | null;

  @Expose()
  @ApiProperty()
  isPremium!: boolean;

  @Expose()
  @ApiProperty()
  onboardingCompleted!: boolean;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  constructor(partial: Partial<UserResponseDto> & { profile?: { onboardingCompleted: boolean } | null }) {
    Object.assign(this, partial);
    if (partial.profile) {
      this.onboardingCompleted = partial.profile.onboardingCompleted;
    } else if (this.onboardingCompleted === undefined) {
      this.onboardingCompleted = false;
    }
  }
}

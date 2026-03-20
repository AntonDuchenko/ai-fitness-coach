import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dto/user-response.dto";

@Exclude()
export class AuthResponseDto {
  @Expose()
  @ApiProperty()
  accessToken!: string;

  @Expose()
  @ApiProperty({ type: UserResponseDto })
  @Type(() => UserResponseDto)
  user!: UserResponseDto;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}

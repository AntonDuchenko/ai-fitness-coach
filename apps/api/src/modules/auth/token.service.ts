import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.refreshSecret = this.configService.get<string>(
      "jwt.refreshSecret",
      "default-refresh-secret-change-me",
    );
    this.refreshExpiresIn = this.configService.get<string>(
      "jwt.refreshExpiresIn",
      "30d",
    );
  }

  generateAccessToken(userId: string, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }

  generateRefreshToken(userId: string, email: string): string {
    return this.jwtService.sign(
      { sub: userId, email, type: "refresh" },
      {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresIn as unknown as number,
      },
    );
  }

  verifyRefreshToken(token: string): { sub: string; email: string } {
    const payload = this.jwtService.verify(token, {
      secret: this.refreshSecret,
    });
    if (payload.type !== "refresh") {
      throw new Error("Invalid token type");
    }
    return { sub: payload.sub, email: payload.email };
  }

  generateTokenPair(
    userId: string,
    email: string,
  ): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.generateAccessToken(userId, email),
      refreshToken: this.generateRefreshToken(userId, email),
    };
  }
}

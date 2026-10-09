import type { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "./token.service";

function makeConfig(values: Record<string, string | undefined>) {
  return {
    get: (key: string, fallback?: string) => values[key] ?? fallback,
  } as unknown as ConfigService;
}

const jwt = new JwtService({
  secret: "access-secret",
  signOptions: { expiresIn: "15m" },
});

describe("TokenService", () => {
  const service = new TokenService(
    jwt,
    makeConfig({ "jwt.refreshSecret": "refresh-secret" }),
  );

  it("refuses to start without a refresh secret", () => {
    expect(() => new TokenService(jwt, makeConfig({}))).toThrow(
      /JWT_REFRESH_SECRET/,
    );
  });

  it("round-trips a refresh token", () => {
    const { refreshToken } = service.generateTokenPair("u1", "a@b.c");
    expect(service.verifyRefreshToken(refreshToken)).toEqual({
      sub: "u1",
      email: "a@b.c",
    });
  });

  it("does not accept an access token as a refresh token", () => {
    const { accessToken } = service.generateTokenPair("u1", "a@b.c");
    expect(() => service.verifyRefreshToken(accessToken)).toThrow();
  });

  it("does not accept a refresh token signed with another secret", () => {
    const forged = new JwtService({
      secret: "default-refresh-secret-change-me",
    }).sign({ sub: "victim", email: "v@x.y", type: "refresh" });
    expect(() => service.verifyRefreshToken(forged)).toThrow();
  });
});

import { validate } from "./env.validation";

const base = {
  DATABASE_URL: "postgresql://u:p@localhost:5432/db",
  JWT_SECRET: "access-secret",
  JWT_REFRESH_SECRET: "refresh-secret",
  OPENAI_API_KEY: "sk-test",
};

describe("env validation", () => {
  it("accepts a minimal valid config and applies defaults", () => {
    const env = validate(base);
    expect(env.PORT).toBe(4000);
    expect(env.JWT_EXPIRES_IN).toBe("15m");
    expect(env.JWT_REFRESH_EXPIRES_IN).toBe("30d");
  });

  it("requires JWT_REFRESH_SECRET", () => {
    const { JWT_REFRESH_SECRET: _omit, ...rest } = base;
    expect(() => validate(rest)).toThrow(/JWT_REFRESH_SECRET/);
  });

  it("rejects a refresh secret equal to the access secret", () => {
    expect(() =>
      validate({ ...base, JWT_REFRESH_SECRET: base.JWT_SECRET }),
    ).toThrow(/must differ/);
  });

  it("requires OPENAI_API_KEY", () => {
    const { OPENAI_API_KEY: _omit, ...rest } = base;
    expect(() => validate(rest)).toThrow(/OPENAI_API_KEY/);
  });
});

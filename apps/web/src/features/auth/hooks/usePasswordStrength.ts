import { useMemo } from "react";
import type { PasswordStrengthResult } from "../types";

export function usePasswordStrength(password: string): PasswordStrengthResult {
  return useMemo(() => {
    const requirements = [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
      { label: "Contains a number", met: /\d/.test(password) },
      {
        label: "Contains special character",
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];

    const score = requirements.filter((r) => r.met).length;

    return { score, requirements };
  }, [password]);
}

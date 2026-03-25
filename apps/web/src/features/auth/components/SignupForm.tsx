"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type {
  AuthFormErrors,
  AuthFormFields,
  PasswordStrengthResult,
} from "../types";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { SocialButtons } from "./SocialButtons";

interface SignupFormProps {
  fields: AuthFormFields;
  errors: AuthFormErrors;
  isSubmitting: boolean;
  passwordStrength: PasswordStrengthResult;
  onUpdateField: (field: keyof AuthFormFields, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const inputClass = "h-10 rounded-[10px] bg-[#161618] border-[#1F1F23] px-3.5";

export function SignupForm({
  fields,
  errors,
  isSubmitting,
  passwordStrength,
  onUpdateField,
  onSubmit,
}: SignupFormProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <BrandLogo size={44} />
        <h1 className="font-heading text-[28px] font-bold text-foreground">
          Create an account
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Start your fitness journey today
        </p>
      </div>

      {errors.server && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.server}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={fields.name}
              onChange={(e) => onUpdateField("name", e.target.value)}
              aria-invalid={!!errors.name}
              autoComplete="name"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={fields.email}
              onChange={(e) => onUpdateField("email", e.target.value)}
              aria-invalid={!!errors.email}
              autoComplete="email"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signup-password">Password</Label>
            <PasswordInput
              id="signup-password"
              value={fields.password}
              onChange={(v) => onUpdateField("password", v)}
              error={errors.password}
              autoComplete="new-password"
              className={inputClass}
            />
          </div>

          {fields.password.length > 0 && (
            <PasswordStrength strength={passwordStrength} />
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <PasswordInput
              id="confirm-password"
              value={fields.confirmPassword}
              onChange={(v) => onUpdateField("confirmPassword", v)}
              error={errors.confirmPassword}
              autoComplete="new-password"
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={fields.agreedToTerms}
              onChange={(e) => onUpdateField("agreedToTerms", e.target.checked)}
              className="size-[18px] shrink-0 rounded border-border accent-primary"
              aria-invalid={!!errors.agreedToTerms}
            />
            <span className="leading-none text-xs text-muted-foreground">
              I agree to the{" "}
              <span className="font-medium text-primary">Terms of Service</span>{" "}
              and{" "}
              <span className="font-medium text-primary">Privacy Policy</span>
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="text-xs text-destructive">{errors.agreedToTerms}</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
          <SocialButtons />
        </div>
      </form>

      <div className="flex items-center justify-center gap-1">
        <span className="text-[13px] text-muted-foreground">
          Already have an account?
        </span>
        <Link
          href="/login"
          className="text-[13px] font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

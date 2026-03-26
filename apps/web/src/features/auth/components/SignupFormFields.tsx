"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, User } from "lucide-react";
import type { AuthFormErrors, AuthFormFields } from "../types";
import { PasswordInput } from "./PasswordInput";

interface SignupFormFieldsProps {
  fields: AuthFormFields;
  errors: AuthFormErrors;
  isSubmitting: boolean;
  onUpdateField: (field: keyof AuthFormFields, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupFormFields({
  fields,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit,
}: SignupFormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="ml-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Full Name
        </Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={fields.name}
            onChange={(e) => onUpdateField("name", e.target.value)}
            aria-invalid={!!errors.name}
            autoComplete="name"
            className="h-12 border-none bg-background dark:bg-background pl-10 rounded-xl"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email" className="ml-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            placeholder="name@company.com"
            value={fields.email}
            onChange={(e) => onUpdateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            autoComplete="email"
            className="h-12 border-none bg-background dark:bg-background pl-10 rounded-xl"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password" className="ml-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Password
        </Label>
        <PasswordInput
          id="signup-password"
          value={fields.password}
          onChange={(v) => onUpdateField("password", v)}
          error={errors.password}
          autoComplete="new-password"
          className="h-12 border-none bg-background dark:bg-background rounded-xl"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm-password" className="ml-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Confirm Password
        </Label>
        <PasswordInput
          id="confirm-password"
          value={fields.confirmPassword}
          onChange={(v) => onUpdateField("confirmPassword", v)}
          error={errors.confirmPassword}
          autoComplete="new-password"
          className="h-12 border-none bg-background dark:bg-background rounded-xl"
        />
      </div>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="terms"
          checked={fields.agreedToTerms}
          onCheckedChange={(checked) =>
            onUpdateField("agreedToTerms", checked === true)
          }
          aria-invalid={!!errors.agreedToTerms}
          className="mt-0.5 cursor-pointer"
        />
        <label
          htmlFor="terms"
          className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
        >
          I agree to the{" "}
          <span className="text-primary hover:underline">Terms of Service</span>{" "}
          and{" "}
          <span className="text-primary hover:underline">Privacy Policy</span>.
        </label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-xs text-destructive">{errors.agreedToTerms}</p>
      )}

      <Button
        type="submit"
        className="mt-4 h-[52px] w-full rounded-xl font-heading font-bold shadow-lg shadow-primary/20"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}

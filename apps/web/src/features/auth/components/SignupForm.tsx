"use client";

import Link from "next/link";
import type { AuthFormErrors, AuthFormFields } from "../types";
import { SignupFormFields } from "./SignupFormFields";
import { SocialButtons } from "./SocialButtons";

interface SignupFormProps {
  fields: AuthFormFields;
  errors: AuthFormErrors;
  isSubmitting: boolean;
  onUpdateField: (field: keyof AuthFormFields, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupForm({
  fields,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit,
}: SignupFormProps) {
  return (
    <div className="flex w-full flex-col">
      {/* Heading */}
      <div className="mb-8 space-y-2">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Create your account
        </h2>
        <p className="text-muted-foreground">
          Start your journey with ForgeFit.
        </p>
      </div>

      {/* Social first (per Stitch signup design) */}
      <SocialButtons />

      {/* Divider */}
      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t border-border/20" />
        <span className="mx-4 shrink-0 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          or continue with email
        </span>
        <div className="flex-grow border-t border-border/20" />
      </div>

      {errors.server && (
        <div className="mb-5 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.server}
        </div>
      )}

      {/* Form */}
      <SignupFormFields
        fields={fields}
        errors={errors}
        isSubmitting={isSubmitting}
        onUpdateField={onUpdateField}
        onSubmit={onSubmit}
      />

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

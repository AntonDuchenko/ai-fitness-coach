"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import type { AuthFormErrors, AuthFormFields } from "../types";
import { PasswordInput } from "./PasswordInput";
import { SocialButtons } from "./SocialButtons";

interface LoginFormProps {
  fields: AuthFormFields;
  errors: AuthFormErrors;
  isSubmitting: boolean;
  onUpdateField: (field: keyof AuthFormFields, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  fields,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="flex w-full flex-col">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="mb-2 font-heading text-3xl font-bold text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to continue your fitness journey.
        </p>
      </div>

      {errors.server && (
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.server}
        </div>
      )}

      {/* Form first */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="ml-1 text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={fields.email}
              onChange={(e) => onUpdateField("email", e.target.value)}
              aria-invalid={!!errors.email}
              autoComplete="email"
              className="h-[52px] border-none bg-background dark:bg-background pl-12 rounded-xl"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="ml-1 text-sm font-medium">
              Password
            </Label>
            <span className="cursor-pointer text-xs font-semibold text-primary hover:opacity-80">
              Forgot password?
            </span>
          </div>
          <PasswordInput
            id="password"
            value={fields.password}
            onChange={(v) => onUpdateField("password", v)}
            error={errors.password}
            className="h-[52px] border-none bg-background dark:bg-background rounded-xl"
          />
        </div>

        <Button
          type="submit"
          className="h-[52px] w-full gap-2 rounded-xl font-heading font-bold shadow-lg shadow-primary/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground lg:bg-card">
            or continue with
          </span>
        </div>
      </div>

      {/* Social login */}
      <SocialButtons />

      {/* Footer */}
      <p className="mt-12 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="ml-1 font-bold text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

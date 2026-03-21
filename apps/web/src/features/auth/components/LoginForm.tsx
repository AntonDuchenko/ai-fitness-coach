"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, Loader2, Lock, ShieldCheck, Users } from "lucide-react";
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

const inputClass = "h-10 rounded-[10px] bg-[#161618] border-[#1F1F23] px-3.5";

export function LoginForm({
  fields,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-400">
          <Dumbbell className="size-6 text-white" />
        </div>
        <h1 className="font-heading text-[28px] font-bold text-foreground">
          Welcome back
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {errors.server && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.server}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={fields.password}
              onChange={(v) => onUpdateField("password", v)}
              error={errors.password}
              className={inputClass}
            />
          </div>

          <div className="flex justify-end">
            <span className="cursor-pointer text-[13px] font-medium text-primary hover:underline">
              Forgot password?
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
          <SocialButtons />
        </div>
      </form>

      <div className="flex items-center justify-center gap-1">
        <span className="text-[13px] text-muted-foreground">
          Don&apos;t have an account?
        </span>
        <Link
          href="/signup"
          className="text-[13px] font-semibold text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">
            SSL Encrypted
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="size-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">
            Secure Login
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="size-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">10K+ Users</span>
        </div>
      </div>
    </div>
  );
}

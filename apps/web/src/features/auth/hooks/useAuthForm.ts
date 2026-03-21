"use client";

import { ApiError } from "@/lib/api-client";
import { useCallback, useState } from "react";
import { z } from "zod";
import type { AuthFormErrors, AuthFormFields } from "../types";
import { useAuth } from "./useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreedToTerms: z.literal(true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const initialFields: AuthFormFields = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
  agreedToTerms: false,
};

export function useAuthForm(mode: "login" | "signup") {
  const { login, signup } = useAuth();
  const [fields, setFields] = useState<AuthFormFields>(initialFields);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    (field: keyof AuthFormFields, value: string | boolean) => {
      setFields((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined, server: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const schema = mode === "login" ? loginSchema : signupSchema;
      const result = schema.safeParse(fields);

      if (!result.success) {
        const fieldErrors: AuthFormErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof AuthFormErrors;
          if (!fieldErrors[key]) {
            fieldErrors[key] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        if (mode === "login") {
          await login(fields.email, fields.password);
        } else {
          await signup(fields.email, fields.password, fields.name);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.statusCode === 409) {
            setErrors({ email: "This email is already registered" });
          } else if (error.statusCode === 401) {
            setErrors({ server: "Invalid email or password" });
          } else {
            setErrors({ server: error.message });
          }
        } else {
          setErrors({ server: "Something went wrong. Please try again." });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [mode, fields, login, signup],
  );

  return { fields, errors, isSubmitting, updateField, handleSubmit };
}

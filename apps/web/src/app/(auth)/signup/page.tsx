"use client";

import { SignupForm, useAuthForm, usePasswordStrength } from "@/features/auth";

export default function SignupPage() {
  const { fields, errors, isSubmitting, updateField, handleSubmit } =
    useAuthForm("signup");
  const passwordStrength = usePasswordStrength(fields.password);

  return (
    <SignupForm
      fields={fields}
      errors={errors}
      isSubmitting={isSubmitting}
      passwordStrength={passwordStrength}
      onUpdateField={updateField}
      onSubmit={handleSubmit}
    />
  );
}

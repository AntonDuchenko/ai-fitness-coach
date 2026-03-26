"use client";

import { SignupForm, useAuthForm } from "@/features/auth";

export default function SignupPage() {
  const { fields, errors, isSubmitting, updateField, handleSubmit } =
    useAuthForm("signup");

  return (
    <SignupForm
      fields={fields}
      errors={errors}
      isSubmitting={isSubmitting}
      onUpdateField={updateField}
      onSubmit={handleSubmit}
    />
  );
}

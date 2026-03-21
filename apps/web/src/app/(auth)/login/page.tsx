"use client";

import { LoginForm, useAuthForm } from "@/features/auth";

export default function LoginPage() {
  const { fields, errors, isSubmitting, updateField, handleSubmit } =
    useAuthForm("login");

  return (
    <LoginForm
      fields={fields}
      errors={errors}
      isSubmitting={isSubmitting}
      onUpdateField={updateField}
      onSubmit={handleSubmit}
    />
  );
}

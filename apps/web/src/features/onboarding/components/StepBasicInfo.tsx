"use client";

import { cn } from "@/lib/utils";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepBasicInfoProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}

const GENDERS: { value: OnboardingData["gender"]; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export function StepBasicInfo({ data, errors, onUpdate }: StepBasicInfoProps) {
  return (
    <div className="space-y-8">
      {/* Gender */}
      <div className="space-y-4">
        <span
          id="gender-label"
          className="font-heading text-sm font-semibold uppercase tracking-wider text-m3-outline"
        >
          Biological Gender
        </span>
        <div
          className="flex gap-2 rounded-2xl bg-m3-surface-lowest p-1.5"
          role="radiogroup"
          aria-labelledby="gender-label"
        >
          {GENDERS.map((g) => (
            <button
              key={g.value}
              type="button"
              aria-checked={data.gender === g.value}
              onClick={() => onUpdate("gender", g.value)}
              className={cn(
                "flex-1 rounded-xl py-3 px-4 text-sm font-bold transition-all duration-200",
                data.gender === g.value
                  ? "bg-m3-primary-container text-m3-on-primary-container shadow-lg"
                  : "text-m3-outline hover:bg-m3-surface-high",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <FieldInput
        id="age"
        label="Age"
        value={data.age}
        onChange={(v) => onUpdate("age", v)}
        placeholder="25"
        suffix="years"
        error={errors.age}
      />

      {/* Height */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="height"
            className="font-heading text-sm font-semibold uppercase tracking-wider text-m3-outline"
          >
            Height
          </label>
          <div className="flex rounded-lg bg-m3-surface-high p-0.5 text-[10px] font-bold uppercase">
            {(["cm", "ft"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onUpdate("heightUnit", u)}
                className={cn(
                  "rounded px-2 py-0.5 transition-colors",
                  data.heightUnit === u
                    ? "bg-m3-primary-container text-m3-on-primary-container"
                    : "text-m3-outline",
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <input
            id="height"
            type="number"
            value={data.height}
            onChange={(e) => onUpdate("height", e.target.value)}
            placeholder="180"
            aria-invalid={!!errors.height}
            className="w-full rounded-xl border-none bg-m3-surface-lowest px-5 py-4 font-heading text-xl font-bold text-m3-on-surface placeholder:text-m3-surface-highest focus:outline-none focus:ring-2 focus:ring-m3-primary-container/20"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-m3-outline">
            {data.heightUnit}
          </span>
        </div>
        {errors.height && (
          <p className="text-xs text-destructive">{errors.height}</p>
        )}
      </div>

      {/* Weights */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FieldInput
          id="weight"
          label="Current Weight"
          value={data.weight}
          onChange={(v) => onUpdate("weight", v)}
          placeholder="75.0"
          suffix="kg"
          error={errors.weight}
        />
        <FieldInput
          id="targetWeight"
          label="Target Weight"
          badge="Optional"
          value={data.targetWeight}
          onChange={(v) => onUpdate("targetWeight", v)}
          placeholder="70.0"
          suffix="kg"
        />
      </div>
    </div>
  );
}

function FieldInput(p: {
  id: string;
  label: string;
  badge?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  suffix: string;
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor={p.id}
          className="font-heading text-sm font-semibold uppercase tracking-wider text-m3-outline"
        >
          {p.label}
        </label>
        {p.badge && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-m3-primary">
            {p.badge}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          id={p.id}
          type="number"
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
          placeholder={p.placeholder}
          aria-invalid={!!p.error}
          className="w-full rounded-xl border-none bg-m3-surface-lowest px-5 py-4 font-heading text-xl font-bold text-m3-on-surface placeholder:text-m3-surface-highest focus:outline-none focus:ring-2 focus:ring-m3-primary-container/20"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-m3-outline">
          {p.suffix}
        </span>
      </div>
      {p.error && <p className="text-xs text-destructive">{p.error}</p>}
    </div>
  );
}

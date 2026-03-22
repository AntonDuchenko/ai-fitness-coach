"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { CalendarDaySlot } from "../types";
import {
  buildWeekSlots,
  getCurrentWeekIndex,
  weekProgressFraction,
} from "../utils/planCalendar";
import { useWorkoutPlan } from "./useWorkoutPlan";

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export { dayKey };

export function useWorkoutPlanView() {
  const { plan, isLoading, isError, error, refetch, regenerate } =
    useWorkoutPlan();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [regenOpen, setRegenOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastPlanId = useRef<string | null>(null);

  const planStart = useMemo(
    () => (plan ? new Date(plan.startDate) : new Date()),
    [plan],
  );

  const durationWeeks = plan?.durationWeeks ?? 8;

  const currentWeek = useMemo(
    () => (plan ? getCurrentWeekIndex(planStart, plan.durationWeeks) : 1),
    [plan, planStart],
  );

  useEffect(() => {
    if (!plan) return;
    if (lastPlanId.current !== plan.id) {
      lastPlanId.current = plan.id;
      setSelectedWeek(currentWeek);
    }
  }, [plan, currentWeek]);

  const slots: CalendarDaySlot[] = useMemo(() => {
    if (!plan) return [];
    return buildWeekSlots(
      plan.weeklySchedule,
      planStart,
      selectedWeek,
      new Date(),
    );
  }, [plan, planStart, selectedWeek]);

  useEffect(() => {
    if (slots.length === 0) return;
    const first = slots.find((s) => !s.isRest) ?? slots[0];
    const k = dayKey(first.date);
    setSelectedDayKey((prev) => {
      if (prev && slots.some((s) => dayKey(s.date) === prev)) return prev;
      return k;
    });
  }, [slots]);

  const selectedSlot = useMemo(
    () => slots.find((s) => dayKey(s.date) === selectedDayKey) ?? null,
    [slots, selectedDayKey],
  );

  const onSelectDay = useCallback((slot: CalendarDaySlot) => {
    setSelectedDayKey(dayKey(slot.date));
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileDetailOpen(true);
    }
  }, []);

  const onRegenerate = async () => {
    const t = toast.loading("Regenerating your plan…");
    try {
      await regenerate.mutateAsync();
      toast.success("Plan updated successfully.", { id: t });
      setRegenOpen(false);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Could not regenerate plan.",
        { id: t },
      );
    }
  };

  const progressPct = plan
    ? weekProgressFraction(currentWeek, plan.durationWeeks)
    : 0;

  return {
    plan,
    isLoading,
    isError,
    error,
    refetch,
    regenerate,
    selectedWeek,
    setSelectedWeek,
    durationWeeks,
    currentWeek,
    progressPct,
    slots,
    selectedDayKey,
    selectedSlot,
    onSelectDay,
    regenOpen,
    setRegenOpen,
    onRegenerate,
    mobileDetailOpen,
    setMobileDetailOpen,
    menuOpen,
    setMenuOpen,
  };
}

"use client";

import { useCallback, useEffect, useState } from "react";

export function useRestTimer(restSeconds: number) {
  const [restEndAt, setRestEndAt] = useState<number | null>(null);
  const [restRemaining, setRestRemaining] = useState(0);

  useEffect(() => {
    if (restEndAt == null) {
      setRestRemaining(0);
      return;
    }
    const tick = () => {
      const left = Math.max(0, Math.ceil((restEndAt - Date.now()) / 1000));
      setRestRemaining(left);
      if (left <= 0) setRestEndAt(null);
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [restEndAt]);

  const startRest = useCallback(() => {
    setRestEndAt(Date.now() + restSeconds * 1000);
  }, [restSeconds]);

  const skipRest = useCallback(() => setRestEndAt(null), []);

  const resetRest = useCallback(() => {
    setRestEndAt(null);
    setRestRemaining(0);
  }, []);

  return { restRemaining, startRest, skipRest, resetRest };
}

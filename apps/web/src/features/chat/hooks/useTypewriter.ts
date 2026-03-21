"use client";

import { useEffect, useRef, useState } from "react";

const CHAR_DELAY = 5;

export function useTypewriter(fullText: string) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    let index = 0;
    let lastTime = 0;
    setDisplayed("");
    setIsDone(false);

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      if (time - lastTime >= CHAR_DELAY) {
        const chars = Math.max(1, Math.floor((time - lastTime) / CHAR_DELAY));
        index = Math.min(index + chars, fullText.length);
        setDisplayed(fullText.slice(0, index));
        lastTime = time;
      }
      if (index < fullText.length) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setIsDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [fullText]);

  return { displayed, isDone };
}

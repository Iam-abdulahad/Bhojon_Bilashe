"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks/use-in-view";

interface CounterProps {
  /** Target number to count up to */
  target: number;
  /** Duration of the count-up in milliseconds */
  duration?: number;
  /** Suffix (e.g., "+", "k", "%") */
  suffix?: string;
  /** Prefix (e.g., "৳", "$") */
  prefix?: string;
  className?: string;
}

export function Counter({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
  className,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView<HTMLSpanElement>({ triggerOnce: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for a satisfying deceleration
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

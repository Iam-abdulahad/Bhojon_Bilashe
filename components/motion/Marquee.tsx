"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Base speed in pixels per second */
  speed?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Direction: "left" (default) or "right" */
  direction?: "left" | "right";
  /** Number of copies for seamless loop */
  repeat?: number;
}

export function Marquee({
  children,
  className,
  speed = 50,
  pauseOnHover = true,
  direction = "left",
  repeat = 4,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;
    let pos = 0;
    let isPaused = false;
    const contentWidth = container.scrollWidth / repeat;

    function animate() {
      if (!isPaused) {
        pos += (direction === "left" ? -1 : 1) * (speed / 60);
        if (direction === "left" && pos <= -contentWidth) {
          pos += contentWidth;
        } else if (direction === "right" && pos >= contentWidth) {
          pos -= contentWidth;
        }
        container!.style.transform = `translateX(${pos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    function onEnter() { isPaused = true; }
    function onLeave() { isPaused = false; }

    if (pauseOnHover) {
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (pauseOnHover) {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [speed, direction, pauseOnHover, repeat, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className={cn("overflow-hidden", className)} aria-hidden="true">
        <div className="flex gap-8 whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        ref={containerRef}
        className="flex gap-8 whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex shrink-0 gap-8">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

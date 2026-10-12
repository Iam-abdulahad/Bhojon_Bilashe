"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUpVariants, transitions } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts */
  delay?: number;
  /** Direction of the reveal */
  direction?: "up" | "down" | "left" | "right";
  /** Custom y/x offset */
  offset?: number;
  /** Viewport threshold to trigger (0-1) */
  threshold?: number;
  as?: "div" | "section" | "article" | "span";
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  offset = 40,
  threshold = 0.15,
  as: Tag = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  const MotionTag = motion.create(Tag);

  const directionMap = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
  };

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, ...directionMap[direction] };

  return (
    <MotionTag
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ ...transitions.smooth, delay }}
    >
      {children}
    </MotionTag>
  );
}

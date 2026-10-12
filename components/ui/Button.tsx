"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

import type { HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-cream font-semibold hover:bg-primary-hover hover:shadow-glow active:scale-[0.97]",
  secondary:
    "bg-transparent text-cream border border-cream/30 hover:bg-cream/10 hover:border-cream/50 active:scale-[0.97]",
  ghost:
    "bg-transparent text-cream underline-offset-4 hover:underline decoration-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/** Maximum magnetic pull distance in pixels */
const MAGNETIC_DISTANCE = 12;

export function Button({
  variant = "primary",
  size = "default",
  magnetic = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const isMagnetic = magnetic && !prefersReduced;

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (!isMagnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * (MAGNETIC_DISTANCE / (rect.width / 2));
    const deltaY = (e.clientY - centerY) * (MAGNETIC_DISTANCE / (rect.height / 2));
    x.set(deltaX);
    y.set(deltaY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      style={isMagnetic ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full",
        "min-h-[44px] min-w-[44px]",
        "cursor-pointer select-none",
        "transition-all duration-200 ease-smooth",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

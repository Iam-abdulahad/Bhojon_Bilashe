"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-touch-device";

/**
 * Custom cursor — dot + ring that grows on interactive elements.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (prefersReduced || isTouch) return;

    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-label]"
      );
      if (interactive) {
        setIsHovering(true);
        const cursorLabel = interactive.getAttribute("data-cursor-label");
        setLabel(cursorLabel);
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-label]"
      );
      if (interactive) {
        setIsHovering(false);
        setLabel(null);
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.body.style.cursor = "";
    };
  }, [prefersReduced, isTouch, cursorX, cursorY]);

  if (prefersReduced || isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-primary"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full border border-cream/40"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          borderColor: isHovering
            ? "rgba(232, 83, 43, 0.6)"
            : "rgba(246, 239, 230, 0.4)",
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      >
        {label && (
          <span className="text-[10px] font-label tracking-widest text-cream">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}

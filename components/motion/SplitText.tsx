"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  /** Split mode: "word" or "char" */
  mode?: "word" | "char";
  /** Stagger delay between items in seconds */
  stagger?: number;
  /** Additional delay before animation starts */
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function SplitText({
  children,
  className,
  mode = "word",
  stagger = 0.06,
  delay = 0,
  as: Tag = "span",
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <motion.span
        className={cn(className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    );
  }

  const items = mode === "word" ? children.split(" ") : children.split("");

  return (
    <Tag className={cn("inline-block", className)} aria-label={children}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: duration.base,
              ease: ease.smooth,
              delay: delay + i * stagger,
            }}
          >
            {item}
            {mode === "word" && i < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

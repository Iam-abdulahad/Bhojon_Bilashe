"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { MenuItemData } from "@/lib/menu-service";
import { useOrder } from "@/components/order/OrderExperience";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function AddToOrderButton({
  dish,
  className = "",
}: {
  dish: MenuItemData;
  className?: string;
}) {
  const { addItem } = useOrder();
  const prefersReducedMotion = useReducedMotion();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;

    const timeout = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [added]);

  return (
    <motion.button
      type="button"
      disabled={!dish.isAvailable}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      onClick={() => {
        addItem(dish);
        setAdded(true);
      }}
      className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 text-xs font-semibold text-cream transition-all hover:border-primary hover:bg-primary hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      aria-label={dish.isAvailable ? `Add ${dish.name} to your order` : `${dish.name} is unavailable`}
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {dish.isAvailable ? (added ? "Added" : "Add to order") : "Unavailable"}
    </motion.button>
  );
}

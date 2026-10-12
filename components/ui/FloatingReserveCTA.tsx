"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

export function FloatingReserveCTA() {
  const pathname = usePathname();

  // Hide on reservation page
  const isReservationPage = pathname === "/reservation";

  return (
    <AnimatePresence>
      {!isReservationPage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <Link
            href="/reservation"
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-5 py-3 text-sm font-bold text-cream shadow-glow active:scale-95 transition-transform"
            aria-label="Reserve a table"
          >
            <Calendar className="h-4 w-4" />
            <span>Reserve Table</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

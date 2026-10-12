"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ease } from "@/lib/animations";
import { UtensilsCrossed } from "lucide-react";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position on route navigation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="flex-1 flex flex-col">
        {/* Dark curtain wipe overlay (600ms) with subtle logo flash per Style.md 7.2 */}
        <motion.div
          className="fixed inset-0 z-[9990] pointer-events-none bg-bg flex items-center justify-center"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: ease.inOut }}
          style={{ originY: 0 }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.9 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated text-accent">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
          </motion.div>
        </motion.div>

        {/* Page Content Fade & Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: ease.smooth, delay: 0.15 }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

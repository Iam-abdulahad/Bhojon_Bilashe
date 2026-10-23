"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ease } from "@/lib/animations";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position on route navigation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: ease.smooth }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}

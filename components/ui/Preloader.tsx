"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/animations";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If already marked as seen, remove immediately without state thrash
    const hasLoaded = sessionStorage.getItem("bhojon_preloader_seen");
    if (hasLoaded) {
      const id = requestAnimationFrame(() => setLoading(false));
      return () => cancelAnimationFrame(id);
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("bhojon_preloader_seen", "true");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: ease.inOut }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg"
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center">
            {/* Pulsing glow ring */}
            <motion.div
              className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: ease.smooth }}
              className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated shadow-gold"
            >
              <span className="font-display text-2xl font-bold text-accent">ভ</span>
            </motion.div>

            {/* Name reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-2xl font-bold tracking-wider text-cream"
            >
              BHOJON BILASH
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-label mt-2 text-xs tracking-[0.3em] text-accent"
            >
              TASTE THE TRADITION
            </motion.p>

            {/* Progress bar line */}
            <div className="mt-6 h-[2px] w-36 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

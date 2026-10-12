"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Flame, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Skeleton } from "@/components/ui/Skeleton";

// Dynamically load 3D Scene with SSR disabled for optimal first-load performance
const Scene = dynamic(
  () => import("@/components/three/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Skeleton shape="circle" className="h-64 w-64 md:h-80 md:w-80" />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-radial from-[#2A1812] via-[#140D0B] to-[#0B0807] pt-24 pb-12 flex flex-col justify-between"
      aria-label="Welcome and signature dishes hero section"
    >
      {/* Background ambient light glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-content relative z-10 grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left column: Text storytelling & CTAs */}
        <div className="flex flex-col justify-center text-left lg:col-span-6 pt-8 lg:pt-0">
          {/* Eyebrow badge */}
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              <Flame className="h-3.5 w-3.5 text-primary" />
              <span>Authentic Heritage Dining</span>
            </div>
          </Reveal>

          {/* Main Headline */}
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-cream mb-6">
            Where Fire Meets Spice &{" "}
            <span className="text-gradient">Tradition</span> Meets Soul.
          </h1>

          {/* Subheadline description */}
          <Reveal delay={0.25}>
            <p className="prose-width text-base md:text-lg text-muted mb-8 leading-relaxed">
              Step into Dhaka’s sanctuary of slow-cooked biryanis, open-flame
              tandoor grills, and generational recipes crafted with passion in
              the heart of Dhanmondi.
            </p>
          </Reveal>

          {/* Primary & Secondary CTAs */}
          <Reveal delay={0.35}>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/reservation">
                <Button size="lg" variant="primary" magnetic className="shadow-glow">
                  Reserve a Table
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="secondary" magnetic className="gap-2">
                  <Utensils className="h-4 w-4 text-accent" />
                  Explore Full Menu
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Mini Trust Stats */}
          <Reveal delay={0.45}>
            <div className="mt-12 flex items-center gap-8 border-t border-border/60 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-accent">4.9 ★</p>
                <p className="font-label text-[10px] text-muted">2,400+ GUEST REVIEWS</p>
              </div>
              <div className="h-8 w-[1px] bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-cream">18+</p>
                <p className="font-label text-[10px] text-muted">SIGNATURE HERITAGE RECIPES</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column: 3D interactive dish showcase */}
        <div className="relative flex h-[420px] sm:h-[500px] lg:h-[620px] w-full items-center justify-center lg:col-span-6">
          <Scene className="h-full w-full" />

          {/* Interactive Floating Hint */}
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-border/80 bg-bg-elevated/70 px-3 py-1 text-[11px] font-medium text-muted backdrop-blur-sm">
            Drag / move cursor to interact
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="container-content relative z-10 flex items-center justify-between pt-6 text-xs text-muted">
        <span className="font-label text-[10px] tracking-widest text-accent">
          DHANMONDI · HOUSE 12, ROAD 5
        </span>
        <div className="flex items-center gap-2">
          <span>Scroll down to taste</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5 text-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const ICONIC_DISHES = [
  {
    name: "Bhojon Bilash Kacchi Biryani",
    image: "/images/IconicFood/Hero.jpg",
    alt: "A pan of Bhojon Bilash kacchi biryani with herbs and spices",
  },
  {
    name: "Flame-Charred Chicken Tikka",
    image: "/images/IconicFood/Flame-Charred%20Chicken%20Tikka.jpg",
    alt: "Chicken tikka charred over glowing tandoor coals",
  },
  {
    name: "Royal Shahi Beef Rezala",
    image: "/images/IconicFood/Royal%20Shahi%20Beef%20Rezala.jpg",
    alt: "Royal beef rezala in a rich, creamy sauce",
  },
  {
    name: "Smoked Kacchi Biryani",
    image: "/images/IconicFood/Smoked%20Kacchi%20Biryani.jpg",
    alt: "Smoked kacchi biryani served on a blue and white plate",
  },
  {
    name: "Tandoori Jumbo River Prawns",
    image: "/images/IconicFood/Tandoori%20Jumbo%20River%20Prawns.jpg",
    alt: "Tandoori jumbo river prawns with charred spices",
  },
];

export function IconicFoodStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const rotation = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const activeDish = ICONIC_DISHES[activeIndex];

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerY.set((0.5 - y) * 10);
    pointerX.set((x - 0.5) * 12);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4" style={{ perspective: 1200 }}>
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="min-h-0 flex-1"
      >
        <motion.div
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          style={{ transform: rotation, transformStyle: "preserve-3d" }}
          className="relative h-full overflow-hidden rounded-[2rem] border border-accent/20 bg-bg-elevated shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activeDish.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeDish.image}
                alt={activeDish.alt}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/20" />

          <div
            className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-bg/55 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md sm:left-7 sm:top-7"
            style={{ transform: "translateZ(36px)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Signature selection
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8"
            style={{ transform: "translateZ(48px)" }}
          >
            <p className="mb-2 font-label text-[10px] tracking-[0.24em] text-accent">
              FROM OUR OPEN-FLAME KITCHEN
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={activeDish.name + activeDish.image}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="font-display text-2xl font-bold text-cream sm:text-3xl"
              >
                {activeDish.name}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      <div
        className="flex shrink-0 items-center justify-center gap-2"
        role="group"
        aria-label="Choose a signature dish"
      >
        {ICONIC_DISHES.map((dish, index) => (
          <button
            key={dish.image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${dish.name}`}
            aria-pressed={activeIndex === index}
            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border transition-[border-color,opacity,transform] duration-200 sm:h-14 sm:w-14 ${
              activeIndex === index
                ? "scale-105 border-accent opacity-100 shadow-[0_0_20px_rgba(242,184,75,0.25)]"
                : "border-white/15 opacity-60 hover:scale-105 hover:border-white/40 hover:opacity-100"
            }`}
          >
            <Image
              src={dish.image}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
        <span className="sr-only" aria-live="polite">
          Showing {activeDish.name}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Button, Chip } from "@/components/ui";
import { MenuItemData } from "@/lib/menu-service";
import { Scene } from "@/components/three/Scene";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-touch-device";
import { ArrowRight, ChefHat } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SignatureShowcaseProps {
  dishes: MenuItemData[];
}

export function SignatureShowcase({ dishes }: SignatureShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const signatureList = dishes.filter((d) => d.isSignature).slice(0, 4);

  useEffect(() => {
    // If reduced motion is preferred or mobile touch device, keep snap carousel instead of ScrollTrigger pin
    if (prefersReduced || isTouch || !sectionRef.current || signatureList.length === 0) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${signatureList.length * 100}%`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const step = Math.min(
          Math.floor(self.progress * signatureList.length),
          signatureList.length - 1
        );
        setActiveIndex(step);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReduced, isTouch, signatureList.length]);

  if (signatureList.length === 0) return null;

  const currentDish = signatureList[activeIndex] || signatureList[0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-radial from-[#22130E] via-[#120B09] to-[#0B0807] py-20 flex flex-col justify-center overflow-hidden border-t border-border"
      aria-label="Signature dishes pinned showcase"
    >
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-label text-xs">
              <ChefHat className="h-4 w-4" />
              <span>PINNED 3D SHOWCASE</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mt-2">
              Signature <span className="text-gradient">Creations</span>
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {signatureList.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Select signature dish ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-8 bg-accent" : "w-2.5 bg-border hover:bg-cream/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* 3D Scene Viewport */}
          <div className="relative h-[360px] sm:h-[450px] lg:h-[550px] w-full lg:col-span-7 flex items-center justify-center">
            <div className="h-full w-full">
              <Scene modelUrl={currentDish.model3d} />
            </div>

            {/* Orbit Indicator Ring */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full border border-accent/15 animate-pulse" />
            </div>
          </div>

          {/* Cross-fading Dish Info Panel */}
          <div className="relative min-h-[300px] lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.slug}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <Chip variant="chef">Signature Dish #{activeIndex + 1}</Chip>
                  {currentDish.tags.slice(0, 1).map((t) => (
                    <Chip key={t} variant="spicy">
                      {t}
                    </Chip>
                  ))}
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-cream">
                  {currentDish.name}
                </h3>

                <p className="font-display text-2xl font-bold text-accent tabular-nums">
                  ৳{currentDish.price}
                </p>

                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {currentDish.description}
                </p>

                {currentDish.ingredients && currentDish.ingredients.length > 0 && (
                  <div className="mt-2">
                    <p className="font-label text-[10px] text-muted mb-2 tracking-wider">
                      CRAFTED WITH:
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-cream/80">
                      {currentDish.ingredients.slice(0, 5).map((ing) => (
                        <span
                          key={ing}
                          className="rounded-md border border-border bg-bg-soft px-2.5 py-1"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link href={`/menu/${currentDish.slug}`}>
                    <Button variant="primary" size="default" magnetic>
                      View in Full 3D <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/reservation">
                    <Button variant="secondary" size="default">
                      Reserve Table
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Horizontal Snap Indicator */}
        <div className="mt-8 flex justify-center gap-2 sm:hidden">
          {signatureList.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === i ? "w-6 bg-accent" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

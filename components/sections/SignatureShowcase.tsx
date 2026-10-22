"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Button, Chip } from "@/components/ui";
import { MenuItemData } from "@/lib/menu-service";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-touch-device";
import { ArrowRight, ChefHat } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_IMAGES: Record<string, string> = {
  "smoked-kacchi-biryani": "/images/IconicFood/Smoked%20Kacchi%20Biryani.jpg",
  "flame-charred-chicken-tikka": "/images/IconicFood/Flame-Charred%20Chicken%20Tikka.jpg",
  "royal-shahi-beef-rezala": "/images/IconicFood/Royal%20Shahi%20Beef%20Rezala.jpg",
  "tandoori-jumbo-river-prawns": "/images/IconicFood/Tandoori%20Jumbo%20River%20Prawns.jpg",
};

interface SignatureShowcaseProps {
  dishes: MenuItemData[];
}

export function SignatureShowcase({ dishes }: SignatureShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const rotation = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

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
  const currentImage = SHOWCASE_IMAGES[currentDish.slug] || currentDish.image;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerY.set((0.5 - y) * 8);
    pointerX.set((x - 0.5) * 10);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

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
          {/* Interactive 3D food photography showcase */}
          <div className="relative h-[360px] sm:h-[450px] lg:h-[550px] w-full lg:col-span-7 flex items-center justify-center">
            <div className="h-full w-full" style={{ perspective: 1200 }}>
              <motion.div
                animate={prefersReduced ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full"
              >
                <motion.div
                  onPointerMove={handlePointerMove}
                  onPointerLeave={resetTilt}
                  style={{ transform: rotation, transformStyle: "preserve-3d" }}
                  className="relative h-full w-full overflow-hidden rounded-[2rem] border border-accent/25 bg-bg-elevated shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentImage}
                        alt={currentDish.name}
                        fill
                        priority={activeIndex === 0}
                        sizes="(max-width: 1023px) 100vw, 58vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/10" />
                  <div
                    className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/15 bg-bg/55 px-3 py-2 font-label text-[10px] tracking-[0.18em] text-accent backdrop-blur-md sm:left-7 sm:top-7"
                    style={{ transform: "translateZ(36px)" }}
                  >
                    SIGNATURE DISH #{activeIndex + 1}
                  </div>

                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8"
                    style={{ transform: "translateZ(48px)" }}
                  >
                    <p className="font-label text-[10px] tracking-[0.24em] text-accent">
                      FROM OUR OPEN-FLAME KITCHEN
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">
                      {currentDish.name}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
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

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Flame,
  UtensilsCrossed,
  ChevronRight,
} from "lucide-react";

import { Container, Button, Chip } from "@/components/ui";
import { MenuItemData } from "@/lib/menu-service";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-touch-device";

const SHOWCASE_IMAGES: Record<string, string> = {
  "smoked-kacchi-biryani": "/images/IconicFood/Smoked%20Kacchi%20Biryani.jpg",
  "flame-charred-chicken-tikka":
    "/images/IconicFood/Flame-Charred%20Chicken%20Tikka.jpg",
  "royal-shahi-beef-rezala":
    "/images/IconicFood/Royal%20Shahi%20Beef%20Rezala.jpg",
  "tandoori-jumbo-river-prawns":
    "/images/IconicFood/Tandoori%20Jumbo%20River%20Prawns.jpg",
};

interface SignatureShowcaseProps {
  dishes: MenuItemData[];
}

export function SignatureShowcase({ dishes }: SignatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(pointerY, {
    stiffness: 160,
    damping: 26,
  });

  const rotateY = useSpring(pointerX, {
    stiffness: 160,
    damping: 26,
  });

  const rotation = useMotionTemplate`
    rotateX(${rotateX}deg) rotateY(${rotateY}deg)
  `;

  const signatureList = dishes.filter((dish) => dish.isSignature).slice(0, 4);

  if (signatureList.length === 0) return null;

  const safeIndex = Math.min(activeIndex, signatureList.length - 1);

  const currentDish = signatureList[safeIndex];

  const currentImage = SHOWCASE_IMAGES[currentDish.slug] || currentDish.image;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || isTouch || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    pointerY.set((0.5 - y) * 5);
    pointerX.set((x - 0.5) * 6);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const changeDish = (index: number) => {
    setActiveIndex(index);
    resetTilt();
  };

  return (
    <section
      aria-label="Our signature dishes"
      className="
        relative isolate overflow-hidden
        border-t border-border
        bg-radial from-[#22130E] via-[#120B09] to-[#0B0807]
        py-16 sm:py-20 lg:py-24
      "
    >
      {/* Decorative background accents */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-40 top-20
          h-96 w-96 rounded-full bg-accent/[0.04] blur-3xl
        "
      />

      <Container>
        {/* Section heading */}
        <div className="relative mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-2">
              <ChefHat className="h-4 w-4 text-accent" />

              <span className="font-label text-[10px] tracking-[0.2em] text-accent sm:text-xs">
                OUR CHEF'S SELECTION
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              Signature <span className="text-gradient">Creations</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
              Discover the dishes that define our kitchen, crafted with
              carefully selected ingredients, authentic flavours, and a passion
              for great food.
            </p>
          </div>

          <Link
            href="/menu"
            className="
              group inline-flex w-fit shrink-0 items-center gap-2
              text-sm font-medium text-cream/80
              transition-colors hover:text-accent
            "
          >
            Explore Full Menu
            <ArrowRight
              className="
                h-4 w-4 transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* Main showcase */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Featured food image */}
          <div className="min-w-0 lg:col-span-7">
            <div className="relative" style={{ perspective: 1400 }}>
              <motion.div
                animate={prefersReduced ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full"
              >
                <motion.div
                  onPointerMove={handlePointerMove}
                  onPointerLeave={resetTilt}
                  style={{
                    transform: rotation,
                    transformStyle: "preserve-3d",
                  }}
                  className="
                    group relative h-[320px] overflow-hidden
                    rounded-2xl border border-accent/20
                    bg-bg-elevated
                    shadow-[0_24px_80px_rgba(0,0,0,0.35)]
                    sm:h-[430px] sm:rounded-3xl
                    lg:h-[510px]
                  "
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 1.04 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentImage}
                        alt={currentDish.name}
                        fill
                        priority={safeIndex === 0}
                        sizes="(max-width: 1023px) 100vw, 58vw"
                        className="
                          object-cover transition-transform
                          duration-700 group-hover:scale-[1.035]
                        "
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image overlay */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      bg-gradient-to-t
                      from-[#0B0807] via-[#0B0807]/15
                      to-[#0B0807]/10
                    "
                  />

                  <div
                    className="
                      pointer-events-none absolute inset-x-0 top-0
                      h-28 bg-gradient-to-b
                      from-[#0B0807]/50 to-transparent
                    "
                  />

                  {/* Top image badge */}
                  <div
                    className="
                      absolute left-4 top-4 z-10
                      inline-flex items-center gap-2
                      rounded-full border border-white/15
                      bg-[#120B09]/65 px-3 py-2
                      backdrop-blur-md sm:left-6 sm:top-6
                    "
                  >
                    <Flame className="h-3.5 w-3.5 text-accent" />

                    <span className="font-label text-[9px] tracking-[0.16em] text-cream sm:text-[10px]">
                      SIGNATURE DISH {String(safeIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom image caption */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-8">
                    <p className="mb-2 font-label text-[9px] tracking-[0.22em] text-accent sm:text-[10px]">
                      FROM OUR OPEN-FLAME KITCHEN
                    </p>

                    <h3 className="max-w-xl font-display text-2xl font-bold leading-tight text-cream sm:text-3xl lg:text-4xl">
                      {currentDish.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-xs text-cream/70">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-accent" />

                      <span>Handcrafted with passion</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Desktop and mobile dish selectors */}
            <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
              {signatureList.map((dish, index) => {
                const dishImage = SHOWCASE_IMAGES[dish.slug] || dish.image;

                const isActive = safeIndex === index;

                return (
                  <button
                    key={dish.slug}
                    type="button"
                    onClick={() => changeDish(index)}
                    aria-pressed={isActive}
                    aria-label={`Show ${dish.name}`}
                    className={`
                      group relative min-w-0 overflow-hidden
                      rounded-xl border text-left
                      transition-all duration-300
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-accent
                      ${
                        isActive
                          ? "border-accent shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                          : "border-border hover:border-accent/50"
                      }
                    `}
                  >
                    <div className="relative h-16 overflow-hidden sm:h-20">
                      <Image
                        src={dishImage}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 25vw, 180px"
                        className={`
                          object-cover transition-all duration-300
                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-55 group-hover:opacity-90"
                          }
                        `}
                      />

                      <div
                        className={`
                          absolute inset-0
                          ${isActive ? "bg-[#120B09]/10" : "bg-[#120B09]/35"}
                        `}
                      />

                      <span
                        className={`
                          absolute bottom-1.5 right-1.5
                          flex h-5 w-5 items-center justify-center
                          rounded-full text-[9px] font-bold
                          ${
                            isActive
                              ? "bg-accent text-[#120B09]"
                              : "bg-[#120B09]/75 text-cream"
                          }
                        `}
                      >
                        {index + 1}
                      </span>
                    </div>

                    <div
                      className={`
                        min-h-[45px] px-1.5 py-2 sm:px-2.5
                        ${isActive ? "bg-accent/[0.08]" : "bg-bg-elevated"}
                      `}
                    >
                      <p
                        className={`
                          line-clamp-2 text-[10px] leading-4
                          sm:text-xs
                          ${
                            isActive ? "font-semibold text-cream" : "text-muted"
                          }
                        `}
                      >
                        {dish.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dish information */}
          <div
            className="
              flex min-w-0 flex-col justify-center
              rounded-2xl border border-border
              bg-bg-elevated/70 p-5
              sm:rounded-3xl sm:p-8
              lg:col-span-5 lg:p-9
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.slug}
                initial={
                  prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Dish labels */}
                <div className="flex flex-wrap items-center gap-2">
                  <Chip variant="chef">Chef's Signature</Chip>

                  {currentDish.tags.slice(0, 1).map((tag) => (
                    <Chip key={tag} variant="spicy">
                      {tag}
                    </Chip>
                  ))}
                </div>

                {/* Title and price */}
                <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-cream sm:text-3xl">
                  {currentDish.name}
                </h3>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                      Experience the flavour
                    </p>

                    <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                      ৳{currentDish.price}
                    </p>
                  </div>

                  <span className="pb-1 text-xs text-muted">
                    Our signature selection
                  </span>
                </div>

                {/* Description */}
                <div className="mt-5">
                  <p className="mb-2 font-label text-[10px] tracking-[0.18em] text-accent">
                    THE STORY BEHIND THE DISH
                  </p>

                  <p className="text-sm leading-7 text-muted sm:text-base">
                    {currentDish.description}
                  </p>
                </div>

                {/* Ingredients */}
                {currentDish.ingredients &&
                  currentDish.ingredients.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 font-label text-[10px] tracking-[0.18em] text-muted">
                        CRAFTED WITH
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {currentDish.ingredients
                          .slice(0, 5)
                          .map((ingredient) => (
                            <span
                              key={ingredient}
                              className="
                                rounded-lg border border-border
                                bg-bg-soft px-3 py-2
                                text-xs text-cream/80
                              "
                            >
                              {ingredient}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/menu/${currentDish.slug}`}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="primary"
                      size="default"
                      magnetic={!isTouch}
                    >
                      Explore This Dish
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/reservation" className="w-full sm:w-auto">
                    <Button variant="secondary" size="default">
                      Reserve a Table
                    </Button>
                  </Link>
                </div>

                {/* Next dish */}
                {signatureList.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      changeDish((safeIndex + 1) % signatureList.length)
                    }
                    className="
                      mt-6 inline-flex w-fit items-center gap-2
                      text-xs text-muted transition-colors
                      hover:text-accent
                    "
                  >
                    Discover the next creation
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

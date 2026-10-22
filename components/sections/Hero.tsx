import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Flame,
  MapPin,
  Phone,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section
      className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden bg-bg"
      aria-label="Welcome to Bhojon Bilash"
    >
      {/* Background Image & Overlay Gradients */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/thumbnail.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/40 to-bg md:bg-gradient-to-r md:from-[#100804] md:from-5% md:via-[#100804]/95 md:via-40% md:to-[#100804]/10 md:to-80%" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent md:from-bg/80 md:via-transparent md:to-transparent" />
      </div>

      {/* Main Content Area - Auto-centered within available height */}
      <div className="container-content relative z-10 flex flex-1 flex-col justify-center pt-20 pb-6 sm:pt-24 lg:pt-28 lg:pb-10">
        <div className="w-full max-w-2xl">
          <Reveal delay={0.1}>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-bg/55 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:mb-5 sm:px-4 sm:py-2 sm:text-xs">
              <Flame className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
              <span>Authentic Heritage Dining</span>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <h1 className="mb-4 max-w-[13ch] font-display text-[clamp(2.25rem,5.5vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-cream sm:mb-5">
              Where Fire Meets
              <span className="block">
                Spice & <span className="text-gradient">Tradition</span>
              </span>
              <span className="block">Meets Soul.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mb-5 max-w-xl text-xs leading-relaxed text-cream/75 sm:mb-7 sm:text-base md:text-lg">
              Step into Dhaka&apos;s sanctuary of slow-cooked biryanis,
              open-flame tandoor grills, and generational recipes crafted with
              passion in the heart of Dhanmondi.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/reservation">
                <Button
                  size="lg"
                  variant="primary"
                  magnetic
                  className="gap-2 shadow-glow"
                >
                  <CalendarDays className="h-4 w-4" />
                  Reserve a Table
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button
                  size="lg"
                  variant="secondary"
                  magnetic
                  className="gap-2 border-accent/40 bg-bg/25"
                >
                  <Utensils className="h-4 w-4 text-accent" />
                  Explore Full Menu
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="mt-6 flex items-center gap-6 border-t border-cream/20 pt-4 sm:mt-8 sm:gap-8 sm:pt-5">
              <div>
                <p className="font-display text-xl font-bold leading-tight text-accent sm:text-2xl md:text-3xl">
                  4.9 ★
                </p>
                <p className="mt-0.5 font-label text-[9px] tracking-[0.18em] text-cream/65 sm:text-[10px]">
                  2,400+ Guest Reviews
                </p>
              </div>
              <div className="h-8 w-px bg-cream/20 sm:h-10" />
              <div>
                <p className="font-display text-xl font-bold leading-tight text-cream sm:text-2xl md:text-3xl">
                  18+
                </p>
                <p className="mt-0.5 font-label text-[9px] tracking-[0.18em] text-cream/65 sm:text-[10px]">
                  Signature Heritage Recipes
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Floating Decorative Stamp */}
        <div className="absolute right-[6%] top-[30%] hidden -rotate-6 text-right text-accent xl:block">
          <p className="font-display text-2xl italic leading-tight xl:text-3xl">
            Best Biryani
            <br />
            in Town ♡
          </p>
          <div className="ml-auto mt-2 h-px w-28 rotate-[-12deg] bg-accent xl:w-32" />
        </div>
      </div>

      {/* Footer Info Bar anchored flush to bottom */}
      <div className="container-content relative z-10 flex shrink-0 items-center justify-between gap-4 border-t border-accent/20 py-3 sm:py-4">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-xs sm:tracking-[0.2em]">
          <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span>Dhanmondi · House 12, Road 5</span>
        </div>
        <Link
          href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}
          className="hidden items-center gap-2 text-xs font-medium text-cream/75 transition-colors hover:text-accent sm:inline-flex"
        >
          <Phone className="h-3.5 w-3.5 text-accent" />
          Call {siteConfig.contact.phone}
        </Link>
        <span className="font-display text-xs italic text-accent sm:text-sm md:text-base">
          Good Food <span className="px-1 text-primary">×</span> Great Vibes
        </span>
      </div>
    </section>
  );
}
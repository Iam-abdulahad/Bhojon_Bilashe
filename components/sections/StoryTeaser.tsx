import Link from "next/link";
import { Container, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { Sparkles, ArrowRight, Flame } from "lucide-react";

export function StoryTeaser() {
  return (
    <section className="section-pad relative overflow-hidden bg-bg" aria-label="Our heritage story teaser">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Visual Layer with Clip-path reveal */}
          <div className="relative lg:col-span-6">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-tr from-[#25130D] via-bg-elevated to-[#140D0B] shadow-2xl">
                {/* Decorative glowing culinary backdrop */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="relative mb-6 flex h-40 w-40 items-center justify-center rounded-full border border-accent/40 bg-radial from-primary/30 to-bg-elevated shadow-gold">
                    <span className="font-display text-5xl font-bold text-accent">ভ</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-cream">
                    Master of Charcoal & Spice
                  </p>
                  <p className="font-label text-xs tracking-widest text-primary mt-2">
                    ESTABLISHED 2012 · DHANMONDI
                  </p>
                </div>

                {/* Overlaid floating badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border/80 bg-bg/80 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cream">100% Charcoal Clay Tandoor</p>
                      <p className="text-[11px] text-muted">Never gas or induction. Pure hardwood flame.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Narrative Storytelling & Chef philosophy */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <SectionHeading
              align="left"
              eyebrow="OUR HERITAGE & ORIGIN"
              title="Where Generational Passion Meets Charcoal Fire"
              gradientWord={3}
              className="mb-0"
            />

            <Reveal delay={0.15}>
              <p className="text-base text-muted leading-relaxed">
                Founded over a decade ago in Dhanmondi, Bhojon Bilash began with a singular obsession: to resurrect the unhurried, wood-smoked culinary traditions of Old Dhaka and royal Mughal banquet halls.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-sm text-muted leading-relaxed">
                Every dawn, our master chefs pound whole whole spices in stone mortars, hand-marinate choice cuts in aged mustard oil, and slow-braise aromatic basmati rice in sealed copper degs over embers. No shortcuts, no compromises.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <Link href="/about">
                  <Button variant="primary" size="lg" className="shadow-glow gap-2">
                    Read Our Full Story <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-xs text-accent">
                  <Sparkles className="h-4 w-4" />
                  <span>Executive Chef A. Qader</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

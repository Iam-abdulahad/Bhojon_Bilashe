import { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Button } from "@/components/ui";
import { StatsSection } from "@/components/sections/StatsSection";
import { ChefHat } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Heritage & Story",
  description:
    "Discover the origin of Bhojon Bilash, our executive chef's philosophy of wood-fired clay cooking, and our 14-year culinary journey in Dhanmondi, Dhaka.",
};

const TIMELINE = [
  {
    year: "2012",
    title: "First Ember Ignited in Dhanmondi",
    description:
      "Opened our doors with a 6-table dining hall and two clay tandoor pits, dedicated exclusively to authentic wood-smoked biryanis.",
  },
  {
    year: "2016",
    title: "The Royal Rezala Perfection",
    description:
      "After hundreds of recipe trials, perfected our signature white cashew beef rezala, winning critical acclaim across Dhaka food critics.",
  },
  {
    year: "2020",
    title: "Crafting Generational Heritage",
    description:
      "Expanded our dining room into an intimate multi-level sanctuary while maintaining 100% charcoal wood-fire cooking.",
  },
  {
    year: "2026",
    title: "A Modern Culinary Icon",
    description:
      "Celebrating over 350,000 satisfied guests with an interactive dining experience and unmatched commitment to heritage taste.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="TRADITION UNCOMPROMISED"
          title="The Story Behind Bhojon Bilash"
          gradientWord={1}
          description="A love letter to authentic Bengali culinary heritage, wood-fired clay ovens, and the sacred ritual of slow-cooked dining."
        />

        {/* Narrative & Philosophy */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 mb-24">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
              “Good food demands patience, unhurried fire, and honest spices.”
            </h3>
            <p className="text-base text-muted leading-relaxed">
              In an era of microwaves and commercial shortcuts, Bhojon Bilash was created as an uncompromising temple to slow-cooking. We believe that true depth of flavor cannot be simulated.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Every dish that leaves our pass has been touched by genuine charcoal smoke, freshly ground spices pounded daily in stone mortars, and certified aged basmati rice. From the warmth of our greeting to the last spoonful of pistachio firni, every detail is engineered to make you feel like honored royalty.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/menu">
                <Button variant="primary">Explore What We Cook</Button>
              </Link>
              <Link href="/reservation">
                <Button variant="secondary">Book a Visit</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br from-[#2E160E] via-bg-elevated to-bg-soft p-8 flex flex-col justify-between shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="font-label text-xs text-primary">DHANMONDI KITCHEN PHILOSOPHY</span>
                <ChefHat className="h-6 w-6 text-accent" />
              </div>
              <div className="my-auto text-center py-6">
                <p className="font-display text-3xl font-bold text-cream">
                  “Fire. Spice. Soul.”
                </p>
                <p className="text-xs text-muted mt-2">
                  Hand-ground seasonings · No synthetic colors · 100% Halal
                </p>
              </div>
              <div className="flex justify-between text-xs text-muted border-t border-border/40 pt-4">
                <span>Hardwood Charcoal</span>
                <span>Pure Desi Ghee</span>
                <span>Clay Tandoor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-24">
          <StatsSection />
        </div>

        {/* Chef & Founder Profile */}
        <div className="rounded-2xl border border-border bg-bg-elevated p-8 sm:p-12 mb-24">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="h-36 w-36 rounded-full border-2 border-accent/50 bg-radial from-primary/30 to-bg-soft flex items-center justify-center shadow-gold mb-4">
                <ChefHat className="h-16 w-16 text-accent" />
              </div>
              <h4 className="font-display text-xl font-bold text-cream">Chef Abdul Qader</h4>
              <p className="font-label text-xs text-primary mt-1">EXECUTIVE MASTER CHEF</p>
              <p className="text-xs text-muted mt-1">28 Years of Mughlai Mastery</p>
            </div>

            <div className="md:col-span-8 space-y-4">
              <h3 className="font-display text-2xl font-bold text-cream">
                The Guardian of the Charcoal Flame
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Trained in the historic kitchen corridors of Old Dhaka and royal culinary houses, Chef Abdul Qader has spent nearly three decades mastering the art of heat distribution inside clay tandoors and copper degs.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                “When you smell our biryani, you are smelling the memories of centuries of celebratory feasts. We cook for the memory you will take home.”
              </p>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="font-label text-xs text-primary">OUR JOURNEY</span>
            <h3 className="font-display text-3xl font-bold text-cream mt-2">
              Milestones of Mastery
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="rounded-xl border border-border bg-bg-soft p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl font-extrabold text-accent">
                    {item.year}
                  </span>
                  <h4 className="font-display text-base font-bold text-cream mt-3 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

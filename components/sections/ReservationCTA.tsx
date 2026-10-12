import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { Calendar, Sparkles } from "lucide-react";

export function ReservationCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 bg-radial from-[#3A1E14] via-[#1E110C] to-[#0B0807] border-t border-border"
      aria-label="Table reservation call to action"
    >
      {/* Animated subtle pulsing glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/25 blur-[160px] animate-pulse"
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AN UNFORGETTABLE EVENING</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-cream mb-6">
            Your Table at Bhojon Bilash <br />
            <span className="text-gradient">Awaits You</span>
          </h2>

          <p className="prose-width mx-auto text-base sm:text-lg text-muted mb-10 leading-relaxed">
            From candle-lit intimate dinners to joyous family gatherings, let us host your next celebration with authentic hospitality and Michelin-inspired spices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/reservation">
              <Button size="lg" variant="primary" className="shadow-glow gap-2 px-8 py-4">
                <Calendar className="h-5 w-5" /> Book Your Table Online
              </Button>
            </Link>
            <Link href="tel:+8801700000000">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                Call Reception
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-xs text-muted">
            Instant SMS & Email confirmation · Free cancellation up to 2 hours prior
          </p>
        </div>
      </Container>
    </section>
  );
}

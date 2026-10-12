import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { UtensilsCrossed, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center pt-24 pb-16 bg-bg text-center text-cream">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-radial from-primary/20 to-bg-elevated text-primary shadow-glow">
            <UtensilsCrossed className="h-10 w-10 text-primary" />
          </div>

          <span className="font-label text-xs text-primary tracking-widest">
            ERROR 404
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream mt-2 mb-4">
            Recipe Not Found
          </h1>

          <p className="text-sm text-muted leading-relaxed mb-8">
            The culinary page you are seeking seems to have slipped off our kitchen pass. Let us escort you back to our dining room.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg" className="shadow-glow gap-2">
                <ArrowLeft className="h-4 w-4" /> Return to Homepage
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="secondary" size="lg">
                Explore The Menu
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

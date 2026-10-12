import { Hero, HeroMarquee } from "@/components/sections";
import { Container, Card, Button, Chip } from "@/components/ui";
import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { Sparkles, Calendar, Clock, MapPin } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Cinematic 3D Hero Section */}
      <Hero />

      {/* Marquee strip */}
      <HeroMarquee />

      {/* Signature Preview Teaser Section */}
      <section className="section-pad relative overflow-hidden bg-bg">
        <Container>
          <div className="mb-12 text-center">
            <span className="font-label text-xs tracking-widest text-primary">
              CHEF’S RECOMMENDATIONS
            </span>
            <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold text-cream">
              Taste the <span className="text-gradient">Masterpieces</span>
            </h2>
            <p className="prose-width mx-auto mt-4 text-sm md:text-base text-muted">
              Each recipe has been perfected through generations of slow cooking,
              aromatic smoke, and uncompromising spice blends.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {siteConfig.signatureDishes.slice(0, 3).map((dish) => (
              <Card key={dish.name} hover className="flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <Chip variant="chef">Signature</Chip>
                    <span className="font-display text-xl font-bold text-accent tabular-nums">
                      ৳{dish.price}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-cream mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-accent" /> Fresh Daily
                  </span>
                  <Link href="/menu">
                    <Button variant="ghost" size="sm" className="p-0 text-xs text-primary">
                      Order & Details →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/menu">
              <Button variant="secondary" size="lg">
                View Complete 20+ Dish Menu
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Quick Reservation Callout Section */}
      <section className="relative border-t border-border bg-bg-elevated py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="font-label text-xs text-accent">RESERVATION HOURS</p>
                <p className="font-display text-base text-cream">11:00 AM – 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="font-label text-xs text-accent">LOCATION</p>
                <p className="font-display text-base text-cream">Dhanmondi Rd 5, Dhaka</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <Link href="/reservation">
                <Button variant="primary" size="lg" className="shadow-glow">
                  <Calendar className="mr-2 h-4 w-4" /> Book a Table Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

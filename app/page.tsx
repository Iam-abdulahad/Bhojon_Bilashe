import { Hero, HeroMarquee, SignatureShowcase, MenuPreview } from "@/components/sections";
import { Container, Button } from "@/components/ui";
import { getMenuItems } from "@/lib/menu-service";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";

export default async function Home() {
  const dishes = await getMenuItems();

  return (
    <>
      {/* 1. Cinematic 3D Hero Section */}
      <Hero />

      {/* 2. Marquee strip */}
      <HeroMarquee />

      {/* 3. Pinned 3D Signature Showcase */}
      <SignatureShowcase dishes={dishes} />

      {/* 4. Menu Preview (top 6 dishes) */}
      <MenuPreview dishes={dishes} />

      {/* 5. Quick Reservation Callout Section */}
      <section className="relative border-t border-border bg-bg-elevated py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left items-center">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="font-label text-xs text-accent">OPENING HOURS</p>
                <p className="font-display text-base text-cream">Sat–Thu 11:00–23:00 · Fri 14:00–23:00</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="font-label text-xs text-accent">VISIT OUR DINING ROOM</p>
                <p className="font-display text-base text-cream">Dhanmondi Rd 5, Dhaka 1205</p>
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

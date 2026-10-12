import {
  Hero,
  HeroMarquee,
  SignatureShowcase,
  MenuPreview,
  ReviewsCarousel,
  ReservationCTA,
} from "@/components/sections";
import { Container } from "@/components/ui";
import { getMenuItems } from "@/lib/menu-service";
import { getFeaturedReviews } from "@/lib/reviews-service";
import { LiveOpenStatusBadge } from "@/components/ui/LiveOpenStatusBadge";
import { Clock, MapPin, Award } from "lucide-react";

export default async function Home() {
  const dishes = await getMenuItems();
  const reviews = await getFeaturedReviews();

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

      {/* 5. Guest Reviews & Testimonials Carousel */}
      <ReviewsCarousel reviews={reviews} />

      {/* 6. High-impact Reservation CTA Section */}
      <ReservationCTA />

      {/* 7. Quick Location & Hours Bar */}
      <section className="relative border-t border-border bg-bg-elevated py-12">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-center md:text-left items-center">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <LiveOpenStatusBadge />
                <p className="font-display text-sm text-cream mt-1">
                  Sat–Thu 11:00–23:00 · Fri 14:00–23:00
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="font-label text-xs text-accent">VISIT OUR DINING ROOM</p>
                <p className="font-display text-sm text-cream">
                  House 12, Road 5, Dhanmondi, Dhaka
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-herb/20 text-herb">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-label text-xs text-herb">EXCELLENCE AWARD</p>
                <p className="font-display text-sm text-cream">
                  Dhaka Best Heritage Dining 2026
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

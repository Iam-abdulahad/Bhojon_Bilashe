import {
  Hero,
  HeroMarquee,
  SignatureShowcase,
  MenuPreview,
  StoryTeaser,
  StatsSection,
  GalleryStrip,
  ReviewsCarousel,
  ReservationCTA,
} from "@/components/sections";
import { getMenuItems } from "@/lib/menu-service";
import { getFeaturedReviews } from "@/lib/reviews-service";

export default async function Home() {
  const dishes = await getMenuItems();
  const reviews = await getFeaturedReviews();

  return (
    <>
      {/* 1. Preloader (Mounted globally in RootLayout) */}

      {/* 2. Hero — 3D scene + headline */}
      <Hero />

      {/* 3. Marquee strip (cuisine keywords / awards) */}
      <HeroMarquee />

      {/* 4. Signature dishes (scroll-pinned 3D) */}
      <SignatureShowcase dishes={dishes} />

      {/* 5. Menu preview (top 6 dishes) */}
      <MenuPreview dishes={dishes} />

      {/* 6. Story teaser (parallax card + text reveal) */}
      <StoryTeaser />

      {/* 7. Stats counters (years open, dishes served, happy guests, awards) */}
      <StatsSection />

      {/* 8. Gallery strip (atmosphere & artistry preview) */}
      <GalleryStrip />

      {/* 9. Reviews carousel */}
      <ReviewsCarousel reviews={reviews} />

      {/* 10. Reservation CTA (full-width, animated background) */}
      <ReservationCTA />

      {/* 11. Footer (Mounted globally in RootLayout with hours, map, socials) */}
    </>
  );
}

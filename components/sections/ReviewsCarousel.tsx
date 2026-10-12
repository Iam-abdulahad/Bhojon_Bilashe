"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewData } from "@/lib/reviews-service";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";

interface ReviewsCarouselProps {
  reviews: ReviewData[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? reviews.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === reviews.length - 1 ? 0 : prevIdx + 1));
  };

  if (!reviews || reviews.length === 0) return null;

  const current = reviews[currentIndex];

  return (
    <section
      className="section-pad relative overflow-hidden bg-bg-elevated border-y border-border"
      aria-label="Customer reviews and dining testimonials"
    >
      {/* Decorative ambient quote in background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent/5">
        <Quote className="h-96 w-96" />
      </div>

      <Container>
        <SectionHeading
          eyebrow="GUEST EXPERIENCES"
          title="Stories From Our Diners"
          gradientWord={2}
          description="Hear what food lovers and Dhaka regulars have to say about their dining journeys at Bhojon Bilash."
        />

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center text-center px-4 sm:px-12"
            >
              {/* Star Rating Line */}
              <div className="mb-6 flex gap-1 text-accent">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Review Testimonial Body */}
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-normal leading-relaxed text-cream mb-8 italic">
                “{current.text}”
              </p>

              {/* Author & Source */}
              <div>
                <p className="font-display text-lg font-bold text-cream">
                  {current.author}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted mt-1">
                  <span className="text-primary font-semibold">{current.source}</span>
                  {current.date && <span>· {current.date}</span>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-soft text-cream transition-colors hover:border-cream/40 hover:bg-bg"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? "w-8 bg-accent" : "w-2 bg-border hover:bg-cream/40"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-soft text-cream transition-colors hover:border-cream/40 hover:bg-bg"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

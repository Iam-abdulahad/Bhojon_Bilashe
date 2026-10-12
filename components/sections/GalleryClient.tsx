"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeading } from "@/components/ui";
import { X, Eye, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: number;
  title: string;
  category: "Kitchen & Flame" | "Signature Dishes" | "Dining Ambience";
  type: "photo" | "video";
  emoji: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Clay Tandoor Charcoal Blaze", category: "Kitchen & Flame", type: "photo", emoji: "🔥", caption: "Live hardwood charcoal tandoor reaching 480°C." },
  { id: 2, title: "Smoked Kacchi Biryani Steaming", category: "Signature Dishes", type: "photo", emoji: "🍲", caption: "Copper deg opened tableside with fragrant cardamom steam." },
  { id: 3, title: "Dhanmondi Candlelit Room", category: "Dining Ambience", type: "photo", emoji: "🕯️", caption: "Warm moody dining room bathed in gentle candlelight." },
  { id: 4, title: "Charred Chicken Tikka Plating", category: "Signature Dishes", type: "photo", emoji: "🍗", caption: "Freshly skewered chicken thighs dusted with chaat masala." },
  { id: 5, title: "The Master Chef at the Pass", category: "Kitchen & Flame", type: "video", emoji: "👨‍🍳", caption: "Executive Chef Abdul Qader inspecting plate balance." },
  { id: 6, title: "Pistachio Firni in Clay Pots", category: "Signature Dishes", type: "photo", emoji: "🍮", caption: "Slow-chilled rice pudding with Iranian pistachios." },
  { id: 7, title: "Hand-Crushed Kasundi Mustard", category: "Kitchen & Flame", type: "photo", emoji: "🌿", caption: "Freshly ground pungent mustard for river prawn marinade." },
  { id: 8, title: "Tandoori Jumbo Prawn Platter", category: "Signature Dishes", type: "photo", emoji: "🦐", caption: "River king prawns with charred lime and mint raita." },
  { id: 9, title: "Private Dining Table Setup", category: "Dining Ambience", type: "photo", emoji: "🍷", caption: "Banquet setting for family and corporate celebrations." },
  { id: 10, title: "Live Bread Blistering", category: "Kitchen & Flame", type: "video", emoji: "🥖", caption: "Garlic butter naan slapped onto glowing clay walls." },
  { id: 11, title: "Royal Shahi Rezala Garnish", category: "Signature Dishes", type: "photo", emoji: "🥘", caption: "Mace, cashew rabri, and caramelized onions on beef." },
  { id: 12, title: "Evening Terrace View", category: "Dining Ambience", type: "photo", emoji: "✨", caption: "Golden hour view overlooking Dhanmondi." },
];

const CATEGORIES = ["All", "Kitchen & Flame", "Signature Dishes", "Dining Ambience"] as const;

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!activeLightbox) return;
      if (e.key === "Escape") setActiveLightbox(null);
      if (e.key === "ArrowRight") {
        const idx = filtered.findIndex((i) => i.id === activeLightbox.id);
        const next = filtered[(idx + 1) % filtered.length];
        setActiveLightbox(next);
      }
      if (e.key === "ArrowLeft") {
        const idx = filtered.findIndex((i) => i.id === activeLightbox.id);
        const prev = filtered[(idx - 1 + filtered.length) % filtered.length];
        setActiveLightbox(prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox, filtered]);

  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="A FEAST FOR THE EYES"
          title="The Bhojon Bilash Gallery"
          gradientWord={2}
          description="Immerse yourself in the glowing charcoal embers, artisanal copper degs, and warm dining room ambience of our Dhanmondi sanctuary."
        />

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-cream shadow-glow"
                  : "bg-bg-soft text-muted border border-border hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#2A1510] via-bg-elevated to-bg p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-glow hover:-translate-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-label text-[10px] text-accent tracking-wider">
                  {item.category}
                </span>
                {item.type === "video" ? (
                  <span className="flex items-center gap-1 text-[10px] text-primary">
                    <Video className="h-3.5 w-3.5" /> Video
                  </span>
                ) : (
                  <Eye className="h-4 w-4 text-muted group-hover:text-cream transition-colors" />
                )}
              </div>

              <div className="my-auto text-center">
                <span className="text-5xl filter drop-shadow group-hover:scale-125 transition-transform duration-300 inline-block">
                  {item.emoji}
                </span>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-cream group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="line-clamp-1 text-xs text-muted mt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setActiveLightbox(null)}
            >
              <div
                className="relative max-w-2xl w-full rounded-2xl border border-border bg-bg-elevated p-8 text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-border text-cream hover:bg-bg-soft"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="my-6">
                  <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-accent/40 bg-radial from-primary/30 to-bg-soft shadow-gold mb-6">
                    <span className="text-6xl">{activeLightbox.emoji}</span>
                  </div>
                  <span className="font-label text-xs text-primary">
                    {activeLightbox.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-2 mb-3">
                    {activeLightbox.title}
                  </h3>
                  <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                    {activeLightbox.caption}
                  </p>
                </div>

                {/* Lightbox Prev / Next */}
                <div className="flex justify-between items-center pt-4 border-t border-border/40 text-xs text-muted">
                  <span>Use ← → Arrow Keys to Browse</span>
                  <span className="font-mono text-accent">
                    {activeLightbox.id} / {filtered.length}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}

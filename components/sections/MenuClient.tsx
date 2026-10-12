"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, SlidersHorizontal, Sparkles } from "lucide-react";
import { Container, SectionHeading, DishCard } from "@/components/ui";
import { MenuItemData } from "@/lib/menu-service";

const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks", "Specials"] as const;

interface MenuClientProps {
  initialDishes: MenuItemData[];
}

export function MenuClient({ initialDishes }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  // Available unique tags
  const tags = useMemo(() => {
    const set = new Set<string>();
    initialDishes.forEach((d) => d.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [initialDishes]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return initialDishes.filter((dish) => {
      // Category filter
      if (activeCategory !== "All" && dish.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesIng = dish.ingredients?.some((i) =>
          i.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }

      // Tag filter
      if (selectedTag && !dish.tags.includes(selectedTag)) {
        return false;
      }

      // Price filter
      if (dish.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [initialDishes, activeCategory, searchQuery, selectedTag, maxPrice]);

  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="TRADITIONAL & REFINED"
          title="The Royal Bhojon Menu"
          gradientWord={2}
          description="Explore over twenty signature recipes crafted with generational mastery, aromatic charcoal smoke, and farm-fresh spices."
        />

        {/* Search & Secondary Filter Bar */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12 items-center">
          {/* Search Box */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. Biryani, Mutton, Saffron)..."
              className="w-full rounded-full border border-border bg-bg-soft pl-11 pr-4 py-3 text-sm text-cream placeholder-muted focus:border-accent focus:shadow-gold focus:outline-none transition-all"
            />
          </div>

          {/* Price Range Slider */}
          <div className="rounded-2xl border border-border bg-bg-soft px-5 py-2.5 md:col-span-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted">
              <SlidersHorizontal className="h-4 w-4 text-accent" />
              <span>Max Price:</span>
            </div>
            <input
              type="range"
              min="90"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <span className="font-display text-sm font-bold text-accent tabular-nums min-w-[50px] text-right">
              ৳{maxPrice}
            </span>
          </div>
        </div>

        {/* Animated Category Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 border-b border-border/80 pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive ? "text-cream" : "text-muted hover:text-cream"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Tag Filters (Veg, Spicy, Chef's Pick) */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full border px-3.5 py-1 text-xs font-label transition-colors ${
              selectedTag === null
                ? "border-accent bg-accent/15 text-accent"
                : "border-border text-muted hover:text-cream"
            }`}
          >
            All Tags
          </button>
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`flex items-center gap-1 rounded-full border px-3.5 py-1 text-xs font-label transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border text-muted hover:text-cream"
                }`}
              >
                {tag.toLowerCase().includes("spicy") && <Flame className="h-3 w-3" />}
                {tag.toLowerCase().includes("chef") && <Sparkles className="h-3 w-3" />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-muted">
          <span>
            Showing <strong className="text-cream">{filteredDishes.length}</strong> items
          </span>
          {(searchQuery || selectedTag || activeCategory !== "All" || maxPrice < 1500) && (
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setSelectedTag(null);
                setMaxPrice(1500);
              }}
              className="text-primary hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Grid of Dishes with Animated Layout */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.slug} dish={dish} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDishes.length === 0 && (
          <div className="rounded-2xl border border-border bg-bg-soft p-12 text-center my-12">
            <p className="font-display text-2xl text-cream mb-2">No dishes found</p>
            <p className="text-sm text-muted mb-6">
              Try adjusting your search keyword, category, or price ceiling.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setSelectedTag(null);
                setMaxPrice(1500);
              }}
              className="text-xs font-semibold text-primary underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

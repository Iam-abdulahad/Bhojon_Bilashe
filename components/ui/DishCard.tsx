"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { MenuItemData } from "@/lib/menu-service";
import { Box, Sparkles, Clock } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface DishCardProps {
  dish: MenuItemData;
}

export function DishCard({ dish }: DishCardProps) {
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // max +-6 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getTagVariant = (tag: string) => {
    if (tag.toLowerCase().includes("spicy")) return "spicy";
    if (tag.toLowerCase().includes("veg")) return "veg";
    if (tag.toLowerCase().includes("chef") || tag.toLowerCase().includes("signature")) return "chef";
    return "default";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col justify-between rounded-card border border-border bg-bg-elevated p-5 transition-shadow duration-300 hover:border-cream/20 hover:shadow-glow"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? undefined
          : {
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }
      }
      data-cursor-label="View"
    >
      <div>
        {/* Dish Visual Card Canvas / Fallback Banner */}
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-bg-soft via-[#2A1812] to-bg-elevated flex items-center justify-center">
          {/* Decorative food plate art preview */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-accent/30 bg-radial from-primary/30 to-bg-elevated shadow-gold transition-transform duration-500 ease-smooth group-hover:scale-105">
            <span className="font-display text-2xl font-bold text-accent">
              {dish.category === "Drinks" ? "🍸" : dish.category === "Desserts" ? "🍮" : "🍲"}
            </span>
          </div>

          {/* Quick Tag Overlays */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {dish.tags.slice(0, 2).map((tag) => (
              <Chip key={tag} variant={getTagVariant(tag)}>
                {tag}
              </Chip>
            ))}
          </div>

          {/* Preparation Time Badge */}
          {dish.preparationTime && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-bg/80 px-2.5 py-1 text-[10px] font-medium text-muted backdrop-blur-md">
              <Clock className="h-3 w-3 text-accent" />
              <span>{dish.preparationTime}</span>
            </div>
          )}
        </div>

        {/* Title & Price Line */}
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <Link href={`/menu/${dish.slug}`}>
            <h3 className="font-display text-lg font-bold text-cream transition-colors group-hover:text-accent">
              {dish.name}
            </h3>
          </Link>
          <span className="font-display text-xl font-bold text-accent tabular-nums shrink-0">
            ৳{dish.price}
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-xs text-muted leading-relaxed mb-4">
          {dish.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
        {dish.model3d ? (
          <Link href={`/menu/${dish.slug}`} className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-primary transition-colors">
            <Box className="h-3.5 w-3.5" />
            <span>Interactive 3D</span>
          </Link>
        ) : (
          <span className="text-[11px] text-muted flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-herb" /> Fresh Kitchen
          </span>
        )}

        <Link href={`/menu/${dish.slug}`}>
          <Button variant="ghost" size="sm" className="p-0 text-xs text-cream hover:text-accent">
            Details →
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

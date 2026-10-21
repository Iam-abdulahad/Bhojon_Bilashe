"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Chip } from "@/components/ui/Chip";
import { AddToOrderButton } from "@/components/order/AddToOrderButton";
import { MenuItemData } from "@/lib/menu-service";
import { ArrowUpRight, Box, Clock, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { getDishImage } from "@/lib/dish-images";

interface DishCardProps {
  dish: MenuItemData;
  priority?: boolean;
}

export function DishCard({ dish, priority = false }: DishCardProps) {
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
    <motion.article
      layout
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: prefersReduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-bg-elevated transition-[border-color,box-shadow] duration-300 hover:border-accent/35 hover:shadow-[0_18px_48px_rgba(0,0,0,0.32)]"
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
      <Link
        href={`/menu/${dish.slug}`}
        className="relative block aspect-[1.42/1] overflow-hidden bg-bg-soft"
        aria-label={`View ${dish.name} details`}
      >
        <Image
          src={getDishImage(dish)}
          alt={dish.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/10 to-transparent opacity-90" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {dish.tags.slice(0, 2).map((tag) => (
            <Chip key={tag} variant={getTagVariant(tag)} className="border-white/15 bg-bg/70 backdrop-blur-md">
              {tag}
            </Chip>
          ))}
        </div>
        {dish.preparationTime && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-[11px] font-medium text-cream backdrop-blur-md">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>{dish.preparationTime}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1.5 font-label text-[9px] tracking-[0.2em] text-accent">
              {dish.category}
            </p>
            <Link href={`/menu/${dish.slug}`} className="group/title">
              <h3 className="font-display text-lg font-bold leading-snug text-cream transition-colors group-hover/title:text-accent sm:text-xl">
                {dish.name}
              </h3>
            </Link>
          </div>
          <span className="shrink-0 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-display text-base font-bold text-accent tabular-nums">
            ৳{dish.price}
          </span>
        </div>

        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted">
          {dish.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/70 pt-4">
          {dish.model3d ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
              <Box className="h-3.5 w-3.5 text-accent" />
              3D dish view
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
              <Sparkles className="h-3.5 w-3.5 text-herb" />
              Fresh from our kitchen
            </span>
          )}
          <div className="flex items-center gap-2">
            <Link
              href={`/menu/${dish.slug}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-cream transition-colors hover:border-accent hover:text-accent"
              aria-label={`View ${dish.name} details`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <AddToOrderButton dish={dish} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

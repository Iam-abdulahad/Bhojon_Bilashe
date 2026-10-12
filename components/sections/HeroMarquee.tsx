import { Marquee } from "@/components/motion/Marquee";

const MARQUEE_ITEMS = [
  "SLOW-COOKED KACCHI BIRYANI",
  "★",
  "CHARCOAL TANDOOR SPECIALS",
  "★",
  "AUTHENTIC BENGALI CUISINE",
  "★",
  "FRESH GROUND SPICES DAILY",
  "★",
  "DHAKA'S HIGHEST RATED REZALA",
  "★",
  "LIVE CLAY OVEN COOKING",
  "★",
];

export function HeroMarquee() {
  return (
    <div className="relative border-y border-border/80 bg-bg-elevated/80 py-4 backdrop-blur-sm">
      <Marquee speed={40} className="text-xs md:text-sm font-label tracking-[0.25em] text-accent">
        {MARQUEE_ITEMS.map((item, index) => (
          <span
            key={index}
            className={item === "★" ? "text-primary" : "text-cream/90"}
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

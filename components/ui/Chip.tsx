import { cn } from "@/lib/utils";

type ChipVariant = "spicy" | "veg" | "chef" | "default";

interface ChipProps {
  variant?: ChipVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  spicy: "bg-primary/15 text-primary border-primary/20",
  veg: "bg-herb/15 text-herb border-herb/20",
  chef: "bg-accent/15 text-accent border-accent/20",
  default: "bg-cream/10 text-cream/80 border-cream/10",
};

const variantIcons: Record<ChipVariant, string> = {
  spicy: "🌶",
  veg: "🌱",
  chef: "⭐",
  default: "",
};

export function Chip({ variant = "default", children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1",
        "font-label text-[0.6875rem] tracking-[0.2em]",
        variantStyles[variant],
        className
      )}
    >
      {variantIcons[variant] && (
        <span className="text-xs" aria-hidden="true">
          {variantIcons[variant]}
        </span>
      )}
      {children}
    </span>
  );
}

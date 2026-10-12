import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

export function Card({
  children,
  className,
  hover = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-border bg-bg-elevated p-6",
        hover &&
          "transition-all duration-200 ease-smooth hover:scale-[1.03] hover:border-cream/20 hover:shadow-glow",
        className
      )}
    >
      {children}
    </Tag>
  );
}

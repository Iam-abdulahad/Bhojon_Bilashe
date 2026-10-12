import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Word index in the title to apply the gradient effect (0-based) */
  gradientWord?: number;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  gradientWord,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const words = title.split(" ");

  const renderedTitle = words.map((word, i) => {
    if (i === gradientWord) {
      return (
        <span key={i} className="text-gradient">
          {word}
        </span>
      );
    }
    return <span key={i}>{word}</span>;
  });

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="font-label mb-4 text-primary">{eyebrow}</p>
      )}
      <h2 className="font-display text-[length:var(--fs-h2)] font-bold leading-[1.1] text-cream">
        {renderedTitle.map((el, i) => (
          <span key={i}>
            {i > 0 && " "}
            {el}
          </span>
        ))}
      </h2>
      {description && (
        <p className="prose-width mx-auto mt-4 text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

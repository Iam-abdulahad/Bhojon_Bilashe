import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  /** Shape: "rect" (default), "circle", "text" */
  shape?: "rect" | "circle" | "text";
}

export function Skeleton({ className, shape = "rect" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-bg-soft",
        shape === "circle" && "aspect-square rounded-full",
        shape === "rect" && "rounded-card",
        shape === "text" && "h-4 rounded-md",
        className
      )}
    />
  );
}

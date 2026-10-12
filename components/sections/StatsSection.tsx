import { Container } from "@/components/ui";
import { Counter } from "@/components/motion/Counter";
import { Award, Utensils, HeartHandshake, Flame } from "lucide-react";

const STATS = [
  {
    target: 14,
    suffix: "+",
    label: "YEARS OF HERITAGE",
    description: "Serving Dhanmondi since 2012",
    icon: Flame,
  },
  {
    target: 350,
    suffix: "k+",
    label: "DISHES SERVED",
    description: "Biryanis & kebabs plated to perfection",
    icon: Utensils,
  },
  {
    target: 98,
    suffix: "%",
    label: "HAPPY DINERS",
    description: "Positive verified guest reviews",
    icon: HeartHandshake,
  },
  {
    target: 18,
    suffix: "",
    label: "CULINARY AWARDS",
    description: "Recognized across Bangladesh",
    icon: Award,
  },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-border bg-bg-elevated py-16" aria-label="Restaurant impact statistics">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-cream mb-1">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="font-label text-xs tracking-wider text-accent mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-muted max-w-[180px]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

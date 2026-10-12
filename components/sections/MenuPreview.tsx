import Link from "next/link";
import { Container, Button, SectionHeading, DishCard } from "@/components/ui";
import { MenuItemData } from "@/lib/menu-service";
import { ArrowRight } from "lucide-react";

interface MenuPreviewProps {
  dishes: MenuItemData[];
}

export function MenuPreview({ dishes }: MenuPreviewProps) {
  // Take top 6 dishes
  const previewDishes = dishes.slice(0, 6);

  return (
    <section className="section-pad relative bg-bg" aria-label="Menu highlights preview">
      <Container>
        <SectionHeading
          eyebrow="CULINARY EXCELLENCE"
          title="From Our Kitchen to Your Table"
          gradientWord={3}
          description="Explore our most celebrated recipes, prepared with authentic clay tandoor techniques and heritage spice blends."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewDishes.map((dish) => (
            <DishCard key={dish.slug} dish={dish} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/menu">
            <Button size="lg" variant="secondary" className="gap-2">
              Explore Full 20+ Dish Menu <ArrowRight className="h-4 w-4 text-accent" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

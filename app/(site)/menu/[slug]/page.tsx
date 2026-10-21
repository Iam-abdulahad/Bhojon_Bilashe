import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMenuItemBySlug, getMenuItems } from "@/lib/menu-service";
import { Container, Button, Chip, DishCard } from "@/components/ui";
import { DishOrbitViewer } from "@/components/three/DishOrbitViewer";
import { AddToOrderButton } from "@/components/order/AddToOrderButton";
import { siteConfig } from "@/data/site-config";
import { ArrowLeft, Clock, Flame, Calendar } from "lucide-react";

interface DishPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DishPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dish = await getMenuItemBySlug(slug);

  if (!dish) {
    return { title: "Dish Not Found" };
  }

  return {
    title: `${dish.name} — Signature Dish`,
    description: dish.description,
    openGraph: {
      title: `${dish.name} | ${siteConfig.name}`,
      description: dish.description,
      images: [{ url: dish.image }],
    },
  };
}

export default async function DishDetailPage({ params }: DishPageProps) {
  const { slug } = await params;
  const dish = await getMenuItemBySlug(slug);

  if (!dish) {
    notFound();
  }

  // Get related dishes in the same category
  const allDishes = await getMenuItems({ category: dish.category });
  const relatedDishes = allDishes
    .filter((d) => d.slug !== dish.slug)
    .slice(0, 3);

  // Schema.org Restaurant Menu Item JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: `${siteConfig.url}${dish.image}`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
    },
    suitableForDiet: dish.tags.includes("Vegetarian")
      ? "https://schema.org/VegetarianDiet"
      : undefined,
  };

  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
        <Container>
          {/* Back to Menu Navigation */}
          <div className="mb-6">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-cream transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Full Menu</span>
            </Link>
          </div>

          {/* Main Dish Showcase Grid */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 mb-20">
            {/* 3D Orbit Viewer Column */}
            <div className="relative h-[380px] sm:h-[480px] lg:h-[580px] w-full lg:col-span-7">
              <DishOrbitViewer modelUrl={dish.model3d} name={dish.name} />
            </div>

            {/* Dish Story, Details & CTAs */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-label text-xs text-primary">
                  {dish.category.toUpperCase()}
                </span>
                {dish.tags.map((tag) => (
                  <Chip key={tag} variant="chef">
                    {tag}
                  </Chip>
                ))}
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-cream">
                {dish.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-extrabold text-accent tabular-nums">
                  ৳{dish.price}
                </span>
                <span className="text-xs text-muted">All taxes included</span>
              </div>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {dish.description}
              </p>

              {/* Cooking Attributes */}
              <div className="grid grid-cols-2 gap-4 border-y border-border py-4">
                {dish.preparationTime && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-label text-[10px] text-muted">PREPARATION</p>
                      <p className="text-sm font-semibold text-cream">
                        {dish.preparationTime}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Flame className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-label text-[10px] text-muted">SPICE LEVEL</p>
                    <p className="text-sm font-semibold text-cream">
                      {"🌶️".repeat(dish.spiceLevel || 1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingredients Breakdown */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div>
                  <p className="font-label text-xs text-accent mb-2.5">
                    KEY INGREDIENTS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="rounded-lg border border-border bg-bg-soft px-3 py-1.5 text-xs text-cream/90"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <AddToOrderButton
                  dish={dish}
                  className="min-h-14 px-6 text-sm"
                />
                <Link href="/reservation">
                  <Button variant="primary" size="lg" className="shadow-glow gap-2">
                    <Calendar className="h-4 w-4" /> Reserve Table for Dining
                  </Button>
                </Link>
                <Link href={`tel:${siteConfig.contact.phone}`}>
                  <Button variant="secondary" size="lg">
                    Call to Order
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Dishes in Category */}
          {relatedDishes.length > 0 && (
            <div className="border-t border-border pt-16">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="font-label text-xs text-accent">MORE IN THIS CATEGORY</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mt-1">
                    You Might Also Relish
                  </h2>
                </div>
                <Link
                  href="/menu"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View All Menu Items →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedDishes.map((related) => (
                  <DishCard key={related.slug} dish={related} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

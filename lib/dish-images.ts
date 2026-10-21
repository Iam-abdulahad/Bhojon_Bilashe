import type { MenuItemData } from "@/lib/menu-service";

const FALLBACK_IMAGES: Record<MenuItemData["category"], string[]> = {
  Starters: ["/images/food/grill.webp", "/images/food/curry.webp"],
  Mains: ["/images/food/biryani.webp", "/images/food/curry.webp"],
  Desserts: ["/images/food/dessert.webp"],
  Drinks: ["/images/food/drinks.webp"],
  Specials: [
    "/images/food/grill.webp",
    "/images/food/biryani.webp",
    "/images/food/curry.webp",
  ],
};

export function getDishImage(
  dish: Pick<MenuItemData, "slug" | "category" | "image">
): string {
  if (!dish.image.startsWith("/images/dishes/")) {
    return dish.image;
  }

  const images = FALLBACK_IMAGES[dish.category];
  const stableIndex = [...dish.slug].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0
  );

  return images[stableIndex % images.length];
}

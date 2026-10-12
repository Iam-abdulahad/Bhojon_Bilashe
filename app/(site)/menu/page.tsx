import { Metadata } from "next";
import { getMenuItems } from "@/lib/menu-service";
import { MenuClient } from "@/components/sections/MenuClient";

export const metadata: Metadata = {
  title: "Menu & Specialties",
  description:
    "Explore the full menu of Bhojon Bilash: authentic Kacchi Biryani, tandoor grilled kebabs, rich Rezala, and Bengali desserts in Dhanmondi, Dhaka.",
};

export default async function MenuPage() {
  const dishes = await getMenuItems();
  return <MenuClient initialDishes={dishes} />;
}

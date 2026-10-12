import { Metadata } from "next";
import { GalleryClient } from "@/components/sections/GalleryClient";

export const metadata: Metadata = {
  title: "Photo & Video Gallery",
  description:
    "Explore the visual journey of Bhojon Bilash: our open clay tandoor, steaming biryani copper degs, and candle-lit Dhanmondi dining hall.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}

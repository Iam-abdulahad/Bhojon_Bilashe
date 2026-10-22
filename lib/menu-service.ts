import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/db";
import { MenuItem } from "@/models/MenuItem";

export interface MenuItemData {
  name: string;
  slug: string;
  description: string;
  category: "Starters" | "Mains" | "Desserts" | "Drinks" | "Specials";
  price: number;
  image: string;
  model3d?: string;
  tags: string[];
  isSignature: boolean;
  isAvailable: boolean;
  order: number;
  preparationTime?: string;
  spiceLevel?: number;
  calories?: number;
  ingredients?: string[];
}

function loadJsonFallback(): MenuItemData[] {
  try {
    const filePath = path.join(process.cwd(), "data", "menu.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (err) {
    console.error("Failed to read menu.json fallback:", err);
    throw new Error("Menu data is unavailable.", { cause: err });
  }
}

export async function getMenuItems(filters?: {
  category?: string;
  search?: string;
  tag?: string;
  isSignature?: boolean;
  maxPrice?: number;
}): Promise<MenuItemData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const query: Record<string, unknown> = { isAvailable: true };

      if (filters?.category && filters.category !== "All") {
        query.category = filters.category;
      }
      if (filters?.tag) {
        query.tags = filters.tag;
      }
      if (filters?.isSignature !== undefined) {
        query.isSignature = filters.isSignature;
      }
      if (filters?.maxPrice !== undefined) {
        query.price = { $lte: filters.maxPrice };
      }
      if (filters?.search) {
        const regex = new RegExp(filters.search, "i");
        query.$or = [{ name: regex }, { description: regex }];
      }

      const items = await MenuItem.find(query).sort({ order: 1, price: 1 }).lean();
      if (items && items.length > 0) {
        return items as unknown as MenuItemData[];
      }
    }
  } catch (err) {
    console.warn("Database lookup failed, falling back to local JSON data:", err);
  }

  // Graceful fallback to static JSON
  let items = loadJsonFallback();

  if (filters?.category && filters.category !== "All") {
    items = items.filter((item) => item.category === filters.category);
  }
  if (filters?.tag) {
    items = items.filter((item) => item.tags.includes(filters.tag!));
  }
  if (filters?.isSignature !== undefined) {
    items = items.filter((item) => item.isSignature === filters.isSignature);
  }
  if (filters?.maxPrice !== undefined) {
    items = items.filter((item) => item.price <= filters.maxPrice!);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    items = items.filter(
      (item) => item.name.toLowerCase().includes(s) || item.description.toLowerCase().includes(s)
    );
  }

  return items;
}

export async function getMenuItemBySlug(slug: string): Promise<MenuItemData | null> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const item = await MenuItem.findOne({ slug, isAvailable: true }).lean();
      if (item) return item as unknown as MenuItemData;
    }
  } catch (err) {
    console.warn("Database lookup by slug failed, using fallback:", err);
  }

  const items = loadJsonFallback();
  return items.find((item) => item.slug === slug) || null;
}

import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/db";
import { Review } from "@/models/Review";

export interface ReviewData {
  author: string;
  rating: number;
  text: string;
  source: string;
  avatar?: string;
  featured: boolean;
  date?: string;
}

export async function getFeaturedReviews(): Promise<ReviewData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbReviews = await Review.find({ featured: true }).lean();
      if (dbReviews && dbReviews.length > 0) {
        return dbReviews as unknown as ReviewData[];
      }
    }
  } catch (err) {
    console.warn("Reviews DB query failed, falling back to JSON:", err);
  }

  try {
    const jsonPath = path.join(process.cwd(), "data", "reviews.json");
    const raw = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading reviews.json:", err);
    throw new Error("Review data is unavailable.", { cause: err });
  }
}

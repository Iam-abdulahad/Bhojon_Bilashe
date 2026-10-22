import { NextResponse } from "next/server";
import { getFeaturedReviews } from "@/lib/reviews-service";

export async function GET() {
  try {
    const reviews = await getFeaturedReviews();
    return NextResponse.json({
      success: true,
      data: reviews,
      aggregateRating: {
        score: 4.9,
        totalReviews: 2460,
      },
    });
  } catch (error) {
    console.error("GET /api/reviews failed:", error);
    return NextResponse.json(
      { success: false, error: "We couldn't load guest reviews right now. Please try again later." },
      { status: 500 }
    );
  }
}

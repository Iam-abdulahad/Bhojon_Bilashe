import { NextRequest, NextResponse } from "next/server";
import { getMenuItems } from "@/lib/menu-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const isSignature = searchParams.has("isSignature")
      ? searchParams.get("isSignature") === "true"
      : undefined;
    const maxPrice = searchParams.has("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    const items = await getMenuItems({
      category,
      search,
      tag,
      isSignature,
      maxPrice,
    });

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("GET /api/menu failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

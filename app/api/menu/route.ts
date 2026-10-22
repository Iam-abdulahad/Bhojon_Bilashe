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

    if (maxPrice !== undefined && (!Number.isFinite(maxPrice) || maxPrice < 0)) {
      return NextResponse.json(
        { success: false, error: "Maximum price must be a valid non-negative number." },
        { status: 400 }
      );
    }

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
      { success: false, error: "We couldn't load the menu right now. Please refresh and try again." },
      { status: 500 }
    );
  }
}

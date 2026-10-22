import { NextRequest, NextResponse } from "next/server";
import { getMenuItemBySlug } from "@/lib/menu-service";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const item = await getMenuItemBySlug(slug);

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Dish not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("GET /api/menu/[slug] failed:", error);
    return NextResponse.json(
      { success: false, error: "We couldn't load this dish right now. Please return to the menu and try again." },
      { status: 500 }
    );
  }
}

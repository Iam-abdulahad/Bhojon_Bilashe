import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Reservation } from "@/models/Reservation";

// Standard dining slots
const ALL_TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const MAX_TABLES_PER_SLOT = 8;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date parameter is required (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    let bookedCounts: Record<string, number> = {};

    if (conn) {
      const existing = await Reservation.find({
        date,
        status: { $ne: "cancelled" },
      }).select("time");

      bookedCounts = existing.reduce((acc, curr) => {
        acc[curr.time] = (acc[curr.time] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    }

    // Determine availability for each slot
    const slots = ALL_TIME_SLOTS.map((time) => {
      const booked = bookedCounts[time] || 0;
      const remaining = Math.max(0, MAX_TABLES_PER_SLOT - booked);
      return {
        time,
        available: remaining > 0,
        remainingTables: remaining,
      };
    });

    return NextResponse.json({
      success: true,
      date,
      slots,
    });
  } catch (error) {
    console.error("GET /api/reservations/availability failed:", error);
    // Return all slots as available if database is temporarily offline
    return NextResponse.json({
      success: true,
      slots: ALL_TIME_SLOTS.map((time) => ({
        time,
        available: true,
        remainingTables: MAX_TABLES_PER_SLOT,
      })),
    });
  }
}

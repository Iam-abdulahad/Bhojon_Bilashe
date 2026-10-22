import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Reservation } from "@/models/Reservation";
import {
  MAX_TABLES_PER_SLOT,
  RESERVATION_TIME_SLOTS,
  getReservationDateError,
} from "@/lib/reservation-slots";
import { siteConfig } from "@/data/site-config";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Please choose a date to check table availability." },
        { status: 400 }
      );
    }

    const dateError = getReservationDateError(date);
    if (dateError) {
      return NextResponse.json({ success: false, error: dateError }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          error: `We can't check table availability right now. Please try again shortly or call us at ${siteConfig.contact.phone}.`,
        },
        { status: 503 }
      );
    }

    const existing = await Reservation.find({
      date,
      status: { $ne: "cancelled" },
    }).select("time");

    const bookedCounts = existing.reduce((acc, curr) => {
      acc[curr.time] = (acc[curr.time] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Determine availability for each slot
    const slots = RESERVATION_TIME_SLOTS.map((time) => {
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
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't load table availability. Please refresh and try again.",
      },
      { status: 500 }
    );
  }
}

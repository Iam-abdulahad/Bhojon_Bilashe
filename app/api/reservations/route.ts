import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Reservation } from "@/models/Reservation";
import { reservationSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    if (!checkRateLimit(ip, 8, 60)) {
      return NextResponse.json(
        { success: false, error: "Too many reservation requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json(
        { success: false, error: "Bot detected" },
        { status: 400 }
      );
    }

    // Zod validation
    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Save to database if connected
    const conn = await connectToDatabase();
    let savedId = `res_${Date.now()}`;

    if (conn) {
      const reservation = await Reservation.create({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        date: data.date,
        time: data.time,
        guests: data.guests,
        notes: data.notes || undefined,
        status: "confirmed",
      });
      savedId = reservation._id.toString();
    }

    // Dispatch email confirmation if email provided
    if (data.email) {
      await sendNotificationEmail({
        to: data.email,
        subject: `Your Table Reservation at Bhojon Bilash [${data.date}]`,
        html: `
          <h2>Table Confirmed at Bhojon Bilash</h2>
          <p>Dear ${data.name},</p>
          <p>We are delighted to confirm your dining reservation:</p>
          <ul>
            <li><strong>Date:</strong> ${data.date}</li>
            <li><strong>Time:</strong> ${data.time}</li>
            <li><strong>Guests:</strong> ${data.guests}</li>
            <li><strong>Confirmation Ref:</strong> ${savedId}</li>
          </ul>
          <p>Address: House 12, Road 5, Dhanmondi, Dhaka 1205</p>
          <p>Need to adjust? Call us at +880 1700-000000.</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Reservation confirmed successfully",
      reservationId: savedId,
      data: {
        name: data.name,
        date: data.date,
        time: data.time,
        guests: data.guests,
      },
    });
  } catch (error) {
    console.error("POST /api/reservations failed:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while confirming your reservation." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Reservation } from "@/models/Reservation";
import { reservationSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";
import {
  MAX_TABLES_PER_SLOT,
  RESERVATION_TIME_SLOTS,
  getReservationDateError,
} from "@/lib/reservation-slots";
import { siteConfig } from "@/data/site-config";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    if (!checkRateLimit(ip, 8, 60)) {
      return NextResponse.json(
        { success: false, error: "Too many reservation requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "We couldn't read your reservation details. Please review the form and try again." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Please submit your reservation details using the form." },
        { status: 400 }
      );
    }

    // Honeypot check
    if ("website" in body && body.website) {
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
          error: "Please correct the highlighted reservation details and try again.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const dateError = getReservationDateError(data.date);
    if (dateError) {
      return NextResponse.json(
        { success: false, error: dateError, details: { date: [dateError] } },
        { status: 400 }
      );
    }
    if (!RESERVATION_TIME_SLOTS.includes(data.time)) {
      const timeError = "Please choose one of the available dining times.";
      return NextResponse.json(
        { success: false, error: timeError, details: { time: [timeError] } },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          error: `We couldn't access the reservation system, so your table has not been booked. Please try again shortly or call us at ${siteConfig.contact.phone}.`,
        },
        { status: 503 }
      );
    }

    const bookedCount = await Reservation.countDocuments({
      date: data.date,
      time: data.time,
      status: { $ne: "cancelled" },
    });
    if (bookedCount >= MAX_TABLES_PER_SLOT) {
      return NextResponse.json(
        {
          success: false,
          error: "That time just filled up. Please choose another available time.",
          details: { time: ["This time is fully booked. Please choose another."] },
        },
        { status: 409 }
      );
    }

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
    const savedId = reservation._id.toString();

    // Dispatch email confirmation if email provided
    let warning: string | undefined;
    if (data.email) {
      const emailSent = await sendNotificationEmail({
        to: data.email,
        subject: `Your Table Reservation at Bhojon Bilash [${data.date}]`,
        html: `
          <h2>Table Confirmed at Bhojon Bilash</h2>
          <p>Dear ${escapeHtml(data.name)},</p>
          <p>We are delighted to confirm your dining reservation:</p>
          <ul>
            <li><strong>Date:</strong> ${data.date}</li>
            <li><strong>Time:</strong> ${data.time}</li>
            <li><strong>Guests:</strong> ${data.guests}</li>
            <li><strong>Confirmation Ref:</strong> ${savedId}</li>
          </ul>
          <p>Address: ${siteConfig.contact.address}</p>
          <p>Need to adjust? Call us at ${siteConfig.contact.phone}.</p>
        `,
      });
      if (!emailSent) {
        warning =
          "Your table is reserved, but we couldn't send the email receipt. Please save your booking reference and call us if you need help.";
      }
    }

    return NextResponse.json({
      success: true,
      message: "Reservation confirmed successfully",
      reservationId: savedId,
      warning,
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
      {
        success: false,
        error: `We couldn't complete your reservation right now. Please try again or call us at ${siteConfig.contact.phone}.`,
      },
      { status: 500 }
    );
  }
}

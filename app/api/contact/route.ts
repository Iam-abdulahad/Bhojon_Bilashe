import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    if (!checkRateLimit(ip, 5, 60)) {
      return NextResponse.json(
        { success: false, error: "Too many messages. Please try again later." },
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

    // Validation
    const parsed = contactSchema.safeParse(body);
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

    // Send admin notification
    await sendNotificationEmail({
      to: process.env.ADMIN_EMAIL || "hello@bhojonbilash.com",
      subject: `New Guest Message: ${data.subject} (${data.name})`,
      html: `
        <h3>Message from ${data.name}</h3>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4;padding:12px;">${data.message}</blockquote>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our team will respond shortly.",
    });
  } catch (error) {
    console.error("POST /api/contact failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

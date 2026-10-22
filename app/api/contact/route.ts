import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";
import { siteConfig } from "@/data/site-config";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    if (!checkRateLimit(ip, 5, 60)) {
      return NextResponse.json(
        { success: false, error: "Too many messages. Please try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "We couldn't read your message. Please review the form and try again." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Please submit your message using the contact form." },
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

    // Validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the highlighted contact details and try again.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Send admin notification
    const emailSent = await sendNotificationEmail({
      to: process.env.ADMIN_EMAIL || siteConfig.contact.email,
      subject: `New Guest Message: ${data.subject} (${data.name})`,
      html: `
        <h3>Message from ${escapeHtml(data.name)}</h3>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4;padding:12px;">${escapeHtml(data.message)}</blockquote>
      `,
    });

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          error: `We couldn't send your message right now. Please call ${siteConfig.contact.phone} or email ${siteConfig.contact.email}.`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our team will respond shortly.",
    });
  } catch (error) {
    console.error("POST /api/contact failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't send your message right now. Please try again or contact the restaurant by phone or email.",
      },
      { status: 500 }
    );
  }
}

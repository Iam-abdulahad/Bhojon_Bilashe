interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendNotificationEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const provider = process.env.EMAIL_PROVIDER || "console";

  if (provider === "resend" && process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "reservations@bhojonbilash.com",
          to,
          subject,
          html,
        }),
      });
      if (!res.ok) {
        console.error(`Resend email delivery failed with status ${res.status}.`);
      }
      return res.ok;
    } catch (err) {
      console.error("Resend delivery failed:", err);
      return false;
    }
  }

  if (provider === "console" && process.env.NODE_ENV !== "production") {
    console.info(`[EMAIL PREVIEW] ${subject} (recipient: ${to})`);
    return true;
  }

  if (provider === "resend") {
    console.error("Email delivery is not configured: RESEND_API_KEY is missing.");
  } else {
    console.error(
      `Email delivery is not configured for provider "${provider}". Use "resend" with RESEND_API_KEY.`
    );
  }
  return false;
}

export function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

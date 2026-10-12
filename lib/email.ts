interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendNotificationEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const provider = process.env.EMAIL_PROVIDER || "console"; // "resend" | "nodemailer" | "console"

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
      return res.ok;
    } catch (err) {
      console.error("Resend delivery failed:", err);
      return false;
    }
  }

  // Fallback: log to console during development/local usage
  console.log(`[EMAIL DISPATCH - Provider: ${provider}]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content:\n${html}`);
  return true;
}

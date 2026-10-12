import { z } from "zod";

export const reservationSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z
    .string()
    .min(1, "Time slot is required")
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:MM)"),
  guests: z
    .number({ invalid_type_error: "Number of guests is required" })
    .min(1, "At least 1 guest is required")
    .max(20, "For reservations over 20 guests, please contact us for private dining"),
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Name is too long"),
  phone: z
    .string()
    .min(8, "Valid phone number is required")
    .max(20, "Phone number is too long"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  notes: z.string().max(300, "Notes are capped at 300 characters").optional().or(z.literal("")),
  // Honeypot field for anti-spam bots
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

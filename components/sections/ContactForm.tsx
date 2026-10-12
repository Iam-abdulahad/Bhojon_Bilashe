"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { Button, Input, Textarea } from "@/components/ui";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        reset();
      } else {
        setApiError(data.error || "Failed to deliver message.");
      }
    } catch {
      setApiError("Network error. Please try calling us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-bg-elevated p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent mb-4" />
        <h3 className="font-display text-2xl font-bold text-cream mb-2">
          Message Received!
        </h3>
        <p className="text-sm text-muted mb-6">
          Thank you for reaching out to Bhojon Bilash. Our culinary and hospitality team will respond within 24 hours.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8 shadow-xl"
    >
      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {apiError && (
        <div className="flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 p-3.5 text-xs text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Your Name *" {...register("name")} error={errors.name?.message} />
        <Input label="Your Email *" type="email" {...register("email")} error={errors.email?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Phone / WhatsApp *" {...register("phone")} error={errors.phone?.message} />
        <Input label="Subject *" {...register("subject")} error={errors.subject?.message} />
      </div>

      <Textarea
        label="Your Message or Catering Inquiry *"
        {...register("message")}
        error={errors.message?.message}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        className="shadow-glow mt-2"
      >
        <Send className="mr-2 h-4 w-4" />
        {submitting ? "Sending Message..." : "Send Message"}
      </Button>
    </form>
  );
}

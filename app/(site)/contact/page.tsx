import { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/sections/ContactForm";
import { LiveOpenStatusBadge } from "@/components/ui/LiveOpenStatusBadge";
import { siteConfig } from "@/data/site-config";
import { Phone, MessageSquare, MapPin, Mail, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Find Bhojon Bilash in Dhanmondi, Dhaka. Get directions, view opening hours, call or WhatsApp our kitchen, and send inquiries.",
};

const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="FIND US IN DHANMONDI"
          title="Connect with Bhojon Bilash"
          gradientWord={2}
          description="Whether reserving a table, inquiring about catering, or looking for directions, our hospitality team is here to assist you."
        />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Direct channels & Live Hours status */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <LiveOpenStatusBadge />
              <h3 className="font-display text-2xl font-bold text-cream mt-4 mb-2">
                Visit Our Dining Room
              </h3>
              <p className="text-sm text-muted">
                Situated in prime Dhanmondi, offering valet parking, an open charcoal tandoor, and intimate family seating.
              </p>
            </div>

            {/* Quick Action Buttons: Click-to-call, WhatsApp, Directions */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center justify-between rounded-xl border border-border bg-bg-elevated p-4 text-cream transition-all hover:border-accent hover:bg-bg-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Call Reception</p>
                    <p className="font-display text-sm font-bold text-cream">
                      {siteConfig.contact.phone}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-accent">Call Now →</span>
              </a>

              <a
                href={
                  whatsappNumber
                    ? `https://wa.me/${whatsappNumber}`
                    : `tel:${siteConfig.contact.phone}`
                }
                target={whatsappNumber ? "_blank" : undefined}
                rel={whatsappNumber ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-xl border border-border bg-bg-elevated p-4 text-cream transition-all hover:border-herb hover:bg-bg-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-herb/20 text-herb">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">WhatsApp Concierge</p>
                    <p className="font-display text-sm font-bold text-cream">
                      {whatsappNumber || "WhatsApp unavailable — call reception"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-herb">
                  {whatsappNumber ? "Chat Live →" : "Call instead →"}
                </span>
              </a>

              <a
                href={siteConfig.contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-border bg-bg-elevated p-4 text-cream transition-all hover:border-primary hover:bg-bg-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Get Directions</p>
                    <p className="font-display text-sm font-bold text-cream">
                      Google Maps Navigation
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary">Directions →</span>
              </a>
            </div>

            {/* Address Details */}
            <div className="rounded-2xl border border-border bg-bg-elevated p-6 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-cream text-sm">Full Address</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-muted">{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form & Map Embed */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <ContactForm />

            {/* Embedded Responsive Map */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
              <iframe
                title="Bhojon Bilash Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.036944850785!2d90.3654!3d23.7461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a5555555%3A0x123456789abcdef!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1650000000000!5m2!1sen!2sbd"
                width="100%"
                height="320"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

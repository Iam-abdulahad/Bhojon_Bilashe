import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { UtensilsCrossed, Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated pt-16 pb-12 text-cream">
      <div className="container-content grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-bg-soft text-accent">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider text-cream">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-sm text-muted">
            {siteConfig.tagline} {siteConfig.description}
          </p>
          <div className="pt-2">
            <span className="font-label text-xs text-accent">FOLLOW OUR KITCHEN</span>
            <div className="mt-2 flex gap-4 text-sm text-muted">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Facebook
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-accent">Explore</h3>
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/menu" className="hover:text-cream transition-colors">
                Full Menu & Specialties
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-cream transition-colors">
                Book a Dining Table
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-cream transition-colors">
                Our Heritage & Chef Story
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-cream transition-colors">
                Atmosphere & Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cream transition-colors">
                Directions & Location
              </Link>
            </li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-accent flex items-center gap-2">
            <Clock className="h-4 w-4" /> Operating Hours
          </h3>
          <ul className="space-y-2 text-xs text-muted">
            {siteConfig.hours.map((h) => (
              <li key={h.day} className="flex justify-between border-b border-border/40 pb-1">
                <span>{h.day}</span>
                <span className="text-cream tabular-nums">
                  {h.open} – {h.close}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-accent">Find Us</h3>
          <div className="space-y-3 text-sm text-muted">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>{siteConfig.contact.address}</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-cream">
                {siteConfig.contact.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-herb" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-cream">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
          <div className="pt-2">
            <a
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      <div className="container-content mt-12 border-t border-border pt-6 text-center text-xs text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Crafted with authentic Bengali passion.
        </p>
      </div>
    </footer>
  );
}

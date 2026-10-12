import { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/sections/ContactForm";
import { Users, Sparkles, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Private Dining",
  description:
    "Host corporate dinners, birthday banquets, wedding feasts, and family gatherings with private dining and custom catering at Bhojon Bilash Dhanmondi.",
};

const PACKAGES = [
  {
    title: "The Royal Dawat",
    capacity: "15 – 35 Guests",
    price: "From ৳850 / person",
    description: "Multi-course feast featuring Smoked Kacchi Biryani, Chicken Tikka, Reshmi Kebab, and Pistachio Firni with dedicated waitstaff.",
    icon: Utensils,
  },
  {
    title: "Corporate Executive Dining",
    capacity: "10 – 25 Guests",
    price: "From ৳1,100 / person",
    description: "Private mezzanine setting with projector capabilities, customized appetizers, mixed grill platter, and specialty beverages.",
    icon: Users,
  },
  {
    title: "Grand Family Celebration",
    capacity: "25 – 60 Guests",
    price: "Custom Banquet Pricing",
    description: "Exclusive floor buyout with live clay tandoor showcase, personalized menu printing, and commemorative dessert display.",
    icon: Sparkles,
  },
];

export default function EventsPage() {
  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="BESPOKE CELEBRATIONS"
          title="Private Dining & Events"
          gradientWord={2}
          description="Celebrate your milestone moments in an atmosphere of candle-lit warmth, aromatic spices, and royal hospitality."
        />

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-bg-elevated p-8 flex flex-col justify-between transition-all duration-300 hover:border-accent hover:shadow-glow"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-cream mb-1">
                    {pkg.title}
                  </h3>
                  <p className="font-label text-xs text-primary mb-3">
                    {pkg.capacity} · {pkg.price}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquiry Form Section */}
        <div className="rounded-2xl border border-border bg-bg-elevated p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="font-label text-xs text-accent">GET IN TOUCH</span>
            <h3 className="font-display text-3xl font-bold text-cream mt-2 mb-3">
              Inquire About Your Event Date
            </h3>
            <p className="text-sm text-muted">
              Submit your desired date, guest count, and requirements below. Our event coordinator will contact you within 24 hours with a custom proposal.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

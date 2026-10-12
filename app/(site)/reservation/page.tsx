import { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { ReservationFlow } from "@/components/sections/ReservationFlow";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Book your table at Bhojon Bilash, Dhanmondi, Dhaka. Instant confirmation for family dining, corporate dinners, and special occasions.",
};

export default function ReservationPage() {
  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="AN INTIMATE DINING EXPERIENCE"
          title="Reserve Your Table"
          gradientWord={2}
          description="Join us for an unforgettable evening of slow-cooked biryanis, sizzling kebabs, and warm hospitality in the heart of Dhanmondi."
        />

        <ReservationFlow />
      </Container>
    </div>
  );
}

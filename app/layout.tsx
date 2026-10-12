import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, Preloader, FloatingReserveCTA } from "@/components/ui";
import { SmoothScrollProvider } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { RouteTransition } from "@/components/motion";
import { siteConfig } from "@/data/site-config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.meta.description,
  keywords: [
    "restaurant",
    "Bhojon Bilash",
    "Bangladeshi food",
    "kacchi biryani",
    "grilled meat",
    "Dhanmondi dinner",
    "fine dining Dhaka",
  ],
  authors: [{ name: "Bhojon Bilash Culinary Team" }],
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-cream selection:bg-primary/30 selection:text-cream">
        {/* Accessibility skip to main content */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Film grain texture overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Custom cursor (desktop non-touch only) */}
        <CustomCursor />

        {/* Branded initial preloader */}
        <Preloader />

        <SmoothScrollProvider>
          <Navbar />
          <RouteTransition>
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </RouteTransition>
          <Footer />
          <FloatingReserveCTA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

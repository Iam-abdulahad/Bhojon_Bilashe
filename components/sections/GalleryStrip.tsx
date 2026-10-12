import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { Eye, ArrowRight } from "lucide-react";

const GALLERY_PREVIEWS = [
  { id: 1, title: "Clay Oven Tandoori Roasting", category: "Kitchen Fire", icon: "🔥" },
  { id: 2, title: "Copper Deg Kacchi Plating", category: "Signature", icon: "🍲" },
  { id: 3, title: "Candlelit Dining Atmosphere", category: "Ambience", icon: "🕯️" },
  { id: 4, title: "Hand-Crushed Saffron & Herbs", category: "Heritage", icon: "🌿" },
  { id: 5, title: "Charred King Prawn Skewers", category: "Specials", icon: "🦐" },
  { id: 6, title: "Pistachio Firni Clay Pots", category: "Desserts", icon: "🍮" },
];

export function GalleryStrip() {

  return (
    <section className="section-pad relative overflow-hidden bg-bg" aria-label="Restaurant photo strip">
      <Container>
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <div>
            <span className="font-label text-xs tracking-widest text-primary">
              VISUAL FEAST
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mt-2">
              Atmosphere & Artistry
            </h2>
          </div>
          <Link href="/gallery" className="mt-4 sm:mt-0 text-xs font-semibold text-accent hover:text-primary transition-colors">
            View Complete Gallery →
          </Link>
        </div>

        {/* 6-Tile Gallery Strip with hover zoom and captions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GALLERY_PREVIEWS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-gradient-to-t from-bg-elevated to-bg-soft flex flex-col justify-between p-4 cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-glow"
            >
              <div className="flex justify-between items-start">
                <span className="font-label text-[9px] text-accent tracking-wider">
                  {item.category}
                </span>
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3.5 w-3.5 text-cream" />
                </span>
              </div>

              <div className="text-center my-auto">
                <span className="text-3xl filter drop-shadow group-hover:scale-125 transition-transform duration-300 inline-block">
                  {item.icon}
                </span>
              </div>

              <div>
                <p className="font-display text-xs font-bold text-cream group-hover:text-accent transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/gallery">
            <Button variant="secondary" size="lg" className="gap-2">
              Browse 20+ Photos & Videos <ArrowRight className="h-4 w-4 text-accent" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

import {
  Button,
  Chip,
  Card,
  Container,
  Input,
  Textarea,
  Select,
  SectionHeading,
  Skeleton,
} from "@/components/ui";

export default function DesignSystemPage() {
  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <SectionHeading
          eyebrow="DEVELOPMENT PREVIEW"
          title="Bhojon Bilash Design System"
          gradientWord={2}
          description="A visual audit of typography tokens, colors, base components, and form elements from Style.md."
        />

        {/* Color Palette Tokens */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold mb-6 text-accent">
            1. Color Tokens & Elevation
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="rounded-card p-4 border border-border bg-bg">
              <div className="h-12 w-full rounded bg-bg border border-border mb-2" />
              <p className="text-xs font-bold text-cream">--bg</p>
              <p className="text-[10px] text-muted">#0B0807</p>
            </div>
            <div className="rounded-card p-4 border border-border bg-bg-elevated">
              <div className="h-12 w-full rounded bg-bg-elevated border border-border mb-2" />
              <p className="text-xs font-bold text-cream">--bg-elevated</p>
              <p className="text-[10px] text-muted">#15100E</p>
            </div>
            <div className="rounded-card p-4 border border-border bg-bg-soft">
              <div className="h-12 w-full rounded bg-bg-soft border border-border mb-2" />
              <p className="text-xs font-bold text-cream">--bg-soft</p>
              <p className="text-[10px] text-muted">#1F1815</p>
            </div>
            <div className="rounded-card p-4 border border-border bg-bg-elevated">
              <div className="h-12 w-full rounded bg-primary mb-2 shadow-glow" />
              <p className="text-xs font-bold text-cream">--primary</p>
              <p className="text-[10px] text-muted">#E8532B</p>
            </div>
            <div className="rounded-card p-4 border border-border bg-bg-elevated">
              <div className="h-12 w-full rounded bg-accent mb-2 shadow-gold" />
              <p className="text-xs font-bold text-cream">--accent</p>
              <p className="text-[10px] text-muted">#F2B84B</p>
            </div>
            <div className="rounded-card p-4 border border-border bg-bg-elevated">
              <div className="h-12 w-full rounded bg-herb mb-2" />
              <p className="text-xs font-bold text-cream">--herb</p>
              <p className="text-[10px] text-muted">#7FA650</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold mb-6 text-accent">
            2. Button Variants & Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">Primary Sm</Button>
            <Button variant="primary" size="default">Primary Default</Button>
            <Button variant="primary" size="lg">Primary Lg (Glow)</Button>
            <Button variant="secondary" size="default">Secondary</Button>
            <Button variant="ghost" size="default">Ghost Action</Button>
          </div>
        </div>

        {/* Chips */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold mb-6 text-accent">
            3. Chips & Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            <Chip variant="spicy">Spicy (Chili)</Chip>
            <Chip variant="veg">Vegetarian</Chip>
            <Chip variant="chef">Chef’s Pick</Chip>
            <Chip variant="default">Gluten-Free</Chip>
          </div>
        </div>

        {/* Form Inputs with Floating Labels */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold mb-6 text-accent">
            4. Form Fields & Floating Labels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <Input label="Full Name" defaultValue="Abdul Ahad" />
            <Input label="Phone Number" placeholder="+880 1700..." />
            <Select
              label="Party Size"
              defaultValue="2"
              options={[
                { value: "1", label: "1 Guest" },
                { value: "2", label: "2 Guests (Table for 2)" },
                { value: "4", label: "4 Guests (Family Table)" },
                { value: "8", label: "8+ Guests (Private Dining)" },
              ]}
            />
            <Input label="Date of Visit" type="date" defaultValue="2026-10-15" />
            <div className="md:col-span-2">
              <Textarea label="Special Dietary Requirements / Requests" />
            </div>
          </div>
        </div>

        {/* Cards & Skeletons */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold mb-6 text-accent">
            5. Cards & Skeletons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover>
              <h4 className="font-display text-lg font-bold text-cream mb-2">Hover Lift Card</h4>
              <p className="text-sm text-muted">
                Elevated container with soft border, smooth scale hover, and warm tinted shadow.
              </p>
            </Card>
            <Card>
              <h4 className="font-display text-lg font-bold text-cream mb-2">Static Card</h4>
              <p className="text-sm text-muted">
                Standard content panel for menu items, reviews, or policy information.
              </p>
            </Card>
            <Card className="flex flex-col gap-3">
              <Skeleton shape="rect" className="h-6 w-3/4" />
              <Skeleton shape="text" className="w-full" />
              <Skeleton shape="text" className="w-1/2" />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

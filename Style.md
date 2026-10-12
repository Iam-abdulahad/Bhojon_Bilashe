# Style Guide — Local Restaurant Website

> Design direction: **"Cinematic Warmth"** — dark, moody, appetizing. Think candle-lit dining room meets high-end film title sequence. Rich colors, big type, slow elegant motion, glowing food.

---

## 1. Design Principles

1. **Food is the hero.** Every layout leaves room for imagery and 3D dishes to breathe.
2. **Motion with meaning.** Animation guides attention, never blocks action.
3. **Warm, not cold.** Colors, light, and shadows should feel like a dining room, not a tech startup.
4. **Big type, generous space.** Confident headlines, calm layouts.
5. **Action always reachable.** *Reserve* and *Order* are never more than one tap away.
6. **Graceful degradation.** Looks great without 3D, WebGL, or motion.

---

## 2. Color System

> Adjust the accent to match the restaurant's real branding. Defaults below suit warm, spice-forward cuisine.

### 2.1 Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0B0807` | Page background (near-black, warm) |
| `--bg-elevated` | `#15100E` | Cards, sections |
| `--bg-soft` | `#1F1815` | Hover surfaces, inputs |
| `--text` | `#F6EFE6` | Primary text (warm off-white) |
| `--text-muted` | `#B8A99A` | Secondary text |
| `--primary` | `#E8532B` | Chili red-orange — main CTAs, highlights |
| `--primary-hover` | `#FF6A3D` | CTA hover |
| `--accent` | `#F2B84B` | Saffron gold — prices, stars, badges |
| `--accent-green` | `#7FA650` | Herb green — veg tags, success |
| `--border` | `rgba(246,239,230,0.12)` | Hairlines |
| `--danger` | `#E5484D` | Errors |

### 2.2 Gradients & Glow

```css
--grad-fire:  linear-gradient(135deg, #E8532B 0%, #F2B84B 100%);
--grad-night: radial-gradient(ellipse at top, #2A1812 0%, #0B0807 70%);
--glow-primary: 0 0 40px rgba(232, 83, 43, 0.35);
--glow-accent:  0 0 30px rgba(242, 184, 75, 0.3);
```

### 2.3 Optional Light Theme
Cream `#FBF6EE` background, ink `#1A1210` text, same primary/accent. Use only if a theme toggle is built.

### 2.4 Contrast Rules
- Body text on `--bg`: ≥ 7:1 (AAA)
- `--primary` on `--bg` for buttons: use **white/cream text**, check ≥ 4.5:1
- Never place `--text-muted` on imagery without an overlay

---

## 3. Typography

| Role | Font (Google Fonts) | Weight | Notes |
|------|--------------------|--------|-------|
| **Display / Headings** | **Playfair Display** *(or Cormorant Garamond)* | 600–800 | Elegant serif, tight tracking |
| **Body / UI** | **Inter** *(or DM Sans)* | 400–600 | Highly legible |
| **Accent / Labels** | **Space Grotesk** or **Oswald** | 500 | Uppercase, wide tracking for eyebrows/tags |
| **Script (sparingly)** | **Caveat** / **Dancing Script** | 400 | Handwritten touches only |

Load with `next/font` (self-hosted, `display: swap`, subset to needed glyphs).

### 3.1 Type Scale (fluid)

```css
--fs-hero:   clamp(3.5rem, 9vw, 9rem);    /* line-height 0.95 */
--fs-h1:     clamp(2.5rem, 6vw, 5rem);    /* 1.05 */
--fs-h2:     clamp(2rem, 4vw, 3.25rem);   /* 1.1 */
--fs-h3:     clamp(1.5rem, 2.5vw, 2rem);  /* 1.2 */
--fs-body:   1.0625rem;                   /* 1.7 */
--fs-small:  0.875rem;                    /* 1.5 */
--fs-eyebrow:0.75rem;                     /* uppercase, letter-spacing .25em */
```

### 3.2 Rules
- Headlines: sentence case or Title Case; hero may be uppercase for impact
- Max line length for paragraphs: **65ch**
- Prices use accent color + tabular numerals (`font-variant-numeric: tabular-nums`)
- Highlight one word per headline in `--grad-fire` text gradient

---

## 4. Layout & Spacing

### 4.1 Grid
- Container max-width: `1280px` (content), `1536px` (wide sections), full-bleed for hero/gallery
- 12-column grid desktop, 4-column mobile, gutters `24px` / `16px`
- Section vertical padding: `clamp(5rem, 12vw, 10rem)`

### 4.2 Spacing Scale (4px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`

### 4.3 Breakpoints
| Name | Min width |
|------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### 4.4 Radius & Elevation
- Radius: `8px` inputs · `16px` cards · `24px` large panels · `999px` pills/buttons
- Shadows: soft + warm-tinted (`rgba(0,0,0,.5)`), glow for hover on key cards

---

## 5. Components

### 5.1 Buttons
| Type | Style |
|------|-------|
| **Primary** | `--primary` bg, cream text, pill, glow on hover, magnetic pull (≤ 12px) |
| **Secondary** | Transparent, 1px `--text` border, fills on hover |
| **Ghost / Link** | Underline that draws left→right on hover |
| **Floating CTA** | Fixed bottom-right "Reserve" button on mobile |

Min tap target **44×44px**. Focus ring: `2px solid --accent`, offset `3px`.

### 5.2 Navigation
- Transparent over hero → blurred dark glass (`backdrop-filter: blur(16px)`) after scroll
- Hide on scroll down, reveal on scroll up
- Mobile: fullscreen overlay menu, staggered link reveal, big serif links
- Always visible: logo, **Reserve** button

### 5.3 Menu Dish Card
- Image 4:5, rounded 16px, slight zoom on hover
- Tilt effect (±6°) following pointer (desktop)
- Name (serif), 2-line description (muted), price (accent), tag chips
- "View in 3D" icon button for supported dishes

### 5.4 Tags / Chips
Small pill, uppercase label font: 🌶 Spicy (primary tint) · 🌱 Veg (green tint) · ⭐ Chef's Pick (gold tint)

### 5.5 Forms
- Large inputs, `--bg-soft` fill, 1px border, floating labels
- Focus: border → `--accent` with soft glow
- Inline validation, clear error text in `--danger`
- Date/time pickers custom-styled to match theme

### 5.6 Reviews
Large quote marks in `--accent` at 20% opacity, gold star rating, author avatar, auto-advancing carousel with pause on hover.

### 5.7 Footer
Dark `--bg-elevated`, big serif brand wordmark, hours table, map link, socials, newsletter field.

---

## 6. Imagery & Iconography

- **Photography:** dark, moody, shallow depth of field, warm highlights, steam & texture visible. Consistent color grade across all images.
- **Overlays:** `linear-gradient(to top, rgba(11,8,7,.9), transparent)` on image text.
- **Video:** muted, looping, compressed, with poster image.
- **Icons:** Lucide or Phosphor, 1.5px stroke, rounded caps.
- **Texture:** subtle film grain overlay (opacity 4–6%) on hero and dark sections.
- Always use `next/image` with `sizes`, `placeholder="blur"`.

---

## 7. Motion System

### 7.1 Timing & Easing

```ts
export const ease = {
  smooth:  [0.22, 1, 0.36, 1],     // easeOutExpo-like — default entrances
  inOut:   [0.76, 0, 0.24, 1],     // page transitions
  bounce:  [0.34, 1.56, 0.64, 1],  // playful pops (sparingly)
};

export const duration = {
  micro: 0.2,   // hovers, taps
  base:  0.6,   // element reveals
  slow:  1.0,   // section reveals
  hero:  1.6,   // intro sequence
};
```

### 7.2 Standard Patterns

| Pattern | Spec |
|---------|------|
| **Text reveal** | Split by line/word, translateY 100% → 0 with mask, stagger `0.06s` |
| **Fade-up on scroll** | `y: 40 → 0`, `opacity: 0 → 1`, trigger at 85% viewport |
| **Image reveal** | Clip-path wipe + inner scale `1.2 → 1` |
| **Parallax** | Background layers move 10–25% slower than scroll |
| **Pinned sections** | GSAP ScrollTrigger pin for signature dishes, scrub 0.6 |
| **Marquee** | Infinite horizontal text strip, speed reacts to scroll velocity |
| **Hover** | Scale 1.03, lift shadow, 200ms |
| **Page transition** | Dark curtain wipe (600ms) with logo flash |
| **Cursor (desktop)** | Custom dot + ring; grows on interactive elements; "View" label on dish cards |
| **Counters** | Count-up on enter viewport |

### 7.3 Do & Don't
- ✅ One hero moment per section; keep the rest subtle
- ✅ Animate `transform` and `opacity` only (GPU-friendly)
- ✅ Respect `prefers-reduced-motion` → fade only, no parallax/pin/3D motion
- ❌ No autoplay sound
- ❌ Don't block scroll or navigation for long intro animations (max 2.5 s preloader)
- ❌ Don't animate layout-shifting properties (width/height/top/left)

---

## 8. 3D Style Guidelines

### 8.1 Scene Setup
- **Lighting:** warm key light (`#FFD9A8`, intensity 2), cool-red rim light (`#E8532B`, low), soft ambient 0.4
- **Environment:** dark studio HDRI (small, 256px) for reflections
- **Background:** transparent canvas over page gradient — blends with the page
- **Shadows:** soft contact shadow under dishes (`<ContactShadows />`)
- **Post-processing (desktop only):** subtle bloom + vignette; skip on mobile

### 8.2 Hero Scene Ideas
1. Rotating signature dish on a dark plate with rising steam particles
2. Floating ingredients (chili, herbs, spices) orbiting the dish, reacting to mouse
3. Slow camera dolly-in on scroll, dish "explodes" into ingredients at next section

### 8.3 Behavior
- Idle: gentle rotation + float (`sin` bob, amplitude ~0.05)
- Pointer: dish tilts toward cursor (damped, `lerp 0.08`)
- Scroll: camera/rotation tied to scroll progress
- Touch devices: gyroscope-free; drag to rotate in dish viewer
- Loading: show poster image → fade in canvas when ready

### 8.4 Performance
- `dpr={[1, 1.5]}`, `frameloop="demand"` when off-screen/idle
- Pause render when tab hidden or canvas not in viewport
- Draco-compressed GLB < 2 MB, textures ≤ 1024px
- Reduce particle count on mobile (e.g., 300 → 80)
- Fallback: `<Image>` poster or looping video

---

## 9. Tone of Voice & Microcopy

- **Personality:** warm, proud, inviting, a little playful
- **Hero headline examples:** "Taste the Tradition." · "Where Every Bite Tells a Story." · "Fire. Spice. Soul."
- **CTAs:** "Reserve Your Table" · "Explore the Menu" · "Order Now" · "Get Directions"
- **Empty/error states:** friendly ("Oops, our kitchen dropped that. Try again?")
- Keep sentences short; lead with sensory words (sizzling, slow-cooked, handmade, fresh)

---

## 10. Tailwind Config Starter

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0807",
        elevated: "#15100E",
        soft: "#1F1815",
        cream: "#F6EFE6",
        muted: "#B8A99A",
        primary: { DEFAULT: "#E8532B", hover: "#FF6A3D" },
        accent: "#F2B84B",
        herb: "#7FA650",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        label: ["var(--font-grotesk)", "sans-serif"],
      },
      borderRadius: { card: "16px", panel: "24px" },
      boxShadow: {
        glow: "0 0 40px rgba(232,83,43,0.35)",
        gold: "0 0 30px rgba(242,184,75,0.3)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

```css
/* globals.css */
:root {
  --bg: #0B0807;
  --text: #F6EFE6;
  --primary: #E8532B;
  --accent: #F2B84B;
}
html { background: var(--bg); color: var(--text); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 11. Suggested Project Structure

```
/app
  /(site)/page.tsx, menu/, reservation/, about/, gallery/, contact/
  /api/...
/components
  /ui          Button, Chip, Input, Card
  /sections    Hero, Signature, MenuPreview, Story, Reviews, CTA
  /three       Scene, DishModel, Particles, Environment
  /motion      Reveal, SplitText, Magnetic, Cursor, Marquee
/lib            animations.ts, db.ts, validations.ts
/public/models  *.glb   /public/images   /public/videos
```

---

## 12. QA Checklist

- [ ] Contrast checked (AA minimum) on all text/background pairs
- [ ] Works with JS-heavy features disabled (content readable, fallbacks shown)
- [ ] `prefers-reduced-motion` honored
- [ ] 3D lazy-loaded; mobile FPS tested on a mid-range device
- [ ] All images optimized with `next/image`; no layout shift
- [ ] Keyboard-only navigation works; focus states visible
- [ ] Lighthouse mobile: Perf ≥ 80, A11y ≥ 95, SEO ≥ 95

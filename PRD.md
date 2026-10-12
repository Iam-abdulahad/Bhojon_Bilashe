# PRD — Local Restaurant Website (Next.js, Animated + 3D)

> Working title: **[Restaurant Name] — Immersive Dining Website**
> Version: 1.0 · Status: Draft

---

## 1. Overview

A visually striking, animation-rich website for a popular local restaurant. The site should make visitors *hungry within five seconds*: cinematic hero, 3D food showcase, smooth scroll storytelling, and a frictionless path to **reserve a table**, **order**, or **get directions**.

### 1.1 Goals

| # | Goal | Success Metric |
|---|------|----------------|
| G1 | Create a memorable, premium first impression | Avg. session > 2:30 min |
| G2 | Drive table reservations | Reservation conversion ≥ 4% of visitors |
| G3 | Drive takeaway / delivery calls & orders | ≥ 8% click-through on Order/Call CTAs |
| G4 | Rank well in local search | Top 3 in "restaurant near me" for target area |
| G5 | Stay fast despite heavy visuals | Mobile LCP < 2.5s, 3D lazy-loaded |

### 1.2 Non-Goals (v1)

- Native mobile app
- Full POS integration
- Multi-branch franchise management (design for it, don't build it)

---

## 2. Target Users

| Persona | Needs |
|---------|-------|
| **Local regular** | Check menu/prices, opening hours, reserve fast |
| **Tourist / newcomer** | Discover signature dishes, reviews, location, photos |
| **Family / group organizer** | Book large tables, events, party packages |
| **Social-media visitor (mobile)** | Quick wow, quick action (call / map / order) |

---

## 3. Feature List

### 3.1 MVP (Must Have)

1. **Cinematic Hero**
   - Fullscreen 3D scene (rotating signature dish or floating ingredients) with steam/particle effects
   - Animated headline, primary CTAs: *Reserve a Table* · *View Menu*
2. **Interactive Menu**
   - Categories (Starters, Mains, Desserts, Drinks, Specials) with animated tab transitions
   - Dish cards: photo, name, description, price, tags (🌶 spicy, 🌱 veg, ⭐ chef's pick)
   - Search + filter (veg, spicy, price range)
   - Hover/tap → opens **3D dish viewer** (orbit, zoom) for signature items
3. **Signature Dishes Showcase**
   - Scroll-driven 3D section: dishes rotate/transition as the user scrolls
4. **Table Reservation**
   - Date, time, guests, name, phone, special requests
   - Real-time availability check, confirmation screen + email/SMS
5. **Our Story / About**
   - Scroll-triggered storytelling: origin, chef, philosophy, timeline
6. **Gallery**
   - Masonry grid with lightbox, parallax, video loop clips
7. **Location & Hours**
   - Embedded map, directions button, live "Open now / Closes at…" badge
8. **Contact**
   - Click-to-call, WhatsApp button, contact form
9. **Reviews / Testimonials**
   - Animated carousel of customer reviews, aggregate rating
10. **Responsive + Accessible**
    - Mobile-first, keyboard navigable, `prefers-reduced-motion` support
11. **SEO & Local SEO**
    - Metadata, Open Graph, `Restaurant` + `Menu` JSON-LD schema, sitemap

### 3.2 Should Have (v1.1)

- **Online ordering / takeaway cart** (with local payment options + cash on delivery)
- **Offers & Specials** banner with countdown timers
- **Events & Private Dining** page (birthdays, corporate, catering inquiry)
- **Bilingual support** (i18n — English + local language)
- **Admin dashboard** (manage menu, prices, photos, reservations, offers)
- **Newsletter / loyalty sign-up**
- **Instagram feed** embed

### 3.3 Nice to Have (Future)

- Virtual restaurant tour (360° / 3D walkthrough)
- AR "view dish on your table" (WebXR / model-viewer)
- Gift cards & vouchers
- Customer accounts, order history, favourites
- Live kitchen/queue status
- Dark / light theme toggle

---

## 4. Page Structure & Sitemap

```
/                    Home (hero, signature dishes, story teaser, gallery, reviews, CTA)
/menu                Full interactive menu
/menu/[slug]         Dish detail with 3D viewer (SEO page)
/reservation         Booking flow
/about               Story, chef, team
/gallery             Photos & videos
/events              Private dining, catering
/contact             Map, hours, form
/order               (v1.1) Online ordering
/admin               (v1.1) Protected dashboard
```

### Home Page Section Flow

1. Preloader (logo reveal animation)
2. Hero — 3D scene + headline
3. Marquee strip (cuisine keywords / awards)
4. Signature dishes (scroll-pinned 3D)
5. Menu preview (top 6 dishes)
6. Story teaser (parallax image + text reveal)
7. Stats counters (years open, dishes served, happy guests)
8. Gallery strip
9. Reviews carousel
10. Reservation CTA (full-width, animated background)
11. Footer (hours, map, socials, newsletter)

---

## 5. Animation & 3D Requirements

| Area | Requirement |
|------|-------------|
| **Hero 3D** | React Three Fiber scene: GLB dish model, floating spices/herbs, steam particles, subtle mouse-follow parallax |
| **Scroll** | Smooth scrolling (Lenis); GSAP ScrollTrigger for pinned sections, horizontal scroll, text reveals |
| **Page transitions** | Animated route transitions (Framer Motion) |
| **Micro-interactions** | Magnetic buttons, custom cursor (desktop), hover lifts, ripple on click |
| **Menu** | Layout animations when filtering; card tilt on hover |
| **Loading** | Branded preloader with progress; skeleton states |
| **Fallbacks** | Static image/video poster when WebGL unsupported, low-power device, or `prefers-reduced-motion` |

**3D Asset Rules**
- Format: `.glb` with Draco compression, **< 2 MB per model**
- Textures: WebP/KTX2, max 1024px for mobile
- Lazy-load 3D canvas (`next/dynamic`, `ssr: false`), load only when in viewport
- Cap device pixel ratio (`dpr={[1, 1.5]}`) and use `<Suspense>` + `useProgress`

---

## 6. Technical Requirements

### 6.1 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js (App Router)** + TypeScript |
| Styling | Tailwind CSS + CSS variables (design tokens) |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei`, (`@react-three/postprocessing` optional) |
| Animation | Framer Motion, GSAP + ScrollTrigger, Lenis |
| Forms | React Hook Form + Zod |
| Database | MongoDB (Mongoose) |
| Auth (admin) | NextAuth / Auth.js |
| Media | Cloudinary or Next/Image + CDN |
| Email/SMS | Resend / Nodemailer; SMS gateway of choice |
| Maps | Google Maps embed or Leaflet/Mapbox |
| Hosting | Vercel (or any Node host) |
| Analytics | Vercel Analytics / GA4 + Search Console |

### 6.2 Performance Budgets

| Metric | Target |
|--------|--------|
| LCP (mobile) | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| Initial JS (excluding 3D chunk) | < 200 KB gzip |
| Lighthouse (mobile) | Perf ≥ 80, A11y ≥ 95, SEO ≥ 95 |
| Animation FPS | 60 fps desktop, ≥ 30 fps low-end mobile |

### 6.3 Accessibility

- WCAG 2.1 AA contrast
- All animation respects `prefers-reduced-motion`
- 3D canvases have `aria-label` and are never the only way to access content
- Focus-visible styles, skip-to-content link, semantic HTML

### 6.4 Security & Privacy

- Server-side validation (Zod) on all forms
- Rate limiting + honeypot/captcha on reservation & contact
- Admin routes protected; role-based access
- Cookie/analytics consent where required

---

## 7. Data Models (Draft)

```ts
MenuItem {
  _id, name, slug, description, category, price,
  image, model3d?: string, tags: string[],
  isSignature: boolean, isAvailable: boolean, order: number
}

Reservation {
  _id, name, phone, email?, date, time, guests,
  notes?, status: 'pending' | 'confirmed' | 'cancelled', createdAt
}

Review { _id, author, rating, text, source?, featured: boolean }

Offer { _id, title, description, image, startsAt, endsAt, active }

Settings { openingHours[], address, phone, whatsapp, socials, mapCoords }
```

---

## 8. API Endpoints (Draft)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/menu` | List menu items (filter/search) |
| GET | `/api/menu/[slug]` | Single dish |
| POST | `/api/reservations` | Create reservation |
| GET | `/api/reservations/availability` | Slots for date |
| POST | `/api/contact` | Contact message |
| GET | `/api/reviews` | Featured reviews |
| *Admin* | `/api/admin/*` | CRUD for menu, offers, reservations |

---

## 9. Content & Asset Checklist

- [ ] Logo (SVG) and brand colors
- [ ] 10–20 professional food photos (high-res)
- [ ] 3–6 short looping videos (kitchen, plating, ambience) — < 3 MB each
- [ ] 3D models of 3–5 signature dishes (photogrammetry or artist-made)
- [ ] Final menu with prices
- [ ] Opening hours, address, phone, WhatsApp, social links
- [ ] Owner/chef bio and restaurant story
- [ ] Customer reviews (with permission)

---

## 10. Milestones

| Phase | Scope | Est. |
|-------|-------|------|
| **0 — Setup** | Repo, Next.js, Tailwind, design tokens, fonts, CI | 2 days |
| **1 — Foundation** | Layout, nav, footer, preloader, smooth scroll | 3 days |
| **2 — Hero & 3D** | R3F hero scene, signature showcase, fallbacks | 5–7 days |
| **3 — Menu** | Data, filters, dish pages, 3D viewer | 5 days |
| **4 — Reservation & Contact** | Forms, API, notifications | 4 days |
| **5 — Content pages** | About, gallery, reviews, events | 4 days |
| **6 — Polish** | Animation tuning, a11y, SEO, perf budgets | 5 days |
| **7 — Launch** | QA, domain, analytics, deploy | 2 days |
| **v1.1** | Admin dashboard, ordering, i18n | 2–3 weeks |

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Heavy 3D hurts mobile performance | Lazy-load, compress models, lower DPR, static fallback |
| No 3D assets available | Start with stylized/procedural 3D (floating shapes, ingredients) and swap in dish models later |
| Animation overload hurts usability | Animate with purpose; keep CTAs always reachable |
| Menu/prices change often | Admin dashboard (v1.1) or JSON/CMS-driven content from day one |
| Spam reservations | Validation, rate limit, captcha, confirmation step |

---

## 12. Open Questions

1. Restaurant name, cuisine, and brand personality?
2. Is online ordering needed at launch, or reservation + call only?
3. Which languages are required?
4. Are professional 3D dish models available, or should we start procedural?
5. Preferred payment/SMS providers?
6. Who will maintain menu updates after launch?

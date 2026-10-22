<div align="center">

# 🔥 Bhojon Bilash — *Taste the Tradition*

**A modern, animated restaurant website for a heritage Bengali grill & biryani house in Dhanmondi, Dhaka.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-bhojon--bilashe.vercel.app-e11d48?style=for-the-badge&logo=vercel&logoColor=white)](https://bhojon-bilashe.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[🌐 Live Site](https://bhojon-bilashe.vercel.app/) · [🍽️ Menu](https://bhojon-bilashe.vercel.app/menu) · [📖 Our Story](https://bhojon-bilashe.vercel.app/about) · [🖼️ Gallery](https://bhojon-bilashe.vercel.app/gallery) · [📞 Contact](https://bhojon-bilashe.vercel.app/contact)

</div>

---

## 📖 About the Project

**Bhojon Bilash** (ভোজন বিলাস) is a full-stack restaurant website built around one idea: *where fire meets spice and tradition meets taste.*

The restaurant, set in Dhanmondi, Dhaka, is positioned around slow-cooked **Kacchi Biryani**, charcoal **clay-tandoor grills**, and generational **Old Dhaka & Mughal-inspired recipes**. The website carries that story through cinematic scroll animations, a rich dish showcase, a full menu with dedicated dish pages, an online table reservation flow, and a contact system, all in a warm, heritage-inspired design.

> Built with the **Next.js App Router**, **TypeScript**, **Tailwind CSS 4**, and **MongoDB**, with smooth motion powered by **Framer Motion**, **GSAP**, and **Lenis**.

---

## ✨ Features

### 🎨 Experience & Design
- **Cinematic hero section** with a signature dish showcase, rating highlights and call-to-action buttons
- **Scrolling marquee** of kitchen highlights (Slow-Cooked Kacchi Biryani ★ Charcoal Tandoor Specials ★ Fresh Ground Spices Daily …)
- **Signature Creations carousel**: an interactive chef's selection with dish switching, ingredient tags and pricing
- **Animated counters** for heritage stats (years of heritage, dishes served, happy diners, awards)
- **Smooth scrolling** with Lenis and rich micro-interactions with Framer Motion & GSAP
- **Fully responsive** layout, mobile-first and polished on every screen size
- **Bilingual brand touch**: Bengali glyph (ভ) logo mark and English content
- **Accessible** structure with a skip-to-content link and semantic HTML

### 🍽️ Menu & Dishes
- Complete **menu page** organised by category: *Starters, Mains, Specials, Desserts*
- Dedicated **dish detail pages** (`/menu/[dish-slug]`) with story, ingredients, prep time and tags
- Dish badges such as **⭐ Chef's Pick**, **🌶 Spicy**, **🌱 Vegetarian**, **Gluten-Free**
- **Add to order** flow on dish cards
- Menu data can be served from **MongoDB** or from **checked-in JSON** when the database is unavailable

### 📅 Reservations & Contact
- **Online table reservation** form with validation (React Hook Form + Zod)
- Reservation API that **honestly reports errors** instead of pretending a booking was saved when the database is offline
- **Contact form** that delivers messages by email through **Resend**
- **WhatsApp** integration via a public WhatsApp number
- Opening hours, address, Google Maps link and social links (Facebook, Instagram, TikTok)

### 🔎 SEO & Performance
- Rich **metadata**, Open Graph and Twitter cards
- `next/image` optimisation for all dish photography
- Bundle analysis with `@next/bundle-analyzer`
- Type-safe end to end with TypeScript and Zod schemas

---

## 🥘 Signature Dishes

| Dish | Category | Price |
|------|----------|-------|
| 🍚 **Smoked Kacchi Biryani**, goat shank, chinigura rice, saffron, smoked mustard oil | Mains | ৳480 |
| 🍗 **Flame-Charred Chicken Tikka**, 18-spice overnight marinade, charcoal roasted | Starters | ৳380 |
| 🥩 **Royal Shahi Beef Rezala**, Mughlai white curry with cashew paste & kewra | Mains | ৳540 |
| 🦐 **Tandoori Jumbo River Prawns**, mustard, garlic & wild coriander, clay oven | Specials | ৳720 |
| 🍮 **Pistachio Saffron Firni**, cardamom rice pudding in earthen pots | Desserts | ৳190 |
| 🍢 **Sutli Kebab**, Old Dhaka minced beef kebab, flame-grilled | Starters | ৳320 |

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Framework** | Next.js 16 (App Router, Turbopack dev), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, `clsx`, `tailwind-merge` |
| **Animation** | Framer Motion, GSAP, Lenis (smooth scroll) |
| **3D** | Three.js, React Three Fiber, Drei |
| **Forms & Validation** | React Hook Form, Zod, `@hookform/resolvers` |
| **Database** | MongoDB with Mongoose |
| **Email** | Resend |
| **Icons** | Lucide React |
| **Tooling** | ESLint 9, Prettier, tsx, Bundle Analyzer |
| **Hosting** | Vercel |

---

## 📂 Project Structure

```bash
Bhojon_Bilashe/
├── app/                 # Next.js App Router: pages, layouts, API route handlers
├── components/          # Reusable UI & section components
├── data/                # Site config (site-config.ts) and checked-in menu/review JSON
├── lib/                 # Helpers, DB connection, utilities
├── models/              # Mongoose models
├── public/              # Static assets and dish images
├── scripts/             # Utility scripts (e.g. database seeding)
├── .env.example         # Environment variable template
├── PRD.md               # Product requirements document
├── Style.md             # Design system & style guide
├── ASSETS_TODO.md       # Image & asset checklist
├── AGENTS.md            # Guidance for AI coding agents
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── tsconfig.json
```

---

## 🗺️ Pages

| Route | Description |
|-------|-------------|
| `/` | Home: hero, signature dishes, story, gallery teaser, reviews, reservation CTA |
| `/menu` | Full menu with categories |
| `/menu/[slug]` | Individual dish page |
| `/about` | Our Story: heritage and chef |
| `/gallery` | Atmosphere & food gallery |
| `/reservation` | Book a table |
| `/contact` | Contact form, hours, directions |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20 or later
- **npm**
- A **MongoDB** database (local or Atlas), needed for reservations
- A **Resend** account, for contact-form emails in production

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Iam-abdulahad/Bhojon_Bilashe.git
cd Bhojon_Bilashe

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser. 🎉

> 💡 **Tip:** the menu and reviews can run from the checked-in JSON data when MongoDB is unavailable. **Reservations require a working MongoDB connection.**

### 🔐 Environment Variables

Create a `.env.local` file and fill in the following:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string. **Server-side only**, never prefix with `NEXT_PUBLIC_`. |
| `EMAIL_PROVIDER` | Use `resend` in production. `console` is a local preview only and does **not** deliver email. |
| `RESEND_API_KEY` | Required when `EMAIL_PROVIDER=resend`. |
| `EMAIL_FROM` | Sender address verified with Resend. |
| `ADMIN_EMAIL` | Destination address for contact-form messages. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Restaurant WhatsApp number, international format, digits only (public by design). |

Public business details (phone, address, site URL, WhatsApp) live in **`data/site-config.ts`**. Update them with real details before launch.

---

## 📜 Available Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server with Turbopack |
| `npm run build` | Create an optimised production build |
| `npm run start` | Run the production server |
| `npm run lint` | Lint the project with ESLint |
| `npm run seed` | Seed the menu collection in MongoDB |

> ⚠️ **Warning:** `npm run seed` **clears the existing menu collection** before inserting data. Never run it against a production database unless you intend to replace every menu record.

---

## ☁️ Deployment

This app must be deployed as a **Node.js Next.js app** (not a static export), because reservations and the contact form use server route handlers.

**Pre-deployment checklist**

```bash
npm run lint
npx tsc --noEmit
npm run build
```

1. Push the repo to GitHub and import it into **Vercel**.
2. Add all environment variables in the Vercel project settings.
3. Allow the deployed server to reach MongoDB in your **MongoDB Atlas network access** settings.
4. Verify the production domain, email sender, business details and WhatsApp number.

**Post-deployment smoke test** ✅
- [ ] Menu and dish pages load
- [ ] Reservation availability and booking work
- [ ] Contact-form email arrives
- [ ] Order-to-WhatsApp flow works
- [ ] Mobile layout looks right on the production domain

---

## 🛣️ Roadmap

- [ ] Full online ordering with cart and checkout
- [ ] Admin dashboard to manage menu, reservations and reviews
- [ ] Bengali / English language switcher
- [ ] Reservation confirmation via SMS
- [ ] Loyalty and offers section

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Md Ahad Ali**, MERN Stack / Full Stack Web Developer, Bangladesh 🇧🇩

[![GitHub](https://img.shields.io/badge/GitHub-Iam--abdulahad-181717?style=flat-square&logo=github)](https://github.com/Iam-abdulahad)

---

## 📄 License

Add a `LICENSE` file to specify how others may use this project.

---

<div align="center">

**Crafted with authentic Bengali passion** 🔥

If you like this project, please consider giving it a ⭐

</div>

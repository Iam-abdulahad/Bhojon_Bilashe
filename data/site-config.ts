/**
 * Site-wide configuration — single source of truth for all restaurant info.
 * No content is hardcoded in components; everything comes from here or the DB.
 */

export const siteConfig = {
  name: "Bhojon Bilash",
  tagline: "Taste the Tradition.",
  description:
    "Bhojon Bilash — where fire meets spice and tradition meets taste. Experience the finest grilled meats, biryanis, and Bengali cuisine in a warm, inviting atmosphere.",
  cuisine: "Traditional Bengali & Grilled Meats",
  url: "https://bhojonbilash.com",

  contact: {
    phone: "+880 1700-000000",
    whatsapp: "+8801700000000",
    email: "hello@bhojonbilash.com",
    address: "House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh",
    mapCoords: { lat: 23.7461, lng: 90.3742 },
    mapUrl: "https://maps.google.com/?q=23.7461,90.3742",
  },

  hours: [
    { day: "Saturday", open: "11:00", close: "23:00" },
    { day: "Sunday", open: "11:00", close: "23:00" },
    { day: "Monday", open: "11:00", close: "23:00" },
    { day: "Tuesday", open: "11:00", close: "23:00" },
    { day: "Wednesday", open: "11:00", close: "23:00" },
    { day: "Thursday", open: "11:00", close: "23:00" },
    { day: "Friday", open: "14:00", close: "23:00" },
  ],

  socials: {
    facebook: "https://facebook.com/bhojonbilash",
    instagram: "https://instagram.com/bhojonbilash",
    tiktok: "https://tiktok.com/@bhojonbilash",
  },

  languages: ["en"] as const,

  /** Signature dishes displayed on the homepage hero/showcase */
  signatureDishes: [
    {
      name: "Smoked Kacchi Biryani",
      description:
        "Slow-cooked aromatic rice layered with tender marinated goat, finished with a kiss of smoke and saffron.",
      price: 450,
    },
    {
      name: "Flame-Grilled Chicken Tikka",
      description:
        "Juicy chicken thighs marinated in 18 spices, charred over open flame and served sizzling.",
      price: 380,
    },
    {
      name: "Royal Beef Rezala",
      description:
        "A creamy, aromatic white curry with melt-in-your-mouth beef, cashews, and rose water.",
      price: 520,
    },
    {
      name: "Tandoori Jumbo Prawns",
      description:
        "Fresh river prawns marinated in mustard-turmeric paste, roasted in a clay tandoor until golden.",
      price: 680,
    },
    {
      name: "Firni with Pistachio",
      description:
        "Silky ground-rice pudding infused with cardamom and topped with crushed pistachios and gold leaf.",
      price: 180,
    },
  ],

  /** Meta tags */
  meta: {
    title: "Bhojon Bilash — Taste the Tradition",
    description:
      "Experience the finest Bengali cuisine and grilled meats at Bhojon Bilash, Dhanmondi, Dhaka. Reserve your table today.",
    ogImage: "/images/og-image.jpg",
  },
} as const;

export type SiteConfig = typeof siteConfig;

import { siteConfig } from "@/data/site-config";

export function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    image: [
      `${siteConfig.url}/opengraph-image`,
      `${siteConfig.url}/images/dishes/kacchi-biryani.webp`,
    ],
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    menu: `${siteConfig.url}/menu`,
    servesCuisine: [
      "Bengali",
      "Mughlai",
      "Biryani",
      "Tandoor Grill",
      "Kebab",
      "Halal",
    ],
    priceRange: "৳৳",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 12, Road 5",
      addressLocality: "Dhanmondi",
      addressRegion: "Dhaka",
      postalCode: "1205",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.mapCoords.lat,
      longitude: siteConfig.contact.mapCoords.lng,
    },
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [h.day],
      opens: h.open,
      closes: h.close,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2460",
      bestRating: "5",
      worstRating: "1",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/reservation`,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "FoodEstablishmentReservation",
        name: "Table Reservation",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

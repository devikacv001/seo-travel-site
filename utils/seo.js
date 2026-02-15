/**
 * SEO Configuration and Utilities
 * Centralized SEO settings for the Travel Guide application
 */

/* ===============================
   SITE CONFIG
================================ */
export const siteConfig = {
  siteName: "TravelGuide Pro",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultTitle:
    "TravelGuide Pro - Discover World's Best Travel Destinations",
  defaultDescription:
    "Explore comprehensive travel guides for destinations worldwide. Find the best places to visit, local attractions, travel tips, and expert recommendations for your next adventure.",
  defaultImage: "/images/og-default.jpg",
  twitterHandle: "@travelguidepro",
  locale: "en_US",
  type: "website",
};

/* ===============================
   META TAG GENERATOR
================================ */
export function generateMetaTags({
  title,
  description,
  image,
  url,
  type = "website",
  keywords = [],
  publishedTime,
  modifiedTime,
  author,
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.siteName}`
    : siteConfig.defaultTitle;

  const fullDescription =
    description || siteConfig.defaultDescription;

  const fullImage = image?.startsWith("http")
    ? image
    : `${siteConfig.siteUrl}${image || siteConfig.defaultImage}`;

  const fullUrl = url
    ? `${siteConfig.siteUrl}${url}`
    : siteConfig.siteUrl;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.join(", "),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      image: fullImage,
      url: fullUrl,
      type,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      image: fullImage,
      site: siteConfig.twitterHandle,
    },
    canonical: fullUrl,
  };
}

/* ===============================
   🔥 DESTINATION SCHEMA (UPGRADED)
================================ */
export function generateDestinationSchema(destination) {
  if (!destination) return null;

  const imageUrl = destination.image?.startsWith("http")
    ? destination.image
    : `${siteConfig.siteUrl}${destination.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",

    "@id": `${siteConfig.siteUrl}/destinations/${destination.slug}`,

    name: destination.name,
    description:
      destination.longDescription || destination.description,

    url: `${siteConfig.siteUrl}/destinations/${destination.slug}`,

    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },

    /* 🔥 BIG RANKING BOOST */
    mainEntity: {
      "@type": "TouristDestination",
      name: destination.name,
      description:
        destination.longDescription || destination.description,
    },

    address: destination.country
      ? {
          "@type": "PostalAddress",
          addressCountry: destination.country,
        }
      : undefined,

    geo: destination.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: destination.coordinates.lat,
          longitude: destination.coordinates.lng,
        }
      : undefined,

    aggregateRating: destination.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: destination.rating,
          reviewCount: destination.reviews || 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,

    touristType: [
      "Adventure travelers",
      "Family travelers",
      "Solo travelers",
      "Budget travelers",
      "Luxury travelers",
    ],

    /* 🔥 ATTRACTIONS SIGNAL */
    containsPlace:
      destination.bestPlaces?.map((p) => ({
        "@type": "TouristAttraction",
        name: p,
      })) || [],

    /* 🔥 COST SCHEMA */
    offers: destination.costPerDay
      ? {
          "@type": "Offer",
          price: destination.costPerDay,
          priceCurrency: "USD",
        }
      : undefined,

    publicAccess: true,
    isAccessibleForFree: true,
  };
}

/* ===============================
   BREADCRUMB SCHEMA
================================ */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}

/* ===============================
   WEBSITE SCHEMA
================================ */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          `${siteConfig.siteUrl}/destinations/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };
}

/* ===============================
   ORGANIZATION SCHEMA
================================ */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
  };
}

/* ===============================
   FAQ SCHEMA
================================ */
export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ===============================
   KEYWORDS
================================ */
export function generateKeywords(destination) {
  if (!destination) return [];

  return [
    destination.name,
    `${destination.name} travel guide`,
    `${destination.name} tourism`,
    `visit ${destination.name}`,
    `things to do in ${destination.name}`,
    `${destination.name} attractions`,
    `${destination.name} travel cost`,
  ];
}

/* ===============================
   SLUG HELPERS
================================ */
export function toSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function fromSlug(slug) {
  return slug
    .split("-")
    .map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
}

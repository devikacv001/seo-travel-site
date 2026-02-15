import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import SearchBox from "@/components/SearchBox";
import DestinationCard from "@/components/DestinationCard";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  siteConfig,
} from "@/utils/seo";

export default function Home({ popularDestinations = [] }) {
  const schemas = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "TravelFriend Global Destinations",
      description: siteConfig.defaultDescription,
      url: siteConfig.siteUrl,
    },
  ];

  return (
    <>
      <SEOHead
        title="TravelFriend | Explore Global Destinations"
        description="Discover beautiful travel destinations around the world with smart SEO travel guides."
        url="/"
        schemas={schemas}
      />

      {/* ROOT CONTAINER */}
      <div className="min-h-screen text-white relative overflow-visible">

        {/* BACKGROUND GLOW (SAFE LAYER) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px]" />
          <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-indigo-500/20 blur-[140px]" />
        </div>

        {/* HERO */}
        <section className="relative z-20 max-w-6xl mx-auto px-4 pt-24 pb-16 text-center">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-6xl mb-6">✈️</div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              TravelFriend
              <span className="block text-cyan-400">
                Explore The World
              </span>
            </h1>

            <p className="text-gray-300 text-lg mt-5 max-w-2xl mx-auto">
              Discover global destinations with smart travel guides, best places,
              and daily travel costs — all dynamically generated.
            </p>
          </motion.div>

          {/* SEARCH BOX (TOP LAYER) */}
          <div
            className="
            mt-10
            backdrop-blur-xl
            bg-white/5
            border border-white/10
            rounded-3xl
            p-6
            shadow-[0_0_60px_rgba(0,255,255,0.08)]
            relative
            z-50
            "
            style={{ isolation: "isolate" }}
          >
            <SearchBox
              size="large"
              placeholder="Search destinations... (Paris, Tokyo, Goa)"
              showSuggestions={true}
            />
          </div>
        </section>

        {/* DESTINATION GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {popularDestinations.length > 0 ? (
              popularDestinations.map((place) => (
                <DestinationCard key={place.slug} place={place} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-400">
                No destinations found.
              </p>
            )}
          </div>
        </section>

      </div>
    </>
  );
}

/* =========================
   SSR DATA
========================= */
export async function getServerSideProps(context) {
  try {
    const protocol =
      context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(
      `${baseUrl}/api/search?type=popular`
    );

    const result = await response.json();

    return {
      props: {
        popularDestinations: result?.data || [],
      },
    };
  } catch {
    return {
      props: {
        popularDestinations: [],
      },
    };
  }
}

import Link from "next/link";
import SEOHead from "@/components/SEOHead";
import { handleImgError, resolvePlaceImage } from "@/utils/images";
import {
  generateBreadcrumbSchema,
  generateDestinationSchema,
  siteConfig,
  fromSlug,
} from "@/utils/seo";

export default function DestinationPage({ place, searchTerm }) {

  /* ===============================
     NOT FOUND STATE
  ============================== */
  if (!place) {
    return (
      <>
        <SEOHead
          title={`"${searchTerm}" - Destination Not Found`}
          description={`No travel info found for "${searchTerm}".`}
          noindex={true}
        />

        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="glass p-8 text-center max-w-lg">
            <h1 className="text-2xl font-bold mb-3">
              Destination not found
            </h1>

            <p className="text-white/70 mb-6">
              We couldn&apos;t find information for <b>{searchTerm}</b>
            </p>

            <Link
              href="/"
              className="px-5 py-3 rounded-xl bg-cyan-400 text-black font-bold"
            >
              Back Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  const heroImage = resolvePlaceImage(place.image);

  const schemas = [
    generateDestinationSchema(place),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: place.name, url: `/destinations/${place.slug}` },
    ]),
  ];

  /* SAFE FALLBACKS */
  const keywordTitle =
    place.keywordTitle || `${place.name} Travel Guide`;

  const bestPlaces =
    place.bestPlaces?.length > 0
      ? place.bestPlaces
      : ["Top attractions", "Local highlights", "Must visit spots"];

  const cost =
    place.costPerDay || "Cost information not available";

  return (
    <>
      <SEOHead
        title={`${place.name} Travel Guide`}
        description={place.description}
        image={heroImage}
        url={`/destinations/${place.slug}`}
        schemas={schemas}
        canonical={`${siteConfig.siteUrl}/destinations/${place.slug}`}
      />

      <article className="min-h-screen text-white">

        {/* ===============================
           HERO SECTION
        ============================== */}
        <header className="relative h-[65vh] overflow-hidden">
          <img
            src={heroImage}
            onError={handleImgError}
            alt={place.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-black/40 to-transparent" />

          <div className="absolute bottom-12 left-0 right-0">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-black">
                {place.name} Travel Guide
              </h1>

              <p className="mt-4 text-lg text-white/85 max-w-3xl">
                {place.description}
              </p>
            </div>
          </div>
        </header>

        {/* ===============================
           CONTENT
        ============================== */}
        <main className="max-w-6xl mx-auto px-4 py-14 space-y-8">

          {/* KEYWORD TITLE */}
          <section className="glass p-7">
            <h2 className="text-2xl font-bold text-cyan-400">
              📌 Keyword Title
            </h2>

            <p className="mt-3 text-white/80">
              {keywordTitle}
            </p>
          </section>

          {/* BEST PLACES */}
          <section className="glass p-7">
            <h2 className="text-2xl font-bold text-cyan-400">
              🌄 Best Places to Visit
            </h2>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bestPlaces.map((p, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                >
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* COST */}
          <section className="glass p-7">
            <h2 className="text-2xl font-bold text-cyan-400">
              💰 Average Cost Per Day
            </h2>

            <p className="mt-3 text-white/80">
              {cost}
            </p>
          </section>

          {/* ABOUT */}
          <section className="glass p-7">
            <h2 className="text-2xl font-bold">
              About {place.name}
            </h2>

            <p className="mt-3 text-white/75 leading-relaxed">
              {place.longDescription || place.description}
            </p>
          </section>

        </main>
      </article>
    </>
  );
}

/* ===============================
   SSR DATA FETCH
=============================== */
export async function getServerSideProps(context) {
  const { slug } = context.params;
  const searchTerm = fromSlug(slug);

  try {
    const protocol =
      context.req.headers["x-forwarded-proto"] || "http";

    const host = context.req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(
      `${baseUrl}/api/search?q=${encodeURIComponent(slug)}`
    );

    const result = await response.json();

    return {
      props: {
        place: result?.data || null,
        searchTerm,
      },
    };
  } catch {
    return {
      props: {
        place: null,
        searchTerm,
      },
    };
  }
}

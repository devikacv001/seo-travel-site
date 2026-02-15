import Link from "next/link";

export default function RelatedItems({ items, title = "Related Destinations" }) {
  if (!items?.length) return null;

  return (
    <section aria-label={title} className="mt-12 relative z-0">

      {/* TITLE */}
      <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-6">
        {title}
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/destinations/${item.slug}`}
            className="
            glass
            glass-hover
            px-5 py-4
            flex items-center justify-between
            transition-all duration-300
            group
            relative
            z-0
            "
          >
            <div>
              <div className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                {item.name}
              </div>

              {item.country && (
                <div className="text-xs text-white/60 mt-1">
                  {item.country}
                </div>
              )}
            </div>

            <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

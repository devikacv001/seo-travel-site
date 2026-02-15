import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Popular Destinations", href: "/#destinations" },
  ];

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* MAIN FOOTER */}
        <div className="glass px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row justify-between gap-10">

          {/* BRAND */}
          <div className="max-w-md">
            <h2 className="text-2xl font-black tracking-tight text-white">
              TravelFriend
              <span className="text-cyan-400">.</span>
            </h2>

            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Discover global travel destinations with dynamic SEO-powered guides,
              real-time search and cinematic experiences built using Next.js SSR.
            </p>
          </div>

          {/* NAV LINKS */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                text-sm font-semibold
                text-white/70
                hover:text-cyan-300
                transition-colors duration-300
                "
              >
                {link.name}
              </Link>
            ))}
          </nav>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {currentYear} TravelFriend. All rights reserved.</span>
          <span>Next.js • SSR • Programmatic SEO</span>
        </div>

      </div>
    </footer>
  );
}

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const slug = searchQuery.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/destinations/${slug}`);

    setSearchQuery("");
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="
      sticky top-0
      backdrop-blur-xl
      border-b border-white/10
      z-50
      "
      style={{ isolation: "isolate" }} // ⭐ stacking fix
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* NAVBAR */}
        <div className="glass px-5 sm:px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              ✈️
            </span>

            <div className="leading-tight">
              <div className="text-[11px] tracking-[0.25em] uppercase text-white/50">
                Travel Platform
              </div>

              <div className="font-black text-lg text-white">
                TravelFriend
                <span className="ml-1 text-cyan-400">.</span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              href="/"
              className={`text-sm font-semibold transition ${
                router.pathname === "/"
                  ? "text-cyan-400"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="
                w-56 lg:w-72
                px-4 py-2.5 pl-10
                text-sm rounded-2xl
                bg-white/5 border border-white/10
                text-white placeholder:text-white/30
                focus:outline-none
                focus:ring-2 focus:ring-cyan-400/40
                transition
                "
              />

              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {/* CTA BUTTON */}
            <Link
              href="/destinations/paris"
              className="
              inline-flex items-center gap-2
              rounded-2xl px-4 py-2.5
              text-sm font-bold
              text-black
              bg-cyan-400
              shadow-[0_0_28px_rgba(38,247,255,0.25)]
              hover:shadow-[0_0_40px_rgba(38,247,255,0.35)]
              transition
              "
            >
              Explore →
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/10 text-white/70"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="mt-3 glass p-4 md:hidden">

            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="
                w-full px-4 py-3
                text-sm rounded-2xl
                bg-white/5 border border-white/10
                text-white placeholder:text-white/30
                focus:outline-none
                focus:ring-2 focus:ring-cyan-400/40
                "
              />
            </form>

            <Link
              href="/"
              className="px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 rounded-2xl block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

          </div>
        )}

      </div>
    </header>
  );
}

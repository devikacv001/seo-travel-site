import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

/* ===============================
   SMART QUERY CLEANER
================================ */
function extractLocation(query) {
  const text = query.toLowerCase();

  const phrases = [
    "best places to visit in",
    "places to visit in",
    "things to do in",
    "travel guide for",
    "trip to",
    "tourism in",
    "visit",
  ];

  let result = text;

  phrases.forEach((p) => {
    result = result.replace(p, "");
  });

  return result.trim();
}

export default function SearchBox({
  size = "large",
  placeholder = "Search any destination...",
  showSuggestions = true,
  autoFocus = false,
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);

  const popularDestinations = [
    { name: "Paris, France", slug: "paris", emoji: "🗼" },
    { name: "Tokyo, Japan", slug: "tokyo", emoji: "🗾" },
    { name: "New York, USA", slug: "new-york", emoji: "🗽" },
    { name: "Dubai, UAE", slug: "dubai", emoji: "🏙️" },
    { name: "Goa, India", slug: "goa", emoji: "🏖️" },
  ];

  /* LOAD RECENTS */
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveSearch = (searchTerm) => {
    const updated = [
      searchTerm,
      ...recentSearches.filter((s) => s !== searchTerm),
    ].slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const cleaned = extractLocation(query);
    const slug = cleaned.replace(/\s+/g, "-");

    saveSearch(cleaned);
    setIsOpen(false);

    router.push(`/destinations/${slug}`);
  };

  const handleSuggestionClick = (dest) => {
    saveSearch(dest.name);
    setIsOpen(false);
    router.push(`/destinations/${dest.slug}`);
  };

  const sizeClasses = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-5 text-base",
    large: "py-4 px-6 text-lg",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto"
      style={{
        zIndex: 1000,
        isolation: "isolate", // ⭐ REAL FIX
      }}
    >
      {/* INPUT */}
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full rounded-2xl bg-[#0f1320]
          border border-white/20
          text-white placeholder-gray-400
          outline-none
          focus:border-cyan-400
          focus:ring-2 focus:ring-cyan-400/30
          transition-all duration-300
          ${sizeClasses[size]}`}
        />
      </form>

      {/* DROPDOWN */}
      <AnimatePresence>
        {isOpen && showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full left-0 right-0 mt-3
              backdrop-blur-2xl
              bg-[#0f1320]/95
              border border-white/10
              rounded-2xl
              shadow-[0_0_40px_rgba(0,255,255,0.08)]
              overflow-hidden
            "
            style={{ zIndex: 99999 }} // ALWAYS ABOVE
          >
            {popularDestinations.map((dest) => (
              <button
                key={dest.slug}
                onClick={() => handleSuggestionClick(dest)}
                className="w-full text-left px-5 py-3 text-gray-200
                hover:bg-cyan-400/10 transition-colors duration-200"
              >
                {dest.emoji} {dest.name}
              </button>
            ))}

            {recentSearches.length > 0 && (
              <div className="border-t border-white/10 px-5 py-3 text-xs text-gray-400">
                Recent: {recentSearches.join(", ")}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

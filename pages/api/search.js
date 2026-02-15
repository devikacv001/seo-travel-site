const WIKI =
  "https://en.wikipedia.org/api/rest_v1/page/summary/";

/* ===============================
   HELPERS
================================ */
function toSlug(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/* ===============================
   SIMPLE FREE GENERATED DATA
================================ */
function generateBestPlaces(name) {
  return [
    `${name} City Center`,
    `${name} Main Attractions`,
    `${name} Cultural Spots`,
  ];
}

function generateCost(name) {
  const cheap = ["india", "goa", "munnar", "wayanad"];
  const medium = ["paris", "tokyo", "dubai"];

  const lower = name.toLowerCase();

  if (cheap.some((c) => lower.includes(c)))
    return "₹1500 - ₹3000 per day";

  if (medium.some((c) => lower.includes(c)))
    return "$100 - $200 per day";

  return "$80 - $150 per day";
}

/* ===============================
   SEARCH PLACE
================================ */
async function searchPlace(query) {
  const q = String(query || "").trim();
  if (!q) return null;

  try {
    const res = await fetch(
      `${WIKI}${encodeURIComponent(q)}`
    );

    if (!res.ok) return null;

    const wiki = await res.json();

    const name = wiki?.title || q;

    return {
      name,
      slug: toSlug(name),
      keywordTitle: `${name} Travel Guide`,
      description:
        wiki?.extract ||
        `Explore ${name} with travel highlights.`,
      image:
        wiki?.originalimage?.source ||
        wiki?.thumbnail?.source ||
        "/images/fallback.jpg",
      bestPlaces: generateBestPlaces(name),
      costPerDay: generateCost(name),
    };
  } catch {
    return null;
  }
}

/* ===============================
   API HANDLER
================================ */
export default async function handler(req, res) {
  const { q, type } = req.query;

  try {
    /* HOME PAGE DESTINATIONS */
    if (type === "popular") {
      const seeds = [
        "Goa",
        "Munnar",
        "Wayanad",
        "Paris",
        "Tokyo",
      ];

      const results = await Promise.all(
        seeds.map(searchPlace)
      );

      return res.status(200).json({
        success: true,
        data: results.filter(Boolean),
      });
    }

    /* SEARCH */
    if (q) {
      const place = await searchPlace(q);

      return res.status(200).json({
        success: !!place,
        data: place,
      });
    }

    return res.status(200).json({
      success: false,
      data: null,
    });
  } catch {
    return res.status(200).json({
      success: false,
      data: null,
    });
  }
}

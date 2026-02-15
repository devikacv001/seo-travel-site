const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=70";

export function resolvePlaceImage(src) {
  if (!src || typeof src !== "string") return FALLBACK_IMAGE;

  // Allow absolute URLs, protocol-relative, and site-relative paths.
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) {
    return src;
  }

  // Normalize missing leading slash.
  if (!src.startsWith("/")) return `/${src}`;

  return src;
}

export function handleImgError(e) {
  if (!e?.currentTarget) return;
  // Prevent infinite loop.
  if (e.currentTarget.dataset.fallbackApplied === "1") return;
  e.currentTarget.dataset.fallbackApplied = "1";
  e.currentTarget.src = FALLBACK_IMAGE;
}

export { FALLBACK_IMAGE };

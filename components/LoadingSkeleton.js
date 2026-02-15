export default function LoadingSkeleton({ rows = 6 }) {
  return (
    <div className="glass p-6 relative overflow-hidden">

      {/* HEADER SKELETON */}
      <div className="h-5 w-44 bg-white/10 rounded-full animate-pulse" />

      {/* CARD GRID */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="
            rounded-2xl
            bg-white/5
            border border-white/10
            overflow-hidden
            animate-pulse
            "
          >
            {/* IMAGE PLACEHOLDER */}
            <div className="h-40 bg-white/10" />

            {/* CONTENT PLACEHOLDER */}
            <div className="p-4 space-y-3">
              <div className="h-4 w-2/3 bg-white/10 rounded-full" />
              <div className="h-3 w-full bg-white/10 rounded-full" />
              <div className="h-3 w-5/6 bg-white/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

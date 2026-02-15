import Link from "next/link";
import { handleImgError, resolvePlaceImage } from "@/utils/images";

export default function DestinationCard({ place }) {
  const imageSrc = resolvePlaceImage(place?.image);

  return (
    <article
      className="
      bg-white/5
      border border-white/10
      rounded-2xl
      overflow-hidden
      backdrop-blur-md
      hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
      relative
      z-0
      "
    >
      <Link href={`/destinations/${place.slug}`} className="block">

        {/* IMAGE */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            onError={handleImgError}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-white mb-2">
            {place.name}
          </h2>

          <p className="text-white/70 text-sm line-clamp-3">
            {place.description}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="text-cyan-400 font-semibold text-sm">
              Explore Destination →
            </span>
          </div>
        </div>

      </Link>
    </article>
  );
}

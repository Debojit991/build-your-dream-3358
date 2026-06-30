import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/lib/mock-data";
import { VerifiedBadge } from "./VerifiedBadge";

export function ListingCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);
  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className="group block rounded-xl bg-card border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        <img
          src={listing.photos[0]}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute top-2 right-2">
          <VerifiedBadge tier={listing.ownerTier} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          aria-label="Save listing"
          className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-white/95 backdrop-blur grid place-items-center transition-transform active:scale-90"
        >
          <Heart
            className={`h-4.5 w-4.5 transition-all ${saved ? "fill-coral text-coral scale-110" : "text-ink"}`}
          />
        </button>
        <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-2 py-0.5 text-[11px] font-medium text-ink uppercase tracking-wide">
          {listing.type === "pg" ? "PG" : "Flat"}
        </span>
      </div>
      <div className="p-3.5 space-y-2">
        <h3 className="font-display font-semibold text-[15px] leading-snug line-clamp-2">{listing.title}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-[17px] text-ink">₹{listing.rent.toLocaleString("en-IN")}</span>
          <span className="text-xs text-slate-text">/month</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-text">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{listing.distance}</span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="rounded-full bg-cloud text-ink px-2 py-0.5 text-[11px]">
            {listing.gender === "any" ? "Any gender" : listing.gender === "female" ? "Female" : "Male"}
          </span>
          {listing.sameCollegeMessaged ? (
            <span className="text-[11px] text-coral font-medium">
              {listing.sameCollegeMessaged} from your college messaged
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

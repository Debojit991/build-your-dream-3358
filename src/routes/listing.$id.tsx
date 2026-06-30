import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LISTINGS } from "@/lib/mock-data";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ArrowLeft, Heart, MapPin, MessageCircle, Wifi, Sparkles, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/listing/$id")({
  head: ({ params }) => {
    const l = LISTINGS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: l ? `${l.type === "pg" ? "PG" : "Flat"} near ${l.college} — ₹${l.rent}/mo | Rento Flats` : "Listing | Rento Flats" },
        { name: "description", content: l ? `${l.type === "pg" ? "PG" : "Flat"} near ${l.college}, ₹${l.rent}/month. Verified by Rento Flats — built for students, no brokerage.` : "" },
      ],
    };
  },
  component: ListingDetail,
  notFoundComponent: () => <div className="p-8">Listing not found.</div>,
});

function ListingDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const l = LISTINGS.find((x) => x.id === id);
  const [idx, setIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!l) return <div className="p-8">Listing not found.</div>;

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-12">
      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-30 bg-card/95 backdrop-blur border-b h-14 px-4 flex items-center justify-between">
        <button onClick={() => nav({ to: "/home" })} aria-label="Back" className="h-9 w-9 grid place-items-center rounded-full hover:bg-cloud">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button onClick={() => setSaved(!saved)} aria-label="Save" className="h-9 w-9 grid place-items-center rounded-full hover:bg-cloud">
          <Heart className={`h-5 w-5 ${saved ? "fill-coral text-coral" : ""}`} />
        </button>
      </header>

      <div className="max-w-[920px] mx-auto md:px-6 md:py-8">
        <div className="hidden md:block mb-4"><Logo size="sm" /></div>

        {/* Photo carousel */}
        <div className="relative bg-cloud md:rounded-2xl overflow-hidden">
          <div className="aspect-[16/10]">
            <img src={l.photos[idx]} alt={l.title} className="h-full w-full object-cover" />
          </div>
          {l.photos.length > 1 && (
            <>
              <button
                onClick={() => setIdx((i) => (i - 1 + l.photos.length) % l.photos.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/95"
                aria-label="Prev photo"
              ><ChevronLeft className="h-5 w-5" /></button>
              <button
                onClick={() => setIdx((i) => (i + 1) % l.photos.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white/95"
                aria-label="Next photo"
              ><ChevronRight className="h-5 w-5" /></button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {l.photos.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/60"}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="px-4 md:px-0 mt-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <VerifiedBadge tier={l.ownerTier} pulse />
              <span className="rounded-full bg-cloud px-2 py-0.5 text-[11px] font-medium uppercase">{l.type === "pg" ? "PG" : "Flat"}</span>
            </div>
            <h1 className="font-display font-bold text-2xl leading-tight">{l.title}</h1>
            <div className="flex items-center gap-1.5 text-sm text-slate-text mt-2">
              <MapPin className="h-4 w-4" /> {l.address} · {l.distance}
            </div>
          </div>

          {/* Pricing block */}
          <div className="rounded-xl bg-card border p-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl">₹{l.rent.toLocaleString("en-IN")}</span>
              <span className="text-sm text-slate-text">/ month</span>
            </div>
            <p className="text-xs text-slate-text mt-1">₹{l.deposit.toLocaleString("en-IN")} refundable deposit</p>
          </div>

          {/* Owner */}
          <div className="rounded-xl bg-card border p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-deep text-white grid place-items-center font-display font-semibold">
              {l.ownerName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-[15px]">{l.ownerName}</p>
              <p className="text-xs text-slate-text">{l.ownerCollege} · {l.responseRate}% response rate</p>
            </div>
            <VerifiedBadge tier={l.ownerTier} />
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg mb-2">About this place</h2>
            <p className="text-[15px] text-ink leading-relaxed">{l.description}</p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg mb-2">What's included</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {l.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 rounded-lg bg-card border p-3 text-sm">
                  <Wifi className="h-4 w-4 text-primary" /> {a}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-amber/10 border border-amber/30 p-3 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-foreground mt-0.5" />
            <p className="text-[13px] text-ink">
              Be cautious sharing personal financial details. <Link to="/help" className="text-primary font-semibold">Safety tips</Link> · Reports reviewed within 24h.
            </p>
          </div>

          {l.sameCollegeMessaged && (
            <div className="flex items-center gap-2 text-sm text-coral font-medium">
              <Sparkles className="h-4 w-4" /> {l.sameCollegeMessaged} from your college already messaged this listing.
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 inset-x-0 md:max-w-[920px] md:mx-auto md:left-0 md:right-0 md:bottom-4 md:rounded-2xl md:border md:shadow-xl bg-card border-t z-40">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSaved(!saved)} aria-label="Save" className="h-11 w-11 rounded-lg border grid place-items-center">
            <Heart className={`h-5 w-5 ${saved ? "fill-coral text-coral" : ""}`} />
          </button>
          <Link
            to="/chat/$conversationId"
            params={{ conversationId: "c1" }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-coral text-coral-foreground py-3 font-semibold hover:opacity-90"
          >
            <MessageCircle className="h-4.5 w-4.5" /> Message {l.ownerName.split(" ")[0]}
          </Link>
        </div>
      </div>
    </div>
  );
}

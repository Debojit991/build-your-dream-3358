import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ListingCard } from "@/components/ListingCard";
import { LISTINGS, ME } from "@/lib/mock-data";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Discover — Rento Flats" }] }),
  component: HomePage,
});

function HomePage() {
  const [seg, setSeg] = useState<"pg" | "flat" | "people">("pg");
  const [social, setSocial] = useState<"same_college" | "same_uni" | "all">("same_college");

  const filtered = LISTINGS.filter((l) => {
    if (seg === "people") return false;
    if (l.type !== seg) return false;
    if (social === "same_college") return l.college === ME.college || true; // demo: keep some
    return true;
  });

  return (
    <AppShell>
      {/* Search header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-xl border bg-card px-3.5 py-3">
          <Search className="h-4.5 w-4.5 text-slate-text" />
          <input
            placeholder="Search PGs, flats, areas..."
            className="flex-1 bg-transparent outline-none text-[15px]"
          />
          <button className="inline-flex items-center gap-1 rounded-full bg-accent text-primary px-2.5 py-1 text-xs font-semibold">
            <MapPin className="h-3.5 w-3.5" /> {ME.college.split(",")[0]}
          </button>
        </div>

        {/* Segmented control */}
        <div className="rounded-xl bg-card border p-1 grid grid-cols-3 text-sm font-medium">
          {(["pg", "flat", "people"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeg(s)}
              className={`py-2 rounded-lg transition-colors ${seg === s ? "bg-primary text-primary-foreground" : "text-slate-text hover:text-ink"}`}
            >
              {s === "pg" ? "PG" : s === "flat" ? "Flat" : "People"}
            </button>
          ))}
        </div>

        {/* Social filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {([
            ["same_college", "Same college"],
            ["same_uni", "Same university"],
            ["all", "Open to all"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setSocial(k)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors ${
                social === k ? "bg-ink text-white border-ink" : "bg-card text-ink border-border hover:bg-cloud"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="mt-6 mb-3 flex items-end justify-between">
        <h2 className="font-display font-semibold text-lg">
          {seg === "pg" ? "Shared rooms, real verification." : seg === "flat" ? "Flats near campus, picked by students like you." : "Don't just find a room. Find your roommate."}
        </h2>
        <span className="text-xs text-slate-text">{filtered.length} listings</span>
      </div>

      {seg === "people" ? (
        <div className="rounded-xl bg-card border p-8 text-center">
          <p className="font-display font-semibold">Looking for roommates?</p>
          <p className="text-sm text-slate-text mt-1">Browse compatible flatmates from your college.</p>
          <a href="/roommates" className="inline-block mt-4 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold">Open Roommate Finder</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </AppShell>
  );
}

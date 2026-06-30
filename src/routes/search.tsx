import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ListingCard";
import { useState } from "react";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Rento Flats" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [type, setType] = useState<"all" | "pg" | "flat">("all");
  const [gender, setGender] = useState<"any" | "male" | "female">("any");
  const [max, setMax] = useState(20000);

  const filtered = LISTINGS.filter((l) =>
    (type === "all" || l.type === type) &&
    (gender === "any" || l.gender === gender || l.gender === "any") &&
    l.rent <= max
  );

  return (
    <AppShell title="Search">
      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <aside className="space-y-4 rounded-xl bg-card border p-4 h-fit md:sticky md:top-6">
          <div>
            <p className="text-xs font-semibold text-slate-text uppercase tracking-wide mb-2">Listing type</p>
            <div className="grid grid-cols-3 gap-1.5">
              {(["all", "pg", "flat"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)} className={`rounded-lg py-2 text-xs font-semibold ${type === t ? "bg-primary text-primary-foreground" : "bg-cloud text-ink"}`}>
                  {t === "all" ? "All" : t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-text uppercase tracking-wide mb-2">Gender preference</p>
            <div className="grid grid-cols-3 gap-1.5">
              {(["any", "male", "female"] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)} className={`rounded-lg py-2 text-xs font-semibold capitalize ${gender === g ? "bg-primary text-primary-foreground" : "bg-cloud text-ink"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-text uppercase tracking-wide mb-2">Max rent</p>
            <input type="range" min={4000} max={30000} step={500} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-[oklch(0.45_0.20_277)]" />
            <p className="text-sm font-semibold mt-1">Up to ₹{max.toLocaleString("en-IN")}/mo</p>
          </div>
          <button className="w-full rounded-lg bg-coral text-coral-foreground py-2.5 font-semibold">
            Show {filtered.length} results
          </button>
        </aside>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl bg-card border p-8 text-center text-slate-text">
              No listings match. Try widening your filters.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

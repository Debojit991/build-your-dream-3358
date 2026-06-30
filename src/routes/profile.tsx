import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ME, LISTINGS } from "@/lib/mock-data";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { Pencil, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Rento Flats" }] }),
  component: Profile,
});

function Profile() {
  const myListings = LISTINGS.filter((l) => l.ownerId === "u_anita").slice(0, 1); // demo
  return (
    <AppShell title="Profile">
      <div className="rounded-2xl bg-card border p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-deep text-white grid place-items-center font-display font-bold text-2xl">
            {ME.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-xl">{ME.name}</h1>
            <p className="text-sm text-slate-text">{ME.college} · Year {ME.year}</p>
            <div className="mt-2"><VerifiedBadge tier={ME.tier} /></div>
          </div>
          <button className="hidden md:inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-cloud">
            <Pencil className="h-4 w-4" /> Edit
          </button>
        </div>
        <p className="text-[15px] mt-4 text-ink">{ME.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {ME.traits.map((t) => (
            <span key={t} className="rounded-full bg-cloud px-2.5 py-1 text-xs text-ink">{t}</span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-mint/10 border border-mint/30 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-mint shrink-0 mt-0.5" />
        <div>
          <p className="font-display font-semibold text-[15px]">You're College Verified</p>
          <p className="text-sm text-slate-text">Upload a government ID to unlock the ID Verified badge — owners reply faster.</p>
          <button className="mt-2 text-sm text-primary font-semibold hover:underline">Upgrade verification →</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-lg">My listings</h2>
          <Link to="/my-listings" className="text-sm text-primary font-semibold hover:underline">Manage →</Link>
        </div>
        {myListings.length === 0 ? (
          <div className="rounded-xl bg-card border p-8 text-center">
            <p className="text-slate-text">You haven't posted a listing yet.</p>
            <Link to="/post-listing" className="inline-block mt-3 rounded-lg bg-coral text-coral-foreground px-4 py-2.5 text-sm font-semibold">Post your first listing</Link>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}

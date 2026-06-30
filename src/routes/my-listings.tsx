import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LISTINGS } from "@/lib/mock-data";

export const Route = createFileRoute("/my-listings")({
  head: () => ({ meta: [{ title: "My listings — Rento Flats" }] }),
  component: MyListings,
});

function MyListings() {
  const mine = LISTINGS.slice(0, 2);
  return (
    <AppShell title="My listings">
      <h1 className="font-display font-bold text-2xl mb-4 hidden md:block">My listings</h1>
      <div className="space-y-3">
        {mine.map((l) => (
          <div key={l.id} className="rounded-xl bg-card border p-4 flex gap-4">
            <img src={l.photos[0]} alt="" className="h-24 w-32 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-mint text-mint-foreground px-2 py-0.5 text-[11px] font-semibold">Active</span>
                <span className="text-xs text-slate-text">{l.inquiries} inquiries</span>
              </div>
              <h3 className="font-display font-semibold mt-1 truncate">{l.title}</h3>
              <p className="text-sm text-slate-text">₹{l.rent.toLocaleString("en-IN")} / mo</p>
              <div className="mt-2 flex gap-2">
                <Link to="/listing/$id" params={{ id: l.id }} className="text-sm text-primary font-semibold hover:underline">View</Link>
                <button className="text-sm text-slate-text hover:text-ink">Edit</button>
                <button className="text-sm text-slate-text hover:text-ink">Mark as filled</button>
              </div>
            </div>
          </div>
        ))}
        <Link to="/post-listing" className="block rounded-xl border-2 border-dashed border-border p-6 text-center text-slate-text hover:border-primary hover:text-primary">
          + Post a new listing
        </Link>
      </div>
    </AppShell>
  );
}

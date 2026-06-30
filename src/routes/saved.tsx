import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ListingCard";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved — Rento Flats" }] }),
  component: Saved,
});

function Saved() {
  const saved = LISTINGS.slice(0, 3);
  return (
    <AppShell title="Saved">
      <h1 className="font-display font-bold text-2xl mb-4 hidden md:block">Saved listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {saved.map((l) => <ListingCard key={l.id} listing={l} />)}
      </div>
    </AppShell>
  );
}

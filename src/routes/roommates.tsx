import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ROOMMATES, ME } from "@/lib/mock-data";
import { RoommateCard } from "@/components/RoommateCard";
import { useState } from "react";

export const Route = createFileRoute("/roommates")({
  head: () => ({ meta: [{ title: "Roommate Finder — Rento Flats" }] }),
  component: Roommates,
});

function Roommates() {
  const [sameCollege, setSameCollege] = useState(true);
  const list = ROOMMATES.filter((r) => !sameCollege || r.college === ME.college).concat(
    sameCollege ? ROOMMATES.filter((r) => r.college !== ME.college).slice(0, 3) : []
  );
  return (
    <AppShell title="Roommates">
      <div>
        <h1 className="font-display font-bold text-2xl">Find your roommate</h1>
        <p className="text-slate-text text-sm mt-1">Don't just find a room. Find your roommate.</p>
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSameCollege(true)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border ${sameCollege ? "bg-ink text-white border-ink" : "bg-card text-ink border-border"}`}
          >
            Same college first
          </button>
          <button
            onClick={() => setSameCollege(false)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border ${!sameCollege ? "bg-ink text-white border-ink" : "bg-card text-ink border-border"}`}
          >
            Open to all
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((r) => <RoommateCard key={r.id} r={r} />)}
      </div>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ChevronRight, LogOut } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Rento Flats" }] }),
  component: Settings,
});

const GROUPS = [
  { title: "Account", items: ["Edit profile", "College & verification", "Connected email"] },
  { title: "Notifications", items: ["Email alerts", "Push notifications"] },
  { title: "Privacy & Safety", items: ["Blocked users", "Report history", "Who can message me"] },
  { title: "Verification", items: ["Re-upload ID", "Upgrade to ID Verified"] },
];

function Settings() {
  return (
    <AppShell title="Settings">
      <h1 className="font-display font-bold text-2xl mb-4 hidden md:block">Settings</h1>
      <div className="space-y-5">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold text-slate-text uppercase tracking-wide mb-2 px-1">{g.title}</p>
            <div className="rounded-xl bg-card border divide-y">
              {g.items.map((it) => (
                <button key={it} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-cloud">
                  <span className="text-[15px]">{it}</span>
                  <ChevronRight className="h-4 w-4 text-slate-text" />
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="w-full rounded-xl bg-card border px-4 py-3.5 flex items-center justify-center gap-2 text-destructive font-semibold hover:bg-destructive/5">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </AppShell>
  );
}

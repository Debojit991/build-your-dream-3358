import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MessageCircle, Sparkles, ShieldCheck, Home } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Rento Flats" }] }),
  component: Notifs,
});

const ITEMS = [
  { icon: MessageCircle, color: "text-primary bg-accent", title: "Anita Mehra replied", body: "Yes, the room is still available! Want to visit Saturday?", at: "2m", unread: true },
  { icon: Sparkles, color: "text-coral bg-coral/10", title: "New 92% roommate match", body: "Ananya R. — Symbiosis Pune, Year 2", at: "3h", unread: true },
  { icon: ShieldCheck, color: "text-mint bg-mint/10", title: "You're College Verified", body: "Symbiosis Pune confirmed your student status.", at: "1d", unread: false },
  { icon: Home, color: "text-primary bg-accent", title: "Listing update", body: "3 new flats near Symbiosis just got listed.", at: "2d", unread: false },
];

function Notifs() {
  return (
    <AppShell title="Notifications">
      <h1 className="font-display font-bold text-2xl mb-4 hidden md:block">Notifications</h1>
      <div className="rounded-xl bg-card border divide-y">
        {ITEMS.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 p-4 ${n.unread ? "bg-accent/30" : ""}`}>
            <div className={`h-10 w-10 rounded-lg grid place-items-center shrink-0 ${n.color}`}>
              <n.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[15px] ${n.unread ? "font-semibold" : "font-medium"}`}>{n.title}</p>
              <p className="text-sm text-slate-text mt-0.5">{n.body}</p>
            </div>
            <span className="text-[11px] text-slate-text">{n.at}</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

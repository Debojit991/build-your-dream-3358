import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Flag, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help & Safety — Rento Flats" }] }),
  component: Help,
});

const FAQ = [
  { q: "How is a listing verified?", a: "Every owner uploads a college ID or government ID. We manually review within 24 hours before they can post." },
  { q: "What if I get scammed?", a: "Report the listing or user with one tap. We freeze their account and review within 24h. Never wire a deposit before visiting in person." },
  { q: "Is there a brokerage fee?", a: "No. Ever. Rento Flats does not take a cut of rent or deposit." },
  { q: "How does roommate matching work?", a: "We score you against other students using your compatibility quiz answers. Matches above 70% are highlighted in Mint." },
];

const TIPS = [
  "Always visit in person (or on a video call) before paying anything.",
  "Never wire a deposit before seeing the place.",
  "Use Rento Flats chat — phone numbers stay private until you're comfortable.",
  "If something feels off, tap Report. We review within 24 hours.",
];

function Help() {
  return (
    <AppShell title="Help & Safety">
      <div className="max-w-2xl">
        <h1 className="font-display font-bold text-2xl">Help & Safety Center</h1>
        <p className="text-slate-text text-sm mt-1">Built so you never feel like you're moving in with strangers.</p>

        <div className="mt-5 rounded-xl bg-coral text-coral-foreground p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Flag className="h-5 w-5" />
            <div>
              <p className="font-display font-semibold">Report a problem</p>
              <p className="text-sm text-white/85">Listings or users that look unsafe.</p>
            </div>
          </div>
          <button className="rounded-lg bg-white text-coral px-3 py-2 text-sm font-semibold">Report</button>
        </div>

        <h2 className="font-display font-semibold text-lg mt-8 mb-3">Safety tips</h2>
        <ul className="rounded-xl bg-card border divide-y">
          {TIPS.map((t) => (
            <li key={t} className="flex items-start gap-3 p-4">
              <ShieldCheck className="h-4.5 w-4.5 text-mint mt-0.5 shrink-0" />
              <span className="text-[15px]">{t}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-display font-semibold text-lg mt-8 mb-3">Frequently asked</h2>
        <div className="space-y-2">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-xl bg-card border p-4 group">
              <summary className="cursor-pointer font-display font-semibold list-none flex items-center justify-between">
                {f.q}
                <span className="text-slate-text group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="text-sm text-slate-text mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

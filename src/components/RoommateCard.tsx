import type { Roommate } from "@/lib/mock-data";
import { VerifiedBadge } from "./VerifiedBadge";
import { MessageCircle, Info } from "lucide-react";

function Avatar({ seed, size = 56 }: { seed: string; size?: number }) {
  // deterministic colorful avatar from seed
  const hash = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (hash * 53) % 360;
  return (
    <div
      style={{ width: size, height: size, background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 50) % 360} 70% 45%))` }}
      className="rounded-full grid place-items-center text-white font-display font-semibold"
    >
      {seed[0].toUpperCase()}
    </div>
  );
}

export function RoommateCard({ r }: { r: Roommate }) {
  const scoreColor =
    r.compatibility >= 80 ? "bg-mint text-mint-foreground" : r.compatibility >= 65 ? "bg-amber text-amber-foreground" : "bg-cloud text-ink";
  return (
    <div className="rounded-xl bg-card border p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Avatar seed={r.avatarSeed} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display font-semibold text-[16px] truncate">{r.name}, {r.age}</h3>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${scoreColor}`}>
              {r.compatibility}%
              <Info className="h-3 w-3 opacity-70" />
            </span>
          </div>
          <p className="text-[13px] text-slate-text truncate">{r.college} · Year {r.year}</p>
          <div className="mt-1.5"><VerifiedBadge tier={r.tier} /></div>
        </div>
      </div>
      <p className="text-[13px] text-ink line-clamp-2">{r.bio}</p>
      <div className="flex flex-wrap gap-1.5">
        {r.traits.map((t) => (
          <span key={t} className="rounded-full bg-cloud px-2 py-0.5 text-[11px] text-ink">{t}</span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[12px] text-slate-text">Budget {r.budget}</span>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-coral text-coral-foreground px-3 py-2 text-sm font-semibold transition-colors hover:opacity-90 active:scale-[0.97]">
          <MessageCircle className="h-4 w-4" /> Connect
        </button>
      </div>
    </div>
  );
}

import { ShieldCheck, BadgeCheck, Clock } from "lucide-react";
import type { VerifTier } from "@/lib/mock-data";

export function VerifiedBadge({
  tier,
  size = "sm",
  pulse = false,
}: {
  tier: VerifTier;
  size?: "sm" | "md";
  pulse?: boolean;
}) {
  const padding = size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]";
  if (tier === "id_verified") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground font-medium ${padding} ${pulse ? "animate-pulse-once" : ""}`}
      >
        <BadgeCheck className="h-3.5 w-3.5" /> ID Verified
      </span>
    );
  }
  if (tier === "college_verified") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-mint text-mint-foreground font-medium ${padding} ${pulse ? "animate-pulse-once" : ""}`}
      >
        <ShieldCheck className="h-3.5 w-3.5" /> College Verified
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-amber text-amber-foreground font-medium ${padding}`}>
      <Clock className="h-3.5 w-3.5" /> Pending
    </span>
  );
}

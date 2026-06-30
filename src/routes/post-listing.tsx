import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Camera, Check, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/post-listing")({
  head: () => ({ meta: [{ title: "Post a listing — Rento Flats" }] }),
  component: Post,
});

const STEPS = ["Basics", "Pricing", "Location", "Photos", "Preferences", "Review"];

function Post() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<"pg" | "flat">("pg");
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState(8000);
  const [deposit, setDeposit] = useState(16000);
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "any">("any");

  return (
    <AppShell title="Post a listing">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="-ml-2 h-9 w-9 grid place-items-center rounded-full hover:bg-cloud">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <span className="text-xs font-semibold text-slate-text uppercase">Step {step + 1} of {STEPS.length} · {STEPS[step]}</span>
        </div>
        <div className="h-1.5 bg-cloud rounded-full overflow-hidden mb-6">
          <div className="h-full bg-coral transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl">What are you listing?</h1>
            <div className="grid grid-cols-2 gap-3">
              {(["pg", "flat"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)} className={`rounded-xl border p-4 text-left ${type === t ? "border-primary bg-accent" : "bg-card"}`}>
                  <p className="font-display font-semibold text-lg">{t === "pg" ? "PG / Shared room" : "Private flat"}</p>
                  <p className="text-sm text-slate-text mt-1">{t === "pg" ? "A bed in a shared room" : "A whole flat or a room in one"}</p>
                </button>
              ))}
            </div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Listing title (e.g. Sunny single PG near Symbiosis)" className="w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea rows={4} placeholder="Describe the vibe — 'Quiet, well-lit, 5-minute walk to the main gate.'" className="w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl">Pricing</h1>
            <label className="block">
              <span className="text-sm font-medium">Monthly rent</span>
              <div className="mt-1 flex items-center rounded-lg border border-input bg-card focus-within:ring-2 focus-within:ring-primary">
                <span className="pl-3.5 text-slate-text">₹</span>
                <input type="number" value={rent} onChange={(e) => setRent(+e.target.value)} className="w-full px-2 py-3 text-[15px] bg-transparent focus:outline-none" />
                <span className="pr-3.5 text-slate-text text-sm">/ month</span>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Refundable deposit</span>
              <div className="mt-1 flex items-center rounded-lg border border-input bg-card focus-within:ring-2 focus-within:ring-primary">
                <span className="pl-3.5 text-slate-text">₹</span>
                <input type="number" value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="w-full px-2 py-3 text-[15px] bg-transparent focus:outline-none" />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Available from</span>
              <input type="date" className="mt-1 w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl">Where is it?</h1>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address" className="w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px]" />
            <input placeholder="Nearest college (auto-detected)" className="w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px]" />
            <div className="aspect-[16/9] rounded-xl bg-cloud border-2 border-dashed grid place-items-center text-slate-text text-sm">Map preview</div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl">Add photos</h1>
            <p className="text-sm text-slate-text">Minimum 3 photos. First one is the cover.</p>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="aspect-square rounded-lg border-2 border-dashed border-border grid place-items-center text-slate-text hover:border-primary">
                  <Camera className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl">Preferences</h1>
            <div>
              <p className="text-sm font-medium mb-2">Gender preference</p>
              <div className="grid grid-cols-3 gap-2">
                {(["any", "male", "female"] as const).map((g) => (
                  <button key={g} onClick={() => setGender(g)} className={`rounded-lg py-2.5 text-sm font-semibold capitalize ${gender === g ? "bg-primary text-primary-foreground" : "bg-cloud text-ink"}`}>{g}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {["Wi-Fi", "Meals included", "AC", "Laundry", "Power backup", "Parking", "Lift", "Hot water", "Housekeeping"].map((a) => (
                  <label key={a} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm cursor-pointer hover:bg-cloud">
                    <input type="checkbox" className="accent-[oklch(0.45_0.20_277)]" /> {a}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl">Review & publish</h1>
            <div className="rounded-xl bg-card border p-4 space-y-2">
              <p><span className="text-slate-text text-sm">Type:</span> <span className="font-semibold">{type === "pg" ? "PG" : "Flat"}</span></p>
              <p><span className="text-slate-text text-sm">Title:</span> <span className="font-semibold">{title || "—"}</span></p>
              <p><span className="text-slate-text text-sm">Rent:</span> <span className="font-semibold">₹{rent.toLocaleString("en-IN")}/mo</span></p>
              <p><span className="text-slate-text text-sm">Deposit:</span> <span className="font-semibold">₹{deposit.toLocaleString("en-IN")}</span></p>
              <p><span className="text-slate-text text-sm">Address:</span> <span className="font-semibold">{address || "—"}</span></p>
              <p><span className="text-slate-text text-sm">Gender:</span> <span className="font-semibold capitalize">{gender}</span></p>
            </div>
            <button onClick={() => nav({ to: "/my-listings" })} className="w-full rounded-lg bg-coral text-coral-foreground py-3.5 font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90">
              <Check className="h-4.5 w-4.5" /> Publish listing
            </button>
          </div>
        )}

        {step < 5 && (
          <button onClick={() => setStep(step + 1)} className="mt-6 w-full rounded-lg bg-coral text-coral-foreground py-3.5 font-semibold hover:opacity-90">
            Next
          </button>
        )}
      </div>
    </AppShell>
  );
}

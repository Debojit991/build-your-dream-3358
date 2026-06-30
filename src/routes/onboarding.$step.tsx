import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { COLLEGES } from "@/lib/mock-data";
import { useState } from "react";
import { Home, Building2, Users, Upload, Lock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/$step")({
  component: Onboarding,
});

const QUIZ = [
  { q: "Sleep schedule?", opts: ["Early riser", "Night owl", "Flexible"] },
  { q: "How tidy are you?", opts: ["Spotless", "Lived-in", "Chill about it"] },
  { q: "Food preference?", opts: ["Vegetarian", "Non-veg ok", "Eggetarian"] },
  { q: "Smoking / drinking?", opts: ["None", "Occasionally", "Yes"] },
  { q: "Study habits?", opts: ["Quiet weeknights", "Group study ok", "I study at the library"] },
  { q: "Weekends?", opts: ["At home", "Out with friends", "Travel often"] },
];

function Onboarding() {
  const { step } = Route.useParams();
  const nav = useNavigate();
  const total = 3;
  const stepIndex = step === "role" ? 1 : step === "college" ? 2 : step === "quiz" ? 3 : 1;

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 md:px-6 h-14 flex items-center justify-between border-b bg-card">
        <Logo size="sm" />
        <span className="text-xs text-slate-text font-medium">Step {stepIndex} of {total}</span>
      </header>

      {/* Progress dots */}
      <div className="max-w-xl mx-auto px-4 pt-6 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? "bg-primary" : "bg-cloud"}`} />
        ))}
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        {step === "role" && <RoleStep onNext={() => nav({ to: "/onboarding/$step", params: { step: "college" } })} />}
        {step === "college" && <CollegeStep onNext={() => nav({ to: "/onboarding/$step", params: { step: "quiz" } })} />}
        {step === "quiz" && <QuizStep onDone={() => nav({ to: "/home" })} />}
      </div>
    </div>
  );
}

function RoleStep({ onNext }: { onNext: () => void }) {
  const roles = [
    { id: "seeker", icon: Home, label: "Looking for a place", body: "Browse verified PGs and flats near your campus." },
    { id: "lister", icon: Building2, label: "Have a place to list", body: "Post your flat or PG — students see it first." },
    { id: "both", icon: Users, label: "Both", body: "Looking for a flat and a flatmate at the same time." },
  ];
  return (
    <div>
      <h1 className="font-display font-bold text-2xl">What brings you to Rento Flats?</h1>
      <p className="text-slate-text text-sm mt-1">We'll tailor your experience.</p>
      <div className="mt-6 space-y-3">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={onNext}
            className="w-full text-left flex items-start gap-3 rounded-xl border bg-card p-4 hover:border-primary hover:bg-accent transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-accent text-primary grid place-items-center shrink-0">
              <r.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold">{r.label}</h3>
              <p className="text-sm text-slate-text mt-0.5">{r.body}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-text mt-2" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CollegeStep({ onNext }: { onNext: () => void }) {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const matches = COLLEGES.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <h1 className="font-display font-bold text-2xl">Pick your college</h1>
      <p className="text-slate-text text-sm mt-1">We'll verify you're a student before unlocking messaging.</p>
      <input
        autoFocus
        value={q}
        onChange={(e) => { setQ(e.target.value); setPicked(null); }}
        placeholder="Search colleges..."
        className="mt-4 w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {!picked && (
        <ul className="mt-2 rounded-lg border bg-card divide-y max-h-64 overflow-auto">
          {matches.map((c) => (
            <li key={c}>
              <button
                onClick={() => setPicked(c)}
                className="w-full text-left px-3.5 py-3 text-sm hover:bg-cloud"
              >{c}</button>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="px-3.5 py-3 text-sm text-slate-text">
              Don't see your college? <button className="text-primary font-medium">Request it</button>
            </li>
          )}
        </ul>
      )}
      {picked && (
        <div className="mt-4 rounded-xl border bg-card p-4 space-y-3">
          <p className="text-sm">Selected: <span className="font-semibold">{picked}</span></p>
          <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
            <Upload className="h-6 w-6 text-slate-text mx-auto" />
            <p className="text-sm font-medium mt-2">Upload your college ID card</p>
            <p className="text-xs text-slate-text mt-1">JPG or PNG, &lt; 5MB</p>
          </div>
          <p className="text-[12px] text-slate-text flex items-start gap-1.5">
            <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            Your ID is only used to verify you're a student — it's never shown publicly.
          </p>
          <button
            onClick={onNext}
            className="w-full rounded-lg bg-coral text-coral-foreground py-3 font-semibold hover:opacity-90"
          >
            Submit & continue
          </button>
        </div>
      )}
    </div>
  );
}

function QuizStep({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const cur = QUIZ[i];
  return (
    <div>
      <div className="h-1.5 rounded-full bg-cloud overflow-hidden">
        <div className="h-full bg-coral transition-all" style={{ width: `${((i + 1) / QUIZ.length) * 100}%` }} />
      </div>
      <h1 className="font-display font-bold text-2xl mt-6">{cur.q}</h1>
      <p className="text-slate-text text-sm mt-1">Helps us match you with compatible roommates.</p>
      <div className="mt-5 space-y-2.5">
        {cur.opts.map((o) => (
          <button
            key={o}
            onClick={() => {
              const next = [...answers, o];
              setAnswers(next);
              if (i + 1 < QUIZ.length) setI(i + 1);
              else onDone();
            }}
            className="w-full rounded-xl border bg-card p-4 text-left font-medium hover:border-primary hover:bg-accent transition-colors"
          >
            {o}
          </button>
        ))}
      </div>
      <button onClick={onDone} className="mt-4 w-full text-center text-sm text-slate-text hover:text-ink">
        Skip for now
      </button>
    </div>
  );
}

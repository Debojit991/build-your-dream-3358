import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { COLLEGES } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Home, Building2, Upload, Lock, ChevronRight } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

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
  const total = 4;
  const stepIndex = step === "details" ? 1 : step === "role" ? 2 : step === "college" ? 3 : step === "quiz" ? 4 : 1;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <header className="px-4 md:px-6 h-14 flex items-center justify-between border-b bg-card">
          <Logo size="sm" />
          <span className="text-xs text-slate-text font-medium">Loading...</span>
        </header>

        {/* Progress dots skeleton */}
        <div className="max-w-xl mx-auto px-4 pt-6 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-cloud" />
          ))}
        </div>

        <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
          <div className="h-8 w-2/3 bg-cloud rounded skeleton animate-pulse" />
          <div className="h-4 w-1/2 bg-cloud rounded skeleton animate-pulse" />
          <div className="h-24 w-full bg-cloud rounded-xl skeleton animate-pulse" />
          <div className="h-24 w-full bg-cloud rounded-xl skeleton animate-pulse" />
        </div>
      </div>
    );
  }

  const handleRoleSelection = async (role: "seeker" | "lister") => {
    let profession = "";
    if (currentUser) {
      setSaving(true);
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, { role }, { merge: true });
        
        // Fetch profession for conditional routing
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          profession = userSnap.data().profession || "";
        }
        
        toast.success("Role saved!");
      } catch (err: any) {
        console.error("Error updating role:", err);
        toast.error(err.message || "Failed to update role. Please try again.");
        setSaving(false);
        return;
      }
      setSaving(false);
    }
    
    // Conditionally route based on role and profession
    if (role === "seeker" && profession.toLowerCase() === "student") {
      nav({ to: "/onboarding/$step", params: { step: "college" } });
    } else {
      // Skip college step for non-students and listers
      nav({ to: "/onboarding/$step", params: { step: "quiz" } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 md:px-6 h-14 flex items-center justify-between border-b bg-card">
        <Logo size="sm" />
        <span className="text-xs text-slate-text font-medium">Step {stepIndex} of {total}</span>
      </header>

      {/* Progress dots */}
      <div className="max-w-xl mx-auto px-4 pt-6 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? "bg-primary" : "bg-cloud"}`} />
        ))}
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        {step === "details" && (
          <DetailsStep
            user={currentUser}
            onNext={() => nav({ to: "/onboarding/$step", params: { step: "role" } })}
          />
        )}
        {step === "role" && (
          <RoleStep
            onNext={handleRoleSelection}
            disabled={saving}
          />
        )}
        {step === "college" && <CollegeStep onNext={() => nav({ to: "/onboarding/$step", params: { step: "quiz" } })} />}
        {step === "quiz" && <QuizStep onDone={async () => {
          let role = "seeker";
          if (currentUser) {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              role = userSnap.data().role || "seeker";
            }
          }
          if (role === "lister") {
            nav({ to: "/post-property" });
          } else {
            nav({ to: "/home" });
          }
        }} />}
      </div>
    </div>
  );
}

function RoleStep({ onNext, disabled }: { onNext: (role: "seeker" | "lister") => void; disabled?: boolean }) {
  const roles = [
    { id: "seeker" as const, icon: Home, label: "Looking for a place", body: "Browse verified PGs and flats near your workplace or college." },
    { id: "lister" as const, icon: Building2, label: "Have a place to list", body: "Post your flat or PG — verified users see it first." },
  ];
  return (
    <div>
      <h1 className="font-display font-bold text-2xl">What brings you to Rento Flats?</h1>
      <p className="text-slate-text text-sm mt-1">We'll tailor your experience.</p>
      <div className="mt-6 space-y-4">
        {roles.map((r) => (
          <button
            key={r.id}
            disabled={disabled}
            onClick={() => onNext(r.id)}
            className="w-full text-left flex items-start gap-3 rounded-md border-2 border-transparent bg-white shadow-sm p-4 hover:border-primary hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <div className="h-10 w-10 rounded-md bg-accent text-primary grid place-items-center shrink-0">
              <r.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold">{r.label}</h3>
              <p className="text-sm text-slate-text mt-0.5">{r.body}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-text mt-2" />
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailsStep({ user, onNext }: { user: User | null; onNext: () => void }) {
  const [name, setName] = useState(user?.displayName || "");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.displayName && !name) {
      setName(user.displayName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob || !phone || !profession) {
      toast.error("Please fill in all fields");
      return;
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      toast.error("You must be at least 18 years old to use Rento Flats");
      return;
    }

    if (user) {
      setSaving(true);
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { full_name: name, dob, phone, profession },
          { merge: true }
        );
        onNext();
      } catch (err: any) {
        console.error("Error saving details:", err);
        toast.error("Failed to save details");
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl">Tell us a bit about yourself</h1>
      <p className="text-slate-text text-sm mt-1">This helps us keep the community safe and verified.</p>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1.5">Profession</label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          >
            <option value="" disabled>Select your profession</option>
            <option value="Student">Student</option>
            <option value="Salaried Professional">Salaried Professional</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Phone Number</label>
            <div className="flex relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[15px]">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="9876543210"
                className="w-full rounded-md border border-slate-300 bg-white pl-11 pr-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full mt-6 rounded-md bg-slate-900 text-white py-3 font-bold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : "Continue"}
        </button>
      </form>
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

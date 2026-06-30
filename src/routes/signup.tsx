import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Rento Flats" }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div
        className="hidden md:flex p-10 text-white flex-col justify-between"
        style={{ background: "linear-gradient(135deg, oklch(0.45 0.20 277), oklch(0.36 0.17 278))" }}
      >
        <Logo variant="reversed" size="md" />
        <div>
          <p className="font-display text-3xl font-bold leading-tight">Student-only, verified, no broker fees.</p>
          <p className="text-white/70 mt-3 text-sm">Takes 2 minutes. We'll never share your details.</p>
        </div>
        <p className="text-white/60 text-xs">© 2026 Rento Flats</p>
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-6"><Logo size="md" /></div>
          <h1 className="font-display font-bold text-2xl">Create your account</h1>
          <p className="text-slate-text text-sm mt-1">Verify once. Use forever.</p>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/onboarding/$step", params: { step: "role" } });
            }}
          >
            <input required placeholder="Full name" className="block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary" />
            <input required type="email" placeholder="College email" className="block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary" />
            <input required type="password" placeholder="Create a password" className="block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="w-full rounded-lg bg-coral text-coral-foreground py-3 font-semibold hover:opacity-90 transition-opacity">
              Continue
            </button>
            <p className="text-[11px] text-slate-text">
              By continuing you agree to our terms. Your ID is only used to verify you're a student — it's never shown publicly.
            </p>
          </form>
          <p className="text-sm text-slate-text mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

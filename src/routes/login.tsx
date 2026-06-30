import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Rento Flats" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div
        className="hidden md:flex p-10 text-white flex-col justify-between"
        style={{ background: "linear-gradient(135deg, oklch(0.45 0.20 277), oklch(0.36 0.17 278))" }}
      >
        <Logo variant="reversed" size="md" />
        <div>
          <p className="font-display text-3xl font-bold leading-tight">
            "Verified by Rento Flats — college ID checked."
          </p>
          <p className="text-white/70 mt-3 text-sm">Welcome back. Pick up where you left off.</p>
        </div>
        <p className="text-white/60 text-xs">© 2026 Rento Flats</p>
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-6"><Logo size="md" /></div>
          <h1 className="font-display font-bold text-2xl">Welcome back</h1>
          <p className="text-slate-text text-sm mt-1">Log in to continue.</p>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/home" });
            }}
          >
            <label className="block">
              <span className="text-sm font-medium text-ink">College email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="mt-1 block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Password</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <button className="w-full rounded-lg bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary-deep transition-colors">
              Log in
            </button>
          </form>
          <p className="text-sm text-slate-text mt-4 text-center">
            New here?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

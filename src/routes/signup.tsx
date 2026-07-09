import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Rento Flats" }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          full_name: user.displayName,
          email: user.email,
          role: null,
          verification_status: "unverified",
          created_at: serverTimestamp()
        },
        { merge: true }
      );

      toast.success("Signed up successfully!");
      nav({ to: "/onboarding/$step", params: { step: "details" } });
    } catch (err: any) {
      console.error("Sign-up error:", err);
      toast.error(err.message || "Google Sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div
        className="hidden md:flex p-10 text-white flex-col justify-between"
        style={{ background: "linear-gradient(135deg, oklch(0.45 0.20 277), oklch(0.36 0.17 278))" }}
      >
        <Logo variant="reversed" size="md" />
        <div>
          <p className="font-display text-3xl font-semibold leading-tight">Verified homes, zero broker fees.</p>
          <p className="text-white/70 mt-3 text-sm">Your perfect flat, minus the hassle.</p>
        </div>
        <p className="text-white/60 text-xs">© 2026 Rento Flats</p>
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          <div className="md:hidden mb-6"><Logo size="md" /></div>
          <h1 className="font-display font-bold text-2xl">Create your account</h1>
          <p className="text-slate-text text-sm mt-1">Verify once. Use forever.</p>
          
          <div className="mt-8 w-full space-y-4">
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignUp}
              className="w-full h-[48px] rounded-md bg-white border border-slate-300 text-slate-900 flex items-center justify-center gap-2 font-bold hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </button>
            <p className="text-[11px] text-slate-text">
              By continuing you agree to our terms. Your ID is only used to verify your profile — it's never shown publicly.
            </p>
          </div>
          
          <p className="text-sm text-slate-text mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Sparkles, ArrowRight, BadgeCheck, Heart } from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";
import { LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ListingCard";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rento Flats — Student Housing, Verified by Students" },
      { name: "description", content: "Find your flat. Find your people. Verified PGs, flats and roommates near your college. No brokerage." },
      { property: "og:title", content: "Rento Flats — Find your flat. Find your people." },
      { property: "og:description", content: "Student-only rental marketplace with verified listings, roommate matching, and zero brokerage." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const featured = LISTINGS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Logo variant="reversed" size="md" />
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-white/90 hover:text-white text-sm font-medium px-3 py-2"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white text-primary px-3.5 py-2 text-sm font-semibold hover:bg-white/95"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.45 0.20 277) 0%, oklch(0.36 0.17 278) 100%)",
        }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 pt-28 pb-16 md:pt-32 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              4,820 students verified this month
            </span>
            <h1 className="font-display font-bold text-[34px] leading-[1.08] md:text-[56px] md:leading-[1.05] tracking-tight">
              Find your flat.<br />
              <span className="text-coral">Find your people.</span>
            </h1>
            <p className="text-white/80 text-[15px] md:text-lg max-w-lg leading-relaxed">
              Verified PGs, flats and roommates — exclusively for college students.
              No brokers. No strangers. Just students who actually get it.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-coral text-coral-foreground px-5 py-3.5 text-[15px] font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started — it's free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur text-white px-5 py-3.5 text-[15px] font-semibold hover:bg-white/15"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
              <img
                src={heroImg}
                alt="Students hanging out in a shared student flat"
                className="h-full w-full object-cover"
                width={1408}
                height={1024}
              />
            </div>
            <div className="hidden md:block absolute -bottom-5 -left-5 rounded-xl bg-white shadow-xl p-3 max-w-[220px]">
              <div className="flex items-center gap-2 text-mint">
                <BadgeCheck className="h-4 w-4" />
                <span className="text-[12px] font-semibold">College Verified</span>
              </div>
              <p className="text-[12px] text-slate-text mt-1">
                "3 students from your college are already living 2 minutes from campus."
              </p>
            </div>
            <div className="hidden md:flex absolute -top-4 -right-4 items-center gap-2 rounded-full bg-coral text-coral-foreground px-3 py-1.5 text-[12px] font-semibold shadow-lg">
              <Heart className="h-3.5 w-3.5 fill-current" /> 92% roommate match
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-card border-b">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "College Verified", body: "Every profile checked against college ID or email." },
            { icon: Sparkles, title: "No Brokerage", body: "Direct from students and owners. Zero middlemen, ever." },
            { icon: Users, title: "Roommate Matching", body: "Compatibility quiz finds people who actually fit your life." },
          ].map((b) => (
            <div key={b.title} className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent text-primary grid place-items-center shrink-0">
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[15px]">{b.title}</h3>
                <p className="text-sm text-slate-text mt-0.5">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl">Verified rooms near top campuses</h2>
              <p className="text-slate-text text-sm mt-1">Real listings, posted by verified students and owners.</p>
            </div>
            <Link to="/home" className="hidden md:inline text-primary font-semibold text-sm hover:underline">
              See all →
            </Link>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 pb-2 w-max">
              {featured.map((l) => (
                <div key={l.id} className="w-[280px] shrink-0">
                  <ListingCard listing={l} />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-5">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card border-y py-12 md:py-16">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center">How Rento Flats works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { n: "01", t: "Verify with your college", b: "Sign up with college email or ID card. One-time, takes 2 minutes." },
              { n: "02", t: "Browse student-only listings", b: "Filter by same college, same university, gender preference, move-in date." },
              { n: "03", t: "Message safely, move in", b: "Chat in-app first. Phone numbers stay private until you're both comfortable." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl bg-background border p-5">
                <span className="font-display text-coral font-bold text-sm">{s.n}</span>
                <h3 className="font-display font-semibold text-lg mt-2">{s.t}</h3>
                <p className="text-sm text-slate-text mt-1.5 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl">Student housing, minus the strangers.</h2>
          <p className="text-slate-text text-[15px] md:text-lg mt-3">
            Join thousands of verified students finding flats and flatmates the right way.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-coral text-coral-foreground px-6 py-3.5 text-[15px] font-semibold hover:opacity-90 mt-6"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-text">
          <Logo size="sm" />
          <p>© 2026 Rento Flats. Built for students, by students.</p>
          <div className="flex gap-4">
            <Link to="/help" className="hover:text-ink">Help & Safety</Link>
            <Link to="/login" className="hover:text-ink">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

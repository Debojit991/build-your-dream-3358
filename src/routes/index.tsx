import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Sparkles, ArrowRight, BadgeCheck, Heart, MapPin, ChevronDown, Plus, Star } from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";
import { LISTINGS } from "@/lib/mock-data";
import { ListingCard } from "@/components/ListingCard";
import { Logo } from "@/components/Logo";
import { RegionSelectModal } from "@/components/RegionSelectModal";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rento Flats — Verified Homes, Zero Broker Fees" },
      { name: "description", content: "Find your flat. Find your people. Verified PGs, flats and roommates near your workplace or college. No brokerage." },
      { property: "og:title", content: "Rento Flats — Find your flat. Find your people." },
      { property: "og:description", content: "Rental marketplace with verified listings, roommate matching, and zero brokerage." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const featured = LISTINGS.slice(0, 6);
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLister, setIsLister] = useState(false);

  const MOCK_REVIEWS = [
    {
      name: "Arijit M.",
      tag: "Salaried Professional in New Town",
      text: "Found a great flat with verified roommates in under 48 hours. Zero brokerage fees meant I saved a ton on my initial move, and the commute to the tech park is now just 5 minutes!"
    },
    {
      name: "Sneha D.",
      tag: "Student near Jadavpur",
      text: "As a student moving to a new city, safety was my biggest concern. Rento Flats' verification process and roommate matching feature helped me find the perfect PG with people who share my lifestyle."
    },
    {
      name: "Rahul K.",
      tag: "Freelancer in Salt Lake",
      text: "The platform is incredibly transparent. No hidden fees, no brokers calling endlessly. I chatted directly with the lister, checked out the place, and moved in over the weekend."
    }
  ];
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  useEffect(() => {
    const region = localStorage.getItem("userRegion");
    if (region) {
      setSelectedRegion(region);
    } else {
      setRegionModalOpen(true);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "lister") {
          setIsLister(true);
        }
      } else {
        setIsLister(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleModalChange = (open: boolean) => {
    setRegionModalOpen(open);
    if (!open) {
      setSelectedRegion(localStorage.getItem("userRegion"));
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Logo variant="reversed" size="md" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRegionModalOpen(true)}
              className="text-white/90 hover:text-white text-sm font-medium px-3 py-2 flex items-center gap-1.5"
            >
              <MapPin className="h-4 w-4" />
              {selectedRegion || "Select your region"}
            </button>
            {currentUser ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-1 focus:outline-none group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-semibold text-sm border-2 border-white shadow-md">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span>{getInitials(currentUser.displayName)}</span>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content align="end" className="w-56 bg-white rounded-md shadow-lg border border-slate-200 p-1 z-50">
                    <DropdownMenu.Label className="px-2 py-2 text-xs font-semibold text-slate-500">
                      My Activity
                    </DropdownMenu.Label>
                    <DropdownMenu.Item className="px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md cursor-pointer outline-none transition-colors">
                      Recently Searched
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md cursor-pointer outline-none transition-colors">
                      Recently Viewed
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md cursor-pointer outline-none transition-colors">
                      Shortlisted
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md cursor-pointer outline-none transition-colors">
                      Contacted
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-slate-200 my-1" />
                    <DropdownMenu.Item onClick={() => signOut(auth)} className="px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none font-medium transition-colors">
                      Log Out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <>
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
              </>
            )}
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
              4,820 profiles verified this month
            </span>
            <h1 className="font-display font-bold text-[34px] leading-[1.08] md:text-[56px] md:leading-[1.05] tracking-tight">
              Your perfect flat.<br />
              <span className="text-coral">Minus the hassle.</span>
            </h1>
            <p className="text-white/80 text-[15px] md:text-lg max-w-lg leading-relaxed">
              Verified PGs, flats and roommates — for young professionals and students.
              No brokers. No strangers. Just people who actually get it.
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
                alt="Roommates hanging out in a shared flat"
                className="h-full w-full object-cover"
                width={1408}
                height={1024}
              />
            </div>
            <div className="hidden md:block absolute -bottom-5 -left-5 rounded-xl bg-white shadow-xl p-3 max-w-[220px]">
              <div className="flex items-center gap-2 text-mint">
                <BadgeCheck className="h-4 w-4" />
                <span className="text-[12px] font-semibold">Profile Verified</span>
              </div>
              <p className="text-[12px] text-slate-text mt-1">
                "3 people from your workplace or college are already living 2 minutes away."
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
            { icon: ShieldCheck, title: "Profile Verified", body: "Every profile checked against official ID or work email." },
            { icon: Sparkles, title: "No Brokerage", body: "Direct from tenants and owners. Zero middlemen, ever." },
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
              <h2 className="font-display font-bold text-2xl md:text-3xl">Verified rooms near top areas</h2>
              <p className="text-slate-text text-sm mt-1">Real listings, posted by verified tenants and owners.</p>
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
              { n: "01", t: "Verify your profile", b: "Sign up with work/college email or official ID. One-time, takes 2 minutes." },
              { n: "02", t: "Browse verified listings", b: "Filter by same workplace, college, gender preference, move-in date." },
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

      {/* Client Reviews */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900">What our users say</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-lg mx-auto">Real experiences from verified tenants who found their perfect home and roommates.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="flex text-amber-400 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic leading-relaxed text-[15px]">"{r.text}"</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <p className="font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">{r.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl">Co-living, minus the strangers.</h2>
          <p className="text-slate-text text-[15px] md:text-lg mt-3">
            Join thousands of verified people finding flats and flatmates the right way.
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
          <p>© 2026 Rento Flats. Your perfect flat, minus the hassle.</p>
          <div className="flex gap-4">
            <Link to="/help" className="hover:text-ink">Help & Safety</Link>
            <Link to="/login" className="hover:text-ink">Log in</Link>
          </div>
        </div>
      </footer>

      <RegionSelectModal open={regionModalOpen} onOpenChange={handleModalChange} />

      {isLister && (
        <Link
          to="/post-property"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-coral text-coral-foreground px-6 py-4 shadow-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Post Property
        </Link>
      )}
    </div>
  );
}

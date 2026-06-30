import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Plus, MessageCircle, User, Heart, Bell, Settings, HelpCircle, List } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

type Tab = { to: string; label: string; icon: typeof Home; primary?: boolean; badge?: number };
const TABS: Tab[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/post-listing", label: "Post", icon: Plus, primary: true },
  { to: "/chat", label: "Chat", icon: MessageCircle, badge: 3 },
  { to: "/profile", label: "Profile", icon: User },
];

const SIDE_LINKS = [
  { to: "/home", label: "Discover", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/roommates", label: "Roommates", icon: User },
  { to: "/saved", label: "Saved", icon: Heart },
  { to: "/chat", label: "Messages", icon: MessageCircle },
  { to: "/my-listings", label: "My Listings", icon: List },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/help", label: "Help & Safety", icon: HelpCircle },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 border-r bg-card flex-col">
        <div className="px-6 py-5"><Logo size="md" /></div>
        <nav className="flex-1 px-3 space-y-0.5">
          {SIDE_LINKS.map((l) => {
            const Icon = l.icon;
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-accent text-primary border-l-2 border-primary -ml-[2px] pl-[14px]" : "text-ink hover:bg-cloud"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/post-listing" className="m-3 inline-flex items-center justify-center gap-2 rounded-lg bg-coral text-coral-foreground px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Post a listing
        </Link>
      </aside>

      {/* Mobile sticky header */}
      <header className="md:hidden sticky top-0 z-30 bg-card/95 backdrop-blur border-b px-4 h-14 flex items-center justify-between">
        {title ? (
          <h1 className="font-display font-semibold text-[17px]">{title}</h1>
        ) : (
          <Logo size="sm" />
        )}
        <div className="flex items-center gap-3">
          <Link to="/notifications" aria-label="Notifications" className="relative">
            <Bell className="h-5 w-5 text-ink" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-coral" />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="md:pl-64 pb-20 md:pb-0">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 py-4 md:py-8">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-card border-t h-16 grid grid-cols-5">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = pathname.startsWith(t.to);
          if (t.primary) {
            return (
              <Link key={t.to} to={t.to} className="flex items-center justify-center" aria-label={t.label}>
                <span className="-mt-7 h-14 w-14 rounded-full bg-coral text-coral-foreground grid place-items-center shadow-lg shadow-coral/30">
                  <Icon className="h-6 w-6" />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center justify-center gap-0.5 ${active ? "text-primary" : "text-slate-text"}`}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {"badge" in t && t.badge ? (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-coral text-coral-foreground text-[10px] font-semibold grid place-items-center">
                    {t.badge}
                  </span>
                ) : null}
              </span>
              <span className="text-[10px] font-medium">{t.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

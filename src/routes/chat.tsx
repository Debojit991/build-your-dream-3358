import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CONVERSATIONS } from "@/lib/mock-data";
import { VerifiedBadge } from "@/components/VerifiedBadge";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Messages — Rento Flats" }] }),
  component: ChatList,
});

function ChatList() {
  return (
    <AppShell title="Messages">
      <h1 className="font-display font-bold text-2xl mb-4 hidden md:block">Messages</h1>
      <div className="rounded-xl bg-card border divide-y">
        {CONVERSATIONS.map((c) => (
          <Link
            key={c.id}
            to="/chat/$conversationId"
            params={{ conversationId: c.id }}
            className="flex items-start gap-3 p-4 hover:bg-cloud transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-deep text-white grid place-items-center font-display font-semibold shrink-0">
              {c.withName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display font-semibold truncate">{c.withName}</p>
                <span className="text-[11px] text-slate-text shrink-0">{c.lastAt}</span>
              </div>
              <div className="mt-0.5"><VerifiedBadge tier={c.withTier} /></div>
              {c.listingTitle && <p className="text-[12px] text-primary mt-1 truncate">re: {c.listingTitle}</p>}
              <p className={`text-sm mt-1 truncate ${c.unread ? "text-ink font-medium" : "text-slate-text"}`}>{c.lastMessage}</p>
            </div>
            {c.unread > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-coral text-coral-foreground text-[11px] font-semibold grid place-items-center">
                {c.unread}
              </span>
            )}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

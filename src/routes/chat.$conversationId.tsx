import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CONVERSATIONS } from "@/lib/mock-data";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/chat/$conversationId")({
  component: ChatThread,
});

function ChatThread() {
  const { conversationId } = Route.useParams();
  const nav = useNavigate();
  const c = CONVERSATIONS.find((x) => x.id === conversationId);
  const [msgs, setMsgs] = useState(c?.messages ?? []);
  const [input, setInput] = useState("");

  if (!c) return <div className="p-8">Conversation not found.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-30 bg-card border-b h-14 px-3 flex items-center gap-3">
        <button onClick={() => nav({ to: "/chat" })} aria-label="Back" className="h-9 w-9 grid place-items-center rounded-full hover:bg-cloud">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-deep text-white grid place-items-center font-display font-semibold">{c.withName[0]}</div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-[15px] truncate">{c.withName}</p>
          <p className="text-[11px] text-slate-text truncate">{c.withCollege}</p>
        </div>
        <VerifiedBadge tier={c.withTier} />
      </header>

      {c.listingTitle && (
        <Link to="/listing/$id" params={{ id: "l1" }} className="mx-4 mt-3 rounded-lg border bg-card p-3 text-sm hover:bg-cloud">
          <p className="text-[11px] text-slate-text">About this listing</p>
          <p className="font-medium text-ink truncate">{c.listingTitle}</p>
        </Link>
      )}

      <div className="mx-4 mt-3 rounded-lg bg-amber/10 border border-amber/30 px-3 py-2 flex items-start gap-2 text-[12px] text-ink">
        <AlertCircle className="h-3.5 w-3.5 mt-0.5 text-amber-foreground shrink-0" />
        Be cautious sharing personal financial details before viewing in person.
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[14px] ${m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-cloud text-ink rounded-bl-sm"}`}>
              {m.body}
              <div className={`text-[10px] mt-1 ${m.from === "me" ? "text-white/70" : "text-slate-text"}`}>{m.at}</div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          setMsgs([...msgs, { id: String(Date.now()), from: "me", body: input, at: "now" }]);
          setInput("");
        }}
        className="sticky bottom-0 bg-card border-t p-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-input bg-card px-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="h-11 w-11 rounded-full bg-coral text-coral-foreground grid place-items-center" aria-label="Send">
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
}

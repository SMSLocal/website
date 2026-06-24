"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCheck, CornerUpLeft, History, Mail, PenLine, Send, UserRound } from "lucide-react"

/**
 * Laptop mockup for the "Shared inbox" section with a live, looping
 * conversation playing in the thread — customer ↔ agent with typing
 * indicators and delivered ticks, so it reads as a chat in progress.
 */

type Msg = { id: number; side: "customer" | "agent"; text: string; who: string; delivered?: boolean }
type Ev =
  | { t: "typing"; who: "agent" | "customer" }
  | { t: "msg"; side: "customer" | "agent"; text: string; who: string; delivered?: boolean }

const TIMELINE: Ev[] = [
  { t: "typing", who: "agent" },
  { t: "msg", side: "agent", text: "Done — refund approved and processed. Sending the confirmation now. 👍", who: "Priya · just now", delivered: true },
  { t: "typing", who: "customer" },
  { t: "msg", side: "customer", text: "Perfect — thank you so much! 🙏", who: "aarav@mail.com · just now" },
  { t: "typing", who: "agent" },
  { t: "msg", side: "agent", text: "Anytime. I've closed the ticket for you. ✅", who: "Priya · just now", delivered: true },
  { t: "typing", who: "customer" },
  { t: "msg", side: "customer", text: "Could I also get an invoice copy?", who: "aarav@mail.com · just now" },
  { t: "typing", who: "agent" },
  { t: "msg", side: "agent", text: "Sent it to your email just now. 📧", who: "Priya · just now", delivered: true },
]

const FIRST_MSG: Msg = {
  id: 0,
  side: "customer",
  text: "The item arrived damaged — I'd like a refund. Order #FC-2841.",
  who: "aarav@mail.com · 4m ago",
}

export function CollabLaptopVisual() {
  const [msgs, setMsgs] = useState<Msg[]>([FIRST_MSG])
  const [typing, setTyping] = useState<null | "agent" | "customer">(null)
  const evIdx = useRef(0)
  const msgId = useRef(1)

  useEffect(() => {
    const id = setInterval(() => {
      const ev = TIMELINE[evIdx.current % TIMELINE.length]
      evIdx.current += 1
      if (ev.t === "typing") {
        setTyping(ev.who)
        return
      }
      setTyping(null)
      setMsgs((prev) => [...prev, { id: msgId.current++, side: ev.side, text: ev.text, who: ev.who, delivered: ev.delivered }].slice(-2))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 26%, transparent), transparent 70%)" }}
      />

      {/* Laptop lid */}
      <div className="rounded-[20px] border border-white/10 bg-[oklch(0.19_0.02_230)] p-2.5 shadow-2xl">
        <div className="mx-auto mb-1.5 h-1 w-1 rounded-full bg-white/25" />
        {/* Screen */}
        <div className="overflow-hidden rounded-[12px] border border-black/30 bg-card">
          {/* thread header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
            <p className="flex items-center gap-2 truncate text-[12.5px] font-semibold text-foreground">
              <Mail className="h-4 w-4 text-primary" /> Refund for order #FC-2841
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <UserRound className="h-3 w-3" /> Priya
            </span>
          </div>

          {/* private note (pinned) */}
          <div className="mx-4 mt-3 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-600">
              <PenLine className="h-3 w-3" /> Private note · not visible to customer
            </p>
            <p className="mt-1 text-[12px] text-foreground">
              <span className="font-semibold text-primary">@Dev</span> VIP customer — approve the refund and waive the restocking fee.
            </p>
          </div>

          {/* live email thread */}
          <div className="flex h-[118px] flex-col justify-end gap-2 overflow-hidden px-4 pt-3">
            {msgs.map((m) => {
              const agent = m.side === "agent"
              return (
                <div
                  key={m.id}
                  className={`rounded-lg border bg-background px-3 py-2 shadow-sm ${agent ? "border-l-2 border-l-primary border-y-border border-r-border" : "border-border"}`}
                  style={{ animation: "collabMsgIn 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${agent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {agent ? "P" : "AM"}
                    </span>
                    <p className="min-w-0 flex-1 truncate text-[10.5px] text-muted-foreground">
                      <span className="font-semibold text-foreground">{agent ? "Priya" : "Aarav Mehta"}</span>{" "}
                      <span className="text-muted-foreground/70">{agent ? "support@smslocal.in" : "aarav@mail.com"}</span>
                    </p>
                    {agent && m.delivered ? (
                      <span className="inline-flex shrink-0 items-center gap-0.5 text-[9px] font-medium text-emerald-600">
                        <CheckCheck className="h-2.5 w-2.5" /> Sent
                      </span>
                    ) : (
                      <span className="shrink-0 font-mono text-[9px] text-muted-foreground/70">{agent ? "now" : "9:41 AM"}</span>
                    )}
                  </div>
                  <p className="mt-1.5 pl-7 text-[12px] leading-relaxed text-foreground/80">{m.text}</p>
                </div>
              )
            })}
          </div>

          {/* composer */}
          <div className="mx-4 mb-3 mt-2">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
              <CornerUpLeft className="h-3.5 w-3.5 shrink-0 text-primary" />
              {typing === "agent" ? (
                <>
                  <span className="text-[10.5px] text-muted-foreground">Composing reply as support@smslocal.in</span>
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-primary/60" style={{ animation: "collabDotB 1.2s ease-in-out infinite" }} />
                    <span className="h-1 w-1 rounded-full bg-primary/60" style={{ animation: "collabDotB 1.2s ease-in-out 0.2s infinite" }} />
                    <span className="h-1 w-1 rounded-full bg-primary/60" style={{ animation: "collabDotB 1.2s ease-in-out 0.4s infinite" }} />
                  </span>
                </>
              ) : typing === "customer" ? (
                <span className="text-[10.5px] text-muted-foreground">New reply incoming from aarav@mail.com…</span>
              ) : (
                <span className="text-[10.5px] text-muted-foreground/70">Reply to this thread…</span>
              )}
              <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1 text-[9.5px] font-semibold text-primary-foreground">
                <Send className="h-2.5 w-2.5" /> Send
              </span>
            </div>
          </div>

          {/* activity footer */}
          <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
            <History className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">Assigned to Priya · note added · tag "refund" applied · priority raised</span>
          </div>
        </div>
      </div>

      {/* Laptop base / hinge */}
      <div className="relative mx-auto h-3 w-[116%] -translate-x-[6.9%] rounded-b-[12px] bg-gradient-to-b from-[oklch(0.32_0.02_230)] to-[oklch(0.15_0.02_230)] shadow-lg">
        <span className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-black/30" />
      </div>
      <div className="mx-auto h-1 w-[58%] rounded-b-[6px] bg-black/15" />

      <style jsx>{`
        @keyframes collabMsgIn {
          0% { opacity: 0; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes collabDotB {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-2px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}

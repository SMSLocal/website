"use client"

import { useEffect, useRef, useState } from "react"
import {
  Bold,
  Code,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo2,
  Sparkles,
  Strikethrough,
  Undo2,
} from "lucide-react"

/**
 * Animated "compose email" mockup for the Email Inbox hero — dark surface,
 * brand-green accents. A reply types itself out in the body on a loop (with a
 * blinking caret), the recipient + inbox stay selected, and the Send button
 * pulses, so the composer reads as a live draft in progress.
 */

type Draft = { name: string; email: string; initials: string; tint: string; body: string }

const DRAFTS: Draft[] = [
  { name: "Aarav Mehta", email: "aarav@mail.com", initials: "AM", tint: "bg-primary/20 text-primary", body: "Hi Aarav — your refund for order #FC-2841 is approved and on its way. We've waived the restocking fee too. 👍" },
  { name: "Sofia Rossi", email: "sofia@globex.com", initials: "SR", tint: "bg-rose-400/15 text-rose-300", body: "Thanks for reaching out, Sofia! Your replacement ships today — tracking link to follow shortly. 📦" },
  { name: "James Carter", email: "james.c@gmail.com", initials: "JC", tint: "bg-sky-400/15 text-sky-300", body: "Happy to help, James. I've closed the ticket and noted your preference for next time. ✅" },
  { name: "Lena Fischer", email: "lena@brightmail.com", initials: "LF", tint: "bg-amber-400/15 text-amber-300", body: "Hi Lena — your invoice copy has been emailed to you just now. Let me know if anything looks off. 🧾" },
  { name: "Priya Nair", email: "priya@zoho.com", initials: "PN", tint: "bg-emerald-400/15 text-emerald-300", body: "We've upgraded your plan, Priya — the new inbox is live and your team can start assigning right away. 🚀" },
  { name: "Omar Haddad", email: "omar@fastmail.com", initials: "OH", tint: "bg-teal-300/15 text-teal-200", body: "Sorted, Omar! The address on your order is updated and the courier has the new details. 📍" },
  { name: "Grace Lee", email: "grace.lee@outlook.com", initials: "GL", tint: "bg-violet-400/15 text-violet-300", body: "All set, Grace — I've looped in our billing team and you'll hear back within the hour. ⏱️" },
  { name: "Noah Williams", email: "noah.w@mail.com", initials: "NW", tint: "bg-primary/20 text-primary", body: "Confirmed, Noah: your reservation is in the system and a reminder will go out before your visit. 📅" },
]

const TOOLBAR = [Bold, Italic, Code, Link2, Strikethrough, List, ListOrdered]

export function EmailInboxVisual() {
  const [typed, setTyped] = useState("")
  const [sent, setSent] = useState(false)
  const [idx, setIdx] = useState(0)
  const msgRef = useRef(0)
  const charRef = useRef(0)
  const phaseRef = useRef<"type" | "hold" | "clear">("type")
  const holdRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      const msg = DRAFTS[msgRef.current % DRAFTS.length].body
      if (phaseRef.current === "type") {
        charRef.current = Math.min(charRef.current + 1, msg.length)
        setTyped(msg.slice(0, charRef.current))
        if (charRef.current >= msg.length) {
          phaseRef.current = "hold"
          holdRef.current = 0
          setSent(true)
        }
      } else if (phaseRef.current === "hold") {
        holdRef.current += 1
        if (holdRef.current > 34) phaseRef.current = "clear"
      } else {
        charRef.current = 0
        msgRef.current += 1
        setIdx(msgRef.current % DRAFTS.length)
        setTyped("")
        setSent(false)
        phaseRef.current = "type"
      }
    }, 45)
    return () => clearInterval(id)
  }, [])

  const draft = DRAFTS[idx]

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          animation: "inboxGlow 6s ease-in-out infinite",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/95 text-white shadow-2xl backdrop-blur-xl"
        style={{ animation: "inboxCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <p className="text-[12.5px] font-semibold tracking-tight text-white">New message</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        </div>

        {/* To field */}
        <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-2.5">
          <span className="w-8 shrink-0 text-[12px] font-semibold text-white/55">To:</span>
          <span key={draft.email} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-2.5" style={{ animation: "inboxRecipientIn 0.4s ease-out both" }}>
            <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${draft.tint}`}>
              {draft.initials}
            </span>
            <span className="text-[11.5px] font-medium text-white/85">{draft.name}</span>
            <span className="text-[11px] text-white/40">&lt;{draft.email}&gt;</span>
          </span>
        </div>

        {/* Via field */}
        <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-2.5">
          <span className="w-8 shrink-0 text-[12px] font-semibold text-white/55">Via:</span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11.5px] font-medium text-white/75">
            support@smslocal.in
            <svg width="9" height="9" viewBox="0 0 10 10" className="text-white/40" aria-hidden>
              <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Formatting toolbar */}
        <div className="flex items-center gap-1 border-b border-white/8 px-3 py-2 text-white/45">
          {TOOLBAR.map((Icon, i) => (
            <span key={i} className="inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/5">
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
          <span className="mx-1 h-4 w-px bg-white/10" />
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md">
            <Undo2 className="h-3.5 w-3.5" />
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md">
            <Redo2 className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Body — live typing */}
        <div className="h-[136px] px-4 py-3">
          {typed.length === 0 && !sent ? (
            <p className="text-[12.5px] text-white/35">Write your message here…</p>
          ) : (
            <p className="text-[12.5px] leading-relaxed text-white/85">
              {typed}
              <span
                className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-primary align-middle"
                style={{ animation: "inboxCaret 1.1s step-end infinite" }}
                aria-hidden
              />
            </p>
          )}
          {sent ? (
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Sent · just now
            </p>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-3 py-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="flex items-center gap-2">
            <span className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-white/55 hover:bg-white/5">Discard</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-sm"
              style={{ animation: "inboxSend 2.6s ease-in-out 1.2s infinite" }}
            >
              Send
              <kbd className="rounded bg-black/15 px-1 py-px font-mono text-[10px] font-bold text-primary-foreground/90">⌘ ↵</kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Floating: agents online */}
      <div
        className="absolute -right-3 -bottom-5 hidden rotate-[4deg] items-center gap-2 rounded-full border border-emerald-400/30 bg-[oklch(0.18_0.03_230)]/95 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-xl backdrop-blur md:flex"
        style={{ animation: "inboxFloatB 6.5s ease-in-out infinite, inboxCardIn 0.9s ease-out 0.75s both" }}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        3 agents online
      </div>

      <style jsx>{`
        @keyframes inboxCardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes inboxGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.04); }
        }
        @keyframes inboxCaret {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes inboxRecipientIn {
          0% { opacity: 0; transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes inboxSend {
          0%, 100% { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
          50% { transform: translateY(-1.5px); box-shadow: 0 8px 18px color-mix(in oklch, var(--primary) 35%, transparent); }
        }
        @keyframes inboxFloatA {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(-5deg) translateY(-6px); }
        }
        @keyframes inboxFloatB {
          0%, 100% { transform: rotate(4deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  )
}

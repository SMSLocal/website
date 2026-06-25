"use client"

import { useEffect, useRef, useState } from "react"
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Phone,
  Search,
  Send,
  Smartphone,
  Star,
} from "lucide-react"

/* ── channel config ─────────────────────────────────────────────────────── */
const CH = {
  whatsapp:  { Icon: MessageCircle, dot: "bg-emerald-500", label: "WHATSAPP",  badge: "bg-emerald-50 text-emerald-700" },
  email:     { Icon: Mail,          dot: "bg-sky-500",     label: "EMAIL",      badge: "bg-sky-50 text-sky-700" },
  instagram: { Icon: Instagram,     dot: "bg-pink-500",    label: "INSTAGRAM",  badge: "bg-pink-50 text-pink-700" },
  messenger: { Icon: Facebook,      dot: "bg-blue-500",    label: "MESSENGER",  badge: "bg-blue-50 text-blue-700" },
  telegram:  { Icon: Send,          dot: "bg-cyan-500",    label: "TELEGRAM",   badge: "bg-cyan-50 text-cyan-700" },
  sms:       { Icon: Smartphone,    dot: "bg-violet-500",  label: "SMS",        badge: "bg-violet-50 text-violet-700" },
  voice:     { Icon: Phone,         dot: "bg-amber-500",   label: "VOICE",      badge: "bg-amber-50 text-amber-700" },
  line:      { Icon: MessageCircle, dot: "bg-green-600",   label: "LINE",       badge: "bg-green-50 text-green-700" },
  tiktok:    { Icon: Music2,        dot: "bg-fuchsia-500", label: "TIKTOK",     badge: "bg-fuchsia-50 text-fuchsia-700" },
} as const
type ChKey = keyof typeof CH

/* ── data ───────────────────────────────────────────────────────────────── */
const SIDEBAR_CHANNELS: { name: string; ch: ChKey; count?: number }[] = [
  { name: "WhatsApp",  ch: "whatsapp",  count: 12 },
  { name: "Email",     ch: "email",     count: 8  },
  { name: "Instagram", ch: "instagram", count: 5  },
  { name: "Messenger", ch: "messenger", count: 3  },
  { name: "Telegram",  ch: "telegram",  count: 2  },
  { name: "Line",      ch: "line"                 },
  { name: "TikTok",    ch: "tiktok"               },
]

const CONVOS = [
  { initials: "JC", color: "bg-indigo-500",  name: "Jessica Chen",     preview: "Is order #4421 shipped yet?",       ch: "whatsapp"  as ChKey, time: "2m",  unread: 2, active: true  },
  { initials: "MW", color: "bg-teal-500",    name: "Marcus Williams",  preview: "About the subscription renewal…",   ch: "email"     as ChKey, time: "5m",  unread: 1               },
  { initials: "AR", color: "bg-pink-500",    name: "Ashley Rodriguez", preview: "DM'd you about the linen tee",      ch: "instagram" as ChKey, time: "12m"                           },
  { initials: "TB", color: "bg-amber-500",   name: "Tyler Brooks",     preview: "Thanks for the quick reply!",       ch: "messenger" as ChKey, time: "1h"                            },
  { initials: "MO", color: "bg-purple-500",  name: "Megan O'Connor",   preview: "Sent you the receipt copy",         ch: "email"     as ChKey, time: "3h"                            },
]

const PREV_SEEN: { ch: ChKey; ago: string }[] = [
  { ch: "whatsapp", ago: "2h" },
  { ch: "email",    ago: "1d" },
  { ch: "instagram",ago: "4d" },
]

/* ── animated messages script ───────────────────────────────────────────── */
type MsgType = "customer" | "agent" | "note"
const SCRIPT: { type: MsgType; text: string; time?: string; author?: string }[] = [
  { type: "customer", text: "Is order #4421 shipped yet?",                             time: "9:41 AM" },
  { type: "agent",    text: "Checking now — one moment, Jessica.",                     time: "9:42 AM" },
  { type: "note",     text: "She's a VIP — order ships tomorrow, ping with tracking.", author: "@sarah" },
  { type: "customer", text: "Any update? Getting a bit anxious 😅",                   time: "9:46 AM" },
  { type: "agent",    text: "Just confirmed — ships today! Sending tracking link now 🚀", time: "9:47 AM" },
  { type: "customer", text: "Amazing, thank you so much! 🙌",                         time: "9:47 AM" },
]

/* ── component ──────────────────────────────────────────────────────────── */
export function InboxVisual() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping]             = useState(false)
  const streamRef                        = useRef<HTMLDivElement>(null)

  /* auto-scroll to latest bubble */
  useEffect(() => {
    const el = streamRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [visibleCount, typing])

  /* reveal one message at a time, loop when done */
  useEffect(() => {
    let typingTimer: ReturnType<typeof setTimeout>
    const tick = setInterval(() => {
      setTyping(true)
      typingTimer = setTimeout(() => {
        setTyping(false)
        setVisibleCount((prev) => (prev >= SCRIPT.length ? 0 : prev + 1))
      }, 900)
    }, 2200)
    return () => { clearInterval(tick); clearTimeout(typingTimer) }
  }, [])

  const visible  = SCRIPT.slice(0, visibleCount)
  const nextType = SCRIPT[visibleCount % SCRIPT.length]?.type ?? "agent"

  return (
    <div className="relative">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 38%, transparent), transparent 70%)",
          animation: "ibGlow 6s ease-in-out infinite",
        }}
      />

      {/* card */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
        style={{ animation: "ibIn 0.85s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* ── window chrome ── */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[oklch(0.13_0.02_230)] px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10.5px] text-white/50">
            <span className="text-white/70">app.smslocal.com</span>
            <span className="text-white/25">/</span>
            <span>inbox</span>
          </div>
          <span className="text-[10px] text-white/35">⌘K</span>
        </div>

        {/* ── three panels ── */}
        <div className="flex bg-[oklch(0.16_0.02_230)]" style={{ height: 360 }}>

          {/* LEFT SIDEBAR */}
          <div className="hidden w-[118px] shrink-0 flex-col border-r border-white/10 bg-white/[0.02] sm:flex">
            <div className="px-3 pb-1 pt-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">Channels</p>
            </div>
            <ul className="flex flex-col gap-0.5 px-2">
              {SIDEBAR_CHANNELS.map(({ name, ch, count }) => {
                const { dot } = CH[ch]
                return (
                  <li key={name} className="flex items-center gap-2 rounded-md px-1.5 py-1 first:bg-primary/10">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
                    <span className="flex-1 truncate text-[11px] font-medium text-white/70">{name}</span>
                    {count ? (
                      <span className="text-[10px] font-semibold text-primary">{count}</span>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto border-t border-white/10 px-3 py-3">
              <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">Today</p>
              {[
                { label: "Conversations", value: "142" },
                { label: "Avg first reply", value: "2m" },
                { label: "Resolved", value: "89" },
              ].map(({ label, value }) => (
                <div key={label} className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-white/45">{label}</span>
                  <span className="text-[10.5px] font-semibold text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE — conversation list */}
          <div className="flex w-[178px] shrink-0 flex-col border-r border-white/10">
            {/* list header */}
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              <div>
                <p className="text-[11.5px] font-semibold text-white/85">All conversations</p>
                <p className="text-[9.5px] text-white/40">142 open</p>
              </div>
              <Search className="h-3.5 w-3.5 text-white/35" />
            </div>

            {/* tabs */}
            <div className="flex gap-0 border-b border-white/10 px-2 pt-1">
              {[
                { label: "Mine", count: "5", active: true },
                { label: "Unassigned", count: "3" },
                { label: "All", count: "142" },
              ].map(({ label, count, active }) => (
                <button
                  key={label}
                  className={`px-2 pb-1.5 pt-1 text-[9.5px] font-semibold transition ${
                    active ? "border-b-2 border-primary text-primary" : "text-white/35"
                  }`}
                >
                  {label} <span className={active ? "text-primary" : "text-white/20"}>{count}</span>
                </button>
              ))}
            </div>

            {/* rows */}
            <ul className="flex flex-col divide-y divide-white/[0.04] overflow-hidden">
              {CONVOS.map(({ initials, color, name, preview, ch, time, unread, active }) => {
                const { dot, badge, label } = CH[ch]
                return (
                  <li
                    key={name}
                    className={`flex cursor-default items-start gap-2 px-2.5 py-2 ${active ? "bg-primary/[0.08]" : "hover:bg-white/[0.03]"}`}
                  >
                    <span className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${color}`}>
                      {initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate text-[11px] font-semibold text-white/85">{name}</span>
                        <span className="shrink-0 text-[9.5px] text-white/35">{time}</span>
                      </div>
                      <p className="truncate text-[10px] text-white/45">{preview}</p>
                      <div className="mt-0.5 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wide ${badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                          {label}
                        </span>
                        {unread ? (
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8.5px] font-bold text-white">
                            {unread}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* RIGHT — conversation detail */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* detail header */}
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                  JC
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold text-white/85">Jessica Chen</p>
                  <p className="text-[9.5px] text-white/40">3 channels · 1 profile</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-white/20" />
              </div>
            </div>

            {/* previously seen on */}
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-wide text-white/35">Previously seen on</span>
              {PREV_SEEN.map(({ ch, ago }) => {
                const { dot, label } = CH[ch]
                return (
                  <span key={ch} className="inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-1.5 py-0.5 text-[9px] font-medium text-white/60">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    {label.charAt(0) + label.slice(1).toLowerCase()} <span className="text-white/35">{ago}</span>
                  </span>
                )
              })}
            </div>

            {/* messages — animated stream */}
            <div
              ref={streamRef}
              className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {visible.map((msg, i) => {
                const isLast = i === visible.length - 1
                const enterStyle = isLast
                  ? { animation: "ibBubble 0.4s cubic-bezier(0.22,1,0.36,1) both" }
                  : undefined

                if (msg.type === "customer") return (
                  <div key={i} className="flex justify-start" style={enterStyle}>
                    <div className="max-w-[78%] rounded-2xl rounded-bl-sm border border-white/8 bg-white/[0.06] px-3 py-2">
                      <p className="text-[11px] leading-snug text-white/80">{msg.text}</p>
                      {msg.time && <p className="mt-0.5 text-[8.5px] text-white/35">{msg.time}</p>}
                    </div>
                  </div>
                )

                if (msg.type === "agent") return (
                  <div key={i} className="flex justify-end" style={enterStyle}>
                    <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-primary px-3 py-2">
                      <p className="text-[11px] leading-snug text-primary-foreground">{msg.text}</p>
                      {msg.time && <p className="mt-0.5 text-right text-[8.5px] text-primary-foreground/60">{msg.time}</p>}
                    </div>
                  </div>
                )

                /* private note */
                return (
                  <div key={i} className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2" style={enterStyle}>
                    <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-400">{msg.author} · private note</p>
                    <p className="text-[10.5px] leading-snug text-amber-200/80">{msg.text}</p>
                  </div>
                )
              })}

              {/* typing indicator */}
              {typing && (
                <div className={`flex ${nextType === "agent" ? "justify-end" : "justify-start"}`}>
                  <span
                    className={`inline-flex items-center gap-1 rounded-2xl px-3 py-2 ${
                      nextType === "agent" ? "rounded-br-sm bg-primary" : "rounded-bl-sm border border-white/8 bg-white/[0.06]"
                    }`}
                  >
                    {[0, 200, 400].map((delay) => (
                      <span
                        key={delay}
                        className={`h-1.5 w-1.5 rounded-full ${nextType === "agent" ? "bg-primary-foreground/70" : "bg-white/40"}`}
                        style={{ animation: `ibDot 1.2s ease-in-out ${delay}ms infinite` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* reply area */}
            <div className="border-t border-white/10">
              <div className="flex gap-3 border-b border-white/10 px-3 pt-2">
                {["Reply", "Private Note"].map((t, i) => (
                  <button key={t} className={`pb-1.5 text-[10px] font-semibold ${i === 0 ? "border-b-2 border-primary text-primary" : "text-white/35"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="flex-1 truncate text-[10.5px] text-white/30">Reply via WhatsApp…</span>
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Send className="h-3 w-3" />
                </span>
              </div>
            </div>

            {/* avg reply chip */}
            <div className="flex justify-end px-3 pb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9.5px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Avg reply 2m
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ibIn {
          0%   { opacity: 0; transform: translateY(16px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ibGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes ibBubble {
          0%   { opacity: 0; transform: translateY(8px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ibDot {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-3px); opacity: 1;   }
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

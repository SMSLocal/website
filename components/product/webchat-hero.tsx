"use client"

import { useEffect, useState, type ReactNode } from "react"
import {
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronLeft,
  Headphones,
  Lock,
  Package,
  Paperclip,
  RotateCcw,
  Send,
  Shirt,
  Smile,
  Sparkles,
  UserCheck,
  Users,
  Zap,
} from "lucide-react"

// Hero artwork for /channels/web-chat, a code replica of the supplied design: a browser window with a live chat
// (visitor question, AI answer with an action card, visitor asks for a person, a human agent joins with the full
// context) and four feature cards beside it, in the design's own greens. Three store screens (delivery, sizing,
// returns) play one after another and the feature cards light up as the matching step happens.

type Screen = {
  url: string
  t1: string; q1: string
  yes: string
  cardIcon: "cal" | "shirt" | "return"; cardTitle: string; chip: string; cta: string
  t2: string; t3: string; q2: string
  agent: string; reply: string
  main: number
}

const SCREENS: Screen[] = [
  {
    url: "yourstore.com/checkout", t1: "10:24 AM", q1: "Hi, do you deliver to Pune by Friday?",
    yes: "Orders before 5 PM reach Pune by Friday.",
    cardIcon: "cal", cardTitle: "Pune · Fri, 14 Nov", chip: "Free", cta: "Track order",
    t2: "10:26 AM", t3: "10:27 AM", q2: "Can I talk to someone about a bulk order?",
    agent: "Priya from Sales", reply: "Happy to help! How many units?", main: 1,
  },
  {
    url: "yourstore.com/linen-shirt", t1: "2:10 PM", q1: "Does this come in size M?",
    yes: "Size M is in stock, ready to ship.",
    cardIcon: "shirt", cardTitle: "Linen Shirt · ₹1,499", chip: "In stock", cta: "Add to cart",
    t2: "2:12 PM", t3: "2:13 PM", q2: "Is there a discount if I buy three?",
    agent: "Rahul from Sales", reply: "Sure! Let me set up a bundle price.", main: 0,
  },
  {
    url: "yourstore.com/orders/1042", t1: "6:42 PM", q1: "I want to return my order. How does it work?",
    yes: "7-day free returns. Your label is ready.",
    cardIcon: "return", cardTitle: "Return label · 7 days", chip: "Free", cta: "Get label",
    t2: "6:44 PM", t3: "6:45 PM", q2: "Where will my refund go?",
    agent: "Anita from Support", reply: "Refunds reach you in 3 to 5 days.", main: 0,
  },
]

const FEATURES = [
  { icon: Zap, label: "Instant AI Replies" },
  { icon: Package, label: "Order Tracking" },
  { icon: Users, label: "Live Agent Handover" },
  { icon: BarChart3, label: "Full Conversation Context" },
]

// colours taken from the reference design
const C = {
  green: "#18a574",
  greenDk: "#0f8f61",
  mint: "#e2f6ec",
  mintLine: "#bfe7d2",
  mintSoft: "#f0faf5",
  bubble: "#eaf5f0",
  teal: "#0b4a47",
  tealDk: "#073c3a",
  ink: "#12303a",
  grey: "#8a9ba3",
  yellow: "#fff0c4",
  bolt: "#f4a418",
  line: "#e3eeea",
}

const CSS = `
@keyframes wch-in { from { opacity: 0; transform: translateY(14px) scale(.97) } to { opacity: 1; transform: none } }
@keyframes wch-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .4 } 30% { transform: translateY(-5px); opacity: 1 } }
@keyframes wch-bobu { 0%, 100% { transform: translateY(0) rotate(0) } 50% { transform: translateY(-5px) rotate(12deg) } }
@keyframes wch-ping { 0% { box-shadow: 0 0 0 0 rgba(24,165,116,.55) } 100% { box-shadow: 0 0 0 7px rgba(24,165,116,0) } }
@keyframes wch-bar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
.wch-in { animation: wch-in .5s cubic-bezier(.3,1.2,.4,1) both }
.wch-dot { animation: wch-dot 1s ease-in-out infinite }
.wch-bob { animation: wch-bobu 4s ease-in-out infinite }
.wch-ping { animation: wch-ping 1.8s ease-out infinite }
.wch-bar { transform-origin: left; animation: wch-bar 12s linear both }
@media (prefers-reduced-motion: reduce) { .wch-in, .wch-dot, .wch-bar, .wch-bob, .wch-ping { animation: none } }
`

function Person({ s = 36 }: { s?: number }) {
  return (
    <span className="relative inline-flex"><svg width={s} height={s} viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="18" fill={C.mint} />
      <circle cx="18" cy="14" r="6" fill={C.green} />
      <path d="M6 33 Q18 17 30 33Z" fill={C.green} />
    </svg><i className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white" style={{ background: C.green }} /></span>
  )
}

function Initial({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold" style={{ background: C.mint, color: C.green }}>
      {children}
    </span>
  )
}

export function WebChatHero() {
  const [screen, setScreen] = useState(0)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(6)
      return
    }
    setStage(0)
    const steps: [number, number][] = [[1, 300], [2, 1300], [3, 2500], [4, 5400], [5, 6600], [6, 8800]]
    const timers = steps.map(([s, t]) => window.setTimeout(() => setStage(s), t))
    timers.push(window.setTimeout(() => setScreen((n) => (n + 1) % SCREENS.length), 12000))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [screen])

  const sc = SCREENS[screen]
  const lit = stage >= 6 ? 3 : stage >= 4 ? 2 : stage >= 3 ? sc.main : -1
  const CardIcon = sc.cardIcon === "cal" ? CalendarDays : sc.cardIcon === "shirt" ? Shirt : RotateCcw

  return (
    <div className="relative mx-auto w-full max-w-[720px] lg:h-full lg:max-w-none" style={{ color: C.ink }}>
      <div className="grid items-stretch gap-5 sm:grid-cols-[1fr_210px] lg:h-full">
        {/* the browser window */}
        <div className="relative h-[480px] lg:h-full">
        <span aria-hidden className="wch-bob absolute -left-3 -top-3 z-10 text-[color:var(--c-green)]" style={{ ["--c-green" as string]: C.green }}><Sparkles className="h-5 w-5" /></span>
        <span aria-hidden className="wch-bob absolute -bottom-3 right-10 z-10" style={{ color: C.green, animationDelay: "-2s" }}><Sparkles className="h-4 w-4" /></span>
        <span className="absolute -top-3 right-8 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10.5px] font-bold shadow-md" style={{ border: `1px solid ${C.mintLine}`, color: C.green }}><i className="wch-ping relative h-2 w-2 rounded-full" style={{ background: C.green }} />Live chat</span>
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] bg-white" style={{ border: `1px solid ${C.line}`, boxShadow: "0 40px 70px -36px rgba(10,80,60,.4), 0 14px 30px -16px rgba(10,80,60,.22)", background: "linear-gradient(180deg, #ffffff 55%, #f4fbf7)" }}>
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: `1px solid ${C.line}` }}>
            <span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
            <span key={sc.url} className="wch-in flex flex-1 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold" style={{ background: C.mintSoft, border: `1px solid ${C.line}` }}>
              <Lock className="h-3 w-3" style={{ color: C.green }} />{sc.url}
            </span>
            <span className="flex gap-1.5">
              {SCREENS.map((sx, i) => (
                <button key={sx.url} type="button" aria-label={`Show example ${i + 1}`} aria-pressed={i === screen} onClick={() => setScreen(i)} className={`h-1.5 rounded-full transition-all ${i === screen ? "w-5" : "w-1.5 hover:opacity-70"}`} style={{ background: i === screen ? C.green : C.mintLine }} />
              ))}
            </span>
          </div>

          <div key={screen} className="flex min-h-0 flex-1 flex-col justify-start gap-1.5 overflow-hidden bg-white px-4 pb-1.5 pt-3">
            {stage >= 1 && (
              <div className="wch-in flex items-start gap-2.5">
                <Initial>M</Initial>
                <div>
                  <p className="rounded-2xl rounded-tl-md px-3.5 py-2 text-[12.5px] font-medium leading-snug" style={{ background: C.bubble }}>{sc.q1}</p>
                </div>
              </div>
            )}

            {stage === 2 && (
              <div className="wch-in ml-auto flex items-center gap-1.5 rounded-full px-4 py-2.5" style={{ background: C.mint, border: `1px solid ${C.mintLine}` }}>
                {[0, 0.15, 0.3].map((d) => <i key={d} className="wch-dot h-1.5 w-1.5 rounded-full" style={{ background: C.green, animationDelay: `${d}s` }} />)}
              </div>
            )}

            {stage >= 3 && (
              <div className="wch-in ml-auto flex max-w-[94%] items-start gap-2.5">
                <div>
                  <div className="rounded-2xl rounded-tr-md p-2.5" style={{ background: `linear-gradient(135deg, ${C.mint}, #d4f1e3)`, border: `1px solid ${C.mintLine}`, boxShadow: "0 12px 24px -16px rgba(24,165,116,.6)" }}>
                    <p className="flex items-start gap-2 text-[12.5px] font-bold leading-snug">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: C.green }}><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                      <span className="flex-1"><span style={{ color: C.green }}>Yes!</span> {sc.yes}</span>
                      <span className="flex items-center gap-0.5 whitespace-nowrap text-[10px] font-bold" style={{ color: C.green }}><Zap className="h-3 w-3" style={{ fill: C.green }} />AI · 2s</span>
                    </p>
                    <div className="mt-1.5 rounded-xl bg-white p-2" style={{ border: `1px solid ${C.mintLine}` }}>
                      <p className="flex items-center justify-between text-[12.5px] font-bold">
                        <span className="flex items-center gap-2"><CardIcon className="h-4 w-4" style={{ color: C.green }} />{sc.cardTitle}</span>
                        <span className="rounded-full px-2.5 py-0.5 text-[10.5px] font-bold" style={{ background: C.mint, color: C.green }}>{sc.chip}</span>
                      </p>
                      <div className="mt-1.5 flex gap-2">
                        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-1 text-[11.5px] font-bold text-white" style={{ background: `linear-gradient(135deg, #25b580, ${C.greenDk})`, boxShadow: "0 8px 16px -8px rgba(24,165,116,.7)" }}><Package className="h-3.5 w-3.5" />{sc.cta}</span>
                        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-1 text-[11.5px] font-bold" style={{ border: `1px solid ${C.mintLine}` }}><Headphones className="h-3.5 w-3.5" style={{ color: C.green }} />Talk to a person</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg, #2dc08a, ${C.greenDk})`, boxShadow: `0 0 0 3px ${C.mint}` }}><Bot className="h-4 w-4" /></span>
              </div>
            )}

            {stage >= 4 && (
              <p className="wch-in mx-auto flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11.5px] font-bold" style={{ border: `1px solid ${C.mintLine}`, color: C.green }}>
                <UserCheck className="h-3.5 w-3.5" />{sc.agent} joined · Full context shared
              </p>
            )}

            {stage >= 5 && (
              <div className="wch-in ml-auto flex max-w-[90%] items-start gap-2.5">
                <div>
                  <p className="rounded-2xl rounded-tr-md px-3.5 py-2 text-[12.5px] font-semibold leading-snug text-white" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDk})` }}>{sc.reply}</p>
                  <p className="mt-0.5 flex items-center justify-end gap-1 pr-1 text-[10px]" style={{ color: C.grey }}>{sc.t3}<CheckCheck className="h-3 w-3" style={{ color: C.green }} /></p>
                </div>
                <Person />
              </div>
            )}

          </div>
          <div className="bg-white px-4 pb-2.5">
            <div className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2" style={{ border: `1px solid ${C.line}`, boxShadow: "0 8px 20px -14px rgba(10,80,60,.3)" }}>
              <Sparkles className="h-4 w-4 shrink-0" style={{ color: C.green }} />
              <span className="flex-1 text-[12.5px]" style={{ color: C.grey }}>Type your message...</span>
              <Paperclip className="h-4 w-4" style={{ color: C.grey }} /><Smile className="h-4 w-4" style={{ color: C.grey }} />
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: C.green }}><Send className="h-3.5 w-3.5" /></span>
            </div>
          </div>
        </div>
        </div>

        {/* feature cards */}
        <ul className="relative grid grid-cols-2 gap-3.5 sm:grid-cols-1 sm:grid-rows-4 sm:pl-5" style={{ perspective: 900 }}>
          <span aria-hidden className="absolute bottom-10 left-[5px] top-10 hidden w-px sm:block" style={{ background: `repeating-linear-gradient(to bottom, ${C.mintLine} 0 4px, transparent 4px 9px)` }} />
          {FEATURES.map((f, i) => {
            const on = i === lit
            const done = lit > i && lit !== -1
            return (
              <li
                key={f.label}
                className="group relative flex cursor-default items-center gap-3 rounded-2xl px-3.5 transition-all duration-700 ease-out"
                style={{
                  background: on ? `linear-gradient(135deg, #ffffff, ${C.mintSoft})` : "#fff",
                  border: `1px solid ${on ? C.green : C.line}`,
                  transformOrigin: "right center",
                  transform: `rotateY(-16deg) translateZ(${on ? 56 : 0}px)`,
                  boxShadow: on
                    ? "-1px 1px 0 #2dbb86, -2px 2px 0 #26b07d, -3px 3px 0 #1fa574, -4px 4px 0 #189a6b, -5px 5px 0 #138f62, -14px 26px 36px -10px rgba(24,165,116,.55)"
                    : "-1px 1px 0 #d6efe3, -2px 2px 0 #cdeadc, -3px 3px 0 #c4e5d4, -4px 4px 0 #bbe0cc, -5px 5px 0 #b2dbc5, -10px 18px 26px -12px rgba(10,80,60,.35)",
                }}
              >
                <i aria-hidden className="absolute -left-[26px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white transition-all duration-500 sm:block" style={{ background: on || done ? C.green : C.mintLine, boxShadow: on ? `0 0 0 4px ${C.mint}` : undefined }} />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-105" style={{ background: i === 0 ? C.yellow : on ? `linear-gradient(135deg, #2dc08a, ${C.greenDk})` : `linear-gradient(135deg, ${C.mintSoft}, ${C.mint})`, color: i === 0 ? C.bolt : on ? "#fff" : C.green, boxShadow: on ? "0 8px 16px -6px rgba(24,165,116,.6)" : undefined }}>
                  <f.icon className="h-5 w-5" style={i === 0 ? { fill: C.bolt } : undefined} />
                </span>
                <span className="flex-1 text-[13.5px] font-bold leading-tight">{f.label}</span>
                {on ? (
                  <span className="wch-in flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: C.green }}><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                ) : (
                  <span className="shrink-0 text-[10px] font-bold tabular-nums" style={{ color: C.mintLine }}>0{i + 1}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <style>{CSS}</style>
    </div>
  )
}

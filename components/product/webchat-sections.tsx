"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  Check,
  Code2,
  GraduationCap,
  Headphones,
  HeartPulse,
  Home,
  Inbox,
  Link2,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  MousePointerClick,
  Palette,
  Plug,
  Rocket,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  X,
  Zap,
  Laptop,
  Plus,
} from "lucide-react"

// Bespoke sections for /channels/web-chat (everything below the stats strip). Each one has its own layout and art, and
// none of them reuses the shared product-page blocks or the WhatsApp and Instagram page designs.

const TEAL = "var(--primary)"
const NAVY = "var(--foreground)"
const AMBER = "oklch(0.85 0.14 80)"

const CSS = `
@keyframes wcs-flow { to { stroke-dashoffset: -28 } }
@keyframes wcs-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes wcs-blink { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
@keyframes wcs-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
.wcs-flow { animation: wcs-flow 1.6s linear infinite }
.wcs-bob { animation: wcs-bob 5s ease-in-out infinite }
.wcs-blink { animation: wcs-blink 2.4s ease-in-out infinite }
.wcs-in { animation: wcs-in .45s ease-out both }
@media (prefers-reduced-motion: reduce) { .wcs-flow, .wcs-bob, .wcs-blink, .wcs-in { animation: none } }
`

export function WebChatStyles() {
  return <style>{CSS}</style>
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  )
}

const H2 = "text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[38px] lg:whitespace-nowrap"

/* ───────────── 1. PROBLEM: two visitor journeys on one timeline ───────────── */

const STEPS_JOURNEY = ["Lands on site", "Reads pricing", "Has a question", "Decides"]

export function WebChatProblem() {
  return (
    <section className="border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Most website visitors leave without talking to anyone</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">
            A visitor has a question, doesn&apos;t find the answer in three clicks and leaves. A website chat widget with
            agentic AI greets them, answers instantly and captures the ones who were ready to buy or ask, before they
            close the tab.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl space-y-5">
          {/* without chat */}
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[14px] font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/50"><X className="h-4 w-4" strokeWidth={3} /></span>Without chat</p>
              <span className="rounded-full bg-accent/40 px-3 py-1 text-[11.5px] font-bold">Visitor bounces</span>
            </div>
            <ol className="mt-6 grid grid-cols-4 items-center gap-2">
              {STEPS_JOURNEY.map((t, i) => (
                <li key={t} className="relative text-center">
                  <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 text-[12px] font-bold ${i < 3 ? "border-border bg-muted text-muted-foreground" : "border-dashed border-border text-muted-foreground/50"}`}>{i < 3 ? i + 1 : <X className="h-4 w-4" />}</span>
                  <span className={`mt-2 block text-[12px] font-medium sm:text-[13px] ${i < 3 ? "" : "text-muted-foreground/60 line-through"}`}>{t}</span>
                  {i < 3 && <span aria-hidden className="absolute left-[calc(50%+22px)] right-[calc(-50%+22px)] top-[18px] border-t-2 border-dashed border-border" />}
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-2xl bg-muted/70 px-4 py-3 text-[13.5px] text-muted-foreground">No one to ask, so the question goes unanswered and the visitor leaves.</p>
          </div>

          {/* with chat */}
          <div className="rounded-3xl border border-primary/40 bg-card p-5 shadow-[0_24px_60px_-34px_oklch(0.62_0.14_168/0.7)] sm:p-7">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[14px] font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" strokeWidth={3} /></span>With SMSLocal web chat</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11.5px] font-bold text-primary">Visitor converts</span>
            </div>
            <ol className="mt-6 grid grid-cols-4 items-center gap-2">
              {STEPS_JOURNEY.map((t, i) => (
                <li key={t} className="relative text-center">
                  <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold ${i === 2 ? "bg-foreground text-background" : "bg-primary text-primary-foreground"}`}>{i === 2 ? <MessageCircle className="h-4 w-4" /> : i === 3 ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}</span>
                  <span className="mt-2 block text-[12px] font-medium sm:text-[13px]">{t}</span>
                  {i < 3 && <svg aria-hidden className="absolute left-[calc(50%+22px)] right-[calc(-50%+22px)] top-[17px] h-1" preserveAspectRatio="none" viewBox="0 0 100 2"><line x1="0" y1="1" x2="100" y2="1" stroke={TEAL} strokeWidth="2" strokeDasharray="6 8" className="wcs-flow" vectorEffect="non-scaling-stroke" /></svg>}
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl bg-primary/5 px-4 py-3 text-[13.5px]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary"><Zap className="h-4 w-4 fill-primary" />Chat greets them, AI answers in seconds,</span>
              <span className="text-muted-foreground">and a person joins when needed.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 2. FEATURES: interactive tabs with a live preview ───────────── */

const SWATCHES = [
  { n: "Teal", bg: "var(--primary)", fg: "var(--primary-foreground)" },
  { n: "Navy", bg: "oklch(0.22 0.03 230)", fg: "#fff" },
  { n: "Amber", bg: "var(--accent)", fg: "oklch(0.22 0.04 60)" },
]

function PanelCustomize() {
  const [c, setC] = useState(0)
  const [right, setRight] = useState(true)
  const [pre, setPre] = useState(true)
  const sw = SWATCHES[c]
  return (
    <div className="grid h-full gap-5 sm:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
        <div>
          <p className="text-[12px] font-semibold text-muted-foreground">Brand color</p>
          <div className="mt-2 flex gap-2">
            {SWATCHES.map((s, i) => (
              <button key={s.n} type="button" aria-label={`Use the ${s.n.toLowerCase()} widget color`} aria-pressed={c === i} onClick={() => setC(i)} className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${c === i ? "border-foreground" : "border-white shadow"}`} style={{ background: s.bg }} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-muted-foreground">Position</p>
          <div className="mt-2 inline-flex rounded-full bg-muted p-1 text-[12.5px] font-semibold">
            {["Left", "Right"].map((p) => (
              <button key={p} type="button" aria-pressed={(p === "Right") === right} onClick={() => setRight(p === "Right")} className={`rounded-full px-4 py-1.5 transition ${(p === "Right") === right ? "bg-card shadow" : "text-muted-foreground"}`}>{p}</button>
            ))}
          </div>
        </div>
        <label className="flex items-center justify-between rounded-xl bg-muted/70 px-3 py-2.5 text-[13px] font-medium">
          Prechat form
          <button type="button" role="switch" aria-checked={pre} aria-label="Prechat form" onClick={() => setPre((v) => !v)} className={`relative h-5 w-9 rounded-full transition-colors ${pre ? "bg-primary" : "bg-border"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${pre ? "left-[18px]" : "left-0.5"}`} />
          </button>
        </label>
      </div>
      <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-muted/40 to-card p-4">
        <div className="space-y-2"><span className="block h-3 w-1/2 rounded-full bg-foreground/70" /><span className="block h-2.5 w-3/4 rounded-full bg-border" /><span className="block h-2.5 w-2/3 rounded-full bg-border" /></div>
        <div className={`absolute bottom-4 flex w-[190px] flex-col gap-2 transition-all duration-500 ${right ? "right-4 items-end" : "left-4 items-start"}`}>
          <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-center gap-2 px-3 py-2 text-[12px] font-semibold transition-colors duration-500" style={{ background: sw.bg, color: sw.fg }}><Bot className="h-4 w-4" />Support</div>
            <div className="space-y-1.5 p-3 text-[11.5px]">
              {pre ? (
                <>
                  <p className="font-semibold text-muted-foreground">Before we start</p>
                  <p className="rounded-lg bg-muted px-2.5 py-1.5">Your name</p>
                  <p className="rounded-lg bg-muted px-2.5 py-1.5">Your email</p>
                </>
              ) : (
                <p className="rounded-xl rounded-bl-sm bg-muted px-2.5 py-2">Hi! How can we help?</p>
              )}
            </div>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors duration-500" style={{ background: sw.bg, color: sw.fg }}><MessageCircle className="h-5 w-5" /></span>
        </div>
      </div>
    </div>
  )
}

function PanelAi() {
  return (
    <div className="grid h-full gap-5 sm:grid-cols-[1.15fr_1fr]">
      <div className="space-y-2.5 rounded-2xl border border-border bg-card p-4 text-[13px]">
        <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5">How much is shipping to Pune?</p>
        <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-primary-foreground">
          Free over ₹999. Delivery by Friday for orders before 5 PM.
          <p className="mt-1.5 flex flex-wrap gap-1.5">{["Shipping FAQ", "Pricing page"].map((t) => <span key={t} className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-semibold">{t}</span>)}</p>
        </div>
        <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5">Can I talk to someone about bulk orders?</p>
        <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11.5px] font-semibold text-primary"><UserCheck className="h-3.5 w-3.5" />Agent joined · context shared</p>
      </div>
      <ul className="space-y-3">
        {[[Zap, "Answers in seconds", "From your FAQs, catalog and policies"], [BadgeCheck, "Cites its sources", "Every answer links to your own content"], [Headphones, "Hands off smoothly", "A person takes over with the full thread"]].map(([I, t, d]) => {
          const Icon = I as typeof Zap
          return (
            <li key={t as string} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
              <span><span className="block text-[14px] font-semibold">{t as string}</span><span className="text-[12.5px] text-muted-foreground">{d as string}</span></span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function PanelTrigger() {
  const [on, setOn] = useState([true, true, false])
  return (
    <div className="grid h-full gap-5 sm:grid-cols-[1.1fr_1fr]">
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
        {[["Visitor spends 30 seconds on /pricing", "Time on page"], ["Scrolled past 60% of the page", "Scroll depth"], ["Came from a paid campaign", "Traffic source"]].map(([t, k], i) => (
          <label key={t} className="flex cursor-pointer items-center gap-3 rounded-xl bg-muted/60 px-3.5 py-3">
            <MousePointerClick className="h-4 w-4 shrink-0 text-primary" />
            <span className="flex-1"><span className="block text-[13px] font-semibold">{t}</span><span className="text-[11.5px] text-muted-foreground">{k}</span></span>
            <button type="button" role="switch" aria-checked={on[i]} aria-label={k} onClick={() => setOn((a) => a.map((v, j) => (j === i ? !v : v)))} className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on[i] ? "bg-primary" : "bg-border"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on[i] ? "left-[18px]" : "left-0.5"}`} />
            </button>
          </label>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-primary">Then show</p>
        <p className="wcs-bob w-fit rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 text-[14px] font-medium shadow-lg">👋 Need help choosing a plan?</p>
        <p className="text-[12.5px] text-muted-foreground">Greet visitors at the right moment, based on how they behave.</p>
      </div>
    </div>
  )
}

function PanelSdk() {
  return (
    <div className="grid h-full gap-5 sm:grid-cols-[1.2fr_.8fr]">
      <div className="overflow-hidden rounded-2xl bg-[oklch(0.16_0.03_230)] text-[12.5px] text-white/85">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[11.5px] font-semibold text-white/60"><Code2 className="h-4 w-4 text-primary" />Install the widget</div>
        <pre className="overflow-x-auto px-4 py-4 leading-relaxed"><span className="text-primary">&lt;script</span> src=<span className="text-accent">&quot;chat.js&quot;</span>{"\n"}  data-site=<span className="text-accent">&quot;yourstore&quot;</span>{"\n"}  async <span className="text-primary">/&gt;</span>{"\n\n"}<span className="text-white/50">{"// or inside your app"}</span>{"\n"}chat.mount(<span className="text-accent">&quot;#support&quot;</span>)</pre>
      </div>
      <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/50 p-4">
        <div className="w-[150px] rounded-[26px] border-[3px] border-foreground/80 bg-card p-2.5 shadow-xl">
          <span className="mx-auto block h-1.5 w-10 rounded-full bg-foreground/30" />
          <p className="mt-3 text-[11px] font-bold">Your App</p>
          <p className="mt-2 rounded-xl rounded-bl-sm bg-muted px-2.5 py-1.5 text-[10.5px]">Hi, need help?</p>
          <p className="mt-1.5 ml-auto w-fit rounded-xl rounded-br-sm bg-primary px-2.5 py-1.5 text-[10.5px] text-primary-foreground">Reset my plan</p>
          <p className="mt-1.5 rounded-xl rounded-bl-sm bg-muted px-2.5 py-1.5 text-[10.5px]">Done! ✔</p>
        </div>
      </div>
    </div>
  )
}

const TABS: { icon: typeof Palette; title: string; body: string; panel: ReactNode }[] = [
  { icon: Palette, title: "Customizable widget", body: "Match colors, position and prechat forms to your brand, so the widget looks like part of your site.", panel: <PanelCustomize /> },
  { icon: Sparkles, title: "AI that answers first", body: "Agentic AI handles pricing, shipping and availability questions before an agent ever needs to pick up.", panel: <PanelAi /> },
  { icon: MousePointerClick, title: "Proactive triggers", body: "Reach visitors at the right moment: time on page, scroll depth or the page they landed on.", panel: <PanelTrigger /> },
  { icon: Code2, title: "In-app SDK chat", body: "Embed the same chat inside your product so logged-in users get support without leaving the app.", panel: <PanelSdk /> },
]

export function WebChatFeatures() {
  const [active, setActive] = useState(0)
  const lastPick = useRef(0)
  const hover = useRef(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      if (hover.current || document.hidden || Date.now() - lastPick.current < 12000) return
      setActive((a) => (a + 1) % TABS.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>What you get</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>A chat widget that does more than sit in the corner</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">Not a static contact form. A website chat widget your visitors actually use, answered by AI first.</p>
        </div>

        <div
          className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.4fr] lg:items-stretch lg:gap-8"
          onMouseEnter={() => { hover.current = true }}
          onMouseLeave={() => { hover.current = false }}
        >
          <ul className="flex flex-col gap-3">
            {TABS.map((t, i) => {
              const on = i === active
              return (
                <li key={t.title} className="flex flex-1">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => { lastPick.current = Date.now(); setActive(i) }}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${on ? "border-primary/60 bg-card shadow-[0_20px_44px_-24px_oklch(0.62_0.14_168/0.6)]" : "border-border bg-card/60 hover:border-primary/30"}`}
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${on ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}><t.icon className="h-5 w-5" /></span>
                    <span className="text-[17px] font-semibold tracking-tight">{t.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="relative flex rounded-[32px] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/15 p-4 sm:p-6">
            <div key={active} className="wcs-in flex-1">{TABS[active].panel}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 3. HOW IT WORKS: code window + stepper ───────────── */

const SETUP = [
  { icon: Plug, t: "Add the script", d: "Paste one line into your site, or mount the SDK inside your app." },
  { icon: SlidersHorizontal, t: "Brand it", d: "Choose colors, position and a prechat form that fit your site." },
  { icon: Bot, t: "Connect your knowledge", d: "Point the AI agent at your FAQs, catalog and policies." },
  { icon: Rocket, t: "Set triggers and go live", d: "Greet visitors on the pages that matter and watch chats arrive." },
]

export function WebChatSteps() {
  return (
    <section className="border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Install live chat in 4 steps</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Add a live chat widget to your website with a single script. Most teams go from install to live chats in one working session.</p>
        </div>

        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="relative flex min-w-0 flex-col justify-between gap-6 py-2">
            <span aria-hidden className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            {SETUP.map((s, i) => (
              <li key={s.t} className="relative flex gap-4">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.13_172)] text-primary-foreground shadow-lg shadow-primary/30"><s.icon className="h-[18px] w-[18px]" /></span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-bold uppercase tracking-wider text-primary">Step {i + 1}</span>
                  <span className="block text-[17px] font-semibold tracking-tight">{s.t}</span>
                  <span className="mt-0.5 block text-[14px] leading-relaxed text-muted-foreground">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="relative min-w-0">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-primary/15 via-transparent to-accent/25" />
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_80px_-40px_rgba(15,42,58,.5)]">
              <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
                <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" /></span>
                <span className="text-[12px] font-semibold text-muted-foreground">index.html</span>
              </div>
              <pre className="flex-1 overflow-x-auto bg-[oklch(0.16_0.03_230)] px-5 py-5 text-[13px] leading-relaxed text-white/85"><span className="text-white/40">{"<!-- 1. add the widget -->"}</span>{"\n"}<span className="text-primary">&lt;script</span> src=<span className="text-accent">&quot;chat.js&quot;</span>{"\n"}  data-site=<span className="text-accent">&quot;yourstore&quot;</span> <span className="text-primary">/&gt;</span>{"\n\n"}<span className="text-white/40">{"<!-- 2. brand it -->"}</span>{"\n"}chat.<span className="text-primary">theme</span>({"{"} color: <span className="text-accent">&quot;#18a574&quot;</span>, position: <span className="text-accent">&quot;right&quot;</span> {"}"}){"\n\n"}<span className="text-white/40">{"<!-- 3. trigger it -->"}</span>{"\n"}chat.<span className="text-primary">on</span>(<span className="text-accent">&quot;/pricing&quot;</span>, <span className="text-accent">30</span>, greet)</pre>
              <div className="flex items-center gap-2 border-t border-border bg-card px-5 py-3 text-[12.5px] font-semibold text-primary"><Check className="h-4 w-4" strokeWidth={3} />Widget live. Chats appear in your shared inbox.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 4. USE CASES: accordion list ───────────── */

const CASES: { icon: typeof ShoppingBag; t: string; q: string[]; a: string }[] = [
  { icon: ShoppingBag, t: "E-commerce and D2C", q: ["Do you deliver to my pincode?", "Where is my order?", "How do I return this?"], a: "The AI answers shipping, stock and returns, shares order status and sends buyers to the product page." },
  { icon: Laptop, t: "SaaS and software", q: ["What is in the Pro plan?", "Can I get a demo?", "How do I reset my workspace?"], a: "Greet pricing-page visitors, qualify leads with a prechat form and give logged-in users in-app help through the SDK." },
  { icon: GraduationCap, t: "Education and courses", q: ["What is the fee structure?", "When does the next batch start?", "Do you give certificates?"], a: "Answer admissions questions around the clock and pass serious enquiries to your counsellors with the full chat." },
  { icon: HeartPulse, t: "Healthcare and clinics", q: ["How do I book a slot?", "Which doctors are available?", "What are the clinic timings?"], a: "Handle booking and timing questions instantly and keep sensitive conversations for your staff." },
  { icon: Home, t: "Real estate", q: ["Is this unit still available?", "Can I schedule a site visit?", "What is the price range?"], a: "Capture lead details up front, answer listing questions and hand hot leads to an agent while they are still browsing." },
  { icon: Building2, t: "Banking and fintech", q: ["How do I check my application?", "What documents do I need?", "Is there a fee?"], a: "Resolve routine questions fast and route anything account-specific to a verified agent." },
]

export function WebChatUseCases() {
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Use cases</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Chat for every business</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Whatever you sell, the questions repeat. Let the AI agent answer them, and keep your team for the conversations that matter.
          </p>
          <Link href="/company/contact/" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="space-y-3">
          {CASES.map((c, i) => (
            <details key={c.t} open={i === 0} className="group rounded-2xl border border-border bg-card open:border-primary/40 open:shadow-[0_20px_44px_-28px_oklch(0.62_0.14_168/0.6)]">
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-open:bg-primary group-open:text-primary-foreground"><c.icon className="h-5 w-5" /></span>
                <span className="flex-1 text-[16px] font-semibold tracking-tight">{c.t}</span>
                <Plus className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
              </summary>
              <div className="px-5 pb-5 pl-[84px]">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Typical questions</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.q.map((q) => <span key={q} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-[12.5px]">{q}</span>)}
                </div>
                <p className="mt-4 flex items-start gap-2 text-[14px] leading-relaxed"><Bot className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{c.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 5. WHY IT WORKS (dark): triage ───────────── */

function Triage() {
  return (
    <svg viewBox="0 0 640 380" className="h-auto w-full" role="img" aria-label="Incoming website chats are answered by the AI agent, and only conversations that need a person reach your team in the shared inbox">
      <defs>
        <path id="wcs-a" d="M120 190 C 200 190, 220 190, 270 190" />
        <path id="wcs-b" d="M370 160 C 420 120, 440 90, 500 90" />
        <path id="wcs-c" d="M370 220 C 420 260, 440 290, 500 290" />
      </defs>
      {/* visitors */}
      {[110, 150, 190, 230, 270].map((y, i) => (
        <g key={y}>
          <circle cx="34" cy={y} r="13" fill="#fff" fillOpacity=".1" stroke="#fff" strokeOpacity=".25" />
          <circle cx="34" cy={y - 3} r="4" fill="#fff" fillOpacity=".7" /><path d={`M26 ${y + 8} q8 -9 16 0z`} fill="#fff" fillOpacity=".7" />
          <path d={`M50 ${y} C 80 ${y}, 90 190, 118 190`} fill="none" stroke={TEAL} strokeOpacity=".35" strokeWidth="1.6" strokeDasharray="3 8" className="wcs-flow" />
          <circle r="3.5" fill={AMBER}><animateMotion dur={`${2.2 + i * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} path={`M50 ${y} C 80 ${y}, 90 190, 118 190`} /></circle>
        </g>
      ))}
      <text x="34" y="306" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#fff" fillOpacity=".7">Visitors</text>
      <path d="M120 190 H270" stroke={TEAL} strokeOpacity=".35" strokeWidth="1.6" strokeDasharray="3 8" className="wcs-flow" />
      {/* AI hub */}
      <circle cx="320" cy="190" r="72" fill={TEAL} opacity=".22" />
      <rect x="270" y="140" width="100" height="100" rx="30" fill="#fff" />
      <rect x="294" y="158" width="52" height="38" rx="14" fill="oklch(0.18 0.02 230)" />
      <circle cx="310" cy="177" r="5" fill={TEAL} /><circle cx="330" cy="177" r="5" fill={TEAL} />
      <rect x="296" y="208" width="48" height="8" rx="4" fill={TEAL} />
      <text x="320" y="262" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">AI agent</text>
      <text x="320" y="279" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".65">answers first</text>
      {/* outputs */}
      <path d="M370 160 C 420 120, 440 90, 500 90" fill="none" stroke={TEAL} strokeOpacity=".4" strokeWidth="1.8" strokeDasharray="3 8" className="wcs-flow" />
      <path d="M370 220 C 420 260, 440 290, 500 290" fill="none" stroke={AMBER} strokeOpacity=".6" strokeWidth="1.8" strokeDasharray="3 8" className="wcs-flow" />
      <circle r="4" fill={TEAL}><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#wcs-b" /></animateMotion></circle>
      <circle r="4" fill={AMBER}><animateMotion dur="3.2s" repeatCount="indefinite" begin="1s"><mpath href="#wcs-c" /></animateMotion></circle>
      <rect x="500" y="56" width="132" height="68" rx="20" fill={TEAL} fillOpacity=".16" stroke={TEAL} strokeOpacity=".6" />
      <circle cx="526" cy="90" r="12" fill={TEAL} /><path d="M520 90 l4 4 l8 -9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="546" y="86" fontSize="12.5" fontWeight="700" fill="#fff">Resolved</text><text x="546" y="102" fontSize="11" fill="#fff" fillOpacity=".7">by AI in seconds</text>
      <rect x="500" y="256" width="132" height="68" rx="20" fill="#fff" fillOpacity=".08" stroke={AMBER} strokeOpacity=".7" />
      <circle cx="526" cy="290" r="12" fill={AMBER} /><path d="M520 292 q6 -10 12 0" fill="none" stroke="oklch(0.18 0.02 230)" strokeWidth="2.4" strokeLinecap="round" />
      <text x="546" y="286" fontSize="12.5" fontWeight="700" fill="#fff">Needs a person</text><text x="546" y="302" fontSize="11" fill="#fff" fillOpacity=".7">to your inbox</text>
      <rect x="8" y="340" width="624" height="34" rx="17" fill="#fff" fillOpacity=".06" stroke="#fff" strokeOpacity=".15" />
      <text x="320" y="362" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" fillOpacity=".85">Same shared inbox as your WhatsApp, SMS and voice conversations</text>
    </svg>
  )
}

export function WebChatWhyItWorks() {
  const rows = [
    { icon: Zap, t: "No waiting", d: "Visitors get an answer instantly, any hour." },
    { icon: UserCheck, t: "People where it matters", d: "Your team joins only chats that need them." },
    { icon: Inbox, t: "One shared inbox", d: "Web chat, WhatsApp, SMS and voice together." },
    { icon: BadgeCheck, t: "Full context", d: "Agents see the whole conversation, never repeat it." },
  ]
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-20 text-white lg:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]" />
      <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-14">
        <div className="flex flex-col justify-center rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 sm:p-6"><Triage /></div>
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/85"><Sparkles className="h-3 w-3" />Why it works</span>
          <h2 className={`mt-4 ${H2}`}>AI first, people when needed</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/70">
            Visitors get instant answers without waiting, and your team only joins the conversations that genuinely need
            a person, all from the same shared inbox.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <li key={r.t} className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition group-hover:bg-primary group-hover:text-primary-foreground"><r.icon className="h-[18px] w-[18px]" /></span>
                <span><span className="block text-[14.5px] font-semibold leading-tight">{r.t}</span><span className="mt-1 block text-[12.5px] leading-snug text-white/60">{r.d}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 6. WHY SMSLOCAL: web chat at the centre of every channel ───────────── */

const TIMELINE: { ch: string; time: string; text: string; icon?: string; Icon?: typeof Phone }[] = [
  { ch: "Web chat", time: "10:24 AM", text: "Asked about the Growth plan", Icon: MessageCircle },
  { ch: "WhatsApp", time: "11:02 AM", text: "Replied to the pricing broadcast", icon: "/logos/channels/whatsapp.svg" },
  { ch: "Voice", time: "2:15 PM", text: "Call with Priya, 3 min", Icon: Phone },
  { ch: "SMS", time: "4:40 PM", text: "Demo reminder delivered", Icon: MessageSquare },
  { ch: "Email", time: "6:05 PM", text: "Proposal sent and opened", Icon: Mail },
]

function CustomerTimeline() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[14px] font-bold text-primary-foreground">M</span>
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-semibold leading-tight">Meera Kapoor</p>
          <p className="truncate text-[11.5px] text-muted-foreground">meera@company.com · +91 98••• ••210</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary"><Check className="h-3.5 w-3.5" strokeWidth={3} />One record</span>
      </div>

      <ol className="relative flex flex-1 flex-col justify-between gap-2 px-5 py-4">
        <span aria-hidden className="absolute bottom-8 left-[39px] top-8 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-primary/10" />
        {TIMELINE.map((t, i) => (
          <li key={t.ch} className="wcs-in relative flex items-center gap-3.5" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm">
              {t.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.icon} alt="" width={18} height={18} />
              ) : t.Icon ? (
                <t.Icon className="h-4 w-4 text-primary" />
              ) : null}
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-muted/60 px-3.5 py-2 text-[12.5px]">
              <span className="shrink-0 font-semibold">{t.ch}</span>
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{t.text}</span>
              <span className="shrink-0 text-[11px] font-medium text-muted-foreground">{t.time}</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-2.5 border-t border-border bg-primary/5 px-5 py-3">
        <Sparkles className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-[12px] leading-snug"><span className="font-semibold text-primary">AI summary:</span> interested in the Growth plan, ready for a demo.</p>
      </div>
    </div>
  )
}

export function WebChatWhySmsLocal() {
  return (
    <section className="border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex min-w-0 flex-col justify-center">
          <Eyebrow>Why SMSLocal</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>One channel, not a silo</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Web chat runs on the same platform as WhatsApp, SMS, voice and your campaigns. A visitor who chats on your
            site and later messages on WhatsApp is one customer record, not two disconnected conversations in two tools.
          </p>
          <ul className="mt-6 space-y-2.5">
            {["One customer profile across every channel", "One AI agent and one set of saved replies", "One inbox, one report, one team"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[14.5px] font-medium"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} /></span>{t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products/agentic-ai/" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Agentic AI <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></Link>
            <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary">Omnichannel Inbox <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
        <div className="relative min-w-0">
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-primary/15 via-transparent to-accent/25" />
          <CustomerTimeline />
        </div>
      </div>
    </section>
  )
}

/* ───────────── 7. RELATED: stacked link rows ───────────── */

export function WebChatRelated({ links }: { links: { href: string; label: string; hint: string }[] }) {
  return (
    <section className="border-b border-border bg-secondary/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-6 bg-current" />
          Explore more
        </span>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[22px] border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
            >
              <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60 transition group-hover:scale-125" style={{ background: i % 2 ? "color-mix(in oklch, var(--accent) 45%, transparent)" : "color-mix(in oklch, var(--primary) 20%, transparent)" }} />
              <Link2 className="relative h-5 w-5 text-primary" />
              <span className="relative">
                <span className="block text-[15px] font-semibold leading-snug tracking-tight">{l.label}</span>
                <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">{l.hint}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

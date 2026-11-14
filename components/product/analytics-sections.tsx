"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CalendarClock,
  Check,
  Clock,
  Download,
  FileText,
  Frown,
  Heart,
  Link2,
  Mail,
  Meh,
  MessageSquare,
  Send,
  Smile,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  X,
  Zap,
} from "lucide-react"

// Bespoke sections for /products/analytics (everything below the stats strip). Each section has its own layout and art,
// and none reuses the shared product-page blocks or the channel-page designs. All figures shown are sample data.

const TEAL = "var(--primary)"
const AMBER = "oklch(0.85 0.14 80)"

const CSS = `
@keyframes ans-flow { to { stroke-dashoffset: -28 } }
@keyframes ans-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
@keyframes ans-blink { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
@keyframes ans-grow { from { transform: scaleY(0) } to { transform: scaleY(1) } }
@keyframes ans-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
.ans-flow { animation: ans-flow 1.6s linear infinite }
.ans-in { animation: ans-in .45s ease-out both }
.ans-blink { animation: ans-blink 2.2s ease-in-out infinite }
.ans-grow { transform-origin: bottom; animation: ans-grow .7s cubic-bezier(.3,1.1,.4,1) both }
.ans-bob { animation: ans-bob 5s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .ans-flow, .ans-in, .ans-blink, .ans-grow, .ans-bob { animation: none } }
`

export function AnalyticsStyles() {
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
const LIGHT = "border-b border-border bg-background py-20 lg:py-28"
const TINT = "border-b border-border bg-secondary/40 py-20 lg:py-28"

function Header({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      {dark ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/85"><Sparkles className="h-3 w-3" />{eyebrow}</span>
      ) : (
        <Eyebrow>{eyebrow}</Eyebrow>
      )}
      <h2 className={`mt-4 ${H2}`}>{title}</h2>
      <p className={`mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{body}</p>
    </div>
  )
}

/* ───────────── 1. PROBLEM: scattered windows merge into one view ───────────── */

const QUESTIONS = [
  { q: "Which campaigns create support tickets?", before: "Campaign tool and support tool never meet. Someone matches replies by hand.", after: "Each campaign shows the conversations it triggered, side by side." },
  { q: "Which topic is hurting our CSAT?", before: "CSAT is a single number. The reasons sit in thousands of chats nobody reads.", after: "Sentiment groups conversations by topic, so the cause is visible." },
  { q: "Are we replying fast enough after a send?", before: "Reply speed is in one export, send times in another.", after: "First-response time is tracked against every campaign and channel." },
  { q: "Is the AI agent helping or just deflecting?", before: "No clean split between AI and human resolutions.", after: "AI and human agents are compared on resolution rate and CSAT." },
]

export function AnalyticsProblem() {
  return (
    <section className={TINT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Header eyebrow="The problem" title="Scattered data hides what is happening" body="When support, campaign and sentiment data live in separate tools, you work from an incomplete picture. One view shows where to improve and invest, with no Monday spreadsheets." />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {QUESTIONS.map((x, i) => (
            <article key={x.q} className="group overflow-hidden rounded-[26px] border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_oklch(0.62_0.14_168/0.5)]">
              <div className="flex items-start gap-4 border-b border-border px-6 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-[14px] font-bold text-background">{i + 1}</span>
                <h3 className="text-[18px] font-semibold leading-snug tracking-tight">&ldquo;{x.q}&rdquo;</h3>
              </div>
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-border bg-muted/50 p-5 sm:border-b-0 sm:border-r">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-accent/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"><X className="h-3 w-3" strokeWidth={3} />Scattered tools</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{x.before}</p>
                </div>
                <div className="bg-primary/[0.06] p-5">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.5} />One dashboard</p>
                  <p className="mt-3 text-[13.5px] font-medium leading-relaxed">{x.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 2. WHAT YOU GET: dashboard preview with tabs ───────────── */

function Tag() {
  return <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">Sample data</span>
}

function Spark({ pts, tone = TEAL }: { pts: string; tone?: string }) {
  return (
    <svg viewBox="0 0 100 32" className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline points={`${pts} 100,32 0,32`} fill={tone} fillOpacity=".12" />
      <polyline points={pts} fill="none" stroke={tone} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function PerfPanel() {
  const rows = [
    { k: "First response", v: "2m 14s", d: "18% faster", icon: Zap, pts: "0,24 20,20 40,22 60,12 80,14 100,6", good: true },
    { k: "Resolution rate", v: "92%", d: "+4 pts", icon: Check, pts: "0,26 20,22 40,18 60,16 80,8 100,4", good: true },
    { k: "CSAT", v: "4.7 / 5", d: "+0.2", icon: Heart, pts: "0,20 20,24 40,14 60,16 80,8 100,6", good: true },
    { k: "NPS", v: "+54", d: "+6 pts", icon: TrendingUp, pts: "0,26 20,22 40,20 60,12 80,14 100,4", good: true },
  ]
  return (
    <div className="grid gap-4 lg:h-[364px] lg:grid-cols-[1fr_1.2fr]">
      {/* scorecard list */}
      <div className="flex flex-col overflow-hidden rounded-[26px] border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <p className="text-[14.5px] font-semibold">Team scorecard</p>
          <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sample data</span>
        </div>
        <ul className="flex flex-1 flex-col divide-y divide-border">
          {rows.map((r) => (
            <li key={r.k} className="flex flex-1 items-center gap-4 px-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><r.icon className="h-[18px] w-[18px]" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-medium text-muted-foreground">{r.k}</span>
                <span className="block text-[20px] font-semibold leading-tight tabular-nums">{r.v}</span>
              </span>
              <span className="hidden w-16 sm:block"><Spark pts={r.pts} /></span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary"><TrendingUp className="h-3 w-3" />{r.d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* big chart */}
      <div className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[26px] bg-[oklch(0.15_0.04_245)] p-6 text-white">
        <div aria-hidden className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-[12.5px] font-semibold text-white/65">Conversations handled</p>
            <p className="mt-1 text-[44px] font-semibold leading-none tabular-nums">12,480</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/25 px-2.5 py-1 text-[11.5px] font-bold text-primary"><TrendingUp className="h-3.5 w-3.5" />+8% this week</span>
        </div>
        <div className="relative mt-3 flex-1">
          <svg viewBox="0 0 420 170" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
            <defs><linearGradient id="ans-pf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="oklch(0.72 0.13 175)" stopOpacity=".5" /><stop offset="1" stopColor="oklch(0.72 0.13 175)" stopOpacity="0" /></linearGradient></defs>
            {[40, 90, 140].map((y) => <line key={y} x1="0" x2="420" y1={y} y2={y} stroke="white" strokeOpacity=".08" />)}
            <path d="M0 130 C 50 124, 80 90, 130 92 S 200 54, 250 48 S 330 72, 370 34 S 405 24, 420 18 L420 170 L0 170 Z" fill="url(#ans-pf)" />
            <path d="M0 130 C 50 124, 80 90, 130 92 S 200 54, 250 48 S 330 72, 370 34 S 405 24, 420 18" fill="none" stroke="oklch(0.78 0.13 175)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M0 152 C 60 148, 100 134, 150 136 S 230 112, 290 110 S 380 118, 420 98" fill="none" stroke="oklch(0.85 0.14 80)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="relative mt-3 flex items-center justify-between text-[11.5px] text-white/65">
          <div className="flex gap-5">
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-5 rounded-full bg-primary" />AI agent · 68%</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-5 rounded-full" style={{ background: AMBER }} />Team · 32%</span>
          </div>
          <span>Mon to Sun</span>
        </div>
      </div>
    </div>
  )
}

function CampPanel() {
  const stages = [["Sent", "50,000", 100], ["Delivered", "48,500", 97], ["Read", "35,500", 71], ["Clicked", "17,000", 34], ["Converted", "6,000", 12]]
  const ch = [
    { n: "SMS", m: "delivered", v: 98, img: "", icon: MessageSquare, tone: TEAL },
    { n: "WhatsApp", m: "read", v: 82, img: "/logos/channels/whatsapp.svg", icon: MessageSquare, tone: TEAL },
    { n: "RCS", m: "tapped", v: 41, img: "", icon: Sparkles, tone: AMBER },
  ]
  return (
    <div className="grid gap-4 lg:h-[364px] lg:grid-cols-[1.1fr_1fr]">
      {/* true funnel */}
      <div className="flex flex-col rounded-[26px] border border-border bg-card p-5">
        <div className="flex items-center justify-between"><p className="text-[14.5px] font-semibold">Diwali offer · funnel</p><span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sample data</span></div>
        <div className="mt-4 flex flex-1 flex-col justify-between gap-2">
          {stages.map(([k, n, v], i) => (
            <div key={k as string} className="flex items-center gap-3">
              <span className="w-[74px] shrink-0 text-[12px] font-semibold text-muted-foreground">{k as string}</span>
              <div className="flex flex-1 justify-center">
                <div className="flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] text-[12px] font-bold text-primary-foreground" style={{ width: `${Math.max(v as number, 22)}%`, opacity: 1 - i * 0.1 }}>{n as string}</div>
              </div>
              <span className="w-9 shrink-0 text-right text-[12px] font-semibold tabular-nums">{v as number}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* channel rows */}
      <div className="grid gap-4">
        {ch.map((c) => (
          <div key={c.n} className="flex items-center gap-4 rounded-[24px] border border-border bg-card px-5 py-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">{c.img ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={c.img} alt="" width={26} height={26} /> : <c.icon className="h-5 w-5" />}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between"><span className="text-[14.5px] font-semibold">{c.n} <span className="font-normal text-muted-foreground">{c.m}</span></span><span className="text-[28px] font-semibold leading-none tabular-nums">{c.v}%</span></span>
              <span className="mt-2 block h-2.5 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full" style={{ width: `${c.v}%`, background: c.tone }} /></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SentPanel() {
  const topics = [
    { k: "Product quality", s: "Mostly positive", icon: Smile, good: true, d: "+6%" },
    { k: "Returns", s: "Mostly positive", icon: Smile, good: true, d: "+3%" },
    { k: "Delivery time", s: "Mixed", icon: Meh, good: false, d: "-2%" },
    { k: "Pricing", s: "Getting worse", icon: Frown, good: false, d: "-7%" },
  ]
  return (
    <div className="grid gap-5 lg:h-[364px] lg:grid-cols-[.9fr_1.1fr]">
      <div className="flex flex-col items-center justify-center rounded-[28px] border border-border bg-card p-5">
        <div className="relative h-52 w-52">
          <svg viewBox="0 0 100 100" className="h-52 w-52 -rotate-90" aria-hidden>
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth="14" />
            <circle cx="50" cy="50" r="38" fill="none" stroke={TEAL} strokeWidth="14" strokeDasharray={`${0.62 * 238.8} 239`} strokeLinecap="butt" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(0.7 0.02 230)" strokeWidth="14" strokeDasharray={`${0.26 * 238.8} 239`} strokeDashoffset={`${-0.62 * 238.8}`} />
            <circle cx="50" cy="50" r="38" fill="none" stroke={AMBER} strokeWidth="14" strokeDasharray={`${0.12 * 238.8} 239`} strokeDashoffset={`${-0.88 * 238.8}`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-[44px] font-semibold leading-none tabular-nums text-primary">+62%</p><p className="mt-1 text-[12px] font-medium text-muted-foreground">net sentiment</p></div>
        </div>
        <div className="mt-5 flex gap-5 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-primary" />Positive 62%</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />Neutral 26%</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: AMBER }} />Negative 12%</span>
        </div>
        <div className="mt-3"><Tag /></div>
      </div>
      <ul className="grid gap-3">
        {topics.map((t) => (
          <li key={t.k} className={`flex items-center gap-4 rounded-[22px] border p-4 ${t.good ? "border-border bg-card" : "border-accent/60 bg-accent/10"}`}>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${t.good ? "bg-primary text-primary-foreground" : "bg-accent text-[oklch(0.22_0.04_60)]"}`}><t.icon className="h-6 w-6" /></span>
            <span className="flex-1"><span className="block text-[16px] font-semibold tracking-tight">{t.k}</span><span className="text-[12.5px] text-muted-foreground">{t.s}</span></span>
            <span className={`text-[15px] font-semibold tabular-nums ${t.good ? "text-primary" : ""}`}>{t.d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReportPanel() {
  return (
    <div className="grid items-center gap-8 lg:h-[364px] lg:grid-cols-[1fr_1fr]">
      <div className="relative mx-auto w-full max-w-sm">
        <div aria-hidden className="absolute inset-x-5 -bottom-3 top-4 rotate-2 rounded-[24px] bg-primary/20" />
        <div className="relative -rotate-1 rounded-[24px] border border-border bg-card p-6 shadow-[0_36px_70px_-36px_rgba(15,42,58,.5)]">
          <div className="flex items-start justify-between">
            <div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Weekly report</p><p className="mt-1 text-[22px] font-semibold tracking-tight">CSAT summary</p></div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><FileText className="h-5 w-5" /></span>
          </div>
          <div className="my-4 border-t-2 border-dashed border-border" />
          <div className="grid grid-cols-3 gap-2">
            {[["CSAT", "4.7"], ["Resolved", "92%"], ["NPS", "+54"]].map(([k, v]) => <div key={k} className="text-center"><p className="text-[24px] font-semibold tabular-nums">{v}</p><p className="text-[11px] text-muted-foreground">{k}</p></div>)}
          </div>
          <div className="mt-4 flex h-16 items-end gap-1.5">{[46, 60, 52, 74, 68, 88, 80].map((h, i) => <span key={i} className="flex-1 rounded-t-md bg-primary/70" style={{ height: `${h}%` }} />)}</div>
          <p className="mt-4 flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><Mail className="h-3.5 w-3.5 text-primary" />Delivered Monday 9:00 AM · PDF</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between"><p className="text-[15px] font-semibold">Schedules</p><Tag /></div>
        <ul className="relative mt-4 space-y-3">
          <span aria-hidden className="absolute bottom-6 left-[21px] top-6 w-px bg-border" />
          {[["Weekly CSAT summary", "Mondays, 9:00 AM", "PDF"], ["Campaign results", "Daily, 8:00 AM", "CSV"], ["Executive snapshot", "1st of every month", "PDF"]].map(([t, s, f]) => (
            <li key={t} className="relative flex items-center gap-4">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-card"><CalendarClock className="h-5 w-5" /></span>
              <span className="flex-1 rounded-2xl border border-border bg-card px-4 py-3"><span className="block text-[14.5px] font-semibold">{t}</span><span className="text-[12px] text-muted-foreground">{s}</span></span>
              <span className="rounded-full bg-muted px-3 py-1.5 text-[11.5px] font-bold">{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-3">
          {["Export CSV", "Export PDF"].map((b) => <span key={b} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13.5px] font-semibold text-background"><Download className="h-4 w-4" />{b}</span>)}
        </div>
      </div>
    </div>
  )
}

const TABS: { icon: typeof BarChart3; t: string; body: string; panel: ReactNode }[] = [
  { icon: BarChart3, t: "Performance dashboards", body: "First-response time, resolution rate, CSAT and NPS tracked in real time for your team and your AI agents.", panel: <PerfPanel /> },
  { icon: TrendingUp, t: "Campaign analytics", body: "Deliverability, open rates, clicks and conversions across SMS, WhatsApp and RCS in one view.", panel: <CampPanel /> },
  { icon: Smile, t: "Sentiment and trends", body: "The most common questions and how customers feel about each, surfaced automatically.", panel: <SentPanel /> },
  { icon: Download, t: "Reporting", body: "Exportable conversation logs and scheduled reports delivered to your team and stakeholders.", panel: <ReportPanel /> },
]

export function AnalyticsFeatures() {
  const [a, setA] = useState(0)
  return (
    <section className={LIGHT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Header eyebrow="What you get" title="Every metric that matters, in one place" body="Support, campaigns, sentiment and reporting on one analytics dashboard, updated in real time. Pick a view to see what it shows." />
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {TABS.map((t, i) => (
            <button key={t.t} type="button" aria-pressed={i === a} onClick={() => setA(i)} className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition ${i === a ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "border-border bg-card hover:border-primary/40"}`}>
              <t.icon className="h-4 w-4" />{t.t}
            </button>
          ))}
        </div>
        <div className="mt-8 rounded-[32px] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/15 p-4 sm:p-7">
          <p className="mx-auto mb-5 max-w-2xl text-center text-[14.5px] leading-relaxed text-muted-foreground">{TABS[a].body}</p>
          <div key={a} className="ans-in">{TABS[a].panel}</div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 3. WHY IT WORKS (dark): a live control room ───────────── */

function DataToDecisions() {
  const src = [
    { y: 48, n: "WhatsApp", i: "/logos/channels/whatsapp.svg" },
    { y: 120, n: "SMS", i: "" },
    { y: 192, n: "RCS", i: "" },
    { y: 264, n: "Web chat", i: "" },
    { y: 336, n: "Voice", i: "" },
  ]
  const out = [
    { y: 66, t: "Staff for peak hours", s: "See busy slots by channel" },
    { y: 162, t: "Route to the right agent", s: "Match topic to skills" },
    { y: 258, t: "Message the right people", s: "Target by engagement" },
    { y: 354, t: "Catch sentiment dips", s: "Flagged the same day" },
  ]
  return (
    <svg viewBox="0 0 1000 400" className="h-auto w-full" role="img" aria-label="Conversations and campaigns from every channel flow into one analytics view, which helps you staff, route, message and catch sentiment problems the same day">
      <defs>
        {src.map((s, i) => <path key={`i${i}`} id={`ans-in-${i}`} d={`M232 ${s.y} C 320 ${s.y}, 330 200, 392 200`} />)}
        {out.map((o, i) => <path key={`o${i}`} id={`ans-out-${i}`} d={`M608 200 C 660 200, 680 ${o.y}, 752 ${o.y}`} />)}
        <filter id="ans-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16" /></filter>
      </defs>
      {src.map((s, i) => (
        <g key={s.n}>
          <use href={`#ans-in-${i}`} fill="none" stroke={TEAL} strokeOpacity=".35" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" className="ans-flow" />
          <circle r="4.5" fill={AMBER}><animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.45}s`}><mpath href={`#ans-in-${i}`} /></animateMotion></circle>
          <rect x="20" y={s.y - 24} width="212" height="48" rx="24" fill="#fff" fillOpacity=".07" stroke="#fff" strokeOpacity=".22" />
          {s.i ? <image href={s.i} x="36" y={s.y - 13} width="26" height="26" /> : <circle cx="49" cy={s.y} r="10" fill={TEAL} />}
          <text x="76" y={s.y + 5} fontSize="15" fontWeight="600" fill="#fff">{s.n}</text>
        </g>
      ))}
      {out.map((o, i) => (
        <g key={o.t}>
          <use href={`#ans-out-${i}`} fill="none" stroke={TEAL} strokeOpacity=".4" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" className="ans-flow" />
          <circle r="4.5" fill={TEAL}><animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5 + 0.8}s`}><mpath href={`#ans-out-${i}`} /></animateMotion></circle>
          <rect x="752" y={o.y - 34} width="236" height="68" rx="22" fill={TEAL} fillOpacity=".14" stroke={TEAL} strokeOpacity=".55" />
          <circle cx="780" cy={o.y} r="13" fill={TEAL} /><path d={`M773 ${o.y} l5 5 l9 -11`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="804" y={o.y - 3} fontSize="14" fontWeight="700" fill="#fff">{o.t}</text>
          <text x="804" y={o.y + 17} fontSize="11.5" fill="#fff" fillOpacity=".65">{o.s}</text>
        </g>
      ))}
      <circle cx="500" cy="200" r="110" fill={TEAL} opacity=".28" filter="url(#ans-glow)" />
      <rect x="392" y="104" width="216" height="192" rx="30" fill="#fff" />
      <text x="500" y="136" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL} letterSpacing="1.5">ONE VIEW</text>
      <g transform="translate(424 150)">
        {[28, 46, 36, 62, 52, 84, 70].map((h, i) => <rect key={i} className="ans-grow" x={i * 25} y={96 - h} width="16" height={h} rx="4" fill={TEAL} fillOpacity={0.45 + i * 0.08} style={{ animationDelay: `${i * 0.08}s`, transformBox: "fill-box", transformOrigin: "bottom" }} />)}
      </g>
      <text x="500" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="oklch(0.18 0.02 230)">Analytics dashboard</text>
    </svg>
  )
}

export function AnalyticsWhyItWorks() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]" />
      <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_72%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Header dark eyebrow="Why it works" title="One view, fewer blind spots" body="See the full picture of conversations and campaigns in one place, so you can staff, route and message based on what the data says. A problem in sentiment shows up the same day, not three weeks later in a quarterly review." />
        <div className="mt-12 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] sm:p-8">
          <DataToDecisions />
        </div>
      </div>
    </section>
  )
}

/* ───────────── 4. GLOSSARY: metrics explained with formulas ───────────── */

const TERMS = [
  { icon: Heart, t: "CSAT", s: "Customer satisfaction score", f: "satisfied responses ÷ total responses × 100", d: "A quick read on how customers rated a conversation or a reply." },
  { icon: TrendingUp, t: "NPS", s: "Net Promoter Score", f: "% promoters − % detractors", d: "Shows how likely customers are to recommend you, from −100 to +100." },
  { icon: Zap, t: "First response time", s: "Speed to first reply", f: "first reply time − customer message time", d: "The wait a customer feels before anyone, human or AI, answers." },
  { icon: Check, t: "Resolution rate", s: "Conversations closed", f: "resolved conversations ÷ total conversations × 100", d: "How often a conversation ends with the customer's problem solved." },
  { icon: Send, t: "Deliverability", s: "Messages that arrive", f: "delivered messages ÷ sent messages × 100", d: "The base of every campaign: how many sends actually land on a phone." },
  { icon: Smile, t: "Sentiment", s: "How customers feel", f: "positive, neutral or negative tone per conversation", d: "Spots rising frustration on a topic before it drags down your CSAT." },
]

export function AnalyticsGlossary() {
  return (
    <section className={LIGHT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Header eyebrow="Metrics explained" title="The customer metrics you can track" body="CSAT, NPS, first response time, resolution rate, deliverability and sentiment: what each customer experience metric means, how it is calculated and why it matters." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TERMS.map((m) => (
            <article key={m.t} className="group flex flex-col overflow-hidden rounded-[26px] border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_60px_-30px_oklch(0.62_0.14_168/0.55)]">
              <div className="flex items-center gap-4 px-6 pt-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25"><m.icon className="h-5 w-5" /></span>
                <span><span className="block text-[20px] font-semibold tracking-tight">{m.t}</span><span className="block text-[12.5px] text-muted-foreground">{m.s}</span></span>
              </div>
              <p className="px-6 pt-4 text-[13.5px] leading-relaxed text-muted-foreground">{m.d}</p>
              <div className="mx-6 mb-6 mt-auto rounded-xl bg-[oklch(0.15_0.04_245)] px-4 py-3 font-mono text-[11.5px] leading-snug text-white/85"><span className="text-primary">=</span> {m.f}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 5. WHY SMSLOCAL: the customer journey rail ───────────── */

const MARKETING = [
  { icon: Send, t: "Campaign sent", m: ["Deliverability", "Send volume"] },
  { icon: Mail, t: "Opened and clicked", m: ["Open rate", "Click rate"] },
  { icon: MessageSquare, t: "Customers reply", m: ["Reply rate", "Top questions"] },
  { icon: TrendingUp, t: "Converted", m: ["Conversion rate", "Revenue"] },
]
const SUPPORT = [
  { icon: MessageSquare, t: "Customer asks", m: ["Volume", "Top topics"] },
  { icon: Bot, t: "AI answers or agent joins", m: ["First response time", "AI resolution"] },
  { icon: Check, t: "Issue resolved", m: ["Resolution rate", "Handle time"] },
  { icon: Heart, t: "Feedback", m: ["CSAT", "NPS and sentiment"] },
]

function Stage({ s, tone }: { s: { icon: typeof Send; t: string; m: string[] }; tone: "m" | "s" }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_44px_-28px_oklch(0.62_0.14_168/0.6)]">
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone === "m" ? "bg-accent/50 text-foreground" : "bg-primary text-primary-foreground"}`}><s.icon className="h-5 w-5" /></span>
      <p className="mt-3 text-[15px] font-semibold leading-snug tracking-tight">{s.t}</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">{s.m.map((x) => <span key={x} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{x}</span>)}</div>
    </div>
  )
}

export function AnalyticsWhySmsLocal() {
  return (
    <section className={TINT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Header eyebrow="Why SMSLocal" title="Analytics across the whole journey" body="Because the AI, the inbox and the broadcasting share one platform, your analytics cover the entire customer journey, not a single channel in isolation. A campaign that drives support questions shows up in both views, so you can act on the connection." />

        <div className="mt-14 space-y-3">
          {/* marketing lane */}
          <div className="grid items-stretch gap-4 lg:grid-cols-[110px_repeat(4,1fr)]">
            <div className="flex items-center rounded-2xl bg-accent/40 px-4 py-3 text-[12px] font-bold uppercase tracking-wider lg:justify-center lg:rotate-180 lg:[writing-mode:vertical-rl]">Marketing</div>
            {MARKETING.map((s) => <Stage key={s.t} s={s} tone="m" />)}
          </div>

          {/* bridge */}
          <div className="relative grid items-center gap-4 py-2 lg:grid-cols-[110px_repeat(4,1fr)]">
            <span className="hidden lg:block" />
            <div className="relative flex items-center justify-center lg:col-span-4">
              <span aria-hidden className="absolute inset-x-0 top-1/2 hidden border-t-2 border-dashed border-primary/50 lg:block" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-lg shadow-primary/30"><Link2 className="h-4 w-4" />Same customer, one record</span>
            </div>
          </div>

          {/* support lane */}
          <div className="grid items-stretch gap-4 lg:grid-cols-[110px_repeat(4,1fr)]">
            <div className="flex items-center rounded-2xl bg-primary/15 px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-primary lg:justify-center lg:rotate-180 lg:[writing-mode:vertical-rl]">Support</div>
            {SUPPORT.map((s) => <Stage key={s.t} s={s} tone="s" />)}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/products/omnichannel-inbox/" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Omnichannel inbox <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></Link>
          <Link href="/products/agentic-ai/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary">Agentic AI <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 6. RELATED: tiles ───────────── */

export function AnalyticsRelated({ links }: { links: { href: string; label: string; hint: string }[] }) {
  return (
    <section className="border-b border-border bg-secondary/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3.5 w-3.5" />Explore more</span>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[22px] border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
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

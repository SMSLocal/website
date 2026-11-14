"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"
import { formatInr, formatPaiseAsRupees, RCS_PLANS, SMSLOCAL_RCS_RATE } from "@/lib/pricing/rcs"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  CheckCheck,
  Code2,
  GitBranch,
  Image as ImageIcon,
  Layers,
  Link2,
  MapPin,
  MessageSquare,
  Palette,
  Plus,
  Receipt,
  ShieldCheck,
  Shapes,
  Smartphone,
  Sparkles,
  Stethoscope,
  Store,
  TrendingDown,
  Truck,
  X,
  Zap,
} from "lucide-react"

// Bespoke sections for /products/rcs (everything below the logos strip). Every section has its own layout and art; none
// reuses the shared product-page blocks or the WhatsApp, Instagram and Web Chat page designs.

const TEAL = "var(--primary)"
const NAVY = "var(--foreground)"
const AMBER = "oklch(0.85 0.14 80)"

const CSS = `
@keyframes rcs-flow { to { stroke-dashoffset: -28 } }
@keyframes rcs-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
@keyframes rcs-blink { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.rcs-flow { animation: rcs-flow 1.6s linear infinite }
.rcs-in { animation: rcs-in .45s ease-out both }
.rcs-blink { animation: rcs-blink 2.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .rcs-flow, .rcs-in, .rcs-blink { animation: none } }
`

export function RcsStyles() {
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

/* ───────────── 1. WHY RCS: SMS and RCS side by side ───────────── */

const LOSE = ["No sender identity", "No images or media", "No tappable buttons"]
const GAIN = ["Verified brand and logo", "Rich cards and carousels", "Suggested reply chips"]
const WHY_BAR = [
  { icon: GitBranch, t: "Automatic SMS fallback", d: "RCS where it works, your approved DLT SMS everywhere else." },
  { icon: Layers, t: "One wallet, one webhook", d: "RCS and SMS billed and reported together." },
  { icon: ShieldCheck, t: "DLT-aligned from day one", d: "SMS-grade sender, template and consent compliance." },
]

function SmsPhone() {
  return (
    <div className="w-[230px] rounded-[34px] border-[6px] border-foreground/30 bg-card p-3 opacity-90 grayscale-[.4]">
      <span className="mx-auto block h-1.5 w-12 rounded-full bg-foreground/20" />
      <div className="mt-3 min-h-[330px] space-y-2.5">
        <p className="text-center text-[11px] font-semibold text-muted-foreground">AX-SMSLCL</p>
        <p className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-3 text-[12.5px] leading-snug">Your Diwali hamper is ready. Use code DIWALI500 at checkout. Visit smsl.in/d5x</p>
        <p className="px-1 text-[10.5px] text-muted-foreground">Plain text, no brand</p>
      </div>
    </div>
  )
}

function RcsPhone() {
  return (
    <div className="relative w-[250px] rounded-[38px] border-[6px] border-foreground/85 bg-card p-3 shadow-[0_50px_80px_-36px_oklch(0.62_0.14_168/0.7)]">
      <span className="mx-auto block h-1.5 w-14 rounded-full bg-foreground/25" />
      <div className="mt-3 min-h-[350px] space-y-2.5">
        <p className="flex items-center justify-center gap-1 text-[11px] font-semibold">Aarav Mart <BadgeCheck className="h-3.5 w-3.5 fill-primary text-white" /></p>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex h-24 items-center bg-gradient-to-br from-accent/80 to-[oklch(0.78_0.15_60)] px-3.5 text-[15px] font-extrabold leading-tight text-[oklch(0.25_0.05_50)]">Your Diwali Hamper is Ready!</div>
          <div className="space-y-2 p-3">
            <p className="text-[11.5px] font-medium">Apply code DIWALI500 at checkout.</p>
            <span className="flex items-center justify-center rounded-full bg-primary py-2 text-[12px] font-semibold text-primary-foreground">View Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Track Order", "View Offer", "Not Now"].map((c) => <span key={c} className="rounded-full border border-primary px-2.5 py-1 text-[10.5px] font-semibold text-primary">{c}</span>)}
        </div>
      </div>
    </div>
  )
}

export function RcsWhy() {
  return (
    <section className={LIGHT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Why RCS on SMSLocal</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Rich branded messaging, without the complexity</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
            RCS business messaging makes SMS look like the rest of your brand: a logo, a verified badge, a hero image and suggested replies in the phone inbox people already open. SMSLocal handles carrier approvals, SMS fallback and analytics behind one clean API.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_auto_auto_1fr] lg:gap-6">
          <ul className="space-y-3 lg:justify-self-end">
            {LOSE.map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3.5 text-[14px] font-medium text-muted-foreground lg:w-[240px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted"><X className="h-4 w-4" strokeWidth={3} /></span>{t}
              </li>
            ))}
          </ul>
          <div className="mx-auto"><p className="mb-3 text-center text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Plain SMS</p><SmsPhone /></div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 max-lg:rotate-90"><ArrowRight className="h-6 w-6" /></div>
          <div className="mx-auto"><p className="mb-3 text-center text-[12px] font-semibold uppercase tracking-wider text-primary">RCS message</p><RcsPhone /></div>
          <ul className="space-y-3">
            {GAIN.map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-card px-4 py-3.5 text-[14px] font-semibold shadow-[0_18px_36px_-26px_oklch(0.62_0.14_168/0.7)] lg:w-[240px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" strokeWidth={3} /></span>{t}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-14 grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-3 md:divide-x md:divide-border">
          {WHY_BAR.map((w) => (
            <li key={w.t} className="flex items-start gap-4 border-b border-border p-6 last:border-b-0 md:border-b-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><w.icon className="h-5 w-5" /></span>
              <span><span className="block text-[15.5px] font-semibold tracking-tight">{w.t}</span><span className="mt-1 block text-[13.5px] leading-snug text-muted-foreground">{w.d}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────── 2. WATERFALL (dark): an animated routing pipeline ───────────── */

const RECIPIENTS = [
  { n: "Meera K.", num: "+91 98••• ••210", dev: "Jio · Android", rcs: true },
  { n: "Arjun S.", num: "+91 99••• ••744", dev: "Airtel · older handset", rcs: false },
  { n: "Neha R.", num: "+91 97••• ••118", dev: "Vi · Android", rcs: true },
  { n: "Rahul D.", num: "+91 90••• ••563", dev: "BSNL · feature phone", rcs: false },
]

function Simulator() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(99)
      return
    }
    const id = window.setInterval(() => setTick((t) => (t + 1) % 16), 900)
    return () => window.clearInterval(id)
  }, [])
  // each row starts "checking" at tick 1 + i*2 and resolves two ticks later; the whole cycle resets at 16
  const state = (i: number) => (tick >= 99 ? 2 : tick < 1 + i * 2 ? 0 : tick < 3 + i * 2 ? 1 : 2)
  const done = RECIPIENTS.every((_, i) => state(i) === 2)
  return (
    <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.03_245)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[11.5px] font-semibold text-white/60"><Code2 className="h-4 w-4 text-primary" />One request</div>
        <pre className="px-4 py-4 text-[12.5px] leading-relaxed text-white/85"><span className="text-accent">POST</span> /v1/rcs/send{"\n"}{"{"}{"\n"}  <span className="text-primary">&quot;to&quot;</span>: [4 numbers],{"\n"}  <span className="text-primary">&quot;card&quot;</span>: {"{"} title, image, replies {"}"},{"\n"}  <span className="text-primary">&quot;fallback&quot;</span>: {"{"}{"\n"}    <span className="text-primary">&quot;sms_template_id&quot;</span>: <span className="text-accent">&quot;ORDER_READY&quot;</span>{"\n"}  {"}"}{"\n"}{"}"}</pre>
        <div className={`border-t border-white/10 px-4 py-3 text-[12px] transition-opacity duration-500 ${done ? "opacity-100" : "opacity-30"}`}>
          <p className="font-semibold text-primary">Webhook</p>
          <p className="mt-1 font-mono text-[11.5px] text-white/75">channel_used: &quot;rcs&quot; | &quot;sms&quot; (per message)</p>
        </div>
      </div>

      <ul className="space-y-3">
        {RECIPIENTS.map((r, i) => {
          const st = state(i)
          return (
            <li key={r.n} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-4 py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[13px] font-bold">{r.n[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold">{r.n} <span className="font-normal text-white/50">{r.num}</span></span>
                <span className="block text-[12px] text-white/55">{r.dev}</span>
              </span>
              <span className="w-[190px] shrink-0">
                {st === 0 && <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/60">Queued</span>}
                {st === 1 && <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white"><i className="rcs-blink h-2 w-2 rounded-full bg-accent" />Checking capability...</span>}
                {st === 2 && (r.rcs
                  ? <span className="rcs-in inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3} />Sent as RCS card</span>
                  : <span className="rcs-in inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[12px] font-bold text-[oklch(0.22_0.04_60)]"><MessageSquare className="h-3.5 w-3.5" />SMS fallback sent</span>)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const WSTEPS = [
  { icon: Code2, t: "One API call", d: "POST your card payload, a fallback SMS template ID and the number." },
  { icon: Smartphone, t: "Capability check", d: "We check in real time if the handset supports RCS on its carrier." },
  { icon: Sparkles, t: "RCS if available", d: "Capable phones get the full verified rich card with suggested replies." },
  { icon: MessageSquare, t: "SMS fallback if not", d: "Everyone else gets your approved DLT SMS on the same operator route." },
]

export function RcsWaterfall() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]" />
      <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_72%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/85"><Sparkles className="h-3 w-3" />How the waterfall works</span>
          <h2 className={`mt-4 ${H2}`}>RCS first. SMS never far behind.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-white/70">Not every phone supports RCS yet. The SMSLocal RCS API checks each number and sends the best message it can, so no customer is left unread.</p>
        </div>
        <div className="mt-12 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 sm:p-8"><Simulator /></div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WSTEPS.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30"><s.icon className="h-5 w-5" /></span>
                <span className="text-[12px] font-bold text-white/40">0{i + 1}</span>
              </div>
              <p className="mt-4 text-[16px] font-semibold">{s.t}</p>
              <p className="mt-1.5 text-[13.5px] leading-snug text-white/65">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────── 3. DEVELOPERS: code window + three columns ───────────── */

const DEV: { icon: typeof Code2; t: string; items: string[] }[] = [
  { icon: Code2, t: "What you send", items: ["A card with image and up to four replies", "A DLT SMS template as the fallback"] },
  { icon: BarChart3, t: "What you get back", items: ["One webhook that names the channel", "Read and reply-tap events"] },
  { icon: ShieldCheck, t: "Safe by default", items: ["Signed webhooks, scoped API keys", "Templates DLT-checked at send time"] },
]

type Lang = "node" | "python" | "php"
const LANGS: { k: Lang; l: string }[] = [{ k: "node", l: "Node.js" }, { k: "python", l: "Python" }, { k: "php", l: "PHP" }]

const DEV_STEPS: { t: string; d: string; code: Record<Lang, string> }[] = [
  {
    t: "Authenticate",
    d: "Use the same API key and bearer header you already use for SMS.",
    code: {
      node: [
        'headers: {',
        '  "Authorization": "Bearer " + process.env.SMSLOCAL_API_KEY,',
        '  "Content-Type": "application/json",',
        '}',
      ].join("\n"),
      python: [
        'headers={',
        '    "Authorization": "Bearer " + os.environ["SMSLOCAL_API_KEY"],',
        '    "Content-Type": "application/json",',
        '}',
      ].join("\n"),
      php: [
        '$headers = [',
        '    "Authorization: Bearer " . getenv("SMSLOCAL_API_KEY"),',
        '    "Content-Type: application/json",',
        '];',
      ].join("\n"),
    },
  },
  {
    t: "Build the card",
    d: "A title, a description, an image and up to four suggested replies.",
    code: {
      node: [
        'card: {',
        '  title: "Your Diwali hamper is ready",',
        '  description: "Apply code DIWALI500 at checkout.",',
        '  media_url: "https://cdn.smslocal.in/diwali.jpg",',
        '  suggested_replies: ["Track order", "View offer", "Not now"],',
        '}',
      ].join("\n"),
      python: [
        '"card": {',
        '    "title": "Your Diwali hamper is ready",',
        '    "description": "Apply code DIWALI500 at checkout.",',
        '    "media_url": "https://cdn.smslocal.in/diwali.jpg",',
        '    "suggested_replies": ["Track order", "View offer", "Not now"],',
        '}',
      ].join("\n"),
      php: [
        '"card" => [',
        '    "title" => "Your Diwali hamper is ready",',
        '    "description" => "Apply code DIWALI500 at checkout.",',
        '    "media_url" => "https://cdn.smslocal.in/diwali.jpg",',
        '    "suggested_replies" => ["Track order", "View offer", "Not now"],',
        ']',
      ].join("\n"),
    },
  },
  {
    t: "Add the SMS fallback",
    d: "Your approved DLT template goes out if the phone cannot take RCS.",
    code: {
      node: [
        'fallback: {',
        '  sms_template_id: "ORDER_READY_V2",',
        '  variables: { code: "DIWALI500" },',
        '}',
      ].join("\n"),
      python: [
        '"fallback": {',
        '    "sms_template_id": "ORDER_READY_V2",',
        '    "variables": {"code": "DIWALI500"},',
        '}',
      ].join("\n"),
      php: [
        '"fallback" => [',
        '    "sms_template_id" => "ORDER_READY_V2",',
        '    "variables" => ["code" => "DIWALI500"],',
        ']',
      ].join("\n"),
    },
  },
  {
    t: "Send and read the result",
    d: "POST to one endpoint. One webhook reports which channel delivered.",
    code: {
      node: [
        'const res = await fetch("https://api.smslocal.in/v1/rcs/send", {',
        '  method: "POST", headers, body,',
        '})',
        'const data = await res.json()',
        'console.log(data.message_id, data.channel_used) // "rcs" | "sms"',
      ].join("\n"),
      python: [
        'res = requests.post("https://api.smslocal.in/v1/rcs/send",',
        '                    headers=headers, json=payload)',
        'print(res.json())  # message_id, channel_used: "rcs" | "sms"',
      ].join("\n"),
      php: [
        '$ch = curl_init("https://api.smslocal.in/v1/rcs/send");',
        '// set headers and body, then:',
        'echo curl_exec($ch); // message_id, channel_used',
      ].join("\n"),
    },
  },
]

export function RcsDev() {
  const [step, setStep] = useState(0)
  const [lang, setLang] = useState<Lang>("node")
  const cur = DEV_STEPS[step]
  return (
    <section className={TINT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Developer experience</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Ship RCS the same afternoon</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
            Already sending SMS through SMSLocal? The RCS messaging API is one endpoint and one payload change away, with the same authentication, webhook signing and delivery status format.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <ol className="relative flex min-w-0 flex-col gap-3">
            <span aria-hidden className="absolute bottom-10 left-[27px] top-10 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent" />
            {DEV_STEPS.map((d, i) => {
              const on = i === step
              const done = i < step
              return (
                <li key={d.t} className="flex flex-1">
                  <button type="button" aria-pressed={on} onClick={() => setStep(i)} className={`relative flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${on ? "border-primary/60 bg-card shadow-[0_20px_44px_-24px_oklch(0.62_0.14_168/0.6)]" : "border-border bg-card/60 hover:border-primary/30"}`}>
                    <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold transition-colors ${on ? "bg-primary text-primary-foreground" : done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}</span>
                    <span className="min-w-0">
                      <span className="block text-[16px] font-semibold tracking-tight">{d.t}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{d.d}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex min-w-0 flex-col rounded-[28px] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/15 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-muted-foreground">Step {step + 1} of {DEV_STEPS.length}</p>
              <div className="flex rounded-full border border-border bg-card p-1 text-[12px] font-semibold">
                {LANGS.map((l) => (
                  <button key={l.k} type="button" aria-pressed={lang === l.k} onClick={() => setLang(l.k)} className={`rounded-full px-3 py-1 transition ${lang === l.k ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{l.l}</button>
                ))}
              </div>
            </div>
            <div key={`${step}-${lang}`} className="rcs-in min-w-0 flex-1 rounded-2xl border border-border bg-card p-5">
              <pre className="overflow-x-auto font-mono text-[13px] leading-[1.75] text-foreground/90">{cur.code[lang].split("\n").map((l, k) => <div key={k}>{l || " "}</div>)}</pre>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-[13px]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
              <span><b>Result:</b> {step === 3 ? "message_id plus channel_used, rcs or sms." : "A verified rich card on RCS phones, DLT SMS on the rest."}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {DEV.map((d) => (
            <div key={d.t} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><d.icon className="h-5 w-5" /></span>
                <p className="text-[16px] font-semibold tracking-tight">{d.t}</p>
              </div>
              <ul className="mt-3 space-y-2">
                {d.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[13px] leading-snug text-muted-foreground"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 4. FEATURE DEPTH: editorial index ───────────── */

const DEPTH = [
  { icon: Palette, t: "Brand studio", d: "Upload your logo, pick brand colours and preview your card on Android before you ship." },
  { icon: Shapes, t: "Carousels and rich media", d: "Multi-card carousels for product ranges, offer grids or itineraries, each with its own media and actions." },
  { icon: ShieldCheck, t: "Safety rails", d: "Per-brand rate limits, recipient cooldowns and content tagging keep promotional and transactional streams apart." },
  { icon: Receipt, t: "Transparent billing", d: "RCS is billed per conversation or message by carrier, SMS fallback at your SMS rate, on one GST invoice." },
  { icon: Zap, t: "Low-latency delivery", d: "RCS and SMS share the same priority routing backbone for fast delivery on Indian carriers." },
  { icon: Layers, t: "Works with your CDP", d: "Connect Segment, Mixpanel, Moengage and your warehouse to send RCS to the segments you already build." },
]

export function RcsDepth() {
  return (
    <section className={LIGHT}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Feature depth</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[38px]">Everything messaging teams want</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Rich media, safety controls and clean billing on the channel people already open.</p>
          <Link href="/company/contact/" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <ol className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
          {DEPTH.map((d, i) => (
            <li key={d.t} className="group flex items-start gap-5 px-6 py-5 transition hover:bg-primary/5">
              <span className="w-8 shrink-0 pt-1 text-[22px] font-semibold tabular-nums leading-none text-primary/25">0{i + 1}</span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><d.icon className="h-5 w-5" /></span>
              <span>
                <span className="block text-[16.5px] font-semibold tracking-tight">{d.t}</span>
                <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">{d.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────── 5. COMPARE: three cards, ours raised ───────────── */

type Rate = "full" | "half" | "none"

const MATRIX: { row: string; ours: [Rate, string]; direct: [Rate, string]; sms: [Rate, string] }[] = [
  { row: "One API for RCS, SMS and WhatsApp", ours: ["full", "One payload, one webhook"], direct: ["half", "RCS only"], sms: ["none", "SMS only"] },
  { row: "Automatic SMS fallback", ours: ["full", "Per-number capability check"], direct: ["none", "Build it yourself"], sms: ["none", "Not applicable"] },
  { row: "Verified sender onboarding", ours: ["full", "We manage carrier approvals"], direct: ["half", "Deal with each carrier"], sms: ["half", "Sender ID via DLT"] },
  { row: "Brand studio and previews", ours: ["full", "Visual editor, device preview"], direct: ["half", "Usually dev-only JSON"], sms: ["none", "Text preview only"] },
  { row: "Unified billing", ours: ["full", "One wallet, one GST invoice"], direct: ["none", "Billing per carrier"], sms: ["half", "SMS invoice only"] },
  { row: "India support", ours: ["full", "India-based, product-trained"], direct: ["half", "Generic carrier support"], sms: ["half", "Varies by vendor"] },
]

const SCORE = { ours: 6, direct: 0, sms: 0 }

function RateIcon({ r }: { r: Rate }) {
  if (r === "full") return <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30"><Check className="h-4 w-4" strokeWidth={3.5} /></span>
  if (r === "half") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" aria-label="Partly">
        <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="2.4" />
        <path d="M14 3 A11 11 0 0 0 14 25 Z" fill="oklch(0.85 0.14 80)" />
      </svg>
    )
  }
  return <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-border text-muted-foreground"><X className="h-3.5 w-3.5" strokeWidth={3} /></span>
}

export function RcsCompare() {
  const cols = [
    { k: "direct" as const, t: "Direct carrier RCS" },
    { k: "sms" as const, t: "SMS only" },
  ]
  return (
    <section className={TINT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Compared to alternatives</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Why Indian teams pick SMSLocal for RCS</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">See how an RCS provider that also runs your SMS and WhatsApp compares with going direct to carriers or staying on plain SMS.</p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
          <div className="min-w-[680px]">
            {/* column heads */}
            <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] items-end gap-3 px-2">
              <span />
              {cols.slice(0, 1).map((c) => <p key={c.k} className="pb-3 text-center text-[13px] font-semibold text-muted-foreground">{c.t}</p>)}
              <div className="rounded-t-3xl bg-primary px-4 py-4 text-center text-[15px] font-bold text-primary-foreground shadow-[0_20px_40px_-20px_oklch(0.62_0.14_168/0.8)]">SMSLocal RCS</div>
              {cols.slice(1).map((c) => <p key={c.k} className="pb-3 text-center text-[13px] font-semibold text-muted-foreground">{c.t}</p>)}
            </div>

            {/* rows */}
            <div className="relative">
              {MATRIX.map((m, i) => (
                <div key={m.row} className="relative grid grid-cols-[1.25fr_1fr_1fr_1fr] items-stretch gap-x-3 px-2">
                  <p className={`flex items-center py-4 pr-3 text-[14px] font-semibold leading-snug ${i ? "border-t border-border/70" : ""}`}>{m.row}</p>
                  {(["direct", "ours", "sms"] as const).map((k) => {
                    const [r, cap] = m[k]
                    return (
                      <div key={k} className={`flex flex-col items-center justify-center gap-1.5 py-4 text-center ${i ? "border-t border-border/70" : ""} ${k === "ours" ? `bg-primary/10 ${i ? "border-t-primary/20" : ""} ${i === MATRIX.length - 1 ? "rounded-b-3xl" : ""}` : ""}`}>
                        <RateIcon r={r} />
                        <span className={`text-[12px] leading-tight ${k === "ours" ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{cap}</span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* score */}
            <div className="mt-4 grid grid-cols-[1.25fr_1fr_1fr_1fr] items-center gap-3 px-2">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">Full capability</p>
              {(["direct", "ours", "sms"] as const).map((k) => (
                <p key={k} className={`text-center text-[22px] font-semibold tabular-nums ${k === "ours" ? "text-primary" : "text-muted-foreground"}`}>{SCORE[k]}<span className="text-[13px] font-medium text-muted-foreground"> / 6</span></p>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-2"><RateIcon r="full" />Fully covered</span>
          <span className="inline-flex items-center gap-2"><RateIcon r="half" />Partly</span>
          <span className="inline-flex items-center gap-2"><RateIcon r="none" />Not covered</span>
        </p>
      </div>
    </section>
  )
}

/* ───────────── 6. USE CASES: industry tabs with a live card ───────────── */

type UseCase = { icon: typeof Store; t: string; body: string; card: ReactNode }
const CASES: UseCase[] = [
  {
    icon: Store, t: "Retail and D2C", body: "Product drops, offer carousels, order updates with images and one-tap reorder buttons on the inbox customers already check.",
    card: (
      <div className="space-y-3">
        <p className="text-[12px] font-semibold text-muted-foreground">Offer carousel</p>
        <div className="grid grid-cols-3 gap-2">{["Headphones", "Watch", "Sneakers"].map((p, i) => <div key={p} className="rounded-xl border border-border bg-card p-2 text-center"><div className={`h-14 rounded-lg ${i % 2 ? "bg-accent/40" : "bg-primary/15"}`} /><p className="mt-1.5 text-[11px] font-semibold">{p}</p></div>)}</div>
        <span className="flex items-center justify-center rounded-full bg-primary py-2 text-[12.5px] font-semibold text-primary-foreground">View Offer</span>
      </div>
    ),
  },
  {
    icon: Truck, t: "Logistics and delivery", body: "Out-for-delivery cards with rider details, live tracking buttons and one-tap reschedule, replacing plain-text SMS noise.",
    card: (
      <div className="space-y-3">
        <p className="flex items-center gap-2 text-[14px] font-semibold"><Truck className="h-4 w-4 text-primary" />Out for delivery</p>
        <div className="h-2 rounded-full bg-muted"><div className="h-2 w-3/4 rounded-full bg-primary" /></div>
        <p className="text-[12.5px] text-muted-foreground">Rider Ajay · arriving by 6 PM</p>
        <div className="flex gap-2"><span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary-foreground">Track</span><span className="rounded-full border border-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary">Reschedule</span></div>
      </div>
    ),
  },
  {
    icon: Building2, t: "Banking and fintech", body: "Verified statements, card-activation flows and fraud alerts under a branded verified sender, a trust upgrade over unbranded SMS.",
    card: (
      <div className="space-y-3">
        <p className="flex items-center gap-2 text-[14px] font-semibold"><BadgeCheck className="h-4 w-4 fill-primary text-white" />Verified alert</p>
        <p className="text-[13px] leading-snug">A ₹4,999 card payment was attempted. Was this you?</p>
        <div className="flex gap-2"><span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary-foreground">Yes, it was me</span><span className="rounded-full border border-border px-3.5 py-1.5 text-[12px] font-semibold">Block card</span></div>
      </div>
    ),
  },
  {
    icon: Stethoscope, t: "Healthcare", body: "Appointment cards with map and reschedule chips, lab-report notices and follow-up reminders with richer context.",
    card: (
      <div className="space-y-3">
        <p className="text-[14px] font-semibold">Appointment confirmed</p>
        <p className="flex items-center gap-2 text-[12.5px] text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />Dr. Rao · Tue 4:00 PM · Koramangala</p>
        <div className="flex gap-2"><span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary-foreground">Get directions</span><span className="rounded-full border border-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary">Reschedule</span></div>
      </div>
    ),
  },
]

export function RcsUseCases() {
  return (
    <section className={TINT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Use cases</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Where RCS earns its keep first</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">From product drops to fraud alerts, branded RCS cards replace plain-text SMS wherever a customer needs to act.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CASES.map((c, i) => (
            <article key={c.t} className="group flex flex-col overflow-hidden rounded-[28px] border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_60px_-30px_oklch(0.62_0.14_168/0.55)]">
              <div className="relative px-5 pb-4 pt-5" style={{ background: i % 2 ? "linear-gradient(135deg, color-mix(in oklch, var(--accent) 35%, var(--card)), var(--card))" : "linear-gradient(135deg, color-mix(in oklch, var(--primary) 15%, var(--card)), var(--card))" }}>
                <c.icon aria-hidden className="absolute -right-3 -top-3 h-24 w-24 text-foreground/[0.06] transition duration-500 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1.2} />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg"><c.icon className="h-5 w-5" /></span>
                <h3 className="relative mt-3 text-[18px] font-semibold tracking-tight">{c.t}</h3>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-2 text-[11.5px] font-semibold"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">A</span>Aarav Mart <BadgeCheck className="h-3.5 w-3.5 fill-primary text-white" /></div>
                  {c.card}
                </div>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 7. RELATED: tiles ───────────── */

export function RcsRelated({ links }: { links: { href: string; label: string; hint: string }[] }) {
  return (
    <section className={`${TINT} !py-16 lg:!py-20`}>
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

/* ───────────── 8. PRICING: invoice receipt + wallet selector ───────────── */

const BENCH = [
  { icon: Receipt, t: "Published rate card", d: "Our RCS rates sit on the page, not behind a sales call." },
  { icon: BarChart3, t: "Benchmarked every time", d: "Set at 1% below MSG91's public India rate card." },
  { icon: Link2, t: "Sources on every invoice", d: "Each benchmark we use is linked so you can audit it." },
]

export function RcsPricing({ children }: { children: ReactNode }) {
  return (
    <section className={LIGHT}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Priced 1% below the market leader</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
            Auditable on every invoice. We publish SMSLocal&apos;s RCS rate at exactly 1% below MSG91&apos;s public India rate card: same Google RBM partners, same Jio, Airtel and Vi coverage, a cheaper per-message rate, and a link to every source we benchmark against.
          </p>
        </div>

        {/* receipt + benchmark */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md">
            <div aria-hidden className="absolute inset-x-6 -bottom-4 top-6 -z-10 rotate-2 rounded-[28px] bg-primary/15" />
            <div className="relative -rotate-1 rounded-[26px] border border-border bg-card px-7 pb-8 pt-7 shadow-[0_40px_80px_-40px_rgba(15,42,58,.5)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">SMSLocal RCS</p>
                  <p className="mt-1 text-[20px] font-semibold tracking-tight">Rate card</p>
                </div>
                <span className="rotate-6 rounded-lg border-2 border-primary px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary">Auditable</span>
              </div>
              <div className="my-5 border-t-2 border-dashed border-border" />
              {[
                { l: "Basic text message", p: SMSLOCAL_RCS_RATE.basicTextPaise, m: "₹0.12" },
                { l: "Rich card message", p: SMSLOCAL_RCS_RATE.richCardPaise, m: "₹0.14" },
              ].map((r) => (
                <div key={r.l} className="flex items-end justify-between py-2.5">
                  <div>
                    <p className="text-[14.5px] font-semibold">{r.l}</p>
                    <p className="text-[12px] text-muted-foreground">Market rate <span className="font-mono line-through">{r.m}</span></p>
                  </div>
                  <p className="font-mono text-[28px] font-semibold leading-none tabular-nums text-primary">{formatPaiseAsRupees(r.p)}<span className="ml-1 font-sans text-[12px] font-medium text-muted-foreground">/ msg</span></p>
                </div>
              ))}
              <div className="my-5 border-t-2 border-dashed border-border" />
              <div className="flex items-center justify-between text-[12.5px] text-muted-foreground">
                <span>India A2P · pre-GST</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-bold text-primary"><TrendingDown className="h-3.5 w-3.5" />1% lower</span>
              </div>
              <span aria-hidden className="absolute -bottom-2 left-6 right-6 h-3" style={{ background: "radial-gradient(circle at 8px 0, transparent 7px, var(--card) 8px) 0 0 / 16px 12px repeat-x" }} />
            </div>
          </div>

          <div>
            <h3 className="text-[26px] font-semibold leading-tight tracking-tight">Pricing you can check yourself</h3>
            <ul className="mt-6 space-y-4">
              {BENCH.map((b) => (
                <li key={b.t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30"><b.icon className="h-5 w-5" /></span>
                  <span><span className="block text-[16px] font-semibold tracking-tight">{b.t}</span><span className="mt-0.5 block text-[13.5px] leading-snug text-muted-foreground">{b.d}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* calculator */}
        <div className="mt-20">
          <div className="mb-5 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">Cost calculator</p>
            <p className="mt-1 text-[24px] font-semibold tracking-tight">Estimate your monthly RCS spend</p>
          </div>
          <div className="rounded-[32px] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/15 p-3 sm:p-5">{children}</div>
        </div>

        {/* wallet plans as wallet cards */}
        <div id="rcs-plans" className="mt-20 scroll-mt-32">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">Wallet plans</p>
            <h3 className="mt-1 text-[28px] font-semibold tracking-tight">No platform fee. Pick a wallet size.</h3>
            <p className="mx-auto mt-2 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">The plan amount is your wallet credit, valid for 24 months and usable against the rate card above.</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl items-start gap-8 md:grid-cols-3">
            {RCS_PLANS.map((p, i) => {
              const featured = p.badge === "Most popular"
              const tones = [
                "linear-gradient(135deg, oklch(0.36 0.07 190), oklch(0.24 0.05 215))",
                "linear-gradient(135deg, oklch(0.72 0.13 175), oklch(0.5 0.12 176) 60%, oklch(0.38 0.09 180))",
                "linear-gradient(135deg, oklch(0.18 0.03 240), oklch(0.12 0.02 245))",
              ]
              return (
                <div key={p.id} className={`group relative ${featured ? "md:-mt-4" : ""}`}>
                  <div className={`overflow-hidden rounded-[26px] border bg-card transition duration-500 group-hover:-translate-y-1.5 ${featured ? "border-primary/60 shadow-[0_44px_80px_-36px_oklch(0.62_0.14_168/0.8)] ring-4 ring-primary/10" : "border-border shadow-[0_30px_60px_-38px_rgba(15,42,58,.45)]"}`}>
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[oklch(0.22_0.04_60)] shadow-md"><Sparkles className="h-3 w-3" />{p.badge}</span>
                  )}
                  {/* the card */}
                  <div className="relative aspect-[1.7/1] overflow-hidden p-6 text-white" style={{ background: tones[i % tones.length] }}>
                    <div aria-hidden className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10" />
                    <div aria-hidden className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-white/[0.07]" />
                    <div aria-hidden className="absolute inset-0 overflow-hidden"><span className="absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-1000 group-hover:left-[130%]" /></div>
                    <div className="relative flex items-start justify-between">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">SMSLocal Wallet</p>
                      <span className="flex h-8 w-11 items-center justify-center rounded-md bg-gradient-to-br from-[#f6d77a] to-[#c58f22]"><i className="block h-4 w-6 rounded-sm border border-black/20" /></span>
                    </div>
                    <p className="relative mt-5 text-[44px] font-semibold leading-none tracking-tight tabular-nums">{formatInr(p.walletInr)}</p>
                    <p className="relative mt-1 text-[12.5px] text-white/75">credit · valid 24 months</p>
                    <div className="absolute inset-x-6 bottom-5 flex items-end justify-between">
                      <p className="text-[15px] font-semibold tracking-wide">{p.name.toUpperCase()}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">No platform fee</p>
                    </div>
                  </div>

                  {/* details */}
                  <div className="px-6 pb-6 pt-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-primary/10 px-4 py-3">
                        <p className="text-[20px] font-semibold leading-none tabular-nums text-primary">{p.richCardsIncluded.toLocaleString("en-IN")}</p>
                        <p className="mt-1 text-[11.5px] font-medium text-muted-foreground">rich cards</p>
                      </div>
                      <div className="rounded-2xl bg-muted px-4 py-3">
                        <p className="text-[20px] font-semibold leading-none tabular-nums">{p.basicTextsIncluded.toLocaleString("en-IN")}</p>
                        <p className="mt-1 text-[11.5px] font-medium text-muted-foreground">or basic texts</p>
                      </div>
                    </div>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Included</p>
                    <ul className="mt-3 space-y-3">
                      {p.includes.slice(0, 3).map((line) => (
                        <li key={line} className="flex items-start gap-3 text-[13.5px] leading-snug">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup/" className={`group/btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14.5px] font-semibold transition ${featured ? "bg-gradient-to-r from-primary to-[oklch(0.5_0.12_176)] text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110" : "bg-foreground text-background hover:opacity-90"}`}>
                      Start with {p.name}
                      <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-10 text-center text-[13.5px] text-muted-foreground">Need volume pricing? <Link href="/company/contact/" className="font-semibold text-primary underline-offset-2 hover:underline">Talk to sales</Link></p>
        </div>
      </div>
    </section>
  )
}


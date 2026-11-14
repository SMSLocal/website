import Link from "next/link"
import { IntegrationsUnlock } from "@/components/product/integrations-unlock"
import type { ComponentType, ReactNode } from "react"
import {
  BadgeCheck,
  Check,
  Code2,
  Facebook,
  FlaskConical,
  Fingerprint,
  Gauge,
  Instagram,
  KeyRound,
  Lock,
  Mail,
  MessageCircle,
  MessageSquareText,
  MessagesSquare,
  Phone,
  Quote,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Webhook,
} from "lucide-react"

// Bespoke sections for /products/integrations (everything below the hero): an app directory, a plan staircase of the
// native channels, an API console (the dark section), a row of compliance stamps and staggered quotes. Site palette only.

type Plan = "Free" | "Starter" | "Growth" | "Scale" | "Enterprise"

const PLAN: Record<Plan, string> = {
  Free: "bg-muted text-foreground",
  Starter: "bg-primary/10 text-primary",
  Growth: "bg-accent/45 text-foreground",
  Scale: "bg-foreground/10 text-foreground",
  Enterprise: "bg-foreground text-background",
}

const CSS = `
@keyframes in-flow { to { stroke-dashoffset: -24 } }
@keyframes in-float { 0%, 100% { translate: 0 0 } 50% { translate: 0 -6px } }
@keyframes in-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
@keyframes in-glow { 0%, 100% { opacity: .5 } 50% { opacity: 1 } }
@keyframes in-orbit { to { transform: rotate(360deg) } }
.in-orbit { animation: in-orbit 30s linear infinite }
@keyframes in-dash { to { background-position: 28px 0 } }
.in-dash { background: repeating-linear-gradient(90deg, var(--primary) 0 6px, transparent 6px 14px); background-size: 28px 2px; background-repeat: repeat-x; animation: in-dash .9s linear infinite }
.in-ring { transition: stroke-dashoffset 1.6s cubic-bezier(.3,.7,.2,1) .2s }
.wx-pre .in-ring { stroke-dashoffset: 339.3 }
@keyframes in-led { 0%, 100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes in-code { 0%, 70% { opacity: 1 } 80%, 100% { opacity: .15 } }
.in-led { animation: in-led 1.8s ease-in-out infinite }
.in-code { animation: in-code 3s ease-in-out infinite }
@keyframes in-travel { 0% { left: 0; opacity: 0 } 6%, 94% { opacity: 1 } 100% { left: calc(100% - 14px); opacity: 0 } }
.in-travel { animation: in-travel 7s ease-in-out infinite }
.in-float { animation: in-float 6s ease-in-out infinite }
.in-blink { animation: in-blink 1s steps(1) infinite }
.in-glow { animation: in-glow 7s ease-in-out infinite }
.in-lift { transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .3s, box-shadow .3s }
.in-lift:hover { transform: translateY(-5px) }
.in-rise { transform-origin: bottom; transition: transform .9s cubic-bezier(.2,.7,.2,1) .15s }
.wx-pre .in-rise { transform: scaleY(0) }
.in-pop { transition: transform .55s cubic-bezier(.3,1.5,.5,1) .25s }
.wx-pre .in-pop { transform: scale(0) }
@media (prefers-reduced-motion: reduce) { .in-ring { transition: none } .in-float, .in-blink, .in-glow, .in-orbit, .in-dash, .in-led, .in-code, .in-travel { animation: none } .in-lift, .in-rise, .in-pop { transition: none } }
`

export function IntegrationsStyles() {
  return <style>{CSS}</style>
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}

const H2 = "mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]"

/* ───────────────────────── 1. APP DIRECTORY ───────────────────────── */

const CATEGORIES: { id: string; label: string; gate: Plan; blurb: string; cards: { name: string; desc: string; plan: Plan }[] }[] = [
  {
    id: "ecommerce", label: "E-commerce", gate: "Starter", blurb: "Order, tracking and refund messages from your store.",
    cards: [
      { name: "Shopify", desc: "Order, tracking and refund alerts on SMS and WhatsApp.", plan: "Starter" },
      { name: "WooCommerce", desc: "WordPress store orders and customer data sync.", plan: "Starter" },
      { name: "Magento", desc: "Enterprise catalog and order event triggers.", plan: "Growth" },
    ],
  },
  {
    id: "crm", label: "CRM", gate: "Starter", blurb: "Contacts, deals and message history in sync.",
    cards: [
      { name: "HubSpot", desc: "Sync contacts, deals and message history.", plan: "Starter" },
      { name: "Salesforce", desc: "Bi-directional CRM sync with messaging workflows.", plan: "Growth" },
      { name: "Zoho CRM", desc: "Fire SMS and WhatsApp from Zoho lead stages.", plan: "Starter" },
    ],
  },
  {
    id: "helpdesk", label: "Helpdesk", gate: "Growth", blurb: "Support tickets over WhatsApp and SMS.",
    cards: [
      { name: "Freshdesk", desc: "Reply to tickets over WhatsApp from one inbox.", plan: "Growth" },
      { name: "Zendesk", desc: "Turn SMS replies into helpdesk tickets.", plan: "Growth" },
      { name: "Intercom", desc: "Route conversations and escalations.", plan: "Scale" },
    ],
  },
  {
    id: "communication", label: "Communication", gate: "Starter", blurb: "Customer messages where your team already works.",
    cards: [
      { name: "Slack", desc: "Route customer messages into Slack channels.", plan: "Starter" },
      { name: "Microsoft Teams", desc: "Notify teams on replies and escalations.", plan: "Starter" },
      { name: "Google Sheets", desc: "Log contacts and conversations to a sheet.", plan: "Starter" },
    ],
  },
  {
    id: "analytics", label: "Analytics", gate: "Growth", blurb: "Attribute results and pipe metrics to dashboards.",
    cards: [
      { name: "Google Analytics", desc: "Attribute conversions to campaigns.", plan: "Growth" },
      { name: "Mixpanel", desc: "Stream delivery and reply events.", plan: "Growth" },
      { name: "Power BI", desc: "Pipe message metrics into dashboards.", plan: "Scale" },
    ],
  },
  {
    id: "automation", label: "Automation", gate: "Starter", blurb: "No-code flows across thousands of other apps.",
    cards: [
      { name: "Zapier", desc: "Connect SMSLocal to 6,000+ apps. No code.", plan: "Starter" },
      { name: "Make", desc: "Visual scenario builder with branching.", plan: "Starter" },
      { name: "Pabbly Connect", desc: "Affordable multi-step automation flows.", plan: "Growth" },
    ],
  },
]

function symbol(name: string) {
  const w = name.split(" ")
  const first = w[0][0].toUpperCase()
  const second = w.length > 1 ? w[1][0] : w[0][1]
  return first + second.toLowerCase()
}

export function IntegrationsDirectory() {
  let n = 0
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>App integrations</Eyebrow>
          <h2 className={H2}>Connect SMSLocal to Shopify, HubSpot, Salesforce, Slack and Zapier</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Connect the tools your team already uses. Six categories, each with a one-click OAuth connector, so order events, leads and replies flow between your apps and your SMS and WhatsApp messaging.
          </p>
        </div>

        {/* a periodic table of integrations: one column per category */}
        <div className="mt-12 grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="flex flex-col gap-3">
              <div className="rounded-2xl bg-gradient-to-b from-primary/85 to-primary px-4 py-3 text-primary-foreground shadow-[0_16px_28px_-16px] shadow-primary/60 ring-1 ring-white/25">
                <h3 className="text-[15px] font-semibold leading-tight tracking-tight">{c.label}</h3>
                <p className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-primary-foreground/80">From {c.gate}</p>
              </div>
              {c.cards.map((a) => {
                n += 1
                return (
                  <div key={a.name} className="in-lift group relative flex flex-col rounded-2xl border border-border bg-card p-4 shadow-[0_18px_36px_-30px_rgba(15,42,58,.5)] hover:border-primary/50 hover:shadow-[0_24px_44px_-26px_rgba(15,42,58,.55)]">
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-bold tracking-wide text-muted-foreground">{String(n).padStart(2, "0")}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${PLAN[a.plan]}`}>{a.plan}</span>
                    </div>
                    <p className="mt-2 text-[34px] font-extrabold leading-none tracking-tight text-primary transition group-hover:scale-105 group-hover:text-foreground">{symbol(a.name)}</p>
                    <h4 className="mt-3 text-[14.5px] font-semibold leading-tight tracking-tight">{a.name}</h4>
                    <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">{a.desc}</p>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-muted-foreground">
          Plan tags show the lowest plan with that connector. <span className="font-semibold text-foreground">Anything else connects through the REST API or Zapier and Make.</span>
        </p>
      </div>
    </section>
  )
}

/* ───────────────────────── 2. NATIVE CHANNELS: plan staircase ───────────────────────── */

export function IntegrationsChannels() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <IntegrationsUnlock>
          <Eyebrow>Native channels</Eyebrow>
          <h2 className={H2}>10 messaging channels built in, no connector needed</h2>
          <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            SMS, WhatsApp, email, OTP, RCS, voice, live chat, Telegram, Instagram and Messenger are native to SMSLocal, so you never need a third-party connector to reach a customer. Each plan unlocks more channels. More channels coming soon.
          </p>
        </IntegrationsUnlock>
      </div>
    </section>
  )
}

/* ───────────────────────── 3. API CONSOLE (dark) ───────────────────────── */

const API_BULLETS: { icon: ComponentType<{ className?: string }>; t: string }[] = [
  { icon: Code2, t: "REST API with full CRUD for contacts, campaigns and messages" },
  { icon: Webhook, t: "Webhooks on delivery receipts, replies and status changes" },
  { icon: KeyRound, t: "OAuth 2.0 for third-party app authentication" },
  { icon: Gauge, t: "Rate limits: 1,000 req/min on Starter, 10,000 on Enterprise" },
  { icon: FlaskConical, t: "Sandbox environment to simulate delivery and carrier failures" },
]

const FLOW: { icon: ComponentType<{ className?: string }>; t: string; s: string }[] = [
  { icon: Server, t: "Your backend or CRM", s: "Any language, any stack" },
  { icon: Code2, t: "SMSLocal REST API", s: "POST /v1/messages" },
  { icon: MessageCircle, t: "Customer", s: "WhatsApp, SMS and more" },
  { icon: Webhook, t: "Your webhook", s: "Receipts, replies, status" },
]

export function IntegrationsApi() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-14 text-white sm:py-20">
      <div aria-hidden className="in-glow pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3.5 w-3.5" />Build your own</span>
          <h2 className={`${H2} text-white`}>A full REST API and webhooks for anything else</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-white/70">
            If there is no native connector, wire SMSLocal into your own CRM, backend or workflow with the REST API, webhooks and OAuth 2.0. Full REST API on every paid plan.
          </p>
        </div>

        {/* request lifecycle */}
        <ol className="mt-12 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:gap-0">
          {FLOW.map((f, i) => (
            <li key={f.t} className="contents">
              <div className="in-lift flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[.05] px-4 py-4 backdrop-blur hover:border-primary/50">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_12px_22px_-10px] shadow-primary/60 ring-1 ring-white/25"><f.icon className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold leading-tight">{f.t}</span>
                  <span className="block truncate font-mono text-[11.5px] text-white/55">{f.s}</span>
                </span>
              </div>
              {i < FLOW.length - 1 && (
                <span aria-hidden className="hidden w-10 items-center md:flex"><i className="in-dash block h-[2px] w-full" /></span>
              )}
            </li>
          ))}
        </ol>

        {/* request and response side by side */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-white/55">Request <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10.5px] font-bold normal-case tracking-normal text-primary">Sandbox</span></span>
              <span className="text-[12px] font-semibold text-white/60">Send a WhatsApp message</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-white/85"><span className="text-primary">POST</span> /v1/messages{"\n"}Authorization: Bearer YOUR_API_KEY{"\n\n"}{"{"}{"\n"}  <span className="text-accent">&quot;channel&quot;</span>:      &quot;whatsapp&quot;,{"\n"}  <span className="text-accent">&quot;to&quot;</span>:           &quot;+91XXXXXXXXXX&quot;,{"\n"}  <span className="text-accent">&quot;content_type&quot;</span>: &quot;text&quot;,{"\n"}  <span className="text-accent">&quot;content&quot;</span>:      &quot;Hi! How can I help you?&quot;{"\n"}{"}"}<span className="in-blink ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-primary" /></pre>
          </div>
          <div className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/55">Response</span>
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10.5px] font-bold text-primary-foreground">202 Accepted</span>
            </div>
            <pre className="p-5 font-mono text-[12.5px] leading-relaxed text-white/75">{"{"}{"\n"}  <span className="text-accent">&quot;id&quot;</span>:     &quot;msg_••••••&quot;,{"\n"}  <span className="text-accent">&quot;status&quot;</span>: &quot;queued&quot;{"\n"}{"}"}</pre>
            <div className="mt-auto border-t border-white/10 p-5">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/45">Then, to your webhook</p>
              <p className="mt-2 flex items-center gap-2 font-mono text-[12px] text-white/75"><i className="in-glow h-2 w-2 rounded-full bg-primary" />Delivery receipt · Reply · Status change</p>
            </div>
          </div>
        </div>

        {/* what you get */}
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {API_BULLETS.map((b) => (
            <li key={b.t} className="in-lift flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 hover:border-primary/50">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30"><b.icon className="h-4.5 h-[18px] w-[18px]" /></span>
              <span className="text-[13.5px] leading-snug text-white/85">{b.t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/developers/api-docs/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">API reference</Link>
          <Link href="/developers/quickstart/" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/15">Quickstart</Link>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. TRUST STAMPS ───────────────────────── */

const STAMPS: { icon: ComponentType<{ className?: string }>; t: string; s: string }[] = [
  { icon: Server, t: "AWS Mumbai", s: "ap-south-1 hosting" },
  { icon: ShieldCheck, t: "DPDPA 2023", s: "Compliant" },
  { icon: BadgeCheck, t: "DLT-registered", s: "Jio, Airtel, Vi, BSNL" },
  { icon: Lock, t: "AES-256", s: "Encryption at rest" },
  { icon: Fingerprint, t: "MFA", s: "On every agent account" },
]

const JOURNEY: { icon: ComponentType<{ className?: string }>; t: string; s: string; step: string }[] = [
  { icon: Fingerprint, t: "MFA", s: "On every agent account", step: "Sign in" },
  { icon: Server, t: "AWS Mumbai", s: "ap-south-1 hosting, in India", step: "Hosted" },
  { icon: Lock, t: "AES-256", s: "Encryption at rest", step: "Stored" },
  { icon: ShieldCheck, t: "DPDPA 2023", s: "Compliant data handling", step: "Governed" },
  { icon: BadgeCheck, t: "DLT-registered", s: "Jio, Airtel, Vi and BSNL", step: "Delivered" },
]

export function IntegrationsTrust() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Secure by default</Eyebrow>
          <h2 className={H2}>Integrations built for Indian compliance and security</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Every connection runs on infrastructure hosted in India, with DPDPA 2023 compliance, DLT registration across the major carriers, AES-256 encryption at rest and MFA on every agent account.
          </p>
        </div>

        {/* the path your data takes, with a control at every stop */}
        <ol className="relative mt-14 grid gap-4 lg:grid-cols-5 lg:grid-rows-[auto_64px_auto] lg:gap-x-5 lg:gap-y-0">
          <span aria-hidden className="relative z-0 hidden h-[3px] self-center rounded-full bg-primary/20 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:block">
            <i className="in-travel absolute -top-[5.5px] h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_16px_4px] shadow-primary/60" />
          </span>

          {JOURNEY.map((j, i) => {
            const top = i % 2 === 0
            return (
              <li key={j.t} className="contents">
                <span aria-hidden className={`z-10 hidden items-center justify-center self-center justify-self-center lg:row-start-2 lg:flex`} style={{ gridColumnStart: i + 1 }}>
                  <span className="in-pop flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-primary/85 to-primary text-[13px] font-extrabold text-primary-foreground shadow-[0_10px_20px_-6px] shadow-primary/60 ring-[5px] ring-muted">{i + 1}</span>
                </span>
                <div className={`in-lift relative rounded-3xl border border-border bg-card p-5 shadow-[0_24px_46px_-34px_rgba(15,42,58,.5)] hover:border-primary/40 ${top ? "lg:row-start-1" : "lg:row-start-3"}`} style={{ gridColumnStart: i + 1 }}>
                  <span aria-hidden className={`absolute left-1/2 hidden h-8 w-px -translate-x-1/2 bg-primary/40 lg:block ${top ? "top-full" : "bottom-full"}`} />
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">{j.step}</p>
                  <div className="mt-3 flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_12px_22px_-8px] shadow-primary/50 ring-1 ring-white/30"><j.icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <h3 className="text-[16.5px] font-semibold leading-tight tracking-tight">{j.t}</h3>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">{j.s}</p>
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── 5. WORKFLOWS: if this, then that ───────────────────────── */

const RECIPES: { app: string; when: string; then: string; icon: ComponentType<{ className?: string }> }[] = [
  { app: "Shopify", when: "An order ships or is refunded", then: "Send a tracking or refund alert on WhatsApp or SMS", icon: MessageCircle },
  { app: "HubSpot", when: "A lead moves to a new stage", then: "Send a follow-up SMS or WhatsApp message", icon: MessageSquareText },
  { app: "Zoho CRM", when: "A lead reaches a chosen stage", then: "Fire an SMS or WhatsApp message automatically", icon: Send },
  { app: "Zendesk", when: "A customer replies by SMS", then: "Turn the reply into a helpdesk ticket", icon: MessagesSquare },
  { app: "Freshdesk", when: "A support ticket is updated", then: "Reply to the customer over WhatsApp", icon: MessageCircle },
  { app: "Slack", when: "A customer sends a message", then: "Route it into a Slack channel for your team", icon: MessagesSquare },
  { app: "Google Sheets", when: "A conversation takes place", then: "Log the contact and conversation to a sheet", icon: Mail },
  { app: "Zapier", when: "A new lead appears in any of 6,000+ apps", then: "Send an SMS with no code", icon: Send },
]

export function IntegrationsRecipes() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Popular workflows</Eyebrow>
          <h2 className={H2}>Workflows you can automate with SMSLocal integrations</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Connect an app once, then let events in your store, CRM or helpdesk trigger SMS and WhatsApp messages, and let customer replies flow back into the tools your team already uses.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {RECIPES.map((r) => (
            <li key={r.app} className="in-lift rounded-3xl border border-border bg-card p-5 shadow-[0_24px_46px_-34px_rgba(15,42,58,.5)] hover:border-primary/40 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-primary/80 to-primary text-[14px] font-extrabold text-primary-foreground shadow-[0_10px_18px_-8px] shadow-primary/50 ring-1 ring-white/30">{r.app[0]}</span>
                  <h3 className="text-[16px] font-semibold tracking-tight">{r.app}</h3>
                </span>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Workflow</span>
              </div>

              <div className="mt-5 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-0">
                <div className="rounded-2xl bg-muted/70 px-4 py-3.5 ring-1 ring-border">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted-foreground">When</p>
                  <p className="mt-1 text-[13.5px] font-semibold leading-snug">{r.when}</p>
                </div>
                <span aria-hidden className="hidden w-12 items-center sm:flex"><i className="in-dash block h-[2px] w-full" /></span>
                <div className="flex items-start gap-3 rounded-2xl bg-primary/[.08] px-4 py-3.5 ring-1 ring-primary/30">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><r.icon className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">Then</span>
                    <span className="mt-1 block text-[13.5px] font-semibold leading-snug">{r.then}</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, ArrowUpRight, Bot, Check, Clock, Plus, ShieldCheck, X } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { AppLogo } from "@/components/product/app-logo"
import { AI_AGENTIC_FAQS } from "@/components/product/ai-agentic-faq-data"

export const metadata: Metadata = getPageMetadata("/products/ai-agentic")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

type AppItem = { name: string; url: string }

const MARQUEE_A: AppItem[] = [
  { name: "Shopify", url: "https://www.shopify.com" },
  { name: "Razorpay", url: "https://razorpay.com" },
  { name: "HubSpot", url: "https://www.hubspot.com" },
  { name: "Salesforce", url: "https://www.salesforce.com" },
  { name: "Stripe", url: "https://stripe.com" },
  { name: "Zendesk", url: "https://www.zendesk.com" },
  { name: "Freshdesk", url: "https://freshdesk.com" },
  { name: "Zoho CRM", url: "https://www.zoho.com/crm/" },
]
const MARQUEE_B: AppItem[] = [
  { name: "Gmail", url: "https://www.google.com/gmail/about/" },
  { name: "Slack", url: "https://slack.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Notion", url: "https://www.notion.so" },
  { name: "Jira", url: "https://www.atlassian.com/software/jira" },
  { name: "QuickBooks", url: "https://quickbooks.intuit.com" },
  { name: "Airtable", url: "https://www.airtable.com" },
  { name: "Calendly", url: "https://calendly.com" },
]

const APP_CATEGORIES = [
  { slug: "crm", label: "CRM" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "finance-accounting", label: "Finance and Accounting" },
  { slug: "sales-customer-support", label: "Sales and Customer Support" },
  { slug: "developer-tools-devops", label: "Developer Tools and DevOps" },
  { slug: "hr-recruiting", label: "HR and Recruiting" },
  { slug: "document-file-management", label: "Document and File Management" },
  { slug: "collaboration-communication", label: "Collaboration and Communication" },
  { slug: "productivity-project-management", label: "Productivity and Project Management" },
  { slug: "scheduling-booking", label: "Scheduling and Booking" },
  { slug: "analytics-data", label: "Analytics and Data" },
  { slug: "data-analytics", label: "Data and Analytics" },
  { slug: "ai-machine-learning", label: "AI and Machine Learning" },
  { slug: "workflow-automation", label: "Workflow Automation" },
  { slug: "marketing-social-media", label: "Marketing and Social Media" },
  { slug: "social-media", label: "Social Media" },
]

/* Use-case ledger: what the customer says, and what Captain does in the connected app */
const LEDGER = [
  { tag: "Order support", ask: "Where is my order?", app: "Shopify", url: "https://www.shopify.com", does: "Looks up the order and shares live tracking" },
  { tag: "Payments and billing", ask: "I want a refund.", app: "Razorpay", url: "https://razorpay.com", does: "Issues the refund and confirms the amount" },
  { tag: "Billing", ask: "Send me my invoice.", app: "QuickBooks", url: "https://quickbooks.intuit.com", does: "Finds the invoice and sends it in the chat" },
  { tag: "CRM and sales", ask: "Update my phone number.", app: "HubSpot", url: "https://www.hubspot.com", does: "Updates the contact record and logs a note" },
  { tag: "Engineering", ask: "Report this bug for me.", app: "GitHub", url: "https://github.com", does: "Opens an issue with the details attached" },
  { tag: "HR and internal help", ask: "How many leave days do I have?", app: "Zoho", url: "https://www.zoho.com/people/", does: "Reads the leave balance and answers instantly" },
]

const STEPS = [
  { t: "Connect an app", d: "One-click sign in. Captain only gets the access you approve." },
  { t: "Set the rules", d: "Choose what it may look up and what it may change, app by app." },
  { t: "Let it work", d: "It reads the chat, checks your apps and takes the action." },
]

const LOG = [
  { time: "10:42:07", app: "Shopify", act: "lookup order #1042", ok: true },
  { time: "10:42:08", app: "Razorpay", act: "refund ₹1,499", ok: true },
  { time: "10:42:09", app: "HubSpot", act: "note added to contact", ok: true },
  { time: "10:42:09", app: "Stripe", act: "write blocked by role", ok: false },
]

const FAQS = AI_AGENTIC_FAQS.slice(0, 6)

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
const H2 = "text-balance text-[30px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[42px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const GRADIENT_TEXT = "bg-gradient-to-r from-primary to-[oklch(0.66_0.13_215)] bg-clip-text text-transparent"

/* ─── HERO "LIVE AGENT RUN" (12s loop) ────────────────────────────────────── */

/* s = start of each tool call in % of the loop. Cards sit at cy in the 440px-high canvas. */
const CALLS = [
  { app: "Shopify", url: "https://www.shopify.com", call: "GET  /orders/1042", ms: "142 ms", s: 16, cy: 55 },
  { app: "Razorpay", url: "https://razorpay.com", call: "POST /refunds", ms: "318 ms", s: 30, cy: 165 },
  { app: "HubSpot", url: "https://www.hubspot.com", call: "PATCH /contacts", ms: "96 ms", s: 44, cy: 275 },
  { app: "Gmail", url: "https://www.google.com/gmail/about/", call: "POST /messages", ms: "204 ms", s: 58, cy: 385 },
].map((c) => ({ ...c, d: `M210 220 C 270 220, 280 ${c.cy}, 340 ${c.cy}` }))

const k = (n: number) => (n / 100).toFixed(3)
const RUN_KEYFRAMES = [
  ...CALLS.flatMap((c, i) => [
    `@keyframes agidle${i} { 0%, ${c.s}% { opacity: 1 } ${c.s + 1}%, 95% { opacity: 0 } 98%, 100% { opacity: 1 } }`,
    `@keyframes agcall${i} { 0%, ${c.s}% { opacity: 0 } ${c.s + 1}%, ${c.s + 12}% { opacity: 1 } ${c.s + 13}%, 100% { opacity: 0 } }`,
    `@keyframes agdone${i} { 0%, ${c.s + 12}% { opacity: 0 } ${c.s + 13}%, 95% { opacity: 1 } 98%, 100% { opacity: 0 } }`,
    `@keyframes agcard${i} { 0%, ${c.s - 1}% { border-color: var(--border); box-shadow: 0 1px 2px rgb(0 0 0 / 0.04) } ${c.s + 5}% { border-color: var(--primary); box-shadow: 0 0 0 5px color-mix(in oklch, var(--primary) 18%, transparent) } ${c.s + 16}%, 95% { border-color: color-mix(in oklch, var(--primary) 55%, white); box-shadow: 0 1px 2px rgb(0 0 0 / 0.04) } 98%, 100% { border-color: var(--border); box-shadow: 0 1px 2px rgb(0 0 0 / 0.04) } }`,
  ]),
  ...[
    ["agm0", 2, 4], ["agm1", 14, 4], ["agm2", 66, 4], ["agm3", 74, 4], ["agm4", 82, 4],
  ].map(([n, from]) => `@keyframes ${n} { 0%, ${from}% { opacity: 0; transform: translateY(10px) scale(.97) } ${(from as number) + 4}%, 95% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }`),
  "@keyframes agtype { 0%, 6% { opacity: 0 } 8%, 13% { opacity: 1 } 15%, 100% { opacity: 0 } }",
  "@keyframes agthink { 0%, 14% { opacity: 0 } 17%, 64% { opacity: 1 } 68%, 100% { opacity: 0 } }",
  "@keyframes agdoneRing { 0%, 68% { opacity: 0; transform: scale(.6) } 74%, 95% { opacity: 1; transform: scale(1) } 98%, 100% { opacity: 0 } }",
].join("\n")

function MiniLogo({ name, url, size = 34 }: { name: string; url: string; size?: number }) {
  const host = new URL(url).hostname
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${host}&size=128`} alt={name} width={size} height={size} style={{ width: size, height: size }} className="shrink-0 rounded-lg bg-white object-contain p-0.5 ring-1 ring-border" />
  )
}

function ToolCard({ c, i }: { c: (typeof CALLS)[number]; i: number }) {
  return (
    <div className="flex h-[90px] w-full flex-col justify-center rounded-2xl border bg-background px-3.5 lg:w-[230px]" style={{ animation: `agcard${i} 12s linear infinite` }}>
      <div className="flex items-center gap-3">
        <MiniLogo name={c.app} url={c.url} />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold leading-tight text-foreground">{c.app}</p>
          <p className="mt-0.5 whitespace-pre font-mono text-[10.5px] leading-tight text-muted-foreground">{c.call}</p>
        </div>
      </div>
      <div className="relative mt-2.5 h-[14px] font-mono text-[10.5px]">
        <span className="absolute inset-0 flex items-center gap-1.5 text-muted-foreground" style={{ animation: `agidle${i} 12s linear infinite` }}><i className="h-1.5 w-1.5 rounded-full bg-border" />waiting</span>
        <span className="absolute inset-0 flex items-center gap-1.5 text-primary" style={{ animation: `agcall${i} 12s linear infinite`, opacity: 0 }}><i className="ag-spin h-2.5 w-2.5 rounded-full border-[1.5px] border-primary border-t-transparent" />calling API</span>
        <span className="absolute inset-0 flex items-center gap-1.5 text-primary" style={{ animation: `agdone${i} 12s linear infinite`, opacity: 0 }}><Check className="h-3 w-3" strokeWidth={3.2} />done · {c.ms}</span>
      </div>
    </div>
  )
}

function AgentCanvas() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border bg-background p-5 shadow-2xl shadow-primary/15 sm:p-8" aria-hidden>
      <div className="absolute inset-0 [background-image:radial-gradient(circle,color-mix(in_oklch,var(--primary)_20%,transparent)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]" />
      <div className="absolute -left-16 top-1/3 h-60 w-60 rounded-full bg-primary/15 blur-[80px]" />
      <div className="absolute -right-16 bottom-0 h-60 w-60 rounded-full bg-[oklch(0.66_0.13_215)]/15 blur-[80px]" />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>Live agent run · ticket #1042</span>
        <span className="flex items-center gap-4"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-primary" />request</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-accent" />live data</span></span>
      </div>

      <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-0">
        {/* phone */}
        <div className="relative h-[440px] w-[280px] shrink-0 rounded-[38px] border-[7px] border-foreground bg-secondary shadow-2xl shadow-foreground/20">
          <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
          <div className="flex h-[58px] items-end gap-2.5 rounded-t-[30px] bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-4 pb-2.5 text-primary-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25"><Bot className="h-4 w-4" /></span>
            <span className="leading-tight"><span className="block text-[13px] font-semibold">Your Store Support</span><span className="block text-[10px] opacity-80">WhatsApp · online</span></span>
          </div>
          <div className="relative px-3 pt-3 text-[12.5px] leading-snug">
            <p className="ag-m ag-m0 absolute right-3 top-3 max-w-[78%] rounded-2xl rounded-br-sm bg-white px-3 py-2 text-foreground shadow-sm">Please refund order #1042.</p>
            <p className="ag-m ag-m1 absolute left-3 top-[68px] max-w-[78%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-foreground shadow-sm">On it. Checking your order…</p>
            <p className="ag-type absolute left-3 top-[118px] flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 shadow-sm"><i className="ag-bounce h-1.5 w-1.5 rounded-full bg-muted-foreground" /><i className="ag-bounce h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: ".15s" }} /><i className="ag-bounce h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: ".3s" }} /></p>
            <p className="ag-m ag-m2 absolute left-3 top-[122px] max-w-[82%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-foreground shadow-sm">Your refund of <b>₹1,499</b> is issued. <span className="text-primary">✓✓</span></p>
            <p className="ag-m ag-m3 absolute left-3 top-[190px] max-w-[82%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-foreground shadow-sm">I have emailed you the confirmation too.</p>
            <p className="ag-m ag-m4 absolute inset-x-3 top-[262px] flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 py-1.5 text-[11px] font-medium text-primary"><Clock className="h-3 w-3" />Resolved in 6 seconds · no ticket</p>
          </div>
        </div>

        {/* wires and Captain core (large screens) */}
        <div className="relative hidden h-[440px] w-[340px] shrink-0 lg:block">
          <svg viewBox="0 0 340 440" className="absolute inset-0 h-full w-full" fill="none">
            <defs><filter id="agglow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" /></filter></defs>
            <path d="M0 220 L 130 220" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="4 6" />
            {CALLS.map((c) => <path key={c.app} d={c.d} stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="1.6" strokeDasharray="4 6" />)}
            {CALLS.map((c) => (
              <g key={`pk-${c.app}`}>
                <g>
                  <circle r="9" fill="var(--primary)" opacity="0.5" filter="url(#agglow)" /><circle r="4.5" fill="var(--primary)" />
                  <animateMotion dur="12s" repeatCount="indefinite" path={c.d} calcMode="linear" keyPoints="0;0;1;1" keyTimes={`0;${k(c.s)};${k(c.s + 6)};1`} />
                  <animate attributeName="opacity" dur="12s" repeatCount="indefinite" calcMode="discrete" values="0;1;0;0" keyTimes={`0;${k(c.s)};${k(c.s + 6)};1`} />
                </g>
                <g>
                  <circle r="9" fill="var(--accent)" opacity="0.55" filter="url(#agglow)" /><circle r="4.5" fill="var(--accent)" />
                  <animateMotion dur="12s" repeatCount="indefinite" path={c.d} calcMode="linear" keyPoints="1;1;0;0" keyTimes={`0;${k(c.s + 7)};${k(c.s + 13)};1`} />
                  <animate attributeName="opacity" dur="12s" repeatCount="indefinite" calcMode="discrete" values="0;1;0;0" keyTimes={`0;${k(c.s + 7)};${k(c.s + 13)};1`} />
                </g>
              </g>
            ))}
          </svg>
          <div className="absolute left-[130px] top-[180px] h-[80px] w-[80px]">
            <span className="ag-pulse absolute -inset-3 rounded-full border border-primary/40" />
            <span className="ag-pulse absolute -inset-3 rounded-full border border-primary/40" style={{ animationDelay: "-1.4s" }} />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.13_200)] shadow-xl shadow-primary/40">
              <Bot className="h-9 w-9 text-primary-foreground" strokeWidth={1.8} />
              <span className="ag-doneRing absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground ring-2 ring-background"><Check className="h-3.5 w-3.5" strokeWidth={3.2} /></span>
            </div>
            <p className="ag-think absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Planning<span className="ag-dots" /></p>
            <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">Captain AI</p>
          </div>
        </div>

        {/* app tool-call cards */}
        <div className="grid w-full max-w-[280px] gap-3 sm:max-w-md sm:grid-cols-2 lg:flex lg:h-[440px] lg:w-[230px] lg:max-w-none lg:flex-col lg:justify-between lg:gap-[20px]">
          {CALLS.map((c, i) => <ToolCard key={c.app} c={c} i={i} />)}
        </div>
      </div>
    </div>
  )
}

/* ─── SMALL PIECES ────────────────────────────────────────────────────────── */

function MarqueeRow({ items, reverse }: { items: AppItem[]; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="ag-fade-x relative overflow-hidden">
      <div className={`flex w-max gap-3 ${reverse ? "ag-marquee-r" : "ag-marquee"}`}>
        {loop.map((a, i) => (
          <div key={`${a.name}-${i}`} className="flex items-center gap-3 rounded-2xl border border-border bg-background py-2 pl-2 pr-5 shadow-sm" aria-hidden={i >= items.length}>
            <AppLogo name={a.name} url={a.url} />
            <span className="text-[15px] font-medium text-foreground">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span aria-hidden className={`relative inline-block h-5 w-9 shrink-0 rounded-full ${on ? "bg-primary" : "bg-background/25"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${on ? "left-[18px]" : "left-0.5"}`} />
    </span>
  )
}

function Lane({ ok, title, steps, end, endLabel }: { ok: boolean; title: string; steps: string[]; end: string; endLabel: string }) {
  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${ok ? "bg-foreground text-background shadow-xl shadow-primary/15" : "border border-border bg-background"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${ok ? "text-primary" : "text-muted-foreground"}`}>{ok ? <Check className="h-4 w-4" strokeWidth={3} /> : <X className="h-4 w-4" />}{title}</p>
        <p className={`flex items-baseline gap-2 ${ok ? "text-primary" : "text-muted-foreground"}`}><span className="text-[28px] font-semibold leading-none tracking-tight">{end}</span><span className="text-[12px]">{endLabel}</span></p>
      </div>
      <div className="relative mt-8">
        <div className={`absolute left-[12.5%] right-[12.5%] top-[15px] h-[3px] rounded-full ${ok ? "bg-background/15" : "bg-border"}`} />
        <div className={`${ok ? "ag-bar-ok" : "ag-bar-bot"} absolute left-[12.5%] right-[12.5%] top-[15px] h-[3px] origin-left rounded-full ${ok ? "bg-primary" : "bg-muted-foreground/60"}`} />
        <ol className="relative grid grid-cols-4 text-center">
          {steps.map((s, i) => {
            const stuck = !ok && i === 3
            return (
              <li key={s} className="flex flex-col items-center gap-2">
                <span className={`flex h-[33px] w-[33px] items-center justify-center rounded-full border-2 ${stuck ? "border-dashed border-muted-foreground/60 bg-secondary text-muted-foreground" : ok ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/60 bg-muted-foreground/60 text-background"}`}>
                  {stuck ? <Clock className="h-4 w-4" /> : <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
                <span className={`max-w-[110px] text-[12px] leading-tight sm:text-[13.5px] ${ok ? "text-background/85" : stuck ? "text-muted-foreground/70" : "text-muted-foreground"}`}>{s}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function AiAgenticPage() {
  return (
    <>
      <AnnouncementStrip />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Agentic AI", path: "/products/ai-agentic" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">
        {/* 1 · HERO: centred headline above a wide live canvas: phone, Captain core, four apps */}
        <section className="relative isolate overflow-hidden border-b border-border">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-200px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
          </div>
          <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:pb-24 lg:pt-20">
            <div className="ag-rise mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[12.5px] font-medium text-primary backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" /></span>
                Captain AI · Agentic AI platform
              </p>
              <h1 className="mt-6 text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[62px]">
                Agentic AI that <span className={GRADIENT_TEXT}>does the work</span>, not just the talking.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Captain is an AI agent for customer support that works inside 300+ business apps. It issues the refund, finds the invoice and updates the CRM, then replies on WhatsApp, SMS, email or voice.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Book a demo</Link>
              </div>
            </div>
            <div className="ag-rise mt-14" style={{ animationDelay: "0.2s" }}>
              <AgentCanvas />
            </div>
          </div>
        </section>

        {/* 2 · AGENT VS CHATBOT: two race lanes, one stalls, one finishes */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Agentic AI vs chatbot</p>
              <h2 className={`${H2} mt-4`}>Most bots send customers away. <span className={GRADIENT_TEXT}>Captain finishes the job.</span></h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Same refund request, two very different journeys.</p>
            </div>
            <div className="mt-10 space-y-4">
              <Lane ok={false} title="Scripted chatbot" steps={["Customer asks", "Bot says email us", "Customer emails", "Waits in queue"]} end="2 days" endLabel="and a ticket" />
              <Lane ok title="Captain AI agent" steps={["Understands", "Finds order in Shopify", "Refunds in Razorpay", "Replies and logs"]} end="6 sec" endLabel="no ticket" />
            </div>
          </div>
        </section>

        {/* 3 · INTEGRATIONS: oversized number, opposing marquees, category pills */}
        <section id="apps" className="overflow-hidden bg-background py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-end gap-6 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-14">
            <p aria-hidden className={`${GRADIENT_TEXT} text-[110px] font-semibold leading-[0.85] tracking-[-0.06em] sm:text-[170px]`}>300+</p>
            <div className="pb-2">
              <p className={`${EYEBROW} text-primary`}>Agentic AI integrations</p>
              <h2 className={`${H2} mt-3 max-w-xl`}>Apps Captain already works inside.</h2>
              <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Connect your CRM, payments, e-commerce and helpdesk tools in one click. Captain reads live data and takes action in them.</p>
            </div>
          </div>
          <div className="mt-12 space-y-3">
            <MarqueeRow items={MARQUEE_A} />
            <MarqueeRow items={MARQUEE_B} reverse />
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2 px-4 sm:px-6">
            {APP_CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/products/ai-agentic/apps/${c.slug}`} className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-[14px] text-foreground/80 transition hover:border-primary hover:bg-primary/10 hover:text-primary">
                {c.label}<ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </section>

        {/* 4 · USE CASES: an "ask → action" ledger */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Agentic AI use cases</p>
              <h2 className={`${H2} mt-4`}>What customers ask. <span className={GRADIENT_TEXT}>What Captain does.</span></h2>
            </div>
            <ul className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
              {LEDGER.map((r, i) => (
                <li key={r.ask} className="group grid items-center gap-x-8 gap-y-3 px-6 py-6 transition hover:bg-primary/[0.04] sm:px-8 md:grid-cols-[1fr_auto_1.1fr]">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground"><span className="mr-2 text-primary">{String(i + 1).padStart(2, "0")}</span>{r.tag}</p>
                    <p className="mt-1.5 text-[22px] font-semibold leading-tight tracking-tight sm:text-[26px]">“{r.ask}”</p>
                  </div>
                  <span aria-hidden className="hidden items-center md:flex"><span className="h-px w-14 bg-gradient-to-r from-border to-primary transition-all group-hover:w-20" /><ArrowRight className="-ml-1.5 h-4 w-4 text-primary" /></span>
                  <div className="flex items-center gap-3.5">
                    <MiniLogo name={r.app} url={r.url} size={40} />
                    <div>
                      <p className="text-[14px] font-semibold text-primary">{r.app}</p>
                      <p className="text-[14.5px] leading-snug text-muted-foreground">{r.does}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · CONTROL: dark console with role toggles and a live audit log */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-[32px] bg-foreground p-7 text-background sm:p-12">
              <div aria-hidden className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
              <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <p className={`${EYEBROW} text-primary`}><ShieldCheck className="h-4 w-4" />AI agent permissions</p>
                  <h2 className={`${H2} mt-4`}>Live in three steps. <span className="text-primary">In your control at each one.</span></h2>
                  <ol className="mt-8 space-y-5">
                    {STEPS.map((s, i) => (
                      <li key={s.t} className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-mono text-[13px] text-primary">{i + 1}</span>
                        <div>
                          <h3 className="text-[18px] font-medium">{s.t}</h3>
                          <p className="mt-0.5 text-[14.5px] leading-relaxed text-background/65">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-background/10 bg-background/[0.05] p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary/80">Role · Support agent</p>
                    <div className="mt-3 divide-y divide-background/10 text-[14.5px]">
                      {[{ a: "Shopify", r: true, w: true }, { a: "Razorpay", r: true, w: false }, { a: "HubSpot", r: true, w: true }].map((x) => (
                        <div key={x.a} className="flex items-center justify-between py-3">
                          <span>{x.a}</span>
                          <span className="flex items-center gap-5 text-background/65">
                            <span className="flex items-center gap-2">Look up <Toggle on={x.r} /></span>
                            <span className="flex items-center gap-2">Change <Toggle on={x.w} /></span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-background/10 bg-black/30 p-5 font-mono text-[12.5px]">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-primary/80">Audit log</p>
                    <ul className="space-y-2">
                      {LOG.map((l, i) => (
                        <li key={i} className="ag-log flex items-center gap-3" style={{ animationDelay: `${i * 0.5}s` }}>
                          <span className="text-background/35">{l.time}</span>
                          <span className={l.ok ? "text-primary" : "text-destructive"}>{l.ok ? "OK" : "DENIED"}</span>
                          <span className="text-background/80">{l.app}</span>
                          <span className="truncate text-background/45">{l.act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · FAQ: sticky side heading with a card stack, then a floating-chip call to action */}
        <section className="bg-secondary py-16 lg:py-24">
          <FaqJsonLd items={FAQS} path="/products/ai-agentic/" />
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className={`${EYEBROW} text-primary`}>Agentic AI FAQ</p>
              <h2 className={`${H2} mt-4`}>Questions, <span className={GRADIENT_TEXT}>answered.</span></h2>
              <p className="mt-4 max-w-xs text-[15.5px] leading-relaxed text-muted-foreground">The short version of how Captain AI agents work.</p>
            </div>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-background px-6 py-5 transition open:border-primary/40 open:shadow-lg open:shadow-primary/5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[17px] font-medium leading-snug tracking-tight">{f.q}</h3>
                    <Plus className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
            <div className="ag-cta relative overflow-hidden rounded-[32px] px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
              <span aria-hidden className="ag-float absolute left-[6%] top-[18%] hidden items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-[12.5px] font-medium text-foreground shadow-lg md:flex"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>Refund issued</span>
              <span aria-hidden className="ag-float absolute bottom-[16%] right-[7%] hidden items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-[12.5px] font-medium text-foreground shadow-lg md:flex" style={{ animationDelay: "-2.5s" }}><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>CRM updated</span>
              <h2 className="relative mx-auto max-w-3xl text-balance text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[48px]">Put your first AI agent to work on a real refund.</h2>
              <p className="relative mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-primary-foreground/85">Connect one app, set the rules and watch routine requests close themselves.</p>
              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/signup/" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-white/90">Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">Book a demo</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <style>{`
        ${RUN_KEYFRAMES}
        @keyframes ag-spin { to { transform: rotate(360deg) } }
        @keyframes ag-pulse { 0% { transform: scale(0.9); opacity: 0.7 } 100% { transform: scale(1.8); opacity: 0 } }
        @keyframes ag-dots { 0% { content: "" } 25% { content: "." } 50% { content: ".." } 75%, 100% { content: "..." } }
        @keyframes ag-bounce { 0%, 80%, 100% { transform: translateY(0) } 40% { transform: translateY(-4px) } }
        @keyframes ag-rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
        @keyframes ag-marquee { to { transform: translateX(-50%) } }
        @keyframes ag-marquee-r { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes ag-log { from { opacity: 0; transform: translateX(-10px) } to { opacity: 1; transform: none } }
        @keyframes ag-cta { 0%, 100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes ag-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
        @keyframes ag-bar-ok { 0%, 4% { transform: scaleX(0) } 40%, 90% { transform: scaleX(1) } 100% { transform: scaleX(0) } }
        @keyframes ag-bar-bot { 0%, 4% { transform: scaleX(0) } 40%, 90% { transform: scaleX(0.66) } 100% { transform: scaleX(0) } }

        .ag-m0 { animation: agm0 12s linear infinite } .ag-m1 { animation: agm1 12s linear infinite } .ag-m2 { animation: agm2 12s linear infinite }
        .ag-m3 { animation: agm3 12s linear infinite } .ag-m4 { animation: agm4 12s linear infinite }
        .ag-m { opacity: 0 }
        .ag-type { opacity: 0; animation: agtype 12s linear infinite }
        .ag-think { opacity: 0; animation: agthink 12s linear infinite }
        .ag-doneRing { opacity: 0; animation: agdoneRing 12s linear infinite }
        .ag-bounce { animation: ag-bounce 1s ease-in-out infinite }
        .ag-dots::after { content: ""; animation: ag-dots 1.2s steps(1) infinite }
        .ag-spin { animation: ag-spin 0.8s linear infinite }
        .ag-pulse { animation: ag-pulse 2.8s ease-out infinite }
        .ag-rise { animation: ag-rise 0.9s cubic-bezier(.2,.7,.2,1) both }
        .ag-marquee { animation: ag-marquee 42s linear infinite }
        .ag-marquee-r { animation: ag-marquee-r 48s linear infinite }
        .ag-marquee:hover, .ag-marquee-r:hover { animation-play-state: paused }
        .ag-fade-x { mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent) }
        .ag-log { opacity: 0; animation: ag-log 0.5s ease-out forwards }
        .ag-float { animation: ag-float 5s ease-in-out infinite }
        .ag-bar-ok { animation: ag-bar-ok 8s ease-in-out infinite }
        .ag-bar-bot { animation: ag-bar-bot 8s ease-in-out infinite }
        .ag-cta { background: linear-gradient(120deg, oklch(0.55 0.13 172), oklch(0.62 0.14 168), oklch(0.6 0.13 200), oklch(0.55 0.13 172)); background-size: 300% 300%; animation: ag-cta 14s ease infinite }

        @media (prefers-reduced-motion: reduce) {
          .ag-pulse, .ag-rise, .ag-marquee, .ag-marquee-r, .ag-cta, .ag-spin, .ag-bounce, .ag-float, .ag-dots::after { animation: none }
          .ag-m0, .ag-m1, .ag-m2, .ag-m3, .ag-m4, .ag-doneRing, .ag-log { animation: none; opacity: 1 }
          .ag-bar-ok, .ag-bar-bot { animation: none }
          .ag-bar-ok { transform: scaleX(1) } .ag-bar-bot { transform: scaleX(0.66) }
          .ag-type, .ag-think { animation: none; opacity: 0 }
          [style*="agidle"], [style*="agcall"] { animation: none !important; opacity: 0 !important }
          [style*="agdone"] { animation: none !important; opacity: 1 !important }
          [style*="agcard"] { animation: none !important }
        }
      `}</style>
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, Bot, BookOpen, Check, Code2, Database, Headset, Inbox, KeyRound, Layers3, Megaphone, MessageSquare, Phone, ShieldCheck, Users } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { PlatformHex } from "@/components/product/platform-hex"

export const metadata: Metadata = getPageMetadata("/platform")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CHANNEL_LOGOS = [
  { n: "WhatsApp", src: "/logos/channels/whatsapp.svg" },
  { n: "Email", src: "/logos/channels/gmail.svg" },
  { n: "Instagram", src: "/logos/channels/instagram.svg" },
  { n: "Messenger", src: "/logos/channels/messenger.svg" },
  { n: "RCS", src: "/logos/channels/google-messages.svg" },
]

/* the platform as three layers */
const WORK = [
  { t: "AI agents and copilot", d: "Answer, act and assist", h: "/products/agentic-ai/", I: Bot },
  { t: "Omnichannel inbox", d: "One workspace for the team", h: "/products/omnichannel-inbox/", I: Inbox },
  { t: "Broadcasting", d: "SMS, WhatsApp and RCS campaigns", h: "/channels/sms-broadcasting/", I: Megaphone },
  { t: "Voice AI agents", d: "Calls answered and made", h: "/voice-ai-agents/", I: Phone },
]
const FOUNDATION = [
  { t: "One customer record", d: "Shared by every module", I: Database },
  { t: "Security and roles", d: "Sign-on, audit logs, access", I: ShieldCheck },
  { t: "API and webhooks", d: "Connect the tools you use", I: Code2 },
  { t: "Help center", d: "Content that powers the AI", I: BookOpen },
]

/* a typical patchwork of tools against one platform (illustrative) */
const SPRAWL = [
  { l: "Logins to manage", from: "5", to: "1" },
  { l: "Customer lists to sync", from: "5", to: "1" },
  { l: "Monthly invoices", from: "5", to: "1" },
]

const FIGURES = [
  { v: "7", l: "Channels", s: "WhatsApp, RCS, SMS, voice, email, Instagram and Messenger in one inbox.", extra: null },
  { v: "8", l: "Indian languages", s: "The WhatsApp AI agent replies in the language the customer writes in.", extra: "नमस्ते · வணக்கம் · నమస్కారం" },
  { v: "300+", l: "App actions", s: "The AI agent can refund, book and update records in your other tools.", extra: "apps" },
  { v: "1", l: "Customer record", s: "Shared by every module, so nothing is out of sync.", extra: null },
]
const APP_LOGOS = ["slack", "hubspot", "shopify", "stripe", "salesforce"]

const ROLES = [
  { r: "Admins", w: "set the rules.", d: "They edit the AI agent, read the audit log and manage sign-in and billing.", I: KeyRound },
  { r: "Managers", w: "run the day.", d: "They send campaigns, assign chats and watch response times.", I: Users },
  { r: "Agents", w: "handle the chats.", d: "They reply in the inbox with the copilot beside them, on the channels they are given.", I: Headset },
]

const INDUSTRIES = [
  { l: "insurance", h: "/industry/insurance/" },
  { l: "travel and hospitality", h: "/industry/travel-and-hospitality/" },
  { l: "telecom", h: "/industry/telecom/" },
  { l: "mortgage", h: "/industry/mortgage/" },
  { l: "media and entertainment", h: "/industry/media-entertainment/" },
]
const SOLUTIONS = [
  { l: "banking and fintech", h: "/solutions/banking-fintech/" },
  { l: "ecommerce", h: "/solutions/ecommerce/" },
  { l: "healthcare", h: "/solutions/healthcare/" },
  { l: "education", h: "/solutions/education/" },
  { l: "logistics", h: "/solutions/logistics/" },
  { l: "real estate", h: "/solutions/real-estate/" },
  { l: "retail", h: "/solutions/retail/" },
]

const FAQS = [
  { q: "What is an agentic AI platform?", a: "An agentic AI platform lets AI agents do more than chat: they plan, take actions in your other tools and hand over to a person when needed. SMSLocal combines that with an omnichannel inbox, broadcasting and developer tools in one product." },
  { q: "Is it really one platform?", a: "Yes. The AI, every channel, campaigns and the inbox run on the same product and share the same customer record. There is one login and nothing to sync between tools." },
  { q: "Which channels does the business messaging platform cover?", a: "SMS, WhatsApp, RCS, voice, email, Instagram and Messenger. Campaigns go out on SMS, WhatsApp and RCS, and every reply lands in the shared inbox." },
  { q: "Do I need a developer to set it up?", a: "No. The platform is built to launch without an engineering project. A REST API and webhooks are available for teams that want to go deeper." },
  { q: "Can I start with one module and add the rest later?", a: "Yes. Many teams start with broadcasting or the shared inbox and add AI agents and the copilot when they are ready. Everything stays on the same customer record." },
  { q: "Is it secure?", a: "Single sign-on, audit logs, role-based access and GDPR and CCPA aligned data handling are built in. SOC 2 is on our roadmap." },
  { q: "How is it different from a CPaaS in India?", a: "A CPaaS gives you messaging APIs. SMSLocal adds the working layers on top: AI agents, a shared inbox, campaign tools and a help center, so business teams can run conversations without building them." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const LINK = "font-semibold text-primary underline decoration-primary/40 decoration-2 underline-offset-[5px] transition hover:decoration-primary"

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function PlatformPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Platform"
        description="One agentic AI platform for customer conversations: AI agents, an omnichannel inbox, SMS, WhatsApp and RCS broadcasting, voice and developer tools on a single customer record."
        path="/platform"
        category="Business Messaging Platform"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Platform", path: "/platform" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a honeycomb of six modules around one shared customer record */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-[-120px] top-[-60px] h-[520px] w-[520px] rounded-full bg-primary/7 blur-[130px]" />
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_540px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="pl-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Layers3 className="h-3.5 w-3.5 text-accent" />The platform
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                One agentic AI platform for <span className="text-primary">every customer conversation.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                SMSLocal brings AI agents, an omnichannel inbox, broadcasting and developer tools together as one business messaging platform, so your whole team works from a single customer record.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/signup/" className={BTN_OUT}>Start your trial</Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
                {["AI agents and copilot", "Seven channels", "Built for India"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" strokeWidth={3} />{t}</li>
                ))}
              </ul>
            </div>
            <div className="pl-rise relative" style={{ animationDelay: "0.15s" }}>
              <PlatformHex />
            </div>
          </div>
        </section>

        {/* 2 · HOW IT FITS TOGETHER: three layers, work on top, channels in the middle, foundation below */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How it fits together</p>
              <h2 className={`${H2} mt-5`}>Three layers, built to work as one.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">What your team uses sits on top, the channels carry the conversation, and a shared foundation keeps every module on the same customer data.</p>
            </div>
            <div className="mt-12 divide-y divide-border border-y border-border">
              {/* layer 1 */}
              <div className="grid gap-5 py-8 md:grid-cols-[170px_1fr] md:gap-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">1 · What your team uses</p>
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {WORK.map((w) => (
                    <li key={w.t}>
                      <Link href={w.h} className="group block">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary"><w.I className="h-5 w-5" strokeWidth={1.9} /></span>
                        <span className="mt-3 flex items-center gap-1.5 text-[16.5px] font-semibold transition group-hover:text-primary">{w.t}<ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" /></span>
                        <span className="mt-0.5 block text-[14px] text-muted-foreground">{w.d}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* layer 2 */}
              <div className="grid gap-5 py-8 md:grid-cols-[170px_1fr] md:gap-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">2 · Channels</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-4">
                  {CHANNEL_LOGOS.map((c) => (
                    <li key={c.n} className="flex items-center gap-2.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.src} alt={`${c.n} logo`} width={24} height={24} className="h-6 w-6 object-contain" />
                      </span>
                      <span className="text-[14px] font-medium">{c.n}</span>
                    </li>
                  ))}
                  {[{ n: "SMS", I: MessageSquare, c: "#F5A300" }, { n: "Voice", I: Phone, c: "#34A853" }].map((c) => (
                    <li key={c.n} className="flex items-center gap-2.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background"><c.I className="h-6 w-6" strokeWidth={1.9} style={{ color: c.c }} aria-label={c.n} /></span>
                      <span className="text-[14px] font-medium">{c.n}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* layer 3 */}
              <div className="grid gap-5 py-8 md:grid-cols-[170px_1fr] md:gap-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">3 · Shared foundation</p>
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {FOUNDATION.map((w) => (
                    <li key={w.t}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/8 text-foreground"><w.I className="h-5 w-5" strokeWidth={1.9} /></span>
                      <span className="mt-3 block text-[16.5px] font-semibold">{w.t}</span>
                      <span className="mt-0.5 block text-[14px] text-muted-foreground">{w.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3 · ONE PLATFORM, NOT A PATCHWORK: five becomes one */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Why one platform</p>
              <h2 className={`${H2} mt-5`}>Replace a patchwork of tools with one.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">A typical setup mixes a bulk SMS tool, a WhatsApp tool, a chatbot, a helpdesk and a CRM. Each one adds a login, a customer list and a bill.</p>
            </div>
            <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
              {SPRAWL.map((x) => (
                <div key={x.l} className="flex flex-col items-center px-6 text-center">
                  <p className="flex items-center gap-4 text-[64px] font-semibold leading-none tracking-[-0.04em]">
                    <span className="text-foreground/25 line-through decoration-[3px]">{x.from}</span>
                    <ArrowRight className="h-7 w-7 text-muted-foreground" />
                    <span className="text-primary">{x.to}</span>
                  </p>
                  <p className="mt-4 text-[15px] font-medium">{x.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-[12.5px] text-muted-foreground">Illustrative example of a five-tool setup.</p>
          </div>
        </section>

        {/* 4 · FOUR FIGURES: a quiet row of numbers separated by thin lines */}
        <section className="bg-secondary py-16 lg:py-20">
          <ul className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-0">
            {FIGURES.map((x, i) => (
              <li key={x.l} className={`lg:px-8 ${i === 0 ? "lg:pl-0" : "lg:border-l lg:border-border"} ${i === FIGURES.length - 1 ? "lg:pr-0" : ""}`}>
                <p className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-primary">{x.v}</p>
                <p className="mt-3 text-[16px] font-semibold">{x.l}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{x.s}</p>
                {x.extra === "apps" ? (
                  <p className="mt-3 flex items-center gap-3 opacity-60 grayscale">
                    {APP_LOGOS.map((n) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={n} src={`/logos/${n}.svg`} alt={`${n} logo`} width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                    ))}
                  </p>
                ) : x.extra ? (
                  <p className="mt-3 text-[13px] text-muted-foreground/80">{x.extra}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {/* 5 · ROLES: three lines, each led by an icon */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>Roles and access</p>
            <h2 className={`${H2} mt-5`}>Everyone sees what they need, and no more.</h2>
            <div className="mt-12 space-y-10">
              {ROLES.map((x) => (
                <div key={x.r} className="flex gap-5 sm:gap-7">
                  <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-background text-primary ring-1 ring-border"><x.I className="h-6 w-6" strokeWidth={1.8} /></span>
                  <div>
                    <p className="text-[24px] font-semibold leading-tight tracking-[-0.02em] sm:text-[30px]">{x.r} <span className="text-muted-foreground">{x.w}</span></p>
                    <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-muted-foreground">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-[15px]"><Link href="/platform/security/" className={LINK}>Read about platform security</Link></p>
          </div>
        </section>

        {/* 6 · WHO USES IT: two plain link lists */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Who uses it</p>
              <h2 className={`${H2} mt-5`}>Built for teams that talk to customers all day.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Pick your sector to see how the platform answers, follows up and keeps one record of every customer.</p>
            </div>
            <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-16">
              {[{ h: "Industries", list: INDUSTRIES }, { h: "Solutions", list: SOLUTIONS }].map((col) => (
                <div key={col.h}>
                  <p className="border-b border-foreground/30 pb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{col.h}</p>
                  <ul>
                    {col.list.map((x) => (
                      <li key={x.l} className="border-b border-border">
                        <Link href={x.h} className="group flex items-center justify-between py-3.5 text-[17px] font-medium transition hover:text-primary">
                          {x.l.charAt(0).toUpperCase() + x.l.slice(1)}<ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[15px] text-muted-foreground">Not sure how it compares with what you use today? <Link href="/compare/" className={LINK}>See how SMSLocal compares</Link>.</p>
          </div>
        </section>

        {/* 7 · FAQ (shared with the home page) */}
        <FaqJsonLd items={FAQS} path="/platform" />
        <FaqSection items={FAQS} />

        <div className="border-y border-border bg-secondary/60 py-6">
          <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 text-[14px] sm:px-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore more</span>
            {[
              { href: "/products/agentic-ai/", label: "Agentic AI" },
              { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox" },
              { href: "/products/ai-agents/", label: "AI agents for WhatsApp" },
              { href: "/voice-ai-agents/", label: "Voice AI agents" },
              { href: "/platform/security/", label: "Security" },
              { href: "/company/contact/", label: "Talk to sales" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary">{l.label}</Link>
            ))}
          </p>
        </div>

        <ProductFinalCta
          title="Run your customer conversations from one platform."
          subtitle="Start with the module you need today and add AI, channels and campaigns on the same customer record."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start your trial", href: "/signup/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes pl-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .pl-rise { animation: pl-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .pl-rise { animation: none } }
      `}</style>
    </>
  )
}

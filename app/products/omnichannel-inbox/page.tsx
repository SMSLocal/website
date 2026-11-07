import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, ArrowUpRight, Check, Inbox, Instagram, Mail, MessageCircle, MessageSquare, Phone, Send } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { OmniHero } from "@/components/product/omni-hero"

export const metadata: Metadata = getPageMetadata("/products/omnichannel-inbox")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* the problem, plainly */
const WITHOUT = [
  "A separate login and notification sound for each channel",
  "One customer appears as several unrelated contacts",
  "Handoffs lose the story, so people repeat themselves",
  "No view of which chats have waited longest",
]
const WITH = [
  "WhatsApp, email, SMS and social side by side",
  "A single history behind every contact",
  "Each chat routed to an owner, with a timer",
  "AI answering and drafting on the same screen",
]

/* how much AI handles, decided chat by chat */
const AI_ZONES = [
  { t: "AI agent", s: "Answers routine questions on its own, on every channel.", w: "basis-[34%]", tone: "bg-primary/85 text-primary-foreground" },
  { t: "AI copilot", s: "Drafts, summarises and finds answers for your agents.", w: "basis-[33%]", tone: "bg-primary/45 text-foreground" },
  { t: "Your team", s: "Takes over anything sensitive or complex.", w: "basis-[33%]", tone: "bg-foreground/10 text-foreground" },
]

/* the seven channels */
const CHANNELS = [
  { n: "WhatsApp", c: "#25D366", I: MessageCircle, logo: "/logos/channels/whatsapp.svg" },
  { n: "RCS", c: "#1A73E8", I: Send, logo: "/logos/channels/google-messages.svg" },
  { n: "SMS", c: "#F5A300", I: MessageSquare, logo: null },
  { n: "Voice", c: "#34A853", I: Phone, logo: null },
  { n: "Email", c: "#EA4335", I: Mail, logo: "/logos/channels/gmail.svg" },
  { n: "Instagram", c: "#FF0069", I: Instagram, logo: "/logos/channels/instagram.svg" },
  { n: "Messenger", c: "#0866FF", I: MessageCircle, logo: "/logos/channels/messenger.svg" },
]

/* routing: a decision table, if this then that team */
const RULES: [string, string, string][] = [
  ["The language is Hindi", "Hindi team", "#25a85a"],
  ["The topic is billing", "Billing", "#3b6df0"],
  ["The customer is a VIP", "Priority queue", "#d6246e"],
  ["Nobody has replied in five minutes", "Team lead alert", "#d99a00"],
  ["Anything else", "Support, by capacity", "#8b5cf6"],
]

/* service-level promises, written as plain commitments (example targets) */
const TARGETS = [
  { k: "First response", pre: "Reply within", fig: "5 minutes", post: ".", sub: "The agent is nudged at 4:00 and the team lead is alerted at 5:00.", c: "var(--primary)" },
  { k: "Resolution", pre: "Resolve within", fig: "4 hours", post: ".", sub: "Timers pause while you wait on the customer, so waiting is never counted against you.", c: "var(--primary)" },
  { k: "Satisfaction", pre: "Ask for a rating after", fig: "every close", post: ".", sub: "CSAT is saved on the contact and reported by agent and by channel.", c: "var(--primary)" },
]

/* one customer: when each channel last touched them, as a share of the last three weeks */
const TOUCHES: [string, string, number, string][] = [
  ["WhatsApp", "2 minutes ago · asked where order #4821 is", 95, "#25a85a"],
  ["Email", "Yesterday · requested an invoice", 85, "#3b6df0"],
  ["SMS", "3 days ago · replied to a delivery update", 72, "#d99a00"],
  ["Voice", "Last week · missed call, callback booked", 55, "#8b5cf6"],
  ["Instagram", "Last week · direct message about a product", 45, "#d6246e"],
  ["Messenger", "2 weeks ago · asked about stock", 25, "#0a84ff"],
  ["RCS", "3 weeks ago · confirmed a booking", 6, "#0f9f8a"],
]
const PROFILE = "Mumbai · Hindi · VIP · Repeat buyer"

/* the spec sheet */
const SPEC: [string, string][] = [
  ["Smart routing", "By rule, language, skill or load"],
  ["SLA timers", "First-response and resolution targets"],
  ["Labels and macros", "Multi-step actions in one click"],
  ["Internal notes", "@mention a teammate in any chat"],
  ["Teams and permissions", "Scoped by channel, team and role"],
  ["Shared WhatsApp number", "Several agents on one business line"],
  ["Voice in the inbox", "Calls with the full conversation attached"],
  ["Audit logs", "Every action logged and exportable"],
]

const FAQS = [
  { q: "What is an omnichannel shared inbox?", a: "An omnichannel shared inbox gathers customer messages from every channel into one workspace that your whole team uses. Instead of one tool per channel, agents see a single queue and a single history for each contact." },
  { q: "Which channels does the inbox support?", a: "WhatsApp, RCS, SMS, voice, email, Instagram and Messenger. All seven work with the same routing, SLA timers and CSAT surveys." },
  { q: "Can several agents share one WhatsApp number?", a: "Yes. As a WhatsApp team inbox, several agents work the same business number while chats are routed and assigned. Internal notes stay hidden from the customer." },
  { q: "Does AI work inside the inbox?", a: "Yes. The AI agent answers routine questions on its own, and the copilot drafts replies, summarises threads and finds answers for your human agents. You choose how much AI handles, chat by chat." },
  { q: "How do routing and SLA tracking work?", a: "Rules assign each chat by language, topic, skill, channel or agent load. Every conversation then carries first-response and resolution timers, with alerts before a target is missed." },
  { q: "Do I need to install an app?", a: "No. The inbox runs in any desktop or mobile browser, so there is nothing to install or update." },
  { q: "How is customer history kept across channels?", a: "Messages, calls and campaign replies from the same person are stored on one contact, with tags and custom attributes, so a new agent can read the whole story before replying." },
  { q: "Who is a multichannel customer support inbox for?", a: "Support, sales and operations teams that talk to customers on more than one channel and want shared ownership, clear response times and consistent answers." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function OmnichannelInboxPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Omnichannel Inbox"
        description="One shared inbox for WhatsApp, RCS, SMS, voice, email, Instagram and Messenger with routing, SLA, macros, CSAT, and agentic AI plus copilot built in."
        path="/products/omnichannel-inbox"
        category="Omnichannel Shared Inbox"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Omnichannel Inbox", path: "/products/omnichannel-inbox" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: seven apps slide into one tidy list */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-[-120px] top-[-60px] h-[520px] w-[520px] rounded-full bg-primary/7 blur-[130px]" />
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_540px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="oc-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Inbox className="h-3.5 w-3.5 text-accent" />Omnichannel Inbox
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Omnichannel shared inbox for <span className="text-primary">every customer conversation.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Work WhatsApp, RCS, SMS, voice, email, Instagram and Messenger from a single workspace. Routing, SLA timers and CSAT surveys come built in, and AI helps on every channel.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/signup/" className={BTN_OUT}>Start your trial</Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
                {["Seven channels, one workspace", "Routing and SLA tracking", "AI agent and copilot included"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" strokeWidth={3} />{t}</li>
                ))}
              </ul>
            </div>
            <div className="oc-rise relative" style={{ animationDelay: "0.15s" }}>
              <OmniHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: two plain lists side by side */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <ul className="mb-9 flex flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-7">
                {CHANNELS.map((c) => (
                  <li key={c.n} className="flex w-[68px] flex-col items-center gap-2">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                      {c.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.logo} alt={c.n + " logo"} width={28} height={28} className="h-7 w-7 object-contain" />
                      ) : (
                        <c.I className="h-7 w-7" style={{ color: c.c }} strokeWidth={1.9} aria-label={c.n} />
                      )}
                    </span>
                    <span className="text-[11.5px] font-medium text-muted-foreground">{c.n}</span>
                  </li>
                ))}
              </ul>
              <p className={`${EYEBROW} justify-center text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>Seven channels should not mean seven tools.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Teams often answer WhatsApp in one app, email in another and Instagram in a third, while customers move between channels freely. A unified messaging inbox lets your tools follow the customer.</p>
            </div>
            <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Without a shared inbox</p>
                <ul className="mt-5 space-y-4 text-[16px] leading-snug text-muted-foreground">
                  {WITHOUT.map((t) => (<li key={t} className="flex gap-3"><span className="font-mono text-foreground/40">–</span>{t}</li>))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">With one shared inbox</p>
                <ul className="mt-5 space-y-4 text-[16px] leading-snug">
                  {WITH.map((t) => (<li key={t} className="flex gap-3"><span className="font-mono font-bold text-primary">+</span>{t}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3 · ROUTING: a decision table */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Smart routing</p>
              <h2 className={`${H2} mt-5`}>Rules decide who answers.</h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted-foreground">Write routing the way you would brief a team lead. Language, topic, customer type and agent load decide where a chat lands, whichever channel it came from.</p>
            </div>
            <div>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 border-b border-foreground/30 pb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>If</span><span aria-hidden className="w-6" /><span>Send it to</span>
              </div>
              <ul>
                {RULES.map(([cond, team]) => (
                  <li key={cond} className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 border-b border-border py-4">
                    <span className="text-[16px] leading-snug sm:text-[18px]">{cond}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[16px] font-semibold text-primary sm:text-[18px]">{team}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4 · SERVICE LEVELS: three plain figures */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>SLA, CSAT and ownership</p>
              <h2 className={`${H2} mt-5`}>Every chat has an owner and a clock.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Response and resolution targets run on each conversation, and a satisfaction score comes back once it is closed.</p>
            </div>
            <div className="mt-12 space-y-12">
              {TARGETS.map((t) => (
                <div key={t.k} className="grid gap-3 md:grid-cols-[190px_1fr] md:gap-10">
                  <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t.k}</p>
                  <div>
                    <p className="text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[36px]">
                      {t.pre}{" "}
                      <span className="underline decoration-[5px] underline-offset-[7px]" style={{ textDecorationColor: t.c }}>{t.fig}</span>
                      {t.post}
                    </p>
                    <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-[12.5px] text-muted-foreground">Example targets, shown to illustrate the timers.</p>
          </div>
        </section>

        {/* 5 · THE CUSTOMER RECORD: one name, and the last touch on every channel */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>Customer profile across channels</p>
            <h2 className={`${H2} mt-5`}>A full history behind every contact.</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Campaign replies, phone calls and web chats are stored on the same contact, along with tags and custom attributes your team can filter by.</p>
            <div className="mt-12">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[18px] font-semibold text-primary-foreground">AR</span>
                <span>
                  <span className="block text-[26px] font-semibold leading-tight tracking-[-0.03em]">Ananya Rao</span>
                  <span className="block text-[14.5px] text-muted-foreground">{PROFILE}</span>
                </span>
              </div>

              {/* wide screens: one line of time, each channel placed where it last touched the customer */}
              <div className="relative mt-14 hidden h-[200px] lg:block">
                <span aria-hidden className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-border" />
                {TOUCHES.map(([ch, t, x], i) => {
                  const up = i % 2 === 0
                  return (
                    <div key={ch} className="absolute top-1/2 w-[150px] -translate-x-1/2" style={{ left: `${x}%` }}>
                      <span className={`absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-background ${i === 0 ? "bg-primary" : "bg-foreground/35"}`} />
                      <div className={`absolute left-0 w-full text-center ${up ? "bottom-4" : "top-4"}`}>
                        <p className={`text-[14px] font-semibold ${i === 0 ? "text-primary" : "text-foreground"}`}>{ch}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{t.split(" · ")[0]}</p>
                      </div>
                    </div>
                  )
                })}
                <span className="absolute -bottom-2 left-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">3 weeks ago</span>
                <span className="absolute -bottom-2 right-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Now</span>
              </div>

              {/* small screens: a plain table */}
              <table className="mt-8 w-full text-left text-[15px] lg:hidden">
                <tbody>
                  {TOUCHES.map(([ch, t]) => (
                    <tr key={ch} className="border-b border-border">
                      <td className="w-[120px] py-3 pr-4 font-semibold">{ch}</td>
                      <td className="py-3 text-muted-foreground">{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 text-[12.5px] text-muted-foreground">Example record, shown to illustrate the profile.</p>
            </div>
          </div>
        </section>

        {/* 6 · AI IN THE INBOX: one bar, three zones, decided chat by chat */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>AI customer inbox</p>
              <h2 className={`${H2} mt-5`}>You choose how much AI handles.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Start with AI on routine questions and widen it as you gain trust. Automation and human work share the same inbox, so a chat can move between them without a restart.</p>
            </div>
            <div className="mt-12 flex flex-col overflow-hidden rounded-2xl sm:flex-row">
              {AI_ZONES.map((z) => (
                <div key={z.t} className={`${z.w} px-6 py-7 ${z.tone}`}>
                  <p className="text-[19px] font-semibold tracking-[-0.02em]">{z.t}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed opacity-90">{z.s}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-semibold text-primary">
              <Link href="/products/ai-agents/" className="inline-flex items-center gap-1.5 hover:underline">AI agents for WhatsApp <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/products/agent-copilot/" className="inline-flex items-center gap-1.5 hover:underline">Agent Copilot <ArrowUpRight className="h-4 w-4" /></Link>
            </p>
          </div>
        </section>

        {/* 7 · BUILT-IN FEATURES: a spec sheet with dotted leaders */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>Built in, not sold separately</p>
            <h2 className={`${H2} mt-5`}>Everything a support desk works with.</h2>
            <ul className="mt-12">
              {SPEC.map(([k, v]) => (
                <li key={k} className="group flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-[20px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary sm:text-[24px]">{k}</span>
                  <span aria-hidden className="mb-1.5 hidden min-w-8 flex-1 border-b-2 border-dotted border-foreground/25 sm:block" />
                  <span className="text-[15px] text-muted-foreground sm:text-right sm:text-[16px]">{v}</span>
                </li>
              ))}
            </ul>
            <Link href="/products/agent-copilot/" className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">See the copilot inside the inbox <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
        </section>

        {/* 8 · FAQ (shared with the home page) */}
        <FaqJsonLd items={FAQS} path="/products/omnichannel-inbox" />
        <FaqSection items={FAQS} />

        <div className="border-y border-border bg-secondary/60 py-6">
          <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 text-[14px] sm:px-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore more</span>
            {[
              { href: "/products/agentic-ai/", label: "Agentic AI" },
              { href: "/products/ai-agents/", label: "AI agents for WhatsApp" },
              { href: "/products/agent-copilot/", label: "Agent Copilot" },
              { href: "/products/analytics/", label: "Analytics" },
              { href: "/compare/", label: "Compare SMSLocal" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary">{l.label}</Link>
            ))}
          </p>
        </div>

        <ProductFinalCta
          title="Give your team a shared inbox for every channel."
          subtitle="Connect your channels, switch on the AI you want and give your team a shared inbox they can start using today."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start your trial", href: "/signup/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes oc-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .oc-rise { animation: oc-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .oc-rise { animation: none } }
      `}</style>
    </>
  )
}

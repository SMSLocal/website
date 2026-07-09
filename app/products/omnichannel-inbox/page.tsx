import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Clock,
  Inbox,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquare,
  Mic,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Tag,
  UserCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/products/omnichannel-inbox")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function OmnichannelVisual() {
  const conversations = [
    { channel: "WhatsApp", name: "Priya M.",   preview: "Where is my order?",              time: "2m",  badge: "bg-green-500",  unread: true  },
    { channel: "Email",    name: "Rahul S.",   preview: "Invoice for last month...",        time: "5m",  badge: "bg-blue-500",   unread: true  },
    { channel: "SMS",      name: "Amit K.",    preview: "Need help with KYC",              time: "12m", badge: "bg-yellow-500", unread: false },
    { channel: "Voice",    name: "Sneha T.",   preview: "Missed call — callback needed",   time: "18m", badge: "bg-purple-500", unread: false },
    { channel: "Instagram",name: "Ravi D.",    preview: "Loved the product! Can I...",     time: "34m", badge: "bg-pink-500",   unread: false },
  ]

  const channels = [
    { icon: <MessageCircle className="h-3.5 w-3.5" />, label: "WhatsApp" },
    { icon: <MessageSquare className="h-3.5 w-3.5" />, label: "RCS" },
    { icon: <MessageSquare className="h-3.5 w-3.5" />, label: "SMS" },
    { icon: <Phone className="h-3.5 w-3.5" />,         label: "Voice" },
    { icon: <Mail className="h-3.5 w-3.5" />,          label: "Email" },
    { icon: <Instagram className="h-3.5 w-3.5" />,     label: "Instagram" },
    { icon: <MessageCircle className="h-3.5 w-3.5" />, label: "Messenger" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Inbox card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
              Shared Inbox
            </span>
          </div>
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[11px] font-semibold text-primary">
            5 open
          </span>
        </div>
        <div className="space-y-1.5">
          {conversations.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 transition hover:bg-white/10"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${c.badge}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] font-semibold text-white">{c.name}</span>
                  <span className="text-[10.5px] text-white/40">{c.time} ago</span>
                </div>
                <p className="truncate text-[11px] text-white/55">{c.preview}</p>
              </div>
              {c.unread && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Channel pills */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          All 7 channels, one inbox
        </p>
        <div className="flex flex-wrap gap-1.5">
          {channels.map((ch) => (
            <span
              key={ch.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-white/75"
            >
              {ch.icon} {ch.label}
            </span>
          ))}
        </div>
      </div>

      {/* AI badge */}
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5">
        <Sparkles className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[12.5px] font-medium text-primary">
          AI agent + copilot active — handling 3 conversations automatically
        </span>
      </div>
    </div>
  )
}

export default function OmnichannelInboxPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Omnichannel Inbox"
        description="One shared inbox for WhatsApp, RCS, SMS, voice, email, Instagram, and Messenger with routing, SLA, macros, CSAT, and agentic AI plus copilot built in."
        path="/products/omnichannel-inbox"
        category="Omnichannel Shared Inbox"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Omnichannel Inbox", path: "/products/omnichannel-inbox" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Products · Omnichannel Inbox"
          title={
            <>
              Seven Channels and Agentic AI
              <br className="hidden sm:block" /> in One Shared Inbox
            </>
          }
          subtitle="Live agents and agentic AI work WhatsApp, RCS, SMS, voice, email, Instagram, and Messenger from one place."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: Inbox,      label: "7 channels, one view" },
            { icon: Bot,        label: "AI agent plus copilot built in" },
            { icon: Clock,      label: "Routing, SLA, and CSAT" },
            { icon: UserCheck,  label: "One customer record" },
          ]}
          visual={<OmnichannelVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Stop switching tabs between channels.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "7",      label: "channels in one view — WhatsApp, RCS, SMS, voice, email, Instagram, Messenger" },
              { value: "AI+",    label: "Agentic AI handles volume, copilot assists your human agents" },
              { value: "SLA",    label: "Smart routing, SLA timers, and CSAT tracked on every conversation" },
              { value: "1",      label: "Customer record — every message, channel, and history in one profile" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Context gets lost when every channel lives in its own tool"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              When WhatsApp is in one app, email in another, and Instagram in a third, your agents
              spend more time switching tabs than helping customers. Context gets lost at every
              handoff, and customers end up repeating themselves. One inbox keeps every conversation,
              and every customer, in a single place.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Everything your team needs to work every channel"
          subtitle="Not just a consolidated view — a full-featured workspace built for real support and sales operations."
          items={[
            {
              icon: Inbox,
              title: "Every channel, one view",
              body: "Full conversation history, internal notes, canned responses, labels, and macros — across WhatsApp, RCS, SMS, voice, email, Instagram, and Messenger — in a single shared inbox.",
            },
            {
              icon: Workflow,
              title: "Built for real operations",
              body: "Smart routing, SLA timers, capacity and scheduling, teams, and permissions — so the right conversation reaches the right agent at the right time, every time.",
            },
            {
              icon: Sparkles,
              title: "AI in the inbox",
              body: "The agentic AI handles routine volume automatically, and the copilot assists your humans with suggested replies, summaries, and context — so no one ever starts a conversation cold.",
            },
            {
              icon: Smile,
              title: "CSAT and profiles",
              body: "Satisfaction scores collected on every resolved conversation, tied to contact profiles with full history, tags, and custom attributes — so your team always has context.",
            },
          ]}
        />

        {/* ── CAMPAIGNS + VOICE + CHAT TOGETHER ────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Chat, voice, and campaigns together
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every touchpoint tied to one customer record
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              A campaign reply, a phone call, and a web chat all land in the same inbox tied to the
              same customer — so your team sees the full picture before they type a single word.
              No silos, no context switching, no asking customers to repeat themselves.
            </p>

            {/* Channel grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: <MessageCircle className="h-4 w-4" />, label: "WhatsApp" },
                { icon: <MessageSquare className="h-4 w-4" />, label: "RCS" },
                { icon: <MessageSquare className="h-4 w-4" />, label: "SMS" },
                { icon: <Phone className="h-4 w-4" />,         label: "Voice" },
                { icon: <Mail className="h-4 w-4" />,          label: "Email" },
                { icon: <Instagram className="h-4 w-4" />,     label: "Instagram" },
                { icon: <MessageCircle className="h-4 w-4" />, label: "Messenger" },
                { icon: <Inbox className="h-4 w-4" />,         label: "One inbox" },
              ].map((ch) => (
                <div
                  key={ch.label}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <span className="text-primary">{ch.icon}</span>
                  <span className="text-[13px] font-medium text-white/80">{ch.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── BUILT-IN FEATURES ─────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Built-in features"
            title="Every tool your team already relies on"
            subtitle="The inbox comes with the features a real support or sales operation needs — not stripped-down and sold separately."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Workflow className="h-5 w-5" />,    title: "Smart routing",       desc: "Rules-based and AI-powered routing to the right team or agent" },
              { icon: <Clock className="h-5 w-5" />,       title: "SLA timers",          desc: "First-response and resolution targets with breach alerts" },
              { icon: <Tag className="h-5 w-5" />,         title: "Labels & macros",     desc: "Tag conversations and run multi-step actions in one click" },
              { icon: <Users className="h-5 w-5" />,       title: "Teams & permissions", desc: "Scope access by channel, team, and role" },
              { icon: <Mic className="h-5 w-5" />,         title: "Voice in the inbox",  desc: "Inbound and outbound calls with full conversation context" },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Audit logs",          desc: "Every action logged and exportable for compliance" },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {f.icon}
                </span>
                <h3 className="mt-3 text-[14px] font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── WHY FLOATCHAT ─────────────────────────────────────── */}
        <Section>
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Why SMSLocal"
              title="One platform — not an inbox bolted onto something else"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              The inbox sits on the same platform as your AI, your numbers, and your broadcasting —
              so nothing about a customer is ever in a separate silo. A broadcast that drives
              replies, a bot that escalates, and a human who closes the conversation all work from
              the same record. No integrations to maintain, no data to sync.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40"
              >
                Agentic AI <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </Link>
              <Link
                href="/products/ai-agents/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40"
              >
                AI Agents <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </Link>
              <Link
                href="/compare/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40"
              >
                Compare <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Which channels does the inbox support?",
              a: "WhatsApp, RCS, SMS, voice, email, Instagram, and Messenger — all seven in a single shared inbox, with the same routing, SLA, and CSAT features across every channel.",
            },
            {
              q: "Is there a mobile app?",
              a: "SMSLocal is web-based and works in any browser — desktop or mobile. No app to install, no version to keep updated.",
            },
            {
              q: "Does AI work inside the inbox?",
              a: "Yes — both the agentic AI and the copilot. The AI agent handles routine conversations automatically. The copilot assists your human agents with suggested replies, conversation summaries, and full customer context so they never start cold.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/", label: "How agentic AI works" },
                { href: "/products/ai-agents/",  label: "AI Agents — automate support and sales" },
                { href: "/products/analytics/",  label: "Analytics — CSAT, NPS, and campaign results" },
                { href: "/compare/",             label: "Compare SMSLocal with alternatives" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Put every conversation in one inbox."
          subtitle="Connect your channels, bring in the AI, and give your team one place to work every customer — no tab switching, no lost context."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

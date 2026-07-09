import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  AtSign,
  Bot,
  Instagram,
  Layers,
  MessageCircle,
  MessagesSquare,
  Sparkles,
  UserCheck,
  Users,
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

export const metadata: Metadata = getPageMetadata("/channels/social")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function SocialHubVisual() {
  const threads = [
    { channel: "Instagram", handle: "@meera_k", text: "Is this available in size M?", icon: Instagram, color: "text-pink-400" },
    { channel: "Messenger", handle: "Arjun D.", text: "Can I track my order here?", icon: MessagesSquare, color: "text-blue-400" },
    { channel: "WhatsApp",  handle: "Farhan S.", text: "Thanks, got my refund!", icon: MessageCircle, color: "text-green-400" },
    { channel: "Email",     handle: "priya@mail.com", text: "Following up on ticket #204", icon: AtSign, color: "text-amber-400" },
  ]

  return (
    <div className="flex h-full min-h-[380px] flex-col gap-4 lg:pl-4">
      {/* Unified inbox card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
            One inbox, every social channel
          </span>
        </div>
        <div className="space-y-2">
          {threads.map((t) => (
            <div key={t.channel + t.handle} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 ${t.color}`}>
                <t.icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-white">{t.handle}</p>
                <p className="truncate text-[11.5px] text-white/60">{t.text}</p>
              </div>
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-white/35">{t.channel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Single customer record */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
            One customer record
          </span>
        </div>
        <p className="text-[12px] leading-relaxed text-white/70">
          4 platforms, 1 profile — Meera&apos;s Instagram DM, WhatsApp order, and email ticket are
          all tied to the same customer, same history, same AI agent.
        </p>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5">
        <Bot className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[12.5px] font-medium text-primary">
          One AI agent answers across every social platform, instantly
        </span>
      </div>
    </div>
  )
}

export default function SocialChannelsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Social Messaging Hub"
        description="Unify Instagram and Messenger DMs with chat, voice, SMS, and email in one inbox, answered by agentic AI across every platform."
        path="/channels/social"
        category="Social Media Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Social", path: "/channels/social" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Channels · Social Messaging"
          title={
            <>
              All Your Social Conversations,
              <br className="hidden sm:block" /> One Agentic AI Inbox
            </>
          }
          subtitle="Instagram and Messenger DMs unified with chat, voice, SMS, and email, answered by agentic AI."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: Instagram, label: "Social DMs in one inbox" },
            { icon: Bot, label: "AI answers across platforms" },
            { icon: Users, label: "Routing, SLA, and CSAT" },
            { icon: Layers, label: "One customer record" },
          ]}
          visual={<SocialHubVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Social support without switching apps.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "1 inbox",  label: "Social DMs in one inbox" },
              { value: "AI",       label: "AI answers across platforms" },
              { value: "SLA",      label: "Routing, SLA, and CSAT" },
              { value: "1 record", label: "One customer record" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Social conversations scattered across apps are slow to answer"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Social conversations scattered across apps are slow to answer and impossible to
              measure. One inbox brings every DM together with the rest of your channels.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Social channels join the same inbox as everything else"
          subtitle="Instagram and Messenger aren't bolted on as an afterthought — they're first-class channels in the same one-view inbox as chat, voice, SMS, and email."
          items={[
            {
              icon: Instagram,
              title: "Social in one place",
              body: "Instagram and Messenger DMs alongside chat, voice, SMS, and email — no switching apps to keep up.",
            },
            {
              icon: Bot,
              title: "AI that answers",
              body: "The agentic AI handles routine social questions automatically, freeing your team for what actually needs a human.",
            },
            {
              icon: Users,
              title: "Built for operations",
              body: "Routing, SLA timers, and CSAT for social support at scale — measured like every other channel.",
            },
            {
              icon: Layers,
              title: "Unified customer",
              body: "One record so social ties into the customer's full history, wherever they messaged from.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ───────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why it works
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your team stops juggling apps
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Your team stops juggling apps, customers get fast replies wherever they message, and
              you finally measure social support like every other channel.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: <Bot className="h-4 w-4" />,       label: "Answers everywhere",  desc: "Same agentic AI, every social and messaging channel" },
                { icon: <Users className="h-4 w-4" />,     label: "One customer record", desc: "Identity merged across platforms automatically" },
                { icon: <UserCheck className="h-4 w-4" />, label: "Human handoff",       desc: "Escalates in-thread with full cross-channel context" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    {item.icon}
                  </span>
                  <p className="mt-2 text-[13px] font-semibold text-white">{item.label}</p>
                  <p className="mt-0.5 text-[12px] text-white/55">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why SMSLocal"
                title="Social is part of a platform, not a bolt-on tool"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Social is part of a platform that runs your AI, your campaigns, and your numbers,
                not a bolt-on social tool. SMSLocal treats social as another door into the same
                house — the same inbox, the same AI agent, the same record, and one set of numbers
                to report on.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <MessageCircle className="h-5 w-5" />, label: "Every DM answered",   desc: "Instagram and Messenger get the same SLA as chat and email" },
                { icon: <Zap className="h-5 w-5" />,            label: "No repeat questions", desc: "AI agent carries context across every channel switch" },
                { icon: <Sparkles className="h-5 w-5" />,       label: "Consistent answers",  desc: "One knowledge base powers every platform's replies" },
                { icon: <Layers className="h-5 w-5" />,         label: "One report, not five",desc: "Unified analytics across social, chat, and email" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Which platforms?",
              a: "Instagram and Messenger today, in one inbox alongside chat, voice, SMS, and email. More social channels are added over time without changing how your team works.",
            },
            {
              q: "Can AI answer?",
              a: "Yes, automatically across platforms. Agentic AI handles routine social questions from your knowledge base, and hands off to a human in the same thread when needed.",
            },
            {
              q: "Is it measurable?",
              a: "Yes, with SLA and CSAT. Social support gets routing, SLA timers, and CSAT scoring, so you can measure it like every other channel.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/channels/instagram/",         label: "Instagram — DMs, comments, and story replies" },
                { href: "/channels/messenger/",         label: "Facebook Messenger — automated and AI-handled" },
                { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox — every channel in one place" },
                { href: "/compare/",                    label: "See how SMSLocal compares" },
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
          title="Unify your social conversations with agentic AI."
          subtitle="Connect Instagram and Messenger alongside chat, voice, SMS, and email — one AI agent, one customer record, every platform."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

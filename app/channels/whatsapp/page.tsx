import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Image,
  LayoutList,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { WhatsAppHub } from "@/components/product/whatsapp-hub"
import {
  CapabilityGrid,
  ProductFinalCta,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/channels/whatsapp")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "Official Business API" },
  { icon: BadgeCheck, label: "Verified sender" },
  { icon: Bot, label: "AI answers automatically" },
  { icon: LayoutList, label: "Templates, media, buttons" },
]

export default function WhatsAppChannelPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal WhatsApp Business Messaging"
        description="Run two-way WhatsApp conversations and campaigns on the official Business API, with templates, media, and agentic AI answering automatically."
        path="/channels/whatsapp"
        category="WhatsApp Business API"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels/whatsapp" },
          { name: "WhatsApp", path: "/channels/whatsapp" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="wa-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels · WhatsApp
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                WhatsApp Business messaging <span className="text-primary">powered by agentic AI.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Two-way conversations and campaigns on the official WhatsApp Business API, answered automatically by agentic AI.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/signup/" className={BTN_OUT}>Start your trial</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="wa-rise" style={{ animationDelay: "0.15s" }}>
              <WhatsAppHub />
            </div>
          </div>
          <style>{`
            @keyframes wa-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .wa-rise { animation: wa-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .wa-rise { animation: none } }
          `}</style>
        </section>

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Real WhatsApp business messaging, not a workaround.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Official", label: "WhatsApp Business API — verified sender, not a grey-route workaround" },
              { value: "Verified", label: "Sender with messaging limits and quality rating monitored in the dashboard" },
              { value: "Auto",     label: "Agentic AI answers routine WhatsApp questions around the clock" },
              { value: "Rich",     label: "Template messages with media, buttons, and list replies" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="WhatsApp at scale is harder than it looks"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              WhatsApp is where customers want to talk, but doing it at scale means handling the
              API, templates, quality ratings, and two-way conversations — all while staying
              within Meta&apos;s guidelines. SMSLocal manages all of it and adds agentic AI on top,
              so you get the reach of WhatsApp without the operational overhead.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="WhatsApp done properly — official, verified, and AI-powered"
          subtitle="Everything you need to run WhatsApp as a real business channel, not a demo integration."
          items={[
            {
              icon: ShieldCheck,
              title: "Official Business API",
              body: "Verified sender with messaging limits and quality rating monitored in the dashboard — so your number stays in good standing and your messages get delivered.",
            },
            {
              icon: MessageCircle,
              title: "Two-way conversations",
              body: "Every WhatsApp chat lands in the shared inbox for your AI and your team — with full conversation history, internal notes, and canned responses ready to go.",
            },
            {
              icon: Image,
              title: "Rich templates",
              body: "Template messages with images, video, documents, buttons, and list replies — so your outbound messages have clear next steps and higher engagement.",
            },
            {
              icon: Bot,
              title: "AI that answers",
              body: "The agentic AI handles routine WhatsApp questions from your knowledge base and hands off to a human in the same thread when the conversation needs one.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Fast, accurate WhatsApp replies — around the clock"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Customers get fast, accurate WhatsApp replies around the clock, and your team
                handles only what needs a person — all from one inbox. No missed messages, no
                channel switching, no customers left waiting because it&apos;s 2 AM.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />,         label: "Sub-second replies", desc: "AI responds to WhatsApp messages instantly, any time of day" },
                { icon: <BadgeCheck className="h-5 w-5" />,  label: "Verified sender",    desc: "Official API keeps your quality rating high and delivery reliable" },
                { icon: <UserCheck className="h-5 w-5" />,   label: "Smooth handoff",     desc: "Human steps into the same thread with full context when needed" },
                { icon: <Sparkles className="h-5 w-5" />,    label: "Rich messages",      desc: "Buttons, media, and lists make every message more actionable" },
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

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              WhatsApp is one channel — not your whole stack
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              WhatsApp is one channel on a platform that also runs your broadcasting, voice, SMS,
              and email — all tied to a single customer record. A customer who gets a WhatsApp
              broadcast, replies with a question, and then calls you is one conversation, not three
              separate tickets in three separate tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/channels/whatsapp-broadcasting/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                WhatsApp Broadcasting <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/products/omnichannel-inbox/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Omnichannel Inbox <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Is this the official WhatsApp Business API?",
              a: "Yes — SMSLocal is a WhatsApp Business Solution Provider (BSP) using the official API. Your sender is verified, your quality rating is monitored, and your messages go through Meta's infrastructure — not a grey route.",
            },
            {
              q: "Can AI automatically answer WhatsApp chats?",
              a: "Yes. The agentic AI answers from your knowledge base, catalog, and policies automatically. When a conversation needs a human, it hands off in the same WhatsApp thread with full context attached.",
            },
            {
              q: "Can I send broadcasts on WhatsApp?",
              a: "Yes. See WhatsApp Broadcasting for outbound campaigns with templates, media, and buttons — sent to opted-in contacts at scale.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/channels/whatsapp-broadcasting/", label: "WhatsApp Broadcasting — campaigns at scale" },
                { href: "/products/agentic-ai/",           label: "How agentic AI works" },
                { href: "/products/omnichannel-inbox/",    label: "Omnichannel inbox — all channels in one place" },
                { href: "/compare/",                       label: "Compare SMSLocal with alternatives" },
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
          title="Bring agentic AI to WhatsApp."
          subtitle="Connect the official API, train the agent on your data, and start resolving WhatsApp conversations automatically — around the clock."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start your trial", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

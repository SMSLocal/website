import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Layers,
  LayoutList,
  MessageCircle,
  Megaphone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
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

export const metadata: Metadata = getPageMetadata("/channels/whatsapp-broadcasting")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function WhatsAppBroadcastVisual() {
  const broadcast = {
    template: "Order shipped ✅",
    body: "Hi {{name}}, your order #{{order_id}} has shipped and arrives by {{date}}. Tap below to track.",
    buttons: ["Track Order", "Contact Support"],
    sent: "12,400",
    delivered: "12,218",
    read: "9,841",
  }

  const replies = [
    { name: "Priya M.",  text: "When exactly will it arrive?",     agent: true },
    { name: "Rahul S.",  text: "Can I change the delivery address?", agent: true },
    { name: "Sneha T.",  text: "Thank you!",                        agent: false },
  ]

  return (
    <div className="flex h-full min-h-[380px] flex-col gap-4 lg:pl-4">
      {/* Broadcast card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-primary" />
          <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
            Broadcast sent
          </span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[12px] font-semibold text-white">{broadcast.template}</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-white/60">{broadcast.body}</p>
          <div className="mt-2 flex gap-2">
            {broadcast.buttons.map((b) => (
              <span key={b} className="rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10.5px] font-semibold text-primary">
                {b}
              </span>
            ))}
          </div>
        </div>
        {/* Delivery stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Sent",      value: broadcast.sent },
            { label: "Delivered", value: broadcast.delivered },
            { label: "Read",      value: broadcast.read },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 py-2 text-center">
              <p className="text-[15px] font-semibold text-white">{s.value}</p>
              <p className="text-[10px] text-white/45">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Replies handled by AI */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Replies — handled by AI
        </p>
        <div className="space-y-1.5">
          {replies.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="truncate text-[11.5px] text-white/70">
                  <span className="font-semibold text-white">{r.name}:</span> {r.text}
                </span>
              </div>
              {r.agent && (
                <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  AI ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5">
        <BadgeCheck className="h-4 w-4 shrink-0 text-green-400" />
        <span className="text-[12.5px] font-medium text-green-300">
          Official API · Verified sender · AI answers every reply
        </span>
      </div>
    </div>
  )
}

export default function WhatsAppBroadcastingPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal WhatsApp Broadcasting"
        description="Send segmented WhatsApp template campaigns with media, buttons, and Flows to opted-in audiences, track delivery and read analytics per broadcast, then answer replies with agentic AI."
        path="/channels/whatsapp-broadcasting"
        category="WhatsApp Broadcasting"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "WhatsApp Broadcasting", path: "/channels/whatsapp-broadcasting" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Channels · WhatsApp Broadcasting"
          title={
            <>
              WhatsApp Broadcasting at Scale,
              <br className="hidden sm:block" /> Answered by Agentic AI
            </>
          }
          subtitle="Send template campaigns to opted-in audiences on the WhatsApp Business API, then let agentic AI handle every reply."
          primaryCta={{ label: "Start Broadcasting", href: "/signup/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          trustBar={[
            { icon: ShieldCheck, label: "Official Business API" },
            { icon: LayoutList,  label: "Templates with media and buttons" },
            { icon: Layers,      label: "WhatsApp Flows" },
            { icon: Bot,         label: "Replies handled by AI" },
          ]}
          visual={<WhatsAppBroadcastVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Campaigns and conversations on one platform.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Official", label: "Business API with a verified sender" },
              { value: "Rich",     label: "Templates with media and buttons" },
              { value: "Flows",    label: "In-chat forms and guided journeys" },
              { value: "AI",       label: "Replies handled by agentic AI" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="A broadcast that no one can answer is a missed opportunity"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Most tools blast messages and leave the replies to pile up. Every reply is a
              customer who engaged — and if no one answers them, you&apos;ve spent your messaging
              budget to create frustration instead of a conversation. SMSLocal turns every
              broadcast into a conversation your agentic AI can carry forward.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU CAN SEND ─────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you can send"
          title="Every WhatsApp message type — from segmented blast to guided flow"
          subtitle="Not just plain text templates — every message format WhatsApp supports, sent to the right segment and tracked end to end, with AI ready to handle whatever comes back."
          items={[
            {
              icon: Megaphone,
              title: "Template campaigns",
              body: "Broadcast approved templates to large opted-in audiences with merge-field personalization for names, order IDs, dates, and any variable your template supports.",
            },
            {
              icon: Sparkles,
              title: "Rich messages",
              body: "Add media, buttons, and list or CTA replies so customers act without leaving the chat — and replies flow straight to your AI.",
            },
            {
              icon: Layers,
              title: "WhatsApp Flows",
              body: "Run in-chat forms and guided journeys for onboarding, bookings, and lead capture — all inside WhatsApp, no external landing page needed.",
            },
            {
              icon: MessageCircle,
              title: "Click-to-WhatsApp and commerce",
              body: "Use ad entry points and catalog messages to turn interest into conversation, with AI ready to qualify and convert.",
            },
          ]}
        />

        {/* ── BROADCASTING MEETS AGENTIC AI ─────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Broadcasting meets agentic AI
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every reply becomes a conversation — automatically
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Every broadcast moves through the same lifecycle you can see at a glance — draft,
              scheduled, ongoing, completed — with sent, delivered, and read counts per segment
              once it's out the door. When customers reply, the agentic AI answers automatically
              and the copilot helps your team with the ones that need a human. Quality rating and
              messaging-limit monitoring keep your sender healthy as you scale — so you never wake
              up to a number ban.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: <Bot className="h-4 w-4" />,         label: "AI answers replies",    desc: "Automatically, at any volume" },
                { icon: <LayoutList className="h-4 w-4" />,  label: "Broadcast lifecycle",   desc: "Draft, scheduled, ongoing, completed — visible at a glance" },
                { icon: <UserCheck className="h-4 w-4" />,   label: "Copilot for your team", desc: "Assists on the complex ones" },
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
                title="A campaign reply that becomes a real conversation"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Broadcasting, the AI agent, and the inbox share one platform, so a campaign reply
                becomes a real conversation, not a dead end. The customer who tapped your button
                and asked a follow-up question gets an instant answer, and if they convert, that
                sale is tied to the same record as the broadcast that started it.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Megaphone className="h-5 w-5" />,   label: "Segmented sends",     desc: "Target opted-in audiences by segment, not one big blast" },
                { icon: <Zap className="h-5 w-5" />,         label: "Instant AI replies",  desc: "Every reply answered, no volume limit" },
                { icon: <TrendingUp className="h-5 w-5" />,  label: "Full attribution",    desc: "Replies tied to the broadcast that triggered them" },
                { icon: <BadgeCheck className="h-5 w-5" />,  label: "Sender stays healthy",desc: "Quality rating and limit monitoring built in" },
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
              q: "Is this the official WhatsApp Business API?",
              a: "Yes, with a verified sender. SMSLocal is an official WhatsApp Business Solution Provider, and every broadcast goes through Meta's infrastructure under your verified brand.",
            },
            {
              q: "Can AI answer broadcast replies?",
              a: "Yes, automatically. When a customer replies to your broadcast, the agentic AI answers from your knowledge base right away, and hands off to a human in the same thread when needed.",
            },
            {
              q: "What about opt-outs and limits?",
              a: "Handled, with quality and limit monitoring built in. Opt-outs are processed automatically, and messaging limits and quality rating are monitored so you can scale without risking your number.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/whatsapp-business-api/", label: "WhatsApp Business API — two-way conversations and AI" },
                { href: "/channels/rcs-broadcasting/",       label: "RCS Broadcasting — branded rich campaigns" },
                { href: "/products/ai-agentic/",             label: "How agentic AI works" },
                { href: "/compare/",                         label: "See how SMSLocal compares" },
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
          title="Broadcast on WhatsApp and let AI handle the replies."
          subtitle="Connect the official API, build your templates, and send campaigns your agentic AI can follow up on — automatically."
          primaryCta={{ label: "Start Broadcasting", href: "/signup/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

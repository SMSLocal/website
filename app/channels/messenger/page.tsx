import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Inbox,
  MessageCircle,
  MessagesSquare,
  Radio,
  Sparkles,
  UserCheck,
  Users,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { MessengerPhone } from "@/components/product/messenger-phone"
import {
  CapabilityGrid,
  ProductFinalCta,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/channels/messenger")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MessageCircle, label: "Automated replies" },
  { icon: Bot, label: "AI agent handoff" },
  { icon: Radio, label: "Opted-in broadcasts" },
  { icon: Inbox, label: "One shared inbox" },
]

export default function MessengerPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Facebook Messenger Business Messaging"
        description="Facebook Messenger business messaging in the same shared inbox as WhatsApp and SMS — automated replies, AI agent handoff, broadcasts to opted-in subscribers, and unified reporting."
        path="/channels/messenger"
        category="Facebook Messenger Business Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Messenger", path: "/channels/messenger" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="ms-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels · Facebook Messenger
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Messenger conversations, <span className="text-primary">handled like WhatsApp.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Auto-reply to common questions, hand off to a human when it matters, and broadcast to opted-in subscribers, all from the same inbox as your other channels.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Connect Messenger <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to Sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="ms-rise" style={{ animationDelay: "0.15s" }}>
              <MessengerPhone />
            </div>
          </div>
          <style>{`
            @keyframes ms-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .ms-rise { animation: ms-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .ms-rise { animation: none } }
          `}</style>
        </section>

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Messenger conversations, handed off between AI and humans without ever leaving the inbox.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "1 inbox",  label: "Messenger, WhatsApp, Instagram, and SMS in one workspace" },
              { value: "24/7",     label: "AI agent answers common questions instantly" },
              { value: "Seamless", label: "Handoff to a human agent mid-conversation, no context lost" },
              { value: "Opted-in", label: "Broadcasts respect Messenger's subscription rules" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Messenger is where a lot of your customers already are — is it wired into your workflow?"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Facebook still drives real inbound for Indian brands — page inquiries, ad click-throughs,
              and repeat customers who message instead of call. Left in Meta's native inbox, those
              conversations sit disconnected from your order data, your team's other channels, and any
              automation you've already built for WhatsApp. SMSLocal brings Messenger into the same
              shared inbox, so it gets the same treatment as everything else.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Messenger, built into the same workflow as your other channels"
          subtitle="Automated where it should be, human where it matters, broadcast when you're allowed to."
          items={[
            {
              icon: MessageCircle,
              title: "Automated replies",
              body: "Answer FAQs, greet first-time senders, and route common requests automatically — so Messenger doesn't need a dedicated person watching it around the clock.",
            },
            {
              icon: Bot,
              title: "AI agent with human handoff",
              body: "Your AI agent answers routine Messenger questions grounded in your order and catalog data, and hands off to a human agent instantly — with full context — the moment a conversation needs one.",
            },
            {
              icon: Radio,
              title: "Broadcast to opted-in subscribers",
              body: "Send updates, offers, and announcements to subscribers who've opted in within Messenger's messaging window rules — from the same campaign tool you use for WhatsApp and SMS.",
            },
            {
              icon: Inbox,
              title: "One shared inbox, every Page included",
              body: "Run more than one Facebook Page? Connect all of them and see every Page's Messenger conversations in the same dashboard as WhatsApp, Instagram, and SMS — one login, one set of assignment rules, no switching accounts to check a second Page.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="One team, one AI agent, every channel your customers pick"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Customers don't think in channels — they message wherever is convenient. Messenger
                running in the same inbox as WhatsApp and SMS means your team never has to remember
                which app to check, and your AI agent gives the same accurate answer no matter where
                the question came in.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />,             label: "Faster first response", desc: "Auto-replies and AI agent cover the first message instantly" },
                { icon: <UserCheck className="h-5 w-5" />,       label: "Clean handoffs",          desc: "Full conversation context moves with the customer to a human" },
                { icon: <Users className="h-5 w-5" />,           label: "Opted-in broadcasts",     desc: "Reach subscribers without breaking Messenger's messaging rules" },
                { icon: <MessagesSquare className="h-5 w-5" />,  label: "Consistent answers",      desc: "Same AI agent, same knowledge base, across every channel" },
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
              Messenger is another door into the same inbox
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Add Messenger to the omnichannel inbox that already runs your WhatsApp, Instagram, and
              SMS conversations, and let the same AI agent and human team handle it — no new tools,
              no new logins, no new training for your support team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/omnichannel-inbox/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Omnichannel inbox
              </Link>
              <Link
                href="/products/ai-agents/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                AI Agents
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Does the same AI agent that answers WhatsApp work on Messenger?",
              a: "Yes. Your AI agent runs across every connected channel — WhatsApp, Messenger, Instagram, SMS — grounded in the same catalog, order, and FAQ data, with consistent handoff rules to a human agent.",
            },
            {
              q: "Can I broadcast to my Messenger subscribers?",
              a: "Yes, within Meta's Messenger messaging rules for opted-in subscribers. Broadcasts run from the same campaign tool as your WhatsApp and SMS sends, so you plan one calendar instead of three.",
            },
            {
              q: "What happens when a conversation needs a human?",
              a: "The AI agent hands the conversation off to your team instantly, with the full message history and any customer or order context attached — the human agent never starts from a blank screen.",
            },
            {
              q: "Do Messenger conversations show up in the same inbox as our other channels?",
              a: "Yes. Messenger lands in the same shared inbox as WhatsApp, Instagram, SMS, and email, with the same routing, assignment, and reporting rules applied consistently across channels.",
            },
            {
              q: "Can I connect more than one Facebook Page?",
              a: "Yes. If you manage multiple Pages — separate brands, regions, or storefronts — connect all of them and their Messenger conversations show up in the same dashboard, so your team isn't logging in and out of different accounts to keep up.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox — one place for every channel" },
                { href: "/products/ai-agents/",          label: "AI Agents — automate support and sales" },
                { href: "/channels/instagram/",          label: "Instagram — same inbox, another channel" },
                { href: "/products/analytics/",          label: "Analytics — CSAT, NPS, and campaign results" },
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
          title="Bring Messenger into your real inbox."
          subtitle="Automate the routine questions, hand off to a human when it matters, and broadcast to subscribers who've opted in."
          primaryCta={{ label: "Connect Messenger", href: "/signup/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

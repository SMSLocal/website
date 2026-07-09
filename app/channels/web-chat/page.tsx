import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Code2,
  MousePointerClick,
  Palette,
  Sparkles,
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

export const metadata: Metadata = getPageMetadata("/channels/web-chat")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function WebChatVisual() {
  const messages = [
    { from: "bot",  text: "Hi! Looking for something specific, or just browsing?" },
    { from: "user", text: "Do you ship to Kochi?" },
    { from: "bot",  text: "Yes — 2-3 day delivery to Kochi. Want me to check a specific product?" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Widget mock */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-white">Chat with us</p>
            <p className="text-[11px] text-green-400">● AI answers instantly</p>
          </div>
        </div>
        <div className="space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <span
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-snug ${
                  m.from === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/10 text-white/80"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger card */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Proactive trigger fired
        </p>
        <p className="text-[12.5px] leading-relaxed text-white/80">
          Visitor spent 45s on pricing page → chat opened automatically
        </p>
      </div>

      {/* SDK badge */}
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5">
        <Code2 className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[12.5px] font-medium text-primary">
          Same chat, embedded inside your product via SDK
        </span>
      </div>
    </div>
  )
}

export default function WebChatPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Web Chat"
        description="A customizable website chat widget with agentic AI built in — answers visitors instantly, fires proactive triggers, and embeds inside your product via SDK."
        path="/channels/web-chat"
        category="Website Live Chat Widget"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels/web-chat" },
          { name: "Web Chat", path: "/channels/web-chat" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Channels · Web Chat"
          title={
            <>
              Website Chat With
              <br className="hidden sm:block" /> Agentic AI Built In
            </>
          }
          subtitle="A customizable chat widget that answers visitors instantly and converts them, powered by agentic AI."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
          trustBar={[
            { icon: Palette,            label: "Customizable widget" },
            { icon: Sparkles,           label: "AI answers before an agent" },
            { icon: MousePointerClick,  label: "Proactive triggers" },
            { icon: Code2,              label: "In-app SDK chat" },
          ]}
          visual={<WebChatVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Turn website visitors into conversations, not bounces.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "On-brand",  label: "Widget colors, position, and prechat forms match your site" },
              { value: "Instant",   label: "Agentic AI answers common questions before an agent joins" },
              { value: "Proactive", label: "Triggers reach visitors at the right moment based on behavior" },
              { value: "In-app",    label: "SDK embeds the same chat inside your product, not just the site" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Most website visitors leave without talking to anyone"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              A visitor has a question, doesn&apos;t find the answer in three clicks, and leaves. A
              chat widget with agentic AI greets them, answers instantly, and captures the ones
              who were ready to buy or ask — before they close the tab.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="A widget that does more than sit in the corner"
          subtitle="Not a static contact form — a chat experience your visitors actually use, answered by AI first."
          items={[
            {
              icon: Palette,
              title: "Customizable widget",
              body: "Match colors, position, and prechat forms to your brand, so the widget looks like part of your site — not a bolted-on plugin.",
            },
            {
              icon: Sparkles,
              title: "AI that answers first",
              body: "The agentic AI handles common questions — pricing, shipping, availability — before an agent ever needs to pick up the conversation.",
            },
            {
              icon: MousePointerClick,
              title: "Proactive triggers",
              body: "Reach visitors at the right moment based on behavior — time on page, scroll depth, or a specific page they landed on.",
            },
            {
              icon: Code2,
              title: "In-app SDK",
              body: "Embed the same chat experience inside your product, not just your marketing site, so logged-in users get support without leaving the app.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Why it works"
              title="Instant answers, and your team only where it matters"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Visitors get instant answers without waiting, and your team only joins the
              conversations that genuinely need a person — all from the same shared inbox as your
              WhatsApp, SMS, and voice conversations.
            </p>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Web chat is one channel — not a separate silo
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Web chat runs on the same platform as WhatsApp, SMS, voice, and your campaigns, so a
              visitor who chats on your site and later messages on WhatsApp is one customer
              record — not two disconnected conversations in two different tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agentic AI
              </Link>
              <Link
                href="/products/omnichannel-inbox"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Omnichannel Inbox
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Can I customize the widget?",
              a: "Yes — colors, position, and prechat forms all match your brand, so the widget feels like a native part of your site, not a third-party plugin.",
            },
            {
              q: "Does AI answer in the widget?",
              a: "Yes. The agentic AI answers common questions instantly from your knowledge base, and hands off to an agent in the same thread when a conversation needs a person.",
            },
            {
              q: "Is there an in-app option, not just the website?",
              a: "Yes — the SDK embeds the same chat experience inside your product, so logged-in users get support without ever leaving the app.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/live-chat",         label: "Live Chat product — full feature breakdown" },
                { href: "/products/ai-agentic",        label: "How agentic AI works" },
                { href: "/products/omnichannel-inbox", label: "Omnichannel inbox — every channel, one place" },
                { href: "/compare",                    label: "Compare SMSLocal with alternatives" },
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
          title="Add agentic AI chat to your website."
          subtitle="Install the widget, connect your knowledge base, and start converting visitors into conversations."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

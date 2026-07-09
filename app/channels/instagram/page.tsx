import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Camera,
  Inbox,
  MessageCircle,
  MessagesSquare,
  ShoppingBag,
  Sparkles,
  Tag,
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

export const metadata: Metadata = getPageMetadata("/channels/instagram")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function InstagramVisual() {
  const dm = {
    customer: "Hey! Does this come in size M? Saw it on your story 👀",
    draft:
      "Hi! Yes, size M is in stock — here's the direct link to grab it, free shipping on this one 🛍️",
  }

  const badges = [
    { icon: Camera, label: "From story reply" },
    { icon: Tag, label: "Product tagged" },
    { icon: Bot, label: "AI agent replied" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Customer DM */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Instagram DM
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">{dm.customer}</p>
      </div>

      {/* AI agent reply card */}
      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            AI agent — auto-replied
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white">{dm.draft}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-white/75"
            >
              <b.icon className="h-3 w-3" /> {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Shared inbox badge */}
      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Inbox className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          Same inbox as WhatsApp and SMS — one agent view, every channel
        </span>
      </div>
    </div>
  )
}

export default function InstagramPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Instagram Business Messaging"
        description="Instagram business messaging in the same shared inbox as WhatsApp and SMS — DM automation, story-reply and comment-to-DM flows, AI agent replies, and catalog tagging for D2C brands."
        path="/channels/instagram"
        category="Instagram Business Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Instagram", path: "/channels/instagram" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Channels · Instagram"
          title={
            <>
              Instagram DMs,
              <br className="hidden sm:block" /> Answered Like WhatsApp
            </>
          }
          subtitle="Turn story replies and comments into DMs, answer them with your AI agent, and manage every conversation in the same inbox as WhatsApp and SMS."
          primaryCta={{ label: "Connect Instagram", href: "/signup/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
          trustBar={[
            { icon: MessageCircle, label: "DM automation" },
            { icon: Camera, label: "Story-reply capture" },
            { icon: Bot, label: "AI agent replies" },
            { icon: ShoppingBag, label: "Catalog & product tags" },
          ]}
          visual={<InstagramVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Built for D2C brands who sell as much in the comments as they do on the storefront.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "1 inbox",  label: "Instagram, WhatsApp, and SMS in one agent workspace" },
              { value: "Auto",     label: "Story replies and comments converted to DMs automatically" },
              { value: "24/7",     label: "AI agent answers common questions the moment they land" },
              { value: "Tagged",   label: "Products linked straight from the conversation to checkout" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Your customers are DMing you on Instagram — is anyone watching?"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              For most D2C brands, Instagram is where discovery turns into intent — someone replies
              to a story, comments "price?" on a reel, or DMs a question about sizing. If that lands
              in the native Instagram app with no team behind it, you lose the sale before it starts.
              SMSLocal brings Instagram into the same shared inbox as your WhatsApp and SMS
              conversations, so nothing sits unread.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Every Instagram touchpoint, covered"
          subtitle="From a story reply to a closed sale, without switching apps."
          items={[
            {
              icon: MessageCircle,
              title: "DM automation",
              body: "Set up auto-replies for FAQs, greeting messages for first-time senders, and quick-reply buttons that route customers to the right answer without waiting on a human.",
            },
            {
              icon: Camera,
              title: "Story-reply & comment-to-DM automation",
              body: "Set a keyword — 'PRICE', 'LINK', 'SIZE' — and anyone who comments it on a post or reel, or replies to your story, gets pulled straight into a DM automatically. No one has to dig through a comments thread to find them.",
            },
            {
              icon: Bot,
              title: "AI agent, same inbox as WhatsApp",
              body: "Your AI agent answers Instagram DMs the same way it answers WhatsApp — grounded in your catalog and order data, with instant handoff to a human when a conversation needs one.",
            },
            {
              icon: Tag,
              title: "Catalog & product tagging",
              body: "Tag products directly in a DM reply so customers can view details or check out without leaving the conversation — built for D2C brands running Instagram as a storefront.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="One inbox, one AI agent, every channel your customers actually use"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Your support and sales team shouldn't have to log into a separate app for every
                channel. Instagram conversations show up next to WhatsApp and SMS, with the same
                customer profile, the same AI agent, and the same quick replies — so switching
                channels never means switching tools.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />,             label: "Faster first response", desc: "AI agent replies the moment a DM lands, day or night" },
                { icon: <MessagesSquare className="h-5 w-5" />,  label: "Quick replies built in", desc: "Saved answers for sizing, shipping, and returns, one tap away" },
                { icon: <Inbox className="h-5 w-5" />,            label: "One shared inbox",       desc: "Instagram, WhatsApp, and SMS handled by the same team, same view" },
                { icon: <ShoppingBag className="h-5 w-5" />,      label: "Sell in the DM",         desc: "Catalog tags turn a question into checkout without switching apps" },
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
              Instagram is a channel, not a separate business
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Add Instagram to the same omnichannel inbox that already runs your WhatsApp, SMS, and
              email conversations, and let the same AI agent handle the routine questions across all
              of them — so growth on Instagram doesn't mean growing your support headcount.
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
              q: "Can I automate replies to Instagram story mentions and comments?",
              a: "Yes. Set a trigger keyword — or capture every reply automatically — so anyone who replies to your story or comments on a post gets pulled into a DM conversation, where automation or your AI agent can take over from there.",
            },
            {
              q: "Does the same AI agent that answers WhatsApp work on Instagram?",
              a: "Yes. Your AI agent runs across every connected channel — WhatsApp, Instagram, SMS — grounded in the same catalog, order, and FAQ data, with a consistent handoff to a human agent when needed.",
            },
            {
              q: "Can customers buy directly from a DM?",
              a: "You can tag products from your catalog in a DM reply so the customer sees pricing and a direct link without leaving Instagram — useful for D2C brands turning story and comment traffic into sales.",
            },
            {
              q: "Do Instagram conversations show up in the same inbox as our other channels?",
              a: "Yes. Instagram DMs land in the same shared inbox as WhatsApp, SMS, and email, with routing, assignment, and reporting that treat every channel the same way.",
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
                { href: "/channels/messenger/",          label: "Facebook Messenger — same inbox, another channel" },
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
          title="Bring Instagram into your real inbox."
          subtitle="Automate story replies and comments, let your AI agent handle the routine questions, and sell straight from the DM."
          primaryCta={{ label: "Connect Instagram", href: "/signup/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

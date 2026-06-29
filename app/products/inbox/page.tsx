import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ChannelMarquee } from "@/components/product/channel-marquee"
import { TeamCollabPhone } from "@/components/product/team-collab-phone"
import { TeamFeatureList } from "@/components/product/team-feature-list"
import { InboxFinalCta } from "@/components/product/inbox-final-cta"
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  MessagesSquare,
  MessageSquare,
  Music2,
  Phone,
  ShieldCheck,
  Smartphone,
  Send,
  Timer,
  Users,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { InboxVisual } from "@/components/product/inbox-visual"
import { InboxFaq } from "@/components/product/inbox-faq"
import { InboxTestimonials } from "@/components/product/inbox-testimonials"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/inbox")

// ─── Channel catalogue (Unified Inbox section) ───────────────────────────────
const CHANNELS = [
  { name: "WhatsApp", icon: MessageCircle, tint: "text-emerald-500 bg-emerald-500/10", blurb: "Native BSP, two-way threads" },
  { name: "Email", icon: Mail, tint: "text-sky-500 bg-sky-500/10", blurb: "Shared address, full threads" },
  { name: "Live Chat", icon: MessagesSquare, tint: "text-teal-500 bg-teal-500/10", blurb: "Website widget, real-time" },
  { name: "Instagram", icon: Instagram, tint: "text-pink-500 bg-pink-500/10", blurb: "DMs, story replies, comments" },
  { name: "Messenger", icon: Facebook, tint: "text-blue-500 bg-blue-500/10", blurb: "Facebook page conversations" },
  { name: "Telegram", icon: Send, tint: "text-cyan-500 bg-cyan-500/10", blurb: "Bots and direct chats" },
  { name: "Line", icon: MessageSquare, tint: "text-green-600 bg-green-600/10", blurb: "Official account messaging" },
  { name: "TikTok", icon: Music2, tint: "text-fuchsia-500 bg-fuchsia-500/10", blurb: "DMs and lead messages" },
  { name: "SMS", icon: Smartphone, tint: "text-violet-500 bg-violet-500/10", blurb: "DLT-compliant two-way SMS" },
  { name: "Voice", icon: Phone, tint: "text-amber-500 bg-amber-500/10", blurb: "Calls and voicemail, logged" },
]


export default function InboxPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Inbox — Shared Team Inbox"
        description="A collaborative omnichannel inbox that unifies WhatsApp, Email, Instagram, Messenger, Telegram, Line, TikTok, SMS, and Voice into a single workspace with Customer 360, smart routing, and team collaboration."
        path="/products/inbox"
        category="Shared team inbox and omnichannel customer messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Inbox", path: "/products/inbox" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        {/* 1 ─ Hero */}
        <ProductHero
          eyebrow="SMSLocal Inbox"
          title={
            <>
              Every customer conversation.
              <br />
              One inbox.
            </>
          }
          subtitle="Manage WhatsApp, Email, Instagram, Messenger, Telegram, SMS, Voice, and more from a single collaborative workspace — so your team replies with full context, not tab-switching."
          primaryCta={{ label: "Start Free", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
          trustBar={[
            { icon: MessagesSquare, label: "10+ channels in one timeline" },
            { icon: Users, label: "Built for teams, not solo inboxes" },
            { icon: Timer, label: "Faster first response, lower SLA" },
            { icon: ShieldCheck, label: "Enterprise-grade security" },
          ]}
          visual={<InboxVisual />}
          compact
        />

        {/* 2 ─ Unified Inbox / Channel cards */}
        <Section className="!py-8 sm:!py-10">
          <SectionHeader
            center
            eyebrow="One unified inbox"
            title="One inbox for every channel."
            subtitle="Bring every customer conversation into a single timeline. No tab switching. No duplicate work. No missed messages — wherever your customers reach out."
          />
          <ChannelMarquee channels={CHANNELS} />
        </Section>

        {/* 3 ─ Team collaboration */}
        <Section tone="muted" screenHeight>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <TeamCollabPhone />
            <div>
              <SectionHeader
                eyebrow="Built for teams"
                title="Built for support teams."
                subtitle="Collaborate on conversations without forwarding emails, pinging Slack, or losing context. The whole thread — and the decision behind it — stays in one place."
              />
              <TeamFeatureList />
            </div>
          </div>
        </Section>

        {/* 4 ─ Testimonials */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 100%)",
            }}
          />
          <Section screenHeight>
            <SectionHeader
              center
              eyebrow="Loved by support teams"
              title="Teams that switched, stayed."
            />
            <div className="mt-8">
              <InboxTestimonials />
            </div>
          </Section>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* 5 ─ FAQ */}
        <Section tone="muted" screenHeight>
          <SectionHeader
            center
            eyebrow="FAQ"
            title="Common questions, straight answers."
          />
          <div className="mt-6">
            <InboxFaq />
          </div>
        </Section>

        <RelatedContent path="/products/inbox" />

        {/* 6 ─ Final CTA */}
        <InboxFinalCta
          subtitle="Bring every conversation into one inbox and give your team the context they need to deliver exceptional support."
          primaryCta={{ label: "Start Free", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}


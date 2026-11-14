import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, Bot, Instagram, Layers, Sparkles, Users } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { SocialInboxScene } from "@/components/product/social-inbox-scene"
import { Section, StatsBand } from "@/components/product/product-page"
import {
  SocialCapabilities,
  SocialProblem,
  SocialSteps,
  SocialStyles,
  SocialWhyItWorks,
  SocialWhySmsLocal,
} from "@/components/product/social-sections"
import { WhatsAppMotion } from "@/components/product/whatsapp-motion"

export const metadata: Metadata = getPageMetadata("/channels/social")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: Instagram, label: "Social DMs in one inbox" },
  { icon: Bot, label: "AI answers across platforms" },
  { icon: Users, label: "Routing, SLA, and CSAT" },
  { icon: Layers, label: "One customer record" },
]

const FAQ = [
  {
    q: "Which social platforms does SMSLocal support?",
    a: "Instagram and Messenger today, in one inbox alongside chat, voice, SMS and email. More social channels are added over time without changing how your team works.",
  },
  {
    q: "Can I manage Instagram DMs and Facebook Messenger in one inbox?",
    a: "Yes. Instagram and Messenger conversations land in the same shared inbox as your other channels, with the same routing, assignment and reporting rules, so your team stops switching apps.",
  },
  {
    q: "Can AI answer social media messages automatically?",
    a: "Yes. Agentic AI handles routine social questions from your knowledge base across platforms, and hands off to a human in the same thread when a conversation needs one.",
  },
  {
    q: "Is social media support measurable?",
    a: "Yes. Social support gets routing, SLA timers and CSAT scoring, so you can measure it like every other channel and report on it in one place.",
  },
  {
    q: "What happens when the same customer messages on different platforms?",
    a: "SMSLocal merges identity across platforms into one customer record, so your team and your AI agent see the full history wherever the customer messaged from.",
  },
  {
    q: "How do I connect Instagram and Messenger to SMSLocal?",
    a: "Sign up, choose the social channels you want, and link your Instagram and Facebook accounts. Then set your routing, SLA targets and AI rules, and start replying from the shared inbox.",
  },
]

const EXPLORE = [
  { href: "/channels/instagram/", label: "Instagram DM automation", hint: "DMs, story replies and comment-to-DM" },
  { href: "/channels/messenger/", label: "Facebook Messenger", hint: "Automated and AI-handled conversations" },
  { href: "/channels/web-chat/", label: "Website live chat widget", hint: "AI chat for every visitor" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
]

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
      <FaqJsonLd items={FAQ} path="/channels/social" />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="so-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels · Social Messaging
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                All your social conversations, <span className="text-primary">one agentic AI inbox.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Instagram and Messenger DMs unified with chat, voice, SMS, and email, answered by agentic AI.
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
            <div className="so-rise" style={{ animationDelay: "0.15s" }}>
              <div className="so-float"><SocialInboxScene /></div>
            </div>
          </div>
          <style>{`
            @keyframes so-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .so-rise { animation: so-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .so-rise { animation: none } }
          `}</style>
        </section>

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

        <SocialProblem />
        <SocialCapabilities />
        <SocialSteps />
        <SocialWhyItWorks />
        <SocialWhySmsLocal />
        <FaqSection items={FAQ} />
        <ExploreMore links={EXPLORE} />

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <GsFinalCta />
        <SocialStyles />
        <WhatsAppMotion />
      </main>
      <SiteFooter />
    </>
  )
}

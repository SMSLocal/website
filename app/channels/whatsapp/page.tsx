import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  LayoutList,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { FaqSection } from "@/components/landing/faq-section"
import { Section, StatsBand } from "@/components/product/product-page"
import { WhatsAppHub } from "@/components/product/whatsapp-hub"
import {
  WhatsAppCapabilities,
  WhatsAppProblem,
  WhatsAppSteps,
  WhatsAppStyles,
  WhatsAppUseCases,
  WhatsAppWhyItWorks,
  WhatsAppWhySmsLocal,
} from "@/components/product/whatsapp-sections"
import { WhatsAppMotion } from "@/components/product/whatsapp-motion"

export const metadata: Metadata = getPageMetadata("/channels/whatsapp")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "Official Business API" },
  { icon: BadgeCheck, label: "Verified sender" },
  { icon: Bot, label: "AI answers automatically" },
  { icon: LayoutList, label: "Templates, media, buttons" },
]

const FAQ = [
  {
    q: "Is this the official WhatsApp Business API?",
    a: "Yes. SMSLocal is a WhatsApp Business Solution Provider (BSP) using the official API. Your sender is verified, your quality rating is monitored, and your messages go through Meta's infrastructure, not a grey route.",
  },
  {
    q: "Can AI automatically answer WhatsApp chats?",
    a: "Yes. The agentic AI answers from your knowledge base, catalog and policies automatically. When a conversation needs a human, it hands off in the same WhatsApp thread with full context attached.",
  },
  {
    q: "Can I send broadcasts on WhatsApp?",
    a: "Yes. See WhatsApp Broadcasting for outbound campaigns with templates, media and buttons, sent to opted-in contacts at scale.",
  },
  {
    q: "What are WhatsApp message templates and why do they need approval?",
    a: "Templates are pre-approved message formats you use to start a conversation or message a customer outside the 24-hour customer service window, such as order updates, reminders and offers. Meta reviews each template, and SMSLocal helps you submit and manage them.",
  },
  {
    q: "What is the 24-hour customer service window?",
    a: "When a customer messages you, you can reply freely for 24 hours. After that window closes, you need an approved template to message them again. SMSLocal tracks the window in the shared inbox so your team and AI always know which reply type is allowed.",
  },
  {
    q: "Do I need customer opt-in to message on WhatsApp?",
    a: "Yes. WhatsApp requires that customers have opted in to hear from your business. SMSLocal helps you record and respect opt-ins so campaigns only reach people who agreed to receive them.",
  },
  {
    q: "How do I get started with the WhatsApp Business API in India?",
    a: "Connect your business phone number and Meta Business account, verify your sender profile and submit your first templates. SMSLocal's team guides the onboarding, and you can go live with two-way chats and AI replies once templates are approved.",
  },
]

const RELATED = [
  { href: "/channels/instagram/", label: "Instagram DM automation", hint: "DMs, story replies and comment-to-DM" },
  { href: "/products/rcs/", label: "RCS business messaging", hint: "Verified, branded rich cards" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
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
      <FaqJsonLd items={FAQ} path="/channels/whatsapp" />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_620px] lg:gap-8 lg:pb-20 lg:pt-12">
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

        <WhatsAppProblem />
        <WhatsAppCapabilities />
        <WhatsAppSteps />
        <WhatsAppUseCases />
        <WhatsAppWhyItWorks />
        <WhatsAppWhySmsLocal />
        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <GsFinalCta />
        <WhatsAppStyles />
        <WhatsAppMotion />
      </main>
      <SiteFooter />
    </>
  )
}

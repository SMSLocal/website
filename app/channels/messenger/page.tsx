import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, Bot, Inbox, MessageCircle, Radio, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { MessengerPhone } from "@/components/product/messenger-phone"
import { Section, StatsBand } from "@/components/product/product-page"
import {
  MessengerCapabilities,
  MessengerProblem,
  MessengerQA,
  MessengerStyles,
  MessengerSteps,
  MessengerWhyItWorks,
  MessengerWhySmsLocal,
} from "@/components/product/messenger-sections"
import { WhatsAppMotion } from "@/components/product/whatsapp-motion"

export const metadata: Metadata = getPageMetadata("/channels/messenger")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MessageCircle, label: "Automated replies" },
  { icon: Bot, label: "AI agent handoff" },
  { icon: Radio, label: "Opted-in broadcasts" },
  { icon: Inbox, label: "One shared inbox" },
]

const FAQ = [
  {
    q: "Can I automate replies on Facebook Messenger?",
    a: "Yes. SMSLocal sends a greeting to first-time senders, an away message outside working hours and instant answers to your FAQs, so a Page inbox is covered even when nobody is watching it.",
  },
  {
    q: "Does the same AI agent that answers WhatsApp work on Messenger?",
    a: "Yes. Your AI agent runs across every connected channel, including WhatsApp, Messenger, Instagram and SMS, grounded in the same catalog, order and FAQ data, with the same handoff rules to a human agent.",
  },
  {
    q: "Can I broadcast to my Messenger subscribers?",
    a: "Yes, within Meta's Messenger messaging rules for opted-in subscribers. Broadcasts run from the same campaign tool as your WhatsApp and SMS sends, so you plan one calendar instead of three.",
  },
  {
    q: "What happens when a Messenger conversation needs a human?",
    a: "The AI agent hands the conversation to your team instantly, with the full message history and any customer or order context attached, so the human agent never starts from a blank screen.",
  },
  {
    q: "Do Messenger chats show up in the same inbox as our other channels?",
    a: "Yes. Messenger lands in the same shared inbox as WhatsApp, Instagram, SMS and email, with the same routing, assignment and reporting rules applied across channels.",
  },
  {
    q: "Can I connect more than one Facebook Page?",
    a: "Yes. If you manage several Pages, such as separate brands, regions or storefronts, connect them all and their Messenger conversations appear in one dashboard, so your team isn't logging in and out of different accounts.",
  },
  {
    q: "How do I connect Facebook Messenger to SMSLocal?",
    a: "Sign up, choose Messenger, log in with Facebook and approve access for your Page. Then set your greeting, add your FAQs and switch on the AI agent. You can add more Pages at any time.",
  },
]

const RELATED = [
  { href: "/channels/instagram/", label: "Instagram DM automation", hint: "DMs, story replies and comment-to-DM" },
  { href: "/channels/social/", label: "Social media inbox", hint: "Instagram and Messenger in one place" },
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
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
      <FaqJsonLd items={FAQ} path="/channels/messenger" />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
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
              <div className="ms-float"><MessengerPhone /></div>
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

        <MessengerProblem />
        <MessengerCapabilities />
        <MessengerSteps />
        <MessengerQA />
        <MessengerWhyItWorks />
        <MessengerWhySmsLocal />
        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <GsFinalCta />
        <MessengerStyles />
        <WhatsAppMotion />
      </main>
      <SiteFooter />
    </>
  )
}

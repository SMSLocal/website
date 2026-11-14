import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Camera,
  MessageCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { InstagramHero } from "@/components/product/instagram-hero"
import { ProductFinalCta, Section, StatsBand } from "@/components/product/product-page"
import {
  InstagramCompare,
  InstagramFeatures,
  InstagramProblem,
  InstagramSteps,
  InstagramStyles,
  InstagramUseCases,
  InstagramWhyItWorks,
} from "@/components/product/instagram-sections"

export const metadata: Metadata = getPageMetadata("/channels/instagram")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MessageCircle, label: "DM automation" },
  { icon: Camera, label: "Story-reply capture" },
  { icon: Bot, label: "AI agent replies" },
  { icon: ShoppingBag, label: "Catalog & product tags" },
]

const FAQ = [
  {
    q: "Can I automate replies to Instagram story mentions and comments?",
    a: "Yes. Set a trigger keyword, or capture every reply automatically, so anyone who replies to your story or comments on a post gets pulled into a DM conversation, where automation or your AI agent can take over from there.",
  },
  {
    q: "Does the same AI agent that answers WhatsApp work on Instagram?",
    a: "Yes. Your AI agent runs across every connected channel, including WhatsApp, Instagram and SMS, grounded in the same catalog, order and FAQ data, with a consistent handoff to a human agent when needed.",
  },
  {
    q: "Can customers buy directly from a DM?",
    a: "You can tag products from your catalog in a DM reply so the customer sees pricing and a direct link without leaving Instagram. This is useful for D2C brands turning story and comment traffic into sales.",
  },
  {
    q: "Do Instagram conversations show up in the same inbox as our other channels?",
    a: "Yes. Instagram DMs land in the same shared inbox as WhatsApp, SMS and email, with routing, assignment and reporting that treat every channel the same way.",
  },
  {
    q: "What is Instagram DM automation?",
    a: "Instagram DM automation means automatic replies to direct messages: greetings, answers to common questions, quick-reply buttons and AI-written responses. It lets a small team respond to every message quickly without typing each reply by hand.",
  },
  {
    q: "What do I need to connect Instagram to SMSLocal?",
    a: "An Instagram professional (business or creator) account that you can link through Meta. SMSLocal guides the connection, and once it is live your DMs, story replies and comment triggers flow into the shared inbox.",
  },
  {
    q: "Is Instagram DM automation allowed by Meta?",
    a: "Yes, when it runs through Meta's official Instagram messaging integration and follows its messaging rules, such as replying within the allowed messaging window and respecting customers' choices. SMSLocal builds on that official route.",
  },
  {
    q: "How does comment-to-DM work?",
    a: "You pick a keyword such as PRICE or LINK. When someone comments it on a post or reel, SMSLocal sends them a DM automatically with the answer or product link, and the conversation continues in your shared inbox.",
  },
]

const RELATED = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/channels/messenger/", label: "Facebook Messenger", hint: "Automated and AI-handled conversations" },
  { href: "/channels/social/", label: "Social media inbox", hint: "Instagram and Messenger in one place" },
  { href: "/channels/web-chat/", label: "Website live chat widget", hint: "AI chat for every visitor" },
]

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
      <FaqJsonLd items={FAQ} path="/channels/instagram" />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_540px] xl:grid-cols-[1fr_700px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="ig-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels · Instagram
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Instagram DMs, <span className="text-primary">answered like WhatsApp.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Turn story replies and comments into DMs, answer them with your AI agent, and manage every conversation in the same inbox as WhatsApp and SMS.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Connect Instagram <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to Sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="ig-rise" style={{ animationDelay: "0.15s" }}>
              <InstagramHero />
            </div>
          </div>
          <style>{`
            @keyframes ig-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .ig-rise { animation: ig-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .ig-rise { animation: none } }
          `}</style>
        </section>

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

        <InstagramProblem />
        <InstagramFeatures />
        <InstagramSteps />
        <InstagramUseCases />
        <InstagramWhyItWorks />
        <InstagramCompare />
        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <InstagramStyles />

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

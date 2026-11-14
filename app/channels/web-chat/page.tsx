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
import { ExploreMore } from "@/components/product/explore-more"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { WebChatHero } from "@/components/product/webchat-hero"
import { Section, StatsBand } from "@/components/product/product-page"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import {
  WebChatFeatures,
  WebChatProblem,
  WebChatSteps,
  WebChatStyles,
  WebChatUseCases,
  WebChatWhyItWorks,
  WebChatWhySmsLocal,
} from "@/components/product/webchat-sections"

export const metadata: Metadata = getPageMetadata("/channels/web-chat")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: Palette, label: "Customizable widget" },
  { icon: Sparkles, label: "AI answers before an agent" },
  { icon: MousePointerClick, label: "Proactive triggers" },
  { icon: Code2, label: "In-app SDK chat" },
]

const FAQ = [
  {
    q: "What is a website live chat widget?",
    a: "A website live chat widget is a small chat window on your site where visitors can ask questions and get answers in real time. With SMSLocal the widget is answered by an agentic AI first and hands off to your team when a person is needed.",
  },
  {
    q: "Can I customize the widget?",
    a: "Yes. Colors, position and prechat forms all match your brand, so the widget feels like a native part of your site, not a third-party plugin.",
  },
  {
    q: "Does AI answer in the widget?",
    a: "Yes. The agentic AI answers common questions instantly from your knowledge base, and hands off to an agent in the same thread when a conversation needs a person.",
  },
  {
    q: "How do I install the chat widget on my website?",
    a: "Add a single script to your site, brand the widget, connect your knowledge base and set your triggers. The widget goes live without rebuilding any pages, and chats arrive in your shared inbox.",
  },
  {
    q: "Can I start a chat proactively when a visitor is on a page?",
    a: "Yes. Proactive triggers let you greet visitors based on behavior, such as time on a page, scroll depth or the page they landed on, so the chat starts at the moment they are most likely to need help.",
  },
  {
    q: "Is there an in-app option, not just the website?",
    a: "Yes. The SDK embeds the same chat experience inside your product, so logged-in users get support without ever leaving the app.",
  },
  {
    q: "Can the chat capture leads?",
    a: "Yes. A prechat form can collect a visitor's name and email before the conversation starts, and the full chat is saved against their customer record.",
  },
  {
    q: "Do web chats show up with my WhatsApp and SMS conversations?",
    a: "Yes. Web chat lands in the same shared inbox as WhatsApp, SMS and voice, with one customer record, so your team never has to switch tools to see the full history.",
  },
]

const RELATED = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/channels/messenger/", label: "Facebook Messenger", hint: "Automated and AI-handled conversations" },
  { href: "/channels/social/", label: "Social media inbox", hint: "Instagram and Messenger in one place" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
]

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
      <FaqJsonLd items={FAQ} path="/channels/web-chat" />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1fr_600px] lg:gap-10 lg:pb-20 lg:pt-12 xl:grid-cols-[1fr_700px]">
            <div className="wc-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels · Web Chat
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Website chat with <span className="text-primary">agentic AI built in.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                A customizable chat widget that answers visitors instantly and converts them, powered by agentic AI.
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
            <div className="wc-rise lg:h-full" style={{ animationDelay: "0.15s" }}>
              <WebChatHero />
            </div>
          </div>
          <style>{`
            @keyframes wc-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .wc-rise { animation: wc-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .wc-rise { animation: none } }
          `}</style>
        </section>

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

        <WebChatProblem />
        <WebChatFeatures />
        <WebChatSteps />
        <WebChatUseCases />
        <WebChatWhyItWorks />
        <WebChatWhySmsLocal />
        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <WebChatStyles />

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <GsFinalCta />
      </main>
      <SiteFooter />
    </>
  )
}

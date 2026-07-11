import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  CheckCheck,
  GraduationCap,
  Layers,
  MessageCircle,
  MoonStar,
  ShoppingBag,
  Sparkles,
  Tag,
  Utensils,
  Webhook,
  Workflow,
  Zap,
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
import { FinalCtaBoxless } from "@/components/shared/final-cta-boxless"
import { AutomationChatbotWidget, AutomationVisual } from "@/components/lazy"
import { AutomationTestimonials } from "@/components/product/automation-testimonials"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/automation")

const INTEGRATIONS = [
  { name: "Shopify", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { name: "WooCommerce", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
  { name: "BigCommerce", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  { name: "HubSpot", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { name: "Slack", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { name: "Zapier", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { name: "Stripe", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  { name: "Twilio", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  { name: "Zendesk", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
  { name: "+ 30 more", color: "bg-muted text-muted-foreground border-border" },
]

const AUTOMATION_FEATURES = [
  {
    icon: Tag,
    title: "Auto Reply Rules",
    body: "Set up keyword-based rules in seconds. When a customer's message matches, the right answer goes out immediately — day or night.",
    bullets: ["Keyword & phrase matching", "Multiple trigger conditions", "Works on every channel"],
  },
  {
    icon: MoonStar,
    title: "Away Message",
    body: "Set your business hours once. Outside them, customers get an instant, friendly acknowledgement instead of silence.",
    bullets: ["Custom business hours", "Per-channel scheduling", "Threads queued for morning"],
  },
  {
    icon: MessageCircle,
    title: "First Response",
    body: "Acknowledge every new message the moment it lands, then let an agent take over when the conversation needs a human touch.",
    bullets: ["Instant acknowledgement", "Seamless agent handoff", "Full context preserved"],
  },
  {
    icon: Sparkles,
    title: "AI Chatbot",
    body: "Build AI-powered conversations trained on your own knowledge base — no code required.",
    bullets: ["No-code builder", "Knowledge-base training", "Human agent handoff"],
  },
]

const USE_CASES = [
  {
    icon: ShoppingBag,
    industry: "E-commerce",
    body: "Order updates, return requests, and shipping queries handled automatically — before a human even sees the thread.",
  },
  {
    icon: Activity,
    industry: "Healthcare",
    body: "Appointment reminders, FAQ responses, and patient intake flows — built with HIPAA-aware data handling.",
  },
  {
    icon: Layers,
    industry: "SaaS",
    body: "Trial onboarding, feature questions, and upgrade nudges run on autopilot while your team focuses on high-value accounts.",
  },
  {
    icon: Building2,
    industry: "Real Estate",
    body: "Lead capture, tour scheduling, and follow-up sequences without a single manual step.",
  },
  {
    icon: GraduationCap,
    industry: "Education",
    body: "Enrollment queries, deadline reminders, and student support answered at any hour — even after office hours.",
  },
  {
    icon: Utensils,
    industry: "Restaurants",
    body: "Reservations, order status, and review responses handled in seconds, not hours.",
  },
]


export default function AutomationPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Automation — Conversation Automation Platform"
        description="A complete conversation automation platform: auto-reply rules, an AI chatbot trained on your knowledge base, a no-code workflow builder, REST API, webhooks, and human handoff."
        path="/products/automation"
        category="Customer conversation automation and AI chatbot software"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Automation", path: "/products/automation" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        {/* 1 ─ Hero */}
        <ProductHero
          compact
          eyebrow="SMSLocal Automation"
          title={
            <>
              Automate conversations.
              <br />
              Reply instantly. Scale support.
            </>
          }
          subtitle="Create smart workflows, automate repetitive replies, and let AI handle customer conversations while your team focuses on the conversations that matter."
          primaryCta={{ label: "Try Lite Free", href: "/signup/" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
          trustBar={[
            { icon: Zap, label: "Trigger → reply in 0.4s" },
            { icon: Bot, label: "AI trained on your knowledge base" },
            { icon: Workflow, label: "No-code workflow builder" },
            { icon: Webhook, label: "REST API + webhooks" },
          ]}
          visual={<AutomationVisual />}
          compact
        />

        {/* 2 ─ Automation Features */}
        <Section tone="muted" screenHeight>
          <SectionHeader
            center
            eyebrow="Automation features"
            title="Everything you need to automate support."
            subtitle="From keyword-triggered replies to full AI conversations — set it up once and let it run."
          />
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AUTOMATION_FEATURES.map(({ icon: Icon, title, body, bullets }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                  <ul className="mt-2.5 space-y-1">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-1.5 text-[12px] font-medium text-foreground">
                        <CheckCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 6 ─ Integrations */}
        <Section>
          <SectionHeader
            center
            eyebrow="Integrations"
            title="Works with your existing stack."
            subtitle="Connect SMSLocal to the tools you already use — e-commerce platforms, CRMs, helpdesks, payment processors, and more."
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {INTEGRATIONS.map((int) => (
              <span
                key={int.name}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-semibold ${int.color}`}
              >
                {int.name}
              </span>
            ))}
          </div>
        </Section>

        {/* 7 ─ Developer automation */}
        <Section
          screenHeight
          className="[background:linear-gradient(135deg,oklch(0.18_0.04_260),oklch(0.14_0.06_200),oklch(0.12_0.04_240))] text-white"
        >
          <SectionHeader
            dark
            eyebrow="For developers"
            title="Powerful automation for developers too."
            subtitle="Drive conversations programmatically with a clean REST API and real-time webhooks — build automations that live anywhere in your stack."
          />
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Create conversations", value: "POST /v1/conversations" },
              { label: "Send messages", value: "POST /v1/messages" },
              { label: "Manage contacts", value: "POST /v1/contacts" },
              { label: "Webhook", value: "conversation.created" },
              { label: "Webhook", value: "message.received" },
              { label: "Webhook", value: "status.changed" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">{item.label}</p>
                <p className="mt-2 font-mono text-[13px] text-white/85">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="/developers/api-docs/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline">
              View API docs <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Section>

        {/* 8 ─ Use cases */}
        <Section tone="muted" screenHeight>
          <SectionHeader
            center
            eyebrow="Use cases"
            title="Built for every team that talks to customers."
            subtitle="Whether you run a storefront, a clinic, or a SaaS product — SMSLocal Automation fits how your team already works."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map(({ icon: Icon, industry, body }) => (
              <div
                key={industry}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-foreground">{industry}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 9 ─ Customer stories */}
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
              eyebrow="Customer stories"
              title="Teams that switched to smarter support."
              subtitle="Real results from support leads, founders, and ops managers who automated their front line."
            />
            <AutomationTestimonials />
          </Section>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <RelatedContent path="/products/automation" />

        {/* 10 ─ Final CTA */}
        <div className="py-4">
          <FinalCtaBoxless
            title="Turn every conversation into an automated workflow."
            subtitle="Start with smart replies today and scale customer support with automation and AI."
            primaryCta={{ label: "Start Free Trial", href: "/signup/" }}
            secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
          />
        </div>
      </main>
      <SiteFooter />

      {/* Interactive demo chatbot — fixed bottom-right */}
      <AutomationChatbotWidget />
    </>
  )
}



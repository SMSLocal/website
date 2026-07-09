import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  ArrowRightLeft,
  Bot,
  Cog,
  Gauge,
  Plug,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/services/ai-consulting")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function AiConsultingVisual() {
  const phases = [
    { label: "Discovery", detail: "Map your flows, data, and success metrics" },
    { label: "Build", detail: "Configure agents, integrations, and handoffs" },
    { label: "Tune", detail: "Optimise on real conversations, ongoing" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Wrench className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Done-for-you delivery
          </span>
        </div>
        <dl className="mt-2 flex flex-col gap-3">
          {phases.map((p) => (
            <div key={p.label} className="flex flex-col gap-0.5 text-[13px]">
              <dt className="font-medium text-white/90">{p.label}</dt>
              <dd className="text-white/60">{p.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-1.5">
          <ArrowRightLeft className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Migrating from another platform?
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/85">
          We move your flows, templates, and history over — no starting from a blank canvas.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <UserCheck className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          A dedicated onboarding specialist for enterprise accounts
        </span>
      </div>
    </div>
  )
}

export default function AiConsultingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "AI Consulting", path: "/services/ai-consulting" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Services · AI Consulting"
          title={
            <>
              Agentic AI Consulting
              <br className="hidden sm:block" /> and Onboarding
            </>
          }
          subtitle="From proof-of-concept to production, we help you launch agentic AI that works."
          primaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          trustBar={[
            { icon: Bot, label: "Full AI agent implementation" },
            { icon: ArrowRightLeft, label: "Migration from other platforms" },
            { icon: Plug, label: "Custom CRM & ERP integrations" },
            { icon: UserCheck, label: "Dedicated onboarding specialist" },
          ]}
          visual={<AiConsultingVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Expert help to get live faster.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "1 team",  label: "Dedicated specialist for your whole implementation" },
              { value: "8 langs", label: "AI agents configured in Indian languages you need" },
              { value: "Custom",  label: "Integrations built for your exact CRM, ERP, or store" },
              { value: "Ongoing", label: "Agent tuning continues after go-live, not just at launch" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Self-serve is great — until your setup gets complex"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Most businesses can get an AI agent running on SMSLocal in an afternoon. But enterprise
              accounts often need more: migrating years of flows and templates off another platform,
              wiring the agent into a CRM or ERP that has no off-the-shelf connector, or getting an
              agent's tone and accuracy tuned against thousands of real conversations before it can
              be trusted with your highest-volume channel. That's not a self-serve problem — it's a
              professional-services one, and it's what our AI Consulting team does.
            </p>
          </div>
        </Section>

        {/* ── WHAT WE DO ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What we do"
          title="A dedicated team, not a support ticket"
          subtitle="Every engagement is scoped to your business — from scoping use cases to ongoing optimization, delivered by people who build agents for a living."
          items={[
            {
              icon: Sparkles,
              title: "Scope use cases",
              body: "Identify the high-impact agentic AI use cases for your business, so the first thing you launch is the thing that actually moves the needle.",
            },
            {
              icon: Bot,
              title: "Build and train",
              body: "Set up and train your first agents on your data — conversation flows, escalation rules, and knowledge base connected end to end.",
            },
            {
              icon: Plug,
              title: "Connect your stack",
              body: "Integrate your CRM, helpdesk, and commerce tools so every agent conversation has real customer context, not a blank slate.",
            },
            {
              icon: UserCheck,
              title: "Onboard your team",
              body: "Get your people productive on the platform quickly, with a named specialist guiding planning, configuration, testing, and go-live.",
            },
            {
              icon: Gauge,
              title: "Optimize",
              body: "Tune the agents after launch based on real results — refining prompts and escalation rules as your product and policies evolve.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="You skip the trial-and-error and launch from day one"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                You skip the trial-and-error and launch agentic AI that delivers from day one, with
                a team that knows the platform. After go-live, we keep reviewing real conversations,
                refining prompts and escalation rules, and adjusting for new products or policies —
                so language understanding, accuracy, and containment keep improving instead of
                drifting once the initial project wraps.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Cog className="h-5 w-5" />,     label: "Ongoing agent tuning",     desc: "Prompts and flows refined against real conversation data" },
                { icon: <Gauge className="h-5 w-5" />,    label: "Performance reviews",      desc: "Regular check-ins on containment, CSAT, and escalation rates" },
                { icon: <Sparkles className="h-5 w-5" />, label: "New use cases added",      desc: "We extend agents to new flows as your business grows" },
                { icon: <Plug className="h-5 w-5" />,     label: "Integration maintenance",  desc: "Custom connectors stay supported as your other systems change" },
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
              The same platform your team already uses, backed by real experts
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              AI Consulting isn't a separate product — it's the fastest way onto the same agentic
              AI and agent builder your team will run day to day, configured correctly from the
              start instead of learned by trial and error.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agentic AI
              </Link>
              <Link
                href="/products/ai-agents/agent-builder/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agent Builder
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Who is AI Consulting for?",
              a: "Enterprise and high-volume accounts that need more than self-serve setup — teams migrating off another platform, integrating AI agents into a CRM or ERP with no off-the-shelf connector, or wanting a dedicated specialist to own the rollout.",
            },
            {
              q: "Can you migrate us from a different chatbot or WhatsApp BSP?",
              a: "Yes. We map your existing flows, templates, and conversation history and rebuild them on SMSLocal, so you're not starting your AI agent from a blank canvas.",
            },
            {
              q: "What kind of custom integrations do you build?",
              a: "Anything from CRM and helpdesk connectors to e-commerce platforms and ERPs — if there's no existing integration, our engineers build one so your agents have full customer context.",
            },
            {
              q: "Does tuning continue after the agent goes live?",
              a: "Yes. Our team reviews real conversations after launch and keeps refining prompts, escalation rules, and flows as your product and policies evolve — it's an ongoing part of the engagement, not a one-time setup.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/",              label: "Explore agentic AI on SMSLocal" },
                { href: "/products/ai-agents/agent-builder/",  label: "Agent Builder — build your first agent" },
                { href: "/platform/security/",                 label: "See the platform and security" },
                { href: "/company/contact/",                   label: "Talk to an AI consulting specialist" },
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
          title="Launch agentic AI with expert help."
          subtitle="Scoping, build, integration, onboarding, and ongoing optimization — talk to sales and get a scoped plan for your business."
          primaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

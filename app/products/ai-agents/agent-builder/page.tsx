import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
    ArrowRight,
    Bot,
    Check,
    Code2,
    GitBranch,
    MousePointerClick,
    Rocket,
    ShieldCheck,
    Users,
    Webhook,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
    CapabilityGrid,
    Faq,
    HowItWorks,
    ProductFinalCta,
    ProductHero,
    Section,
    SectionHeader,
    TechnicalBlock,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/ai-agents/agent-builder")

/* ── Simple hero visual ────────────────────────────────────────────────────── */
function AgentBuilderVisual() {
    return (
        <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            {/* Flow canvas mockup */}
            <div className="w-full max-w-sm space-y-3">
                {[
                    { label: "Train on your data", icon: Bot, done: true },
                    { label: "Add logic & branching", icon: GitBranch, done: true },
                    { label: "Set human handoff", icon: Users, done: true },
                    { label: "Deploy to every channel", icon: Rocket, active: true },
                ].map((step, i) => {
                    const Icon = step.icon
                    return (
                        <div
                            key={i}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${step.active
                                    ? "border-primary/60 bg-primary/10 text-white shadow-lg shadow-primary/10"
                                    : "border-white/10 bg-white/5 text-white/70"
                                }`}
                        >
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${step.active ? "bg-primary text-primary-foreground" : "bg-white/10 text-white/60"
                                    }`}
                            >
                                {step.done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                            </span>
                            {step.label}
                            {step.active && (
                                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                                    Live
                                </span>
                            )}
                        </div>
                    )
                })}

                {/* Channel chips */}
                <div className="mt-5 flex flex-wrap gap-2 pt-2">
                    {["WhatsApp", "Web", "SMS", "Voice", "Social"].map((ch) => (
                        <span
                            key={ch}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/60"
                        >
                            {ch}
                        </span>
                    ))}
                </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-3 -top-3 flex items-center gap-1.5 rounded-full border border-primary/30 bg-[oklch(0.14_0.02_230)] px-3 py-1.5 text-[11px] font-semibold text-primary shadow-lg">
                <Zap className="h-3 w-3" />
                No code required
            </div>
        </div>
    )
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function AgentBuilderPage() {
    return (
        <>
            <ProductServiceJsonLd
                name="SMSLocal AI Agent Builder"
                description="A visual, no-code builder to create, train, and launch agentic AI agents across every channel — WhatsApp, web, SMS, voice, and social."
                path="/products/ai-agents/agent-builder"
                category="AI Agent Builder"
            />
            <BreadcrumbJsonLd
                crumbs={[
                    { name: "Home", path: "/" },
                    { name: "AI Agents", path: "/products/ai-agents" },
                    { name: "Agent Builder", path: "/products/ai-agents/agent-builder" },
                ]}
            />

            <SiteHeader />

            <main>
                {/* ── Hero ── */}
                <ProductHero
                  compact
                    eyebrow="SMSLocal — AI Agent Builder"
                    title={<>Build Your Agentic AI Agent Without Code</>}
                    subtitle="A visual, no-code builder to create, train, and launch agentic AI agents across every channel."
                    primaryCta={{ label: "Build Your AI Agent", href: "/signup" }}
                    secondaryCta={{ label: "Get a Demo", href: "/company/contact" }}
                    trustBar={[
                        { icon: MousePointerClick, label: "No-code, point and click" },
                        { icon: Bot, label: "Trained on your data" },
                        { icon: GitBranch, label: "Logic, branching, and handoff" },
                        { icon: Rocket, label: "Deploys to every channel" },
                    ]}
                    visual={<AgentBuilderVisual />}
                />

                {/* ── Trust line under hero ── */}
                <div className="border-b border-border bg-muted/40 py-4 text-center text-sm text-muted-foreground">
                    From idea to live agent in days — no developers required.
                </div>

                {/* ── Results strip / capabilities ── */}
                <CapabilityGrid
                    eyebrow="What you get"
                    title="Everything to build a real AI agent — no engineering ticket required"
                    subtitle="Four capabilities that take you from a blank canvas to a live, agentic AI agent on every channel."
                    items={[
                        {
                            icon: MousePointerClick,
                            title: "No-code, point and click",
                            body: "A visual drag-and-drop canvas lets anyone on your team build, edit, and iterate on the agent — no pull requests, no waiting.",
                        },
                        {
                            icon: Bot,
                            title: "Trained on your data",
                            body: "Connect your help center, PDFs, product catalog, and website so the agent answers from your actual business, not generic LLM guesses.",
                        },
                        {
                            icon: GitBranch,
                            title: "Logic, branching, and handoff",
                            body: "Set triggers, conditions, branching paths, delays, and human-handoff steps. The agent follows your playbook, every time.",
                        },
                        {
                            icon: Rocket,
                            title: "Deploys to every channel",
                            body: "One agent, published across WhatsApp, web chat, SMS, voice, and social — managed from a single inbox and dataset.",
                        },
                    ]}
                />

                {/* ── The Problem ── */}
                <Section tone="muted">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                            The problem
                        </span>
                        <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                            Most teams wait weeks just to launch a bot
                        </h2>
                        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                            Most teams need engineering help to launch a real AI agent, which means weeks of waiting
                            and a backlog of requests. SMSLocal puts the builder in the hands of the people who own
                            the customer experience — so the people who know your customers best can build and refine
                            the agent directly, without waiting on an engineering sprint.
                        </p>
                    </div>
                </Section>

                {/* ── How it works ── */}
                <HowItWorks
                    eyebrow="How it works"
                    title="From blank canvas to live agent in three steps"
                    subtitle="No developer handoff. No sprint planning. Just build, test, and deploy."
                    steps={[
                        {
                            title: "Train on your data",
                            body: "Connect your help center, PDFs, product catalog, and website so the agent answers from your business — not generic AI.",
                        },
                        {
                            title: "Add logic and guardrails",
                            body: "Set triggers, conditions, branching, delays, and human-handoff steps in a visual flow. Your agent follows your rules.",
                        },
                        {
                            title: "Test and launch",
                            body: "Preview the agent end-to-end, then deploy to WhatsApp, web, SMS, voice, and social in clicks.",
                        },
                    ]}
                />

                {/* ── Go Deeper ── */}
                <TechnicalBlock
                    eyebrow="For teams that need more"
                    title="A REST API and webhooks when you outgrow the canvas"
                    subtitle="Start no-code. Add custom steps whenever you need them — the builder scales from a simple FAQ bot to a full agentic workflow."
                    items={[
                        { label: "REST API", value: "Custom steps and integrations for any workflow" },
                        { label: "Webhooks", value: "Trigger external systems from any point in the flow" },
                        { label: "Human handoff", value: "Route to a live agent with full conversation context" },
                        { label: "Multi-channel", value: "WhatsApp · Web · SMS · Voice · Social" },
                        { label: "Shared inbox", value: "All channels, one inbox, one dataset" },
                        { label: "Docs", value: "/developers/api-docs" },
                    ]}
                    cta={{ label: "View API docs", href: "/developers/api-docs" }}
                />

                {/* ── Why it works + Why SMSLocal ── */}
                <Section tone="light">
                    <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
                        {/* Why it works */}
                        <div>
                            <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                Why it works
                            </span>
                            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                                The people who know your customers build the agent
                            </h2>
                            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                                When your support lead or product manager can build and refine the agent directly,
                                it improves fast and never waits on an engineering sprint. The loop is tight —
                                real feedback, real iteration, real results.
                            </p>
                        </div>

                        {/* Why SMSLocal */}
                        <div>
                            <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                Why SMSLocal
                            </span>
                            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                                One builder. Every use case. Shared everywhere.
                            </h2>
                            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                                One builder produces agents for support, sales, booking, and lead qualification —
                                all sharing the same inbox, data, and guardrails. No silos, no duplicated effort,
                                no context lost between channels.
                            </p>
                            <ul className="mt-5 space-y-2.5">
                                {[
                                    "Support agents that resolve without escalating",
                                    "Sales agents that qualify and book",
                                    "Booking agents with calendar and payment hooks",
                                    "Lead agents that score and route",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* ── FAQ ── */}
                <Faq
                    eyebrow="FAQs"
                    title="Agent Builder — the common questions"
                    items={[
                        {
                            q: "Do I need to code?",
                            a: "No. The builder is fully no-code — drag, drop, connect, and publish. A REST API and webhooks are available when you want custom steps.",
                        },
                        {
                            q: "Can the agent take actions, not just answer questions?",
                            a: "Yes. Add API and webhook steps to trigger external systems — bookings, CRM updates, payment flows, and more. That's what makes it agentic.",
                        },
                        {
                            q: "How fast can I launch?",
                            a: "Most teams go live in days. You can preview the agent before deploying, so there's no guesswork.",
                        },
                        {
                            q: "Which channels does it deploy to?",
                            a: "WhatsApp, web chat, SMS, voice, and social — all from a single build, sharing the same inbox and dataset.",
                        },
                        {
                            q: "What data can I train the agent on?",
                            a: "Your help center, PDFs, product catalog, website pages, and any document you upload. The agent answers from your business, not generic AI.",
                        },
                        {
                            q: "Can a human take over mid-conversation?",
                            a: "Yes. Human handoff is a first-class step in the builder — the agent routes to a live agent with full conversation context intact.",
                        },
                    ]}
                />

                <RelatedContent path="/products/ai-agents/agent-builder" />

                {/* ── Final CTA ── */}
                <ProductFinalCta
                    title="Build and launch your agent this week."
                    subtitle="No developers required. From idea to live agent in days."
                    primaryCta={{ label: "Build Your AI Agent", href: "/signup" }}
                    secondaryCta={{ label: "Get a Demo", href: "/company/contact" }}
                />
            </main>

            <SiteFooter />
        </>
    )
}
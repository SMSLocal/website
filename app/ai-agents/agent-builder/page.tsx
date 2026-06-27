import type { Metadata } from "next"
import { Brain, Code2, Rocket, Workflow } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { AgentLanding, type AgentLandingData } from "@/components/product/agent-landing"
import { AgentBuilderVisual } from "@/components/product/agent-visuals"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  titleAbsolute: "No-Code Agentic AI Agent Builder | SMSLocal",
  description:
    "Create, train, and launch agentic AI agents without code. Ground them in your data, add logic and handoff, and deploy across every channel.",
  path: "/ai-agents/agent-builder",
  keywords: [
    "agentic AI agent builder",
    "no-code AI agent builder",
    "build AI chatbot no code",
    "AI agent platform India",
    "visual AI flow builder",
  ],
})

const DATA: AgentLandingData = {
  eyebrow: "AI Agents · Agent Builder",
  title: (
    <>
      Build your agentic AI agent{" "}
      <span className="text-primary">without code</span>
    </>
  ),
  subtitle:
    "A visual, no-code builder to create, train, and launch agentic AI agents across every channel — grounded in your data, with logic, guardrails, and human handoff built in.",
  trustLine: "From idea to live agent in days, no developers required.",
  visual: <AgentBuilderVisual />,
  primaryCta: { label: "Build your AI agent", href: "/signup" },
  secondaryCta: { label: "Get a demo", href: "/company/contact" },
  results: [
    "No-code, point and click",
    "Trained on your data",
    "Logic, branching & handoff",
    "Deploys to every channel",
  ],
  problem: {
    title: "You shouldn't need an engineering sprint to launch an agent",
    body: "Most teams need engineering help to launch a real AI agent — which means weeks of waiting and a backlog of requests behind every change. SMSLocal puts the builder in the hands of the people who actually own the customer experience, so the agent ships this week and improves the moment you spot something to fix.",
  },
  doesTitle: "Train, build, and launch — in a visual flow",
  features: [
    {
      icon: Brain,
      title: "1. Train on your data",
      body: "Connect your help center, PDFs, product catalog, and website so the agent answers from your business — not generic web data.",
    },
    {
      icon: Workflow,
      title: "2. Add logic and guardrails",
      body: "Set triggers, conditions, branching, delays, and human-handoff steps in a visual flow — no code, full control over what the agent can do.",
    },
    {
      icon: Rocket,
      title: "3. Test and launch",
      body: "Preview the agent end to end, then deploy to WhatsApp, web, SMS, voice, and social in a few clicks.",
    },
    {
      icon: Code2,
      title: "Go deeper when you need to",
      body: "A REST API and signed webhooks are there for custom steps and integrations — so the builder scales from a simple bot to a full agentic workflow.",
    },
  ],
  whyItWorks: {
    title: "The people who know your customers build the agent",
    points: [
      { label: "Owned by your team", body: "The people who know your customers build and refine the agent directly." },
      { label: "Improves fast", body: "Changes ship the moment you spot them — no engineering sprint to wait on." },
      { label: "Always in sync", body: "Stays aligned with your real policies, catalog, and tone of voice." },
    ],
  },
  compare: {
    title: "Captain AI builder vs a dev-built bot vs a template bot",
    subtitle:
      "A dev-built bot needs engineering for every change; a rigid template bot can't ground in your data or take actions. The no-code agentic builder does both.",
    columns: ["Captain AI builder", "Dev-built bot", "Template bot"],
    rows: [
      { feature: "No code required to build and change", cells: ["yes", "no", "yes"] },
      { feature: "Trained on your data (help center, PDFs, catalog)", cells: ["yes", "partial", "partial"] },
      { feature: "Visual logic, branching, guardrails & handoff", cells: ["yes", "partial", "partial"] },
      { feature: "Deploys to every channel", cells: ["yes", "partial", "partial"] },
      { feature: "Takes real actions via API & webhooks", cells: ["yes", "yes", "no"] },
      { feature: "Live in days, no engineering sprint", cells: ["yes", "no", "partial"] },
      { feature: "One builder for support, sales, booking & leads", cells: ["yes", "no", "no"] },
    ],
    footnote: "'Dev-built bot' = a custom-coded agent; 'template bot' = a fixed, pre-built flow you can't deeply customise.",
  },
  whyUs: {
    title: "One builder for every kind of agent",
    body: "One builder produces agents for support, sales, booking, and lead qualification — all sharing the same inbox, data, and guardrails. So you start with one use case and scale to a whole agentic workflow without switching tools or re-training from scratch.",
  },
  faq: [
    { q: "Do I need to code?", a: "No. The builder is fully no-code, with a REST API and webhooks available whenever you want to add custom steps." },
    { q: "Can it take actions?", a: "Yes. Add API and webhook steps so the agent completes multi-step agentic tasks — lookups, updates, and integrations." },
    { q: "How fast can I launch?", a: "Most teams go live in days: connect your data, build the flow visually, test, and deploy across channels." },
    { q: "What can I build?", a: "Customer service, sales, booking, and lead-qualification agents — or a custom agent for your own workflow, all from the same builder." },
  ],
  finalCta: {
    title: "Build and launch your agent this week.",
    subtitle:
      "Create, train, and deploy an agentic AI agent across every channel — no code, no developers, no waiting. Start free with ₹60 credit.",
  },
  related: [
    { label: "Explore Captain AI", href: "/products/ai-agents" },
    { label: "How agentic AI works", href: "/products/ai-agentic" },
    { label: "All integrations", href: "/products/integrations" },
    { label: "Compare platforms", href: "/compare" },
  ],
}

export default function AgentBuilderPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="No-Code Agentic AI Agent Builder"
        description="A no-code builder to create, train, and launch agentic AI agents across every channel — grounded in your data, with logic, guardrails, handoff, and an API for custom steps."
        path="/ai-agents/agent-builder"
        category="agentic AI agent builder"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Agent Builder", path: "/ai-agents/agent-builder" },
        ]}
      />
      <AgentLanding data={DATA} />
    </>
  )
}

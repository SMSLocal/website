import type { Metadata } from "next"
import { Filter, MessagesSquare, Target, Workflow } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { AgentLanding, type AgentLandingData } from "@/components/product/agent-landing"
import { LeadQualificationVisual } from "@/components/product/agent-visuals"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  titleAbsolute: "Agentic AI Lead Qualification Agent for Faster Pipeline | SMSLocal",
  description:
    "Capture, qualify, and route leads automatically with an agentic AI agent that asks the right questions, scores intent, and syncs to your CRM.",
  path: "/ai-agents/lead-qualification",
  keywords: [
    "AI lead qualification agent",
    "lead qualification automation",
    "AI lead scoring",
    "WhatsApp lead capture",
    "CRM lead routing",
  ],
})

const DATA: AgentLandingData = {
  eyebrow: "AI Agents · Lead Qualification",
  title: (
    <>
      An agentic AI lead qualification agent that{" "}
      <span className="text-primary">feeds your pipeline</span>
    </>
  ),
  subtitle:
    "Capture interest, ask the right questions, score intent, and route hot leads to the right rep — automatically, the moment a lead appears, on every channel.",
  trustLine: "Built for sales teams that lose leads to slow follow-up.",
  visual: <LeadQualificationVisual />,
  primaryCta: { label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" },
  secondaryCta: { label: "Get a demo", href: "/company/contact" },
  results: [
    "Captures leads on every channel",
    "Qualifies with dynamic questions",
    "Scores and routes in real time",
    "Syncs to your CRM",
  ],
  problem: {
    title: "Leads go cold in minutes, not days",
    body: "A static form can't ask a follow-up question, and a human can't answer every inbound instantly — so the best leads go cold before anyone responds. An agentic AI agent qualifies the moment interest appears, asks adaptive questions, scores readiness, and hands your reps only the leads worth their time.",
  },
  doesTitle: "Capture, qualify, score, route — automatically",
  features: [
    {
      icon: MessagesSquare,
      title: "Captures everywhere",
      body: "Pulls leads from web chat, WhatsApp, Instagram and Messenger into one place, so no inbound slips through the cracks.",
    },
    {
      icon: Filter,
      title: "Qualifies dynamically",
      body: "Asks adaptive questions instead of a rigid form, so the conversation feels natural — and you learn far more than a form field ever captures.",
    },
    {
      icon: Target,
      title: "Scores intent",
      body: "Ranks leads by readiness and fit so your team works the best ones first, instead of guessing or chasing dead ends.",
    },
    {
      icon: Workflow,
      title: "Routes and syncs",
      body: "Sends hot leads to the right rep instantly and writes everything to your CRM in real time, so follow-up starts while the lead is still warm.",
    },
  ],
  whyItWorks: {
    title: "Every inbound gets an instant, intelligent response",
    points: [
      { label: "Instant response", body: "Every inbound gets an intelligent reply, on any channel, at any hour — 24/7." },
      { label: "Better use of reps", body: "They work the leads that actually convert instead of chasing dead ends." },
      { label: "Nothing slips", body: "No lead falls through the cracks between marketing and sales." },
    ],
  },
  compare: {
    title: "Captain AI vs a web form vs a human SDR",
    subtitle:
      "A form can't ask follow-ups; an SDR can't answer every inbound in seconds, 24/7. An agentic agent qualifies instantly and routes the best leads.",
    columns: ["Captain AI", "Web form", "Human SDR"],
    rows: [
      { feature: "Captures from web, WhatsApp and social", cells: ["yes", "partial", "no"] },
      { feature: "Asks adaptive questions, not a rigid form", cells: ["yes", "no", "yes"] },
      { feature: "Scores intent in real time", cells: ["yes", "no", "partial"] },
      { feature: "Routes hot leads to the right rep instantly", cells: ["yes", "no", "partial"] },
      { feature: "Syncs everything to your CRM automatically", cells: ["yes", "partial", "partial"] },
      { feature: "Responds in seconds, 24/7", cells: ["yes", "yes", "no"] },
      { feature: "Follows up with automated nurture", cells: ["yes", "no", "partial"] },
    ],
    footnote: "'Web form' = a static capture form; 'human SDR' = a sales development rep working inbound manually.",
  },
  whyUs: {
    title: "A qualified lead flows straight into nurture",
    body: "Qualification runs on the same platform as your sales agent, your shared inbox, and your campaigns — so a qualified lead flows straight into nurture and follow-up without a handoff gap. With 200+ integrations and an open API, it writes to your CRM and triggers the next step automatically.",
  },
  faq: [
    { q: "Which channels can it capture from?", a: "Web chat, WhatsApp, Instagram, Messenger, and more — all unified into one place." },
    { q: "Does it sync to my CRM?", a: "Yes, through 200+ integrations and the open API, writing qualified leads and conversation context in real time." },
    { q: "Can it follow up?", a: "Yes, with automated nurture across channels so warm leads don't go cold while a rep is busy." },
    { q: "How does scoring work?", a: "It scores each lead on the intent and fit signals you define, then routes the highest-scoring leads to the right rep first." },
  ],
  finalCta: {
    title: "Stop losing leads to slow follow-up.",
    subtitle:
      "Let an agentic AI agent qualify, score, and route every inbound the moment it arrives — synced to your CRM. Start free with ₹60 credit.",
  },
  related: [
    { label: "Explore Captain AI", href: "/products/ai-agents" },
    { label: "How agentic AI works", href: "/products/ai-agentic" },
    { label: "The AI sales agent", href: "/ai-agents/sales" },
    { label: "Compare platforms", href: "/compare" },
  ],
}

export default function LeadQualificationAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Agentic AI Lead Qualification Agent"
        description="An agentic AI lead qualification agent that captures leads on every channel, qualifies with dynamic questions, scores intent, routes to the right rep, and syncs to your CRM."
        path="/ai-agents/lead-qualification"
        category="AI lead qualification agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Lead Qualification", path: "/ai-agents/lead-qualification" },
        ]}
      />
      <AgentLanding data={DATA} />
    </>
  )
}

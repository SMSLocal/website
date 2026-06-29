import type { Metadata } from "next"
import { Bot, Brain, Headphones, Workflow, Zap } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { AgentLanding, type AgentLandingData } from "@/components/product/agent-landing"
import { CustomerServiceVisual } from "@/components/product/agent-visuals"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  titleAbsolute: "Agentic AI Customer Service Agent for Omnichannel Support | SMSLocal",
  description:
    "Deflect and resolve repetitive tickets with an agentic AI customer service agent that answers across channels, stays grounded in your data, and hands off with context.",
  path: "/ai-agents/customer-service",
  keywords: [
    "AI customer service agent",
    "agentic AI support",
    "omnichannel customer support AI",
    "AI ticket deflection",
    "customer support automation India",
  ],
})

const DATA: AgentLandingData = {
  eyebrow: "AI Agents · Customer Service",
  title: (
    <>
      An agentic AI customer service agent that{" "}
      <span className="text-primary">actually resolves</span>
    </>
  ),
  subtitle:
    "Deflect repetitive tickets across every channel with an agent that answers from your data, completes multi-step tasks, and escalates the rest with full context — not just another deflection bot.",
  trustLine: "Built for support teams that want resolution, not just deflection.",
  visual: <CustomerServiceVisual />,
  primaryCta: { label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" },
  secondaryCta: { label: "Get a demo", href: "/company/contact" },
  results: [
    "24/7 across 7 channels",
    "Resolves without pre-built journeys",
    "100+ languages",
    "Full-context human handoff",
  ],
  problem: {
    title: "Support volume scales faster than headcount",
    body: "Most chatbots only handle the easy questions and dump everything else on your team with no context — so agents repeat themselves, queues grow, and CSAT slips. An agentic AI customer service agent resolves far more on its own, completes the multi-step tasks a scripted bot can't, and makes the handoffs that remain effortless by passing the full conversation, intent, and customer record to a human in the same thread.",
  },
  doesTitle: "Answers, resolves, and escalates — across every channel",
  features: [
    {
      icon: Bot,
      title: "Answers across channels",
      body: "Handles WhatsApp, SMS, email, voice, web chat, Instagram and Messenger from one inbox, grounded in your knowledge base so every reply matches your policies.",
    },
    {
      icon: Zap,
      title: "Resolves, not just routes",
      body: "Completes multi-step tasks like order lookups, status changes, address edits and refunds through your connected tools — not just canned replies or 'type MENU for options'.",
    },
    {
      icon: Workflow,
      title: "Escalates with context",
      body: "When a human is genuinely needed, it hands off in the same thread with the full history, a one-line intent summary, and the next best action already queued.",
    },
    {
      icon: Brain,
      title: "Learns your business",
      body: "Trained only on your help center, PDFs, past tickets and website — so it answers from approved sources and says so when it doesn't know, instead of inventing a policy.",
    },
  ],
  whyItWorks: {
    title: "Customers get instant answers; your team gets its focus back",
    points: [
      { label: "Customers", body: "Get accurate answers at any hour, in their own language, with no queue for something simple." },
      { label: "Your team", body: "Stops repeating itself and spends its time on the conversations that actually need judgment." },
      { label: "CSAT", body: "Rises because resolution — not deflection — becomes the default outcome." },
    ],
  },
  compare: {
    title: "Captain AI vs a deflection bot vs helpdesk macros",
    subtitle:
      "Most 'AI' support tools deflect the easy questions and hand your team the rest with no context. Here's where an agentic agent pulls ahead.",
    columns: ["Captain AI", "Deflection chatbot", "Helpdesk macros"],
    rows: [
      { feature: "Resolves multi-step tasks (lookups, status changes, refunds)", cells: ["yes", "no", "partial"] },
      { feature: "Works across 7 channels from one inbox", cells: ["yes", "partial", "no"] },
      { feature: "Grounded in your data, no invented answers", cells: ["yes", "partial", "no"] },
      { feature: "Works without pre-built journeys or decision trees", cells: ["yes", "no", "no"] },
      { feature: "Full-context human handoff in the same thread", cells: ["yes", "no", "partial"] },
      { feature: "Answers in 100+ languages", cells: ["yes", "partial", "no"] },
      { feature: "Takes real actions via connected tools", cells: ["yes", "no", "no"] },
    ],
    footnote:
      "Comparison reflects typical alternatives. 'Deflection chatbot' = an FAQ/keyword bot; 'helpdesk macros' = saved replies and rules inside a ticketing tool.",
  },
  whyUs: {
    title: "One agent, one platform, one customer record",
    body: "Unlike a single-channel bot, this agent works everywhere your customers are, shares one inbox with your team, and runs on the same platform as your SMS, WhatsApp, email and voice campaigns. So the conversation, the customer history, and the actions all live in one place — and the agent can act, not just answer.",
  },
  faq: [
    { q: "Does it replace my team?", a: "No. It handles routine volume so your team handles the work that needs judgment — refunds beyond policy, complaints, VIP accounts. You set exactly when it escalates." },
    { q: "Can it take actions?", a: "Yes. It completes multi-step tasks across your connected tools — order lookups, status changes, refunds, ticket creation — not just send canned replies." },
    { q: "How fast can it launch?", a: "Connect your channels and data, set your handoff rules, and go live in days — no code, no pre-built journeys to maintain." },
    { q: "How does it stay accurate?", a: "It answers only from sources you approve, and every reply traces back to its source document. When it isn't confident, it asks a clarifying question or hands off to a human." },
  ],
  finalCta: {
    title: "Resolve more tickets without adding headcount.",
    subtitle:
      "Put an agentic AI customer service agent on every channel, grounded in your own data, with clean handoff to your team. Start free with ₹60 credit.",
  },
  related: [
    { label: "Explore Captain AI", href: "/products/ai-agents" },
    { label: "How agentic AI works", href: "/products/ai-agentic" },
    { label: "The shared team inbox", href: "/products/inbox" },
    { label: "Compare platforms", href: "/compare" },
  ],
}

export default function CustomerServiceAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Agentic AI Customer Service Agent"
        description="An agentic AI customer service agent that resolves repetitive tickets across WhatsApp, SMS, email, voice and web, grounded in your data, with full-context human handoff."
        path="/ai-agents/customer-service"
        category="AI customer service agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Customer Service", path: "/ai-agents/customer-service" },
        ]}
      />
      <AgentLanding data={DATA} />
    </>
  )
}

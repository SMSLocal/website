import type { Metadata } from "next"
import { CreditCard, MessageCircle, RefreshCw, ShoppingBag } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { AgentLanding, type AgentLandingData } from "@/components/product/agent-landing"
import { SalesVisual } from "@/components/product/agent-visuals"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  titleAbsolute: "Agentic AI Sales Agent for Conversational Commerce | SMSLocal",
  description:
    "Recommend products, answer buyer questions, and guide customers to checkout with an agentic AI sales agent across WhatsApp, web, and more.",
  path: "/ai-agents/sales",
  keywords: [
    "AI sales agent",
    "conversational commerce",
    "WhatsApp commerce India",
    "AI product recommendations",
    "cart recovery automation",
  ],
})

const DATA: AgentLandingData = {
  eyebrow: "AI Agents · Sales",
  title: (
    <>
      An agentic AI sales agent that{" "}
      <span className="text-primary">turns chats into orders</span>
    </>
  ),
  subtitle:
    "Recommend products, answer buyer questions, and guide customers to checkout inside the conversation — on WhatsApp, web chat, and every channel your shoppers use.",
  trustLine: "Built for D2C and retail teams that sell in the chat.",
  visual: <SalesVisual />,
  primaryCta: { label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" },
  secondaryCta: { label: "Get a demo", href: "/company/contact/" },
  results: [
    "Recommends from your catalog",
    "Recovers carts automatically",
    "Sells on WhatsApp, web & more",
    "Hands warm buyers to your team",
  ],
  problem: {
    title: "A slow answer is a lost sale",
    body: "Shoppers ask questions before they buy — sizing, availability, shipping, returns — and a slow or generic answer loses the order. An agentic AI sales agent answers instantly, recommends the right product from your catalog, and moves the buyer toward checkout without a human waiting on standby. It only pulls your team in to close the high-value deals.",
  },
  doesTitle: "From first question to completed order — in the conversation",
  features: [
    {
      icon: ShoppingBag,
      title: "Personalized recommendations",
      body: "Pulls from your product catalog to suggest the right item for each shopper based on what they ask for, their history, and what's in stock.",
    },
    {
      icon: MessageCircle,
      title: "Answers that close",
      body: "Handles sizing, availability, shipping, and returns questions in real time, on-brand, so there's no gap between interest and action.",
    },
    {
      icon: CreditCard,
      title: "Guided checkout",
      body: "Moves buyers to purchase inside the conversation, with catalog and payment messages where supported — no app-switching, no dropped sessions.",
    },
    {
      icon: RefreshCw,
      title: "Cart recovery",
      body: "Follows up automatically over SMS or WhatsApp to bring back abandoned carts, with the exact item and a one-tap path back to checkout.",
    },
  ],
  whyItWorks: {
    title: "No gap between interest and action",
    points: [
      { label: "Instant answers", body: "Every product question gets an on-brand reply, day or night, on every channel." },
      { label: "Higher conversion", body: "No waiting, no app-switching, no repeating — so interest turns into orders." },
      { label: "Your team", body: "Steps in only to close the high-value deals that are worth a human's time." },
    ],
  },
  compare: {
    title: "Captain AI vs a store chatbot vs a human-only team",
    subtitle:
      "A scripted store bot answers FAQs; a human team can't be online 24/7 for every shopper. An agentic sales agent does both.",
    columns: ["Captain AI", "Store chatbot", "Human-only team"],
    rows: [
      { feature: "Recommends from your live catalog", cells: ["yes", "partial", "yes"] },
      { feature: "Guides to checkout inside the chat", cells: ["yes", "partial", "no"] },
      { feature: "Automatic cart recovery (SMS / WhatsApp)", cells: ["yes", "partial", "no"] },
      { feature: "Sells across WhatsApp, web and more", cells: ["yes", "no", "yes"] },
      { feature: "Instant answers 24/7", cells: ["yes", "yes", "no"] },
      { feature: "Hands warm buyers to your team with context", cells: ["yes", "no", "yes"] },
      { feature: "One customer record from chat to repeat order", cells: ["yes", "no", "partial"] },
    ],
    footnote: "'Store chatbot' = a rule-based on-site widget; 'human-only team' = live agents with no automation.",
  },
  whyUs: {
    title: "The same record from first message to repeat purchase",
    body: "The sales agent shares one platform with your support agent, your shared inbox, and your campaigns — so a single customer record follows the buyer from first message to repeat purchase. With 200+ integrations and an open API, it connects to your store and acts on live catalog and order data, not a static FAQ.",
  },
  faq: [
    { q: "Which channels can it sell on?", a: "WhatsApp, web chat, and more — all from one inbox, with a single customer record across channels." },
    { q: "Does it integrate with my store?", a: "Yes, through 200+ integrations and an open API, so it can read your catalog, stock, and orders in real time." },
    { q: "Can it recover carts?", a: "Yes, with automated SMS and WhatsApp follow-ups that bring back the exact item the shopper left behind." },
    { q: "Does it hand off to my team?", a: "Yes. High-value or complex buyers are routed to a human in the same thread, with the full conversation and cart attached." },
  ],
  finalCta: {
    title: "Turn more conversations into orders.",
    subtitle:
      "Put an agentic AI sales agent on WhatsApp and your website — recommending, answering, and guiding buyers to checkout. Start free with ₹60 credit.",
  },
  related: [
    { label: "Explore Captain AI", href: "/products/ai-agents/" },
    { label: "How agentic AI works", href: "/products/ai-agentic/" },
    { label: "Retail & e-commerce solutions", href: "/solutions/retail/" },
    { label: "Compare platforms", href: "/compare/" },
  ],
}

export default function SalesAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Agentic AI Sales Agent"
        description="An agentic AI sales agent for conversational commerce that recommends products, answers buyer questions, and guides customers to checkout across WhatsApp, web and more."
        path="/ai-agents/sales"
        category="AI sales agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Sales", path: "/ai-agents/sales" },
        ]}
      />
      <AgentLanding data={DATA} />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BadgePercent,
  MessageCircle,
  PackageSearch,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Store,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/products/ai-agents/sales")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function SalesAgentVisual() {
  const convo = [
    { from: "user", text: "Looking for a gift under ₹2000 for my wife, she likes skincare" },
    { from: "agent", text: "Perfect! Here are 3 options based on your budget 👇" },
    { from: "agent", text: "🧴 Rose Glow Kit — ₹1,799\n✨ Vitamin C Serum Set — ₹1,499\n💆 Night Repair Bundle — ₹1,899" },
    { from: "user", text: "The Rose Glow Kit looks great, how do I order?" },
    { from: "agent", text: "Tap below to add to cart — delivery in 2 days 🚀" },
  ]

  const stats = [
    { label: "Avg response", value: "<1s" },
    { label: "Channels", value: "7+" },
    { label: "Integrations", value: "200+" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Chat card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
            Live Sales Conversation
          </span>
        </div>
        <div className="space-y-2">
          {convo.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
              <span
                className={`max-w-[88%] whitespace-pre-line rounded-xl px-3 py-2 text-[12px] leading-snug ${
                  m.from === "user"
                    ? "bg-white/10 text-white/80"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center backdrop-blur-md"
          >
            <p className="text-[18px] font-semibold text-white">{s.value}</p>
            <p className="text-[10.5px] text-white/55">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cart recovery badge */}
      <div className="flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2.5">
        <RefreshCw className="h-4 w-4 shrink-0 text-yellow-400" />
        <span className="text-[12.5px] font-medium text-yellow-300">
          Abandoned cart recovered via WhatsApp — automatically
        </span>
      </div>
    </div>
  )
}

export default function SalesAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal AI Sales Agent"
        description="An agentic AI sales agent that recommends products, answers buyer questions, guides customers to checkout, and recovers abandoned carts across WhatsApp, web, and more."
        path="/products/ai-agents/sales"
        category="AI Sales Agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Sales", path: "/products/ai-agents/sales" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="AI Agents · Sales"
          title={
            <>
              An Agentic AI Sales Agent That
              <br className="hidden sm:block" /> Turns Chats Into Orders
            </>
          }
          subtitle="Recommend products, answer buyer questions, and guide customers to checkout inside the conversation, on every channel."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
          trustBar={[
            { icon: PackageSearch, label: "Recommends from your catalog" },
            { icon: ShoppingCart, label: "Recovers carts automatically" },
            { icon: MessageCircle, label: "Sells on WhatsApp, web, and more" },
            { icon: UserCheck, label: "Hands warm buyers to your team" },
          ]}
          visual={<SalesAgentVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Built for D2C and retail teams that sell in the chat.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Catalog", label: "Recommends products from your live catalog, personalized to each shopper" },
              { value: "Auto", label: "Cart recovery via SMS and WhatsApp, no manual follow-up needed" },
              { value: "7+", label: "Channels — WhatsApp, web, SMS, and more from one inbox" },
              { value: "Warm", label: "Hands high-value buyers to your team at exactly the right moment" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="A slow answer loses the sale"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Shoppers ask questions before they buy, and a slow or generic answer loses the sale.
              An agentic AI sales agent answers instantly, recommends the right product, and moves
              the buyer toward checkout without a human waiting on standby. Every unanswered
              question is a cart that never got created.
            </p>
          </div>
        </Section>

        {/* ── WHAT IT DOES ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What it does"
          title="From first question to confirmed order, inside the chat"
          subtitle="It doesn't just answer product questions — it moves the buyer forward at every step."
          items={[
            {
              icon: PackageSearch,
              title: "Personalized recommendations",
              body: "Pulls from your product catalog to suggest the right item for each shopper based on budget, preference, and past purchases — not a static list.",
            },
            {
              icon: Zap,
              title: "Answers that close",
              body: "Handles sizing, availability, shipping, and returns questions in real time so buyers get the confidence to purchase without waiting for a human reply.",
            },
            {
              icon: ShoppingBag,
              title: "Guided checkout",
              body: "Moves buyers to purchase inside the conversation, with payment links and catalog messages where supported — removing every step between interest and order.",
            },
            {
              icon: RefreshCw,
              title: "Cart recovery",
              body: "Follows up over SMS or WhatsApp to bring back abandoned carts with a timely, personalized message — automatically, without anyone on your team lifting a finger.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="No gap between interest and action"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Every product question gets an instant, on-brand answer, day or night. Conversion
                rises because there is no gap between interest and action, and your team only steps
                in to close the high-value deals. Buyers who get answers buy — buyers who wait
                leave.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />, label: "Instant answers", desc: "Sub-second replies to every product question, 24/7" },
                { icon: <TrendingUp className="h-5 w-5" />, label: "Higher conversion", desc: "No abandoned interest — buyers move from chat to checkout" },
                { icon: <BadgePercent className="h-5 w-5" />, label: "Cart recovery", desc: "Automated follow-ups bring back shoppers who left mid-session" },
                { icon: <UserCheck className="h-5 w-5" />, label: "Smart handoff", desc: "High-value buyers go to your team at exactly the right moment" },
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
              One platform from first message to repeat purchase
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              The sales agent shares one platform with your support agent, your inbox, and your
              campaigns — so a single customer record follows the buyer from first message to repeat
              purchase. No data silos, no switching tools, no duplicate customer records. Everything
              your team needs to sell and support lives in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agents"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                See all AI agents
              </Link>
              <Link
                href="/solutions/ecommerce"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Retail &amp; D2C solutions
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Which channels can it sell on?",
              a: "WhatsApp, web chat, SMS, and more — all from one inbox. The same agent, the same catalog, and the same conversation history no matter which channel the buyer messages from.",
            },
            {
              q: "Does it integrate with my store?",
              a: "Yes, through 200+ integrations and an open API. Connect your Shopify, WooCommerce, or custom store so the agent always has live product data, stock levels, and order history.",
            },
            {
              q: "Can it recover abandoned carts?",
              a: "Yes. When a buyer leaves mid-session, the agent sends an automated follow-up over SMS or WhatsApp with the items they were browsing and a direct link back to checkout.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents", label: "All AI agent use cases" },
                { href: "/products/ai-agentic", label: "How agentic AI works" },
                { href: "/solutions/ecommerce", label: "E-commerce & D2C solutions" },
                { href: "/compare", label: "Compare SMSLocal with alternatives" },
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
          title="Turn more conversations into orders."
          subtitle="Connect your catalog, train the agent on your products, and start converting chats into sales — across every channel your customers already use."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
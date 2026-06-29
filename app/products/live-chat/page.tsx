import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bell,
  Bot,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  Code2,
  GraduationCap,
  HeartPulse,
  Inbox,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { SaasFaq } from "@/components/solution/saas-faq"
import {
  CapabilityGrid,
  CompareTable,
  HowItWorks,
  ProductFinalCta,
  Section,
  SectionHeader,
  UseCasesGrid,
} from "@/components/product/product-page"
import { LiveChatVisual } from "../../../components/product/livechat-visual"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/live-chat")

/* ─────────────────────────────────────────────────────────────────────────── */

export default function LiveChatPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Live Chat"
        description="Website live chat widget with shared team inbox, WhatsApp integration, AI suggested replies, and multi-agent support. Free forever on one website."
        path="/products/live-chat"
        category="Live chat software"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Live Chat", path: "/products/live-chat" },
        ]}
      />      <SiteHeader />
      <main>

        {/* ── Hero — dark theme ── */}
        <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
          {/* Glow blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--accent) 50%, transparent), transparent 70%)" }}
          />
          <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-60 mask-radial-fade" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-2 sm:px-6 sm:py-3 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-3">
            {/* Copy */}
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
                Live Chat · Free Forever on One Website
              </span>
              <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Connect Visitors.{" "}
                <span className="text-primary">Convert Conversations</span>{" "}
                Into Customers.
              </h1>
              <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-[17px]">
                Install SMSLocal Live Chat in minutes and engage website visitors in real time.
                Capture leads, answer questions instantly, and manage conversations from a single inbox.
              </p>

              {/* CTAs */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="https://app.smslocal.in/signup"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:brightness-110"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/company/contact/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-2 text-[12px] text-white/40">
                Free plan includes one website widget with SMSLocal branding.
              </p>

              {/* Trust bar */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 sm:grid-cols-4">
                {[
                  { icon: CheckCircle2, label: "Free Forever" },
                  { icon: Zap, label: "5-Minute Setup" },
                  { icon: ShieldCheck, label: "No Credit Card" },
                  { icon: ShieldCheck, label: "99.9% Uptime" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-2 text-[12.5px] text-white/50">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated chat visual */}
            <div className="relative">
              <LiveChatVisual />
            </div>
          </div>
        </section>

        {/* ── Platform compatibility strip ── */}
        <div className="border-y border-border bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Works with every platform
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["Shopify", "WordPress", "WooCommerce", "Webflow", "React", "Next.js", "HTML"].map((p) => (
                <span
                  key={p}
                  className="rounded-lg border border-border bg-background px-4 py-2 text-[12px] font-semibold tracking-tight text-muted-foreground shadow-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 1: Core capabilities ── */}
        <CapabilityGrid
          eyebrow="Capabilities"
          title="Everything You Need To Start Chatting"
          items={[
            {
              icon: MessageSquare,
              title: "Website Chat Widget",
              body: "Install on any website with one line of code. Works with Shopify, WordPress, WooCommerce, Webflow, and any custom site — no developer needed.",
            },
            {
              icon: Smartphone,
              title: "Mobile Responsive",
              body: "Looks pixel-perfect on desktop, tablet, and mobile. The widget adapts automatically to every screen size and orientation.",
            },
            {
              icon: Bell,
              title: "Instant Notifications",
              body: "Get notified the moment a visitor starts a conversation. Browser alerts, email, and mobile push — never miss a lead.",
            },
            {
              icon: Inbox,
              title: "Unified Inbox",
              body: "Manage Live Chat, WhatsApp, SMS, and Email from one place. No tab-switching. No missed messages. One team, one view.",
            },
          ]}
        />

        {/* ── Section 2: One-line install + code card ── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Installation"
                title="Install In Minutes"
                subtitle="Copy one script tag and go live instantly. No developers required. Works on any website."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {["Shopify", "WordPress", "React", "Next.js", "HTML", "Webflow"].map((p) => (
                  <span
                    key={p}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-muted-foreground shadow-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { val: "100", label: "Lighthouse Score" },
                  { val: "<4 KB", label: "Widget Size" },
                  { val: "~0ms", label: "Page Impact" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-background p-4 text-center shadow-sm"
                  >
                    <p className="text-2xl font-semibold text-primary">{s.val}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Syntax-highlighted code card — dark panel intentional for code readability */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-[#1e2433] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#252c3d] px-5 py-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-[12px] font-semibold text-white/70">index.html</span>
                </div>
                <span className="cursor-pointer rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10.5px] text-white/50 transition hover:bg-white/10">
                  Copy
                </span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <p className="text-slate-500">{`<!-- Add before </body> -->`}</p>
                <p className="mt-3">
                  <span className="text-[#7DD3FC]">{"<script"}</span>
                  <span className="text-slate-400"> async</span>
                </p>
                <p className="pl-4">
                  <span className="text-slate-400">{"  src="}</span>
                  <span className="text-[#86EFAC]">{`"https://cdn.smslocal.com/livechat.js"`}</span>
                </p>
                <p className="pl-4">
                  <span className="text-slate-400">{"  data-widget-id="}</span>
                  <span className="text-[#86EFAC]">{`"YOUR_WIDGET_ID"`}</span>
                </p>
                <p>
                  <span className="text-[#7DD3FC]">{"</script>"}</span>
                </p>
              </div>
              <div className="border-t border-white/10 bg-primary/10 px-5 py-3">
                <div className="flex items-center gap-2 text-[12px] text-primary">
                  <Check className="h-4 w-4" />
                  Widget live in under 60 seconds
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Section 3: Setup steps ── */}
        <HowItWorks
          eyebrow="Setup"
          title="Live in 4 Steps"
          subtitle="From zero to your first live conversation in under 5 minutes."
          steps={[
            {
              title: "Create a free account",
              body: "Sign up with your email — no credit card, no commitment. Your widget is ready immediately.",
            },
            {
              title: "Paste one line of code",
              body: "Copy the script tag from your dashboard and paste it before </body> on your website.",
            },
            {
              title: "Customize your widget",
              body: "Set your brand colors, greeting message, team name, and availability hours — all from the dashboard.",
            },
            {
              title: "Start chatting",
              body: "Watch visitors connect in real time. Reply from the SMSLocal inbox on desktop or mobile.",
            },
          ]}
        />

        {/* ── Section 4: Platform depth — feature list + channels card ── */}
        <Section>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Platform"
                title="More Than Just Live Chat"
                subtitle="SMSLocal Live Chat is part of a unified messaging platform that grows with your business."
              />
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "Live Chat Widget",
                  "Shared Team Inbox",
                  "WhatsApp Integration",
                  "Lead Capture Forms",
                  "Visitor Tracking",
                  "AI Suggested Replies",
                  "CRM Integrations",
                  "Multi-Agent Support",
                  "Analytics Dashboard",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-foreground">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="https://app.smslocal.in/signup"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Channels-in-one-inbox card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/40 px-5 py-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Channels in one inbox
                </p>
              </div>
              <div className="divide-y divide-border">
                {[
                  { channel: "Website Live Chat", icon: MessageSquare },
                  { channel: "WhatsApp", icon: Zap },
                  { channel: "SMS", icon: Bell },
                  { channel: "Email", icon: Inbox },
                  { channel: "AI Agent", icon: Bot },
                ].map(({ channel, icon: Icon }) => (
                  <div key={channel} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[14px] font-medium text-foreground">{channel}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                      Included
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Section 5: Industry use cases ── */}
        <UseCasesGrid
          eyebrow="Use cases"
          title="Built For Every Industry"
          subtitle="From e-commerce to healthcare — SMSLocal Live Chat adapts to how your customers want to talk."
          items={[
            {
              industry: "E-commerce",
              use: "Recover abandoned carts and answer product questions instantly",
              icon: ShoppingBag,
              href: "/solutions/ecommerce/",
            },
            {
              industry: "SaaS",
              use: "Convert visitors into demo requests and sales opportunities",
              icon: Sparkles,
              href: "/solutions/",
            },
            {
              industry: "Education",
              use: "Help students and manage admission inquiries in real time",
              icon: GraduationCap,
              href: "/solutions/education/",
            },
            {
              industry: "Healthcare",
              use: "Provide instant assistance and appointment booking support",
              icon: HeartPulse,
              href: "/solutions/healthcare/",
            },
            {
              industry: "D2C Brands",
              use: "Build loyalty and handle post-purchase queries faster",
              icon: Building2,
              href: "/solutions/ecommerce/",
            },
            {
              industry: "Customer Support Teams",
              use: "Reduce ticket volume with real-time chat and AI deflection",
              icon: Users,
              href: "/solutions/",
            },
          ]}
        />

        {/* ── Section 6: AI-powered features ── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="AI"
                title="AI-Powered Customer Conversations"
                subtitle="Let AI handle the routine questions while your team focuses on conversations that convert."
              />
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  {
                    icon: Brain,
                    label: "Suggested Replies",
                    desc: "AI reads the conversation and suggests the best response in one click.",
                  },
                  {
                    icon: Zap,
                    label: "Smart Routing",
                    desc: "Route chats to the right agent or team automatically based on topic.",
                  },
                  {
                    icon: Sparkles,
                    label: "Conversation Summaries",
                    desc: "Get a one-line summary before picking up any chat thread.",
                  },
                  {
                    icon: Bot,
                    label: "Intent Detection",
                    desc: "Instantly identify if a visitor wants support, sales, or is just browsing.",
                  },
                  {
                    icon: MessageSquare,
                    label: "Knowledge Base Search",
                    desc: "AI searches your docs and suggests answers without switching tabs.",
                  },
                  {
                    icon: CheckCircle2,
                    label: "Automated Responses",
                    desc: "Answer FAQs automatically — 24/7 — with zero agent effort.",
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">{label}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI assistant panel mockup */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/40 px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  AI Assistant Panel
                </p>
                <p className="text-[13px] font-semibold text-foreground">Suggested Actions</p>
              </div>
              <div className="space-y-3 p-5">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Detected Intent
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-foreground">Product availability question</p>
                  <p className="mt-1 text-[11.5px] text-muted-foreground">Confidence: 94%</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Suggested Reply
                  </p>
                  <div className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2.5 text-[12.5px] text-foreground">
                    Yes, it&apos;s available in size L! In stock and ships today 🚚
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button className="flex-1 rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground transition hover:brightness-110">
                      Use Reply
                    </button>
                    <button className="flex-1 rounded-lg border border-border py-1.5 text-[11px] font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Knowledge Base Match
                  </p>
                  <div className="flex items-start gap-2.5">
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-[12px] font-medium text-foreground">Shipping & Availability FAQ</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">Matches query with 89% relevance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>


        {/* ── Section 8: Social proof ── */}
        <Section tone="muted">
          <SectionHeader eyebrow="Testimonials" title="Trusted By Growing Businesses" center />
          <style>{`
            @keyframes livechat-marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .livechat-marquee-track {
              animation: livechat-marquee 30s linear infinite;
            }
            .livechat-marquee-track:hover {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .livechat-marquee-track { animation: none; }
            }
          `}</style>
          <div className="relative mt-10 overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted/40 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted/40 to-transparent" />
            <div className="livechat-marquee-track flex w-max gap-5">
              {[...Array(4)].flatMap((_, copy) =>
                [
                  {
                    quote: "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.",
                    name: "Vikram Mehta",
                    role: "VP Support · fintech SaaS, Mumbai",
                    initials: "VM",
                    color: "bg-teal-500",
                  },
                  {
                    quote: "We connected Zapier, HubSpot, and WhatsApp in one afternoon. The REST API is clean and the docs are actually good.",
                    name: "Rahul Nair",
                    role: "Founder · LogiTrack, Bengaluru",
                    initials: "RN",
                    color: "bg-violet-500",
                  },
                  {
                    quote: "The Linear integration converts a chat into a tracked issue in one click. No copy-paste, no lost context — massive time saver.",
                    name: "Neha Joshi",
                    role: "Engineering Lead · Razorpay, Mumbai",
                    initials: "NJ",
                    color: "bg-rose-500",
                  },
                ].map((t, i) => (
                  <div
                    key={`${copy}-${i}`}
                    className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm"
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white ${t.color}`}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold text-foreground">{t.name}</p>
                        <p className="text-[12px] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Section>

        {/* ── Compare table ── */}
        <CompareTable
          eyebrow="Compared"
          title="SMSLocal vs Other Live Chat Tools"
          columns={["SMSLocal", "Intercom", "Crisp", "Tidio", "Freshchat"]}
          rows={[
            { feature: "Free forever plan", cells: ["yes", "no", "yes", "yes", "yes"] },
            { feature: "WhatsApp integration", cells: ["yes", "yes", "partial", "partial", "yes"] },
            { feature: "AI suggested replies", cells: ["yes", "yes", "no", "yes", "partial"] },
            { feature: "Unified SMS + Chat inbox", cells: ["yes", "no", "no", "no", "partial"] },
            { feature: "No per-seat pricing on free", cells: ["yes", "no", "yes", "yes", "no"] },
            { feature: "Indian rupee billing", cells: ["yes", "no", "no", "no", "yes"] },
          ]}
          footnote="Competitor feature sets change — re-verify before publishing."
          ctaLabel="See the full comparison"
          ctaHref="/compare"
        />

        {/* ── FAQ ── */}
        <SaasFaq
          eyebrow="FAQs"
          title="Common Questions About SMSLocal Live Chat"
          items={[
            {
              q: "Is Live Chat really free?",
              a: "Yes. Our free plan includes one website widget with SMSLocal branding, one agent seat, and full live chat functionality — forever. No time limit, no credit card required.",
            },
            {
              q: "Does it slow down my website?",
              a: "No. The SMSLocal Live Chat widget loads asynchronously and weighs under 4 KB. It has zero impact on your page speed or Lighthouse score.",
            },
            {
              q: "Can I connect WhatsApp?",
              a: "Yes. On paid plans you can connect your WhatsApp Business number and manage all WhatsApp and Live Chat conversations from the same inbox.",
            },
            {
              q: "Can multiple agents reply to chats?",
              a: "Yes. Starter and Growth plans support multiple agent seats. You can assign chats, leave internal notes, and collaborate as a team.",
            },
            {
              q: "Is the setup difficult?",
              a: "Not at all. Paste one script tag before {'</body>'} on your website and the widget appears immediately. Most customers are live in under 5 minutes.",
            },
            {
              q: "Can I customize the widget?",
              a: "Yes. Change the widget color, greeting message, team name, avatar, availability hours, and position. Paid plans also remove SMSLocal branding.",
            },
          ]}
        />

        <RelatedContent path="/products/live-chat" />

        {/* ── Final CTA ── */}
        <ProductFinalCta
          title="Start Chatting With Customers Today"
          subtitle="Install SMSLocal Live Chat in minutes and turn more visitors into customers. Free forever. No credit card required."
          primaryCta={{ label: "Start Free", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Book a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

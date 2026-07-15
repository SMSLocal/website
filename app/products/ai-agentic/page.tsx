import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Calendar,
  CreditCard,
  Check,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Globe,
  Headphones,
  HeartPulse,
  LayoutGrid,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Mic,
  Minus,
  Plug,
  Puzzle,
  RefreshCw,
  ScrollText,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Wallet,
  Workflow,
  X,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { AiAgenticVisual } from "@/components/lazy"
import { AiAgenticFaq } from "@/components/product/ai-agentic-faq"
import { AI_AGENTIC_FAQS } from "@/components/product/ai-agentic-faq-data"
import { FaqJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/ai-agentic")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const READ_ACTIONS = [
  { icon: Users, label: "Contacts & deals" },
  { icon: FileText, label: "Invoices & orders" },
  { icon: ShoppingCart, label: "Order status" },
  { icon: Briefcase, label: "Employee records" },
  { icon: Mail, label: "Email threads" },
  { icon: Database, label: "Database rows" },
]

const WRITE_ACTIONS = [
  { icon: CreditCard, label: "Update payment link" },
  { icon: FileText, label: "Update invoice" },
  { icon: ShoppingCart, label: "Update order" },
  { icon: RefreshCw, label: "Issue refund" },
  { icon: Workflow, label: "Create record" },
  { icon: GitBranch, label: "Open an issue" },
]

const APP_CATEGORIES = [
  { icon: Cpu, slug: "developer-tools-devops", label: "Developer Tools & DevOps", desc: "Query repos, monitor errors, and run database lookups in-conversation.", apps: ["GitHub", "Bitbucket", "Sentry"], count: 48 },
  { icon: Users, slug: "crm", label: "CRM", desc: "Look up and update contacts, deals, and accounts as the chat happens.", apps: ["HubSpot", "Salesforce", "Pipedrive"], count: 22 },
  { icon: CreditCard, slug: "finance-accounting", label: "Finance & Accounting", desc: "Pull invoices, update orders, and issue payments and refunds.", apps: ["Razorpay", "Stripe", "QuickBooks"], count: 31 },
  { icon: ShoppingCart, slug: "ecommerce", label: "E-commerce", desc: "Fetch order status, track shipments, and process returns.", apps: ["Shopify", "WooCommerce"], count: 18 },
  { icon: Headphones, slug: "sales-customer-support", label: "Sales & Customer Support", desc: "Read and update tickets across your existing help desks.", apps: ["Zendesk", "Intercom", "Freshdesk"], count: 19 },
  { icon: Briefcase, slug: "hr-recruiting", label: "HR & Recruiting", desc: "Look up employees, leave balances, and candidate pipelines.", apps: ["Greenhouse", "BambooHR"], count: 14 },
  { icon: FileText, slug: "document-file-management", label: "Document & File Management", desc: "Search, read, and attach files from your storage and docs.", apps: ["Google Drive", "Notion", "Dropbox"], count: 21 },
  { icon: MessageCircle, slug: "collaboration-communication", label: "Collaboration & Communication", desc: "Read threads, post updates, and notify the right channel.", apps: ["Gmail", "Slack", "Teams"], count: 26 },
  { icon: LayoutGrid, slug: "productivity-project-management", label: "Productivity & Project Mgmt", desc: "Create tasks, move tickets, and check project status.", apps: ["Jira", "Asana", "Linear"], count: 24 },
  { icon: Calendar, slug: "scheduling-booking", label: "Scheduling & Booking", desc: "Check availability, book, and reschedule appointments.", apps: ["Google Calendar", "Calendly"], count: 11 },
  { icon: BarChart3, slug: "analytics-data", label: "Analytics & Data", desc: "Surface live metrics and reports without leaving the inbox.", apps: ["Google Analytics", "Mixpanel"], count: 16 },
  { icon: Database, slug: "data-analytics", label: "Data & Analytics", desc: "Run lookups and aggregations against your warehouse.", apps: ["Supabase", "Neon", "BigQuery"], count: 15 },
  { icon: Sparkles, slug: "ai-machine-learning", label: "AI & Machine Learning", desc: "Enrich, search, and scrape the open web on demand.", apps: ["Tavily", "Firecrawl", "OpenAI"], count: 17 },
  { icon: Workflow, slug: "workflow-automation", label: "Workflow Automation", desc: "Trigger multi-app automations as part of a resolution.", apps: ["Zapier", "Make"], count: 12 },
  { icon: Megaphone, slug: "marketing-social-media", label: "Marketing & Social Media", desc: "Manage campaigns and respond across social channels.", apps: ["Mailchimp", "Buffer"], count: 20 },
  { icon: Globe, slug: "social-media", label: "Social Media", desc: "Read mentions and publish replies across platforms.", apps: ["X", "LinkedIn", "Instagram"], count: 13 },
]

/* ── Browse by Category (AI tool directory — dynamic pages) ── */
// const CATEGORIES_PEOPLE = [
//   { icon: Bot, slug: "general-purpose-ai-agents", label: "General-Purpose AI Agents", desc: "AI agents that can browse the web, manage files, run code, and take autonomous action." },
//   { icon: Cpu, slug: "coding-agents", label: "Coding Agents", desc: "AI that writes, reviews, and ships code." },
//   { icon: Sparkles, slug: "personal-assistants", label: "Personal Assistants", desc: "General-purpose AI assistants for everyday tasks, scheduling, and personal productivity." },
//   { icon: MessageSquareText, slug: "writing-creativity", label: "Writing & Creativity", desc: "AI tools where the PRIMARY purpose is writing, content creation, or creative work." },
//   { icon: Globe, slug: "browser-computer-use", label: "Browser & Computer Use", desc: "AI agents that control your browser and desktop to complete tasks." },
//   { icon: Search, slug: "research-deep-analysis", label: "Research & Deep Analysis", desc: "AI agents for deep research, fact-finding, and synthesis." },
//   { icon: Brain, slug: "learning-education", label: "Learning & Education", desc: "AI tutors, study assistants, and learning companions where education is the primary purpose." },
//   { icon: HeartPulse, slug: "health-wellness", label: "Health & Wellness", desc: "AI for fitness, mental health, nutrition, medical guidance, and wellbeing." },
// ]

const CATEGORIES_TEAMS = [
  { icon: Zap, slug: "sales-marketing", label: "Sales & Marketing", desc: "AI agents for lead generation, sales outreach, content marketing, and campaign automation." },
  { icon: MessageCircle, slug: "customer-support", label: "Customer Support", desc: "AI-powered support agents, help desk automation, and customer service." },
  { icon: Cpu, slug: "engineering-devtools", label: "Engineering & DevTools", desc: "AI coding assistants, code review tools, and developer productivity solutions for teams." },
  { icon: LayoutGrid, slug: "data-analytics", label: "Data & Analytics", desc: "AI for data analysis, business intelligence, visualization, and reporting." },
  { icon: Workflow, slug: "workflow-automation", label: "Workflow Automation", desc: "General-purpose workflow automation platforms that connect multiple apps/services." },
  { icon: Puzzle, slug: "agent-frameworks-orchestration", label: "Agent Frameworks & Orchestration", desc: "Open-source frameworks and SDKs for building custom AI agents." },
  { icon: ShieldCheck, slug: "agent-infrastructure", label: "Agent Infrastructure", desc: "The plumbing layer for AI agents: memory systems, tool integrations, observability, sandboxing, and identity management." },
  { icon: Users, slug: "enterprise-agent-platforms", label: "Enterprise Agent Platforms", desc: "Full-stack platforms for deploying AI agents at organizational scale." },
  { icon: Search, slug: "research-intelligence", label: "Research & Intelligence", desc: "AI for market research, competitive intelligence, deep analysis, and knowledge synthesis." },
  { icon: Mic, slug: "voice-phone-agents", label: "Voice & Phone Agents", desc: "AI agents for voice interactions, phone calls, and conversational interfaces." },
  { icon: Globe, slug: "browser-automation-agents", label: "Browser Automation Agents", desc: "AI agents that autonomously browse the web, interact with websites, fill forms." },
  { icon: Bot, slug: "multi-agent-orchestration", label: "Multi-Agent Orchestration", desc: "Frameworks and platforms for coordinating multiple AI agents working together." },
]

const PILLARS = [
  { icon: Plug, title: "Connect", description: "One-click OAuth to 300+ apps via Composio — Captain inherits the right scopes", color: "bg-primary/10 text-primary" },
  { icon: Brain, title: "Decide", description: "Reads the conversation, pulls live context, and plans which actions to run", color: "bg-primary/10 text-primary" },
  { icon: Zap, title: "Act", description: "Executes real app actions — update an order, issue a refund, resolve the ticket", color: "bg-primary/10 text-primary" },
]

const CONTROLS = [
  { icon: ShieldCheck, label: "Custom Roles", desc: "Scope exactly which apps and actions Captain is allowed to touch." },
  { icon: ScrollText, label: "Audit Logs", desc: "Every lookup and action is logged — who, what, when, and why." },
  { icon: Headphones, label: "SLA", desc: "Honor response and resolution targets, then escalate to a human." },
  { icon: Sparkles, label: "Macros & Canned Responses", desc: "Reusable one-click actions and replies your team already trusts." },
  { icon: Wallet, label: "Wallet billing", desc: "Pay-as-you-go from one balance across every channel and action." },
  { icon: Workflow, label: "Conversation Workflows", desc: "Route, assign, and automate the lifecycle of every conversation." },
]

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */

function CompareCell({ val, highlight }: { val: boolean | null; highlight?: boolean }) {
  if (val === true)
    return (
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )
  if (val === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <X className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600">
      <Minus className="h-3 w-3" /> Limited
    </span>
  )
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function AiAgenticPage() {
  return (
    <>
      <AnnouncementStrip />
      <SiteHeader />
      <main className="overflow-x-clip">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[oklch(0.13_0.02_230)] py-10 sm:py-12">
          <div aria-hidden className="pointer-events-none absolute -top-32 left-[20%] h-[480px] w-[480px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 60%, transparent), transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute bottom-0 right-[5%] h-[280px] w-[280px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.17 165), transparent 70%)" }} />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[12px] font-semibold text-primary">
                <Bot className="h-3.5 w-3.5" /> Captain AI · Agentic AI for customer support
              </div>

              <h1 className="mt-5 text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[52px]">
                The AI agent that{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
                  actually does the work
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-[16px]">
                Captain AI connects to 300+ of your business apps through Composio, then takes
                real actions inside every conversation — looks up the contact, fetches the
                invoice, updates the order, and resolves the ticket. Replies, not riddles.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/signup/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-bold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:opacity-90">
                  Start Free <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#apps" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[14px] font-semibold text-white transition hover:border-primary/40 hover:bg-white/10">
                  Browse Integrations
                </a>
                <Link href="/company/contact/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-[14px] font-semibold text-white/70 transition hover:border-white/20 hover:text-white">
                  Book a Demo
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { n: "300+", label: "Apps you can connect" },
                  { n: "20", label: "App categories" },
                  { n: "Actions", label: "Not just answers" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-[22px] font-black text-white">{s.n}</p>
                    <p className="text-[11.5px] text-white/45">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiAgenticVisual />
          </div>
        </section>

        {/* ── READ + ACT ────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-background py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-border bg-muted px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Why it&apos;s different
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                It doesn&apos;t guess — it checks, then acts
              </h2>
              <p className="mt-2 text-[14px] text-muted-foreground">
                Captain AI reads live data from your connected apps and runs real write actions — all from inside the conversation, with no copy-paste.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6">
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Search className="h-3 w-3" /> Look up
                  </span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-bold text-foreground">Read access</span>
                </div>
                <h3 className="mt-3 text-[20px] font-bold tracking-tight text-foreground">Answer with real data</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">Captain pulls the live record straight from the source — no stale knowledge base.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {READ_ACTIONS.map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-[12px] font-medium text-foreground/80 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
                      <Icon className="h-3 w-3 text-primary" /> {label}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                  <span className="text-[12px] text-muted-foreground"><span className="font-semibold text-foreground">&ldquo;Where&apos;s my order?&rdquo;</span> answered instantly</span>
                  <a href="#apps" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition hover:gap-2.5">See sources <ArrowRight className="h-3.5 w-3.5" /></a>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6">
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Zap className="h-3 w-3" /> Take action
                  </span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-bold text-foreground">Write access</span>
                </div>
                <h3 className="mt-3 text-[20px] font-bold tracking-tight text-foreground">Resolve with real actions</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">Captain runs the actual app action — update, create, refund — and closes the loop.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {WRITE_ACTIONS.map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-[12px] font-medium text-foreground/80 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
                      <Icon className="h-3 w-3 text-primary" /> {label}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                  <span className="text-[12px] text-muted-foreground"><span className="font-semibold text-foreground">42 actions</span> on Razorpay alone</span>
                  <a href="#apps" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition hover:gap-2.5">See actions <ArrowRight className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BROWSE APPS / CATEGORIES ──────────────────────────────────── */}
        <section id="apps" className="border-t border-border bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-border bg-muted px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Powered by Composio
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Connect an app, give Captain the keys
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground">
                300+ apps across 20 categories. Connect with one-click OAuth and Captain can look up contacts, invoices, orders, employees and more — and act on them directly.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {APP_CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <Link key={cat.label} href={`/products/ai-agentic/apps/${cat.slug}`} className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">{cat.count} apps</span>
                    </div>
                    <div>
                      <p className="text-[13.5px] font-bold text-foreground">{cat.label}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{cat.desc}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {cat.apps.map((app) => (
                        <span key={app} className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{app}</span>
                      ))}
                    </div>
                  </Link>
                )
              })}
            </div>
            <p className="mt-8 text-center text-[13px] text-muted-foreground">
              …and 280+ more — including Gmail, Google Maps, Coinbase, Browserbase and Sentry.
            </p>
          </div>
        </section>

        {/* ── BROWSE BY CATEGORY (AI tool directory — dynamic pages) ────── */}
        {/* <section id="categories" className="border-t border-border bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Directory
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Browse by Category
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground">
                Every category is curated and scored — only tools with real agentic capability make the list.
              </p>
            </div>

            {/* For People */}
            {/* <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-[12px] font-bold uppercase tracking-widest text-primary">For People</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">  */}
                {/* {CATEGORIES_PEOPLE.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <Link key={cat.label} href={`/products/ai-agentic/${cat.slug}`} className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div>
                        <p className="text-[13.5px] font-bold text-foreground">{cat.label}</p>
                        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{cat.desc}</p>
                      </div>
                    </Link>
                  )
                })} */}
              {/* </div>
            </div>

            {/* For Teams */}
            {/* <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-[12px] font-bold uppercase tracking-widest text-primary">For Teams</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">  */}
                {/* {CATEGORIES_TEAMS.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <Link key={cat.label} href={`/products/ai-agentic/${cat.slug}`} className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div>
                        <p className="text-[13.5px] font-bold text-foreground">{cat.label}</p>
                        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{cat.desc}</p>
                      </div>
                    </Link>
                  )
                })} */}
              {/* </div>
            </div>
          </div>
        </section> */}

        {/* ── CAPTAIN AI VS CHATBOT VS CANNED REPLIES ───────────────────── */}
        <section className="border-t border-border bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-border bg-muted px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Comparison
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Captain AI vs a scripted bot vs canned replies
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground">
                A rule-based bot deflects. Canned responses speed up typing. Captain AI actually resolves the request.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Capability</th>
                      <th className="px-5 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Scripted Bot</th>
                      <th className="px-5 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Canned Replies</th>
                      <th className="px-5 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.12em] text-primary">Captain AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { capability: "Answers FAQs from a script",                bot: true,  canned: true,  captain: true },
                      { capability: "Pulls live data from your apps",            bot: false, canned: false, captain: true },
                      { capability: "Takes real actions (refund, update order)", bot: false, canned: false, captain: true },
                      { capability: "Works across 300+ connected apps",          bot: false, canned: false, captain: true },
                      { capability: "Respects roles & permissions",              bot: null,  canned: null,  captain: true },
                      { capability: "Logs every action to an audit trail",       bot: false, canned: false, captain: true },
                      { capability: "Honors SLA and escalates to a human",       bot: false, canned: null,  captain: true },
                    ].map((row, ri) => (
                      <tr key={row.capability} className={ri % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                        <td className="px-5 py-3.5 text-[13.5px] font-medium text-foreground">{row.capability}</td>
                        <td className="px-5 py-3.5 text-center"><CompareCell val={row.bot} /></td>
                        <td className="px-5 py-3.5 text-center"><CompareCell val={row.canned} /></td>
                        <td className="px-5 py-3.5 text-center bg-primary/[0.04]"><CompareCell val={row.captain} highlight /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT CAN CAPTAIN AI DO? ───────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Use Cases
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What can Captain AI do?
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground">
                Real workflows across your connected apps — resolved end-to-end in the conversation.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: CreditCard, label: "Payments & Billing", body: "Fetch an invoice, update a Razorpay order, change a payment link, or issue a refund — without leaving the chat.", examples: ["Razorpay", "Stripe"] },
                { icon: ShoppingCart, label: "Order Support", body: "Look up order status, track the shipment, and process a return the moment a customer asks.", examples: ["Shopify", "WooCommerce"] },
                { icon: Users, label: "CRM & Sales", body: "Find the contact, read the deal history, log a note, and update the record as the conversation moves.", examples: ["HubSpot", "Salesforce"] },
                { icon: Mail, label: "Inbox & Comms", body: "Triage Gmail, draft and send replies, and notify the right Slack channel on escalation.", examples: ["Gmail", "Slack"] },
                { icon: Cpu, label: "Engineering & DevOps", body: "Open a GitHub issue, check the latest Sentry errors, or query a Supabase table on behalf of a customer report.", examples: ["GitHub", "Sentry", "Supabase"] },
                { icon: Briefcase, label: "HR & Internal", body: "Answer employee questions by looking up records, leave balances, and policy docs directly.", examples: ["BambooHR", "Notion"] },
              ].map((uc) => {
                const Icon = uc.icon
                return (
                  <div key={uc.label} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-foreground">{uc.label}</p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{uc.body}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {uc.examples.map((ex) => (
                        <span key={ex} className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11.5px] font-medium text-muted-foreground">{ex}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── HOW CAPTAIN AI WORKS ──────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                How it works
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Connect, decide, act — on autopilot
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground">
                Captain AI runs a connect → decide → act loop on every conversation, wrapped in the controls your team already relies on.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {PILLARS.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background px-3 py-0.5 text-[11px] font-bold text-muted-foreground">0{i + 1}</span>
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${p.color}`}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-[18px] font-bold tracking-tight text-foreground">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-12">
              <div className="mx-auto mb-6 max-w-2xl text-center">
                <h3 className="text-[18px] font-bold tracking-tight text-foreground">Built-in controls</h3>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground">Captain operates inside guardrails — so autonomy never means a loss of oversight.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CONTROLS.map((c) => {
                  const Icon = c.icon
                  return (
                    <div key={c.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[14px] font-bold text-foreground">{c.label}</p>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{c.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-[15px] font-semibold text-foreground">Give Captain AI the keys to your stack</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Connect your first app in minutes, scope it with Custom Roles, and watch Captain resolve conversations end-to-end across SMS, WhatsApp, Email and Voice.
              </p>
              <Link href="/signup/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground shadow-sm transition hover:opacity-90">
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <AiAgenticFaq />

      </main>
      <FaqJsonLd items={AI_AGENTIC_FAQS} path="/products/ai-agentic/" />
      <SiteFooter />
    </>
  )
}

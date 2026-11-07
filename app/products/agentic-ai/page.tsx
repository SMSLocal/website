import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { FaqSection } from "@/components/landing/faq-section"
import { ProductFinalCta } from "@/components/product/product-page"
import { AgentRace } from "@/components/product/agent-race"

export const metadata: Metadata = getPageMetadata("/products/agentic-ai")

/* ─── LOGOS ───────────────────────────────────────────────────────────────── */

const SITES: Record<string, string> = {
  Shopify: "shopify.com", Razorpay: "razorpay.com", HubSpot: "hubspot.com", Salesforce: "salesforce.com", "Zoho CRM": "zoho.com",
  Stripe: "stripe.com", QuickBooks: "quickbooks.intuit.com", Gmail: "mail.google.com", Slack: "slack.com", GitHub: "github.com",
  Jira: "atlassian.com", Zendesk: "zendesk.com", Freshdesk: "freshdesk.com", Notion: "notion.so", Calendly: "calendly.com",
  Airtable: "airtable.com", WooCommerce: "woocommerce.com", Zoho: "zoho.com",
}

function Logo({ name, size = 22 }: { name: string; size?: number }) {
  const host = SITES[name] ?? "smslocal.in"
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${host}&size=128`} alt={name} title={name} width={size} height={size} style={{ width: size, height: size }} className="shrink-0 object-contain" />
  )
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const SETUP = [
  "Connect an app with one-click OAuth.",
  "Give Captain a role: look up only, or look up and change.",
  "Set the amounts and actions that need a person's approval.",
]

const LOOP = [
  { t: "Understands", d: "Reads the request on WhatsApp, SMS, email or voice and works out the goal." },
  { t: "Plans", d: "Chooses which apps to use and in what order, inside its role." },
  { t: "Acts", d: "Reads live data and makes real changes in your apps, step by step." },
  { t: "Verifies", d: "Checks the result, replies to the customer and writes the audit log." },
]

const DIRECTORY = [
  { cat: "CRM", slug: "crm", apps: ["HubSpot", "Salesforce", "Zoho CRM"] },
  { cat: "E-commerce", slug: "ecommerce", apps: ["Shopify", "WooCommerce"] },
  { cat: "Payments and accounting", slug: "finance-accounting", apps: ["Razorpay", "Stripe", "QuickBooks"] },
  { cat: "Customer support", slug: "sales-customer-support", apps: ["Zendesk", "Freshdesk"] },
  { cat: "Team and work tools", slug: "collaboration-communication", apps: ["Gmail", "Slack", "Notion", "Jira", "GitHub", "Calendly", "Airtable"] },
]

const MORE_CATEGORIES = [
  { slug: "hr-recruiting", label: "HR and recruiting" },
  { slug: "developer-tools-devops", label: "Developer tools" },
  { slug: "document-file-management", label: "Documents and files" },
  { slug: "productivity-project-management", label: "Project management" },
  { slug: "scheduling-booking", label: "Scheduling" },
  { slug: "analytics-data", label: "Analytics" },
  { slug: "marketing-social-media", label: "Marketing" },
  { slug: "workflow-automation", label: "Workflow automation" },
  { slug: "ai-machine-learning", label: "AI and machine learning" },
]

const VERBS = [
  { v: "Track", ask: "Where is my order?", does: "Looks up the shipment and shares live tracking.", apps: ["Shopify", "WooCommerce"] },
  { v: "Reverse", ask: "I was charged twice.", does: "Finds the duplicate payment and refunds it.", apps: ["Razorpay", "Stripe"] },
  { v: "Book", ask: "Can someone call me about pricing?", does: "Creates the lead and books the call slot.", apps: ["HubSpot", "Calendly"] },
  { v: "File", ask: "Did you get my documents?", does: "Stores them and alerts the right team channel.", apps: ["Gmail", "Slack"] },
  { v: "Raise", ask: "The checkout page is broken.", does: "Opens an issue with the details attached.", apps: ["GitHub", "Jira"] },
  { v: "Check", ask: "How many leave days do I have?", does: "Reads the balance and offers to apply for leave.", apps: ["Zoho", "Notion"] },
]

const FAQS = [
  { q: "What is agentic AI?", a: "Agentic AI plans and takes actions to reach a goal instead of only generating replies. In customer support, it is an AI agent that reads the request, uses your business apps and completes the task." },
  { q: "What is Captain AI?", a: "Captain AI is SMSLocal's agentic AI for customer support. It connects to 300+ business apps through Composio and acts inside every conversation: looking up the contact, fetching the invoice, updating the order and closing the ticket." },
  { q: "How is an AI agent different from a chatbot?", a: "A scripted chatbot deflects with canned answers. Captain reads live data from your apps and runs real write actions end to end, so requests get resolved, not routed." },
  { q: "Which apps can Captain AI connect to?", a: "Apps across 20 categories with one-click OAuth, including HubSpot, Salesforce, Razorpay, Stripe, Shopify, Zendesk, GitHub, Gmail and Slack. You choose what Captain may do in each." },
  { q: "Can I control what the AI agent is allowed to do?", a: "Yes. Custom Roles scope the apps and actions Captain can touch, approval limits hold sensitive actions for a person, every lookup and action goes to an audit log, and it honours your SLA targets before escalating to a human." },
  { q: "Which channels does it work on?", a: "WhatsApp, SMS, email and voice from one place, with wallet billing that draws pay-as-you-go from a single balance across every channel and action." },
  { q: "Do I need developers to set it up?", a: "No. Connect your first app with one-click OAuth, scope it with a Custom Role and Captain starts resolving conversations. No code is needed, and most teams are live in minutes." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary"
const H2 = "text-balance text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const GRAD = "bg-gradient-to-r from-primary to-[oklch(0.66_0.13_215)] bg-clip-text text-transparent"
const LINK = "font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary"

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function AiAgenticPage() {
  return (
    <>
      <AnnouncementStrip />
      <ProductServiceJsonLd
        name="SMSLocal Agentic AI Platform"
        description="Agentic AI that plans and acts, not just chats. AI agents refund, invoice, book and update your CRM across 300+ apps on WhatsApp, SMS, email and voice, with permissions, approval limits and an audit log."
        path="/products/agentic-ai"
        category="Agentic AI Platform"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Agentic AI", path: "/products/agentic-ai" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: the same request sent down a chatbot lane and an agent lane */}
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_540px] lg:gap-14 lg:pb-28 lg:pt-20">
            <div className="ag-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Captain AI · Agentic AI platform
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Agentic AI that <span className="text-primary">gets the work done.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Captain plans, acts and reports inside your CRM, payments and helpdesk apps, so customers get an outcome instead of a hand-off.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Book a demo</Link>
              </div>
            </div>
            <div className="ag-rise" style={{ animationDelay: "0.15s" }}><AgentRace /></div>
          </div>
        </section>

        {/* 2 · AGENTIC AI VS CHATBOT: two sentences, one from each */}
        <section className="bg-secondary py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className={EYEBROW}>Agentic AI vs chatbot</p>
            <p className="mt-8 text-balance text-[22px] font-medium leading-snug tracking-[-0.02em] text-muted-foreground/70 sm:text-[30px]">
              A chatbot says, “I’ve raised a ticket for you.”
            </p>
            <span aria-hidden className="mx-auto my-6 block h-10 w-px bg-border" />
            <p className="text-balance text-[26px] font-semibold leading-snug tracking-[-0.03em] sm:text-[38px]">
              An agent says, <span className={GRAD}>“Refund sent. Invoice in your inbox.”</span>
            </p>
          </div>
        </section>

        {/* 3 · HOW IT WORKS: you set up once on the left, Captain loops on the right */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={EYEBROW}>How agentic AI works</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>You set the rules once. Captain does the work every time.</h2>

            <div className="mt-14 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">You, once</p>
                <ul className="mt-5 space-y-4">
                  {SETUP.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[16px] leading-snug">
                      <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={3} />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Captain, on every request</p>
                <ol className="mt-5 border-l border-border">
                  {LOOP.map((l, i) => (
                    <li key={l.t} className="relative pb-7 pl-7 last:pb-0">
                      <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-primary" />
                      <p className="text-[19px] font-semibold tracking-tight"><span className="mr-2 font-mono text-[12px] font-normal text-muted-foreground">{i + 1}</span>{l.t}</p>
                      <p className="mt-1 max-w-md text-[15px] leading-relaxed text-muted-foreground">{l.d}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · INTEGRATIONS: a plain directory, one row per kind of app */}
        <section id="apps" className="bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className={EYEBROW}>Agentic AI integrations</p>
                <h2 className={`${H2} mt-5`}>300+ business apps your AI agent already works in.</h2>
              </div>
              <p className="max-w-xs text-[15px] leading-relaxed text-muted-foreground">One-click OAuth. Captain reads live data and takes action in the tools your team runs today.</p>
            </div>

            <dl className="mt-14 border-t-2 border-foreground">
              {DIRECTORY.map((d) => (
                <div key={d.cat} className="grid gap-x-10 gap-y-3 border-b border-border py-5 md:grid-cols-[220px_1fr_auto] md:items-center">
                  <dt className="text-[17px] font-semibold tracking-tight">{d.cat}</dt>
                  <dd className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[15px] text-foreground/80">
                    {d.apps.map((a) => <span key={a} className="inline-flex items-center gap-2"><Logo name={a} />{a}</span>)}
                  </dd>
                  <Link href={`/products/agentic-ai/apps/${d.slug}`} className="inline-flex items-center gap-1 text-[13.5px] font-medium text-primary hover:underline">All {d.cat.toLowerCase()} apps <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">
              Also in the catalog:{" "}
              {MORE_CATEGORIES.map((c, i) => (
                <span key={c.slug}><Link href={`/products/agentic-ai/apps/${c.slug}`} className={LINK}>{c.label}</Link>{i < MORE_CATEGORIES.length - 1 ? ", " : "."}</span>
              ))}
            </p>
          </div>
        </section>

        {/* 5 · USE CASES: one big verb per request */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={EYEBROW}>Agentic AI use cases</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>Six everyday requests, each ending in an action.</h2>

            <div className="mt-16 grid gap-x-14 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {VERBS.map((c) => (
                <article key={c.v}>
                  <p className="text-[44px] font-semibold leading-none tracking-[-0.045em] text-primary sm:text-[52px]">{c.v}</p>
                  <p className="mt-5 text-[17px] font-medium leading-snug tracking-tight">“{c.ask}”</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{c.does}</p>
                  <p className="mt-4 flex items-center gap-2.5">{c.apps.map((a) => <Logo key={a} name={a} size={24} />)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · CONTROL: one refund rule drawn as a ruler */}
        <section className="bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className={EYEBROW}>AI agent permissions and audit log</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>You decide how much Captain does alone.</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">An example refund rule. Change the amounts to fit your business, per app and per role.</p>

            <div className="mt-20">
              <div className="relative">
                <div className="flex h-2.5 overflow-hidden rounded-full">
                  <span className="w-[34%] bg-primary" />
                  <span className="w-[34%] bg-accent" />
                  <span className="w-[32%] bg-foreground" />
                </div>
                {/* pin for the hero example */}
                <span className="absolute -top-[46px] left-[12%] -translate-x-1/2 text-center">
                  <span className="block whitespace-nowrap rounded-full bg-background px-3 py-1 text-[12px] font-semibold shadow-sm ring-1 ring-border">Order #1042 · ₹399</span>
                  <span className="mx-auto block h-3 w-px bg-foreground/60" />
                </span>
                <span className="absolute left-[34%] top-0 h-2.5 w-0.5 -translate-x-1/2 bg-background" />
                <span className="absolute left-[68%] top-0 h-2.5 w-0.5 -translate-x-1/2 bg-background" />
              </div>

              <div className="mt-5 grid gap-8 md:grid-cols-3 md:gap-10">
                {[
                  { r: "Up to ₹500", t: "Captain acts alone", d: "Refunds, status updates and lookups finish on their own, and the customer hears back within seconds." },
                  { r: "₹500 to ₹5,000", t: "A manager approves", d: "Captain prepares the action and holds it. One tap from a person and it goes ahead." },
                  { r: "Above ₹5,000", t: "A person takes over", d: "Captain hands the full context to your team and stays out of the way." },
                ].map((x) => (
                  <div key={x.t}>
                    <p className="font-mono text-[12px] text-muted-foreground">{x.r}</p>
                    <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight">{x.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-14 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
              Allowed or blocked, every step is written to the audit log with who, what, when and which app, so you can review any conversation later. Captain also honours your SLA targets before it escalates. Read more on{" "}
              <Link href="/platform/security/" className={LINK}>security and compliance</Link>.
            </p>
          </div>
        </section>

        {/* 7 · FAQ (shared with the home page) */}
        <section className="bg-background">
          <FaqJsonLd items={FAQS} path="/products/agentic-ai/" />
          <FaqSection items={FAQS} />
          <p className="mx-auto max-w-6xl px-4 pb-16 text-[15px] leading-relaxed text-muted-foreground sm:px-6">
            Keep exploring:{" "}
            <Link href="/products/ai-agents/" className={LINK}>AI agents on WhatsApp</Link>, <Link href="/voice-ai-agents/" className={LINK}>voice AI agents</Link>, <Link href="/products/agent-copilot/" className={LINK}>Agent Copilot</Link>, <Link href="/products/omnichannel-inbox/" className={LINK}>the omnichannel inbox</Link> and the <Link href="/platform/" className={LINK}>platform overview</Link>.
          </p>
        </section>

        <ProductFinalCta
          title="Give your support team an agent that finishes the job."
          subtitle="Connect one app, set a role and watch Captain resolve its first conversation."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes ag-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .ag-rise { animation: ag-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .ag-rise { animation: none } }
      `}</style>
    </>
  )
}

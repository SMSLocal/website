import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { FaqSection } from "@/components/landing/faq-section"

export const metadata: Metadata = getPageMetadata("/products/agentic-ai")

/* ─── LOGOS ───────────────────────────────────────────────────────────────── */

const SITES: Record<string, string> = {
  Shopify: "shopify.com", Razorpay: "razorpay.com", HubSpot: "hubspot.com", Salesforce: "salesforce.com", "Zoho CRM": "zoho.com",
  Stripe: "stripe.com", QuickBooks: "quickbooks.intuit.com", Gmail: "mail.google.com", Slack: "slack.com", GitHub: "github.com",
  Jira: "atlassian.com", Zendesk: "zendesk.com", Freshdesk: "freshdesk.com", Notion: "notion.so", Calendly: "calendly.com",
  Airtable: "airtable.com", WooCommerce: "woocommerce.com", Zoho: "zoho.com",
}

function Logo({ name, size = 36, plain = false }: { name: string; size?: number; plain?: boolean }) {
  const host = SITES[name] ?? "smslocal.in"
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${host}&size=128`} alt={name} title={name} width={size} height={size} style={{ width: size, height: size }} className={`shrink-0 object-contain ${plain ? "" : "rounded-xl bg-white p-1 ring-1 ring-border"}`} />
  )
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const PLAN = [
  { app: "Shopify", t: "Find order #1042", call: "GET /orders/1042", s: 12 },
  { app: "Razorpay", t: "Refund ₹1,499", call: "POST /refunds", s: 26 },
  { app: "QuickBooks", t: "Fetch invoice INV-2291", call: "GET /invoices", s: 40 },
  { app: "Gmail", t: "Email invoice to customer", call: "POST /messages/send", s: 54 },
  { app: "HubSpot", t: "Log note on the contact", call: "PATCH /contacts", s: 68 },
]

const STAGES = [
  { n: "01", t: "Understand", d: "Reads the request on WhatsApp, SMS, email or voice and works out the goal." },
  { n: "02", t: "Plan", d: "Picks which apps to use and in what order, inside the role you set." },
  { n: "03", t: "Act", d: "Calls your apps to read live data and make real changes, step by step." },
  { n: "04", t: "Verify", d: "Checks the result, replies to the customer and writes the audit log." },
]

const ROW_A = ["Shopify", "Razorpay", "HubSpot", "Salesforce", "Stripe", "Zendesk", "Freshdesk", "Zoho CRM"]
const ROW_B = ["Gmail", "Slack", "GitHub", "Notion", "Jira", "QuickBooks", "Airtable", "Calendly"]

const APP_CATEGORIES = [
  { slug: "crm", label: "CRM" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "finance-accounting", label: "Finance and Accounting" },
  { slug: "sales-customer-support", label: "Sales and Customer Support" },
  { slug: "developer-tools-devops", label: "Developer Tools and DevOps" },
  { slug: "hr-recruiting", label: "HR and Recruiting" },
  { slug: "document-file-management", label: "Document and File Management" },
  { slug: "collaboration-communication", label: "Collaboration and Communication" },
  { slug: "productivity-project-management", label: "Productivity and Project Management" },
  { slug: "scheduling-booking", label: "Scheduling and Booking" },
  { slug: "analytics-data", label: "Analytics and Data" },
  { slug: "data-analytics", label: "Data and Analytics" },
  { slug: "ai-machine-learning", label: "AI and Machine Learning" },
  { slug: "workflow-automation", label: "Workflow Automation" },
  { slug: "marketing-social-media", label: "Marketing and Social Media" },
  { slug: "social-media", label: "Social Media" },
]

const CASES = [
  { tag: "Order support", ask: "Where is my order?", does: "Looks up the shipment and shares live tracking.", apps: ["Shopify", "WooCommerce"] },
  { tag: "Payments and billing", ask: "I was charged twice.", does: "Finds the duplicate payment and reverses it.", apps: ["Razorpay", "Stripe"] },
  { tag: "CRM and sales", ask: "Can someone call me about pricing?", does: "Creates the lead and books the call slot.", apps: ["HubSpot", "Calendly"] },
  { tag: "Inbox and comms", ask: "Did you get my documents?", does: "Files them and alerts the right team channel.", apps: ["Gmail", "Slack"] },
  { tag: "Engineering and DevOps", ask: "The checkout page is broken.", does: "Opens an issue with the details attached.", apps: ["GitHub", "Jira"] },
  { tag: "HR and internal help", ask: "How many leave days do I have?", does: "Reads the balance and offers to apply for leave.", apps: ["Zoho", "Notion"] },
]

const FAQS = [
  { q: "What is agentic AI?", a: "Agentic AI plans and takes actions to reach a goal instead of only generating replies. In customer support, it is an AI agent that reads the request, uses your business apps and completes the task." },
  { q: "What is Captain AI?", a: "Captain AI is SMSLocal's agentic AI for customer support. It connects to 300+ business apps through Composio and acts inside every conversation: looking up the contact, fetching the invoice, updating the order and closing the ticket." },
  { q: "How is an AI agent different from a chatbot?", a: "A scripted chatbot deflects with canned answers. Captain reads live data from your apps and runs real write actions end to end, so requests get resolved, not routed." },
  { q: "Which apps can Captain AI connect to?", a: "Apps across 20 categories with one-click OAuth, including HubSpot, Salesforce, Razorpay, Stripe, Shopify, Zendesk, GitHub, Gmail and Slack. You choose what Captain may do in each." },
  { q: "Can I control what the AI agent is allowed to do?", a: "Yes. Custom Roles scope the apps and actions Captain can touch, every lookup and action goes to an audit log, and it honours your SLA targets before escalating to a human." },
  { q: "Which channels does it work on?", a: "WhatsApp, SMS, email and voice from one place, with wallet billing that draws pay-as-you-go from a single balance across every channel and action." },
  { q: "Do I need developers to set it up?", a: "No. Connect your first app with one-click OAuth, scope it with a Custom Role and Captain starts resolving conversations. No code is needed, and most teams are live in minutes." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const GRAD = "bg-gradient-to-r from-primary to-[oklch(0.66_0.13_215)] bg-clip-text text-transparent"

/* ─── KEYFRAMES FROM DATA ─────────────────────────────────────────────────── */

const fadeWin = (name: string, from: number) =>
  `@keyframes ${name} { 0%, ${from}% { opacity: 0; transform: translateY(10px) } ${from + 4}%, 95% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }`

const KEYFRAMES = [
  ...PLAN.flatMap((c, i) => [
    `@keyframes agidle${i} { 0%, ${c.s}% { opacity: 1 } ${c.s + 1}%, 95% { opacity: 0 } 98%, 100% { opacity: 1 } }`,
    `@keyframes agrun${i} { 0%, ${c.s}% { opacity: 0 } ${c.s + 1}%, ${c.s + 11}% { opacity: 1 } ${c.s + 12}%, 100% { opacity: 0 } }`,
    `@keyframes agdone${i} { 0%, ${c.s + 11}% { opacity: 0 } ${c.s + 12}%, 95% { opacity: 1 } 98%, 100% { opacity: 0 } }`,
    `@keyframes agrow${i} { 0%, ${c.s - 1}% { opacity: .38 } ${c.s + 3}%, 95% { opacity: 1 } 98%, 100% { opacity: .38 } }`,
  ]),
  fadeWin("agmsg", 2),
  fadeWin("agresult", 82),
  "@keyframes agvfill { 0%, 8% { transform: scaleY(0) } 82%, 95% { transform: scaleY(1) } 98%, 100% { transform: scaleY(0) } }",
].join("\n")

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function AiAgenticPage() {
  return (
    <>
      <AnnouncementStrip />
      <ProductServiceJsonLd
        name="SMSLocal Agentic AI Platform"
        description="Agentic AI that plans and acts, not just chats. AI agents refund, invoice, book and update your CRM across 300+ apps on WhatsApp, SMS, email and voice, with permissions and an audit log."
        path="/products/agentic-ai"
        category="Agentic AI Platform"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Agentic AI", path: "/products/agentic-ai" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a live agent workspace. The only framed visual on the page */}
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-primary/8 blur-[130px]" />
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_60%_30%,black_10%,transparent_70%)]" />
          </div>

          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_540px] lg:gap-10 lg:pb-28 lg:pt-20">
            <div className="ag-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Captain AI · Agentic AI platform
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Agentic AI that <span className="text-primary">gets the work done.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Captain is an AI agent for customer support. It plans, acts and reports inside your CRM, payments, e-commerce and helpdesk apps, so customers get outcomes instead of hand-offs.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Book a demo</Link>
              </div>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.18em] text-muted-foreground">
                WhatsApp <i className="h-1 w-1 rounded-full bg-primary" /> SMS <i className="h-1 w-1 rounded-full bg-primary" /> Email <i className="h-1 w-1 rounded-full bg-primary" /> Voice
              </p>
            </div>

            {/* boxless agent thread: one glowing line, a message, five app steps, a result */}
            <div className="ag-rise relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "0.15s" }} aria-hidden>
              <p className="mb-3 flex items-center gap-2 pl-[50px] font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground"><i className="h-1.5 w-1.5 rounded-full bg-primary" />Example run · WhatsApp</p>
              <div className="relative">
                <span className="absolute bottom-5 left-[17px] top-5 w-[2px] rounded-full bg-border" />
                <span className="ag-vfill absolute bottom-5 left-[17px] top-5 w-[2px] origin-top rounded-full bg-primary" />

                <div className="ag-msg relative flex gap-3.5 pb-4">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">RK</span>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Rohan K. · customer</p>
                    <p className="mt-1 text-[14px] font-medium leading-snug tracking-tight sm:text-[15px]">“My payment failed but the money was deducted. Please refund order #1042 and email me the invoice.”</p>
                  </div>
                </div>

                {PLAN.map((p, i) => (
                  <div key={p.app} className="relative flex items-center gap-3.5 py-1.5" style={{ animation: `agrow${i} 12s linear infinite` }}>
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background shadow-md shadow-primary/10 ring-1 ring-border">
                      <Logo name={p.app} size={20} plain />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background" style={{ animation: `agdone${i} 12s linear infinite`, opacity: 0 }}><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold leading-tight tracking-tight">{p.t}</p>
                      <p className="mt-0.5 truncate font-mono text-[10.5px] text-muted-foreground">{p.app} · {p.call}</p>
                    </div>
                    <div className="relative h-[18px] w-[76px] shrink-0 font-mono text-[11px]">
                      <span className="absolute inset-0 flex items-center justify-end text-muted-foreground" style={{ animation: `agidle${i} 12s linear infinite` }}>queued</span>
                      <span className="absolute inset-0 flex items-center justify-end gap-1.5 text-primary" style={{ animation: `agrun${i} 12s linear infinite`, opacity: 0 }}><i className="ag-spin h-3 w-3 rounded-full border-[1.5px] border-primary border-t-transparent" />running</span>
                      <span className="absolute inset-0 flex items-center justify-end text-primary" style={{ animation: `agdone${i} 12s linear infinite`, opacity: 0 }}>done</span>
                    </div>
                  </div>
                ))}

                <div className="ag-result relative flex items-center gap-3.5 pt-3.5" style={{ opacity: 0 }}>
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" strokeWidth={3} /></span>
                  <div>
                    <p className="text-[18px] font-semibold leading-none tracking-tight text-primary">Resolved.</p>
                    <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Refund sent, invoice emailed, 5 actions logged. No ticket raised.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 · AGENTIC AI VS CHATBOT: pure typography on dark, a struck-out word and two plain columns */}
        <section className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32">
          <div aria-hidden className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/30 blur-[140px]" />
          <div aria-hidden className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.66_0.13_215)]/25 blur-[140px]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>Agentic AI vs chatbot</p>
            <h2 className="mt-6 text-[32px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">
              <span className="ag-strike relative inline-block text-background/35">Chatbots talk.</span>
              <br />
              <span className={GRAD}>Agents act.</span>
            </h2>
            <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-0">
              <div className="md:pr-14">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/45">A scripted chatbot</p>
                <ul className="mt-5 space-y-3.5 text-[19px] leading-snug text-background/55 sm:text-[22px]">
                  <li>Answers from a fixed script</li>
                  <li>Sends the customer to another channel</li>
                  <li>Opens a ticket for a person to finish</li>
                </ul>
              </div>
              <div className="border-background/15 md:border-l md:pl-14">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Agentic AI</p>
                <ul className="mt-5 space-y-3.5 text-[19px] leading-snug sm:text-[22px]">
                  {["Reads live data from your apps", "Takes the action inside those apps", "Replies, logs it and closes the request"].map((t) => (
                    <li key={t} className="flex items-start gap-3"><Check className="mt-1.5 h-5 w-5 shrink-0 text-primary" strokeWidth={3} />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3 · HOW IT WORKS: one line, four stops, a light travelling along it */}
        <section className="relative bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How agentic AI works</p>
              <h2 className={`${H2} mt-5`}>Four steps, repeated until the job is <span className={GRAD}>done.</span></h2>
            </div>

            <div className="relative mt-16">
              <div aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-border md:block">
                <span className="ag-travel absolute -top-[3px] h-[7px] w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
              <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-border md:hidden" />
              <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
                {STAGES.map((s) => (
                  <li key={s.t} className="relative pl-9 md:pl-0 md:pt-10">
                    <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-[3px] border-primary bg-background md:top-0" />
                    <p className="ag-outline text-[44px] font-semibold leading-none tracking-tighter">{s.n}</p>
                    <h3 className="mt-4 text-[24px] font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4 · INTEGRATIONS: oversized type, two logo-and-name marquees, a plain text index */}
        <section id="apps" className="relative overflow-hidden bg-secondary py-24 lg:py-32">
          <div className="mx-auto grid max-w-6xl items-end gap-6 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-16">
            <p aria-hidden className={`${GRAD} text-[60px] font-semibold leading-[0.85] tracking-[-0.05em] sm:text-[80px]`}>300+</p>
            <div className="pb-2">
              <p className={`${EYEBROW} text-primary`}>Agentic AI integrations</p>
              <h2 className={`${H2} mt-4 max-w-xl`}>Apps your AI agent already works inside.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Connect with one-click OAuth. Captain reads live data and takes action in the tools your team runs today.</p>
            </div>
          </div>

          <div className="mt-16 space-y-5">
            {[ROW_A, ROW_B].map((row, r) => (
              <div key={r} className="ag-fade-x overflow-hidden">
                <div className={`flex w-max items-center gap-12 ${r ? "ag-marquee-r" : "ag-marquee"}`}>
                  {[...row, ...row].map((n, i) => (
                    <span key={`${n}-${i}`} className="flex items-center gap-3 text-[22px] font-semibold tracking-tight text-foreground/30 transition hover:text-foreground sm:text-[28px]" aria-hidden={i >= row.length}>
                      <Logo name={n} size={40} plain />{n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Browse by category</p>
            <ul className="mt-4 grid gap-x-10 border-t border-foreground/80 sm:grid-cols-2 lg:grid-cols-3">
              {APP_CATEGORIES.map((c) => (
                <li key={c.slug} className="border-b border-border">
                  <Link href={`/products/agentic-ai/apps/${c.slug}`} className="group flex items-center justify-between py-3 text-[15.5px] text-foreground/80 transition hover:pl-1.5 hover:text-primary">
                    {c.label}<ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · USE CASES: oversized rows, the action slides in on hover */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Agentic AI use cases</p>
              <h2 className={`${H2} mt-5`}>What customers ask. <span className={GRAD}>What Captain does.</span></h2>
            </div>
            <ul className="mt-14 border-t-2 border-foreground">
              {CASES.map((c, i) => (
                <li key={c.ask} className="group relative border-b border-border py-7 transition-all duration-300 hover:pl-5 sm:py-9">
                  <span aria-hidden className="absolute bottom-0 left-0 top-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-primary to-[oklch(0.66_0.13_215)] transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="grid items-center gap-x-10 gap-y-3 md:grid-cols-[1.25fr_1fr]">
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground"><span className="mr-3 text-primary">{String(i + 1).padStart(2, "0")}</span>{c.tag}</p>
                      <p className="mt-2 text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[30px]">“{c.ask}”</p>
                    </div>
                    <div className="flex items-center gap-4 md:justify-end md:opacity-75 md:transition md:duration-300 md:group-hover:opacity-100">
                      <p className="max-w-[280px] text-[15px] leading-snug text-muted-foreground md:text-right">{c.does}</p>
                      <span className="flex -space-x-2">{c.apps.map((a) => <Logo key={a} name={a} size={34} />)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 · CONTROL: a rule written as a sentence, then three plain columns */}
        <section className="relative overflow-hidden bg-secondary py-24 lg:py-32">
          <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}><ShieldCheck className="h-4 w-4" />AI agent permissions and audit log</p>
            <p className="mt-8 text-balance text-[20px] font-medium leading-[1.6] tracking-[-0.01em] sm:text-[28px] sm:leading-[1.6]">
              Captain may <Chip>look up</Chip> orders in <Chip logo="Shopify">Shopify</Chip>, may <Chip>change</Chip> them in <Chip logo="Razorpay">Razorpay</Chip> and <Chip logo="HubSpot">HubSpot</Chip>, and must <Chip warn>ask a person</Chip> before any discount above 20%. Every step lands in the <Chip>audit log</Chip>.
            </p>

            <div className="mt-16 grid gap-10 border-t border-foreground/80 pt-10 md:grid-cols-3 md:gap-12">
              {[
                { t: "Role-based access", d: "Scope each connected app to look up only, or to look up and change." },
                { t: "Human approval", d: "Hold sensitive actions for a person to approve before Captain goes ahead." },
                { t: "Complete audit trail", d: "Every lookup and action is recorded: who, what, when and in which app." },
              ].map((x, i) => (
                <div key={x.t}>
                  <p className="font-mono text-[12px] text-primary">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-tight">{x.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>

            <ul className="mt-14 space-y-1.5 border-l-2 border-primary/60 pl-5 font-mono text-[12.5px] text-muted-foreground">
              <li className="ag-log"><span className="mr-3 text-foreground/40">10:42:08</span><span className="mr-3 text-primary">OK</span>Razorpay · refund issued</li>
              <li className="ag-log" style={{ animationDelay: ".5s" }}><span className="mr-3 text-foreground/40">10:42:09</span><span className="mr-3 text-primary">OK</span>HubSpot · note added to contact</li>
              <li className="ag-log" style={{ animationDelay: "1s" }}><span className="mr-3 text-foreground/40">10:42:09</span><span className="mr-3 text-destructive">DENIED</span>Stripe · write blocked by role</li>
            </ul>
          </div>
        </section>

        {/* 7 · FAQ (shared with the home page), then a full-width call to action */}
        <section className="bg-background">
          <FaqJsonLd items={FAQS} path="/products/agentic-ai/" />
          {/* same FAQ component and styling as the home page */}
          <FaqSection items={FAQS} />

          <div className="ag-cta relative overflow-hidden px-4 py-24 text-center text-primary-foreground sm:px-6 lg:py-32">
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-[90px]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-balance text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[40px]">Give your support team an agent that finishes the job.</h2>
              <div className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-full bg-white p-2 pl-6 text-left text-foreground shadow-2xl shadow-black/20">
                <Sparkles className="h-5 w-5 shrink-0 text-primary" />
                <span className="relative h-6 flex-1 overflow-hidden text-[15px] text-muted-foreground">
                  <span className="ag-ph absolute inset-0 truncate">Ask Captain to refund an order…</span>
                  <span className="ag-ph absolute inset-0 truncate" style={{ animationDelay: "-6s" }}>Ask Captain to send an invoice…</span>
                  <span className="ag-ph absolute inset-0 truncate" style={{ animationDelay: "-3s" }}>Ask Captain to update the CRM…</span>
                </span>
                <Link href="/signup/" className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-[13.5px] font-semibold text-background transition hover:bg-foreground/85">Start trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
              </div>
              <p className="mt-5 text-[14px] text-primary-foreground/85">Or <Link href="/company/contact/" className="font-semibold underline underline-offset-4">book a demo</Link> and see Captain run on your own apps.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <style>{`
        @property --ag-a { syntax: "<angle>"; initial-value: 0deg; inherits: false }
        ${KEYFRAMES}
        @keyframes ag-a { to { --ag-a: 360deg } }
        @keyframes ag-spin { to { transform: rotate(360deg) } }
        @keyframes ag-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        @keyframes ag-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
        @keyframes ag-cta { 0%, 100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes ag-ph { 0% { opacity: 0; transform: translateY(8px) } 6%, 30% { opacity: 1; transform: none } 36%, 100% { opacity: 0; transform: translateY(-8px) } }
        @keyframes ag-marquee { to { transform: translateX(-50%) } }
        @keyframes ag-marquee-r { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes ag-travel { 0% { left: -10% } 100% { left: 100% } }
        @keyframes ag-strike { 0%, 20% { width: 0 } 55%, 100% { width: 100% } }
        @keyframes ag-word { 0% { opacity: 0; transform: translateY(100%) } 4%, 22% { opacity: 1; transform: none } 26%, 100% { opacity: 0; transform: translateY(-100%) } }
        @keyframes ag-aura { 0%, 100% { opacity: .55; transform: scale(1) } 50% { opacity: 1; transform: scale(1.05) } }
        @keyframes ag-log { from { opacity: 0; transform: translateX(-10px) } to { opacity: 1; transform: none } }

        .ag-beam { background-color: var(--border); background-image: conic-gradient(from var(--ag-a), transparent 0 55%, var(--primary) 78%, oklch(0.66 0.13 215) 90%, transparent 100%); animation: ag-a 6s linear infinite }
        .ag-msg { opacity: 0; animation: agmsg 12s linear infinite }
        .ag-result { animation: agresult 12s linear infinite }
        .ag-vfill { transform: scaleY(0); animation: agvfill 12s linear infinite }
        .ag-spin { animation: ag-spin .8s linear infinite }
        .ag-rise { animation: ag-rise .9s cubic-bezier(.2,.7,.2,1) both }
        .ag-float { animation: ag-float 5s ease-in-out infinite }
        .ag-ph { opacity: 0; animation: ag-ph 9s linear infinite }
        .ag-cta { background-image: linear-gradient(120deg, oklch(0.55 0.13 172), oklch(0.62 0.14 168), oklch(0.58 0.13 205), oklch(0.55 0.13 172)); background-size: 300% 300%; animation: ag-cta 14s ease infinite }
        .ag-marquee { animation: ag-marquee 50s linear infinite }
        .ag-marquee-r { animation: ag-marquee-r 56s linear infinite }
        .ag-marquee:hover, .ag-marquee-r:hover { animation-play-state: paused }
        .ag-fade-x { mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent) }
        .ag-travel { animation: ag-travel 4.5s ease-in-out infinite }
        .ag-strike::after { content: ""; position: absolute; left: 0; top: 52%; height: 3px; width: 100%; background: var(--destructive); border-radius: 3px; animation: ag-strike 5s ease-in-out infinite alternate }
        .ag-outline { color: transparent; -webkit-text-stroke: 1.5px var(--primary) }
        .ag-log { opacity: 0; animation: ag-log .5s ease-out forwards }
        .ag-word { opacity: 0; animation: ag-word 12s cubic-bezier(.2,.7,.2,1) infinite }
        .ag-aura { animation: ag-aura 6s ease-in-out infinite }
        .ag-tilt { transform: perspective(1600px) rotateY(-6deg) rotateX(2.5deg); transition: transform .5s ease }
        .ag-tilt:hover { transform: perspective(1600px) rotateY(0) rotateX(0) }
        @media (max-width: 1023px) { .ag-tilt { transform: none } }

        @media (prefers-reduced-motion: reduce) {
          .ag-beam, .ag-spin, .ag-rise, .ag-float, .ag-cta, .ag-marquee, .ag-marquee-r, .ag-travel, .ag-aura { animation: none }
          .ag-word { animation: none; opacity: 0 } .ag-word:first-child { opacity: 1 }
          .ag-msg, .ag-result, .ag-log { animation: none; opacity: 1 }
          .ag-vfill { animation: none; transform: scaleY(1) }
          .ag-strike::after { animation: none }
          .ag-ph { animation: none; opacity: 0 } .ag-ph:first-child { opacity: 1 }
          [style*="agidle"], [style*="agrun"] { animation: none !important; opacity: 0 !important }
          [style*="agdone"] { animation: none !important; opacity: 1 !important }
          [style*="agrow"] { animation: none !important }
        }
      `}</style>
    </>
  )
}

/* inline highlight used inside the permission sentence */
function Chip({ children, logo, warn }: { children: React.ReactNode; logo?: string; warn?: boolean }) {
  return (
    <span className={`mx-0.5 inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 align-baseline font-semibold ${warn ? "bg-accent/45 text-accent-foreground" : "bg-primary/12 text-primary"}`}>
      {logo ? <Logo name={logo} size={22} plain /> : null}{children}
    </span>
  )
}

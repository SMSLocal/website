import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
    GraduationCap,
  HeartPulse,
  Hotel,
  KeyRound,
  Landmark,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { SolutionsHero } from "@/components/solution/solutions-hero"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

type Industry = { slug: string; name: string; c: string; Icon: LucideIcon; line: string; uses: string[] }

const INDUSTRIES: Industry[] = [
  { slug: "ecommerce", name: "E-commerce & D2C", c: "#10b981", Icon: ShoppingBag, line: "Confirm orders, recover carts and run festive sales.", uses: ["Order and shipping alerts", "Cart recovery on WhatsApp", "Festive broadcasts", "Delivery OTPs"] },
  { slug: "banking-fintech", name: "Banking & Fintech", c: "#0ea5e9", Icon: Landmark, line: "Fast OTPs and regulator-ready transaction alerts.", uses: ["Two-factor OTPs", "Credit and debit alerts", "WhatsApp KYC flows", "Fraud notifications"] },
  { slug: "healthcare", name: "Healthcare", c: "#f43f5e", Icon: HeartPulse, line: "Patient messaging that reduces no-shows.", uses: ["Appointment reminders", "Lab report links", "Refill reminders", "Multilingual patient Q&A"] },
  { slug: "education", name: "Education & EdTech", c: "#f59e0b", Icon: GraduationCap, line: "Keep students, parents and staff in sync.", uses: ["Fee reminders", "Exam schedules", "Parent updates", "Admission flows"] },
  { slug: "logistics", name: "Logistics & Delivery", c: "#6366f1", Icon: Truck, line: "Messaging built for the pace of last-mile delivery.", uses: ["Dispatch alerts", "Delivery OTPs", "Live tracking links", "Driver WhatsApp flows"] },
  { slug: "real-estate", name: "Real Estate", c: "#14b8a6", Icon: Building2, line: "Close more deals with timely, personal messaging.", uses: ["Listing alerts", "Site-visit invites", "AI lead qualification", "Nurture flows"] },
  { slug: "retail", name: "Retail & Hospitality", c: "#d946ef", Icon: Hotel, line: "Keep customers and guests coming back.", uses: ["Loyalty updates", "Reservation reminders", "Flash sales", "Post-visit feedback"] },
]

const BLOCKS: { Icon: LucideIcon; t: string; d: string; href: string }[] = [
  { Icon: MessageSquare, t: "DLT-compliant SMS", d: "Transactional and promotional routes with your sender IDs and approved templates.", href: "/products/bulk-sms/" },
  { Icon: MessageCircle, t: "WhatsApp Business API", d: "Two-way conversations, templates and broadcasts on the channel customers already use.", href: "/products/whatsapp-business-api/" },
  { Icon: KeyRound, t: "OTP routes", d: "Priority delivery for login codes, payments and delivery verification.", href: "/products/otp-sms/" },
  { Icon: Bot, t: "AI agents", d: "AI Captain answers routine questions and hands over to your team when needed.", href: "/products/ai-agents/" },
]

const RULES = [
  { t: "DLT registration", d: "Sender IDs and message templates are registered before a single message is sent." },
  { t: "Transactional vs promotional", d: "Each template is classified at registration so it is routed on the right lane." },
  { t: "TRAI timing window", d: "Promotional messages are delivered between 9 AM and 9 PM." },
  { t: "Opt-in for WhatsApp", d: "Customers opt in before you message them, and can opt out any time." },
]

const FAQS = [
  { q: "Which industries does SMSLocal have solutions for?", a: "E-commerce and D2C, banking and fintech, healthcare, education, logistics, real estate, and retail and hospitality. Each page shows the messages that industry sends most." },
  { q: "Are the solutions different products?", a: "No. Every solution uses the same platform: DLT-compliant SMS, WhatsApp Business API, OTP routes and AI agents. A solution is a ready set of use cases, templates and flows for one industry." },
  { q: "Do I need DLT registration to use these solutions?", a: "Yes, for SMS in India. Sender IDs and templates are registered on DLT before sending, and SMSLocal guides you through the process." },
  { q: "Can I use more than one solution?", a: "Yes. A business that sells online and runs outlets can use the e-commerce and retail playbooks together, with one wallet and one inbox." },
  { q: "What if my industry is not listed?", a: "The same building blocks power any customer messaging workflow. Talk to us about your use case and we will show you the fastest way to set it up." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MessageSquare, label: "SMS and WhatsApp in one platform" },
  { icon: ShieldCheck, label: "DLT-compliant templates" },
  { icon: KeyRound, label: "Priority OTP routes" },
  { icon: Bot, label: "AI agents that hand over to your team" },
]

export default function SolutionsHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
      />
      <SiteHeader />
      <main className="flex-1 overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: one inbox, seven industries travelling around it */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />Industry playbooks
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Business messaging solutions for <span className="text-primary">seven Indian industries.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                One platform for SMS, WhatsApp, OTP and AI agents, with ready playbooks for the messages each industry sends every day.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <SolutionsHero />
            </div>
          </div>
        </section>

        {/* 2 · THE INDUSTRIES: an editorial directory, one row per industry */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className={`${EYEBROW} text-primary`}>Pick your industry</p>
              <h2 className={`${H2} mt-5`}>Find the playbook that matches your business.</h2>
              <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-muted-foreground">Each page shows the messages that industry sends most, which channel suits each one, and how the compliance rules apply.</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {INDUSTRIES.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/solutions/${ind.slug}/`} className="group grid gap-4 py-6 sm:grid-cols-[52px_1fr_auto] sm:items-start">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ background: ind.c }}><ind.Icon className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-[19px] font-semibold tracking-tight">{ind.name}</p>
                      <p className="mt-1 text-[14.5px] text-muted-foreground">{ind.line}</p>
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-foreground/70">
                        {ind.uses.map((u) => <span key={u} className="inline-flex items-center gap-1.5"><i className="h-1 w-1 rounded-full" style={{ background: ind.c }} />{u}</span>)}
                      </p>
                    </div>
                    <span className="hidden items-center gap-1.5 text-[13.5px] font-semibold text-primary sm:inline-flex">Explore<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 · ONE PLATFORM: the four building blocks every playbook is made from */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>One platform</p>
              <h2 className={`${H2} mt-5`}>Every playbook is built from the same four blocks.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">A solution is not a separate product. It is a ready mix of these tools, so you can start with one industry and add another later.</p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-4">
              {BLOCKS.map((b) => (
                <Link key={b.t} href={b.href} className="group flex flex-col bg-background p-6 transition hover:bg-secondary">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary"><b.Icon className="h-5 w-5" /></span>
                  <p className="mt-5 text-[17px] font-semibold tracking-tight">{b.t}</p>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">{b.d}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary">Learn more<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · COMPLIANCE: a dark band with the four rules every playbook follows */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#7fdcb8]`}>Compliance built in</p>
              <h2 className={`${H2} mt-5`}>The rules differ by industry. The setup does not.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">Whichever playbook you start from, messages follow the same Indian rules by default, so your team does not have to remember them.</p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {RULES.map((r, i) => (
                <li key={r.t} className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15">
                  <span className="font-mono text-[12px] font-semibold text-[#7fdcb8]">0{i + 1}</span>
                  <p className="mt-2 text-[16px] font-semibold">{r.t}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65">{r.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 · NOT LISTED: a centred prompt */}
        <section className="bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className={`${EYEBROW} justify-center text-primary`}>Not seeing your industry?</p>
            <h2 className={`${H2} mt-5`}>Tell us the message you need to send.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">The same blocks power any customer messaging workflow. Describe yours and we will show you the quickest way to set it up.</p>
            <ul className="mx-auto mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-foreground/75">
              {["Setup guidance", "Template help", "One wallet for every channel"].map((t) => <li key={t} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" strokeWidth={3} />{t}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/company/contact/" className={BTN}>Talk to sales <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
              <Link href="/products/" className={BTN_OUT}>Browse products</Link>
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions" />
        <FaqSection items={FAQS} />

        <ProductFinalCta
          title="Start with the playbook that fits."
          subtitle="One platform, one wallet, and a ready set of messages for your industry."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}

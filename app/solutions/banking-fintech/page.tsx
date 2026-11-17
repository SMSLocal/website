import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Database,
  FileKey2,
  Fingerprint,
  Layers,
  Lock,
  Route,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { BankingHero } from "@/components/solution/banking-hero"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/banking-fintech")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* what a regulated messaging stack is made of, from the API down to the audit log */
const STACK = [
  { Icon: Fingerprint, t: "One API call per message", d: "Every OTP request accepts an idempotency key, so a retried request never sends a second code or charges twice. Delivery-status webhooks report back to your system.", href: "/products/otp-sms/", link: "OTP API details" },
  { Icon: Route, t: "A priority route for every code", d: "OTP traffic runs on a separate route, isolated from promotional bulk, with automatic retry and fallback logic when a send fails.", href: "/products/otp-sms/", link: "How OTP routing works" },
  { Icon: ShieldCheck, t: "DLT-approved templates and sender IDs", d: "Pre-registered templates for credit, debit, UPI, failed-transaction and card events. DLT entity, Sender ID and PE certificate are managed in the dashboard.", href: "/blog/dlt-registration-guide/", link: "DLT compliance guide" },
  { Icon: Smartphone, t: "KYC and onboarding on WhatsApp", d: "Document upload, selfie submission and follow-up questions in the customer's language, encrypted in transit.", href: "/products/whatsapp-business-api/", link: "WhatsApp details" },
  { Icon: FileKey2, t: "An audit trail for every message", d: "Timestamp, sender, recipient, template ID, carrier, delivery status and cost, exportable per account and per sub-account.", href: "/legal/dpa", link: "Data processing addendum" },
]

/* every fintech touchpoint, as a ledger */
const LEDGER: { event: string; msg: string; ch: ("OTP" | "SMS" | "WhatsApp")[] }[] = [
  { event: "Login and transaction 2FA", msg: "One-time passwords for sign-in and payments", ch: ["OTP"] },
  { event: "Card transactions", msg: "Debit and credit card alerts as they happen", ch: ["SMS"] },
  { event: "UPI payments", msg: "A confirmation for every UPI transaction", ch: ["SMS"] },
  { event: "Loan applications", msg: "Status updates from submission to decision", ch: ["SMS", "WhatsApp"] },
  { event: "KYC", msg: "Document and selfie submission over WhatsApp", ch: ["WhatsApp"] },
  { event: "Statements", msg: "A notice when the monthly statement is ready", ch: ["SMS", "WhatsApp"] },
  { event: "Fraud and suspicious activity", msg: "Alerts the customer can act on at once", ch: ["SMS"] },
  { event: "Account activity", msg: "Balance and activity summaries", ch: ["SMS", "WhatsApp"] },
  { event: "EMI and due dates", msg: "Reminders before a payment is due", ch: ["SMS", "WhatsApp"] },
  { event: "Insurance renewals", msg: "Policy renewal reminders", ch: ["SMS", "WhatsApp"] },
]
const CH_STYLE: Record<string, string> = {
  OTP: "bg-[#14233a] text-white",
  SMS: "bg-[#fff3d6] text-[#a56a00]",
  WhatsApp: "bg-[#d8f5e6] text-[#12714e]",
}

const CLAUSES = [
  { n: "1", t: "Verified senders only", d: "Banking-related messaging in India is restricted to verified senders. Every SMS goes out from a registered header on an approved template." },
  { n: "2", t: "TRAI DLT compliance", d: "DLT is mandatory. SMSLocal manages your DLT entity, Sender IDs, PE certificate and templates in the dashboard." },
  { n: "3", t: "Data stays in India", d: "Customer data must reside in India under the DPDPA 2023 framework. SMSLocal runs on India-based infrastructure." },
  { n: "4", t: "Signed DPAs and audit-ready exports", d: "A standard data processing addendum is available for regulated customers, and message logs export per account for your compliance team." },
]

const FAQS = [
  { q: "Do you sign Data Processing Addendums with regulated customers?", a: "Yes. Our standard DPA is available at /legal/dpa, and our team can also review your counter-signed version for enterprise agreements." },
  { q: "Are your OTP routes dedicated?", a: "Yes. OTP traffic runs on a separate priority route, isolated from bulk promotional traffic, with automatic retry on failure." },
  { q: "Can I enforce idempotency on OTP API calls?", a: "Yes. Every /v1/otp/send request accepts an idempotency_key header, so retried requests never trigger duplicate OTP sends or extra charges." },
  { q: "What audit trail do I get for regulators?", a: "Every message is logged with timestamp, sender, recipient, template ID, carrier, delivery status and cost. The full log is exportable per account and per sub-account." },
  { q: "Can customers complete KYC on WhatsApp?", a: "Yes. Customers can submit documents and a selfie and answer follow-up questions over WhatsApp, in their own language, with encryption in transit. Your data stays in India." },
  { q: "How do we integrate the fintech SMS API into our stack?", a: "A single API call per message, with idempotency keys, delivery-status webhooks and pre-approved DLT templates for OTP and transaction-alert flows. Most banking and fintech teams complete integration and DLT onboarding in under a week." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: Zap, label: "OTP delivery in under a second" },
  { icon: ShieldCheck, label: "DLT-registered templates" },
  { icon: Lock, label: "DPDPA-aware architecture" },
  { icon: Database, label: "India-resident infrastructure" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function BankingFintechSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Banking & Fintech", path: "/solutions/banking-fintech" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a one-time password's trip, in 3D */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="bk-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Solutions &middot; Banking &amp; Fintech
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                OTPs and alerts that arrive on time, <span className="text-primary">with an audit trail for every message.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Dedicated OTP routes, DLT-approved transaction alerts, KYC on WhatsApp and audit-ready logs, built for banks, NBFCs and fintechs that answer to regulators.
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
            <div className="bk-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <BankingHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: the same OTP on a shared route and on a priority route, racing */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>An OTP that takes eight seconds is a support ticket.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Most SMS platforms were built for promotional blasts. A financial code stuck behind a campaign is late, and a transaction alert that misses one customer in a hundred is a compliance and reputation risk.</p>
            </div>

            <div className="mt-14 rounded-3xl bg-white px-5 pb-8 pt-8 ring-1 ring-border shadow-[0_30px_60px_-36px_rgba(15,26,46,.35)] sm:px-10 sm:pb-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Eight seconds in a customer&apos;s login</p>

              <div className="relative mx-2 mt-6 sm:mx-4">
                {/* when the code arrives */}
                <div className="relative h-[104px]">
                  <div className="bk-flagG absolute bottom-0 left-[10.9%] -translate-x-3">
                    <div className="rounded-2xl bg-primary px-3.5 py-2.5 text-primary-foreground shadow-[0_16px_28px_-12px_rgba(18,160,124,.8)]">
                      <p className="text-[19px] font-semibold leading-none tabular-nums">0.87 s</p>
                      <p className="mt-1 text-[11.5px] font-medium opacity-90">Priority route: the customer is in</p>
                    </div>
                    <i className="ml-3 block h-5 w-px bg-primary" />
                  </div>
                  <div className="bk-flagR absolute bottom-0 right-0">
                    <div className="rounded-2xl bg-[#d6453d] px-3.5 py-2.5 text-right text-white shadow-[0_16px_28px_-12px_rgba(214,69,61,.7)]">
                      <p className="text-[19px] font-semibold leading-none tabular-nums">8 s</p>
                      <p className="mt-1 text-[11.5px] font-medium opacity-90">Shared route: a support ticket</p>
                    </div>
                    <i className="ml-auto mr-3 block h-5 w-px bg-[#d6453d]" />
                  </div>
                </div>

                {/* the ruler */}
                <div className="relative">
                  <div className="flex h-4 overflow-hidden rounded-full">
                    <span className="h-full bg-primary" style={{ width: "12.5%" }} />
                    <span className="h-full bg-[#f2b84b]" style={{ width: "37.5%" }} />
                    <span className="h-full bg-[#d6453d]" style={{ width: "50%" }} />
                  </div>
                  <div className="relative mt-2 h-5">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <span key={s} className={`absolute whitespace-nowrap text-[11.5px] tabular-nums text-muted-foreground ${s === 0 ? "" : s === 8 ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: `${(s / 8) * 100}%` }}>{s} s</span>
                    ))}
                  </div>

                  {/* the playhead */}
                  <div className="bk-play pointer-events-none absolute -top-[112px] bottom-[-92px] w-px bg-foreground/35" aria-hidden>
                    <span className="absolute -left-[5px] top-[110px] h-[26px] w-[11px] rounded-full bg-foreground ring-4 ring-white" />
                  </div>
                </div>

                {/* what the customer does while they wait */}
                <div className="relative mt-2 h-[84px]">
                  {[
                    { at: 25, t: "Taps Resend", d: "No code yet" },
                    { at: 50, t: "Tries again", d: "Still waiting" },
                    { at: 75, t: "Gives up", d: "Calls support" },
                  ].map((e, i) => (
                    <div key={e.t} className={`bk-ev${i} absolute top-0 -translate-x-1/2 text-center`} style={{ left: `${e.at}%` }}>
                      <i className="mx-auto block h-4 w-px bg-border" />
                      <p className="whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-[12.5px] font-semibold">{e.t}</p>
                      <p className="mt-1 text-[11.5px] text-muted-foreground">{e.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-[13px] text-muted-foreground">
                <li className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-primary" />Under 1 s: the customer is in</li>
                <li className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#f2b84b]" />1 to 4 s: the customer waits</li>
                <li className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#d6453d]" />4 to 8 s: resends, gives up, calls support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: the stack, from the API down to the audit log */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>A messaging stack built for regulated traffic.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Five layers, from the API call to the audit log, so every message is routed, approved and recorded.</p>
            </div>
            <div className="relative mt-14">
              <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-primary/60" aria-hidden />
              <i className="bk-drop absolute left-[22px] h-3 w-3 rounded-full bg-primary shadow-[0_0_14px_4px_rgba(18,160,124,.5)]" aria-hidden />
              <ol className="space-y-4">
                {STACK.map((s, i) => (
                  <li key={s.t} className="relative grid grid-cols-[56px_1fr] items-start gap-4 sm:gap-5">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-border shadow-[0_12px_22px_-12px_rgba(15,26,46,.4)]"><s.Icon className="h-6 w-6" /></span>
                    <div className="rounded-2xl bg-secondary px-5 py-4" style={{ marginLeft: `${i * 6}px` }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-[17px] font-semibold tracking-tight">{s.t}</h3>
                        <Link href={s.href} className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:underline">{s.link} <ArrowRight className="h-3 w-3" /></Link>
                      </div>
                      <p className="mt-1.5 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4 · USE CASES: every touchpoint, written up as a ledger */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Use cases</p>
              <h2 className={`${H2} mt-5`}>Every fintech touchpoint, on one stack.</h2>
            </div>
            <div className="mt-12 overflow-hidden rounded-2xl bg-white ring-1 ring-border">
              <div className="hidden grid-cols-[1.1fr_1.6fr_auto] gap-6 border-b border-border bg-foreground px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-background/70 sm:grid">
                <span>Touchpoint</span><span>What the customer gets</span><span className="w-[150px] text-right">Channel</span>
              </div>
              <ul className="divide-y divide-border">
                {LEDGER.map((r, i) => (
                  <li key={r.event} className="grid gap-x-6 gap-y-1.5 px-5 py-3.5 sm:grid-cols-[1.1fr_1.6fr_auto] sm:items-center sm:px-6">
                    <span className="flex items-center gap-3 text-[15px] font-semibold"><span className="font-mono text-[11px] font-normal text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{r.event}</span>
                    <span className="text-[14.5px] text-muted-foreground">{r.msg}</span>
                    <span className="flex gap-1.5 sm:w-[150px] sm:justify-end">
                      {r.ch.map((c) => <span key={c} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${CH_STYLE[c]}`}>{c}</span>)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5 · INTEGRATION: one call, in under a week */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-primary`}>For your engineers</p>
              <h2 className={`${H2} mt-5`}>One API call per message. Live in under a week.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">Most banking and fintech teams complete integration and DLT onboarding in under a week.</p>
              <ul className="mt-6 space-y-3 text-[15px]">
                {["A single API call per message", "Idempotency keys, so retries never double-send", "Delivery-status webhooks into your system", "Pre-approved DLT templates for OTP and alert flows"].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{t}</li>
                ))}
              </ul>
              <Link href="/developers/api-docs/" className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-primary hover:underline"><ScrollText className="h-4 w-4" />Read the API docs <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="overflow-hidden rounded-2xl bg-[oklch(0.17_0.02_240)] font-mono text-[13px] leading-[1.7] text-white/85 shadow-[0_34px_60px_-30px_rgba(15,26,46,.6)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <i className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" /><i className="h-2.5 w-2.5 rounded-full bg-[#ffc24b]" /><i className="h-2.5 w-2.5 rounded-full bg-[#31c48d]" />
                <span className="ml-3 text-[11px] text-white/50">Example request (illustrative)</span>
              </div>
              <pre className="overflow-x-auto px-5 py-4"><code>{`POST /v1/otp/send
idempotency_key: 7f3a9c2e

{
  "to": "+91XXXXXXXXXX",
  "template_id": "LOGIN_OTP"
}

// delivery-status webhook
{
  "status": "delivered"
}`}</code></pre>
            </div>
          </div>
        </section>

        {/* 6 · REGULATORY NOTE: four clauses on a dark band */}
        <section className="bg-foreground py-20 text-background lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Regulatory note</p>
              <h2 className={`${H2} mt-5 text-background`}>RBI, SEBI, TRAI and DPDPA, covered by default.</h2>
              <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-background/70">SMSLocal supports all four regimes out of the box, so your compliance team starts from a checklist that is already filled in.</p>
            </div>
            <ol className="divide-y divide-white/12 border-y border-white/12">
              {CLAUSES.map((c) => (
                <li key={c.n} className="grid grid-cols-[44px_1fr] gap-4 py-5 sm:grid-cols-[56px_1fr]">
                  <span className="font-mono text-[22px] font-semibold text-primary">§{c.n}</span>
                  <div><h3 className="text-[17px] font-semibold tracking-tight">{c.t}</h3><p className="mt-1.5 text-[14.5px] leading-relaxed text-background/70">{c.d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/banking-fintech" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/banking-fintech" />

        <ProductFinalCta
          title="Built for regulated messaging."
          subtitle="Start your trial with priority OTP routing from day one. Talk to sales for enterprise SLAs, sub-accounts and signed DPAs."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes bk-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .bk-rise { animation: bk-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @keyframes bk-play { 0%, 3% { left: 0; opacity: 1 } 80%, 96% { left: 100%; opacity: 1 } 100% { left: 100%; opacity: 0 } }
        @keyframes bk-flagG { 0%, 8% { opacity: 0; transform: translate(-12px, 8px) } 12%, 96% { opacity: 1; transform: translate(-12px, 0) } 100% { opacity: 0 } }
        @keyframes bk-flagR { 0%, 79% { opacity: 0; transform: translateY(8px) } 84%, 96% { opacity: 1; transform: none } 100% { opacity: 0 } }
        @keyframes bk-ev0 { 0%, 18% { opacity: 0; transform: translate(-50%, 8px) } 22%, 96% { opacity: 1; transform: translate(-50%, 0) } 100% { opacity: 0 } }
        @keyframes bk-ev1 { 0%, 38% { opacity: 0; transform: translate(-50%, 8px) } 42%, 96% { opacity: 1; transform: translate(-50%, 0) } 100% { opacity: 0 } }
        @keyframes bk-ev2 { 0%, 58% { opacity: 0; transform: translate(-50%, 8px) } 62%, 96% { opacity: 1; transform: translate(-50%, 0) } 100% { opacity: 0 } }
        .bk-play { animation: bk-play 10s linear infinite }
        .bk-flagG { opacity: 0; animation: bk-flagG 10s cubic-bezier(.3,1.3,.4,1) infinite }
        .bk-flagR { opacity: 0; animation: bk-flagR 10s cubic-bezier(.3,1.3,.4,1) infinite }
        .bk-ev0 { opacity: 0; animation: bk-ev0 10s ease-out infinite } .bk-ev1 { opacity: 0; animation: bk-ev1 10s ease-out infinite } .bk-ev2 { opacity: 0; animation: bk-ev2 10s ease-out infinite }
        @keyframes bk-drop { 0% { top: 20px; opacity: 0 } 8% { opacity: 1 } 92% { opacity: 1 } 100% { top: calc(100% - 30px); opacity: 0 } }
        .bk-drop { animation: bk-drop 6s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .bk-rise, .bk-drop { animation: none }
          .bk-play { animation: none; left: 100% }
          .bk-flagG { animation: none; opacity: 1; transform: translate(-12px, 0) } .bk-flagR { animation: none; opacity: 1; transform: none }
          .bk-ev0, .bk-ev1, .bk-ev2 { animation: none; opacity: 1; transform: translate(-50%, 0) }
        }
      `}</style>
    </>
  )
}

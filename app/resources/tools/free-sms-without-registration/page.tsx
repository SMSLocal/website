import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Gauge,
  Globe,
  Info,
  KeyRound,
  Lock,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Type,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import {
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { SmsLocalForm } from "@/components/forms/sms-local-form"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources/tools/free-sms-without-registration")

const STEPS = [
  {
    n: "01",
    title: "Sign up with email",
    body: "Email address only — no credit card, no company details, no sales call. You’re in within 60 seconds.",
  },
  {
    n: "02",
    title: "Pick a recipient and a template",
    body: "Choose from our DLT-approved template library or register your own in the dashboard. Enter the 10-digit Indian mobile number, compose your message, preview the 160-character count.",
  },
  {
    n: "03",
    title: "Send — and watch the delivery receipt",
    body: "Click send. The message hits the recipient within seconds on an optimised route. You get a real per-recipient delivery report in the dashboard — not a fake “sent” confirmation.",
  },
] as const

const FEATURES = [
  {
    icon: Zap,
    title: "Quick setup and instant messaging",
    body: "Send SMS online the second you sign in. Enter a 10-digit Indian number, pick or compose a message, hit send. No technical setup, no IT ticket.",
  },
  {
    icon: Smartphone,
    title: "Any 10-digit Indian number",
    body: "Send to one recipient or to a CSV of thousands in the same flow. Auto-detects invalid numbers and drops them before you spend a paisa.",
  },
  {
    icon: Lock,
    title: "Secure and private",
    body: "CAPTCHA on casual sends, API keys for everything else. Recipient numbers are used exclusively for the send and never sold or shared. End-to-end TLS.",
  },
  {
    icon: Type,
    title: "Customisable message length",
    body: "Compose up to 160 GSM-7 characters per segment or chain long messages with automatic concatenation. Real-time character counter and segment meter.",
  },
  {
    icon: ShieldCheck,
    title: "DLT-approved templates",
    body: "Use our ready-to-go library of approved Sender IDs and templates, or register your own Principal Entity in the dashboard. Either way, every send is compliant.",
  },
  {
    icon: Gauge,
    title: "High deliverability",
    body: "Optimised routes across all four major operators. Priority queues for OTPs. Real DLR surfaced inline — never buried in logs.",
  },
] as const

const PRODUCTS = [
  {
    icon: MessageSquare,
    title: "Bulk SMS",
    body: "Send 1M+ SMS in minutes across India with DLT-certified Sender IDs and templates. Enterprise-grade reliability for campaigns, alerts, and notifications.",
    href: "/products/bulk-sms/",
  },
  {
    icon: Rocket,
    title: "Quick SMS",
    body: "Get started with our onboarding guide. Reach DND and non-DND audiences for promotional and transactional campaigns — fast, flexible, low-friction.",
    href: "/products/quick-sms/",
  },
  {
    icon: KeyRound,
    title: "API SMS (OTP & Transactional)",
    body: "Integrate SMS into your app with a simple REST API. DLT-compliant, webhook DLRs, sub-3-second OTP delivery, built for enterprise-scale automation.",
    href: "/products/otp-sms/",
  },
] as const

const WHY_CHOOSE = [
  {
    title: "Ease of use",
    body: "No technical setup required — send messages in just a few clicks from any browser.",
  },
  {
    title: "Security and compliance",
    body: "CAPTCHA, IP tracking, DLT registration, and DPDPA-aware data handling on every send.",
  },
  {
    title: "Reliability",
    body: "Optimised routes with per-operator failover so your messages land within seconds, every time.",
  },
  {
    title: "Scale when you need it",
    body: "The same account that sends one message today can send a million by next week. No plan upgrade needed.",
  },
] as const

const FAQ = [
  {
    q: "Is there really a “free SMS without registration” in India?",
    a: "Honestly — no, not legally. TRAI’s TCCCPR 2018 mandates that every Indian SMS be sent from a registered Principal Entity using an approved Sender ID and Template. Any site claiming “zero registration” SMS is either shared-pool SMS from a single registered aggregator (which is what SMSLocal provides with ₹60 free credit) or operating outside the law. We took the first path.",
  },
  {
    q: "How does the SMS tool work?",
    a: "Enter a 10-digit Indian mobile number, pick a DLT-approved template from our library or use one of your own, verify the CAPTCHA for casual sends, and click Send. The message lands in seconds via our TRAI-compliant route.",
  },
  {
    q: "Is there a limit to how many messages I can send?",
    a: "Not on volume — only on credit. Your ₹60 welcome credit covers roughly 570 promotional sends or 300 transactional sends. After that, it’s straight pay-as-you-go from ₹0.1050 / SMS. No minimum commit, no monthly plan.",
  },
  {
    q: "How secure is this SMS tool?",
    a: "Every connection is TLS. Recipient numbers are used exclusively for the send and not sold or shared. CAPTCHA protects the web form from automated abuse; API keys and per-account rate limits protect the API. We do not retain message bodies after the DLR window.",
  },
  {
    q: "Can I send SMS internationally?",
    a: "The free tool is optimised for 10-digit Indian numbers. International routes are available on paid plans — contact us for pricing per country.",
  },
  {
    q: "How can I track my SMS delivery?",
    a: "Every send gets a per-recipient delivery report in the dashboard. API users receive webhook DLRs in real time, with states for submitted, delivered, expired, and failed.",
  },
  {
    q: "Can I personalise my SMS messages?",
    a: "Yes. DLT-approved templates can include variables (like {#var#} for a name or OTP) that you fill in per recipient. CSV uploads let you personalise thousands of messages in one send.",
  },
  {
    q: "What is CAPTCHA verification, and why is it required?",
    a: "CAPTCHA on the free web form is what stops automated bots and SMS bombers abusing the shared route. Legitimate senders never feel it — one click per send.",
  },
  {
    q: "Is the SMS tool free to use?",
    a: "Yes, your first ₹60 worth of SMS is free with an email signup — no credit card required. After that, it’s pay-as-you-go from ₹0.1050 / SMS, with no minimum commit or monthly fee.",
  },
] as const

export default function FreeSmsPage() {
  return (
    <>      <SiteHeader />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Tools", path: "/resources/tools" },
          {
            name: "Free SMS without registration",
            path: "/resources/tools/free-sms-without-registration",
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1200px 520px at 15% 5%, oklch(0.62 0.18 145 / 0.22), transparent 60%), radial-gradient(1000px 480px at 85% 30%, oklch(0.55 0.16 230 / 0.2), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[12px] text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/resources/help/" className="hover:text-white">
                  Resources
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/resources/tools/" className="hover:text-white">
                  Tools
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/85">Free SMS without registration</li>
            </ol>
          </nav>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
            {/* Copy column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" /> ₹60 Free Credit on Signup
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                Send SMS effortlessly — with ₹60 in free credits.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-[15.5px] leading-relaxed text-white/80">
                Our free SMS tool provides a simple, secure way to send SMS
                online to any Indian mobile number in seconds — whether it’s a
                promotional message, a reminder, or a transactional alert.
                Email signup only, no credit card, no monthly plan.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup/"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
                >
                  Start free <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/pricing/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-white/10"
                >
                  See pricing
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/75">
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Lowest rate: ₹0.1050 / SMS
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Cancel anytime
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  DLT-compliant
                </li>
                <li className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-300" />
                  No credit card
                </li>
              </ul>
            </div>

            {/* Form column — equivalent of the [sms_local_form] shortcode */}
            <div className="lg:pt-1">
              <SmsLocalForm />
            </div>
          </div>
        </div>
      </section>

      {/* The truth about "no registration" */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
            <Info className="h-4 w-4" /> A quick honest note
          </div>
          <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">
            About “free SMS without registration”.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">
            In India, <strong>every SMS</strong> must flow through a
            DLT-registered Principal Entity on an approved Sender ID and
            Template — that’s the TRAI TCCCPR 2018 rule, and it applies to every
            operator. So “truly zero-registration, zero-accountability SMS” is
            not legally possible in India.
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/85">
            What <em>is</em> possible — and what we offer — is pooled access to
            SMSLocal’s already-registered Entity and templates. You sign up with
            just an email, pick from our pre-approved template library, and
            send. All the DLT heavy lifting is done on our side. If you later
            want your own Sender ID, you can register one from the same
            dashboard.
          </p>
        </div>
      </Section>

      {/* How it works */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="How it works"
          title="Send your first SMS in three steps."
          subtitle="Under ten minutes from landing here to your first delivered message."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-[12px] font-bold text-primary ring-1 ring-primary/15">
                  {s.n}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Step {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Products */}
      <Section>
        <SectionHeader
          eyebrow="Our SMS services"
          title="Pick the right SMS solution for your use case."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {PRODUCTS.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* Security */}
      <Section tone="muted">
        <div className="mx-auto max-w-4xl rounded-2xl border border-foreground/10 bg-background p-7 shadow-sm sm:p-10">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
            <ShieldCheck className="h-4 w-4" /> Security
          </div>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Your privacy and security matter.
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-foreground/85">
            We are committed to protecting your privacy. The mobile number and
            message content you provide are used exclusively for the send and we
            do not sell or share data with third parties. All information is
            encrypted in transit; CAPTCHA and IP tracking protect the platform
            from automated abuse without getting in the way of real users.
          </p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">
            We do not retain message bodies beyond the delivery-receipt window
            required for debugging. Once the DLR state is final (delivered,
            expired, failed, or bounced), the body is purged from our systems.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { label: "TLS encryption end-to-end", icon: Lock },
              { label: "DPDPA-aware data handling", icon: ShieldCheck },
              { label: "CAPTCHA + per-IP limits", icon: FileCheck2 },
              { label: "No third-party data sale", icon: Globe },
            ].map((b) => {
              const Icon = b.icon
              return (
                <div
                  key={b.label}
                  className="flex items-center gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-4 py-3"
                >
                  <Icon className="h-4 w-4 flex-none text-primary" />
                  <span className="text-[13px] text-foreground/85">
                    {b.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <SectionHeader
          eyebrow="Key features"
          title="Advanced features, zero ceremony."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold">{f.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Why choose us */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Why SMSLocal"
          title="Why we’re the best choice for free SMS in India."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {WHY_CHOOSE.map((w) => (
            <div
              key={w.title}
              className="flex gap-4 rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
              <div>
                <h3 className="text-[15px] font-semibold">{w.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {w.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions." />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-background shadow-sm">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-[15px] font-semibold text-foreground/90">
                  {f.q}
                </span>
                <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary transition group-open:rotate-45">
                  <span className="text-[14px] leading-none">+</span>
                </span>
              </summary>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <ProductFinalCta
        title="Start your trial with ₹60 in free credits."
        description="Email signup, no credit card, no minimum commit. Send your first SMS today — and scale to a million when you need to."
        primaryCta={{ label: "Sign up now", href: "/signup/" }}
        secondaryCta={{ label: "Plans & pricing", href: "/pricing/" }}
      />
      <SiteFooter />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  CheckCircle2,
  Gavel,
  Scale,
  Shield,
  ShieldAlert,
  Siren,
  XCircle,
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
import { getPageMetadata } from "@/lib/seo"
import { SmsBomberSimulator } from "@/components/lazy"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources/tools/sms-bomber")

const LAWS = [
  {
    icon: Gavel,
    title: "IT Act, 2000 — Section 66 / 66A legacy",
    body: "Sending messages that cause annoyance, inconvenience, danger, obstruction, insult, or intimidation through a communication service is a punishable offence. Section 66A was struck down in 2015, but the broader IT Act, along with Sections 354D (cyber-stalking) and 507 of the IPC (criminal intimidation), still apply — with imprisonment up to three years and a fine.",
  },
  {
    icon: Scale,
    title: "TRAI TCCCPR, 2018 (Telecom Commercial Communications)",
    body: "Bulk commercial communications must flow through a registered DLT Principal Entity, use an approved Header (Sender ID) and an approved Template. SMS bombers bypass all three. Operators are mandated to trace abuse and suspend the originating service, and complaint workflows (1909, DND Registry) feed into the same trace path.",
  },
  {
    icon: Shield,
    title: "DPDPA, 2023 (Digital Personal Data Protection Act)",
    body: "Processing a person’s phone number to send unwanted messages — especially at scale — constitutes unlawful processing of personal data without consent. Penalties under the DPDPA can run into several crores of rupees for the entity responsible.",
  },
] as const

const CONSEQUENCES = [
  {
    title: "Your SIM / number gets blocked",
    body: "Operators trace high-frequency outbound traffic from personal SIMs and suspend service without warning. The ban usually applies to the SIM and the KYC-linked Aadhaar, meaning new SIMs in your name get flagged too.",
    icon: Ban,
  },
  {
    title: "Criminal complaint under the IT Act / IPC",
    body: "The recipient can — and increasingly does — file a complaint with the local Cyber Cell. Police obtain the trace from the operator in hours, not days, because the target number and timestamps are in the complaint itself.",
    icon: Gavel,
  },
  {
    title: "Permanent Header / Entity blacklist",
    body: "For businesses: a DLT Header used for bombing gets blacklisted across all operators. Your Principal Entity registration can be revoked, which kills your ability to send any transactional SMS — including OTPs — across India.",
    icon: ShieldAlert,
  },
  {
    title: "Civil damages under the DPDPA",
    body: "If the affected user files a complaint with the Data Protection Board, the penalty for unlawful processing of personal data can be assessed up to ₹250 crore. There is no small-sender carve-out.",
    icon: Scale,
  },
] as const

const REASONS = [
  {
    q: "“I need to test what happens when my app sends a lot of SMS.”",
    a: "Use our sandbox. SMSLocal provides free test numbers that return real delivery receipts without actually billing or touching a live subscriber. You can simulate burst traffic, retry storms, and failed routes safely.",
    cta: { label: "Explore SMS API", href: "/developers/sms-api/" },
  },
  {
    q: "“I want to prank a friend.”",
    a: "This is the textbook case under Section 507 of the IPC (criminal intimidation via anonymous communication) and the broader IT Act. It is not a grey area. Send them a meme on WhatsApp instead.",
    cta: null,
  },
  {
    q: "“I need to send bulk SMS for my class / event / office.”",
    a: "That is exactly what DLT-registered Bulk SMS is designed for. You get an approved Sender ID, approved templates, per-recipient delivery receipts, and pay-as-you-go pricing starting at ₹0.1050 / SMS — fully legal, fully auditable.",
    cta: { label: "See Bulk SMS", href: "/products/bulk-sms/" },
  },
  {
    q: "“I want to teach myself the SMS protocol.”",
    a: "Read the SMPP specification, run SMPPSim locally, and use our developer sandbox for end-to-end tests on a real gateway — none of which involves sending unwanted messages to real people.",
    cta: { label: "Read the docs", href: "/developers/api-docs/" },
  },
] as const

const FAQ = [
  {
    q: "Is using an SMS bomber illegal in India?",
    a: "Yes. It violates the IT Act (Sections 66 / 43 and adjacent IPC sections on intimidation), TRAI’s TCCCPR 2018 (unregistered commercial messaging), and the DPDPA 2023 (unlawful processing of a person’s contact data). Both the sender and any service hosting the bomber are liable.",
  },
  {
    q: "Will the victim be able to trace me?",
    a: "In practice, yes. Operators are required by TRAI to retain CDRs and trace complaints. If the recipient files a 1909 / Cyber Cell complaint, the source number — and therefore the Aadhaar KYC attached to it — is almost always identified.",
  },
  {
    q: "My number is being SMS-bombed — what do I do?",
    a: "Screenshot the messages, note the exact timestamps, and file a complaint at cybercrime.gov.in. File a parallel complaint with your operator (via 1909 for DND violations, or customer care for harassment). Do not reply — replies confirm the number is active.",
  },
  {
    q: "What if the bomber uses international numbers?",
    a: "International origination that terminates on an Indian subscriber still falls under the IT Act and TRAI rules. Operators use ILDO-level filters to drop suspect patterns and law enforcement has active MLATs for serious cases.",
  },
  {
    q: "Does SMSLocal offer an SMS bomber?",
    a: "No — and we never will. SMSLocal exists to send legitimate, consented messages for Indian businesses. Any account attempting abuse is terminated immediately and the trace data is shared with operators and, where required, law enforcement.",
  },
  {
    q: "What’s the legitimate way to send high-volume SMS?",
    a: "Register a Principal Entity on any operator DLT (Jio / Airtel / Vi / BSNL), get a 6-character Sender ID approved, register your message templates, and route through a registered aggregator like SMSLocal. Full walkthrough in our DLT Registration Guide.",
  },
] as const

export default function SmsBomberPage() {
  return (
    <>      <SiteHeader />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Tools", path: "/resources/tools" },
          { name: "SMS Bomber", path: "/resources/tools/sms-bomber" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1100px 480px at 20% 10%, oklch(0.66 0.22 35 / 0.22), transparent 60%), radial-gradient(900px 420px at 80% 40%, oklch(0.55 0.16 230 / 0.18), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
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
              <li className="text-white/85">SMS Bomber</li>
            </ol>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5" /> Educational explainer
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            SMS bombing is illegal in India. Here’s what actually happens — and
            what to do instead.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-white/80">
            An SMS bomber sends dozens or hundreds of unsolicited messages to a
            single Indian mobile number in a short burst. It is prosecuted under
            the IT Act, violates TRAI’s TCCCPR 2018, and now also falls under the
            DPDPA 2023. This page explains the law, the real consequences, and
            the legitimate path if you genuinely need to send high-volume SMS.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products/bulk-sms/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
            >
              See the legitimate alternative <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/blog/dlt-registration-guide/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/10"
            >
              Read the DLT guide
            </Link>
          </div>
        </div>
      </section>

      {/* Simulator — fully client-side, sends nothing. The educational
          legal sections below it are still the primary purpose of this
          page; the simulator just demonstrates the UX so visitors who
          searched for "SMS bomber" land on the honest answer instead of a
          working tool elsewhere. */}
      <Section>
        <SectionHeader
          eyebrow="Simulator"
          title="How an SMS bomber UI works (demo only — sends nothing)."
          subtitle="A faithful reproduction of the typical interface so you can see exactly what these tools do, with a built-in counter, schedule list and a Protect Number block-list. Every action runs locally in your browser; no SMS is ever transmitted from this page."
        />
        <div className="mx-auto mt-10 max-w-6xl">
          <SmsBomberSimulator />
        </div>
      </Section>

      {/* What is an SMS bomber */}
      <Section>
        <SectionHeader
          eyebrow="Definition"
          title="What is an SMS bomber?"
          subtitle="Plain English, no euphemisms."
        />
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-8">
          <p className="text-[15px] leading-relaxed text-foreground/85">
            An SMS bomber is a script or web tool that triggers dozens to
            thousands of SMS from public sign-up forms, OTP endpoints, or low-cost
            gateways — all aimed at a single target mobile number. The intent is
            to overwhelm the recipient so they cannot see legitimate messages
            (such as banking OTPs or work notifications).
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
            In India, SMS bombing is <strong>not</strong> a grey area. Even when
            the sender uses public forms (where each message is technically a
            separate legitimate SMS), coordinating them at a single target
            constitutes harassment, commercial-messaging violation, and unlawful
            personal-data processing under three separate laws.
          </p>
          <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-4 w-4 flex-none text-amber-600 dark:text-amber-400" />
              <p className="text-[13.5px] leading-relaxed text-foreground/90">
                <strong>SMSLocal does not provide a bomber tool</strong> and
                never will. This page exists because the term is searched often,
                and the honest answer deserves to rank — not the tools
                themselves.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Laws that apply */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="The law"
          title="Three frameworks that make SMS bombing illegal."
          subtitle="All three apply in parallel — you do not get to pick one."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {LAWS.map((law) => {
            const Icon = law.icon
            return (
              <div
                key={law.title}
                className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{law.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                  {law.body}
                </p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Consequences */}
      <Section>
        <SectionHeader
          eyebrow="Consequences"
          title="What actually happens to senders."
          subtitle="Not hypothetical. These are the standard enforcement paths operators and the Cyber Cell use every day."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {CONSEQUENCES.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.title}
                className="flex gap-4 rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/25 dark:text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Why people search for it */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Reasons people look this up"
          title="Four common reasons — and the legitimate answer for each."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {REASONS.map((r) => (
            <div
              key={r.q}
              className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[14.5px] font-semibold text-foreground/90">
                    {r.q}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {r.a}
                  </p>
                  {r.cta ? (
                    <Link
                      href={r.cta.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:brightness-110"
                    >
                      {r.cta.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* If you're being targeted */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-background p-7 shadow-sm sm:p-9">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
            <Siren className="h-4 w-4" /> If you’re the target
          </div>
          <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">
            What to do if your number is being SMS-bombed.
          </h2>
          <ol className="mt-6 space-y-4 text-[14px] leading-relaxed text-foreground/85">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                01
              </span>
              <span>
                <strong>Don’t reply.</strong> Replies confirm the number is
                active and in use, which is what the bomber is checking for.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                02
              </span>
              <span>
                <strong>Capture evidence.</strong> Screenshot the flood — full
                screens showing the sender IDs, timestamps, and your own
                clock/battery for context. Export SMS logs if your phone
                supports it.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                03
              </span>
              <span>
                <strong>File a cybercrime complaint.</strong> Go to{" "}
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-primary hover:underline"
                >
                  cybercrime.gov.in
                </a>{" "}
                and file under the “Report Other Cybercrimes” flow. Attach your
                screenshots. You will get a complaint reference number you can
                track.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                04
              </span>
              <span>
                <strong>Notify your operator.</strong> Send the complaint
                reference to your mobile operator’s customer care and ask for
                CLI barring or enhanced anti-spam on your line. For DND
                violations specifically, complain via SMS to 1909 with the
                offending sender ID, date and time.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                05
              </span>
              <span>
                <strong>Rotate OTPs during the attack.</strong> If the flood is
                hiding a real attack (e.g. credential stuffing triggering OTPs),
                disable SMS 2FA temporarily, switch to an authenticator app, and
                review bank / email login alerts for the last 24 hours.
              </span>
            </li>
          </ol>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
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

      {/* Comparison strip */}
      <Section>
        <SectionHeader
          eyebrow="The honest choice"
          title="SMS bomber vs. SMSLocal Bulk SMS."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
              <XCircle className="h-4 w-4" /> SMS Bomber
            </div>
            <ul className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-foreground/85">
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                Illegal under the IT Act, TRAI TCCCPR 2018 and DPDPA 2023.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                SIM / Aadhaar-KYC gets blacklisted by operators within hours.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                Traceable — CDRs are retained and Cyber Cell complaints are fast-tracked.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                Unreliable — most OTP endpoints now rate-limit and fingerprint requesters.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                No delivery reports, no compliance trail, no legitimate use case.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <CheckCircle2 className="h-4 w-4" /> SMSLocal Bulk SMS
            </div>
            <ul className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-foreground/85">
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                DLT-registered, TRAI-compliant — every send is auditable.
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                Send 1M+ messages in minutes with approved Sender IDs and templates.
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                Per-recipient delivery receipts via webhook or dashboard.
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                Pay-as-you-go starting at ₹0.1050 / SMS — ₹60 free on signup.
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                Legal, scalable, and the only path that works at enterprise scale.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <ProductFinalCta
        title="Send bulk SMS the right way."
        description="DLT-registered infrastructure, ₹60 in free credits, and a team that has onboarded over 30,000 Indian businesses on compliant messaging."
        primaryCta={{ label: "Start free", href: "/signup/" }}
        secondaryCta={{ label: "Read DLT guide", href: "/blog/dlt-registration-guide/" }}
      />
      <SiteFooter />
    </>
  )
}

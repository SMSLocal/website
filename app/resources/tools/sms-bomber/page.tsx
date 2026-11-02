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
    title: "IT Act, 2000 and the Bharatiya Nyaya Sanhita, 2023",
    body: "Section 66A of the IT Act, which punished annoying or menacing messages, was struck down by the Supreme Court in 2015, so it cannot be used. What remains is Section 43, which covers acts such as disrupting a computer system or denying access to someone entitled to use it, and Section 66, which punishes a dishonest or fraudulent act under Section 43 with up to three years in prison, a fine of up to ₹5 lakh, or both. The Bharatiya Nyaya Sanhita (BNS), which replaced the IPC in July 2024, adds criminal intimidation (Section 351) when messages carry a threat, and stalking (Section 78) when a man repeatedly contacts a woman who has shown no interest.",
  },
  {
    icon: Scale,
    title: "TRAI TCCCPR, 2018 (Telecom Commercial Communications)",
    body: "TCCCPR covers commercial communication: messages whose main purpose is to advertise or solicit business. A bomber that floods a number with promotional or sales content breaks the rules on registered senders, approved Headers (Sender IDs) and approved Templates. For unsolicited commercial messages, operators can restrict, disconnect and blacklist a sender, and complaints through 1909 feed into that process. A prank or abusive message with no commercial purpose is outside TCCCPR and falls under the laws on the left.",
  },
  {
    icon: Shield,
    title: "DPDPA, 2023 (Digital Personal Data Protection Act)",
    body: "The DPDPA applies to organisations that process digital personal data, such as phone numbers, and generally requires consent or another lawful basis. It does not apply to personal data an individual processes for personal or domestic purposes (Section 3(c)(i)), so it matters most for businesses that message people without consent. The Data Protection Board sets penalties under Section 33 and the Schedule: up to ₹250 crore for failing to keep reasonable security safeguards and up to ₹50 crore for breach of any other provision.",
  },
] as const

const CONSEQUENCES = [
  {
    title: "Your number can be restricted or disconnected",
    body: "If the messages are commercial, TCCCPR lets operators restrict a sender’s telecom resources, disconnect them and blacklist the sender. A personal SIM used for repeated unsolicited messages is easy for an operator to spot in its traffic.",
    icon: Ban,
  },
  {
    title: "A complaint can lead to an investigation",
    body: "The recipient can file a complaint at cybercrime.gov.in or with the local cyber cell. Operators hold subscriber and traffic records, and investigators can ask for them, so a personal number is rarely anonymous.",
    icon: Gavel,
  },
  {
    title: "Criminal charges depend on what the messages do",
    body: "Messages that carry a threat can amount to criminal intimidation (BNS Section 351), and repeated contact with a woman who has shown no interest can amount to stalking (Section 78). Abusing another service’s sign-up or OTP forms can fall under IT Act Sections 43 and 66.",
    icon: ShieldAlert,
  },
  {
    title: "Businesses face DPDPA penalties",
    body: "A business that messages people without a lawful basis can be a data fiduciary under the DPDPA, and the Data Protection Board can impose penalties of up to ₹250 crore for security failures and up to ₹50 crore for most other breaches. The Act does not cover an individual’s purely personal use.",
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
    a: "This is where people get into trouble. Repeated messages can become harassment, and if they carry a threat they can amount to criminal intimidation under Section 351 of the Bharatiya Nyaya Sanhita. Whatever you intend, the recipient can file a complaint. Send them a meme on WhatsApp instead.",
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
    a: "No law names SMS bombers, but using one can be illegal. Depending on what it does, it can fall under the IT Act (Sections 43 and 66, if it abuses another service’s forms), the Bharatiya Nyaya Sanhita (criminal intimidation or stalking, if the messages threaten or repeatedly target someone), and TRAI’s TCCCPR 2018 (if the messages are commercial). Section 66A, which covered offensive messages, was struck down in 2015.",
  },
  {
    q: "Will the victim be able to trace me?",
    a: "Often, yes. Operators keep subscriber and traffic records, and a complaint to cybercrime.gov.in or the local cyber cell lets investigators ask for them. Do not assume a personal SIM or an app hides who sent the messages.",
  },
  {
    q: "My number is being SMS-bombed — what do I do?",
    a: "Screenshot the messages, note the exact timestamps, and file a complaint at cybercrime.gov.in. File a parallel complaint with your operator (via 1909 for DND violations, or customer care for harassment). Do not reply — replies confirm the number is active.",
  },
  {
    q: "What if the bomber uses international numbers?",
    a: "Messages that start abroad and reach an Indian subscriber can still be reported. Tell your operator and file at cybercrime.gov.in. Tracing a foreign sender is harder and depends on cooperation across borders.",
  },
  {
    q: "Does SMSLocal offer an SMS bomber?",
    a: "No — and we never will. SMSLocal exists to send legitimate, consented messages for Indian businesses. Any account attempting abuse is terminated immediately and the trace data is shared with operators and, where required, law enforcement.",
  },
  {
    q: "What’s the legitimate way to send high-volume SMS?",
    a: "Register a Principal Entity on any operator DLT (Jio / Airtel / Vi / BSNL), get a 6-character Sender ID approved, register your message templates, and route through a registered aggregator like SMSLocal. Full walkthrough in our DLT Registration Guide.",
  },
  {
    q: "What is a fake message sender, and is it legal in India?",
    a: "A fake message sender (or fake SMS tool) spoofs the sender identity so a message appears to come from someone else. That can be cheating by personation under IT Act Section 66D (up to three years and a fine of up to ₹1 lakh) and forgery of an electronic record under Section 336 of the Bharatiya Nyaya Sanhita, which can reach seven years when done to cheat. Legitimate senders use a verified, DLT-approved Sender ID that recipients can trust.",
  },
  {
    q: "Are OTP bombers and OTP prank tools illegal?",
    a: "They can be. An OTP bomber triggers repeated one-time-password SMS to a target by hammering the login and signup forms of other services. That can fall under Sections 43 and 66 of the IT Act and breaches the abused platforms’ terms of service. Real OTP delivery runs through a rate-limited, DLT-registered transactional route with delivery receipts — never a burst tool.",
  },
  {
    q: "Is an SMS blaster different from an SMS bomber?",
    a: "No. 'SMS blaster' and 'message blaster' are just other names for the same tool — software that fires a high volume of messages at one number or list. The same laws can apply, depending on what is sent. Sending high volume to consented recipients is done legally through DLT-registered Bulk SMS.",
  },
  {
    q: "Is there an 'unlimited' or 'no registration' SMS sender that is legal?",
    a: "No. Every commercial SMS in India must flow through a DLT-registered Principal Entity, an approved Sender ID, and an approved template — there is no lawful 'unlimited, no-registration' bulk route. Platforms that manage DLT for you are the compliant way to start sending quickly.",
  },
] as const

const RELATED_TERMS = [
  {
    term: "“Fake message sender” / “fake SMS”",
    what: "Tools that spoof the sender name so a message looks like it came from someone else. In India this can be cheating by personation (IT Act 66D) and forgery of electronic records (BNS 336) — separate offences from bombing itself.",
    legal: "Businesses send under their own DLT-approved Sender ID, which is verified, traceable and trusted by recipients.",
    href: "/products/bulk-sms/",
    label: "Compliant Bulk SMS",
  },
  {
    term: "“OTP bomber” / “OTP prank” / “OTP spam”",
    what: "Tools that trigger repeated one-time-password SMS to a target by abusing the login and signup forms of other services. Beyond the bombing itself, this breaches those platforms’ terms and can fall under the IT Act.",
    legal: "Real OTP delivery runs through a rate-limited, DLT-registered transactional route with delivery receipts.",
    href: "/products/otp-sms/",
    label: "OTP SMS",
  },
  {
    term: "“SMS blaster” / “message blaster”",
    what: "Another name for an SMS bomber — software that fires a high volume of messages at one number or list. Same tool, and the same laws can apply.",
    legal: "High-volume sending to consented recipients is exactly what DLT-registered Bulk SMS is for — approved templates, per-recipient receipts, pay-as-you-go.",
    href: "/products/bulk-sms/",
    label: "See Bulk SMS",
  },
  {
    term: "“Unlimited” / “spam message sender”",
    what: "Tools promising unlimited or spam sending to any number with no registration. There is no legal no-registration bulk route in India — every commercial SMS must flow through a DLT entity, so these operate outside the law.",
    legal: "The legal “start fast” path is a registered platform that handles the DLT work for you.",
    href: "/resources/tools/free-sms-without-registration/",
    label: "Free SMS, done legally",
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
            Is an SMS bomber legal in India? What the law says, and what to do
            instead.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-white/80">
            An SMS bomber sends dozens or hundreds of messages to a single
            Indian mobile number in a short burst. No law names SMS bombers, but
            using one can break the IT Act and the Bharatiya Nyaya Sanhita and,
            for commercial messages, TRAI’s TCCCPR 2018. This page explains which
            laws apply, the realistic consequences, and the legitimate path if
            you need to send high-volume SMS. Last reviewed on 2 November 2026.
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
            <Link
              href="/resources/help/sms/way2sms-alternative-website/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/10"
            >
              Way2SMS alternatives
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
            India has no law that names SMS bombers, but the conduct is not a
            grey area in practice. Even when the sender uses public forms (where
            each message is technically a separate legitimate SMS), aiming them
            at a single target can amount to harassment or intimidation, abuse
            of other services’ forms can breach the IT Act, and commercial
            content breaks TRAI’s rules.
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
          title="Three laws that can apply to SMS bombing."
          subtitle="Which one applies depends on what the messages say, who sends them and who receives them."
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
        <p className="mx-auto mt-6 max-w-5xl text-[12.5px] leading-relaxed text-muted-foreground">
          Sources, read on 2 November 2026:{" "}
          <a
            href="https://www.indiacode.nic.in/bitstream/123456789/13116/1/it_act_2000_updated.pdf"
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            IT Act, 2000
          </a>
          ,{" "}
          <a
            href="https://egazette.gov.in/WriteReadData/2023/250883.pdf"
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            Bharatiya Nyaya Sanhita, 2023
          </a>
          ,{" "}
          <a
            href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            DPDPA, 2023
          </a>{" "}
          and{" "}
          <a
            href="https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf"
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            TRAI’s TCCCPR amendment, 2025
          </a>
          . This page is general information, not legal advice.
        </p>
      </Section>

      {/* Consequences */}
      <Section>
        <SectionHeader
          eyebrow="Consequences"
          title="What can happen to senders."
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

      {/* Other names people search for — same abuse, same legal answer */}
      <Section>
        <SectionHeader
          eyebrow="Other names for the same thing"
          title="Fake message senders, OTP bombers, SMS blasters & spam senders."
          subtitle="Different search terms, the same abuse — and the same legal answer for each."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {RELATED_TERMS.map((t) => (
            <div
              key={t.term}
              className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
            >
              <h3 className="text-[15px] font-semibold text-foreground">{t.term}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{t.what}</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/85">
                <span className="font-semibold text-foreground">The legal way: </span>
                {t.legal}
              </p>
              <Link
                href={t.href}
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:brightness-110"
              >
                {t.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
                Can break the IT Act, the Bharatiya Nyaya Sanhita and, for commercial messages, TRAI’s TCCCPR 2018.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                A number used for commercial spam can be restricted, disconnected and blacklisted.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                Traceable — operators hold subscriber and traffic records that investigators can request.
              </li>
              <li className="flex gap-2.5">
                <XCircle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                Unreliable — many OTP endpoints now rate-limit repeated requests.
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
                Pay-as-you-go starting at ₹0.1050 / SMS.
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
        description="DLT-registered infrastructure and a team that has onboarded over 30,000 Indian businesses on compliant messaging."
        primaryCta={{ label: "Start your trial", href: "/signup/" }}
        secondaryCta={{ label: "Read DLT guide", href: "/blog/dlt-registration-guide/" }}
      />
      <SiteFooter />
    </>
  )
}

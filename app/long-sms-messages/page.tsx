import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Braces,
  Calendar,
  FileText,
  Globe2,
  Languages,
  Layers,
  Link2,
  MessageCircle,
  Repeat,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import {
  CapabilityGrid,
  Faq,
  HowItWorks,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  UseCasesGrid,
} from "@/components/product/product-page"
import { RelatedContent } from "@/components/shared/related-content"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/long-sms-messages")

function LongSmsVisual() {
  const segments = [
    "Hi Priya, your order #INR-4",
    "82910 has shipped via Delhive",
    "ry and is out for delivery",
    " today between 2-5pm. Tra...",
  ]
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.17_0.02_230)] p-6 shadow-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, color-mix(in oklch, var(--primary) 55%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
            <Link2 className="h-3 w-3" />
            Concatenation
          </span>
          <span className="text-[11px] text-white/50">4 segments → 1 message</span>
        </div>

        {/* Segments */}
        <div className="mt-5 space-y-2">
          {segments.map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                {i + 1}/{segments.length}
              </span>
              <code className="truncate text-[11.5px] text-white/80">{text}</code>
            </div>
          ))}
        </div>

        {/* Arrow down */}
        <div className="my-3 flex justify-center">
          <ArrowRight className="h-4 w-4 rotate-90 text-white/40" />
        </div>

        {/* Reassembled */}
        <div className="rounded-xl border border-primary/25 bg-primary/10 p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              On recipient&apos;s phone
            </span>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/90">
            Hi Priya, your order #INR-482910 has shipped via Delhivery and is out for delivery today between 2-5pm. Track live on order page.
          </p>
        </div>
      </div>
    </div>
  )
}

const encodingRows: {
  encoding: string
  detail: string
  singleChar: string
  multiChar: string
  use: string
}[] = [
  {
    encoding: "GSM-7",
    detail: "7-bit default alphabet",
    singleChar: "160 chars",
    multiChar: "153 chars/segment",
    use: "Plain English, most European scripts",
  },
  {
    encoding: "GSM-7 + extension",
    detail: "{ } [ ] ~ ^ | € \\",
    singleChar: "160 chars (extension chars count as 2)",
    multiChar: "153 chars/segment",
    use: "English with brackets, euro, etc.",
  },
  {
    encoding: "UCS-2",
    detail: "16-bit Unicode",
    singleChar: "70 chars",
    multiChar: "67 chars/segment",
    use: "Hindi, Tamil, Bengali, emoji, any non-GSM character",
  },
]

export default function LongSmsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Long SMS Messages", path: "/long-sms-messages" },
        ]}
      />
      <div className="flex min-h-screen flex-col bg-background">        <SiteHeader />
        <main className="flex-1">
          <ProductHero
            eyebrow="Long SMS"
            title={
              <>
                Send messages longer than 160 characters — <span className="text-primary">seamlessly</span>.
              </>
            }
            subtitle="When your SMS runs past the 160-character limit, we split it into segments at the wire and your recipient sees it as a single message. Works in English, Hindi, Tamil, Bengali, Malayalam, Marathi, Kannada, Gujarati, and Telugu — with full DLT compliance."
            primaryCta={{ label: "Try it with ₹60 credit", href: "/signup" }}
            secondaryCta={{ label: "See pricing", href: "/pricing" }}
            trustItems={[
              "Automatic segmentation",
              "8 Indian languages",
              "Per-segment billing",
              "DLT template support",
            ]}
            visual={<LongSmsVisual />}
          />

          {/* Why 160 */}
          <Section>
            <SectionHeader
              eyebrow="Why 160 characters?"
              title="A historical limit that turned into a universal standard."
              subtitle="The 160-character cap was designed in 1985 by Friedhelm Hillebrand, who typed out random postcards on his typewriter to figure out how long a 'typical message' could be. Three decades later, it's still the building block every phone understands."
            />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  icon: Layers,
                  title: "The wire-level frame",
                  body: "A single SMS PDU (Protocol Data Unit) carries 140 bytes of payload. In GSM-7 encoding that fits exactly 160 characters. In UCS-2 (Unicode), it fits 70 characters.",
                },
                {
                  icon: Repeat,
                  title: "Concatenation fills the gap",
                  body: "Longer messages are split into segments, each with a small UDH (User Data Header) identifying the segment number. The receiving phone reassembles them automatically.",
                },
                {
                  icon: Wallet,
                  title: "Billed per segment",
                  body: "Every operator — in India and globally — bills per segment, not per reassembled message. A 200-character English SMS costs twice as much as a 150-character one.",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </Section>

          {/* Encoding table */}
          <Section tone="muted">
            <SectionHeader
              eyebrow="Character encoding"
              title="Exact limits for every encoding."
              subtitle="The moment your message contains a single Hindi, Tamil, or emoji character, the whole SMS switches to UCS-2 — and your per-segment budget drops from 160 to 70. This trips up a lot of first-time senders."
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-5 py-4 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Encoding
                      </th>
                      <th className="px-5 py-4 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Single SMS
                      </th>
                      <th className="px-5 py-4 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Multi-segment
                      </th>
                      <th className="px-5 py-4 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Used for
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {encodingRows.map((row, i) => (
                      <tr
                        key={row.encoding}
                        className={`border-b border-border last:border-b-0 ${i % 2 ? "bg-muted/20" : ""}`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-mono text-[13.5px] font-semibold text-foreground">
                            {row.encoding}
                          </p>
                          <p className="mt-1 text-[12px] text-muted-foreground">{row.detail}</p>
                        </td>
                        <td className="px-5 py-4 font-mono text-[13px] text-foreground/85">
                          {row.singleChar}
                        </td>
                        <td className="px-5 py-4 font-mono text-[13px] text-foreground/85">
                          {row.multiChar}
                        </td>
                        <td className="px-5 py-4 text-foreground/85">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Worked examples */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                {
                  title: "English: 200 characters",
                  encoding: "GSM-7",
                  segments: 2,
                  cost: "2 credits",
                  body: "Order update: Your package has shipped and will arrive by 5pm today. Track at order.example.com or reply for support. Thank you for shopping with us, we appreciate it!",
                },
                {
                  title: "Hindi: 150 characters",
                  encoding: "UCS-2",
                  segments: 3,
                  cost: "3 credits",
                  body: "नमस्ते प्रिया, आपका ऑर्डर शिप हो गया है और आज शाम 5 बजे तक पहुँच जाएगा। ट्रैक करने के लिए लिंक पर क्लिक करें या सहायता के लिए रिप्लाई करें।",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-primary">
                      {item.encoding}
                    </span>
                  </div>
                  <p className="mt-3 rounded-lg bg-muted/40 p-3 text-[12.5px] leading-relaxed text-foreground/80">
                    {item.body}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[12.5px]">
                    <span className="text-muted-foreground">Sent as</span>
                    <span className="font-mono font-semibold text-foreground">
                      {item.segments} segments · {item.cost}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Features */}
          <CapabilityGrid
            eyebrow="What you get"
            title="Long SMS handled — so you don&apos;t have to."
            subtitle="On other platforms, you end up counting characters, guessing at encoding, and debugging why Hindi messages cost 3x what you expected. Our API just handles it."
            items={[
              {
                icon: Link2,
                title: "Automatic segmentation",
                body: "Write the message you want. We split, add the UDH, and reassemble on the recipient side. Your code doesn't need to think in segments.",
              },
              {
                icon: Languages,
                title: "Unicode + regional scripts",
                body: "Full UCS-2 support for Hindi, Tamil, Bengali, Malayalam, Marathi, Kannada, Gujarati, Telugu, Punjabi, and emoji — without extra configuration.",
              },
              {
                icon: FileText,
                title: "Delivery reports per segment",
                body: "You see the status of each segment separately so you can detect partial delivery (a rare but real operator issue) and resend if needed.",
              },
              {
                icon: Calendar,
                title: "Scheduled sending",
                body: "Schedule a long SMS campaign for a specific time. Messages queue by segment and go out in a coordinated window.",
              },
              {
                icon: Braces,
                title: "Variable substitution",
                body: "{{name}}, {{order_id}}, {{tracking_url}}. Variables are resolved before encoding, so the final segment count is calculated from the actual rendered string.",
              },
              {
                icon: ShieldCheck,
                title: "DLT template preservation",
                body: "Long DLT-approved templates (up to 2000 characters) send as concatenated SMS without needing a separate registration per segment.",
              },
              {
                icon: Zap,
                title: "Real-time character counter",
                body: "Dashboard editor shows live segment count, encoding detection, and credit cost as you type — so there are no billing surprises.",
              },
              {
                icon: Globe2,
                title: "Global delivery",
                body: "Long SMS works identically on 190+ international destinations. Per-segment rates vary by country — see the pricing page for details.",
              },
            ]}
          />

          {/* Use cases */}
          <UseCasesGrid
            eyebrow="Where long SMS actually earns its cost"
            title="Common patterns that don&apos;t fit in 160 characters."
            subtitle="Every extra segment costs money, so the bar for going long should be real. Here's where the extra length is usually worth it."
            items={[
              {
                industry: "Order + shipping updates",
                use: "Merchant name, item, ETA, link, support action — 220 characters of actual signal, not fluff.",
                href: "/solutions/ecommerce",
                icon: Sparkles,
              },
              {
                industry: "Appointment reminders",
                use: "Clinic name, doctor, date/time, address, reschedule link. Patients show up more when every detail is in the text.",
                href: "/solutions/healthcare",
                icon: Sparkles,
              },
              {
                industry: "Banking alerts",
                use: "Bank, transaction type, amount, merchant, balance, fraud-report action. Compliance departments mandate every field.",
                href: "/solutions/banking-fintech",
                icon: Sparkles,
              },
              {
                industry: "COD delivery coordination",
                use: "Rider name, rider phone, delivery window, payment expected, package ID. Riders save time when customers know what's coming.",
                href: "/solutions/logistics",
                icon: Sparkles,
              },
              {
                industry: "Event invites + RSVPs",
                use: "Event, venue, time, dress code, RSVP deadline, contact for questions. Long-form beats five short SMS.",
                href: "/solutions/retail",
                icon: Sparkles,
              },
              {
                industry: "Admission + fee notices",
                use: "Institution, fee breakup, due date, payment link, helpline. Parents don't forget when the full context is in one text.",
                href: "/solutions/education",
                icon: Sparkles,
              },
            ]}
          />

          {/* Pricing model */}
          <Section>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  <Wallet className="h-3 w-3" />
                  Pricing
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  One credit per segment — always.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  Credits are consumed per-segment, not per-message. A 200-character English SMS is 2 credits. A 150-character Hindi SMS is 3 credits (because Hindi uses UCS-2 at 67 chars per segment). The dashboard and API both surface the exact segment count before you send.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition hover:brightness-110"
                  >
                    See current rates
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/developers/api-docs"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    API details
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-muted/40 p-6">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Segment cost — worked examples
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    { chars: 155, script: "English (GSM-7)", segments: 1, credits: 1 },
                    { chars: 200, script: "English (GSM-7)", segments: 2, credits: 2 },
                    { chars: 65, script: "Hindi (UCS-2)", segments: 1, credits: 1 },
                    { chars: 150, script: "Hindi (UCS-2)", segments: 3, credits: 3 },
                    { chars: 450, script: "English (GSM-7)", segments: 3, credits: 3 },
                  ].map((row) => (
                    <div
                      key={`${row.chars}-${row.script}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-[13px]"
                    >
                      <span className="text-muted-foreground">
                        {row.chars} chars · {row.script}
                      </span>
                      <span className="font-mono font-semibold text-foreground">
                        {row.segments} seg · {row.credits} credits
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* How it works */}
          <HowItWorks
            eyebrow="Sending flow"
            title="How long SMS actually moves through our system."
            subtitle="Behind the scenes, there's more going on than just character counting. Here's the full pipeline for a single concatenated send."
            steps={[
              {
                title: "Encoding detection",
                body: "The moment your message arrives, we check every character against the GSM-7 alphabet. One non-GSM char and the whole message becomes UCS-2.",
              },
              {
                title: "Template + variable resolution",
                body: "If you're using a DLT template, variables are substituted first. The final rendered string is what we count for segmentation.",
              },
              {
                title: "Segmentation + UDH",
                body: "The string is split at 153 (GSM-7) or 67 (UCS-2) characters per segment. Each segment gets a UDH identifying its position and total count.",
              },
              {
                title: "Per-segment delivery + reassembly",
                body: "Segments go out on the DLT-registered route. Recipient's phone groups them by UDH reference ID and displays one continuous message.",
              },
            ]}
          />

          <Faq
            eyebrow="Common questions"
            title="Long SMS — asked and answered."
            items={[
              {
                q: "What's the maximum length a long SMS can be?",
                a: "In theory, a single concatenated SMS can span up to 255 segments — about 39,000 characters in GSM-7 or 17,000 in UCS-2. In practice, most platforms cap at 10 segments (1,530 GSM / 670 UCS) and we do the same because longer messages stress the reassembly logic on older phones.",
              },
              {
                q: "Why does my Hindi SMS cost more than my English SMS of the same length?",
                a: "Hindi triggers UCS-2 encoding, which caps each segment at 67 characters instead of 153. A 150-character Hindi SMS is 3 segments; a 150-character English SMS is 1 segment. You pay per segment, so the Hindi version costs 3x.",
              },
              {
                q: "What happens if one segment in a concatenated SMS fails to deliver?",
                a: "The phone won't reassemble a partial message — the recipient sees nothing. Our dashboard shows per-segment delivery status so you can detect and resend if needed. Failure rates are under 0.1% on Indian operators for transactional traffic.",
              },
              {
                q: "Can I use emoji in my SMS?",
                a: "Yes, but emoji force UCS-2 encoding, which drops your per-segment budget from 160 to 70. One emoji in a 100-character English SMS changes it from 1 segment to 2.",
              },
              {
                q: "Does DLT allow long promotional SMS?",
                a: "Yes. DLT template registration covers the full message content regardless of segment count. Templates can be up to 2000 characters. The only gotcha: your approved template text must exactly match (variables aside), so lengthening a running template requires re-registration.",
              },
              {
                q: "Can I schedule a long SMS campaign?",
                a: "Yes. Scheduling, throttling, and retry logic all work identically for long and short SMS. Segments from the same campaign queue and send together so there's no visible gap in the reassembled message.",
              },
            ]}
          />

          <RelatedContent path="/long-sms-messages" />

          <ProductFinalCta
            title="Stop truncating. Send the full message."
            subtitle="Upload your template, pick your language, and let the platform handle encoding, segmentation, and DLT compliance. ₹60 free credit lets you send hundreds of long SMS to see the delivery for yourself."
            primaryCta={{ label: "Start free with ₹60 credit", href: "/signup" }}
            secondaryCta={{ label: "See bulk SMS", href: "/products/bulk-sms" }}
          />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

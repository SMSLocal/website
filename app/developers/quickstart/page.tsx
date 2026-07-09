import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCode2,
  KeyRound,
  Rocket,
  Sparkles,
  Terminal,
  Webhook,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { CodeTabs } from "@/components/product/code-tabs"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/developers/quickstart")

const FIRST_SEND_CURL = `curl "https://app.smslocal.in/api/smsapi" \\
  --get \\
  --data-urlencode "key=$SMSLOCAL_KEY" \\
  --data-urlencode "route=1" \\
  --data-urlencode "sender=ALERTS" \\
  --data-urlencode "number=9876543210" \\
  --data-urlencode "sms=Hello from SMSLocal — your account is live." \\
  --data-urlencode "templateid=1207161234567890123"`

const FIRST_SEND_NODE = `// first-send.mjs
// Run with: node first-send.mjs
const params = new URLSearchParams({
  key: process.env.SMSLOCAL_KEY,
  route: "1",
  sender: "ALERTS",
  number: "9876543210",
  sms: "Hello from SMSLocal — your account is live.",
  templateid: "1207161234567890123",
})

const res = await fetch(\`https://app.smslocal.in/api/smsapi?\${params}\`)
const messageId = await res.text()

console.log("Message ID:", messageId)
console.log("Fetch delivery status: /api/dlrapi?messageid=" + messageId)`

const FIRST_SEND_PY = `# first_send.py
# Run with: SMSLOCAL_KEY=... python first_send.py
import os, requests

params = {
    "key": os.environ["SMSLOCAL_KEY"],
    "route": "1",
    "sender": "ALERTS",
    "number": "9876543210",
    "sms": "Hello from SMSLocal — your account is live.",
    "templateid": "1207161234567890123",
}

res = requests.get("https://app.smslocal.in/api/smsapi", params=params, timeout=10)
print("Message ID:", res.text.strip())`

const DLR_CURL = `curl "https://app.smslocal.in/api/dlrapi" \\
  --get \\
  --data-urlencode "key=$SMSLOCAL_KEY" \\
  --data-urlencode "messageid=1987654321"`

type Step = {
  number: string
  title: string
  body: string
  bullets?: string[]
  cta?: { label: string; href: string }
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create an SMSLocal account",
    body: "Sign up with a work email. Every new account lands with \u20B960 free credit — enough for ~200 test SMS. No credit card required. You will be asked for a company name and the country you operate in; for Indian operators, pick India.",
    cta: { label: "Sign up for free", href: "/signup/" },
  },
  {
    number: "02",
    title: "Register your Principal Entity on DLT",
    body: "India's TRAI-mandated DLT registry requires every sender to be approved before any SMS is delivered. If you haven't already registered, do it once on any DLT platform (Vi, Jio, Airtel, or BSNL) — approval is near-instant. Our team can help if you get stuck.",
    bullets: [
      "Pick a 6-character Sender ID (also called the Header) — e.g. MYBRND or ALERTS.",
      "Register the template body of the SMS you want to send. Use {#var#} for dynamic fields.",
      "Copy the 19-digit Template ID after approval — you will pass it in every API call.",
    ],
    cta: { label: "Full DLT walkthrough", href: "/resources/dlt-compliance/" },
  },
  {
    number: "03",
    title: "Add your DLT header in SMSLocal",
    body: "In the dashboard, go to Settings → Sender IDs and paste the approved 6-character header. Approval typically syncs within a few hours. Once it shows status Active, you can send through it.",
  },
  {
    number: "04",
    title: "Generate an API key",
    body: "Still in Settings, open API & Webhooks and click New API Key. Name it after the service that will use it (e.g. prod-otp-server) so you can rotate safely. Keys are 32-character hex strings — copy once and store in your secrets manager.",
    bullets: [
      "Treat the key like a password. Never commit it to a repo.",
      "Use separate keys for dev, staging, and production.",
      "If a key is ever exposed, revoke and re-issue from the dashboard immediately.",
    ],
  },
  {
    number: "05",
    title: "Send your first SMS",
    body: "You now have everything you need. Export the key as SMSLOCAL_KEY and run one of the snippets below. The API returns a plain-text message ID on success — store it so you can fetch the delivery status later.",
  },
  {
    number: "06",
    title: "Check the delivery status",
    body: "Pass the message ID to the /api/dlrapi endpoint to see per-number delivery status. For production volumes, switch to webhook mode so we push status updates to you as soon as the carrier confirms.",
  },
]

export default function QuickstartPage() {
  return (
    <div className="min-h-svh bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
          { name: "Quickstart", path: "/developers/quickstart" },
        ]}
      />      <SiteHeader />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border bg-[oklch(0.14_0.02_230)] text-white">
        <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-40 mask-radial-fade" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[12.5px] text-white/60">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/developers/" className="hover:text-white">
                  Developers
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white" aria-current="page">
                Quickstart
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                <Rocket className="h-3 w-3" />
                Quickstart
              </span>
              <h1 className="mt-5 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                Send your first SMS in five minutes.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-white/70">
                Six small steps from zero to a delivered message. Sign up, register a DLT template,
                generate a key, run a single cURL command. That is it — no SDK install, no local
                setup, no configuration files.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup/"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
                >
                  Start — \u20B960 free credit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/developers/api-docs/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  <BookOpen className="h-4 w-4" />
                  Full API reference
                </Link>
              </div>
            </div>

            <aside className="min-w-[280px] rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                What you will need
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-[13px] text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>A work email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>~5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>Any HTTP client (cURL works great)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>A DLT-approved template (we help if new)</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <ol className="flex flex-col gap-12">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10"
            >
              <div className="shrink-0">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card font-mono text-[15px] font-semibold text-primary shadow-sm">
                  {step.number}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>

                {step.bullets ? (
                  <ul className="mt-5 flex flex-col gap-2.5 rounded-xl border border-border bg-muted/30 p-5">
                    {step.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {step.number === "05" ? (
                  <div className="mt-6">
                    <CodeTabs
                      samples={[
                        { label: "cURL", lang: "bash", code: FIRST_SEND_CURL },
                        { label: "Node.js", lang: "javascript", code: FIRST_SEND_NODE },
                        { label: "Python", lang: "python", code: FIRST_SEND_PY },
                      ]}
                    />
                    <p className="mt-3 text-[13px] text-muted-foreground">
                      A successful send returns a numeric message ID like{" "}
                      <code className="font-mono text-[12.5px] text-foreground">1987654321</code>. A
                      three-digit error code (e.g. <code className="font-mono">110</code>) means the
                      request was rejected — see{" "}
                      <Link
                        href="/developers/api-docs/#error-codes"
                        className="text-primary hover:underline"
                      >
                        error codes
                      </Link>
                      .
                    </p>
                  </div>
                ) : null}

                {step.number === "06" ? (
                  <div className="mt-6">
                    <CodeTabs samples={[{ label: "cURL", lang: "bash", code: DLR_CURL }]} />
                    <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
                      <p className="flex items-start gap-2 text-[13.5px] leading-relaxed text-muted-foreground">
                        <Webhook className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <span className="font-semibold text-foreground">
                            Production tip:
                          </span>{" "}
                          switch to webhooks under Settings → API &amp; Webhooks. Delivery events
                          will POST to your URL within seconds of the carrier confirming, signed
                          with HMAC-SHA256.
                        </span>
                      </p>
                    </div>
                  </div>
                ) : null}

                {step.cta ? (
                  <div className="mt-5">
                    <Link
                      href={step.cta.href}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline"
                    >
                      {step.cta.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        {/* Next steps */}
        <section className="mt-20 rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
              Next steps
            </p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ship the rest of your messaging stack.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Now that you can send, take the next step: harden retries, capture analytics, and hand
            your ops team a dashboard they can actually use.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Terminal,
                title: "Read the full API reference",
                body: "Every endpoint, every parameter, every error code — with working cURL, Node.js, Python, and PHP samples.",
                href: "/developers/api-docs/",
                cta: "Open API reference",
              },
              {
                icon: FileCode2,
                title: "Try the XML API",
                body: "If your middleware speaks XML natively, the XML API mirrors every endpoint with clean XML payloads.",
                href: "/developers/xml-api/",
                cta: "See XML examples",
              },
              {
                icon: KeyRound,
                title: "DLT compliance guide",
                body: "Deep-dive on TRAI DLT requirements, PE registration, templates, and sender-ID approvals — the Indian SMS rulebook.",
                href: "/resources/dlt-compliance/",
                cta: "Read the guide",
              },
              {
                icon: Webhook,
                title: "Set up webhooks",
                body: "Receive delivery reports and inbound replies in real time. Signed, versioned, and retry-safe out of the box.",
                href: "/developers/api-docs/#webhooks",
                cta: "Configure webhooks",
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary/40 hover:shadow-md"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-primary">
                    {card.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </main>

      <RelatedContent path="/developers/quickstart" />

      <ProductFinalCta
        title="Your first delivered SMS is one API call away."
        subtitle="Sign up, grab a key, paste the snippet. We will handle the routing, DLT scrub, and delivery report."
        primaryCta={{ label: "Start free", href: "/signup/" }}
        secondaryCta={{ label: "Read API docs", href: "/developers/api-docs/" }}
      />

      <SiteFooter />
    </div>
  )
}

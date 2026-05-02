import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, KeyRound, Sparkles } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { CodeTabs } from "@/components/product/code-tabs"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import { ParamTable } from "@/components/developers/param-table"
import { EndpointHeader } from "@/components/developers/endpoint-header"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/developers/api-docs")

const SIDEBAR_SECTIONS = [
  {
    title: "Getting started",
    items: [
      { href: "#overview", label: "Overview" },
      { href: "#authentication", label: "Authentication" },
      { href: "#environments", label: "Environments" },
    ],
  },
  {
    title: "Endpoints",
    items: [
      { href: "#send-sms", label: "Send SMS" },
      { href: "#delivery-reports", label: "Delivery Reports" },
      { href: "#check-credits", label: "Check Credits" },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "#error-codes", label: "Error Codes" },
      { href: "#rate-limits", label: "Rate Limits" },
      { href: "#sdks", label: "SDKs", badge: "Soon" },
    ],
  },
]

// Endpoint: Send SMS
const SEND_SMS_CURL = `curl "https://app.smslocal.in/api/smsapi" \\
  --get \\
  --data-urlencode "key=$SMSLOCAL_KEY" \\
  --data-urlencode "route=1" \\
  --data-urlencode "sender=ALERTS" \\
  --data-urlencode "number=9876543210" \\
  --data-urlencode "sms=Your OTP is 482913. Valid for 10 minutes." \\
  --data-urlencode "templateid=1207161234567890123"`

const SEND_SMS_NODE = `const params = new URLSearchParams({
  key: process.env.SMSLOCAL_KEY,
  route: "1", // 1 = transactional, 2 = promotional
  sender: "ALERTS",
  number: "9876543210",
  sms: "Your OTP is 482913. Valid for 10 minutes.",
  templateid: "1207161234567890123",
})

const res = await fetch(
  \`https://app.smslocal.in/api/smsapi?\${params}\`,
)
const messageId = await res.text()
console.log("Message ID:", messageId)`

const SEND_SMS_PY = `import os
import requests

params = {
    "key": os.environ["SMSLOCAL_KEY"],
    "route": "1",  # 1 = transactional, 2 = promotional
    "sender": "ALERTS",
    "number": "9876543210",
    "sms": "Your OTP is 482913. Valid for 10 minutes.",
    "templateid": "1207161234567890123",
}

res = requests.get(
    "https://app.smslocal.in/api/smsapi",
    params=params,
    timeout=10,
)
print("Message ID:", res.text)`

const SEND_SMS_PHP = `<?php
$params = http_build_query([
    "key"        => getenv("SMSLOCAL_KEY"),
    "route"      => "1", // 1 = transactional, 2 = promotional
    "sender"     => "ALERTS",
    "number"     => "9876543210",
    "sms"        => "Your OTP is 482913. Valid for 10 minutes.",
    "templateid" => "1207161234567890123",
]);

$messageId = file_get_contents(
    "https://app.smslocal.in/api/smsapi?{$params}"
);

echo "Message ID: {$messageId}";`

const SEND_SMS_SUCCESS = `HTTP/1.1 200 OK
Content-Type: text/plain

1987654321   # Unique message ID — store this to fetch delivery status later.`

const SEND_SMS_ERROR = `HTTP/1.1 200 OK
Content-Type: text/plain

110          # Error code — see the Error Codes table.
             # 110 = Invalid DLT Template ID`

// Endpoint: Delivery Reports
const DLR_CURL = `curl "https://app.smslocal.in/api/dlrapi" \\
  --get \\
  --data-urlencode "key=$SMSLOCAL_KEY" \\
  --data-urlencode "messageid=1987654321"`

const DLR_NODE = `const params = new URLSearchParams({
  key: process.env.SMSLOCAL_KEY,
  messageid: "1987654321",
})

const res = await fetch(
  \`https://app.smslocal.in/api/dlrapi?\${params}\`,
)
const report = await res.json()
// report => [["9876543210", "DELIVERED", "2026-04-20 14:21:08"], ...]`

const DLR_RESPONSE = `HTTP/1.1 200 OK
Content-Type: application/json

[
  ["9876543210", "DELIVERED", "2026-04-20 14:21:08"],
  ["9123456789", "FAILED",    "2026-04-20 14:21:12"],
  ["9000000001", "PENDING",   "2026-04-20 14:21:04"]
]`

// Endpoint: Check Credits
const CREDITS_CURL = `curl "https://app.smslocal.in/api/creditapi" \\
  --get \\
  --data-urlencode "key=$SMSLOCAL_KEY" \\
  --data-urlencode "route=1"`

const CREDITS_NODE = `const params = new URLSearchParams({
  key: process.env.SMSLOCAL_KEY,
  route: "1",
})

const res = await fetch(
  \`https://app.smslocal.in/api/creditapi?\${params}\`,
)
const { Route, Credits } = await res.json()
console.log(\`\${Route}: \${Credits} credits left\`)`

const CREDITS_RESPONSE = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "Route": "Transactional",
  "Credits": "48215"
}`

const ERROR_CODES: { code: string; name: string; meaning: string; fix: string }[] = [
  {
    code: "101",
    name: "Invalid user",
    meaning: "The API key is missing, malformed, or revoked.",
    fix: "Re-copy the key from Settings → API & Webhooks. Keys are 32-character hex strings.",
  },
  {
    code: "102",
    name: "Invalid sender ID",
    meaning: "The sender (header) is not registered on DLT under your Principal Entity.",
    fix: "Register the 6-character header on your DLT platform and wait for it to sync (≈4 hours).",
  },
  {
    code: "103",
    name: "Invalid contact(s)",
    meaning: "One or more destination numbers are not valid Indian mobile numbers.",
    fix: "Numbers must be 10 digits, starting with 6/7/8/9. No +91 prefix, no spaces.",
  },
  {
    code: "104",
    name: "Invalid route",
    meaning: "The route parameter is not 1 (transactional) or 2 (promotional).",
    fix: "Use route=1 for OTPs and service updates, route=2 for marketing.",
  },
  {
    code: "105",
    name: "Invalid message",
    meaning: "Message is empty, exceeds 1600 characters, or has disallowed characters.",
    fix: "Url-encode the message. For Unicode (Hindi, Tamil, etc.) the limit is 70 chars per part.",
  },
  {
    code: "106",
    name: "Spam blocked",
    meaning: "Message content matched a spam pattern flagged by the operator.",
    fix: "Remove aggressive marketing language, unsolicited links, or prohibited keywords.",
  },
  {
    code: "107",
    name: "Promotional blocked",
    meaning: "Recipient is on the DND (Do Not Disturb) list for this category.",
    fix: "Expected for DND users on promotional route. Use transactional route for OTPs and alerts.",
  },
  {
    code: "108",
    name: "Low credits",
    meaning: "You don't have enough credits on the selected route to send this batch.",
    fix: "Top up in Settings → Billing, or switch to another route with available balance.",
  },
  {
    code: "109",
    name: "Promotional timing",
    meaning: "Promotional sends are only allowed between 9:00 AM and 8:45 PM IST.",
    fix: "Queue the send for tomorrow morning, or route as transactional if content qualifies.",
  },
  {
    code: "110",
    name: "Invalid DLT Template ID",
    meaning: "The templateid does not match an approved template, or the content doesn't match the template body.",
    fix: "Check the template exactly matches the registered body, including {#var#} variable positions.",
  },
  {
    code: "111",
    name: "No SMSC",
    meaning: "No operator route is currently available for this combination of route + sender.",
    fix: "Usually a transient upstream issue. Retry with exponential backoff. Check /status.",
  },
]

export default function ApiDocsPage() {
  return (
    <div className="min-h-svh bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
          { name: "API Reference", path: "/developers/api-docs" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

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
                <Link href="/developers" className="hover:text-white">
                  Developers
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white" aria-current="page">
                API Reference
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                <BookOpen className="h-3 w-3" />
                API Reference
              </span>
              <h1 className="mt-5 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                Send SMS, track delivery, manage credits — with three endpoints.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-white/70">
                The SMSLocal HTTP API is a simple, GET-based REST interface. No client library
                required — every call works from cURL, a browser, or any language with an HTTP
                client. DLT-compliant by default.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
                >
                  Get your API key
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/developers/quickstart"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  <Sparkles className="h-4 w-4" />
                  Quickstart
                </Link>
              </div>
            </div>

            <aside className="min-w-[280px] rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                Base URL
              </p>
              <code className="mt-2 block break-all font-mono text-[13px] text-white">
                https://app.smslocal.in/api
              </code>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  Auth
                </p>
                <p className="mt-1 text-[13px] text-white/75">
                  <KeyRound className="mr-1.5 -mt-0.5 inline-block h-3.5 w-3.5" />
                  API key via <code className="font-mono text-white">?key=</code> query param
                </p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  Format
                </p>
                <p className="mt-1 text-[13px] text-white/75">GET · plain text / JSON responses</p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Main — sidebar + content */}
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:flex lg:gap-10 lg:py-20">
        <DocsSidebar sections={SIDEBAR_SECTIONS} />

        <article className="min-w-0 flex-1 [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24">
          {/* Overview */}
          <section id="overview">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Overview
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              The SMSLocal HTTP API lets you send DLT-compliant SMS, check delivery status, and
              manage your credit balance. It&apos;s a GET-based query-string API — simple enough to
              test from a browser, robust enough to power millions of messages a day.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Base URL
                </p>
                <code className="mt-2 block break-all font-mono text-[13px] text-foreground">
                  https://app.smslocal.in/api
                </code>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Protocol
                </p>
                <p className="mt-2 font-mono text-[13px] text-foreground">HTTPS · TLS 1.2+</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Method
                </p>
                <p className="mt-2 font-mono text-[13px] text-foreground">GET (query string)</p>
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Authentication
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Every request must include your API key as the <code className="font-mono text-foreground">key</code>{" "}
              query parameter. Get your key from{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Settings → API &amp; Webhooks
              </Link>{" "}
              after you sign up. Keys are 32-character hex strings.
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-[13.5px] leading-relaxed text-foreground">
              <strong className="text-amber-700 dark:text-amber-500">
                Security note:
              </strong>{" "}
              Treat your API key like a password. Never commit it to source control, and never
              expose it in client-side code. If you suspect it&apos;s leaked, rotate it
              immediately from your dashboard — rotation is instant and won&apos;t drop in-flight
              messages.
            </div>
          </section>

          {/* Environments */}
          <section id="environments" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Environments
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Every account has two sandbox credits to help you test the full round-trip —
              send → delivery report → credits — before you go live. Sandbox sends return a
              real message ID but don&apos;t deliver to the handset and don&apos;t consume paid
              credit. Use the exact same endpoint; SMSLocal routes the traffic based on the key
              you use.
            </p>
          </section>

          {/* Send SMS */}
          <section id="send-sms" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Send SMS
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Send a DLT-compliant SMS to one or more Indian mobile numbers. The response body is
              either a numeric message ID (success) or a numeric error code (see Error Codes
              table).
            </p>

            <EndpointHeader method="GET" path="/smsapi" />

            <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-foreground">
              Parameters
            </h3>
            <ParamTable
              rows={[
                {
                  name: "key",
                  type: "string",
                  required: true,
                  description: "Your 32-character API key. Find it under Settings → API & Webhooks.",
                  example: "0ec0e29706c4e213a2910b54147c1d5c",
                },
                {
                  name: "route",
                  type: "integer",
                  required: true,
                  description: (
                    <>
                      Delivery route. <code className="font-mono">1</code> for transactional
                      (OTPs, service updates). <code className="font-mono">2</code> for promotional
                      (marketing). Promotional can only send between 9:00 AM and 8:45 PM IST.
                    </>
                  ),
                  example: "1",
                },
                {
                  name: "sender",
                  type: "string",
                  required: true,
                  description: "6-character DLT-registered sender ID (header). Must be approved under your Principal Entity.",
                  example: "ALERTS",
                },
                {
                  name: "number",
                  type: "string",
                  required: true,
                  description: "Comma-separated list of 10-digit Indian mobile numbers. No +91 prefix, no spaces.",
                  example: "9876543210,9123456789",
                },
                {
                  name: "sms",
                  type: "string",
                  required: true,
                  description: "Message body, URL-encoded. Must exactly match an approved DLT template — including the position of {#var#} placeholders.",
                  example: "Your%20OTP%20is%20482913",
                },
                {
                  name: "templateid",
                  type: "string",
                  required: true,
                  description: "19-digit DLT Content Template ID. Issued by your DLT platform after template approval.",
                  example: "1207161234567890123",
                },
              ]}
            />

            <h3 className="mt-10 text-[17px] font-semibold tracking-tight text-foreground">
              Request
            </h3>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "cURL", lang: "bash", code: SEND_SMS_CURL },
                  { label: "Node.js", lang: "javascript", code: SEND_SMS_NODE },
                  { label: "Python", lang: "python", code: SEND_SMS_PY },
                  { label: "PHP", lang: "php", code: SEND_SMS_PHP },
                ]}
              />
            </div>

            <h3 className="mt-10 text-[17px] font-semibold tracking-tight text-foreground">
              Response
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Success returns a numeric message ID as plain text. Store it to poll delivery status
              later.
            </p>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "Success", lang: "http", code: SEND_SMS_SUCCESS },
                  { label: "Error", lang: "http", code: SEND_SMS_ERROR },
                ]}
              />
            </div>
          </section>

          {/* Delivery Reports */}
          <section id="delivery-reports" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Delivery Reports
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Fetch delivery status for a previously sent batch, given the message ID returned by{" "}
              <Link href="#send-sms" className="text-primary hover:underline">
                Send SMS
              </Link>
              . For production workloads, prefer webhooks — they&apos;re faster and cost no extra
              credits.
            </p>

            <EndpointHeader method="GET" path="/dlrapi" />

            <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-foreground">
              Parameters
            </h3>
            <ParamTable
              rows={[
                {
                  name: "key",
                  type: "string",
                  required: true,
                  description: "Your API key.",
                },
                {
                  name: "messageid",
                  type: "string",
                  required: true,
                  description: "Unique message ID returned by the Send SMS endpoint.",
                  example: "1987654321",
                },
              ]}
            />

            <h3 className="mt-10 text-[17px] font-semibold tracking-tight text-foreground">
              Request
            </h3>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "cURL", lang: "bash", code: DLR_CURL },
                  { label: "Node.js", lang: "javascript", code: DLR_NODE },
                ]}
              />
            </div>

            <h3 className="mt-10 text-[17px] font-semibold tracking-tight text-foreground">
              Response
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Returns a JSON array of <code className="font-mono">[number, status, timestamp]</code>{" "}
              tuples — one row per recipient. Possible status values:{" "}
              <code className="font-mono">DELIVERED</code>,{" "}
              <code className="font-mono">FAILED</code>, <code className="font-mono">PENDING</code>,{" "}
              <code className="font-mono">EXPIRED</code>.
            </p>
            <div className="mt-4">
              <CodeTabs samples={[{ label: "Success", lang: "http", code: DLR_RESPONSE }]} />
            </div>
          </section>

          {/* Check Credits */}
          <section id="check-credits" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Check Credits
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Get the currently available credit balance for a specific route. Useful for setting
              up low-balance alerts in your own monitoring stack.
            </p>

            <EndpointHeader method="GET" path="/creditapi" />

            <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-foreground">
              Parameters
            </h3>
            <ParamTable
              rows={[
                {
                  name: "key",
                  type: "string",
                  required: true,
                  description: "Your API key.",
                },
                {
                  name: "route",
                  type: "integer",
                  required: true,
                  description: "1 for transactional, 2 for promotional.",
                  example: "1",
                },
              ]}
            />

            <h3 className="mt-10 text-[17px] font-semibold tracking-tight text-foreground">
              Request
            </h3>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "cURL", lang: "bash", code: CREDITS_CURL },
                  { label: "Node.js", lang: "javascript", code: CREDITS_NODE },
                ]}
              />
            </div>

            <h3 className="mt-10 text-[17px] font-semibold tracking-tight text-foreground">
              Response
            </h3>
            <div className="mt-4">
              <CodeTabs samples={[{ label: "Success", lang: "http", code: CREDITS_RESPONSE }]} />
            </div>
          </section>

          {/* Error Codes */}
          <section id="error-codes" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Error Codes
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              When a request fails, the response body is a 3-digit error code (as plain text, or
              inside the JSON/XML envelope). Use this table to turn codes into helpful messages
              for your team.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="w-[70px] px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Code
                    </th>
                    <th className="w-[180px] px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Error
                    </th>
                    <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Meaning &amp; fix
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ERROR_CODES.map((err, i) => (
                    <tr
                      key={err.code}
                      className={`border-b border-border last:border-b-0 ${i % 2 ? "bg-muted/20" : ""}`}
                    >
                      <td className="px-4 py-3.5 align-top">
                        <code className="inline-flex items-center rounded bg-destructive/10 px-1.5 py-0.5 font-mono text-[12.5px] font-semibold text-destructive">
                          {err.code}
                        </code>
                      </td>
                      <td className="px-4 py-3.5 align-top font-medium text-foreground">
                        {err.name}
                      </td>
                      <td className="px-4 py-3.5 align-top text-muted-foreground">
                        <p>{err.meaning}</p>
                        <p className="mt-1 text-[13px] text-foreground/80">
                          <strong className="font-semibold">Fix:</strong> {err.fix}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Rate Limits
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              The API is tuned for bursty campaign traffic. Default limits comfortably support
              everything from small OTP workloads to multi-lakh broadcasts — but we&apos;ll raise
              them on request for verified accounts.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Requests / second
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">100</p>
                <p className="mt-1 text-[12.5px] text-muted-foreground">Per API key.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Recipients / call
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">5,000</p>
                <p className="mt-1 text-[12.5px] text-muted-foreground">
                  For larger batches, chunk client-side.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  DLR polls / second
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">20</p>
                <p className="mt-1 text-[12.5px] text-muted-foreground">Prefer webhooks for scale.</p>
              </div>
            </div>

            <p className="mt-6 text-[14.5px] leading-relaxed text-muted-foreground">
              When you hit a limit, the API returns <code className="font-mono">429</code> and
              includes a <code className="font-mono">Retry-After</code> header. Back off
              exponentially — don&apos;t hammer.
            </p>
          </section>

          {/* SDKs */}
          <section id="sdks" className="mt-16 border-t border-border pt-12">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              SDKs
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Official SDKs for Node.js, Python, PHP, Java, and Go are on the roadmap. Until
              then, the three endpoints above are simple enough that any HTTP client works — the
              code samples on this page are copy-paste ready.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {["Node.js", "Python", "PHP", "Java", "Go"].map((lang) => (
                <div
                  key={lang}
                  className="flex items-center justify-between rounded-lg border border-dashed border-border bg-muted/20 px-4 py-3 text-[13.5px]"
                >
                  <span className="font-medium text-foreground">{lang}</span>
                  <span className="inline-flex items-center rounded-sm bg-amber-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <RelatedContent path="/developers/api-docs" />
      </div>

      <ProductFinalCta
        title="Ready to send your first SMS?"
        subtitle="₹60 free credit — enough for 60 real deliveries. No credit card, full DLT support from our team."
        primaryCta={{ label: "Get your API key", href: "/signup" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      <SiteFooter />
    </div>
  )
}

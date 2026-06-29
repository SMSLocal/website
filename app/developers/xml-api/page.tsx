import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, FileCode2, KeyRound, Sparkles, Info } from "lucide-react"
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
export const metadata: Metadata = getPageMetadata("/developers/xml-api")

const SIDEBAR_SECTIONS = [
  {
    title: "Getting started",
    items: [
      { href: "#overview", label: "Overview" },
      { href: "#when-to-use-xml", label: "When to use XML" },
      { href: "#authentication", label: "Authentication" },
    ],
  },
  {
    title: "Endpoints",
    items: [
      { href: "#send-sms", label: "Send SMS" },
      { href: "#delivery-report", label: "Delivery report" },
      { href: "#credits", label: "Check credits" },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "#error-codes", label: "Error codes" },
      { href: "#migration", label: "Migration to REST" },
    ],
  },
]

// ---------- Send SMS (XML) ----------
const SEND_SMS_XML_REQ = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <credentials>
    <key>YOUR_API_KEY</key>
  </credentials>
  <request>
    <route>1</route>              <!-- 1=transactional, 2=promotional -->
    <sender>ALERTS</sender>
    <templateid>1207161234567890123</templateid>
    <numbers>
      <number>9876543210</number>
      <number>9123456789</number>
    </numbers>
    <sms><![CDATA[Your OTP is 482913. Valid for 10 minutes.]]></sms>
  </request>
</smslocal>`

const SEND_SMS_XML_CURL = `curl -X POST "https://app.smslocal.in/api/xml/smsapi" \\
  -H "Content-Type: application/xml" \\
  --data-binary @send.xml`

const SEND_SMS_XML_NODE = `import fs from "node:fs/promises"

const body = await fs.readFile("send.xml", "utf8")

const res = await fetch("https://app.smslocal.in/api/xml/smsapi", {
  method: "POST",
  headers: { "Content-Type": "application/xml" },
  body,
})

const xml = await res.text()
console.log(xml)`

const SEND_SMS_XML_PHP = `<?php
$body = file_get_contents("send.xml");

$ch = curl_init("https://app.smslocal.in/api/xml/smsapi");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/xml"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);
echo $response;`

const SEND_SMS_XML_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <response>
    <status>success</status>
    <messageid>1987654321</messageid>
    <count>2</count>
  </response>
</smslocal>`

const SEND_SMS_XML_ERROR = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <response>
    <status>error</status>
    <code>110</code>
    <message>Invalid DLT Template ID</message>
  </response>
</smslocal>`

// ---------- Delivery Report (XML) ----------
const DLR_XML_REQ = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <credentials>
    <key>YOUR_API_KEY</key>
  </credentials>
  <request>
    <messageid>1987654321</messageid>
  </request>
</smslocal>`

const DLR_XML_CURL = `curl -X POST "https://app.smslocal.in/api/xml/dlrapi" \\
  -H "Content-Type: application/xml" \\
  --data-binary @dlr.xml`

const DLR_XML_RESPONSE = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <response>
    <status>success</status>
    <reports>
      <report>
        <number>9876543210</number>
        <status>DELIVERED</status>
        <time>2026-04-20 14:21:08</time>
      </report>
      <report>
        <number>9123456789</number>
        <status>FAILED</status>
        <time>2026-04-20 14:21:12</time>
      </report>
    </reports>
  </response>
</smslocal>`

// ---------- Check Credits (XML) ----------
const CREDITS_XML_REQ = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <credentials>
    <key>YOUR_API_KEY</key>
  </credentials>
  <request>
    <route>1</route>
  </request>
</smslocal>`

const CREDITS_XML_CURL = `curl -X POST "https://app.smslocal.in/api/xml/creditapi" \\
  -H "Content-Type: application/xml" \\
  --data-binary @credits.xml`

const CREDITS_XML_RESPONSE = `<?xml version="1.0" encoding="UTF-8"?>
<smslocal>
  <response>
    <status>success</status>
    <route>Transactional</route>
    <credits>48215</credits>
  </response>
</smslocal>`

// ---------- Error Codes (shared with HTTP API) ----------
const ERROR_CODES: { code: string; name: string; meaning: string }[] = [
  { code: "101", name: "Invalid user", meaning: "The API key is missing, malformed, or revoked." },
  { code: "102", name: "Invalid sender ID", meaning: "Sender is not registered on DLT under your PE." },
  { code: "103", name: "Invalid contact(s)", meaning: "One or more numbers are not valid Indian mobile numbers." },
  { code: "104", name: "Invalid route", meaning: "Route must be 1 (transactional) or 2 (promotional)." },
  { code: "105", name: "Invalid message", meaning: "Message is empty, too long, or has disallowed characters." },
  { code: "106", name: "Spam blocked", meaning: "Content matched a spam pattern flagged by the operator." },
  { code: "107", name: "Promotional blocked", meaning: "Recipient is on the DND list for this category." },
  { code: "108", name: "Low credits", meaning: "Not enough credits on the selected route." },
  { code: "109", name: "Promotional timing", meaning: "Promotional sends allowed 9:00 AM–8:45 PM IST only." },
  { code: "110", name: "Invalid DLT Template ID", meaning: "Template ID does not match an approved template." },
  { code: "111", name: "No SMSC", meaning: "No operator route currently available. Retry with backoff." },
]

export default function XmlApiPage() {
  return (
    <div className="min-h-svh bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
          { name: "XML API", path: "/developers/xml-api" },
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
                <Link href="/developers" className="hover:text-white">
                  Developers
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white" aria-current="page">
                XML API
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                <FileCode2 className="h-3 w-3" />
                XML API Reference
              </span>
              <h1 className="mt-5 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                Send SMS with XML — for legacy and XML-centric stacks.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-white/70">
                If your system speaks XML, you don&apos;t need to rewrite it. The SMSLocal XML API
                exposes the same endpoints as our HTTP API using clean, well-formed XML requests and
                responses — same credentials, same routing, same DLT guarantees.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="https://app.smslocal.in/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
                >
                  Get your API key
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/developers/api-docs"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  <Sparkles className="h-4 w-4" />
                  Prefer REST? See the HTTP API
                </Link>
              </div>
            </div>

            <aside className="min-w-[280px] rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                Base URL
              </p>
              <code className="mt-2 block break-all font-mono text-[13px] text-white">
                https://app.smslocal.in/api/xml
              </code>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  Auth
                </p>
                <p className="mt-1 text-[13px] text-white/75">
                  <KeyRound className="mr-1.5 -mt-0.5 inline-block h-3.5 w-3.5" />
                  API key via <code className="font-mono text-white">&lt;key&gt;</code> element
                </p>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  Format
                </p>
                <p className="mt-1 text-[13px] text-white/75">POST · application/xml</p>
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
              The XML API is an alternative integration format for teams whose systems consume and
              emit XML natively — think legacy Java middleware, SOAP-based ERPs, or integration
              platforms that pipe XML through transformation layers. Every endpoint available on
              the HTTP API is also available here.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="text-[13.5px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">New integrations</span> should
                  prefer the{" "}
                  <Link href="/developers/api-docs" className="text-primary hover:underline">
                    HTTP / REST API
                  </Link>
                  . It is easier to test, documents better, and receives new features first. XML is
                  maintained primarily for compatibility with older stacks.
                </div>
              </div>
            </div>
          </section>

          {/* When to use XML */}
          <section id="when-to-use-xml" className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              When to use XML
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Pick the XML API when any of the following applies to your environment.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-[14.5px] leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                Your middleware (Mule, BizTalk, WSO2, legacy ESB) already speaks XML end-to-end.
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                You need a schema-validated payload format for downstream audit or compliance.
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                You consume responses inside an application that parses XML natively — e.g. Oracle
                Forms, SAP PI/PO, or an on-prem Java EE stack.
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                You want to send several numbers in one request without constructing a JSON array.
              </li>
            </ul>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Authentication
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Authentication uses the same API key as the HTTP API. Place it inside a{" "}
              <code className="font-mono text-[13px] text-foreground">&lt;credentials&gt;</code>{" "}
              block at the top of every request. Keys are 32-character hex strings and can be
              generated from <span className="font-semibold">Settings → API &amp; Webhooks</span>.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-[13px] text-muted-foreground">
                Keep your key server-side only. If a key is ever exposed in a repo, browser bundle,
                or log file, revoke and re-issue it immediately from the dashboard.
              </p>
            </div>
          </section>

          {/* Endpoint: Send SMS */}
          <section id="send-sms" className="mt-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Send SMS
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Submit a DLT-compliant message to one or more recipients in a single request. The
              response contains a <code className="font-mono text-[13px] text-foreground">messageid</code>{" "}
              you use to fetch delivery reports later.
            </p>

            <EndpointHeader method="POST" path="/api/xml/smsapi" />

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
              Request body
            </h3>
            <ParamTable
              rows={[
                {
                  name: "credentials.key",
                  type: "string",
                  required: true,
                  description: "Your SMSLocal API key.",
                },
                {
                  name: "request.route",
                  type: "integer",
                  required: true,
                  description:
                    "1 for transactional (OTPs, alerts, 24x7, DND-exempt). 2 for promotional (marketing, 9am–9pm only, non-DND).",
                },
                {
                  name: "request.sender",
                  type: "string",
                  required: true,
                  description:
                    "6-character DLT-registered header. Must belong to your Principal Entity.",
                  example: "ALERTS",
                },
                {
                  name: "request.templateid",
                  type: "string",
                  required: true,
                  description:
                    "DLT-approved template ID (19-digit). Content must match the approved template exactly.",
                  example: "1207161234567890123",
                },
                {
                  name: "request.numbers.number",
                  type: "string[]",
                  required: true,
                  description:
                    "One or more recipient numbers. Each number is a 10-digit Indian mobile number (6/7/8/9 prefix). Up to 50,000 numbers per request.",
                },
                {
                  name: "request.sms",
                  type: "CDATA",
                  required: true,
                  description:
                    "Message body wrapped in CDATA so special characters (&, <, >, quotes) survive XML encoding.",
                },
              ]}
            />

            <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
              Request example
            </h3>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "send.xml", lang: "xml", code: SEND_SMS_XML_REQ },
                  { label: "cURL", lang: "bash", code: SEND_SMS_XML_CURL },
                  { label: "Node.js", lang: "javascript", code: SEND_SMS_XML_NODE },
                  { label: "PHP", lang: "php", code: SEND_SMS_XML_PHP },
                ]}
              />
            </div>

            <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
              Response
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Success
                </p>
                <CodeTabs samples={[{ label: "200 OK", lang: "xml", code: SEND_SMS_XML_SUCCESS }]} />
              </div>
              <div>
                <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Error
                </p>
                <CodeTabs samples={[{ label: "200 OK", lang: "xml", code: SEND_SMS_XML_ERROR }]} />
              </div>
            </div>
          </section>

          {/* Endpoint: Delivery report */}
          <section id="delivery-report" className="mt-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Delivery report
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Fetch per-recipient delivery status for a previously-sent batch using its{" "}
              <code className="font-mono text-[13px] text-foreground">messageid</code>. For
              high-volume applications, configure a webhook on the dashboard and let us push
              reports to you instead.
            </p>

            <EndpointHeader method="POST" path="/api/xml/dlrapi" />

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
              Request body
            </h3>
            <ParamTable
              rows={[
                {
                  name: "credentials.key",
                  type: "string",
                  required: true,
                  description: "Your SMSLocal API key.",
                },
                {
                  name: "request.messageid",
                  type: "string",
                  required: true,
                  description:
                    "The message ID returned when the batch was submitted via the Send SMS endpoint.",
                  example: "1987654321",
                },
              ]}
            />

            <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
              Request example
            </h3>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "dlr.xml", lang: "xml", code: DLR_XML_REQ },
                  { label: "cURL", lang: "bash", code: DLR_XML_CURL },
                ]}
              />
            </div>

            <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
              Response
            </h3>
            <div className="mt-4">
              <CodeTabs samples={[{ label: "200 OK", lang: "xml", code: DLR_XML_RESPONSE }]} />
            </div>

            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Status values:</span>{" "}
              <code className="font-mono">DELIVERED</code>,{" "}
              <code className="font-mono">FAILED</code>,{" "}
              <code className="font-mono">PENDING</code>,{" "}
              <code className="font-mono">BLOCKED</code>,{" "}
              <code className="font-mono">EXPIRED</code>. Reports are available for 30 days after
              submission.
            </div>
          </section>

          {/* Endpoint: Credits */}
          <section id="credits" className="mt-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Check credits
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Retrieve your current balance for a specific route. Poll this before large campaigns
              or wire it into an internal monitoring dashboard so you top up before running out.
            </p>

            <EndpointHeader method="POST" path="/api/xml/creditapi" />

            <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
              Request body
            </h3>
            <ParamTable
              rows={[
                {
                  name: "credentials.key",
                  type: "string",
                  required: true,
                  description: "Your SMSLocal API key.",
                },
                {
                  name: "request.route",
                  type: "integer",
                  required: true,
                  description: "1 for transactional balance, 2 for promotional balance.",
                },
              ]}
            />

            <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
              Request example
            </h3>
            <div className="mt-4">
              <CodeTabs
                samples={[
                  { label: "credits.xml", lang: "xml", code: CREDITS_XML_REQ },
                  { label: "cURL", lang: "bash", code: CREDITS_XML_CURL },
                ]}
              />
            </div>

            <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
              Response
            </h3>
            <div className="mt-4">
              <CodeTabs samples={[{ label: "200 OK", lang: "xml", code: CREDITS_XML_RESPONSE }]} />
            </div>
          </section>

          {/* Error codes */}
          <section id="error-codes" className="mt-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Error codes
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Error codes are shared between the HTTP and XML APIs. When a request fails, the
              response will have{" "}
              <code className="font-mono text-[13px] text-foreground">&lt;status&gt;error&lt;/status&gt;</code>{" "}
              and a numeric code.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="w-[80px] px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Code
                    </th>
                    <th className="w-[200px] px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Name
                    </th>
                    <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ERROR_CODES.map((row) => (
                    <tr key={row.code} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3.5 align-top">
                        <code className="font-mono text-[13px] font-semibold text-foreground">
                          {row.code}
                        </code>
                      </td>
                      <td className="px-4 py-3.5 align-top text-[13.5px] font-medium text-foreground">
                        {row.name}
                      </td>
                      <td className="px-4 py-3.5 align-top text-[13.5px] leading-relaxed text-muted-foreground">
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              See the{" "}
              <Link href="/developers/api-docs#error-codes" className="text-primary hover:underline">
                HTTP API reference
              </Link>{" "}
              for full error-code fixes and remediation tips — they apply identically to the XML
              API.
            </p>
          </section>

          {/* Migration */}
          <section id="migration" className="mt-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Migration to REST
            </h2>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Teams that migrate from XML to REST typically save 30–50% on integration code and
              gain access to newer features like idempotency keys, streaming delivery reports, and
              native SDK support. Here is the quick mapping:
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      XML endpoint
                    </th>
                    <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      REST equivalent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { xml: "POST /api/xml/smsapi", rest: "GET /api/smsapi" },
                    { xml: "POST /api/xml/dlrapi", rest: "GET /api/dlrapi" },
                    { xml: "POST /api/xml/creditapi", rest: "GET /api/creditapi" },
                  ].map((row) => (
                    <tr key={row.xml} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3.5 align-top">
                        <code className="font-mono text-[13px] text-foreground">{row.xml}</code>
                      </td>
                      <td className="px-4 py-3.5 align-top">
                        <code className="font-mono text-[13px] text-foreground">{row.rest}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground">
                    Ready to move to REST?
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    Our solutions engineers can review your XML payloads and ship a REST adapter
                    alongside your existing integration so you cut over with zero downtime.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href="/developers/api-docs"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13.5px] font-semibold text-primary-foreground shadow-md shadow-primary/25 transition hover:brightness-110"
                    >
                      Read HTTP API docs
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/company/contact"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-[13.5px] font-semibold text-foreground transition hover:bg-muted"
                    >
                      Talk to solutions engineering
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <RelatedContent path="/developers/xml-api" />

      <ProductFinalCta
        title="Same API. Whichever format your stack prefers."
        subtitle="Grab a key, pick REST or XML, and start sending. \u20B960 free credit on every new account."
        primaryCta={{ label: "Sign up free", href: "https://app.smslocal.in/signup" }}
        secondaryCta={{ label: "Talk to sales", href: "/company/contact" }}
      />

      <SiteFooter />
    </div>
  )
}

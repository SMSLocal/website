import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Code2,
  Copy,
  GitBranch,
  KeyRound,
  Lightbulb,
  LineChart,
  MessageCircle,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/developers")

const QUICKSTART_TILES = [
  {
    title: "Quickstart",
    description: "From zero to first SMS in 5 minutes. cURL, API key, and a single POST.",
    href: "/developers/quickstart",
    icon: Zap,
    accent: "from-primary/20 to-primary/0",
  },
  {
    title: "API Reference",
    description: "Every endpoint, every parameter, every response code — with live examples.",
    href: "/developers/api-docs",
    icon: BookOpen,
    accent: "from-sky-500/20 to-sky-500/0",
  },
  {
    title: "SMS API reference",
    description: "Deep dive on the SMS endpoint — DLT templates, sender IDs, Unicode, webhooks.",
    href: "/developers/sms-api",
    icon: MessageSquare,
    accent: "from-amber-500/20 to-amber-500/0",
  },
]

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/sms/send",
    description: "Send a single DLT-compliant SMS to one recipient.",
    icon: MessageSquare,
    code: `curl -X POST https://api.smslocal.in/v1/sms/send \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+919876543210",
    "sender_id": "SMSLOC",
    "template_id": "1307161234567890123",
    "body": "Your order #4821 is confirmed. Tracking in our app."
  }'`,
  },
  {
    method: "POST",
    path: "/v1/otp/send",
    description: "Dispatch an OTP on a dedicated priority route with retry logic.",
    icon: KeyRound,
    code: `curl -X POST https://api.smslocal.in/v1/otp/send \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: 2f9b6c1e-…" \\
  -d '{
    "to": "+919876543210",
    "code_length": 6,
    "expires_in": 300,
    "channel": "sms"
  }'`,
  },
  {
    method: "POST",
    path: "/v1/whatsapp/send",
    description: "Send a WhatsApp Business template message with variables and buttons.",
    icon: MessageCircle,
    code: `curl -X POST https://api.smslocal.in/v1/whatsapp/send \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+919876543210",
    "template_name": "order_shipped_en",
    "language": "en",
    "variables": ["4821", "25 Apr", "https://smsl.in/t/4821"]
  }'`,
  },
  {
    method: "POST",
    path: "/v1/campaigns/bulk",
    description: "Launch a bulk SMS campaign across a large recipient list with throttling.",
    icon: Send,
    code: `curl -X POST https://api.smslocal.in/v1/campaigns/bulk \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Diwali Sale — Delhi NCR",
    "template_id": "1307161234567890124",
    "recipients_list_id": "lst_8d2a41",
    "schedule_at": "2026-10-28T19:00:00+05:30"
  }'`,
  },
]

export default function DevelopersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-[#030e12] py-20 text-white sm:py-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -top-20 left-1/3 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-sky-500/10 to-transparent blur-3xl"
          />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
                <Code2 className="h-3 w-3 text-primary" />
                Developer Hub
              </div>
              <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Send your first message in{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-sky-400 bg-clip-text text-transparent">
                  five minutes
                </span>
                .
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-white/70 sm:text-lg">
                REST APIs, six language SDKs, webhook-driven delivery reports, and a sandbox mode with ₹60 free credit.
                Everything an engineer needs to go from <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-primary">curl</code> to production.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/developers/quickstart"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
                >
                  Start the quickstart
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/developers/api-docs"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  API reference
                </Link>
                <Link
                  href="https://app.smslocal.in/signup"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-white/70 transition hover:text-white"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  Get sandbox credits
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
                <TrustItem icon={<ShieldCheck className="h-4 w-4" />} label="Signed webhooks" />
                <TrustItem icon={<Zap className="h-4 w-4" />} label="Idempotency built-in" />
                <TrustItem icon={<GitBranch className="h-4 w-4" />} label="Versioned API" />
                <TrustItem icon={<LineChart className="h-4 w-4" />} label="Real-time DLRs" />
              </div>
            </div>

            {/* Terminal preview */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-sky-500/10 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030b0d] shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/50">
                    <TerminalSquare className="h-3.5 w-3.5" />
                    zsh — smslocal
                  </span>
                  <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-white/40">sandbox</span>
                </div>
                <pre className="overflow-x-auto px-5 py-5 text-[12.5px] leading-relaxed text-white/85 font-[family-name:var(--font-mono)]">
{`$ curl -X POST https://api.smslocal.in/v1/sms/send \\
  -H "Authorization: Bearer sk_test_•••••••••" \\
  -d '{"to":"+919876543210","body":"Hello India"}'

{
  "id": "msg_4f6c72",
  "status": "queued",
  "to": "+919876543210",
  "operator": "JIO",
  "template_id": "1307161234567890123",
  "route": "transactional-priority",
  "segments": 1,
  "price": { "amount": 0.21, "currency": "INR" }
}

# delivery webhook fires in ~0.6s`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Quickstart tiles */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Start here"
            title="Four ways to get productive fast."
            subtitle="Every tile takes you to a focused, copy-paste-ready page."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICKSTART_TILES.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div
                  aria-hidden
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${tile.accent} blur-2xl transition group-hover:scale-110`}
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <tile.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 flex items-center gap-1.5 text-base font-semibold">
                    {tile.title}
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tile.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Popular endpoints */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Popular endpoints"
              title="Copy, paste, ship."
              subtitle="Four endpoints cover 90% of integrations. Bring your API key and you're done."
            />
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {ENDPOINTS.map((ep) => (
                <div
                  key={ep.path}
                  className="group overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 border-b border-foreground/5 bg-background/60 px-5 py-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ep.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {ep.method}
                        </span>
                        <code className="font-[family-name:var(--font-mono)] text-sm font-semibold">{ep.path}</code>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{ep.description}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Copy ${ep.path} example`}
                      className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md border border-foreground/10 bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <pre className="overflow-x-auto px-5 py-4 text-[12.5px] leading-relaxed text-foreground/80 font-[family-name:var(--font-mono)]">
                    {ep.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sandbox callout */}
        <Section>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-primary/10 via-background to-background p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Sandbox access</h3>
              </div>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
                Test the full API against a sandbox phone number. No credits consumed, no DLT
                template required — ideal for CI pipelines and PR previews.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="https://app.smslocal.in/signup"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition hover:brightness-110"
                >
                  Get API key
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-muted-foreground">₹60 free credit on first top-up</span>
              </div>
            </div>
          </div>
        </Section>

        <RelatedContent path="/developers" />

        <ProductFinalCta
          title="The fastest path from curl to production."
          subtitle="SDKs, webhooks, signed events, idempotency, sandbox — everything your platform team will audit for, already built."
          primaryCta={{ label: "Start building — free", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Read the docs", href: "/developers/api-docs" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-white/70">
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-primary">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  )
}

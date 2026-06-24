import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Code2,
  GitBranch,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Palette,
  Receipt,
  Shapes,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Store,
  TrendingDown,
  Truck,
  Zap,
} from "lucide-react"
import {
  formatInr,
  formatPaiseAsRupees,
  RCS_PLANS,
  SMSLOCAL_RCS_RATE,
} from "@/lib/pricing/rcs"
import { RcsCalculator } from "@/components/pricing/rcs-calculator"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  ProductHero,
  LogosStrip,
  FeatureGrid,
  BulletList,
  CompareTable,
  HowItWorks,
  UseCaseGrid,
  StatsBand,
  Faq,
  ProductEditorialBand,
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { RcsVisual } from "@/components/product/rcs-visual"
import { CodeTabs } from "@/components/product/code-tabs"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/rcs")

const NODE_CODE = `import fetch from "node-fetch"

// One payload, multi-channel waterfall:
// RCS → WhatsApp → SMS, on the same wallet and webhook.
const res = await fetch("https://api.smslocal.in/v1/rcs/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.SMSLOCAL_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "+919876543210",
    agent_id: "smslocal_brand_01",
    card: {
      title: "Your Diwali hamper is ready",
      description: "Apply code DIWALI500 at checkout.",
      media_url: "https://cdn.smslocal.in/diwali.jpg",
      suggested_replies: ["Track order", "View offer", "Not now"],
    },
    fallback: {
      sms_template_id: "ORDER_READY_V2",
      variables: { code: "DIWALI500" },
    },
  }),
})

const data = await res.json()
console.log(data.message_id, data.channel_used) // "rcs" | "sms"`

const PYTHON_CODE = `import os, requests

res = requests.post(
    "https://api.smslocal.in/v1/rcs/send",
    headers={
        "Authorization": f"Bearer {os.environ['SMSLOCAL_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "to": "+919876543210",
        "agent_id": "smslocal_brand_01",
        "card": {
            "title": "Your Diwali hamper is ready",
            "description": "Apply code DIWALI500 at checkout.",
            "media_url": "https://cdn.smslocal.in/diwali.jpg",
            "suggested_replies": ["Track order", "View offer", "Not now"],
        },
        "fallback": {
            "sms_template_id": "ORDER_READY_V2",
            "variables": {"code": "DIWALI500"},
        },
    },
)

print(res.json())`

const PHP_CODE = `<?php
$ch = curl_init("https://api.smslocal.in/v1/rcs/send");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . getenv("SMSLOCAL_API_KEY"),
    "Content-Type: application/json",
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "to" => "+919876543210",
    "agent_id" => "smslocal_brand_01",
    "card" => [
        "title" => "Your Diwali hamper is ready",
        "description" => "Apply code DIWALI500 at checkout.",
        "media_url" => "https://cdn.smslocal.in/diwali.jpg",
        "suggested_replies" => ["Track order", "View offer", "Not now"],
    ],
    "fallback" => [
        "sms_template_id" => "ORDER_READY_V2",
        "variables" => ["code" => "DIWALI500"],
    ],
]));

echo curl_exec($ch);
curl_close($ch);`

export default function RcsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="RCS Business Messaging"
        description="Send branded, verified RCS Business Messages over Indian carrier networks with rich cards, carousels, suggested replies, and automatic DLT-compliant SMS fallback on the same wallet."
        path="/products/rcs"
        category="Rich business messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "RCS Business Messaging", path: "/products/rcs" },
        ]}
      />      <SiteHeader />
      <main className="flex-1">
        <ProductHero
          eyebrow="RCS Business Messaging"
          title="RCS for Indian businesses — branded, verified, and with SMS always waiting to catch."
          description="Send rich cards, image carousels, and tappable suggested replies under your verified brand on Jio, Airtel, and Vi. When a handset doesn't yet support RCS, we fall back automatically to a DLT-compliant SMS on the same wallet and the same webhook. One integration, every Indian phone."
          primaryCta={{ label: "Join RCS early access", href: "/signup" }}
          secondaryCta={{ label: "Talk to our team", href: "/company/contact" }}
          trustItems={[
            "Verified sender badge",
            "Rich cards & carousels",
            "Automatic SMS fallback",
            "One wallet, one webhook",
          ]}
          visual={<RcsVisual />}
        />

        <LogosStrip label="Indian brands piloting RCS on SMSLocal across retail, fintech, logistics, and travel" count={7} />

        <Section>
          <SectionHeader
            eyebrow="Why RCS on SMSLocal"
            title="Rich branded messaging — without the rich-platform complexity."
            description="RCS finally makes SMS look like the rest of your brand. A logo, a verified badge, a hero image, suggested replies — delivered through the same phone inbox people already open 98% of the time. SMSLocal wires up the carrier approvals, the fallback logic, and the analytics so your team only sees one clean API."
          />
          <FeatureGrid
            items={[
              {
                icon: <BadgeCheck className="h-5 w-5" />,
                title: "Verified sender identity",
                description:
                  "Your brand name, logo, colours, and a verified blue-check badge — carrier-approved so customers know it's really you before they read a word.",
              },
              {
                icon: <ImageIcon className="h-5 w-5" />,
                title: "Rich cards and carousels",
                description:
                  "Hero images, multi-image carousels, titles, descriptions, and tappable buttons render natively on Google Messages over Indian carriers.",
              },
              {
                icon: <Sparkles className="h-5 w-5" />,
                title: "Suggested reply chips",
                description:
                  "Tap-to-reply chips turn one-way broadcasts into conversations — track orders, view offers, confirm appointments in a single tap.",
              },
              {
                icon: <GitBranch className="h-5 w-5" />,
                title: "Automatic SMS fallback",
                description:
                  "Not every handset is RCS-capable yet. We check capability per number, send RCS when it works, and fall back to your approved DLT SMS template when it doesn't.",
              },
              {
                icon: <Layers className="h-5 w-5" />,
                title: "One wallet, one webhook",
                description:
                  "RCS and SMS billing on the same wallet. Delivery events from both channels on the same signed webhook, so your downstream systems don't need to care which channel was used.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "DLT-aligned from day one",
                description:
                  "Sender IDs, templates, and consent treated with the same DLT-grade compliance we already run for SMS — no separate compliance workflow to maintain.",
              },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How the waterfall works"
            title="RCS first. SMS never far behind."
          />
          <HowItWorks
            steps={[
              {
                icon: <Code2 className="h-5 w-5" />,
                title: "One API call",
                description:
                  "POST to /v1/rcs/send with your card payload, a fallback SMS template ID, and the destination number. That's it.",
              },
              {
                icon: <Smartphone className="h-5 w-5" />,
                title: "Capability check",
                description:
                  "We probe whether the handset is RCS-capable on its current carrier in real time. No extra latency to your flow.",
              },
              {
                icon: <Sparkles className="h-5 w-5" />,
                title: "RCS if available",
                description:
                  "Capable handsets receive the full rich card with your verified branding, image, and suggested replies — within a second on major carriers.",
              },
              {
                icon: <MessageSquare className="h-5 w-5" />,
                title: "SMS fallback if not",
                description:
                  "Everyone else receives your approved DLT SMS template on the same operator route. One delivery webhook confirms whichever channel landed.",
              },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Developer experience"
            title="Ship RCS the same afternoon."
            description="If you already send SMS through us, RCS is one endpoint and one payload change away. Same authentication, same webhook signing, same delivery status format."
          />
          <CodeTabs
            tabs={[
              { label: "Node.js", language: "javascript", code: NODE_CODE },
              { label: "Python", language: "python", code: PYTHON_CODE },
              { label: "PHP", language: "php", code: PHP_CODE },
            ]}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <BulletList
              title="What you send"
              items={[
                "Title, description, hero image or carousel, and up to four suggested-reply chips per card.",
                "Action buttons for dial, URL, location, or calendar — mapped to native RCS actions.",
                "A required DLT-compliant SMS template as the fallback so nobody is left unread.",
              ]}
            />
            <BulletList
              title="What you get back"
              items={[
                "A single delivery webhook per message, marked with which channel actually landed.",
                "Read receipts and suggested-reply taps forwarded as structured events.",
                "Per-channel analytics — delivery, read, tap — alongside your existing SMS reports.",
              ]}
            />
            <BulletList
              title="Safe by default"
              items={[
                "Signed webhooks, scoped API keys per environment, and IP allowlists on paid plans.",
                "Fallback SMS templates are DLT-checked at send-time; missing templates fail fast.",
                "PII redacted from logs; full payloads available on enterprise plans with audit trails.",
              ]}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="Feature depth"
            title="Everything modern messaging teams want — on the channel people already open."
          />
          <FeatureGrid
            items={[
              {
                icon: <Palette className="h-5 w-5" />,
                title: "Brand studio",
                description:
                  "Upload your logo, pick brand colours, and preview your card on Android devices before you ship. Preview rendering matches Google Messages pixel-for-pixel.",
              },
              {
                icon: <Shapes className="h-5 w-5" />,
                title: "Carousels & rich media",
                description:
                  "Send multi-card carousels for product ranges, offer grids, or travel itineraries. Each card has its own media, copy, and actions.",
              },
              {
                icon: <AlertTriangle className="h-5 w-5" />,
                title: "Safety rails",
                description:
                  "Per-brand rate limits, recipient cooldowns, and content-category tagging to keep promotional and transactional streams isolated.",
              },
              {
                icon: <Receipt className="h-5 w-5" />,
                title: "Transparent billing",
                description:
                  "RCS is billed per conversation or per message depending on carrier; SMS fallback is billed at your existing SMS rate. One consolidated GST invoice.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Low-latency delivery",
                description:
                  "Sub-second typical delivery on Indian carriers; RCS and SMS share the same priority routing backbone.",
              },
              {
                icon: <Layers className="h-5 w-5" />,
                title: "Works with your CDP",
                description:
                  "Connect Segment, Mixpanel, Moengage, and your data warehouse. Deliver RCS campaigns from the segments your growth team already builds.",
              },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Compared to alternatives"
            title="Why Indian teams pick SMSLocal for RCS."
          />
          <CompareTable
            columns={["SMSLocal RCS", "Direct carrier RCS", "SMS only"]}
            rows={[
              {
                label: "Single API for RCS + SMS + WhatsApp",
                values: ["Yes — one payload, one webhook", "RCS only; SMS is a separate integration", "SMS only"],
              },
              {
                label: "Automatic SMS fallback",
                values: ["Yes — per-number capability check", "Customer builds it themselves", "Not applicable"],
              },
              {
                label: "Verified sender onboarding",
                values: ["We manage carrier approvals for you", "You deal with each carrier directly", "Sender ID via DLT"],
              },
              {
                label: "Brand studio and previews",
                values: ["Yes — visual editor with device preview", "Varies — usually dev-only JSON", "Text preview only"],
              },
              {
                label: "Unified billing and invoicing",
                values: ["Yes — one wallet, one GST invoice", "Separate billing per carrier", "SMS invoice only"],
              },
              {
                label: "Indian support coverage",
                values: ["India-based, product-trained team", "Generic carrier support", "Varies by vendor"],
              },
            ]}
          />
        </Section>

        <ProductEditorialBand
          layout="split"
          src="/products/rcs-verified-branded-business-card.png"
          imageWidth={1400}
          imageHeight={540}
          alt="SMSLocal RCS business messaging dashboard showing a verified branded sender with a live overview, real-time delivery status, carrier-direct connections and global coverage across 200+ countries."
          eyebrow="The moment SMS grew up"
          headline="A verified, branded card where your customer already reads everything."
          caption="Logos, images, carousels, and tap-to-reply chips on the messaging app that ships with every Android phone — with DLT SMS picking up whoever isn't there yet."
        />

        <Section tone="muted">
          <SectionHeader eyebrow="Use cases" title="Where RCS earns its keep first." />
          <UseCaseGrid
            items={[
              {
                icon: <Store className="h-5 w-5" />,
                title: "Retail & D2C",
                description:
                  "Product drops, offer carousels, order updates with images, and one-tap reorder buttons — on the inbox customers already check.",
              },
              {
                icon: <Truck className="h-5 w-5" />,
                title: "Logistics & delivery",
                description:
                  "Out-for-delivery cards with rider details, live tracking buttons, and one-tap reschedule — replacing plain-text SMS noise.",
              },
              {
                icon: <Building2 className="h-5 w-5" />,
                title: "Banking & fintech",
                description:
                  "Verified statements, card-activation flows, and fraud alerts under a branded verified sender — a trust upgrade over unbranded SMS.",
              },
              {
                icon: <Stethoscope className="h-5 w-5" />,
                title: "Healthcare",
                description:
                  "Appointment cards with map and reschedule chips, lab-report availability notices, and follow-up reminders with richer context.",
              },
            ]}
          />
        </Section>

        <Section>
          <StatsBand
            items={[
              { value: "Sub-1s", label: "typical RCS rendering on capable Indian handsets" },
              { value: "3x", label: "typical tap-through lift vs. equivalent plain-text SMS" },
              { value: "100%", label: "coverage — RCS where supported, DLT SMS everywhere else" },
              { value: "1 API", label: "one payload covers RCS, WhatsApp, and SMS waterfall" },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="Pricing"
            title="Priced 1% below the market leader. Auditable on every invoice."
            description="We publish SMSLocal's RCS rate at exactly 1% below MSG91's public India rate card — same Google RBM partners, same Jio–Airtel–Vi coverage, a cheaper per-message rate, and a link to every source we benchmark against."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Basic text message
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  <TrendingDown className="h-3 w-3" />
                  1% lower
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-[36px] font-semibold tracking-tight text-foreground tabular-nums">
                  {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.basicTextPaise)}
                </span>
                <span className="text-[13px] text-muted-foreground">/ message</span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                Market rate{" "}
                <span className="font-mono text-foreground/80 line-through">₹0.12</span> · India
                A2P · pre-GST
              </p>
            </div>

            <div className="rounded-2xl border border-primary/40 bg-primary/[0.04] p-6 shadow-sm ring-1 ring-primary/15">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Rich card message
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  <TrendingDown className="h-3 w-3" />
                  1% lower
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-[36px] font-semibold tracking-tight text-foreground tabular-nums">
                  {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.richCardPaise)}
                </span>
                <span className="text-[13px] text-muted-foreground">/ message</span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                Market rate{" "}
                <span className="font-mono text-foreground/80 line-through">₹0.14</span> · India
                A2P · pre-GST
              </p>
            </div>
          </div>

          {/* Interactive cost calculator */}
          <div className="mt-10">
            <RcsCalculator id="rcs-product-calculator" variant="hero" />
          </div>

          <div id="rcs-plans" className="mt-10 scroll-mt-32">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-[22px] font-semibold tracking-tight text-foreground">
                  Wallet plans — no platform fee.
                </h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                  Pick a wallet size. No separate monthly platform fee — the plan amount is your
                  wallet credit. Validity 24 months, usable against the rate card above.
                </p>
              </div>
              <Link
                href="/pricing#rcs"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary underline-offset-2 hover:underline"
              >
                See full rate card
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {RCS_PLANS.map((plan) => {
                const featured = plan.badge === "Most popular"
                return (
                  <div
                    key={plan.id}
                    className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm ${
                      featured
                        ? "border-primary/60 ring-1 ring-primary/20"
                        : "border-border"
                    }`}
                  >
                    {plan.badge ? (
                      <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        {plan.badge}
                      </span>
                    ) : null}
                    <h4 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {plan.name}
                    </h4>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-[28px] font-semibold tracking-tight text-foreground tabular-nums">
                        {formatInr(plan.walletInr)}
                      </span>
                      <span className="text-[12.5px] text-muted-foreground">wallet</span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                      ≈ {plan.richCardsIncluded.toLocaleString("en-IN")} rich cards or{" "}
                      {plan.basicTextsIncluded.toLocaleString("en-IN")} basic texts
                    </p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {plan.includes.slice(0, 4).map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2 text-[12.5px] leading-relaxed text-foreground/90"
                        >
                          <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/signup"
                      className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition ${
                        featured
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:brightness-110"
                          : "border border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      Start with {plan.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeader eyebrow="FAQs" title="RCS Business Messaging, answered." />
          <Faq
            items={[
              {
                q: "What is RCS and how is it different from SMS?",
                a: "RCS (Rich Communication Services) is the carrier-upgraded successor to SMS. On capable Android handsets it supports verified sender branding, hero images, carousels, tappable suggested replies, read receipts, and typing indicators — rendered natively in Google Messages. It uses the recipient's phone number and doesn't require a third-party app.",
              },
              {
                q: "Does RCS work on iPhone in India?",
                a: "iOS 18 added RCS support and Apple is rolling it out on Indian carriers progressively. Where RCS is available on iPhone we'll use it; otherwise we fall back to your DLT-compliant SMS template automatically, so your campaign reaches everyone regardless of device.",
              },
              {
                q: "Which Indian carriers support RCS?",
                a: "RCS is live on Jio and Airtel for most Android handsets on Google Messages, with Vi progressively rolling out. BSNL is still SMS-primary. SMSLocal's waterfall handles each recipient's capability automatically — you don't encode carrier logic into your product.",
              },
              {
                q: "What do I need to send branded RCS?",
                a: "A verified business identity (we guide you through carrier approval), your brand assets (logo, colours, and name), and one or more RCS agents that our team registers with the carriers. Once approved, you can ship campaigns from the dashboard or the API the same day.",
              },
              {
                q: "How is RCS priced?",
                a: "RCS is billed per conversation or per message depending on the carrier's programme (retail pricing still settling in India). SMS fallback is billed at your existing SMSLocal SMS rate. Both appear on one consolidated monthly GST invoice on a single wallet.",
              },
              {
                q: "Do I need to rebuild my integration to use RCS?",
                a: "No. If you already send SMS on SMSLocal, enable RCS by adding a card object and a fallback template to your existing payload. Your webhook format, authentication, and delivery statuses stay exactly the same — we just add a channel_used field so you know which path landed.",
              },
              {
                q: "Is RCS DLT-compliant?",
                a: "DLT rules in India apply to SMS; RCS is governed by the carriers' RCS Business Messaging programmes with their own content and sender-verification approvals. We manage both so your campaign is approved end-to-end — the verified RCS brand for the rich path and the DLT SMS template for the fallback.",
              },
            ]}
          />
        </Section>

        <RelatedContent path="/products/rcs" />

        <Section>
          <ProductFinalCta
            title="Give your most-read inbox a real brand."
            description="Get onto the SMSLocal RCS early-access programme, ship your first branded card, and keep SMS as the safety net — on one wallet."
            primaryCta={{ label: "Join RCS early access", href: "/signup" }}
            secondaryCta={{ label: "Talk to our team", href: "/company/contact" }}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}

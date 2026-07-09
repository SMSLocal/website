import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Bolt,
  BarChart3,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Code2,
  FileCode2,
  Mail,
  FileSpreadsheet,
  Plug,
  Webhook,
  Languages,
  Paperclip,
  Workflow,
  Award,
  Users,
  Database,
  Radio,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  ProductHero,
  CapabilityGrid,
  HowItWorks,
  FeatureGrid,
  UseCaseGrid,
  Faq,
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { SmsApiVisual } from "@/components/developers/sms-api-visual"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/developers/sms-api")

const BENEFITS = [
  {
    icon: Globe2,
    title: "Instant pan-India reach",
    body: "Connect to every major Indian operator through direct carrier links. Sub-second delivery for OTPs and alerts, even at peak hours.",
  },
  {
    icon: TrendingUp,
    title: "Boost customer engagement",
    body: "Trigger timely alerts, promotions, and two-way conversations the moment something changes in your product or CRM.",
  },
  {
    icon: Bolt,
    title: "Built for peak traffic",
    body: "Handle flash sales, exam results, and festival spikes. Our platform scales linearly without compromising throughput or latency.",
  },
  {
    icon: BarChart3,
    title: "Actionable analytics",
    body: "Real-time delivery, failure, and DND reporting. Filter by campaign, template, operator, or time window — no data warehouse needed.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified workflow control",
    body: "Manage DLT templates, sender IDs, campaigns, and API keys from one dashboard. No separate portals for each operator.",
  },
  {
    icon: ShieldCheck,
    title: "Cost-effective by design",
    body: "Transparent, volume-tiered pricing with no setup fees. SMS remains the cheapest high-open-rate channel in India, and we keep it that way.",
  },
]

const FEATURES: { icon: typeof Workflow; title: string; description: string }[] = [
  {
    icon: Workflow,
    title: "Automate communication",
    description:
      "Hook the API into your website, app, or CRM to trigger OTPs, order updates, payment confirmations, and service alerts without human intervention.",
  },
  {
    icon: Languages,
    title: "Advanced messaging",
    description:
      "Send messages in 8+ Indian languages with full Unicode support. Long SMS (up to 1,600 characters) is automatically chunked and reassembled.",
  },
  {
    icon: Webhook,
    title: "Custom workflows",
    description:
      "Configure multiple webhooks for delivery, failure, reply, and link-click events. Route each event to the downstream system that cares about it.",
  },
  {
    icon: Paperclip,
    title: "Rich content",
    description:
      "Attach shortlinks, tracked URLs, and templated parameters to every message. Promote files, PDFs, or landing pages without breaking the SMS limit.",
  },
]

const HOW_STEPS = [
  {
    title: "Integrate the API",
    body: "Drop a single HTTP call into your stack. Choose JSON or XML, authenticate with your API key, and reference your approved DLT templates.",
  },
  {
    title: "Send individual or bulk",
    body: "Trigger transactional flows, schedule marketing campaigns, or blast critical alerts. The same endpoint handles one message or ten million.",
  },
  {
    title: "Track performance end-to-end",
    body: "Fetch delivery reports, listen to webhooks, and manage two-way replies. Reconcile with your product analytics in real time.",
  },
]

const INTEGRATIONS: { icon: typeof Code2; title: string; description: string }[] = [
  {
    icon: Code2,
    title: "REST API",
    description:
      "The primary integration path. Simple JSON requests over HTTPS with idempotency keys and cursor-based delivery reports.",
  },
  {
    icon: FileCode2,
    title: "SDKs",
    description:
      "Pre-built clients for Node.js, Python, PHP, Java, .NET, and Go. Typed, tested, and published on major package registries.",
  },
  {
    icon: Mail,
    title: "SMTP API",
    description:
      "Send SMS by emailing a purpose-built address. Ideal for legacy apps that can already send email but cannot integrate a new HTTP client.",
  },
  {
    icon: FileSpreadsheet,
    title: "MS Excel add-in",
    description:
      "Launch campaigns directly from a spreadsheet. Great for operations teams that live in Excel and don't want to wait on engineering.",
  },
  {
    icon: Plug,
    title: "CRM plugins",
    description:
      "Zoho, Salesforce, HubSpot, Freshworks, and more. Trigger SMS from lead-status changes, deal stages, or support-ticket events.",
  },
]

const TRUST_ITEMS: { icon: typeof Award; title: string; description: string }[] = [
  {
    icon: Award,
    title: "Proven reliability",
    description:
      "98%+ delivery rates backed by ISO 27001-certified operations and direct interconnects with every major Indian operator.",
  },
  {
    icon: Users,
    title: "Expert guidance",
    description:
      "Dedicated account managers for growth and enterprise plans. DLT registration help, template review, and campaign tuning at no extra cost.",
  },
  {
    icon: Database,
    title: "Data security",
    description:
      "DPDP Act-aligned data handling, data residency in India, and encrypted storage for every message payload. Full audit log retention.",
  },
  {
    icon: Radio,
    title: "Direct operator routes",
    description:
      "No reseller hops. Our routes terminate directly on Airtel, Jio, Vi, and BSNL infrastructure for predictable latency and DLR accuracy.",
  },
]

const FAQS = [
  {
    q: "How do I integrate the SMS API?",
    a: "Sign up, generate an API key, register a DLT sender ID and template, and make a single POST request to /v1/messages. Most teams send their first test SMS within 15 minutes. Full documentation, code examples, and SDKs are available in the API reference.",
  },
  {
    q: "Can I schedule messages in advance?",
    a: "Yes. Pass a send_at ISO-8601 timestamp on the send endpoint and we queue the message for delivery at that exact time in IST. You can also cancel or reschedule queued messages via the API until the moment they dispatch.",
  },
  {
    q: "How can I track message delivery status?",
    a: "Every send returns a message_id you can query via the delivery-report endpoint, or you can configure a webhook to receive DELIVERED, FAILED, and BLOCKED events in real time. Webhooks are signed with HMAC-SHA256 so you can verify authenticity.",
  },
  {
    q: "What kind of support do you offer?",
    a: "All plans include email and WhatsApp support. Growth and above get a dedicated account manager, priority routing for support tickets, and a Slack channel shared with our engineering team for integration help.",
  },
  {
    q: "What is the difference between promotional and transactional SMS?",
    a: "Promotional SMS is marketing content sent only to non-DND numbers between 9am and 9pm IST, using a Principal Entity category DLT template. Transactional SMS (OTPs, service alerts, payment confirmations) can be delivered 24x7 to any number, including DND, when sent via an approved transactional template on a registered header.",
  },
]

export default function SmsApiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
          { name: "SMS API", path: "/developers/sms-api" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="SMS API"
          title={<>Automate your business messaging with a powerful SMS API.</>}
          subtitle="Connect to the SMSLocal infrastructure and send DLT-compliant messages at scale. Developer-friendly REST and XML endpoints, comprehensive docs, and direct-operator delivery — so your customers hear from you the second it matters."
          primaryCta={{ label: "Start with \u20B960 free credit", href: "/signup" }}
          secondaryCta={{ label: "Explore the HTTP API", href: "/developers/api-docs" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant" },
            { icon: Bolt, label: "Sub-second delivery" },
            { icon: Globe2, label: "Pan-India coverage" },
            { icon: Code2, label: "REST + XML + SDKs" },
          ]}
          visual={<SmsApiVisual />}
        />

        <Section>
          <SectionHeader
            eyebrow="What is a bulk SMS API"
            title="Start sending messages with our API in minutes."
            subtitle="Integrate SMS into your apps with robust, developer-friendly endpoints. Choose JSON or XML — either way, well-documented requests give you the flexibility to plug into any stack."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Well-documented REST and XML endpoints",
              "First SMS sent in under 15 minutes",
              "Flexible integration for any language",
              "Reliable, signed webhooks for every event",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-card p-5 text-[14px] font-medium text-foreground shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </Section>

        <CapabilityGrid
          eyebrow="Benefits"
          title="Why engineering and marketing teams pick the SMSLocal API."
          subtitle="Integrating an SMS API transforms how your product communicates. Here is what you get on day one."
          items={BENEFITS}
        />

        <Section>
          <SectionHeader
            eyebrow="Key features"
            title="Built for seamless API integration."
            subtitle="The REST API is designed to drop into your website, app, or CRM and disappear — so your team ships messaging features, not infrastructure."
          />
          <FeatureGrid
            items={FEATURES.map((f) => {
              const Icon = f.icon
              return {
                icon: <Icon className="h-4 w-4" />,
                title: f.title,
                description: f.description,
              }
            })}
          />
        </Section>

        <HowItWorks
          eyebrow="How it works"
          title="The SMSLocal bulk SMS API, start to finish."
          subtitle="Simple to stand up, easy to scale. Our team is on call 24x7 if you need help at any step."
          steps={HOW_STEPS}
        />

        <Section>
          <SectionHeader
            eyebrow="Integration options"
            title="Flexible paths for every platform."
            subtitle="SMSLocal offers multiple integration methods so your team can pick the path that fits its skill set and timeline."
          />
          <FeatureGrid
            items={INTEGRATIONS.map((i) => {
              const Icon = i.icon
              return {
                icon: <Icon className="h-4 w-4" />,
                title: i.title,
                description: i.description,
              }
            })}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Why SMSLocal"
            title="Your trusted messaging partner."
            subtitle="Businesses across India trust SMSLocal for mission-critical communication. We pair modern API infrastructure with the support and compliance work you would expect from an enterprise vendor."
          />
          <UseCaseGrid
            items={TRUST_ITEMS.map((t) => {
              const Icon = t.icon
              return {
                icon: <Icon className="h-4 w-4" />,
                title: t.title,
                description: t.description,
              }
            })}
          />
        </Section>

        <Section>
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <Faq items={FAQS} />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[14px]">
            <span className="text-muted-foreground">More questions?</span>
            <Link
              href="/resources/help"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              Visit the help centre <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-muted-foreground">or</span>
            <Link
              href="/developers/api-docs"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              read the full API reference <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Section>

        <RelatedContent path="/developers/sms-api" />

        <ProductFinalCta
          title="Ship your first SMS in the next 15 minutes."
          subtitle="Claim \u20B960 free credit when you sign up — no credit card, no commitment. Approve a DLT template, grab an API key, and start sending."
          primaryCta={{ label: "Sign up free", href: "/signup" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

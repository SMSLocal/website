import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileSpreadsheet,
  Gauge,
  LayoutTemplate,
  MessageSquare,
  MousePointerClick,
  Pencil,
  Send,
  ShieldCheck,
  Sparkles,
  Timer,
  Upload,
  Users,
  Zap,
} from 'lucide-react'
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
import { QuickSmsVisual } from "@/components/product/quick-sms-visual"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/quick-sms")

export default function QuickSmsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="Quick SMS"
        description="No-code SMS sending for ops, marketing and support teams in India. Upload a CSV, pick a DLT template, preview and send — with real-time delivery reports."
        path="/products/quick-sms"
        category="No-code SMS campaigns"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Quick SMS", path: "/products/quick-sms" },
        ]}
      />      <SiteHeader />
      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="Quick SMS"
          title="Send compliant SMS campaigns in minutes — no developers required."
          description="Upload a list, pick a DLT-registered template, preview the message, and send. Quick SMS is built for ops, marketing, and support teams who need to move fast without waiting on an engineering sprint."
          primaryCta={{ label: "Start sending free", href: "/signup/" }}
          secondaryCta={{ label: "Book a 15-min demo", href: "/company/contact/" }}
          trustItems={[
            "No code required",
            "DLT-compliant templates",
            "CSV import & variables",
            "Delivery reports in real time",
          ]}
          visual={<QuickSmsVisual />}
        />

        <LogosStrip label="Used every day by ops, marketing, and support teams across India" count={7} />

        <Section>
          <SectionHeader
            eyebrow="Why Quick SMS"
            title="The dashboard does the work your developers used to."
            description="Most SMS campaigns do not need an engineer. They need a clean form, a safe template library, and honest delivery reports. Quick SMS is built around that idea — with the same compliance and delivery backbone as the rest of SMSLocal."
          />
          <FeatureGrid
            items={[
              { icon: <MousePointerClick className="h-5 w-5" />, title: "Zero code to send", description: "A clean browser-based composer your non-technical team can learn in ten minutes." },
              { icon: <LayoutTemplate className="h-5 w-5" />, title: "DLT template library", description: "Pick from pre-approved templates, customise variables, and stay inside TRAI DLT rules by default." },
              { icon: <FileSpreadsheet className="h-5 w-5" />, title: "CSV import & variables", description: "Upload your recipient list and merge per-user variables like name, order ID, or link in one step." },
              { icon: <Gauge className="h-5 w-5" />, title: "Live delivery reports", description: "Watch queued, delivered, failed, and pending counts update in real time as your send progresses." },
              { icon: <Clock className="h-5 w-5" />, title: "Scheduled sends", description: "Pick a future date and time, or send immediately. Campaigns run even if your browser is closed." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Compliance on rails", description: "DND filtering, opt-out handling, sender ID validation, and audit trails are applied to every send." },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How it works"
            title="From list to delivery in four clicks."
          />
          <HowItWorks
            steps={[
              { icon: <Upload className="h-5 w-5" />, title: "Upload your list", description: "Drag and drop a CSV, paste numbers, or pick an existing contact segment from your dashboard." },
              { icon: <Pencil className="h-5 w-5" />, title: "Pick a template", description: "Choose a DLT-approved template, fill in variables, and preview exactly what each recipient will see." },
              { icon: <ClipboardList className="h-5 w-5" />, title: "Review and schedule", description: "Confirm the sender ID, recipient count, cost estimate, and send time — immediately or on a schedule." },
              { icon: <Send className="h-5 w-5" />, title: "Send and track", description: "Watch the live delivery report. Download a detailed CSV once the campaign is complete." },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Feature depth"
            title="All the guardrails a compliance team expects, without the friction."
          />
          <div className="grid gap-5 md:grid-cols-3">
            <BulletList
              title="Composing"
              items={[
                "Drag-and-drop CSV upload with live column mapping and validation.",
                "Variable merging with {{name}}, {{order_id}}, {{url}}, and custom keys.",
                "Character counter with SMS part breakdown and Unicode / GSM-7 detection.",
                "Shortlinks with branded domains and per-link click tracking.",
              ]}
            />
            <BulletList
              title="Compliance"
              items={[
                "Automatic DND scrubbing aligned to TRAI rules before the send goes out.",
                "DLT header and template validation with inline error messages.",
                "Built-in opt-out keyword handling and suppression lists.",
                "Complete audit log of who sent what, when, and to whom.",
              ]}
            />
            <BulletList
              title="Reporting"
              items={[
                "Real-time delivery counters — queued, sent, delivered, failed, expired.",
                "Per-number delivery status with operator-level reason codes.",
                "CSV export with recipient, status, timestamp, and retry history.",
                "Campaign-level dashboards filterable by date, sender ID, and template.",
              ]}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="Built for teams"
            title="A composer your whole team can share safely."
          />
          <FeatureGrid
            items={[
              { icon: <Users className="h-5 w-5" />, title: "Roles & permissions", description: "Admin, editor, and viewer roles. Approvers can gate sends above a cost or recipient threshold." },
              { icon: <Sparkles className="h-5 w-5" />, title: "Reusable templates", description: "Save message drafts and variable mappings as reusable templates across the workspace." },
              { icon: <BarChart3 className="h-5 w-5" />, title: "Campaign folders", description: "Organise sends by brand, region, or team and pull aggregated reports per folder." },
              { icon: <Timer className="h-5 w-5" />, title: "Schedule windows", description: "Enforce send windows per business unit so campaigns only go out within allowed hours." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Send approvals", description: "Require a second reviewer for sends that exceed a configured size or cost threshold." },
              { icon: <MessageSquare className="h-5 w-5" />, title: "Two-way inbox (add-on)", description: "Capture replies to two-way numbers in a shared inbox your support team can triage." },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Compared to alternatives"
            title="Why teams pick Quick SMS over spreadsheets and DIY tools."
          />
          <CompareTable
            columns={["SMSLocal Quick SMS", "Generic SMS dashboards", "Spreadsheet + dev team"]}
            rows={[
              { label: "DLT workflow built in", values: ["Yes, inline validation", "Partial, often manual", "Manual, error-prone"] },
              { label: "CSV import with variables", values: ["Drag-and-drop, column mapping", "Varies by vendor", "Manual merges in code"] },
              { label: "Live delivery reports", values: ["Real-time counters + CSV", "Often delayed", "Requires custom tooling"] },
              { label: "Roles, approvals, audit log", values: ["Built in", "Usually upsell", "None"] },
              { label: "Time from signup to first send", values: ["Minutes", "Hours to days", "Days to weeks"] },
              { label: "India-based product support", values: ["Yes, product-trained", "Often offshore", "Your own team"] },
            ]}
          />
        </Section>

        <ProductEditorialBand
          src="/products/quick-sms-editorial.svg"
          alt="Indian operations manager at a bright coworking-space desk, leaning toward a laptop displaying a no-code campaign composer with a CSV preview."
          eyebrow="No code, no wait"
          headline="Upload, compose, schedule — live in the time it takes to make tea."
          caption="Quick SMS is built for the teammate who doesn&apos;t write code but still needs a million messages out by Friday."
        />

        <Section tone="muted">
          <SectionHeader
            eyebrow="Use cases"
            title="What Quick SMS is best at."
          />
          <UseCaseGrid
            items={[
              { icon: <Send className="h-5 w-5" />, title: "Promotional campaigns", description: "Sales, launches, seasonal offers, and re-engagement blasts to segmented contact lists." },
              { icon: <ClipboardList className="h-5 w-5" />, title: "Transactional ops alerts", description: "Order confirmations, delivery updates, payment reminders, and service notifications." },
              { icon: <Users className="h-5 w-5" />, title: "Internal announcements", description: "Staff roster changes, emergency alerts, and training reminders to internal teams." },
              { icon: <MessageSquare className="h-5 w-5" />, title: "Support follow-ups", description: "CSAT surveys, ticket updates, appointment reminders, and post-resolution check-ins." },
            ]}
          />
        </Section>

        <Section>
          <StatsBand
            items={[
              { value: "Minutes", label: "from signup to your first delivered campaign" },
              { value: "One CSV", label: "upload, preview, and send from the same screen" },
              { value: "Sub-1s", label: "typical SMS delivery latency on major Indian carriers" },
              { value: "Per-number", label: "live delivery status, exportable as CSV" },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader eyebrow="FAQs" title="Quick SMS, answered." />
          <Faq
            items={[
              { q: "Do I need a developer to use Quick SMS?", a: "No. Quick SMS is a browser-based dashboard designed for ops, marketing, and support teams. You upload a list, pick a template, preview, and send — no code required." },
              { q: "What do I need before my first send?", a: "A registered DLT header, an approved template, and a CSV list of recipients. Our onboarding team helps with DLT registration on every paid plan." },
              { q: "Can I schedule campaigns for later?", a: "Yes. You can schedule a send for any future date and time, and the campaign will run on our infrastructure even if your browser is closed." },
              { q: "How are failed deliveries handled?", a: "Failed messages are retried automatically per route policy, and the final per-number status is surfaced in the live delivery report and the downloadable CSV." },
              { q: "Can I run two-way conversations from Quick SMS?", a: "Quick SMS is primarily outbound. Two-way SMS inbox is available as an add-on where replies to a two-way-enabled number are routed to a shared inbox." },
              { q: "Is Quick SMS included in every SMSLocal plan?", a: "Yes. Every SMSLocal plan includes the Quick SMS dashboard alongside the API, developer tools, and compliance features. Check the pricing page for included volumes." },
            ]}
          />
        </Section>

        <RelatedContent path="/products/quick-sms" />

        <Section>
          <ProductFinalCta
            title="Send your first campaign today."
            description="Sign up for free, import a list, and send a test campaign in minutes. No credit card required to start."
            primaryCta={{ label: "Start sending free", href: "/signup/" }}
            secondaryCta={{ label: "Talk to our team", href: "/company/contact/" }}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}

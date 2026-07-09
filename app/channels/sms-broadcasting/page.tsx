import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BarChart3,
  Link2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/channels/sms-broadcasting")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function SmsBroadcastVisual() {
  const campaign = {
    name: "Diwali Sale — Delhi NCR",
    sent: "48,210",
    delivered: "47,890",
    clicked: "9,412",
  }

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Campaign card */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-white/60">
            Campaign live
          </span>
        </div>
        <p className="mb-3 text-[13px] font-semibold text-white">{campaign.name}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Sent", value: campaign.sent },
            { label: "Delivered", value: campaign.delivered },
            { label: "Clicked", value: campaign.clicked },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 px-2 py-2 text-center">
              <p className="text-[14px] font-semibold text-white">{s.value}</p>
              <p className="text-[10px] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reply card */}
      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Reply → AI handles it
          </span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-white/85">
          &quot;Is this offer valid at the Koramangala store too?&quot;
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">
          Yes! Valid at every SMSLocal Mart location till Sunday, 9 PM.
        </p>
      </div>

      {/* Compliance badge */}
      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <ShieldCheck className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          STOP and HELP handled automatically — suppression list applied
        </span>
      </div>
    </div>
  )
}

export default function SmsBroadcastingPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal A2P SMS Broadcasting"
        description="Send DLT-compliant bulk SMS campaigns with segmentation, personalization, link tracking, opt-out handling, and delivery receipts — replies answered by agentic AI."
        path="/channels/sms-broadcasting"
        category="A2P SMS Broadcasting"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels/sms-broadcasting" },
          { name: "SMS Broadcasting", path: "/channels/sms-broadcasting" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Channels · SMS Broadcasting"
          title={
            <>
              A2P SMS Broadcasting,
              <br className="hidden sm:block" /> Answered by Agentic AI
            </>
          }
          subtitle="Segment a list, personalize, schedule, and send bulk SMS at scale, then let agentic AI handle every reply."
          primaryCta={{ label: "Start Broadcasting", href: "/company/contact/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          trustBar={[
            { icon: Users,     label: "Bulk SMS at scale" },
            { icon: ShieldCheck, label: "DLT and sender-ID support" },
            { icon: Link2,     label: "STOP and HELP handling" },
            { icon: BarChart3, label: "Delivery receipts and reporting" },
          ]}
          visual={<SmsBroadcastVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            The channel that reaches every phone, now with AI on the replies.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Scale",    label: "Segment or upload a list and send bulk SMS in minutes" },
              { value: "DLT",      label: "Sender-ID and template registration built into the workflow" },
              { value: "Opted-in", label: "STOP and HELP handling with suppression lists, applied by default" },
              { value: "Tracked",  label: "Delivery receipts and per-campaign reporting on every send" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="SMS reaches every phone, but most tools only send"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              SMS still reaches customers nothing else does — no app to install, no internet
              required. But when a broadcast tool only sends and never listens, a reply goes
              nowhere. SMSLocal turns every SMS broadcast into a two-way conversation your agentic
              AI can carry forward.
            </p>
          </div>
        </Section>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What's included"
          title="Everything a real SMS campaign needs"
          subtitle="Not just a blast tool — segmentation, personalization, compliance, and reporting built in from the start."
          items={[
            {
              icon: Users,
              title: "Campaign manager",
              body: "Upload or segment your contact list, schedule sends, and manage throughput so large campaigns go out cleanly without tripping carrier limits.",
            },
            {
              icon: Link2,
              title: "Personalization and tracking",
              body: "Merge fields drop in each recipient's name or order detail automatically, with link shortening and click tracking on every campaign.",
            },
            {
              icon: ShieldCheck,
              title: "Compliance built in",
              body: "STOP and HELP opt-out handling and suppression lists are applied by default, so every campaign stays compliant without extra setup.",
            },
            {
              icon: BarChart3,
              title: "Delivery insight",
              body: "Delivery receipts and per-campaign reporting show exactly what landed, what bounced, and what got a reply — no guessing after the send.",
            },
          ]}
        />

        {/* ── WHERE SMS MEETS AGENTIC AI ────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Where SMS meets agentic AI"
              title="A reply becomes a conversation, not a dead end"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              When a customer replies to a broadcast, it opens a two-way conversation in the
              shared inbox, where agentic AI answers automatically and your team steps in only
              when needed. One platform runs the campaign and everything that happens after it.
            </p>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One platform for the send and the conversation that follows
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              SMS broadcasting shares the platform with WhatsApp, RCS, voice, and your AI agent,
              so a single customer record ties every channel together — a campaign reply and a
              support call are never two disconnected tickets in two different tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/channels/whatsapp-broadcasting/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                WhatsApp Broadcasting
              </Link>
              <Link
                href="/channels/rcs-broadcasting/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                RCS Broadcasting
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Do you support DLT registration?",
              a: "Yes — sender-ID and template registration are part of the campaign workflow, guided in the platform so your messages stay compliant with Indian regulations.",
            },
            {
              q: "Can AI answer replies to a broadcast?",
              a: "Yes, automatically. A reply lands in the shared inbox where the agentic AI answers from your knowledge base and hands off to a human when the conversation needs one.",
            },
            {
              q: "Are opt-outs handled for me?",
              a: "Yes. STOP and HELP handling and suppression lists are applied by default across every campaign, with no extra setup required.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/channels/whatsapp-broadcasting/", label: "WhatsApp Broadcasting — campaigns at scale" },
                { href: "/channels/rcs-broadcasting/",       label: "RCS Broadcasting — rich cards with SMS fallback" },
                { href: "/numbers/did/",                     label: "DID and virtual numbers, managed in-platform" },
                { href: "/compare/",                         label: "Compare SMSLocal with alternatives" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Broadcast SMS and let AI handle the replies."
          subtitle="Segment your list, personalize the send, and let agentic AI carry every reply into a real conversation."
          primaryCta={{ label: "Start Broadcasting", href: "/company/contact/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

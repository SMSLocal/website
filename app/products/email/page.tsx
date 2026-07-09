import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  ArrowLeftRight,
  AtSign,
  CalendarClock,
  Check,
  CheckCheck,
  ChevronDown,
  Filter,
  Fingerprint,
  Globe,
  History,
  Inbox,
  KeyRound,
  Mail,
  MailCheck,
  MapPin,
  MessageSquare,
  Minus,
  Paperclip,
  PenLine,
  Phone,
  ScrollText,
  ShieldCheck,
  Signature,
  Smartphone,
  Sparkles,
  Tag,
  UserCheck,
  UserRound,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  Faq,
  HowItWorks,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { EmailInboxVisual } from "@/components/product/email-inbox-visual"
import { CollabLaptopVisual } from "@/components/product/collab-laptop-visual"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/email")

// ─── Shared inbox feature cards ──────────────────────────────────────────────
const SHARED_FEATURES = [
  { icon: Inbox, title: "Shared inbox", body: "One support@ address every agent works from — no forwarding, no password sharing." },
  { icon: UserCheck, title: "Assign conversations", body: "Give every email a clear owner so nothing sits in limbo or gets answered twice." },
  { icon: MessageSquare, title: "Internal notes", body: "Discuss a reply privately on the thread. Customers only ever see the final answer." },
  { icon: AtSign, title: "@Mentions", body: "Loop in a teammate mid-thread without forwarding or copy-pasting context." },
  { icon: Signature, title: "Email signatures", body: "Per-agent and per-inbox signatures applied automatically to every reply." },
  { icon: Paperclip, title: "Attachments", body: "Send and receive files inline — invoices, screenshots, shipping labels and more." },
  { icon: History, title: "Customer history", body: "Every past conversation surfaces beside the thread the moment you open it." },
  { icon: CheckCheck, title: "Conversation status", body: "Open, snoozed, or closed — the whole team sees the real state at a glance." },
]

const SECURITY = [
  { icon: ShieldCheck, label: "AES-256 encryption", note: "At rest and in transit" },
  { icon: KeyRound, label: "Multi-factor auth", note: "MFA on every login" },
  { icon: Globe, label: "GDPR compliant", note: "Data-subject tooling built in" },
  { icon: Globe, label: "CCPA compliant", note: "Consumer privacy rights honored" },
  { icon: Users, label: "Role-based access", note: "RBAC down to the inbox" },
  { icon: ScrollText, label: "Audit logs", note: "Every action, timestamped" },
]

// ─── Plan-inclusion matrix ("On every plan") ─────────────────────────────────
type PlanCell = "yes" | "partial" | "no" | string
const PLAN_TIERS = ["Free", "Starter+", "Growth+"]
const PLAN_ROWS: { feature: string; cells: [PlanCell, PlanCell, PlanCell] }[] = [
  { feature: "Shared email inboxes", cells: ["1", "5", "Unlimited"] },
  { feature: "Assignments & private notes", cells: ["yes", "yes", "yes"] },
  { feature: "@mentions & collision detection", cells: ["yes", "yes", "yes"] },
  { feature: "Per-agent email signatures", cells: ["yes", "yes", "yes"] },
  { feature: "Customer 360 context", cells: ["partial", "yes", "yes"] },
  { feature: "SLA targets & priority routing", cells: ["no", "yes", "yes"] },
  { feature: "WhatsApp, SMS & voice in the same inbox", cells: ["no", "partial", "yes"] },
  { feature: "Audit logs & role-based access", cells: ["no", "no", "yes"] },
]

export default function EmailInboxPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Email Inbox — Shared Team Inbox for Support"
        description="A collaborative shared email inbox that turns support@ into a team workspace — assign conversations, add private notes, automate routing, and give agents full customer context. A modern alternative to Gmail, Outlook, Front, and Help Scout."
        path="/products/email"
        category="Shared email inbox and customer support software"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Email Inbox", path: "/products/email" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        {/* 1 ─ Hero */}
        <ProductHero
          compact
          eyebrow="Shared inbox · email on Free"
          title={
            <>
              Team email that doesn&apos;t feel
              <br />
              like a shared mailbox.
            </>
          }
          subtitle="A shared inbox with assignments, internal notes, and automation — the collaboration teams move to Front and Help Scout for, without the per-seat price tag."
          primaryCta={{ label: "Start Free", href: "/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact" }}
          trustBar={[
            { icon: Inbox, label: "Email on Free" },
            { icon: UserCheck, label: "Assignments + notes" },
            { icon: Workflow, label: "Automation rules" },
            { icon: Signature, label: "Email signatures" },
          ]}
          visual={<EmailInboxVisual />}
          compact
        />


        {/* 1 ─ How it works */}
        <Section className="border-t border-border">
          <SectionLabel index={1} label="The flow" />
          <div className="mx-auto max-w-3xl text-center duration-700 animate-in fade-in slide-in-from-bottom-3">
            <h2 className="text-balance font-sans text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.9rem]">
              From your support to a real workflow in minutes.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] font-medium leading-relaxed text-muted-foreground sm:text-[17px]">
              Connect the email you already use — no migration, no new address for customers to learn.
            </p>
          </div>
          <div className="mt-14">
          <HowItWorks
            steps={[
              {
                title: "Forward your support@ address",
                body: "Point your existing Gmail or Outlook support@ to SMSLocal instead of scattered agent inboxes. Customers keep emailing the same address.",
              },
              {
                title: "Assign to a teammate",
                body: "Anyone can pick up, assign, or hand off a conversation — so every email has one clear owner and nothing gets answered twice.",
              },
              {
                title: "Add private notes",
                body: "Discuss a reply internally with notes and @mentions on the thread. The conversation stays internal — the customer only sees the final answer.",
              },
              {
                title: "Automate the boring stuff",
                body: "Auto-tag, auto-route, and auto-close conversations based on rules, so your team spends its time on the emails that actually matter.",
              },
            ]}
          />
          </div>
        </Section>

        {/* 5 ─ On every plan (tier inclusion matrix) */}
        <Section className="border-t border-border">
          <SectionLabel index={2} label="On every plan" />
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-sans text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-primary sm:text-4xl lg:text-[2.7rem]">
              What&apos;s in the box.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-[16px] font-medium leading-relaxed text-muted-foreground sm:text-[17px]">
              Free gives you the basics — a real shared inbox, assignments, and notes. Starter and above unlock automation, SLAs, multi-channel, and custom templates.
            </p>
          </div>
          <PlanInclusionTable />
          <p className="mt-5 text-center text-[12.5px] text-muted-foreground">
            Tier inclusions reflect current plan packaging and may change.{" "}
            <Link href="/pricing" className="font-semibold text-primary hover:underline">
              See full pricing →
            </Link>
          </p>
        </Section>


        {/* 3 ─ Shared inbox & collaboration (merged) */}
        <Section className="border-t border-border">
          <SectionLabel index={3} label="Shared inbox" />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <CollabLaptopVisual />
            <div>
              <h2 className="text-balance font-sans text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl">
                One shared inbox your whole team works from.
              </h2>
              <p className="mt-5 max-w-xl text-pretty font-sans text-[16px] font-medium leading-relaxed text-muted-foreground sm:text-[17px]">
                Everyone works the same support@ address together — assigning, mentioning, and resolving in one place, with full customer context and a trail behind every decision.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: <UserCheck className="h-5 w-5" />, title: "Assign", description: "One click gives a thread a clear owner — no more orphaned emails." },
                  { icon: <ArrowLeftRight className="h-5 w-5" />, title: "Reassign", description: "Hand off with full context attached; nothing gets re-explained." },
                  { icon: <AtSign className="h-5 w-5" />, title: "Mention teammates", description: "Pull in an expert mid-thread without leaving the inbox." },
                  { icon: <MessageSquare className="h-5 w-5" />, title: "Private notes", description: "Discuss internally on the thread — invisible to the customer." },
                  { icon: <History className="h-5 w-5" />, title: "Track activity", description: "A timestamped trail of every reply, note, and assignment." },
                  { icon: <Zap className="h-5 w-5" />, title: "Manage priorities", description: "Flag urgent threads so they jump to the front of the queue." },
                ].map((it) => (
                  <div
                    key={it.title}
                    className="group rounded-2xl border border-white/55 bg-white/55 p-4 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/75 hover:shadow-md"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      {it.icon}
                    </span>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-foreground">{it.title}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{it.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 4 ─ Testimonials */}
        <Section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Teams that switched, stayed.
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Honest quotes from teams who made the switch to SMSLocal.
            </p>
          </div>
          <EmailTestimonials />
        </Section>


        {/* 6 ─ FAQ */}
        <Section className="border-t border-border">
          <SectionLabel index={5} label="Common questions" />
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-sans text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl">
              Common questions, straight answers.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-border border-y border-border">
            {[
              { q: "Can I send emails from my own domain?", a: "Yes. Connect your existing support@ address and replies go out from your own domain — customers keep emailing the same place, and every message lands in your shared SMSLocal inbox. No new address to announce, no migration." },
              { q: "How many email inboxes can I have?", a: "The Free plan includes 1 shared email inbox. Starter and above unlock unlimited inboxes, so you can run separate addresses for support, billing, and sales from the same workspace." },
              { q: "Can multiple agents use the same inbox?", a: "That's the whole point. Your team replies from one shared address with collision detection, assignments, and private notes — so no two agents answer the same email." },
              { q: "Does it work with Gmail and Outlook?", a: "Yes. Gmail (Google Workspace), Outlook / Microsoft 365, Zoho, Fastmail, and any standard IMAP/SMTP provider connect in a few clicks." },
              { q: "What about HTML formatting and attachments?", a: "Full rich-text and HTML formatting is supported, along with inline images and attachments — send and receive invoices, screenshots, and shipping labels right on the thread." },
            ].map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-semibold tracking-tight text-foreground">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-5 pr-8 text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <RelatedContent path="/products/email" />

        {/* Final CTA */}
        <ProductFinalCta
          title="Free, no credit card."
          subtitle="Try shared email free — one email inbox on Free, unlimited inboxes from Starter, with assignments, private notes, and automation rules built in."
          primaryCta={{ label: "Start Free", href: "/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

/* ---------- Section label (eyebrow) ---------- */
function SectionLabel({ label, dark = false }: { index?: number; label: string; dark?: boolean }) {
  return (
    <div className="mb-8 flex items-center justify-center">
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
          dark ? "text-white/55" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  )
}

/* ---------- Plan inclusion table ("On every plan") ---------- */
function PlanInclusionTable() {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-background shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[14px] [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border">
          <thead>
            <tr className="bg-muted">
              <th className="px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-foreground/75">
                What&apos;s included
              </th>
              {PLAN_TIERS.map((tier, i) => (
                <th
                  key={tier}
                  className={`px-3 py-1.5 text-center text-[11.5px] font-bold uppercase tracking-[0.12em] ${
                    i === 0 ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  <span className="inline-flex flex-col items-center gap-1">
                    {tier}
                    {i === 0 ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-primary">
                        FREE FOREVER
                      </span>
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLAN_ROWS.map((row, ri) => (
              <tr
                key={row.feature}
                className={ri % 2 ? "bg-muted/40" : "bg-background"}
              >
                <td className="px-3 py-1.5 text-[13px] font-semibold text-foreground">{row.feature}</td>
                {row.cells.map((cell, ci) => (
                  <td key={ci} className={`px-3 py-1.5 text-center ${ci === 0 ? "bg-primary/[0.07]" : ""}`}>
                    <PlanMark value={cell} emphasize={ci === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PlanMark({ value, emphasize }: { value: PlanCell; emphasize: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${
          emphasize ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )
  }
  if (value === "no") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    )
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11.5px] font-semibold text-amber-600 dark:text-amber-400">
        <Minus className="h-3 w-3" />
        Basic
      </span>
    )
  }
  return (
    <span
      className={`text-[13px] font-semibold ${emphasize ? "text-primary" : "text-foreground"}`}
    >
      {value}
    </span>
  )
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    quote: "Moving support@ into one shared SMSLocal inbox ended the double replies overnight. Every email has a clear owner now, and the private notes keep the back-and-forth off the customer thread.",
    name: "Neha Joshi",
    role: "Customer Success Lead · Niyo, Mumbai",
    initials: "NJ",
    color: "#10b981",
  },
  {
    quote: "Email, WhatsApp, and SMS in the same inbox — with the same assignments and notes — replaced three separate tools for us. One thread, full context, every time.",
    name: "Vikram Mehta",
    role: "VP Support · fintech SaaS, Mumbai",
    initials: "VM",
    color: "#0ea5e9",
  },
  {
    quote: "We set up the shared inbox, connected our support@ address, and had the team assigning threads the same day. The automation rules saved us hours in the first week alone.",
    name: "Rahul Nair",
    role: "Founder · LogiTrack, Bengaluru",
    initials: "RN",
    color: "#8b5cf6",
  },
]

function EmailTestimonials() {
  return (
    <div className="relative mt-12 overflow-hidden">
      <style>{`
        @keyframes email-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .email-marquee-track {
          animation: email-marquee 30s linear infinite;
        }
        .email-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .email-marquee-track { animation: none; } }
      `}</style>
      <div className="email-marquee-track flex w-max gap-5">
        {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div
            key={i}
            className="w-[300px] shrink-0 flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:w-[340px]"
          >
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden className="mb-4 text-primary opacity-50">
              <path
                d="M0 20V12.727C0 5.697 4.121 1.394 12.364 0l1.09 2.182C9.758 3.03 7.758 5.03 7.273 8.182H12V20H0ZM16 20V12.727C16 5.697 20.121 1.394 28.364 0l1.09 2.182c-3.696.848-5.696 2.848-6.181 6H28V20H16Z"
                fill="currentColor"
              />
            </svg>
            <p className="flex-1 text-[14px] leading-relaxed text-foreground/85">{t.quote}</p>
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                style={{ background: t.color }}
              >
                {t.initials}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[11.5px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

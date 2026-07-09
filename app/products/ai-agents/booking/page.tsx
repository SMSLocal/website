import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  CalendarClock,
  Clock,
  RefreshCw,
  UserCheck,
  Zap,
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

export const metadata: Metadata = getPageMetadata("/products/ai-agents/booking")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function BookingAgentVisual() {
  const convo = [
    { from: "user", text: "Hi, I'd like to book a consultation for next week" },
    { from: "agent", text: "Sure! I have slots available on Monday and Wednesday. Which works for you?" },
    { from: "user", text: "Wednesday at 11am please" },
    { from: "agent", text: "✅ Confirmed! Wednesday at 11:00 AM. You'll get a reminder the day before." },
  ]

  const reminders = [
    { time: "24h before", label: "Reminder sent via WhatsApp" },
    { time: "1h before",  label: "Final nudge via SMS" },
  ]

  return (
    <div className="flex h-full min-h-[340px] flex-col gap-4 lg:pl-4">
      {/* Chat card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
            Live Booking
          </span>
        </div>
        <div className="space-y-2">
          {convo.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
              <span
                className={`max-w-[88%] rounded-xl px-3 py-2 text-[12px] leading-snug ${
                  m.from === "user"
                    ? "bg-white/10 text-white/80"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder strip */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Auto reminders
        </p>
        <div className="space-y-1.5">
          {reminders.map((r) => (
            <div key={r.time} className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-[12px] text-white/75">
                <span className="font-semibold text-white">{r.time}</span> — {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation badge */}
      <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5">
        <CalendarCheck className="h-4 w-4 shrink-0 text-green-400" />
        <span className="text-[12.5px] font-medium text-green-300">
          Booked, confirmed, and reminded — zero phone calls
        </span>
      </div>
    </div>
  )
}

export default function BookingAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal AI Booking Agent"
        description="An agentic AI booking agent that schedules appointments and reservations inside the chat, checks availability, confirms, and sends reminders automatically."
        path="/products/ai-agents/booking"
        category="AI Booking Agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Booking", path: "/products/ai-agents/booking" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="AI Agents · Booking"
          title={
            <>
              An Agentic AI Booking Agent
              <br className="hidden sm:block" /> That Fills Your Calendar
            </>
          }
          subtitle="Schedule appointments and reservations inside the chat, check availability, confirm, and send reminders, all automatically."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
          trustBar={[
            { icon: CalendarCheck, label: "Books inside the conversation" },
            { icon: Zap,           label: "Real-time availability checks" },
            { icon: Bell,          label: "Automatic reminders" },
            { icon: RefreshCw,     label: "Reschedules without a human" },
          ]}
          visual={<BookingAgentVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Built for travel, hospitality, healthcare, and services teams.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "In-chat", label: "Books appointments inside the conversation, no redirects or forms" },
              { value: "Live",    label: "Checks real-time availability against your calendar or booking system" },
              { value: "Auto",   label: "Sends reminders over SMS, WhatsApp, or email to cut no-shows" },
              { value: "0",      label: "Staff hours spent on rescheduling — the agent handles changes itself" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Every booking that needs a phone call is a booking you might lose"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Every booking that needs a phone call or a back-and-forth email is a booking you might
              lose. An agentic AI booking agent captures the request the moment a customer is ready,
              confirms on the spot, and reduces no-shows with timely reminders. If your calendar
              isn&apos;t open 24/7, someone else&apos;s is.
            </p>
          </div>
        </Section>

        {/* ── WHAT IT DOES ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What it does"
          title="From first message to confirmed slot, inside the chat"
          subtitle="It doesn't just collect a request — it books, confirms, reminds, and reschedules on its own."
          items={[
            {
              icon: CalendarCheck,
              title: "Books in the chat",
              body: "Schedules appointments, reservations, and demos in the same conversation — no redirect to a form, no separate booking link to hunt for.",
            },
            {
              icon: Zap,
              title: "Checks availability",
              body: "Confirms open slots in real time against your calendar or booking system so customers always see accurate availability and never double-book.",
            },
            {
              icon: Bell,
              title: "Sends reminders",
              body: "Follows up over SMS, WhatsApp, or email before the appointment to cut no-shows — automatically, with the timing and channel you configure.",
            },
            {
              icon: RefreshCw,
              title: "Reschedules and cancels",
              body: "Handles changes automatically and frees the new slot instantly. Anything too complex gets routed to your team with full conversation context attached.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Book when the customer is ready, not when your office is open"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Customers book when they are ready, not when your office is open. You fill more
                slots, reduce no-shows, and free staff from manual scheduling — so they can focus on
                delivering the service, not managing the calendar.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <CalendarClock className="h-5 w-5" />, label: "24/7 booking",    desc: "Captures appointments at any hour, even when your team is offline" },
                { icon: <Zap className="h-5 w-5" />,           label: "Instant confirm", desc: "Customers get a confirmation the moment they pick a slot" },
                { icon: <Bell className="h-5 w-5" />,          label: "Fewer no-shows",  desc: "Automated reminders reduce missed appointments significantly" },
                { icon: <UserCheck className="h-5 w-5" />,     label: "Staff freed up",  desc: "Your team focuses on service delivery, not scheduling admin" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One customer record from first message to follow-up
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              The booking agent runs on the same platform as your support and sales agents, so
              reminders, confirmations, and follow-ups all flow from one customer record. No
              disconnected scheduling tool, no separate inbox — everything your team needs lives
              in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agents"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                See all AI agents
              </Link>
              <Link
                href="/solutions/healthcare"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Healthcare solutions
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Does it connect to my calendar?",
              a: "Yes. It connects through integrations and the open API — Google Calendar, Calendly, custom booking systems, and more. The agent always checks live availability before confirming a slot.",
            },
            {
              q: "Can it send reminders?",
              a: "Yes, over SMS, WhatsApp, or email. You set the timing — 24 hours before, 1 hour before, or both — and the agent sends them automatically without anyone on your team doing anything.",
            },
            {
              q: "What about complex or unusual requests?",
              a: "The agent handles standard bookings, reschedules, and cancellations on its own. Anything it can't resolve — a special request, a dispute, or an edge case — gets routed to your team with the full conversation history attached.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents", label: "All AI agent use cases" },
                { href: "/products/ai-agentic", label: "How agentic AI works" },
                { href: "/solutions/healthcare", label: "Healthcare solutions" },
                { href: "/compare",             label: "Compare SMSLocal with alternatives" },
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
          title="Fill your calendar without the phone tag."
          subtitle="Connect your calendar, set your availability, and let the agent handle bookings, reminders, and reschedules — automatically."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
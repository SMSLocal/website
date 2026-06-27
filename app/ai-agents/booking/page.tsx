import type { Metadata } from "next"
import { CalendarCheck, CalendarClock, Clock, RefreshCw } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { AgentLanding, type AgentLandingData } from "@/components/product/agent-landing"
import { BookingVisual } from "@/components/product/agent-visuals"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = buildMetadata({
  titleAbsolute: "Agentic AI Booking Agent for Appointments and Reservations | SMSLocal",
  description:
    "Schedule appointments and reservations inside the chat with an agentic AI booking agent that checks availability, confirms, and sends reminders.",
  path: "/ai-agents/booking",
  keywords: [
    "AI booking agent",
    "AI appointment scheduling",
    "WhatsApp booking bot",
    "automated reservations",
    "no-show reminders",
  ],
})

const DATA: AgentLandingData = {
  eyebrow: "AI Agents · Booking",
  title: (
    <>
      An agentic AI booking agent that{" "}
      <span className="text-primary">fills your calendar</span>
    </>
  ),
  subtitle:
    "Schedule appointments and reservations inside the chat — check availability, confirm on the spot, and send reminders that cut no-shows, all automatically.",
  trustLine: "Built for travel, hospitality, healthcare, and services teams.",
  visual: <BookingVisual />,
  primaryCta: { label: "Start Free — ₹60 Credit", href: "/signup" },
  secondaryCta: { label: "Get a demo", href: "/company/contact" },
  results: [
    "Books inside the conversation",
    "Real-time availability checks",
    "Automatic reminders",
    "Reschedules without a human",
  ],
  problem: {
    title: "Every phone-tag booking is a booking you might lose",
    body: "Every appointment that needs a phone call or a back-and-forth email is one you might lose to a faster option. An agentic AI booking agent captures the request the moment a customer is ready, checks real availability, confirms on the spot, and reduces no-shows with timely reminders — so you fill more slots without manual scheduling.",
  },
  doesTitle: "Capture, confirm, remind — without the phone tag",
  features: [
    {
      icon: CalendarCheck,
      title: "Books in the chat",
      body: "Schedules appointments, reservations, and demos in the same conversation the customer started — no forms, no callbacks, no waiting for office hours.",
    },
    {
      icon: CalendarClock,
      title: "Checks availability",
      body: "Confirms open slots in real time against your calendar or booking system, so customers only ever see times you can actually honour.",
    },
    {
      icon: Clock,
      title: "Sends reminders",
      body: "Follows up over SMS, WhatsApp, or email ahead of the appointment to cut no-shows and keep your calendar full.",
    },
    {
      icon: RefreshCw,
      title: "Reschedules and cancels",
      body: "Handles changes automatically inside the chat, and routes the genuinely complex cases to your team with full context.",
    },
  ],
  whyItWorks: {
    title: "Customers book when they're ready — not when you're open",
    points: [
      { label: "Book at intent", body: "Customers schedule the moment they're ready, not when your office happens to be open." },
      { label: "Fewer no-shows", body: "Automatic, timely reminders keep your calendar full and customers on time." },
      { label: "Less busywork", body: "Staff are freed from manual scheduling and endless phone tag entirely." },
    ],
  },
  compare: {
    title: "Captain AI vs a booking link vs phone & email",
    subtitle:
      "A static booking link can't answer questions; phone and email lose the customer to back-and-forth. An agentic agent books in the conversation.",
    columns: ["Captain AI", "Booking link", "Phone & email"],
    rows: [
      { feature: "Books inside the chat conversation", cells: ["yes", "no", "no"] },
      { feature: "Real-time availability check", cells: ["yes", "partial", "yes"] },
      { feature: "Automatic reminders (SMS / WhatsApp / email)", cells: ["yes", "partial", "partial"] },
      { feature: "Reschedule and cancel automatically", cells: ["yes", "partial", "no"] },
      { feature: "Answers questions before booking", cells: ["yes", "no", "yes"] },
      { feature: "Works 24/7 when your office is closed", cells: ["yes", "yes", "no"] },
      { feature: "Routes complex cases with full context", cells: ["yes", "no", "partial"] },
    ],
    footnote: "'Booking link' = a self-serve scheduling page; 'phone & email' = manual booking by staff.",
  },
  whyUs: {
    title: "Reminders, confirmations and follow-ups from one record",
    body: "The booking agent runs on the same platform as your support and sales agents, so reminders, confirmations, and follow-ups all flow from one customer record. It connects to your calendar and systems through integrations and an open API — and reaches customers on the channel they already use.",
  },
  faq: [
    { q: "Does it connect to my calendar?", a: "Yes, through integrations and the open API, so it checks and books against real availability in your calendar or booking system." },
    { q: "Can it send reminders?", a: "Yes, over SMS, WhatsApp, or email — timed to cut no-shows and keep your calendar full." },
    { q: "What about complex requests?", a: "It handles standard reschedules and cancellations automatically, and routes anything it can't handle to your team with full context." },
    { q: "Which businesses is it for?", a: "Travel, hospitality, healthcare, salons, clinics, and any services team that books appointments or reservations." },
  ],
  finalCta: {
    title: "Fill your calendar without the phone tag.",
    subtitle:
      "Let an agentic AI booking agent capture, confirm, and remind — inside the conversation, 24/7. Start free with ₹60 credit.",
  },
  related: [
    { label: "Explore Captain AI", href: "/products/ai-agents" },
    { label: "How agentic AI works", href: "/products/ai-agentic" },
    { label: "Restaurant & hospitality solutions", href: "/solutions/restaurant" },
    { label: "Compare platforms", href: "/compare" },
  ],
}

export default function BookingAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Agentic AI Booking Agent"
        description="An agentic AI booking agent that schedules appointments and reservations inside the chat, checks availability, confirms, and sends reminders to cut no-shows."
        path="/ai-agents/booking"
        category="AI booking agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Booking", path: "/ai-agents/booking" },
        ]}
      />
      <AgentLanding data={DATA} />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  CalendarCheck,
  ChevronDown,
  ChefHat,
  CheckCheck,
  Clock,
  CreditCard,
  Globe,
  KeyRound,
  Layers,
  MapPin,
  MessageSquare,
  PhoneCall,
  PhoneMissed,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  ThumbsUp,
  Truck,
  Users,
  UtensilsCrossed,
  Gift,
  Megaphone,
  Plug,
  Quote,
  RotateCcw,
  TrendingUp,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  Faq,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { RestaurantHeroVisual } from "@/components/solution/restaurant-hero-visual"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/solutions/restaurant")

const PAIN_POINTS = [
  { icon: PhoneMissed, t: "Missed reservation calls during the rush" },
  { icon: Clock, t: "Slow replies to guest messages" },
  { icon: Star, t: "Happy diners who never leave a review" },
  { icon: Truck, t: "Order updates sent by hand, one at a time" },
  { icon: Layers, t: "Reservations, orders, and reviews in five tools" },
  { icon: Store, t: "No single view across multiple locations" },
]

const INTEGRATIONS = [
  { name: "Toast", icon: UtensilsCrossed, tint: "text-orange-500 bg-orange-500/10", blurb: "POS orders & menus" },
  { name: "Square", icon: CreditCard, tint: "text-slate-500 bg-slate-500/10", blurb: "Payments & order data" },
  { name: "Resy", icon: CalendarCheck, tint: "text-rose-500 bg-rose-500/10", blurb: "Reservation sync" },
  { name: "Zapier", icon: Zap, tint: "text-amber-500 bg-amber-500/10", blurb: "Connect 6,000+ apps" },
  { name: "Google Reviews", icon: Star, tint: "text-yellow-500 bg-yellow-500/10", blurb: "Review collection" },
  { name: "WhatsApp", icon: MessageSquare, tint: "text-emerald-500 bg-emerald-500/10", blurb: "Guest messaging" },
]

const AI_CAPS = [
  "Answer menu questions",
  "Share opening hours",
  "Handle reservations",
  "Track orders",
  "Handle FAQs",
  "Route complaints to a manager",
  "Summarize conversations",
]

const SECURITY = [
  { icon: ShieldCheck, label: "AES-256 encryption", note: "At rest and in transit" },
  { icon: Globe, label: "GDPR compliant", note: "Data-subject tooling built in" },
  { icon: Globe, label: "CCPA compliant", note: "Consumer privacy honored" },
  { icon: KeyRound, label: "Multi-factor auth", note: "MFA on every login" },
  { icon: ShieldCheck, label: "Secure cloud infrastructure", note: "Redundant, monitored, backed up" },
]

const LOCATIONS = [
  { city: "Brooklyn", covers: 142, rating: "4.8", reply: "1m 12s", up: true },
  { city: "Manhattan", covers: 218, rating: "4.7", reply: "2m 03s", up: true },
  { city: "Queens", covers: 96, rating: "4.6", reply: "3m 40s", up: false },
  { city: "Hoboken", covers: 74, rating: "4.9", reply: "0m 54s", up: true },
]

const TESTIMONIALS = [
  {
    quote: "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.",
    name: "Vikram Mehta",
    role: "VP Support · fintech SaaS, Mumbai",
    initials: "VM",
    tint: "bg-teal-500 text-white",
  },
  {
    quote: "We connected Zapier, HubSpot, and WhatsApp in one afternoon. The REST API is clean and the docs are actually good.",
    name: "Rahul Nair",
    role: "Founder · LogiTrack, Bengaluru",
    initials: "RN",
    tint: "bg-violet-500 text-white",
  },
  {
    quote: "The Linear integration converts a chat into a tracked issue in one click. No copy-paste, no lost context — massive time saver.",
    name: "Neha Joshi",
    role: "Engineering Lead · Razorpay, Mumbai",
    initials: "NJ",
    tint: "bg-rose-500 text-white",
  },
]

const FAQS = [
  { q: "Can SMSLocal manage restaurant reservations?", a: "Yes. Take reservations over SMS and WhatsApp, send automatic confirmations and reminders, and let guests confirm with a single reply — which cuts no-shows significantly." },
  { q: "Does it support WhatsApp orders?", a: "Yes. Guests can message your WhatsApp number to ask questions, place or track orders, and get automatic status updates from received to delivered." },
  { q: "Can I manage multiple locations?", a: "Yes. On Pro, the HQ dashboard rolls up covers, ratings, reply times, and team activity across every location, while each venue keeps its own inbox." },
  { q: "Can customers leave reviews automatically?", a: "Yes. After a visit, SMSLocal texts guests for feedback — happy diners are routed to a Google review, unhappy ones to a manager before it ever goes public." },
  { q: "Does it integrate with restaurant tools?", a: "Yes. Connect Toast, Square, Resy, Google Reviews, WhatsApp, and 6,000+ apps via Zapier so reservations, orders, and reviews flow into one inbox." },
]

export default function RestaurantSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Restaurant", path: "/solutions/restaurant" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* 1 ─ Hero */}
        <ProductHero
          eyebrow="Restaurants & Food Service"
          title={
            <>
              Reservations, orders, and reviews — <span className="text-primary">all in one inbox</span>.
            </>
          }
          subtitle="Manage guest conversations, automate reservations, send order updates, collect reviews, and keep every customer interaction organized from one platform."
          primaryCta={{ label: "Start Free", href: "/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact" }}
          trustBar={[
            { icon: CalendarCheck, label: "SMS reservations" },
            { icon: Truck, label: "WhatsApp order updates" },
            { icon: Star, label: "Review automation" },
          ]}
          visual={<RestaurantHeroVisual />}
          compact
        />

        {/* How it works */}
        <Section className="bg-gradient-to-b from-[oklch(0.99_0.006_175)] via-[oklch(0.965_0.024_175)] to-[oklch(0.99_0.006_175)]">
          <SectionHeader
            center
            eyebrow="How it works"
            title="Live on your tables in minutes."
            subtitle="No new number for guests, no rip-and-replace. Connect what you already run on the floor and let the automations do the rest."
          />
          <div className="mx-auto mt-12 max-w-[80rem]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/45 p-5 shadow-[0_24px_70px_-28px_rgba(16,80,50,0.32)] backdrop-blur-2xl sm:p-8 lg:p-10">
              <span aria-hidden className="pointer-events-none absolute -left-20 -top-16 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
              <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-16 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
                {[
                  { n: "01", icon: Plug, t: "Connect your number & POS", b: "Bring your existing number and link Toast, Square, Resy, Google, and WhatsApp in a few clicks." },
                  { n: "02", icon: Zap, t: "Automate reservations, orders & reviews", b: "Confirmations, reminders, order updates, and post-visit review requests all fire on their own." },
                  { n: "03", icon: TrendingUp, t: "Watch covers and ratings climb", b: "Fewer no-shows, faster replies, and more 5-star reviews — tracked across every location." },
                ].map((s) => {
                  const Icon = s.icon
                  return (
                    <div
                      key={s.n}
                      className="group rounded-2xl border border-white/55 bg-white/55 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/75 hover:shadow-md"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight text-foreground">{s.t}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{s.b}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Section>

        {/* 3 ─ Feature blocks */}
        <Section>
          <SectionHeader
            center
            eyebrow="Guest experience"
            title="Handle every guest interaction in one place."
            subtitle="From the first reservation text to the post-meal review — automated where it should be, human where it matters."
          />

          <FeatureSplit
            eyebrow="Reservation automation"
            title="Fill more tables with automated reservations."
            body="Confirm bookings the moment they come in, then send a reminder before the visit so guests show up — and you reduce no-shows without lifting a finger."
            visual={<ReservationMock />}
          />
          <FeatureSplit
            reverse
            eyebrow="Order & delivery updates"
            title="Keep customers updated automatically."
            body="Every order moves from received to delivered with a text at each step. When a guest asks “where's my order?”, AI answers instantly with the live status."
            visual={<OrderTrackingMock />}
          />
          <FeatureSplit
            eyebrow="Review collection"
            title="Turn happy guests into reviews."
            body="A friendly text after the meal routes happy diners straight to a Google review — and quietly sends unhappy feedback to a manager before it lands in public."
            visual={<ReviewMock />}
          />
          <FeatureSplit
            reverse
            eyebrow="Voice inbox"
            title="Never lose another customer call."
            body="Missed a call during the dinner rush? It becomes a conversation with transcribed notes, your manager gets pinged, and a callback is scheduled — no catering lead left behind."
            visual={<VoiceInboxMock />}
          />
        </Section>

        {/* Outcomes / results */}
        <Section tone="muted">
          <SectionHeader
            center
            eyebrow="Outcomes"
            title="What restaurants see after switching."
            subtitle="Automation handles the repetitive work, so your team spends the rush on guests — not on their phones."
          />
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-[oklch(0.14_0.02_230)] p-8 text-white shadow-2xl sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)" }}
            />
            <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { v: "−38%", l: "no-shows with auto-reminders" },
                { v: "<2 min", l: "avg reply across SMS & WhatsApp" },
                { v: "3×", l: "more reviews from the post-visit funnel" },
                { v: "0", l: "catering leads lost to missed calls" },
              ].map((s) => (
                <div key={s.l} className="border-l border-white/15 pl-5 first:border-l-0 first:pl-0 lg:pl-5">
                  <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.v}</p>
                  <p className="mt-2 text-[13px] leading-snug text-white/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 4 ─ Multi-location */}
        <Section tone="muted">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Multi-location"
                title="Built for restaurants with multiple locations."
                subtitle="Manage every location from one centralized workspace — while each venue keeps its own inbox, team, and local guest relationships."
              />
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { icon: Users, t: "Covers per location" },
                  { icon: Star, t: "Customer rating" },
                  { icon: Clock, t: "Reply time" },
                  { icon: Zap, t: "Team activity" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="pt-1.5 text-[13.5px] font-medium text-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <HqDashboardMock />
          </div>
        </Section>

        {/* WhatsApp & guest engagement */}
        <Section className="bg-gradient-to-b from-[oklch(0.99_0.006_175)] via-[oklch(0.965_0.024_175)] to-[oklch(0.99_0.006_175)]">
          <SectionHeader
            center
            eyebrow="Guest engagement"
            title="Turn one-time diners into regulars."
            subtitle="Beyond reservations and orders — reach guests on WhatsApp and SMS with the messages that bring them back."
          />
          <div className="mx-auto mt-12 max-w-[80rem]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/45 p-5 shadow-[0_24px_70px_-28px_rgba(16,80,50,0.32)] backdrop-blur-2xl sm:p-8 lg:p-10">
              <span aria-hidden className="pointer-events-none absolute -left-20 -top-16 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
              <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-16 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Clock, t: "Waitlist & table-ready pings", b: "Text guests their spot in line, then ping them the second a table frees up." },
                  { icon: Gift, t: "Birthday & loyalty offers", b: "Send a treat on their birthday and reward your regulars automatically." },
                  { icon: RotateCcw, t: "Win-back campaigns", b: "Bring back guests who haven't visited in a while with a timely, friendly nudge." },
                  { icon: Megaphone, t: "Slow-night promos", b: "Fill quiet shifts with a quick broadcast to opted-in diners near your venue." },
                  { icon: UtensilsCrossed, t: "Event & catering follow-ups", b: "Keep high-value catering and private-event leads warm until they book." },
                  { icon: Bell, t: "Reservation reminders", b: "Automatic reminders before every booking so tables don't sit empty." },
                ].map(({ icon: Icon, t, b }) => (
                  <div
                    key={t}
                    className="group flex flex-col rounded-2xl border border-white/55 bg-white/55 p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/75 hover:shadow-md"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[14.5px] font-semibold tracking-tight text-foreground">{t}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 5 ─ Integrations */}
        <Section>
          <SectionHeader
            center
            eyebrow="Integrations"
            title="Connect your restaurant stack."
            subtitle="SMSLocal pulls reservations, orders, reviews, and customer conversations from the tools you already run on the floor."
          />
          <div className="relative mt-12 overflow-hidden">
            <style>{`
              @keyframes restaurant-marquee {
                from { transform: translateX(0); }
                to   { transform: translateX(-50%); }
              }
              .restaurant-marquee-track {
                animation: restaurant-marquee 50s linear infinite;
              }
              .restaurant-marquee-track:hover {
                animation-play-state: paused;
              }
              @media (prefers-reduced-motion: reduce) {
                .restaurant-marquee-track { animation: none; }
              }
            `}</style>
            <div className="restaurant-marquee-track flex w-max gap-3">
              {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].map((it, i) => {
                const Icon = it.icon
                return (
                  <div
                    key={`${it.name}-${i}`}
                    className="group flex w-[200px] shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${it.tint}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-[13.5px] font-semibold tracking-tight text-foreground">{it.name}</h3>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{it.blurb}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {["Reservations", "Orders", "Reviews", "Customer conversations"].map((d) => (
              <span key={d} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-[12px] font-medium text-foreground">
                <CheckCheck className="h-3.5 w-3.5 text-primary" /> {d}
              </span>
            ))}
          </div>
        </Section>

        {/* 6 ─ AI Captain */}
        <Section tone="dark">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                dark
                eyebrow="AI Captain"
                title="AI that handles guest conversations."
                subtitle="Trained on your menu, hours, and policies — AI Captain answers the routine questions instantly and hands off to your team when a guest needs a person."
              />
              <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {AI_CAPS.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5">
                    <CheckCheck className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-[13px] font-medium text-white">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <AiCaptainMock />
          </div>
        </Section>

        {/* Testimonials */}
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-border bg-card px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Testimonials
            </span>
            <h2 className="mt-5 text-balance font-sans text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-foreground sm:text-5xl">
              Built for busy dining rooms.
            </h2>
          </div>
          <div className="relative mt-12 overflow-hidden">
            <style>{`
              @keyframes resto-testimonial-marquee {
                from { transform: translateX(0); }
                to   { transform: translateX(-50%); }
              }
              .resto-testimonial-track {
                animation: resto-testimonial-marquee 50s linear infinite;
              }
              .resto-testimonial-track:hover {
                animation-play-state: paused;
              }
              @media (prefers-reduced-motion: reduce) {
                .resto-testimonial-track { animation: none; }
              }
            `}</style>
            <div className="resto-testimonial-track flex w-max gap-5">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <figure
                  key={`${t.name}-${i}`}
                  className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:w-[360px]"
                >
                  <Quote className="h-7 w-7 shrink-0 fill-primary/20 text-primary" />
                  <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-foreground/80">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${t.tint}`}>
                      {t.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-semibold tracking-tight text-foreground">{t.name}</span>
                      <span className="block truncate text-[12px] text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ — single column accordion */}
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              FAQ
            </span>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What restaurant owners ask before switching.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-border border-y border-border">
            {FAQS.map((item) => (
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

        <RelatedContent path="/solutions/restaurant" />

        {/* Final CTA */}
        <ProductFinalCta
          title="Give every guest a faster response."
          subtitle="Manage reservations, orders, reviews, and customer conversations from one restaurant inbox."
          primaryCta={{ label: "Start Free", href: "/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

/* ---------- Feature split ---------- */
function FeatureSplit({
  eyebrow,
  title,
  body,
  visual,
  reverse,
}: {
  eyebrow: string
  title: string
  body: string
  visual: React.ReactNode
  reverse?: boolean
}) {
  return (
    <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <div className={reverse ? "lg:order-2" : ""}>
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </span>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">{title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
    </div>
  )
}

/* ---------- Mock shell ---------- */
function MockShell({ title, badge, children }: { title: React.ReactNode; badge?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[26px] opacity-45 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 24%, transparent), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <p className="text-[12px] font-semibold text-foreground">{title}</p>
          {badge ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {badge}
            </span>
          ) : null}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

function FlowStep({ icon: Icon, label, last }: { icon: React.ComponentType<{ className?: string }>; label: string; last?: boolean }) {
  return (
    <li className="relative flex items-center gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-[12.5px] font-medium text-foreground">{label}</span>
      {!last ? <span aria-hidden className="absolute left-[15px] top-9 h-3 w-px bg-border" /> : null}
    </li>
  )
}

/* ---------- Reservation mock ---------- */
function ReservationMock() {
  return (
    <MockShell title="Reservation flow" badge="No-shows −38%">
      <ol className="space-y-4">
        <FlowStep icon={CalendarCheck} label="Customer books table" />
        <FlowStep icon={Send} label="SMS confirmation" />
        <FlowStep icon={Bell} label="Reminder before visit" />
        <FlowStep icon={CheckCheck} label="Guest confirms" last />
      </ol>
      <div className="mt-4 rounded-xl rounded-tl-sm border border-primary/20 bg-primary/[0.05] px-3 py-2.5 text-[12px] text-foreground">
        “Your reservation tonight at 7:30 PM is confirmed. Reply <span className="font-semibold text-primary">C</span>.”
      </div>
    </MockShell>
  )
}

/* ---------- Order tracking mock ---------- */
function OrderTrackingMock() {
  const steps = [
    { icon: CheckCheck, label: "Order received", done: true },
    { icon: ChefHat, label: "Preparing", done: true, note: "“Your order is being prepared.”" },
    { icon: Truck, label: "Out for delivery", done: true, note: "“Your driver is on the way.”" },
    { icon: ThumbsUp, label: "Delivered", done: false },
  ]
  return (
    <MockShell title="Order tracking" badge="Live">
      <ol className="space-y-3.5">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <li key={s.label} className="relative flex items-start gap-3">
              <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${s.done ? "bg-primary text-primary-foreground" : "border border-dashed border-border text-muted-foreground"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold text-foreground">{s.label}</span>
                {s.note ? <span className="mt-0.5 block text-[11.5px] text-muted-foreground">{s.note}</span> : null}
              </span>
              {i < steps.length - 1 ? <span aria-hidden className="absolute left-[15px] top-9 h-3 w-px bg-border" /> : null}
            </li>
          )
        })}
      </ol>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/[0.05] px-3 py-2.5">
        <Bot className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[12px] text-foreground">AI answers <span className="font-semibold">“Where is my order?”</span> instantly</span>
      </div>
    </MockShell>
  )
}

/* ---------- Review mock ---------- */
function ReviewMock() {
  return (
    <MockShell title="Review automation" badge="After visit">
      <div className="rounded-xl rounded-tl-sm border border-border bg-background px-3 py-2.5 text-[12px] text-foreground">
        “Thanks for dining at Atlas. How was your visit?”
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ThumbsUp className="h-3.5 w-3.5" /> Positive
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-foreground">
            <Star className="h-3.5 w-3.5 text-yellow-500" /> Google review request
          </p>
        </div>
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Negative
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-foreground">
            <Bell className="h-3.5 w-3.5 text-primary" /> Manager alert
          </p>
        </div>
      </div>
    </MockShell>
  )
}

/* ---------- Voice inbox mock ---------- */
function VoiceInboxMock() {
  return (
    <MockShell title="Voice inbox" badge="Callback scheduled">
      <ol className="space-y-4">
        <FlowStep icon={PhoneMissed} label="Missed catering call" />
        <FlowStep icon={MessageSquare} label="Conversation created" />
        <FlowStep icon={Bell} label="Manager receives notes" />
        <FlowStep icon={PhoneCall} label="Callback scheduled" last />
      </ol>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/[0.05] px-3 py-2.5">
        <UtensilsCrossed className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[12px] text-foreground">50-person event inquiry · <span className="font-semibold">high value</span></span>
      </div>
    </MockShell>
  )
}

/* ---------- HQ dashboard mock ---------- */
function HqDashboardMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 26%, transparent), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center gap-2.5 border-b border-border bg-muted/40 p-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Store className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="text-[13.5px] font-semibold text-foreground">Atlas Bistro · HQ</p>
            <p className="text-[11.5px] text-muted-foreground">4 locations · tonight</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <Users className="h-3 w-3" /> 530 covers
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 gap-y-0 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          <span>Location</span>
          <span className="text-right">Covers</span>
          <span className="text-right">Rating</span>
          <span className="text-right">Reply</span>
        </div>
        <ul className="divide-y divide-border">
          {LOCATIONS.map((l) => (
            <li key={l.city} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 px-4 py-3">
              <span className="flex items-center gap-2 text-[12.5px] font-medium text-foreground">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {l.city}
              </span>
              <span className="text-right font-mono text-[12px] text-foreground">{l.covers}</span>
              <span className="flex items-center justify-end gap-1 text-right text-[12px] font-semibold text-foreground">
                <Star className="h-3 w-3 text-yellow-500" /> {l.rating}
              </span>
              <span className={`text-right font-mono text-[11.5px] ${l.up ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {l.reply}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-4 py-3 text-[11.5px] text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span>Manage every location from one centralized workspace</span>
        </div>
      </div>
    </div>
  )
}

/* ---------- AI Captain mock (dark) ---------- */
function AiCaptainMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-55 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 34%, transparent), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.18_0.03_230)] shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-primary-foreground">
            <Bot className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
              AI Captain <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </p>
            <p className="text-[11px] text-white/55">Atlas Bistro · Brooklyn</p>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="max-w-[80%]">
            <div className="rounded-2xl rounded-tl-sm border border-white/8 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-white/80">
              Are you open tonight?
            </div>
            <p className="mt-1 pl-1 text-[10px] text-white/40">Guest · WhatsApp</p>
          </div>
          <div className="ml-auto max-w-[85%]">
            <div className="rounded-2xl rounded-tr-sm bg-primary px-3 py-2.5 text-[12.5px] leading-relaxed text-primary-foreground">
              Yes, we're open until 11 PM. Would you like to reserve a table?
            </div>
            <p className="mt-1 pr-1 text-right text-[10px] text-white/40">AI Captain · instant</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="text-[11.5px] text-white/65">Offered to book a table · escalates to staff if asked</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Pricing card ---------- */
function PriceCard({
  name,
  price,
  tagline,
  features,
  featured,
}: {
  name: string
  price: string
  tagline: string
  features: string[]
  featured?: boolean
}) {
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-3xl border bg-card p-7 ${featured ? "border-primary/40 shadow-xl" : "border-border shadow-sm"}`}>
      {featured ? (
        <>
          <span aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <span className="absolute right-6 top-7 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">Popular</span>
        </>
      ) : null}
      <p className={`text-[13px] font-semibold uppercase tracking-[0.15em] ${featured ? "text-primary" : "text-muted-foreground"}`}>{name}</p>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-4xl font-semibold tracking-tight text-foreground">{price}</span>
        <span className="text-[14px] text-muted-foreground">/month</span>
      </div>
      <p className="mt-2 text-[13px] text-muted-foreground">{tagline}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-foreground">
            <CheckCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-col gap-2.5">
        <Link
          href="/signup"
          className={`group inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${featured
              ? "bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:brightness-110"
              : "border border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary"
            }`}
        >
          Start Free
          {featured ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
        </Link>
        <Link
          href="/company/contact"
          className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-[13px] font-medium text-muted-foreground transition hover:text-foreground"
        >
          Book Demo
        </Link>
      </div>
    </div>
  )
}

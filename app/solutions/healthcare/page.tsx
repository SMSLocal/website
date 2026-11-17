import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarCheck,
  Check,
  ClipboardList,
  FlaskConical,
  Languages,
  Lock,
  Megaphone,
  MessageCircleHeart,
  Pill,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  Syringe,
  UserRound,
  Wallet,
  X,
  Zap,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { HealthcareHero } from "@/components/solution/healthcare-hero"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/healthcare")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* a morning's schedule, without and with reminders (illustrative) */
const SLOTS = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"]
const MISSED = [2, 4, 6] // slots that go empty without a reminder

/* a greeting in each of six Indian scripts */
const SCRIPTS = [
  { lang: "Hindi", hello: "नमस्ते", tint: "#e3f7ec", ink: "#12714e" },
  { lang: "Tamil", hello: "வணக்கம்", tint: "#e6f0ff", ink: "#1f5fbf" },
  { lang: "Telugu", hello: "నమస్కారం", tint: "#fff3d6", ink: "#a56a00" },
  { lang: "Bengali", hello: "নমস্কার", tint: "#f0e9ff", ink: "#5a37b8" },
  { lang: "Marathi", hello: "नमस्कार", tint: "#ffe9e6", ink: "#b8402f" },
  { lang: "Gujarati", hello: "નમસ્તે", tint: "#e0f5f4", ink: "#0f766e" },
]

const CAPS = [
  { Icon: CalendarCheck, t: "Appointment reminders", d: "DLT-approved transactional templates, scheduled the day before and on the day, with a WhatsApp follow-up for patients who prefer to read it there.", href: "/products/bulk-sms/", link: "Transactional SMS details" },
  { Icon: FlaskConical, t: "Lab results by secure link", d: "Send a link to your secure patient portal. WhatsApp keeps the message private in transit, and the report itself never sits in the message body.", href: "/products/whatsapp-business-api/", link: "WhatsApp details" },
  { Icon: Languages, t: "Reach in the patient's language", d: "SMS in 10+ Indian scripts through Unicode, and an AI WhatsApp agent that replies in 8 Indian languages.", href: "/products/whatsapp-business-api/", link: "AI agent details" },
  { Icon: Stethoscope, t: "Patient questions answered by AI", d: "An AI WhatsApp agent answers clinic hours, directions and insurance questions, and hands medical questions to a human clinician with the full chat context.", href: "/products/whatsapp-business-api/", link: "AI agent details" },
]

/* the patient pathway: what goes out before the visit, after it, and at any time */
const PATH = [
  { phase: "Before the visit", Icon: CalendarCheck, items: [
    { I: CalendarCheck, t: "Appointment confirmation and 24-hour reminders" },
    { I: ClipboardList, t: "Insurance pre-authorisation updates" },
    { I: Syringe, t: "Vaccination schedule and booster reminders" },
  ] },
  { phase: "After the visit", Icon: FlaskConical, items: [
    { I: FlaskConical, t: "Lab results ready, with a secure portal link" },
    { I: Pill, t: "Prescription refill reminders" },
    { I: MessageCircleHeart, t: "Post-surgery and chronic-care follow-ups" },
  ] },
  { phase: "At any time", Icon: Megaphone, items: [
    { I: Megaphone, t: "Opt-in health tips and wellness campaigns" },
    { I: Siren, t: "Emergency broadcasts to the patient roster" },
  ] },
]

const BRANCHES = [
  { name: "City clinic", sender: "Own sender ID", cap: "Monthly budget cap" },
  { name: "Diagnostic centre", sender: "Own sender ID", cap: "Monthly budget cap" },
  { name: "Pharmacy counter", sender: "Own sender ID", cap: "Monthly budget cap" },
]

const FAQS = [
  { q: "Can I send lab reports directly inside a WhatsApp message?", a: "Not in the message body. Send a link to a secure patient portal where the patient logs in. This keeps PHI out of any intermediate store and preserves your audit trail." },
  { q: "What about HIPAA compliance?", a: "HIPAA is US-specific. India operates under the DPDPA 2023 framework. SMSLocal runs on India-based infrastructure and signs DPAs with healthcare customers." },
  { q: "Which Indian languages are supported?", a: "SMS supports every major Indian script through Unicode, including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi and Odia. WhatsApp templates accept 11 Indian languages at the platform level, which is Meta's capability. Our AI WhatsApp agent replies in 8 Indian languages." },
  { q: "Can different clinics or branches share one account?", a: "Yes. Create sub-accounts per branch with their own sender IDs, DLT templates and budget caps, all under a single master wallet and billing." },
  { q: "Can the AI agent answer medical questions?", a: "No. It answers common queries such as clinic hours, directions and insurance accepted. Medical questions are handed to a human clinician with the full chat context." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "DLT-compliant templates" },
  { icon: Languages, label: "10+ Indian scripts via SMS" },
  { icon: Bot, label: "AI WhatsApp in 8 languages" },
  { icon: Zap, label: "Secure portal links, not PHI" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function HealthcareSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Healthcare", path: "/solutions/healthcare" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a patient's care as a heartbeat, one message per beat */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="hc-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Solutions &middot; Healthcare
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Reminders and care updates <span className="text-primary">patients actually read.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                SMS and WhatsApp for clinics and hospitals: appointment reminders that cut no-shows, secure lab-report links and follow-ups, in the patient&apos;s own language.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="hc-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <HealthcareHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: one morning's schedule, without and with reminders */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>No-shows and language barriers quietly tax every clinic.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Every empty slot is a patient who was not seen and a clinician who was not busy. Phone calls for lab results are slow, and care instructions sent in a language the patient does not read reach no one.</p>
            </div>

            <div className="mt-14 space-y-8">
              {[
                { label: "With no reminder", sub: "Some slots go quiet", fixed: false },
                { label: "With a day-before and same-day reminder", sub: "The schedule fills", fixed: true },
              ].map((row) => (
                <div key={row.label}>
                  <p className="flex flex-wrap items-baseline gap-x-3 text-[15px] font-semibold">{row.label}<span className="text-[13px] font-normal text-muted-foreground">{row.sub}</span></p>
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {SLOTS.map((s, i) => {
                      const empty = !row.fixed && MISSED.includes(i)
                      return (
                        <div key={s} className={`hc-slot${row.fixed && MISSED.includes(i) ? ` hc-fill${MISSED.indexOf(i)}` : ""} relative flex h-[76px] flex-col items-center justify-center rounded-2xl text-center ${empty ? "border-2 border-dashed border-[#d6453d]/45 bg-white/50" : "bg-white ring-1 ring-border"}`}>
                          <span className="text-[12px] font-semibold tabular-nums">{s}</span>
                          {empty ? <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#c0392b]"><X className="h-3 w-3" strokeWidth={3} />No-show</span> : <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[oklch(0.42_0.12_175)]"><UserRound className="h-3 w-3" />Seen</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: four jobs, and the same reminder in six scripts */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>Messaging built around how Indian patients communicate.</h2>
              <ol className="mt-10 space-y-8">
                {CAPS.map((c, i) => (
                  <li key={c.t} className="grid grid-cols-[48px_1fr] gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><c.Icon className="h-6 w-6" /></span>
                    <div>
                      <h3 className="flex items-baseline gap-2 text-[18px] font-semibold tracking-tight"><span className="font-mono text-[12px] font-normal text-muted-foreground">0{i + 1}</span>{c.t}</h3>
                      <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">{c.d}</p>
                      <Link href={c.href} className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">{c.link} <ArrowRight className="h-3.5 w-3.5" /></Link>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:pt-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Six scripts, one message</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {SCRIPTS.map((s, i) => (
                  <div key={s.lang} className="hc-tile group relative overflow-hidden rounded-3xl p-5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-22px_rgba(15,26,46,.45)]" style={{ background: s.tint, animationDelay: `${i * 0.35}s` }}>
                    <p className="text-[28px] font-semibold leading-tight tracking-tight sm:text-[32px]" style={{ color: s.ink }}>{s.hello}</p>
                    <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/60">{s.lang}</p>
                    <i className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/50" />
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">SMS supports every major Indian script through Unicode, and the AI WhatsApp agent replies in 8 Indian languages.</p>
            </div>
          </div>
        </section>

        {/* 4 · USE CASES: the patient pathway, before, after and at any time */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Use cases</p>
              <h2 className={`${H2} mt-5`}>Every patient-facing touchpoint, along one pathway.</h2>
            </div>
            <div className="relative mt-14">
              <span className="absolute left-0 right-0 top-[27px] hidden h-px bg-primary/35 md:block" aria-hidden />
              <div className="grid gap-12 md:grid-cols-3 md:gap-8">
                {PATH.map((ph) => (
                  <div key={ph.phase} className="relative">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_24px_-10px_rgba(18,160,124,.7)] ring-8 ring-secondary"><ph.Icon className="h-6 w-6" /></span>
                    <h3 className="mt-5 text-[20px] font-semibold tracking-tight">{ph.phase}</h3>
                    <ul className="mt-4 space-y-3">
                      {ph.items.map((it) => (
                        <li key={it.t} className="flex items-start gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-border">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><it.I className="h-4 w-4" /></span>
                          <span className="text-[14.5px] leading-snug text-foreground">{it.t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 · PRIVACY: what an SMS may say, and what it must not */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Privacy note</p>
              <h2 className={`${H2} mt-5`}>Keep medical details out of message bodies. Link to a secure portal.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Healthcare messaging in India needs patient consent for marketing content and DLT compliance for all commercial messaging. A plain-text SMS can be read by anyone holding the phone, so the report stays behind a login.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[#d6453d]/25 bg-[#fff7f6] p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-[#c0392b]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d6453d] text-white"><X className="h-3.5 w-3.5" strokeWidth={3.4} /></span>Not in the message</p>
                <p className="mt-5 max-w-[320px] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] leading-snug shadow-sm ring-1 ring-black/5">Your cholesterol report: total 245 mg/dL, high. Please consult your doctor.</p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">Results, diagnoses and values in plain text stay on the lock screen and in the phone&apos;s message store.</p>
              </div>
              <div className="rounded-3xl border border-primary/30 bg-[color-mix(in_oklch,var(--primary)_6%,white)] p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-[oklch(0.42_0.12_175)]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3.4} /></span>A link to a secure portal</p>
                <p className="mt-5 max-w-[320px] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] leading-snug shadow-sm ring-1 ring-black/5">Your lab report is ready. View securely: <span className="font-medium text-[#027eb5] underline">portal.clinic.in/r/XA2</span></p>
                <p className="mt-4 flex items-start gap-2 text-[14px] leading-relaxed text-muted-foreground"><Lock className="mt-1 h-4 w-4 shrink-0 text-primary" />The patient logs in to read it. SMSLocal signs DPAs with healthcare customers and runs on India-resident infrastructure under the DPDPA 2023 framework.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · HOSPITAL GROUPS: one wallet, a sub-account per branch */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>For hospital groups</p>
              <h2 className={`${H2} mt-5`}>One wallet. A sub-account for every branch.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Each clinic, lab or pharmacy gets its own sender ID, DLT templates and budget cap, all under one master wallet and one bill.</p>
            </div>
            <div className="relative mt-14">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-foreground px-6 py-4 text-background shadow-[0_24px_40px_-20px_rgba(15,26,46,.6)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Wallet className="h-5 w-5" /></span>
                <span className="leading-tight"><span className="block text-[15px] font-semibold">Master wallet</span><span className="block text-[12px] text-background/65">One balance, one bill</span></span>
              </div>
              <div className="relative mx-auto h-10 w-full max-md:hidden" aria-hidden>
                <span className="absolute left-1/2 top-0 h-5 w-px bg-primary/50" />
                <span className="absolute left-[16.6%] right-[16.6%] top-5 h-px bg-primary/50" />
                <span className="absolute left-[16.6%] top-5 h-5 w-px bg-primary/50" /><span className="absolute left-1/2 top-5 h-5 w-px bg-primary/50" /><span className="absolute right-[16.6%] top-5 h-5 w-px bg-primary/50" />
              </div>
              <div className="mt-6 grid gap-4 md:mt-0 md:grid-cols-3">
                {BRANCHES.map((b) => (
                  <div key={b.name} className="rounded-2xl bg-white p-5 ring-1 ring-border shadow-[0_18px_30px_-20px_rgba(15,26,46,.4)]">
                    <p className="flex items-center gap-2.5 text-[16px] font-semibold tracking-tight"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Building2 className="h-[18px] w-[18px]" /></span>{b.name}</p>
                    <ul className="mt-4 space-y-2 text-[14px] text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />{b.sender}</li>
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />Own DLT templates</li>
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />{b.cap}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/healthcare" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/healthcare" />

        <ProductFinalCta
          title="Better patient communication starts here."
          subtitle="No plan, no card, no lock-in, and every message is DLT-compliant by default."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes hc-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .hc-rise { animation: hc-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @keyframes hc-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .hc-tile { animation: hc-bob 5s ease-in-out infinite }
        ${[0, 1, 2].map((i) => `@keyframes hc-fill${i} { 0%, ${10 + i * 18}% { background: rgba(255,255,255,.5); border: 2px dashed rgba(214,69,61,.45); box-shadow: none } ${16 + i * 18}%, 90% { background: #fff; border: 2px solid transparent; box-shadow: 0 0 0 1px var(--border) } 98%, 100% { background: rgba(255,255,255,.5); border: 2px dashed rgba(214,69,61,.45); box-shadow: none } }
        .hc-fill${i} { animation: hc-fill${i} 8s ease-in-out infinite }`).join("\n")}
        @media (prefers-reduced-motion: reduce) { .hc-rise, .hc-fill0, .hc-fill1, .hc-fill2, .hc-tile { animation: none } }
      `}</style>
    </>
  )
}

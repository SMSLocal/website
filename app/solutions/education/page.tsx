import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Bus,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  IndianRupee,
  Languages,
  MessageCircle,
  Plane,
  School,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { EducationHero } from "@/components/solution/education-hero"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/education")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* a school day, from the first bell to the last (illustrative times) */
const DAY = [
  { time: "7:30 AM", Icon: Bus, t: "Bus route or timing change", d: "Parents hear about the delay before the child is at the stop." },
  { time: "9:15 AM", Icon: UserCheck, t: "Absence notice", d: "A same-morning message goes to the parent when a student is marked absent." },
  { time: "12:00 PM", Icon: CalendarDays, t: "Exam timetable and syllabus", d: "Timetables reach every family on the day they are published." },
  { time: "3:30 PM", Icon: Plane, t: "Holiday and event notices", d: "Sports day, trips and closures, in the language each family reads." },
  { time: "6:00 PM", Icon: IndianRupee, t: "Fee reminder with a UPI link", d: "Sent at a time parents are at home, with a link that opens a UPI app." },
]
const TERM = ["Admission status updates", "Result availability alerts", "PTA meeting reminders", "Scholarship eligibility alerts"]

const FAQS = [
  { q: "Can I segment messages by class or section?", a: "Yes. Upload segmented contact lists or tag contacts in the dashboard, then send targeted broadcasts to any subset: Class 8, Section B, a maths elective or one bus route." },
  { q: "Is the parent-teacher inbox shared among multiple teachers?", a: "Yes. The shared team inbox lets several teachers handle parent conversations, with assignment, internal notes and a handoff history." },
  { q: "Which languages can I message parents in?", a: "SMS supports every major Indian script through Unicode. The AI WhatsApp agent replies in 8 Indian languages, and WhatsApp templates can be created in the languages Meta supports." },
  { q: "Can each branch of our school group have its own sender ID?", a: "Yes. Create sub-accounts per campus with their own DLT-registered sender IDs, templates and wallets, all rolling up into one master invoice." },
  { q: "Do you offer pricing for non-profit schools?", a: "We have a discount policy for verified educational non-profits. Get in touch from the contact page with your registration details and we will set you up." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "DLT-registered institution templates" },
  { icon: Languages, label: "10+ Indian scripts for SMS" },
  { icon: Users, label: "Shared inbox across teachers" },
  { icon: Bot, label: "AI WhatsApp in 8 languages" },
]

const AUD = [
  { who: "Students", t: "Exam dates, results and admission status", d: "Read on phones that are often shared at home, so the message has to be short and clear." },
  { who: "Parents", t: "Fees, absences and events", d: "Families read in Hindi, Tamil, Marathi or whichever language they use at home, not always English." },
  { who: "Staff", t: "Timetable changes and meetings", d: "Teachers and the office need updates without yet another group chat to keep track of." },
]

const ROUTES = [
  { q: "When is the next PTA meeting?", who: "ai", out: "Saturday at 11 AM, in the school hall." },
  { q: "Which days are holidays this month?", who: "ai", out: "Sends the holiday list for the term." },
  { q: "Where do I buy the uniform?", who: "ai", out: "Shares the approved supplier from the school notice." },
  { q: "Why were my child's marks lower this term?", who: "Class teacher", out: "Handed over with the full chat." },
  { q: "My child was upset after school yesterday.", who: "Teacher or counsellor", out: "Handed over with the full chat." },
  { q: "Can we discuss a fee concession?", who: "Accounts office", out: "Handed over with the full chat." },
]

/* small sample visuals for the four jobs */
function FeeVisual() {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Term 2 fees</p>
      <div className="mt-1.5 flex items-end justify-between gap-3">
        <p className="text-[24px] font-semibold leading-none tracking-tight">₹12,500</p>
        <span className="rounded-lg bg-[#0e9f6e] px-3.5 py-2 text-[13px] font-semibold text-white">Pay by UPI</span>
      </div>
      <p className="mt-2 text-[12px] text-muted-foreground">Due 10 Dec · link in the message</p>
    </div>
  )
}
function ExamVisual() {
  return (
    <div className="divide-y divide-black/5 rounded-xl bg-white ring-1 ring-black/5">
      {[["Mon", "Mathematics", "9:00 AM"], ["Wed", "Science", "9:00 AM"], ["Fri", "English", "10:30 AM"]].map(([d, s, t]) => (
        <p key={d} className="flex items-center gap-3 px-4 py-2 text-[13px]"><span className="w-8 font-mono text-[11px] font-semibold uppercase text-[#0a6fd6]">{d}</span><span className="flex-1 font-medium">{s}</span><span className="text-muted-foreground">{t}</span></p>
      ))}
    </div>
  )
}
function AdmitVisual() {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
      <div className="flex gap-2">
        {["4", "7", "2", "9"].map((n, i) => <span key={i} className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-[18px] font-semibold">{n}</span>)}
        <span className="ml-auto flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0e9f6e]"><Check className="h-4 w-4" strokeWidth={3} />Verified</span>
      </div>
      <p className="mt-3 text-[12.5px] text-muted-foreground">Application received · documents requested on WhatsApp</p>
    </div>
  )
}
function ChatVisual() {
  return (
    <div className="space-y-2">
      <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[13px] ring-1 ring-black/5">When is the next PTA meeting?</p>
      <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#0e9f6e] px-3.5 py-2 text-[13px] text-white">Saturday at 11 AM, in the school hall.</p>
    </div>
  )
}

const JOBS = [
  { Icon: IndianRupee, c: "#d98a0b", V: FeeVisual, t: "Fee and fine reminders", d: "Scheduled, DLT-approved transactional SMS with a UPI link, so parents pay from the message and the front desk makes fewer follow-up calls.", ch: "SMS", href: "/products/bulk-sms/" },
  { Icon: CalendarDays, c: "#0a6fd6", V: ExamVisual, t: "Exam schedules and results", d: "Broadcast to thousands of students or parents at once, in the language each family reads.", ch: "SMS and WhatsApp", href: "/products/bulk-sms/" },
  { Icon: FileCheck, c: "#7a4fd1", V: AdmitVisual, t: "Admissions and enrolment", d: "OTP verification at the start of the form, document submission over WhatsApp and application status updates by SMS.", ch: "OTP, WhatsApp and SMS", href: "/products/otp-sms/" },
  { Icon: MessageCircle, c: "#0f2a47", V: ChatVisual, t: "Parent-teacher AI on WhatsApp", d: "The AI answers PTA timing, the holiday list and the uniform supplier, and hands grades or discipline questions to a teacher with the full chat.", ch: "WhatsApp", href: "/products/whatsapp-business-api/" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function EducationSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Education & EdTech", path: "/solutions/education" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: an attendance clipboard that tells the parents */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="ed-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Solutions &middot; Education &amp; EdTech
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Parents hear from the school <span className="text-primary">the moment it matters.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Absence alerts, fee reminders, exam timetables and results over SMS and WhatsApp, in the language each family reads, with one shared inbox for teachers and an AI agent for routine questions.
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
            <div className="ed-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <EducationHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: a navy band, three audiences in one divided panel */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#7fdcb8]`}>The problem</p>
              <h2 className={`${H2} mt-5`}>A notice only works when the family can read it.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">A WhatsApp group shows every member&apos;s number to the rest and fills up fast. Business messaging reaches each family on its own, in its own language, and keeps a record the school office can search.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3">
              {AUD.map((n) => (
                <div key={n.who} className="bg-[#14335a] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7fdcb8]">{n.who}</p>
                  <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-tight">{n.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/65">{n.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: four job cards, each with a small sample */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>One dashboard for the whole institution.</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {JOBS.map((j) => (
                <div key={j.t} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-border shadow-[0_30px_60px_-40px_rgba(15,26,46,.3)] sm:p-7">
                  <div className="flex items-center rounded-2xl bg-secondary p-4" style={{ minHeight: 158 }}><div className="w-full"><j.V /></div></div>
                  <p className="mt-6 flex items-center gap-3 text-[18px] font-semibold tracking-tight"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: j.c }}><j.Icon className="h-[18px] w-[18px]" /></span>{j.t}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{j.d}</p>
                  <p className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[13.5px]"><span className="text-muted-foreground">Channel: <b className="font-semibold text-foreground">{j.ch}</b></span><Link href={j.href} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">Details <ArrowRight className="h-3.5 w-3.5" /></Link></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · USE CASES: the school day as a horizontal run of five moments */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Use cases</p>
              <h2 className={`${H2} mt-5`}>From the first bell to the last.</h2>
            </div>
            <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-5">
              {DAY.map((d) => (
                <li key={d.t}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-border shadow-[0_14px_24px_-16px_rgba(15,26,46,.4)]"><d.Icon className="h-5 w-5" /></span>
                    <span aria-hidden className="hidden h-[3px] flex-1 rounded-full bg-primary/25 md:block" />
                  </div>
                  <p className="mt-5 font-mono text-[12px] font-semibold tracking-[0.14em] text-primary">{d.time}</p>
                  <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight">{d.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{d.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 rounded-2xl bg-white p-6 ring-1 ring-border sm:p-7">
              <p className="text-[14px] font-semibold">Through the term</p>
              <ul className="mt-4 grid gap-x-8 gap-y-3 text-[14.5px] sm:grid-cols-2 lg:grid-cols-4">
                {TERM.map((t) => <li key={t} className="flex items-start gap-2.5 leading-snug"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* 5 · THE INBOX: a routing board, who answers each parent question */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className={`${EYEBROW} text-primary`}>The parent inbox</p>
              <h2 className={`${H2} mt-5`}>Routine questions answered. Real concerns reach a teacher.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">The AI agent handles what has a standard answer. Anything about a child goes to the shared inbox, assigned to the right person with the full conversation.</p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-border shadow-[0_30px_60px_-40px_rgba(15,26,46,.3)]">
              <p className="grid grid-cols-1 bg-secondary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:grid-cols-[1.2fr_1fr] sm:gap-6"><span>A parent asks</span><span className="hidden sm:block">Who handles it</span></p>
              {ROUTES.map((r, i) => {
                const ai = r.who === "ai"
                return (
                  <div key={r.q} className={`grid gap-2 px-6 py-5 sm:grid-cols-[1.2fr_1fr] sm:gap-6 ${i ? "border-t border-border" : ""}`}>
                    <p className="flex items-start gap-3 text-[15px] font-medium leading-snug"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />{r.q}</p>
                    <div>
                      <p className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] font-semibold ${ai ? "bg-[#e3f6ee] text-[#0b7a55]" : "bg-[#0f2a47] text-white"}`}>{ai ? <Bot className="h-3.5 w-3.5" /> : <ClipboardCheck className="h-3.5 w-3.5" />}{ai ? "AI answers" : r.who}</p>
                      <p className="mt-1.5 text-[13.5px] leading-snug text-muted-foreground">{r.out}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6 · COMPLIANCE: anatomy of a DLT template, reused across campuses */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-border shadow-[0_30px_60px_-36px_rgba(15,26,46,.3)] sm:p-8">
                <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"><span>A registered template</span><span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] normal-case tracking-normal text-primary"><Check className="h-3 w-3" strokeWidth={3.4} />Approved once</span></p>
                <p className="mt-5 text-[18px] leading-[1.7] sm:text-[20px]">
                  Dear Parent, fees of <b className="rounded-md bg-[#fff4de] px-1.5 py-0.5 font-medium text-[#8a5a00]">{"{#var#}"}</b> for <b className="rounded-md bg-[#eaf1fb] px-1.5 py-0.5 font-medium text-[#1f5fbf]">{"{#var#}"}</b> are due on <b className="rounded-md bg-[#e9f6f1] px-1.5 py-0.5 font-medium text-[oklch(0.42_0.12_175)]">{"{#var#}"}</b>. Pay here: <b className="rounded-md bg-[#f0e9ff] px-1.5 py-0.5 font-medium text-[#5a37b8]">{"{#var#}"}</b>
                </p>
                <p className="mt-5 text-[13.5px] leading-relaxed text-muted-foreground">The fixed wording is approved once. Each message fills the variable parts, which are the amount, the student, the date and the link.</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["North campus", "City campus", "Junior school"].map((c) => (
                    <div key={c} className="rounded-2xl bg-secondary p-3.5 text-center"><School className="mx-auto h-5 w-5 text-primary" /><p className="mt-2 text-[13px] font-semibold leading-tight">{c}</p><p className="mt-0.5 text-[11.5px] text-muted-foreground">same template</p></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className={`${EYEBROW} text-primary`}>Compliance</p>
              <h2 className={`${H2} mt-5`}>DLT-registered institution templates, approved once and reused.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">Fee reminders, exam schedules and result notices are typically sent as service messages on a registered DLT template. SMSLocal helps you register your entity and get the templates approved once.</p>
              <p className="mt-3 flex max-w-md items-start gap-2 text-[16px] leading-relaxed text-muted-foreground"><Wallet className="mt-1 h-4 w-4 shrink-0 text-primary" />Reuse them across every campus under one master account, with a sub-account, sender ID and wallet per campus.</p>
              <p className="mt-3 flex max-w-md items-start gap-2 text-[16px] leading-relaxed text-muted-foreground"><GraduationCap className="mt-1 h-4 w-4 shrink-0 text-primary" />One master invoice for the whole group.</p>
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/education" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/education" />

        <ProductFinalCta
          title="Communication that reaches every family."
          subtitle="Start your trial with DLT-compliant templates from day one."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes ed-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .ed-rise { animation: ed-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .ed-rise { animation: none } }
      `}</style>
    </>
  )
}

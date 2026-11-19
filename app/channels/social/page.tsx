import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Clock,
  Facebook,
  HandHelping,
  Inbox,
  Instagram,
  Layers,
  MessageCircle,
  Route,
  Smile,
  Sparkles,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ExploreMore } from "@/components/product/explore-more"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { SocialHero } from "@/components/product/social-hero"

export const metadata: Metadata = getPageMetadata("/channels/social")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const MOMENTS: { Icon: LucideIcon; c: string; title: string; what: string; fix: string }[] = [
  { Icon: Instagram, c: "#d62976", title: "A question about stock", what: "A customer asks on Instagram whether the classic tee comes in M, while your team is busy or offline.", fix: "The AI agent answers from your catalog and knowledge base, so the sale does not wait." },
  { Icon: Facebook, c: "#0a7cff", title: "A request that needs a person", what: "Someone on Messenger wants to change a delivery address.", fix: "The chat is routed to the right teammate and starts a reply timer, so it is not lost in a Page inbox." },
  { Icon: MessageCircle, c: "#0e9f6e", title: "The same customer, another app", what: "They follow up, this time on the other platform.", fix: "Both conversations are one customer record, so nobody asks them to repeat themselves." },
  { Icon: BarChart3, c: "#6366f1", title: "A manager checking in", what: "Someone wants to know how social support is going.", fix: "Reply times and CSAT are reported in one place, next to every other channel." },
]

const AI_HANDLES = [
  "Stock, sizes, prices and delivery questions",
  "Order status from your order data",
  "Opening hours, returns and other FAQs",
  "Greetings and away messages after hours",
]

const TEAM_HANDLES = [
  "Complaints and anything sensitive",
  "Negotiations, refunds and exceptions",
  "Chats the customer asks to hand to a person",
  "Anything the agent is not sure about",
]

const RECORD = [
  { Icon: Instagram, c: "#d62976", t: "Instagram", d: "Asked about the classic tee in M" },
  { Icon: Facebook, c: "#0a7cff", t: "Messenger", d: "Asked to change the delivery address" },
  { Icon: MessageCircle, c: "#25d366", t: "WhatsApp", d: "Order confirmation sent" },
]

const IG_GETS = ["Instagram DM automation with AI replies", "Story replies handled in the same thread", "Comment-to-DM for campaigns and giveaways", "Product questions answered from your catalog"]
const MS_GETS = ["Greeting and away messages for your Page", "Instant answers to FAQs, at any hour", "Handoff to a person with the full history", "Broadcasts to opted-in subscribers, within Meta's rules"]

const STEPS = [
  { t: "Sign up and pick your channels", d: "Choose Instagram, Messenger or both, alongside the channels you already use." },
  { t: "Link your accounts", d: "Log in with Facebook to connect your Instagram business account and your Page." },
  { t: "Set your rules", d: "Add routing, SLA targets and the answers your AI agent can use." },
  { t: "Reply from one inbox", d: "Your team answers social chats where they already work, with AI covering the routine ones." },
]

const MEASURE: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: Route, t: "Routing", d: "Which team picked each chat up, and how long it waited." },
  { Icon: Clock, t: "SLA timers", d: "How often replies land inside the targets you set." },
  { Icon: Smile, t: "CSAT", d: "How customers rate the conversation, platform by platform." },
]

const FAQ = [
  {
    q: "What is an omnichannel social inbox?",
    a: "It is one shared inbox where messages from social apps arrive next to your other channels. With SMSLocal, Instagram and Messenger conversations sit beside chat, voice, SMS and email, with the same routing, assignment and reporting for all of them.",
  },
  {
    q: "Which social platforms does SMSLocal support?",
    a: "Instagram and Messenger today, in one inbox alongside chat, voice, SMS and email. More social channels are added over time without changing how your team works.",
  },
  {
    q: "Can I manage Instagram DMs and Facebook Messenger in one inbox?",
    a: "Yes. Instagram and Messenger conversations land in the same unified social inbox as your other channels, so your team stops switching apps and nobody is unsure who already replied.",
  },
  {
    q: "Can an AI agent answer social media messages automatically?",
    a: "Yes. The AI agent replies to routine questions from your knowledge base on every connected platform, at any hour, and hands the chat to a person in the same thread when it needs one.",
  },
  {
    q: "What does social DM automation cover?",
    a: "Greetings, away messages, instant answers to common questions, story replies and comment-to-DM on Instagram, plus automated replies and opted-in broadcasts on Messenger. Your team stays in control of anything that needs judgement.",
  },
  {
    q: "What happens when the same customer messages on different platforms?",
    a: "SMSLocal merges identity across platforms into one customer record, so your team and your AI agent see the full history wherever the customer messaged from.",
  },
  {
    q: "Is social media support measurable?",
    a: "Yes. Social chats get routing, SLA timers and CSAT scoring, so you can measure them like every other channel and report on them in one place.",
  },
  {
    q: "How do I connect Instagram and Messenger to SMSLocal?",
    a: "Sign up, choose the social channels you want, and link your Instagram and Facebook accounts. Then set your routing, SLA targets and AI rules, and start replying from the shared inbox.",
  },
]

const RELATED = [
  { href: "/channels/instagram/", label: "Instagram DM automation", hint: "DMs, story replies and comment-to-DM" },
  { href: "/channels/messenger/", label: "Facebook Messenger", hint: "Automated and AI-handled conversations" },
  { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox", hint: "Every channel in one place" },
  { href: "/products/ai-agents/", label: "AI agents", hint: "Answers across every channel" },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: Inbox, label: "Instagram and Messenger in one inbox" },
  { icon: Bot, label: "AI agent for social media DMs" },
  { icon: Users, label: "Routing, SLA timers and CSAT" },
  { icon: Layers, label: "One customer record" },
]

export default function SocialChannelsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Social Messaging Hub"
        description="Unify Instagram and Messenger DMs with chat, voice, SMS, and email in one inbox, answered by agentic AI across every platform."
        path="/channels/social"
        category="Social Media Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Social", path: "/channels/social" },
        ]}
      />
      <FaqJsonLd items={FAQ} path="/channels/social" />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: the same Instagram message, with and without SMSLocal */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels &middot; Social Messaging
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                One omnichannel social inbox for <span className="text-primary">Instagram and Messenger.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Bring every social DM into the same inbox as chat, voice, SMS and email. An AI agent answers first, around the clock, and your team picks up whatever needs a person.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/signup/" className={BTN_OUT}>Start your trial</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <SocialHero />
            </div>
          </div>
        </section>

        {/* 2 · WHERE SOCIAL SUPPORT SLIPS: a four-cell grid split by a cross of thin lines */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Social media inbox, handled</p>
              <h2 className={`${H2} mt-5`}>Four moments where social messages usually slip.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Each one is small. Together they decide whether a customer gets an answer or goes elsewhere.</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 sm:[&>*:nth-child(odd)]:border-r sm:[&>*:nth-child(-n+2)]:border-b [&>*]:border-border max-sm:divide-y max-sm:divide-border">
              {MOMENTS.map((m, i) => (
                <div key={m.title} className="relative p-7 sm:p-10">
                  <span className="absolute right-6 top-4 font-mono text-[44px] font-semibold leading-none tracking-tighter text-foreground/[0.06] sm:right-8 sm:top-6 sm:text-[64px]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: m.c }}><m.Icon className="h-5 w-5" /></span>
                  <p className="mt-5 text-[20px] font-semibold tracking-tight">{m.title}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{m.what}</p>
                  <p className="mt-4 border-l-2 pl-4 text-[14.5px] leading-relaxed text-foreground" style={{ borderColor: m.c }}><span className="font-semibold text-primary">With SMSLocal: </span>{m.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · AI AND PEOPLE: two lists divided by a handoff */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>AI agent for social media</p>
              <h2 className={`${H2} mt-5`}>Social DM automation that knows when to hand over.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">The agent answers from your own knowledge base. Anything that needs judgement moves to a teammate, in the same thread.</p>
            </div>
            <div className="mt-14 grid items-stretch gap-0 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-t-3xl bg-[#eef0ff] p-8 md:rounded-l-3xl md:rounded-tr-none md:p-10">
                <p className="flex items-center gap-2.5 text-[18px] font-semibold tracking-tight text-[#3d3ac4]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366f1] text-white"><Bot className="h-[18px] w-[18px]" /></span>The AI agent handles</p>
                <ul className="mt-6 space-y-3.5">
                  {AI_HANDLES.map((t) => <li key={t} className="flex items-start gap-3 text-[15px] leading-snug text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6366f1]" />{t}</li>)}
                </ul>
              </div>
              <div className="relative flex items-center justify-center bg-background py-3 md:px-0 md:py-0">
                <span className="z-10 flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-background md:-mx-8 md:flex-col md:rounded-2xl md:px-3 md:py-5 md:[writing-mode:vertical-rl]"><HandHelping className="h-4 w-4 md:rotate-90" />Handoff</span>
              </div>
              <div className="rounded-b-3xl bg-[#e6f6ee] p-8 md:rounded-r-3xl md:rounded-bl-none md:p-10">
                <p className="flex items-center gap-2.5 text-[18px] font-semibold tracking-tight text-[#0b7a55]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e9f6e] text-white"><Users className="h-[18px] w-[18px]" /></span>Your team handles</p>
                <ul className="mt-6 space-y-3.5">
                  {TEAM_HANDLES.map((t) => <li key={t} className="flex items-start gap-3 text-[15px] leading-snug text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0e9f6e]" />{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · ONE RECORD: a customer profile with a merged timeline */}
        <section className="bg-[#f3f7f4] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Unified social inbox</p>
              <h2 className={`${H2} mt-5`}>The same person on two apps is one customer.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">SMSLocal merges identity across platforms, so the history follows the customer, not the app they used. Your team and your AI agent both see it.</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-primary">
                <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-1.5 hover:underline">Omnichannel inbox <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/products/ai-agents/" className="inline-flex items-center gap-1.5 hover:underline">AI agents <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_30px_50px_-30px_rgba(15,42,71,.4)] ring-1 ring-black/5 sm:p-8">
              <div className="flex items-center gap-4 border-b border-border pb-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f6ee] text-[20px] font-bold text-[#0e9f6e]">R</span>
                <div className="leading-tight"><p className="text-[18px] font-semibold tracking-tight">Riya K.</p><p className="mt-0.5 text-[13px] text-muted-foreground">One record · 3 channels</p></div>
              </div>
              <ol className="mt-6 space-y-5">
                {RECORD.map((r) => (
                  <li key={r.t} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ background: r.c }}><r.Icon className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1"><p className="text-[15px] font-semibold">{r.t}</p><p className="text-[13.5px] text-muted-foreground">{r.d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 5 · INSTAGRAM AND MESSENGER: a two-tone band, one half for each app */}
        <section className="bg-background">
          <div className="grid md:grid-cols-2">
            <div className="bg-[#fff1f6] px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-md md:ml-auto md:mr-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #feda75, #fa7e1e 28%, #d62976 62%, #962fbf)" }}><Instagram className="h-6 w-6" /></span>
                <h3 className="mt-5 text-[26px] font-semibold tracking-[-0.03em]">Instagram inbox</h3>
                <ul className="mt-6 space-y-3.5">{IG_GETS.map((t) => <li key={t} className="flex items-start gap-3 text-[15px] leading-snug"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d62976]" />{t}</li>)}</ul>
                <Link href="/channels/instagram/" className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#c0225f] hover:underline">Instagram DM automation <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="bg-[#eaf2ff] px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-md md:ml-0 md:mr-auto">
                <span className="flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #00b2ff, #0a7cff 55%, #a033ff)" }}><Facebook className="h-6 w-6" /></span>
                <h3 className="mt-5 text-[26px] font-semibold tracking-[-0.03em]">Messenger inbox</h3>
                <ul className="mt-6 space-y-3.5">{MS_GETS.map((t) => <li key={t} className="flex items-start gap-3 text-[15px] leading-snug"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a63cf]" />{t}</li>)}</ul>
                <Link href="/channels/messenger/" className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0a63cf] hover:underline">Facebook Messenger <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · SETUP: four large numerals */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className={`${EYEBROW} text-primary`}>Getting started</p>
                <h2 className={`${H2} mt-5`}>Connect your accounts and reply from one inbox.</h2>
              </div>
              <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
            </div>
            <ol className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-6">
                  <span className="font-mono text-[64px] font-semibold leading-none tracking-tighter text-primary/25">{i + 1}</span>
                  <div className="pt-2">
                    <p className="text-[19px] font-semibold tracking-tight">{s.t}</p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 · MEASURE: a dark strip with three columns */}
        <section className="bg-[#0f2a47] py-16 text-white lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className={`${EYEBROW} text-[#9ee6c8]`}>Measure it</p>
                <h2 className={`${H2} mt-4`}>Social support, reported like every other channel.</h2>
              </div>
              <Link href="/products/analytics/" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#9ee6c8] hover:underline">Agentic AI analytics <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul className="mt-10 grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
              {MEASURE.map((m) => (
                <li key={m.t} className="py-6 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
                  <m.Icon className="h-6 w-6 text-[#9ee6c8]" />
                  <p className="mt-4 text-[20px] font-semibold tracking-tight">{m.t}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{m.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />

        <ProductFinalCta
          title="Answer every social message from one inbox."
          subtitle="Bring Instagram and Messenger together and let the AI agent handle the routine."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Get a demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

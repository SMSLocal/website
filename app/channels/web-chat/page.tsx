import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Clock,
  Code2,
  Inbox,
  LifeBuoy,
  MousePointerClick,
  Palette,
  ShoppingBag,
  Sparkles,
  Tag,
  Timer,
  UserPlus,
  UserX,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ExploreMore } from "@/components/product/explore-more"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { WebChatHero } from "@/components/product/webchat-hero"

export const metadata: Metadata = getPageMetadata("/channels/web-chat")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const GAPS = [
  { Icon: Timer, moment: "A visitor stuck on a page", page: "They read the same page for a minute, have one question and leave without asking.", fix: "A proactive greeting opens the chat at that moment, so the question gets asked." },
  { Icon: Clock, moment: "A question at midnight", page: "The contact form promises a reply tomorrow, and the visitor has already gone.", fix: "Agentic AI answers from your knowledge base straight away, at any hour." },
  { Icon: UserX, moment: "A lead that leaves no trace", page: "The conversation ends and nobody knows who the visitor was.", fix: "A prechat form captures a name and email, and the chat is saved to their record." },
]

const STEPS = [
  { n: "01", t: "Add one script", d: "Paste a single script into your site. No pages are rebuilt." },
  { n: "02", t: "Brand the widget", d: "Set colours, position and the prechat form so it looks native." },
  { n: "03", t: "Connect your knowledge", d: "Add your help content and set the triggers that start a chat." },
  { n: "04", t: "Chats reach your inbox", d: "AI answers first, and your team joins from the shared inbox when needed." },
]

const WIDGET: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: MousePointerClick, t: "Proactive triggers", d: "Greet visitors by time on a page, scroll depth or the page they landed on." },
  { Icon: Bot, t: "Agentic AI answers", d: "Common questions are answered from your knowledge base, with a handoff to a person in the same thread." },
  { Icon: Palette, t: "Your brand, not ours", d: "Colours, position and the prechat form match your site." },
  { Icon: Code2, t: "An SDK for your app", d: "Embed the same chat inside your product so logged-in users get help without leaving." },
]

const USES: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: ShoppingBag, t: "Product pages", d: "Answer size, stock and delivery questions right where people decide." },
  { Icon: Tag, t: "Pricing pages", d: "Catch the visitor comparing plans and answer the question that stops them." },
  { Icon: LifeBuoy, t: "Help centre", d: "Offer a person or an AI answer when an article does not solve it." },
  { Icon: UserPlus, t: "Lead capture", d: "Ask for a name and email before the chat starts and keep the record." },
]

const INBOX = [
  { ch: "Web chat", c: "#0e9f6e", who: "Visitor on /classic-tee", msg: "Is M in stock?", t: "now" },
  { ch: "WhatsApp", c: "#16a34a", who: "Aman, +91 98••• ••210", msg: "Where is my order #1042?", t: "3 min" },
  { ch: "SMS", c: "#2f78bd", who: "+91 97••• ••455", msg: "Reply STOP to opt out", t: "11 min" },
]

const FAQ = [
  {
    q: "What is a website live chat widget?",
    a: "A website live chat widget is a small chat window on your site where visitors can ask questions and get answers in real time. With SMSLocal the widget is answered by an agentic AI first and hands off to your team when a person is needed.",
  },
  {
    q: "Can I customize the widget?",
    a: "Yes. Colors, position and prechat forms all match your brand, so the widget feels like a native part of your site, not a third-party plugin.",
  },
  {
    q: "Does AI answer in the widget?",
    a: "Yes. The agentic AI answers common questions instantly from your knowledge base, and hands off to an agent in the same thread when a conversation needs a person.",
  },
  {
    q: "How do I install the chat widget on my website?",
    a: "Add a single script to your site, brand the widget, connect your knowledge base and set your triggers. The widget goes live without rebuilding any pages, and chats arrive in your shared inbox.",
  },
  {
    q: "Can I start a chat proactively when a visitor is on a page?",
    a: "Yes. Proactive triggers let you greet visitors based on behavior, such as time on a page, scroll depth or the page they landed on, so the chat starts at the moment they are most likely to need help.",
  },
  {
    q: "Is there an in-app option, not just the website?",
    a: "Yes. The SDK embeds the same chat experience inside your product, so logged-in users get support without ever leaving the app.",
  },
  {
    q: "Can the chat capture leads?",
    a: "Yes. A prechat form can collect a visitor's name and email before the conversation starts, and the full chat is saved against their customer record.",
  },
  {
    q: "Do web chats show up with my WhatsApp and SMS conversations?",
    a: "Yes. Web chat lands in the same shared inbox as WhatsApp, SMS and voice, with one customer record, so your team never has to switch tools to see the full history.",
  },
]

const RELATED = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/channels/messenger/", label: "Facebook Messenger", hint: "Automated and AI-handled conversations" },
  { href: "/channels/social/", label: "Social media inbox", hint: "Instagram and Messenger in one place" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: Palette, label: "A widget that matches your brand" },
  { icon: Sparkles, label: "AI answers before an agent joins" },
  { icon: MousePointerClick, label: "Proactive triggers by behaviour" },
  { icon: Code2, label: "In-app SDK for your product" },
]

export default function WebChatPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Web Chat"
        description="A customizable website chat widget with agentic AI built in: it answers visitors instantly, fires proactive triggers, captures leads and embeds inside your product with an SDK."
        path="/channels/web-chat"
        category="Website Live Chat Widget"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Web Chat", path: "/channels/web-chat" },
        ]}
      />
      <FaqJsonLd items={FAQ} path="/channels/web-chat" />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a product page with a chat widget that greets, answers and saves the chat */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels &middot; Web Chat
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                A website live chat widget with <span className="text-primary">agentic AI built in.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                A customizable chat widget that greets visitors at the right moment, answers them instantly and turns the conversation into a lead.
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
              <WebChatHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: three moments on a website */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Where website visitors slip away</p>
              <h2 className={`${H2} mt-5`}>Most visitors have a question and never ask it.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">A visitor who cannot get an answer in the moment usually leaves. Three small gaps decide whether they stay.</p>
            </div>
            <div className="mt-12 divide-y divide-border border-y border-border">
              <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] gap-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:grid">
                <span>The moment</span><span>On a typical site</span><span className="text-primary">With SMSLocal</span>
              </div>
              {GAPS.map((g) => (
                <div key={g.moment} className="grid gap-2 py-6 md:grid-cols-[1.1fr_1.4fr_1.4fr] md:gap-6">
                  <p className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"><g.Icon className="h-5 w-5 text-primary" />{g.moment}</p>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">{g.page}</p>
                  <p className="text-[14.5px] font-medium leading-relaxed text-foreground">{g.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · SETUP: four steps from script to inbox */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Live in an afternoon</p>
              <h2 className={`${H2} mt-5`}>Add the widget without rebuilding a page.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">There is no new site to build. One script goes live, and chats arrive in the inbox your team already uses.</p>
            </div>
            <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
              <i aria-hidden className="absolute left-[6%] right-[6%] top-[19px] hidden h-[2px] bg-gradient-to-r from-primary to-[#2f78bd] md:block" />
              {STEPS.map((s) => (
                <li key={s.n} className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-[12.5px] font-semibold text-background ring-4 ring-background">{s.n}</span>
                  <p className="mt-4 text-[17px] font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · THE WIDGET: a dark band with four tools */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#7fdcb8]`}>What the widget does</p>
              <h2 className={`${H2} mt-5`}>It starts the chat, answers it and keeps the record.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">Everything a visitor sees looks like part of your site. Everything your team sees lives in one inbox.</p>
            </div>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {WIDGET.map((f) => (
                <li key={f.t} className="border-t border-white/20 pt-5">
                  <f.Icon className="h-5 w-5 text-[#7fdcb8]" />
                  <p className="mt-3 text-[17px] font-semibold">{f.t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · ONE INBOX: web chat beside WhatsApp and SMS */}
        <section className="bg-[#eef8f3] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#0b6b4c]`}>One shared inbox</p>
              <h2 className={`${H2} mt-5`}>Web chat sits beside every other channel.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">A visitor who chats on your site and later messages on WhatsApp is one person with one history. Your team sees both in the same place.</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-primary">
                <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-1.5 hover:underline">Omnichannel inbox <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/products/ai-agents/" className="inline-flex items-center gap-1.5 hover:underline">AI agents <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ul className="space-y-3">
              {INBOX.map((r) => (
                <li key={r.who} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_28px_-18px_rgba(11,107,76,.45)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: r.c }}><Inbox className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[14.5px] font-semibold"><span className="truncate">{r.who}</span><span className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold text-white" style={{ background: r.c }}>{r.ch}</span></p>
                    <p className="mt-0.5 truncate text-[13.5px] text-muted-foreground">{r.msg}</p>
                  </div>
                  <span className="shrink-0 text-[12px] text-muted-foreground">{r.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 · USES: where teams put the widget */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Where teams use it</p>
              <h2 className={`${H2} mt-5`}>Four places a chat widget earns its spot.</h2>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {USES.map((u) => (
                <li key={u.t} className="flex gap-4 border-t border-border pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f7f0] text-[#0b6b4c]"><u.Icon className="h-5 w-5" /></span>
                  <div>
                    <p className="text-[18px] font-semibold tracking-tight">{u.t}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{u.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />

        <ProductFinalCta
          title="Turn website visitors into conversations."
          subtitle="Add the widget, let the AI answer, and keep every chat in one inbox."
          primaryCta={{ label: "Get a demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start your trial", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Clock,
  Hand,
  Inbox,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  MoonStar,
  Package,
  Radio,
  Repeat,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ExploreMore } from "@/components/product/explore-more"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { MessengerHero } from "@/components/product/messenger-hero"

export const metadata: Metadata = getPageMetadata("/channels/messenger")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const GAPS = [
  { Icon: MoonStar, moment: "A message at 11 PM", page: "It sits in the Page inbox until morning, and the customer moves on.", fix: "A greeting and an instant answer go out, and the chat is waiting for your team." },
  { Icon: Repeat, moment: "The same question, again", page: "Someone types out the shipping answer for the twentieth time today.", fix: "The AI agent answers common questions from your FAQs, so nobody retypes them." },
  { Icon: Hand, moment: "A chat that needs a person", page: "The customer is asked to repeat everything to whoever picks it up.", fix: "The conversation moves to a teammate with the full history attached." },
]

const FLOW = [
  { n: "01", t: "A customer messages your Page", d: "The chat lands in the shared inbox the moment it is sent." },
  { n: "02", t: "The AI agent answers", d: "It replies from your catalog, order data and FAQs, within seconds." },
  { n: "03", t: "It hands over when it should", d: "Anything it cannot or should not decide is passed to a person." },
  { n: "04", t: "A teammate takes over", d: "They reply in the same thread, with the customer and order context beside it." },
]

const RUNS: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: Sparkles, t: "Greeting and away messages", d: "A welcome for first-time senders, and an away message outside working hours." },
  { Icon: MessageCircle, t: "Instant FAQ answers", d: "Shipping, returns, hours and prices answered without a person." },
  { Icon: Bot, t: "An AI agent", d: "The same agent that answers on WhatsApp, with the same handoff rules." },
  { Icon: Radio, t: "Opted-in broadcasts", d: "Send updates to subscribers who opted in, within Meta's messaging rules." },
]

const USES: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: Package, t: "Order status", d: "Answer where is my order from your order data, at any hour." },
  { Icon: LifeBuoy, t: "Customer support", d: "Route questions to the right team and keep the history in one thread." },
  { Icon: UserPlus, t: "New enquiries", d: "Greet people who message from an ad or your Page and qualify them before a person steps in." },
  { Icon: Megaphone, t: "Offers and updates", d: "Tell opted-in subscribers about launches and offers from the same campaign tool as WhatsApp." },
]

const INBOX = [
  { ch: "Messenger", c: "#0a7cff", who: "Sam K., Your Page", msg: "Can I change the delivery address?", t: "1 min" },
  { ch: "WhatsApp", c: "#16a34a", who: "Aman, +91 98••• ••210", msg: "Where is my order #1042?", t: "4 min" },
  { ch: "Instagram", c: "#ee2a7b", who: "@riya.styles", msg: "Is the classic tee in M?", t: "9 min" },
]

const FAQ = [
  {
    q: "Can I automate replies on Facebook Messenger?",
    a: "Yes. SMSLocal sends a greeting to first-time senders, an away message outside working hours and instant answers to your FAQs, so a Page inbox is covered even when nobody is watching it.",
  },
  {
    q: "Does the same AI agent that answers WhatsApp work on Messenger?",
    a: "Yes. Your AI agent runs across every connected channel, including WhatsApp, Messenger, Instagram and SMS, grounded in the same catalog, order and FAQ data, with the same handoff rules to a human agent.",
  },
  {
    q: "Can I broadcast to my Messenger subscribers?",
    a: "Yes, within Meta's Messenger messaging rules for opted-in subscribers. Broadcasts run from the same campaign tool as your WhatsApp and SMS sends, so you plan one calendar instead of three.",
  },
  {
    q: "What happens when a Messenger conversation needs a human?",
    a: "The AI agent hands the conversation to your team instantly, with the full message history and any customer or order context attached, so the human agent never starts from a blank screen.",
  },
  {
    q: "Do Messenger chats show up in the same inbox as our other channels?",
    a: "Yes. Messenger lands in the same shared inbox as WhatsApp, Instagram, SMS and email, with the same routing, assignment and reporting rules applied across channels.",
  },
  {
    q: "Can I connect more than one Facebook Page?",
    a: "Yes. If you manage several Pages, such as separate brands, regions or storefronts, connect them all and their Messenger conversations appear in one dashboard, so your team isn't logging in and out of different accounts.",
  },
  {
    q: "How do I connect Facebook Messenger to SMSLocal?",
    a: "Sign up, choose Messenger, log in with Facebook and approve access for your Page. Then set your greeting, add your FAQs and switch on the AI agent. You can add more Pages at any time.",
  },
]

const RELATED = [
  { href: "/channels/instagram/", label: "Instagram DM automation", hint: "DMs, story replies and comment-to-DM" },
  { href: "/channels/social/", label: "Social media inbox", hint: "Instagram and Messenger in one place" },
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MessageCircle, label: "Automated replies and FAQ answers" },
  { icon: Bot, label: "AI agent with human handoff" },
  { icon: Radio, label: "Broadcasts to opted-in subscribers" },
  { icon: Inbox, label: "One inbox with WhatsApp and Instagram" },
]

export default function MessengerPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Facebook Messenger Business Messaging"
        description="Facebook Messenger business messaging in the same shared inbox as WhatsApp and SMS: automated replies, AI agent handoff, broadcasts to opted-in subscribers and unified reporting."
        path="/channels/messenger"
        category="Facebook Messenger Business Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Messenger", path: "/channels/messenger" },
        ]}
      />
      <FaqJsonLd items={FAQ} path="/channels/messenger" />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a Messenger chat where the AI answers first and a person takes over */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels &middot; Facebook Messenger
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Facebook Messenger business messaging, <span className="text-primary">handled like WhatsApp.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Auto-reply to common questions, hand off to a person when it matters, and broadcast to opted-in subscribers, all from the same inbox as your other channels.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Connect Messenger <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <MessengerHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: three moments in a Page inbox */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Where Messenger chats go wrong</p>
              <h2 className={`${H2} mt-5`}>A Page inbox is easy to ignore, and costly when you do.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Customers still use Messenger to ask about orders, prices and problems. Three moments decide whether they get an answer or go elsewhere.</p>
            </div>
            <div className="mt-12 divide-y divide-border border-y border-border">
              <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] gap-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:grid">
                <span>The moment</span><span>In the Page inbox</span><span className="text-primary">With SMSLocal</span>
              </div>
              {GAPS.map((g) => (
                <div key={g.moment} className="grid gap-2 py-6 md:grid-cols-[1.1fr_1.4fr_1.4fr] md:gap-6">
                  <p className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"><g.Icon className="h-5 w-5 text-[#0a7cff]" />{g.moment}</p>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">{g.page}</p>
                  <p className="text-[14.5px] font-medium leading-relaxed text-foreground">{g.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · THE HANDOFF: four steps from message to teammate */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>AI to human handoff</p>
              <h2 className={`${H2} mt-5`}>The agent answers first. A person takes over when it matters.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">The customer stays in one thread the whole time. Your team never starts from a blank screen.</p>
            </div>
            <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
              <i aria-hidden className="absolute left-[6%] right-[6%] top-[19px] hidden h-[2px] bg-gradient-to-r from-[#0a7cff] to-[#a033ff] md:block" />
              {FLOW.map((s) => (
                <li key={s.n} className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-[12.5px] font-semibold text-background ring-4 ring-background">{s.n}</span>
                  <p className="mt-4 text-[17px] font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · WHAT RUNS ON YOUR PAGE: a dark band with four tools */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#9ec9ff]`}>What runs on your Page</p>
              <h2 className={`${H2} mt-5`}>Set it up once and your Page answers on its own.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">Connect your Page, add your FAQs and switch on the agent. Your team keeps control of every chat that needs a person.</p>
            </div>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {RUNS.map((f) => (
                <li key={f.t} className="border-t border-white/20 pt-5">
                  <f.Icon className="h-5 w-5 text-[#9ec9ff]" />
                  <p className="mt-3 text-[17px] font-semibold">{f.t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · ONE INBOX: Messenger beside WhatsApp and Instagram, across several Pages */}
        <section className="bg-[#f1f6ff] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#0a63cf]`}>One shared inbox</p>
              <h2 className={`${H2} mt-5`}>Messenger is a channel, not a separate job.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">Messenger chats arrive beside WhatsApp, Instagram and SMS with the same routing, assignment and reporting. Manage several Facebook Pages from one dashboard.</p>
              <ul className="mt-6 space-y-2.5 text-[14.5px] text-foreground/80">
                {[{ Icon: Users, t: "Assign chats to the right team" }, { Icon: Clock, t: "See reply times across every channel" }].map((x) => (
                  <li key={x.t} className="flex items-center gap-2.5"><x.Icon className="h-4 w-4 text-[#0a63cf]" />{x.t}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-primary">
                <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-1.5 hover:underline">Omnichannel inbox <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/products/ai-agents/" className="inline-flex items-center gap-1.5 hover:underline">AI agents <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ul className="space-y-3">
              {INBOX.map((r) => (
                <li key={r.who} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_28px_-18px_rgba(10,99,207,.45)]">
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

        {/* 6 · USES: what teams use Messenger for */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>What teams use it for</p>
              <h2 className={`${H2} mt-5`}>Four jobs your Messenger inbox can take on.</h2>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {USES.map((u) => (
                <li key={u.t} className="flex gap-4 border-t border-border pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf2ff] text-[#0a63cf]"><u.Icon className="h-5 w-5" /></span>
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
          title="Answer every Messenger chat, automatically."
          subtitle="Let the agent handle the routine and hand the rest to your team."
          primaryCta={{ label: "Connect Messenger", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

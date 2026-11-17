import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Camera,
  Check,
  Gift,
  Inbox,
  MessageCircle,
  MessagesSquare,
  Moon,
  Package,
  Reply,
  ShoppingBag,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { InstagramHero } from "@/components/product/instagram-hero"

export const metadata: Metadata = getPageMetadata("/channels/instagram")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const LEAKS = [
  { Icon: MessageCircle, moment: "A comment on a reel", app: "“price?” sits in a thread of 200 comments and nobody replies.", fix: "A keyword turns the comment into a DM with the price and a link." },
  { Icon: Reply, moment: "A reply to a story", app: "It lands in the native app, mixed in with likes and mentions.", fix: "The reply opens a conversation in your shared inbox and gets an instant answer." },
  { Icon: Moon, moment: "A DM at 11 PM", app: "It waits until the morning, and the customer buys somewhere else.", fix: "The AI agent answers right away and passes it to your team if needed." },
]

const STEPS = [
  { n: "01", t: "A customer reacts", d: "They comment a keyword on a post or reel, or reply to your story." },
  { n: "02", t: "A DM opens", d: "The conversation moves to the inbox with the customer's profile attached." },
  { n: "03", t: "The agent answers", d: "Your AI agent replies from your catalog and FAQs, and can share a product card." },
  { n: "04", t: "Your team steps in", d: "Anything it cannot answer goes to a person, with the full chat in view." },
]

const INSIDE: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: Bot, t: "An AI agent for Instagram", d: "Answers sizing, shipping, returns and order questions using the same knowledge as on WhatsApp." },
  { Icon: MessagesSquare, t: "Quick replies", d: "Saved answers your team can send in one tap, and greeting messages for first-time senders." },
  { Icon: ShoppingBag, t: "Product cards", d: "Share a product with its price and link inside the conversation so the customer can buy from the DM." },
  { Icon: UserCheck, t: "Human handoff", d: "Hand a chat to a person at any point without the customer repeating themselves." },
]

const USES: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: Sparkles, t: "Product drops and launches", d: "Ask people to comment a keyword on the launch post and send each of them the link." },
  { Icon: Package, t: "Size, shipping and returns", d: "Answer the same few questions instantly, at any hour." },
  { Icon: Gift, t: "Giveaways and contests", d: "Let a keyword comment enter people and open a chat to collect the details." },
  { Icon: Camera, t: "Story-driven sales", d: "Turn replies to a story into conversations about the product they just saw." },
]

const INBOX = [
  { ch: "Instagram", c: "#ee2a7b", who: "@riya.styles", msg: "Is the classic tee in M?", t: "2 min" },
  { ch: "WhatsApp", c: "#16a34a", who: "Aman, +91 98••• ••210", msg: "Where is my order #1042?", t: "5 min" },
  { ch: "SMS", c: "#2f78bd", who: "+91 97••• ••455", msg: "Reply STOP to opt out", t: "12 min" },
]

const FAQS = [
  { q: "Can I automate replies to Instagram comments and story replies?", a: "Yes. Set a trigger keyword such as PRICE, LINK or SIZE, or capture every story reply, and the customer is moved into a DM where an automation or your AI agent takes over." },
  { q: "Does the same AI agent work on Instagram and WhatsApp?", a: "Yes. Your AI agent runs across the channels you connect, using the same catalog, order and FAQ data, and hands over to a person when needed." },
  { q: "Can customers buy from a DM?", a: "You can share a product from your catalog in a reply, so the customer sees the price and a direct link without leaving Instagram." },
  { q: "Do Instagram DMs land in the same inbox as WhatsApp and SMS?", a: "Yes. They arrive in one shared inbox with the same routing, assignment and reporting as every other channel." },
  { q: "Are there limits on when I can message a customer on Instagram?", a: "Meta's messaging rules apply. In general you can reply to a customer within a limited window after their latest message, which is why quick automated answers matter." },
  { q: "Do I need a business account?", a: "Yes. Instagram business messaging works with an Instagram professional (business or creator) account that you connect to SMSLocal." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MessageCircle, label: "Comment-to-DM and story-reply automation" },
  { icon: Bot, label: "AI agent replies on Instagram" },
  { icon: Inbox, label: "One inbox with WhatsApp and SMS" },
  { icon: ShoppingBag, label: "Product cards inside the chat" },
]

export default function InstagramPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Instagram Business Messaging"
        description="Instagram business messaging in the same shared inbox as WhatsApp and SMS: DM automation, story-reply and comment-to-DM flows, AI agent replies and product cards for D2C brands."
        path="/channels/instagram"
        category="Instagram Business Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "Instagram", path: "/channels/instagram" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: an Instagram DM conversation beside what SMSLocal does for the brand */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels &middot; Instagram
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Instagram business messaging, <span className="text-primary">answered like WhatsApp.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Turn story replies and comments into DMs, let your AI agent answer them, and manage every conversation in the same inbox as WhatsApp and SMS.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Connect Instagram <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <InstagramHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: three moments, what happens in the app and with SMSLocal */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Where Instagram sales get lost</p>
              <h2 className={`${H2} mt-5`}>Intent shows up in the comments, and it does not wait.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">For most D2C brands, Instagram is where discovery turns into a question. If that question lands in the native app with no team behind it, the sale ends before it starts.</p>
            </div>
            <div className="mt-12 divide-y divide-border border-y border-border">
              <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] gap-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:grid">
                <span>The moment</span><span>In the Instagram app</span><span className="text-primary">With SMSLocal</span>
              </div>
              {LEAKS.map((l) => (
                <div key={l.moment} className="grid gap-2 py-6 md:grid-cols-[1.1fr_1.4fr_1.4fr] md:gap-6">
                  <p className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"><l.Icon className="h-5 w-5 text-[#ee2a7b]" />{l.moment}</p>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">{l.app}</p>
                  <p className="text-[14.5px] font-medium leading-relaxed text-foreground">{l.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · COMMENT TO DM: four steps on a line, with the keywords */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className={`${EYEBROW} text-primary`}>Comment to DM</p>
                <h2 className={`${H2} mt-5`}>From a keyword in a comment to an answer in the DM.</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Pick the words you want to listen for. Anyone who uses them is pulled into a conversation, so nobody has to dig through a comments thread to find a buyer.</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {["PRICE", "LINK", "SIZE", "DROP"].map((k) => <li key={k} className="rounded-full px-4 py-1.5 font-mono text-[12.5px] font-semibold text-white" style={{ background: "linear-gradient(45deg, #f09433, #ee2a7b 55%, #6228d7)" }}>{k}</li>)}
              </ul>
            </div>
            <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
              <i aria-hidden className="absolute left-[6%] right-[6%] top-[19px] hidden h-[2px] bg-gradient-to-r from-[#f09433] via-[#ee2a7b] to-[#6228d7] md:block" />
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

        {/* 4 · INSIDE THE DM: a dark band, four tools */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#ff8ec1]`}>Inside the DM</p>
              <h2 className={`${H2} mt-5`}>Everything your team needs once the chat opens.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">Automation handles the routine, and your team keeps control of the conversations that matter.</p>
            </div>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {INSIDE.map((f) => (
                <li key={f.t} className="border-t border-white/20 pt-5">
                  <f.Icon className="h-5 w-5 text-[#ff8ec1]" />
                  <p className="mt-3 text-[17px] font-semibold">{f.t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · ONE INBOX: Instagram next to WhatsApp and SMS */}
        <section className="bg-[#fdf2f8] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#c1236c]`}>One shared inbox</p>
              <h2 className={`${H2} mt-5`}>Instagram is a channel, not a separate job.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">Your team should not log in to a different app for every channel. Instagram DMs arrive beside WhatsApp and SMS, with the same customer profile and the same AI agent.</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-primary">
                <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-1.5 hover:underline">Omnichannel inbox <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/products/ai-agents/" className="inline-flex items-center gap-1.5 hover:underline">AI agents <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ul className="space-y-3">
              {INBOX.map((r) => (
                <li key={r.who} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_28px_-18px_rgba(193,35,108,.45)]">
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

        {/* 6 · USE CASES: a quiet grid of what brands do with it */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Built for D2C brands</p>
              <h2 className={`${H2} mt-5`}>What brands use Instagram messaging for.</h2>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {USES.map((u) => (
                <li key={u.t} className="flex gap-4 border-t border-border pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdf2f8] text-[#c1236c]"><u.Icon className="h-5 w-5" /></span>
                  <div>
                    <p className="text-[18px] font-semibold tracking-tight">{u.t}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{u.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-12 flex items-center gap-2 text-[14px] text-muted-foreground"><Check className="h-4 w-4 text-primary" strokeWidth={3} />Works with an Instagram professional account connected to SMSLocal.</p>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/channels/instagram" />
        <FaqSection items={FAQS} />

        <section className="bg-background pb-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Related</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium text-primary">
              {[
                { href: "/channels/whatsapp/", label: "WhatsApp Business" },
                { href: "/channels/messenger/", label: "Facebook Messenger" },
                { href: "/products/analytics/", label: "Analytics" },
              ].map((l) => <li key={l.href}><Link href={l.href} className="inline-flex items-center gap-1.5 hover:underline">{l.label}<ArrowRight className="h-3.5 w-3.5" /></Link></li>)}
            </ul>
          </div>
        </section>

        <ProductFinalCta
          title="Answer every Instagram DM, automatically."
          subtitle="Turn comments and story replies into conversations, and sell straight from the chat."
          primaryCta={{ label: "Connect Instagram", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}

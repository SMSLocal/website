import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Camera,
  Check,
  Clock,
  Gem,
  Dumbbell,
  Home,
  Inbox,
  MessageCircle,
  Plug,
  Shirt,
  ShoppingBag,
  Sparkles,
  Tag,
  UserCheck,
  UtensilsCrossed,
  X,
  Zap,
  SlidersHorizontal,
  Rocket,
} from "lucide-react"

// Bespoke sections for /channels/instagram (everything below the hero stats). Every section has its own layout and
// its own hand-built art, and none of them reuses the shared product-page blocks or the WhatsApp page's designs.

const TEAL = "var(--primary)"
const NAVY = "var(--foreground)"
const AMBER = "oklch(0.85 0.14 80)"

const CSS = `
@keyframes igs-flow { to { stroke-dashoffset: -28 } }
@keyframes igs-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
@keyframes igs-ring { to { transform: rotate(360deg) } }
@keyframes igs-ping { 0% { transform: scale(1); opacity: .7 } 100% { transform: scale(1.5); opacity: 0 } }
@keyframes igs-blink { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.igs-flow { animation: igs-flow 1.6s linear infinite }
.igs-bob { animation: igs-bob 5s ease-in-out infinite }
.igs-ring { animation: igs-ring 14s linear infinite }
.igs-ping { animation: igs-ping 2.4s ease-out infinite }
.igs-blink { animation: igs-blink 2.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .igs-flow, .igs-bob, .igs-ping, .igs-ring, .igs-blink { animation: none } }
`

export function InstagramStyles() {
  return <style>{CSS}</style>
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  )
}

const H2 = "text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[38px]"

/* ───────────── 1. PROBLEM: the same inbox, before and after ───────────── */

const INBOX = [
  { n: "meera.k", m: "Does this come in size M?", ago: "2 days ago", ai: "Size M is in stock. Link sent." },
  { n: "arjun.s", m: "price? link pls", ago: "1 day ago", ai: "Price and product link sent." },
  { n: "neha.r", m: "When will my order arrive?", ago: "9 hours ago", ai: "Arrives Thursday. Tracking sent." },
  { n: "rahul.d", m: "Can I exchange this?", ago: "5 hours ago", ai: "Yes, 7-day exchange. Label sent." },
]

function Avatar({ name, tone }: { name: string; tone: "warn" | "ok" }) {
  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${tone === "warn" ? "bg-accent/50 text-foreground" : "bg-primary/15 text-primary"}`}>
      {name[0].toUpperCase()}
    </span>
  )
}

function InboxBeforeAfter() {
  return (
    <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-5">
      {/* before */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-3">
          <span className="text-[13px] font-semibold">Native Instagram app</span>
          <span className="rounded-full bg-accent/50 px-2.5 py-0.5 text-[11px] font-bold">4 unanswered</span>
        </div>
        <ul className="divide-y divide-border">
          {INBOX.map((r) => (
            <li key={r.n} className="flex items-start gap-3 px-4 py-3.5">
              <Avatar name={r.n} tone="warn" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold">{r.n}</p>
                <p className="truncate text-[13px] text-muted-foreground">{r.m}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-foreground/70"><Clock className="h-3 w-3" />Seen {r.ago}, no reply</p>
              </div>
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      </div>

      <span className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg sm:flex">
        <ArrowRight className="h-5 w-5" />
      </span>

      {/* after */}
      <div className="overflow-hidden rounded-3xl border border-primary/40 bg-card shadow-[0_24px_60px_-34px_oklch(0.62_0.14_168/0.7)]">
        <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
          <span className="text-[13px] font-semibold">SMSLocal shared inbox</span>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold">0 waiting</span>
        </div>
        <ul className="divide-y divide-border">
          {INBOX.map((r) => (
            <li key={r.n} className="flex items-start gap-3 px-4 py-3.5">
              <Avatar name={r.n} tone="ok" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold">{r.n}</p>
                <p className="truncate text-[13px] text-muted-foreground">{r.m}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary"><Bot className="h-3 w-3" />{r.ai}</p>
              </div>
              <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function InstagramProblem() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Your customers are DMing you on Instagram. Is anyone watching?</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">
            For most D2C brands, Instagram is where discovery turns into intent. Someone replies to a story, comments
            “price?” on a reel or DMs a sizing question. If it lands in the native app with no team behind it, the sale
            is gone before it starts.
          </p>
        </div>
        <div className="mt-12">
          <InboxBeforeAfter />
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {["Story replies and comments get buried", "Replies take hours, buyers move on", "Instagram lives apart from WhatsApp and SMS"].map((t) => (
            <li key={t} className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 text-[13.5px] font-medium">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/50"><X className="h-3 w-3" strokeWidth={3} /></span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────── 2. FEATURES: framed stages with floating chips ───────────── */

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`igs-bob absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-semibold shadow-lg ${className}`}>
      {children}
    </span>
  )
}

function Frame({ children, chips }: { children: ReactNode; chips: ReactNode }) {
  return (
    <div className="relative h-full">
      <div aria-hidden className="absolute -inset-3 -z-10 rounded-[40px] bg-gradient-to-br from-primary/15 via-transparent to-accent/25" />
      <div aria-hidden className="absolute inset-0 -z-10 rounded-[32px] opacity-60 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
      <div className="flex h-full flex-col justify-center rounded-[32px] border border-border bg-card/70 p-5 backdrop-blur sm:p-7"><div>{children}</div></div>
      {chips}
    </div>
  )
}

function ChatHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/channels/instagram.svg" alt="" width={34} height={34} />
      <div>
        <p className="flex items-center gap-1 text-[14px] font-semibold">{title}<BadgeCheck className="h-4 w-4 fill-primary text-white" /></p>
        <p className="text-[11.5px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

function MockDm() {
  return (
    <Frame chips={<><Chip className="-right-2 -top-4"><Zap className="h-3.5 w-3.5 fill-primary text-primary" />Auto-reply in 2s</Chip><Chip className="-bottom-4 left-6" ><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />Routed to Sizing</Chip></>}>
      <ChatHeader title="Your Store" sub="Instagram · Direct message" />
      <div className="space-y-3">
        <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-[13.5px]">Hi! Welcome to the store. What do you need help with?</p>
        <div className="flex flex-wrap gap-2 pl-1">
          {["Sizing", "Shipping", "Returns", "Talk to a person"].map((c, i) => (
            <span key={c} className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-primary/40 bg-card text-primary"}`}>{c}</span>
          ))}
        </div>
        <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-primary px-4 py-2.5 text-[13.5px] text-primary-foreground">Size M is in stock. Want the link?</p>
      </div>
    </Frame>
  )
}

function MockComment() {
  return (
    <Frame chips={<><Chip className="-left-2 -top-4"><Camera className="h-3.5 w-3.5 text-primary" />Reel · 2.4k views</Chip><Chip className="-bottom-4 right-6"><Zap className="h-3.5 w-3.5 fill-primary text-primary" />DM sent automatically</Chip></>}>
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-border bg-muted/60 p-4">
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/25 to-accent/40" />
          <div className="mt-3 space-y-2 text-[13px]">
            <p><b>meera.k</b> PRICE</p>
            <p><b>arjun.s</b> LINK pls</p>
          </div>
        </div>
        <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-primary sm:rotate-0" />
        <div className="space-y-2.5">
          {["Hi Meera! Here is the price and link.", "Hi Arjun! Here is the link."].map((t) => (
            <p key={t} className="rounded-2xl rounded-bl-sm bg-primary/10 px-3.5 py-2.5 text-[12.5px] font-medium">{t}</p>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function MockAgent() {
  return (
    <Frame chips={<><Chip className="-right-2 -top-4"><BadgeCheck className="h-3.5 w-3.5 text-primary" />Same answer everywhere</Chip><Chip className="-bottom-4 left-6"><UserCheck className="h-3.5 w-3.5 text-primary" />Hands off to a person</Chip></>}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="space-y-3">
          {[{ n: "Instagram", i: "/logos/channels/instagram.svg", q: "Size M?" }, { n: "WhatsApp", i: "/logos/channels/whatsapp.svg", q: "Where is my order?" }].map((c) => (
            <div key={c.n} className="rounded-2xl bg-muted/70 p-3">
              <div className="flex items-center gap-2 text-[12.5px] font-semibold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.i} alt="" width={20} height={20} />{c.n}
              </div>
              <p className="mt-1.5 text-[12.5px] text-muted-foreground">“{c.q}”</p>
            </div>
          ))}
        </div>
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-foreground text-background shadow-xl">
          <span aria-hidden className="igs-ping absolute inset-0 rounded-3xl border-2 border-primary" />
          <Bot className="h-10 w-10" />
        </div>
        <div className="space-y-3">
          {["Catalog", "Order data", "FAQs"].map((k) => (
            <p key={k} className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2 text-[12.5px] font-semibold text-primary"><Check className="h-3.5 w-3.5" strokeWidth={3} />{k}</p>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function MockProduct() {
  return (
    <Frame chips={<><Chip className="-left-2 -top-4"><Tag className="h-3.5 w-3.5 text-primary" />Tagged in the DM</Chip><Chip className="-bottom-4 right-6"><ShoppingBag className="h-3.5 w-3.5 text-primary" />Checkout in 1 tap</Chip></>}>
      <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-[13.5px]">Here it is. Size M is ready to ship.</p>
      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/30">
          <Shirt className="h-14 w-14 text-primary" strokeWidth={1.6} />
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent shadow"><Tag className="h-4 w-4" /></span>
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold">Linen Shirt</p>
          <p className="text-[13.5px] text-muted-foreground">₹1,499 · Size M · In stock</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-4 py-2 text-[12.5px] font-semibold text-primary-foreground">View product</span>
            <span className="rounded-full border border-primary/40 px-4 py-2 text-[12.5px] font-semibold text-primary">Buy now</span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

const FEATURES: { n: string; icon: typeof MessageCircle; title: string; body: string; points: string[]; mock: ReactNode }[] = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Instagram DM automation",
    body: "Auto-replies, greetings and quick-reply buttons answer common questions without waiting on a human.",
    points: ["Greeting and away messages", "Quick replies for sizing and returns"],
    mock: <MockDm />,
  },
  {
    n: "02",
    icon: Camera,
    title: "Story-reply and comment-to-DM automation",
    body: "Comment PRICE, LINK or SIZE on a post, or reply to a story, and a DM starts automatically.",
    points: ["Keyword triggers on posts and reels", "Story replies become conversations"],
    mock: <MockComment />,
  },
  {
    n: "03",
    icon: Bot,
    title: "An AI agent that also runs your WhatsApp",
    body: "One AI agent answers Instagram and WhatsApp from your catalog and order data.",
    points: ["One knowledge base, every channel", "Human handoff with full context"],
    mock: <MockAgent />,
  },
  {
    n: "04",
    icon: Tag,
    title: "Catalog and product tagging in the DM",
    body: "Tag products in a reply so customers see price and a buy link without leaving the chat.",
    points: ["Product cards inside the chat", "A short path to checkout"],
    mock: <MockProduct />,
  },
]

export function InstagramFeatures() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What you get</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Every Instagram touchpoint, covered</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">From a story reply to a closed sale, without switching apps.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {FEATURES.map((f) => (
              <span key={f.n} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12.5px] font-medium"><f.icon className="h-3.5 w-3.5 text-primary" />{f.title.split(" and ")[0].replace("An AI agent that also runs your WhatsApp", "AI agent")}</span>
            ))}
          </div>
        </div>
        <div className="mt-16 space-y-16 lg:space-y-20">
          {FEATURES.map((f, i) => (
            <div key={f.n} className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch lg:gap-16">
              <div className={`flex flex-col justify-center ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="text-[56px] font-semibold leading-none tracking-tight text-primary/20">{f.n}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.55_0.13_172)] text-primary-foreground shadow-lg shadow-primary/30"><f.icon className="h-5 w-5" /></span>
                </div>
                <h3 className="mt-5 text-balance text-2xl font-semibold tracking-tight sm:text-[30px] sm:leading-[1.15]">{f.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">{f.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14.5px] font-medium">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} /></span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`py-4 ${i % 2 ? "lg:order-1" : ""}`}>{f.mock}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 3. STEPS: a flow board of four mini screens ───────────── */

function StepScreen({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/channels/instagram.svg" alt="" width={32} height={32} />
          <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold">@yourstore</p><p className="text-[11.5px] text-muted-foreground">Professional account</p></div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
        </div>
        <p className="rounded-xl bg-primary/10 px-3 py-2 text-[12px] font-semibold text-primary">Connected through Meta</p>
      </div>
    )
  }
  if (i === 1) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {["PRICE", "LINK", "SIZE"].map((k) => <span key={k} className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-[12px] font-bold tracking-wide text-primary">{k}</span>)}
        </div>
        <p className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-[12px] font-medium"><Camera className="h-3.5 w-3.5" />Story replies on</p>
      </div>
    )
  }
  if (i === 2) {
    return (
      <div className="space-y-2">
        {[["Catalog", "w-[92%]"], ["FAQs", "w-[78%]"], ["Policies", "w-[64%]"]].map(([k, w]) => (
          <div key={k}>
            <p className="text-[11.5px] font-semibold">{k}</p>
            <div className="mt-1 h-2 rounded-full bg-muted"><div className={`h-2 rounded-full bg-primary ${w}`} /></div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-3">
      <div className="flex h-14 items-end gap-1.5">
        {[30, 48, 40, 62, 54, 78, 92].map((h) => <span key={h} className="flex-1 rounded-t-md bg-primary/70" style={{ height: `${h}%` }} />)}
      </div>
      <p className="flex items-center gap-2 text-[12px] font-semibold text-primary"><Zap className="h-3.5 w-3.5 fill-primary" />Replies in seconds</p>
    </div>
  )
}

const STEPS = [
  { icon: Plug, t: "Connect Instagram", d: "Link your Instagram professional account through Meta. SMSLocal handles the messaging API setup." },
  { icon: SlidersHorizontal, t: "Set triggers", d: "Choose the keywords, story replies and greetings that should start a DM." },
  { icon: Bot, t: "Train the AI agent", d: "Point it at your FAQs, catalog and policies so it answers in your brand's voice." },
  { icon: Rocket, t: "Go live and sell", d: "Reply from one inbox, tag products in the chat and track every conversation." },
]

export function InstagramSteps() {
  return (
    <section className="border-y border-border bg-muted/50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Set up Instagram DM automation in four steps</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Most teams go from connected account to live automation in a single working session.</p>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative">
              <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card pt-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center justify-between bg-foreground px-5 py-3 text-background">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">Step {i + 1}</span>
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="p-5">
                  <div className="min-h-[104px] rounded-2xl bg-muted/50 p-4"><StepScreen i={i} /></div>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </div>
              {i < 3 && (
                <span aria-hidden className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md lg:flex"><ArrowRight className="h-4 w-4" /></span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────── 4. USE CASES: rich cards with a live chat preview ───────────── */

const TILES: { icon: typeof Shirt; t: string; blurb: string; q: string; a: string; tags: string[] }[] = [
  { icon: Shirt, t: "Fashion & apparel", blurb: "Sizing, fit and restock questions on every post.", q: "Does this come in size M?", a: "Yes! Size M is in stock. Here is the link.", tags: ["Size guide", "Stock check", "Product link"] },
  { icon: Sparkles, t: "Beauty & skincare", blurb: "Shade, ingredient and routine advice at scale.", q: "Which shade suits me?", a: "Try Warm Beige. Here is our shade finder.", tags: ["Shade finder", "Ingredients", "Routine tips"] },
  { icon: Gem, t: "Jewellery", blurb: "Variants, pricing and custom requests in one thread.", q: "Can I see this in gold?", a: "Of course. Here it is in 18k gold.", tags: ["Variants", "Price list", "Gift wrap"] },
  { icon: UtensilsCrossed, t: "Food & beverage", blurb: "Menus, delivery slots and order tracking.", q: "Do you deliver tomorrow?", a: "Yes, slots at 10 AM and 6 PM are open.", tags: ["Menu", "Delivery slots", "Tracking"] },
  { icon: Home, t: "Home & decor", blurb: "Dimensions, materials and delivery for bulky items.", q: "What are the dimensions?", a: "120 × 60 cm. Photos and a buy link below.", tags: ["Specs", "Photos", "Buy link"] },
  { icon: Dumbbell, t: "Fitness & wellness", blurb: "Plans, timings and bookings straight from a story reply.", q: "How do I join the class?", a: "Pick a slot here and you are booked.", tags: ["Plans", "Timings", "Booking"] },
]

export function InstagramUseCases() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Eyebrow>Use cases</Eyebrow>
            <h2 className={`mt-4 ${H2}`}>Instagram business messaging for D2C brands</h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Whatever you sell on Instagram, the questions repeat. Let the AI agent and quick replies answer them in seconds.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t, i) => (
            <article
              key={t.t}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_60px_-30px_oklch(0.62_0.14_168/0.55)]"
            >
              {/* header */}
              <div className="relative overflow-hidden px-6 pb-5 pt-6" style={{ background: i % 2 ? "linear-gradient(135deg, color-mix(in oklch, var(--accent) 38%, var(--card)), var(--card))" : "linear-gradient(135deg, color-mix(in oklch, var(--primary) 16%, var(--card)), var(--card))" }}>
                <t.icon aria-hidden className="absolute -right-4 -top-4 h-28 w-28 text-foreground/[0.06] transition duration-500 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1.2} />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg"><t.icon className="h-5 w-5" /></span>
                <h3 className="relative mt-4 text-[19px] font-semibold tracking-tight">{t.t}</h3>
                <p className="relative mt-1 text-[13.5px] leading-snug text-muted-foreground">{t.blurb}</p>
              </div>
              {/* live chat preview */}
              <div className="flex flex-1 flex-col gap-2.5 px-6 py-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logos/channels/instagram.svg" alt="" width={16} height={16} />Instagram DM
                </div>
                <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-[13.5px]">{t.q}</p>
                <p className="ml-auto flex max-w-[88%] items-start gap-2 rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-[13.5px] text-primary-foreground">
                  <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0" />{t.a}
                </p>
              </div>
              {/* footer */}
              <div className="flex flex-wrap items-center gap-1.5 border-t border-border bg-muted/40 px-6 py-3.5">
                {t.tags.map((g) => (
                  <span key={g} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11.5px] font-medium">{g}</span>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary"><Zap className="h-3 w-3 fill-primary" />2s reply</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── 5. WHY IT WORKS (dark): channels merge into one agent ───────────── */

function Merge() {
  const lanes = [
    { y: 64, n: "Instagram", m: "“Does this come in size M?”", i: "/logos/channels/instagram.svg" },
    { y: 176, n: "WhatsApp", m: "“Where is my order?”", i: "/logos/channels/whatsapp.svg" },
    { y: 288, n: "SMS", m: "“Is my delivery OTP valid?”", i: "" },
  ]
  const outs = [
    { y: 64, t: "Answered in 2s" },
    { y: 176, t: "Assigned to team" },
    { y: 288, t: "Order tagged" },
  ]
  return (
    <svg viewBox="0 0 640 400" className="h-auto w-full" role="img" aria-label="Instagram, WhatsApp and SMS messages flow into one AI agent and shared inbox, which answers them, assigns them and tags orders">
      <defs>
        <linearGradient id="igs-hub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="oklch(0.9 0.04 175)" /></linearGradient>
        <filter id="igs-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      {/* paths in */}
      {lanes.map((l, i) => (
        <g key={l.n}>
          <path id={`igs-in-${i}`} d={`M178 ${l.y} C 250 ${l.y}, 250 176, 300 176`} fill="none" stroke={TEAL} strokeOpacity=".35" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" className="igs-flow" />
          <circle r="5" fill={AMBER}><animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.7}s`}><mpath href={`#igs-in-${i}`} /></animateMotion></circle>
        </g>
      ))}
      {/* paths out */}
      {outs.map((o, i) => (
        <g key={o.t}>
          <path id={`igs-out-${i}`} d={`M388 176 C 430 176, 430 ${o.y}, 462 ${o.y}`} fill="none" stroke={TEAL} strokeOpacity=".35" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" className="igs-flow" />
          <circle r="5" fill={TEAL}><animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5 + 1}s`}><mpath href={`#igs-out-${i}`} /></animateMotion></circle>
        </g>
      ))}

      {/* source cards */}
      {lanes.map((l) => (
        <g key={l.n}>
          <rect x="8" y={l.y - 34} width="170" height="68" rx="20" fill="#fff" fillOpacity=".07" stroke="#fff" strokeOpacity=".22" />
          {l.i ? <image href={l.i} x="22" y={l.y - 24} width="26" height="26" /> : <g><rect x="22" y={l.y - 24} width="26" height="26" rx="8" fill={AMBER} /><text x="35" y={l.y - 5} textAnchor="middle" fontSize="15" fontWeight="800" fill="oklch(0.18 0.02 230)">S</text></g>}
          <text x="58" y={l.y - 5} fontSize="13.5" fontWeight="700" fill="#fff">{l.n}</text>
          <text x="22" y={l.y + 22} fontSize="11" fill="#fff" fillOpacity=".65">{l.m}</text>
          <circle cx="164" cy={l.y - 18} r="5" fill={AMBER} className="igs-blink" />
        </g>
      ))}

      {/* hub */}
      <circle cx="344" cy="176" r="86" fill={TEAL} opacity=".28" filter="url(#igs-glow)" />
      <circle cx="344" cy="176" r="62" fill="none" stroke={TEAL} strokeOpacity=".5" strokeWidth="2"><animate attributeName="r" values="58;86" dur="2.6s" repeatCount="indefinite" /><animate attributeName="stroke-opacity" values=".6;0" dur="2.6s" repeatCount="indefinite" /></circle>
      <rect x="298" y="130" width="92" height="92" rx="28" fill="url(#igs-hub)" />
      <rect x="318" y="148" width="52" height="36" rx="13" fill="oklch(0.18 0.02 230)" />
      <circle cx="333" cy="166" r="5" fill={TEAL} /><circle cx="355" cy="166" r="5" fill={TEAL} />
      <rect x="318" y="194" width="52" height="7" rx="3.5" fill={TEAL} />
      <text x="344" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">One AI agent</text>
      <text x="344" y="268" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity=".65">one customer record</text>

      {/* outcomes */}
      {outs.map((o) => (
        <g key={o.t}>
          <rect x="462" y={o.y - 24} width="170" height="48" rx="24" fill={TEAL} fillOpacity=".16" stroke={TEAL} strokeOpacity=".6" />
          <circle cx="488" cy={o.y} r="11" fill={TEAL} />
          <path d={`M482 ${o.y} l4 4 l8 -9`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="508" y={o.y + 4.5} fontSize="12" fontWeight="600" fill="#fff">{o.t}</text>
        </g>
      ))}

      {/* footer strip */}
      <rect x="8" y="338" width="624" height="48" rx="24" fill="#fff" fillOpacity=".06" stroke="#fff" strokeOpacity=".15" />
      <text x="320" y="367" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fff" fillOpacity=".85">Same customer profile · same quick replies · same reporting on every channel</text>
    </svg>
  )
}

export function InstagramWhyItWorks() {
  const rows = [
    { icon: Zap, t: "Faster first response", d: "AI replies in seconds, day or night." },
    { icon: MessageCircle, t: "Quick replies built in", d: "Sizing, shipping and returns in one tap." },
    { icon: Inbox, t: "One shared inbox", d: "Instagram, WhatsApp and SMS together." },
    { icon: Tag, t: "Sell in the DM", d: "Catalog tags lead straight to checkout." },
  ]
  return (
    <section className="relative overflow-hidden bg-[oklch(0.13_0.02_230)] py-14 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[110px]" />
      <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-14">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/85"><Sparkles className="h-3 w-3" />Why it works</span>
          <h2 className={`mt-4 ${H2}`}>One inbox, one AI agent, every channel your customers use</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/70">
            Instagram sits next to WhatsApp and SMS, with the same customer profile and the same AI agent, so switching
            channels never means switching tools.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <li key={r.t} className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition group-hover:bg-primary group-hover:text-primary-foreground"><r.icon className="h-[18px] w-[18px]" /></span>
                <span>
                  <span className="block text-[14.5px] font-semibold leading-tight">{r.t}</span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-white/60">{r.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex flex-col rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] sm:p-6">
          <div className="mb-3 flex items-center gap-2 px-1 text-[12px] font-semibold text-white/70">
            <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-primary" /></span>
            <span className="ml-1">Live inbox flow</span>
            <span className="ml-auto inline-flex items-center gap-1.5"><span className="igs-blink h-2 w-2 rounded-full bg-primary" />Live</span>
          </div>
          <div className="flex flex-1 items-center"><Merge /></div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 6. WHY SMSLOCAL: comparison table ───────────── */

const COMPARE: [string, string, string][] = [
  ["Reply to story replies and comments", "Manual, easy to miss", "Automatic comment-to-DM and story-reply flows"],
  ["Answer common questions", "A person types each one", "AI agent answers from your catalog and FAQs"],
  ["See Instagram next to WhatsApp and SMS", "Separate apps", "One shared inbox, one customer record"],
  ["Share product details in a chat", "Copy and paste links", "Catalog cards tagged into the reply"],
  ["Hand over to a teammate", "Share a login", "Assign with full conversation history"],
  ["Measure response and results", "Limited insights", "Reporting across every channel"],
]

export function InstagramCompare() {
  return (
    <section className="border-y border-border bg-muted/50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Why SMSLocal</Eyebrow>
          <h2 className={`mt-4 ${H2} lg:whitespace-nowrap`}>Instagram is a channel, not a separate business</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
            Add Instagram to the inbox that already runs your WhatsApp, SMS and email, and let one AI agent handle
            routine questions across all of them.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[1.1fr_1fr_1.2fr] bg-foreground text-[12px] font-semibold uppercase tracking-wider text-background sm:text-[13px]">
            <div className="px-4 py-3.5 sm:px-6">Task</div>
            <div className="px-4 py-3.5 sm:px-6">Native Instagram app</div>
            <div className="bg-primary px-4 py-3.5 text-primary-foreground sm:px-6">With SMSLocal</div>
          </div>
          {COMPARE.map(([a, b, c], i) => (
            <div key={a} className={`grid grid-cols-[1.1fr_1fr_1.2fr] text-[13px] sm:text-[14.5px] ${i % 2 ? "bg-muted/40" : ""}`}>
              <div className="px-4 py-4 font-semibold sm:px-6">{a}</div>
              <div className="flex items-start gap-2 px-4 py-4 text-muted-foreground sm:px-6"><X className="mt-0.5 h-4 w-4 shrink-0" />{b}</div>
              <div className="flex items-start gap-2 bg-primary/5 px-4 py-4 font-medium sm:px-6"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />{c}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products/omnichannel-inbox/" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Omnichannel inbox <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></Link>
          <Link href="/products/ai-agents/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary">AI Agents <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ───────────── 7. RELATED: pill row ───────────── */

export function InstagramRelated({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="border-y border-border bg-muted/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore more</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-[14px] font-medium shadow-sm transition hover:border-primary hover:text-primary">
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 text-primary transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

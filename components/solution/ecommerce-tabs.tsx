"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Bot, KeyRound, Megaphone, MessageSquare, PackageCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// "One account for every message in the order": four jobs in a tab list on the left, and on the right the messages a
// shopper actually gets for the selected job, shown as notification bubbles that slide in when the tab changes.

type Bubble = { ch: "sms" | "wa" | "otp"; from: string; body: string; time: string }
type Tab = { id: string; Icon: LucideIcon; title: string; lead: string; points: string[]; href: string; link: string; bubbles: Bubble[] }

const TABS: Tab[] = [
  {
    id: "orders",
    Icon: PackageCheck,
    title: "Order alerts and shipping updates",
    lead: "Every order event gets a message the shopper can act on, on the channel they actually read.",
    points: ["DLT-approved transactional templates", "SMS and a WhatsApp receipt for the same order", "Live tracking link in every shipping update"],
    href: "/products/bulk-sms/",
    link: "See transactional SMS",
    bubbles: [
      { ch: "sms", from: "Order placed", body: "Order #A48219 from Nutri&Bloom is confirmed. Track it live →", time: "10:02" },
      { ch: "wa", from: "Receipt", body: "Thanks Rohit! Here is your receipt for ₹1,299 (2 items).", time: "10:02" },
      { ch: "sms", from: "Shipped", body: "Your order is with the courier and arrives Thursday. Track →", time: "Tue" },
    ],
  },
  {
    id: "cart",
    Icon: Bot,
    title: "Cart recovery with an AI WhatsApp agent",
    lead: "An agent trained on your catalogue follows up on abandoned carts and answers product questions in the shopper's language.",
    points: ["Replies in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada and English", "Answers sizes, stock and offers from your catalogue", "Hands over to your team when a shopper asks for a person"],
    href: "/products/whatsapp-business-api/",
    link: "See WhatsApp with AI",
    bubbles: [
      { ch: "wa", from: "AI agent", body: "Rohit, aapka cart abhi save hai. 10% off code: COMEBACK10", time: "4:10" },
      { ch: "wa", from: "Rohit", body: "Kya yeh size M mein hai?", time: "4:12" },
      { ch: "wa", from: "AI agent", body: "Ji haan, size M abhi stock mein hai. Order karein?", time: "4:12" },
    ],
  },
  {
    id: "festive",
    Icon: Megaphone,
    title: "Festive and sale campaigns",
    lead: "Diwali, Holi, Independence Day or a flash sale: send to your opted-in list, on time.",
    points: ["Promotional SMS and WhatsApp broadcasts to opt-in customers", "Smart route failover so the 7 pm send lands at 7 pm", "Sends held to the 9 AM to 9 PM promotional window"],
    href: "/products/bulk-sms/",
    link: "See bulk SMS",
    bubbles: [
      { ch: "sms", from: "Diwali sale", body: "Flat 40% off site-wide till midnight. Shop now →", time: "7:00" },
      { ch: "wa", from: "Festive broadcast", body: "Your wishlist item is now 40% off. Tap to order.", time: "7:00" },
    ],
  },
  {
    id: "otp",
    Icon: KeyRound,
    title: "Login, checkout and delivery OTPs",
    lead: "Codes arrive in seconds on a priority route, with automatic retry so a late code does not cost you the order.",
    points: ["Priority OTP route with automatic retry and fallback", "Checkout, login and cash-on-delivery OTPs", "One API for every code your store sends"],
    href: "/products/otp-sms/",
    link: "See OTP SMS",
    bubbles: [
      { ch: "otp", from: "Checkout OTP", body: "482193 is your one-time password. Valid for 5 minutes.", time: "10:01" },
      { ch: "otp", from: "Delivery OTP", body: "4821 is your delivery OTP. Share it with the rider.", time: "Thu" },
    ],
  },
]

function Mark({ ch }: { ch: Bubble["ch"] }) {
  if (ch === "wa") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/logos/channels/whatsapp.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
  }
  const Icon = ch === "otp" ? KeyRound : MessageSquare
  return <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-white" style={{ background: ch === "otp" ? "#14233a" : "#e0a21b" }}><Icon className="h-2.5 w-2.5" /></span>
}

export function EcommerceTabs() {
  const [i, setI] = useState(0)
  const t = TABS[i]
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <div role="tablist" aria-label="What SMSLocal sends for an online store" className="space-y-1">
        {TABS.map((x, n) => {
          const on = n === i
          return (
            <div key={x.id} className="border-b border-border">
              <button
                role="tab"
                aria-selected={on}
                onClick={() => setI(n)}
                onMouseEnter={() => setI(n)}
                className="flex w-full items-center gap-4 py-4 text-left"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${on ? "bg-primary text-primary-foreground shadow-[0_10px_18px_-8px_rgba(18,160,124,.7)]" : "bg-secondary text-foreground/70"}`}><x.Icon className="h-5 w-5" /></span>
                <span className={`text-[17px] font-semibold tracking-tight transition sm:text-[19px] ${on ? "text-foreground" : "text-foreground/55"}`}>{x.title}</span>
              </button>
              {on && (
                <div className="pb-5 pl-14">
                  <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">{x.lead}</p>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-foreground">
                    {x.points.map((p) => <li key={p} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{p}</li>)}
                  </ul>
                  <Link href={x.href} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">{x.link} <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* what the shopper sees */}
      <div className="relative mx-auto w-full max-w-[420px]">
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_70%)]" />
        <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">What the shopper sees</p>
        <div key={t.id} className="space-y-3">
          {t.bubbles.map((b, n) => (
            <div key={n} className="ec-bub flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-[0_18px_30px_-16px_rgba(15,26,46,.35)] ring-1 ring-border" style={{ animationDelay: `${n * 0.12}s` }}>
              <Mark ch={b.ch} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3"><span className="text-[12.5px] font-semibold text-foreground">{b.from}</span><span className="text-[10.5px] text-muted-foreground">{b.time}</span></div>
                <p className="mt-0.5 text-[13.5px] leading-snug text-foreground/85">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ec-bub { from { opacity: 0; transform: translateX(18px) } to { opacity: 1; transform: none } }
        .ec-bub { animation: ec-bub .5s cubic-bezier(.2,.8,.25,1) both }
        @media (prefers-reduced-motion: reduce) { .ec-bub { animation: none } }
      `}</style>
    </div>
  )
}

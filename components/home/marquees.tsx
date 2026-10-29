"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, CheckCheck, Plus } from "lucide-react"

/**
 * Editorial use-case list: big typographic rows on hairlines, one open at a
 * time. Opening a row reveals the two-way conversation and the channels it
 * runs on. The heading stays pinned on the left while the list scrolls.
 */

type Row = { title: string; line: string; channels: string[]; chat: { who: "a" | "c"; text: string }[] }

const ROWS: Row[] = [
  { title: "Order updates", line: "Shipping and delivery news that customers can reply to.", channels: ["WhatsApp", "SMS"], chat: [{ who: "a", text: "Your order #4821 has shipped and arrives Friday." }, { who: "c", text: "Can you deliver to my office?" }, { who: "a", text: "Yes. I've updated the address to your office." }] },
  { title: "OTP & login", line: "Codes that arrive in seconds, with a retry when they do not.", channels: ["SMS", "Voice"], chat: [{ who: "a", text: "481920 is your verification code. It expires in 10 minutes." }, { who: "c", text: "Didn't get it, please resend" }, { who: "a", text: "Sent again: 305517. Please do not share it." }] },
  { title: "Payment reminders", line: "A pay-now button inside the message, and answers when customers ask.", channels: ["WhatsApp", "RCS", "SMS"], chat: [{ who: "a", text: "Hi Asha, your EMI of ₹4,200 is due on 5 Nov." }, { who: "c", text: "Can I pay on the 7th?" }, { who: "a", text: "Yes, no late fee until the 8th. Tap Pay now when ready." }] },
  { title: "Cart recovery", line: "Bring buyers back to the exact cart they left.", channels: ["WhatsApp", "SMS"], chat: [{ who: "a", text: "You left a blue kurta in your cart. It is still in stock." }, { who: "c", text: "Is there free delivery?" }, { who: "a", text: "Yes, free on orders above ₹999. Complete your order?" }] },
  { title: "Appointments", line: "Book, confirm and reschedule in the same thread.", channels: ["WhatsApp", "Voice"], chat: [{ who: "c", text: "Can I see the doctor on Saturday?" }, { who: "a", text: "Saturday 11 AM is free. Shall I book it for you?" }, { who: "c", text: "Yes please" }] },
  { title: "Festive promotions", line: "Branded cards with images and buttons, with SMS fallback.", channels: ["RCS", "WhatsApp", "SMS"], chat: [{ who: "a", text: "Diwali sale: flat 30% off on all styles. Tap to shop." }, { who: "c", text: "Do you have this in blue?" }, { who: "a", text: "Yes. Blue is in stock in all sizes." }] },
  { title: "KYC & onboarding", line: "Collect documents and nudge the ones that are missing.", channels: ["WhatsApp"], chat: [{ who: "a", text: "Please upload your PAN to complete your KYC." }, { who: "c", text: "Sending it now" }, { who: "a", text: "Received. Your KYC is complete." }] },
  { title: "Feedback & renewals", line: "Ratings, surveys and renewal prompts that get a reply.", channels: ["RCS", "SMS"], chat: [{ who: "a", text: "How was your delivery? Tap a rating." }, { who: "c", text: "4 stars" }, { who: "a", text: "Thank you! Anything we could do better?" }] },
]

export function UseCaseMarquee() {
  const [open, setOpen] = useState(0)
  const wrap = useRef<HTMLElement>(null)
  const last = useRef(0)

  // On desktop the section pins while you scroll and opens each row in turn.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const onScroll = () => {
      const el = wrap.current
      if (!mq.matches || !el) return
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)))
      const i = Math.min(ROWS.length - 1, Math.floor(p * ROWS.length))
      if (i !== last.current) {
        last.current = i
        setOpen(i)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section ref={wrap} className="border-b border-border bg-background lg:h-[420vh]">
      <div className="py-20 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:py-0 lg:pt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">Use cases</span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">
            Every notification can become a <span className="brand-gradient-text">conversation</span>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">Open a use case to see the chat your customers would have, and the channels it runs on.</p>
          <Link href="/products/ai-agents/" className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline">
            Explore AI agents <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="border-t border-border">
          {ROWS.map((r, i) => {
            const on = open === i
            return (
              <li key={r.title} className="border-b border-border">
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="group flex w-full items-center gap-4 py-5 text-left lg:py-3.5">
                  <span className="w-8 shrink-0 font-mono text-[13px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 text-2xl font-semibold tracking-tight transition-colors sm:text-[28px] ${on ? "text-foreground" : "text-foreground/55 group-hover:text-foreground"}`}>{r.title}</span>
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${on ? "rotate-45 border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground group-hover:border-primary/50"}`}><Plus className="h-4 w-4" /></span>
                </button>
                <div className={`grid transition-all duration-500 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-7 pl-12 sm:grid-cols-[1fr_1.1fr]">
                      <div>
                        <p className="text-[15.5px] leading-relaxed text-muted-foreground">{r.line}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {r.channels.map((c) => <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-[12.5px] font-semibold text-foreground">{c}</span>)}
                        </div>
                        <Link href="/products/ai-agents/" className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline">See how it works <ArrowUpRight className="h-4 w-4" /></Link>
                      </div>
                      <div className="space-y-2 rounded-2xl bg-secondary/70 p-4 text-[13.5px]">
                        {r.chat.map((m, k) => (
                          <div key={k} className={`max-w-[88%] rounded-2xl px-3.5 py-2 leading-snug shadow-sm ${m.who === "c" ? "ml-auto rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-card text-foreground"}`}>
                            {m.text}
                            {m.who === "a" && <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"><CheckCheck className="h-3 w-3 text-primary" /> Delivered</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      </div>
    </section>
  )
}

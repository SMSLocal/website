"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Banknote, GraduationCap, HeartPulse, Home, ShoppingBag, Truck } from "lucide-react"
import { Reveal } from "./reveal"

type Industry = {
  icon: React.ComponentType<{ className?: string }>
  name: string
  href: string
  channel: string
  sender: string
  msg: string
  hook: string
}

const INDUSTRIES: Industry[] = [
  { icon: ShoppingBag, name: "E-commerce", href: "/solutions/ecommerce/", channel: "SMS", sender: "SHOPLY", msg: "Your order #4821 is out for delivery 🛵 Track: smsl.in/t/4821", hook: "Order, shipping & cart-recovery alerts." },
  { icon: Banknote, name: "Banking & Fintech", href: "/solutions/banking-fintech/", channel: "SMS", sender: "HDFCBK", msg: "₹25,000 credited to a/c XX4567 on 25-May. Avl bal ₹1,02,300.", hook: "Secure OTPs & transaction alerts." },
  { icon: HeartPulse, name: "Healthcare", href: "/solutions/healthcare/", channel: "WhatsApp", sender: "CityCare", msg: "Reminder: Dr. Mehta tomorrow 11:00 AM. Reply C to confirm.", hook: "Appointment & report reminders." },
  { icon: GraduationCap, name: "Education", href: "/solutions/education/", channel: "SMS", sender: "GRNWUD", msg: "Fee due ₹12,000 by 30 May. Pay: smsl.in/fee -Greenwood", hook: "Fee, result & exam updates." },
  { icon: Truck, name: "Logistics", href: "/solutions/logistics/", channel: "SMS", sender: "SHIPIT", msg: "Your parcel arrives today. Delivery OTP: 4821.", hook: "Dispatch alerts & delivery OTPs." },
  { icon: Home, name: "Real Estate", href: "/solutions/real-estate/", channel: "WhatsApp", sender: "Acre", msg: "New 2BHK in Whitefield, ₹85L. Open house Sat 11 AM. Reply Y.", hook: "Listing alerts & lead follow-up." },
]

export function Industries() {
  const ref = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft >= max - 1)
  }, [])

  useEffect(() => {
    updateEdges()
    const el = ref.current
    if (!el) return
    window.addEventListener("resize", updateEdges)
    return () => window.removeEventListener("resize", updateEdges)
  }, [updateEdges])

  const scrollByCards = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 16 /* gap-4 */ : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <section className="overflow-hidden bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-center">
          {/* Sticky intro */}
          <Reveal>
            <div className="lg:pr-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Industry solutions</span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[42px] lg:leading-[1.05]">
                Built for every{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Indian industry</span>
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                The messages businesses send every day — scroll to see each one live.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous industry"
                  aria-disabled={atStart}
                  tabIndex={atStart ? -1 : 0}
                  onClick={() => { if (!atStart) scrollByCards(-1) }}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-opacity duration-500 ease-out hover:border-primary/40 hover:text-primary ${
                    atStart ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next industry"
                  aria-disabled={atEnd}
                  tabIndex={atEnd ? -1 : 0}
                  onClick={() => { if (!atEnd) scrollByCards(1) }}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-opacity duration-500 ease-out hover:border-primary/40 hover:text-primary ${
                    atEnd ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <a href="/solutions/" className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90">
                See all industry solutions <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Horizontal scroll cards */}
          <div
            ref={ref}
            onScroll={updateEdges}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {INDUSTRIES.map((it, i) => {
              const Icon = it.icon
              return (
                <a
                  key={it.name}
                  data-card
                  href={it.href}
                  className="group flex w-[290px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] text-muted-foreground">0{i + 1}</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-5 w-5" /></span>
                  </div>

                  <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-3">
                    <div className="mb-1.5 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{it.channel} message</div>
                    <div className="flex items-end gap-2">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">{it.sender[0]}</span>
                      <div className="rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-[12px] leading-snug text-foreground shadow-sm">
                        {it.msg}
                        <div className="mt-1 text-[9.5px] text-muted-foreground">{it.sender} · delivered ✓✓</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-foreground">{it.name}</h3>
                  <p className="mt-1 text-[13px] text-muted-foreground">{it.hook}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold text-primary">
                    Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

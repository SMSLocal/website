"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ArrowUpRight, Banknote, GraduationCap, HeartPulse, Home, ShoppingBag, Truck } from "lucide-react"
import { Reveal } from "./reveal"

const INDUSTRIES = [
  { icon: ShoppingBag, name: "E-commerce", href: "/solutions/ecommerce", hook: "Order confirmations, cart recovery, and festive offers — with delivery tracking built in.", channel: "SMS", sender: "SHOPLY", msg: "Your order #4821 is out for delivery 🛵 Track live: smsl.in/t/4821" },
  { icon: Banknote, name: "Banking & Fintech", href: "/solutions/banking-fintech", hook: "Secure OTPs, transaction alerts, and DPDPA-aware customer messaging.", channel: "SMS", sender: "HDFCBK", msg: "₹25,000 credited to a/c XX4567 on 25-May. Avl bal ₹1,02,300." },
  { icon: HeartPulse, name: "Healthcare", href: "/solutions/healthcare", hook: "Appointment reminders, prescription refills, and lab-result notifications.", channel: "WhatsApp", sender: "CityCare", msg: "Reminder: Dr. Mehta tomorrow at 11:00 AM. Reply C to confirm." },
  { icon: GraduationCap, name: "Education", href: "/solutions/education", hook: "Fee reminders, result announcements, and exam schedules for schools & colleges.", channel: "SMS", sender: "GRNWUD", msg: "Fee due ₹12,000 by 30 May. Pay securely: smsl.in/fee -Greenwood" },
  { icon: Truck, name: "Logistics", href: "/solutions/logistics", hook: "Dispatch alerts, delivery OTPs, and route updates across multilingual India.", channel: "SMS", sender: "SHIPIT", msg: "Your parcel arrives today. Delivery OTP: 4821 — share with the rider." },
  { icon: Home, name: "Real Estate", href: "/solutions/real-estate", hook: "New-listing alerts, open-house invites, and lead follow-up in the buyer's language.", channel: "WhatsApp", sender: "Acre", msg: "New 2BHK in Whitefield, ₹85L. Open house Sat 11 AM. Reply Y for details." },
]

export function Industries() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % INDUSTRIES.length), 4000)
    return () => clearTimeout(t)
  }, [active])

  const ind = INDUSTRIES[active]
  const Icon = ind.icon

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            Industry solutions
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Built for India&apos;s{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">growing industries</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pick an industry to see the kind of message it sends every day.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
          {/* Selector list */}
          <div className="flex flex-col gap-2">
            {INDUSTRIES.map((it, i) => {
              const ItIcon = it.icon
              const on = i === active
              return (
                <button
                  key={it.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition ${on ? "border-primary/40 bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/30"}`}
                >
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${on ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                    <ItIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-foreground">{it.name}</div>
                    <div className="truncate text-[12px] text-muted-foreground">{it.hook}</div>
                  </div>
                  <ArrowRight className={`ml-auto h-4 w-4 shrink-0 transition ${on ? "translate-x-0 text-primary" : "text-muted-foreground/40"}`} />
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/40 p-6 lg:p-8">
            <div key={active} style={{ animation: "message-in 0.4s cubic-bezier(0.2,0.8,0.2,1) both" }} className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white"><Icon className="h-6 w-6" /></span>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{ind.name}</h3>
                  <p className="text-[12.5px] text-muted-foreground">on {ind.channel} · SMSLocal</p>
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{ind.hook}</p>

              {/* Example message */}
              <div className="mt-5 rounded-xl border border-border bg-background p-4">
                <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">Example {ind.channel} message</div>
                <div className="flex items-end gap-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">{ind.sender[0]}</span>
                  <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-[13px] leading-snug text-foreground">
                    {ind.msg}
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">{ind.sender} · delivered</div>
                  </div>
                </div>
              </div>

              <a href={ind.href} className="mt-auto inline-flex w-fit items-center gap-1 pt-5 text-[14px] font-semibold text-primary hover:underline">
                See {ind.name} solutions <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

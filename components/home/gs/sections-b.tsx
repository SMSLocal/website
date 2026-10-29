"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, Check, Lock, MapPin, ShieldCheck, UserRound } from "lucide-react"
import { Reveal } from "@/components/landing/reveal"

const Grad = ({ children }: { children: React.ReactNode }) => (
  <span className="brand-gradient-text">{children}</span>
)

/* ───────── journey ring (centred SVG, six stages) ───────── */
const STAGES = [
  { t: "Interest", d: "A click-to-WhatsApp ad starts the conversation and the agent greets the lead." },
  { t: "Engagement", d: "Rich replies answer questions and share the right product details." },
  { t: "Consideration", d: "Follow-ups on WhatsApp and RCS bring back people who went quiet." },
  { t: "Purchase", d: "A payment link inside the chat turns intent into an order." },
  { t: "Support", d: "Delivery updates and answers arrive in the same thread." },
  { t: "Retention", d: "Reminders and offers on the channel each customer prefers." },
]

export function JourneyRing() {
  const [a, setA] = useState(0)
  // continuous angle so the arc always takes the short way round (no spin-back from stage 6 to 1)
  const [rot, setRot] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (i: number) => {
    setA((cur) => {
      const delta = ((i - cur + 9) % 6) - 3
      const step = delta === -3 ? 3 : delta
      setRot((r) => r + step * 60)
      return i
    })
  }

  useEffect(() => {
    if (paused) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => go((a + 1) % STAGES.length), 3200)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, a])

  const R = 150
  const arc = (2 * Math.PI * R) / STAGES.length
  return (
    <section className="overflow-hidden border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">Personalise every customer interaction <Grad>across the full lifecycle</Grad></h2>
        </Reveal>
        <div className="relative mx-auto mt-14 h-[420px] w-full max-w-[460px] sm:h-[460px]">
          <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle r={R} fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 8" />
            <circle
              r={R}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${arc} ${2 * Math.PI * R}`}
              style={{ transform: `rotate(${rot - 120}deg)`, transformOrigin: "0 0", transition: "transform 700ms cubic-bezier(.4,0,.2,1)" }}
            />
          </svg>
          {STAGES.map((s, i) => {
            const ang = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2
            const x = 50 + (R / 400) * 100 * Math.cos(ang)
            const y = 50 + (R / 400) * 100 * Math.sin(ang)
            const on = i === a
            return (
              <button key={s.t} type="button" onClick={() => { go(i); setPaused(true) }} onMouseEnter={() => { go(i); setPaused(true) }} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold shadow-md transition ${on ? "scale-110 border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/50"}`} style={{ left: `${x}%`, top: `${y}%` }}>{s.t}</button>
            )
          })}
          {/* centred text: the wrapper never animates, only the inner block fades */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div key={a} className="w-[58%] animate-[gsb-text_.45s_ease-out]">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-primary">Stage {a + 1} of 6</div>
              <div className="mt-1 text-2xl font-bold text-foreground">{STAGES[a].t}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{STAGES[a].d}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes gsb-text { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } } @media (prefers-reduced-motion: reduce) { [class*="gsb-text"] { animation: none !important } }`}</style>
    </section>
  )
}

/* ───────── AI + human escalation: split, copy beside a timeline card ───────── */
export function Escalation() {
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">AI + human</span>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">Optimise operations with <Grad>AI and people together</Grad></h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Hand routine conversations to agents around the clock, and escalate complex ones to your team with the whole conversation attached.</p>
          <ul className="mt-5 space-y-2.5">
            {["AI-powered escalation rules", "Suggested replies for your team", "Summaries so nobody repeats the question"].map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}</li>
            ))}
          </ul>
          <Link href="/products/omnichannel-inbox/" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline">See the inbox <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/10">
            <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-[11.5px] font-bold text-white shadow">AI-powered escalation</span>
            <ol className="relative space-y-5 border-l-2 border-dashed border-primary/30 pl-6 text-[13.5px]">
              <li><span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" /><div className="font-semibold">10:02 · AI agent</div><p className="text-muted-foreground">Answered 3 questions about order #4821.</p></li>
              <li><span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-accent" /><div className="font-semibold">10:04 · Customer</div><p className="text-muted-foreground">&ldquo;I want a refund for the damaged item.&rdquo;</p></li>
              <li><span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" /><div className="font-semibold">10:04 · Handed over</div><p className="text-muted-foreground">Routed to the refunds queue with a summary.</p></li>
            </ol>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-3.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><UserRound className="h-5 w-5" /></span>
              <div className="text-[13px]"><div className="font-semibold">Priya · Refunds</div><div className="text-muted-foreground">Suggested reply ready for review</div></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── impact band: dark, big counters ───────── */
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setV(to); return }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

export function ImpactBand() {
  const items = [
    { n: 8, s: "", l: "Indian languages", d: "AI agents reply in the customer's own language" },
    { n: 4, s: "", l: "operator networks", d: "Jio, Airtel, Vi and BSNL, direct" },
    { n: 5, s: "", l: "channels, one wallet", d: "SMS, WhatsApp, RCS, voice and AI agents" },
    { n: 2019, s: "", l: "serving India since", d: "DLT-compliant messaging from day one" },
  ]
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-20 text-white lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(50% 60% at 15% 0%, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%), radial-gradient(40% 50% at 90% 100%, color-mix(in oklch, var(--accent) 30%, transparent), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Built for conversations in India</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/65">The numbers behind the platform.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {items.map((x) => (
            <div key={x.l} className="border-t border-white/20 pt-5">
              <div className="text-5xl font-extrabold tracking-tight lg:text-6xl"><Count to={x.n} suffix={x.s} /></div>
              <div className="mt-2 text-[15px] font-semibold">{x.l}</div>
              <p className="mt-1 text-[13.5px] leading-snug text-white/60">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── industries: tall photo panels that expand ───────── */
const INDS = [
  { t: "Healthcare", photo: "/home/ind-healthcare.webp", alt: "A stethoscope on a yellow background", pos: "50% 50%", d: "Appointment reminders, report-ready alerts and follow-up care messages.", href: "/solutions/healthcare/" },
  { t: "Banking & Fintech", photo: "/home/ind-banking.webp", alt: "A bank card being tapped on a card machine", pos: "50% 45%", d: "OTPs, transaction alerts, KYC follow-ups and collections.", href: "/solutions/banking-fintech/" },
  { t: "Logistics", photo: "/home/ind-logistics.webp", alt: "A delivery truck on the road", pos: "50% 50%", d: "Out-for-delivery alerts, delivery OTPs and reschedule on a reply.", href: "/solutions/logistics/" },
  { t: "E-commerce & D2C", photo: "/home/ind-ecommerce.webp", alt: "Stacked parcels ready for dispatch", pos: "50% 50%", d: "Order updates, cart recovery and AI answers to product questions.", href: "/solutions/ecommerce/" },
]

export function IndustryPanels() {
  const [a, setA] = useState(0)
  return (
    <section className="border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">Built for <Grad>your industry</Grad></h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-3 md:h-[460px] md:flex-row">
          {INDS.map((x, i) => {
            const on = i === a
            return (
              <Link key={x.t} href={x.href} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} className={`group relative min-h-[160px] overflow-hidden rounded-3xl transition-all duration-500 md:min-h-0 ${on ? "md:flex-[3]" : "md:flex-1"}`}>
                <Image src={x.photo} alt={x.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: x.pos }} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.04_245)] via-[oklch(0.14_0.04_245)]/45 to-[oklch(0.14_0.04_245)]/10" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-xl font-bold">{x.t}</div>
                  {on && <p className="mt-2 max-w-sm animate-[gsb-fade_.4s_ease-out] text-[14px] leading-relaxed text-white/80">{x.d}</p>}
                  {on && <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-primary">Explore <ArrowUpRight className="h-4 w-4" /></span>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <style>{`@keyframes gsb-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </section>
  )
}

/* ───────── built for every role: underline tabs + photo panel ───────── */
const ROLES = [
  { t: "Marketing", photo: "/home/people-friends.webp", alt: "Two friends laughing at a message on a phone", d: "Accelerate acquisition and engagement with conversations that nurture leads around the clock.", pts: ["Campaigns on SMS, WhatsApp and RCS", "Segments, scheduling and drip journeys", "Click and reply reports"] },
  { t: "Commerce & growth", photo: "/home/people-outdoor.webp", alt: "A woman checking a message on her phone outdoors", d: "Support every step of the buying journey, from discovery to checkout and delivery.", pts: ["Cart recovery and order updates", "Payment links inside the chat", "Product answers from AI agents"] },
  { t: "Customer support & CX", photo: "/home/people-desk.webp", alt: "A support team member smiling at her desk", d: "Resolve queries faster and lighten the workload with AI-powered support.", pts: ["Agents answer the common questions", "Shared inbox with smart hand-over", "One history across channels"] },
  { t: "Developers", photo: "/home/people-dev.webp", alt: "A developer wearing headphones at a laptop", d: "Build messaging into your product with a simple, well-documented API.", pts: ["REST API and signed webhooks", "Sandbox mode for safe testing", "Quickstart and SDKs"] },
]

export function RolesTabs() {
  const [a, setA] = useState(0)
  const r = ROLES[a]
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">One platform for every team that <Grad>talks to customers</Grad></h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 border-b border-border" role="tablist" aria-label="Roles">
          {ROLES.map((x, i) => (
            <button key={x.t} type="button" role="tab" aria-selected={i === a} onClick={() => setA(i)} className={`-mb-px border-b-2 px-1 pb-3 text-[15px] font-semibold transition ${i === a ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{x.t}</button>
          ))}
        </div>
        <div key={r.t} className="mt-10 grid animate-[gsb-fade_.4s_ease-out] items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div className="relative aspect-[4/3.2] overflow-hidden rounded-[2rem] shadow-xl shadow-primary/15">
            <Image src={r.photo} alt={r.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{r.t}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{r.d}</p>
            <ul className="mt-5 space-y-2.5">{r.pts.map((p) => <li key={p} className="flex gap-2.5 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}</li>)}</ul>
            <Link href="/company/contact/" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[14px] font-semibold transition hover:border-primary/40">Talk to an expert <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes gsb-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </section>
  )
}

/* ───────── security: a switch that turns a to-do list into "handled" ───────── */
const TASKS = [
  { i: ShieldCheck, t: "Register your business on DLT", d: "Entity registration, tracked for you" },
  { i: UserRound, t: "Register sender IDs", d: "Headers matched to your registration" },
  { i: Check, t: "Get templates approved", d: "Every message follows an approved template" },
  { i: MapPin, t: "Keep customer data in India", d: "Data and message logs on Indian infrastructure" },
  { i: Lock, t: "Sort out the data agreement", d: "A DPA is available on request" },
]

export function SecuritySplit() {
  const ref = useRef<HTMLDivElement>(null)
  const [mine, setMine] = useState(false) // true = "With SMSLocal"
  const [touched, setTouched] = useState(false)
  const [seen, setSeen] = useState(false)
  const [done, setDone] = useState(0) // how many rows are ticked, driven one at a time

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // play: rest on the to-do state, then flip the switch once the card is in view
  useEffect(() => {
    if (touched) return
    if (!seen) {
      setMine(false)
      return
    }
    const id = setTimeout(() => setMine(true), 1000)
    return () => clearTimeout(id)
  }, [seen, touched])
  // tick rows in (or clear them) one by one so the checks, the bar and the count stay in step
  useEffect(() => {
    const id = setInterval(() => {
      setDone((d) => {
        if (mine) return d < TASKS.length ? d + 1 : d
        return d > 0 ? d - 1 : d
      })
    }, mine ? 380 : 90)
    return () => clearInterval(id)
  }, [mine])

  const pick = (v: boolean) => {
    setTouched(true)
    setMine(v)
  }
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]"

  return (
    <section className="border-b border-border bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">Compliance</span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">Enterprise-grade compliance, <Grad>built in</Grad></h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">Indian messaging comes with a long to-do list. Flip the switch to see who does it.</p>
        </Reveal>

        <div ref={ref} className="mx-auto mt-10 max-w-2xl">
          <div className="relative mx-auto grid w-[19.5rem] grid-cols-2 rounded-full border border-border bg-secondary/70 p-1 shadow-inner" role="group" aria-label="Who handles compliance">
            <span aria-hidden className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-md transition-all duration-500 ${ease} ${mine ? "translate-x-full bg-primary shadow-primary/30" : "translate-x-0 bg-card"}`} />
            {[{ v: false, l: "Doing it yourself" }, { v: true, l: "With SMSLocal" }].map((o) => (
              <button key={o.l} type="button" aria-pressed={mine === o.v} onClick={() => pick(o.v)} className={`relative z-10 rounded-full py-2 text-[14px] font-semibold transition-colors duration-300 ${mine === o.v ? (o.v ? "text-primary-foreground" : "text-foreground") : "text-muted-foreground hover:text-foreground"}`}>{o.l}</button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
            <div className="h-1.5 w-full bg-secondary">
              <div className={`h-full bg-gradient-to-r from-primary to-[oklch(0.66_0.13_215)] transition-[width] duration-500 ${ease}`} style={{ width: `${(done / TASKS.length) * 100}%` }} />
            </div>
            <ul className="divide-y divide-border">
              {TASKS.map((x, n) => {
                const ok = n < done
                return (
                  <li key={x.t} className={`flex items-center gap-4 px-5 py-4 transition-colors duration-500 sm:px-7 ${ok ? "bg-primary/[0.035]" : ""}`}>
                    <span className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${ease} ${ok ? "scale-100 border-primary bg-primary text-primary-foreground" : "scale-95 border-border bg-card text-muted-foreground"}`}>
                      <x.i className={`absolute h-4 w-4 transition-all duration-300 ${ok ? "scale-50 opacity-0" : "scale-100 opacity-100"}`} />
                      <Check className={`absolute h-4 w-4 transition-all duration-300 ${ok ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} strokeWidth={3} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className={`inline bg-gradient-to-r from-primary/70 to-primary/70 bg-[length:0%_2px] bg-[position:0_58%] bg-no-repeat text-[16px] font-semibold transition-all duration-700 ${ease} ${ok ? "bg-[length:100%_2px] text-foreground/55" : "text-foreground"}`}>{x.t}</div>
                      <div className="text-[13.5px] text-muted-foreground">{x.d}</div>
                    </div>
                    <span className="relative hidden h-7 w-[4.5rem] shrink-0 sm:block">
                      <span className={`absolute inset-0 inline-flex items-center justify-center rounded-full bg-amber-100 text-[12px] font-bold text-amber-800 transition-all duration-500 ${ease} ${ok ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}>To do</span>
                      <span className={`absolute inset-0 inline-flex items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary transition-all duration-500 ${ease} ${ok ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>Handled</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-5 py-3.5 text-[14px] sm:px-7">
              <span className="font-semibold tabular-nums text-foreground">{done} of {TASKS.length} handled for you</span>
              <Link href="/platform/security/" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">Learn about security <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (prefers-reduced-motion: reduce) { [class*="duration-"] { transition: none !important } }`}</style>
    </section>
  )
}

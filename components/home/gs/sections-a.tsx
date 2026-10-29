"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Check, CheckCheck, Inbox, LayoutTemplate, MessageSquare, Mic, Plug, Rocket, TestTube2, Wrench } from "lucide-react"
import { Reveal } from "@/components/landing/reveal"
import { PaymentScene, PromoScene, RcsScene } from "@/components/landing/messaging-scenes"

const Grad = ({ children }: { children: React.ReactNode }) => (
  <span className="brand-gradient-text">{children}</span>
)
const Head = ({ kicker, children, sub }: { kicker?: string; children: React.ReactNode; sub?: string }) => (
  <Reveal className="mx-auto max-w-3xl text-center">
    {kicker && <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">{kicker}</span>}
    <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">{children}</h2>
    {sub && <p className="mt-3 text-pretty text-lg text-muted-foreground">{sub}</p>}
  </Reveal>
)

/* ───────── 1 · one agent for every interaction: three scene cards ───────── */
const AGENTS = [
  { Scene: PaymentScene, name: "Payments and collections", body: "Collect dues inside the WhatsApp chat with UPI, cards and net banking, and confirm instantly." },
  { Scene: PromoScene, name: "Sales and promotions", body: "Send rich banners, offers and buttons that bring customers to the shop, the details or a call." },
  { Scene: RcsScene, name: "Support and discovery", body: "Swipeable RCS carousels with a verified sender, and automatic SMS fallback for every phone." },
]

export function AgentTypes() {
  return (
    <section className="border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Head kicker="One platform, three jobs">One agent for every customer interaction, <Grad>day and night</Grad></Head>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {AGENTS.map((a, i) => (
            <Reveal key={a.name} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className="aspect-[400/380] w-full overflow-hidden">
                  <a.Scene />
                </div>
                <div className="flex flex-1 flex-col bg-muted/60 px-6 pb-7 pt-5">
                  <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-foreground">{a.name}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 2 · agent lifecycle: sticky stepper beside an editor mock ───────── */
const STEPS = [
  { t: "Build", d: "Add your website, FAQs and documents, define the agent's role and set guardrails. No code, ready in minutes.", icon: Wrench },
  { t: "Test", d: "Chat with the agent in a safe playground and fix anything before a customer sees it.", icon: TestTube2 },
  { t: "Deploy", d: "Switch on WhatsApp, SMS, RCS, voice and your website widget from one place.", icon: Rocket },
  { t: "Optimise", d: "Review conversations, topics and hand-overs, then improve answers with one click.", icon: BarChart3 },
]

function StepMock({ n }: { n: number }) {
  if (n === 0)
    return (
      <div className="space-y-3 text-[13px]">
        <div><div className="mb-1 text-[11px] font-semibold uppercase text-muted-foreground">Instructions</div><div className="rounded-lg border border-border bg-card p-3 leading-snug">You are a support agent for ShopNow. Be friendly and brief. Resolve order questions and hand over refunds to a person.</div></div>
        <div><div className="mb-1 text-[11px] font-semibold uppercase text-muted-foreground">Sources</div><div className="flex flex-wrap gap-2">{["shopnow.in", "FAQs.pdf", "Return policy"].map((x) => <span key={x} className="rounded-full border border-border bg-card px-2.5 py-1">{x}</span>)}</div></div>
        <div><div className="mb-1 text-[11px] font-semibold uppercase text-muted-foreground">Guardrails</div><div className="rounded-lg border border-border bg-card p-3 leading-snug text-muted-foreground">Never promise delivery dates that the order system does not show.</div></div>
      </div>
    )
  if (n === 1)
    return (
      <div className="space-y-2 text-[13px]">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-primary-foreground">Can I return my order after 10 days?</div>
        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-card px-3.5 py-2 shadow-sm">Returns are open for 7 days after delivery, so this order is outside the window. I can pass you to a person if you would like.</div>
        <div className="flex gap-2 text-[11.5px]"><span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">Source: Return policy</span><span className="rounded-full bg-card px-2.5 py-1 text-muted-foreground">Guardrail applied</span></div>
      </div>
    )
  if (n === 2)
    return (
      <div className="grid grid-cols-2 gap-2.5 text-[13px] font-semibold">
        {["WhatsApp", "SMS", "RCS", "Voice", "Website widget", "Instagram"].map((c, i) => (
          <div key={c} className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-3">{c}<span className={`h-5 w-9 rounded-full p-0.5 ${i < 4 ? "bg-primary" : "bg-border"}`}><span className={`block h-4 w-4 rounded-full bg-white transition ${i < 4 ? "translate-x-4" : ""}`} /></span></div>
        ))}
      </div>
    )
  return (
    <div className="space-y-2.5 text-[13px]">
      {[["Order status", 72], ["Returns", 18], ["Payments", 10]].map(([k, v]) => (
        <div key={String(k)}><div className="mb-1 flex justify-between"><span>{k}</span><span className="text-muted-foreground">{v}% of chats</span></div><div className="h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary" style={{ width: `${v}%` }} /></div></div>
      ))}
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-[12.5px]">Suggestion: add the delivery-time FAQ to cut hand-overs on order status.</div>
    </div>
  )
}

export function AgentLifecycle() {
  const [n, setN] = useState(0)
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Head kicker="The agent lifecycle">From idea to a working agent in <Grad>four steps</Grad></Head>
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ol className="space-y-3" role="tablist" aria-label="Lifecycle">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <button type="button" role="tab" aria-selected={i === n} onClick={() => setN(i)} onMouseEnter={() => setN(i)} className={`flex w-full gap-4 rounded-2xl border p-5 text-left transition ${i === n ? "border-primary bg-card shadow-lg shadow-primary/10" : "border-border bg-card/60 hover:border-primary/40"}`}>
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-[15px] font-bold ${i === n ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>0{i + 1}</span>
                  <span>
                    <span className="flex items-center gap-2 text-lg font-bold text-foreground"><s.icon className="h-[18px] w-[18px] text-primary" /> {s.t}</span>
                    <span className="mt-1 block text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div key={n} className="animate-[gsa-in_.35s_ease-out] rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-secondary/50 to-accent/10 p-6 shadow-xl shadow-primary/10 sm:p-8 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-2 text-[12.5px] font-semibold text-muted-foreground"><Bot className="h-4 w-4 text-primary" /> {STEPS[n].t}</div>
            <StepMock n={n} />
          </div>
        </div>
      </div>
      <style>{`@keyframes gsa-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } } @media (prefers-reduced-motion: reduce) { [class*="gsa-in"] { animation: none !important } }`}</style>
    </section>
  )
}

/* ───────── 3 · product suite: realistic app window with switchable screens ───────── */
type Screen = { id: string; label: string; icon: React.ComponentType<{ className?: string }>; path: string; blurb: string; body: React.ReactNode }

const Pill = ({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "green" | "amber" | "blue" }) => {
  const t = { slate: "bg-slate-100 text-slate-600", green: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700", blue: "bg-blue-100 text-blue-700" }[tone]
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${t}`}>{children}</span>
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{children}</div>
)

const SCREENS: Screen[] = [
  {
    id: "builder", label: "Agent builder", icon: LayoutTemplate, path: "agents/support/procedures", blurb: "Write procedures in plain language and attach actions.",
    body: (
      <div className="grid gap-4 p-5 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center justify-between"><div className="text-[15px] font-bold text-slate-900">Returns and refunds</div><span className="rounded-lg bg-primary px-3 py-1.5 text-[11.5px] font-semibold text-primary-foreground">Publish</span></div>
          <div className="mt-3 space-y-2">
            {[["Greet the customer and ask for the order number", null], ["Look up the order", "lookup_order"], ["Check the return window (7 days)", "check_policy"], ["If eligible, create a return label", "create_return"], ["If not eligible, offer a hand-over to a person", "handover"]].map(([t, a], i) => (
              <div key={String(t)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-600">{i + 1}</span>
                <span className="flex-1 text-[12.5px] text-slate-800">{t}</span>
                {a && <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-primary">{a}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
            <Label>Guardrails</Label>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-700">Never promise a refund date. Do not discuss other customers. Hand over when the customer is upset.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
            <Label>Knowledge</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">{["shopnow.in", "Return policy.pdf", "FAQs"].map((x) => <Pill key={x}>{x}</Pill>)}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
            <Label>Language</Label>
            <div className="mt-2 flex flex-wrap gap-1.5"><Pill tone="green">Auto-detect</Pill><Pill>English</Pill><Pill>Hindi</Pill></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "inbox", label: "Shared inbox", icon: Inbox, path: "inbox", blurb: "AI and your team in the same conversation.",
    body: (
      <div className="grid md:grid-cols-[220px_1fr_200px]">
        <div className="border-b border-slate-200 md:border-b-0 md:border-r">
          {[["Asha K.", "WhatsApp", "Where is my order?", true], ["Rohan M.", "SMS", "Payment failed", false], ["Meera S.", "RCS", "Thanks!", false], ["Imran P.", "WhatsApp", "Change address", false]].map(([n, c, m, on]) => (
            <div key={String(n)} className={`flex items-center gap-2.5 border-b border-slate-100 px-3 py-2.5 ${on ? "bg-primary/5" : ""}`}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-600">{String(n)[0]}</span>
              <div className="min-w-0 flex-1"><div className="flex justify-between text-[12px] font-semibold text-slate-900"><span>{String(n)}</span><span className="text-[10px] font-medium text-slate-400">{String(c)}</span></div><div className="truncate text-[11.5px] text-slate-500">{String(m)}</div></div>
            </div>
          ))}
        </div>
        <div className="space-y-2 bg-slate-50 p-4 text-[12.5px]">
          <div className="flex items-center justify-between"><div className="font-bold text-slate-900">Asha K.</div><span className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">Take over</span></div>
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3 py-2 shadow-sm">Hi, where is my order #4821?</div>
          <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground shadow-sm">It shipped this morning and arrives on Friday. Want the tracking link?<div className="mt-1 text-[10px] opacity-80">AI agent · replied automatically</div></div>
          <div className="max-w-[60%] rounded-2xl rounded-bl-md bg-white px-3 py-2 shadow-sm">Yes please</div>
        </div>
        <div className="border-t border-slate-200 p-4 text-[12px] md:border-l md:border-t-0">
          <Label>Customer</Label>
          <div className="mt-2 space-y-1.5 text-slate-700"><div>Asha K.</div><div className="text-slate-500">+91 98••• ••210</div><div className="flex gap-1.5 pt-1"><Pill tone="green">VIP</Pill><Pill>Pune</Pill></div></div>
          <div className="mt-4"><Label>Latest order</Label></div>
          <div className="mt-1.5 text-slate-700">#4821 · Shipped</div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics", label: "Analytics", icon: BarChart3, path: "analytics/overview", blurb: "See topics, hand-overs and results.",
    body: (
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["Conversations", "12,480"], ["Resolved by AI", "78%"], ["Hand-overs", "9%"], ["Satisfaction", "4.6 / 5"]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-slate-200 bg-white p-3.5"><div className="text-[11px] font-medium text-slate-500">{k}</div><div className="mt-1 text-[22px] font-bold tracking-tight text-slate-900">{v}</div></div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] font-semibold text-slate-800">Conversations per day</div>
            <svg viewBox="0 0 400 130" className="mt-2 h-32 w-full" aria-hidden>
              <defs><linearGradient id="suite-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#10a37f" stopOpacity=".35" /><stop offset="1" stopColor="#10a37f" stopOpacity="0" /></linearGradient></defs>
              {[20, 55, 90].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />)}
              <path d="M0 100 L40 84 L80 92 L120 62 L160 70 L200 44 L240 58 L280 32 L320 40 L360 20 L400 28 L400 130 L0 130 Z" fill="url(#suite-area)" />
              <path d="M0 100 L40 84 L80 92 L120 62 L160 70 L200 44 L240 58 L280 32 L320 40 L360 20 L400 28" fill="none" stroke="#10a37f" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] font-semibold text-slate-800">Top topics</div>
            <div className="mt-3 space-y-2.5">
              {[["Order status", 72], ["Returns", 18], ["Payments", 10]].map(([k, v]) => (
                <div key={String(k)}><div className="flex justify-between text-[11.5px] text-slate-600"><span>{k}</span><span>{v}%</span></div><div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-primary" style={{ width: `${v}%` }} /></div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "integrations", label: "Integrations", icon: Plug, path: "settings/integrations", blurb: "Connect your CRM, helpdesk and order systems.",
    body: (
      <div className="p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[["CRM", "Contacts and deals", true], ["Helpdesk", "Tickets and hand-overs", true], ["Orders API", "Order lookup", true], ["Payments", "Links and status", true], ["Calendar", "Appointments", false], ["Webhooks", "Delivery receipts and replies", true]].map(([n, d, on]) => (
            <div key={String(n)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-[13px] font-bold text-primary">{String(n)[0]}</span>
              <div className="min-w-0 flex-1"><div className="text-[13px] font-semibold text-slate-900">{String(n)}</div><div className="truncate text-[11.5px] text-slate-500">{String(d)}</div></div>
              {on ? <Pill tone="green">Connected</Pill> : <span className="rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700">Connect</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "playground", label: "Playground", icon: TestTube2, path: "agents/support/playground", blurb: "Test answers and see which source was used.",
    body: (
      <div className="grid gap-4 p-5 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[12.5px]">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-primary-foreground">Can I return my order after 10 days?</div>
          <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3 py-2 shadow-sm">Returns are open for 7 days after delivery, so this order is outside the window. I can pass you to a person if you would like.</div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-400"><span className="flex-1">Type a test message…</span><span className="text-primary">Send</span></div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5"><Label>Sources used</Label><div className="mt-2 space-y-1.5 text-[12px] text-slate-700"><div className="flex justify-between"><span>Return policy.pdf</span><Pill tone="green">Matched</Pill></div><div className="flex justify-between"><span>FAQs</span><Pill>Checked</Pill></div></div></div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5"><Label>Actions run</Label><div className="mt-2 space-y-1.5 font-mono text-[11.5px] text-slate-700"><div>lookup_order <span className="text-emerald-600">ok</span></div><div>check_policy <span className="text-emerald-600">ok</span></div></div></div>
        </div>
      </div>
    ),
  },
  {
    id: "rich", label: "Rich replies", icon: MessageSquare, path: "templates/new", blurb: "Buttons, lists and cards on WhatsApp and RCS.",
    body: (
      <div className="grid gap-5 p-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3 text-[12px]">
          {[["Template name", "order_shipped"], ["Header", "Your order is on its way"], ["Body", "Hi {{name}}, order #{{order}} has shipped and arrives {{date}}."]].map(([k, v]) => (
            <div key={k}><Label>{k}</Label><div className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800">{v}</div></div>
          ))}
          <div><Label>Buttons</Label><div className="mt-1 flex gap-2">{["Track order", "Talk to a person"].map((b) => <span key={b} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700">{b}</span>)}</div></div>
        </div>
        <div className="mx-auto w-full max-w-[250px] rounded-[1.6rem] border-[6px] border-slate-900 bg-slate-900">
          <div className="overflow-hidden rounded-[1.1rem] bg-[#efeae2]">
            <div className="bg-[#075E54] px-3 py-2 text-[11.5px] font-semibold text-white">ShopNow</div>
            <div className="p-3 text-[12px]"><div className="rounded-xl rounded-tl-sm bg-white p-2.5 shadow-sm"><div className="font-bold text-slate-900">Your order is on its way</div><p className="mt-1 text-slate-700">Hi Asha, order #4821 has shipped and arrives Friday.</p><div className="mt-2 grid gap-1 text-center font-semibold text-[#128C7E]"><div className="rounded-lg border border-slate-200 py-1">Track order</div><div className="rounded-lg border border-slate-200 py-1">Talk to a person</div></div></div></div>
          </div>
        </div>
      </div>
    ),
  },
]

const NAV_ITEMS = ["Overview", "Agents", "Inbox", "Campaigns", "Analytics", "Settings"]

export function SuiteBento() {
  const [i, setI] = useState(0)
  const s = SCREENS[i]
  return (
    <section className="border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Head kicker="The complete suite">Everything for customer{"‑"}facing agents, <Grad>on one platform</Grad></Head>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Product screens">
          {SCREENS.map((x, n) => (
            <button key={x.id} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition ${n === i ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
              <x.icon className="h-4 w-4" /> {x.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[15px] text-muted-foreground">{s.blurb}</p>

        {/* app window */}
        <div className="relative mx-auto mt-8 max-w-5xl">
          <div aria-hidden className="absolute -inset-x-6 -bottom-8 top-10 -z-10 rounded-[3rem] bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-slate-300/70 bg-white shadow-2xl shadow-slate-900/15">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
              <span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-red-400" /><i className="h-3 w-3 rounded-full bg-amber-400" /><i className="h-3 w-3 rounded-full bg-emerald-400" /></span>
              <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11.5px] text-slate-500"><span className="text-emerald-600">●</span> app.smslocal.in/{s.path}</div>
              <span className="hidden rounded-full bg-amber-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-amber-700 sm:inline">Sample data</span>
            </div>
            <div className="grid md:grid-cols-[168px_1fr]">
              <aside className="hidden border-r border-slate-200 bg-slate-50 p-3 md:block">
                <div className="mb-3 flex items-center gap-2 px-2 text-[13px] font-bold text-slate-900"><span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[11px] text-primary-foreground">S</span> SMSLocal</div>
                {NAV_ITEMS.map((n) => {
                  const on = (n === "Agents" && ["builder", "playground"].includes(s.id)) || (n === "Inbox" && s.id === "inbox") || (n === "Analytics" && s.id === "analytics") || (n === "Settings" && s.id === "integrations") || (n === "Campaigns" && s.id === "rich")
                  return <div key={n} className={`mb-0.5 rounded-lg px-2.5 py-2 text-[12.5px] font-medium ${on ? "bg-primary/10 font-semibold text-primary" : "text-slate-600"}`}>{n}</div>
                })}
              </aside>
              <div key={s.id} className="min-h-[360px] animate-[gsa-in_.35s_ease-out] bg-slate-50/50 text-slate-900">{s.body}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── 4 · build once, deploy everywhere: segmented control + widget ───────── */
const DEP = [
  { id: "chat", label: "Chat & social", icon: MessageSquare, line: "Your customers can talk to the agent on WhatsApp, Instagram, Messenger and your website.", msgs: [["c", "What can you do?"], ["a", "I can answer questions, track orders and book appointments."]] },
  { id: "sms", label: "SMS & RCS", icon: CheckCheck, line: "Reach every phone with SMS, with rich branded cards on RCS and automatic fallback.", msgs: [["a", "Your order #4821 has shipped and arrives Friday."], ["c", "Can you deliver to my office?"]] },
  { id: "voice", label: "Voice", icon: Mic, line: "Voice agents answer and place calls, and move the conversation to WhatsApp when helpful.", msgs: [["a", "Hello, this is a reminder about your 4 PM appointment."], ["c", "Please move it to 5 PM."]] },
]

export function DeployEverywhere() {
  const [i, setI] = useState(0)
  const d = DEP[i]
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Head kicker="Channels">Build once and <Grad>deploy everywhere</Grad></Head>
        <div className="mx-auto mt-8 inline-flex rounded-full border border-border bg-secondary p-1" role="tablist" aria-label="Channels">
          {DEP.map((x, n) => (
            <button key={x.id} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition ${n === i ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}><x.icon className="h-4 w-4 text-primary" /> {x.label}</button>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-xl text-[16px] text-muted-foreground">{d.line}</p>
        <div key={d.id} className="mx-auto mt-8 max-w-sm animate-[gsa-in_.35s_ease-out] overflow-hidden rounded-[2rem] border border-border bg-card text-left shadow-2xl shadow-primary/15">
          <div className="flex items-center gap-2 bg-primary px-5 py-3 text-[13.5px] font-semibold text-primary-foreground"><Bot className="h-4 w-4" /> SMSLocal agent</div>
          <div className="min-h-[190px] space-y-2.5 bg-secondary/40 p-5 text-[13.5px]">
            {d.msgs.map(([w, t]) => (
              <div key={t} className={`max-w-[85%] rounded-2xl px-3.5 py-2 shadow-sm ${w === "c" ? "ml-auto rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-card"}`}>{t}</div>
            ))}
          </div>
        </div>
        <Link href="/signup/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">Create your agent <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <style>{`@keyframes gsa-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  )
}

export { ArrowUpRight }

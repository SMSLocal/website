"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

/* Use-case switcher for the AI Agents page: tabs on the left, one live example on the right. */

const CASES = [
  {
    id: "service", tab: "Customer service", href: "/products/ai-agents/customer-service/", cta: "See how it works",
    body: "Deflect repetitive tickets across every channel and escalate the rest with full context.",
    chat: [["Customer", "Where is my parcel?"], ["Captain", "It is out for delivery and should reach you by 6 pm today."]],
  },
  {
    id: "sales", tab: "Sales", href: "/products/ai-agents/sales/", cta: "See how it works",
    body: "Recommend products, recover carts and guide buyers to checkout inside the conversation.",
    chat: [["Customer", "Do you have this in blue?"], ["Captain", "Yes, it is in stock. Shall I add it to your cart?"]],
  },
  {
    id: "booking", tab: "Booking", href: "/products/ai-agents/booking/", cta: "See how it works",
    body: "Schedule appointments in the chat, check availability and send automatic reminders.",
    chat: [["Customer", "Can I see the doctor tomorrow?"], ["Captain", "There is a 4 pm slot free. Shall I book it for you?"]],
  },
  {
    id: "leads", tab: "Lead qualification", href: "/products/ai-agents/lead-qualification/", cta: "See how it works",
    body: "Capture, qualify, score and route hot leads to your team, synced to your CRM.",
    chat: [["Customer", "I am interested in your business plan."], ["Captain", "Great. How big is your team, and when do you want to start?"]],
  },
  {
    id: "builder", tab: "Agent builder", href: "/products/ai-agents/agent-builder/", cta: "Start building",
    body: "Build, train and launch AI agents visually, with no code and no developers.",
    chat: [["Step 1", "Add your documents and FAQs"], ["Step 2", "Test the agent, then switch it on"]],
  },
]

export function AiAgentsTabs() {
  const [on, setOn] = useState(0)
  const c = CASES[on]
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
      <div role="tablist" aria-label="AI agent use cases" className="flex gap-1 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {CASES.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            aria-selected={on === i}
            onClick={() => setOn(i)}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-left text-[15px] font-semibold transition lg:rounded-none lg:px-0 lg:py-3.5 lg:pl-5 lg:text-[19px] ${on === i ? "bg-primary/10 text-primary lg:bg-transparent" : "text-foreground/55 hover:text-foreground"}`}
          >
            <span aria-hidden className={`absolute bottom-1 left-0 top-1 hidden w-[3px] rounded-full bg-primary transition-opacity lg:block ${on === i ? "opacity-100" : "opacity-0"}`} />
            {x.tab}
          </button>
        ))}
      </div>

      <div key={c.id} role="tabpanel" className="ag-fadein grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h3 className="text-[26px] font-semibold tracking-tight">{c.tab}</h3>
          <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-muted-foreground">{c.body}</p>
          <Link href={c.href} className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary">
            {c.cta} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {c.chat.map(([who, text], i) => (
            <div key={who + i} className={i === 0 ? "" : "ml-auto max-w-[92%]"}>
              <p className={`mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] ${i === 0 ? "text-muted-foreground" : "text-primary"}`}>{who}</p>
              <p className={`text-[18px] font-medium leading-snug tracking-tight ${i === 0 ? "" : "text-foreground"}`}>{i === 0 ? `“${text}”` : text}</p>
              {i === 0 ? <span aria-hidden className="mt-4 block h-px w-full bg-gradient-to-r from-border to-transparent" /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

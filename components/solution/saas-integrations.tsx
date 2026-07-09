"use client"

import Link from "next/link"
import { ArrowRight, Layers } from "lucide-react"

type Integration = { name: string; logo: string; blurb: string }

const INTEGRATIONS: Integration[] = [
  { name: "HubSpot", logo: "/logos/hubspot.svg", blurb: "Deals and lifecycle stages" },
  { name: "Stripe", logo: "/logos/stripe.svg", blurb: "Subscription, MRR & churn data" },
  { name: "Salesforce", logo: "/logos/salesforce.svg", blurb: "Enterprise CRM sync" },
  { name: "Segment", logo: "/logos/segment.svg", blurb: "Customer event streams" },
  { name: "Linear", logo: "/logos/linear.svg", blurb: "Bug & issue tracking" },
  { name: "Notion", logo: "/logos/notion.svg", blurb: "Knowledge base sync" },
  { name: "Slack", logo: "/logos/slack.svg", blurb: "Team notifications" },
]

function Card({ name, logo, blurb }: Integration) {
  return (
    <div className="flex w-[230px] shrink-0 items-center gap-3.5 px-6">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} width={24} height={24} className="h-6 w-6 object-contain" />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold tracking-tight text-foreground">{name}</p>
        <p className="truncate text-[12px] leading-snug text-muted-foreground">{blurb}</p>
      </div>
    </div>
  )
}

export function SaasIntegrations() {
  // duplicate the list so the marquee loops seamlessly
  const loop = [...INTEGRATIONS, ...INTEGRATIONS]

  return (
    <div className="mt-12">
      {/* ── single auto-scrolling carousel (boxless) ──────────────── */}
      <div
        className="group relative overflow-hidden py-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center"
          style={{ animation: "marquee-l 32s linear infinite" }}
        >
          {loop.map((it, i) => (
            <div key={`${it.name}-${i}`} className="flex items-center">
              <Card {...it} />
              <span aria-hidden className="h-9 w-px shrink-0 bg-border/50" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Build your own — boxless pretty callout ────────────────── */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/developers/api-docs/"
          className="group relative inline-flex items-center gap-4 overflow-hidden rounded-2xl px-7 py-5 transition-transform hover:scale-[1.02]"
        >
          {/* soft glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-2xl"
            style={{ background: "radial-gradient(120px 60px at 50% 50%, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)" }}
          />
          <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Layers className="h-5 w-5" />
          </span>
          <span className="text-left">
            <span className="block text-[15px] font-semibold tracking-tight text-foreground">Build your own</span>
            <span className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
              REST API &amp; webhooks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </span>
        </Link>
      </div>
    </div>
  )
}

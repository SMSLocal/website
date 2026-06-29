"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight, Check, Cloud, Code2, CreditCard, Facebook,
  GitBranch, Globe, Hash, IndianRupee, MessageCircle,
  Puzzle, Search, ShoppingBag, ShoppingCart, Sparkles,
  Store, Users, Webhook, Workflow, Zap, Star, Send, Mail,
} from "lucide-react"

/* ─── ANIMATED HUB ──────────────────────────────────────────────────────── */
const HUB_NODES = [
  { label: "WhatsApp",   logo: "/logos/whatsapp.svg",    angle: 0,   r: 185, color: "#25D366" },
  { label: "Shopify",    logo: "/logos/shopify.svg",     angle: 40,  r: 190, color: "#96bf48" },
  { label: "HubSpot",    logo: "/logos/hubspot.svg",     angle: 80,  r: 185, color: "#ff7a59" },
  { label: "Salesforce", logo: "/logos/salesforce.svg",  angle: 120, r: 188, color: "#00A1E0" },
  { label: "Zapier",     logo: "/logos/zapier.svg",      angle: 160, r: 185, color: "#FF4A00" },
  { label: "Slack",      logo: "/logos/slack.svg",       angle: 200, r: 188, color: "#4A154B" },
  { label: "WordPress",  logo: "/logos/wordpress.svg",   angle: 240, r: 185, color: "#21759b" },
  { label: "Sheets",     logo: "/logos/googlesheets.svg",angle: 280, r: 188, color: "#34A853" },
  { label: "API",        logo: "/logos/api.svg",         angle: 320, r: 185, color: "#FF6C37" },
]

function toXY(deg: number, r: number, cx: number, cy: number) {
  const a = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function HeroHub() {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setActive(p => (p + 1) % HUB_NODES.length), 1200)
    return () => clearInterval(id)
  }, [])
  const cx = 270, cy = 270

  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none">
      <svg viewBox="0 0 540 540" className="w-full" aria-hidden suppressHydrationWarning>
        <defs>
          <radialGradient id="hglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.17 165)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="oklch(0.72 0.17 165)" stopOpacity="0" />
          </radialGradient>
          <filter id="nodeShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--primary)" floodOpacity="0.16" />
          </filter>
          <filter id="activeShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="oklch(0.72 0.17 165)" floodOpacity="0.30" />
          </filter>
          <linearGradient id="hubBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="oklch(0.72 0.17 165)" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={230} fill="url(#hglow)" />
        <circle cx={cx} cy={cy} r={160} fill="url(#vglow)" />
        {[130, 190].map((r, i) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none"
            stroke={i === 0 ? "color-mix(in oklch, var(--primary) 15%, transparent)" : "color-mix(in oklch, var(--primary) 10%, transparent)"}
            strokeWidth="1" strokeDasharray="6 5" />
        ))}
        {HUB_NODES.map((n, i) => {
          const { x, y } = toXY(n.angle, n.r - 30, cx, cy)
          const isAct = active === i
          return (
            <line key={n.label} x1={cx} y1={cy} x2={x} y2={y}
              stroke={isAct ? n.color : "color-mix(in oklch, var(--primary) 16%, transparent)"}
              strokeWidth={isAct ? 2.5 : 1}
              style={{ transition: "stroke 0.4s, stroke-width 0.4s" }} />
          )
        })}
        {HUB_NODES.map((n, i) => (
          <circle key={`td-${i}`} r="3.5" fill={n.color} opacity={mounted ? 0.85 : 0}>
            <animateMotion dur={`${2 + i * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
              <mpath href={`#sp${i}`} />
            </animateMotion>
          </circle>
        ))}
        <defs>
          {HUB_NODES.map((n, i) => {
            const { x, y } = toXY(n.angle, n.r - 30, cx, cy)
            return <path key={`sp${i}`} id={`sp${i}`} d={`M${cx},${cy} L${x},${y}`} />
          })}
        </defs>
        <circle cx={cx} cy={cy} r={72} fill="var(--card)" filter="url(#nodeShadow)" />
        <circle cx={cx} cy={cy} r={72} fill="none" stroke="url(#hubBorderGrad)" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r={76} fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.25">
          <animate attributeName="r" values="76;98;76" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <text x={cx} y={cy - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--muted-foreground)" fontFamily="system-ui">Platform</text>
        <text x={cx} y={cy + 6}  textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--foreground)"       fontFamily="system-ui">SMSLocal</text>
        <rect x={cx - 26} y={cy + 14} width="52" height="18" rx="9" fill="color-mix(in oklch, var(--primary) 12%, var(--card))" />
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)" fontFamily="system-ui">● LIVE</text>
        {HUB_NODES.map((n, i) => {
          const { x, y } = toXY(n.angle, n.r, cx, cy)
          const isAct = active === i
          return (
            <g key={n.label} onMouseEnter={() => setActive(i)} style={{ cursor: "default" }}>
              {/* Outer glow ring when active */}
              {isAct && (
                <circle cx={x} cy={y} r="30" fill="none"
                  stroke={n.color} strokeWidth="1.5" opacity="0.35"
                  style={{ filter: `drop-shadow(0 0 6px ${n.color})` }}>
                  <animate attributeName="r" values="28;34;28" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Square chip */}
              <rect x={x - 22} y={y - 22} width={44} height={44} rx="12"
                fill="var(--card)"
                stroke={isAct ? n.color : "color-mix(in oklch, var(--border) 80%, transparent)"}
                strokeWidth={isAct ? 2 : 1}
                filter={isAct ? "url(#activeShadow)" : "url(#nodeShadow)"}
                style={{ transition: "stroke 0.35s, stroke-width 0.35s" }} />
              {/* Brand logo */}
              <image href={n.logo} x={x - 11} y={y - 11} width="22" height="22"
                style={{ transition: "opacity 0.3s" }} />
              {/* Active pulse dot — bottom right corner */}
              {isAct && (
                <circle cx={x + 18} cy={y + 18} r="4.5" fill={n.color}>
                  <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          )
        })}
      </svg>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold text-primary-foreground shadow-lg"
        style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))" }}>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" />
        9 Integrations Active
      </div>
    </div>
  )
}

/* ─── INTEGRATION CATEGORIES ─────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "messaging", label: "Messaging Channels", icon: "💬",
    cards: [
      { logo: "/smslocal-icon.png",         name: "Bulk SMS",          desc: "DLT-compliant SMS at scale with 98% delivery rates.",         color: "#f0fdf4" },
      { logo: "/logos/whatsapp.svg",         name: "WhatsApp API",      desc: "Official WhatsApp Business API for rich messaging.",          color: "#f0fdf4" },
      { logo: "/smslocal-icon.png",         name: "RCS Messaging",     desc: "Verified branded cards, carousels and quick replies.",        color: "#f0fdf9" },
      { logo: "/smslocal-icon.png",         name: "OTP API",           desc: "Sub-second OTP delivery on priority routes.",                 color: "#f0fdf4" },
      { logo: "/smslocal-icon.png",         name: "Transactional SMS", desc: "Critical alerts, receipts and order updates.",               color: "#ecfdf5" },
    ],
  },
  {
    id: "crm", label: "CRM & Sales", icon: "📊",
    cards: [
      { logo: "/logos/hubspot.svg",          name: "HubSpot",     desc: "Sync contacts, deals and messaging in one place.",       color: "#fff7ed" },
      { logo: "/logos/salesforce.svg",       name: "Salesforce",  desc: "Bi-directional CRM sync with messaging workflows.",      color: "#eff6ff" },
      { logo: "/logos/zoho.svg",             name: "Zoho CRM",    desc: "Connect Zoho leads to SMS and WhatsApp campaigns.",      color: "#fef2f2" },
      { logo: "/logos/freshsales.svg",       name: "Freshsales",  desc: "Automate follow-ups from conversation threads.",         color: "#f0fdf4" },
    ],
  },
  {
    id: "ecommerce", label: "Ecommerce", icon: "🛍",
    cards: [
      { logo: "/logos/shopify.svg",          name: "Shopify",     desc: "Order alerts, cart recovery and shipping updates.",      color: "#f0fdf4" },
      { logo: "/logos/woocommerce.svg",      name: "WooCommerce", desc: "Trigger WhatsApp messages from WooCommerce events.",     color: "#fdf4ff" },
      { logo: "/logos/magento.svg",          name: "Magento",     desc: "Enterprise ecommerce with multi-channel messaging.",     color: "#fff7ed" },
      { logo: "/logos/opencart.svg",         name: "OpenCart",    desc: "Connect OpenCart to SMS, WhatsApp and RCS.",             color: "#eff9ff" },
    ],
  },
  {
    id: "automation", label: "Automation", icon: "⚡",
    cards: [
      { logo: "/logos/zapier.svg",           name: "Zapier",         desc: "Connect SMSLocal to 5000+ apps without code.",        color: "#fff7ed" },
      { logo: "/logos/make.svg",             name: "Make",           desc: "Visual scenario builder with complex branching.",      color: "#faf5ff" },
      { logo: "/logos/pabbly.svg",           name: "Pabbly Connect", desc: "Affordable multi-step automation for growing teams.", color: "#fff7ed" },
    ],
  },
  {
    id: "developer", label: "Developer APIs", icon: "⚙️",
    cards: [
      { logo: "/logos/api.svg",              name: "REST API",  desc: "Full REST API with JSON, auth headers and webhooks.",      color: "#fff7ed" },
      { logo: "/smslocal-icon.png",         name: "HTTP API",  desc: "Simple GET/POST endpoint for rapid prototyping.",           color: "#f0fdf4" },
      { logo: "/smslocal-icon.png",         name: "Webhooks",  desc: "Real-time event push on delivery, replies and status.",    color: "#f0fdf9" },
      { logo: "/smslocal-icon.png",         name: "SDKs",      desc: "Official Node.js, Python and PHP SDKs on GitHub.",         color: "#ecfdf5" },
    ],
  },
  {
    id: "productivity", label: "Productivity", icon: "💼",
    cards: [
      { logo: "/logos/slack.svg",            name: "Slack",           desc: "Route customer messages directly to Slack channels.", color: "#fdf4ff" },
      { logo: "/logos/googlesheets.svg",     name: "Google Sheets",   desc: "Log conversations and contacts to spreadsheets.",    color: "#f0fdf4" },
      { logo: "/logos/teams.svg",            name: "Microsoft Teams", desc: "Notify teams on conversations and escalations.",     color: "#f0f0ff" },
    ],
  },
]

/**
 * Integration category tabs — boxless split layout.
 *
 * Left: hairline-separated list that stagger-reveals on tab switch.
 *       Active item gets a primary accent bar + color + arrow.
 *       Auto-cycles every 2.2 s; hovering pauses the cycle.
 * Right (desktop only): animated spotlight — big icon, name, desc.
 *       Content fades+scales in when the focused item changes.
 *       Ambient glow blob shifts colour to match the integration.
 *       Progress dots at bottom.
 */
function IntegrationCategoryTabs() {
  const [active, setActive]       = useState("messaging")
  const [focus, setFocus]         = useState(0)
  const [paused, setPaused]       = useState(false)
  // spotlightKey changes client-side only so the entry animation replays;
  // initialised to "" so server + client first render both render without animation.
  const [spotlightKey, setSpotlightKey] = useState("")

  const current = CATEGORIES.find(c => c.id === active)!
  const card = current.cards[Math.min(focus, current.cards.length - 1)]

  // Reset focus on tab change (runs client-side only — no SSR mismatch)
  useEffect(() => {
    setFocus(0)
    setPaused(false)
  }, [active])

  // Update spotlight key whenever active tab or focused item changes (client only)
  useEffect(() => {
    setSpotlightKey(`${active}-${focus}`)
  }, [active, focus])

  // Auto-cycle
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setFocus(f => (f + 1) % current.cards.length), 2200)
    return () => clearInterval(t)
  }, [paused, active, current.cards.length])

  return (
    <div>
      {/* ── Tab pills ──────────────────────────────────────────── */}
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className="flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all duration-300"
            style={active === c.id
              ? { background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", color: "var(--primary-foreground)", borderColor: "transparent", boxShadow: "0 4px 20px color-mix(in oklch, var(--primary) 28%, transparent)" }
              : { background: "var(--card)", color: "var(--muted-foreground)", borderColor: "var(--border)" }
            }>
            <span>{c.icon}</span>{c.label}
          </button>
        ))}
      </div>

      {/* ── Split: list + spotlight ────────────────────────────── */}
      <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">

        {/* LEFT — stagger list (no boxes); key=active remounts on tab switch so stagger replays */}
        <div key={active}>
          {current.cards.map((c, i) => (
            <div
              key={c.name}
              className="group relative flex cursor-pointer items-center gap-4 border-b border-border/50 py-[18px] pl-4 pr-2"
              style={{ animation: `fade-in-up 0.45s ease ${i * 60}ms both` }}
              onMouseEnter={() => { setFocus(i); setPaused(true) }}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Left accent bar */}
              <span
                aria-hidden
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary transition-all duration-300"
                style={{ opacity: focus === i ? 1 : 0, transform: focus === i ? "scaleY(1)" : "scaleY(0.2)", transformOrigin: "top" }}
              />

              {/* Icon */}
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300"
                style={{ background: c.color, transform: focus === i ? "scale(1.08)" : "scale(1)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt={c.name} width={24} height={24} style={{ objectFit: "contain" }} />
              </span>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className={`text-[14.5px] font-semibold transition-colors duration-200 ${focus === i ? "text-primary" : "text-foreground"}`}>
                  {c.name}
                </p>
                <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">{c.desc}</p>
              </div>

              {/* Arrow */}
              <ArrowRight
                className={`h-4 w-4 shrink-0 transition-all duration-300 ${focus === i ? "translate-x-0 text-primary opacity-100" : "-translate-x-1 opacity-0"}`}
              />
            </div>
          ))}
        </div>

        {/* RIGHT — spotlight (no box, pure floating) */}
        <div className="relative hidden min-h-[300px] flex-col items-center justify-center lg:flex">
          {/* Ambient glow blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 rounded-3xl opacity-20 blur-[70px] transition-all duration-700"
            style={{ background: `radial-gradient(circle, ${card.color}, transparent 70%)` }}
          />

          {/* Spotlight content — spotlightKey set client-side so animation only fires after hydration */}
          <div
            key={spotlightKey}
            className="relative flex flex-col items-center text-center"
            style={spotlightKey ? { animation: "fade-in-up 0.38s cubic-bezier(0.22,1,0.36,1) both" } : undefined}
          >
            {/* Big icon */}
            <div
              className="mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-2xl shadow-md"
              style={{ background: card.color }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.logo} alt={card.name} width={48} height={48} style={{ objectFit: "contain" }} />
            </div>

            {/* Name */}
            <h3 className="text-[20px] font-bold tracking-tight text-foreground">{card.name}</h3>

            {/* Desc */}
            <p className="mx-auto mt-3 max-w-[240px] text-[13px] leading-relaxed text-muted-foreground">
              {card.desc}
            </p>

            {/* CTA */}
            <Link
              href="https://app.smslocal.in/signup"
              className="group/cta mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary"
            >
              Connect now
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-0 flex items-center gap-1.5">
            {current.cards.map((_, i) => (
              <button
                key={i}
                aria-label={`Show ${current.cards[i].name}`}
                onClick={() => { setFocus(i); setPaused(true) }}
                className="h-1.5 rounded-full bg-border transition-all duration-300"
                style={{
                  width: focus === i ? "20px" : "6px",
                  background: focus === i ? "var(--primary)" : undefined,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ─── FEATURED INTEGRATIONS ──────────────────────────────────────────────── */
const FEATURED = [
  {
    name: "WhatsApp Business API",
    Icon: MessageCircle,
    tagline: "Official BSP Partner",
    color: "#25D366",
    benefits: ["Official Meta BSP", "Template messaging", "Chatbot automation", "Broadcast campaigns"],
    desc: "Send rich WhatsApp messages — images, videos, buttons, and lists — to millions of customers with guaranteed delivery via SMSLocal's official BSP infrastructure.",
  },
  {
    name: "Shopify",
    Icon: ShoppingBag,
    tagline: "E-commerce #1",
    color: "#96bf48",
    benefits: ["Order notifications", "Cart abandonment", "Shipping updates", "Review requests"],
    desc: "Automatically trigger WhatsApp and SMS messages from Shopify events. Recover abandoned carts, send order updates, and request reviews without writing a line of code.",
  },
  {
    name: "HubSpot",
    Icon: Store,
    tagline: "CRM Powerhouse",
    color: "#ff7a59",
    benefits: ["Contact sync", "Deal notifications", "Lead scoring", "Pipeline automation"],
    desc: "Bi-directionally sync HubSpot contacts and deals with SMSLocal. Send WhatsApp and SMS messages triggered by CRM events and log all conversations back to HubSpot.",
  },
  {
    name: "Zapier",
    Icon: Zap,
    tagline: "5000+ App Connections",
    color: "#ff4a00",
    benefits: ["No-code setup", "5000+ app library", "Multi-step Zaps", "Instant triggers"],
    desc: "Connect SMSLocal to any tool in your stack via Zapier's 5000+ app library. Build multi-step automation flows that trigger SMS, WhatsApp, or RCS messages from any event.",
  },
]

function FeaturedItem({ f, i }: { f: (typeof FEATURED)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group grid grid-cols-[auto_1fr] items-start gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transition: `opacity 0.5s ${i * 80}ms, transform 0.5s ${i * 80}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {/* Icon with number badge */}
      <div className="relative shrink-0">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-md"
          style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))" }}
        >
          <f.Icon className="h-5.5 w-5.5 h-[22px] w-[22px]" />
        </div>
        <span
          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black text-primary-foreground"
          style={{ background: "var(--primary)" }}
        >
          {i + 1}
        </span>
      </div>

      {/* Name + tagline + desc + benefits */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
          <h3 className="text-[15px] font-black tracking-tight text-foreground">{f.name}</h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">{f.tagline}</span>
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground line-clamp-2">{f.desc}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {f.benefits.map((b, bi) => (
            <span
              key={b}
              className="flex items-center gap-1 text-[11.5px] font-medium text-foreground/55"
              style={{
                opacity: shown ? 1 : 0,
                transition: `opacity 0.4s ${i * 80 + 160 + bi * 55}ms`,
              }}
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary/70" />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* CTAs — full row on mobile, inline on sm+ */}
      <div className="col-span-2 flex gap-2 sm:col-span-1 sm:shrink-0">
        <Link
          href="https://app.smslocal.in/signup"
          className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm transition hover:scale-[1.04] hover:shadow-md active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))" }}
        >
          Get Started
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
        <Link
          href="/developers/api-docs"
          className="inline-flex items-center rounded-full border border-border px-4 py-2 text-[12.5px] font-semibold text-foreground/60 transition hover:border-primary/40 hover:text-primary"
        >
          Docs
        </Link>
      </div>
    </div>
  )
}

function FeaturedIntegrations() {
  return (
    <div className="mt-8 flex flex-col divide-y divide-border/40">
      {FEATURED.map((f, i) => (
        <FeaturedItem key={f.name} f={f} i={i} />
      ))}
    </div>
  )
}

/* ─── AUTOMATION WORKFLOWS ───────────────────────────────────────────────── */
const FLOWS = [
  { title: "Lead → OTP → CRM",     color: "var(--primary)",          steps: ["Lead Form", "SMSLocal", "OTP Verify", "Zoho CRM"] },
  { title: "Order → WhatsApp",      color: "oklch(0.72 0.17 165)",    steps: ["Order Placed", "SMSLocal", "WhatsApp", "Customer"] },
  { title: "New Lead → Sales Team", color: "#0891b2",                 steps: ["New Lead", "HubSpot", "SMSLocal", "Sales Team"] },
]

function FlowRow({ flow, index }: { flow: typeof FLOWS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!shown) return
    const t = setInterval(() => setActiveStep(a => (a + 1) % flow.steps.length), 1100)
    return () => clearInterval(t)
  }, [shown, flow.steps.length])

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-10"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${index * 110}ms`,
      }}
    >
      {/* Left: name */}
      <div className="flex items-center gap-3 sm:w-[210px] sm:shrink-0">
        <div className="h-8 w-[2.5px] rounded-full" style={{ background: flow.color }} />
        <div>
          <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">Live Workflow</p>
          <h4 className="mt-0.5 text-[14.5px] font-bold text-foreground">{flow.title}</h4>
        </div>
      </div>

      {/* Right: step pipeline */}
      <div className="flex flex-1 flex-wrap items-center gap-y-2">
        {flow.steps.map((step, si) => (
          <React.Fragment key={step}>
            {/* Step label */}
            <span className="relative text-[13px] font-semibold" style={{ color: activeStep === si ? "var(--foreground)" : "var(--muted-foreground)", transition: "color 0.35s" }}>
              {step}
              {/* animated underline on active step */}
              <span
                className="absolute -bottom-[2px] left-0 h-[1.5px] rounded-full"
                style={{ background: flow.color, width: activeStep === si ? "100%" : "0%", transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)" }}
              />
            </span>

            {/* Connector with traveling dot */}
            {si < flow.steps.length - 1 && (
              <div className="relative mx-3 h-px w-10 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                <span
                  className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full animate-flow-x"
                  style={{ background: flow.color }}
                />
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Live pill */}
        <div className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: flow.color }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full opacity-60" style={{ background: flow.color }} />
            <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: flow.color }} />
          </span>
          Active
        </div>
      </div>
    </div>
  )
}

function AutomationFlows() {
  return (
    <div className="mt-10 divide-y divide-border/40">
      {FLOWS.map((flow, i) => (
        <FlowRow key={flow.title} flow={flow} index={i} />
      ))}
    </div>
  )
}

/* ─── DEV LAPTOP MOCKUP ─────────────────────────────────────────────────── */

const WA_CODE = `// Send WhatsApp via SMSLocal API
const response = await fetch(
  'https://api.smslocal.in/v1/messages',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      channel: 'whatsapp',
      to: '+91XXXXXXXXXX',
      message: 'Hello from SMSLocal!'
    })
  }
);`

const WA_RESPONSE = `// ✓ 200 OK — Message Queued
{
  "id": "msg_01HXZ9K...",
  "status": "queued",
  "channel": "whatsapp"
}`

const WA_SPEEDS = [14, 20, 12, 18, 10, 23, 15, 11, 19, 13, 16, 22, 10, 18, 14]

function devHighlight(code: string): React.ReactNode {
  return code.split("\n").map((line, i) => {
    const trimmed = line.trim()
    if (trimmed.startsWith("//")) {
      return <span key={i} style={{ color: "oklch(0.50 0.02 230)" }}>{line}{"\n"}</span>
    }
    const parts: React.ReactNode[] = []
    const re = /('(?:[^'\\]|\\.)*')/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) parts.push(<span key={`k${last}`} style={{ color: "oklch(0.76 0.10 290)" }}>{line.slice(last, m.index)}</span>)
      parts.push(<span key={`s${m.index}`} style={{ color: "oklch(0.78 0.17 155)" }}>{m[0]}</span>)
      last = m.index + m[0].length
    }
    if (last < line.length) parts.push(<span key={`e${last}`} style={{ color: "oklch(0.76 0.10 290)" }}>{line.slice(last)}</span>)
    return <span key={i}>{parts}{"\n"}</span>
  })
}

function DevLaptop() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [typed, setTyped] = useState("")
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pause" | "response" | "hold">("typing")
  const [respTyped, setRespTyped] = useState("")
  const [respIdx, setRespIdx] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  // Keep cursor visible — scroll to bottom whenever content grows
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [typed, respTyped])

  useEffect(() => {
    if (!mounted || phase !== "typing") return
    if (idx >= WA_CODE.length) {
      const t = setTimeout(() => setPhase("pause"), 650)
      return () => clearTimeout(t)
    }
    const ch = WA_CODE[idx]
    const speed = ch === "\n" ? 32 : WA_SPEEDS[idx % WA_SPEEDS.length]
    const t = setTimeout(() => {
      setTyped(WA_CODE.slice(0, idx + 1))
      setIdx(i => i + 1)
    }, speed)
    return () => clearTimeout(t)
  }, [mounted, idx, phase])

  useEffect(() => {
    if (!mounted || phase !== "pause") return
    const t = setTimeout(() => setPhase("response"), 400)
    return () => clearTimeout(t)
  }, [mounted, phase])

  useEffect(() => {
    if (!mounted || phase !== "response") return
    if (respIdx >= WA_RESPONSE.length) {
      const t = setTimeout(() => setPhase("hold"), 180)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setRespTyped(WA_RESPONSE.slice(0, respIdx + 1))
      setRespIdx(i => i + 1)
    }, 13)
    return () => clearTimeout(t)
  }, [mounted, respIdx, phase])

  useEffect(() => {
    if (!mounted || phase !== "hold") return
    const t = setTimeout(() => {
      setTyped(""); setIdx(0); setPhase("typing")
      setRespTyped(""); setRespIdx(0)
    }, 2800)
    return () => clearTimeout(t)
  }, [mounted, phase])

  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none">
      {/* Deep glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[320px] w-[440px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-45 blur-[80px]"
        style={{ background: "radial-gradient(ellipse, var(--primary), transparent 68%)" }} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[180px] w-[280px] -translate-x-1/2 rounded-full opacity-25 blur-[40px]"
        style={{ background: "oklch(0.72 0.17 165)" }} />

      <div style={{ perspective: "1100px" }}>
        <div style={{ transform: "rotateX(4deg)", transformOrigin: "50% 100%" }}>

          {/* Screen lid */}
          <div className="relative overflow-hidden rounded-t-[18px]"
            style={{
              background: "linear-gradient(160deg, oklch(0.27 0.03 232), oklch(0.20 0.025 230))",
              border: "1.5px solid oklch(0.36 0.04 232)",
              boxShadow: "inset 0 1px 0 oklch(0.42 0.04 232), 0 0 0 1px oklch(0.14 0.02 230)",
            }}>

            {/* Camera bar */}
            <div className="flex items-center justify-center py-3"
              style={{ background: "oklch(0.21 0.027 231)", borderBottom: "1px solid oklch(0.28 0.03 230)" }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.34 0.02 230)" }} />
            </div>

            {/* Screen glass — FIXED height, flex column so content never resizes the laptop */}
            <div className="mx-3 mb-3 mt-2 flex flex-col overflow-hidden rounded-xl"
              style={{ background: "oklch(0.085 0.012 232)", boxShadow: "inset 0 0 0 1px oklch(0.20 0.02 230)", height: 340 }}>

              {/* Editor title bar — fixed, never scrolls */}
              <div className="flex shrink-0 items-center justify-between px-4 py-2.5"
                style={{ background: "linear-gradient(180deg, oklch(0.13 0.018 232), oklch(0.11 0.015 232))", borderBottom: "1px solid oklch(0.19 0.02 230)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f5780]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e80]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c84080]" />
                  <span className="ml-3 font-mono text-[10.5px] tracking-wide text-white/30">send-whatsapp.js</span>
                </div>
                <span className="rounded border px-2 py-0.5 font-mono text-[9px] font-semibold"
                  style={{ borderColor: "oklch(0.72 0.15 168 / 0.30)", background: "oklch(0.72 0.15 168 / 0.08)", color: "oklch(0.72 0.15 168 / 0.80)" }}>
                  REST API
                </span>
              </div>

              {/* Scroll area — fills remaining height, overflows upward as code grows */}
              <div ref={scrollRef} className="flex-1 overflow-hidden">
                {/* Code */}
                <div className="px-5 py-4 font-mono text-[11.5px] leading-[1.8]">
                  {mounted ? (
                    <div className="whitespace-pre-wrap break-words">
                      {devHighlight(typed)}
                      {phase === "typing" && (
                        <span aria-hidden className="relative -top-px inline-block w-[2px] h-[14px] align-middle rounded-sm"
                          style={{ background: "var(--primary)", animation: "cursor-blink 1.06s step-end infinite" }} />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/15 text-[10px] font-sans">
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      Initialising editor…
                    </div>
                  )}
                </div>

                {/* Response — inside scroll area so it scrolls into view */}
                {mounted && respTyped && (
                  <div className="mx-4 mb-4 overflow-hidden rounded-xl"
                    style={{ border: "1px solid oklch(0.72 0.15 168 / 0.25)", background: "oklch(0.11 0.05 168)", boxShadow: "0 0 28px -6px oklch(0.70 0.15 168 / 0.25)" }}>
                    <div className="border-b px-4 py-2" style={{ borderColor: "oklch(0.72 0.15 168 / 0.20)", background: "oklch(0.12 0.05 168)" }}>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                        {respTyped.split("\n")[0]}
                      </span>
                    </div>
                    <pre className="px-4 py-3 font-mono text-[11px] leading-[1.8] text-emerald-400 whitespace-pre-wrap">
                      {respTyped.split("\n").slice(1).join("\n")}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hinge */}
          <div className="h-[4px] w-full"
            style={{ background: "linear-gradient(90deg, oklch(0.20 0.03 230) 0%, oklch(0.40 0.035 230) 25%, oklch(0.43 0.04 232) 50%, oklch(0.40 0.035 230) 75%, oklch(0.20 0.03 230) 100%)", boxShadow: "0 1px 3px oklch(0.10 0.02 230)" }} />

          {/* Keyboard base */}
          <div className="relative overflow-hidden rounded-b-[18px] px-6 pt-4 pb-6"
            style={{ background: "linear-gradient(180deg, oklch(0.24 0.028 230), oklch(0.195 0.023 230))", border: "1.5px solid oklch(0.32 0.032 230)", borderTop: "none", boxShadow: "0 8px 32px -4px oklch(0.10 0.02 230)" }}>
            {[13, 13, 12, 10].map((count, row) => (
              <div key={row} className={`flex gap-[4px] ${row > 0 ? "mt-[4px]" : ""}`}>
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="flex-1 rounded-[4px]"
                    style={{ height: 12, background: "linear-gradient(180deg, oklch(0.30 0.03 234), oklch(0.255 0.026 232))", boxShadow: "0 2px 0 oklch(0.185 0.022 230), inset 0 1px 0 oklch(0.34 0.032 234)" }} />
                ))}
              </div>
            ))}
            <div className="mx-auto mt-[4px] rounded-[4px]"
              style={{ height: 12, width: "48%", background: "linear-gradient(180deg, oklch(0.30 0.03 234), oklch(0.255 0.026 232))", boxShadow: "0 2px 0 oklch(0.185 0.022 230), inset 0 1px 0 oklch(0.34 0.032 234)" }} />
            <div className="mx-auto mt-4 rounded-[10px]"
              style={{ height: 36, width: "40%", background: "linear-gradient(160deg, oklch(0.225 0.026 230), oklch(0.20 0.023 230))", border: "1px solid oklch(0.31 0.03 230)", boxShadow: "inset 0 1px 0 oklch(0.28 0.028 230)" }} />
          </div>

        </div>
      </div>

      {/* Floor shadow */}
      <div aria-hidden className="mx-12 mt-1 h-3 rounded-b-full opacity-60 blur-lg"
        style={{ background: "oklch(0.085 0.02 230)" }} />
    </div>
  )
}

/* ─── DEVELOPER SECTION ─────────────────────────────────────────────────── */
const DEV_CARDS = [
  { icon: Code2,     title: "API Documentation",  desc: "Full REST API reference with live examples and Postman collection." },
  { icon: GitBranch, title: "SDK Libraries",       desc: "Official SDKs for Node.js, Python, PHP, Ruby, and Go." },
  { icon: Webhook,   title: "Webhook Events",      desc: "Real-time delivery receipts, reply events, and status changes." },
  { icon: Globe,     title: "Sandbox Environment", desc: "Test integrations in isolation without affecting production data." },
]

function DevFeatureList() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-8 divide-y divide-white/8">
      {DEV_CARDS.map((c, i) => {
        const Icon = c.icon
        return (
          <div
            key={c.title}
            className="group relative flex items-center gap-4 py-4 cursor-default pl-3"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateX(-16px)",
              transition: "opacity 0.55s, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
              transitionDelay: `${i * 85}ms`,
            }}
          >
            {/* Left accent bar — slides in on hover */}
            <span className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

            {/* Number */}
            <span className="w-6 shrink-0 text-[10.5px] font-black tabular-nums text-white/20 group-hover:text-primary/60 transition-colors duration-300">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon */}
            <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-primary/60 group-hover:bg-primary/15 group-hover:text-primary transition-all duration-300">
              <Icon className="h-4 w-4" />
            </span>

            {/* Title */}
            <span className="text-[13.5px] font-bold text-white/75 group-hover:text-white transition-colors duration-300 w-[155px] shrink-0">
              {c.title}
            </span>

            {/* Desc */}
            <span className="hidden sm:block text-[12px] leading-relaxed text-white/35 group-hover:text-white/55 transition-colors duration-300">
              {c.desc}
            </span>

            {/* Arrow peek on hover */}
            <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-primary/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        )
      })}
    </div>
  )
}

function DeveloperSection() {
  return (
    <section className="py-14" style={{ background: "linear-gradient(160deg, oklch(0.17 0.03 230) 0%, oklch(0.19 0.03 220) 60%, oklch(0.17 0.03 230) 100%)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary/90">
              <Code2 className="h-3 w-3" /> For Developers
            </span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built For{" "}
              <span style={{ background: "linear-gradient(90deg,var(--primary),oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Developers
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-white/60">
              Full-featured REST API, SDKs in 5 languages, real-time webhooks, and a sandbox to test without friction. Ship in hours, not weeks.
            </p>
            <DevFeatureList />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/developers/api-docs"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:opacity-90"
                style={{ boxShadow: "0 8px 24px color-mix(in oklch, var(--primary) 30%, transparent)" }}>
                View API Docs <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="https://app.smslocal.in/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
                Get Free API Key
              </Link>
            </div>
          </div>

          {/* Laptop mockup with animated code typing */}
          <DevLaptop />
        </div>
      </div>
    </section>
  )
}

/* ─── WHY SMSLOCAL ──────────────────────────────────────────────────────── */
const WHY_ITEMS = [
  { icon: "📈", title: "High Delivery Rates",  desc: "98.4% SMS delivery and 99.2% WhatsApp delivery across India's top operators.",   stat: "98.4%" },
  { icon: "⚡", title: "Fast API Response",    desc: "Sub-200ms API response time with redundant infrastructure across 4 data centers.", stat: "<200ms" },
  { icon: "🛡", title: "Enterprise Security",  desc: "AES-256 encryption, GDPR compliance, SOC 2 roadmap, and Indian data residency.",   stat: "AES-256" },
  { icon: "🚀", title: "Easy Setup",           desc: "Connect your first integration in under 10 minutes with one-click OAuth and docs.", stat: "10 min" },
]

function WhySMSLocal() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-8 flex flex-col divide-y divide-border/60 sm:flex-row sm:divide-x sm:divide-y-0">
      {WHY_ITEMS.map((item, i) => (
        <div
          key={item.title}
          className="flex flex-1 flex-col px-6 py-7 first:pl-0 last:pr-0 sm:py-0"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(22px)",
            transition: "opacity 0.6s, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${i * 100}ms`,
          }}
        >
          {/* Stat — large gradient number with sweeping underline */}
          <div className="relative w-fit">
            <span
              className="text-[34px] font-black tracking-tight leading-none"
              style={{
                background: "linear-gradient(135deg, var(--primary), oklch(0.72 0.17 165))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {item.stat}
            </span>
            <span
              className="absolute -bottom-1 left-0 h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--primary), oklch(0.72 0.17 165))",
                width: shown ? "100%" : "0%",
                transition: "width 0.75s cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${i * 100 + 220}ms`,
              }}
            />
          </div>

          {/* Icon + title */}
          <div className="mt-5 flex items-center gap-2">
            <span className="text-[15px]">{item.icon}</span>
            <h3 className="text-[14px] font-bold tracking-tight text-foreground">{item.title}</h3>
          </div>

          {/* Desc */}
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ─── INTEGRATION REQUEST FORM ──────────────────────────────────────────── */
function IntegrationRequestForm() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", integration: "" })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow — no box, just atmosphere */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full opacity-[0.06] blur-3xl bg-primary" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 right-1/4 h-56 w-56 rounded-full opacity-[0.05] blur-3xl" style={{ background: "oklch(0.72 0.17 165)" }} />

      <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24 items-start">

        {/* Left — text content */}
        <div
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(20px)",
            transition: "opacity 0.6s, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-primary">
            <Puzzle className="h-3 w-3" />
            Integration Request
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Need Another<br />Integration?
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            Tell us what platform you use and we&apos;ll help connect it. Our team reviews every request within 48 hours.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {["Most requests done in 2–4 weeks", "Free for all customers", "Custom integrations available"].map((b, bi) => (
              <div
                key={b}
                className="flex items-center gap-3 text-[13.5px] font-medium text-foreground/80"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "none" : "translateX(-10px)",
                  transition: "opacity 0.5s, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${170 + bi * 80}ms`,
                }}
              >
                <span className="shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full text-primary-foreground"
                  style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))" }}>
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(26px)",
            transition: "opacity 0.65s, transform 0.65s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: "110ms",
          }}
        >
          {sent ? (
            <div className="flex flex-col items-start gap-3 py-6">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground text-[18px] font-bold"
                style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))" }}
              >
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <h3 className="text-[22px] font-bold text-foreground">Request Received!</h3>
              <p className="text-[14.5px] text-muted-foreground">Our team will reach out within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {[
                { name: "name",        placeholder: "Your Name",                                   type: "text",  Icon: Users },
                { name: "email",       placeholder: "Work Email",                                  type: "email", Icon: Mail },
                { name: "integration", placeholder: "Integration needed (e.g. Notion, Stripe…)",   type: "text",  Icon: Puzzle },
              ].map((field, fi) => (
                <div
                  key={field.name}
                  className="relative"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? "none" : "translateY(14px)",
                    transition: "opacity 0.5s, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: `${fi * 90 + 200}ms`,
                  }}
                >
                  <field.Icon className="absolute left-0 top-3 h-4 w-4 text-muted-foreground/50" />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={(form as Record<string, string>)[field.name]}
                    onChange={e => setForm(p => ({ ...p, [field.name]: e.target.value }))}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent pl-7 pr-0 py-2.5 text-[14.5px] text-foreground outline-none placeholder:text-muted-foreground/45 border-0 border-b-2 border-border transition-colors duration-200"
                    style={{ borderBottomColor: focused === field.name ? "var(--primary)" : undefined }}
                  />
                  {/* Gradient sweep underline on focus */}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] rounded-full pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg,var(--primary),oklch(0.72 0.17 165))",
                      width: focused === field.name ? "100%" : "0%",
                      transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-8 text-[14px] font-bold text-primary-foreground transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] self-start"
                style={{
                  background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))",
                  boxShadow: "0 8px 24px color-mix(in oklch, var(--primary) 28%, transparent)",
                }}
              >
                Submit Request <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── FAQ ───────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "Is the Zapier integration free?",                   a: "The SMSLocal side of the Zapier integration is free on every paid plan — connect SMS, WhatsApp, OTP, and RCS triggers at no extra cost. Zapier's own pricing applies; their free tier already covers basic automations like \"new lead → send SMS\"." },
  { q: "Can I keep my existing DLT sender IDs and templates?", a: "Yes. When you connect SMSLocal we migrate your approved Sender IDs (headers) and DLT content templates across Jio, Airtel, Vi, and BSNL — so your transactional and OTP traffic keeps flowing without re-registration delays." },
  { q: "Is there a public REST API?",                       a: "Yes. SMSLocal ships a full REST API with CRUD for contacts, campaigns, and messages, idempotency keys, signed webhooks, and official SDKs for Node.js, Python, PHP, and Go. A sandbox lets you simulate delivery and carrier failures without spending credit." },
  { q: "Can SMSLocal integrate with my custom CRM?",        a: "Absolutely. Beyond the native HubSpot, Salesforce, and Zoho connectors, you can wire any in-house CRM to SMSLocal through the REST API, webhooks, or Zapier/Make — no waiting on a pre-built connector." },
  { q: "Does SMSLocal support SAML SSO?",                   a: "Yes. SAML 2.0 single sign-on and SCIM user provisioning are available on Enterprise plans, alongside role-based access, IP allowlists, and scoped API keys for every team member." },
  { q: "How fast can I go live?",                           a: "Most one-click OAuth integrations (Shopify, HubSpot, Zapier) connect in under 10 minutes. Custom API integrations typically take 1–2 days. Every new account gets ₹60 of free credit to test on live numbers before paying." },
]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mx-auto mt-12 max-w-3xl flex flex-col gap-3">
      {FAQS.map((faq, i) => (
        <div key={i}
          className={`overflow-hidden rounded-2xl border transition-all bg-card ${open === i ? "border-primary/30 shadow-md" : "border-border"}`}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-6 text-left">
            <span className={`text-[15px] font-semibold tracking-tight transition ${open === i ? "text-primary" : "text-foreground"}`}>
              {faq.q}
            </span>
            <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${open === i ? "rotate-45 border-primary/30 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"}`}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {open === i && <p className="px-6 pb-6 text-[14px] leading-relaxed text-muted-foreground">{faq.a}</p>}
        </div>
      ))}
    </div>
  )
}

/* ─── ORBITING CTA VISUAL ───────────────────────────────────────────────── */
const ORBIT_INNER = [
  "/logos/whatsapp.svg",
  "/logos/hubspot.svg",
  "/logos/zapier.svg",
  "/logos/wordpress.svg",
  "/logos/stripe.svg",
]
const ORBIT_OUTER = [
  "/logos/shopify.svg",
  "/logos/salesforce.svg",
  "/logos/slack.svg",
  "/logos/googlesheets.svg",
  "/logos/make.svg",
]

function OrbitCta() {
  /* inner ring: 168px diameter (r=84), clockwise 24s
     outer ring: 256px diameter (r=128), counter-clockwise 38s
     icons counter-rotate at same speed to stay upright */
  return (
    <div className="relative mx-auto h-[300px] w-[300px] select-none">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--primary)" }} />

      {/* Visual ring guides */}
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[168px] w-[168px] rounded-full border border-white/15" style={{ borderStyle: "dashed" }} />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[256px] w-[256px] rounded-full border border-white/8" style={{ borderStyle: "dashed" }} />

      {/* Inner ring — clockwise */}
      <div className="absolute top-1/2 left-1/2"
        style={{ width: 168, height: 168, marginLeft: -84, marginTop: -84, animation: "orbit 24s linear infinite" }}>
        {ORBIT_INNER.map((logo, i) => {
          const a = ((i / ORBIT_INNER.length) * 360 - 90) * (Math.PI / 180)
          return (
            <div key={i} style={{
              position: "absolute",
              left: 84 + 84 * Math.cos(a) - 18,
              top:  84 + 84 * Math.sin(a) - 18,
              animation: "orbit-reverse 24s linear infinite",
            }}>
              <div className="h-9 w-9 flex items-center justify-center rounded-xl border border-white/25 bg-white/12 shadow-lg backdrop-blur-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="" width={18} height={18} style={{ objectFit: "contain" }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Outer ring — counter-clockwise */}
      <div className="absolute top-1/2 left-1/2"
        style={{ width: 256, height: 256, marginLeft: -128, marginTop: -128, animation: "orbit-reverse 38s linear infinite" }}>
        {ORBIT_OUTER.map((logo, i) => {
          const a = ((i / ORBIT_OUTER.length) * 360 - 90) * (Math.PI / 180)
          return (
            <div key={i} style={{
              position: "absolute",
              left: 128 + 128 * Math.cos(a) - 18,
              top:  128 + 128 * Math.sin(a) - 18,
              animation: "orbit 38s linear infinite",
            }}>
              <div className="h-9 w-9 flex items-center justify-center rounded-xl border border-white/18 bg-white/8 shadow-md backdrop-blur-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="" width={18} height={18} style={{ objectFit: "contain" }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span aria-hidden className="absolute inset-[-8px] rounded-[22px] border border-primary/35 pointer-events-none"
          style={{ animation: "pulse-ring 3s ease-out infinite" }} />
        <span aria-hidden className="absolute inset-[-16px] rounded-[26px] border border-primary/15 pointer-events-none"
          style={{ animation: "pulse-ring 3s ease-out infinite 1s" }} />
        <div className="relative flex h-[80px] w-[80px] flex-col items-center justify-center gap-1 rounded-2xl text-primary-foreground shadow-2xl"
          style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))" }}>
          <span className="text-[9px] font-semibold uppercase tracking-wider opacity-70">Platform</span>
          <span className="text-[13.5px] font-black leading-none">SMSLocal</span>
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-1.5 py-[2px] text-[7.5px] font-bold">
            <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── TRUST LOGOS marquee ───────────────────────────────────────────────── */
type BrandLogo = { logo: string; name: string; color: string }

const ROW_A: BrandLogo[] = [
  { logo: "/logos/shopify.svg",     name: "Shopify",     color: "#96bf48" },
  { logo: "/logos/woocommerce.svg", name: "WooCommerce", color: "#9b5c8f" },
  { logo: "/logos/wordpress.svg",   name: "WordPress",   color: "#21759b" },
  { logo: "/logos/zapier.svg",      name: "Zapier",      color: "#ff4a00" },
  { logo: "/logos/hubspot.svg",     name: "HubSpot",     color: "#ff7a59" },
  { logo: "/logos/salesforce.svg",  name: "Salesforce",  color: "#00A1E0" },
  { logo: "/logos/stripe.svg",      name: "Stripe",      color: "#635bff" },
  { logo: "/logos/slack.svg",       name: "Slack",       color: "#4A154B" },
  { logo: "/logos/google.svg",      name: "Google",      color: "#4285F4" },
  { logo: "/logos/whatsapp.svg",    name: "WhatsApp",    color: "#25D366" },
  { logo: "/logos/meta.svg",        name: "Meta",        color: "#0081FB" },
  { logo: "/logos/razorpay.svg",    name: "Razorpay",    color: "#2D6FD4" },
]
const ROW_B: BrandLogo[] = [
  { logo: "/logos/slack.svg",       name: "Slack",      color: "#4A154B" },
  { logo: "/logos/google.svg",      name: "Google",     color: "#4285F4" },
  { logo: "/logos/whatsapp.svg",    name: "WhatsApp",   color: "#25D366" },
  { logo: "/logos/meta.svg",        name: "Meta",       color: "#0081FB" },
  { logo: "/logos/razorpay.svg",    name: "Razorpay",   color: "#2D6FD4" },
  { logo: "/logos/make.svg",        name: "Make",       color: "#a259ff" },
  { logo: "/logos/pabbly.svg",      name: "Pabbly",     color: "#e05c27" },
]

function LogoMarquee({ logos, dir }: { logos: BrandLogo[]; dir: "l" | "r" }) {
  const items = [...logos, ...logos]
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`group flex min-w-max items-center gap-12 ${dir === "l" ? "animate-marquee-l" : "animate-marquee-r"} hover:[animation-play-state:paused]`}
        style={{ willChange: "transform" }}
      >
        {items.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 opacity-55 transition-opacity duration-300 hover:opacity-100"
          >
            <span
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${l.color}18` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.logo} alt={l.name} width={16} height={16} style={{ objectFit: "contain" }} />
            </span>
            <span className="whitespace-nowrap text-[13.5px] font-semibold text-foreground/70">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── SECTION WRAPPERS ──────────────────────────────────────────────────── */
function Sec({ children, tone = "white", id }: { children: React.ReactNode; tone?: "white" | "gray"; id?: string }) {
  return (
    <section id={id} className={`py-14 ${tone === "gray" ? "bg-muted/40" : "bg-background"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  )
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
      {children}
    </span>
  )
}

function SectionHeading({ title, sub, center }: { title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  )
}

/* ─── MAIN EXPORT ───────────────────────────────────────────────────────── */
export function IntegrationsPremiumPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/40 to-background pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-[20%] h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -top-20 right-[10%] h-[400px] w-[400px] rounded-full opacity-12 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.17 165), transparent 70%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-[12px] font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-sm mb-7">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                100+ Integrations Available
              </div>

              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-[58px] leading-[1.06]">
                Connect SMSLocal With Your{" "}
                <span className="relative inline-block">
                  <span style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Entire Stack
                  </span>
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                Integrate SMS, WhatsApp, RCS, OTP, Marketing Automation, CRMs, eCommerce platforms
                and developer tools from one unified messaging platform.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href="https://app.smslocal.in/signup"
                  className="group inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-[15px] font-bold text-primary-foreground shadow-xl transition hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", boxShadow: "0 12px 40px color-mix(in oklch, var(--primary) 32%, transparent)" }}>
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/developers/api-docs"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card px-7 py-4 text-[15px] font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                  <Code2 className="h-4 w-4 text-primary" /> View API Docs
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                {["Free plan · No credit card", "5-min setup", "99.9% uptime SLA"].map(t => (
                  <span key={t} className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <HeroHub />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR — single animated row ─────────────────────────────── */}
      <div className="w-full overflow-hidden border-y border-border bg-background py-10">
        <p className="mb-7 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60">
          Trusted by growing businesses across India
        </p>
        <LogoMarquee logos={ROW_A} dir="l" />
      </div>

      {/* ── INTEGRATION CATEGORIES ───────────────────────────────────────── */}
      <Sec id="integrations" tone="gray">
        <SectionBadge><Puzzle className="h-3 w-3" /> Integration Marketplace</SectionBadge>
        <SectionHeading
          title={<>Browse All <span style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Integrations</span></>}
          sub="Connect SMSLocal to the tools your team already uses. One-click setup, no developers needed."
        />
        <IntegrationCategoryTabs />
      </Sec>

      {/* ── FEATURED INTEGRATIONS ────────────────────────────────────────── */}
      <Sec>
        <SectionBadge><Star className="h-3 w-3" /> Featured</SectionBadge>
        <SectionHeading
          title="Deepest Integrations Built In"
          sub="Go beyond basic connectivity. These featured integrations include bi-directional sync, automation triggers, and real-time data flow."
        />
        <FeaturedIntegrations />
      </Sec>

      {/* ── AUTOMATION WORKFLOWS ─────────────────────────────────────────── */}
      <Sec tone="gray">
        <div className="text-center">
          <SectionBadge><Workflow className="h-3 w-3" /> Automation</SectionBadge>
          <SectionHeading
            center
            title={<>Automate Customer <span style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Engagement</span></>}
            sub="Set up powerful automation workflows in minutes. Connect events from any tool to messaging actions in SMSLocal."
          />
        </div>
        <AutomationFlows />

        <div className="mt-10 flex flex-wrap items-stretch justify-center divide-y divide-border/50 sm:divide-x sm:divide-y-0">
          {[
            { val: "5000+",  label: "Apps via Zapier" },
            { val: "10 min", label: "Average setup time" },
            { val: "0 code", label: "For most workflows" },
            { val: "99.9%",  label: "Automation uptime" },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center justify-center px-8 py-5 w-1/2 sm:w-auto">
              <p className="text-[28px] font-black tracking-tight"
                style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.val}
              </p>
              <p className="mt-1 text-[12px] font-medium text-muted-foreground text-center">{s.label}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── DEVELOPER SECTION ────────────────────────────────────────────── */}
      <DeveloperSection />

      {/* ── WHY SMSLOCAL ─────────────────────────────────────────────────── */}
      <Sec>
        <div className="text-center">
          <SectionBadge><Sparkles className="h-3 w-3" /> Why SMSLocal</SectionBadge>
          <SectionHeading center title="Enterprise-Ready Infrastructure"
            sub="Built for businesses that need reliability, speed, and security at scale." />
        </div>
        <WhySMSLocal />
      </Sec>

      {/* ── INTEGRATION REQUEST ──────────────────────────────────────────── */}
      <Sec tone="gray">
        <IntegrationRequestForm />
      </Sec>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <Sec>
        <div className="text-center">
          <SectionBadge>FAQ</SectionBadge>
          <SectionHeading center title="Common Questions About Integrations" />
        </div>
        <FaqSection />
      </Sec>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "linear-gradient(160deg, oklch(0.17 0.03 230) 0%, oklch(0.19 0.03 220) 50%, oklch(0.22 0.04 200) 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary/90 backdrop-blur-sm">
                <Sparkles className="h-3 w-3" /> Get Started Today
              </span>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
                Connect Your Entire<br />Messaging Infrastructure
              </h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/60">
                Launch SMS, WhatsApp and RCS workflows in minutes. Free plan includes 60 SMS credits — no credit card required.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="https://app.smslocal.in/signup"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-[15px] font-bold text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:opacity-90"
                  style={{ boxShadow: "0 8px 32px color-mix(in oklch, var(--primary) 40%, transparent)" }}>
                  <Zap className="h-4 w-4" /> Start Free Trial
                </Link>
                <Link href="/company/contact"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/8 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/12 hover:-translate-y-0.5">
                  Contact Sales <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5">
                {["100+ Integrations", "REST API & Webhooks", "India DLT Compliant", "₹60 Free Credits"].map(t => (
                  <span key={t} className="flex items-center gap-2 text-[13px] font-semibold text-white/65">
                    <Check className="h-4 w-4 text-primary/80" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:block opacity-90">
              <OrbitCta />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

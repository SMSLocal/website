"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Check } from "lucide-react"

/* ── Hub & spoke animated visual ─────────────────────────────────────── */

const NODES = [
  { label: "Shopify",       emoji: "🛍",  color: "#fef3c7", angle: 310, r: 200 },
  { label: "HubSpot",       emoji: "🟠",  color: "#fee2e2", angle: 350, r: 195 },
  { label: "Salesforce",    emoji: "☁️",  color: "#dbeafe", angle: 30,  r: 200 },
  { label: "WhatsApp",      emoji: "💚",  color: "#dcfce7", angle: 70,  r: 195 },
  { label: "Zapier",        emoji: "⚡",  color: "#fef9c3", angle: 110, r: 200 },
  { label: "Zoho CRM",      emoji: "🔵",  color: "#ede9fe", angle: 150, r: 195 },
  { label: "Slack",         emoji: "💬",  color: "#f0f9ff", angle: 190, r: 200 },
  { label: "Razorpay",      emoji: "💳",  color: "#fce7f3", angle: 230, r: 195 },
  { label: "Google Sheets", emoji: "📋",  color: "#dcfce7", angle: 265, r: 200 },
  { label: "WooCommerce",   emoji: "🛒",  color: "#ede9fe", angle: 290, r: 195 },
]

function toXY(angleDeg: number, r: number, cx: number, cy: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

export function IntegrationsHubVisual() {
  const [active, setActive] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // cycle highlight
    let idx = 0
    const id = setInterval(() => {
      setActive(idx % NODES.length)
      idx++
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const cx = 260
  const cy = 240

  return (
    <div className="relative mx-auto w-full max-w-[520px] select-none">
      <svg
        viewBox="0 0 520 480"
        className="w-full"
        aria-label="SMSLocal integration hub diagram"
      >
        {/* Subtle grid dots */}
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="520" height="480" fill="url(#dots)" />
        <circle cx={cx} cy={cy} r={215} fill="url(#glow)" />

        {/* Spokes */}
        {NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy)
          const isActive = active === i
          return (
            <line
              key={node.label}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={isActive ? "oklch(0.62 0.14 168)" : "rgba(255,255,255,0.12)"}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray={isActive ? "none" : "5 4"}
              style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
            />
          )
        })}

        {/* Traveling dots */}
        {mounted && NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy)
          return (
            <circle key={`dot-${i}`} r="3.5" fill="oklch(0.72 0.15 168)" opacity="0.9">
              <animateMotion
                dur={`${2.2 + i * 0.18}s`}
                repeatCount="indefinite"
                begin={`${i * 0.22}s`}
              >
                <mpath
                  href={`#path-${i}`}
                />
              </animateMotion>
            </circle>
          )
        })}
        {/* Hidden paths for animateMotion */}
        <defs>
          {NODES.map((node, i) => {
            const { x, y } = toXY(node.angle, node.r, cx, cy)
            return (
              <path
                key={`p-${i}`}
                id={`path-${i}`}
                d={`M${cx},${cy} L${x},${y}`}
              />
            )
          })}
        </defs>

        {/* Center hub */}
        <g>
          <circle cx={cx} cy={cy} r={60} fill="white" />
          <circle cx={cx} cy={cy} r={60} fill="none" stroke="oklch(0.62 0.14 168)" strokeWidth="1.5" strokeDasharray="0" opacity="0.4" />
          {/* Pulsing ring */}
          <circle cx={cx} cy={cy} r={62} fill="none" stroke="oklch(0.62 0.14 168)" strokeWidth="1" opacity="0.25">
            <animate attributeName="r" values="62;78;62" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy - 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="oklch(0.48 0.02 230)" fontFamily="inherit">Platform</text>
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="oklch(0.18 0.02 230)" fontFamily="inherit">SMSLocal</text>
          <rect x={cx - 22} y={cy + 14} width="44" height="16" rx="8" fill="oklch(0.62 0.14 168)" opacity="0.15" />
          <text x={cx} y={cy + 25} textAnchor="middle" fontSize="9" fontWeight="700" fill="oklch(0.62 0.14 168)" fontFamily="inherit">● LIVE</text>
        </g>

        {/* Node bubbles */}
        {NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy)
          const isActive = active === i
          return (
            <g
              key={node.label}
              style={{ cursor: "default" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <rect
                x={x - 44}
                y={y - 18}
                width={88}
                height={36}
                rx="10"
                fill="white"
                stroke={isActive ? "oklch(0.62 0.14 168)" : "oklch(0.92 0.008 200)"}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ filter: isActive ? "drop-shadow(0 4px 12px rgba(22,163,74,0.18))" : "drop-shadow(0 1px 3px rgba(0,0,0,0.06))", transition: "all 0.3s" }}
              />
              <text x={x - 28} y={y + 5} fontSize="14" textAnchor="middle" dominantBaseline="middle">{node.emoji}</text>
              <text x={x + 8} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fontWeight="600" fill={isActive ? "oklch(0.36 0.14 168)" : "oklch(0.34 0.02 230)"} fontFamily="inherit">
                {node.label.length > 9 ? node.label.slice(0, 9) + "…" : node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Connected badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[12px] font-semibold text-white shadow-lg shadow-primary/25">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Connected Successfully
      </div>
    </div>
  )
}

/* ── Integration tabs section ─────────────────────────────────────────── */

type Integration = {
  name: string
  emoji: string
  bg: string
  desc: string
  badge?: string
}

const TABS: { id: string; label: string; integrations: Integration[] }[] = [
  {
    id: "crm",
    label: "CRM",
    integrations: [
      { name: "HubSpot",      emoji: "🟠", bg: "#fee2e2", desc: "Sync contacts, deals and conversations automatically." },
      { name: "Salesforce",   emoji: "☁️", bg: "#dbeafe", desc: "Bi-directional CRM sync with leads and pipelines." },
      { name: "Zoho CRM",     emoji: "🔵", bg: "#dcfce7", desc: "Map messages to deals, contacts and activities." },
      { name: "Freshsales",   emoji: "🟡", bg: "#fef9c3", desc: "Automate follow-ups from conversation threads." },
      { name: "Pipedrive",    emoji: "🟣", bg: "#f3e8ff", desc: "Push leads from campaigns into your pipeline." },
      { name: "LeadSquared",  emoji: "🔴", bg: "#fce7f3", desc: "India-first CRM with SMS and WhatsApp automation." },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    integrations: [
      { name: "Shopify",      emoji: "🛍", bg: "#fef3c7", desc: "Order alerts, abandoned cart recovery, shipping updates.", badge: "Popular" },
      { name: "WooCommerce",  emoji: "🛒", bg: "#ede9fe", desc: "Trigger WhatsApp and SMS messages from orders." },
      { name: "Magento",      emoji: "🏪", bg: "#dcfce7", desc: "Enterprise ecommerce with multi-channel messaging." },
      { name: "BigCommerce",  emoji: "🏬", bg: "#dbeafe", desc: "Sync product and order data with messaging campaigns." },
      { name: "Razorpay",     emoji: "💳", bg: "#fce7f3", desc: "Payment confirmations and reminders via WhatsApp." },
      { name: "Shiprocket",   emoji: "📦", bg: "#fef9c3", desc: "Auto-send shipping and delivery updates to customers." },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    integrations: [
      { name: "WhatsApp Business", emoji: "💚", bg: "#dcfce7", desc: "Official WhatsApp API for business messaging at scale.", badge: "Native" },
      { name: "SMS",               emoji: "📱", bg: "#dbeafe", desc: "Transactional and promotional SMS with DLT compliance.", badge: "Native" },
      { name: "RCS",               emoji: "🌐", bg: "#fef3c7", desc: "Rich media messaging with carousels and verified badges.", badge: "Native" },
      { name: "Email",             emoji: "📧", bg: "#f3e8ff", desc: "Unified email channel alongside SMS and WhatsApp.", badge: "Native" },
      { name: "Voice",             emoji: "🎙", bg: "#fce7f3", desc: "IVR, outbound campaigns, and automated voice blasts.", badge: "Native" },
      { name: "Instagram",         emoji: "📸", bg: "#fce7f3", desc: "Manage Instagram DMs from your shared inbox." },
    ],
  },
  {
    id: "productivity",
    label: "Productivity",
    integrations: [
      { name: "Slack",              emoji: "💬", bg: "#f0f9ff", desc: "Route customer messages to Slack channels instantly." },
      { name: "Microsoft Teams",    emoji: "🔷", bg: "#dbeafe", desc: "Notify teams on conversations and escalations." },
      { name: "Google Sheets",      emoji: "📋", bg: "#dcfce7", desc: "Log contacts and conversations to spreadsheets." },
      { name: "Google Drive",       emoji: "📁", bg: "#fef3c7", desc: "Attach and share files directly in conversations." },
      { name: "Notion",             emoji: "✅", bg: "#f3e8ff", desc: "Create notes and tasks from customer interactions." },
      { name: "Google Calendar",    emoji: "📅", bg: "#fee2e2", desc: "Schedule meetings and send reminders via WhatsApp." },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    integrations: [
      { name: "Zapier",           emoji: "⚡", bg: "#fef9c3", desc: "Connect SMSLocal with 5000+ apps without any coding.", badge: "Popular" },
      { name: "Make (Integromat)", emoji: "🔄", bg: "#dbeafe", desc: "Visual workflow automation with advanced scenarios." },
      { name: "Pabbly Connect",   emoji: "🟢", bg: "#dcfce7", desc: "Affordable multi-step automation for growing teams." },
      { name: "n8n",              emoji: "🔁", bg: "#fce7f3", desc: "Self-hosted workflow automation with full control." },
      { name: "Custom Webhooks",  emoji: "🛠", bg: "#fee2e2", desc: "Push real-time events to any URL you configure." },
      { name: "AI Agents",        emoji: "🤖", bg: "#f3e8ff", desc: "Build AI-powered messaging workflows natively.", badge: "New" },
    ],
  },
]

export function IntegrationsTabs() {
  const [activeTab, setActiveTab] = useState("crm")
  const current = TABS.find((t) => t.id === activeTab)!

  return (
    <div>
      {/* Tab bar */}
      <div className="mt-10 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
              activeTab === tab.id
                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {current.integrations.map((int) => (
          <div
            key={int.name}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[22px]"
                style={{ background: int.bg }}
              >
                {int.emoji}
              </span>
              {int.badge ? (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-primary">
                  {int.badge}
                </span>
              ) : null}
            </div>
            <div>
              <p className="text-[14.5px] font-semibold tracking-tight text-foreground">{int.name}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{int.desc}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-[12.5px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Connect <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Workflow builder mockup ─────────────────────────────────────────── */

const WF_STEPS = [
  { icon: "🎯", label: "Lead Captured",    desc: "Form submitted",    active: true },
  { icon: "🔀", label: "Route & Assign",   desc: "Auto-assign agent", active: false },
  { icon: "💬", label: "WhatsApp Hello",   desc: "Welcome message",   active: false },
  { icon: "📊", label: "CRM Sync",         desc: "Push to HubSpot",   active: false },
  { icon: "📧", label: "Email Follow-up",  desc: "After 24 hrs",      active: false },
  { icon: "✅", label: "Deal Created",     desc: "Pipeline updated",  active: false },
]

export function WorkflowVisual() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % WF_STEPS.length), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
        <span className="text-[13px] font-semibold text-foreground">🔄 Customer Onboarding Flow</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          247 runs today
        </span>
      </div>

      {/* Steps */}
      <div className="overflow-x-auto p-5">
        <div className="flex items-center gap-0 min-w-max">
          {WF_STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div
                className={`flex flex-col gap-1 rounded-xl border px-4 py-3 transition-all ${
                  i === step
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-background"
                }`}
                style={{ minWidth: 130 }}
              >
                <span className="text-xl">{s.icon}</span>
                <span className={`text-[12.5px] font-semibold ${i === step ? "text-primary" : "text-foreground"}`}>
                  {s.label}
                </span>
                <span className="text-[11px] text-muted-foreground">{s.desc}</span>
              </div>
              {i < WF_STEPS.length - 1 && (
                <div className={`mx-1.5 h-px w-8 transition-colors ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
        {[
          { val: "98.4%", label: "Success Rate" },
          { val: "1.2s",  label: "Avg Execution" },
          { val: "12k",   label: "Runs This Month" },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3 text-center">
            <p className="text-[16px] font-semibold text-primary">{s.val}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── API code window ─────────────────────────────────────────────────── */

export function ApiCodeWindow() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#1a2235] shadow-xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#212d42] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[12px] font-medium text-white/50">POST /api/v1/messages/send</span>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10.5px] text-white/50 transition hover:bg-white/10 hover:text-white/70"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div className="p-5 font-mono text-[13px] leading-[1.85]">
        <p>
          <span className="text-[#f97316]">POST</span>{" "}
          <span className="text-[#60a5fa]">/api/v1/messages/send</span>
        </p>
        <p className="text-slate-500">{"Authorization: Bearer "}<span className="text-[#fbbf24]">sk_live_••••••••</span></p>
        <p className="text-slate-500">{"Content-Type: application/json"}</p>
        <p className="mt-3 text-white/20">{"{"}</p>
        <p className="pl-5">
          <span className="text-[#a78bfa]">&quot;recipient&quot;</span>
          <span className="text-white/30">{": "}</span>
          <span className="text-[#34d399]">&quot;+91XXXXXXXXXX&quot;</span>
          <span className="text-white/20">{","}</span>
        </p>
        <p className="pl-5">
          <span className="text-[#a78bfa]">&quot;channel&quot;</span>
          <span className="text-white/30">{": "}</span>
          <span className="text-[#34d399]">&quot;whatsapp&quot;</span>
          <span className="text-white/20">{","}</span>
        </p>
        <p className="pl-5">
          <span className="text-[#a78bfa]">&quot;message&quot;</span>
          <span className="text-white/30">{": "}</span>
          <span className="text-[#34d399]">&quot;Welcome to SMSLocal! 🎉&quot;</span>
          <span className="text-white/20">{","}</span>
        </p>
        <p className="pl-5">
          <span className="text-[#a78bfa]">&quot;template&quot;</span>
          <span className="text-white/30">{": "}</span>
          <span className="text-[#34d399]">&quot;welcome_v2&quot;</span>
        </p>
        <p className="text-white/20">{"}"}</p>
      </div>

      {/* Response */}
      <div className="mx-5 mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#212d42]">
        <div className="border-b border-white/10 px-4 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#34d399]">
            ● Response 200 OK
          </span>
        </div>
        <div className="p-4 font-mono text-[12.5px] leading-[1.8] text-slate-400">
          <p><span className="text-[#a78bfa]">&quot;status&quot;</span><span className="text-white/30">{": "}</span><span className="text-[#34d399]">&quot;queued&quot;</span></p>
          <p><span className="text-[#a78bfa]">&quot;message_id&quot;</span><span className="text-white/30">{": "}</span><span className="text-[#34d399]">&quot;msg_01HXYZ…&quot;</span></p>
          <p><span className="text-[#a78bfa]">&quot;channel&quot;</span><span className="text-white/30">{": "}</span><span className="text-[#34d399]">&quot;whatsapp&quot;</span></p>
        </div>
      </div>
    </div>
  )
}

/* ── Security dashboard mockup ───────────────────────────────────────── */

const SEC_ITEMS = [
  { icon: "🇪🇺", name: "GDPR Ready",         desc: "Full compliance with consent management & data portability." },
  { icon: "👥", name: "Role-Based Access",    desc: "Granular permissions for every team member." },
  { icon: "🔑", name: "SSO Support",          desc: "SAML 2.0 & Google SSO for enterprise identity management." },
  { icon: "📋", name: "Audit Logs",           desc: "Complete trail of every action — who, what, when, where." },
  { icon: "🔒", name: "Data Encryption",      desc: "AES-256 at rest, TLS 1.3 in transit for all data." },
  { icon: "🛡", name: "API Security",         desc: "Rate limiting, IP allowlisting, and token rotation." },
]

export function SecurityGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SEC_ITEMS.map((item) => (
        <div
          key={item.name}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-[24px]">
            {item.icon}
          </span>
          <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-foreground">{item.name}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Native channels grid ────────────────────────────────────────────── */

const CHANNELS = [
  { emoji: "💚", name: "WhatsApp",           desc: "Official BSP with template messaging, chatbots & broadcasts.",  badge: "Native" },
  { emoji: "📱", name: "SMS",                desc: "Transactional & promotional SMS with full DLT compliance.",      badge: "Native" },
  { emoji: "🌐", name: "RCS",                desc: "Rich media messaging with carousels and verified sender.",       badge: "Native" },
  { emoji: "📧", name: "Email",              desc: "Unified email inbox alongside your messaging channels.",          badge: "Native" },
  { emoji: "🎙", name: "Voice",              desc: "IVR, outbound campaigns, and automated voice notifications.",    badge: "Native" },
  { emoji: "💬", name: "Live Chat",          desc: "Embeddable website chat widget connected to your agent inbox.",  badge: "Native" },
  { emoji: "📸", name: "Instagram",          desc: "Manage Instagram DMs and story mentions from one inbox.",        badge: "Connect" },
  { emoji: "🔵", name: "Facebook Messenger", desc: "Connect your Facebook page and manage conversations at scale.", badge: "Connect" },
  { emoji: "✈️", name: "Telegram",           desc: "Bot-powered Telegram channel for transactional messages.",       badge: "Connect" },
  { emoji: "🖥",  name: "Website Chat",       desc: "Proactive chat triggers, visitor tracking, and AI responses.",  badge: "Native" },
]

export function NativeChannelsGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {CHANNELS.map((ch) => (
        <div
          key={ch.name}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-md"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 transition-transform group-hover:scale-x-100"
          />
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-[22px]">
            {ch.emoji}
          </span>
          <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-foreground">{ch.name}</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{ch.desc}</p>
          <span className="mt-3 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-primary">
            {ch.badge}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Testimonials ────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    quote: "We connected HubSpot and WhatsApp in under 10 minutes. Our sales team now gets lead notifications on WhatsApp instantly — response time dropped from hours to seconds.",
    name: "Rahul Kapoor",
    role: "Head of Sales · FinEdge India",
    initials: "RK",
  },
  {
    quote: "The Shopify integration is seamless. Every order, every cart abandonment, every shipping update goes via WhatsApp now. Recovery campaign revenue jumped 34%.",
    name: "Priya Sharma",
    role: "E-commerce Manager · StyleVault",
    initials: "PS",
  },
  {
    quote: "SMSLocal's REST API is extremely well-documented. We built a custom CRM integration in two days. Webhook delivery is real-time and rock-solid at scale.",
    name: "Arjun Mehta",
    role: "CTO · Logistics First",
    initials: "AM",
  },
]

export function IntegrationsTestimonials() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <div
          key={t.name}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-foreground">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              {t.initials}
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-foreground">{t.name}</p>
              <p className="text-[11.5px] text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
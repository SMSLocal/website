import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Code2,
  Inbox,
  LayoutDashboard,
  Mail,
  MailCheck,
  MessageCircle,
  MessageSquareText,
  MessagesSquare,
  PhoneCall,
  Plug,
  Smartphone,
  Webhook,
  Wrench,
  Shield,
  Zap,
  Globe,
  Activity,
  AlertCircle,
  Search,
  CheckCircle2,
  RefreshCw,
  Bell,
  Server,
  Database,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { StatusHero } from "@/components/resources/status-hero"
import { ChangelogSubscribe, StatusMonitor, StatusUptimeChart } from "@/components/lazy"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/resources/status")

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: MessageSquareText, name: "SMS Delivery", uptime: "99.95%" },
  { icon: MessageCircle, name: "WhatsApp Messaging", uptime: "99.97%" },
  { icon: PhoneCall, name: "Voice Calls", uptime: "99.93%" },
  { icon: Code2, name: "REST API", uptime: "99.99%" },
  { icon: Webhook, name: "Webhooks", uptime: "99.97%" },
  { icon: Mail, name: "Email Channel", uptime: "99.99%" },
  { icon: Bot, name: "AI Agent", uptime: "99.96%" },
  { icon: Inbox, name: "Inbox & Conversations", uptime: "99.98%" },
  { icon: MessagesSquare, name: "Live Chat Widget", uptime: "99.99%" },
  { icon: LayoutDashboard, name: "Dashboard & Web App", uptime: "99.98%" },
  { icon: Smartphone, name: "Mobile Apps", sub: "iOS / Android", uptime: "99.95%" },
  { icon: Plug, name: "Integrations", sub: "Shopify + HubSpot", uptime: "99.96%" },
]

const METRICS = [
  { value: "99.97%", label: "Overall Uptime", sub: "6-month rolling average" },
  { value: "< 280ms", label: "Avg API Latency", sub: "p95 across all endpoints" },
  { value: "6B+", label: "Messages Delivered", sub: "Across all channels" },
  { value: "99.99%", label: "Delivery Success Rate", sub: "SMS + WhatsApp combined" },
]

const REGIONS = [
  { flag: "🇮🇳", name: "India", tag: "Primary", latency: "4ms" },
  { flag: "🇺🇸", name: "US East", tag: "Secondary", latency: "18ms" },
  { flag: "🇪🇺", name: "Europe West", tag: "Secondary", latency: "22ms" },
  { flag: "🌏", name: "Asia Pacific", tag: "Secondary", latency: "14ms" },
]

const INFRA = [
  { icon: Database, name: "Database Cluster" },
  { icon: Server, name: "Message Queue" },
  { icon: Globe, name: "CDN" },
  { icon: Activity, name: "Load Balancer" },
]

const INCIDENTS = [
  {
    date: "April 22, 2026",
    title: "SMS delivery delays — US carriers",
    status: "Resolved" as const,
    duration: "47 minutes",
    kind: "incident" as const,
    description:
      "Some US SMS messages experienced delays of 5–15 minutes due to carrier-side congestion. Messages were eventually delivered and no customer data was lost.",
  },
  {
    date: "April 8, 2026",
    title: "AI Agent elevated error rate",
    status: "Resolved" as const,
    duration: "22 minutes",
    kind: "incident" as const,
    description:
      "AI Agent experienced increased errors due to upstream API instability. Conversations automatically switched to manual handling until service was restored.",
  },
  {
    date: "March 15, 2026",
    title: "Scheduled maintenance — database upgrade",
    status: "Completed" as const,
    duration: "12 minutes downtime",
    kind: "maintenance" as const,
    description:
      "Planned database upgrade maintenance window. Dashboard availability was temporarily affected and all services resumed normally afterward.",
  },
]

const SLA_CARDS = [
  {
    value: "99.9%",
    label: "SLA Guarantee",
    desc: "Contractual uptime guarantee for all paid plans",
    icon: Shield,
  },
  {
    value: "24/7",
    label: "Monitoring",
    desc: "Round-the-clock automated infrastructure health checks",
    icon: Activity,
  },
  {
    value: "< 15 min",
    label: "MTTR",
    desc: "Mean Time to Recovery for critical incidents",
    icon: Zap,
  },
]

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Detection",
    desc: "Automated alerts trigger within 60 seconds of an anomaly being detected across our monitoring stack.",
  },
  {
    step: "02",
    icon: AlertCircle,
    title: "Investigation",
    desc: "On-call engineers are notified immediately and begin root cause analysis.",
  },
  {
    step: "03",
    icon: Bell,
    title: "Updates",
    desc: "Status page is updated every 15 minutes with progress and timeline estimates.",
  },
  {
    step: "04",
    icon: RefreshCw,
    title: "Resolution",
    desc: "Full resolution confirmed and a post-mortem published within 48 hours.",
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StatusPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Status", path: "/resources/status" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* Status-page–specific keyframes */}
        <style>{`
          @keyframes st-fade-up {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes st-pill-in {
            from { opacity: 0; transform: scale(0.84) translateY(12px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes st-orb-pulse {
            0%, 100% { transform: scale(1) translateX(-50%); opacity: 0.22; }
            50%       { transform: scale(1.35) translateX(-37%); opacity: 0.48; }
          }
          @keyframes st-orb2-pulse {
            0%, 100% { opacity: 0.12; transform: scale(1); }
            50%       { opacity: 0.30; transform: scale(1.2); }
          }
          @keyframes st-sheen {
            from { transform: translateX(-150%) skewX(-12deg); }
            to   { transform: translateX(300%) skewX(-12deg); }
          }
          @keyframes st-metric-in {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes st-glow-breathe {
            0%, 100% { opacity: 0.15; }
            50%       { opacity: 0.38; }
          }
          @keyframes st-row-in {
            from { opacity: 0; transform: translateX(-14px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes st-bar-fill {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
          @keyframes st-status-pop {
            0%   { opacity: 0; transform: scale(0.7) translateY(4px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes st-ekg-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes st-row-in-right {
            from { opacity: 0; transform: translateX(18px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        {/* ══════════════════════════════════════════════════════
            S1 — HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[calc(100vh-65px)] flex-col justify-center overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
          {/* Primary glow orb — top center */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{
              background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 65%)",
              animation: "st-orb-pulse 8s ease-in-out infinite",
            }}
          />
          {/* Secondary accent orb — bottom left */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)",
              animation: "st-orb2-pulse 10s 1s ease-in-out infinite",
            }}
          />
          {/* Tertiary accent orb — right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full blur-[80px]"
            style={{
              background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 15%, transparent), transparent 70%)",
              animation: "st-orb2-pulse 12s 2s ease-in-out infinite",
            }}
          />
          <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-60 mask-radial-fade" />

          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
            <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16">

              {/* ── LEFT: text content ── */}
              <div className="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
                {/* Live badge */}
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300"
                  style={{ animation: "st-pill-in 0.65s cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live Status
                </span>

                {/* Heading */}
                <h1
                  className="mt-6 text-balance text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[64px]"
                  style={{ animation: "st-fade-up 0.72s 0.12s cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  All Systems
                  <br />
                  <span className="text-emerald-400">Operational</span>
                </h1>

                {/* Subtext */}
                <p
                  className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/60 sm:text-[17px]"
                  style={{ animation: "st-fade-up 0.72s 0.22s cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  Real-time monitoring of SMSLocal&apos;s SMS, WhatsApp, Voice, Email, and API
                  infrastructure — updated every 60 seconds.
                </p>

                {/* Stat pills */}
                <div
                  className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                  style={{ animation: "st-fade-up 0.72s 0.32s cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  {[
                    { label: "99.97% Uptime", emerald: true },
                    { label: "12 Services Monitored", emerald: false },
                    { label: "0 Active Incidents", emerald: true },
                  ].map((p, i) => (
                    <span
                      key={p.label}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-semibold backdrop-blur-sm ${
                        p.emerald
                          ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                          : "border-white/15 bg-white/[0.06] text-white/80"
                      }`}
                      style={{ animation: `st-pill-in 0.55s ${0.38 + i * 0.08}s cubic-bezier(0.22,1,0.36,1) both` }}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${p.emerald ? "bg-emerald-400" : "bg-white/50"}`} />
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: live monitor widget — borderless floating ── */}
              <div
                className="relative w-full lg:w-1/2"
                style={{ animation: "st-fade-up 0.85s 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                {/* Background glow — no box, just ambient light */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                  style={{
                    background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)",
                    animation: "st-glow-breathe 7s ease-in-out infinite",
                  }}
                />

                <div className="relative space-y-5">

                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">System heartbeat</p>
                      <p className="mt-1 flex items-center gap-2 text-[15px] font-semibold text-white">
                        <span className="relative inline-flex h-2 w-2">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                          <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        All Systems Online
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-emerald-300">
                      LIVE
                    </span>
                  </div>

                  {/* ── LIVE SIGNAL MONITOR ── */}

                  {/* Scrolling EKG panel */}
                  <div className="relative overflow-hidden rounded-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(0,168,107,0.05), rgba(0,168,107,0.02))", border: "1px solid rgba(0,168,107,0.13)" }}>
                    {/* Dot-grid texture */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22]"
                      style={{ backgroundImage: "radial-gradient(circle, rgba(0,168,107,0.6) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

                    {/* Scrolling EKG */}
                    <div className="relative overflow-hidden" style={{ height: 58 }}>
                      <svg
                        style={{ width: "200%", height: "100%", animation: "st-ekg-scroll 5s linear infinite" }}
                        viewBox="0 0 600 58"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="ekgAreaFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00A86B" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#00A86B" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Area under curve */}
                        <polygon
                          points="0,29 28,29 35,21 41,29 60,29 65,5 71,53 77,29 110,29 118,22 138,29 188,29
                                  200,29 228,29 235,21 241,29 260,29 265,5 271,53 277,29 310,29 318,22 338,29 388,29
                                  400,29 428,29 435,21 441,29 460,29 465,5 471,53 477,29 510,29 518,22 538,29 588,29 600,29 600,58 0,58"
                          fill="url(#ekgAreaFill)"
                        />

                        {/* Glow behind (blurred) */}
                        <polyline
                          points="0,29 28,29 35,21 41,29 60,29 65,5 71,53 77,29 110,29 118,22 138,29 188,29
                                  200,29 228,29 235,21 241,29 260,29 265,5 271,53 277,29 310,29 318,22 338,29 388,29
                                  400,29 428,29 435,21 441,29 460,29 465,5 471,53 477,29 510,29 518,22 538,29 588,29 600,29"
                          fill="none" stroke="rgba(0,168,107,0.48)" strokeWidth="8" strokeLinecap="round"
                          style={{ filter: "blur(5px)" }}
                        />

                        {/* Main crisp EKG line */}
                        <polyline
                          points="0,29 28,29 35,21 41,29 60,29 65,5 71,53 77,29 110,29 118,22 138,29 188,29
                                  200,29 228,29 235,21 241,29 260,29 265,5 271,53 277,29 310,29 318,22 338,29 388,29
                                  400,29 428,29 435,21 441,29 460,29 465,5 471,53 477,29 510,29 518,22 538,29 588,29 600,29"
                          fill="none" stroke="#00A86B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
                        />

                        {/* Bright white highlight on each QRS spike */}
                        <polyline points="60,29 65,5 71,53 77,29"   fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="1.5" strokeLinecap="round" />
                        <polyline points="260,29 265,5 271,53 277,29" fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="1.5" strokeLinecap="round" />
                        <polyline points="460,29 465,5 471,53 477,29" fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    {/* Status sub-row */}
                    <div className="flex items-center justify-between border-t px-4 py-1.5"
                      style={{ borderColor: "rgba(0,168,107,0.10)" }}>
                      <span className="text-[9.5px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>Signal: healthy</span>
                      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold" style={{ color: "rgba(0,168,107,0.80)" }}>
                        <span className="relative inline-flex h-[5px] w-[5px]">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                          <span className="relative h-[5px] w-[5px] rounded-full bg-emerald-400" />
                        </span>
                        1,247 msgs / sec
                      </span>
                    </div>
                  </div>

                  {/* Service rows — 6 services with sheen bars */}
                  <ul className="space-y-0">
                    {[
                      { name: "SMS Delivery",  uptime: "99.95%", w: "95%", delay: 0.65 },
                      { name: "WhatsApp API",  uptime: "99.97%", w: "97%", delay: 0.72 },
                      { name: "REST API",      uptime: "99.99%", w: "99%", delay: 0.79 },
                      { name: "Voice Calls",   uptime: "99.93%", w: "93%", delay: 0.86 },
                      { name: "Email Channel", uptime: "99.99%", w: "99%", delay: 0.93 },
                      { name: "Webhooks",      uptime: "99.97%", w: "97%", delay: 1.00 },
                    ].map((row, i) => (
                      <li
                        key={row.name}
                        className="flex items-center gap-3 border-b border-white/[0.055] py-[9px] first:border-t first:border-t-white/[0.055]"
                        style={{ animation: `st-row-in-right 0.42s ${row.delay}s cubic-bezier(0.22,1,0.36,1) both` }}
                      >
                        {/* Gradient accent strip */}
                        <span className="h-5 w-[2px] shrink-0 rounded-full"
                          style={{ background: "linear-gradient(to bottom, #00A86B, rgba(0,168,107,0.20))" }} />
                        {/* Pulsing dot */}
                        <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50"
                            style={{ animationDelay: `${i * 0.28}s` }} />
                          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        {/* Name */}
                        <span className="w-[116px] shrink-0 text-[12px] font-medium"
                          style={{ color: "rgba(255,255,255,0.70)" }}>{row.name}</span>
                        {/* Bar with sheen */}
                        <div className="flex-1 overflow-hidden rounded-full"
                          style={{ height: 3, background: "rgba(0,168,107,0.08)" }}>
                          <div className="relative h-full overflow-hidden rounded-full" style={{
                            width: row.w,
                            transformOrigin: "left",
                            background: "linear-gradient(90deg, rgba(0,168,107,0.65), #00A86B)",
                            boxShadow: "0 0 8px rgba(0,168,107,0.45)",
                            animation: `st-bar-fill 1.2s ${row.delay}s cubic-bezier(0.22,1,0.36,1) both`,
                          }}>
                            <div className="absolute inset-y-0 w-8"
                              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)", animation: `st-sheen 2.8s ${row.delay + 0.5}s linear infinite` }} />
                          </div>
                        </div>
                        {/* % */}
                        <span className="w-11 shrink-0 text-right font-mono text-[11px] font-bold"
                          style={{ color: "rgba(255,255,255,0.48)" }}>{row.uptime}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>Updated every 60 seconds</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "rgba(0,168,107,0.78)" }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                        style={{ animation: "st-glow-breathe 2.2s ease-in-out infinite" }} />
                      0 active incidents
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S2 — SERVICE STATUS  (row-based, no box cards)
        ══════════════════════════════════════════════════════ */}
        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Service status</h2>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                  Real-time health and 90-day uptime for every part of the SMSLocal platform.
                </p>
              </div>
              <div
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2.5 text-[12.5px] font-semibold text-emerald-700 dark:text-emerald-400"
                style={{ animation: "st-status-pop 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                All 12 services operational
              </div>
            </div>

            {/* ── 2-column borderless service rows ── */}
            <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICES.map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.name}
                    className="group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-emerald-500/[0.04]"
                    style={{ animation: `st-row-in 0.45s ${i * 0.04}s cubic-bezier(0.22,1,0.36,1) both` }}
                  >
                    {/* Left accent pulse line */}
                    <span
                      aria-hidden
                      className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100"
                    />

                    {/* Icon */}
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/20">
                      <Icon className="h-4 w-4" />
                    </span>

                    {/* Name + bar */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13.5px] font-semibold text-foreground">{s.name}</span>
                        <span className="shrink-0 font-mono text-[12px] font-bold text-foreground tabular-nums">
                          {s.uptime}
                        </span>
                      </div>
                      {/* Animated uptime fill bar */}
                      <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"
                          style={{
                            backgroundSize: "200% 100%",
                            transformOrigin: "left",
                            animation: `st-bar-fill 1.0s ${0.2 + i * 0.05}s cubic-bezier(0.22,1,0.36,1) both`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className="ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-600 dark:text-emerald-400"
                      style={{ animation: `st-status-pop 0.4s ${0.3 + i * 0.04}s cubic-bezier(0.22,1,0.36,1) both` }}
                    >
                      <span className="relative inline-flex h-1.5 w-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Operational
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S3 — PLATFORM METRICS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-muted/40 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Performance
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Platform performance metrics
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[15px] text-muted-foreground">
                Key indicators measured continuously across the SMSLocal infrastructure.
              </p>
            </div>

            {/* Borderless metrics — divider-separated columns, no boxes */}
            <div className="relative mt-14">
              {/* Top accent line */}
              <div aria-hidden className="mb-12 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 28%, transparent) 50%, transparent)" }} />

              <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
                {METRICS.map((m, i) => (
                  <div
                    key={m.label}
                    className="group relative flex flex-col items-center px-6 text-center"
                    style={{ animation: `st-metric-in 0.6s ${i * 0.12}s cubic-bezier(0.22,1,0.36,1) both` }}
                  >
                    {/* Vertical divider between columns */}
                    {i % 2 !== 0 && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-1 left-0 w-px"
                        style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--primary) 18%, transparent) 35%, color-mix(in oklch, var(--primary) 18%, transparent) 65%, transparent)" }}
                      />
                    )}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-y-1 left-0 hidden w-px lg:block ${i === 0 ? "lg:hidden" : ""}`}
                      style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--primary) 18%, transparent) 35%, color-mix(in oklch, var(--primary) 18%, transparent) 65%, transparent)" }}
                    />

                    {/* Value — large glowing number */}
                    <p
                      className="text-[40px] font-bold leading-none tracking-tight text-foreground tabular-nums transition-all duration-300 group-hover:scale-105 sm:text-[46px]"
                      style={{ textShadow: "0 0 40px color-mix(in oklch, var(--primary) 22%, transparent)" }}
                    >
                      {m.value}
                    </p>

                    {/* Animated underline sparkline */}
                    <div className="mt-4 h-[3px] w-12 overflow-hidden rounded-full" style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "100%",
                          transformOrigin: "left",
                          animation: `st-bar-fill 1s ${0.3 + i * 0.12}s cubic-bezier(0.22,1,0.36,1) both`,
                          background: "linear-gradient(90deg, color-mix(in oklch, var(--primary) 60%, transparent), var(--primary))",
                          boxShadow: "0 0 8px color-mix(in oklch, var(--primary) 50%, transparent)",
                        }}
                      />
                    </div>

                    {/* Label */}
                    <p className="mt-4 text-[13.5px] font-bold text-foreground">{m.label}</p>
                    {/* Sub */}
                    <p className="mt-1 text-[11.5px] text-muted-foreground/60">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Bottom accent line */}
              <div aria-hidden className="mt-12 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 28%, transparent) 50%, transparent)" }} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S4 — HISTORICAL UPTIME CHART
        ══════════════════════════════════════════════════════ */}
        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Analytics
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Historical uptime
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Monthly uptime across the platform over the last six months. Hover any bar for the exact figure.
            </p>
            <div className="mt-12">
              <StatusUptimeChart />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S5 — REGION & INFRASTRUCTURE STATUS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-muted/40 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Global
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Infrastructure &amp; regions
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-muted-foreground">
              SMSLocal runs on redundant multi-region infrastructure with automatic failover and zero single points of failure.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-2">

              {/* ── Data Regions — 2×2 floating flag tiles ── */}
              <div>
                <p className="mb-8 text-[10.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">
                  Data Regions
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {REGIONS.map((r, i) => (
                    <div
                      key={r.name}
                      className="group relative flex flex-col gap-3"
                      style={{ animation: `st-metric-in 0.55s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1) both` }}
                    >
                      {/* Large flag with pulsing glow ring behind it */}
                      <div className="relative w-fit">
                        <span
                          aria-hidden
                          className="absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: "radial-gradient(circle, color-mix(in oklch, oklch(0.72 0.17 160) 20%, transparent), transparent 70%)" }}
                        />
                        <span className="relative text-[48px] leading-none">{r.flag}</span>
                      </div>

                      {/* Name + Primary tag */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] font-bold text-foreground">{r.name}</span>
                          {r.tag === "Primary" && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
                              Primary
                            </span>
                          )}
                        </div>

                        {/* Latency + status row */}
                        <div className="mt-2 flex items-center gap-3">
                          {/* Latency badge */}
                          <span className="font-mono text-[12px] font-bold tabular-nums text-muted-foreground">
                            {r.latency}
                          </span>
                          {/* Animated ping dot + Operational */}
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="relative inline-flex h-1.5 w-1.5">
                              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/55" style={{ animationDelay: `${i * 0.45}s` }} />
                              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            Operational
                          </span>
                        </div>

                        {/* Thin animated latency bar */}
                        <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full" style={{ background: "color-mix(in oklch, oklch(0.72 0.17 160) 10%, transparent)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.max(8, Math.min(90, (parseInt(r.latency) / 25) * 100))}%`,
                              transformOrigin: "left",
                              animation: `st-bar-fill 1.1s ${0.45 + i * 0.1}s cubic-bezier(0.22,1,0.36,1) both`,
                              background: "linear-gradient(90deg, color-mix(in oklch, oklch(0.72 0.17 160) 55%, transparent), oklch(0.72 0.17 160))",
                              boxShadow: "0 0 6px color-mix(in oklch, oklch(0.72 0.17 160) 40%, transparent)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Core Infrastructure — 2×2 floating icon grid ── */}
              <div>
                <p className="mb-8 text-[10.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">
                  Core Infrastructure
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {INFRA.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.name}
                        className="group flex flex-col gap-3"
                        style={{ animation: `st-metric-in 0.55s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1) both` }}
                      >
                        {/* Icon with pulsing ambient glow — no box */}
                        <div className="relative w-fit">
                          <span
                            aria-hidden
                            className="absolute -inset-3 rounded-full"
                            style={{
                              background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
                              animation: `st-glow-breathe 3s ${i * 0.5}s ease-in-out infinite`,
                            }}
                          />
                          <Icon className="relative h-7 w-7 text-primary" />
                        </div>

                        {/* Name */}
                        <span className="text-[14px] font-semibold text-foreground">{item.name}</span>

                        {/* Animated scanner + Healthy */}
                        <div className="flex items-center gap-3">
                          <div className="relative h-[2px] flex-1 overflow-hidden rounded-full" style={{ background: "color-mix(in oklch, var(--primary) 8%, transparent)" }}>
                            <div
                              className="absolute inset-y-0 w-2/5"
                              style={{
                                background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 70%, transparent), transparent)",
                                animation: `st-sheen 2.6s ${i * 0.6}s linear infinite`,
                              }}
                            />
                          </div>
                          <span
                            className="flex shrink-0 items-center gap-1.5 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400"
                            style={{ animation: `st-status-pop 0.4s ${0.4 + i * 0.1}s cubic-bezier(0.22,1,0.36,1) both` }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                              style={{ animation: `mon-blink 2.2s ${i * 0.4}s ease-in-out infinite` }}
                            />
                            Healthy
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S6 — RECENT INCIDENTS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              History
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Recent incidents &amp; maintenance
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-muted-foreground">
              Full transparency on every incident and maintenance window. Expand any entry for the details.
            </p>

            <div className="relative mx-auto mt-12 max-w-3xl">
              {/* Spine */}
              <div aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-border sm:left-[9px]" />
              <div
                aria-hidden
                className="absolute left-[7px] top-3 h-full w-px bg-gradient-to-b from-emerald-500 via-emerald-500/40 to-transparent sm:left-[9px]"
              />

              <ol className="space-y-4">
                {INCIDENTS.map((inc) => {
                  const isMaint = inc.kind === "maintenance"
                  return (
                    <li key={inc.title} className="relative pl-9 sm:pl-12">
                      <span
                        className={`absolute left-0 top-5 inline-flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background sm:h-5 sm:w-5 ${
                          isMaint ? "bg-sky-500" : "bg-emerald-500"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-background" />
                      </span>

                      <details className="group rounded-2xl border border-border bg-card shadow-sm transition-all open:border-primary/30 open:shadow-md">
                        <summary className="flex cursor-pointer list-none items-start gap-3 p-5">
                          <span
                            className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              isMaint
                                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {isMaint ? <Wrench className="h-4 w-4" /> : <MailCheck className="h-4 w-4" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <time className="text-[12px] font-medium text-muted-foreground">{inc.date}</time>
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                  isMaint
                                    ? "border border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400"
                                    : "border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                }`}
                              >
                                {inc.status}
                              </span>
                              <span className="ml-auto text-[11.5px] text-muted-foreground">{inc.duration}</span>
                            </span>
                            <span className="mt-1.5 block text-[15px] font-semibold tracking-tight text-foreground">
                              {inc.title}
                            </span>
                          </span>
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition group-open:rotate-45 group-open:border-primary/40 group-open:text-primary">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </span>
                        </summary>
                        <div className="border-t border-border px-5 py-4 pl-[4.25rem]">
                          <p className="text-[13.5px] leading-relaxed text-muted-foreground">{inc.description}</p>
                          <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${isMaint ? "bg-sky-500" : "bg-emerald-500"}`}
                            />
                            {inc.status} · {inc.duration}
                          </p>
                        </div>
                      </details>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-8 flex items-center gap-2.5 pl-9 sm:pl-12">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-[13px] text-muted-foreground">
                  No active incidents. All services are operating normally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S7 — LIVE SYSTEM MONITORING
        ══════════════════════════════════════════════════════ */}
        <section className="bg-muted/40 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Infrastructure
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Live system monitoring.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  A real-time pulse on the systems behind SMSLocal — heartbeat, latency, and health across the core platform.
                </p>
                <ul className="mt-8 space-y-3.5">
                  {[
                    "Health checks every 60 seconds",
                    "Automatic failover and redundant infrastructure",
                    "Independent monitoring from 3 global regions",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[14px] font-medium text-foreground">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <StatusMonitor />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S8 — SLA COMMITMENT (dark)
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] py-20 sm:py-24">
          {/* Top center glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%)",
              animation: "st-glow-breathe 6s ease-in-out infinite",
            }}
          />
          {/* Bottom accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rounded-full blur-[80px]"
            style={{ background: "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 15%, transparent), transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                Guarantee
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Our uptime commitment
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[15px] text-white/55">
                Every SMSLocal plan is backed by enterprise-grade infrastructure and contractual SLAs.
              </p>
            </div>

            {/* 3 metrics — no box, separated by vertical lines */}
            <div className="relative mt-14">
              {/* Horizontal accent line above metrics */}
              <div aria-hidden className="mb-12 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 30%, transparent) 50%, transparent)" }} />

              <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-0">
                {SLA_CARDS.map((c, i) => {
                  const Icon = c.icon
                  return (
                    <div
                      key={c.label}
                      className="group relative flex flex-col items-center px-8 text-center"
                      style={{ animation: `st-metric-in 0.6s ${i * 0.12}s cubic-bezier(0.22,1,0.36,1) both` }}
                    >
                      {/* Vertical divider — between columns only */}
                      {i > 0 && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 left-0 hidden w-px sm:block"
                          style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--primary) 20%, transparent) 40%, color-mix(in oklch, var(--primary) 20%, transparent) 60%, transparent)" }}
                        />
                      )}

                      {/* Icon with double pulsing ring — no box */}
                      <div className="relative flex h-14 w-14 items-center justify-center">
                        {/* Outer slow pulse */}
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: "1px solid color-mix(in oklch, var(--primary) 30%, transparent)",
                            animation: `mon-ripple 3s ${i * 0.5}s ease-out infinite`,
                          }}
                        />
                        {/* Inner ring */}
                        <span
                          aria-hidden
                          className="absolute inset-1 rounded-full"
                          style={{
                            border: "1px solid color-mix(in oklch, var(--primary) 20%, transparent)",
                            animation: `mon-ripple 3s ${i * 0.5 + 0.8}s ease-out infinite`,
                          }}
                        />
                        {/* Icon circle */}
                        <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/[0.12] text-primary transition-colors duration-300 group-hover:bg-primary/25">
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>

                      {/* Value — large glowing number */}
                      <p
                        className="mt-6 text-[52px] font-bold leading-none tracking-tight text-white tabular-nums transition-all duration-300"
                        style={{ textShadow: "0 0 48px color-mix(in oklch, var(--primary) 45%, transparent)" }}
                      >
                        {c.value}
                      </p>

                      {/* Thin accent line below value */}
                      <div
                        className="mt-4 h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-16"
                        style={{ background: "color-mix(in oklch, var(--primary) 70%, transparent)" }}
                      />

                      {/* Label */}
                      <p className="mt-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white/50">
                        {c.label}
                      </p>

                      {/* Description */}
                      <p className="mt-2 max-w-[200px] text-[13px] leading-relaxed text-white/35">
                        {c.desc}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Horizontal accent line below metrics */}
              <div aria-hidden className="mt-12 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 30%, transparent) 50%, transparent)" }} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S9 — INCIDENT COMMUNICATION PROCESS
        ══════════════════════════════════════════════════════ */}
        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Transparency
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                How we handle incidents
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[15px] text-muted-foreground">
                A clear, consistent process every time — so you always know what&apos;s happening and when to expect
                resolution.
              </p>
            </div>

            <div className="relative mt-16">
              {/* Connector dashes — desktop only */}
              <div
                aria-hidden
                className="absolute left-[12%] right-[12%] top-7 hidden h-px border-t border-dashed border-primary/25 lg:block"
              />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((s) => {
                  const Icon = s.icon
                  return (
                    <div key={s.step} className="group relative flex flex-col items-center text-center">
                      {/* Icon circle */}
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/8 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/25">
                        <Icon className="h-6 w-6" />
                        {/* Step number badge */}
                        <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-md">
                          {s.step}
                        </span>
                      </div>
                      <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-foreground">{s.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S10 — SUBSCRIBE TO STATUS UPDATES
        ══════════════════════════════════════════════════════ */}
        <section className="bg-muted/40 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-10 text-center text-white shadow-2xl sm:p-14">
              {/* Top glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[80px]"
                style={{
                  background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 65%)",
                  animation: "st-glow-breathe 5s ease-in-out infinite",
                }}
              />
              {/* Bottom accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 left-1/2 h-[200px] w-[400px] -translate-x-1/2 rounded-full blur-[60px]"
                style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)" }}
              />

              <div className="relative mx-auto max-w-xl">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Bell className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                  Get status updates.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/62">
                  Subscribe for incident alerts, maintenance windows, and resolution updates delivered to your inbox.
                </p>
                <ChangelogSubscribe />
                <p className="mt-4 text-[12px] text-white/35">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S11 — SUPPORT CARD
        ══════════════════════════════════════════════════════ */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:flex-row sm:text-left">
              <div>
                <p className="text-[15px] font-semibold tracking-tight text-foreground">
                  Questions about our status or infrastructure?
                </p>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                  Our team is here to help — reach us at{" "}
                  <a
                    href="mailto:support@smslocal.in"
                    className="font-medium text-primary hover:underline"
                  >
                    support@smslocal.in
                  </a>
                </p>
              </div>
              <Link
                href="/company/contact/"
                className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                Contact Support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

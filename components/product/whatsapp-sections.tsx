import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  Building2,
  CalendarCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  Image as ImageIcon,
  Landmark,
  LayoutList,
  Link2,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Phone,
  PlugZap,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserCheck,
  Video,
} from "lucide-react"

// Bespoke sections for /channels/whatsapp (everything below the hero). Each section has its own layout and its
// own hand-drawn SVG so none of them reads like the shared product-page blocks used on other pages.

const NAVY = "var(--foreground)"
const TEAL = "var(--primary)"
const AMBER = "oklch(0.85 0.14 80)"

const CSS = `
@keyframes wx-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes wx-sweep { to { transform: rotate(360deg) } }
@keyframes wx-dash { to { stroke-dashoffset: -28 } }
@keyframes wx-blink { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.wx-float { animation: wx-float 5s ease-in-out infinite }
.wx-sweep { transform-box: fill-box; transform-origin: 100% 100%; animation: wx-sweep 12s linear infinite }
.wx-dash { animation: wx-dash 1.6s linear infinite }
.wx-blink { animation: wx-blink 2.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .wx-float, .wx-sweep, .wx-dash, .wx-blink { animation: none } }
`

export function WhatsAppStyles() {
  return <style>{CSS}</style>
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary"
    >
      
      {children}
    </span>
  )
}

/* ───────────────────────── 2. PROBLEM: chaos → order ───────────────────────── */

function ProblemScene() {
  const chips: { x: number; y: number; w: number; t: string; s: string; tone: "warn" | "ok" }[] = [
    { x: 40, y: 36, w: 172, t: "Template rejected", s: "Fix & resubmit", tone: "warn" },
    { x: 30, y: 130, w: 182, t: "48 unread chats", s: "After business hours", tone: "warn" },
    { x: 42, y: 224, w: 170, t: "Quality rating: Low", s: "Sending limit at risk", tone: "warn" },
    { x: 448, y: 82, w: 182, t: "Answered in 2 sec", s: "By AI, from your FAQs", tone: "ok" },
    { x: 448, y: 184, w: 182, t: "Template approved", s: "Ready to send", tone: "ok" },
  ]
  return (
    <svg viewBox="0 0 660 366" className="h-auto w-full" role="img" aria-label="Common WhatsApp problems like rejected templates, unread chats and a low quality rating on the left, resolved by SMSLocal into fast answered conversations on the right">
      <defs>
        <filter id="wp-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
        <linearGradient id="wp-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="color-mix(in oklch, var(--primary) 10%, white)" /></linearGradient>
      </defs>
      <ellipse cx="330" cy="178" rx="150" ry="158" fill={TEAL} opacity=".16" filter="url(#wp-soft)" />

      {chips.map((c) => {
        const left = c.x < 300
        const x1 = left ? c.x + c.w : c.x
        const x2 = left ? 236 : 424
        const y = c.y + 28
        return (
          <path key={c.t} d={`M${x1} ${y} C ${(x1 + x2) / 2} ${y}, ${(x1 + x2) / 2} 178, ${x2} ${Math.min(Math.max(y, 100), 260)}`} fill="none" stroke={c.tone === "warn" ? AMBER : TEAL} strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" className="wx-dash" />
        )
      })}

      <g transform="translate(238 8) scale(.88)">
        <ellipse cx="105" cy="388" rx="104" ry="11" fill={NAVY} opacity=".18" filter="url(#wp-soft)" />
        {/* hardware buttons */}
        <rect x="-3.5" y="84" width="5" height="22" rx="2.5" fill={NAVY} />
        <rect x="-3.5" y="116" width="5" height="42" rx="2.5" fill={NAVY} />
        <rect x="-3.5" y="166" width="5" height="42" rx="2.5" fill={NAVY} />
        <rect x="208.5" y="128" width="5" height="62" rx="2.5" fill={NAVY} />
        {/* frame: outer shell, metal rim, bezel, screen */}
        <rect width="210" height="380" rx="42" fill={NAVY} />
        <rect x="1" y="1" width="208" height="378" rx="41" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.4" />
        <rect x="4.5" y="4.5" width="201" height="371" rx="38" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="1" />
        <rect x="8" y="8" width="194" height="364" rx="34" fill="color-mix(in oklch, var(--primary) 7%, white)" />

        {/* WhatsApp header (also holds the status bar) */}
        <path d="M8 46 a34 34 0 0 1 34 -38 h126 a34 34 0 0 1 34 38 V96 H8Z" fill={TEAL} />
        <rect x="75" y="15" width="60" height="16" rx="8" fill={NAVY} />
        <circle cx="124" cy="23" r="3" fill="#fff" fillOpacity=".18" />
        <text x="30" y="29" fontSize="10" fontWeight="700" fill="#fff">9:41</text>
        <g fill="#fff"><rect x="150" y="24" width="3" height="5" rx="1" /><rect x="155" y="21.5" width="3" height="7.5" rx="1" /><rect x="160" y="19" width="3" height="10" rx="1" /></g>
        <rect x="168" y="19" width="19" height="10" rx="3" fill="none" stroke="#fff" strokeWidth="1.1" /><rect x="170" y="21" width="12" height="6" rx="1.6" fill="#fff" /><rect x="188" y="22.5" width="1.6" height="3" rx=".8" fill="#fff" />
        <path d="M24 66 l-5.5 5.5 l5.5 5.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="44" cy="71.5" r="14.5" fill="#fff" />
        <text x="44" y="76.5" textAnchor="middle" fontSize="13" fontWeight="800" fill={TEAL}>S</text>
        <text x="65" y="68" fontSize="11" fontWeight="700" fill="#fff">SMSLocal Store</text>
        <circle cx="160" cy="64.6" r="5" fill={AMBER} /><path d="M157.6 64.6 l1.7 1.8 l3.1 -3.5" fill="none" stroke={NAVY} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="65" y="81" fontSize="8.6" fill="#fff" opacity=".88">Official business account</text>

        {/* conversation */}
        <rect x="75" y="106" width="60" height="15" rx="7.5" fill="#fff" stroke="var(--border)" />
        <text x="105" y="116.5" textAnchor="middle" fontSize="7.6" fontWeight="600" fill="var(--muted-foreground)">TODAY</text>

        <rect x="16" y="130" width="124" height="32" rx="12" fill="#fff" stroke="var(--border)" />
        <text x="27" y="150" fontSize="10" fill={NAVY}>Where is order #1042?</text>

        <rect x="52" y="172" width="144" height="76" rx="12" fill="color-mix(in oklch, var(--primary) 26%, white)" />
        <text x="63" y="191" fontSize="10.6" fontWeight="700" fill={NAVY}>Out for delivery</text>
        <text x="63" y="205" fontSize="9.4" fill={NAVY} opacity=".75">Arriving today by 6 PM</text>
        <rect x="63" y="215" width="56" height="19" rx="9.5" fill="#fff" stroke={TEAL} />
        <text x="91" y="228" textAnchor="middle" fontSize="8.8" fontWeight="700" fill={TEAL}>Track</text>
        <rect x="127" y="215" width="58" height="19" rx="9.5" fill="#fff" stroke={TEAL} />
        <text x="156" y="228" textAnchor="middle" fontSize="8.8" fontWeight="700" fill={TEAL}>Invoice</text>

        <rect x="16" y="258" width="122" height="32" rx="12" fill="#fff" stroke="var(--border)" />
        <text x="27" y="278" fontSize="10" fill={NAVY}>Change my address?</text>

        <rect x="52" y="300" width="144" height="36" rx="12" fill="color-mix(in oklch, var(--primary) 26%, white)" />
        <text x="63" y="315" fontSize="9.6" fill={NAVY}>Sure, updated. Priya from</text>
        <text x="63" y="327" fontSize="9.6" fill={NAVY}>support is on it.</text>

        {/* composer */}
        <rect x="16" y="342" width="136" height="26" rx="13" fill="#fff" stroke="var(--border)" />
        <circle cx="30" cy="355" r="5.5" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.3" /><path d="M27.6 356.4 q2.4 2.4 4.8 0" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />
        <text x="43" y="358.4" fontSize="9" fill="var(--muted-foreground)">Message</text>
        <circle cx="175" cy="355" r="14" fill={TEAL} />
        <rect x="171.6" y="347.6" width="6.8" height="11" rx="3.4" fill="#fff" /><path d="M168.8 355 a6.2 6.2 0 0 0 12.4 0 M175 361.4 v3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="75" y="368" width="60" height="3" rx="1.5" fill={NAVY} opacity=".6" />

        {/* glass reflection */}
        <path d="M8 60 a34 34 0 0 1 34 -52 h40 L28 372 a34 34 0 0 1 -20 -30Z" fill="#fff" opacity=".07" />

        {/* AI badge */}
        <g transform="translate(196 6)"><circle r="12.5" fill={AMBER} stroke="#fff" strokeWidth="2.5" /><text y="4" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={NAVY}>AI</text></g>
      </g>

      {chips.map((c, i) => (
        <g key={c.t} className="wx-float" style={{ animationDelay: `${-i * 0.9}s` }}>
          <g transform={`translate(${c.x} ${c.y})`}>
            <rect width={c.w} height="56" rx="16" fill="#fff" stroke={c.tone === "warn" ? AMBER : TEAL} strokeWidth="1.6" />
            <circle cx="26" cy="28" r="14" fill={c.tone === "warn" ? AMBER : TEAL} />
            {c.tone === "warn" ? (
              <path d="M26 21 v9 M26 34.5 v.5" stroke={NAVY} strokeWidth="2.8" strokeLinecap="round" />
            ) : (
              <path d="M20 28.5 l4.5 4.5 l8 -9.5" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <text x="48" y="25" fontSize="12.2" fontWeight="700" fill={NAVY}>{c.t}</text>
            <text x="48" y="41" fontSize="10.2" fill="var(--muted-foreground)">{c.s}</text>
          </g>
        </g>
      ))}
      <text x="126" y="358" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAVY}>Without SMSLocal</text>
      <text x="539" y="358" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={TEAL}>With SMSLocal</text>
    </svg>
  )
}

export function WhatsAppProblem() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
        <div>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[38px]">
            WhatsApp at scale is harder than it looks
          </h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">
            The API, template approvals, quality ratings and two-way chats all have to work together within Meta&apos;s
            policies. SMSLocal manages it and adds agentic AI on top.
          </p>
          <ul className="mt-6 space-y-3">
            {["Template rejections cut your reach", "Chats pile up after hours", "Support and marketing live in separate tools"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[14.5px] text-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/50 text-foreground">
                  <Plus className="h-3 w-3 rotate-45" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ProblemScene />
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 3. CAPABILITIES: bento ───────────────────────── */

function QualityMeter() {
  return (
    <svg viewBox="0 0 260 172" className="h-auto w-full" aria-hidden>
      <path d="M30 130 A100 100 0 0 1 230 130" fill="none" stroke="var(--border)" strokeWidth="16" strokeLinecap="round" />
      <path d="M30 130 A100 100 0 0 1 150 33" fill="none" stroke={TEAL} strokeWidth="16" strokeLinecap="round" />
      <path d="M150 33 A100 100 0 0 1 196 56" fill="none" stroke={AMBER} strokeWidth="16" strokeLinecap="round" opacity=".55" />
      <g transform="translate(130 130) rotate(-24)">
        <path d="M-5 0 L0 -84 L5 0Z" fill={NAVY} />
        <circle r="9" fill={NAVY} /><circle r="3.5" fill="#fff" />
      </g>
      <text x="130" y="166" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEAL}>HIGH QUALITY</text>
      <text x="30" y="150" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">Low</text>
      <text x="230" y="150" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">Tier ↑</text>
    </svg>
  )
}

function ThreadArt() {
  return (
    <svg viewBox="0 0 300 150" className="h-auto w-full" aria-hidden>
      <rect x="10" y="10" width="140" height="30" rx="14" fill="var(--muted)" />
      <rect x="24" y="22" width="90" height="6" rx="3" fill="var(--border)" />
      <rect x="150" y="50" width="140" height="30" rx="14" fill={TEAL} />
      <rect x="164" y="62" width="100" height="6" rx="3" fill="#fff" opacity=".85" />
      <rect x="10" y="90" width="110" height="30" rx="14" fill="var(--muted)" />
      <rect x="24" y="102" width="64" height="6" rx="3" fill="var(--border)" />
      <g transform="translate(226 112)">
        <circle r="14" fill="#fff" stroke="var(--border)" />
        <circle cx="-5" r="2.4" fill={TEAL} className="wx-blink" /><circle r="2.4" fill={TEAL} className="wx-blink" style={{ animationDelay: ".3s" }} /><circle cx="5" r="2.4" fill={TEAL} className="wx-blink" style={{ animationDelay: ".6s" }} />
      </g>
    </svg>
  )
}

function TemplateStack() {
  return (
    <svg viewBox="0 0 300 170" className="h-auto w-full" aria-hidden>
      <g className="wx-float">
        <rect x="64" y="22" width="190" height="124" rx="16" fill="color-mix(in oklch, var(--primary) 18%, white)" transform="rotate(6 160 84)" />
        <rect x="50" y="14" width="190" height="124" rx="16" fill="#fff" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="62" y="26" width="166" height="54" rx="10" fill={TEAL} fillOpacity=".14" />
        <circle cx="86" cy="46" r="8" fill={AMBER} />
        <path d="M62 80 l34 -26 26 18 18 -12 38 20z" fill={TEAL} fillOpacity=".7" />
        <rect x="62" y="90" width="110" height="8" rx="4" fill={NAVY} opacity=".7" />
        <rect x="62" y="104" width="76" height="6" rx="3" fill="var(--border)" />
        <rect x="62" y="118" width="74" height="14" rx="7" fill={TEAL} />
        <text x="99" y="128" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">Buy now</text>
        <rect x="144" y="118" width="84" height="14" rx="7" fill="#fff" stroke={TEAL} />
        <text x="186" y="128" textAnchor="middle" fontSize="8" fontWeight="700" fill={TEAL}>View catalog</text>
      </g>
    </svg>
  )
}

function BrainArt() {
  return (
    <svg viewBox="0 0 300 150" className="h-auto w-full" aria-hidden>
      {[
        [40, 30], [40, 75], [40, 120],
      ].map(([x, y]) => (
        <g key={y}>
          <path d={`M${x + 20} ${y} C 120 ${y}, 120 75, 170 75`} fill="none" stroke={TEAL} strokeOpacity=".4" strokeWidth="1.6" strokeDasharray="4 5" className="wx-dash" />
          <rect x={x - 22} y={y - 12} width="44" height="24" rx="8" fill="#fff" stroke="var(--border)" />
          <rect x={x - 14} y={y - 3} width="28" height="5" rx="2.5" fill="var(--border)" />
        </g>
      ))}
      <circle cx="190" cy="75" r="30" fill={NAVY} />
      <circle cx="190" cy="75" r="22" fill="none" stroke={TEAL} strokeWidth="2" strokeDasharray="3 4" />
      <text x="190" y="80" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">AI</text>
      <path d="M220 75 H256" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
      <rect x="248" y="58" width="46" height="34" rx="12" fill={TEAL} />
      <path d="M260 76 l7 7 l14 -15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Avatar({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "accent" | "foreground" }) {
  const c = tone === "primary" ? "bg-primary text-primary-foreground" : tone === "accent" ? "bg-accent text-accent-foreground" : "bg-foreground text-background"
  return <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${c}`}>{children}</span>
}

function ApiProfileCard() {
  const checks = [
    { t: "Business verified", s: "Meta Business account" },
    { t: "Number connected", s: "Official WhatsApp Business API" },
    { t: "Quality rating", s: "High, limits monitored" },
  ]
  return (
    <div className="rounded-2xl bg-card p-5 shadow-[0_18px_40px_-24px_rgba(15,42,58,.55)] ring-1 ring-border">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0" role="img" aria-label="Account health: healthy">
          <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="7" />
          <circle cx="32" cy="32" r="26" fill="none" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeDasharray="150 164" transform="rotate(-90 32 32)" />
          <path d="M22 33 l7 7 l13 -15" fill="none" stroke={TEAL} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Account health</p>
          <p className="text-[20px] font-semibold leading-tight tracking-tight text-foreground">Healthy</p>
          <p className="text-[12px] text-primary">All checks passed</p>
        </div>
      </div>
      <ul className="relative mt-5 space-y-3.5 border-t border-border pt-4">
        {checks.map((c) => (
          <li key={c.t} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BadgeCheck className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold leading-tight">{c.t}</span>
              <span className="block text-[11.5px] leading-tight text-muted-foreground">{c.s}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl bg-muted/70 px-3.5 py-3">
        <div className="flex items-center justify-between text-[11.5px] font-semibold">
          <span>Messaging limit</span>
          <span className="text-muted-foreground">Tracked daily</span>
        </div>
        <div className="mt-2 flex gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <i key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function InboxList() {
  const rows = [
    { n: "Aarav", m: "Is the blue one in stock?", t: "now", b: 2, tone: "primary" as const, tag: "AI replying" },
    { n: "Meera", m: "Please share my invoice", t: "2m", b: 0, tone: "accent" as const, tag: "AI replied" },
    { n: "Rohit", m: "I want to talk to someone", t: "5m", b: 1, tone: "foreground" as const, tag: "With Priya" },
  ]
  return (
    <div className="-mb-12 space-y-2 rounded-t-2xl bg-card p-3 shadow-[0_18px_40px_-24px_rgba(15,42,58,.55)] ring-1 ring-border">
      {rows.map((r) => (
        <div key={r.n} className="flex items-center gap-3 rounded-xl px-2 py-1.5">
          <Avatar tone={r.tone}>{r.n[0]}</Avatar>
          <div className="min-w-0 flex-1">
            <p className="flex items-center justify-between text-[13px] font-semibold leading-tight">{r.n}<span className="text-[10.5px] font-medium text-muted-foreground">{r.t}</span></p>
            <p className="truncate text-[12px] text-muted-foreground">{r.m}</p>
            <span className="mt-1 inline-block rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{r.tag}</span>
          </div>
          {r.b > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10.5px] font-bold text-primary-foreground">{r.b}</span>}
        </div>
      ))}
    </div>
  )
}

function TemplateCards() {
  const kinds = [
    { icon: ImageIcon, label: "Image", on: true },
    { icon: Video, label: "Video", on: false },
    { icon: FileText, label: "Document", on: false },
  ]
  const buttons = [
    { icon: Link2, label: "Track order" },
    { icon: Phone, label: "Call support" },
  ]
  return (
    <div className="mx-auto w-full max-w-[290px]">
      <div className="flex items-center gap-1.5">
        {kinds.map((k) => (
          <span
            key={k.label}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${k.on ? "bg-foreground text-background" : "bg-white/70 text-muted-foreground ring-1 ring-border"}`}
          >
            <k.icon className="h-3 w-3" />{k.label}
          </span>
        ))}
      </div>

      <div className="relative mt-2.5">
        <div aria-hidden className="absolute -inset-2 -z-0 rounded-[1.75rem] bg-white/40 blur-xl" />
        <div className="relative overflow-hidden rounded-2xl rounded-tl-md bg-card shadow-[0_22px_44px_-24px_rgba(15,42,58,.65)] ring-1 ring-border">
          <div className="relative h-[64px] overflow-hidden bg-gradient-to-br from-primary/35 via-primary/15 to-accent/50">
            <svg viewBox="0 0 290 92" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
              <circle cx="232" cy="26" r="13" fill={AMBER} />
              <path d="M0 92 L74 40 L128 72 L186 34 L290 92Z" fill={TEAL} fillOpacity=".8" />
              <path d="M120 92 L190 58 L250 92Z" fill={NAVY} fillOpacity=".18" />
            </svg>
            <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground">Offer</span>
          </div>
          <div className="px-3.5 pb-1 pt-2.5">
            <p className="text-[13.5px] font-semibold leading-tight">Diwali sale is live</p>
            <p className="mt-1 text-[12px] leading-snug text-muted-foreground">Hi Aarav, get up to 40% off on your favourites. Today only.</p>
                      </div>
          <ul className="mt-2 grid grid-cols-2 divide-x divide-border border-t border-border">
            {buttons.map((b) => (
              <li key={b.label} className="flex items-center justify-center gap-2 py-2.5 text-[12.5px] font-semibold text-primary">
                <b.icon className="h-3.5 w-3.5" />{b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
        Approved, ready to send
      </p>
    </div>
  )
}

function AiPanel() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white/[.06] ring-1 ring-white/15 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[12px] font-semibold text-white/85">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[9.5px] font-extrabold text-accent-foreground">AI</span>
        WhatsApp agent
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-primary"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />Replying</span>
      </div>
      <div className="space-y-2.5 p-4">
        <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2 text-[13px] text-white">What is your refund policy?</p>
        <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-[13px] text-primary-foreground">Refunds are processed within 5 to 7 days of pickup.</p>
        <div className="ml-auto flex w-fit items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px] text-white/70 ring-1 ring-white/10">
          <LayoutList className="h-3.5 w-3.5 text-primary" /> Source: Refund policy
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-3 py-2 text-[12px] font-medium text-white/80">
          <UserCheck className="h-4 w-4 text-accent" /> Customer asked for a person: handed to Priya
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/55">
          <span>Answered in 2 sec</span>
          <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-primary" />Grounded in your content</span>
        </div>
      </div>
    </div>
  )
}

export function WhatsAppCapabilities() {
  const tile = "relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-border p-6 sm:p-7"
  const h3 = "text-[21px] font-semibold leading-tight tracking-tight"
  const p = "mt-2 max-w-md text-[14.5px] leading-relaxed text-muted-foreground"
  const num = "text-[12px] font-bold tracking-[0.18em] text-primary"
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
            WhatsApp done properly: official, verified and AI-powered
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Everything you need to run WhatsApp as a real business channel, not a demo integration.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className={`${tile} bg-card md:col-span-2`}>
            <div className="grid flex-1 items-center gap-8 sm:grid-cols-[1fr_320px]">
              <div className="self-start">
                <span className={num}>01</span>
                <h3 className={`${h3} mt-3`}>Official WhatsApp Business API</h3>
                <p className={p}>
                  A verified sender on the official API, with messaging limits and quality rating monitored in the
                  dashboard, so your number stays in good standing and your messages get delivered.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Verified sender", "Limits tracked", "Delivery reports"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[12px] font-semibold text-primary">
                      <ShieldCheck className="h-3.5 w-3.5" />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-primary/15 blur-2xl" />
                <div className="relative rounded-3xl bg-gradient-to-br from-primary/15 via-muted/70 to-accent/25 p-4 ring-1 ring-border">
                  <ApiProfileCard />
                </div>
              </div>
            </div>
          </article>

          <article className={`${tile} bg-primary/10 pb-0`}>
            <span className={num}>02</span>
            <h3 className={`${h3} mt-3`}>Two-way conversations</h3>
            <p className={p}>Every chat lands in the shared inbox with history, notes and canned replies.</p>
            <div className="mt-auto pt-5"><InboxList /></div>
          </article>

          <article className={`${tile} bg-accent/20`}>
            <span className={num}>03</span>
            <h3 className={`${h3} mt-3`}>Rich message templates</h3>
            <p className={p}>Images, video, documents, buttons and list replies.</p>
            <div className="mt-auto pt-5"><TemplateCards /></div>
          </article>

          <article className={`${tile} bg-[oklch(0.13_0.02_230)] text-white md:col-span-2`}>
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative grid flex-1 items-center gap-8 sm:grid-cols-[1fr_340px]">
              <div className="self-start">
                <span className={num}>04</span>
                <h3 className={`${h3} mt-3`}>AI that answers WhatsApp chats</h3>
                <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-white/70">
                  The agentic AI handles routine questions from your knowledge base, catalog and policies, and hands off
                  to a human in the same thread when the conversation needs one.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Knowledge base", "Catalog", "Policies"].map((t) => (
                    <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/[.08] px-3 py-1.5 text-[12px] font-semibold text-white/85 ring-1 ring-white/15">
                      <i className="h-1.5 w-1.5 rounded-full bg-accent" />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-primary/20 blur-2xl" />
                <div className="relative"><AiPanel /></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. HOW IT WORKS: winding path ───────────────────────── */

const STEPS = [
  {
    n: "01",
    icon: PlugZap,
    title: "Connect your number",
    body: "Link your business phone number and Meta Business account. SMSLocal, as a WhatsApp Business Solution Provider, handles the API onboarding.",
    tags: ["Phone number", "Meta Business account"],
  },
  {
    n: "02",
    icon: BadgeCheck,
    title: "Verify and get templates approved",
    body: "Set up your verified sender profile and submit message templates for approval: order updates, reminders, offers and more.",
    tags: ["Sender profile", "Templates"],
  },
  {
    n: "03",
    icon: Bot,
    title: "Train the AI on your data",
    body: "Point the agent at your FAQs, catalog and policies. It answers from your content and knows when to hand over to your team.",
    tags: ["FAQs", "Catalog", "Policies"],
  },
  {
    n: "04",
    icon: Sparkles,
    title: "Go live and watch quality",
    body: "Start two-way chats and campaigns to opted-in customers while the dashboard tracks messaging limits and quality rating.",
    tags: ["Two-way chats", "Messaging limits", "Quality rating"],
  },
]

export function WhatsAppSteps() {
  return (
    <section className="relative border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[.8fr_1.2fr] md:gap-12 lg:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
            From WhatsApp Business API signup to live chats in four steps
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[16px] leading-relaxed text-muted-foreground">
            SMSLocal handles the Meta onboarding, so your team spends its time on customers instead of paperwork.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <div className="flex gap-1.5">
              {STEPS.map((s) => <i key={s.n} className="h-1.5 w-8 rounded-full bg-primary" />)}
            </div>
            <span className="text-[12.5px] font-semibold text-muted-foreground">4 steps to live</span>
          </div>
        </div>

        <ol className="relative space-y-4">
          <span aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-primary via-primary/40 to-border" />
          {STEPS.map((s) => (
            <li key={s.n} className="relative flex gap-5">
              <span className="relative z-10 flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-[6px] ring-muted">
                <s.icon className="h-6 w-6" />
              </span>
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6">
                <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 select-none text-[76px] font-extrabold leading-none tracking-tighter text-primary/10">{s.n}</span>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">Step {s.n}</p>
                <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full bg-muted px-2.5 py-1 text-[11.5px] font-semibold text-foreground/80 ring-1 ring-border">{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── 5. USE CASES: chat-bubble cards ───────────────────────── */

const CASES = [
  { icon: ShoppingBag, tag: "E-commerce", out: "Your order #1042 has shipped. Track it here.", inn: "Can I change my address?", tint: "color-mix(in oklch, var(--primary) 16%, white)" },
  { icon: Landmark, tag: "Banking & fintech", out: "Your OTP is 482 910. Valid for 5 minutes.", inn: "Block my card please", tint: "color-mix(in oklch, var(--accent) 40%, white)" },
  { icon: HeartPulse, tag: "Healthcare", out: "Reminder: appointment with Dr. Rao, Tue 4 PM.", inn: "Reschedule to Wed", tint: "color-mix(in oklch, var(--primary) 16%, white)" },
  { icon: GraduationCap, tag: "Education", out: "Fee receipt and Term 2 timetable attached.", inn: "Share bus route", tint: "color-mix(in oklch, var(--accent) 40%, white)" },
  { icon: Truck, tag: "Logistics", out: "Your delivery partner is 10 minutes away.", inn: "Leave it at the gate", tint: "color-mix(in oklch, var(--primary) 16%, white)" },
  { icon: Building2, tag: "Real estate", out: "Site visit confirmed for Saturday 11 AM.", inn: "Send floor plan", tint: "color-mix(in oklch, var(--accent) 40%, white)" },
]

export function WhatsAppUseCases() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
              WhatsApp Business messaging for every industry
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Order updates, OTPs, appointment reminders, lead follow-ups and support: one verified number, one AI, one inbox.
          </p>
        </div>

        <div className="mt-12 columns-1 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {CASES.map((c, i) => (
            <article
              key={c.tag}
              className="mb-5 break-inside-avoid overflow-hidden rounded-[26px] border border-border bg-card"
            >
              <div className="flex items-center gap-3 px-5 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground" style={{ background: c.tint }}>
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="text-[15px] font-semibold tracking-tight">{c.tag}</h3>
              </div>
              <div className={`m-4 space-y-2 rounded-2xl p-4 ${i % 2 ? "pb-6" : ""}`} style={{ background: c.tint }}>
                <p className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13px] leading-snug text-neutral-800 shadow-sm">
                  {c.out}
                </p>
                <p className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3.5 py-2.5 text-[13px] leading-snug shadow-sm">
                  {c.inn}
                </p>
                <p className="flex items-center gap-1.5 pl-1 text-[11.5px] font-medium text-neutral-700">
                  <Bot className="h-3.5 w-3.5" /> AI replies instantly, human steps in when needed
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 6. WHY IT WORKS: 24h dial (dark) ───────────────────────── */

function CoverageCard() {
  const aiShare = [100, 100, 100, 100, 100, 98, 94, 86, 74, 68, 64, 62, 60, 62, 64, 66, 70, 76, 84, 90, 94, 98, 100, 100]
  const volume = [14, 10, 8, 6, 6, 10, 18, 34, 58, 78, 90, 86, 74, 80, 92, 84, 70, 58, 50, 60, 66, 54, 38, 24]
  const log = [
    { t: "2:14 AM", who: "Aarav", what: "Asked about COD", by: "Answered by AI in 2 sec", ai: true },
    { t: "11:05 AM", who: "Rohit", what: "Asked for a person", by: "Handed to Priya", ai: false },
    { t: "9:47 PM", who: "Meera", what: "Asked for an invoice", by: "Answered by AI in 2 sec", ai: true },
  ]
  return (
    <div className="overflow-hidden rounded-3xl bg-white/[.05] p-5 ring-1 ring-white/15 backdrop-blur sm:p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Conversations by hour</p>
          <p className="mt-1 text-[34px] font-extrabold leading-none tracking-tight">24/7</p>
          <p className="mt-1 text-[12.5px] text-white/65">every message answered</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-[11.5px] font-semibold text-primary ring-1 ring-primary/30">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />Live
        </span>
      </div>

      <div className="mt-6 flex h-[148px] items-end gap-[5px]" role="img" aria-label="Hourly conversations: AI answers most messages at every hour, and the team handles the share that needs a person during business hours">
        {volume.map((v, h) => {
          const ai = aiShare[h]
          return (
            <div key={h} className="flex h-full flex-1 flex-col justify-end">
              <div className="flex flex-col overflow-hidden rounded-[4px]" style={{ height: `${v}%` }}>
                <i style={{ height: `${100 - ai}%`, background: AMBER, minHeight: ai < 100 ? 2 : 0 }} />
                <i className="flex-1 bg-primary" />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10.5px] font-medium text-white/50">
        {["12 AM", "6 AM", "12 PM", "6 PM", "11 PM"].map((t) => <span key={t}>{t}</span>)}
      </div>
      <div className="mt-4 flex gap-5 text-[12px] text-white/70">
        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-sm bg-primary" />Answered by AI</span>
        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-sm" style={{ background: AMBER }} />Handed to team</span>
      </div>

      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
        {log.map((l) => (
          <li key={l.t} className="flex items-center gap-3 rounded-xl bg-white/[.05] px-3 py-2.5 ring-1 ring-white/10">
            <span className="w-[58px] shrink-0 text-[11px] font-semibold text-white/55">{l.t}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold">{l.who}</span>
              <span className="block truncate text-[11.5px] text-white/60">{l.what}</span>
            </span>
            <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${l.ai ? "bg-primary/15 text-primary" : "text-[oklch(0.85_0.14_80)] bg-white/10"}`}>
              {l.ai ? <Bot className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}{l.by}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WhatsAppWhyItWorks() {
  const rows = [
    { icon: Bot, label: "Sub-second replies", desc: "AI responds to WhatsApp messages instantly, at any hour." },
    { icon: BadgeCheck, label: "Verified sender", desc: "The official API keeps your quality rating high and delivery reliable." },
    { icon: UserCheck, label: "Smooth human handoff", desc: "Your team steps into the same thread with full context when needed." },
    { icon: Sparkles, label: "Actionable messages", desc: "Buttons, media and lists make every message easier to act on." },
  ]
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-14 text-white sm:py-16">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-primary/20 blur-[110px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <CoverageCard />
        <div>
          <Eyebrow dark>Why it works</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
            Fast, accurate WhatsApp replies, around the clock
          </h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/70">
            Customers get fast, accurate WhatsApp replies around the clock, and your team handles only what needs a person,
            all from one inbox. No missed messages, no channel switching, no customers left waiting because it&apos;s 2 AM.
          </p>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {rows.map((r) => (
              <div key={r.label} className="flex items-start gap-4 py-4">
                <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <dt className="text-[15px] font-semibold">{r.label}</dt>
                  <dd className="mt-0.5 text-[13.5px] leading-snug text-white/65">{r.desc}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. WHY SMSLOCAL: one customer record ───────────────────────── */

function CustomerRecord() {
  const events = [
    { icon: Megaphone, ch: "WhatsApp broadcast", what: "Diwali sale template delivered", t: "Mon, 10:02 AM", tone: "primary" as const },
    { icon: MessageCircle, ch: "WhatsApp reply", what: "\"Is the blue one in stock?\" answered by AI", t: "Mon, 10:04 AM", tone: "primary" as const },
    { icon: Phone, ch: "Voice call", what: "Called back about delivery slot", t: "Mon, 3:20 PM", tone: "accent" as const },
    { icon: Mail, ch: "Email", what: "Invoice sent after payment", t: "Mon, 3:41 PM", tone: "accent" as const },
    { icon: MessageSquare, ch: "SMS", what: "Delivery OTP confirmed", t: "Tue, 11:15 AM", tone: "accent" as const },
  ]
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[0_24px_50px_-30px_rgba(15,42,58,.5)] ring-1 ring-border">
      <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-5 py-4">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-[15px] font-bold text-background">
          A
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-2 ring-card"><Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3.5} /></span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-semibold leading-tight">Aarav Mehta</p>
          <p className="text-[12px] text-muted-foreground">One customer record</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">5 channels, 1 thread</span>
      </div>

      <ol className="relative space-y-1 px-5 py-5">
        <span aria-hidden className="absolute bottom-9 left-[37px] top-9 w-px bg-border" />
        {events.map((e) => (
          <li key={e.ch} className="relative flex items-start gap-3.5 py-2">
            <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card ${e.tone === "primary" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
              <e.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-baseline justify-between gap-3 text-[13px] font-semibold leading-tight">
                {e.ch}<span className="shrink-0 text-[11px] font-medium text-muted-foreground">{e.t}</span>
              </p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">{e.what}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function WhatsAppWhySmsLocal() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/15 p-8 sm:p-12 dark:from-card dark:to-card">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Why SMSLocal</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[38px]">
                WhatsApp is one channel, not your whole stack
              </h2>
              <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">
                WhatsApp is one channel on a platform that also runs your broadcasting, voice, SMS and email, all tied to a
                single customer record. A customer who gets a WhatsApp broadcast, replies with a question and then calls you
                is one conversation, not three separate tickets in three separate tools.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/channels/whatsapp-broadcasting/" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90">
                  WhatsApp Broadcasting <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary">
                  Omnichannel Inbox <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <CustomerRecord />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 9. RELATED: destination tiles ───────────────────────── */

export function WhatsAppRelated({ links, wide = false }: { links: { href: string; label: string; hint: string }[]; wide?: boolean }) {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className={`mx-auto px-4 sm:px-6 ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
        <Eyebrow>Explore more</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[22px] border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
            >
              <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60 transition group-hover:scale-125" style={{ background: [ "color-mix(in oklch, var(--primary) 20%, transparent)", "color-mix(in oklch, var(--accent) 45%, transparent)" ][i % 2] }} />
              <Link2 className="relative h-5 w-5 text-primary" />
              <span className="relative">
                <span className="block text-[15px] font-semibold leading-snug tracking-tight">{l.label}</span>
                <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">{l.hint}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

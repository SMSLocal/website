import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  CheckCheck,
  CreditCard,
  Filter,
  GitBranch,
  Headphones,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRound,
  Workflow,
} from "lucide-react"
import type { ReactNode } from "react"

/* Shared dark panel — matches the site's product-visual aesthetic. */
function Panel({
  icon,
  label,
  status = "Live",
  children,
  footer,
}: {
  icon: ReactNode
  label: string
  status?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-emerald-500/5 to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[oklch(0.14_0.03_230)] shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              {icon}
            </span>
            <span className="text-[13px] font-semibold text-white">{label}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {status}
          </span>
        </div>
        <div className="p-4">{children}</div>
        {footer ? (
          <div className="grid grid-cols-3 gap-2 border-t border-white/8 bg-white/[0.02] px-4 py-3 text-center">{footer}</div>
        ) : null}
      </div>
    </div>
  )
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div>
      <p className="text-[15px] font-semibold text-white">{v}</p>
      <p className="text-[10px] uppercase tracking-[0.1em] text-white/45">{l}</p>
    </div>
  )
}

function CustomerBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
        <UserRound className="h-3.5 w-3.5" />
      </span>
      <div className="rounded-2xl rounded-tl-md border border-white/5 bg-white/[0.04] px-3.5 py-2.5 text-[12.5px] leading-snug text-white/85">
        {children}
      </div>
    </div>
  )
}

function AiBubble({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <div className="flex items-start justify-end gap-2.5">
      <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-primary/30 bg-gradient-to-br from-primary/25 to-primary/10 px-3.5 py-2.5">
        <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-300">
          <Bot className="h-2.5 w-2.5" /> Captain AI
        </div>
        <p className="mt-1 text-[12.5px] leading-snug text-white">{children}</p>
        {source ? (
          <p className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-white/60">
            <span className="h-1 w-1 rounded-full bg-emerald-400" /> {source}
          </p>
        ) : null}
      </div>
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Bot className="h-3.5 w-3.5" />
      </span>
    </div>
  )
}

/* ── 1. Customer Service ─────────────────────────────────────────────── */
export function CustomerServiceVisual() {
  return (
    <Panel
      icon={<Headphones className="h-4 w-4" />}
      label="Captain AI · Support"
      footer={
        <>
          <Stat v="78%" l="Auto-resolved" />
          <Stat v="<2s" l="First reply" />
          <Stat v="7" l="Channels" />
        </>
      }
    >
      <div className="space-y-3">
        <CustomerBubble>Where&apos;s my order #SL-4421? It&apos;s late.</CustomerBubble>
        <AiBubble source="Shiprocket · live lookup">
          It&apos;s out for delivery and arrives by 5 PM today. I&apos;ve texted you the tracking link.
        </AiBubble>
        <div className="flex items-center justify-between rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-300">
            <Check className="h-3 w-3" strokeWidth={3} /> Resolved — no human needed
          </span>
          <span className="text-[10px] text-white/45">CSAT 5/5</span>
        </div>
      </div>
    </Panel>
  )
}

/* ── 2. Sales ────────────────────────────────────────────────────────── */
export function SalesVisual() {
  return (
    <Panel
      icon={<ShoppingBag className="h-4 w-4" />}
      label="Captain AI · Sales"
      footer={
        <>
          <Stat v="₹2.4L" l="Carts recovered" />
          <Stat v="3.1x" l="Conversion" />
          <Stat v="24/7" l="Always on" />
        </>
      }
    >
      <div className="space-y-3">
        <CustomerBubble>Show me table lamps under ₹2,000.</CustomerBubble>
        <div className="flex items-start justify-end gap-2.5">
          <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 p-2.5">
            <div className="flex items-center gap-1 px-1 text-[10.5px] font-semibold text-emerald-300">
              <Bot className="h-2.5 w-2.5" /> Captain AI
            </div>
            <div className="mt-1.5 flex items-center gap-2.5 rounded-xl bg-white/[0.06] p-2">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-emerald-400/40 to-teal-500/20" />
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-white">Aizel Arc Lamp</p>
                <p className="text-[11px] text-white/55">₹1,799 · in stock</p>
              </div>
            </div>
            <button className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-1.5 text-[11.5px] font-bold text-[#06251a]">
              Add to cart <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Bot className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Panel>
  )
}

/* ── 3. Booking ──────────────────────────────────────────────────────── */
export function BookingVisual() {
  return (
    <Panel
      icon={<CalendarCheck className="h-4 w-4" />}
      label="Captain AI · Booking"
      footer={
        <>
          <Stat v="-38%" l="No-shows" />
          <Stat v="Live" l="Availability" />
          <Stat v="Auto" l="Reminders" />
        </>
      }
    >
      <div className="space-y-3">
        <CustomerBubble>Can I book a consultation tomorrow?</CustomerBubble>
        <AiBubble>Sure — here are tomorrow&apos;s open slots:</AiBubble>
        <div className="flex flex-wrap gap-2 pl-9">
          {["10:00", "11:30", "2:00", "4:30"].map((t, i) => (
            <span
              key={t}
              className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold ${
                i === 1
                  ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-200"
                  : "border-white/10 bg-white/5 text-white/70"
              }`}
            >
              {t}{i === 1 && <Check className="ml-1 inline h-3 w-3" strokeWidth={3} />}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
          <span className="text-[11.5px] font-semibold text-emerald-300">Confirmed · 11:30 AM</span>
          <span className="inline-flex items-center gap-1 text-[10px] text-white/50">
            <CheckCheck className="h-3 w-3" /> Reminder scheduled
          </span>
        </div>
      </div>
    </Panel>
  )
}

/* ── 4. Lead Qualification ───────────────────────────────────────────── */
export function LeadQualificationVisual() {
  return (
    <Panel
      icon={<Filter className="h-4 w-4" />}
      label="Captain AI · Leads"
      footer={
        <>
          <Stat v="92" l="Intent score" />
          <Stat v="<10s" l="Response" />
          <Stat v="CRM" l="Synced" />
        </>
      }
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] p-3">
          <div>
            <p className="text-[12.5px] font-semibold text-white">Neha — WhatsApp</p>
            <p className="text-[11px] text-white/55">Budget ₹50k · 20 seats · this month</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300">Hot · 92</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-300">
            <ArrowRight className="h-3 w-3" /> Routed to Priya (Sales)
          </span>
          <span className="text-[10px] text-white/50">synced to CRM</span>
        </div>
      </div>
    </Panel>
  )
}

/* ── 5. Agent Builder ────────────────────────────────────────────────── */
export function AgentBuilderVisual() {
  const nodes = [
    { icon: Sparkles, label: "Trigger", sub: "New message" },
    { icon: Bot, label: "Knowledge", sub: "Your docs + catalog" },
    { icon: Workflow, label: "Condition", sub: "Intent = refund?" },
    { icon: ShieldCheck, label: "Handoff", sub: "Escalate to human" },
  ]
  return (
    <Panel
      icon={<GitBranch className="h-4 w-4" />}
      label="Captain AI · Builder"
      status="No-code"
      footer={
        <>
          <Stat v="0" l="Lines of code" />
          <Stat v="Days" l="To launch" />
          <Stat v="Every" l="Channel" />
        </>
      }
    >
      <div className="space-y-2">
        {nodes.map((n, i) => {
          const Icon = n.icon
          return (
            <div key={n.label}>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-white">{n.label}</p>
                  <p className="text-[11px] text-white/50">{n.sub}</p>
                </div>
                <span className="ml-auto text-[10px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
              {i < nodes.length - 1 && <div className="ml-7 h-3 w-px bg-white/15" />}
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

import Link from "next/link"
import { ArrowRight, Bot, KeyRound, MessageCircle, MessageSquare, Sparkles, Zap } from "lucide-react"

type Tone = "primary" | "accent" | "emerald" | "amber"

type Tile = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  headline: string
  body: string
  link: string
  tone: Tone
  featured?: boolean
  badge?: string
}

const TILES: Tile[] = [
  {
    label: "Bulk SMS",
    icon: MessageSquare,
    href: "/products/bulk-sms",
    headline: "DLT-compliant bulk SMS, built for Indian scale",
    body: "Launch promotional and transactional campaigns on approved DLT templates. Priority routing, real-time delivery reports, and wrong-number detection on every send.",
    link: "Explore Bulk SMS",
    tone: "primary",
  },
  {
    label: "RCS Business Messaging",
    icon: Sparkles,
    href: "/products/rcs",
    headline: "Branded, verified RCS — with SMS fallback built in",
    body: "Send rich cards, carousels, suggested replies, and a verified sender badge over carrier RCS on Jio, Airtel, and Vi. Automatic fallback to DLT-compliant SMS when the handset doesn't support RCS.",
    link: "Explore RCS",
    tone: "amber",
    badge: "New",
  },
  {
    label: "WhatsApp Business API",
    icon: MessageCircle,
    href: "/products/whatsapp-business-api",
    headline: "Official WhatsApp BSP with shared inbox and flow builder",
    body: "Broadcasts, templates, a shared team inbox, and a visual flow builder on the official Meta API. No setup fee, no monthly plan — start with the ₹100 minimum top-up.",
    link: "Explore WhatsApp",
    tone: "emerald",
    featured: true,
  },
  {
    label: "AI Agents",
    icon: Bot,
    href: "/products/ai-agents",
    headline: "AI agents that deflect 40–60% of repeat WhatsApp queries",
    body: "Visual flow builder grounded on your docs and catalog. Clean escalation to a shared team inbox when the agent isn't sure. Cuts boilerplate work without ever confusing a customer.",
    link: "Explore AI Agents",
    tone: "accent",
  },
  {
    label: "Quick SMS",
    icon: Zap,
    href: "/products/quick-sms",
    headline: "No-code sender for ops, support, and marketing teams",
    body: "Upload a CSV, pick a DLT template, preview, and send — no developer required. Approval gates, per-workspace roles, and downloadable delivery reports.",
    link: "Explore Quick SMS",
    tone: "primary",
  },
]

export function ProductTiles() {
  return (
    <section id="products" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            The Platform
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            One platform. Every channel your customers use.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            SMS, RCS, WhatsApp, AI agents, OTP, and a no-code sender — on the same wallet, same API, same dashboard.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TILES.map((tile) => {
            const Icon = tile.icon
            const featured = tile.featured
            return (
              <Link
                key={tile.label}
                href={tile.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition hover:shadow-xl ${
                  featured
                    ? "border-primary/30 bg-gradient-to-br from-[oklch(0.17_0.03_230)] to-[oklch(0.2_0.04_220)] text-white shadow-xl shadow-primary/10 lg:col-span-2"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-50 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
                    }}
                  />
                )}

                <div className="relative flex items-center gap-3">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                      featured ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                      featured
                        ? "border-accent/40 bg-accent/15 text-accent"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {tile.label}
                  </span>
                  {tile.badge && (
                    <span className="ml-auto rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-500">
                      {tile.badge}
                    </span>
                  )}
                  {featured && !tile.badge && (
                    <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      Flagship
                    </span>
                  )}
                </div>

                <h3
                  className={`relative mt-5 text-pretty text-xl font-semibold leading-tight tracking-tight ${
                    featured ? "text-white" : "text-foreground"
                  }`}
                >
                  {tile.headline}
                </h3>
                <p
                  className={`relative mt-3 text-sm leading-relaxed ${
                    featured ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {tile.body}
                </p>

                <div className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {tile.link}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

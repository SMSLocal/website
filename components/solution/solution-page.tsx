import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Info, ShieldCheck, type LucideIcon } from "lucide-react"

/* ---------------------------------------------------------------------------
   Industry-specific primitives that sit on top of the product-page toolkit.
   Intentionally small so each solution page stays a thin data layer.
--------------------------------------------------------------------------- */

/* ---------- IndustryPain: intro block with a pull stat on the right ---------- */

export function IndustryPain({
  paragraphs,
  stat,
}: {
  paragraphs: string[]
  stat?: { value: string; label: string }
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <div className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-[17px]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {stat ? (
        <figure className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-border bg-muted/30 p-8">
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.68_0.16_165/0.08),transparent_60%)]"
          />
          <div className="relative">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
              The problem, in numbers
            </span>
            <p className="mt-6 font-[family-name:var(--font-serif,var(--font-sans))] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 text-sm leading-snug text-muted-foreground">{stat.label}</p>
          </div>
        </figure>
      ) : null}
    </div>
  )
}

/* ---------- RelevantProductsGrid: 4 cards linking to products ---------- */

export type RelevantProduct = {
  icon: LucideIcon
  title: string
  description: string
  href: string
  linkLabel?: string
}

export function RelevantProductsGrid({ items }: { items: RelevantProduct[] }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href + item.title}
            href={item.href}
            className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {item.linkLabel ?? "Explore product"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

/* ---------- ComplianceCallout: highlighted legal/regulatory note ---------- */

export function ComplianceCallout({
  eyebrow = "Compliance note",
  title,
  children,
  variant = "default",
}: {
  eyebrow?: string
  title: string
  children: ReactNode
  variant?: "default" | "strict"
}) {
  const isStrict = variant === "strict"
  return (
    <aside
      className={`relative overflow-hidden rounded-2xl border p-7 sm:p-9 ${
        isStrict
          ? "border-amber-500/25 bg-amber-50/50 dark:bg-amber-950/15"
          : "border-primary/20 bg-primary/5"
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 ${
          isStrict
            ? "bg-[radial-gradient(circle_at_bottom_left,oklch(0.72_0.14_85/0.1),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_bottom_left,oklch(0.68_0.16_165/0.08),transparent_55%)]"
        }`}
      />
      <div className="relative flex gap-5">
        <span
          className={`hidden h-11 w-11 flex-none items-center justify-center rounded-xl ring-1 sm:inline-flex ${
            isStrict
              ? "bg-amber-500/15 text-amber-700 ring-amber-500/25 dark:text-amber-300"
              : "bg-primary/10 text-primary ring-primary/20"
          }`}
        >
          {isStrict ? <Info className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
        </span>
        <div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
              isStrict
                ? "border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200"
                : "border border-primary/20 bg-background/60 text-primary"
            }`}
          >
            {eyebrow}
          </span>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h3>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}

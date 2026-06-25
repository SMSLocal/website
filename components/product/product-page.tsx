import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Check,
  Minus,
  X,
} from "lucide-react"

/* ---------- Section wrapper ---------- */

export function Section({
  id,
  className = "",
  children,
  tone = "light",
}: {
  id?: string
  className?: string
  children: ReactNode
  tone?: "light" | "muted" | "dark"
  /** Accepted for layout intent on some product pages; currently a no-op. */
  screenHeight?: boolean
}) {
  const toneClass =
    tone === "dark"
      ? "bg-[oklch(0.13_0.02_230)] text-white"
      : tone === "muted"
        ? "bg-muted/50 border-y border-border"
        : "bg-background border-y border-border"
  return (
    <section id={id} className={`${toneClass} py-14 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  description,
  center = false,
  dark = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  center?: boolean
  dark?: boolean
}) {
  const copy = subtitle ?? description
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] ${
            dark
              ? "border border-white/15 bg-white/5 text-white/75"
              : "border border-border bg-muted text-muted-foreground"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed sm:text-[17px] ${
            dark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  )
}

/* ---------- Product Hero ---------- */

export type HeroStat = { icon: React.ComponentType<{ className?: string }>; label: string }

export function ProductHero({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  trustBar,
  trustItems,
  visual,
  compact = false,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  description?: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  trustBar?: HeroStat[]
  trustItems?: string[]
  visual: ReactNode
  compact?: boolean
}) {
  const heroCopy = subtitle ?? description ?? ""
  const heroTrust: HeroStat[] =
    trustBar ??
    (trustItems
      ? trustItems.map((label) => ({ icon: Check, label }))
      : [])
  return (
    <section className="relative bg-[oklch(0.14_0.02_230)] text-white">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute -right-40 top-20 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--accent) 50%, transparent), transparent 70%)",
          }}
        />
        <div className="bg-grid-ink absolute inset-0 opacity-60 mask-radial-fade" />
      </div>

      <div
        className={`relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 ${
          compact ? "py-8 sm:py-10 lg:py-10 lg:items-start" : "py-20 sm:py-24 lg:py-28 lg:items-center"
        }`}
      >
        <div className={compact ? "lg:py-2" : ""}>
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
            {eyebrow}
          </span>
          <h1
            className={`text-balance font-semibold leading-[1.08] tracking-tight ${
              compact ? "mt-4 text-3xl sm:text-4xl lg:text-[2.9rem]" : "mt-5 text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </h1>
          <p className={`max-w-xl text-pretty leading-relaxed text-white/70 ${compact ? "mt-4 text-[15px] sm:text-base" : "mt-5 text-base sm:text-[17px]"}`}>
            {heroCopy}
          </p>
          <div className={`flex flex-wrap items-center gap-3 ${compact ? "mt-6" : "mt-8"}`}>
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              {secondaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust bar */}
          <div className={`grid grid-cols-2 gap-3 border-t border-white/10 sm:grid-cols-4 ${compact ? "mt-6 pt-5" : "mt-10 pt-6"}`}>
            {heroTrust.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-start gap-2 text-[12.5px] text-white/75">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className="leading-snug">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative">{visual}</div>
      </div>
    </section>
  )
}

/* ---------- Capability Tiles (4 feature cards) ---------- */

export type Capability = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}

export function CapabilityGrid({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  items: Capability[]
}) {
  return (
    <Section>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="group relative flex flex-col border-l border-border pl-5 transition-colors hover:border-primary"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- How it works (4 steps) ---------- */

export type Step = { title: string; body?: string; description?: string; icon?: ReactNode }

export function HowItWorks({
  eyebrow,
  title,
  subtitle,
  steps,
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  steps: Step[]
}) {
  const body = (
    <>
      {title ? <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} /> : null}
      <ol
        className={`relative ${title ? "mt-14" : ""} grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4`}
      >
        {/* Horizontal connector — desktop only */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 right-4 top-4 hidden h-px bg-border lg:block"
        />
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="animate-step-loop relative flex flex-col"
            style={{ animationDelay: `${i * 250}ms` }}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-background text-[12.5px] font-semibold text-primary shadow-sm">
              {step.icon ?? String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Step {i + 1}
            </span>
            <h3 className="mt-1.5 text-[15.5px] font-semibold tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
              {step.body ?? step.description}
            </p>
          </li>
        ))}
      </ol>
    </>
  )
  return title ? <Section tone="muted">{body}</Section> : <div>{body}</div>
}

/* ---------- Deep-dive features (alternating rows) ---------- */

export type DeepDive = {
  title: string
  body: string
  visual?: ReactNode
  image?: string
  imageAlt?: string
  href?: string
  linkLabel?: string
}

export function DeepDiveFeatures({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string
  title: string
  items: DeepDive[]
}) {
  return (
    <Section>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="mt-14 flex flex-col gap-16">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary hover:underline"
                >
                  {item.linkLabel ?? "Learn more"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted to-background p-6 shadow-sm">
              {item.visual ??
                (item.image ? (
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 90vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <DeepDivePlaceholder index={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function DeepDivePlaceholder({ index }: { index: number }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[oklch(0.16_0.02_230)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklch, var(--primary) 40%, transparent), transparent 60%)",
        }}
      />
      <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
          Feature visual {index + 1}
        </span>
      </div>
    </div>
  )
}

/* ---------- Use cases grid (linking to solution pages) ---------- */

export type UseCase = {
  industry: string
  use: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export function UseCasesGrid({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  items: UseCase[]
}) {
  return (
    <Section tone="muted">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.industry}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl border border-border bg-background p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[14.5px] font-semibold tracking-tight text-foreground">
                    {item.industry}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.use}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- FAQ ---------- */

export type FaqItem = { q: string; a: string }

export function Faq({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string
  title?: string
  items: FaqItem[]
}) {
  const grid = (
    <div className={`${title ? "mt-10" : ""} grid grid-cols-1 gap-4 md:grid-cols-2`}>
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-border bg-card p-5 shadow-sm open:border-primary/30"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[14.5px] font-semibold tracking-tight text-foreground">
            {item.q}
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition group-open:rotate-45 group-open:border-primary/40 group-open:text-primary">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  )
  if (!title) return grid
  return (
    <Section>
      <SectionHeader eyebrow={eyebrow} title={title} />
      {grid}
    </Section>
  )
}

/* ---------- Compare table ---------- */

export type CompareCell = "yes" | "no" | "partial" | string
export type CompareRow =
  | { feature: string; cells: CompareCell[]; label?: never; values?: never }
  | { label: string; values: CompareCell[]; feature?: never; cells?: never }

export function CompareTable({
  eyebrow,
  title,
  subtitle,
  columns,
  rows,
  footnote,
  ctaLabel,
  ctaHref,
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  columns: string[]
  rows: CompareRow[]
  footnote?: string
  ctaLabel?: string
  ctaHref?: string
}) {
  const normalized = rows.map((row) => ({
    feature: "feature" in row && row.feature ? row.feature : row.label ?? "",
    cells: "cells" in row && row.cells ? row.cells : row.values ?? [],
  }))
  const body = (
    <>
      {title ? <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} /> : null}
      <div className={`${title ? "mt-10" : ""} overflow-hidden rounded-2xl border border-[oklch(0.84_0.018_160)] bg-background shadow-md`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14px] [&_td]:border [&_td]:border-[oklch(0.86_0.014_160)] [&_th]:border [&_th]:border-[oklch(0.86_0.014_160)]">
            <thead>
              <tr className="bg-[oklch(0.94_0.025_155)]">
                <th className="px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-foreground/75">
                  Feature
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    className={`px-5 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.12em] ${
                      i === 0 ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {normalized.map((row, ri) => (
                <tr
                  key={row.feature}
                  className={ri % 2 ? "bg-[oklch(0.975_0.01_160)]" : "bg-background"}
                >
                  <td className="px-5 py-3 font-semibold text-foreground">{row.feature}</td>
                  {row.cells.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3 text-center ${ci === 0 ? "bg-primary/[0.07]" : ""}`}
                    >
                      <CompareMark value={cell} emphasize={ci === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {footnote ? (
        <p className="mt-4 text-[12px] text-muted-foreground">{footnote}</p>
      ) : null}
      {ctaLabel && ctaHref ? (
        <div className="mt-6">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </>
  )
  return title ? <Section tone="muted">{body}</Section> : <div>{body}</div>
}

function CompareMark({ value, emphasize }: { value: CompareCell; emphasize: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          emphasize ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )
  }
  if (value === "no") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <X className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    )
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11.5px] font-semibold text-amber-600 dark:text-amber-400">
        <Minus className="h-3 w-3" />
        Partial
      </span>
    )
  }
  return <span className="text-[13px] text-muted-foreground">{value}</span>
}

/* ---------- Technical block ---------- */

export type TechItem = { label: string; value: string }

export function TechnicalBlock({
  eyebrow,
  title,
  subtitle,
  items,
  cta,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  items: TechItem[]
  cta?: { label: string; href: string }
}) {
  return (
    <Section tone="dark">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} dark />
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
              {item.label}
            </p>
            <p className="mt-2 font-mono text-[13px] text-white/85">{item.value}</p>
          </div>
        ))}
      </div>
      {cta ? (
        <div className="mt-8">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </Section>
  )
}

/* ---------- Editorial image band ---------- */

export function ProductEditorialBand({
  src,
  alt,
  eyebrow,
  headline,
  caption,
  layout = "overlay",
  imageWidth = 2098,
  imageHeight = 749,
}: {
  src: string
  alt: string
  eyebrow?: string
  headline: string
  caption?: string
  layout?: "overlay" | "split"
  imageWidth?: number
  imageHeight?: number
}) {
  if (layout === "split") {
    const copy = (
      <>
        {eyebrow ? (
          <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 backdrop-blur-md">
            {eyebrow}
          </span>
        ) : null}
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-3xl">
          {headline}
        </h3>
        {caption ? (
          <p className="mt-3 max-w-md text-pretty text-[14px] leading-relaxed text-white/80 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)] sm:text-[15px]">
            {caption}
          </p>
        ) : null}
      </>
    )

    return (
      <section className="relative overflow-hidden py-6 sm:py-8 lg:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.03 240) 0%, oklch(0.14 0.025 235) 55%, oklch(0.11 0.02 230) 100%)",
          }}
        />
        <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-50 mask-radial-fade" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-6rem] h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 50%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/10">
            <Image
              src={src}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="h-auto w-full"
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.10 0.02 230 / 0.45) 0%, oklch(0.10 0.02 230 / 0.28) 28%, oklch(0.10 0.02 230 / 0.10) 42%, transparent 55%)",
              }}
            />
            <div className="absolute inset-y-0 left-0 hidden max-w-[48%] flex-col justify-center pl-8 pr-6 lg:flex xl:pl-12">
              {copy}
            </div>
          </div>
          <div className="mt-6 lg:hidden">{copy}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)]">
      <div className="relative aspect-[21/9] w-full sm:aspect-[21/8]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.14 0.02 230 / 0.82) 0%, oklch(0.14 0.02 230 / 0.55) 45%, oklch(0.14 0.02 230 / 0.15) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12">
            <div className="max-w-xl">
              {eyebrow ? (
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 backdrop-blur-md">
                  {eyebrow}
                </span>
              ) : null}
              <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {headline}
              </h3>
              {caption ? (
                <p className="mt-3 max-w-md text-pretty text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                  {caption}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Product final CTA ---------- */

export function ProductFinalCta({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: {
  title: string
  subtitle?: string
  description?: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}) {
  const copy = subtitle ?? description ?? ""
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-10 text-white shadow-2xl sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 h-[380px] w-[380px] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
            }}
          />
          <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-50 mask-radial-fade" />
          <div className="relative max-w-2xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">{copy}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                {secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Logos strip (placeholder-first) ---------- */

export function LogosStrip({ label, count = 6 }: { label: string; count?: number }) {
  return (
    <div className="border-y border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-[11.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-6 grid grid-cols-3 items-center gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="flex h-10 items-center justify-center rounded-md border border-dashed border-border/70 bg-background/60 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70"
              aria-label="Customer logo placeholder"
            >
              LOGO
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Feature grid (ReactNode icon + description) ---------- */

export type FeatureItem = {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const offset = i % 3 === 1
        return (
          <div
            key={item.title}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md ${
              offset
                ? "border-primary/15 bg-primary/[0.02]"
                : "border-border bg-card"
            }`}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                offset ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}
            >
              {item.icon}
            </span>
            <h3 className="mt-4 text-[15.5px] font-semibold tracking-tight text-foreground">{item.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Bullet list (titled string[] column) ---------- */

export function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Use case grid (ReactNode icon + description, non-linking) ---------- */

export type UseCaseItem = {
  icon: ReactNode
  title: string
  description: string
}

export function UseCaseGrid({ items }: { items: UseCaseItem[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`relative flex flex-col p-6 ${
            i > 0 ? "sm:border-l sm:border-border" : ""
          } ${i > 1 ? "sm:border-t sm:border-border lg:border-t-0" : ""}`}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {item.icon}
          </span>
          <h3 className="mt-4 text-[14.5px] font-semibold tracking-tight text-foreground">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Stats band (value + label row) ---------- */

export type StatItem = { value: string; label: string }

export function StatsBand({ items }: { items: StatItem[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.14_0.02_230)] p-8 text-white shadow-2xl sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
        }}
      />
      <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-40 mask-radial-fade" />
      <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="border-l border-white/15 pl-5 first:border-l-0 first:pl-0 lg:pl-5">
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{item.value}</p>
            <p className="mt-2 text-[13px] leading-snug text-white/70">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

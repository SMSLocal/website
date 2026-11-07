import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FaqJsonLd } from "@/components/seo/json-ld"

/**
 * Plain, flat building blocks shared by the redesigned product pages:
 * a native-accordion FAQ and a flat closing band.
 */

type Cta = { label: string; href: string }

export function PlainFaq({ items, path, title = "Questions we hear often" }: { items: { q: string; a: string }[]; path: string; title?: string }) {
  return (
    <section className="bg-stone-50 py-16 lg:py-24">
      <FaqJsonLd items={items} path={path} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]">{title}</h2>
        <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
          {items.map((f, i) => (
            <details key={f.q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-2xl font-normal leading-none text-slate-400 group-open:hidden">+</span>
                <span aria-hidden className="hidden text-2xl font-normal leading-none text-slate-400 group-open:inline">&minus;</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PlainCta({ title, text, primary, secondary }: { title: string; text: string; primary: Cta; secondary: Cta }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:py-16">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-primary-foreground/85">{text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={primary.href} className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold text-slate-900 transition hover:bg-stone-100">
            {primary.label} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={secondary.href} className="text-[15px] font-semibold underline decoration-white/50 underline-offset-4 transition hover:decoration-white">
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

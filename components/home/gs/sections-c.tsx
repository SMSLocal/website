import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { ALL_POSTS } from "@/lib/blog"
import { Reveal } from "@/components/landing/reveal"

/* ───────── resources: three real posts + a link row ───────── */
export function ResourcesRow() {
  const posts = ALL_POSTS.filter((p) => p.meta.coverImage && /\.webp$/.test(p.meta.coverImage)).slice(0, 3)
  const [feat, ...rest] = posts
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">Resources</span>
            <h2 className="mt-2 max-w-xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">Join the customer engagement conversation</h2>
          </div>
          <Link href="/blog/" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[14px] font-semibold transition hover:border-primary/40">View all resources <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        {feat && (
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
            <Reveal>
              <Link href={`/blog/${feat.meta.slug}/`} className="group relative block min-h-[420px] overflow-hidden rounded-[2rem] shadow-lg lg:h-full">
                <Image src={feat.meta.coverImage as string} alt={feat.meta.coverAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <span className="rounded-full bg-primary px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-primary-foreground">Featured · {feat.meta.category}</span>
                  <h3 className="mt-3 text-balance text-2xl font-bold leading-snug sm:text-3xl">{feat.meta.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-emerald-300">Read the guide <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            </Reveal>
            <div className="flex flex-col gap-5">
              {rest.map((p, i) => (
                <Reveal key={p.meta.slug} delay={(i + 1) * 80} className="flex-1">
                  <Link href={`/blog/${p.meta.slug}/`} className="group flex h-full gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-40">
                      <Image src={p.meta.coverImage as string} alt={p.meta.coverAlt} fill sizes="160px" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <span className="text-[11.5px] font-semibold uppercase tracking-wider text-primary">{p.meta.category}</span>
                      <h3 className="mt-1.5 text-[16.5px] font-bold leading-snug text-foreground">{p.meta.title}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold text-primary">Find out more <ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ───────── closing banner ───────── */
export function GsFinalCta() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[oklch(0.16_0.04_245)] px-6 py-16 text-center text-white sm:px-12 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(40% 70% at 10% 0%, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%), radial-gradient(40% 70% at 95% 100%, color-mix(in oklch, var(--accent) 40%, transparent), transparent 70%)" }} />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[38px]">Ready to start a conversation?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">See how SMSLocal can help you reach customers, answer them in their language and grow.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">Start your trial <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/company/contact/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[15px] font-semibold transition hover:bg-white/10">Let&apos;s talk</Link>
              <a href="tel:+919930736339" className="inline-flex items-center gap-2 px-3 py-3 text-[14.5px] font-medium text-white/80 hover:text-white"><Phone className="h-4 w-4" /> +91 99307 36339</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

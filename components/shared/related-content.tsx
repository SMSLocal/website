import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getRelatedContent } from "@/lib/related-content"
import { Section, SectionHeader } from "@/components/product/product-page"

export function RelatedContent({ path }: { path: string }) {
  const data = getRelatedContent(path)
  if (!data) return null

  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow={data.eyebrow ?? "Related reading"}
        title={data.title ?? "Keep exploring."}
        subtitle={data.subtitle}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {data.groups.map((group) => (
          <div
            key={group.title}
            className="flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm"
          >
            <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group/link relative flex items-start gap-3 rounded-xl border border-transparent px-3 py-3 transition hover:border-primary/20 hover:bg-primary/[0.04]"
                  >
                    <div className="flex-1">
                      <p className="flex items-center gap-1.5 text-[14px] font-semibold tracking-tight text-foreground">
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                        {link.blurb}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

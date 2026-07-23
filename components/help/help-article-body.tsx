import { AlertCircle, Info, Lightbulb } from "lucide-react"
import type { HelpBlock } from "@/lib/help-center"

const TONE_STYLES = {
  info: {
    wrap: "border-sky-500/25 bg-sky-500/5 text-sky-900 dark:text-sky-100",
    icon: "text-sky-600",
    Icon: Info,
  },
  warn: {
    wrap: "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-100",
    icon: "text-amber-600",
    Icon: AlertCircle,
  },
  tip: {
    wrap: "border-primary/25 bg-primary/5 text-foreground",
    icon: "text-primary",
    Icon: Lightbulb,
  },
} as const

export function HelpArticleBody({ blocks }: { blocks: HelpBlock[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-[1.75] text-foreground/85">
      {blocks.map((b, i) => {
        if (b.t === "p") {
          return (
            <p key={i} className="text-pretty">
              {b.c}
            </p>
          )
        }
        if (b.t === "h") {
          return (
            <h2
              key={i}
              className="pt-4 text-xl font-semibold tracking-tight text-foreground sm:text-[22px]"
            >
              {b.c}
            </h2>
          )
        }
        if (b.t === "list") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 marker:text-primary">
              {b.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        }
        if (b.t === "steps") {
          return (
            <ol key={i} className="space-y-3">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ol>
          )
        }
        if (b.t === "callout") {
          const tone = TONE_STYLES[b.tone]
          const Icon = tone.Icon
          return (
            <aside
              key={i}
              className={`rounded-2xl border px-4 py-4 ${tone.wrap}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-4 w-4 flex-none ${tone.icon}`} aria-hidden />
                <div className="text-sm leading-relaxed">
                  <div className="font-semibold text-foreground">{b.title}</div>
                  <p className="mt-1 text-foreground/75">{b.body}</p>
                </div>
              </div>
            </aside>
          )
        }
        if (b.t === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-2xl border border-foreground/10 bg-[#041715] p-4 text-[13px] leading-relaxed text-white"
            >
              <code className="font-mono">{b.code}</code>
            </pre>
          )
        }
        if (b.t === "table") {
          return (
            <figure key={i} className="my-2">
              <div className="overflow-x-auto rounded-2xl border border-foreground/10">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      {b.headers.map((h, j) => (
                        <th
                          key={j}
                          className="whitespace-nowrap border-b border-foreground/10 px-3 py-2.5 font-semibold text-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="odd:bg-background even:bg-muted/20">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border-b border-foreground/5 px-3 py-2.5 align-top text-foreground/80"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {b.caption && (
                <figcaption className="mt-2 text-xs text-muted-foreground">{b.caption}</figcaption>
              )}
            </figure>
          )
        }
        return null
      })}
    </div>
  )
}

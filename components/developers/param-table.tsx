import type { ReactNode } from "react"

export type ParamRow = {
  name: string
  type: string
  required?: boolean
  description: ReactNode
  example?: string
}

export function ParamTable({ rows }: { rows: ParamRow[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border">
      <table className="w-full border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="w-[180px] px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Parameter
            </th>
            <th className="w-[130px] px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3.5 align-top">
                <div className="flex flex-col gap-1">
                  <code className="font-mono text-[13px] font-semibold text-foreground">
                    {row.name}
                  </code>
                  {row.required ? (
                    <span className="inline-flex w-fit items-center rounded-sm bg-primary/10 px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wider text-primary">
                      Required
                    </span>
                  ) : (
                    <span className="inline-flex w-fit items-center rounded-sm bg-muted px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Optional
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3.5 align-top">
                <code className="font-mono text-[12.5px] text-muted-foreground">{row.type}</code>
              </td>
              <td className="px-4 py-3.5 align-top text-[13.5px] leading-relaxed text-muted-foreground">
                <div>{row.description}</div>
                {row.example ? (
                  <div className="mt-1.5">
                    <span className="text-[11.5px] uppercase tracking-wider text-muted-foreground/70">
                      Example:{" "}
                    </span>
                    <code className="font-mono text-[12.5px] text-foreground">{row.example}</code>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

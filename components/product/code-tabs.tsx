"use client"

import { useState } from "react"

export type CodeSample = {
  label: string
  lang?: string
  language?: string
  code: string
}

export function CodeTabs({
  samples,
  tabs,
}: {
  samples?: CodeSample[]
  tabs?: CodeSample[]
}) {
  const items = samples ?? tabs ?? []
  const [active, setActive] = useState(0)
  const current = items[active]
  const currentLang = current?.lang ?? current?.language ?? ""

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.02_230)]/95 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-3 py-2">
        <div className="flex items-center gap-1">
          {items.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition ${
                active === i
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/85"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-white/40">{currentLang}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-white/85">
        <code>{current?.code ?? ""}</code>
      </pre>
    </div>
  )
}

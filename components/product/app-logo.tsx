"use client"

import { useState } from "react"

const COLORS = [
  "bg-primary/15 text-primary",
  "bg-sky-500/15 text-sky-600",
  "bg-violet-500/15 text-violet-600",
  "bg-amber-500/15 text-amber-600",
  "bg-rose-500/15 text-rose-600",
  "bg-emerald-500/15 text-emerald-600",
  "bg-orange-500/15 text-orange-600",
  "bg-indigo-500/15 text-indigo-600",
]

function colorFor(name: string) {
  let n = 0
  for (let i = 0; i < name.length; i++) n += name.charCodeAt(i)
  return COLORS[n % COLORS.length]
}

export function AppLogo({ name, url, logoUrl }: { name: string; url: string; logoUrl?: string }) {
  const hostname = (() => {
    try { return new URL(url).hostname.replace(/^www\./, "") } catch { return "" }
  })()

  const sources = [
    ...(logoUrl ? [logoUrl] : []),
    ...(hostname ? [
      `https://logo.clearbit.com/${hostname}`,
      `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=256`,
    ] : []),
  ]

  const [idx, setIdx] = useState(0)

  if (idx >= sources.length || !hostname) {
    return (
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[18px] font-black ${colorFor(name)}`}>
        {name.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={sources[idx]}
        src={sources[idx]}
        alt={name}
        width={48}
        height={48}
        className="h-10 w-10 object-contain"
        onError={() => setIdx((i) => i + 1)}
      />
    </div>
  )
}

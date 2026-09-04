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

/**
 * Google's favicon service. Returns a 256px icon for any hostname and
 * synthesises a placeholder when the site has no usable icon, so it always
 * answers 200 — unlike hotlinking https://<host>/favicon.ico directly, which
 * 404s or 403s for roughly a quarter of the apps we list (audited 2026-09-04)
 * and got flagged as broken images by Ahrefs.
 *
 * This URL is what ends up in the server-rendered HTML, so it is the one
 * crawlers resolve. The onError chain below only ever runs in a real browser;
 * a crawler never sees it, which is why the FIRST source has to be the
 * reliable one.
 */
function faviconFor(hostname: string) {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=256`
}

export function AppLogo({ name, url, logoUrl }: { name: string; url: string; logoUrl?: string }) {
  // Keep the hostname exactly as written. Stripping "www." breaks Brevo:
  // faviconV2 answers 200 for www.brevo.com and 404 for brevo.com. Where both
  // resolve (microsoft.com) they return the same icon, so the bare host is
  // only worth trying as a second chance.
  const hostname = (() => {
    try { return new URL(url).hostname } catch { return "" }
  })()
  const bareHostname = hostname.replace(/^www\./, "")

  // logoUrl is a curated override for the handful of brands whose real logo
  // beats their favicon. Every value in data.ts is verified to return 200 —
  // do not add a bare https://<host>/favicon.ico here, that is the exact
  // pattern this component exists to avoid.
  const sources = [
    ...(logoUrl ? [logoUrl] : []),
    ...(hostname ? [faviconFor(hostname)] : []),
    ...(bareHostname && bareHostname !== hostname ? [faviconFor(bareHostname)] : []),
  ]

  const [idx, setIdx] = useState(0)

  if (idx >= sources.length) {
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
        loading="lazy"
        className="h-10 w-10 object-contain"
        onError={() => setIdx((i) => i + 1)}
      />
    </div>
  )
}

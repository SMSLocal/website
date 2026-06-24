"use client"

import { useEffect, useState } from "react"

const WORDS = ["SMS", "WhatsApp", "AI"] as const

/**
 * Cycles the highlighted word in the hero headline: SMS -> WhatsApp -> AI.
 * Reserves the width of the longest word so the line doesn't reflow.
 */
export function RotatingWord() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-flex align-baseline">
      {/* invisible spacer = widest word, keeps layout steady */}
      <span aria-hidden className="invisible">
        WhatsApp
      </span>
      <span
        key={i}
        style={{ animation: "message-in 0.5s cubic-bezier(0.2,0.8,0.2,1) both" }}
        className="absolute inset-0 bg-gradient-to-r from-primary via-[oklch(0.66_0.14_178)] to-accent bg-clip-text text-transparent"
      >
        {WORDS[i]}
      </span>
    </span>
  )
}

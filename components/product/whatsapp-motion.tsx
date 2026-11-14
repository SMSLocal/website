"use client"

import { useEffect } from "react"

// Scroll-reveal for every section below the hero. Elements are tagged by script after hydration, so with no JS or
// with prefers-reduced-motion the page simply renders as normal.

const CSS = `
.wx-pre { opacity: 0; transform: translateY(22px) scale(.985) }
.wx-t { transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1) }
`

const SELECTOR = ":scope > div > *, article, ol > li, ul > li, dl > div, details"

export function WhatsAppMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const main = document.querySelector("main")
    if (!main) return

    const sections = Array.from(main.children).slice(1) as HTMLElement[]
    const seen = new Set<HTMLElement>()
    const targets: HTMLElement[] = []
    const vh = window.innerHeight

    for (const sec of sections) {
      sec.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.closest("svg") || el.closest("[data-no-reveal]")) return
        seen.add(el)
        const parent = el.parentElement
        const idx = parent ? Array.from(parent.children).indexOf(el) : 0
        el.style.transitionDelay = `${Math.min(idx, 5) * 90}ms`
        targets.push(el)
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          el.classList.remove("wx-pre")
          io.unobserve(el)
          window.setTimeout(() => { el.classList.remove("wx-t"); el.style.transitionDelay = "" }, 1400)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )

    for (const el of targets) {
      if (el.getBoundingClientRect().top < vh) continue
      el.classList.add("wx-pre", "wx-t")
      io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  return <style>{CSS}</style>
}

import type { ReactNode } from "react"

/* Neutral, obviously-placeholder SVG wordmarks.
   Per content rules, real customer logos are added only with written permission.
   Each mark below is a distinct typographic lockup so the row reads as polished
   rather than wireframe, but no real brand names are implied. */

function AcmeRetail() {
  return (
    <svg viewBox="0 0 120 24" className="h-5 w-auto" aria-label="Placeholder customer logo">
      <g fill="currentColor">
        <circle cx="8" cy="12" r="6" opacity="0.6" />
        <circle cx="14" cy="12" r="6" opacity="0.6" />
        <text x="26" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="13" fontWeight="700" letterSpacing="0.5">
          acme.retail
        </text>
      </g>
    </svg>
  )
}

function Northwind() {
  return (
    <svg viewBox="0 0 120 24" className="h-5 w-auto" aria-label="Placeholder customer logo">
      <g fill="currentColor">
        <path d="M2 20V4l8 10V4l8 10V4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="24" y="16" fontFamily="ui-serif, Georgia, serif" fontSize="13.5" fontWeight="600" letterSpacing="0.2">
          Northwind
        </text>
      </g>
    </svg>
  )
}

function Globex() {
  return (
    <svg viewBox="0 0 110 24" className="h-5 w-auto" aria-label="Placeholder customer logo">
      <g fill="currentColor">
        <rect x="2" y="6" width="12" height="12" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="12" r="2" />
        <text x="20" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="800" letterSpacing="-0.2">
          GLOBEX
        </text>
      </g>
    </svg>
  )
}

function HelixLabs() {
  return (
    <svg viewBox="0 0 120 24" className="h-5 w-auto" aria-label="Placeholder customer logo">
      <g fill="currentColor">
        <path
          d="M3 6c3 0 3 12 6 12s3-12 6-12"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <text x="22" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="13" fontWeight="500" letterSpacing="1">
          HELIX
          <tspan fontWeight="700" letterSpacing="0"> labs</tspan>
        </text>
      </g>
    </svg>
  )
}

function KitePay() {
  return (
    <svg viewBox="0 0 110 24" className="h-5 w-auto" aria-label="Placeholder customer logo">
      <g fill="currentColor">
        <path d="M3 3l10 9-10 9V3z" opacity="0.85" />
        <text x="18" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="13.5" fontWeight="700">
          kite
          <tspan fontWeight="300">pay</tspan>
        </text>
      </g>
    </svg>
  )
}

function OrbitLogistics() {
  return (
    <svg viewBox="0 0 140 24" className="h-5 w-auto" aria-label="Placeholder customer logo">
      <g fill="currentColor">
        <circle cx="8" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8" cy="12" r="2" />
        <text x="20" y="16" fontFamily="ui-sans-serif, system-ui" fontSize="12.5" fontWeight="700" letterSpacing="0.3">
          ORBIT
          <tspan fontWeight="400"> logistics</tspan>
        </text>
      </g>
    </svg>
  )
}

const PLACEHOLDERS: { name: string; svg: ReactNode }[] = [
  { name: "acme.retail", svg: <AcmeRetail /> },
  { name: "Northwind", svg: <Northwind /> },
  { name: "GLOBEX", svg: <Globex /> },
  { name: "HELIX labs", svg: <HelixLabs /> },
  { name: "kitepay", svg: <KitePay /> },
  { name: "ORBIT logistics", svg: <OrbitLogistics /> },
]

export function LogoRow() {
  return (
    <section className="border-b border-border bg-background py-12" aria-label="Customer logos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by businesses across India
        </p>
        <div className="mt-7 grid grid-cols-2 items-center gap-x-10 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
          {PLACEHOLDERS.map((p) => (
            <div
              key={p.name}
              className="flex h-8 items-center justify-center text-muted-foreground/55 opacity-90 transition hover:text-muted-foreground/80 hover:opacity-100"
            >
              {p.svg}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground/50">
          [Placeholder logos · replace with real customers after written permission]
        </p>
      </div>
    </section>
  )
}

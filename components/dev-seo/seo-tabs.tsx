"use client"

import { useState } from "react"
import { SeoDashboard } from "./seo-dashboard"
import { TechnicalDashboard } from "./technical-dashboard"
import type { SeoAudit } from "@/lib/seo/audit"
import type { TechnicalAudit } from "@/lib/seo/technical-audit"

type Tab = "metadata" | "technical"

export function SeoTabs({
  metadata,
  technical,
}: {
  metadata: SeoAudit[]
  technical: TechnicalAudit
}) {
  const [active, setActive] = useState<Tab>("metadata")

  const tabs: { key: Tab; label: string; count: number }[] = [
    {
      key: "metadata",
      label: "Metadata",
      count: metadata.filter((a) =>
        a.issues.some((i) => i.level === "error" || i.level === "warning"),
      ).length,
    },
    {
      key: "technical",
      label: "Technical",
      count: technical.issues.filter((i) => i.level === "error").length,
    },
  ]

  return (
    <>
      <nav className="mb-6 flex gap-2 border-b border-border">
        {tabs.map((t) => {
          const isActive = active === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`relative rounded-t-lg px-4 py-2.5 text-[14px] font-medium transition ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {t.count > 0 ? (
                <span
                  className={`ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.count}
                </span>
              ) : null}
              {isActive ? (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              ) : null}
            </button>
          )
        })}
      </nav>

      {active === "metadata" ? (
        <SeoDashboard audits={metadata} />
      ) : (
        <TechnicalDashboard result={technical} />
      )}
    </>
  )
}

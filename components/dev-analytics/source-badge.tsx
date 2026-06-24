import {
  Globe,
  Link2,
  Mail,
  MousePointerClick,
  Search,
  Share2,
} from "lucide-react"
import type { SourceKind } from "@/lib/analytics/types"

/**
 * Tiny label + icon that classifies a traffic source at a glance.
 * Used in source breakdowns, conversions, and journey views.
 */
export function SourceBadge({
  kind,
  name,
  className = "",
}: {
  kind: SourceKind
  name?: string
  className?: string
}) {
  const Icon =
    kind === "organic_search"
      ? Search
      : kind === "paid_search"
        ? MousePointerClick
        : kind === "paid_social" || kind === "social"
          ? Share2
          : kind === "email"
            ? Mail
            : kind === "referral"
              ? Link2
              : Globe

  const label = prettyLabel(kind)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11.5px] font-medium text-foreground ${className}`}
    >
      <Icon className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
      <span>{label}</span>
      {name && name !== "direct" && name !== "self" ? (
        <>
          <span className="text-muted-foreground">·</span>
          <span className="truncate">{name}</span>
        </>
      ) : null}
    </span>
  )
}

function prettyLabel(kind: SourceKind): string {
  switch (kind) {
    case "organic_search":
      return "Organic"
    case "paid_search":
      return "Paid search"
    case "paid_social":
      return "Paid social"
    case "social":
      return "Social"
    case "email":
      return "Email"
    case "referral":
      return "Referral"
    case "internal":
      return "Internal"
    case "direct":
      return "Direct"
    case "unknown":
      return "Unknown"
  }
}

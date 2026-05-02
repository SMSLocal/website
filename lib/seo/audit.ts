import { SEO_REGISTRY, type SeoEntry } from "./registry"

/**
 * Length thresholds used by the /dev/seo dashboard to flag entries as OK,
 * warning, or error. These are informational — nothing hard-fails.
 */
export const SEO_LIMITS = {
  title: { min: 30, ideal: 50, max: 60 },
  description: { min: 120, ideal: 150, max: 160 },
  keywords: { min: 3, max: 10 },
} as const

export type SeoIssueLevel = "ok" | "warning" | "error"

export type SeoIssue = {
  field: "title" | "description" | "keywords" | "duplicate"
  level: SeoIssueLevel
  message: string
}

export type SeoAudit = {
  path: string
  entry: SeoEntry
  issues: SeoIssue[]
  worstLevel: SeoIssueLevel
  titleLength: number
  descriptionLength: number
  keywordCount: number
}

function worstOf(a: SeoIssueLevel, b: SeoIssueLevel): SeoIssueLevel {
  if (a === "error" || b === "error") return "error"
  if (a === "warning" || b === "warning") return "warning"
  return "ok"
}

/**
 * Check a single registry entry against the length/keyword thresholds.
 * Returns an ordered list of issues (highest severity first).
 */
export function auditSeoEntry(path: string, entry: SeoEntry): SeoAudit {
  const issues: SeoIssue[] = []

  const title = entry.titleAbsolute ?? entry.title ?? ""
  const titleLength = title.length
  const descriptionLength = entry.description.length
  const keywordCount = entry.keywords?.length ?? 0

  // Title checks
  if (!title) {
    issues.push({
      field: "title",
      level: "error",
      message: "Missing title.",
    })
  } else if (titleLength > SEO_LIMITS.title.max) {
    issues.push({
      field: "title",
      level: "warning",
      message: `Title is ${titleLength} chars. Google truncates beyond ${SEO_LIMITS.title.max}.`,
    })
  } else if (titleLength < SEO_LIMITS.title.min) {
    issues.push({
      field: "title",
      level: "warning",
      message: `Title is only ${titleLength} chars. Aim for ${SEO_LIMITS.title.min}–${SEO_LIMITS.title.max}.`,
    })
  }

  // Description checks
  if (!entry.description) {
    issues.push({
      field: "description",
      level: "error",
      message: "Missing description.",
    })
  } else if (descriptionLength > SEO_LIMITS.description.max) {
    issues.push({
      field: "description",
      level: "warning",
      message: `Description is ${descriptionLength} chars. Google truncates beyond ${SEO_LIMITS.description.max}.`,
    })
  } else if (descriptionLength < SEO_LIMITS.description.min) {
    issues.push({
      field: "description",
      level: "warning",
      message: `Description is only ${descriptionLength} chars. Aim for ${SEO_LIMITS.description.min}–${SEO_LIMITS.description.max}.`,
    })
  }

  // Keyword checks — skip for noindex routes
  if (!entry.noindex) {
    if (keywordCount === 0) {
      issues.push({
        field: "keywords",
        level: "warning",
        message: "No page-specific keywords.",
      })
    } else if (keywordCount < SEO_LIMITS.keywords.min) {
      issues.push({
        field: "keywords",
        level: "warning",
        message: `Only ${keywordCount} keyword${keywordCount === 1 ? "" : "s"}. Aim for ${SEO_LIMITS.keywords.min}–${SEO_LIMITS.keywords.max}.`,
      })
    } else if (keywordCount > SEO_LIMITS.keywords.max) {
      issues.push({
        field: "keywords",
        level: "warning",
        message: `${keywordCount} keywords may be too many. Consider trimming to ${SEO_LIMITS.keywords.max}.`,
      })
    }
  }

  const worstLevel = issues.reduce<SeoIssueLevel>(
    (acc, issue) => worstOf(acc, issue.level),
    "ok",
  )

  return {
    path,
    entry,
    issues,
    worstLevel,
    titleLength,
    descriptionLength,
    keywordCount,
  }
}

/**
 * Audit every entry in the registry and tag duplicate titles/descriptions.
 * Sorted so errors come first, then warnings, then OK — alphabetical within
 * each bucket.
 */
export function auditRegistry(): SeoAudit[] {
  const audits = Object.entries(SEO_REGISTRY).map(([path, entry]) =>
    auditSeoEntry(path, entry),
  )

  // Flag duplicate titles / descriptions across the site
  const titleCounts = new Map<string, string[]>()
  const descCounts = new Map<string, string[]>()
  for (const audit of audits) {
    const t = audit.entry.titleAbsolute ?? audit.entry.title ?? ""
    if (t) {
      if (!titleCounts.has(t)) titleCounts.set(t, [])
      titleCounts.get(t)!.push(audit.path)
    }
    const d = audit.entry.description
    if (d) {
      if (!descCounts.has(d)) descCounts.set(d, [])
      descCounts.get(d)!.push(audit.path)
    }
  }
  for (const audit of audits) {
    const t = audit.entry.titleAbsolute ?? audit.entry.title ?? ""
    const titlePaths = titleCounts.get(t) ?? []
    if (titlePaths.length > 1) {
      audit.issues.push({
        field: "duplicate",
        level: "warning",
        message: `Title also used on: ${titlePaths.filter((p) => p !== audit.path).join(", ")}`,
      })
      audit.worstLevel = worstOf(audit.worstLevel, "warning")
    }
    const descPaths = descCounts.get(audit.entry.description) ?? []
    if (descPaths.length > 1) {
      audit.issues.push({
        field: "duplicate",
        level: "warning",
        message: `Description also used on: ${descPaths.filter((p) => p !== audit.path).join(", ")}`,
      })
      audit.worstLevel = worstOf(audit.worstLevel, "warning")
    }
  }

  const levelRank: Record<SeoIssueLevel, number> = {
    error: 0,
    warning: 1,
    ok: 2,
  }
  audits.sort((a, b) => {
    const r = levelRank[a.worstLevel] - levelRank[b.worstLevel]
    if (r !== 0) return r
    return a.path.localeCompare(b.path)
  })

  return audits
}

/** Summary counts for the dashboard header. */
export function summariseAudits(audits: SeoAudit[]) {
  let ok = 0
  let warning = 0
  let error = 0
  for (const a of audits) {
    if (a.worstLevel === "error") error++
    else if (a.worstLevel === "warning") warning++
    else ok++
  }
  return { total: audits.length, ok, warning, error }
}

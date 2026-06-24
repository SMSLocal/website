/**
 * Rank Math-style on-page SEO analysis.
 *
 * This implements the core tests Rank Math (the WordPress plugin) runs on
 * every page against a "focus keyword". Each test returns a pass/fail with
 * a short human-readable message; the total score out of 100 is the sum of
 * weights for the tests that pass.
 *
 * The scoring weights roughly mirror Rank Math's defaults so the resulting
 * score is recognisable to anyone who has used that plugin. Not every
 * Rank Math test has a content-access analogue here — we only run the ones
 * we can evaluate from the metadata we have at hand (title, description,
 * keywords, URL path).
 */

export type RankMathCheckId =
  | "focus-in-title"
  | "focus-in-title-start"
  | "focus-in-description"
  | "focus-in-url"
  | "focus-in-keywords"
  | "title-length"
  | "description-length"
  | "has-keywords"
  | "keyword-count"
  | "url-length"
  | "description-starts-focus"
  | "sentiment"
  | "power-word"
  | "number-in-title"

export type RankMathCheck = {
  id: RankMathCheckId
  label: string
  pass: boolean
  weight: number
  message: string
  category: "basic" | "title-readability" | "content" | "advanced"
}

export type RankMathReport = {
  focusKeyword: string
  score: number
  grade: "excellent" | "good" | "needs-improvement" | "poor"
  checks: RankMathCheck[]
  passedCount: number
  totalCount: number
}

const POWER_WORDS = [
  "best",
  "free",
  "guide",
  "proven",
  "ultimate",
  "complete",
  "simple",
  "fast",
  "instant",
  "new",
  "powerful",
  "trusted",
  "official",
  "verified",
  "expert",
]

const POSITIVE_SENTIMENT = [
  "best",
  "great",
  "top",
  "amazing",
  "powerful",
  "proven",
  "effective",
  "trusted",
]
const NEGATIVE_SENTIMENT = ["worst", "bad", "terrible", "useless", "slow"]

function grade(score: number): RankMathReport["grade"] {
  if (score >= 81) return "excellent"
  if (score >= 61) return "good"
  if (score >= 41) return "needs-improvement"
  return "poor"
}

function includesCI(haystack: string, needle: string): boolean {
  if (!needle) return false
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

function startsWithCI(haystack: string, needle: string): boolean {
  if (!needle) return false
  return haystack.toLowerCase().trim().startsWith(needle.toLowerCase())
}

export type RankMathInput = {
  title: string
  description: string
  keywords: string[]
  path: string
  focusKeyword: string
}

export function analyzeSeo(input: RankMathInput): RankMathReport {
  const { title, description, keywords, path, focusKeyword } = input
  const fk = focusKeyword.trim()
  const checks: RankMathCheck[] = []

  const push = (c: Omit<RankMathCheck, "weight"> & { weight?: number }) => {
    checks.push({ weight: c.weight ?? 5, ...c } as RankMathCheck)
  }

  // ── Basic SEO ──────────────────────────────────────────────────────────
  push({
    id: "focus-in-title",
    label: "Focus keyword in SEO title",
    category: "basic",
    weight: 10,
    pass: includesCI(title, fk),
    message: includesCI(title, fk)
      ? "Focus keyword appears in the SEO title."
      : "Add the focus keyword to your SEO title.",
  })
  push({
    id: "focus-in-description",
    label: "Focus keyword in meta description",
    category: "basic",
    weight: 8,
    pass: includesCI(description, fk),
    message: includesCI(description, fk)
      ? "Focus keyword appears in the meta description."
      : "Use the focus keyword in the meta description.",
  })
  push({
    id: "focus-in-url",
    label: "Focus keyword in URL",
    category: "basic",
    weight: 8,
    pass: includesCI(path.replace(/[-_/]/g, " "), fk),
    message: includesCI(path.replace(/[-_/]/g, " "), fk)
      ? "Focus keyword is in the URL slug."
      : "Add the focus keyword to the URL slug if possible.",
  })
  push({
    id: "focus-in-keywords",
    label: "Focus keyword in meta keywords",
    category: "basic",
    weight: 5,
    pass: keywords.some((k) => includesCI(k, fk)),
    message: keywords.some((k) => includesCI(k, fk))
      ? "Focus keyword is covered by meta keywords."
      : "Include the focus keyword in your meta keywords.",
  })

  // ── Title readability ─────────────────────────────────────────────────
  push({
    id: "focus-in-title-start",
    label: "Focus keyword at the start of title",
    category: "title-readability",
    weight: 6,
    pass: startsWithCI(title, fk),
    message: startsWithCI(title, fk)
      ? "Focus keyword is near the start of the title."
      : "Move the focus keyword closer to the start of the title.",
  })
  push({
    id: "title-length",
    label: "Title is 30–60 characters",
    category: "title-readability",
    weight: 8,
    pass: title.length >= 30 && title.length <= 60,
    message:
      title.length >= 30 && title.length <= 60
        ? `Title length is ${title.length} — well within the sweet spot.`
        : `Title is ${title.length} characters. Aim for 30–60.`,
  })
  push({
    id: "number-in-title",
    label: "Number in the title",
    category: "title-readability",
    weight: 3,
    pass: /\d/.test(title),
    message: /\d/.test(title)
      ? "Title includes a number — good for CTR."
      : "Consider adding a number to the title (e.g. '7 Ways…').",
  })
  push({
    id: "power-word",
    label: "Power word in the title",
    category: "title-readability",
    weight: 3,
    pass: POWER_WORDS.some((w) => includesCI(title, w)),
    message: POWER_WORDS.some((w) => includesCI(title, w))
      ? "Title uses a power word."
      : "Add a power word like 'Best', 'Ultimate', or 'Guide' to the title.",
  })
  push({
    id: "sentiment",
    label: "Sentiment of the title",
    category: "title-readability",
    weight: 3,
    pass:
      POSITIVE_SENTIMENT.some((w) => includesCI(title, w)) &&
      !NEGATIVE_SENTIMENT.some((w) => includesCI(title, w)),
    message: POSITIVE_SENTIMENT.some((w) => includesCI(title, w))
      ? "Title has positive sentiment."
      : "Try to use a more positive, emotive word in the title.",
  })

  // ── Content ───────────────────────────────────────────────────────────
  push({
    id: "description-length",
    label: "Meta description is 120–160 characters",
    category: "content",
    weight: 8,
    pass: description.length >= 120 && description.length <= 160,
    message:
      description.length >= 120 && description.length <= 160
        ? `Description length is ${description.length} — perfect.`
        : `Description is ${description.length} characters. Aim for 120–160.`,
  })
  push({
    id: "description-starts-focus",
    label: "Description starts with focus keyword",
    category: "content",
    weight: 4,
    pass: startsWithCI(description, fk),
    message: startsWithCI(description, fk)
      ? "Description starts with the focus keyword."
      : "Start the description with the focus keyword.",
  })

  // ── Advanced ──────────────────────────────────────────────────────────
  push({
    id: "has-keywords",
    label: "Has meta keywords defined",
    category: "advanced",
    weight: 3,
    pass: keywords.length >= 3,
    message:
      keywords.length >= 3
        ? `${keywords.length} meta keywords defined.`
        : "Define at least 3 meta keywords.",
  })
  push({
    id: "keyword-count",
    label: "Between 3 and 10 keywords",
    category: "advanced",
    weight: 3,
    pass: keywords.length >= 3 && keywords.length <= 10,
    message:
      keywords.length >= 3 && keywords.length <= 10
        ? "Keyword count is in the sweet spot."
        : keywords.length > 10
          ? "Too many keywords — trim to 10 or fewer."
          : "Too few keywords — add more.",
  })
  push({
    id: "url-length",
    label: "URL is reasonably short",
    category: "advanced",
    weight: 3,
    pass: path.length <= 75,
    message:
      path.length <= 75
        ? `URL length is ${path.length} characters.`
        : `URL is ${path.length} characters — consider shortening.`,
  })

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0)
  const gotWeight = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0)
  const scoreRaw = totalWeight === 0 ? 0 : (gotWeight / totalWeight) * 100
  const score = Math.round(scoreRaw)
  const passedCount = checks.filter((c) => c.pass).length

  // If no focus keyword is given, return a zero-score report that explains why.
  if (!fk) {
    return {
      focusKeyword: "",
      score: 0,
      grade: "poor",
      checks: checks.map((c) => ({
        ...c,
        pass: false,
        message:
          c.id.startsWith("focus-") || c.id === "description-starts-focus"
            ? "Set a focus keyword to evaluate this."
            : c.message,
      })),
      passedCount: 0,
      totalCount: checks.length,
    }
  }

  return {
    focusKeyword: fk,
    score,
    grade: grade(score),
    checks,
    passedCount,
    totalCount: checks.length,
  }
}

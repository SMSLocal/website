import Link from "next/link"

export function BrandLogo({
  href = "/",
  size = "md",
  tone = "light",
}: {
  href?: string | false
  size?: "sm" | "md" | "lg"
  tone?: "light" | "dark"
}) {
  const height = size === "sm" ? 20 : size === "lg" ? 30 : 24
  // tone "dark"  → dark text on a light surface → full-colour lockup
  // tone "light" → white text on a dark surface  → white lockup
  const src = tone === "dark" ? "/smslocal-logo.svg" : "/smslocal-logo-white.svg"

  const inner = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="SMSLocal"
      style={{ height, width: "auto" }}
      className="block w-auto select-none"
      draggable={false}
      // High-priority fetch so the logo (LCP candidate on most pages) is
      // requested immediately rather than after script/CSS parsing.
      fetchPriority="high"
    />
  )

  if (href === false) return inner
  return (
    <Link href={href} className="inline-flex items-center" aria-label="SMSLocal home">
      {inner}
    </Link>
  )
}

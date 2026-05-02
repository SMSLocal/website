import Link from "next/link"
import { BrandMark } from "@/components/brand/brand-mark"

export function BrandLogo({
  href = "/",
  size = "md",
  tone = "light",
}: {
  href?: string | false
  size?: "sm" | "md" | "lg"
  tone?: "light" | "dark"
}) {
  const markSize = size === "sm" ? 18 : size === "lg" ? 26 : 22
  const textSize = size === "sm" ? "text-[13.5px]" : size === "lg" ? "text-[17px]" : "text-[15px]"
  const textColor = tone === "dark" ? "text-foreground" : "text-white"

  const inner = (
    <span className="inline-flex items-center gap-2">
      <BrandMark size={markSize} />
      <span className={`font-semibold tracking-tight ${textSize} ${textColor}`}>
        SMSLocal
      </span>
    </span>
  )

  if (href === false) return inner
  return (
    <Link href={href} className="inline-flex items-center gap-2" aria-label="SMSLocal home">
      {inner}
    </Link>
  )
}

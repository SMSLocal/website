/**
 * RCS pricing — SMSLocal
 *
 * Positioning: exactly 1% below MSG91's published India rate card.
 * MSG91 is the transparent price leader in the Indian RCS market
 * (see https://msg91.com/in/pricing/rcs, fetched 2026-04-23).
 *
 * We match the wallet plan structure (₹2k / ₹5k / ₹10k top-ups, no
 * separate platform fee — the plan amount IS the wallet credit) and
 * undercut the per-message rate by 1% so the same recharge delivers
 * more messages.
 *
 * All rates are exclusive of 18% GST, per Indian tax law.
 */

export type RcsRate = {
  /** Indian A2P rate, paise per message (pre-GST). */
  basicTextPaise: number
  /** Indian rich-card rate, paise per message (pre-GST). */
  richCardPaise: number
  /** International basic text, paise per message (pre-GST). */
  intlBasicTextPaise: number
  /** International rich card, paise per message (pre-GST). */
  intlRichCardPaise: number
}

/** SMSLocal published RCS rate. Set exactly 1% below MSG91. */
export const SMSLOCAL_RCS_RATE: RcsRate = {
  basicTextPaise: 11.88, // MSG91 ₹0.12  × 0.99
  richCardPaise: 13.86, // MSG91 ₹0.14  × 0.99
  intlBasicTextPaise: 14.85, // MSG91 ₹0.15 × 0.99
  intlRichCardPaise: 19.8, // MSG91 ₹0.20 × 0.99
}

export type CompetitorRate = {
  name: string
  basicTextPaise: number | null
  richCardPaise: number | null
  note?: string
  /** Source URL so the rate can be audited. */
  sourceUrl: string
}

/**
 * Public per-message rates for India A2P RCS.
 * Numbers are the published rate cards at time of writing.
 * Update `fetchedAt` when refreshed.
 */
export const COMPETITOR_RATES: CompetitorRate[] = [
  {
    name: "MSG91",
    basicTextPaise: 12,
    richCardPaise: 14,
    note: "Market leader — transparent rate card",
    sourceUrl: "https://msg91.com/in/pricing/rcs",
  },
  {
    name: "Authkey",
    basicTextPaise: 12,
    richCardPaise: 14,
    note: "Matches MSG91 at the 10-lakh volume tier",
    sourceUrl: "https://authkey.io/pricing/rcs",
  },
  {
    name: "GreenAds Global",
    basicTextPaise: 9,
    richCardPaise: 13,
    note: "Cheaper text rate but no transparent rich-card conversation pricing",
    sourceUrl: "https://www.greenadsglobal.com/rcs-pricing",
  },
  {
    name: "Gupshup",
    basicTextPaise: null,
    richCardPaise: null,
    note: "Enterprise quote only — no public rate card",
    sourceUrl: "https://www.gupshup.ai/rcs-api",
  },
]

export const COMPETITOR_RATES_FETCHED_AT = "2026-04-23"

export type RcsPlan = {
  id: "starter" | "growth" | "scale"
  name: string
  walletInr: number
  description: string
  /** Rough message count at the rich-card rate, for the teaser. */
  richCardsIncluded: number
  /** Rough message count at the basic-text rate, for the teaser. */
  basicTextsIncluded: number
  /** Display chip. */
  badge?: string
  /** What you get beyond wallet size. */
  includes: string[]
}

/** Wallet-style plans — same as MSG91's Launch / Build / Grow, undercut on per-msg rate. */
export const RCS_PLANS: RcsPlan[] = [
  {
    id: "starter",
    name: "Starter",
    walletInr: 2_000,
    description: "First RCS campaigns with live delivery reports and iPhone fallback.",
    richCardsIncluded: Math.floor(2_000 / (SMSLOCAL_RCS_RATE.richCardPaise / 100)),
    basicTextsIncluded: Math.floor(2_000 / (SMSLOCAL_RCS_RATE.basicTextPaise / 100)),
    includes: [
      "Brand verification on Jio, Airtel, and Vi",
      "Rich cards, carousels, suggested replies",
      "Automatic SMS fallback for non-RCS devices",
      "Live delivery + read receipts",
      "iPhone fallback delivery",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    walletInr: 5_000,
    description: "The sweet spot for growing teams running weekly RCS sends.",
    richCardsIncluded: Math.floor(5_000 / (SMSLOCAL_RCS_RATE.richCardPaise / 100)),
    basicTextsIncluded: Math.floor(5_000 / (SMSLOCAL_RCS_RATE.basicTextPaise / 100)),
    badge: "Most popular",
    includes: [
      "Everything in Starter",
      "A/B template experiments",
      "Campaign-level analytics dashboard",
      "Priority template approvals",
      "Shared team inbox for inbound replies",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    walletInr: 10_000,
    description: "For high-volume senders ready to commit to RCS as a primary channel.",
    richCardsIncluded: Math.floor(10_000 / (SMSLOCAL_RCS_RATE.richCardPaise / 100)),
    basicTextsIncluded: Math.floor(10_000 / (SMSLOCAL_RCS_RATE.basicTextPaise / 100)),
    includes: [
      "Everything in Growth",
      "Dedicated account manager",
      "Carrier-side escalation when templates stall",
      "Webhook-driven event pipeline",
      "Priority rendering QA on reference devices",
    ],
  },
]

/** Format paise-per-message as "₹0.1188" with up to four significant digits. */
export function formatPaiseAsRupees(paise: number): string {
  const rupees = paise / 100
  // Trim trailing zeros up to 4 dp.
  const s = rupees.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")
  return `₹${s}`
}

/** Format a paise value as "11.88 paise" for compact display. */
export function formatPaise(paise: number): string {
  const rounded = Math.round(paise * 100) / 100
  return `${rounded} paise`
}

/** Format an INR number as "₹1,00,000". */
export function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`
}

/** Savings vs a competitor over a given monthly volume of rich-card messages. */
export function savingsVsRichCards(monthlyVolume: number, competitorPaise: number): number {
  const smsLocalCost = monthlyVolume * (SMSLOCAL_RCS_RATE.richCardPaise / 100)
  const competitorCost = monthlyVolume * (competitorPaise / 100)
  return Math.max(0, competitorCost - smsLocalCost)
}

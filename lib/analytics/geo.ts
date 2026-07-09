/**
 * Extracts country / region / city from the incoming request using the
 * Vercel Edge Network geolocation headers. These headers are added
 * automatically on every request running on Vercel — no IP lookup service
 * or MaxMind database required.
 *
 * Docs: https://vercel.com/docs/edge-network/headers#x-vercel-ip-country
 *
 * Locally (or on a non-Vercel host) the headers are absent and we simply
 * return an empty object — the dashboard surfaces these as "Unknown".
 */

import type { GeoInfo } from "./types"

/** ISO-3166-1 alpha-2 → English country name. Covers the countries we care
 *  about for the SMSLocal audience; anything unknown falls back to the code. */
const COUNTRY_NAMES: Record<string, string> = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  SG: "Singapore",
  MY: "Malaysia",
  ID: "Indonesia",
  PH: "Philippines",
  TH: "Thailand",
  VN: "Vietnam",
  BD: "Bangladesh",
  LK: "Sri Lanka",
  NP: "Nepal",
  PK: "Pakistan",
  AU: "Australia",
  NZ: "New Zealand",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  NL: "Netherlands",
  IE: "Ireland",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  CH: "Switzerland",
  AT: "Austria",
  BE: "Belgium",
  PT: "Portugal",
  PL: "Poland",
  RU: "Russia",
  TR: "Turkey",
  KE: "Kenya",
  NG: "Nigeria",
  ZA: "South Africa",
  EG: "Egypt",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  PE: "Peru",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  HK: "Hong Kong",
  TW: "Taiwan",
  IL: "Israel",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  BH: "Bahrain",
}

/** Best-effort ISO-3166-2 → Indian state name mapping (most traffic). */
const INDIA_REGION_NAMES: Record<string, string> = {
  AN: "Andaman and Nicobar",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CH: "Chandigarh",
  CT: "Chhattisgarh",
  DN: "Dadra and Nagar Haveli",
  DD: "Daman and Diu",
  DL: "Delhi",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JK: "Jammu and Kashmir",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PY: "Puducherry",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  WB: "West Bengal",
}

/** Pull the geo fields off the Vercel headers. */
export function geoFromHeaders(headers: Headers): GeoInfo {
  const countryCode = (headers.get("x-vercel-ip-country") || "").toUpperCase() || undefined
  const regionCode = headers.get("x-vercel-ip-country-region") || undefined
  const city = decodeCity(headers.get("x-vercel-ip-city"))

  const country = countryCode ? COUNTRY_NAMES[countryCode] ?? countryCode : undefined

  let region: string | undefined
  if (regionCode) {
    if (countryCode === "IN") region = INDIA_REGION_NAMES[regionCode] ?? regionCode
    else region = regionCode
  }

  return {
    countryCode,
    country,
    region,
    city,
  }
}

/** Vercel URL-encodes city names that contain spaces; decode safely. */
function decodeCity(raw: string | null): string | undefined {
  if (!raw) return undefined
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export function countryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] ?? code
}

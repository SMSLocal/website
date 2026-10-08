/**
 * Scenes for the "Messaging in action" section.
 *
 * Each scene is a real photograph with a high-fidelity chat / checkout UI
 * layered on top. Everything is drawn inside a 400x380 frame, so no phone is
 * ever cropped by the card edge and no face is cut off.
 *
 * Photo credits (Unsplash licence — free for commercial use):
 *   /home/merchant.webp  moonboyz
 *   /home/promo.webp     pcashwath
 *   /home/rcs.webp       indupandey
 *   /home/p-tshirt.webp  avtar9w
 *   /home/p-shoe.webp    tyfeague
 *   /home/p-watch.webp   francoishurtaud
 *
 * Brand marks (WhatsApp, Google Pay, PhonePe, Paytm, Visa, Mastercard) are
 * vector paths from the Simple Icons set (CC0). The logos are trademarks of
 * their owners.
 */

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"

const WA_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
const GPAY_PATH =
  "M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z"
const PHONEPE_PATH =
  "M10.206 9.941h2.949v4.692c-.402.201-.938.268-1.34.268-1.072 0-1.609-.536-1.609-1.743V9.941zm13.47 4.816c-1.523 6.449-7.985 10.442-14.433 8.919C2.794 22.154-1.199 15.691.324 9.243 1.847 2.794 8.309-1.199 14.757.324c6.449 1.523 10.442 7.985 8.919 14.433zm-6.231-5.888a.887.887 0 0 0-.871-.871h-1.609l-3.686-4.222c-.335-.402-.871-.536-1.407-.402l-1.274.401c-.201.067-.268.335-.134.469l4.021 3.82H6.386c-.201 0-.335.134-.335.335v.67c0 .469.402.871.871.871h.938v3.217c0 2.413 1.273 3.82 3.418 3.82.67 0 1.206-.067 1.877-.335v2.145c0 .603.469 1.072 1.072 1.072h.938a.432.432 0 0 0 .402-.402V9.874h1.542c.201 0 .335-.134.335-.335v-.67z"
const PAYTM_PATH =
  "M15.85 8.167a.204.204 0 0 0-.04.004c-.68.19-.543 1.148-1.781 1.23h-.12a.23.23 0 0 0-.052.005h-.001a.24.24 0 0 0-.184.235v1.09c0 .134.106.241.237.241h.645v4.623c0 .132.104.238.233.238h1.058a.236.236 0 0 0 .233-.238v-4.623h.6c.13 0 .236-.107.236-.241v-1.09a.239.239 0 0 0-.236-.24h-.612V8.386a.218.218 0 0 0-.216-.22zm4.225 1.17c-.398 0-.762.15-1.042.395v-.124a.238.238 0 0 0-.234-.224h-1.07a.24.24 0 0 0-.236.242v5.92a.24.24 0 0 0 .236.242h1.07c.12 0 .217-.091.233-.209v-4.25a.393.393 0 0 1 .371-.408h.196a.41.41 0 0 1 .226.09.405.405 0 0 1 .145.319v4.074l.004.155a.24.24 0 0 0 .237.241h1.07a.239.239 0 0 0 .235-.23l-.001-4.246c0-.14.062-.266.174-.34a.419.419 0 0 1 .196-.068h.198c.23.02.37.2.37.408.005 1.396.004 2.8.004 4.224a.24.24 0 0 0 .237.241h1.07c.13 0 .236-.108.236-.241v-4.543c0-.31-.034-.442-.08-.577a1.601 1.601 0 0 0-1.51-1.09h-.015a1.58 1.58 0 0 0-1.152.5c-.291-.308-.7-.5-1.153-.5zM.232 9.4A.234.234 0 0 0 0 9.636v5.924c0 .132.096.238.216.241h1.09c.13 0 .237-.107.237-.24l.004-1.658H2.57c.857 0 1.453-.605 1.453-1.481v-1.538c0-.877-.596-1.484-1.453-1.484H.232zm9.032 0a.239.239 0 0 0-.237.241v2.47c0 .94.657 1.608 1.579 1.608h.675s.016 0 .037.004a.253.253 0 0 1 .222.253c0 .13-.096.235-.219.251l-.018.004-.303.006H9.739a.239.239 0 0 0-.236.24v1.09a.24.24 0 0 0 .236.242h1.75c.92 0 1.577-.669 1.577-1.608v-4.56a.239.239 0 0 0-.236-.24h-1.07a.239.239 0 0 0-.236.24c-.005.787 0 1.525 0 2.255a.253.253 0 0 1-.25.25h-.449a.253.253 0 0 1-.25-.255c.005-.754-.005-1.5-.005-2.25a.239.239 0 0 0-.236-.24zm-4.004.006a.232.232 0 0 0-.238.226v1.023c0 .132.113.24.252.24h1.413c.112.017.2.1.213.23v.14c-.013.124-.1.214-.207.224h-.7c-.93 0-1.594.63-1.594 1.515v1.269c0 .88.57 1.506 1.495 1.506h1.94c.348 0 .63-.27.63-.6v-4.136c0-1.004-.508-1.637-1.72-1.637zm-3.713 1.572h.678c.139 0 .25.115.25.256v.836a.253.253 0 0 1-.25.256h-.1c-.192.002-.386 0-.578 0zm4.67 1.977h.445c.139 0 .252.108.252.24v.932a.23.23 0 0 1-.014.076.25.25 0 0 1-.238.164h-.445a.247.247 0 0 1-.252-.24v-.933c0-.132.113-.239.252-.239Z"
const VISA_PATH =
  "M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"
const MC_PATH =
  "M11.343 18.031c.058.049.12.098.181.146-1.177.783-2.59 1.238-4.107 1.238C3.32 19.416 0 16.096 0 12c0-4.095 3.32-7.416 7.416-7.416 1.518 0 2.931.456 4.105 1.238-.06.051-.12.098-.165.15C9.6 7.489 8.595 9.688 8.595 12c0 2.311 1.001 4.51 2.748 6.031zm5.241-13.447c-1.52 0-2.931.456-4.105 1.238.06.051.12.098.165.15C14.4 7.489 15.405 9.688 15.405 12c0 2.31-1.001 4.507-2.748 6.031-.058.049-.12.098-.181.146 1.177.783 2.588 1.238 4.107 1.238C20.68 19.416 24 16.096 24 12c0-4.094-3.32-7.416-7.416-7.416zM12 6.174c-.096.075-.189.15-.28.231C10.156 7.764 9.169 9.765 9.169 12c0 2.236.987 4.236 2.551 5.595.09.08.185.158.28.232.096-.074.189-.152.28-.232 1.563-1.359 2.551-3.359 2.551-5.595 0-2.235-.987-4.236-2.551-5.595-.09-.08-.184-.156-.28-.231z"

/* ───────────────────────── shared pieces ───────────────────────── */

function SharedDefs() {
  return (
    <defs>
      <filter id="shadow-lg" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.38" />
      </filter>
      <filter id="shadow-md" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.28" />
      </filter>
      <filter id="shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.16" />
      </filter>
    </defs>
  )
}

/* Both chat phones share one frame, one position and one scale, so they line up exactly. */
const PHONE_W = 200
const PHONE_H = 404
const BEZEL = 3.5
const SW = PHONE_W - BEZEL * 2 // screen width  = 193
const SH = PHONE_H - BEZEL * 2 // screen height = 397
const PHONE_TRANSFORM = "translate(212 12) scale(0.88)"

/** Slim-bezel phone drawn at its natural size (200 x 404) at (0,0). */
function PhoneFrame({ id, children }: { id: string; children: React.ReactNode }) {
  const radius = 34
  return (
    <g>
      <defs>
        <clipPath id={`${id}-screen`}>
          <rect x={BEZEL} y={BEZEL} width={SW} height={SH} rx={radius - BEZEL} />
        </clipPath>
        <linearGradient id={`${id}-bezel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a5368" />
          <stop offset="0.5" stopColor="#10151f" />
          <stop offset="1" stopColor="#2c3445" />
        </linearGradient>
        <linearGradient id={`${id}-glare`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.26" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={PHONE_W} height={PHONE_H} rx={radius} fill={`url(#${id}-bezel)`} filter="url(#shadow-lg)" />
      <rect x="0.7" y="0.7" width={PHONE_W - 1.4} height={PHONE_H - 1.4} rx={radius - 0.7} fill="none" stroke="#fff" strokeOpacity="0.22" />
      {/* side keys */}
      <rect x="-1.8" y="80" width="2.4" height="24" rx="1.2" fill="#10151f" />
      <rect x="-1.8" y="112" width="2.4" height="40" rx="1.2" fill="#10151f" />
      <rect x={PHONE_W - 0.6} y="104" width="2.4" height="52" rx="1.2" fill="#10151f" />
      <g clipPath={`url(#${id}-screen)`}>
        <g transform={`translate(${BEZEL} ${BEZEL})`}>{children}</g>
        <rect x={BEZEL} y={BEZEL} width={SW} height={SH} fill={`url(#${id}-glare)`} />
      </g>
      {/* dynamic island */}
      <rect x={PHONE_W / 2 - 23} y="9" width="46" height="13" rx="6.5" fill="#05080d" />
    </g>
  )
}

/** Time, signal and battery. `ink` is the colour of the status icons. */
function StatusBar({ ink }: { ink: string }) {
  return (
    <g fill={ink}>
      <text x="17" y="15.4" fontSize="8.6" fontWeight="700" fontFamily={FONT}>
        12:31
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={SW - 54 + i * 4.4} y={16 - (3 + i * 2)} width="2.8" height={3 + i * 2} rx="0.8" />
      ))}
      <rect x={SW - 31} y="8" width="17" height="8.4" rx="2.4" fill="none" stroke={ink} strokeWidth="1" opacity="0.9" />
      <rect x={SW - 29.4} y="9.6" width="11.4" height="5.2" rx="1.3" />
      <rect x={SW - 13.2} y="10.8" width="1.8" height="2.8" rx="0.8" />
    </g>
  )
}

/** Chat header: back chevron, avatar, name + verified tick, subtitle, menu dots. All centred on y = 45. */
function ChatHeader({
  bg,
  ink,
  sub,
  name,
  nameWidth,
  subtitle,
  subtitleWidth = 60,
  avatar,
  rcsTag = false,
  callIcon = false,
}: {
  bg: string
  ink: string
  sub: string
  name: string
  nameWidth: number
  subtitle: string
  subtitleWidth?: number
  avatar: React.ReactNode
  rcsTag?: boolean
  callIcon?: boolean
}) {
  return (
    <g>
      <rect width={SW} height="66" fill={bg} />
      <StatusBar ink={ink} />
      <path d="M18 38.5 L11.5 45 L18 51.5" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {avatar}
      <text x="54" y="42.4" fontSize="10.4" fontWeight="700" fill={ink} fontFamily={FONT} textLength={nameWidth} lengthAdjust="spacingAndGlyphs">
        {name}
      </text>
      <VerifiedTick cx={54 + nameWidth + 7} cy={38.9} r={4.2} />
      <text x="54" y="54" fontSize="7.6" fill={sub} fontFamily={FONT} textLength={subtitleWidth} lengthAdjust="spacingAndGlyphs">
        {subtitle}
      </text>
      {rcsTag ? (
        <g transform={`translate(${54 + subtitleWidth + 5} 45.2)`}>
          <rect width="27" height="12" rx="6" fill="#e6efff" stroke="#c9dafc" strokeWidth="0.6" />
          <text x="5.5" y="8.7" fontSize="7" fontWeight="800" fill="#1a56db" fontFamily={FONT} textLength="16" lengthAdjust="spacingAndGlyphs">
            RCS
          </text>
        </g>
      ) : null}
      {callIcon ? (
        <g transform={`translate(${SW - 39.2} 37.08) scale(0.66)`} fill={ink}>
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </g>
      ) : null}
      <circle cx={SW - 14} cy="39" r="1.5" fill={ink} />
      <circle cx={SW - 14} cy="45" r="1.5" fill={ink} />
      <circle cx={SW - 14} cy="51" r="1.5" fill={ink} />
    </g>
  )
}

function VerifiedTick({ cx, cy, r = 5 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#1d9bf0" />
      <path
        d={`M${cx - r * 0.45} ${cy + r * 0.02} L${cx - r * 0.1} ${cy + r * 0.38} L${cx + r * 0.5} ${cy - r * 0.34}`}
        fill="none"
        stroke="#fff"
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

/* ───────────────────────── scene 1: payments ───────────────────────── */

export function PaymentScene() {
  /** Every payment mark sits in the same white circle (r = 15.5), centred on the row. */
  const disc = (cy: number, children: React.ReactNode) => (
    <g>
      <circle cx="234" cy={cy} r="15.5" fill="#fff" stroke="#e5e7eb" />
      {children}
    </g>
  )

  const rows: Array<{ label: string; sub?: string; selected?: boolean; mark: (cy: number) => React.ReactNode }> = [
    {
      label: "Pay on WhatsApp",
      sub: "Fastest · no app switch",
      selected: true,
      mark: (cy) =>
        disc(
          cy,
          <g transform={`translate(${234 - 9.5} ${cy - 9.5}) scale(0.7917)`}>
            <path fill="#25D366" d={WA_PATH} />
          </g>
        ),
    },
    {
      label: "Google Pay",
      mark: (cy) =>
        disc(
          cy,
          <g transform={`translate(${234 - 12.2 * 0.92} ${cy - 11.95 * 0.92}) scale(0.92)`}>
            <path fill="#5F6368" d={GPAY_PATH} />
          </g>
        ),
    },
    {
      label: "PhonePe",
      mark: (cy) =>
        disc(
          cy,
          <g transform={`translate(${234 - 10.5} ${cy - 10.5}) scale(0.875)`}>
            <path fill="#5F259F" d={PHONEPE_PATH} />
          </g>
        ),
    },
    {
      label: "Paytm",
      mark: (cy) =>
        disc(
          cy,
          <g transform={`translate(${234 - 12 * 0.9} ${cy - 12.1 * 0.9}) scale(0.9)`}>
            <path fill="#00BAF2" d={PAYTM_PATH} />
          </g>
        ),
    },
  ]

  return (
    <svg
      viewBox="0 0 400 380"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="A smiling shop owner at her counter, with a WhatsApp checkout sheet listing WhatsApp, Google Pay, PhonePe and Paytm and a payment received notice"
    >
      <SharedDefs />
      <defs>
        <linearGradient id="pay-scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.42" stopColor="#0f172a" stopOpacity="0" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id="pay-sheet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f7fb" />
        </linearGradient>
      </defs>

      <image href="/home/merchant.webp" x="-176" y="-24" width="610" height="428" preserveAspectRatio="xMidYMid slice" />
      <rect width="400" height="380" fill="url(#pay-scrim)" />

      {/* checkout sheet */}
      <g filter="url(#shadow-lg)">
        <rect x="206" y="14" width="186" height="292" rx="18" fill="url(#pay-sheet)" />
      </g>
      <rect x="283" y="21" width="32" height="3.4" rx="1.7" fill="#cdd3de" />

      {/* merchant header */}
      <circle cx="229" cy="48" r="11.5" fill="#0b6e5f" />
      <text x="229" y="52" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily={FONT}>
        S
      </text>
      <text x="246" y="46" fontSize="9.6" fontWeight="700" fill="#111827" fontFamily={FONT} textLength="64" lengthAdjust="spacingAndGlyphs">
        Sharma Store
      </text>
      <VerifiedTick cx={318} cy={42.8} r={4} />
      <text x="246" y="57.6" fontSize="7.6" fill="#6b7280" fontFamily={FONT}>
        Order #2048 · 3 items
      </text>
      <text x="380" y="54" textAnchor="end" fontSize="15" fontWeight="800" fill="#111827" fontFamily={FONT}>
        ₹1,249
      </text>
      <line x1="218" y1="70" x2="380" y2="70" stroke="#e5e7eb" />
      <text x="218" y="86" fontSize="7.4" fontWeight="700" letterSpacing="1.2" fill="#9ca3af" fontFamily={FONT}>
        PAY WITH
      </text>

      {rows.map((r, i) => {
        const y = 94 + i * 38
        const cy = y + 16.5
        return (
          <g key={r.label}>
            <rect x="212" y={y - 1} width="174" height="35" rx="17.5" fill={r.selected ? "#ecfaf1" : "none"} stroke={r.selected ? "#a7e3c0" : "none"} />
            {r.mark(cy)}
            <text x="260" y={y + (r.sub ? 15 : 21)} fontSize="10" fontWeight="600" fill="#111827" fontFamily={FONT}>
              {r.label}
            </text>
            {r.sub ? (
              <text x="260" y={y + 26.6} fontSize="7.4" fill="#6b7280" fontFamily={FONT}>
                {r.sub}
              </text>
            ) : null}
            <circle cx="371" cy={cy} r="6" fill={r.selected ? "#16a34a" : "#fff"} stroke={r.selected ? "#16a34a" : "#b6bdca"} strokeWidth="1.4" />
            {r.selected ? <circle cx="371" cy={cy} r="2.4" fill="#fff" /> : null}
          </g>
        )
      })}

      {/* more options: round Visa and Mastercard marks */}
      <text x="218" y="262" fontSize="7.8" fill="#6b7280" fontFamily={FONT}>
        Cards · Net banking · More UPI
      </text>
      <g>
        <circle cx="352" cy="258" r="10" fill="#fff" stroke="#e5e7eb" />
        <g transform={`translate(${352 - 12 * 0.62} ${258 - 12 * 0.62}) scale(0.62)`}>
          <path fill="#1A1F71" d={VISA_PATH} />
        </g>
      </g>
      <g>
        <circle cx="376" cy="258" r="10" fill="#fff" stroke="#e5e7eb" />
        <g transform={`translate(${376 - 12 * 0.58} ${258 - 12 * 0.58}) scale(0.58)`}>
          <path fill="#EB1600" d={MC_PATH} />
        </g>
      </g>

      <rect x="218" y="272" width="162" height="26" rx="13" fill="#16a34a" />
      <g transform="translate(262 276) scale(0.7)">
        <path fill="#fff" d={WA_PATH} />
      </g>
      <text x="324" y="289.4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={FONT}>
        Pay ₹1,249
      </text>

      {/* payment received chip */}
      <g filter="url(#shadow-md)" transform="translate(168 322)">
        <rect width="224" height="46" rx="23" fill="#fff" />
        <circle cx="25" cy="23" r="14" fill="#25D366" />
        <g transform="translate(15.6 13.6) scale(0.78)">
          <path fill="#fff" d={WA_PATH} />
        </g>
        <circle cx="35" cy="34" r="6.4" fill="#16a34a" stroke="#fff" strokeWidth="1.6" />
        <path d="M31.8 34.2 L34.2 36.6 L38.4 31.8" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="48" y="20" fontSize="10.4" fontWeight="700" fill="#111827" fontFamily={FONT}>
          Payment received
        </text>
        <text x="48" y="33.6" fontSize="8" fill="#6b7280" fontFamily={FONT}>
          ₹1,249 · via WhatsApp · just now
        </text>
      </g>
    </svg>
  )
}

/* ───────────────────────── scene 2: promo on WhatsApp ───────────────────────── */

/** One WhatsApp call-to-action button under the bubble. `icon` is drawn in a 11 x 11 box. */
function CtaButton({ y, label, labelWidth, icon }: { y: number; label: string; labelWidth: number; icon: React.ReactNode }) {
  const total = 11 + 6 + labelWidth
  const x0 = (SW - total) / 2
  return (
    <g>
      <g filter="url(#shadow-sm)">
        <rect x="12" y={y} width={SW - 24} height="22" rx="11" fill="#fff" />
      </g>
      <g transform={`translate(${x0} ${y + 5.5})`} stroke="#0b6cdb" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </g>
      <text x={x0 + 17} y={y + 14.6} fontSize="9.8" fontWeight="600" fill="#0b6cdb" fontFamily={FONT} textLength={labelWidth} lengthAdjust="spacingAndGlyphs">
        {label}
      </text>
    </g>
  )
}

export function PromoScene() {
  return (
    <svg
      viewBox="0 0 400 380"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="A man smiling with his phone, next to a phone showing a WhatsApp promotional message with a sale banner, offer text, a link and three buttons: Shop Now, View details and Call us"
    >
      <SharedDefs />
      <defs>
        <linearGradient id="promo-scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.38" stopColor="#0f172a" stopOpacity="0" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0.46" />
        </linearGradient>
        <linearGradient id="promo-banner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8a5c" />
          <stop offset="1" stopColor="#ff4f8b" />
        </linearGradient>
        <linearGradient id="promo-bag1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#ffb62e" />
        </linearGradient>
        <linearGradient id="promo-bag2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffd9e6" />
        </linearGradient>
      </defs>

      <image href="/home/promo.webp" x="-228" y="-8" width="640" height="427" preserveAspectRatio="xMidYMid slice" />
      <rect width="400" height="380" fill="url(#promo-scrim)" />

      <g transform={PHONE_TRANSFORM}>
        <PhoneFrame id="promo-phone">
          <ChatHeader
            bg="#0b6e5f"
            ink="#ffffff"
            sub="#cfeee7"
            name="Urban Cart"
            nameWidth={56}
            subtitle="Business account"
            avatar={
              <g>
                <circle cx="38" cy="45" r="10.5" fill="#fff" />
                <text x="38" y="49.2" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0b6e5f" fontFamily={FONT}>
                  U
                </text>
              </g>
            }
          />

          {/* chat background */}
          <rect y="66" width={SW} height="340" fill="#efe7dc" />
          {[0, 1, 2, 3, 4, 5, 6].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <circle key={`${r}-${c}`} cx={16 + c * 40 + (r % 2) * 20} cy={82 + r * 50} r="1.7" fill="#d9cdbb" opacity="0.7" />
            ))
          )}
          <rect x={SW / 2 - 25} y="73" width="50" height="15" rx="7.5" fill="#fff" opacity="0.92" />
          <text x={SW / 2} y="83.4" textAnchor="middle" fontSize="7.2" fill="#6b7280" fontFamily={FONT}>
            TODAY
          </text>

          {/* promo bubble */}
          <g filter="url(#shadow-sm)">
            <path d={`M12 96 H${SW - 19} a7 7 0 0 1 7 7 V263 a7 7 0 0 1 -7 7 H19 a7 7 0 0 1 -7 -7 Z`} fill="#fff" />
            <path d="M12 96 L3 96 L12 107Z" fill="#fff" />
          </g>
          <rect x="17" y="101" width={SW - 34} height="64" rx="6" fill="url(#promo-banner)" />
          <circle cx={SW - 28} cy="106" r="24" fill="#fff" opacity="0.1" />
          <circle cx="30" cy="160" r="20" fill="#fff" opacity="0.08" />
          <text x="28" y="115" fontSize="7.2" fontWeight="700" letterSpacing="2.2" fill="#fff" opacity="0.92" fontFamily={FONT}>
            WEEKEND
          </text>
          <text x="27" y="141" fontSize="28" fontWeight="800" fill="#fff" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic">
            Sale
          </text>
          <rect x="28" y="146" width="76" height="14" rx="7" fill="#fff" />
          <text x="66" y="156.2" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ff4f8b" fontFamily={FONT}>
            UP TO 50% OFF
          </text>
          <g transform={`translate(${SW - 44} 112) scale(0.7)`}>
            <path d="M-4 -4 Q8 -22 20 -4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <path d="M-8 -4 H24 L28 40 Q28 44 24 44 H-8 Q-12 44 -12 40Z" fill="url(#promo-bag2)" />
            <path d="M-8 -4 H24 L25.6 14 H-9.6Z" fill="#fff" opacity="0.5" />
            <circle cx="4" cy="19" r="6" fill="#ff4f8b" opacity="0.85" />
            <path d="M1.4 19 l2 2 l3.4 -4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g transform={`translate(${SW - 68} 124) rotate(-8) scale(0.7)`}>
            <path d="M-3 -3 Q7 -18 17 -3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
            <path d="M-6 -3 H20 L23 32 Q23 35 20 35 H-6 Q-9 35 -9 32Z" fill="url(#promo-bag1)" />
            <rect x="-1" y="10" width="16" height="4" rx="2" fill="#fff" opacity="0.7" />
          </g>

          {/* copy */}
          <text x="20" y="183" fontSize="10.4" fontWeight="700" fill="#111827" fontFamily={FONT}>
            Hey Riya! 🎉
          </text>
          <text x="20" y="196" fontSize="10.4" fontWeight="700" fill="#111827" fontFamily={FONT}>
            The Weekend Sale is LIVE!
          </text>
          <text x="20" y="212" fontSize="9.2" fill="#374151" fontFamily={FONT}>
            Flat 40% off + free delivery
          </text>
          <text x="20" y="224" fontSize="9.2" fill="#374151" fontFamily={FONT}>
            on your first order. Use code
          </text>
          <text x="20" y="236" fontSize="9.6" fontWeight="800" fill="#111827" fontFamily={FONT}>
            WEEKEND40
          </text>
          <text x="20" y="252" fontSize="9.6" fill="#0b6cdb" textDecoration="underline" fontFamily={FONT}>
            🔗 urbancart.in/sale
          </text>
          <text x="20" y="263" fontSize="6.8" fill="#9ca3af" fontFamily={FONT}>
            Reply STOP to unsubscribe
          </text>
          <text x={SW - 20} y="263" textAnchor="end" fontSize="6.8" fill="#9ca3af" fontFamily={FONT}>
            12:31 PM
          </text>

          {/* three call-to-action buttons */}
          <CtaButton
            y={276}
            label="Shop Now"
            labelWidth={46}
            icon={
              <g>
                <path d="M2 9 L9 2" />
                <path d="M3.4 2 H9 V7.6" />
              </g>
            }
          />
          <CtaButton
            y={302}
            label="View details"
            labelWidth={62}
            icon={
              <g>
                <rect x="1.4" y="1" width="8.2" height="9" rx="1.6" />
                <path d="M3.4 4 H7.6 M3.4 6.4 H7.6 M3.4 8.6 H5.8" />
              </g>
            }
          />
          <CtaButton
            y={328}
            label="Call us"
            labelWidth={38}
            icon={<path d="M3.2 1.4 L5 1.2 L6 3.6 L4.8 4.6 C5.6 6.2 6.8 7.4 8.4 8.2 L9.4 7 L11 7.9 L10.8 9.7 C10.6 10.4 10 10.8 9.3 10.8 C5.2 10.4 1.6 6.8 1.2 2.7 C1.2 2 2.5 1.4 3.2 1.4Z" />}
          />

          {/* input bar */}
          <rect x="10" y="358" width={SW - 54} height="26" rx="13" fill="#fff" />
          <text x="26" y="374.6" fontSize="9" fill="#9ca3af" fontFamily={FONT}>
            Message
          </text>
          <circle cx={SW - 24} cy="371" r="13" fill="#0b6e5f" />
          <rect x={SW - 27} y="364.6" width="6" height="9.6" rx="3" fill="#fff" />
          <path d={`M${SW - 30.4} 371.4 a6.4 6.4 0 0 0 12.8 0 M${SW - 24} 377.8 v3`} stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <rect x={SW / 2 - 28} y="388.5" width="56" height="3" rx="1.5" fill="#111827" opacity="0.55" />
        </PhoneFrame>
      </g>

      {/* floating chip */}
      <g filter="url(#shadow-md)" transform="translate(14 16)">
        <rect width="136" height="40" rx="20" fill="#fff" />
        <circle cx="21" cy="20" r="11" fill="#e6f7ee" />
        <path d="M15.6 20.2 l3.8 3.8 l6.6 -7" stroke="#16a34a" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="39" y="18" fontSize="10.4" fontWeight="700" fill="#111827" fontFamily={FONT}>
          Read receipts
        </text>
        <text x="39" y="30" fontSize="8" fill="#6b7280" fontFamily={FONT}>
          live delivery status
        </text>
      </g>
    </svg>
  )
}

/* ───────────────────────── scene 3: RCS carousel ───────────────────────── */

export function RcsScene() {
  return (
    <svg
      viewBox="0 0 400 380"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="A smiling woman browsing on her phone, next to a phone showing an RCS rich card carousel from a verified fashion sender, with product photos, prices and buttons, and a watch card sliding out of the phone"
    >
      <SharedDefs />
      <defs>
        <linearGradient id="rcs-scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.5" stopColor="#0f172a" stopOpacity="0" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="rcs-avatar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <clipPath id="rcs-c1">
          <path d="M12 141 a13 13 0 0 1 13 -13 H137 a13 13 0 0 1 13 13 V208 H12Z" />
        </clipPath>
        <clipPath id="rcs-c2">
          <path d="M160 141 a13 13 0 0 1 13 -13 H285 a13 13 0 0 1 13 13 V208 H160Z" />
        </clipPath>
        <clipPath id="rcs-c3">
          <path d="M0 14 a14 14 0 0 1 14 -14 H104 a14 14 0 0 1 14 14 V78 H0Z" />
        </clipPath>
        <linearGradient id="rcs-trail" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* her whole face and the headroom above it stay inside the frame */}
      <image href="/home/rcs.webp" x="-250" y="-232" width="660" height="825" preserveAspectRatio="xMidYMid slice" />
      <rect width="400" height="380" fill="url(#rcs-scrim)" />

      <g transform={PHONE_TRANSFORM}>
        <PhoneFrame id="rcs-phone">
          <ChatHeader
            bg="#ffffff"
            ink="#111827"
            sub="#6b7280"
            name="Stylo Fashion"
            nameWidth={68}
            subtitle="Verified business"
            subtitleWidth={60}
            rcsTag
            callIcon
            avatar={
              <g>
                <circle cx="38" cy="45" r="10.5" fill="url(#rcs-avatar)" />
                <text x="38" y="49.2" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily={FONT}>
                  S
                </text>
              </g>
            }
          />
          <line x1="0" y1="66" x2={SW} y2="66" stroke="#eef0f4" />

          <rect y="66" width={SW} height="340" fill="#f3f4f9" />
          <text x={SW / 2} y="82" textAnchor="middle" fontSize="7.2" fill="#9ca3af" fontFamily={FONT}>
            Today · 12:31 PM
          </text>
          <g filter="url(#shadow-sm)">
            <rect x="12" y="90" width="152" height="28" rx="14" fill="#fff" />
          </g>
          <text x="24" y="107.6" fontSize="9.6" fill="#111827" fontFamily={FONT}>
            New arrivals, just for you ✨
          </text>

          {/* carousel card 1 */}
          <g filter="url(#shadow-md)">
            <rect x="12" y="128" width="138" height="168" rx="13" fill="#fff" />
          </g>
          <image href="/home/p-tshirt.webp" x="12" y="128" width="138" height="80" preserveAspectRatio="xMidYMid slice" clipPath="url(#rcs-c1)" />
          <text x="22" y="225" fontSize="10.6" fontWeight="700" fill="#111827" fontFamily={FONT}>
            Classic White Tee
          </text>
          <text x="22" y="237" fontSize="8" fill="#6b7280" fontFamily={FONT}>
            100% cotton, relaxed fit
          </text>
          <text x="22" y="253" fontSize="12" fontWeight="800" fill="#111827" fontFamily={FONT}>
            ₹1,499
          </text>
          <text x="70" y="253" fontSize="8.6" fill="#9ca3af" textDecoration="line-through" fontFamily={FONT}>
            ₹2,199
          </text>
          <rect x="22" y="260" width="118" height="24" rx="12" fill="#fff" stroke="#c7d2fe" />
          <text x="81" y="275.6" textAnchor="middle" fontSize="9.6" fontWeight="700" fill="#4f46e5" fontFamily={FONT}>
            Buy now
          </text>

          {/* carousel card 2 (peeks out) */}
          <g filter="url(#shadow-md)">
            <rect x="160" y="128" width="138" height="168" rx="13" fill="#fff" />
          </g>
          <image href="/home/p-shoe.webp" x="160" y="128" width="138" height="80" preserveAspectRatio="xMidYMid slice" clipPath="url(#rcs-c2)" />
          <text x="170" y="225" fontSize="10.6" fontWeight="700" fill="#111827" fontFamily={FONT}>
            Leather Derby Shoes
          </text>
          <text x="170" y="237" fontSize="8" fill="#6b7280" fontFamily={FONT}>
            Handcrafted, tan finish
          </text>
          <text x="170" y="253" fontSize="12" fontWeight="800" fill="#111827" fontFamily={FONT}>
            ₹2,999
          </text>
          <rect x="170" y="260" width="118" height="24" rx="12" fill="#fff" stroke="#c7d2fe" />

          {/* dots + suggested replies + input */}
          <circle cx="82" cy="310" r="3" fill="#4f46e5" />
          <circle cx="94" cy="310" r="2.4" fill="#c4c9d6" />
          <circle cx="105" cy="310" r="2.4" fill="#c4c9d6" />
          <rect x="24" y="322" width="64" height="20" rx="10" fill="#fff" stroke="#c7d2fe" />
          <text x="56" y="335.6" textAnchor="middle" fontSize="8.6" fontWeight="600" fill="#4f46e5" fontFamily={FONT}>
            View all
          </text>
          <rect x="96" y="322" width="72" height="20" rx="10" fill="#fff" stroke="#c7d2fe" />
          <text x="132" y="335.6" textAnchor="middle" fontSize="8.6" fontWeight="600" fill="#4f46e5" fontFamily={FONT}>
            Track order
          </text>
          <rect x="10" y="352" width={SW - 20} height="26" rx="13" fill="#fff" stroke="#e5e7eb" />
          <text x="26" y="368.6" fontSize="8.6" fill="#9ca3af" fontFamily={FONT}>
            RCS message
          </text>
          <rect x={SW / 2 - 28} y="388.5" width="56" height="3" rx="1.5" fill="#111827" opacity="0.5" />
        </PhoneFrame>
      </g>

      {/* brand-verified chip */}
      <g filter="url(#shadow-md)" transform="translate(10 326)">
        <rect width="128" height="40" rx="20" fill="#fff" />
        <VerifiedTick cx={21} cy={20} r={9} />
        <text x="38" y="18" fontSize="10.2" fontWeight="700" fill="#111827" fontFamily={FONT}>
          Brand verified
        </text>
        <text x="38" y="30" fontSize="8" fill="#6b7280" fontFamily={FONT}>
          Logo &amp; name shown
        </text>
      </g>

      {/* third card sliding out of the carousel: tilted, with a motion trail */}
      <g transform="translate(132 254) rotate(-8) scale(0.78)">
        <rect x="-12" y="8" width="118" height="158" rx="14" fill="#fff" opacity="0.2" />
        <rect x="-6" y="4" width="118" height="158" rx="14" fill="#fff" opacity="0.32" />
        <rect x="-46" y="38" width="38" height="4" rx="2" fill="url(#rcs-trail)" />
        <rect x="-58" y="62" width="50" height="4" rx="2" fill="url(#rcs-trail)" opacity="0.8" />
        <rect x="-40" y="86" width="32" height="4" rx="2" fill="url(#rcs-trail)" opacity="0.6" />
        <rect x="-50" y="110" width="42" height="4" rx="2" fill="url(#rcs-trail)" opacity="0.4" />
        <g filter="url(#shadow-lg)">
          <rect width="118" height="158" rx="14" fill="#fff" />
        </g>
        <image href="/home/p-watch.webp" x="0" y="0" width="118" height="78" preserveAspectRatio="xMidYMid slice" clipPath="url(#rcs-c3)" />
        <rect x="8" y="8" width="30" height="15" rx="7.5" fill="#fff" />
        <text x="23" y="18.4" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#4f46e5" fontFamily={FONT}>
          NEW
        </text>
        <text x="10" y="96" fontSize="10.4" fontWeight="700" fill="#111827" fontFamily={FONT}>
          Minimal Watch
        </text>
        <text x="10" y="107" fontSize="7.8" fill="#6b7280" fontFamily={FONT}>
          Rose-gold, leather strap
        </text>
        <text x="10" y="124" fontSize="12" fontWeight="800" fill="#111827" fontFamily={FONT}>
          ₹3,999
        </text>
        <rect x="10" y="132" width="98" height="20" rx="10" fill="#fff" stroke="#c7d2fe" />
        <text x="59" y="145.6" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4f46e5" fontFamily={FONT}>
          Buy now
        </text>
      </g>
    </svg>
  )
}

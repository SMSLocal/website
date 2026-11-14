"use client"

import { useEffect, useRef, useState } from "react"

// Hero illustration for /channels/instagram, drawn in SVG, built only from what the page talks about:
// a conversation (a customer asks something, the AI agent answers, a card follows, the customer thanks us), a glossy
// Instagram icon, a heart (story reaction) and a cart (checkout), a comment turned into a DM, one shared inbox for
// Instagram, WhatsApp and SMS, and three quick replies: Sizing, Shipping and Returns. The quick replies are real
// buttons: clicking one swaps the whole conversation and the cards to that topic. On its own the scene cycles through
// the three every 6 seconds (the selected button follows), waits 10 seconds after a click, pauses while hovered, and
// never cycles with reduced motion.
// In the site's teal-green on a light background.

type Topic = "sizing" | "shipping" | "returns"
const ORDER: Topic[] = ["sizing", "shipping", "returns"]
const LABEL: Record<Topic, string> = { sizing: "Sizing", shipping: "Shipping", returns: "Returns" }

const TOPICS: Record<Topic, {
  q1: string; q2: string; qIcon: "camera" | "box" | "return"
  a1: string
  cardTitle: string; cardSub: string; cardCta: string; thumb: "tee" | "truck" | "label"
  r1: string; done: string
  cUser: string; cInit: string; cText: string; cChip: string
  in1: string; in1Sub: string; in3Sub: string
  alt: string
}> = {
  sizing: {
    q1: "Does this come in size M?", q2: "Saw it on your story", qIcon: "camera",
    a1: "Yes! Size M is in stock. Here it is",
    cardTitle: "Linen Shirt", cardSub: "₹1,499 · Size M", cardCta: "View product", thumb: "tee",
    r1: "Perfect, ordering now!", done: "Order placed. Ships tomorrow.",
    cUser: "meera.k", cInit: "M", cText: "Price? Link please 🙏", cChip: "Auto-DM sent with the link",
    in1: "meera.k", in1Sub: "Story reply · size M?", in3Sub: "Delivery confirmed",
    alt: "A customer replies to a story asking about size M, the AI agent answers, a Linen Shirt card follows and the order is placed",
  },
  shipping: {
    q1: "When will my order arrive?", q2: "Order #1042", qIcon: "box",
    a1: "Arrives Thursday. Track it here",
    cardTitle: "Order #1042", cardSub: "Out for delivery · Thu", cardCta: "Track order", thumb: "truck",
    r1: "Great, thanks!", done: "Tracking sent. Arrives Thursday.",
    cUser: "arjun.s", cInit: "A", cText: "Ships to Pune? 📦", cChip: "Auto-DM sent with delivery info",
    in1: "arjun.s", in1Sub: "Shipping question", in3Sub: "Out for delivery",
    alt: "A customer asks when their order will arrive, the AI agent answers with the delivery day, and a tracking card follows",
  },
  returns: {
    q1: "Can I return this if", q2: "it doesn't fit?", qIcon: "return",
    a1: "Yes, 7-day free returns. Label below",
    cardTitle: "Return label", cardSub: "Free pickup · 7 days", cardCta: "Get label", thumb: "label",
    r1: "Perfect, thank you!", done: "Return booked. Pickup tomorrow.",
    cUser: "neha.r", cInit: "N", cText: "Can I exchange it? 🔁", cChip: "Auto-DM sent with the policy",
    in1: "neha.r", in1Sub: "Returns question", in3Sub: "Pickup booked",
    alt: "A customer asks about returning an item, the AI agent confirms free 7-day returns, and a return label card follows",
  },
}

const G = "var(--primary)"
const MINT = "color-mix(in oklch, var(--primary) 12%, white)"
const MINT2 = "color-mix(in oklch, var(--primary) 20%, white)"
const NAVY = "var(--foreground)"

const CSS = `
@keyframes isx-pop { from { opacity: 0; transform: translateY(24px) scale(.96) } to { opacity: 1; transform: none } }
@keyframes isx-float { 0%, 100% { transform: translateY(-6px) } 50% { transform: translateY(7px) } }
@keyframes isx-spark { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.isx-pop { opacity: 0; animation: isx-pop .7s cubic-bezier(.3,1.3,.4,1) both }
.isx-float { animation: isx-float 6.5s ease-in-out infinite }
.isx-spark { animation: isx-spark 2.4s ease-in-out infinite }
.isx-pill { cursor: pointer; outline: none }
.isx-pill rect { transition: fill .25s ease, stroke-width .2s ease }
.isx-pill text { transition: fill .25s ease }
.isx-pill:hover rect { stroke-width: 4.4 }
.isx-pill:focus-visible rect { stroke-width: 6; stroke: var(--foreground) }
@media (prefers-reduced-motion: reduce) { .isx-pop { animation: none; opacity: 1 } .isx-float, .isx-spark { animation: none } .isx-pill rect, .isx-pill text { transition: none } }
`

// text that must fit a box: only squeeze it when the estimate is wider than the room
function fit(text: string, size: number, max: number, f = 0.43) {
  const est = Math.round(text.length * size * f)
  return est > max ? { textLength: max, lengthAdjust: "spacingAndGlyphs" as const } : {}
}
const est = (text: string, size: number, f = 0.43) => Math.round(text.length * size * f)

function Tee({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M-82 -68 L-42 -90 Q0 -62 42 -90 L82 -68 L112 -18 L70 4 L58 -12 V88 H-58 V-12 L-70 4 L-112 -18 Z" fill="#15181d" />
      <path d="M-42 -90 Q0 -62 42 -90 Q0 -78 -42 -90Z" fill="#0b0d10" />
      <rect x="-12" y="-80" width="24" height="9" rx="3" fill="#2a2f38" />
    </g>
  )
}

function Cart({ size = 100, color = "#fff", w = 12 }: { size?: number; color?: string; w?: number }) {
  return (
    <g transform={`scale(${size / 100})`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-46 -42 H-30 L-16 20 H32 L44 -22 H-24" />
      <circle cx="-8" cy="38" r="7" fill={color} stroke="none" />
      <circle cx="26" cy="38" r="7" fill={color} stroke="none" />
    </g>
  )
}

// the small icon at the end of the customer's question
function QIcon({ kind }: { kind: "camera" | "box" | "return" }) {
  if (kind === "camera") {
    return <g fill={NAVY}><rect x="-22" y="-14" width="44" height="30" rx="6" /><path d="M-9 -14 l4 -7 h10 l4 7z" /><circle cx="0" cy="2" r="9" fill="#f4f6f7" /><circle cx="0" cy="2" r="5.5" fill={NAVY} /></g>
  }
  if (kind === "box") {
    return <g><path d="M-22 -8 L0 -20 L22 -8 V14 L0 26 L-22 14Z" fill={NAVY} /><path d="M-22 -8 L0 4 L22 -8 M0 4 V26" fill="none" stroke="#f4f6f7" strokeWidth="3.4" strokeLinejoin="round" /></g>
  }
  return <g fill="none" stroke={NAVY} strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round"><path d="M-16 -2 A18 18 0 1 1 -8 14" /><path d="M-24 -14 L-16 -2 L-4 -8" /></g>
}

// the picture on the card
function Thumb({ kind }: { kind: "tee" | "truck" | "label" }) {
  if (kind === "tee") return <g transform="translate(517 490)"><Tee s={0.5} /></g>
  if (kind === "truck") {
    return (
      <g transform="translate(517 488)">
        <rect x="-44" y="-30" width="50" height="40" rx="6" fill={G} />
        <path d="M6 -16 H28 L44 2 V10 H6Z" fill={G} />
        <path d="M12 -10 H26 L36 2 H12Z" fill="#fff" opacity=".85" />
        <circle cx="-24" cy="14" r="9" fill="#15181d" /><circle cx="26" cy="14" r="9" fill="#15181d" />
        <circle cx="-24" cy="14" r="3.4" fill="#fff" /><circle cx="26" cy="14" r="3.4" fill="#fff" />
      </g>
    )
  }
  return (
    <g transform="translate(517 488)">
      <rect x="-34" y="-34" width="68" height="68" rx="10" fill="#fff" stroke="#d8dfe4" strokeWidth="3" />
      <path d="M-18 -16 H18 M-18 -4 H8" stroke="#c4ccd2" strokeWidth="5" strokeLinecap="round" />
      <g fill="none" stroke={G} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><path d="M-16 18 H12 A9 9 0 0 0 12 0" /><path d="M-8 10 L-16 18 L-8 26" /></g>
    </g>
  )
}

type SceneProps = { topic: Topic; onPick: (t: Topic) => void; speed: number }

function Scene({ topic, onPick, speed }: SceneProps) {
  const t = TOPICS[topic]
  const d = (s: number) => `${(s * speed).toFixed(2)}s`
  const q1x = 480
  const rEmoji = 375 + Math.min(est(t.r1, 34, 0.48), 342) + 20
  const doneFit = fit(t.done, 32, 410)
  return (
    <>
      {/* the big soft circle */}
      <circle className="isx-bigcircle" cx="763" cy="512" r="494" fill="url(#isx-circle)" />
      {/* phones only: a smaller circle that fits their crop, so it is never sliced */}
      <circle className="isx-mcircle" cx="545" cy="532" r="456" fill="url(#isx-circle)" />
      <circle className="isx-mcircle" cx="545" cy="532" r="456" fill="none" stroke={MINT2} strokeWidth="5" opacity=".75" />
      <circle className="isx-bigcircle" cx="763" cy="512" r="494" fill="none" stroke={MINT2} strokeWidth="5" opacity=".75" />
      {/* premium backdrop: faded dot grid, orbit rings with satellites, a warm glow behind the app icon */}
      <circle className="isx-bigcircle" cx="763" cy="512" r="486" fill="url(#isx-dots)" mask="url(#isx-fade)" />
      <circle className="isx-mcircle" cx="545" cy="532" r="448" fill="url(#isx-dots)" mask="url(#isx-fade)" />
      <g className="isx-bigcircle" fill="none" stroke={G} strokeOpacity=".22" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round">
        <circle cx="763" cy="512" r="438" /><circle cx="763" cy="512" r="372" strokeOpacity=".14" />
      </g>
      <g className="isx-bigcircle"><circle cx="400" cy="205" r="9" fill={G} opacity=".5" /><circle cx="1180" cy="780" r="8" fill="oklch(0.85 0.14 80)" opacity=".9" /><circle cx="1040" cy="118" r="6" fill={G} opacity=".4" /></g>
      <ellipse cx="228" cy="860" rx="190" ry="150" fill="#f5446c" opacity=".12" filter="url(#isx-blur)" />

      {/* everything that changes with the chosen quick reply */}
      <g key={topic}>
        {/* the customer's question */}
        <g className="isx-pop" style={{ animationDelay: d(0.1) }}>
          <circle cx="382" cy="158" r="54" fill={MINT2} filter="url(#isx-sh)" />
          <circle cx="382" cy="146" r="22" fill={G} />
          <path d="M346 194 Q382 160 418 194 Q418 204 410 204 H354 Q346 204 346 194Z" fill={G} />
          <path d="M470 108 H862 Q925 108 925 172 Q925 237 862 237 H466 Q454 242 442 240 Q452 228 450 214 Q450 190 450 172 Q450 108 470 108Z" fill="#f4f6f7" filter="url(#isx-sh)" />
          <text x={q1x} y="164" fontSize="36" fontWeight="500" fill={NAVY} {...fit(t.q1, 36, 398)}>{t.q1}</text>
          <text x={q1x} y="208" fontSize="36" fontWeight="500" fill={NAVY} {...fit(t.q2, 36, 310)}>{t.q2}</text>
          <g transform="translate(823 196)"><QIcon kind={t.qIcon} /></g>
        </g>

        {/* the AI agent answers */}
        <g className="isx-pop" style={{ animationDelay: d(0.35) }}>
          <rect x="470" y="288" width="542" height="130" rx="65" fill={G} opacity=".32" filter="url(#isx-blur)" />
          <rect x="461" y="272" width="560" height="130" rx="65" fill="url(#isx-ai)" filter="url(#isx-sh)" />
          <rect x="461" y="272" width="560" height="65" rx="32" fill="url(#isx-sheen)" />
          <rect x="461" y="272" width="560" height="130" rx="65" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
          <g transform="translate(996 274)"><circle r="21" fill="#fff" stroke={MINT2} strokeWidth="2" /><path d="M-8 1 l6 6 l11 -13" fill="none" stroke={G} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" /></g>
          <text x="500" y="331" fontSize="35" fontWeight="500" fill="#fff" {...fit(t.a1, 35, 489, 0.4)}>{t.a1}</text>
          <text x="500" y="378" fontSize="42">👇</text>
        </g>
        <g className="isx-spark" stroke={G} strokeWidth="8" strokeLinecap="round"><path d="M426 264 L438 284" /><path d="M404 288 L430 296" /><path d="M404 320 L430 318" /></g>

        {/* the card */}
        <g className="isx-pop" style={{ animationDelay: d(0.6) }}>
          <rect x="427" y="418" width="545" height="202" rx="44" fill="url(#isx-glass)" filter="url(#isx-sh)" />
          <rect x="427" y="418" width="545" height="202" rx="44" fill="none" stroke={MINT2} strokeWidth="2.4" />
          <rect x="446" y="421" width="507" height="3" rx="1.5" fill="#fff" opacity=".9" />          <rect x="448" y="436" width="138" height="105" rx="22" fill="#f1f3f4" />
          <Thumb kind={t.thumb} />
          <text x="615" y="482" fontSize="37" fontWeight="600" fill={NAVY} {...fit(t.cardTitle, 37, 335)}>{t.cardTitle}</text>
          <text x="615" y="524" fontSize="31" fill="#6b7480" {...fit(t.cardSub, 31, 335)}>{t.cardSub}</text>
          <path d="M448 551 H950" stroke="#e8ecee" strokeWidth="2" />
          <text x="700" y="596" textAnchor="middle" fontSize="31" fontWeight="600" fill={G} {...fit(t.cardCta, 31, 300)}>{t.cardCta}</text>
        </g>

        {/* the customer replies */}
        <g className="isx-pop" style={{ animationDelay: d(0.85) }}>
          <path d="M385 642 H752 Q797 642 797 686 Q797 731 752 731 H362 Q350 736 336 736 Q348 724 346 710 Q343 690 343 686 Q343 642 385 642Z" fill="#f4f6f7" filter="url(#isx-sh)" />
          <text x="375" y="699" fontSize="34" fontWeight="500" fill={NAVY} {...fit(t.r1, 34, 342)}>{t.r1}</text>
          <text x={rEmoji} y="702" fontSize="38">🙌</text>
        </g>

        {/* the outcome */}
        <g className="isx-pop" style={{ animationDelay: d(1.05) }}>
          <rect x="440" y="752" width="487" height="80" rx="40" fill={G} opacity=".32" filter="url(#isx-blur)" />
          <rect x="431" y="741" width="505" height="80" rx="40" fill="url(#isx-ai)" filter="url(#isx-sh)" />
          <rect x="431" y="741" width="505" height="40" rx="20" fill="url(#isx-sheen)" />
          <circle cx="479" cy="781" r="20" fill="#fff" />
          <path d="M469 781 l7 8 l14 -16" fill="none" stroke={G} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="518" y="793" fontSize="32" fontWeight="600" fill="#fff" {...doneFit}>{t.done}</text>
        </g>

        {/* the comment on the post, turned into a DM */}
        <g className="isx-pop" style={{ animationDelay: d(1) }}>
          <g className="isx-float" style={{ animationDelay: "-1s" }}>
            <rect x="1056" y="292" width="392" height="190" rx="36" fill="url(#isx-glass)" filter="url(#isx-sh)" />
            <rect x="1056" y="292" width="392" height="190" rx="36" fill="none" stroke={MINT2} strokeWidth="2.4" />
            <text x="1088" y="338" fontSize="21" fontWeight="600" fill="#6b7480" letterSpacing="2">COMMENT ON YOUR POST</text>
            <circle cx="1110" cy="394" r="22" fill="#fde4e1" /><text x="1110" y="403" textAnchor="middle" fontSize="24" fontWeight="700" fill="#b4443b">{t.cInit}</text>
            <text x="1148" y="388" fontSize="26" fontWeight="700" fill={NAVY}>{t.cUser}</text>
            <text x="1148" y="420" fontSize="24" fill="#4b5562" {...fit(t.cText, 24, 270, 0.5)}>{t.cText}</text>
            <rect x="1088" y="436" width="334" height="30" rx="15" fill={MINT} />
            <text x="1108" y="458" fontSize="19" fontWeight="700" fill={G} {...fit(`✦  ${t.cChip}`, 19, 296, 0.5)}>✦  {t.cChip}</text>
          </g>
        </g>

        {/* the shared inbox */}
        <g className="isx-pop" style={{ animationDelay: d(1.25) }}>
          <g className="isx-float" style={{ animationDelay: "-2.2s" }}>
            <rect x="1056" y="506" width="392" height="300" rx="36" fill="url(#isx-glass)" filter="url(#isx-sh)" />
            <rect x="1056" y="506" width="392" height="300" rx="36" fill="none" stroke={MINT2} strokeWidth="2.4" />
            <rect x="1360" y="532" width="68" height="28" rx="14" fill={MINT} /><circle cx="1378" cy="546" r="5" fill={G} className="isx-spark" /><text x="1390" y="553" fontSize="16" fontWeight="700" fill={G}>LIVE</text>
            <circle cx="1094" cy="548" r="7" fill={G} />
            <text x="1112" y="556" fontSize="21" fontWeight="600" fill={G} letterSpacing="2">SHARED INBOX</text>
            <rect x="1076" y="574" width="352" height="64" rx="20" fill={MINT} />
            <image href="/logos/channels/instagram.svg" x="1092" y="590" width="32" height="32" />
            <text x="1140" y="601" fontSize="24" fontWeight="700" fill={NAVY}>{t.in1}</text>
            <text x="1140" y="626" fontSize="19" fill="#6b7480">{t.in1Sub}</text>
            <circle cx="1398" cy="606" r="14" fill={G} /><path d="M1391 606 l5 6 l9 -11" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
            <image href="/logos/channels/whatsapp.svg" x="1092" y="662" width="32" height="32" />
            <text x="1140" y="673" fontSize="24" fontWeight="700" fill={NAVY}>Rahul S.</text>
            <text x="1140" y="698" fontSize="19" fill="#6b7480">Where is my order?</text>
            <rect x="1092" y="734" width="32" height="32" rx="9" fill="#F5A300" /><text x="1108" y="758" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff">S</text>
            <text x="1140" y="745" fontSize="24" fontWeight="700" fill={NAVY}>+91 98••• ••210</text>
            <text x="1140" y="770" fontSize="19" fill="#6b7480">{t.in3Sub}</text>
          </g>
        </g>
      </g>

      {/* the Instagram app icon */}
      <g className="isx-pop" style={{ animationDelay: ".25s" }}>
        <g className="isx-float">
          <g transform="translate(228 842) rotate(-14)">
            <rect x="-86" y="-64" width="192" height="192" rx="56" fill="#f5446c" opacity=".38" filter="url(#isx-blur)" />
            <rect x="-90" y="-82" width="192" height="192" rx="56" fill="url(#isx-ig2)" filter="url(#isx-sh)" />
            <rect x="-96" y="-96" width="192" height="192" rx="56" fill="url(#isx-ig)" />
            <rect x="-96" y="-96" width="192" height="192" rx="56" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
            <path d="M-96 -40 Q-96 -96 -40 -96 H40 Q82 -96 92 -62 Q20 -72 -40 -10 Q-82 30 -96 40Z" fill="#fff" opacity=".2" />
            <rect x="-54" y="-54" width="108" height="108" rx="33" fill="none" stroke="#fff" strokeWidth="14" />
            <circle cx="0" cy="0" r="26" fill="none" stroke="#fff" strokeWidth="14" />
            <circle cx="36" cy="-36" r="7.5" fill="#fff" />
            <rect x="-96" y="-96" width="192" height="96" rx="56" fill="url(#isx-sheen)" opacity=".5" />
          </g>
          <circle cx="228" cy="842" r="158" fill="none" stroke="url(#isx-ring)" strokeWidth="3" strokeDasharray="3 11" strokeLinecap="round" opacity=".8" />
          <g transform="translate(318 760)"><circle r="26" fill="#fff" filter="url(#isx-sh)" /><circle r="19" fill="url(#isx-ai)" /><path d="M-8 1 l6 6 l11 -13" fill="none" stroke="#fff" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" /></g>
        </g>
      </g>
      <g className="isx-spark" stroke={G} strokeWidth="8" strokeLinecap="round" style={{ animationDelay: ".5s" }}><path d="M103 710 L118 738" /><path d="M72 744 L98 756" /><path d="M60 778 L90 780" /></g>

      {/* a heart and a cart */}
      <g className="isx-pop" style={{ animationDelay: ".7s" }}>
        <g className="isx-float" style={{ animationDelay: "-1s" }}>
          <circle cx="1164" cy="111" r="58" fill="#fff" filter="url(#isx-sh)" />
          <path d="M1164 142 C1130 120 1124 94 1144 86 C1156 82 1164 92 1164 98 C1164 92 1172 82 1184 86 C1204 94 1198 120 1164 142Z" fill="#ef4444" />
        </g>
        <g className="isx-float" style={{ animationDelay: "-3s" }}>
          <circle cx="1304" cy="243" r="58" fill="#fff" filter="url(#isx-sh)" />
          <g transform="translate(1304 244)"><Cart size={74} color={G} w={11} /></g>
        </g>
      </g>

      {/* the quick replies: real buttons */}
      <g className="isx-pop" style={{ animationDelay: "1.5s" }}>
        <g className="isx-float" style={{ animationDelay: "-3.4s" }}>
          <text x="1060" y="842" fontSize="19" fontWeight="600" fill="#6b7480" letterSpacing="2">QUICK REPLIES</text>
          {[
            { x: 1056, w: 126, k: "sizing" as Topic },
            { x: 1194, w: 158, k: "shipping" as Topic },
            { x: 1364, w: 142, k: "returns" as Topic },
          ].map((p) => {
            const on = p.k === topic
            return (
              <g
                key={p.k}
                className="isx-pill"
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`Show the ${LABEL[p.k].toLowerCase()} example`}
                onClick={() => onPick(p.k)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onPick(p.k)
                  }
                }}
              >
                <rect x={p.x} y="858" width={p.w} height="56" rx="28" fill={on ? "url(#isx-ai)" : "url(#isx-glass)"} stroke={G} strokeWidth="2.6" filter="url(#isx-sh)" />
                <text x={p.x + p.w / 2} y="895" textAnchor="middle" fontSize="25" fontWeight="600" fill={on ? "#fff" : G} style={{ pointerEvents: "none" }}>{LABEL[p.k]}</text>
              </g>
            )
          })}
        </g>
      </g>
    </>
  )
}

export function InstagramScene() {
  const [topic, setTopic] = useState<Topic>("sizing")
  const [speed, setSpeed] = useState(1)
  const lastPick = useRef(0)
  const hover = useRef(false)

  // cycle through the three examples on its own, and carry on 10 seconds after a click (never with reduced motion)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      // wait while hovered, while the tab is hidden, and for 10 seconds after a click
      if (hover.current || document.hidden || Date.now() - lastPick.current < 10000) return
      setSpeed(0.4)
      setTopic((cur) => ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length])
    }, 6000)
    return () => window.clearInterval(id)
  }, [])

  const pick = (t: Topic) => {
    lastPick.current = Date.now()
    setSpeed(0.4)
    setTopic(t)
  }
  const alt = TOPICS[topic].alt

  return (
    <div
      className="relative mx-auto w-full max-w-[600px] lg:h-full lg:min-h-[360px] lg:max-w-none"
      onMouseEnter={() => { hover.current = true }}
      onMouseLeave={() => { hover.current = false }}
    >
      {/* shared gradients and filters, in an SVG that is never display:none */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="isx-ig" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#fdc830" /><stop offset=".38" stopColor="#f5445c" /><stop offset=".68" stopColor="#d6249f" /><stop offset="1" stopColor="#6a3de8" />
          </linearGradient>
          <filter id="isx-blur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="14" /></filter>
          <radialGradient id="isx-circle" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ffffff" /><stop offset=".72" stopColor="#f7fcfa" /><stop offset="1" stopColor="#e6f7f1" /></radialGradient>
          <linearGradient id="isx-ig2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c0309e" /><stop offset="1" stopColor="#4a22b5" /></linearGradient>
          <filter id="isx-sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#0f2a3a" floodOpacity=".16" /></filter>
          <linearGradient id="isx-ai" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="oklch(0.72 0.13 175)" /><stop offset=".55" stopColor="oklch(0.62 0.14 168)" /><stop offset="1" stopColor="oklch(0.5 0.12 176)" /></linearGradient>
          <linearGradient id="isx-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="color-mix(in oklch, var(--primary) 7%, white)" /></linearGradient>
          <linearGradient id="isx-sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".42" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <linearGradient id="isx-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="oklch(0.85 0.14 80)" /><stop offset="1" stopColor="oklch(0.62 0.14 168)" /></linearGradient>
          <pattern id="isx-dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.7" fill="oklch(0.62 0.14 168)" opacity=".3" /></pattern>
          <radialGradient id="isx-fadeg" cx=".5" cy=".5" r=".5"><stop offset=".35" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
          <mask id="isx-fade" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#isx-fadeg)" /></mask>
        </defs>
      </svg>
      {/* tablet and desktop: the whole composition */}
      <svg viewBox="0 8 1536 1004" className="hidden h-auto w-full sm:block [&_.isx-mcircle]:hidden lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-full lg:w-auto lg:max-w-[660px] lg:-translate-x-1/2" role="group" aria-label={`${alt}. Pick Sizing, Shipping or Returns to see another example.`}>
        <Scene topic={topic} onPick={pick} speed={speed} />
      </svg>
      {/* phones: a closer crop of the conversation so the text stays readable */}
      <svg viewBox="30 60 1008 940" className="block h-auto w-full sm:hidden [&_.isx-bigcircle]:hidden" role="img" aria-label={alt}>
        <Scene topic={topic} onPick={pick} speed={speed} />
      </svg>
      {/* phones, second block: the three feature cards and the quick replies, large enough to read */}
      <svg viewBox="1034 280 490 646" className="mt-3 block h-auto w-full sm:hidden [&_.isx-bigcircle]:hidden [&_.isx-mcircle]:hidden" role="group" aria-label="A comment turned into a DM, one shared inbox for Instagram, WhatsApp and SMS, and quick replies for sizing, shipping and returns">
        <Scene topic={topic} onPick={pick} speed={speed} />
      </svg>
      <style>{CSS}</style>
    </div>
  )
}

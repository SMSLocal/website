// Hero graphic for /products/ai-agents: a standing glass phone shows a live WhatsApp chat. A customer asks
// "Where is my order?" in one Indian language and Captain answers in the same language. Eight glass language tiles
// stand either side; the one being used lifts and glows, then the chat moves to the next language.
// Hand-drawn SVG + CSS, silent, 16-second loop (two seconds per language).

const LANGS = [
  { n: "Hindi", w: "हिन्दी", q: "मेरा ऑर्डर कहाँ है?", a: "आपका ऑर्डर कल पहुँचेगा।", q2: "ठीक है, धन्यवाद!", a2: "आपका स्वागत है 🙏" },
  { n: "Tamil", w: "தமிழ்", q: "என் ஆர்டர் எங்கே?", a: "நாளை வந்து சேரும்.", q2: "சரி, நன்றி!", a2: "வரவேற்கிறோம் 🙏" },
  { n: "Telugu", w: "తెలుగు", q: "నా ఆర్డర్ ఎక్కడ?", a: "రేపు చేరుతుంది.", q2: "సరే, ధన్యవాదాలు!", a2: "స్వాగతం 🙏" },
  { n: "Bengali", w: "বাংলা", q: "আমার অর্ডার কোথায়?", a: "কাল পৌঁছে যাবে।", q2: "ঠিক আছে, ধন্যবাদ!", a2: "আপনাকে স্বাগতম 🙏" },
  { n: "Marathi", w: "मराठी", q: "माझी ऑर्डर कुठे आहे?", a: "उद्या पोहोचेल.", q2: "ठीक आहे, धन्यवाद!", a2: "आपले स्वागत आहे 🙏" },
  { n: "Gujarati", w: "ગુજરાતી", q: "મારો ઓર્ડર ક્યાં છે?", a: "કાલે પહોંચશે.", q2: "ઠીક છે, આભાર!", a2: "સ્વાગત છે 🙏" },
  { n: "Kannada", w: "ಕನ್ನಡ", q: "ನನ್ನ ಆರ್ಡರ್ ಎಲ್ಲಿದೆ?", a: "ನಾಳೆ ತಲುಪುತ್ತದೆ.", q2: "ಸರಿ, ಧನ್ಯವಾದ!", a2: "ಸ್ವಾಗತ 🙏" },
  { n: "Hinglish", w: "Hinglish", q: "Mera order kahan hai?", a: "Order kal aayega.", q2: "Theek hai, thanks!", a2: "Welcome ji 🙏" },
]

const SLOT = 100 / LANGS.length
// chip positions: four on the left, four on the right, slightly staggered
const CHIP_W = 108
const CHIP_H = 54
const chipPos = (i: number) => {
  const side = i < 4 ? "L" : "R"
  const r = i % 4
  const y = 66 + r * 84
  const x = side === "L" ? (r % 2 ? 14 : 40) : r % 2 ? 560 - 14 - CHIP_W : 560 - 40 - CHIP_W
  return { x, y, side }
}

// opacity/transform window: on between a% and b%. The first language is on at the start of the loop.
const R = 1.6
const win = (name: string, i: number, on: string, off: string, lead = 0) => {
  const a = i * SLOT + lead
  const b = (i + 1) * SLOT
  if (i === 0) {
    return lead
      ? `@keyframes ${name} { 0%, ${lead}% { ${off} } ${lead + R}%, ${b - R}% { ${on} } ${b}%, 100% { ${off} } }`
      : `@keyframes ${name} { 0%, ${b - R}% { ${on} } ${b}%, 99% { ${off} } 100% { ${on} } }`
  }
  return `@keyframes ${name} { 0%, ${a}% { ${off} } ${a + R}%, ${b - R}% { ${on} } ${b}%, 100% { ${off} } }`
}

const CSS = `
${LANGS.map((_, i) => [
  win(`ag8-b${i}`, i, "opacity: 1; transform: none", "opacity: 0; transform: translateY(8px)"),
  win(`ag8-r${i}`, i, "opacity: 1; transform: none", "opacity: 0; transform: translateY(8px)", 3),
  win(`ag8-s${i}`, i, "opacity: 1; transform: none", "opacity: 0; transform: translateY(8px)", 6),
  win(`ag8-t${i}`, i, "opacity: 1; transform: none", "opacity: 0; transform: translateY(8px)", 8.4),
  win(`ag8-c${i}`, i, "transform: translateY(-5px)", "transform: translateY(0)"),
  win(`ag8-g${i}`, i, "opacity: 1", "opacity: 0"),
].join("\n") + `
.ag8-b${i} { opacity: 0; animation: ag8-b${i} 24s ease-in-out infinite }
.ag8-r${i} { opacity: 0; animation: ag8-r${i} 24s ease-in-out infinite }
.ag8-s${i} { opacity: 0; animation: ag8-s${i} 24s ease-in-out infinite }
.ag8-t${i} { opacity: 0; animation: ag8-t${i} 24s ease-in-out infinite }
.ag8-c${i} { animation: ag8-c${i} 24s ease-in-out infinite }
.ag8-g${i} { opacity: 0; animation: ag8-g${i} 24s ease-in-out infinite }\n@keyframes ag8-m${i} { 0%, ${i * SLOT}% { color: var(--muted-foreground); background-color: var(--secondary) } ${i * SLOT + 2}%, ${(i + 1) * SLOT - 1.5}% { color: var(--primary-foreground); background-color: var(--primary) } ${(i + 1) * SLOT}%, 100% { color: var(--muted-foreground); background-color: var(--secondary) } }\n.ag8-m${i} { animation: ag8-m${i} 24s ease-in-out infinite }`).join("\n")}
@keyframes ag8-bob { 0%, 100% { transform: translateY(-2px) } 50% { transform: translateY(2px) } }
@keyframes ag8-float { 0%, 100% { transform: translateY(-4px) } 50% { transform: translateY(5px) } }
@keyframes ag8-glow { 0%, 100% { opacity: .7 } 50% { opacity: 1 } }
@keyframes ag8-spark { 0%, 100% { opacity: .15; transform: scale(.6) } 50% { opacity: .9; transform: scale(1) } }
@keyframes ag8-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(14px, -10px) } }
@keyframes ag8-dot { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
.ag8-bob { animation: ag8-bob 7s ease-in-out infinite }
.ag8-float { animation: ag8-float 6s ease-in-out infinite }
.ag8-glow { animation: ag8-glow 3s ease-in-out infinite }
.ag8-spark { transform-box: fill-box; transform-origin: center; animation: ag8-spark 3.4s ease-in-out infinite }
.ag8-blob { animation: ag8-blob 9s ease-in-out infinite }
.ag8-dot { animation: ag8-dot 1.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .ag8-bob, .ag8-float, .ag8-glow, .ag8-spark, .ag8-blob, .ag8-dot { animation: none }
  [class*="ag8-b"]:not(.ag8-bob), [class*="ag8-r"], [class*="ag8-s"], [class*="ag8-t"], [class*="ag8-c"], [class*="ag8-g"] { animation: none }
  .ag8-b0, .ag8-r0, .ag8-s0, .ag8-t0 { opacity: 1 }
}
`

const SPARKS = [[70, 36, 0], [500, 30, 1.2], [20, 250, 2.1], [540, 330, 0.7], [160, 424, 1.8], [420, 420, 2.6]]

function Phone() {
  const ticks = (
    <svg viewBox="0 0 16 10" className="h-2.5 w-3.5" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 5.5 4 8.5 9 1.5" /><path d="M7 7.5l1.4 1.2L14 1.5" /></svg>
  )
  // WhatsApp's own colours: header teal, outgoing green, incoming white, beige wallpaper
  const out = "relative ml-auto w-fit max-w-[90%] rounded-lg rounded-tr-none bg-[#d9fdd3] py-[5px] pl-2 pr-1.5 text-[11.5px] font-normal leading-[1.38] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,.13)] before:absolute before:-right-[5px] before:top-0 before:h-2 before:w-2 before:bg-[#d9fdd3] before:[clip-path:polygon(0_0,100%_0,0_100%)]"
  const inn = "relative w-fit max-w-[90%] rounded-lg rounded-tl-none bg-white py-[5px] pl-2 pr-1.5 text-[11.5px] font-normal leading-[1.38] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,.13)] before:absolute before:-left-[5px] before:top-0 before:h-2 before:w-2 before:bg-white before:[clip-path:polygon(100%_0,0_0,100%_100%)]"
  return (
    <g>
      <ellipse cx="280" cy="408" rx="96" ry="12" fill="var(--foreground)" opacity=".14" style={{ filter: "blur(8px)" }} />
      {/* side buttons */}
      <rect x="187.5" y="108" width="3" height="26" rx="1.5" fill="#0f1a2e" />
      <rect x="187.5" y="146" width="3" height="44" rx="1.5" fill="#0f1a2e" />
      <rect x="369.5" y="128" width="3" height="58" rx="1.5" fill="#0f1a2e" />
      {/* dark body, slim bezel */}
      <rect x="190" y="40" width="180" height="360" rx="34" fill="#0f1a2e" />
      <rect x="193" y="43" width="174" height="354" rx="31" fill="#fff" />
      <foreignObject x="193" y="43" width="174" height="354">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[31px] bg-[#efeae2]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Noto Sans\", \"Noto Sans Devanagari\", \"Noto Sans Tamil\", \"Noto Sans Telugu\", \"Noto Sans Bengali\", \"Noto Sans Gujarati\", \"Noto Sans Kannada\", sans-serif", WebkitFontSmoothing: "antialiased", textRendering: "optimizeLegibility", letterSpacing: "0.005em" }}>
          {/* status bar */}
          <div className="flex h-[28px] shrink-0 items-center justify-between px-5 pt-1 text-[10px] font-semibold text-white" style={{ background: "#008069" }}>
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 10" className="h-2.5 w-3.5" fill="currentColor"><rect x="0" y="6" width="2.6" height="4" rx=".6" /><rect x="4" y="4" width="2.6" height="6" rx=".6" /><rect x="8" y="2" width="2.6" height="8" rx=".6" /><rect x="12" y="0" width="2.6" height="10" rx=".6" /></svg>
              <svg viewBox="0 0 22 10" className="h-2.5 w-[18px]" fill="none"><rect x=".5" y=".5" width="18" height="9" rx="2.4" stroke="currentColor" /><rect x="2" y="2" width="12" height="6" rx="1.2" fill="currentColor" /><rect x="19.6" y="3.2" width="1.6" height="3.6" rx=".8" fill="currentColor" /></svg>
            </span>
          </div>
          {/* chat header */}
          <div className="flex h-[40px] shrink-0 items-center gap-1 pl-1.5 pr-2.5 text-white" style={{ background: "#008069" }}>
            <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1.5 3.5 6 8 10.5" /></svg>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white" style={{ color: "#008069" }}>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M8 1.2l1.4 3.8 3.8 1.4-3.8 1.4L8 11.6 6.6 7.8 2.8 6.4 6.6 5z" /><path d="M12.4 10.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" /></svg>
            </span>
            <span className="min-w-0 flex-1 pl-1 pr-1 leading-tight">
              <span className="flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold">Captain AI<svg viewBox="0 0 12 12" className="h-[11px] w-[11px] shrink-0"><circle cx="6" cy="6" r="6" fill="#25d366" /><path d="M3.3 6.2 5.2 8 8.8 4.2" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span className="block text-[8.5px] text-white/85">online</span>
            </span>
            <span className="flex shrink-0 items-center gap-2.5 pl-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px]"><path d="m22 8-6 4 6 4V8z" /><rect x="2" y="6" width="14" height="12" rx="2.5" /></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg></span>
          </div>
          {/* messages: the customer's phone, so their message is outgoing (green, right) */}
          <div className="relative flex-1" style={{ backgroundImage: "radial-gradient(rgba(11,20,26,.06) 1px, transparent 1.2px)", backgroundSize: "12px 12px" }}>
            {LANGS.map((l, i) => (
              <div key={l.n} className={`ag8-b${i} absolute inset-0 flex flex-col gap-1 px-2.5 pt-1.5`}>
                <span className="mx-auto rounded-md bg-white px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,.13)]">Today</span>
                <p className={out}>
                  {l.q}
                  <span className="inline-block w-[52px]" />
                  <span className="absolute bottom-[3px] right-1.5 flex items-center gap-0.5 text-[8px] leading-none text-[#667781]">9:41 {ticks}</span>
                </p>
                <p className={`ag8-r${i} ${inn}`}>
                  {l.a}
                  <span className="inline-block w-[30px]" />
                  <span className="absolute bottom-[3px] right-1.5 text-[8px] leading-none text-[#667781]">9:41</span>
                </p>
                <div className={`ag8-r${i} relative w-[88%] overflow-hidden rounded-lg rounded-tl-none bg-white shadow-[0_1px_0.5px_rgba(11,20,26,.13)]`}>
                  <div className="px-2 pb-1 pt-1.5">
                    <p className="text-[10.5px] font-semibold leading-tight text-[#111b21]">Order #1042</p>
                    <p className="mt-0.5 text-[9.5px] leading-tight text-[#667781]">Arrives tomorrow</p>
                    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-black/10"><span className="block h-full w-[72%] rounded-full" style={{ background: "#25d366" }} /></span>
                    <span className="mt-0.5 block text-right text-[8px] text-[#667781]">9:41</span>
                  </div>
                  <div className="border-t border-black/10 py-1 text-center text-[10px] font-medium text-[#027eb5]">Track order</div>
                </div>
                <p className={`ag8-s${i} ${out}`}>
                  {l.q2}
                  <span className="inline-block w-[52px]" />
                  <span className="absolute bottom-[3px] right-1.5 flex items-center gap-0.5 text-[8px] leading-none text-[#667781]">9:42 {ticks}</span>
                </p>
                <p className={`ag8-t${i} ${inn}`}>
                  {l.a2}
                  <span className="inline-block w-[30px]" />
                  <span className="absolute bottom-[3px] right-1.5 text-[8px] leading-none text-[#667781]">9:42</span>
                </p>
              </div>
            ))}
          </div>
          {/* message bar */}
          <div className="flex shrink-0 items-center gap-1.5 px-1.5 pb-2.5 pt-1">
            <span className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-2 py-1.5 text-[10px] text-[#667781] shadow-[0_1px_0.5px_rgba(11,20,26,.13)]"><svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><circle cx="8" cy="8" r="6.3" /><path d="M5.4 9.6a3.2 3.2 0 0 0 5.2 0" /><circle cx="5.7" cy="6.4" r=".5" fill="currentColor" /><circle cx="10.3" cy="6.4" r=".5" fill="currentColor" /></svg><span className="flex-1">Message</span><svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 5.2 6 9.7a1.6 1.6 0 0 0 2.3 2.3l4.6-4.6a3 3 0 0 0-4.2-4.2L3.9 8" /></svg><svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M2 5.5h2.4L5.6 4h4.8l1.2 1.5H14V12H2z" /><circle cx="8" cy="8.6" r="2" /></svg></span>
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-white shadow-[0_1px_1px_rgba(11,20,26,.2)]" style={{ background: "#008069" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px]"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" /></svg></span>
          </div>
        </div>
      </foreignObject>
      {/* camera pill */}
      <rect x="263" y="49" width="34" height="9" rx="4.5" fill="#05080f" />
      {/* 24/7 badge */}
      <g transform="translate(338 22)">
        <rect x="0" y="0" width="76" height="32" rx="16" fill="#fff" stroke="var(--border)" />
        <circle cx="17" cy="16" r="7.5" fill="none" stroke="var(--primary)" strokeWidth="1.8" />
        <path d="M17 11.5 V16 L20 17.8" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" />
        <text x="30" y="21" fontSize="14" fontWeight="700" fill="var(--primary)">24/7</text>
      </g>
    </g>
  )
}

export function AgentsGlass() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="ag8-blob absolute -left-8 top-[50%] h-[220px] w-[220px] rounded-full bg-primary/22 blur-[70px]" />
        <span className="ag8-blob absolute -right-6 top-0 h-[220px] w-[220px] rounded-full bg-[oklch(0.74_0.14_250)]/24 blur-[70px]" style={{ animationDelay: "-4s" }} />
        <span className="ag8-blob absolute bottom-0 left-1/3 h-[160px] w-[160px] rounded-full bg-[oklch(0.85_0.14_80)]/22 blur-[70px]" style={{ animationDelay: "-7s" }} />
      </div>

      <svg viewBox="0 0 560 440" className="hidden w-full sm:block" role="img" aria-label="A glass phone showing a WhatsApp chat where Captain AI answers a customer in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada and Hinglish">
        <defs>
          <linearGradient id="ag8-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "#fff", stopOpacity: 0.98 }} />
            <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0.14 }} />
          </linearGradient>
          <linearGradient id="ag8-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0.32 }} />
            <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0.58 }} />
          </linearGradient>
          <linearGradient id="ag8-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ag8-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--primary)" }} />
            <stop offset="1" style={{ stopColor: "oklch(0.7 0.14 235)" }} />
          </linearGradient>
          <radialGradient id="ag8-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0.16 }} />
            <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
          </radialGradient>
          <filter id="ag8-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
          <filter id="ag8-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        <ellipse cx="280" cy="410" rx="190" ry="34" fill="url(#ag8-floor)" />

        {/* the glass phone */}
        <Phone />

        {/* eight glass language tiles */}
        {LANGS.map((l, i) => {
          const p = chipPos(i)
          return (
            <g key={l.n} transform={`translate(${p.x} ${p.y})`}>
              <g className="ag8-bob" style={{ animationDelay: `${(i % 4) * 0.8}s` }}>
                <ellipse cx={CHIP_W / 2} cy={CHIP_H + 14} rx="40" ry="6" fill="var(--primary)" opacity=".2" filter="url(#ag8-soft)" />
                <g className={`ag8-c${i}`}>
                  <rect x="0" y="0" width={CHIP_W} height={CHIP_H} rx="16" fill="#fff" stroke="var(--border)" strokeWidth="1" />
                  <rect className={`ag8-g${i}`} x="-0.5" y="-0.5" width={CHIP_W + 1} height={CHIP_H + 1} rx="16.5" fill="none" stroke="var(--primary)" strokeWidth="1.4" />
                  <text x={CHIP_W / 2} y="28" textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--foreground)">{l.w}</text>
                  <text x={CHIP_W / 2} y="44" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--muted-foreground)" letterSpacing="0.08em">{l.n.toUpperCase()}</text>
                </g>
              </g>
            </g>
          )
        })}
      </svg>

      {/* small screens: a bigger phone and the languages as a plain chip row */}
      <div className="sm:hidden">
        <svg viewBox="172 12 250 414" className="mx-auto block w-full max-w-[290px]" role="img" aria-label="A phone showing a WhatsApp chat where Captain AI answers a customer in eight Indian languages">
          <Phone />
        </svg>
        <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-hidden>
          {LANGS.map((l, i) => (
            <li key={l.n} className={`ag8-m${i} rounded-full bg-secondary px-3 py-1.5 text-[13px] font-semibold text-muted-foreground`}>{l.w}</li>
          ))}
        </ul>
      </div>
      <style>{CSS}</style>
    </div>
  )
}

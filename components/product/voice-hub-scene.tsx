import { Box, Check, Headphones, MousePointerClick, Mic, Phone, PhoneCall, PhoneOutgoing, Tag } from "lucide-react"

// Hero graphic for /products/voice: a glass dome with a phone-support agent (headset) on a pedestal, glass cards around it on
// a symmetric grid, joined by thin lines with nodes. The cards come from this page: the call logged in the thread, an
// incoming call, $0.008/min outbound, click-to-call, local and toll-free numbers, and the live call.
// Hand-built HTML + SVG + CSS, silent, ambient loops. Stage is 580 x 470; everything is placed on that grid.

const CSS = `
@property --vv { syntax: "<integer>"; inherits: false; initial-value: 0; }
@keyframes vv-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes vv-sphere { 0%, 100% { translate: 0 -4px } 50% { translate: 0 5px } }
@keyframes vv-flow { to { stroke-dashoffset: -20 } }
@keyframes vv-node { 0%, 100% { opacity: .75; transform: scale(.85) } 50% { opacity: 1; transform: scale(1.2) } }
@keyframes vv-bar { 0%, 100% { transform: scaleY(.2) } 50% { transform: scaleY(1) } }
@keyframes vv-ripple { 0% { transform: scale(.7); opacity: .6 } 100% { transform: scale(1.9); opacity: 0 } }
@keyframes vv-shake { 0%, 100% { transform: rotate(0) } 15% { transform: rotate(-14deg) } 30% { transform: rotate(12deg) } 45% { transform: rotate(-10deg) } 60% { transform: rotate(8deg) } 75% { transform: rotate(0) } }
@keyframes vv-blink { 0%, 44%, 48%, 100% { transform: scaleY(1) } 46% { transform: scaleY(.12) } }
@keyframes vv-ring { 0%, 100% { opacity: .55 } 50% { opacity: 1 } }
@keyframes vv-tick { from { --vv: 0 } to { --vv: 59 } }
@keyframes vv-orbit { to { transform: rotate(360deg) } }
.vv-card { background: linear-gradient(180deg, #fff 0%, #f1faf7 100%); border-radius: 26px; box-shadow: 0 30px 46px -22px rgba(8,60,48,.40), 0 10px 18px -8px rgba(8,60,48,.14), inset 0 2px 0 #fff, inset 0 -4px 8px rgba(16,185,129,.07) }
.vv-pill { background: linear-gradient(180deg, #fff 0%, #f0f9f6 100%); box-shadow: 0 18px 28px -14px rgba(8,60,48,.42), 0 6px 10px -4px rgba(8,60,48,.14), inset 0 2px 0 #fff, inset 0 -3px 5px rgba(16,185,129,.08) }
.vv-3d { background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 60%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 84%, black) 100%); box-shadow: 0 12px 18px -8px color-mix(in oklch, var(--primary) 75%, transparent), inset 0 2px 2px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,60,40,.25) }
.vv-gloss { position: relative }
.vv-gloss::after { content: ""; position: absolute; left: 12%; right: 12%; top: 6%; height: 38%; border-radius: 999px; background: linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,0)); pointer-events: none }
.vv-float { animation: vv-float 6s ease-in-out infinite }
.vv-sphere { animation: vv-sphere 7s ease-in-out infinite }
.vv-flow { stroke-dasharray: 2 8; animation: vv-flow 1.4s linear infinite }
.vv-node { transform-box: fill-box; transform-origin: center; animation: vv-node 2.4s ease-in-out infinite }
.vv-bar { transform-origin: 50% 50%; animation: vv-bar 1s ease-in-out infinite }
.vv-ripple { animation: vv-ripple 1.6s ease-out infinite }
.vv-shake { animation: vv-shake 1.2s ease-in-out infinite }
.vv-blink { transform-box: fill-box; transform-origin: center; animation: vv-blink 6s ease-in-out infinite }
.vv-ring { animation: vv-ring 4s ease-in-out infinite }
.vv-timer { animation: vv-tick 60s steps(59) infinite; counter-reset: vv var(--vv) }
.vv-timer::after { content: counter(vv, decimal-leading-zero) }
.vv-orbit { animation: vv-orbit 28s linear infinite }
@media (prefers-reduced-motion: reduce) {
  .vv-float, .vv-sphere, .vv-flow, .vv-node, .vv-bar, .vv-ripple, .vv-shake, .vv-blink, .vv-ring, .vv-timer, .vv-orbit { animation: none }
}
`

const NAVY = "#14233a"
const GLASS = "vv-card ring-1 ring-white"
const CHIP = "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14233a] shadow-[0_10px_18px_-8px_rgba(15,26,46,.45)] ring-1 ring-border"
const BARS = Array.from({ length: 30 }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 0.9) * 12 + Math.cos(i * 0.37) * 8)))

function Sphere() {
  return (
    <div className="vv-sphere relative h-[160px] w-[160px]">
      {/* the glass dome */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 22%, rgba(255,255,255,.95) 0, rgba(255,255,255,.35) 10%, rgba(255,255,255,0) 28%), radial-gradient(circle at 50% 60%, color-mix(in oklch, var(--primary) 16%, white) 0%, color-mix(in oklch, var(--primary) 34%, white) 55%, color-mix(in oklch, var(--primary) 58%, white) 100%)",
          boxShadow: "inset 0 -16px 30px rgba(255,255,255,.55), inset 0 8px 22px rgba(255,255,255,.5), 0 34px 44px -22px color-mix(in oklch, var(--primary) 55%, transparent)",
        }}
      />
      <div className="absolute inset-[5px] rounded-full ring-1 ring-white/70" />
      <div className="absolute left-[15%] top-[8%] h-[22%] w-[34%] -rotate-[28deg] rounded-[50%] bg-gradient-to-b from-white/80 to-transparent blur-[1px]" />
      <svg viewBox="0 0 24 24" className="absolute -right-1 top-3 h-6 w-6 drop-shadow-[0_2px_6px_rgba(224,138,0,.5)]" aria-hidden><path d="M12 1 l2.6 8.4 L23 12 l-8.4 2.6 L12 23 l-2.6 -8.4 L1 12 l8.4 -2.6z" fill="#ffc94d" /></svg>

      {/* the support agent */}
      <svg viewBox="0 0 120 130" className="absolute left-1/2 top-[52%] h-[118px] w-[108px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_8px_rgba(6,60,48,.28)]" fill="none" aria-hidden>
        <defs>
          <linearGradient id="vv-blazer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="color-mix(in oklch, var(--primary) 62%, #08352b)" /><stop offset="1" stopColor="color-mix(in oklch, var(--primary) 40%, #04201a)" /></linearGradient>
          <linearGradient id="vv-cup" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="color-mix(in oklch, var(--primary) 70%, white)" /><stop offset="1" stopColor="var(--primary)" /></linearGradient>
        </defs>
        {/* shoulders, shirt, badge */}
        <rect x="53" y="84" width="14" height="18" rx="6" fill="#e5b48c" />
        <path d="M14 130 Q14 100 60 98 Q106 100 106 130Z" fill="url(#vv-blazer)" />
        <path d="M47 99 L60 117 L73 99Z" fill="#fff" />
        <rect x="76" y="112" width="15" height="10" rx="2.5" fill="#fff" /><circle cx="81" cy="117" r="2" fill="var(--primary)" /><rect x="84" y="115.5" width="5" height="1.8" rx=".9" fill="#c9d3da" />
        {/* head */}
        <circle cx="86" cy="13" r="12" fill="#2a2230" />
        <circle cx="28" cy="62" r="6.5" fill="#efc09a" /><circle cx="92" cy="62" r="6.5" fill="#efc09a" />
        <ellipse cx="60" cy="58" rx="31" ry="36" fill="#f2c9a8" />
        <path d="M28 56 Q25 18 60 17 Q95 18 92 56 Q83 35 60 36 Q37 35 28 56Z" fill="#2a2230" />
        <ellipse className="vv-blink" cx="49" cy="61" rx="3.4" ry="4.4" fill="#14233a" /><ellipse className="vv-blink" cx="71" cy="61" rx="3.4" ry="4.4" fill="#14233a" />
        <ellipse cx="41" cy="71" rx="5" ry="3.2" fill="#ff9ab0" fillOpacity=".4" /><ellipse cx="79" cy="71" rx="5" ry="3.2" fill="#ff9ab0" fillOpacity=".4" />
        <path d="M50 74 Q60 84 70 74" stroke="#b5654a" strokeWidth="3.2" strokeLinecap="round" />
        {/* headset */}
        <path d="M23 58 A39 39 0 0 1 97 58" stroke="url(#vv-cup)" strokeWidth="6.5" strokeLinecap="round" />
        <rect x="14" y="48" width="15" height="28" rx="7.5" fill="url(#vv-cup)" /><rect x="91" y="48" width="15" height="28" rx="7.5" fill="url(#vv-cup)" />
        <rect x="17.5" y="52" width="3.5" height="13" rx="1.75" fill="#fff" fillOpacity=".55" /><rect x="99" y="52" width="3.5" height="13" rx="1.75" fill="#fff" fillOpacity=".55" />
        <path d="M100 74 Q102 94 74 94" stroke="var(--primary)" strokeWidth="3.4" strokeLinecap="round" /><circle cx="70" cy="94" r="5" fill="var(--primary)" /><circle cx="68.6" cy="92.6" r="1.6" fill="#fff" fillOpacity=".8" />
      </svg>
    </div>
  )
}

function Globe() {
  return (
    <svg viewBox="0 0 120 120" className="h-[104px] w-[104px] drop-shadow-[0_18px_18px_rgba(6,60,48,.28)]" aria-hidden>
      <defs>
        <radialGradient id="vv-gl" cx=".3" cy=".25" r=".95"><stop offset="0" stopColor="color-mix(in oklch, var(--primary) 50%, white)" /><stop offset=".5" stopColor="var(--primary)" /><stop offset="1" stopColor="color-mix(in oklch, var(--primary) 72%, #062a22)" /></radialGradient>
        <clipPath id="vv-gc"><circle cx="60" cy="60" r="56" /></clipPath>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#vv-gl)" />
      <g clipPath="url(#vv-gc)" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6">
        <ellipse cx="60" cy="60" rx="24" ry="56" /><ellipse cx="60" cy="60" rx="46" ry="56" /><path d="M0 60 H120 M0 36 H120 M0 84 H120" /><path d="M0 16 Q60 30 120 16 M0 104 Q60 90 120 104" />
      </g>
      <path d="M20 30 q16 -20 44 -22" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(40 36)">
        <circle r="13" fill="#fff" />
        <path d="M0 -7 a6 6 0 0 1 6 6 c0 4.5 -6 10 -6 10 c0 0 -6 -5.5 -6 -10 a6 6 0 0 1 6 -6z" fill="var(--primary)" /><circle cy="-1" r="2.2" fill="#fff" />
      </g>
    </svg>
  )
}

export function VoiceHubScene() {
  const arcs = [
    "M164 222 C184 226 196 222 207 214",
    "M396 232 C380 236 370 232 361 224",
    "M73 312 C86 340 120 364 150 365",
    "M474 276 C474 322 458 358 430 365",
    "M246 40 C210 40 170 44 150 56",
    "M334 40 C380 40 420 40 450 48",
    "M290 14 V-2",
    "M290 328 V336",
    "M132 292 H187",
  ]
  // where the dotted circle meets each card: Call logged, Incoming call, price, globe, Click-to-call, On call, cloud
  const dots = [[127, 138], [453, 140], [127, 190], [453, 190], [187, 292], [290, 328], [290, -2], [150, 56], [450, 48], [150, 365], [430, 365]]
  return (
    <div className="relative mx-auto flex w-full max-w-[580px] flex-col gap-3 lg:-translate-x-6 sm:block sm:h-[460px] lg:h-full lg:min-h-[460px]">
      {/* backdrop: mint wash, soft waves, thin orbit */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute left-1/2 top-[163px] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full">
          <div className="vv-orbit absolute inset-0"><i className="absolute -top-[4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/60" /><i className="absolute bottom-[30px] left-[22px] h-1.5 w-1.5 rounded-full bg-primary/40" /></div>
        </div>
      </div>

      {/* dotted connectors */}
      <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-[460px] w-[580px] -translate-x-1/2 sm:block" viewBox="0 0 580 460" fill="none" aria-hidden>
        <circle className="vv-flow" cx="290" cy="163" r="165" stroke="var(--primary)" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round" />
        {arcs.map((d) => <path key={d} className="vv-flow" d={d} stroke="var(--primary)" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round" />)}
        {dots.map(([x, y], i) => <circle key={i} className="vv-node" cx={x} cy={y} r="4" fill="#fff" stroke="var(--primary)" strokeWidth="1.8" style={{ animationDelay: `${i * 0.35}s` }} />)}
      </svg>

      {/* cloud phone, top centre */}
      <div className="vv-float hidden sm:absolute sm:left-[234px] sm:top-[4px] sm:block" style={{ animationDelay: "-1.5s" }}>
        <svg viewBox="0 0 124 84" className="h-[74px] w-[110px] drop-shadow-[0_14px_14px_rgba(8,60,48,.16)]" aria-hidden>
          <defs>
            <linearGradient id="vv-cloud" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="78">
              <stop offset="0" stopColor="#f6fffc" />
              <stop offset=".55" stopColor="color-mix(in oklch, var(--primary) 9%, white)" />
              <stop offset="1" stopColor="color-mix(in oklch, var(--primary) 24%, white)" />
            </linearGradient>
            <linearGradient id="vv-cloud-hi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".95" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vv-cloud-ph" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="color-mix(in oklch, var(--primary) 78%, white)" />
              <stop offset="1" stopColor="color-mix(in oklch, var(--primary) 88%, black)" />
            </linearGradient>
          </defs>
          <g fill="#fff" stroke="#fff" strokeWidth="4" strokeLinejoin="round" opacity=".95">
            <circle cx="26" cy="54" r="22" /><circle cx="60" cy="40" r="28" /><circle cx="94" cy="52" r="24" /><rect x="26" y="54" width="68" height="22" />
          </g>
          <g fill="url(#vv-cloud)">
            <circle cx="26" cy="54" r="22" /><circle cx="60" cy="40" r="28" /><circle cx="94" cy="52" r="24" /><rect x="26" y="54" width="68" height="22" />
          </g>
          <path d="M40 24 C46 14 58 10 68 13 C58 15 50 20 46 28Z" fill="url(#vv-cloud-hi)" opacity=".9" />
          <path d="M12 46 C14 40 20 37 26 38 C20 40 16 43 14 48Z" fill="url(#vv-cloud-hi)" opacity=".7" />
          <path d="M22 72 C40 77 78 77 104 68" fill="none" stroke="color-mix(in oklch, var(--primary) 30%, white)" strokeWidth="3" strokeLinecap="round" opacity=".45" />
          <circle cx="60" cy="44" r="25" fill="color-mix(in oklch, var(--primary) 14%, white)" opacity=".9" />
          <circle cx="60" cy="44" r="19" fill="url(#vv-cloud-ph)" />
          <circle cx="60" cy="44" r="19" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" />
          <path d="M48 38 C51 31 62 29 70 33 C62 33 54 35 50 41Z" fill="#fff" opacity=".35" />
          <g transform="translate(49 33) scale(.92)">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="#fff" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
      <svg viewBox="0 0 60 60" className="pointer-events-none absolute left-[546px] top-[6px] hidden h-10 w-10 sm:block" aria-hidden>
        <g stroke="var(--primary)" strokeWidth="4.2" strokeLinecap="round" fill="none">
          <path d="M13.8 25 L17.9 9.6" />
          <path d="M27.2 32.8 L38.5 21.5" />
          <path d="M35 46.2 L50.4 42.1" />
        </g>
      </svg>

      {/* sphere + pedestal, centred on x = 290 */}
      <div className="relative mx-auto h-[190px] w-[232px] sm:absolute sm:left-[174px] sm:top-[80px]">
        <div className="absolute left-0 top-[150px] h-[58px] w-[232px] rounded-[50%] bg-gradient-to-b from-white to-[#dff0ea] shadow-[0_24px_30px_-16px_rgba(15,26,46,.4)] ring-1 ring-white" />
        <div className="absolute left-[16px] top-[158px] h-[40px] w-[200px] rounded-[50%] bg-gradient-to-b from-[#e9f6f1] to-white shadow-[inset_0_2px_4px_rgba(15,26,46,.08)]" />
        <div className="absolute left-[44px] top-[153px] h-[10px] w-[144px] rounded-[50%] bg-white/80 blur-[2px]" />
        <div className="vv-ring absolute left-[34px] top-[160px] h-[34px] w-[164px] rounded-[50%] border-2 border-primary/60 shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_60%,transparent),inset_0_0_14px_color-mix(in_oklch,var(--primary)_40%,transparent)]" />
        <div className="absolute left-[33px] top-0 origin-top-left scale-[1.04]"><Sphere /></div>
        <span className="absolute left-1/2 top-[158px] inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full vv-pill py-1 pl-1 pr-4 text-[12.5px] font-semibold text-[#14233a]"><span className="flex h-6 w-6 items-center justify-center rounded-full vv-3d text-primary-foreground"><Headphones className="h-3.5 w-3.5" /></span>Phone support</span>
      </div>

      {/* top left: the call, logged */}
      <div className="vv-float sm:absolute sm:left-[14px] sm:top-[56px] sm:w-[176px]">
        <div className={`${GLASS} p-3`}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl vv-3d vv-gloss text-primary-foreground"><PhoneCall className="h-4 w-4" /></span>
            <span className="whitespace-nowrap text-[13.5px] font-semibold text-[#14233a]">Call logged</span>
            <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full vv-3d vv-gloss text-primary-foreground"><Check className="h-4 w-4" strokeWidth={3} /></span>
          </div>
          <p className="mt-2.5 flex items-center gap-2 rounded-xl bg-primary/10 px-2.5 py-1.5 text-[12.5px] shadow-[inset_0_1px_2px_rgba(8,60,48,.08)] font-semibold text-primary"><Box className="h-3.5 w-3.5" />Order status</p>
        </div>
      </div>

      {/* top right: incoming call */}
      <div className="vv-float sm:absolute sm:left-[392px] sm:top-[48px] sm:w-[176px]" style={{ animationDelay: "-2s" }}>
        <div className={`${GLASS} p-3`}>
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5b942] text-[14px] font-bold text-white shadow-[0_6px_10px_-4px_rgba(224,138,0,.6)]">J</span>
            <span className="min-w-0 leading-tight"><span className="block text-[13.5px] font-semibold text-[#14233a]">Incoming call</span><span className="block truncate text-[11px] text-muted-foreground">Jessica Chen</span></span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fdecec] px-2 py-1.5 text-[11px] font-semibold text-[#c93a3f]"><Phone className="h-3 w-3 rotate-[135deg]" />Decline</span>
            <span className="relative ml-auto inline-flex items-center gap-1.5 rounded-full vv-3d px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground"><i className="vv-ripple absolute inset-0 rounded-full bg-primary/50" /><Phone className="vv-shake relative h-3 w-3" /><span className="relative">Answer</span></span>
          </div>
        </div>
      </div>

      {/* left: outbound price, then click-to-call */}
      <div className="vv-float hidden sm:absolute sm:left-[14px] sm:top-[190px] sm:block sm:w-[154px]" style={{ animationDelay: "-1s" }}>
        <div className={`${GLASS} flex items-center gap-2.5 p-3`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><PhoneOutgoing className="h-[18px] w-[18px]" /></span>
          <span className="whitespace-nowrap leading-tight"><span className="block text-[17px] font-bold text-[#14233a]">$0.008</span><span className="block text-[10px] text-muted-foreground">per min outbound</span></span>
        </div>
      </div>
      <span className="hidden items-center gap-2 whitespace-nowrap rounded-full vv-pill px-4 py-2.5 text-[12.5px] font-semibold text-[#14233a] sm:absolute sm:left-[14px] sm:top-[272px] sm:inline-flex"><MousePointerClick className="h-4 w-4 text-primary" />Click-to-call</span>

      {/* right: globe with the two number prices */}
      <div className="vv-float hidden sm:absolute sm:left-[380px] sm:top-[190px] sm:block sm:w-[188px]" style={{ animationDelay: "-3s" }}>
        <div className={`${GLASS} flex items-center gap-2 p-2.5`}>
          <span className="block h-[58px] w-[58px] shrink-0 [&>svg]:h-full [&>svg]:w-full"><Globe /></span>
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="whitespace-nowrap rounded-xl vv-pill px-2 py-1.5 text-center text-[11px] font-semibold text-[#14233a]">Local $5/mo</span>
            <span className="whitespace-nowrap rounded-xl vv-pill px-2 py-1.5 text-center text-[11px] font-semibold text-[#14233a]">Toll-free $15/mo</span>
          </span>
        </div>
      </div>

      {/* bottom: the live call */}
      <div className="sm:absolute sm:left-[150px] sm:top-[336px] sm:w-[280px]">
        <div className={`${GLASS} flex items-center gap-3 px-3.5 py-3`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full vv-3d vv-gloss text-primary-foreground"><Mic className="h-[18px] w-[18px]" /></span>
          <span className="leading-tight"><span className="block text-[13px] font-semibold text-[#14233a]">On call</span><span className="block font-mono text-[11px] text-muted-foreground">0:<span className="vv-timer" /></span></span>
          <span aria-hidden className="h-8 w-px bg-border" />
          <div className="flex h-9 flex-1 items-center justify-center gap-[3px] overflow-hidden">
            {BARS.map((h, i) => <i key={i} className="vv-bar w-[3px] shrink-0 rounded-full bg-primary" style={{ height: h * 1.4, animationDelay: `${(i % 9) * -0.12}s`, animationDuration: `${0.7 + (i % 6) * 0.1}s` }} />)}
          </div>
        </div>
      </div>
      <span className="inline-flex items-center gap-2 self-center whitespace-nowrap rounded-full vv-pill px-4 py-2 text-[12.5px] font-semibold text-[#14233a] sm:absolute sm:left-1/2 sm:top-[414px] sm:-translate-x-1/2"><Tag className="h-4 w-4 text-primary" />30–40% below telecom pricing</span>
      <style>{CSS}</style>
    </div>
  )
}

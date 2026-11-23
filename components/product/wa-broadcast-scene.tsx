import { BadgeCheck, Check, CheckCheck, Megaphone, Sparkles } from "lucide-react"

// Hero graphic for /channels/whatsapp-broadcasting, built around the one thing everyone knows about WhatsApp: the ticks. On the left is
// the broadcast itself, a real-looking WhatsApp template message (photo, text with a name field, two buttons). Its own ticks change from
// one grey tick, to two grey, to two blue as the loop runs. On the right is a WhatsApp-style chat list of six customers. The same
// message lands in every row and each row's ticks go grey, double grey and then blue in a wave, so one broadcast is seen reaching and
// being read by everyone. A strip on top names the three stages (Sent, Delivered, Read). Then one customer, Priya, replies, her row
// gets an unread badge, and the AI agent answers in the same row. HTML and CSS only, no scripts, so it is a server component. Silent,
// looping. No clock times (a chat list normally has them, this one does not), no prices, no stats.

const LOOP = 20
const BLUE = "#53bdeb"
const GREY = "#9aa8b4"

const ROWS = [
  { n: "Aarav Shah", c: "#6366f1" },
  { n: "Priya Menon", c: "#0e9f6e" },
  { n: "Imran Khan", c: "#f59e0b" },
  { n: "Meera Iyer", c: "#ec4899" },
  { n: "Kabir Rao", c: "#2f78bd" },
  { n: "Sana Qureshi", c: "#14b8a6" },
]

const win = (cls: string, a: number, b: number, from = "translateY(10px)") =>
  `@keyframes ${cls}k { 0%, ${a - 1}% { opacity: 0; transform: ${from} } ${a + 2}%, ${b}% { opacity: 1; transform: none } ${b + 2}%, 100% { opacity: 0; transform: none } }
.${cls} { opacity: 0; animation: ${cls}k ${LOOP}s cubic-bezier(.2,.8,.3,1.05) infinite }`

const CSS = [
  win("wa-bub", 1, 96, "translateY(22px) scale(.95)"),
  win("wa-list", 4, 96, "translateX(24px)"),
  // the ticks of the big message
  `@keyframes wa-t1 { 0%, 8% { opacity: 0 } 10%, 22% { opacity: 1 } 24%, 100% { opacity: 0 } }
@keyframes wa-t2 { 0%, 22% { opacity: 0 } 24%, 40% { opacity: 1 } 42%, 100% { opacity: 0 } }
@keyframes wa-t3 { 0%, 40% { opacity: 0 } 42%, 96% { opacity: 1 } 99%, 100% { opacity: 0 } }
.wa-t1 { opacity: 0; animation: wa-t1 ${LOOP}s ease-out infinite }
.wa-t2 { opacity: 0; animation: wa-t2 ${LOOP}s ease-out infinite }
.wa-t3 { opacity: 0; animation: wa-t3 ${LOOP}s cubic-bezier(.3,1.6,.5,1) infinite }`,
  // the three-stage strip
  ...[0, 1, 2].map((k) => {
    const a = [10, 24, 42][k]
    return `@keyframes wa-s${k} { 0%, ${a - 1}% { background: #e9edf0; color: #5b6b78 } ${a + 2}%, 96% { background: ${["#d9fdd3", "#d9fdd3", "#d6f0fb"][k]}; color: ${["#0b6b47", "#0b6b47", "#1c6f96"][k]} } 99%, 100% { background: #e9edf0; color: #5b6b78 } }
.wa-s${k} { background: #e9edf0; color: #5b6b78; animation: wa-s${k} ${LOOP}s ease-out infinite }`
  }),
  `@keyframes wa-btn { 0%, 48% { background: #fff } 50%, 54% { background: #d9fdd3 } 56%, 100% { background: #fff } }
.wa-btn { animation: wa-btn ${LOOP}s ease-out infinite }`,
  // each row of the chat list: slide in, then grey tick, double grey, blue
  ...ROWS.flatMap((_, i) => {
    const a = 12 + i * 3.4
    return [
      win(`wa-r${i}`, 6 + i * 2, 96, "translateX(18px)"),
      `@keyframes wa-a${i} { 0%, ${a}% { opacity: 0 } ${a + 1}%, ${a + 8}% { opacity: 1 } ${a + 9}%, 100% { opacity: 0 } }
@keyframes wa-b${i} { 0%, ${a + 8}% { opacity: 0 } ${a + 9}%, ${a + 18}% { opacity: 1 } ${a + 19}%, 100% { opacity: 0 } }
@keyframes wa-c${i} { 0%, ${a + 18}% { opacity: 0; transform: scale(.5) } ${a + 20}%, 96% { opacity: 1; transform: scale(1) } 99%, 100% { opacity: 0 } }
.wa-a${i} { opacity: 0; animation: wa-a${i} ${LOOP}s linear infinite }
.wa-b${i} { opacity: 0; animation: wa-b${i} ${LOOP}s linear infinite }
.wa-c${i} { opacity: 0; animation: wa-c${i} ${LOOP}s cubic-bezier(.3,1.6,.5,1) infinite }`,
    ]
  }),
  // Priya's row: a reply with an unread badge, then the AI agent answers
  `@keyframes wa-p0 { 0%, 62% { opacity: 1 } 64%, 100% { opacity: 0 } }
@keyframes wa-p1 { 0%, 62% { opacity: 0 } 64%, 75% { opacity: 1 } 77%, 100% { opacity: 0 } }
@keyframes wa-p2 { 0%, 75% { opacity: 0 } 77%, 96% { opacity: 1 } 99%, 100% { opacity: 0 } }
.wa-p0 { animation: wa-p0 ${LOOP}s ease-out infinite }
.wa-p1 { opacity: 0; animation: wa-p1 ${LOOP}s ease-out infinite }
.wa-p2 { opacity: 0; animation: wa-p2 ${LOOP}s ease-out infinite }
@keyframes wa-badge { 0%, 63% { opacity: 0; transform: scale(.3) } 66%, 75% { opacity: 1; transform: scale(1) } 77%, 100% { opacity: 0; transform: scale(.6) } }
.wa-badge { opacity: 0; animation: wa-badge ${LOOP}s cubic-bezier(.3,1.7,.5,1) infinite }
@keyframes wa-row1 { 0%, 62% { background-color: transparent } 64%, 77% { background-color: #f0fbf4 } 80%, 100% { background-color: transparent } }
.wa-row1 { animation: wa-row1 ${LOOP}s ease-out infinite }
@keyframes wa-fl { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
.wa-fl1 { animation: wa-fl 7s ease-in-out infinite }
.wa-fl2 { animation: wa-fl 8.5s ease-in-out -3s infinite }
@keyframes wa-blob { 0%, 100% { transform: translate(0, 0) scale(1) } 50% { transform: translate(16px, -12px) scale(1.1) } }
.wa-blob { animation: wa-blob 11s ease-in-out infinite }`,
  `@media (prefers-reduced-motion: reduce) {
  .wa-bub, .wa-list, .wa-t3, .wa-p2 { animation: none; opacity: 1; transform: none } .wa-t1, .wa-t2, .wa-p0, .wa-p1, .wa-badge { animation: none; opacity: 0 }
  ${ROWS.map((_, i) => `.wa-r${i}, .wa-c${i}`).join(", ")} { animation: none; opacity: 1; transform: none } ${ROWS.map((_, i) => `.wa-a${i}, .wa-b${i}`).join(", ")} { animation: none; opacity: 0 }
  .wa-s0, .wa-s1, .wa-s2 { animation: none; background: #d9fdd3; color: #0b6b47 } .wa-btn, .wa-row1, .wa-fl1, .wa-fl2, .wa-blob { animation: none }
}`,
].join("\n")

const SH = "0 0 0 1px rgba(15,42,71,.07), 0 34px 50px -26px rgba(15,42,71,.45)"

function Ticks({ i }: { i: number }) {
  return (
    <span className="relative inline-block h-4 w-5">
      <Check className={`wa-a${i} absolute inset-0 h-4 w-4`} style={{ color: GREY }} strokeWidth={2.6} />
      <CheckCheck className={`wa-b${i} absolute inset-0 h-4 w-5`} style={{ color: GREY }} strokeWidth={2.6} />
      <CheckCheck className={`wa-c${i} absolute inset-0 h-4 w-5`} style={{ color: BLUE }} strokeWidth={2.6} />
    </span>
  )
}

export function WaBroadcastScene() {
  const label = "One WhatsApp broadcast reaching everyone, shown with WhatsApp's ticks. On the left is the broadcast, a template message with a photo, a name field and two buttons, whose ticks change from one grey, to two grey, to two blue. On the right is a chat list of six customers where the same message lands in every row and each row's ticks go grey, double grey and then blue in a wave. A strip names the stages Sent, Delivered and Read. Then one customer replies, her row gets an unread badge, and the AI agent answers in the same row"
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div role="img" aria-label={label} className="relative mx-auto h-[330px] w-[343px] sm:h-[520px] sm:w-[560px]">
        <div className="absolute left-0 top-0 h-[520px] w-[560px] origin-top-left scale-[.612] sm:scale-100">
          <i aria-hidden className="wa-blob absolute -left-4 top-24 h-[260px] w-[260px] rounded-full" style={{ background: "rgba(37,211,102,.28)", filter: "blur(56px)" }} />
          <i aria-hidden className="wa-blob absolute right-0 top-4 h-[240px] w-[240px] rounded-full" style={{ background: "rgba(47,120,189,.2)", filter: "blur(56px)", animationDelay: "-4s" }} />

          {/* the stage strip */}
          <div className="absolute left-0 top-0 flex w-full items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-full bg-[#0f2a47] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-lg">{/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/channels/whatsapp.svg" alt="" width={16} height={16} className="h-4 w-4" />One broadcast</span>
            {["Sent", "Delivered", "Read"].map((t, k) => <span key={t} className={`wa-s${k} flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold`}>{k === 0 ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <CheckCheck className="h-3.5 w-3.5" strokeWidth={3} />}{t}</span>)}
          </div>

          {/* the broadcast: a WhatsApp chat with a template message in it */}
          <div className="wa-fl1 absolute left-0 top-[84px] w-[256px]">
            <div className="wa-bub overflow-hidden rounded-[22px]" style={{ boxShadow: SH, background: "#efe7dd" }}>
              {/* WhatsApp chat header */}
              <div className="flex items-center gap-2.5 bg-[#075e54] px-3 py-2.5 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-bold text-[#075e54]">U</span>
                <span className="leading-tight"><span className="flex items-center gap-1 text-[13px] font-semibold">Urban Cart <BadgeCheck className="h-3.5 w-3.5 text-[#25d366]" /></span><span className="block text-[10.5px] text-white/70">Business account</span></span>
              </div>
              {/* chat wallpaper with the message */}
              <div className="relative px-2.5 pb-3 pt-3" style={{ backgroundImage: "radial-gradient(rgba(15,42,71,.07) 1.2px, transparent 1.2px)", backgroundSize: "14px 14px" }}>
                <div className="relative rounded-2xl rounded-tl-md bg-[#d9fdd3] p-1.5" style={{ boxShadow: "0 1px 0 rgba(15,42,71,.12)" }}>
                  <div className="overflow-hidden rounded-xl bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/home/p-tshirt.webp" alt="" width={400} height={240} className="h-[112px] w-full object-cover" />
                    <div className="px-3 pb-2 pt-2.5">
                      <p className="text-[14px] font-semibold text-[#0f2a47]">Order shipped ✅</p>
                      <p className="mt-1 text-[12.5px] leading-snug text-[#0f2a47]/75">Hi <span className="font-semibold text-[#0b6b47]">{"{{name}}"}</span>, your cotton T-shirt has shipped and arrives by Friday. Tap below to track it.</p>
                      <p className="mt-1.5 flex items-center justify-end">
                        <span className="relative inline-block h-4 w-5">
                          <Check className="wa-t1 absolute inset-0 h-4 w-4" style={{ color: GREY }} strokeWidth={2.6} />
                          <CheckCheck className="wa-t2 absolute inset-0 h-4 w-5" style={{ color: GREY }} strokeWidth={2.6} />
                          <CheckCheck className="wa-t3 absolute inset-0 h-4 w-5" style={{ color: BLUE }} strokeWidth={2.6} />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 divide-y divide-[#0f2a47]/8 overflow-hidden rounded-xl bg-white text-center text-[13px] font-semibold text-[#0a7cff]">
                    <span className="wa-btn block py-2">Track order</span>
                    <span className="block py-2">Contact support</span>
                  </div>
                  <i aria-hidden className="absolute -left-[7px] top-0 h-3 w-3" style={{ background: "#d9fdd3", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                </div>
              </div>
            </div>
            <p className="wa-bub mt-3 flex items-center gap-1.5 pl-1 text-[12.5px] font-semibold text-[#0f2a47]/70"><Sparkles className="h-3.5 w-3.5 text-[#25d366]" />One template, a message for every contact</p>
          </div>

          {/* the chat list: the same message in every row */}
          <div className="wa-fl2 absolute left-[262px] top-[54px] w-[298px]">
            <div className="wa-list overflow-hidden rounded-[22px] bg-white" style={{ boxShadow: SH }}>
              <div className="flex items-center gap-2 bg-[#075e54] px-4 py-3 text-[14px] font-semibold text-white">{/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/channels/whatsapp.svg" alt="" width={24} height={24} className="h-6 w-6 rounded-full bg-white p-0.5" />WhatsApp · Customers</div>
              {ROWS.map((r, i) => (
                <div key={r.n} className={`wa-r${i} relative isolate flex items-center gap-3 border-b border-[#0f2a47]/6 px-4 py-2.5 last:border-0`} style={{ height: 66 }}>
                  {i === 1 ? <i aria-hidden className="wa-row1 absolute inset-0 -z-10" /> : null}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white" style={{ background: r.c }}>{r.n[0]}</span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[13.5px] font-semibold text-[#0f2a47]">{r.n}</span>
                    {i === 1 ? (
                      <span className="relative mt-0.5 block h-[18px] text-[12px] text-[#0f2a47]/60">
                        <span className="wa-p0 absolute inset-0 flex items-center gap-1 truncate"><Ticks i={i} />Order shipped ✅</span>
                        <span className="wa-p1 absolute inset-0 truncate font-semibold text-[#0f2a47]">When will it arrive?</span>
                        <span className="wa-p2 absolute inset-0 flex items-center gap-1 truncate text-[#0b6b47]"><Sparkles className="h-3.5 w-3.5 shrink-0" />AI: Arriving by Friday.</span>
                      </span>
                    ) : (
                      <span className="mt-0.5 flex items-center gap-1 truncate text-[12px] text-[#0f2a47]/60"><Ticks i={i} />Order shipped ✅</span>
                    )}
                  </span>
                  {i === 1 ? <span className="wa-badge flex h-5 min-w-5 items-center justify-center rounded-full bg-[#25d366] px-1 text-[11px] font-bold text-white">1</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}

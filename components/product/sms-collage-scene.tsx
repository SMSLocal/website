import { BadgeCheck, Ban, Check, CheckCheck, FileCheck2, Send, Sparkles, UserRound } from "lucide-react"

// Hero graphic for /channels/sms-broadcasting: a collage of floating glass cards over soft colour glows, drawn like the product's own
// screens. The message card shows one campaign SMS that is typed out, with a name that keeps changing (Rahul, Priya, Imran). A checklist
// card ticks off DLT sender ID, template approved and opt-outs removed. A paper plane flies from the message to a delivery card whose
// ring fills up, rings out and turns into "Delivered". Then the replies card plays three different conversations one after another,
// each with a typing indicator before the answer: a customer asks about a store and the AI agent answers; a customer sends STOP and is
// unsubscribed; a customer asks for a person and is handed to the team. Each card floats and sways on its own rhythm. HTML, SVG and CSS
// only, no scripts, so it is a server component. Silent, looping. No clock times, no prices, no stats.

const LOOP = 26

const CHATS: { who: string; q: string; kind: "ai" | "stop" | "hand"; a: string; tag: string }[] = [
  { who: "Rahul", q: "Is the offer valid at the Koramangala store?", kind: "ai", a: "Yes, it is valid at every store till Sunday.", tag: "AI agent" },
  { who: "Priya", q: "STOP", kind: "stop", a: "You are unsubscribed. We will not text you again.", tag: "Opt-out handled" },
  { who: "Imran", q: "Can I talk to someone about a bulk order?", kind: "hand", a: "Sure, I am connecting you to our sales team.", tag: "AI agent" },
]
const S = [34, 54, 74] // each chat's start, in percent of the loop

const win = (cls: string, a: number, b: number, from = "translateY(10px) scale(.97)") =>
  `@keyframes ${cls}k { 0%, ${a - 1}% { opacity: 0; transform: ${from} } ${a + 2}%, ${b}% { opacity: 1; transform: none } ${b + 2}%, 100% { opacity: 0; transform: none } }
.${cls} { opacity: 0; animation: ${cls}k ${LOOP}s cubic-bezier(.2,.8,.3,1.05) infinite }`

const CSS = [
  win("co-in-a", 1, 96, "translateY(22px) scale(.95)"),
  win("co-in-c", 6, 96, "translateY(22px) scale(.95)"),
  win("co-in-b", 22, 96, "translateY(22px) scale(.95)"),
  win("co-in-d", 31, 96, "translateY(22px) scale(.95)"),
  // the message is typed out
  `@keyframes co-type { 0%, 2% { clip-path: inset(0 100% 0 0) } 8%, 100% { clip-path: inset(0 0 0 0) } }
.co-type { clip-path: inset(0 100% 0 0); animation: co-type ${LOOP}s steps(26, end) infinite }`,
  // the three checks
  ...[0, 1, 2].map((i) => {
    const a = 9 + i * 4
    return `@keyframes co-chk${i} { 0%, ${a}% { opacity: 0; transform: scale(.3) rotate(-30deg) } ${a + 2.5}%, 96% { opacity: 1; transform: none } 99.5%, 100% { opacity: 0 } }
.co-chk${i} { opacity: 0; animation: co-chk${i} ${LOOP}s cubic-bezier(.3,1.6,.5,1) infinite }
@keyframes co-row${i} { 0%, ${a}% { background-color: transparent } ${a + 1.5}%, ${a + 5}% { background-color: rgba(14,159,110,.12) } ${a + 7}%, 100% { background-color: transparent } }
.co-row${i} { animation: co-row${i} ${LOOP}s ease-out infinite }`
  }),
  // the name changing in the message
  ...[0, 1, 2].map((i) => {
    const a = i * 33
    return `@keyframes co-n${i} { 0%, ${a}% { opacity: ${i === 0 ? 1 : 0} } ${a + 2}%, ${a + 31}% { opacity: 1 } ${a + 33}%, 100% { opacity: ${i === 2 ? 1 : 0} } }
.co-n${i} { opacity: ${i === 0 ? 1 : 0}; animation: co-n${i} ${LOOP}s ease-in-out infinite }`
  }),
  // the plane, the ring and the pings
  `@keyframes co-plane { 0%, 17% { opacity: 0; transform: translate(0, 0) rotate(8deg) scale(.6) } 19% { opacity: 1 } 26% { opacity: 1; transform: translate(150px, -92px) rotate(-14deg) scale(1.05) } 28%, 100% { opacity: 0; transform: translate(160px, -98px) rotate(-14deg) scale(.6) } }
.co-plane { opacity: 0; animation: co-plane ${LOOP}s cubic-bezier(.4,.1,.3,1) infinite }
@keyframes co-trail { 0%, 17% { opacity: 0; transform: translate(0, 0) scale(.4) } 21% { opacity: .8 } 27%, 100% { opacity: 0; transform: translate(130px, -80px) scale(1) } }
.co-trail { opacity: 0; animation: co-trail ${LOOP}s ease-out infinite }
@keyframes co-ring { 0%, 26% { stroke-dashoffset: 226 } 38%, 96% { stroke-dashoffset: 12 } 99.5%, 100% { stroke-dashoffset: 226 } }
.co-ring { stroke-dasharray: 226; stroke-dashoffset: 226; animation: co-ring ${LOOP}s ease-out infinite }
@keyframes co-spin { 0%, 26% { transform: rotate(0) } 38%, 100% { transform: rotate(360deg) } }
.co-spin { transform-origin: 46px 46px; animation: co-spin ${LOOP}s ease-out infinite }
@keyframes co-done { 0%, 38% { opacity: 0; transform: scale(.4) } 42%, 96% { opacity: 1; transform: scale(1) } 99.5%, 100% { opacity: 0 } }
.co-done { opacity: 0; animation: co-done ${LOOP}s cubic-bezier(.3,1.6,.5,1) infinite }
@keyframes co-ping { 0%, 38% { opacity: 0; transform: scale(.5) } 40% { opacity: .6 } 50%, 100% { opacity: 0; transform: scale(1.9) } }
.co-ping { opacity: 0; animation: co-ping ${LOOP}s ease-out infinite }`,
  // the three chats
  ...CHATS.map((c, k) => {
    const s = S[k]
    const e = s + 18
    return [
      win(`co-c${k}`, s, e, "translateY(6px)"),
      win(`co-q${k}`, s + 1.5, e, "translateY(12px) scale(.96)"),
      `@keyframes co-d${k} { 0%, ${s + 6}% { opacity: 0; transform: scale(.8) } ${s + 7}%, ${s + 10}% { opacity: 1; transform: scale(1) } ${s + 11}%, 100% { opacity: 0; transform: scale(.8) } }
.co-d${k} { opacity: 0; animation: co-d${k} ${LOOP}s ease-out infinite }`,
      win(`co-a${k}`, s + 10, e, "translateY(12px) scale(.96)"),
      win(`co-x${k}`, s + 13.5, e, "translateY(12px)"),
    ].join("\n")
  }),
  `@keyframes co-dot { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-4px); opacity: 1 } }
.co-dot { animation: co-dot .8s ease-in-out infinite }
@keyframes co-live { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: .4; transform: scale(1.5) } }
.co-live { animation: co-live 1.4s ease-in-out infinite }
@keyframes co-fl { 0%, 100% { transform: translateY(0) rotate(-.6deg) } 50% { transform: translateY(-10px) rotate(.6deg) } }
.co-fl1 { animation: co-fl 7s ease-in-out infinite }
.co-fl2 { animation: co-fl 8.5s ease-in-out -2s infinite }
.co-fl3 { animation: co-fl 6.5s ease-in-out -4s infinite }
.co-fl4 { animation: co-fl 9s ease-in-out -1s infinite }
@keyframes co-blob { 0%, 100% { transform: translate(0, 0) scale(1) } 50% { transform: translate(18px, -12px) scale(1.12) } }
.co-blob { animation: co-blob 11s ease-in-out infinite }
@keyframes co-shine { 0%, 40% { transform: translateX(-120%) } 55%, 100% { transform: translateX(220%) } }
.co-shine { animation: co-shine 6s ease-in-out infinite }`,
  `@media (prefers-reduced-motion: reduce) {
  .co-in-a, .co-in-b, .co-in-c, .co-in-d, .co-chk0, .co-chk1, .co-chk2, .co-done, .co-c0, .co-q0, .co-a0, .co-x0 { animation: none; opacity: 1; transform: none }
  .co-type { animation: none; clip-path: none } .co-n0 { animation: none; opacity: 1 } .co-n1, .co-n2, .co-plane, .co-trail, .co-ping, .co-d0, .co-c1, .co-c2 { animation: none; opacity: 0 }
  .co-ring { animation: none; stroke-dashoffset: 12 } .co-spin, .co-row0, .co-row1, .co-row2, .co-shine { animation: none } .co-x1, .co-x2 { display: none }
  .co-fl1, .co-fl2, .co-fl3, .co-fl4, .co-blob, .co-dot, .co-live { animation: none }
}`,
].join("\n")

const CARD = "rounded-[22px] bg-white/90 backdrop-blur"
const SH = "0 0 0 1px rgba(255,255,255,.9) inset, 0 0 0 1px rgba(15,42,71,.07), 0 34px 50px -26px rgba(15,42,71,.45)"

export function SmsCollageScene() {
  const label = "A collage of floating cards showing one SMS broadcast. A message card types out a campaign SMS whose name changes from Rahul to Priya to Imran. A checklist card ticks DLT sender ID, template approved and opt-outs removed. A paper plane flies to a delivery card whose ring fills up and turns into Delivered. Then a replies card plays three different conversations, each with a typing indicator: a customer asks about a store and the AI agent answers, a customer sends STOP and is unsubscribed, and a customer asks for a person and is handed to the sales team"
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div role="img" aria-label={label} className="relative mx-auto h-[330px] w-[343px] sm:h-[520px] sm:w-[560px]">
        <div className="absolute left-0 top-0 h-[520px] w-[560px] origin-top-left scale-[.612] sm:scale-100">
          {/* soft colour glows */}
          <i aria-hidden className="co-blob absolute -left-6 top-10 h-[260px] w-[260px] rounded-full" style={{ background: "rgba(14,159,110,.3)", filter: "blur(54px)" }} />
          <i aria-hidden className="co-blob absolute right-0 top-0 h-[240px] w-[240px] rounded-full" style={{ background: "rgba(47,120,189,.26)", filter: "blur(54px)", animationDelay: "-3s" }} />
          <i aria-hidden className="co-blob absolute bottom-0 left-[26%] h-[240px] w-[260px] rounded-full" style={{ background: "rgba(124,58,237,.18)", filter: "blur(58px)", animationDelay: "-6s" }} />

          {/* A · the campaign message */}
          <div className="co-fl1 absolute left-[6px] top-[66px] w-[318px]">
            <div className={`co-in-a ${CARD} p-5`} style={{ boxShadow: SH }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e9f6e] text-white"><Send className="h-5 w-5" /></span>
                <span className="leading-tight"><b className="block text-[15px] text-[#0f2a47]">Diwali offer</b><span className="text-[12px] text-[#0f2a47]/55">SMS campaign · AD-SMSLCL</span></span>
              </div>
              <div className="mt-4 rounded-2xl rounded-bl-md bg-[#eef3f6] p-3.5 text-[14.5px] leading-snug text-[#0f2a47]">
                <span className="co-type block">
                  Hi <span className="relative inline-block min-w-[58px] align-baseline">
                    {["Rahul", "Priya", "Imran"].map((n, k) => <span key={n} className={`co-n${k} ${k === 0 ? "" : "absolute left-0 top-0"} rounded-md bg-[#d9f3e6] px-1.5 font-semibold text-[#0b7a55]`}>{n}</span>)}
                  </span>, your Diwali offer ends Sunday. Shop now: smsl.in/d4x9
                </span>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-[#0f2a47]/60"><UserRound className="h-3.5 w-3.5" />Personal for every contact</p>
            </div>
          </div>

          {/* C · the checks */}
          <div className="co-fl2 absolute left-[344px] top-[196px] w-[196px]">
            <div className={`co-in-c ${CARD} relative overflow-hidden p-4`} style={{ boxShadow: SH }}>
              <i aria-hidden className="co-shine pointer-events-none absolute inset-y-0 left-0 w-1/3" style={{ background: "linear-gradient(100deg, transparent, rgba(255,255,255,.7), transparent)" }} />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f2a47]/50">Before it sends</p>
              <ul className="mt-2.5 space-y-1.5 text-[13px] font-semibold text-[#0f2a47]">
                {[{ I: BadgeCheck, t: "DLT sender ID" }, { I: FileCheck2, t: "Template approved" }, { I: Ban, t: "Opt-outs removed" }].map((c, i) => (
                  <li key={c.t} className={`co-row${i} -mx-1.5 flex items-center gap-2 rounded-lg px-1.5 py-1`}><c.I className="h-4 w-4 text-[#0f2a47]/55" />{c.t}<span className={`co-chk${i} ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#0e9f6e] text-white`}><Check className="h-3 w-3" strokeWidth={3.5} /></span></li>
                ))}
              </ul>
            </div>
          </div>

          {/* the plane that carries the send from the message to the delivery card, with a little trail */}
          <div className="absolute left-[262px] top-[210px]">
            {[0, 1, 2].map((k) => <i key={k} className="co-trail absolute left-2 top-2 h-2 w-2 rounded-full bg-[#34d399]" style={{ animationDelay: `${k * 0.18}s` }} />)}
            <Send className="co-plane h-8 w-8 text-[#0f2a47] drop-shadow-lg" />
          </div>

          {/* B · delivery ring */}
          <div className="co-fl3 absolute left-[352px] top-[20px] w-[180px]">
            <div className={`co-in-b ${CARD} p-4 text-center`} style={{ boxShadow: SH }}>
              <div className="relative mx-auto h-[92px] w-[92px]">
                <i className="co-ping absolute inset-0 rounded-full border-2 border-[#0e9f6e]" />
                <i className="co-ping absolute inset-0 rounded-full border-2 border-[#0e9f6e]" style={{ animationDelay: ".25s" }} />
                <svg viewBox="0 0 92 92" className="h-full w-full -rotate-90"><g className="co-spin"><circle cx="46" cy="46" r="36" fill="none" stroke="#0f2a47" strokeOpacity=".08" strokeWidth="9" /><circle className="co-ring" cx="46" cy="46" r="36" fill="none" stroke="#0e9f6e" strokeWidth="9" strokeLinecap="round" /></g></svg>
                <span className="co-done absolute inset-0 flex items-center justify-center"><CheckCheck className="h-9 w-9 text-[#0e9f6e]" /></span>
              </div>
              <p className="mt-2 text-[15px] font-semibold text-[#0f2a47]">Delivered</p>
              <p className="text-[11.5px] text-[#0f2a47]/55">A receipt for every number</p>
            </div>
          </div>

          {/* D · replies: three different conversations, one after another */}
          <div className="co-fl4 absolute left-[14px] top-[330px] w-[322px]">
            <div className={`co-in-d ${CARD} p-4`} style={{ boxShadow: SH }}>
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f2a47]/50"><i className="co-live h-2 w-2 rounded-full bg-[#0e9f6e]" />Replies, answered live</p>
              <div className="mt-2.5 grid" style={{ minHeight: 138 }}>
                {CHATS.map((c, k) => (
                  <div key={c.who} className={`co-c${k} space-y-2`} style={{ gridArea: "1 / 1" }}>
                    <div className={`co-q${k} ml-auto w-[86%] rounded-2xl rounded-br-md bg-[#ede9fe] px-3.5 py-2 text-[13px] text-[#0f2a47]`}>
                      <b className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#7c3aed]">{c.who} replied</b>{c.q}
                    </div>
                    <div className="relative">
                      <span className={`co-d${k} absolute left-0 top-1 flex gap-1 rounded-2xl rounded-bl-md bg-[#e9edf2] px-3 py-2.5`}>{[0, 1, 2].map((d) => <i key={d} className="co-dot h-1.5 w-1.5 rounded-full bg-[#0f2a47]/60" style={{ animationDelay: `${d * 0.15}s` }} />)}</span>
                      <div className={`co-a${k} w-[86%] rounded-2xl rounded-bl-md px-3.5 py-2 text-[13px] ${c.kind === "stop" ? "bg-[#f1f5f8] text-[#0f2a47]" : "bg-[#0e9f6e] text-white"}`}>
                        <b className={`flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em] ${c.kind === "stop" ? "text-[#0b7a55]" : "text-white/85"}`}>{c.kind === "stop" ? <Ban className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}{c.tag}</b>{c.a}
                      </div>
                    </div>
                    {c.kind === "hand" ? <div className={`co-x${k} flex items-center gap-2 rounded-xl bg-[#e0f4ea] px-3 py-1.5 text-[12px] font-semibold text-[#0b7a55]`}><UserRound className="h-3.5 w-3.5" />Handed to Meera in sales, with the whole thread</div> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}

import { BadgeCheck, Bot, Lock, Star } from "lucide-react"

/**
 * Hero visual for /products: a thin-bezel phone whose screen cycles through the
 * products (Bulk SMS, WhatsApp, RCS, OTP, AI Agents) with a plain label row
 * underneath that follows along. Pure CSS; reduced-motion visitors see the first screen.
 */

const CSS = `
@keyframes ps0 { 0%,17%{opacity:1} 20%,96%{opacity:0} 100%{opacity:1} }
@keyframes ps1 { 0%,18%{opacity:0} 22%,37%{opacity:1} 40%,100%{opacity:0} }
@keyframes ps2 { 0%,38%{opacity:0} 42%,57%{opacity:1} 60%,100%{opacity:0} }
@keyframes ps3 { 0%,58%{opacity:0} 62%,77%{opacity:1} 80%,100%{opacity:0} }
@keyframes ps4 { 0%,78%{opacity:0} 82%,97%{opacity:1} 100%{opacity:0} }
@keyframes pc0 { 0%,17%{background-color:#0f172a;color:#fff} 20%,96%{background-color:#f1f5f9;color:#64748b} 100%{background-color:#0f172a;color:#fff} }
@keyframes pc1 { 0%,18%{background-color:#f1f5f9;color:#64748b} 22%,37%{background-color:#0f172a;color:#fff} 40%,100%{background-color:#f1f5f9;color:#64748b} }
@keyframes pc2 { 0%,38%{background-color:#f1f5f9;color:#64748b} 42%,57%{background-color:#0f172a;color:#fff} 60%,100%{background-color:#f1f5f9;color:#64748b} }
@keyframes pc3 { 0%,58%{background-color:#f1f5f9;color:#64748b} 62%,77%{background-color:#0f172a;color:#fff} 80%,100%{background-color:#f1f5f9;color:#64748b} }
@keyframes pc4 { 0%,78%{background-color:#f1f5f9;color:#64748b} 82%,97%{background-color:#0f172a;color:#fff} 100%{background-color:#f1f5f9;color:#64748b} }
.ps{opacity:0;animation-duration:15s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
.ps0{animation-name:ps0}.ps1{animation-name:ps1}.ps2{animation-name:ps2}.ps3{animation-name:ps3}.ps4{animation-name:ps4}
.pc{animation-duration:15s;animation-timing-function:linear;animation-iteration-count:infinite}
.pc0{animation-name:pc0}.pc1{animation-name:pc1}.pc2{animation-name:pc2}.pc3{animation-name:pc3}.pc4{animation-name:pc4}
@media (prefers-reduced-motion: reduce){
  .ps,.pc{animation:none}
  .ps0{opacity:1}
  .pc0{background-color:#0f172a;color:#fff}
}
`

const LABELS = ["Bulk SMS", "WhatsApp", "RCS", "OTP", "AI Agents"]

const Slide = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className={`ps ps${n} absolute inset-0 flex flex-col`}>{children}</div>
)

export function ProductsHeroPhone() {
  return (
    <div className="mx-auto flex w-full max-w-[30rem] flex-col items-center gap-6" aria-hidden>
      <style>{CSS}</style>

      {/* phone: thin bezel */}
      <div className="w-[13.5rem] rounded-[1.9rem] bg-slate-900 p-1 shadow-xl shadow-slate-900/15 sm:w-[14.5rem]">
        <div className="relative h-[24rem] overflow-hidden rounded-[1.65rem] bg-white sm:h-[26rem]">
          <div className="absolute left-1/2 top-1.5 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-slate-900" />

          {/* 0 · Bulk SMS */}
          <Slide n={0}>
            <div className="bg-slate-100 px-4 pb-3 pt-8 text-center">
              <div className="text-[13px] font-semibold text-slate-800">AD-SMSLCL</div>
              <div className="text-[10.5px] text-slate-500">Text message</div>
            </div>
            <div className="flex-1 bg-white px-3 pt-4">
              <div className="w-fit max-w-[88%] rounded-2xl rounded-tl-sm bg-slate-200 px-3 py-2 text-[12px] leading-snug text-slate-800">
                SMSLocal: Flat 20% off on your next order. Shop now at smsl.in/sale. Reply STOP to opt out.
              </div>
              <p className="mt-1.5 pl-1 text-[10px] text-slate-400">Delivered · 10:02 am</p>
            </div>
          </Slide>

          {/* 1 · WhatsApp */}
          <Slide n={1}>
            <div className="flex items-center gap-2.5 bg-[#128C7E] px-4 pb-3 pt-9 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[13px] font-bold">S</span>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">SMSLocal Store</div>
                <div className="flex items-center gap-1 text-[10.5px] text-white/80"><BadgeCheck className="h-3 w-3" /> Verified business</div>
              </div>
            </div>
            <div className="flex-1 space-y-2.5 bg-[#efeae2] px-3 pt-4">
              <div className="w-fit max-w-[86%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] font-medium leading-snug text-slate-800 shadow-sm">
                Hi Riya, your order #1042 has shipped.
                <div className="mt-2 rounded-lg bg-[#128C7E]/10 py-1.5 text-center text-[12px] font-semibold text-[#128C7E]">Track order</div>
              </div>
              <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[12px] font-medium text-slate-800 shadow-sm">Thanks!</div>
            </div>
          </Slide>

          {/* 2 · RCS */}
          <Slide n={2}>
            <div className="bg-white px-4 pb-3 pt-8 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-[13px] font-semibold text-slate-800">SMSLocal <BadgeCheck className="h-3.5 w-3.5 text-sky-500" /></div>
              <div className="text-[10.5px] text-slate-500">Verified sender</div>
            </div>
            <div className="flex-1 bg-slate-50 px-3 pt-4">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
                <div className="flex h-28 items-center justify-center bg-amber-400">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <div className="p-3">
                  <div className="text-[13px] font-bold text-slate-900">Summer sale is on</div>
                  <div className="mt-0.5 text-[11.5px] text-slate-500">Up to 40% off, this week only.</div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-center text-[11.5px] font-semibold text-sky-600">
                <span className="rounded-full bg-white py-1.5 shadow-sm ring-1 ring-black/5">Shop now</span>
                <span className="rounded-full bg-white py-1.5 shadow-sm ring-1 ring-black/5">View offers</span>
              </div>
            </div>
          </Slide>

          {/* 3 · OTP */}
          <Slide n={3}>
            <div className="bg-slate-100 px-4 pb-3 pt-8 text-center">
              <div className="text-[13px] font-semibold text-slate-800">VM-SMSLCL</div>
              <div className="text-[10.5px] text-slate-500">Text message</div>
            </div>
            <div className="flex-1 bg-white px-3 pt-4">
              <div className="w-fit max-w-[88%] rounded-2xl rounded-tl-sm bg-slate-200 px-3 py-2 text-[12px] leading-snug text-slate-800">
                Your SMSLocal OTP is <b>482913</b>. Valid for 5 minutes. Do not share it with anyone.
              </div>
              <div className="mx-auto mt-8 flex w-fit flex-col items-center rounded-2xl bg-sky-50 px-6 py-4 ring-1 ring-sky-100">
                <Lock className="h-5 w-5 text-sky-600" />
                <div className="mt-2 flex gap-1.5">
                  {"482913".split("").map((d, i) => <span key={i} className="flex h-8 w-6 items-center justify-center rounded-md bg-white text-[15px] font-bold text-slate-900 shadow-sm">{d}</span>)}
                </div>
                <div className="mt-2 text-[10.5px] font-medium text-sky-700">Verified</div>
              </div>
            </div>
          </Slide>

          {/* 4 · AI Agents */}
          <Slide n={4}>
            <div className="flex items-center gap-2.5 bg-slate-800 px-4 pb-3 pt-9 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"><Bot className="h-4 w-4" /></span>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">AI Agent</div>
                <div className="text-[10.5px] text-white/70">Replies in your customer&apos;s language</div>
              </div>
            </div>
            <div className="flex-1 space-y-2.5 bg-slate-50 px-3 pt-4">
              <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-slate-800 px-3 py-2 text-[12px] font-medium text-white shadow-sm">मेरा ऑर्डर कहाँ है?</div>
              <div className="w-fit max-w-[86%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] font-medium leading-snug text-slate-800 shadow-sm">आपका ऑर्डर आज शाम तक पहुँच जाएगा।</div>
              <div className="w-fit rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">Talk to a person</div>
            </div>
          </Slide>
        </div>
      </div>

      {/* plain label row that follows the screen */}
      <ul className="flex flex-wrap justify-center gap-2">
        {LABELS.map((l, i) => (
          <li key={l} className={`pc pc${i} rounded-full bg-slate-100 px-3.5 py-1.5 text-[13px] font-medium text-slate-500`}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

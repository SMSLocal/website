import { ArrowLeft, BadgeCheck, Bell, Check, Gift, MoreVertical, Phone, Plus, Send, Smile, Users } from "lucide-react"

// Hero graphic for /channels/rcs-broadcasting, drawn to look like a real RCS broadcast. On the left is the campaign as a marketer sees it:
// "Diwali offers" going to opted-in customers, a progress bar, and the two outcomes of one send (RCS rich cards and SMS fallback). On the
// right, ONE phone shows what a customer sees in Google Messages: a verified business ("Urban Cart", with the verified tick) sends a
// swipeable carousel of three product cards, each with its own photo and a button. The carousel swipes across, two suggested replies
// appear, the customer taps "Track order", and an AI reply comes back in the same thread. HTML and CSS with container-query units, so it
// scales crisply to any width and works as a server component. 16 s loop, silent. No prices, no stats.

const LOOP = 16
const W = 580
const u = (px: number) => `${((px / W) * 100).toFixed(3)}cqw`

const kf = (name: string, stops: [number, string][], extra = "") =>
  `@keyframes ${name} { ${stops.map(([p, v]) => `${Math.min(100, +p.toFixed(2))}% { ${v} }`).join(" ")} }\n.${name} { ${extra} animation: ${name} ${LOOP}s ease-in-out infinite }`

const HIDE = "opacity: 0; transform: translateY(10px)"
const SHOW = "opacity: 1; transform: none"
const from = (name: string, a: number) => kf(name, [[0, HIDE], [a, HIDE], [a + 2.5, SHOW], [95, SHOW], [98, HIDE], [100, HIDE]], `${HIDE};`)
const win = (name: string, a: number, b: number) =>
  kf(name, [[0, "opacity: 0"], [Math.max(0, a - 1), "opacity: 0"], [a + 1.5, "opacity: 1"], [b - 1, "opacity: 1"], [b + 1.5, "opacity: 0"], [100, "opacity: 0"]], "opacity: 0;")
const notIn = (name: string, a: number, b: number) =>
  kf(name, [[0, "opacity: 1"], [a - 1, "opacity: 1"], [a + 1.5, "opacity: 0"], [b - 1, "opacity: 0"], [b + 1.5, "opacity: 1"], [100, "opacity: 1"]], "opacity: 1;")

const CARD = 128 // card width inside the phone, in stage px
const GAP = 8

const CSS = [
  // the marketer's side
  notIn("rp-send", 7, 97),
  win("rp-sending", 7, 40),
  win("rp-sent", 40, 97),
  kf("rp-prog", [[0, "transform: scaleX(0)"], [8, "transform: scaleX(0)"], [38, "transform: scaleX(1)"], [95, "transform: scaleX(1)"], [100, "transform: scaleX(0)"]], "transform-origin: left center;"),
  kf("rp-res1", [[0, "opacity: .5; box-shadow: 0 0 0 0 rgba(14,159,110,0)"], [24, "opacity: .5; box-shadow: 0 0 0 0 rgba(14,159,110,.5)"], [27, "opacity: 1; box-shadow: 0 0 0 0 rgba(14,159,110,.5)"], [31, "opacity: 1; box-shadow: 0 0 0 7px rgba(14,159,110,0)"], [95, "opacity: 1; box-shadow: 0 0 0 0 rgba(14,159,110,0)"], [98, "opacity: .5"], [100, "opacity: .5"]], "opacity: .5;"),
  kf("rp-res2", [[0, "opacity: .5; box-shadow: 0 0 0 0 rgba(148,163,184,0)"], [34, "opacity: .5; box-shadow: 0 0 0 0 rgba(148,163,184,.55)"], [37, "opacity: 1; box-shadow: 0 0 0 0 rgba(148,163,184,.55)"], [41, "opacity: 1; box-shadow: 0 0 0 7px rgba(148,163,184,0)"], [95, "opacity: 1; box-shadow: 0 0 0 0 rgba(148,163,184,0)"], [98, "opacity: .5"], [100, "opacity: .5"]], "opacity: .5;"),
  notIn("rp-q1", 24, 97),
  notIn("rp-q2", 34, 97),
  ...[["rp-d1", 24], ["rp-d2", 34]].map(([n, a]) =>
    kf(n as string, [[0, "opacity: 0; transform: scale(1)"], [(a as number) - 1, "opacity: 0; transform: scale(1)"], [(a as number) + 1.5, "opacity: 1; transform: scale(.6)"], [(a as number) + 3, "opacity: 1; transform: scale(1.18)"], [(a as number) + 4.5, "opacity: 1; transform: scale(1)"], [96, "opacity: 1; transform: scale(1)"], [98.5, "opacity: 0; transform: scale(1)"], [100, "opacity: 0; transform: scale(1)"]], "opacity: 0; transform-origin: right center;")),
  // a message packet flies from the campaign to the phone, a push banner drops in, the progress bar shimmers
  kf("rp-fly", [[0, "opacity: 0; transform: translate(0,0) scale(.6)"], [9, "opacity: 0; transform: translate(0,0) scale(.6)"], [10.5, "opacity: 1; transform: translate(0,0) scale(1)"], [14, `opacity: 1; transform: translate(${u(78)}, ${u(-86)}) scale(1)`], [15.5, `opacity: 0; transform: translate(${u(84)}, ${u(-92)}) scale(.4)`], [100, "opacity: 0"]], "opacity: 0;"),
  kf("rp-fly2", [[0, "opacity: 0; transform: translate(0,0) scale(.5)"], [10, "opacity: 0; transform: translate(0,0) scale(.5)"], [11.5, "opacity: .7; transform: translate(0,0) scale(.8)"], [15, `opacity: .7; transform: translate(${u(78)}, ${u(-86)}) scale(.8)`], [16.5, `opacity: 0; transform: translate(${u(84)}, ${u(-92)}) scale(.3)`], [100, "opacity: 0"]], "opacity: 0;"),
  kf("rp-push", [[0, "opacity: 0; transform: translateY(-16px)"], [11, "opacity: 0; transform: translateY(-16px)"], [13.5, "opacity: 1; transform: none"], [19, "opacity: 1; transform: none"], [21.5, "opacity: 0; transform: translateY(-10px)"], [100, "opacity: 0"]], "opacity: 0;"),
  `@keyframes rp-sheen { from { transform: translateX(-120%) } to { transform: translateX(320%) } }
.rp-sheen { animation: rp-sheen 1.3s linear infinite }`,
  kf("rp-press", [[0, "transform: scale(1)"], [5, "transform: scale(1)"], [7, "transform: scale(.92)"], [9, "transform: scale(1)"], [100, "transform: scale(1)"]]),
  // the customer's side
  from("rp-cards", 14),
  kf("rp-swipe", [[0, "transform: translateX(0)"], [30, "transform: translateX(0)"], [34, `transform: translateX(${-(CARD + GAP)}px)`], [40, `transform: translateX(${-(CARD + GAP)}px)`], [44, `transform: translateX(${-2 * (CARD + GAP)}px)`], [95, `transform: translateX(${-2 * (CARD + GAP)}px)`], [98, "transform: translateX(0)"], [100, "transform: translateX(0)"]]),
  from("rp-chips", 47),
  kf("rp-tapchip", [[0, "background-color: #fff; color: #0b57d0"], [55, "background-color: #fff; color: #0b57d0"], [57, "background-color: #d3e3fd; color: #0b57d0"], [60, "background-color: #fff; color: #0b57d0"], [100, "background-color: #fff; color: #0b57d0"]]),
  from("rp-user", 60),
  win("rp-typing", 66, 74),
  from("rp-ai", 74),
  `@keyframes rp-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
.rp-float { animation: rp-float 7s ease-in-out infinite }
@keyframes rp-blink { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
.rp-blink { animation: rp-blink 1s ease-in-out infinite }
.rp-glare::after { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,.26), rgba(255,255,255,0) 34%); pointer-events: none }
@media (prefers-reduced-motion: reduce) {
  [class*="rp-"] { animation: none !important }
  .rp-sent, .rp-res1, .rp-res2, .rp-d1, .rp-d2, .rp-cards, .rp-chips, .rp-user, .rp-ai { opacity: 1; transform: none }
  .rp-send, .rp-sending, .rp-typing, .rp-q1, .rp-q2, .rp-fly, .rp-fly2, .rp-push { opacity: 0 }
  .rp-prog { transform: scaleX(1) } .rp-swipe { transform: translateX(${-2 * (CARD + GAP)}px) }
}`,
].join("\n")

const abs = (x: number, y: number, w?: number, h?: number): React.CSSProperties => ({ position: "absolute", left: u(x), top: u(y), width: w === undefined ? undefined : u(w), height: h === undefined ? undefined : u(h) })
const grey = "rgba(20,35,58,.5)"
const line = `${u(1)} solid rgba(20,35,58,.1)`
const mono = "ui-monospace, SFMono-Regular, Menlo, monospace"

const PRODUCTS = [
  { img: "/home/p-watch.webp", t: "Classic steel watch", d: "A gift that lasts." },
  { img: "/home/p-shoe.webp", t: "Leather derby shoes", d: "Back in stock." },
  { img: "/home/p-tshirt.webp", t: "Festive cotton tee", d: "New for the season." },
]

export function RcsProperScene() {
  const label = "A proper RCS broadcast. On the left is the campaign as a marketer sees it: Diwali offers going to opted-in customers, with a progress bar and the two outcomes of one send, RCS rich cards and SMS fallback. On the right, one phone shows what a customer sees in Google Messages: a verified business, Urban Cart, sends a swipeable carousel of three product cards, each with a photo and a Shop now button. The carousel swipes, two suggested replies appear, the customer taps Track order, and an AI reply comes back in the same conversation"
  return (
    <div className="relative mx-auto w-full max-w-[600px]" style={{ containerType: "inline-size" }}>
      <div role="img" aria-label={label} className="relative w-full" style={{ aspectRatio: `${W} / 470` }}>
        <div aria-hidden style={{ ...abs(-40, -20, 660, 500), background: "radial-gradient(closest-side at 38% 50%, rgba(52,211,153,.26), transparent), radial-gradient(closest-side at 88% 70%, rgba(96,165,250,.22), transparent)" }} />

        {/* ───────────── the campaign, as the marketer sees it ───────────── */}
        <div className="rp-float" style={{ ...abs(0, 52, 334, 372) }}>
          <div className="rp-glare" style={{ ...abs(0, 0, 334, 372), borderRadius: u(16), background: "#fff", overflow: "hidden", boxShadow: `0 ${u(28)} ${u(46)} ${u(-20)} rgba(15,42,71,.62), 0 0 0 ${u(1.2)} rgba(20,35,58,.16)`, color: "#14233a" }}>
            <div style={{ ...abs(0, 0, 334, 30), background: "#e9eef3", borderBottom: line }}>
              {[0, 1, 2].map((i) => <i key={i} style={{ ...abs(11 + i * 11, 12, 6.5, 6.5), borderRadius: "50%", background: ["#ff6159", "#ffbd2e", "#28c940"][i], display: "block" }} />)}
              <span style={{ ...abs(0, 9, 334), textAlign: "center", fontSize: u(10), fontWeight: 700, color: "rgba(20,35,58,.7)" }}>SMSLocal · Campaigns</span>
            </div>

            <div style={{ ...abs(18, 42, 298, 36), display: "flex", alignItems: "center", gap: u(8) }}>
              <span style={{ lineHeight: 1.25 }}><span style={{ display: "block", fontSize: u(16), fontWeight: 800, letterSpacing: "-0.015em" }}>Diwali offers</span><span style={{ display: "block", fontSize: u(9.5), color: grey }}>RCS broadcast · SMS fallback on</span></span>
              <span style={{ marginLeft: "auto", position: "relative", width: u(96), height: u(26) }}>
                <span className="rp-send" style={{ position: "absolute", right: 0, top: 0, background: "#0e9f6e", color: "#fff", borderRadius: u(13), fontSize: u(10.5), fontWeight: 700, padding: `${u(6)} ${u(13)}` }}><span className="rp-press" style={{ display: "inline-flex", alignItems: "center", gap: u(4) }}><Send style={{ width: u(10), height: u(10) }} />Send now</span></span>
                <span className="rp-sending" style={{ position: "absolute", right: 0, top: 0, background: "#14233a", color: "#fff", borderRadius: u(13), fontSize: u(10.5), fontWeight: 700, padding: `${u(6)} ${u(13)}` }}>Sending<span className="rp-blink">…</span></span>
                <span className="rp-sent" style={{ position: "absolute", right: 0, top: 0, background: "#e3f6ed", color: "#0b7a55", borderRadius: u(13), display: "inline-flex", alignItems: "center", gap: u(4), fontSize: u(10.5), fontWeight: 700, padding: `${u(6)} ${u(13)}` }}><Check style={{ width: u(10), height: u(10) }} strokeWidth={3.2} />Sent</span>
              </span>
            </div>

            <div style={{ ...abs(18, 90, 298, 34), borderRadius: u(10), background: "#f1f5f8", display: "flex", alignItems: "center", gap: u(8), padding: `0 ${u(12)}`, fontSize: u(10.5) }}>
              <Users style={{ width: u(12), height: u(12), color: grey }} /><span style={{ color: grey }}>To</span><b style={{ fontWeight: 700 }}>Opted-in customers</b>
            </div>

            <div style={{ ...abs(18, 136, 298, 26) }}>
              <p style={{ margin: 0, fontSize: u(8), letterSpacing: "0.14em", color: grey, fontFamily: mono, fontWeight: 700 }}>PROGRESS</p>
              <div style={{ ...abs(0, 14, 298, 6), borderRadius: u(3), background: "rgba(20,35,58,.1)" }} />
              <div className="rp-prog" style={{ ...abs(0, 14, 298, 6), borderRadius: u(3), background: "linear-gradient(90deg,#34d399,#0e9f6e)", overflow: "hidden" }}><i className="rp-sheen" style={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent)" }} /></div>
            </div>

            {/* the message being sent */}
            <div style={{ ...abs(18, 172, 298, 42), borderRadius: u(10), border: line, display: "flex", alignItems: "center", gap: u(10), padding: `0 ${u(12)}` }}>
              <span style={{ width: u(26), height: u(26), borderRadius: u(7), background: "linear-gradient(145deg,#34d399,#0e9f6e)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Gift style={{ width: u(13), height: u(13) }} /></span>
              <span style={{ lineHeight: 1.25 }}><span style={{ display: "block", fontSize: u(11), fontWeight: 700 }}>Festive carousel</span><span style={{ display: "block", fontSize: u(9), color: grey }}>3 cards · Shop now button</span></span>
              <span style={{ marginLeft: "auto", fontSize: u(9), fontWeight: 700, color: "#0b57d0", background: "#e8f0fe", borderRadius: u(9), padding: `${u(3)} ${u(8)}` }}>Rich card</span>
            </div>

            {/* the two outcomes of one send: greyed and queued until they land */}
            <div style={{ ...abs(18, 226, 298, 100) }}>
              <p style={{ margin: 0, fontSize: u(8), letterSpacing: "0.14em", color: grey, fontFamily: mono, fontWeight: 700 }}>ONE SEND, TWO OUTCOMES</p>
              <div className="rp-res1" style={{ ...abs(0, 16, 298, 40), borderRadius: u(10), border: line, display: "flex", alignItems: "center", gap: u(10), padding: `0 ${u(12)}` }}>
                <span style={{ width: u(22), height: u(22), borderRadius: "50%", background: "#0e9f6e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: u(11), height: u(11) }} strokeWidth={3.2} /></span>
                <span style={{ lineHeight: 1.25 }}><span style={{ display: "block", fontSize: u(11), fontWeight: 700 }}>RCS rich cards</span><span style={{ display: "block", fontSize: u(9), color: grey }}>Phones that support RCS</span></span>
                <span style={{ marginLeft: "auto", position: "relative", width: u(58), height: u(18) }}>
                  <span className="rp-q1" style={{ position: "absolute", right: 0, top: 0, fontSize: u(9), fontWeight: 700, color: "rgba(20,35,58,.55)", background: "#eef1f4", borderRadius: u(9), padding: `${u(3)} ${u(8)}` }}>Queued</span>
                  <span className="rp-d1" style={{ position: "absolute", right: 0, top: 0, fontSize: u(9), fontWeight: 700, color: "#0b7a55", background: "#e3f6ed", borderRadius: u(9), padding: `${u(3)} ${u(8)}` }}>Delivered</span>
                </span>
              </div>
              <div className="rp-res2" style={{ ...abs(0, 62, 298, 40), borderRadius: u(10), border: line, display: "flex", alignItems: "center", gap: u(10), padding: `0 ${u(12)}` }}>
                <span style={{ width: u(22), height: u(22), borderRadius: "50%", background: "#94a3b8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: u(11), height: u(11) }} strokeWidth={3.2} /></span>
                <span style={{ lineHeight: 1.25 }}><span style={{ display: "block", fontSize: u(11), fontWeight: 700 }}>SMS fallback</span><span style={{ display: "block", fontSize: u(9), color: grey }}>Every other phone</span></span>
                <span style={{ marginLeft: "auto", position: "relative", width: u(58), height: u(18) }}>
                  <span className="rp-q2" style={{ position: "absolute", right: 0, top: 0, fontSize: u(9), fontWeight: 700, color: "rgba(20,35,58,.55)", background: "#eef1f4", borderRadius: u(9), padding: `${u(3)} ${u(8)}` }}>Queued</span>
                  <span className="rp-d2" style={{ position: "absolute", right: 0, top: 0, fontSize: u(9), fontWeight: 700, color: "rgba(20,35,58,.7)", background: "#eef1f4", borderRadius: u(9), padding: `${u(3)} ${u(8)}` }}>Delivered</span>
                </span>
              </div>
            </div>

            <div style={{ ...abs(18, 338, 298, 24), borderTop: line, display: "flex", alignItems: "center", paddingTop: u(6), fontSize: u(9.5), fontWeight: 700, color: "#0b7a55", gap: u(4) }}><BadgeCheck style={{ width: u(11), height: u(11) }} />Verified sender: Urban Cart<span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: u(3), color: "rgba(20,35,58,.65)" }}><Check style={{ width: u(9), height: u(9) }} strokeWidth={3.2} />DLT SMS ready</span></div>
          </div>
        </div>

{/* message packets flying to the phone */}
        <span className="rp-fly" style={{ ...abs(290, 236, 24, 24), borderRadius: "50%", background: "linear-gradient(145deg,#34d399,#0e9f6e)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 ${u(4)} ${u(10)} rgba(14,159,110,.55)`, zIndex: 20 }}><Send style={{ width: u(11), height: u(11) }} /></span>
        <span className="rp-fly2" style={{ ...abs(294, 240, 16, 16), borderRadius: "50%", background: "#34d399", zIndex: 19 }} />

        {/* ───────────── the customer's phone: Google Messages ───────────── */}
        <div className="rp-float" style={{ ...abs(338, 16, 232, 440), animationDelay: "-2.5s" }}>
          <div style={{ ...abs(0, 0, 232, 440), borderRadius: u(33), background: "linear-gradient(150deg,#3a4656,#10161f 60%,#2a3441)", boxShadow: `0 ${u(30)} ${u(46)} ${u(-20)} rgba(15,42,71,.6), inset 0 0 0 ${u(1.2)} rgba(255,255,255,.18)` }}>
            <i style={{ ...abs(-2.5, 100, 3, 40), borderRadius: u(2), background: "#222b37", display: "block" }} />
            <i style={{ ...abs(231.5, 130, 3, 66), borderRadius: u(2), background: "#222b37", display: "block" }} />
            <div className="rp-glare" style={{ ...abs(4, 4, 224, 432), borderRadius: u(29), overflow: "hidden", background: "#f4f6f9", color: "#1f2933" }}>
              <i style={{ ...abs(92, 10, 40, 11), borderRadius: u(7), background: "#05080c", display: "block", zIndex: 4 }} />
              {/* push notification */}
              <div className="rp-push" style={{ ...abs(10, 30, 204, 38), zIndex: 6, borderRadius: u(12), background: "rgba(255,255,255,.97)", boxShadow: `0 ${u(6)} ${u(16)} rgba(0,0,0,.28)`, display: "flex", alignItems: "center", gap: u(7), padding: `0 ${u(9)}` }}>
                <span style={{ width: u(20), height: u(20), borderRadius: u(6), background: "linear-gradient(145deg,#34d399,#0e9f6e)", color: "#fff", fontSize: u(10), fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>U</span>
                <span style={{ lineHeight: 1.25 }}><span style={{ display: "block", fontSize: u(8.5), fontWeight: 700 }}>Urban Cart</span><span style={{ display: "block", fontSize: u(7.5), color: "#5f6368" }}>Diwali offers are here. Tap to see.</span></span>
                <Bell style={{ marginLeft: "auto", width: u(9), height: u(9), color: "#0b57d0" }} />
              </div>

              {/* app bar */}
              <div style={{ ...abs(0, 0, 224, 64), background: "#fff", borderBottom: line, zIndex: 3 }}>
                <span style={{ ...abs(14, 8), fontSize: u(7.5), fontWeight: 700 }}>9:41</span>
                <span style={{ ...abs(176, 8), display: 'flex', alignItems: 'center', gap: u(3) }}><i style={{ display: 'block', width: u(9), height: u(6), background: 'linear-gradient(90deg,#444746 25%,transparent 25% 35%,#444746 35% 60%,transparent 60% 70%,#444746 70%)' }} /><i style={{ display: 'block', width: u(14), height: u(6.5), borderRadius: u(2), background: '#444746' }} /></span>
                <ArrowLeft style={{ ...abs(10, 32), width: u(11), height: u(11), color: "#444746" }} />
                <span style={{ ...abs(28, 27, 22, 22), borderRadius: "50%", background: "linear-gradient(145deg,#34d399,#0e9f6e)", color: "#fff", fontSize: u(10), fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>U</span>
                <span style={{ ...abs(56, 26), lineHeight: 1.25 }}><span style={{ display: "flex", alignItems: "center", gap: u(3), fontSize: u(10), fontWeight: 700 }}>Urban Cart <BadgeCheck style={{ width: u(10), height: u(10), color: "#0b57d0" }} /></span><span style={{ display: "block", fontSize: u(7), color: "#5f6368" }}>Verified business</span></span>
                <Phone style={{ ...abs(172, 32), width: u(10), height: u(10), color: "#444746" }} />
                <MoreVertical style={{ ...abs(196, 32), width: u(11), height: u(11), color: "#444746" }} />
              </div>

              {/* verified banner */}
              <p style={{ ...abs(0, 69, 224), margin: 0, textAlign: 'center', fontSize: u(6.5), color: '#5f6368' }}>Today · This business is verified</p>

              {/* the carousel */}
              <div className="rp-cards" style={{ ...abs(0, 86, 224, 140) }}>
                <div style={{ ...abs(12, 0, 200, 140), overflow: "hidden" }}>
                  <div className="rp-swipe" style={{ display: "flex", gap: u(GAP), width: "max-content" }}>
                    {PRODUCTS.map((p) => (
                      <div key={p.t} style={{ width: u(CARD), flex: "none", borderRadius: u(12), background: "#fff", overflow: "hidden", boxShadow: `0 ${u(1)} ${u(4)} rgba(0,0,0,.16)` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.img} alt="" style={{ width: "100%", height: u(74), objectFit: "cover", display: "block" }} />
                        <div style={{ padding: `${u(7)} ${u(9)} ${u(6)}` }}>
                          <p style={{ margin: 0, fontSize: u(9), fontWeight: 700 }}>{p.t}</p>
                          <p style={{ margin: `${u(2)} 0 0`, fontSize: u(7.5), color: "#5f6368" }}>{p.d}</p>
                        </div>
                        <p style={{ margin: 0, textAlign: "center", borderTop: line, padding: `${u(6)} 0`, fontSize: u(8.5), fontWeight: 700, color: "#0b57d0" }}>Shop now</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* suggested replies */}
              <div className="rp-chips" style={{ ...abs(12, 236, 204, 22), display: "flex", gap: u(6) }}>
                <span className="rp-tapchip" style={{ border: `${u(1)} solid #a8c7fa`, borderRadius: u(12), fontSize: u(8.5), fontWeight: 600, padding: `${u(4)} ${u(11)}`, background: "#fff", color: "#0b57d0" }}>Track order</span>
                <span style={{ border: `${u(1)} solid #a8c7fa`, borderRadius: u(12), fontSize: u(8.5), fontWeight: 600, padding: `${u(4)} ${u(11)}`, background: "#fff", color: "#0b57d0" }}>Talk to us</span>
                <span style={{ border: `${u(1)} solid #a8c7fa`, borderRadius: u(12), fontSize: u(8.5), fontWeight: 600, padding: `${u(4)} ${u(9)}`, background: "#fff", color: "#0b57d0", display: "inline-flex", alignItems: "center", gap: u(3) }}><Phone style={{ width: u(7.5), height: u(7.5) }} />Call</span>
              </div>

              {/* the conversation that follows */}
              <div className="rp-user" style={{ ...abs(120, 270), borderRadius: `${u(13)} ${u(13)} ${u(3)} ${u(13)}`, background: "#0b57d0", color: "#fff", fontSize: u(9), fontWeight: 500, padding: `${u(6)} ${u(12)}` }}>Track order</div>
              <p className="rp-user" style={{ ...abs(0, 296, 212), margin: 0, textAlign: "right", fontSize: u(6.5), color: "#5f6368" }}>9:42 AM · Read</p>
              <div style={{ ...abs(12, 314, 150, 56) }}>
                <div className="rp-typing" style={{ ...abs(0, 0), borderRadius: `${u(3)} ${u(13)} ${u(13)} ${u(13)}`, background: "#fff", boxShadow: `0 ${u(1)} ${u(3)} rgba(0,0,0,.12)`, padding: `${u(8)} ${u(12)}`, display: "flex", gap: u(4) }}>
                  {[0, 1, 2].map((i) => <i key={i} className="rp-blink" style={{ width: u(5), height: u(5), borderRadius: "50%", background: "#8a949e", display: "block", animationDelay: `${i * 0.18}s` }} />)}
                </div>
                <div className="rp-ai" style={{ ...abs(0, 0, 150), borderRadius: `${u(3)} ${u(13)} ${u(13)} ${u(13)}`, background: "#fff", boxShadow: `0 ${u(1)} ${u(3)} rgba(0,0,0,.12)`, padding: `${u(7)} ${u(11)}` }}>
                  <p style={{ margin: 0, fontSize: u(8.5), lineHeight: 1.35 }}>Hi Asha, your Diwali order is on its way. Track it here.</p>
                  <p style={{ margin: `${u(5)} 0 0`, fontSize: u(6.5), color: "#0b7a55", fontWeight: 700, display: "flex", alignItems: "center", gap: u(3) }}><i style={{ width: u(5), height: u(5), borderRadius: "50%", background: "#0e9f6e", display: "block" }} />Answered by agentic AI</p>
                </div>
              </div>

              {/* input bar */}
              <div style={{ ...abs(10, 392, 204, 28), borderRadius: u(14), background: "#fff", boxShadow: `0 0 0 ${u(1)} rgba(20,35,58,.08)`, display: "flex", alignItems: "center", gap: u(7), padding: `0 ${u(10)}`, fontSize: u(8.5), color: "#5f6368" }}>
                <Plus style={{ width: u(11), height: u(11) }} />RCS message<Smile style={{ width: u(11), height: u(11), marginLeft: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}

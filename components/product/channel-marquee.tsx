import type { LucideIcon } from "lucide-react"

/**
 * Boxless two-row channel carousel for the "One inbox for every channel" section.
 *
 * No cards: each channel is just a tinted icon badge + label gliding across the
 * page. The top row drifts left, the bottom row drifts right (opposite motion
 * reads as "everything in constant flow, all converging here"). Edge-fade masks
 * let items melt in/out at the margins, and hovering anywhere pauses that row.
 *
 * Pure CSS — reuses the marquee-l / marquee-r keyframes in globals.css. To loop
 * seamlessly the track renders each row twice and each item carries its spacing
 * as a right margin (not a flex gap), so translateX(-50%) lands exactly on the
 * start of the second copy with zero jump.
 */

type Channel = { name: string; icon: LucideIcon; tint: string; blurb: string }

function MarqueeRow({ items, dir }: { items: Channel[]; dir: "l" | "r" }) {
  const track = [...items, ...items]
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
      <div
        className={`flex w-max shrink-0 ${
          dir === "l" ? "animate-marquee-l" : "animate-marquee-r"
        } group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {track.map((c, i) => {
          const Icon = c.icon
          return (
            <div
              key={`${c.name}-${i}`}
              className="group/item mr-10 flex shrink-0 items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5 sm:mr-14"
              aria-hidden={i >= items.length}
            >
              <span
                className={`relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${c.tint} ring-1 ring-inset ring-black/5 transition-shadow duration-300 group-hover/item:shadow-[0_8px_28px_-8px_currentColor]`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 whitespace-nowrap">
                <div className="text-[15px] font-semibold tracking-tight text-foreground">{c.name}</div>
                <div className="text-[12px] leading-snug text-muted-foreground">{c.blurb}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ChannelMarquee({ channels }: { channels: Channel[] }) {
  // Different order per row so the two lanes never look like mirror twins.
  const topRow = channels
  const bottomRow = [...channels].reverse()

  return (
    <div className="mt-6 flex flex-col gap-4">
      <MarqueeRow items={topRow} dir="l" />
      <MarqueeRow items={bottomRow} dir="r" />
    </div>
  )
}

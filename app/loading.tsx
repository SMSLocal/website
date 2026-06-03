export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background"
    >
      {/* Message bubble with typing dots that light up 1 · 2 · 3 */}
      <div className="relative">
        <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-card px-5 py-4 shadow-sm">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-primary"
              style={{ animation: `loader-typing 1.2s ease-in-out ${i * 0.18}s infinite` }}
            />
          ))}
        </div>
        {/* bubble tail (bottom-left) */}
        <span
          aria-hidden
          className="absolute -bottom-[5px] left-4 h-3 w-3 rotate-45 border-b border-l border-border bg-card"
        />
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  )
}

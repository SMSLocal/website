import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Spinner className="h-5 w-5 text-primary" />
        <span className="text-xs font-medium uppercase tracking-wider">Loading</span>
      </div>
    </div>
  )
}

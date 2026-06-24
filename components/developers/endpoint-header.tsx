export function EndpointHeader({
  method,
  path,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
}) {
  const methodStyles: Record<string, string> = {
    GET: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
    POST: "bg-primary/15 text-primary border-primary/20",
    PUT: "bg-amber-500/15 text-amber-600 border-amber-500/20",
    DELETE: "bg-destructive/15 text-destructive border-destructive/20",
  }
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
      <span
        className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11.5px] font-semibold tracking-wider ${methodStyles[method]}`}
      >
        {method}
      </span>
      <code className="break-all font-mono text-[13px] text-foreground">{path}</code>
    </div>
  )
}

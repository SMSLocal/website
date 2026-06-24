export function BrandMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sms-brand-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="oklch(0.72 0.17 165)" />
          <stop offset="1" stopColor="oklch(0.55 0.15 195)" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="6.25" fill="url(#sms-brand-g)" />
      <path
        d="M8.5 15.2c.9.7 2 1.1 3.5 1.1 1.9 0 3-.7 3-1.9 0-1.1-.8-1.6-2.6-1.9l-1.2-.2c-2.4-.4-3.7-1.4-3.7-3.2 0-2 1.7-3.3 4.4-3.3 1.4 0 2.6.3 3.4.9l-.7 1.7c-.8-.5-1.7-.8-2.8-.8-1.6 0-2.5.6-2.5 1.5 0 .9.7 1.4 2.4 1.7l1.2.2c2.5.4 3.9 1.5 3.9 3.4 0 2.2-1.8 3.6-4.9 3.6-1.7 0-3.1-.4-4.1-1.1l.7-1.7Z"
        fill="#ffffff"
      />
      <circle cx="18.5" cy="5.5" r="1.5" fill="#ffffff" />
    </svg>
  )
}

import { useId } from 'react'

/** Brick-style handheld seen from above, no branding. 150 × 248. */
export function HandheldArt({ screenOn = false }: { screenOn?: boolean }) {
  const id = useId()
  return (
    <svg viewBox="0 0 150 248" className="art" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8d4c9" />
          <stop offset="1" stopColor="#b6b1a5" />
        </linearGradient>
      </defs>
      <path d="M8 0 H142 a8 8 0 0 1 8 8 V206 a42 42 0 0 1 -42 42 H8 a8 8 0 0 1 -8 -8 V8 a8 8 0 0 1 8 -8 Z" fill={`url(#${id}body)`} />
      <path d="M8 1 H142 a7 7 0 0 1 7 7" fill="none" stroke="#fff" strokeOpacity="0.6" />
      <line x1="10" y1="8" x2="140" y2="8" stroke="#9e998d" strokeWidth="1" />

      <path d="M14 18 H136 V100 a14 14 0 0 1 -14 14 H20 a6 6 0 0 1 -6 -6 Z" fill="#56586b" />
      <rect x="35" y="27" width="80" height="72" rx="1.5" fill={screenOn ? 'var(--gb-3)' : '#6e7d31'} />
      <rect x="35" y="27" width="80" height="72" rx="1.5" fill="#000" opacity={screenOn ? 0 : 0.18} />
      <circle cx="24" cy="56" r="2.6" fill={screenOn ? '#e3263b' : '#5a2a30'} />

      <g fill="#2b2a33">
        <rect x="16" y="146" width="36" height="12" rx="2" />
        <rect x="28" y="134" width="12" height="36" rx="2" />
      </g>
      <circle cx="34" cy="152" r="3" fill="#3d3c46" />
      <g transform="rotate(-25 104 150)">
        <circle cx="90" cy="152" r="10.5" fill="#9a2257" />
        <circle cx="118" cy="152" r="10.5" fill="#9a2257" />
      </g>
      <g fill="#8a867c" transform="rotate(-25 72 196)">
        <rect x="52" y="193" width="17" height="6" rx="3" />
        <rect x="76" y="193" width="17" height="6" rx="3" />
      </g>
      <g stroke="#9e998d" strokeWidth="3.5" strokeLinecap="round">
        <line x1="104" y1="236" x2="132" y2="208" />
        <line x1="112" y1="238" x2="138" y2="212" />
        <line x1="96" y1="232" x2="126" y2="202" />
        <line x1="90" y1="225" x2="118" y2="197" />
      </g>
    </svg>
  )
}

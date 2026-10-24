import { useId } from 'react'

/** Tennis ball from above. 56 × 56. */
export function BallArt() {
  const id = useId()
  return (
    <svg viewBox="0 0 56 56" className="art" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}b`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#eef58a" />
          <stop offset="0.6" stopColor="#cfdc3c" />
          <stop offset="1" stopColor="#a3ae22" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="27" fill={`url(#${id}b)`} />
      <path d="M8 10 C22 20 22 36 8 46" fill="none" stroke="#f8f8ee" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 10 C34 20 34 36 48 46" fill="none" stroke="#f8f8ee" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Edge of a racket head, meant to sit half off the desk corner. 300 × 300. */
export function RacketArt() {
  const id = useId()
  return (
    <svg viewBox="0 0 300 300" className="art" aria-hidden="true">
      <defs>
        <clipPath id={`${id}c`}>
          <ellipse cx="150" cy="130" rx="104" ry="124" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}c)`} stroke="#e9e4d6" strokeWidth="1.6" opacity="0.9">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={50 + i * 13} y1="0" x2={50 + i * 13} y2="260" />
        ))}
        {Array.from({ length: 19 }, (_, i) => (
          <line key={`h${i}`} x1="40" y1={10 + i * 13} x2="260" y2={10 + i * 13} />
        ))}
      </g>
      <ellipse cx="150" cy="130" rx="110" ry="130" fill="none" stroke="#1f2a36" strokeWidth="14" />
      <ellipse cx="150" cy="130" rx="110" ry="130" fill="none" stroke="#b8582e" strokeWidth="3" strokeDasharray="30 260" strokeDashoffset="40" />
      <path d="M120 258 L104 300 M180 258 L196 300" stroke="#1f2a36" strokeWidth="14" strokeLinecap="round" />
    </svg>
  )
}

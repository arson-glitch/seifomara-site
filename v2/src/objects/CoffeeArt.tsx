import { useId } from 'react'

/** Cup on a saucer from above, with crema, steam and three beans. 250 × 250. */
export function CoffeeArt() {
  const id = useId()
  return (
    <svg viewBox="0 0 250 250" className="art" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}saucer`} cx="0.4" cy="0.38" r="0.65">
          <stop offset="0" stopColor="#f8f4ed" />
          <stop offset="0.8" stopColor="#e6ddcf" />
          <stop offset="1" stopColor="#cfc4b2" />
        </radialGradient>
        <radialGradient id={`${id}crema`} cx="0.45" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#d4a46a" />
          <stop offset="0.55" stopColor="#ad7441" />
          <stop offset="0.9" stopColor="#6a3e1d" />
          <stop offset="1" stopColor="#4a2a12" />
        </radialGradient>
      </defs>

      <Bean x={30} y={36} r={-30} />
      <Bean x={222} y={214} r={40} />
      <Bean x={36} y={222} r={110} />

      <circle cx="122" cy="128" r="102" fill={`url(#${id}saucer)`} />
      <circle cx="122" cy="128" r="74" fill="none" stroke="#d6ccbb" strokeWidth="2" />

      <rect x="172" y="114" width="52" height="24" rx="12" fill="#f4efe6" stroke="#d6ccbb" strokeWidth="1.5" />
      <circle cx="122" cy="128" r="68" fill="#fbf8f2" stroke="#e2d9ca" strokeWidth="2" />
      <circle cx="122" cy="128" r="58" fill={`url(#${id}crema)`} />
      <g className="crema-swirl" fill="none" stroke="#f1d3a3" strokeLinecap="round" opacity="0.45">
        <path d="M122 128 m-30 -6 a30 30 0 0 1 48 -14" strokeWidth="2.4" />
        <path d="M122 128 m18 22 a26 26 0 0 1 -42 -4" strokeWidth="2" />
        <path d="M122 128 m-8 -36 a38 38 0 0 1 40 30" strokeWidth="1.6" />
      </g>
      <ellipse cx="104" cy="104" rx="16" ry="7" fill="#fff" opacity="0.18" transform="rotate(-35 104 104)" />

      <g className="steam" fill="none" stroke="#fffaf0" strokeLinecap="round" strokeWidth="5">
        <path d="M104 116 c-10 -16 10 -24 0 -42" />
        <path d="M126 112 c-10 -18 12 -26 2 -48" />
        <path d="M146 118 c-8 -14 10 -22 2 -38" />
      </g>
    </svg>
  )
}

function Bean({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse rx="11" ry="7.5" fill="#4b2a14" />
      <ellipse rx="11" ry="7.5" fill="none" stroke="#2e180a" strokeWidth="0.8" />
      <path d="M-9 0 q4 -3 9 0 t9 0" fill="none" stroke="#24120a" strokeWidth="1.6" />
      <ellipse cx="-3" cy="-3.5" rx="4" ry="1.6" fill="#fff" opacity="0.15" />
    </g>
  )
}

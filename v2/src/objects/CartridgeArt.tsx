import { useId } from 'react'
import type { Project } from '../content/projects'

/** A cartridge seen from above, label facing up. 82 × 89.5 (5.5 × 6 cm). */
export function CartridgeArt({ project }: { project: Project }) {
  const id = useId()
  const light = project.shell === '#D9CBB0' || project.shell === '#8E8A80'
  return (
    <svg viewBox="0 0 82 89.5" className="art" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <path d="M4 0 H70 L82 12 V85.5 a4 4 0 0 1 -4 4 H4 a4 4 0 0 1 -4 -4 V4 a4 4 0 0 1 4 -4 Z" fill={project.shell} />
      <path d="M4 0 H70 L82 12 V85.5 a4 4 0 0 1 -4 4 H4 a4 4 0 0 1 -4 -4 V4 a4 4 0 0 1 4 -4 Z" fill={`url(#${id}s)`} />
      <g stroke={light ? '#00000033' : '#ffffff33'} strokeWidth="1.5">
        <line x1="10" y1="6" x2="62" y2="6" />
        <line x1="10" y1="10" x2="62" y2="10" />
        <line x1="10" y1="14" x2="62" y2="14" />
      </g>
      <rect x="8" y="21" width="66" height="61" rx="3" fill="#f3ecdc" />
      <LabelArt id={project.id} />
      <text x="41" y="77" textAnchor="middle" fill="#2a1f17" fontFamily="var(--font-pixel)" fontSize="7.4">
        {project.cartLabel}
      </text>
    </svg>
  )
}

function LabelArt({ id }: { id: string }) {
  switch (id) {
    case 'content-agent':
      return (
        <g>
          <rect x="12" y="26" width="58" height="40" fill="#e9c27a" />
          <circle cx="54" cy="36" r="6" fill="#b8582e" />
          <path d="M18 66 L34 42 L50 66 Z" fill="#7a4a24" />
          <path d="M40 66 L52 50 L64 66 Z" fill="#a0683a" />
        </g>
      )
    case 'trade-pipeline':
      return (
        <g>
          <rect x="12" y="26" width="58" height="40" fill="#1f3442" />
          {[16, 25, 34, 43, 52, 61].map((x, i) => (
            <rect key={x} x={x} y={62 - [10, 18, 14, 26, 22, 32][i]} width="6" height={[10, 18, 14, 26, 22, 32][i]} fill={i % 2 ? '#8bac0f' : '#c8e06a'} />
          ))}
        </g>
      )
    case 'titanic':
      return (
        <g>
          <rect x="12" y="26" width="58" height="40" fill="#cfe0e6" />
          <path d="M18 50 H64 L58 58 H24 Z" fill="#2a1f17" />
          <rect x="28" y="42" width="24" height="8" fill="#f3ecdc" stroke="#2a1f17" />
          <rect x="34" y="34" width="5" height="8" fill="#b8582e" />
          <rect x="43" y="34" width="5" height="8" fill="#b8582e" />
          <path d="M12 62 q7 -4 14 0 t14 0 t14 0 t16 0 V66 H12 Z" fill="#3f6b80" />
        </g>
      )
    case 'seifomara':
      return (
        <g>
          <rect x="12" y="26" width="58" height="40" fill="#6b4429" />
          <rect x="22" y="33" width="26" height="18" rx="2" fill="#c7cacc" />
          <circle cx="57" cy="40" r="6" fill="#ede3cc" />
          <circle cx="57" cy="40" r="3.6" fill="#7a4a24" />
          <rect x="50" y="52" width="12" height="9" rx="1.5" fill="#c7c2b6" />
        </g>
      )
    default:
      return (
        <g>
          <rect x="12" y="26" width="58" height="40" fill="none" stroke="#2a1f17" strokeDasharray="3 3" />
          <text x="41" y="52" textAnchor="middle" fill="#2a1f17" fontFamily="var(--font-pixel)" fontSize="16">??</text>
        </g>
      )
  }
}

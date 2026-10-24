/** Closed A5 kraft notebook with an elastic band. 150 × 210 (15 × 21 cm). */
export function NotebookArt() {
  return (
    <svg viewBox="0 0 150 210" className="art" aria-hidden="true">
      <rect x="3" y="3" width="147" height="207" rx="5" fill="#efe7d4" />
      <rect x="4" y="4" width="146" height="206" rx="5" fill="none" stroke="#d8ccb3" />
      <rect width="146" height="206" rx="5" fill="#a67d52" />
      <rect width="12" height="206" rx="5" fill="#8c6640" />
      <rect x="12" y="0" width="1.2" height="206" fill="#7a5735" />
      <rect x="120" y="0" width="6" height="206" fill="#2a1f17" />
      <rect x="120" y="0" width="1.4" height="206" fill="#4a3a2c" />
      <g transform="rotate(-2 72 62)">
        <rect x="28" y="42" width="84" height="40" rx="2" fill="#f3ecdc" />
        <text x="70" y="68" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="17" fill="#2a1f17">
          12 weeks
        </text>
      </g>
    </svg>
  )
}

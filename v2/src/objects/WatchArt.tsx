/** Wristwatch from above: Madrid on the main dial, Cairo on the sub-dial. 120 × 250. */
export function WatchArt({ madrid = [10, 10], cairo = [11, 10] }: { madrid?: [number, number]; cairo?: [number, number] }) {
  const [mh, mm] = madrid
  const [ch, cm] = cairo
  return (
    <svg viewBox="0 0 120 250" className="art" aria-hidden="true">
      <rect x="32" y="0" width="56" height="250" rx="12" fill="#4a3426" />
      <rect x="32" y="0" width="56" height="250" rx="12" fill="none" stroke="#2f1f15" />
      <g stroke="#c9a97c" strokeDasharray="3 3" strokeWidth="1">
        <line x1="38" y1="6" x2="38" y2="70" /><line x1="82" y1="6" x2="82" y2="70" />
        <line x1="38" y1="180" x2="38" y2="244" /><line x1="82" y1="180" x2="82" y2="244" />
      </g>
      <circle cx="60" cy="125" r="52" fill="#b9bcbf" />
      <circle cx="60" cy="125" r="52" fill="none" stroke="#e6e8ea" strokeWidth="2" />
      <circle cx="60" cy="125" r="44" fill="#efe7d6" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="60" y1="84" x2="60" y2={i % 3 === 0 ? 92 : 88} stroke="#2a1f17" strokeWidth={i % 3 === 0 ? 2.2 : 1.2} transform={`rotate(${i * 30} 60 125)`} />
      ))}
      <text x="60" y="106" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="#6d5d4c">Madrid</text>
      <circle cx="60" cy="146" r="12" fill="#e2d8c3" stroke="#bfb29a" />
      <text x="60" y="166" textAnchor="middle" fontFamily="var(--font-body)" fontSize="6" fill="#6d5d4c">Cairo</text>
      <line x1="60" y1="146" x2="60" y2="139" stroke="#b8582e" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${(ch % 12) * 30 + cm / 2} 60 146)`} />
      <line x1="60" y1="146" x2="60" y2="136" stroke="#2a1f17" strokeWidth="1" strokeLinecap="round" transform={`rotate(${cm * 6} 60 146)`} />
      <line x1="60" y1="125" x2="60" y2="100" stroke="#2a1f17" strokeWidth="3.2" strokeLinecap="round" transform={`rotate(${(mh % 12) * 30 + mm / 2} 60 125)`} />
      <line x1="60" y1="125" x2="60" y2="90" stroke="#2a1f17" strokeWidth="2" strokeLinecap="round" transform={`rotate(${mm * 6} 60 125)`} />
      <circle cx="60" cy="125" r="3" fill="#b8582e" />
      <rect x="110" y="119" width="7" height="12" rx="2" fill="#a3a7aa" />
    </svg>
  )
}

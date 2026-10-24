import { useId } from 'react'

/** Closed laptop seen from above: aluminium lid with three stickers. 520 × 358. */
export function LaptopLid() {
  const id = useId()
  return (
    <svg viewBox="0 0 520 358" className="art" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}al`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9dcdd" />
          <stop offset="0.55" stopColor="#c2c6c8" />
          <stop offset="1" stopColor="#a3a8ac" />
        </linearGradient>
        <radialGradient id={`${id}lamp`} cx="0.15" cy="0.1" r="0.9">
          <stop offset="0" stopColor="#fff7e6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff7e6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="520" height="358" rx="20" fill={`url(#${id}al)`} />
      <rect width="520" height="358" rx="20" fill={`url(#${id}lamp)`} />
      <rect x="0" y="0" width="520" height="12" rx="6" fill="#8d9296" opacity="0.55" />
      <rect x="230" y="352" width="60" height="6" rx="3" fill="#8d9296" />
      <rect x="1" y="1" width="518" height="356" rx="19.5" fill="none" stroke="#ffffff" strokeOpacity="0.5" />

      {/* IE University sticker (text, not the official logo) */}
      <g transform="translate(58 74) rotate(-7)">
        <rect x="-5" y="-5" width="170" height="74" rx="14" fill="#fbfaf7" />
        <rect width="160" height="64" rx="10" fill="#0b2a4a" />
        <text x="80" y="40" textAnchor="middle" fill="#fbfaf7" fontFamily="var(--font-display)" fontWeight="700" fontSize="23">
          IE University
        </text>
      </g>

      {/* clay court sticker */}
      <g transform="translate(306 58) rotate(6)">
        <rect x="-5" y="-5" width="160" height="100" rx="10" fill="#fbfaf7" />
        <rect width="150" height="90" rx="6" fill="#c0643a" />
        <g fill="none" stroke="#f6efe4" strokeWidth="2.2">
          <rect x="12" y="10" width="126" height="70" />
          <line x1="12" y1="19" x2="138" y2="19" />
          <line x1="12" y1="71" x2="138" y2="71" />
          <line x1="44" y1="19" x2="44" y2="71" />
          <line x1="106" y1="19" x2="106" y2="71" />
          <line x1="44" y1="45" x2="106" y2="45" />
        </g>
        <line x1="75" y1="6" x2="75" y2="84" stroke="#3b2a20" strokeWidth="3" />
      </g>

      {/* Cairo–Madrid luggage tag */}
      <g transform="translate(176 212) rotate(-3)">
        <path d="M0 10 L22 0 H178 a8 8 0 0 1 8 8 V70 a8 8 0 0 1 -8 8 H22 L0 68 Z" fill="#fbfaf7" />
        <path d="M6 13 L24 6 H174 a5 5 0 0 1 5 5 V67 a5 5 0 0 1 -5 5 H24 L6 65 Z" fill="#ede3cc" />
        <circle cx="20" cy="39" r="6" fill="#c2c6c8" stroke="#a3a8ac" />
        <text x="108" y="47" textAnchor="middle" fill="#2a1f17" fontFamily="var(--font-display)" fontWeight="700" fontSize="21">
          Cairo–Madrid
        </text>
        <line x1="40" y1="60" x2="172" y2="60" stroke="#b8582e" strokeWidth="2" strokeDasharray="5 4" />
      </g>
    </svg>
  )
}

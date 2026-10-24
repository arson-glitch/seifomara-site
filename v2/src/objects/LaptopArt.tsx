import { useId } from 'react'

const LID = 'M20 0 H500 a20 20 0 0 1 20 20 V338 a20 20 0 0 1 -20 20 H20 a20 20 0 0 1 -20 -20 V20 a20 20 0 0 1 20 -20 Z'

/**
 * Closed laptop seen from above: brushed aluminium lid, hinge along the bottom,
 * lamp light from the upper left, three stickers. 520 × 358 (30 × 20.6 cm).
 */
export function LaptopLid() {
  const id = useId()
  return (
    <svg viewBox="0 0 520 358" className="art" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}al`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcdfe0" />
          <stop offset="0.5" stopColor="#c4c8ca" />
          <stop offset="1" stopColor="#a4a9ad" />
        </linearGradient>
        <radialGradient id={`${id}lamp`} cx="0.12" cy="0.05" r="0.95">
          <stop offset="0" stopColor="#fff6e4" stopOpacity="0.6" />
          <stop offset="0.6" stopColor="#fff6e4" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff6e4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}hinge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f9498" />
          <stop offset="0.45" stopColor="#7b8085" />
          <stop offset="1" stopColor="#5f6468" />
        </linearGradient>
        <filter id={`${id}brush`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0025 0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.2 0 0 0 -0.5" />
        </filter>
        <filter id={`${id}brushDark`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.003 0.7" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.32  0 0 0 0 0.34  1.1 0 0 0 -0.55" />
        </filter>
        <filter id={`${id}soft`}>
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id={`${id}clip`}>
          <path d={LID} />
        </clipPath>
      </defs>

      <path d={LID} fill={`url(#${id}al)`} />
      <g clipPath={`url(#${id}clip)`}>
        <rect width="520" height="358" filter={`url(#${id}brush)`} opacity="0.5" />
        <rect width="520" height="358" filter={`url(#${id}brushDark)`} opacity="0.35" />
        <rect width="520" height="358" fill={`url(#${id}lamp)`} />
        {/* inner shadow: a blurred dark rim just inside the edge */}
        <path d={LID} fill="none" stroke="#2c3034" strokeWidth="16" opacity="0.22" filter={`url(#${id}soft)`} />

        {/* hinge along the bottom */}
        <rect x="0" y="336" width="520" height="22" fill={`url(#${id}hinge)`} />
        <line x1="0" y1="336.5" x2="520" y2="336.5" stroke="#4f5357" strokeWidth="1.2" />
        <line x1="0" y1="338" x2="520" y2="338" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
        <rect x="44" y="343" width="86" height="7" rx="3.5" fill="#55595d" opacity="0.6" />
        <rect x="390" y="343" width="86" height="7" rx="3.5" fill="#55595d" opacity="0.6" />
      </g>

      {/* thumb notch on the opening edge */}
      <path d="M226 0 H294 a6 6 0 0 1 -6 6 H232 a6 6 0 0 1 -6 -6 Z" fill="#8d9296" opacity="0.7" />

      {/* edge highlight on the lit (upper-left) side */}
      <path d="M2.5 336 V20 a17.5 17.5 0 0 1 17.5 -17.5 H500" fill="none" stroke={`url(#${id}edge)`} strokeWidth="2.5" strokeLinecap="round" />
      <path d={LID} fill="none" stroke="#6f7478" strokeOpacity="0.55" />

      {/* IE University sticker (text, not the official logo) */}
      <g transform="translate(58 70) rotate(-7)">
        <rect x="-5" y="-5" width="170" height="74" rx="14" fill="#fbfaf7" />
        <rect width="160" height="64" rx="10" fill="#0b2a4a" />
        <text x="80" y="40" textAnchor="middle" fill="#fbfaf7" fontFamily="var(--font-display)" fontWeight="700" fontSize="23">
          IE University
        </text>
      </g>

      {/* clay court sticker */}
      <g transform="translate(306 54) rotate(6)">
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
      <g transform="translate(176 206) rotate(-3)">
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

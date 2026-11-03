// Writes the cartridge thumbnails in public/cartridges/. Same shell as the v2 desk
// cartridges (branch v2-desk, v2/src/objects/CartridgeArt.tsx), static SVG.
// Add a new label to LABELS, then run: node scripts/make-cartridges.mjs
import { writeFileSync } from 'node:fs';
import { pixelPath, pixelWidth } from '../src/lib/pixel-font.mjs';

const SHELL = 'M4 0 H70 L82 12 V85.5 a4 4 0 0 1 -4 4 H4 a4 4 0 0 1 -4 -4 V4 a4 4 0 0 1 4 -4 Z';

const LABELS = {
  'atwa-studio': {
    shell: '#B8582E',
    caption: 'ATWA',
    art: `
    <rect x="12" y="26" width="58" height="40" fill="#e9c27a"/>
    <path d="M33 37 q-3 -3 0 -6 M41 36 q-3 -3 0 -6 M49 37 q-3 -3 0 -6" fill="none" stroke="#f3ecdc" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M27 40 H55 V52 a8 8 0 0 1 -8 8 H35 a8 8 0 0 1 -8 -8 Z" fill="#7a4a24"/>
    <path d="M55 43 h3 a4.5 4.5 0 0 1 0 9 h-3" fill="none" stroke="#7a4a24" stroke-width="2.4"/>
    <rect x="27" y="40" width="28" height="3" fill="#5c3519"/>
    <circle cx="36" cy="48" r="1.8" fill="#f3ecdc"/>
    <circle cx="46" cy="48" r="1.8" fill="#f3ecdc"/>
    <path d="M37 53 q4 3.5 8 0" fill="none" stroke="#f3ecdc" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="33" cy="51.5" r="1.4" fill="#b8582e"/>
    <circle cx="49" cy="51.5" r="1.4" fill="#b8582e"/>
    <rect x="22" y="60" width="38" height="2.4" rx="1.2" fill="#a0683a"/>`,
  },
  'meteora-lp': {
    shell: '#2E4A5C',
    caption: 'METEORA',
    art: (() => {
      const heights = [6, 10, 15, 21, 27, 21, 15, 10, 6];
      const bars = heights
        .map((h, i) => {
          const x = 15 + i * 6;
          const fill = i === 4 ? '#c8e06a' : i < 4 ? '#5f8a9c' : '#8bb0bf';
          return `<rect x="${x}" y="${62 - h}" width="5" height="${h}" fill="${fill}"/>`;
        })
        .join('');
      return `
    <rect x="12" y="26" width="58" height="40" fill="#1f3442"/>
    ${bars}
    <path d="M41.5 31 v4" stroke="#c8e06a" stroke-width="1.2"/>
    <path d="M39 29 h5 l-2.5 3 Z" fill="#c8e06a"/>
    <rect x="14" y="62" width="54" height="1.2" fill="#5f8a9c"/>`;
    })(),
  },
  sniper: {
    shell: '#8E8A80',
    caption: 'RETIRED',
    art: `
    <rect x="12" y="26" width="58" height="40" fill="#d8d3c8"/>
    <path d="M14 36 L22 33 L28 41 L35 38 L42 48 L50 46 L58 57 L68 60" fill="none" stroke="#a9a397" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="41" cy="46" r="11" fill="none" stroke="#2a1f17" stroke-width="1.6"/>
    <circle cx="41" cy="46" r="5" fill="none" stroke="#2a1f17" stroke-width="1"/>
    <path d="M41 31 v8 M41 53 v8 M26 46 h8 M48 46 h8" stroke="#2a1f17" stroke-width="1.6"/>
    <circle cx="41" cy="46" r="1.3" fill="#b8582e"/>`,
  },
  blank: {
    shell: '#8E8A80',
    caption: 'SOON',
    art: `
    <rect x="12.5" y="26.5" width="57" height="39" fill="none" stroke="#2a1f17" stroke-dasharray="3 3"/>
    <path d="${pixelPath('??', 41 - (pixelWidth('??') * 2.4) / 2, 40, 2.4)}" fill="#2a1f17"/>`,
  },
};

function cartridge({ shell, caption, art }) {
  const light = shell === '#D9CBB0' || shell === '#8E8A80';
  const size = 1.1;
  const cx = 41 - (pixelWidth(caption) * size) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 89.5" width="164" height="179">
  <defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"/><stop offset="1" stop-color="#000" stop-opacity="0.12"/></linearGradient></defs>
  <path d="${SHELL}" fill="${shell}"/>
  <path d="${SHELL}" fill="url(#s)"/>
  <g stroke="${light ? '#00000033' : '#ffffff33'}" stroke-width="1.5"><line x1="10" y1="6" x2="62" y2="6"/><line x1="10" y1="10" x2="62" y2="10"/><line x1="10" y1="14" x2="62" y2="14"/></g>
  <rect x="8" y="21" width="66" height="61" rx="3" fill="#f3ecdc"/>
  <g>${art}
  </g>
  <path d="${pixelPath(caption, cx, 71.5, size)}" fill="#2a1f17"/>
</svg>
`;
}

for (const [name, label] of Object.entries(LABELS)) {
  writeFileSync(new URL(`../public/cartridges/${name}.svg`, import.meta.url), cartridge(label));
  console.log(`public/cartridges/${name}.svg`);
}

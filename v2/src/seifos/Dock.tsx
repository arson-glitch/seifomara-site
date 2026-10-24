export const SECTIONS = [
  { id: 'projects', label: 'Projects' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type Section = (typeof SECTIONS)[number]['id']

export function Dock({ active, onSelect }: { active: Section; onSelect: (s: Section) => void }) {
  return (
    <nav className="dock" aria-label="SeifOS">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className="dock__item"
          aria-current={active === s.id ? 'page' : undefined}
          onClick={() => onSelect(s.id)}
        >
          <DockIcon id={s.id} />
          <span>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}

function DockIcon({ id }: { id: Section }) {
  const common = { width: 26, height: 26, viewBox: '0 0 26 26', 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'projects':
      return (
        <svg {...common}>
          <path d="M5 3h13l3 3v17H5z" />
          <rect x="8" y="9" width="10" height="9" rx="1" />
        </svg>
      )
    case 'work':
      return (
        <svg {...common}>
          <rect x="3" y="8" width="20" height="14" rx="2" />
          <path d="M9 8V5h8v3M3 14h20" />
        </svg>
      )
    case 'about':
      return (
        <svg {...common}>
          <circle cx="13" cy="9" r="4.5" />
          <path d="M4.5 23c1.2-4.6 4.4-7 8.5-7s7.3 2.4 8.5 7" />
        </svg>
      )
    case 'contact':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="20" height="14" rx="2" />
          <path d="M3.5 7l9.5 7 9.5-7" />
        </svg>
      )
  }
}

import { strings } from '../content/strings'
import { navigate } from '../lib/useHashRoute'
import { useSound } from '../lib/useSound'
import './ui.css'

export function TopBar() {
  const { enabled, toggle } = useSound()
  return (
    <header className="topbar">
      <a className="topbar__name" href="#/" aria-label="Seif Omara, back to the desk">
        {strings.topName}
      </a>
      <div className="topbar__actions">
        <button type="button" className="topbar__work" onClick={() => navigate('os/work')}>
          {strings.workCta}
        </button>
        <button
          type="button"
          className="topbar__sound"
          aria-pressed={enabled}
          onClick={toggle}
          title={enabled ? strings.soundOn : strings.soundOff}
        >
          <SpeakerIcon on={enabled} />
          <span className="visually-hidden">Sound</span>
        </button>
      </div>
    </header>
  )
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
          <path d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
        </>
      ) : (
        <path d="M16 9.5l5 5M21 9.5l-5 5" />
      )}
    </svg>
  )
}

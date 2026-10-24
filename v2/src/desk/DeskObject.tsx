import type { CSSProperties, ReactNode } from 'react'
import { ObjectArt } from './ObjectArt'
import { placeVars, type Placement } from './layout'

type Props = {
  label: string
  place: Placement
  onActivate: () => void
  photo?: string
  className?: string
  children: ReactNode
}

/** Anything you can pick up. Always a real <button>: focusable, labelled, at least 44px. */
export function DeskObject({ label, place, onActivate, photo, className = '', children }: Props) {
  return (
    <button
      type="button"
      className={`desk-obj ${className}`}
      style={placeVars(place) as CSSProperties}
      aria-label={label}
      onClick={onActivate}
    >
      <span className="desk-obj__art">
        <ObjectArt photo={photo}>{children}</ObjectArt>
      </span>
    </button>
  )
}

/** Decorative things on the desk that do nothing on their own (e.g. the racket). */
export function DeskProp({ place, children }: { place: Placement; children: ReactNode }) {
  return (
    <div className="desk-prop" style={placeVars(place) as CSSProperties} aria-hidden="true">
      {children}
    </div>
  )
}

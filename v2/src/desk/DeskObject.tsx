import type { CSSProperties, ReactNode } from 'react'
import { ObjectArt } from './ObjectArt'
import { placeVars, type Placement } from './layout'

/**
 * The clickable part of the drawing, as CSS inset from each edge (top right bottom left).
 * Only this area takes the pointer, so transparent corners never cover what lies underneath.
 */
export type Hit = { inset?: string; round?: boolean }

type Props = {
  label: string
  place: Placement
  onActivate: () => void
  photo?: string
  hit?: Hit
  className?: string
  children: ReactNode
}

/** Anything you can pick up. Always a real <button>: focusable, labelled, at least 44px. */
export function DeskObject({ label, place, onActivate, photo, hit, className = '', children }: Props) {
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
      <span
        className="desk-obj__hit"
        style={{ inset: hit?.inset ?? '0', borderRadius: hit?.round ? '50%' : undefined }}
        aria-hidden="true"
      />
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

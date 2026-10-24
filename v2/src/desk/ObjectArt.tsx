import type { ReactNode } from 'react'

/** Shows the owner's photo when one is set in content/objects.ts, otherwise the drawn art. */
export function ObjectArt({ photo, children }: { photo?: string; children: ReactNode }) {
  if (photo) return <img className="art art--photo" src={photo} alt="" decoding="async" />
  return <>{children}</>
}

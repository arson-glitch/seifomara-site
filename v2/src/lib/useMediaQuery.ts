import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Matches the CSS breakpoint where the desk switches to its tall, scrolling phone layout. */
export const COMPACT_QUERY = '(max-width: 899px), (max-aspect-ratio: 1/1)'

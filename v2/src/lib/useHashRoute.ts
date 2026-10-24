import { useSyncExternalStore } from 'react'

/** Routes look like `#/os/work` or `#/play/titanic`; the desk itself is `#/` (or no hash). */
export type Route = { segments: string[] }

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const getHash = () => window.location.hash

export function parseRoute(hash: string): Route {
  return { segments: hash.replace(/^#\/?/, '').split('/').filter(Boolean) }
}

export function useHashRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')
  return parseRoute(hash)
}

/** Open a view. Remembers that we came from inside the site so closing can use history.back(). */
export function navigate(path: string) {
  const target = '#/' + path.replace(/^\/+/, '')
  if (window.location.hash === target) return
  history.pushState({ inApp: true }, '', target)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

/** Back to the desk. Uses history.back() when the view was opened in-app, so Back and Close match. */
export function closeToDesk() {
  if ((history.state as { inApp?: boolean } | null)?.inApp) {
    history.back()
  } else {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}

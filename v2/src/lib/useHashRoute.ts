import { useSyncExternalStore } from 'react'

/** Routes look like `#/os/work` or `#/play/titanic`; the desk itself is `#/` (or no hash). */
export type Route = { segments: string[] }

/** history.state for entries this app pushed: how many steps back the desk is. */
type AppState = { inApp: true; depth: number }

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  window.addEventListener('popstate', cb)
  return () => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener('popstate', cb)
  }
}
const getHash = () => window.location.hash

export function parseRoute(hash: string): Route {
  return { segments: hash.replace(/^#\/?/, '').split('/').filter(Boolean) }
}

export function useHashRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash, () => '')
  return parseRoute(hash)
}

const depth = () => (history.state as AppState | null)?.depth ?? 0

/**
 * Open a view. `replace` swaps the current entry instead of adding one (used for tabs inside a view,
 * so Back still leaves the view in one step).
 */
export function navigate(path: string, { replace = false } = {}) {
  const target = '#/' + path.replace(/^\/+/, '')
  if (window.location.hash === target) return
  if (replace && depth() > 0) {
    history.replaceState({ inApp: true, depth: depth() } satisfies AppState, '', target)
  } else {
    history.pushState({ inApp: true, depth: depth() + 1 } satisfies AppState, '', target)
  }
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

/** Back to the desk. Walks history back when the views were opened in-app, so Back and Close match. */
export function closeToDesk() {
  const d = depth()
  if (d > 0) {
    history.go(-d)
  } else {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}

/** One step back inside the app; if this view was opened directly (a shared link), go to `fallback`. */
export function goBack(fallback: string) {
  if (depth() > 1) history.back()
  else navigate(fallback, { replace: true })
}

export function readStore(key: string, store: 'local' | 'session' = 'local'): string | null {
  try {
    return (store === 'local' ? localStorage : sessionStorage).getItem(key)
  } catch {
    return null
  }
}

export function writeStore(key: string, value: string, store: 'local' | 'session' = 'local') {
  try {
    ;(store === 'local' ? localStorage : sessionStorage).setItem(key, value)
  } catch {
    /* storage unavailable (private mode, blocked): the setting just won't persist */
  }
}

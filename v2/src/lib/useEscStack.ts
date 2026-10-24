import { useEffect, useRef } from 'react'

/** Layers register a close handler; Esc closes only the top-most one. */
const stack: Array<{ current: () => void }> = []

function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape' || stack.length === 0) return
  e.preventDefault()
  stack[stack.length - 1].current()
}

export function useEscToClose(onClose: () => void, active = true) {
  const ref = useRef(onClose)
  ref.current = onClose
  useEffect(() => {
    if (!active) return
    if (stack.length === 0) window.addEventListener('keydown', onKey)
    stack.push(ref)
    return () => {
      stack.splice(stack.indexOf(ref), 1)
      if (stack.length === 0) window.removeEventListener('keydown', onKey)
    }
  }, [active])
}

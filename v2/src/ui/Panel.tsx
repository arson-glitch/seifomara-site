import { useEffect, useRef, useState, type ReactNode } from 'react'
import * as m from 'motion/react-m'
import { strings } from '../content/strings'
import { useEscToClose } from '../lib/useEscStack'
import { COMPACT_QUERY, useMediaQuery } from '../lib/useMediaQuery'
import './ui.css'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
  tone?: 'paper' | 'gb'
}

/** Side sheet on desktop, bottom sheet on phones. Render inside <AnimatePresence>. */
export function Panel({ title, onClose, children, tone = 'paper' }: Props) {
  const compact = useMediaQuery(COMPACT_QUERY)
  const ref = useRef<HTMLDivElement>(null)
  // Read during render, before the desk turns inert and drops focus.
  const [opener] = useState(() => document.activeElement as HTMLElement | null)
  useEscToClose(onClose)

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
    return () => opener?.focus?.({ preventScroll: true })
  }, [opener])

  const hidden = compact ? { y: '100%' } : { x: '100%' }

  return (
    <m.div
      ref={ref}
      className={`panel panel--${tone}`}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      initial={hidden}
      animate={{ x: 0, y: 0 }}
      exit={hidden}
      transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
    >
      <div className="panel__head">
        <h2 className="panel__title">{title}</h2>
        <button type="button" className="panel__close" onClick={onClose}>
          {strings.close}
        </button>
      </div>
      <div className="panel__body">{children}</div>
    </m.div>
  )
}

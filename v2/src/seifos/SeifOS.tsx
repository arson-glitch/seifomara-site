import { useEffect, useLayoutEffect, useRef } from 'react'
import { AnimatePresence, useAnimate } from 'motion/react'
import * as m from 'motion/react-m'
import { useEscToClose } from '../lib/useEscStack'
import { goBack, navigate } from '../lib/useHashRoute'
import { About } from './About'
import { Contact } from './Contact'
import { Dock, SECTIONS, type Section } from './Dock'
import { ProjectDetail } from './ProjectDetail'
import { Projects } from './Projects'
import { Work } from './Work'
import './seifos.css'

export type OsPhase = 'zooming-in' | 'open' | 'zooming-out'
export type OsMode = 'lid' | 'scale' | 'fade'

type Props = {
  phase: OsPhase
  mode: OsMode
  section: string | undefined
  projectId: string | undefined
  /** Where the zoom starts and ends: the laptop screen (lid mode) or the closed laptop (scale mode). */
  getFromRect: () => DOMRect | null
  onZoomedIn: () => void
  onZoomedOut: () => void
  onClose: () => void
}

const EASE = [0.2, 0, 0, 1] as const

export function SeifOS({ phase, mode, section, projectId, getFromRect, onZoomedIn, onZoomedOut, onClose }: Props) {
  const [scope, animate] = useAnimate()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const active: Section = SECTIONS.some((s) => s.id === section) ? (section as Section) : 'projects'
  const cb = useRef({ onZoomedIn, onZoomedOut })
  cb.current = { onZoomedIn, onZoomedOut }

  const project = active === 'projects' && projectId ? projectId : undefined
  // Esc steps out of a project first, then closes the laptop
  useEscToClose(() => (project ? goBack('os/projects') : onClose()), phase === 'open')

  /** Transform that makes the full-size screen sit exactly on the laptop's screen. */
  const fromTransform = () => {
    const from = getFromRect()
    const to = scope.current?.getBoundingClientRect()
    if (!from || !to || mode === 'fade') return null
    return {
      x: from.left - to.left,
      y: from.top - to.top,
      scaleX: from.width / to.width,
      scaleY: from.height / to.height,
    }
  }

  // measured once per open: re-running the effect (React dev mode does) must not re-measure mid-flight
  const startRef = useRef<ReturnType<typeof fromTransform> | undefined>(undefined)

  useLayoutEffect(() => {
    if (phase !== 'zooming-in') return
    if (startRef.current === undefined) startRef.current = fromTransform()
    const start = startRef.current
    const screen = scope.current.querySelector('.os__screen')
    let cancelled = false
    ;(async () => {
      animate('.os__backdrop', { opacity: [0, 1] }, { duration: 0.45 })
      if (start) {
        // keyframes, so the first painted frame already sits on the laptop screen. The tilted screen is a
        // trapezoid, the flat one a rectangle: fade across while they still overlap so there is no jump.
        animate(screen, { opacity: [mode === 'lid' ? 0 : 1, 1] }, { duration: mode === 'lid' ? 0.2 : 0 })
        await animate(
          screen,
          {
            x: [start.x, 0],
            y: [start.y, 0],
            scaleX: [start.scaleX, 1],
            scaleY: [start.scaleY, 1],
            borderRadius: [10, 0],
          },
          { duration: mode === 'lid' ? 0.6 : 0.42, ease: EASE },
        )
      } else {
        await animate(screen, { opacity: [0, 1] }, { duration: 0.2 })
      }
      if (!cancelled) cb.current.onZoomedIn()
    })()
    return () => {
      cancelled = true
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'open') headingRef.current?.focus({ preventScroll: true })
    if (phase !== 'zooming-out') return
    let cancelled = false
    ;(async () => {
      await animate('.os__ui', { opacity: 0 }, { duration: 0.12 })
      const end = fromTransform()
      const screen = scope.current.querySelector('.os__screen')
      animate('.os__backdrop', { opacity: 0 }, { duration: 0.4 })
      if (end) {
        const d = mode === 'lid' ? 0.5 : 0.36
        if (mode === 'lid') animate(screen, { opacity: 0 }, { duration: 0.18, delay: d - 0.18 })
        await animate(screen, { ...end, borderRadius: 10 }, { duration: d, ease: [0.4, 0, 1, 1] })
      } else {
        await animate(screen, { opacity: 0 }, { duration: 0.18 })
      }
      if (!cancelled) cb.current.onZoomedOut()
    })()
    return () => {
      cancelled = true
    }
  }, [phase])

  const title = SECTIONS.find((s) => s.id === active)!.label

  return (
    <div ref={scope} className="os" role="dialog" aria-label="SeifOS">
      <div className="os__backdrop" />
      <div className="os__screen">
        <m.div
          className="os__ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'open' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          inert={phase !== 'open'}
        >
          <div className="os__bar">
            <span className="os__brand">SeifOS</span>
            <button type="button" className="os__close" onClick={onClose}>
              Close laptop
            </button>
          </div>
          <div className="os__main">
            <Dock active={active} onSelect={(s) => navigate(`os/${s}`, { replace: true })} />
            <section className="os__window" aria-labelledby="os-title">
              <h2 id="os-title" ref={headingRef} tabIndex={-1} className="os__title">
                {title}
              </h2>
              <div className="os__body">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={project ? `p-${project}` : active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    {active === 'projects' && !project && <Projects />}
                    {project && <ProjectDetail id={project} />}
                    {active === 'work' && <Work />}
                    {active === 'about' && <About />}
                    {active === 'contact' && <Contact />}
                  </m.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </m.div>
      </div>
    </div>
  )
}

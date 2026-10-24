import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, LazyMotion, MotionConfig } from 'motion/react'
import { Desk, type LaptopControl } from './desk/Desk'
import { projects } from './content/projects'
import { closeToDesk, navigate, useHashRoute } from './lib/useHashRoute'
import { COMPACT_QUERY, REDUCED_MOTION_QUERY, useMediaQuery } from './lib/useMediaQuery'
import { readStore, writeStore } from './lib/storage'
import { SoundProvider } from './lib/useSound'
import type { LidPhase } from './objects/Laptop'
import type { OsMode, OsPhase } from './seifos/SeifOS'
import { Panel } from './ui/Panel'
import { TopBar } from './ui/TopBar'

const loadFeatures = () => import('./features').then((mod) => mod.default)
const SeifOS = lazy(() => import('./seifos/SeifOS').then((mod) => ({ default: mod.SeifOS })))

/** Stand-ins for the views built in later phases. */
const comingViews: Record<string, { title: string; phase: number }> = {
  play: { title: 'Handheld', phase: 3 },
  coffee: { title: 'Al Saif Coffee Egypt', phase: 4 },
  tennis: { title: 'Tennis, age 5–16', phase: 5 },
  music: { title: 'Playlist', phase: 5 },
  weeks: { title: '12 weeks', phase: 5 },
  time: { title: 'Madrid and Cairo', phase: 5 },
}

/**
 * The laptop's life cycle. Desk-side phases animate the lid; screen phases zoom SeifOS.
 * closed → lid-opening → zooming-in → open → zooming-out → lid-closing → closed
 * ('scale' and 'fade' modes skip the lid phases.)
 */
type OsState = { phase: 'closed' | 'lid-opening' | OsPhase | 'lid-closing'; mode: OsMode }

function AppInner() {
  const route = useHashRoute()
  const [view, sub, subId] = route.segments
  const compact = useMediaQuery(COMPACT_QUERY)
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY)
  const [showHint, setShowHint] = useState(() => readStore('hinted', 'session') !== '1')
  const [os, setOs] = useState<OsState>({ phase: 'closed', mode: 'fade' })

  const screenRef = useRef<HTMLSpanElement>(null)
  const lidRef = useRef<HTMLSpanElement>(null)
  const laptopButtonRef = useRef<HTMLButtonElement>(null)
  const openedByLaptop = useRef(false)
  const opener = useRef<HTMLElement | null>(null)

  const dismissHint = useCallback(() => {
    setShowHint(false)
    writeStore('hinted', '1', 'session')
  }, [])

  const open = useCallback(
    (path: string) => {
      dismissHint()
      navigate(path)
    },
    [dismissHint],
  )

  const coming = view ? comingViews[view] : undefined
  const wantOs = view === 'os'
  useEffect(() => {
    if (wantOs && os.phase === 'closed') {
      const fromLaptop = openedByLaptop.current
      openedByLaptop.current = false
      opener.current = fromLaptop ? laptopButtonRef.current : (document.activeElement as HTMLElement | null)
      const mode: OsMode = !fromLaptop || reduced ? 'fade' : compact ? 'scale' : 'lid'
      setOs({ phase: mode === 'lid' ? 'lid-opening' : 'zooming-in', mode })
    } else if (!wantOs && os.phase === 'open') {
      setOs((s) => ({ ...s, phase: 'zooming-out' }))
    } else if (os.phase === 'closed' && opener.current) {
      opener.current.focus({ preventScroll: true })
      opener.current = null
    }
  }, [wantOs, os.phase, compact, reduced])

  const laptop: LaptopControl = {
    phase: (
      { 'lid-opening': 'opening', 'lid-closing': 'closing', closed: 'closed' } as Record<string, LidPhase>
    )[os.phase] ?? (os.mode === 'lid' ? 'open' : 'closed'),
    screenRef,
    lidRef,
    buttonRef: laptopButtonRef,
    onOpen: () => {
      openedByLaptop.current = true
      open('os')
    },
    onOpened: () => setOs((s) => ({ ...s, phase: 'zooming-in' })),
    onClosed: () => setOs((s) => ({ ...s, phase: 'closed' })),
  }

  const getFromRect = () =>
    (os.mode === 'lid' ? screenRef.current : lidRef.current)?.getBoundingClientRect() ?? null

  const locked = Boolean(coming) || os.phase !== 'closed'
  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', locked)
  }, [locked])

  const osVisible = os.phase === 'zooming-in' || os.phase === 'open' || os.phase === 'zooming-out'
  const subtitle = view === 'play' ? projects.find((p) => p.id === sub)?.title : undefined

  return (
    <>
      <TopBar />
      <Desk
        open={open}
        laptop={laptop}
        insertedId="seifomara"
        showHint={showHint && !coming && os.phase === 'closed'}
        inert={Boolean(coming) || os.phase !== 'closed'}
      />
      {osVisible && (
        <Suspense fallback={null}>
          <SeifOS
            phase={os.phase as OsPhase}
            mode={os.mode}
            section={sub}
            projectId={subId}
            getFromRect={getFromRect}
            onZoomedIn={() => setOs((s) => ({ ...s, phase: 'open' }))}
            onZoomedOut={() => setOs((s) => ({ ...s, phase: s.mode === 'lid' ? 'lid-closing' : 'closed' }))}
            onClose={closeToDesk}
          />
        </Suspense>
      )}
      <AnimatePresence>
        {coming && (
          <Panel key={view} title={coming.title} onClose={closeToDesk}>
            {subtitle && <p>{subtitle}</p>}
            <p>Built in phase {coming.phase}.</p>
          </Panel>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <SoundProvider>
          <AppInner />
        </SoundProvider>
      </LazyMotion>
    </MotionConfig>
  )
}

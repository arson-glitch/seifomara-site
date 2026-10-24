import { useCallback, useState } from 'react'
import { AnimatePresence, LazyMotion, MotionConfig } from 'motion/react'
import { Desk } from './desk/Desk'
import { projects } from './content/projects'
import { closeToDesk, navigate, useHashRoute } from './lib/useHashRoute'
import { readStore, writeStore } from './lib/storage'
import { SoundProvider } from './lib/useSound'
import { Panel } from './ui/Panel'
import { TopBar } from './ui/TopBar'

const loadFeatures = () => import('./features').then((mod) => mod.default)

/** Phase-1 stand-ins for the views built in later phases. */
const comingViews: Record<string, { title: string; phase: number }> = {
  os: { title: 'SeifOS', phase: 2 },
  play: { title: 'Handheld', phase: 3 },
  coffee: { title: 'Al Saif Coffee Egypt', phase: 4 },
  tennis: { title: 'Tennis, age 5–16', phase: 5 },
  music: { title: 'Playlist', phase: 5 },
  weeks: { title: '12 weeks', phase: 5 },
  time: { title: 'Madrid and Cairo', phase: 5 },
}

export default function App() {
  const route = useHashRoute()
  const [view] = route.segments
  const [showHint, setShowHint] = useState(() => readStore('hinted', 'session') !== '1')

  const open = useCallback((path: string) => {
    setShowHint(false)
    writeStore('hinted', '1', 'session')
    navigate(path)
  }, [])

  const coming = view ? comingViews[view] : undefined
  const subtitle = view === 'play' ? projects.find((p) => p.id === route.segments[1])?.title : undefined

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <SoundProvider>
          <TopBar />
          <Desk open={open} insertedId="seifomara" showHint={showHint && !coming} inert={Boolean(coming)} />
          <AnimatePresence>
            {coming && (
              <Panel key={view} title={coming.title} onClose={closeToDesk}>
                {subtitle && <p>{subtitle}</p>}
                <p>Built in phase {coming.phase}.</p>
              </Panel>
            )}
          </AnimatePresence>
        </SoundProvider>
      </LazyMotion>
    </MotionConfig>
  )
}

import { useEffect, useRef, type RefObject } from 'react'
import { useAnimate, useMotionValue, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { LaptopDeck, LaptopLid } from './LaptopArt'

export type LidPhase = 'closed' | 'opening' | 'open' | 'closing'

type Props = {
  phase: LidPhase
  /** Undo the laptop's resting rotation while it is open, so the screen faces the viewer squarely. */
  straighten: number
  screenRef: RefObject<HTMLSpanElement | null>
  lidRef: RefObject<HTMLSpanElement | null>
  onOpened: () => void
  onClosed: () => void
}

const EASE = [0.2, 0, 0, 1] as const

/**
 * How far the lid opens. 90° is upright; past that it leans back, away from the viewer,
 * so the screen faces up toward us and shows above the keyboard, foreshortened.
 */
const OPEN_ANGLE = 110

/**
 * The laptop, viewer at the bottom edge: keyboard deck underneath, lid on top, hinge along the far (top) edge.
 * Opening swings the lid up and away around that hinge (rotateX with perspective); closing reverses it.
 */
export function LaptopModel({ phase, straighten, screenRef, lidRef, onOpened, onClosed }: Props) {
  const [scope, animate] = useAnimate()
  const angle = useMotionValue(phase === 'open' ? OPEN_ANGLE : 0)
  // past 90° we see the inside of the lid
  const frontOpacity = useTransform(angle, [89.9, 90], [1, 0])
  const backOpacity = useTransform(angle, [89.9, 90], [0, 1])
  const done = useRef({ onOpened, onClosed })
  done.current = { onOpened, onClosed }

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (phase === 'opening') {
        // square it up to the viewer while the lid lifts
        animate(scope.current, { rotate: straighten }, { duration: 0.5, ease: EASE })
        // gentler start than the house ease so the swing itself is visible
        await animate(angle, OPEN_ANGLE, { duration: 0.7, ease: [0.4, 0, 0.15, 1] })
        await animate('.lid__screen', { backgroundColor: 'var(--os-wallpaper)' }, { duration: 0.18 })
        if (!cancelled) done.current.onOpened()
      } else if (phase === 'closing') {
        await animate('.lid__screen', { backgroundColor: '#0d0e11' }, { duration: 0.15 })
        animate(scope.current, { rotate: 0 }, { duration: 0.45, delay: 0.25, ease: EASE })
        await animate(angle, 0, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
        if (!cancelled) done.current.onClosed()
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [phase, straighten, animate, angle, scope])

  return (
    <m.span ref={scope} className="laptop">
      <span className="laptop__deck">
        <LaptopDeck />
      </span>
      <m.span className="laptop__lid" style={{ rotateX: angle, transformPerspective: 1100 }}>
        <m.span ref={lidRef} className="lid__front" style={{ opacity: frontOpacity }}>
          <LaptopLid />
        </m.span>
        <m.span className="lid__back" style={{ opacity: backOpacity }}>
          <span className="lid__camera" />
          <span ref={screenRef} className="lid__screen" />
        </m.span>
      </m.span>
    </m.span>
  )
}

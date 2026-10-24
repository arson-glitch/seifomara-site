import type { CSSProperties } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { strings } from '../content/strings'
import { layout, placeVars } from './layout'

/** A sticky note on the laptop. The wrapper holds position and tilt; the note itself animates. */
export function Hint({ visible }: { visible: boolean }) {
  return (
    <div className="hint-pos" style={placeVars(layout.hint) as CSSProperties} aria-hidden={!visible}>
      <AnimatePresence>
        {visible && (
          <m.p
            key="hint"
            className="hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5, ease: [0.2, 0, 0, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {strings.hint}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}

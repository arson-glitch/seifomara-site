/**
 * Where everything sits on the desk, in design-canvas units (not %), so it is easy to nudge.
 * Desktop canvas is 1600 × 1000 and scales to fit the window.
 * Compact (phones, portrait tablets) canvas is 390 × 1400 and scrolls vertically.
 */
export type Place = { x: number; y: number; w: number; r?: number; z?: number }
export type Placement = { wide: Place; compact: Place }

export const CANVAS = {
  wide: { w: 1600, h: 1000 },
  compact: { w: 390, h: 1440 },
}

export const layout = {
  laptop: { wide: { x: 540, y: 200, w: 520 }, compact: { x: 31, y: 40, w: 328 } },
  hint: { wide: { x: 680, y: 610, w: 240, r: -3 }, compact: { x: 95, y: 290, w: 200, r: -3 } },
  coffee: { wide: { x: 110, y: 80, w: 260 }, compact: { x: 196, y: 660, w: 176 } },
  notebook: { wide: { x: 1240, y: 60, w: 220, r: 4 }, compact: { x: 22, y: 662, w: 150, r: -5 } },
  handheld: { wide: { x: 1210, y: 440, w: 150, r: -6, z: 2 }, compact: { x: 140, y: 380, w: 110, r: -4, z: 2 } },
  watch: { wide: { x: 130, y: 450, w: 116, r: -10 }, compact: { x: 44, y: 910, w: 92, r: -8 } },
  phone: { wide: { x: 340, y: 560, w: 136, r: 8 }, compact: { x: 236, y: 910, w: 100, r: 6 } },
  racket: { wide: { x: -90, y: 740, w: 320, r: 32 }, compact: { x: 230, y: 1170, w: 240, r: -28 } },
  ball: { wide: { x: 250, y: 880, w: 58 }, compact: { x: 160, y: 1210, w: 52 } },
} satisfies Record<string, Placement>

/** Scattered cartridge spots around the handheld, in the order of content/projects.ts. */
export const cartridgeSpots: Placement[] = [
  { wide: { x: 1085, y: 470, w: 84, r: -14 }, compact: { x: 26, y: 370, w: 72, r: -12 } },
  { wide: { x: 1070, y: 660, w: 84, r: 10 }, compact: { x: 34, y: 490, w: 72, r: 10 } },
  { wide: { x: 1400, y: 660, w: 84, r: -6 }, compact: { x: 290, y: 375, w: 72, r: 8 } },
  { wide: { x: 1410, y: 450, w: 84, r: 14 }, compact: { x: 286, y: 492, w: 72, r: -10 } },
  { wide: { x: 1230, y: 780, w: 84, r: -20 }, compact: { x: 166, y: 572, w: 72, r: 16 } },
]

export function placeVars(p: Placement): Record<string, string> {
  const v = (pl: Place, c: { w: number; h: number }, prefix: string) => ({
    [`--${prefix}x`]: `${(pl.x / c.w) * 100}%`,
    [`--${prefix}y`]: `${(pl.y / c.h) * 100}%`,
    [`--${prefix}w`]: `${(pl.w / c.w) * 100}%`,
    [`--${prefix}r`]: `${pl.r ?? 0}deg`,
    [`--${prefix}z`]: `${pl.z ?? 1}`,
  })
  return { ...v(p.wide, CANVAS.wide, ''), ...v(p.compact, CANVAS.compact, 'c') }
}

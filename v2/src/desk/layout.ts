/**
 * Where everything sits on the desk.
 *
 * Sizes are real-world centimetres (SIZE_CM); one scale constant per layout (CM) turns them into
 * design-canvas units. Positions are canvas units from the top-left, rotation in degrees, z = stacking.
 * Wide canvas (desktop, landscape) is 1600 × 1000 and scales to fit the window with no scrolling.
 * Compact canvas (phones, portrait tablets) is 390 wide and scrolls vertically.
 */
export const CANVAS = {
  wide: { w: 1600, h: 1000 },
  compact: { w: 390, h: 960 },
}

/** Canvas units per centimetre. */
export const CM = { wide: 17, compact: 10.6 }

/**
 * Width of each drawing in cm. Where the drawing has margin around the object,
 * the width is scaled so the object itself measures its real size.
 */
export const SIZE_CM = {
  laptop: 30,
  notebook: 15, // A5, 15 × 21
  handheld: 9, // 9 × 15
  cartridge: 5.5, // 5.5 × 6
  phone: 7, // 7 × 15
  coffee: (14 * 250) / 204, // saucer is 204 of the drawing's 250 units
  ball: (6.7 * 56) / 54, // ball is 54 of 56 units
  watch: (4 * 120) / 104, // watch case is 104 of 120 units
  racket: (27 * 300) / 234, // racket head (frame outside) is 234 of 300 units
  hint: 0, // sized by its text
}

export type SizeKey = keyof typeof SIZE_CM
export type Pos = { x: number; y: number; r?: number; z?: number }
export type Placement = { size: SizeKey; wide: Pos; compact: Pos }

export const layout = {
  laptop: { size: 'laptop', wide: { x: 585, y: 330, r: -3, z: 4 }, compact: { x: 34, y: 28, r: -3, z: 4 } },
  notebook: { size: 'notebook', wide: { x: 372, y: 84, r: -9, z: 2 }, compact: { x: 22, y: 392, r: -8, z: 1 } },
  coffee: { size: 'coffee', wide: { x: 60, y: 130, r: 0, z: 3 }, compact: { x: 168, y: 440, r: 0, z: 3 } },
  handheld: { size: 'handheld', wide: { x: 1215, y: 300, r: 7, z: 4 }, compact: { x: 224, y: 250, r: 8, z: 5 } },
  watch: { size: 'watch', wide: { x: 196, y: 480, r: 11, z: 2 }, compact: { x: 42, y: 640, r: -10, z: 3 } },
  phone: { size: 'phone', wide: { x: 380, y: 590, r: -7, z: 2 }, compact: { x: 266, y: 600, r: 9, z: 2 } },
  racket: { size: 'racket', wide: { x: -330, y: 700, r: 24, z: 1 }, compact: { x: 172, y: 690, r: -22, z: 1 } },
  ball: { size: 'ball', wide: { x: 250, y: 862, r: 0, z: 3 }, compact: { x: 140, y: 700, r: 0, z: 3 } },
  hint: { size: 'hint', wide: { x: 960, y: 600, r: 4, z: 6 }, compact: { x: 32, y: 152, r: -5, z: 6 } },
} satisfies Record<string, Placement>

/** Where each cartridge lies on the desk, in the order of content/projects.ts. */
export const cartridgeSpots: Placement[] = [
  { size: 'cartridge', wide: { x: 1400, y: 520, r: -9, z: 3 }, compact: { x: 40, y: 246, r: -11, z: 5 } },
  { size: 'cartridge', wide: { x: 1215, y: 615, r: 11, z: 3 }, compact: { x: 122, y: 300, r: 7, z: 3 } },
  { size: 'cartridge', wide: { x: 1310, y: 128, r: 8, z: 3 }, compact: { x: 312, y: 398, r: -9, z: 5 } },
  { size: 'cartridge', wide: { x: 1430, y: 300, r: -5, z: 3 }, compact: { x: 158, y: 372, r: 12, z: 3 } },
  // the "WEEK ??" cartridge was left on the notebook's lower half, clear of its label
  { size: 'cartridge', wide: { x: 440, y: 315, r: 8, z: 5 }, compact: { x: 70, y: 512, r: 9, z: 5 } },
]

export function placeVars(p: Placement): Record<string, string> {
  const v = (pos: Pos, kind: 'wide' | 'compact', prefix: string) => {
    const c = CANVAS[kind]
    const width = SIZE_CM[p.size] * CM[kind]
    return {
      [`--${prefix}x`]: `${(pos.x / c.w) * 100}%`,
      [`--${prefix}y`]: `${(pos.y / c.h) * 100}%`,
      [`--${prefix}w`]: width ? `${(width / c.w) * 100}%` : 'auto',
      [`--${prefix}r`]: `${pos.r ?? 0}deg`,
      [`--${prefix}z`]: `${pos.z ?? 1}`,
    }
  }
  return { ...v(p.wide, 'wide', ''), ...v(p.compact, 'compact', 'c') }
}

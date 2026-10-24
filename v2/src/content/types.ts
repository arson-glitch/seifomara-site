export type Link = { label: string; href: string }

/** Text that is still missing. Rendered as a visible [TO ADD: …] block. */
export type ToAdd = { toAdd: string }

export const toAdd = (what: string): ToAdd => ({ toAdd: what })
export const isToAdd = (v: unknown): v is ToAdd =>
  typeof v === 'object' && v !== null && 'toAdd' in v

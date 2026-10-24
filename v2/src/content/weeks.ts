import { toAdd, type ToAdd } from './types'

export type Week = { week: number; title: string | ToAdd; note: string | ToAdd }

export const weeksTitle = '12 weeks'

export const weeks: Week[] = Array.from({ length: 12 }, (_, i) => ({
  week: i + 1,
  title: toAdd(`week ${i + 1} title`),
  note: toAdd(`week ${i + 1} entry`),
}))

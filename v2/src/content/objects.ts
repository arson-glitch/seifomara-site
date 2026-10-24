/**
 * Every object on the desk. To use your own top-down photo instead of the drawn art,
 * add it to public/images/objects/ and set `photo`, e.g. photo: './images/objects/laptop.webp'.
 */
export type DeskObjectId =
  | 'laptop' | 'handheld' | 'coffee' | 'tennis' | 'phone' | 'notebook' | 'watch'

export type DeskObjectConfig = { id: DeskObjectId; label: string; photo?: string }

export const deskObjects: Record<DeskObjectId, DeskObjectConfig> = {
  laptop: { id: 'laptop', label: 'Laptop: open SeifOS (projects, work, contact)' },
  handheld: { id: 'handheld', label: 'Handheld console: play a project' },
  coffee: { id: 'coffee', label: 'Coffee cup: Al Saif Coffee Egypt photos' },
  tennis: { id: 'tennis', label: 'Tennis ball: tennis, age 5 to 16' },
  phone: { id: 'phone', label: 'Phone: play my playlist' },
  notebook: { id: 'notebook', label: 'Notebook: 12 weeks log' },
  watch: { id: 'watch', label: 'Watch: time in Madrid and Cairo' },
}

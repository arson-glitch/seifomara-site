import { isToAdd, type ToAdd } from '../content/types'
import './ui.css'

export function Placeholder({ what }: { what: string }) {
  return <span className="to-add">[TO ADD: {what}]</span>
}

/** Renders the text, or a visible placeholder when the content is still missing. */
export function Text({ value }: { value: string | ToAdd }) {
  return isToAdd(value) ? <Placeholder what={value.toAdd} /> : <>{value}</>
}

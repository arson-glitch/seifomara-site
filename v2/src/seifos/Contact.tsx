import { useEffect, useRef, useState } from 'react'
import { profile } from '../content/profile'
import { CvLink } from './CvLink'

export function Contact() {
  const [state, setState] = useState<'idle' | 'copied' | 'select'>('idle')
  const emailRef = useRef<HTMLSpanElement>(null)
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setState('copied')
    } catch {
      const range = document.createRange()
      range.selectNodeContents(emailRef.current!)
      getSelection()?.removeAllRanges()
      getSelection()?.addRange(range)
      setState('select')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  return (
    <div className="contact">
      <p className="contact__email">
        <span ref={emailRef}>{profile.email}</span>
      </p>
      <div className="contact__row">
        <button type="button" className="os-btn" onClick={copy}>
          {state === 'copied' ? 'Copied' : 'Copy email'}
        </button>
        <a className="os-btn os-btn--quiet" href={`mailto:${profile.email}`}>Write an email</a>
      </div>
      <p className="contact__status" role="status">
        {state === 'select' ? 'Selected. Press Ctrl+C or Cmd+C to copy.' : ''}
      </p>
      <p><a href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn: {profile.linkedin.label}</a></p>
      <p><CvLink /></p>
    </div>
  )
}

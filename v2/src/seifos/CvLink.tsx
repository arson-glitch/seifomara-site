import { profile } from '../content/profile'
import { Placeholder } from '../ui/Placeholder'

export function CvLink() {
  if (!profile.cv.available) return <Placeholder what="CV PDF at v2/public/cv.pdf" />
  return (
    <a className="os-btn" href={profile.cv.href} download={profile.cv.fileName}>
      Download CV (PDF)
    </a>
  )
}

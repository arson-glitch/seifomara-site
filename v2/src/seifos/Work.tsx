import { education } from '../content/education'
import { work } from '../content/work'
import { CvLink } from './CvLink'

export function Work() {
  return (
    <div className="work">
      <div className="work__cv"><CvLink /></div>
      {work.map((r) => (
        <article key={r.id} className="role">
          <h3 className="role__company">{r.company}</h3>
          {r.companyNote && <p className="role__note">{r.companyNote}</p>}
          <p className="role__meta">
            <span>{r.role}</span>
            <span>{r.when}</span>
          </p>
          <ul>
            {r.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
          {r.link && (
            <a href={r.link.href} target="_blank" rel="noopener noreferrer">{r.link.label}</a>
          )}
        </article>
      ))}
      <h3 className="work__edu">Education</h3>
      <ul className="edu" role="list">
        {education.map((e) => (
          <li key={e.title}>
            <span className="edu__title">{e.title}</span>
            <span className="edu__place">{e.place}</span>
            <span className="edu__when">{e.when}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

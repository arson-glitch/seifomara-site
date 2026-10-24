import { education } from '../content/education'
import { profile } from '../content/profile'
import { Placeholder } from '../ui/Placeholder'

export function About() {
  return (
    <div className="about">
      <h3 className="about__name">{profile.name}</h3>
      <p>{profile.study}. {profile.graduating}.</p>
      <p><Placeholder what="a few lines about you, in your words" /></p>
      <h4>Before IE</h4>
      <ul>
        {education.slice(1).map((e) => (
          <li key={e.title}>{e.title}, {e.place} ({e.when})</li>
        ))}
      </ul>
    </div>
  )
}

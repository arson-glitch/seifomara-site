import * as m from 'motion/react-m'
import { projects } from '../content/projects'
import { isToAdd } from '../content/types'
import { goBack, navigate } from '../lib/useHashRoute'
import { CartridgeArt } from '../objects/CartridgeArt'
import { Placeholder, Text } from '../ui/Placeholder'

export function ProjectDetail({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id)
  const back = () => goBack('os/projects')

  if (!p) {
    return (
      <div className="detail">
        <p>This project doesn't exist. Pick one from the list.</p>
        <button type="button" className="os-btn" onClick={() => navigate('os/projects', { replace: true })}>
          All projects
        </button>
      </div>
    )
  }

  return (
    <article className="detail">
      <button type="button" className="os-btn os-btn--quiet" onClick={back}>
        All projects
      </button>
      <header className="detail__head">
        <m.span className="detail__art" layoutId={`cart-${p.id}`}>
          <CartridgeArt project={p} />
        </m.span>
        <div>
          <h3 className="detail__title">{p.title}</h3>
          <p className="detail__what">{p.whatItIs}</p>
        </div>
      </header>

      <h4>What I built</h4>
      <p><Text value={p.whatIBuilt} /></p>

      <h4>Stack</h4>
      {isToAdd(p.stack) ? (
        <p><Placeholder what={p.stack.toAdd} /></p>
      ) : (
        <ul className="chips" role="list">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      )}

      <h4>What it shows about me</h4>
      <p><Text value={p.showsAboutMe} /></p>

      {p.links.length > 0 && (
        <>
          <h4>Links</h4>
          <ul className="links" role="list">
            {p.links.map((l, i) => (
              <li key={i}>
                {isToAdd(l) ? <Placeholder what={l.toAdd} /> : <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}

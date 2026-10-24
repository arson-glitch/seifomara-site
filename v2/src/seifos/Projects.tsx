import * as m from 'motion/react-m'
import { projects } from '../content/projects'
import { navigate } from '../lib/useHashRoute'
import { CartridgeArt } from '../objects/CartridgeArt'

export function Projects() {
  return (
    <ul className="carts" role="list">
      {projects.map((p) => (
        <li key={p.id}>
          <button type="button" className="cart-card" onClick={() => navigate(`os/projects/${p.id}`)}>
            <m.span className="cart-card__art" layoutId={`cart-${p.id}`}>
              <CartridgeArt project={p} />
            </m.span>
            <span className="cart-card__text">
              <span className="cart-card__title">{p.title}</span>
              <span className="cart-card__what">{p.whatItIs}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

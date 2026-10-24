import { deskObjects } from '../content/objects'
import { projects } from '../content/projects'
import { CartridgeArt } from '../objects/CartridgeArt'
import { CoffeeArt } from '../objects/CoffeeArt'
import { HandheldArt } from '../objects/HandheldArt'
import { LaptopLid } from '../objects/LaptopArt'
import { NotebookArt } from '../objects/NotebookArt'
import { PhoneArt } from '../objects/PhoneArt'
import { BallArt, RacketArt } from '../objects/TennisArt'
import { WatchArt } from '../objects/WatchArt'
import { DeskObject, DeskProp } from './DeskObject'
import { Hint } from './Hint'
import { cartridgeSpots, layout } from './layout'
import './desk.css'

type Props = {
  open: (path: string) => void
  insertedId: string
  showHint: boolean
  inert: boolean
}

export function Desk({ open, insertedId, showHint, inert }: Props) {
  const inserted = projects.find((p) => p.id === insertedId)!
  return (
    <main className="desk" inert={inert}>
      <h1 className="visually-hidden">Seif Omara: the desk</h1>
      <div className="desk__stage">
        <DeskObject label={deskObjects.laptop.label} place={layout.laptop} photo={deskObjects.laptop.photo} onActivate={() => open('os')}>
          <LaptopLid />
        </DeskObject>

        <DeskObject label={deskObjects.coffee.label} place={layout.coffee} photo={deskObjects.coffee.photo} onActivate={() => open('coffee')}>
          <CoffeeArt />
        </DeskObject>

        <DeskObject label={deskObjects.notebook.label} place={layout.notebook} photo={deskObjects.notebook.photo} onActivate={() => open('weeks')}>
          <NotebookArt />
        </DeskObject>

        <DeskObject
          label={`${deskObjects.handheld.label}. Now playing: ${inserted.title}`}
          place={layout.handheld}
          photo={deskObjects.handheld.photo}
          className="handheld"
          onActivate={() => open(`play/${inserted.id}`)}
        >
          <span className="handheld__cart">
            <CartridgeArt project={inserted} />
          </span>
          <HandheldArt />
        </DeskObject>

        {projects.map((p, i) =>
          p.id === insertedId ? null : (
            <DeskObject key={p.id} label={`Cartridge: ${p.title}`} place={cartridgeSpots[i]} className="cart" onActivate={() => open(`play/${p.id}`)}>
              <CartridgeArt project={p} />
            </DeskObject>
          ),
        )}

        <DeskObject label={deskObjects.watch.label} place={layout.watch} photo={deskObjects.watch.photo} onActivate={() => open('time')}>
          <WatchArt />
        </DeskObject>

        <DeskObject label={deskObjects.phone.label} place={layout.phone} photo={deskObjects.phone.photo} onActivate={() => open('music')}>
          <PhoneArt />
        </DeskObject>

        <DeskProp place={layout.racket}>
          <RacketArt />
        </DeskProp>
        <DeskObject label={deskObjects.tennis.label} place={layout.ball} photo={deskObjects.tennis.photo} onActivate={() => open('tennis')}>
          <BallArt />
        </DeskObject>

        <Hint visible={showHint} />
      </div>
    </main>
  )
}

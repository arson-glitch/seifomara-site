import { toAdd, type Link, type ToAdd } from './types'

export type Project = {
  id: string
  title: string
  /** Short title for the cartridge label (pixel font, keep it short). */
  cartLabel: string
  whatItIs: string
  whatIBuilt: string | ToAdd
  stack: string[] | ToAdd
  showsAboutMe: string | ToAdd
  links: (Link | ToAdd)[]
  /** Cartridge shell colour. */
  shell: string
  empty?: boolean
}

export const projects: Project[] = [
  {
    id: 'content-agent',
    title: 'Content Agent',
    cartLabel: 'CONTENT',
    whatItIs:
      'Automated content pipeline built with Grok, connected to Canva, for an Instagram art page about Egyptian art from the 1960s to today.',
    whatIBuilt: toAdd('what you built, in your words'),
    stack: ['Grok', 'Canva'],
    showsAboutMe: toAdd('what this project shows about you'),
    links: [toAdd('link'), toAdd('example post')],
    shell: '#B8582E',
  },
  {
    id: 'trade-pipeline',
    title: 'Trade Pipeline',
    cartLabel: 'PIPELINE',
    whatItIs:
      'Real-time Solana on-chain data pipeline, two-pass scoring engine, automated review-and-decision loop.',
    whatIBuilt: toAdd('what you built, in your words'),
    stack: ['Node.js', '~4,200 lines'],
    showsAboutMe: toAdd('what this project shows about you'),
    links: [toAdd('repo'), toAdd('diagram')],
    shell: '#2E4A5C',
  },
  {
    id: 'titanic',
    title: 'Titanic Package',
    cartLabel: 'TITANIC',
    whatItIs: 'EDA notebook turned into an installable Python package (IE coursework).',
    whatIBuilt: toAdd('what you built, in your words'),
    stack: ['Python'],
    showsAboutMe: toAdd('what this project shows about you'),
    links: [toAdd('repo')],
    shell: '#3F5E3A',
  },
  {
    id: 'seifomara',
    title: 'seifomara.com',
    cartLabel: 'THIS SITE',
    whatItIs: 'This site.',
    whatIBuilt: toAdd('what you built, in your words'),
    stack: ['React', 'TypeScript', 'Vite', 'Motion'],
    showsAboutMe: toAdd('what this project shows about you'),
    links: [{ label: 'GitHub repo', href: 'https://github.com/arson-glitch/seifomara-site' }],
    shell: '#D9CBB0',
  },
  {
    id: 'week',
    title: 'WEEK ??',
    cartLabel: 'WEEK ??',
    whatItIs: 'A new one every week.',
    whatIBuilt: toAdd("this week's project"),
    stack: toAdd('stack'),
    showsAboutMe: toAdd('what this project shows about you'),
    links: [],
    shell: '#8E8A80',
    empty: true,
  },
]

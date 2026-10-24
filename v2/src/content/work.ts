import type { Link } from './types'

export type Role = {
  id: string
  company: string
  companyNote?: string
  role: string
  when: string
  points: string[]
  link?: Link
}

export const work: Role[] = [
  {
    id: 'al-saif',
    company: 'Al Saif Coffee Egypt',
    role: 'Operations & Growth',
    when: 'Jun 2026–present',
    points: [
      'I run operations in Egypt: online store, Meta ads and B2B sales to hotels.',
      'Pitched six Cairo five-star hotels (Hilton, Marriott, Sheraton, Hyatt, Steigenberger, Four Seasons).',
      'Sheraton and Four Seasons asked for proposals; Four Seasons received samples.',
    ],
    link: { label: 'alsaifcoffeeeg.com', href: 'https://alsaifcoffeeeg.com' },
  },
  {
    id: 'atwa',
    company: 'Atwa Export, Import & Agencies',
    companyNote: 'Cairo, est. 1971',
    role: 'Sourcing & Business Development',
    when: 'Jan 2025–present',
    points: [
      'International sourcing with landed-cost and FTA-duty models (e.g. vegetable glycerine across Malaysia, Italy, Turkey).',
      'Segmenting Egyptian buyers from customs-import data.',
      'Secured approved-supplier status with Four Seasons.',
    ],
  },
]

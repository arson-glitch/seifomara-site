import type { Link } from './types'

export type CoffeePhoto = { id: string; src?: string; caption: string }

export const coffee = {
  title: 'Al Saif Coffee Egypt',
  body: [
    'I run operations in Egypt: online store, Meta ads and B2B sales to hotels.',
    'Pitched six Cairo five-star hotels (Hilton, Marriott, Sheraton, Hyatt, Steigenberger, Four Seasons); Sheraton and Four Seasons asked for proposals; Four Seasons received samples.',
  ],
  link: { label: 'alsaifcoffeeeg.com', href: 'https://alsaifcoffeeeg.com' } satisfies Link,
  /** Add `src: './images/coffee/<file>.webp'` once the photo is in public/images/coffee/. */
  photos: [
    { id: 'beans', caption: 'Our beans' },
    { id: 'packaging', caption: 'Packaging' },
    { id: 'brewing', caption: 'Brewing' },
    { id: 'hotel-samples', caption: 'Hotel samples' },
  ] as CoffeePhoto[],
}

// Self-hosted fonts (via @fontsource), latin subset only.
import display from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
import body400 from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-normal.woff2?url';
import body400i from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-italic.woff2?url';
import body700 from '@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-700-normal.woff2?url';

const face = (family: string, src: string, weight: string, style = 'normal') =>
  `@font-face{font-family:'${family}';src:url(${src}) format('woff2');font-weight:${weight};font-style:${style};font-display:swap}`;

export const preload = [display, body400];

export const fontCss = [
  face('Bricolage Grotesque Variable', display, '200 800'),
  face('Atkinson Hyperlegible Next', body400, '400'),
  face('Atkinson Hyperlegible Next', body400i, '400', 'italic'),
  face('Atkinson Hyperlegible Next', body700, '700'),
].join('');

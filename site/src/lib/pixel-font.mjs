// A tiny 5-row pixel alphabet in the spirit of the cartridge captions. Text is
// drawn as SVG paths, so no font has to be installed wherever it renders.
const G = {
  A: ['.##.', '#..#', '####', '#..#', '#..#'],
  B: ['###.', '#..#', '###.', '#..#', '###.'],
  C: ['.###', '#...', '#...', '#...', '.###'],
  D: ['###.', '#..#', '#..#', '#..#', '###.'],
  E: ['####', '#...', '###.', '#...', '####'],
  F: ['####', '#...', '###.', '#...', '#...'],
  G: ['.###', '#...', '#.##', '#..#', '.###'],
  H: ['#..#', '#..#', '####', '#..#', '#..#'],
  I: ['###', '.#.', '.#.', '.#.', '###'],
  J: ['...#', '...#', '...#', '#..#', '.##.'],
  K: ['#..#', '#.#.', '##..', '#.#.', '#..#'],
  L: ['#...', '#...', '#...', '#...', '####'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#'],
  N: ['#..#', '##.#', '#.##', '#..#', '#..#'],
  O: ['.##.', '#..#', '#..#', '#..#', '.##.'],
  P: ['###.', '#..#', '###.', '#...', '#...'],
  Q: ['.##.', '#..#', '#..#', '#.#.', '.#.#'],
  R: ['###.', '#..#', '###.', '#.#.', '#..#'],
  S: ['.###', '#...', '.##.', '...#', '###.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..'],
  U: ['#..#', '#..#', '#..#', '#..#', '.##.'],
  V: ['#...#', '#...#', '.#.#.', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#.#.#', '##.##', '#...#'],
  X: ['#..#', '#..#', '.##.', '#..#', '#..#'],
  Y: ['#...#', '.#.#.', '..#..', '..#..', '..#..'],
  Z: ['####', '...#', '.##.', '#...', '####'],
  0: ['.##.', '#..#', '#..#', '#..#', '.##.'],
  1: ['.#.', '##.', '.#.', '.#.', '###'],
  2: ['###.', '...#', '.##.', '#...', '####'],
  3: ['###.', '...#', '.##.', '...#', '###.'],
  4: ['#..#', '#..#', '####', '...#', '...#'],
  5: ['####', '#...', '###.', '...#', '###.'],
  6: ['.##.', '#...', '###.', '#..#', '.##.'],
  7: ['####', '...#', '..#.', '.#..', '.#..'],
  8: ['.##.', '#..#', '.##.', '#..#', '.##.'],
  9: ['.##.', '#..#', '.###', '...#', '.##.'],
  '?': ['###.', '...#', '.##.', '....', '.#..'],
  '.': ['.', '.', '.', '.', '#'],
  ',': ['.', '.', '.', '#', '#'],
  "'": ['#', '#', '.', '.', '.'],
  '-': ['...', '...', '###', '...', '...'],
  '&': ['.#..', '#.#.', '.#.#', '#.#.', '.#.#'],
  '/': ['...#', '..#.', '.#..', '#...', '#...'],
  ':': ['.', '#', '.', '#', '.'],
  ' ': ['..', '..', '..', '..', '..'],
};

const glyph = (ch) => G[ch.toUpperCase()] ?? G[' '];

/** Width of `text` in pixel units (1 unit gap between glyphs). */
export function pixelWidth(text) {
  const chars = [...text];
  return chars.reduce((w, ch) => w + glyph(ch)[0].length, 0) + Math.max(chars.length - 1, 0);
}

/** SVG path data for `text`, top-left at (x, y), each pixel `size` units square. */
export function pixelPath(text, x, y, size) {
  let d = '';
  let cx = 0;
  for (const ch of text) {
    const rows = glyph(ch);
    rows.forEach((row, ry) => {
      // Merge horizontal runs into one rect each.
      for (let rx = 0; rx < row.length; rx++) {
        if (row[rx] !== '#') continue;
        let run = 1;
        while (row[rx + run] === '#') run++;
        const px = +(x + (cx + rx) * size).toFixed(2);
        const py = +(y + ry * size).toFixed(2);
        d += `M${px} ${py}h${+(run * size).toFixed(2)}v${size}h${-(run * size).toFixed(2)}z`;
        rx += run - 1;
      }
    });
    cx += rows[0].length + 1;
  }
  return d;
}

/** Splits text into lines no wider than `maxUnits` pixel units. */
export function pixelWrap(text, maxUnits) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && pixelWidth(next) > maxUnits) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

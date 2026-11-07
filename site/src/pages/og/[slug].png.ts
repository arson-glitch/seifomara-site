// Build-time Open Graph images: the project's cartridge on a warm background,
// with the title set in the pixel font (drawn as paths, so no fonts are needed).
// The default (home) card shows the name, the intro and all project cartridges.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import sharp, { type OverlayOptions } from 'sharp';
import { getProjects } from '../../lib/site';
import { pixelPath, pixelWrap } from '../../lib/pixel-font.mjs';
import { rawContent as introText } from '../../content/intro.md';

const W = 1200;
const H = 630;

const BG = '#f6f1e7';
const INK = '#1c1814';
const CLAY = '#c8643c';

const renderCart = async (thumbnail: string, height: number) => {
  const src = await readFile(new URL(`../../../public${thumbnail}`, import.meta.url));
  return sharp(src, { density: 600 }).resize({ height }).png().toBuffer({ resolveWithObject: true });
};

export const getStaticPaths = (async () => {
  const projects = await getProjects();
  return [
    { params: { slug: 'default' }, props: { home: true, thumbnails: projects.map((p) => p.data.thumbnail) } },
    ...projects.map((p) => ({
      params: { slug: p.id },
      props: { title: p.data.title, thumbnail: p.data.thumbnail },
    })),
  ];
}) satisfies GetStaticPaths;

async function homeCard(thumbnails: string[]) {
  const intro = introText().replace(/\s+/g, ' ').trim();
  if (intro.includes('TO ADD')) throw new Error('intro.md still contains [TO ADD]; not drawing it into the OG image');

  const x = 80;
  const name = pixelPath('SEIF OMARA', x, 70, 15);
  const introSize = 5;
  const introLines = pixelWrap(intro.toUpperCase(), Math.floor((W - 2 * x) / introSize));
  const introTop = 70 + 15 * 5 + 45;
  const introPaths = introLines.map((l, i) => pixelPath(l, x, introTop + i * introSize * 8, introSize)).join('');
  const introBottom = introTop + introLines.length * introSize * 8;

  // Cartridges in a row, right-aligned, filling the space under the text.
  const gap = 28;
  const cartH = Math.min(240, H - 18 - 40 - (introBottom + 20));
  const carts = await Promise.all(thumbnails.map((t) => renderCart(t, cartH)));
  const total = carts.reduce((w, c) => w + c.info.width, 0) + gap * (carts.length - 1);
  let left = W - x - total;
  const cartTop = H - 18 - 40 - cartH;
  const layers: OverlayOptions[] = carts.map((c) => {
    const layer = { input: c.data, left, top: cartTop };
    left += c.info.width + gap;
    return layer;
  });

  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <rect x="0" y="${H - 18}" width="${W}" height="18" fill="${CLAY}"/>
    <path d="${name}" fill="${INK}"/>
    <path d="${introPaths}" fill="${INK}"/>
    <path d="${pixelPath('SEIFOMARA.COM', x, H - 18 - 40 - 25, 5)}" fill="${CLAY}"/>
  </svg>`);
  return sharp(bg).composite(layers).png().toBuffer();
}

export const GET: APIRoute = async ({ props }) => {
  if ((props as { home?: boolean }).home) {
    const png = await homeCard((props as { thumbnails: string[] }).thumbnails);
    return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
  }
  const { title, thumbnail } = props as { title: string; thumbnail: string };
  const textX = 570;
  const size = 11;
  const lines = pixelWrap(title.toUpperCase(), Math.floor((W - textX - 80) / size));
  const lineH = size * 8;
  const top = (H - lines.length * lineH + size * 3) / 2 - 30;
  const titlePaths = lines.map((line, i) => pixelPath(line, textX, top + i * lineH, size)).join('');

  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <rect x="0" y="${H - 18}" width="${W}" height="18" fill="${CLAY}"/>
    <path d="${titlePaths}" fill="${INK}"/>
    <path d="${pixelPath('SEIFOMARA.COM', textX, H - 110, 5)}" fill="${CLAY}"/>
  </svg>`);

  const cart = await renderCart(thumbnail, 440);
  const layers: OverlayOptions[] = [{ input: cart.data, left: 90, top: Math.round((H - 18 - 440) / 2) }];

  const png = await sharp(bg).composite(layers).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

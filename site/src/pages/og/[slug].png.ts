// Build-time Open Graph images: the project's cartridge on a warm background,
// with the title set in the pixel font (drawn as paths, so no fonts are needed).
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import sharp, { type OverlayOptions } from 'sharp';
import { getProjects } from '../../lib/site';
import { pixelPath, pixelWrap } from '../../lib/pixel-font.mjs';

const W = 1200;
const H = 630;

export const getStaticPaths = (async () => {
  const projects = await getProjects();
  return [
    { params: { slug: 'default' }, props: { title: 'Seif Omara', thumbnail: '/cartridges/blank.svg', showCart: false } },
    ...projects.map((p) => ({
      params: { slug: p.id },
      props: { title: p.data.title, thumbnail: p.data.thumbnail, showCart: true },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, thumbnail, showCart } = props as { title: string; thumbnail: string; showCart: boolean };
  const textX = showCart ? 570 : 100;
  const size = showCart ? 11 : 20;
  const lines = pixelWrap(title.toUpperCase(), Math.floor((W - textX - 80) / size));
  const lineH = size * 8;
  const top = (H - lines.length * lineH + size * 3) / 2 - 30;
  const titlePaths = lines.map((line, i) => pixelPath(line, textX, top + i * lineH, size)).join('');

  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#f6f1e7"/>
    <rect x="0" y="${H - 18}" width="${W}" height="18" fill="#c8643c"/>
    <path d="${titlePaths}" fill="#1c1814"/>
    <path d="${pixelPath('SEIFOMARA.COM', textX, H - 110, 5)}" fill="#c8643c"/>
  </svg>`);

  const layers: OverlayOptions[] = [];
  if (showCart) {
    const src = await readFile(new URL(`../../../public${thumbnail}`, import.meta.url));
    const cart = await sharp(src, { density: 600 }).resize({ height: 440 }).png().toBuffer();
    layers.push({ input: cart, left: 90, top: Math.round((H - 18 - 440) / 2) });
  }

  const png = await sharp(bg).composite(layers).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

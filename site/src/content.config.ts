import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { hasMarkdown } from './lib/has-markdown';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum(['Shipped', 'Built, launching soon', 'In progress', 'Retired']),
    date: z.coerce.date(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
    // Path under public/. Falls back to a blank cartridge so one .md file is enough.
    thumbnail: z.string().default('/cartridges/blank.svg'),
    links: z
      .object({
        github: z.url().optional(),
        live: z.url().optional(),
        demo: z.url().optional(),
      })
      .default({}),
  }),
});

const log = defineCollection({
  // Until the first post exists, skip the glob loader so an empty log builds without warnings.
  loader: hasMarkdown('src/content/log')
    ? glob({ pattern: '**/*.md', base: './src/content/log' })
    : { name: 'empty-log', load: async ({ store }) => store.clear() },
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

export const collections = { projects, log };

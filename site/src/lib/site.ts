import { existsSync } from 'node:fs';
import { getCollection } from 'astro:content';
import { hasMarkdown } from './has-markdown';

export const hasCv = existsSync('public/cv.pdf');

export const formatMonth = (d: Date) =>
  d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const formatDay = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  if (!hasMarkdown('src/content/log')) return [];
  return (await getCollection('log')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

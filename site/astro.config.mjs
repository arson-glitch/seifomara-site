// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkStripTodo from './src/lib/remark-strip-todo.mjs';

export default defineConfig({
  site: 'https://seifomara.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  markdown: { processor: unified({ remarkPlugins: [remarkStripTodo] }) },
});

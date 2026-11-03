import { existsSync, readdirSync } from 'node:fs';

/** True if `dir` (relative to the project root) contains any .md file, at any depth. */
export const hasMarkdown = (dir: string) =>
  existsSync(dir) && readdirSync(dir, { recursive: true }).some((f) => String(f).endsWith('.md'));

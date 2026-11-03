# Project: seifomara.com
- Audience: recruiters on a 30-second visit, often on a phone. Content first, motion second.
- The first screen must offer a fast path to Work (experience, projects, CV) in one scroll.
- Live site = v3: the Astro site in /site. Never break it.
  Root index.html (v1) and branch v2-desk (the desk concept) are archived: keep them, don't build on them.
- Deploy: `npm run deploy` in /site builds and uploads to the Cloudflare Worker `seifomara`
  (serves seifomara.com and www). Pushing to GitHub does not deploy.
- Adding a project or log post = ONE markdown file in site/src/content/ (see site/src/content/README.md).
  No component edits needed for content.
- Content: use my text exactly. Don't add claims, numbers or adjectives.
  Anything marked [TO ADD] stays off the site and goes in site/TODO.md with the file it belongs to.
  The build fails if [TO ADD] reaches dist/.
- Design: calm and readable. Warm off-white, near-black text, clay accent; dark mode via prefers-color-scheme.
  Cartridge illustrations are the only decoration. No animations except subtle hover. No client JS unless needed.
- Must work at 375px and 390px, respect prefers-reduced-motion, and load fast (Lighthouse mobile ≥ 95).
  No heavy 3D or large libraries without asking me.
- Before calling anything done: `npm run build` with zero warnings, then open it with the Playwright browser
  at desktop and 375px and check for horizontal overflow and console errors.
- Never commit secrets, API keys or .env files.

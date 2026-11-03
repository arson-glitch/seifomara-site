# Adding content
1. **Project:** copy `projects/atwa-studio.md` to `projects/<slug>.md`, edit the frontmatter (title, tagline, status, date, stack, featured, order, thumbnail, links) and write the body. The filename becomes the URL: `/projects/<slug>`.
2. **Log post:** create `log/<yyyy-mm-dd>-<slug>.md` with `title`, `date` and optional `tags: []` and `image`, then write the post. Newest posts show first on `/log` and on Home.
3. **Thumbnail:** put an image (SVG, PNG or JPG) in `public/cartridges/` and set `thumbnail: /cartridges/<file>`. If you leave it out, a blank cartridge is shown.
4. **Unfinished bits:** any paragraph, list item or heading containing `[TO ADD` is left off the site. Note it in `/site/TODO.md`. The build fails if one ever reaches `dist/`.
5. **Now line:** edit `now.md`. **Intro:** `intro.md`. **Bio:** `about.md`. **Links and Spotify:** `src/config.ts`. Run `npm run build` to check that everything validates.

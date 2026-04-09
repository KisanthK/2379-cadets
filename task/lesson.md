# Lessons Learned — 2379 Burlington Army Cadets Website

## Architecture

### Static site with no build system
The site is pure HTML/CSS/JS — no npm, no bundler, no server. Files are opened directly in a browser
or served via GitHub Pages. This means:
- NO `fetch()` from `file://` protocol (CORS block). Use `<script src="data/xxx.js">` globals instead of JSON.
- All data files must assign to `window.*` globals so they are available when the main scripts run.
- All JS runs inside `DOMContentLoaded`. Data scripts must load BEFORE the page scripts in HTML.

### Data file pattern
Content that cadets need to edit lives in `data/*.js` files that set window globals:
  - `data/gallery-events.js`  → `window.galleryEvents`
  - `data/officers.js`        → `window.officersData`
  - `data/sponsors.js`        → `window.sponsorsData`
  - `data/schedule.js`        → `window.scheduleData`

These files look like JSON (just with `window.X = ` prefix) — easy for non-devs to edit on GitHub's web editor.

### Rendering order in DOMContentLoaded
Always render dynamic content FIRST inside DOMContentLoaded, THEN call setupReveal().
Otherwise IntersectionObserver won't see the newly created `.reveal` elements.

### CSS is untouched
Zero CSS changes are made. All rendered HTML must exactly replicate the class names and DOM structure
of the original hardcoded HTML. When in doubt, compare with the original element by element.

## Page → Script mapping
- index.html      → script.js       (renders sponsors + schedule)
- gallery.html    → gallery.js      (renders event cards into #events-list)
- about.html      → about.js        (renders officers + staff)
- resources.html  → resources.js    (static, no rendering)
- Individual event pages (februarySurvival, ngataEvent, etc.) have their own JS files

## gallery.js note
gallery.js serves BOTH gallery.html AND has leftover lightbox references. The lightbox DOM nodes
don't exist on gallery.html so the lightbox code runs silently with no effect — this is fine.

## Risks to watch
- `officer-photo--phil` is a one-off CSS modifier class on Captain Phil Harris's photo.
  Stored as `extraPhotoClass` in officers.js and applied conditionally in rendering.
- The entrance note in schedule.js contains HTML (`<strong>`). Use `innerHTML`, never `textContent`.
- Sponsor "Bretonne Bakery" has no href — logo is not a link. Stored as `href: null`.

## Git / GitHub Pages
- Repo hosted on GitHub, GitHub Pages enabled on main branch / root.
- Local development: open index.html directly in browser (data/*.js files load fine as scripts).
- For cadets editing content: use GitHub's web editor (pencil icon on any file).

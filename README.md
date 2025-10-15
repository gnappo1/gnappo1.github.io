# Matteo Piccini — Portfolio (SPA on GitHub Pages)

**Live site:** https://matteopiccini.com  
**Repo:** https://github.com/gnappo1/gnappo1.github.io

A fast, fully static single-page portfolio (HTML/CSS/JS) with hash-routing for **Writing** posts, a **Projects** gallery, and a **Tech** section with brand logos. No build step, no server — just GitHub Pages.

> Custom domain with HTTPS via GitHub Pages. Content is plain files so it’s easy to maintain and version.

---

## ✨ Features

- **SPA** navigation with hash routes (`#/writing`, `#/post/:slug`)
- **Writing** posts in Markdown (`/posts/*.md`) + JSON index (`/data/writing.json`)
- **Projects** grid (static HTML)
- **Tech** logos (SVGs in `/assets/logos`)
- **Nice dark theme**, gradient highlights, keyboard + screen-reader friendly
- **Zero build**: pure HTML/CSS/JS, served from `master/main` branch

---

## 🗂 Project structure

```yml

.
├── index.html
├── css/
│ └── styles.css
├── js/
│ ├── main.js # UI interactions, menu, reveal, utilities
│ ├── router.js # tiny hash router (#/writing, #/post/:slug)
│ └── posts.js # fetch list + render Markdown posts
├── data/
│ └── writing.json # list of posts (slug, title, subtitle, tags)
├── posts/
│ └── <slug>.md # individual posts rendered into the modal/page
├── assets/
│ ├── logos/ # SVG brand icons used in Tech section
│ └── og-cover.png # social share image (Open Graph)
└── CNAME # contains "matteopiccini.com"
```

---

## 🚀 Local preview

Because browsers block `fetch()` from the local `file://` protocol, run a tiny static server for local testing:

- **VS Code** → “Live Server” extension, or  
- **Python 3**:
```bash
  python3 -m http.server 5500
```

GitHub Pages hosting works without any server or build step — this is only for local preview.

---

## ✍️ Add or update a post

Create a Markdown file in /posts
Example: posts/js-higher-order-functions-2025.md

Register it in /data/writing.json:

```json
  {
    "slug": "js-higher-order-functions-2025",
    "title": "JS in 2025: Higher-Order Functions",
    "subtitle": "Callbacks, map/filter/reduce, and composition",
    "tags": ["javascript", "fp"]
  }
  // , ... other posts
```

Open it from the site:
  - Writing list: #/writing
  - Direct link: #/post/js-higher-order-functions-2025

Tip: include a short “Updated on YYYY-MM-DD” line at the top of the MD when you refresh legacy posts.

---

## 🧪 Embedding runnable code

You can embed CodePen or StackBlitz iframes directly in Markdown with raw HTML:
```html

<div class="embed">
  <iframe
    src="https://codepen.io/your-pen-id"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>
```
The .embed class (in styles.css) makes it responsive at 16:9.

## 🧰 Tech logos

SVGs live in assets/logos/ and are referenced in the Tech list in index.html.
Use colored marks from Devicon or vector marks from Simple Icons.

<strong>Devicon CDN (example)</strong>:
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg

<strong>Simple Icons CDN (single-color)</strong>:
https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/rspec.svg

Name files consistently (e.g., react.svg, typescript.svg, postgresql.svg) and update the <img src="assets/logos/<name>.svg"> entries.

## 🛠 Custom domain & HTTPS

Settings → Pages points to this branch (/root)

CNAME file contains matteopiccini.com

Enforce HTTPS in GitHub Pages settings (free certificate from GitHub).
You do not need to buy an SSL certificate from your registrar.

## ♿ Accessibility & keyboard

Skip link, semantic landmarks, and focus outlines

Mobile menu is reachable with keyboard; ESC closes it

Prefers-reduced-motion respected for hero effects


## 🙌 Credits

Brand icons from Devicon and Simple Icons (SVGs in /assets/logos)

Markdown parsing via marked (CDN)

Deployed on GitHub Pages


## 📝 License

Content © Matteo Piccini.
Code in this repo is MIT unless stated otherwise.
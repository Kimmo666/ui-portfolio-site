# UI Portfolio Website

A launch-ready static portfolio website matching the 1-week MVP plan.

## Included Pages

- `index.html` (Home)
- `works.html` (Portfolio listing)
- `case-finflow.html` (Case study 1)
- `case-shoplane.html` (Case study 2)
- `case-healthbridge.html` (Case study 3)
- `about.html`
- `contact.html`

## Quick Local Preview

Use Python built-in server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Replace Before Launch

- Update all branding placeholders with `Kimmo` / `Kimmo Designer`.
- Replace email with `gkweb@foxmail.com`.
- Update social links.
- Add your real portfolio images under `assets/works/` following `assets/works/README.md`.

## Image Asset Workflow

- Every gallery image now has a `data-asset` key.
- On page load, `script.js` maps each key to local path:
  - `assets/works/<data-asset>.jpg`
- If a local file is missing, image falls back to the demo placeholder URL.
- This lets you batch replace visuals by dropping files only, without editing HTML.

## Launch (GitHub Pages + Custom Domain)

1. Push this folder to a GitHub repository.
2. In repo settings, enable Pages from the root branch.
3. Keep `CNAME` file with your real domain, for example `gaoui.com`.
4. Add DNS records at your domain provider:
   - `A` records to GitHub Pages IPs, or
   - `CNAME` for `www` to `<username>.github.io`.
5. Wait for certificate provisioning (HTTPS).

## SEO Basics Included

- Per-page `<title>` and `<meta name="description">`
- `robots.txt`
- `sitemap.xml` (update domain before launch)

## Analytics (Post Launch)

Add your analytics script (Plausible/GA) before `</head>` in all pages.

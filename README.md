# Paarthsaarthi — Developer Portfolio

A minimal, responsive developer portfolio with a subtle original comic-inspired accent. Built with semantic HTML, CSS, and vanilla JavaScript — no framework or build step required.

## Features

- Mobile-first responsive layout
- Dark theme by default, with a light/dark toggle persisted in `localStorage`
- Keyboard-accessible navigation and project detail dialogs
- Project modal closes with Escape, traps Tab focus, and restores focus to the opener
- Contact form validates fields and opens the visitor's email app with a prefilled draft
- Reduced-motion support and visible keyboard focus
- Original SVG favicon, shield/spark emblem, and social preview
- SEO metadata and Open Graph tags
- Print stylesheet for a clean resume-style page

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.

For a local server (optional), run this from the repository folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalise before publishing

- Update the title, description, and Open Graph metadata in `index.html`.
- Replace proposed project concepts with real projects. The three examples are explicitly labelled as **proposed**, not completed work.
- Add verified project URLs and screenshots only after you have them.
- Review the education, experience, and FOSS club wording for accuracy.
- The uploaded résumé is included at `assets/resume.pdf` and linked from the hero section.
- The visual direction uses an editorial print-grid aesthetic: warm paper tones, heavy condensed headlines, black rules, and a red accent.
- Change the public contact email if needed.
- Replace the SVG social preview with a PNG/JPG export at 1200×630 if a platform doesn't render SVG previews.
- Google Fonts are loaded online; system fallbacks remain available if offline.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `paarthsaarthi-portfolio`.
2. Add the files and commit them to the default branch.
3. Open **Settings → Pages** in the repository.
4. Under build and deployment, select **Deploy from a branch**.
5. Choose the default branch and `/ (root)`, then save.
6. Wait for the published URL shown in the Pages panel.

This is a static site; no build command or server-side runtime is needed. If you use a custom domain, configure it in GitHub Pages and update canonical/social metadata if you add canonical URLs later.

## Project structure

```text
paarthsaarthi-portfolio/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── social-preview.svg
    ├── shield-spark.svg
    ├── icon-spark.svg
    ├── icon-bolt.svg
    ├── icon-star.svg
    ├── icon-terminal.svg
    └── icon-code.svg
```

## Contact form note

The contact form is front-end only. It performs client-side validation and creates a `mailto:` draft; it does not send, store, or transmit form data. For a hosted form endpoint, add a service or backend and include server-side validation and spam protection.

## Accessibility checklist

- [x] Semantic landmarks and heading structure
- [x] Skip-to-content link
- [x] Keyboard focus indicators
- [x] Mobile navigation button exposes `aria-expanded`
- [x] Project modal uses native `<dialog>` where supported
- [x] Escape closes the modal; focus is restored to the opener
- [x] Modal Tab navigation is kept within the dialog
- [x] Form labels, inline errors, and live status messages
- [x] Reduced-motion preference is respected
- [x] Theme colors are designed for AA contrast; re-check any custom colors
- [ ] Run final automated and manual checks (axe, keyboard-only, screen reader, contrast checker) before production launch

## Design tokens

- Background: `#101113`
- Surface: `#17191C`
- Text: `#F3F3F1`
- Muted text: `#A1A4AA`
- Accent: `#E04444` (dark theme) / `#B91F2B` (light theme)
- Typeface: Manrope + DM Mono

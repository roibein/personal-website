# Roi Bein — Portfolio

Cinematic personal portfolio for Roi Bein, Mechanical Engineering student at Duke University (BSE '29). Built on the "Precision Dark" design system — React 19, Tailwind CSS 3.4, GSAP 3 with ScrollTrigger, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Structure

- `index.html` — Google Fonts (Space Grotesk, DM Serif Display, Space Mono, Inter)
- `src/index.css` — palette CSS variables, global noise overlay, scan-line and pulse keyframes, interaction utilities
- `tailwind.config.js` — design tokens mapped to the CSS variables
- `src/App.jsx` — registers ScrollTrigger once, composes sections
- `src/components/` — Navbar, Hero, About, Experience, Projects, Skills, Motorsports, Extracurriculars, Contact, Footer

## Content sources

- `Resume.md` — education, experience, skills, extracurriculars
- `CD Display Case/` — actual SolidWorks global-variable equation files, rendered verbatim in the CD Display Case project spread
- `Happy Meal Toy/Happy Meal Toy Technical Memo.pdf` — Bobsled Bonanza design memo (parts, tolerancing, DFM, safety)
- `Sunflower Seed Sheller/DC2 Memo.pdf` — shelling machine design documentation (rollers, filtration, value matrix)
- `public/resume.pdf` — served at `/resume.pdf`, linked from the View Resume / Download Resume buttons
- `public/projects/` — real project photos extracted from the technical memos and project docs

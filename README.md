# Muhammad Zeeshan | Portfolio

Personal portfolio of Muhammad Zeeshan, Full Stack Software Engineer (C#, .NET, Angular, SQL Server).

**Live site:** https://muhammad-zeeshan-4854.github.io

## Highlights

- **Integration hub hero:** an animated SVG diagram of the eight verification services I have integrated (DBS, DVLA, Passport, IDVT, Konfir and more), each connecting and verifying in turn.
- **Dark and light themes** with a toggle. The visitor's choice is remembered, and the default can follow their system setting.
- **Scroll-driven experience timeline** that fills as you read, plus count-up highlight numbers.
- **Responsive and accessible:** works from small phones to wide screens, supports keyboard navigation and respects reduced-motion preferences.
- **No frameworks or build step:** plain HTML, CSS and JavaScript, hosted for free on GitHub Pages.

## Tech

HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript (SVG generation, IntersectionObserver), GitHub Pages.

## Project structure

| File | Purpose |
|---|---|
| `index.html` | All page content |
| `style.css` | Styles. Theme colours and fonts are defined at the top in `:root`, with the light theme under `:root[data-theme="light"]` |
| `script.js` | Integration hub, theme toggle, scroll timeline, counters and the copy-email button |
| `assets/` | Profile photo, project screenshots, favicon and CV |

## Run locally

Open `index.html` in a browser, or use the **Live Server** extension in VS Code for automatic reloads while editing.

## Customising

- **Content:** search `index.html` for `EDIT` to find the parts meant to be changed.
- **Default theme:** set `window.DEFAULT_THEME` in the `<head>` of `index.html` to `"dark"`, `"light"` or `"system"`.
- **Services in the hero:** edit the `SERVICES` list at the top of `script.js`.
- **Profile photo:** replace `assets/profile.jpg` with a square image of at least 400 × 400 px. If the file is missing, the initials "MZ" are shown instead.
- **New project:** copy an `<article class="project">` block in the Projects section and update the text and screenshot.

## Contact

- Email: Zeeshanali4854@gmail.com
- LinkedIn: [muhammad-zeeshan-299a05147](https://www.linkedin.com/in/muhammad-zeeshan-299a05147)

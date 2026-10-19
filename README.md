# Ayala Foundation lobby kiosk

Plain HTML/CSS/JS with no build step. It is built from the Claude Design files "Arts and Culture Kiosk" and "Kiosk Mobile".

**Lobby kiosk** (`index.html`, `styles.css`, `app.js`)

- Screens: Home, Our programs, the program page (Arts and Culture or Big Bets), the project page, and the "Still there?" warning
- `app.js` handles navigation, carousel swipe, photo rotation, the idle reset and stage scaling

**Phone page** (`mobile.html`, `mobile.css`, `mobile.js`)

- The same content in a single column for phones
- Each screen has its own address, so the phone's back button works: `#programs`, `#arts`, `#bigbets`, and `#project/<id>` (e.g. `#project/museum`)
- Phones that open `index.html` are sent here automatically

**Shared**

- `copy.js`: English and Filipino interface text (buttons, headings, program pages)
- `projects.js`: every project page's content, in English and Filipino
- `project-view.js`: turns `projects.js` into page sections for both the kiosk and the phone

## Projects

All project pages (Ayala Museum, CENTEX Digital Education, CENTEX Early Grades, and future ones) use one layout, filled from `projects.js`. To add or edit a project, change `projects.js` only:

- `program` puts it in that program's project list, in file order
- `title`, an optional `hero` image, and `en` / `fil` content: `lead`, `body` paragraphs, `sections`, and an optional `contact`
- Each section becomes a tab on the kiosk and a stacked block on the phone. Types: `pillars`, `stats`, `results`, `packages` (examples are in the file)
- A project with no `en` / `fil` content is listed but can't be opened yet (Filipinas Heritage Library)

The kiosk adapts to longer content: four or more pillars sit in two columns, three or four stats use a compact 2×2 layout, and a long intro uses smaller text so the hero photo keeps some height. Keep each tab to roughly the length of the current ones.

## Run

Serve the folder and open it in a full-screen kiosk browser, for example:

```sh
python3 -m http.server 8080
chromium --kiosk http://localhost:8080/
```

The stage scales to fit the display and stretches to fill the full width and height at any aspect ratio.

## QR codes

The program page's "Take this with you" code opens the phone page on that program:

- `assets/qr-arts.png` → https://svcict.github.io/projectlobby/mobile.html#arts
- `assets/qr-bigbets.png` → https://svcict.github.io/projectlobby/mobile.html#bigbets

If the site moves to another address, regenerate both codes for the new address.

## Images

Each image spot loads a file from `assets/`. To change one, replace the file, or point that spot's `data-src` in `index.html` / `mobile.html` at a new file.

| Spot | Files | Upload size | Notes |
|---|---|---|---|
| Home logo | `logo.webp` | SVG, or 1440×600 PNG | Fits a 716×300 box uncropped; transparent background |
| Home rotating photos | `home-arts.webp`, `leadership-home.jpg`, `bigbets-home.jpg`, `home-community.webp` | 2400×2200 | Sides or top may crop; keep faces and subject centred |
| Program cards | `*-card.jpg` | 1600×1000 (16:10) | Largest images; use the best you have |
| Program banners | `arts-hero.webp`, `bigbets-banner.jpg` | 1600×640 (2.5:1) | Only a thin slice shows on the kiosk |
| Project heroes | set in `projects.js` (`hero.src`) | 1600×1200 | Fills the kiosk's left column above the text; 16:10 on phones |
| More programs tiles | `*-tile.jpg` | 800×450 (16:9) | Small; simple illustrations or close-ups |

Photos: JPG or WebP at 80–85% quality, under about 1 MB. Logos and illustrations: PNG or SVG. Don't put text in images; the pages set all text so it can switch language.

CENTEX Early Grades has no hero photo yet and shows a labelled placeholder: add the image to `assets/` and set its `hero.src` in `projects.js`.

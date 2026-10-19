# Ayala Foundation lobby kiosk

Plain HTML/CSS/JS with no build step. It is built from the Claude Design files "Arts and Culture Kiosk" and "Kiosk Mobile".

**Lobby kiosk** (`index.html`, `styles.css`, `app.js`)

- Screens: Home, Our pillars (the carousel), a pillar page for each of the four pillars, a program page, and the "Still there?" warning
- `app.js` handles navigation, carousel swipe, photo rotation, the idle reset and stage scaling

**Phone page** (`mobile.html`, `mobile.css`, `mobile.js`)

- The same content in a single column for phones
- Each screen has its own address, so the phone's back button works: `#pillars`, `#arts`, `#leadership`, `#bigbets`, `#community`, and `#program/<id>` (e.g. `#program/museum`). Older `#programs` and `#project/<id>` links still work
- Phones that open `index.html` are sent here automatically
- Tablets and landscape phones (720px and wider) get a wider sheet with two-column pillar cards and program lists; landscape phones also get a side-by-side home screen and a shorter header

**Language:** English only. There is no language switch and no translated text.

**Shared**

- `copy.js`: interface text (buttons, headings, pillar pages)
- `programs.js`: every program page's content
- `project-view.js`: turns `programs.js` into page sections for both the kiosk and the phone

## Pillars and programs

The four carousel cards are **pillars**, in the order of the foundation's pillar diagram: Community Development, Arts and Culture, Leadership Development (the strategic pillars), then Education (the big bet). Each pillar has a page listing its **programs** (Ayala Museum, Filipinas Heritage Library, U-GO Scholar Grant Program, Ayala Young Leaders, Atletang Ayala, CENTEX Digital Education, CENTEX Early Grades Program, El Nido, Iraya Mangyan Development Program). Pillar page text is in `copy.js`. Each card is labelled Strategic pillar or Big bet. Corporate Citizenship and Volunteerism (`ccv`, pillar `support` in `programs.js`) supports all of them: it opens from the dashed "Supported by" strip on the pillars screen, and on the phone at `#program/ccv`. It has no hero photo yet.

All program pages use one layout, filled from `programs.js`. To add or edit a program, change `programs.js` only:

- `pillar` puts it in that pillar's program list, in file order
- `title`, an optional `hero` image, and `en` content: `lead`, `body` paragraphs, `sections`, and an optional `contact`
- Each section becomes a tab, on both the kiosk and the phone (where the tabs stick under the header). Types: `features`, `stats`, `results`, `packages`, `list` (examples and notes are at the top of the file)
- A program with no `en` content is listed but can't be opened yet

The kiosk adapts to longer content: four or more features sit in two columns, three or four stats use a compact 2×2 layout, five or six use three columns, and a long intro uses smaller text so the hero photo keeps some height. Keep each tab to roughly the length of the current ones.

## Font

Schibsted Grotesk (SIL Open Font License) is stored in `assets/fonts/`, so the kiosk keeps its typeface without an internet connection. Two variable font files (Latin and Latin Extended) cover every weight from 400 to 800; the `@font-face` rules are at the top of `styles.css` and `mobile.css`.

## Publishing updates

The pages load their scripts and styles with a version tag (`app.js?v=…`) so browsers fetch fresh copies after an update instead of a cached older one. When you change any `.js` or `.css` file, change the `?v=` number in both `index.html` and `mobile.html` (any new number works, e.g. the date and time).

## Run

Serve the folder and open it in a full-screen kiosk browser, for example:

```sh
python3 -m http.server 8080
chromium --kiosk http://localhost:8080/
```

The stage scales to fit the display and stretches to fill the full width and height at any aspect ratio.

## QR codes

Each pillar page's "Take this with you" code opens the phone page on that pillar:

- `assets/qr-arts.png` → https://svcict.github.io/projectlobby/mobile.html?from=lobby#arts
- `assets/qr-bigbets.png` → https://svcict.github.io/projectlobby/mobile.html?from=lobby#bigbets
- `assets/qr-leadership.png` → https://svcict.github.io/projectlobby/mobile.html?from=lobby#leadership
- `assets/qr-community.png` → https://svcict.github.io/projectlobby/mobile.html?from=lobby#community

`?from=lobby` makes the phone page show "Saved from the Ayala Foundation lobby" once. If the site moves to another address, regenerate the codes for the new address.

## Images

Each image spot loads a file from `assets/`. To change one, replace the file, or point that spot's `data-src` in `index.html` / `mobile.html` at a new file.

| Spot | Files | Upload size | Notes |
|---|---|---|---|
| Home logo | `logo.webp` | SVG, or 1440×600 PNG | Fits a 716×300 box uncropped; transparent background |
| Home rotating photos | the pillar's `*-card.jpg` (for now) | 1600×1000 | Same photos as the cards; sides may crop. The older `home-*` / `*-home*` files are kept but unused |
| Pillar cards | `*-card.jpg` | 1600×1000 (16:10) | Largest images; use the best you have |
| Pillar banners | the pillar's `*-card.jpg` | 1600×1000 | Same photo as the card |
| Program heroes | set in `programs.js` (`hero.src`) | 1600×1200 | Fills the kiosk's left column above the text; 16:10 on phones |
| Phone card photos | `m/*-card.webp` | 1080 wide, WebP ~78% | Smaller copies of the `*-card.jpg` photos used by the phone page (home slides, pillar cards and banners). Regenerate when a card photo changes |
| More pillars tiles | `*-tile.jpg` | 800×450 (16:9) | Cut from the pillar card photo; regenerate when a card changes |

Photos: JPG or WebP at 80–85% quality, under about 1 MB. Logos and illustrations: PNG or SVG. Don't put text in images; the pages set all text.

The Filipinas Heritage Library, El Nido, U-GO, Ayala Young Leaders and Iraya Mangyan heroes are small crops from their flyers and will look soft on a large TV; replace them with the original photos. Every program now has a hero photo. A hero can set `pos` (CSS object-position) in `programs.js` to keep faces in frame when it is cropped. To set one, add the image to `assets/` and point the program's `hero.src` in `programs.js` at it.

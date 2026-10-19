# Ayala Foundation lobby kiosk

Plain HTML/CSS/JS with no build step. It is built from the Claude Design files "Arts and Culture Kiosk" and "Kiosk Mobile".

**Lobby kiosk** (`index.html`, `styles.css`, `app.js`)

- Screens: Home, Our programs, the program page (Arts and Culture or Big Bets), Ayala Museum, CENTEX Digital Education, and the "Still there?" warning
- `app.js` handles navigation, carousel swipe, photo rotation, the idle reset and stage scaling

**Phone page** (`mobile.html`, `mobile.css`, `mobile.js`)

- The same content in a single column for phones
- Each screen has its own address, so the phone's back button works: `#programs`, `#arts`, `#bigbets`, `#museum`, `#centex-de`
- Phones that open `index.html` are sent here automatically

**Shared**

- `copy.js` holds all English and Filipino text for both pages. Edit text there.

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
| Program banners | `arts-hero.webp`, `bigbets-banner.jpg`, `centex-de-banner.jpg` | 1600×640 (2.5:1) | Only a thin slice shows on the kiosk |
| More programs tiles | `*-tile.jpg` | 800×450 (16:9) | Small; simple illustrations or close-ups |
| Ayala Museum photo | `museum-panel.jpg` | 1600×1200 | Subject in the middle |

Photos: JPG or WebP at 80–85% quality, under about 1 MB. Logos and illustrations: PNG or SVG. Don't put text in images; the pages set all text so it can switch language.

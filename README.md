# Ayala Foundation lobby kiosk

Plain HTML/CSS/JS with no build step. It is built from the Claude Design file "Arts and Culture Kiosk".

- `index.html`: all four screens (Home, Our programs, Arts and Culture, Ayala Museum) and the "Still there?" warning
- `styles.css`: layout at the 1920×1080 design size
- `app.js`: copy (English/Filipino), navigation, carousel swipe, photo rotation, idle reset, and stage scaling

## Run

Serve the folder and open it in a full-screen kiosk browser, for example:

```sh
python3 -m http.server 8080
chromium --kiosk http://localhost:8080/
```

The stage scales to fit the display and stretches to fill the full width and height at any aspect ratio.

## Images

Each image spot loads a file from `assets/`. To use a final image, replace the file. Or point that spot's `data-src` in `index.html` at a new file.

`assets/placeholders/` holds labelled stand-ins for spots that don't have a final image yet. Each one shows its name and upload size. Replace them with:

| Spot | Count | Upload size | Notes |
|---|---|---|---|
| Home logo | 1 | SVG, or 1440×600 PNG | Fits a 716×300 box uncropped; transparent background |
| Home rotating photos | 4 | 2400×2200 | Sides or top may crop; keep faces and subject centred |
| Program cards (carousel) | 4 | 1600×1000 (16:10) | Largest images; use the best you have |
| Arts and Culture banner | 1 | 1600×640 (2.5:1) | Only a thin slice shows |
| More programs tiles | 3 | 800×450 (16:9) | Small; simple illustrations or close-ups |
| QR code | 1 | 512×512 PNG or SVG | Dark on white; white border at least 4 squares wide |
| Ayala Museum photo | 1 | 1520×1280 | Subject in the middle |

Photos: JPG or WebP at 80–85% quality, under about 1 MB. Logos and illustrations: PNG or SVG. Don't put text in images; the kiosk sets all text so it can switch language.

`arts-banner.svg`, `home-arts.svg` and `home-community.svg` are spare placeholders. Those spots already use your own images (`arts-hero.webp`, `home-arts.webp`, `home-community.webp`).

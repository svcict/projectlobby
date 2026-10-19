# projectlobby

Tulay Foundation lobby kiosk: a single static page that installs as a web app and keeps working offline.

## What is here

| Path | What it is |
| --- | --- |
| `index.html` | The whole kiosk: markup, styles, script and the English and Filipino text. |
| `img/` | Program and project photographs. |
| `fonts/` | Familjen Grotesk, served from this site (SIL Open Font License, `fonts/OFL.txt`). |
| `icons/` | App and browser icons. **Placeholder artwork**: replace with the foundation's official logo, keeping the file names and sizes (192, 512 and 180 px PNGs, plus `icon.svg`). |
| `manifest.webmanifest` | Makes the site installable as an app (name, icons, colours, full-screen display). |
| `sw.js` | Offline support: saves the page, photos, fonts and icons so the kiosk keeps running if the Wi-Fi drops. |
| `.github/workflows/pages.yml` | Publishes the site to GitHub Pages on every push to `main`. |

## Publishing (GitHub Pages)

One-time setup: in the repository's **Settings > Pages > Build and deployment**, set **Source** to **GitHub Actions**. After that, every push to `main` publishes the site to `https://svcict.github.io/projectlobby/`. A custom domain can be added on the same settings page.

## Setting up the kiosk screen

1. Open the published address in Chrome or Edge on the kiosk.
2. Install it as an app (the install icon in the address bar, or the browser menu > Install). It opens full screen.
3. Turn on the browser's kiosk mode or the operating system's assigned-access mode so visitors cannot leave the app.

Once opened, the kiosk keeps working offline. A new version is downloaded in the background and applied the next time the screen starts over after a visitor leaves, never during a visit.

## Making changes

- **Text and figures**: edit the `PROGRAMS` (English) and `FIL`/`FILP` (Filipino) data in `index.html`.
- **Adding or removing a file the kiosk uses** (a new photo, say): add it to `PRECACHE` in `sw.js` and change `VERSION` (for example `tulay-v1` to `tulay-v2`), so kiosks save the new set.

## Try it locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Offline support works on `localhost` and on HTTPS addresses only.

## Before public use

- The impact figures on the Leadership, Big Bets and Community pages are sample numbers and need to be replaced with confirmed figures.
- The "SAMPLE QR" box needs a real QR code.
- The Filipino text is a first draft awaiting review by a native speaker.

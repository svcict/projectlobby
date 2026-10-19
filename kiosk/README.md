# Ayala Foundation lobby kiosk

Plain HTML/CSS/JS with no build step. It is built from `../Arts and Culture Kiosk.dc.html`.

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

Replace the files in `assets/`, keeping the same names. Or change the `data-src` paths in `index.html`. `temp-*` files are placeholders cropped from screenshots. A missing image shows its caption instead.

// Sends phones and tablets from the lobby page to the phone page (the lobby TV is
// a touchscreen too, but much larger). Loaded first by index.html, in the head.
(() => {
  'use strict';
  // Phones and tablets get the phone page (the QR codes link there directly
  // too). The lobby TV is a touchscreen as well, but much larger.
  // Add ?kiosk to the address to always show the kiosk.
  try {
    const short = Math.min(window.innerWidth, window.innerHeight), long = Math.max(window.innerWidth, window.innerHeight);
    const touchTablet = window.matchMedia('(pointer: coarse)').matches && long < 1280;
    const forced = new URLSearchParams(location.search).has('kiosk');
    if (window.top === window && !forced && (short < 600 || touchTablet)) location.replace('mobile.html' + location.hash);
  } catch (_) {}
})();

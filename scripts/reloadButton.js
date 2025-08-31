/**
 * Verbessert den Reload-/Recalc-Button:
 * - setzt ein klares "Refresh/Neu berechnen"-Icon
 * - ruft calculateAndUpdate() beim Klick auf
 * Button-Suche: id="recalc-btn" ODER [data-role="recalc"] ODER
 * ein Button mit Titel/Aria-Label "Neu berechnen".
 */
(function () {
  const btn =
    document.getElementById('recalc-btn') ||
    document.querySelector('[data-role="recalc"]') ||
    document.querySelector('button[aria-label="Neu berechnen"], button[title="Neu berechnen"]');

  if (!btn) return;

  btn.setAttribute('aria-label', 'Neu berechnen');
  btn.setAttribute('title', 'Neu berechnen');

  // minimalistisches Refresh-Icon (SVG)
  const icon = `
<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"
     style="vertical-align:middle; margin-right:8px">
  <path d="M21 12a9 9 0 1 1-2.64-6.36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M21 3v6h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;
  // Text beibehalten (falls vorhanden), aber Icon davor
  const label = btn.textContent.trim() || 'Neu berechnen';
  btn.innerHTML = icon + '<span>' + label + '</span>';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    try { window.calculateAndUpdate && window.calculateAndUpdate(); } catch(e){}
  });
})();

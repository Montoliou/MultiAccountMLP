/**
 * Fix für A/B-Umschalten: Layout ändert sich -> wir warten 2x rAF
 * (damit DOM & Layout sicher aktualisiert sind) und zeichnen dann neu.
 * Außerdem reagieren wir auf transitionend, falls CSS-Transitions laufen.
 */
(function () {
  const recalc = () => { try { window.calculateAndUpdate && window.calculateAndUpdate(); } catch(e){} };
  const recalcAfterLayout = () => requestAnimationFrame(() => requestAnimationFrame(recalc));

  // setVariantUI wrappen, falls vorhanden
  const originalSetVariantUI = window.setVariantUI || null;
  if (originalSetVariantUI) {
    window.setVariantUI = function (...args) {
      const r = originalSetVariantUI.apply(this, args);
      recalcAfterLayout();
      return r;
    };
  }

  // Zusätzlich direkt nach Umschalten (falls sich Implementierung ändert)
  const sw = document.getElementById('variant-switch');
  if (sw) {
    sw.addEventListener('change', recalcAfterLayout);
  }

  // Wenn Container animiert/geslidet wird: nach Ende nochmal neu
  const flow = document.getElementById('flow-container') || document;
  flow.addEventListener('transitionend', recalcAfterLayout);
})();

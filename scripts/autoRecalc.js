/**
 * Auto-Recalc:
 * - Rechnet direkt neu bei Verlassen eines Eingabefeldes (blur/change)
 * - Für Slider/Range und schnelle Eingaben zusätzlich debounced 'input'
 * - Funktioniert auch für dynamisch erzeugte Felder (Event-Delegation)
 */
(function () {
  if (typeof window.calculateAndUpdate !== 'function') {
    console.warn('[autoRecalc] calculateAndUpdate() not found yet – will try after DOM ready.');
  }

  const d = document;

  // sanftes Drosseln für 'input'-Ereignisse (z.B. Range/Slider)
  function debounce(fn, wait = 180) {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); };
  }
  const recalc = () => { try { window.calculateAndUpdate && window.calculateAndUpdate(); } catch(e){} };
  const recalcDebounced = debounce(recalc, 180);

  // Event-Delegation: Wir horchen zentral auf Form-Events im Dokument
  function shouldHandle(el) {
    if (!el) return false;
    if (!(el instanceof HTMLElement)) return false;
    if (el.closest('[role="dialog"][aria-modal="true"]')) {
      // In offenen Modals rechnen wir ebenfalls sofort, sobald Felder verlassen werden
      return true;
    }
    return ['INPUT','SELECT','TEXTAREA'].includes(el.tagName);
  }

  // Sofort nach Verlassen eines Feldes
  d.addEventListener('blur', (e) => {
    const el = e.target;
    if (!shouldHandle(el)) return;
    recalc();
  }, true); // useCapture=true, damit 'blur' garantiert gefangen wird

  // Bei Auswahländerungen (Dropdowns etc.) direkt rechnen
  d.addEventListener('change', (e) => {
    const el = e.target;
    if (!shouldHandle(el)) return;
    recalc();
  }, true);

  // Während der Eingabe für "range" und ggf. number: debounced
  d.addEventListener('input', (e) => {
    const el = e.target;
    if (!shouldHandle(el)) return;
    const type = (el.getAttribute('type') || '').toLowerCase();
    if (type === 'range' || type === 'number') {
      recalcDebounced();
    }
  }, true);

  // Fallback: nach DOM ready einmal neu zeichnen (falls Werte vorgeladen)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    recalc();
  } else {
    d.addEventListener('DOMContentLoaded', recalc);
  }
})();

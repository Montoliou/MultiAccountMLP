(function () {
  // kleine Hilfen
  const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, details,[tabindex]:not([tabindex="-1"])';
  const MODAL_IDS = ['fixkosten-modal','depot-modal']; // existieren bereits in deiner Seite

  // Original-Handler merken (falls vorhanden)
  const openOrig  = window.openModal  || null;
  const closeOrig = window.closeModal || null;

  // Fokus-Management
  const modalState = new Map(); // id -> { lastFocus, trapHandler, escHandler }

  function trapTab(e, container) {
    if (e.key !== 'Tab') return;
    const nodes = [...container.querySelectorAll(FOCUSABLE)].filter(n => n.offsetParent !== null);
    if (nodes.length === 0) { e.preventDefault(); return; }
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function enhanceOpen(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // ARIA/Tabbing vorbereiten
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    if (!modal.hasAttribute('tabindex')) modal.setAttribute('tabindex', '-1');
    modal.removeAttribute('aria-hidden');

    const lastFocus = document.activeElement;
    const trapHandler = (e) => trapTab(e, modal);
    const escHandler  = (e) => { if (e.key === 'Escape') safeClose(id, lastFocus); };

    modal.addEventListener('keydown', trapHandler);
    window.addEventListener('keydown', escHandler);

    // Fokus setzen
    const firstFocusable = modal.querySelector(FOCUSABLE);
    (firstFocusable || modal).focus();

    modalState.set(id, { lastFocus, trapHandler, escHandler });
  }

  function enhanceClose(id, restoreFocusTo) {
    const modal = document.getElementById(id);
    if (!modal) return;

    const st = modalState.get(id);
    if (st) {
      modal.removeEventListener('keydown', st.trapHandler);
      window.removeEventListener('keydown', st.escHandler);
      modalState.delete(id);
    }
    modal.setAttribute('aria-hidden', 'true');
    if (restoreFocusTo && typeof restoreFocusTo.focus === 'function') {
      restoreFocusTo.focus();
    }
  }

  // Safe wrappers um bestehende openModal/closeModal
  function safeOpen(id) {
    const beforeFocus = document.activeElement;
    if (openOrig) openOrig(id);       // ruft deine bestehende Logik auf (sichtbar machen etc.)
    enhanceOpen(id);                   // A11y-Layer
    const st = modalState.get(id);
    if (st) st.lastFocus = beforeFocus;
  }

  function safeClose(id, fallbackFocusEl) {
    if (closeOrig) closeOrig(id);     // ruft deine bestehende Logik auf (verstecken etc.)
    const st = modalState.get(id);
    const back = st?.lastFocus || fallbackFocusEl || document.querySelector('[data-open="'+id+'"]') || document.body;
    enhanceClose(id, back);
  }

  // Exporte bereitstellen
  window.openModal  = safeOpen;
  window.closeModal = safeClose;

  // Klick auf Backdrop schließt (falls vorhanden)
  MODAL_IDS.forEach(id => {
    const m = document.getElementById(id);
    if (!m) return;
    m.addEventListener('mousedown', (e) => {
      if (e.target === m) safeClose(id, document.activeElement);
    });
  });

  // Buttons mit data-open / data-close automatisch verdrahten (fallback)
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open]');
    if (openBtn) { e.preventDefault(); safeOpen(openBtn.getAttribute('data-open')); }
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) { e.preventDefault(); safeClose(closeBtn.getAttribute('data-close'), openBtn); }
  });
})();

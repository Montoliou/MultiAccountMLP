/**
 * Entfernt das alte Header-Reload-Icon rechts neben "Deine Planung".
 * Robust: findet das H2 mit dem Text und killt das direkte Icon-Sibling (Button/Span/Div mit SVG).
 */
(function () {
  const h2 = Array.from(document.querySelectorAll('h2'))
    .find(n => n.textContent.trim().toLowerCase().startsWith('deine planung'));
  if (!h2) return;
  // Kandidaten: direktes Geschwister oder innerhalb des umgebenden flex-Containers
  const container = h2.closest('.flex.items-center') || h2.parentElement;
  if (!container) return;
  const candidates = Array.from(container.children).filter(el => el !== h2);
  for (const el of candidates) {
    const hasRefreshSVG = el.querySelector('svg path[d*="21 12"][d*="6"]') || el.querySelector('svg');
    const looksIcon = el.matches('button, [role="button], .rounded-full, .p-2, .icon, .btn') || hasRefreshSVG;
    if (hasRefreshSVG || looksIcon) {
      el.remove();
      break;
    }
  }
})();

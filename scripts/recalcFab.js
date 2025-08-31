/**
 * Recalc-FAB: runder Action-Button unten rechts
 * - Icon mit sanfter Rotation beim Hover/Klick
 * - Tooltip
 * - Tastatur: Shift+R löst Neu-Berechnen aus
 * - Respektiert prefers-reduced-motion
 */
(function () {
  const d = document;

  // CSS injizieren (nur einmal)
  if (!d.getElementById('recalc-fab-style')) {
    const style = d.createElement('style');
    style.id = 'recalc-fab-style';
    style.textContent = `
      .recalc-fab {
        position: fixed; right: 22px; bottom: 22px; z-index: 50;
        width: 56px; height: 56px; border-radius: 999px;
        display: inline-flex; align-items: center; justify-content: center;
        color: white; border: 1px solid rgba(255,255,255,.12);
        background: conic-gradient(from 180deg at 50% 50%, #2f81f7, #31c48d, #2f81f7);
        box-shadow: 0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.06);
        cursor: pointer;
      }
      .recalc-fab:hover { filter: brightness(1.05); }
      .recalc-fab:focus-visible {
        outline: 3px solid rgba(47,129,247,.35);
        outline-offset: 3px;
      }
      .recalc-fab__inner {
        width: 50px; height: 50px; border-radius: 50%;
        background: radial-gradient(100% 100% at 50% 0%, rgba(255,255,255,.18), rgba(0,0,0,.18));
        display: inline-flex; align-items:center; justify-content:center;
      }
      .recalc-fab__icon {
        width: 22px; height: 22px; display:block;
      }
      @media (prefers-reduced-motion: no-preference) {
        .recalc-fab:hover .recalc-fab__icon { transform: rotate(20deg); transition: transform .25s ease; }
        .recalc-fab:active .recalc-fab__icon { transform: rotate(140deg); transition: transform .35s ease; }
      }
      .recalc-fab__tooltip {
        position: fixed; right: 88px; bottom: 35px;
        padding: 6px 10px; border-radius: 8px; font-size: 12px; color: #e6e6e6;
        background: rgba(14,17,22,.85); border: 1px solid rgba(255,255,255,.08);
        box-shadow: 0 8px 22px rgba(0,0,0,.35);
        opacity: 0; pointer-events: none; transform: translateY(6px);
        transition: opacity .15s ease, transform .15s ease;
        white-space: nowrap;
      }
      .recalc-fab:hover + .recalc-fab__tooltip { opacity: 1; transform: translateY(0); }
    `;
    d.head.appendChild(style);
  }

  // Falls schon vorhanden, nichts tun
  if (d.getElementById('recalc-fab')) return;

  // Button + Tooltip einfügen
  const btn = d.createElement('button');
  btn.id = 'recalc-fab';
  btn.className = 'recalc-fab';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Neu berechnen (Shift+R)');

  btn.innerHTML = `
    <span class="recalc-fab__inner" aria-hidden="true">
      <svg class="recalc-fab__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-2.7-6.4"/>
        <path d="M21 3v6h-6"/>
      </svg>
    </span>
  `;

  const tip = d.createElement('div');
  tip.className = 'recalc-fab__tooltip';
  tip.textContent = 'Neu berechnen (Shift+R)';

  d.body.appendChild(btn);
  d.body.appendChild(tip);

  // Klick → Recalc
  function recalc() { try { window.calculateAndUpdate && window.calculateAndUpdate(); } catch(e){} }
  btn.addEventListener('click', (e) => { e.preventDefault(); recalc(); });

  // Tastatur: Shift+R
  d.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
      e.preventDefault(); recalc();
    }
  });
})();

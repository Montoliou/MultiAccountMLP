# Antigravity Vorschläge für Version 2.0 (Design & Architektur-Overhaul)

Großartige Neuigkeiten! Da die Restriktion der **Single-File-Architektur** (`index.html` mit fast 12.000 Zeilen) aufgehoben ist, eröffnet sich die perfekte Chance, das Projekt für die Zukunft wartbar, performant und skalierbar zu machen – bei exakt **gleicher, bewährter Beratungslogik** und einem massiven **UI/UX Premium-Upgrade** gemäß dem MLP Design Guide.

Hier ist der angepasste Plan für das **v2.0 Overhaul**:

---

## TEIL A: Die Architektur-Transformation

Die komplexe Berechnungslogik (`calculateAndUpdate()`, Cashflow-Kaskaden, Immobilien-Tilgung) ist das Herzstück der App. Wir fassen die *Mathematik* nicht an, sondern strukturieren nur die *Code-Basis* neu.

### 1. Modernes Build-Tooling (Vite + Modular Vanilla JS)
Wir wechseln auf **Vite** als Build-Tool.
*Warum?* Es ist blitzschnell, erfordert keine komplexe Konfiguration und erzeugt am Ende extrem optimierte, kleine Dateien. Wir behalten Vanilla JS bei (um nicht unnötig React/Vue Overhead für diese App einzuführen), aber mit moderner ES-Modulstruktur.

**Neue Dateistruktur (Vorschlag):**
- `/src/styles/`
  - Lokales CSS Design System statt Tailwind CDN.
  - Trennung in `variables.css` (MLP Colors), `layout.css`, `components.css`.
- `/src/core/`
  - `state.js`: Zentrales State-Management (ersetzt globale Variablen wie `window.currentVariant` und organisiert `sessionStorage`).
  - `math.js`: Die reine Finanzmathematik (ausgelagert aus `calculateAndUpdate`).
- `/src/ui/`
  - `basins.js`: Rendering-Code (`renderBasin`, Inline-Editing).
  - `flows.js`: SVG-Zeichenlogik (`drawFlow`, Animationen).
- `/src/features/`
  - Module für isolierte Features wie `pdf-export.js`, `excel-export.js`, `sorr-simulator.js`, `erklaerer.js`.

### 2. Vorteil: Modulares CSS statt Inline & CDN
Aktuell zwingt Tailwind CDN den Browser, viel im `<head>` zu kompilieren. Zudem ist Inline-CSS fehleranfällig.
- Wir etablieren in `/src/styles/` ein reines **Vanilla CSS System**.
- Wir definieren **lokale CSS Custom Properties** (Tokens) nach dem MLP Design Guide (`--mlp-blau-dark`, `--mlp-titanium`).
- Styling-Änderungen (z.B. Dark Mode) laufen zentral über CSS-Variablen statt über hunderte JS-Injections.

---

## TEIL B: Das Design-Overhaul (UI/UX)

Mit der neuen Architektur im Rücken können wir das UI auf Premium-Niveau heben, ganz im Sinne des `MLP Corporate Design System` (8px Grid, exakte Farben, keine puren Schwarz/Weiß Kontraste).

### 1. Das CSS Design Token System
- Exakte Übernahme der Farbwerte aus dem **MLP Design Guide** (Titanium, Türkis, Error Red).
- **Kein reines Schwarz (#000000)** mehr, stattdessen konsequent `#2B2B2B` für Text.
- Farbige Badges und Erklärer nutzen exakt `MLP Med` oder `SOFE Petrol` je nach Kontext.

### 2. Das 8px-Grid System (Konsistentes Spacing)
Ein wesentliches Merkmal für "aufgeräumtes" Premium-Design ist ein striktes Raster.
- Ersetzung inkonsistenter Abstände durch Vielfache von 8 (8px, 16px, 24px, 32px, 48px).
- **Basins (Konten-Karten):** Erhalten einheitlich z.B. `24px` Padding und einen exakten, konstanten `border-radius` (z.B. `12px`).

### 3. Depth & Layering (Glassmorphism & Rahmen)
- **Entfernen aller massiven `box-shadows`.** (Diese wirken oft "gefrickelt" und altmodisch).
- Basins und Modals bekommen einen feinen `1px solid var(--mlp-titanium)` Rahmen oder einen extrem soften Schatten (`rgba(0,0,0,0.12)`). Das wirkt sofort 10x wertiger.
- **Modals:** Das Backdrop-Blur bekommt saubere CSS-Transitions beim Öffnen (`opacity` + `blur(8px)`), weich animiert wie in iOS.

### 4. Typografie & Lesbarkeit (Inter Font)
Die aktuelle `Inter` Integration wird perfektioniert:
- Klar definierte Typografie-Klassen (`.headline-h1`, `.body-text`) out-of-the-box.
- Tabellen (wie die Cashflow-Übersicht in Modals) werden gestylt mit Titanium-Linien und "Gray Lightest"-Zebratypografie. Tabular Nums stellen sicher, dass Kontobeträge optisch sauber untereinander stehen.

### 5. Moderne Interaktions-Stadien (Hover, Focus, Active)
- **Klickbare Basins (Inline Editing):** Ein subtiler Hover-Effekt (Hintergrund wird 2-3% dunkler oder Border wird farbig), plus ein zartes `transform: translateY(-2px)` zeigt dem Berater intuitiv: "Hier kann ich etwas eingeben".
- **Focus Rings:** Wenn ein Input-Feld aktiv wird, bekommt es einen sauberen, runden Outline (2px solid MLP Blau mit 2px Offset). Das erhöht die Accessibility und wirkt professionell.
- **Touch Targets:** Minimum 44x44px für das iPad-Beratungsgespräch.

### 6. Die "Flow" Animationen (Das SVG Herzstück)
Die Flüsse sind das wichtigste visuelle Element ("Der Flow"). Ich habe mir die `drawFlow()` Logik im Code genau angesehen. Aktuell werden die Flüsse über komplexe `<path>` Arrays mit Masken (`-mask`), Erasern (`-erase`) und Partikeln (`-dot`) layervariiert.
- **Sanftere Bezier-Kurven:** Die aktuellen Kurven nutzen starre Control-Points (z.B. `CURVE_MAIN = 70`). In v2.0 schreiben wir einen dynamischen SVG-Path-Generator, der fließende, physikalisch korrektere S-Kurven (Cubic Beziers) zwischen den Boxen berechnet, egal wo sie stehen.
- **Linienfarben & Glow:** Konsequente Nutzung von Türkis für Vermögensaufbau, Titanium für Standard-Flüsse. Plus: Wenn ein Flow einen "Überlauf" (wie beim Tagesgeld) hat, kann die SVG-Linie kurz aufleuchten (Drop-Shadow Glow in SVG).
- **Performance:** Durch die modulare Auslagerung in eine `flowRenderer.js` können wir die `requestAnimationFrame` Pipeline optimieren, sodass die Flows flüssiger bei 60fps laufen, selbst wenn Resize-Events feuern.

### 7. Buchungs-Timeline (Refinement)
- Reduzierung von Border-Dicken, stattdessen Einsatz einer leichten Titanium-Linie.
- Die Marker (`dots`) werden kreisrund und erhalten beim Hover eine saubere CSS-basierte Tooltip-Einblendung.

---

### Mein Action-Plan für die Umsetzung (Schritt-für-Schritt):

1. **Phase 1: Das Architektur-Fundament (Vite Setup & Code-Splitting)**
   - Setup des `vite` Projekts.
   - Entzerren der `index.html` in einzelne `.js` Dateien (`state.js`, `math.js`, `basins.js`, `flows.js`). 
   - *Ziel Phase 1:* Alles splitten, Logik exakt 1:1 beibehalten. Export-Tests laufen.
   
2. **Phase 2: CSS Token System & Grid (Foundation)**
   - Entfernen des Tailwind-CDNs, Aufbau lokaler MLP Custom Properties (`--mlp-blau-dark`).
   - Vereinheitlichen des 8px Grids.

3. **Phase 3: UI-Modernisierung (Karten, Modals & Glassmorphism)**
   - Neu-Styling der Basins (flache Titanium-Borders statt massiver Schatten).
   - Sauberes Backdrop-Blur Fade-In für die Modals.

4. **Phase 4: Flow Engine 2.0**
   - Refactoring der `drawFlow()` Logik auf den neuen dynamischen SVG-Path Generator (sanftere Bezier-Kurven).

> **Wartend auf dein GO!**
> Mit dem Wissen aus der Code-Base (und der dokumentierten SVG-Logik in `ANTIGRAVITY.md`) können wir das UI jetzt wirklich auf "Next Gen" heben, während die Mathematik kugelsicher bleibt.
> 
> Darf ich mit **Phase 1 (Vite Setup & Code-Aufteilung)** beginnen?

# Release v2.0.0 — Design-Overhaul & Architektur-Modernisierung

**Status:** In Planung
**ETA:** Q1-Q2 2026 (4-6 Sessions)
**Prioritaet:** HIGH
**Vorgaenger:** v1.7.8 (Aktien & Anleihen Erklaerer-Modal)
**Design-Preview:** `dev-tools/design-preview.html`

---

## Ziel

v2.0 macht aus dem funktionalen Prototyp ein **markenkonformes Beratungs-Tool**.

Die App ist funktional ausgereift (Basins, Flows, Erklaerer, Exporte). Aber das UI ist ein gewachsener Mix aus:
- Tailwind-Utility-Classes (teilweise JIT-Probleme)
- Inline-Styles (nachtraeglich fuer Bugfixes)
- Generic Browser-Defaults (Buttons, Inputs, Slider)
- Nur die neusten Erklaerer-Modals (Anleihen) haben das Premium-MLP-Design

## Design-Entscheidungen

| Entscheidung | Ergebnis |
|---|---|
| Default-Theme | **Light** (MLP Corporate), Dark bleibt als Option |
| Font | **Arial** (Systemfont) statt Inter (Google CDN) |
| Gradient-Zonen | **Ganzseitig** ueber gesamten Viewport (Phase 3/4) |
| Farb-Quelle | **MLP Corporate Design Guide** (`.claude/skills/design-guide/SKILL.md`) |
| Referenz-Design | **Anleihen-Modal** (v1.7.8) als Vorlage fuer Premium-Aesthetik |
| Visual Style | **Selective Glassmorphism** + konsistentes Radius-System (4/8/12/16px) |
| Erklaerer-Buttons | **Dezent & serioes** — Text-Links/Outline statt lauter Gradient-Buttons |
| Architektur | Single-File bleibt bis Phase 7, dann optionale Modularisierung |

## Design-Prinzipien

1. **MLP Corporate Design Guide** als einzige Designquelle
2. **CSS Custom Properties** statt verstreuter Hex-Werte
3. **Konsistente Komponenten** — ein Button sieht ueberall gleich aus
4. **Premium-Aesthetik** — die Anleihen-Modals als Referenz fuer alles
5. **8px Grid** durchgaengig (aktuell teilweise willkuerlich)

---

## Visual Direction: Glassmorphism & Premium-Aesthetik

### Glassmorphism (gezielt einsetzen)

Selektiver Einsatz von `backdrop-filter: blur()` + semi-transparenten Hintergruenden
fuer einen modernen, hochwertigen Look — inspiriert von Apple, Bloomberg, Private Banking UIs.

**Wo Glassmorphism passt:**
- Modals & Overlays (Session-Start/End, Erklaerer)
- Sidebar & Floating Panels
- Tooltips & Popovers
- Basin-Hover-Detail-Overlays

**Wo NICHT (Lesbarkeit First):**
- Basins selbst (Zahlen muessen sofort lesbar sein)
- Flow-Labels (Kontrast auf wechselndem Hintergrund)
- Tabellen & Datenbereiche
- Print/PDF Export

**Technische Umsetzung:**
```css
.mlp-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(190, 182, 170, 0.3);  /* Titanium transparent */
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 24px rgba(3, 61, 93, 0.08);
}
.theme-dark .mlp-glass {
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.15);
}
```

**Performance-Hinweis:** `backdrop-filter` kann auf schwachen Geraeten ruckeln.
Fallback: Solider Hintergrund ohne Blur. Progressive Enhancement.

### Konsistentes Radius-System

Aktuell: Mix aus `rounded-lg`, `rounded-xl`, `border-radius: 0.75rem`, `16px`, `999px` etc.

**Ziel:**
| Token | Wert | Verwendung |
|-------|------|------------|
| `--radius-sm` | 4px | Buttons, Inputs, kleine Elemente |
| `--radius-md` | 8px | Cards, Panels |
| `--radius-lg` | 12px | Modals, Basin-Container |
| `--radius-xl` | 16px | Glassmorphism-Panels, Hero-Elemente |
| `--radius-pill` | 999px | Pills, Badges, Tags |

### Erklaerer-Buttons: Dezent & Serioes

**Problem:** Aktuelle Erklaerer-Trigger-Buttons konkurrieren visuell mit dem Content.
Fuer ein Beratungstool sollten sie unaufdringlich sein — der Berater zeigt sie dem Kunden
nur wenn relevant, sie sollen nicht "schreien".

**Ziel-Design:**
```
Aktuell:    [  Aktien & Anleihen erklaert  ]    ← Gradient-Button, laut

Neu:        Aktien & Anleihen erklaert  →        ← Text-Link mit Pfeil, dezent
            oder:
            [ Aktien & Anleihen ]                ← Outline-Button, Titanium border
```

**CSS-Konzept:**
```css
.mlp-link-subtle {
  color: var(--mlp-primary);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  padding: 8px 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.2s;
}
.mlp-link-subtle:hover {
  color: var(--mlp-accent);  /* Tuerkis */
}
.mlp-link-subtle::after {
  content: " \2192";  /* Pfeil */
  transition: transform 0.2s;
}
.mlp-link-subtle:hover::after {
  transform: translateX(4px);
}
```

**Einsatz:** Phase 2 (Component-Klassen definieren) + Phase 3 (Sidebar/Depot-Modal migrieren)

---

## Architektur: Single-File vs. Multi-File

**Entscheidung:** Single-File bleibt bis Phase 7. Design-Overhaul erst, Modularisierung danach.

| Aspekt | Single-File (jetzt) | Multi-File (Phase 7) |
|--------|---------------------|---------------------|
| Ladezeit | ~550KB, <1s | Aehnlich, aber cachebar |
| CSS aendern | Ganzes File neu laden | Nur CSS-File |
| Wartbarkeit | Schwer bei 11.900 Zeilen | Deutlich besser |
| Deploy | 1 File uploaden | Mehrere, gleicher SFTP |
| Build-Step | Keiner | Keiner (ES Modules) |
| Risiko | Bekannt | Doppeltes Risiko wenn gleichzeitig mit Design |

**Moegliche Aufteilung in Phase 7:**
```
index.html           ← HTML-Struktur + Inline-Scripts (Basins, Flows)
css/mlp-tokens.css   ← Design Tokens (:root)
css/mlp-components.css ← Buttons, Inputs, Cards, Modals
css/mlp-layout.css   ← App-Chrome, Basins, Flow-Positionen
js/erklaerer-anleihen.js  ← Anleihen-Modal (lazy-loadable)
js/erklaerer-sorr.js      ← SoRR-Modal (lazy-loadable)
js/erklaerer-cost-avg.js  ← Cost-Average-Modal (lazy-loadable)
```

**Vorteil Lazy Loading:** Erklaerer-Modals (~3.000 Zeilen JS) werden erst geladen wenn geoeffnet.
Kein Build-Step noetig — native ES Modules (`<script type="module">`) reichen.

---

## Ist-Analyse (Probleme im aktuellen CSS)

| Problem | Ort | Details |
|---------|-----|---------|
| 2 konfligierende `:root`-Bloecke | L14-49 + L534-541 | `--mlp-blue-1` doppelt definiert mit verschiedenen Werten |
| Falsches Blau als Primary | L16 | `--mlp-blue-primary: #3b82f6` (Tailwind!) statt `#033D5D` |
| Falsche Status-Farben | L27-31 | `--color-success: #10b981` statt `#13853E`, etc. |
| Falscher Font | L8, L51, L2235 | Inter (Google Font CDN) statt Arial |
| Dark-Theme als Default | L2235 | `<body class="theme-dark bg-gray-900">` |
| ~260 hardcoded Hex-Werte | verteilt | 48x #033D5D, 39x #BEB6AA, 28x #47A190, 27x #2B2B2B |
| ~100+ var()-Referenzen auf alte Namen | verteilt | `--mlp-blue`, `--accent1`, `--gray-800` etc. |

---

## MLP Design Token System (Ziel-Zustand)

```css
:root {
  /* MLP Brand Colors */
  --mlp-primary: #033D5D;        /* MLP Blau Dark */
  --mlp-secondary: #BEB6AA;      /* Titanium */
  --mlp-accent: #47A190;         /* Tuerkis */

  /* Text */
  --mlp-text-dark: #2B2B2B;      /* Body Text — NIE #000000! */
  --mlp-text-medium: #717171;    /* Labels, Metadata */
  --mlp-text-light: #FFFFFF;     /* Auf dunklen Hintergruenden */

  /* Backgrounds */
  --mlp-bg-white: #FFFFFF;
  --mlp-bg-gray: #F8F8F8;

  /* Functional (NUR semantisch!) */
  --mlp-info: #047584;
  --mlp-success: #13853E;
  --mlp-warning: #E3691E;
  --mlp-error: #C1293D;

  /* Spacing (8px Grid) */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-xxl: 64px;

  /* Typography */
  --font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-h3: 20px;

  /* Shadows */
  --shadow-subtle: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  --shadow-elevated: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-modal: 0 25px 50px -12px rgba(0,0,0,0.5);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 999px;

  /* Backwards-Kompatibilitaet (100+ Referenzen!) */
  --mlp-corporate-blue: var(--mlp-primary);
  --mlp-titanium: var(--mlp-secondary);
  --mlp-turkis: var(--mlp-accent);
  --mlp-blue: var(--mlp-primary);
  --mlp-blue-primary: var(--mlp-primary);
  --mlp-blue-dark: var(--mlp-primary);
  --mlp-blue-1: var(--mlp-primary);
  --mlp-blue-2: #2a6a8a;
  --mlp-gold: var(--mlp-secondary);
  --mlp-platin: var(--mlp-secondary);
  --color-success: var(--mlp-success);
  --color-warning: var(--mlp-warning);
  --color-error: var(--mlp-error);
  --color-error-dark: #A1223A;
  --color-error-light: #E8A0AA;

  /* Gray Scale (Tailwind-Kompatibilitaet) */
  --gray-50: #f9fafb;  --gray-100: #f3f4f6;  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;  --gray-400: #9ca3af;  --gray-500: #6b7280;
  --gray-600: #4b5563;  --gray-700: #374151;  --gray-800: #1f2937;
  --gray-900: #111827;
}

/* Theme-Klassen */
.theme-light {
  --bg: var(--mlp-bg-white);
  --fg: var(--mlp-text-dark);
  --card: var(--mlp-bg-gray);
  --border: var(--mlp-secondary);     /* Titanium */
  --muted: var(--mlp-text-medium);
  --accent1: var(--mlp-primary);
  --accent2: var(--mlp-accent);       /* Tuerkis */
  --input-bg: var(--mlp-bg-white);
  --input-border: var(--mlp-secondary);
}
.theme-dark {
  --bg: #111827;  --fg: #FFFFFF;  --card: #1f2937;
  --border: #374151;  --muted: #9ca3af;
  --accent1: var(--mlp-primary);      /* MLP Blau statt Tailwind */
  --accent2: var(--mlp-accent);       /* Tuerkis statt Indigo */
  --input-bg: rgba(17, 24, 39, 0.92);
  --input-border: #374151;
}
```

---

## Bekanntes Problem: Modals auf kleinen Viewports (<=1400px)

**Gemeldet auf:** MacBook Air 13" (~1400px Aufloesung)
**Betrifft:** Erklaerer-Modals (Anleihen, SoRR, Cost-Average), Depot-Modal
**Symptom:** Modal-Inhalt passt nicht auf den Bildschirm, Navigation erschwert

### Loesung: Sticky Header/Footer + Responsive Sizing

```
┌─────────────────────────────┐
│ Modal-Header + Close    [X] │  ← position: sticky; top: 0
│ Tab 1 | Tab 2 | Tab 3      │  ← position: sticky; top: [header-height]
├─────────────────────────────┤
│                             │
│   Content scrollt hier      │  ← flex: 1; overflow-y: auto
│   unabhaengig               │
│                             │
├─────────────────────────────┤
│ [ Aktion ]    [ Schliessen] │  ← position: sticky; bottom: 0
└─────────────────────────────┘
```

**CSS-Konzept:**
```css
.mlp-modal {
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.mlp-modal-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--card);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--border);
}
.mlp-modal-tabs {
  position: sticky;
  top: 0;  /* direkt unter header wenn combined */
  z-index: 9;
  background: var(--card);
  padding: 0 var(--space-md);
  border-bottom: 1px solid var(--border);
}
.mlp-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
}
.mlp-modal-footer {
  position: sticky;
  bottom: 0;
  background: var(--card);
  padding: var(--space-sm) var(--space-md);
  border-top: 1px solid var(--border);
}

/* Kleine Viewports: Modal naher an Full-Screen */
@media (max-height: 800px) {
  .mlp-modal {
    max-height: 95vh;
    border-radius: var(--radius-sm);
  }
  .mlp-modal-body {
    padding: var(--space-sm);
  }
}
```

**Vorteile:**
- Tab-Navigation bleibt IMMER sichtbar (kein Hochscrollen noetig)
- Close-Button immer erreichbar
- Content scrollt unabhaengig im mittleren Bereich
- Auf MacBook Air: Modal nutzt 95% des Viewports statt 85%
- Charts/Slider passen besser durch reduzierten Padding

**Umsetzung:** Phase 2 (`.mlp-modal` Basisklasse) + Phase 5 (Erklaerer-Migration)

---

## Phasen-Uebersicht

| Phase | Inhalt | Session | Abhaengigkeit |
|-------|--------|---------|---------------|
| **1** | CSS Design Tokens & Foundation | 1 | keine |
| **2** | Globale Komponenten-Styles | 1-2 | Phase 1 |
| **3** | App-Chrome Redesign | 2 | Phase 1+2 |
| **4** | Basin & Flow Redesign | 3 | Phase 1+2 |
| **5** | Erklaerer-Modals vereinheitlichen | 3-4 | Phase 1+2 |
| **6** | Export & Print | 4 | Phase 1 |
| **7** | Architektur-Entschuldung (optional) | 5-6 | Phase 1 |

---

## Phase 1: Design-System-Foundation

**Ziel:** Sauberes Token-System, korrigierte Farben, Light-Default, Arial-Font

### Schritt 1: Google Fonts `<link>` entfernen (L8)
- Inter-Font-CDN loeschen — Arial ist Systemfont, kein CDN noetig
- Verbessert Ladezeit

### Schritt 2: Zwei `:root`-Bloecke -> ein autoritativer Block (L14-49 + L534-541)
- Beide bestehenden Bloecke loeschen
- EINEN neuen `:root`-Block mit korrekten MLP-Tokens einfuegen (siehe Token-System oben)
- Backwards-Aliases fuer 100+ bestehende var()-Referenzen

### Schritt 3: Theme-Klassen aktualisieren (L542-563)
- `.theme-light`: `--border` -> Titanium, `--accent2` -> Tuerkis (statt Gold)
- `.theme-dark`: `--accent1` -> MLP Blau (statt Tailwind Blau), `--accent2` -> Tuerkis (statt Indigo)

### Schritt 4: Font + Body + Theme-JS
- `body { font-family: var(--font-family); }` (L51)
- `<body class="theme-light ...">` statt `theme-dark bg-gray-900 text-white` (L2235)
- Flow-Gradient Dark: `#033D5D` + `#47A190` statt `#3b82f6` + `#6366f1` (L10984-85)
- `loadTheme()` Default -> `'light'` statt `'dark'` (L10991)

### Schritt 5: Globale Component-Klassen einfuegen (~L1345, additiv)
- `.mlp-btn` + `.mlp-btn-primary/secondary/tertiary/danger`
- `.mlp-input-field-v2` (Name vermeidet Kollision mit bestehendem `.mlp-input-field`)
- `.mlp-slider` (einheitlicher Range-Slider mit MLP-Farben)
- `.mlp-card` + `.mlp-card--elevated`

### Schritt 6: Hardcoded Hex in CSS-Bloecken ersetzen
- Anleihen-Slider (L3074, L3083, L3092, L3100): -> `var(--mlp-primary)` / `var(--mlp-secondary)`
- App-Heading (L1435): `#033D5D` -> `var(--mlp-primary)`
- App-Subheading (L1438): `#717171` -> `var(--mlp-text-medium)`
- Print-Styles (L485, L492, L501): `#002F6C` -> `#033D5D` (hardcoded fuer Print OK)

### Schritt 7: Basin/Flow Base-Styles theme-aware machen (L54-60, L96)
- `.account-basin`: `var(--gray-800)` -> `var(--card)`, `var(--gray-700)` -> `var(--border)`
- `button.account-basin`: gleiche Aenderung
- `.flow-value`: `#111827` -> `var(--bg)`, `#d1d5db` -> `var(--muted)`, `#4b5563` -> `var(--border)`

### Nicht in Scope (Phase 1)
- Inline `style="color: #033D5D"` in JS-generiertem HTML (~28 Stellen) -> Phase 2+
- Chart.js Farbwerte in JS-Objekten -> Phase 4
- Animation rgba-Werte (Shield/Basin Pulse) -> niedrige Prioritaet
- Tailwind CDN Entfernung -> Phase 7

---

## Phase 2: Globale Komponenten-Styles

**Ziel:** Einheitliche Buttons, Inputs, Slider, Cards, Modals

### Buttons
- [ ] `.mlp-btn-primary` — MLP Blau Dark bg, weiss text, hover/active/focus states
- [ ] `.mlp-btn-secondary` — Titanium bg, Text Dark, hover states
- [ ] `.mlp-btn-tertiary` — Weiss bg, MLP Blau border, hover states
- [ ] `.mlp-btn-danger` — Error Red, nur fuer destruktive Aktionen
- [ ] Alle bestehenden Buttons migrieren (Sidebar, Modals, Controls)

### Form Inputs
- [ ] Text-Inputs: Titanium border, Focus=MLP Blau, 40-48px Hoehe
- [ ] Range-Slider: Globaler Style (Vorlage: Anleihen-Modal)
- [ ] Select-Dropdowns: Passend zu Inputs
- [ ] Checkboxen/Toggles: MLP-branded

### Cards & Container
- [ ] `.mlp-card` — Titanium border ODER subtle shadow, nie beides
- [ ] `.mlp-section` — F8F8F8 bg, 8px-Grid padding
- [ ] `.mlp-modal` — Einheitliche Modal-Basis (aktuell 4+ verschiedene Stile)
- [ ] `.mlp-glass` — Glassmorphism-Klasse fuer Overlays, Panels, Modals

### Erklaerer-Trigger-Buttons
- [ ] `.mlp-link-subtle` — Dezenter Text-Link mit Pfeil statt Gradient-Button
- [ ] Depot-Modal: Erklaerer-Buttons migrieren (dezent, serioes)
- [ ] Sidebar: Erklaerer-Launches als unaufdringliche Links/Outline-Buttons

---

## Phase 3: App-Chrome Redesign

**Ziel:** Header, Control Bar, Sidebar, Session-Modals im MLP-Design

### Header/Control Bar
- [ ] Obere Leiste: MLP Blau Dark Hintergrund, weiss Text
- [ ] Varianten-Toggle (A/B): Premium-styled, nicht generic Tailwind
- [ ] Beratungsmodus-Stepper: MLP-Farben fuer Steps
- [ ] Session-Info-Dropdown: Glasmorphism beibehalten, MLP-Farben

### Session-Start/End Modals
- [ ] Session-Start: MLP-branded, professioneller erster Eindruck, **Glassmorphism-Overlay**
- [ ] Session-End: Export-Buttons in MLP-Style, **Glassmorphism-Overlay**
- [ ] Inputs: Konsistent mit globalem Form-Style

### Sidebar
- [ ] Erklaerer-Buttons: Einheitliches Card-Design statt Gradient-Buttons
- [ ] Einstellungs-Panel: MLP-styled Toggles und Selects
- [ ] Erklaerer-Status-Icons: MLP Tuerkis fuer besucht statt generic gruen

---

## Phase 4: Basin & Flow Redesign

**Ziel:** Basins, Flows und Gradient-Zonen im MLP-Design

### Basins
- [ ] Rahmen: Titanium borders statt gemischter Styles
- [ ] Labels: MLP Blau Dark Ueberschriften, Text Dark Werte
- [ ] Wert-Pills: Konsistente Farben (Tuerkis fuer positiv, Error Red nur bei Defizit)
- [ ] Hover-States: Subtile Shadow-Elevation

### Flows
- [ ] Flow-Farben: MLP-Palette (aktuell teilweise Tailwind-Defaults)
- [ ] Flow-Labels: Bessere Lesbarkeit, konsistente Positionierung
- [ ] Animations: Smooth, professionell, nicht verspielt

### Gradient-Zonen (Design-Entscheidung: ganzseitig)
- [ ] **Ganzseitig statt im Rahmen** — Wolken/Erde-Metapher ueber den kompletten Viewport
- [ ] Farb-Abstimmung auf MLP-Palette (subtiler, professioneller)
- [ ] Opacity-Werte optimieren fuer Light Theme
- [ ] Transitions bei Beratungsmodus-Steps verfeinern
- [ ] Responsiv: Gradient skaliert natuerlich mit Viewport

---

## Phase 5: Erklaerer-Modals vereinheitlichen

**Ziel:** Alle Modals auf Anleihen-Modal-Qualitaet bringen

**Referenz-Design: Anleihen-Modal (v1.7.8)**
- Premium MLP-Farben, Inline-Styles, professionelle Aesthetik

### Migration
- [ ] Cost-Average-Modal: MLP-Farben, Tab-Style, Chart-Farben
- [ ] SoRR-Modal: MLP-Farben, Slider-Style, Chart-Farben
- [ ] Immobilien-Modal: MLP-styled Formulare und Ergebnisse
- [ ] MSCI-Renditedreieck: Farbgebung pruefen

### Gemeinsame Elemente
- [ ] Tab-Navigation: Einheitliches Pattern (wie Anleihen), **sticky auf kleinen Screens**
- [ ] Lesson-Boxes: MLP-Style (BEB6AA border, nicht gelb)
- [ ] Result-Cards: Konsistente Darstellung ueber alle Modals

### Responsive Modal-Layout (Bugfix: MacBook Air 13")
- [ ] Sticky Header + Tabs (immer sichtbar, kein Hochscrollen)
- [ ] Scrollbarer Body-Bereich (unabhaengig von Header/Tabs)
- [ ] `@media (max-height: 800px)`: Modal auf 95vh, reduzierter Padding
- [ ] Charts: Responsive Hoehe (`min-height` statt fixer Hoehe)
- [ ] Close-Button immer erreichbar

---

## Phase 6: Export & Print

**Ziel:** PDF und Print mit MLP-Branding

### PDF-Export
- [ ] MLP-Logo oder Textmarke im Header
- [ ] MLP Blau Dark Ueberschriften
- [ ] Titanium Trennlinien
- [ ] Professionelle Tabellen-Formatierung

### Print-Stylesheet
- [ ] `@media print` optimiert fuer MLP-Branding
- [ ] Korrekte Farben fuer Druck (CMYK-safe Varianten beachten)

---

## Phase 7: Architektur-Modernisierung (optional)

**Ziel:** Single-File aufbrechen, Modularisierung, Codebase aufraumen

### File-Aufteilung (ES Modules, kein Build-Step)
- [ ] `css/mlp-tokens.css` — Design Tokens (:root)
- [ ] `css/mlp-components.css` — Buttons, Inputs, Cards, Modals, Glass
- [ ] `css/mlp-layout.css` — App-Chrome, Basins, Flow-Positionen
- [ ] `js/erklaerer-anleihen.js` — Anleihen-Modal (lazy-loadable)
- [ ] `js/erklaerer-sorr.js` — SoRR-Modal (lazy-loadable)
- [ ] `js/erklaerer-cost-avg.js` — Cost-Average-Modal (lazy-loadable)
- [ ] Lazy Loading: Erklaerer-Module erst bei Oeffnen laden (`import()`)
- [ ] Tailwind-Dependencies evaluieren (beibehalten vs. entfernen)

### Code-Hygiene
- [ ] Auskommentierte Bloecke entfernen (MSCI-Animation etc.)
- [ ] Console.log-Statements aufraeumen
- [ ] Konsistente Namenskonventionen (camelCase vs. kebab-case)
- [ ] Gemeinsame Utility-Functions extrahieren (calculateBondPrice etc.)
- [ ] Event-Handler konsolidieren

---

## Qualitaets-Checkliste (vor Release)

- [ ] **Kein `#000000`** irgendwo in der App (alles `#2B2B2B` oder heller)
- [ ] **Kein arbitrary spacing** (alles 8px-Grid)
- [ ] **Alle Buttons** haben hover/active/focus/disabled States
- [ ] **Alle Inputs** haben focus/error States
- [ ] **Alle Modals** nutzen gleiche Basis-Struktur
- [ ] **Contrast Ratios** WCAG-konform (4.5:1 fuer Text, 3:1 fuer grosse Elemente)
- [ ] **Mobile responsive** getestet (375px, 768px, 1024px)
- [ ] **Kleine Laptops** getestet (MacBook Air 13", 1400px — Modals muessen komplett nutzbar sein)
- [ ] **Lokal getestet** — alle Features funktionieren noch
- [ ] **Variante A + B** visuell konsistent
- [ ] **Beratungsmodus** funktioniert mit neuem Design
- [ ] **Exports** (PDF, CSV, Excel, JSON) funktionieren

---

## Verifizierung (nach jeder Phase)

1. Seite frisch laden (kein localStorage) -> Light-Theme als Default
2. Theme zu Dark wechseln -> alle Basins, Flows, Labels sichtbar
3. Zurueck zu Light -> alles MLP-konform
4. Anleihen-Modal oeffnen -> Slider MLP-Farben
5. SoRR-Modal oeffnen -> Charts korrekt
6. Beratungsmodus Steps 1-6 durchlaufen
7. Variante A und B pruefen
8. PDF-Export testen

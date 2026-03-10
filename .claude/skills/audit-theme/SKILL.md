---
name: audit-theme
description: Audit theme consistency, color contrast, and MLP brand compliance across both Light (Warm Sky) and Dark (MLP Navy) themes. Finds invisible text, hardcoded colors, missing theme tokens, and contrast violations.
---

# Theme Audit Skill — MultiAccountMLP

Systematischer Check aller Farben, Kontraste und Theme-Token-Nutzung. Prüft BEIDE Themes (Light + Dark) auf Sichtbarkeit und MLP-Branding.

## Wann aufrufen

- Nach Änderungen an Modals, Basins, Charts oder UI-Komponenten
- Nach Theme-Token-Änderungen in CSS
- Vor jedem Deploy (Teil von /pre-deploy)
- Bei User-Feedback zu Kontrastproblemen

## Bekannte Problemzonen (aus Erfahrung)

Diese Stellen haben in der Vergangenheit **wiederholt** Probleme verursacht:

1. **MLP-Blau (#033D5D) auf dunklem Hintergrund** → UNSICHTBAR
2. **Charts mit schwarzen Achsen** im Dark Mode
3. **Inline-Styles mit hardcoded Farben** die nicht auf Theme reagieren
4. **Modals**: `.modal-content` UND `.modal [role="document"]` müssen BEIDE `var(--card)` nutzen
5. **Erklärer-Modals** (Anleihen, SoRR, Cost-Average, Kriegskasse, MSCI) haben eigene Chart.js Instanzen

## Audit-Checkliste

### 1. Textfarben-Kontrast

**Regel:** WCAG AA Minimum — 4.5:1 für normalen Text, 3:1 für großen Text.

**Kritische Kombinationen prüfen:**

| Text | Auf Hintergrund | Theme | Erwartet |
|------|-----------------|-------|----------|
| `#033D5D` (MLP Blau) | `#0e1c2b` (--bg dark) | Dark | ❌ FAIL — unsichtbar! |
| `#033D5D` (MLP Blau) | `#18293a` (--card dark) | Dark | ❌ FAIL — unsichtbar! |
| `#2B2B2B` (Text Dark) | `#0e1c2b` (--bg dark) | Dark | ❌ FAIL — unsichtbar! |
| `#7db8d4` (MLP Blau Light) | `#0e1c2b` (--bg dark) | Dark | ✅ OK |
| `#ede9e3` (--fg dark) | `#18293a` (--card dark) | Dark | ✅ OK |
| `#2B2B2B` (Text Dark) | `#FFFFFF` (--bg light) | Light | ✅ OK |
| `#717171` (Text Medium) | `#F8F8F8` (--card light) | Light | ⚠️ Grenzwertig |

**Prüfpunkte:**
- [ ] Suche nach `color: #033D5D` oder `color: var(--mlp-primary)` in Elementen die auf dunklem Hintergrund liegen
- [ ] Suche nach `color: #2B2B2B` in Dark-Mode-Kontexten
- [ ] Alle `<h1>`, `<h2>`, `<h3>` Überschriften in Modals: Nutzen sie `var(--fg)` oder hardcoded?
- [ ] Alle `.muted` / sekundären Texte: `var(--muted)` oder hardcoded `#717171`?

**Grep-Patterns:**
```
color:\s*#033D5D
color:\s*#2B2B2B
color:\s*black
color:\s*#000
```

### 2. Hintergrund-Konsistenz

**Theme-Tokens (MÜSSEN verwendet werden):**

| Token | Light | Dark | Verwendung |
|-------|-------|------|------------|
| `var(--bg)` | `#FFFFFF` | `#0e1c2b` | Page Background |
| `var(--card)` | `#F8F8F8` | `#18293a` | Modal/Card BG |
| `var(--border)` | `#BEB6AA` | `#2d4256` | Borders |
| `var(--fg)` | `#2B2B2B` | `#ede9e3` | Text |
| `var(--muted)` | `#717171` | `#8a9aad` | Sekundärer Text |

**Prüfpunkte:**
- [ ] Hardcoded `background: #F8F8F8` statt `var(--card)`?
- [ ] Hardcoded `background: #1f2937` (Slate-Grau) statt MLP-Navy?
- [ ] Hardcoded `border-color: #BEB6AA` statt `var(--border)`?
- [ ] Modal-Backgrounds: Sowohl `.modal-content` als auch `.modal [role="document"]`?

**Grep-Patterns:**
```
background.*#F8F8F8
background.*#1f2937
background.*#111827
background.*slate
border.*#BEB6AA(?!.*var)
```

### 3. Chart.js Instanzen (JEDE einzeln prüfen)

Alle Charts müssen theme-aware sein. Bekannte Instanzen:

| Chart | Wo | Variable |
|-------|-----|----------|
| Prognose-Chart | Hauptseite | `prognoseChartInstance` |
| Cost-Average A | CA-Erklärer | `caChartA` o.ä. |
| Cost-Average B | CA-Erklärer | `caChartB` o.ä. |
| Kriegskasse | Kriegskasse-Erklärer | `kriegskasseChart` |
| SoRR | SoRR-Erklärer | `sorrChart` |
| Anleihen Duration | Anleihen-Erklärer | `anleihenChart` |
| MSCI Renditedreieck | MSCI-Erklärer | — (Canvas-basiert) |

**Prüfpunkte pro Chart:**
- [ ] Achsen-Labels: `color: var(--fg)` oder theme-aware?
- [ ] Grid-Lines: Nicht default-schwarz?
- [ ] Hintergrund: `var(--card)` oder mindestens nicht transparent auf falschem Grund?
- [ ] Legende: Textfarbe theme-aware?
- [ ] Tooltip: Textfarbe + Hintergrund theme-aware?

**Grep-Pattern:**
```
scales.*color
gridLines.*color
ticks.*color
legend.*color
tooltip.*background
Chart\(
new Chart
```

### 4. SVG / Flow-Farben

**Prüfpunkte:**
- [ ] `#flow-gradient` Stops: Werden sie in `applyTheme()` korrekt gesetzt?
- [ ] Light: `#1a6a8a` → `#2a7a9a` (~Zeile 12317)
- [ ] Dark: `#033D5D` → `#47A190` (~Zeile 12321)
- [ ] `.flow-erase` Stroke: `#ffffff` (Light) / `var(--gray-900)` (Dark)?
- [ ] `.flow-dot` Fill: Theme-aware?
- [ ] `.flow-label` Color: `var(--gray-400)` — funktioniert das in beiden Themes?
- [ ] `.flow-value` Labels: Lesbar auf beiden Themes?

### 5. Inline-Styles in JavaScript

Dynamisch generiertes HTML nutzt oft inline Styles mit hardcoded Farben:

**Prüfpunkte:**
- [ ] `renderBasin()` und verwandte Funktionen: Hardcoded Farben?
- [ ] Modal-Inhalte (Anleihen, SoRR etc.): Inline `color:` oder `background:` mit Hex-Werten?
- [ ] Tooltip-Generierung: Hardcoded Farben?
- [ ] `formatCurrency()` oder ähnliche Formatter: Farbige Ausgabe hardcoded?

**Grep-Patterns (in JS-Bereichen):**
```
style.*color.*#
innerHTML.*color.*#
'<.*style=".*color:
"<.*style=".*color:
```

### 6. CSS-Bridge (Tailwind → Theme)

v2.0 hat eine CSS-Bridge die Tailwind-Klassen auf Theme-Tokens mappt:

```css
.theme-dark .modal .text-gray-300 { color: var(--fg); }
.theme-dark .modal .bg-gray-800 { background: var(--card); }
```

**Prüfpunkte:**
- [ ] Alle Tailwind-Grau-Klassen in Modals abgedeckt?
- [ ] `.text-gray-300`, `.text-gray-400`, `.text-gray-500` → korrekte Mapping?
- [ ] `.bg-gray-700`, `.bg-gray-800`, `.bg-gray-900` → MLP-Navy statt Slate?
- [ ] `hover:` Varianten auch gemappt?

### 7. Print-Farben

Im Print-Modus wird auf Light Theme gewechselt, aber manche Farben sind extra definiert:

**Prüfpunkte:**
- [ ] `@media print` CSS: Alle Farben MLP-konform?
- [ ] Headers: `#033D5D` (korrekt auf weißem Papier)
- [ ] Text: `#2B2B2B` (nicht schwarz)
- [ ] Positive: `#13853E`, Negative: `#C1293D`
- [ ] Basins im Print-Klon: `background: #ffffff`, `border: #BEB6AA`

## Ausgabe-Format

```
## Theme Audit Report

### ✅ Korrekt (beide Themes)
- [Geprüfte Elemente die in beiden Themes funktionieren]

### ⚠️ Kontrast-Warnungen
- [Element] auf [Hintergrund] in [Theme]: Kontrast X:1 (Minimum: 4.5:1)

### ❌ Unsichtbar / Fehler
- [Element] mit [Farbe] auf [Hintergrund] — nicht lesbar!

### 🔧 Hardcoded Farben (sollten Tokens sein)
- Zeile X: `color: #033D5D` → sollte `var(--mlp-primary)` oder `var(--fg)` sein
```

## Farb-Referenz (Quick Lookup)

### Niemals verwenden auf Dark Background:
- `#033D5D` (MLP Blau Dark) — Kontrast < 2:1
- `#2B2B2B` (Text Dark) — unsichtbar
- `#000000` (Schwarz) — unsichtbar + verboten laut MLP Guide

### Sichere Dark-Mode-Farben:
- `#7db8d4` (MLP Blau Light) — für Überschriften
- `#ede9e3` (Warm White) — für Fließtext
- `#8a9aad` (Blue-Gray) — für sekundären Text
- `#47A190` (Türkis) — für Accents/Erfolg

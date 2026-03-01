# CLAUDE.md — MultiAccountMLP Projekt

## Was ist diese App?

Ein **Beratungs-Werkzeug für MLP-Finanzberater** — optimiert für Live-Gespräche mit Kunden.
Kein Self-Service-Tool. Kein Backend. Kein Login.

**Live-URL:** https://montolio.de
**Altes Design:** https://montolio.de/v1/ (v1.7.8, für Berater die sich eingerichtet haben)
**Aktuell:** v2.0 (Design-Overhaul) | **Nächstes Ziel:** Phase 6 (Export & Print)

---

## Architektur

**Single-file app:** `index.html` (~11.900 Zeilen, alles in einer Datei)

Kein Build-System, kein Framework, kein npm. Reines Vanilla JS + Tailwind CDN + Chart.js CDN.

### Key Functions

| Funktion | Zweck |
|----------|-------|
| `positionCascade()` | Berechnet x/y-Positionen aller Basins — Variante A & B |
| `drawFlow()` | Zeichnet animierte Flows zwischen Basins (SVG) |
| `calculateAndUpdate()` | Kern-Berechnung: Einkommen → Kaskade → alle Werte |
| `renderBasin(id, config)` | Rendert ein einzelnes Basin-Element |
| `openAnleihenModal()` / `closeAnleihenModal()` | Erklärer-Modal Aktien & Anleihen |
| `openSorrModal()` / `closeSorrModal()` | Erklärer-Modal SoRR |
| `markErklaererBesucht(key)` | Tracking für Erklärer-Status im Session-Menü |

### Varianten

- **Variante A**: Fixkosten-first (Giro → Fixkosten → Konsum)
- **Variante B**: Konsum-first (Giro → Konsum → Fixkosten)
- Toggle über `currentVariant` Variable

### SVG-Flow Engine (Herzstück der Visualisierung)

Jeder Flow zwischen Basins besteht aus 5 SVG-Elementen:
1. `flow-path` — Hauptfluss (Bézier-Kurve, eingefärbt via `url(#flow-gradient)`)
2. `flow-path-anim` — Animiertes Duplikat (CSS dashoffset → "Fließen"-Effekt)
3. `flow-mask` — Maskierungspfad
4. `flow-erase` — Breiter Eraser-Pfad (verdeckt Untergründe)
5. `flow-dot` — Fließendes Partikel (`<animateMotion>` entlang des Pfades)

**`drawFlow()` Logik:** Berechnet Bézier-Kurven in Echtzeit basierend auf `getBoundingClientRect()` der Basin-Container. Stroke-Width skaliert dynamisch mit Geldwert.

**KRITISCH:** Hardcoded Sonderfälle pro Flow und Variante (A/B) für Austritts-/Andockwinkel. Wenn CSS Basin-Dimensionen ändert → `positionCascade()` muss rekalibriert werden, aber SVG-Flows passen sich über `getBoundingClientRect()` an.

### UI-Zonen (Hintergrund-Metapher)

| Zone | Metapher | Bereich |
|------|----------|---------|
| Wolken | Einkommen (kommt von oben) | Top |
| Horizont | Girokonten (Alltagslevel) | Mitte-oben |
| Schuppen | Liquidität / Tagesgeld | Mitte |
| Felder | Vermögensaufbau (wächst) | Unten |

Diese Zonen unterlegen die "Water-Flow"-Metapher und müssen bei Design-Änderungen respektiert werden.

### Session-System

- `sessionStorage` (nicht localStorage!) — Daten leben nur im Tab
- `erklaererBesucht: { costAverage, sorr, anleihen }` — Status für Session-Menü-Icons
- Session-ID, Kundenkürzel, Berater werden beim Start erfasst

### Crash-Resilienz

`calculateAndUpdate()` → `calculateFinancialData()` ist eine **sequenzielle Pipeline**. Ein Fehler stoppt alles danach. Deshalb:
- `try/catch` um jedes Basin-Rendering
- `try/catch` um ChartJS-Instanzen
- Ein Crash beim letzten Basin → ALLE nachfolgenden Flows fehlen

---

## Coding-Konventionen (WICHTIG)

### HTML generieren

```javascript
// ✅ RICHTIG: String concatenation
var html = '<div style="color: #033D5D;">' + value + '</div>';

// ❌ FALSCH: Template Literals (können Probleme machen)
var html = `<div style="color: #033D5D;">${value}</div>`;
```

### CSS/Styling

```javascript
// ✅ RICHTIG: Inline Styles für dynamisch generiertes HTML
element.style.background = '#033D5D';

// ❌ FALSCH: Tailwind JIT-Klassen mit dynamischen Werten
// text-[10px] oder bg-[#033D5D] funktionieren NICHT (kein Build-Step)
```

### Null/Zero-Checks

```javascript
// ✅ RICHTIG: isNaN-Check (0 bleibt 0!)
var val = isNaN(parseFloat(input.value)) ? defaultValue : parseFloat(input.value);

// ❌ FALSCH: || Fallback (0 wird zu defaultValue!)
var val = parseFloat(input.value) || defaultValue;
```

### Fehler-Isolation

```javascript
// ✅ RICHTIG: try/catch um Basin-Rendering
try {
    renderBasin('depot', config);
} catch(e) {
    console.error('Basin depot failed:', e);
}
// Ohne try/catch: Ein Fehler killt ALLE nachfolgenden Flows!
```

### Basin-Positionen

- **NIEMALS** Drag-Tool-Pixelwerte in abgeleitete Formeln umrechnen
- Direkte Offsets von `newCenterX` verwenden
- Depot/Immo-Positionen über `outerFrameLeft`

---

## MLP Corporate Design

Vollständiger Guide: `.claude/skills/design-guide/SKILL.md`

### Design-Philosophie (v2.0)

**Glasmorphism + MLP = Premium-Feel:**
- Modals/Cards: `backdrop-filter: blur(12px)`, halbtransparente Backgrounds, subtile Borders
- Smooth Animations: `transition: all 0.2s ease` auf interaktiven Elementen
- Keine harten Zustandswechsel — alles animiert

**Farb-Regeln:**
- **NIEMALS** `#033D5D` als Textfarbe auf dunklen Hintergründen — unsichtbar!
- Im Dark-Mode: `#7db8d4` (helles MLP-Blau) für Überschriften verwenden
- Charts/Diagramme: Hintergrund MUSS `var(--card)` sein, Achsen theme-aware
- Jede Farbkombination auf BEIDEN Themes prüfen (Light + Dark)

**Theme-Tokens verwenden (NICHT hardcoded):**
```
var(--fg)     statt color: white / color: #2B2B2B
var(--card)   statt background: #F8F8F8 / background: #1f2937
var(--border) statt border-color: #BEB6AA / border-color: #374151
var(--muted)  statt color: #717171 / color: #9ca3af
```

### Kern-Farben

| Token | Hex | Verwendung |
|-------|-----|------------|
| MLP Blau Dark | `#033D5D` | Primary, Buttons (NUR auf hellem Grund!) |
| MLP Blau Light | `#7db8d4` | Überschriften im Dark Mode |
| Titanium | `#BEB6AA` | Borders, neutrale Elemente, Marktzins |
| Türkis | `#47A190` | Accent, Erfolg, positive Werte |
| Text Dark | `#2B2B2B` | Fließtext (nur Light Mode) |
| Text Medium | `#717171` | Labels, sekundärer Text (nur Light Mode) |
| Background | `#F8F8F8` | Hintergrund-Flächen (Light Mode) |
| Error Red | `#C1293D` | NUR für echte Fehler/Defizite |
| Warning Orange | `#E3691E` | Warnungen |

### Dark Mode Palette (MLP Navy)

| Token | Hex | Verwendung |
|-------|-----|------------|
| `--bg` | `#0e1c2b` | Deep MLP Navy (Page BG) |
| `--card` | `#18293a` | Modal/Card BG |
| `--border` | `#2d4256` | Borders |
| `--fg` | `#ede9e3` | Text (Warm White) |
| `--muted` | `#8a9aad` | Sekundärer Text |

### Slider Styling (Vorlage)

```css
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: #BEB6AA;
    outline: none;
}
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #033D5D;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
```

---

## Deploy-Workflow

```bash
# Immer erst lokal testen!
# Dann committen:
git add index.html
git commit -m "feat/fix/docs(vX.Y.Z): Beschreibung"
git push

# Deploy zu Ionos:
powershell -ExecutionPolicy Bypass -File deploy-curl-sftp.ps1 -Force
```

- **Hosting:** Ionos (NICHT Hetzner!)
- **Credentials:** `.ftp-credentials` (gitignored)
- **SFTP-Script:** `deploy-curl-sftp.ps1`

### Wichtige Lektion aus v1.7.6

Ein Crash beim letzten Basin → ALLE Flows fehlen (Render-Reihenfolge!).
**Immer lokal testen bevor deployed wird.**

### PDF-Print Flow-Darstellung (v1.7.8 → v2.0 Lektion)

Der Finanzfluss wird im PDF als **DOM-Klon** gedruckt (nicht als Bild).
Die bewährte Methode aus v1.7.8 funktioniert — NICHT durch eigene JS-Skalierung ersetzen!

**CSS-Regel (bewährt, nicht ändern!):**
```css
#flow-container-print {
    transform: scale(0.75) !important;
    transform-origin: top center !important;
    width: 1100px !important;
    margin: 0 auto -380px auto !important;
    position: relative !important;
    left: 50% !important;
    margin-left: -720px !important;
}
```

**v2.0-Ergänzungen zum Klon:**
- `.no-print` Elemente entfernen (Mobile Warning)
- `.gradient-zone`, `.ambient-glow` entfernen (Screen-Dekoration)
- Basins: `backdrop-filter: none`, `background: #ffffff`, `border: 1px solid #BEB6AA`
- SVG-Strokes inline setzen (CSS-Vars greifen nicht im Print-Klon)
- `.flow-erase` explizit auf `stroke: #ffffff`
- `.flow-value`: weiß + `#2B2B2B` Text + Titanium Border
- `.flow-label`: `#717171`
- Animationen stoppen, Flow-Dots entfernen

---

## Dev Tools

- **Basin Drag-Tool:** `Ctrl+Alt+F12` → aktiviert visuelles Drag-and-Drop für Basin-Positionen
- Flag: `_devDragMode` in `positionCascade()`
- Backup: `dev-tools/basin-drag-tool.js`

---

## Erklärer-Modals (Tracking-System)

```javascript
// Session-State
erklaererBesucht: {
    costAverage: false,
    sorr: false,
    anleihen: false
}

// Bei Öffnen des Modals aufrufen:
markErklaererBesucht('anleihen');
```

Icons im Session-Menü: ⭕ = nicht besucht, ✅ = besucht (Türkis)

---

## Farbthemen-Katalog (für spätere Theme-Auswahl im Session-Menü)

Berater sollen im Session-Menü zwischen Farbthemen wählen können. Jedes freigegebene Theme bekommt einen Namen.

### Freigegebene Themes

| Name | Typ | Body-Gradient | Zonen | Status |
|------|-----|---------------|-------|--------|
| **Warm Sky** | Light | `#eaf2fa` → `#f0f2f6` → `#e3dbd0` | Wolken (MLP-Blau), kein Horizont, Erde (Titanium) | Aktiv |
| **MLP Navy** | Dark | `#0e1c2b` → `#18293a` | Dezent MLP-Blau oben, Titanium-Hauch unten, kein Horizont | Aktiv |

### Abgelehnte Versuche (als Referenz)

| Name | Grund der Ablehnung |
|------|---------------------|
| Türkis/Aqua | Zu MLP-Med, nicht Core. Türkis großflächig = klinisch |

### Design-Regeln für neue Themes

- **Türkis (#47A190)** nur als Accent, NIEMALS großflächig
- **Keine sichtbare Horizontlinie** — muss nicht erklärt werden
- **Flows** müssen zum Hintergrund passen (heller auf hellem Theme)
- **MLP Core**: Blau (#033D5D) + Titanium (#BEB6AA) = primäre Palette
- Jedes Theme braucht: Body-Gradient, 4 Zonen, Flow-Farben, Basin-Style

---

## Roadmap

| Version | Thema | Status |
|---------|-------|--------|
| v1.7.8 | Aktien & Anleihen Erklärer-Modal | ✅ Archiviert unter /v1/ |
| **v2.0** | **Design-Overhaul + CSS Design System** | ✅ Gemerged (Phase 1-5 fertig) |
| v2.0+ | Phase 6: Export & Print, Phase 7: Architektur | In Arbeit |
| v3.0 | Vermögensverzehr-Modus (Ruhestand) | Langfristig |

Details: `ROADMAP.md`

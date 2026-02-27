# CLAUDE.md — MultiAccountMLP Projekt

## Was ist diese App?

Ein **Beratungs-Werkzeug für MLP-Finanzberater** — optimiert für Live-Gespräche mit Kunden.
Kein Self-Service-Tool. Kein Backend. Kein Login.

**Live-URL:** https://montolio.de
**Aktuell:** v1.9.3 | **Nächstes Ziel:** v2.0 (Design-Overhaul)

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

### Kern-Farben

| Token | Hex | Verwendung |
|-------|-----|------------|
| MLP Blau Dark | `#033D5D` | Primary, Überschriften, Buttons |
| Titanium | `#BEB6AA` | Borders, neutrale Elemente, Marktzins |
| Türkis | `#47A190` | Accent, Erfolg, positive Werte |
| Text Dark | `#2B2B2B` | Fließtext |
| Text Medium | `#717171` | Labels, sekundärer Text |
| Background | `#F8F8F8` | Hintergrund-Flächen |
| Error Red | `#C1293D` | NUR für echte Fehler/Defizite |
| Warning Orange | `#E3691E` | Warnungen |

### Design-Referenz

Das **Anleihen-Modal (v1.7.8)** ist die Referenz für Premium-MLP-Design:
- Tab-Navigation mit inline MLP-Styles
- Vertical Fill-Tanks, MLP-Farben
- Slider mit custom CSS (kein browser-default blau/grau)
- Lesson-Boxes: BEB6AA left-border, 033D5D bold text

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

## Roadmap

| Version | Thema | Status |
|---------|-------|--------|
| v1.7.8 | Aktien & Anleihen Erklärer-Modal | ✅ Released |
| **v2.0** | **Design-Overhaul + CSS Design System** | Nächstes Ziel |
| v3.0 | Vermögensverzehr-Modus (Ruhestand) | Langfristig |

Details: `ROADMAP.md`

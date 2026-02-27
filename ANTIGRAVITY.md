# ANTIGRAVITY.md — MultiAccountMLP Projekt-Kontext

Diese Datei dient als **Ergänzung zu `CLAUDE.md`** und enthält spezifisches Wissen, das Antigravity aus der Code-Base (`index.html`) extrahiert hat. Sie ist essenziell für komplexe Umbauarbeiten wie das v2.0 Design-Overhaul.

## 1. Die SVG-Flow Engine (Das Herzstück)

Die visuellen Flüsse zwischen den Konten ("Basins") sind **keine** einfachen Canvas-Linien, sondern hochkomplexe, programmatisch generierte SVG-Pfade.

### Struktur eines Flows
Jeder Flow besteht im HTML aus einer Gruppe von SVGs:
1. `<path class="flow-path ...">` (Der Hauptfluss, eingefärbt über `url(#flow-gradient)`)
2. Ein Animiertes Duplikat (`-anim`), das die CSS-Dashoffset-Animation erzeugt (das "Fließen").
3. Ein Masken-Pfad (`-mask`)
4. Ein breiter *Eraser*-Pfad (`-erase`), der Untergründe verdeckt.
5. Das fließende Partikel (Der Punkt "Flow-Dot", generiert in `attachFlowDot()` über eine `<animateMotion>` entlang des Pfades).

### Generierungslogik (`drawFlow()`)
Die Funktion berechnet in Echtzeit Bézier-Kurven (`C`-Befehle im SVG-Pfad) basierend auf der Position der div-Container:
- Die **Dicke** (`stroke-width`) skaliert dynamisch mit dem proportionalen Geldwert (`value / maxFlowValue`), limitiert durch `LAYOUT.MIN_FLOW_WIDTH` (10px) und `MAX_FLOW_WIDTH` (45px).
- **Hardcodierte Sonderfälle:** Es gibt sehr viele `if/else` Blöcke für spezifische Flows (z.B. `fixkosten-depot-flow`, `vermieterkonto-einkommen-flow`), die exakte Austritts- und Andockwinkel pro Variante (A vs B) definieren, um Überschneidungen zu verhindern!

**WICHTIG FÜR v2.0:** Bei einem Architektur-Umbau/Styling-Update *darf die Berechnung der Start/End-Koordinaten (`fromX`, `fromY`, `toX`, `toY`) niemals brechen*, sonst fliegen die SVGs wahllos über den Bildschirm.

## 2. Das Basin Grid & Layout

Die Basins sind absolut positioniert (`position: absolute;`). Das Layout ist KEIN Flexbox oder Grid!
- Die Funktion `positionCascade()` ermittelt die exakten X/Y Offsets in Abhängigkeit einer berechneten `newCenterX`.
- Es existiert ein internes Dev-Tool (`_devDragMode` per `Ctrl+Alt+F12`), womit der User Basins händisch per Drag&Drop verschieben konnte, um perfekte Koordinaten zu finden.

**WICHTIG FÜR v2.0:** Wenn wir in v2.0 Abstände (Paddings, Margins, Borders) des CSS ändern, ändert sich die Höhe/Breite der Basins (`offsetWidth` / `offsetHeight`). Da die SVG-Flows am äußeren Rand (`getBoundingClientRect()`) der Basins andocken, bleiben die Linien intakt, **ABER** das statische Layout aus `positionCascade()` muss auf die neuen Dimensionen kalibriert werden.

## 3. Crash-Resilienz (Data Integrity)
Die Berechnungslogik (`calculateAndUpdate()` -> `calculateFinancialData()`) ist eine einzige große Pipeline, die iterativ durchläuft. 
- Fehler in der Pipeline stoppen den Flow (alles nach dem Crash rendert nicht mehr).
- Aus diesem Grund gibt es robuste try/catch-Blöcke um kritische Renderings (wie ChartJS).

## 4. UI-Metaphern (Die Zonen)
Der Bildschirm hat einen semantischen Z-Index und visuelle Zonen (die Gradients im Hintergrund):
- Wolken (Einkommen)
- Horizont (Girokonten)
- Schuppen (Liquidität / Tagesgeld)
- Felder (Vermögensaufbau)

Diese Zonen müssen beim UI-Overhaul (z.B. durch Glassmorphism-Effekte) respektiert werden, da sie die "Water-Flow" Metapher unterlegen.

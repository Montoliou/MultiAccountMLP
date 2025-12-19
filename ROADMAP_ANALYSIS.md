# 📊 Roadmap-Analyse: v1.5.2 bis v1.6.0

**Analyse-Datum:** 18. Dezember 2025
**Aktuelle Live-Version:** v1.5.1 (Depot Risk Classification)
**Analysiert von:** Claude Code

---

## 🎯 Executive Summary

**Status Quo:**
- **v1.5.0**: ✅ Abgeschlossen (Code Hardening & Performance)
- **v1.5.1**: ✅ Abgeschlossen (PDF Export Fixes + Risk Classification)
- **v1.5.2-1.5.6**: ⏳ Teilweise implementiert, gemischt mit v1.5.0

**Kritische Erkenntnis:**
Die Versionsnummern 1.5.2 bis 1.5.6 sind **keine eigenständigen Releases**, sondern **Unterabschnitte von v1.5.0**, die bereits teilweise implementiert wurden. Die Roadmap muss **konsolidiert und neu strukturiert** werden.

---

## 📋 Detaillierte Analyse nach Version

### ✅ Version 1.5.0 (ABGESCHLOSSEN)

**Status:** 100% implementiert
**Release-Datum:** 25. November 2024
**Code Health:** 7.5/10 → 9.0/10 ✅

**Was wurde erreicht:**
- ✅ v1.5.1: Robustheit & Fehlerbehandlung (100%)
- ✅ v1.5.2: Performance-Optimierungen (90%)
- ✅ v1.5.3: Accessibility (WCAG 2.1 AA, 100%)
- ✅ v1.5.4: Code-Qualität (Named Constants, 60%)
- ✅ v1.5.5: Dead Code Removal (100%)

**Noch offen aus v1.5.0:**
- ⏳ v1.5.2: Virtual DOM für Listen (LOW priority)
- ⏳ v1.5.2: Smart Variant Switch (LOW priority)
- ⏳ v1.5.3: Modal Focus Trap (MEDIUM priority)
- ⏳ v1.5.4: Function Decomposition (MEDIUM priority)
- ⏳ v1.5.4: JSDoc Comments (LOW priority)
- ⏳ v1.5.6: 8px Grid Audit (LOW priority)
- ⏳ v1.5.6: CSS Variable Consistency (MEDIUM priority)

---

### ✅ Version 1.5.1 (ABGESCHLOSSEN)

**Status:** 100% implementiert
**Release-Datum:** 18. Dezember 2025
**Fokus:** PDF Export Fixes + Depot Risk Classification

**Was wurde erreicht:**
- ✅ **PDF Export Critical Fixes**
  - Duplicate ID Bugs (rendite, depotCurrent, anlagezeitraum)
  - Flow-Visualisierung auf A4-Seite
  - Rendite Auto-Fill entfernt
- ✅ **Depot Risk Classification System**
  - Infinity-8 Toggle Switch
  - Fund Blocks Visualization (3-column grid)
  - MLP Color Palette (Blue/Red)
  - PDF Export mit Strategie-Spalte
- ✅ **Data Model Robustness**
  - Automatische Migration für alte Sessions
  - 100% Backward Compatibility

**Impact:** Kritische Bugfixes + wichtiges neues Feature für Beratung

---

### ⏳ Version 1.3.3: Beratungs-Szenarien (OFFEN)

**Status:** 0% implementiert
**Priorität:** ⭐⭐ MEDIUM-HIGH
**ETA:** 1-2 Wochen

**Features:**
- [ ] **Szenario-Vergleich**
  - "Was wäre wenn... Immobilie abbezahlt?"
  - Side-by-Side Darstellung
  - Highlight Unterschiede

- [ ] **Quick-Szenarien**
  - Immobilie verkaufen
  - Zweite Immobilie kaufen
  - Vermieten statt selbst nutzen

**Bewertung:**
- **Notwendigkeit:** 🟡 MEDIUM - Nice-to-have, aber nicht kritisch
- **Komplexität:** 🔴 HIGH - Braucht State-Management für Szenarien
- **ROI für Beratung:** 🟢 HIGH - Sehr wertvoll für "Was-wäre-wenn"-Gespräche

**Empfehlung:** ✋ **SPÄTER** - Erst nach v1.6.0 UX-Features

---

### ⏳ Version 1.4.0: Session-Historie & Templates (OFFEN)

**Status:** 0% implementiert
**Priorität:** ⭐ LOW
**ETA:** 2-3 Wochen

**Features:**
- [ ] Session-Historie (Letzte 10 Sessions)
- [ ] Template-System (Gutverdiener, Familie, Rentner)
- [ ] Template-Export

**Bewertung:**
- **Notwendigkeit:** 🟢 LOW - Produktivitäts-Feature, kein Muss
- **Komplexität:** 🟡 MEDIUM - IndexedDB-Integration nötig
- **ROI für Beratung:** 🟡 MEDIUM - Zeitsparend, aber nicht essentiell

**Empfehlung:** ✋ **VERSCHIEBEN** auf v1.7.0 oder später

---

### ⏳ Version 1.5.0 (alte Nummerierung): Berater-Notizen & Excel-Export (OFFEN)

**Status:** 0% implementiert
**Priorität:** ⭐⭐ MEDIUM
**ETA:** 3-4 Wochen

**Features:**
- [ ] **Berater-Notizen pro Basin** ⭐⭐
  - Erscheint im PDF-Export
  - Toggle: "Für Kunde sichtbar" vs. "Nur intern"
  - Markdown-Support

- [ ] **Gesprächs-Protokoll**
  - Chronologische Notizen
  - Timeline im PDF

- [ ] **Excel-Export mit Formeln**
  - Multi-Sheet-Workbook
  - Live-Formeln

**Bewertung:**
- **Notwendigkeit:** 🟡 MEDIUM - Berater-Notizen sehr wertvoll!
- **Komplexität:** 🔴 HIGH - Excel-Export technisch aufwendig
- **ROI für Beratung:** 🟢 HIGH - "Kunde kann später nachlesen"

**Empfehlung:**
- ✅ **Berater-Notizen:** JETZT implementieren (v1.6.0)
- ✋ **Excel-Export:** SPÄTER (v1.7.0)

**Neue Nummerierung vorgeschlagen:** v1.7.0

---

### 🎯 Version 1.6.0: UX-Polish & Kunden-Verständnis (NEU PRIORISIERT)

**Status:** 0% implementiert
**Priorität:** ⭐⭐⭐ HIGHEST
**ETA:** 4-5 Wochen

**Features:**

**1.6.1: Tagesgeld-Schutzschild-Visualisierung** ⭐⭐⭐
- [x] Konzept dokumentiert (4-Level Interaction)
- [ ] Level 1: Permanentes Info-Badge
- [ ] Level 2: Hover-Tooltip
- [ ] Level 3: 5-Sekunden-Demo-Animation
- [ ] Level 4: Modal mit Zahlen-Vergleich

**1.6.2: Presenter-Mode** ⭐⭐
- [ ] Vollbild-Modus
- [ ] Highlight-Modus (Spot-Light-Effekt)

**1.6.3: Animierte Transitionen** ⭐
- [ ] Smooth Beratungsmodus-Steps
- [ ] Flow-Pulse-Effekt

**1.6.4: Kunden-Verständnis-Features** ⭐⭐
- [ ] Tooltip-System
- [ ] Info-Overlays
- [ ] "Wie funktioniert das?"-Button

**Bewertung:**
- **Notwendigkeit:** 🟢 CRITICAL - "Kunde soll VERSTEHEN"
- **Komplexität:** 🟡 MEDIUM - Viel Animation, aber machbar
- **ROI für Beratung:** 🟢 HIGHEST - Direkte Verbesserung der Beratungsqualität

**Empfehlung:** ✅ **JETZT STARTEN** - Höchste Priorität!

---

## 🔄 Empfohlene Roadmap-Neustrukturierung

### Phase 1: Kritische Fixes & UX (Q1 2026)

**v1.5.2: Offene Punkte aus v1.5.0 schließen** (1 Woche)
- [ ] Modal Focus Trap korrigieren
- [ ] CSS Variable Consistency
- [ ] Function Decomposition (`calculateAndUpdate()`)
- [ ] Duplicate Control Bar CSS entfernen

**v1.6.0: UX-Polish & Kunden-Verständnis** ⭐⭐⭐ (4-5 Wochen)
- [ ] 1.6.1: Schutzschild-Visualisierung (Woche 1-2)
- [ ] 1.6.2: Presenter-Mode (Woche 3)
- [ ] 1.6.3: Animierte Transitionen (Woche 4)
- [ ] 1.6.4: Tooltip-System (Woche 5)

---

### Phase 2: Berater-Produktivität (Q2 2026)

**v1.7.0: Berater-Notizen & Annotations** ⭐⭐ (3 Wochen)
- [ ] Notizen-Feld pro Basin (im PDF sichtbar)
- [ ] Gesprächs-Protokoll
- [ ] Markierungen & Empfehlungen

**v1.8.0: Session-Historie & Templates** ⭐ (2-3 Wochen)
- [ ] Letzte 10 Sessions
- [ ] Template-System (Gutverdiener, Familie, Rentner)

---

### Phase 3: Erweiterte Features (Q3 2026)

**v1.9.0: Beratungs-Szenarien** ⭐⭐ (2 Wochen)
- [ ] "Was wäre wenn..."-Vergleiche
- [ ] Quick-Szenarien (Immobilie abbezahlt, verkauft, etc.)

**v1.10.0: Excel-Export & Advanced Export** ⭐ (2 Wochen)
- [ ] Multi-Sheet-Workbook mit Formeln
- [ ] Conditional Formatting

---

## 📊 Prioritäten-Matrix

| Feature | Notwendigkeit | Komplexität | ROI | Empfehlung |
|---------|--------------|-------------|-----|------------|
| **Schutzschild-Visualisierung (1.6.1)** | 🟢 CRITICAL | 🟡 MEDIUM | 🟢 HIGHEST | ✅ **JETZT** |
| **Offene v1.5.0 Tasks (1.5.2)** | 🟡 MEDIUM | 🟢 LOW | 🟡 MEDIUM | ✅ Schnell abschließen |
| **Berater-Notizen (1.7.0)** | 🟡 MEDIUM | 🔴 HIGH | 🟢 HIGH | ✅ Nach 1.6.0 |
| **Beratungs-Szenarien (1.3.3)** | 🟡 MEDIUM | 🔴 HIGH | 🟢 HIGH | ✋ Q3 2026 |
| **Session-Historie (1.8.0)** | 🟢 LOW | 🟡 MEDIUM | 🟡 MEDIUM | ✋ Q2 2026 |
| **Excel-Export (1.10.0)** | 🟢 LOW | 🔴 HIGH | 🟡 MEDIUM | ✋ Q3 2026 |

---

## ✅ Aktionsplan für nächste 3 Monate

### Januar 2026

**Woche 1-2: v1.5.2 - Offene Punkte schließen**
- Modal Focus Trap
- CSS Variable Consistency
- Function Decomposition
- Dead CSS entfernen

**Woche 3-4: v1.6.0 Start - Schutzschild Level 1+2**
- Permanentes Info-Badge
- Hover-Tooltip mit pulsierender Linie

### Februar 2026

**Woche 1-2: v1.6.0 - Schutzschild Level 3+4**
- 5-Sekunden-Demo-Animation
- Modal mit Zahlen-Vergleich + Chart.js

**Woche 3: v1.6.0 - Presenter-Mode**
- Vollbild-Modus
- Highlight-Modus

**Woche 4: v1.6.0 - Animationen**
- Smooth Beratungsmodus-Steps
- Flow-Pulse-Effekt

### März 2026

**Woche 1: v1.6.0 - Tooltip-System**
- Basin-Tooltips
- Info-Overlays
- Testing & Finalisierung

**Woche 2-4: v1.7.0 Start - Berater-Notizen**
- Notizen-Feld pro Basin
- PDF-Integration
- Gesprächs-Protokoll

---

## 🚨 Erkenntnisse & Empfehlungen

### 1. Versionsnummern-Chaos beseitigen

**Problem:**
v1.5.2 bis v1.5.6 waren nie eigenständige Versionen, sondern Unterabschnitte von v1.5.0.

**Lösung:**
- Roadmap neu nummerieren
- Alle offenen v1.5.x Tasks in **v1.5.2** zusammenfassen
- Danach direkt zu **v1.6.0** springen

### 2. Fokus auf UX-Impact

**Beobachtung:**
Die wichtigsten Features für Beratungsqualität sind:
1. Schutzschild-Visualisierung (Kunde versteht Tagesgeld-Schutz)
2. Berater-Notizen (Kunde kann später nachlesen)
3. Animationen (Kunde sieht Geld "fließen")

**Empfehlung:**
✅ **UX-Features (v1.6.0) VOR Produktivitäts-Features (v1.8.0)**

### 3. Technische Schulden abbauen

**Offene Tasks aus v1.5.0:**
- Function Decomposition (`calculateAndUpdate()` ist 223 Zeilen!)
- CSS Variable Consistency
- Modal Focus Trap

**Empfehlung:**
✅ **1 Woche investieren** um v1.5.0 sauber abzuschließen, bevor v1.6.0 startet

### 4. Realistische Zeitplanung

**Aktuelle Roadmap:**
- v1.6.0: "4-5 Wochen"
- v1.7.0: "3-4 Wochen"
- v1.8.0: "2-3 Wochen"

**Realistische Einschätzung (mit Puffer):**
- v1.5.2: 1 Woche
- v1.6.0: **6-7 Wochen** (wegen Schutzschild-Komplexität)
- v1.7.0: **4-5 Wochen** (Berater-Notizen + PDF-Integration)
- v1.8.0: 3 Wochen

---

## 📈 Erfolgsmetriken für v1.6.0

**Ziele:**
- [ ] **Kunde versteht Tagesgeld-Schutz:** 90% der Berater berichten von besserem Verständnis
- [ ] **Beratungsqualität steigt:** Feedback-Score > 4.5/5
- [ ] **Visualisierung überzeugt:** 80% der Kunden nutzen Demo-Animation
- [ ] **Performance:** Keine Regression (< 2s Ladezeit)
- [ ] **Accessibility:** WCAG 2.1 AA bleibt 100%

---

## 🎯 Nächste Schritte

1. ✅ **Roadmap konsolidieren** (diese Analyse)
2. ⏳ **v1.5.2 abschließen** (1 Woche, Januar 2026)
3. ⏳ **v1.6.0 starten** (Schutzschild Level 1, Januar 2026)
4. ⏳ **Wöchentliche Reviews** (Fortschritt tracken)

---

**Zusammenfassung:**
Die Roadmap ist solide, aber die Versionsnummern müssen neu strukturiert werden. **v1.6.0 (UX-Polish) hat höchste Priorität** und sollte sofort nach Abschluss der offenen v1.5.0-Tasks gestartet werden.

**Empfehlung:** ✅ **Start mit v1.5.2 (Cleanup) → dann v1.6.0 (Schutzschild)**

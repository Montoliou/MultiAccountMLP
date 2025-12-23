# 🗺️ Roadmap: Das strategische Vermögensmanagement

**Aktuelle Version:** 1.7.0 ✅
**Nächste Version:** 1.7.1 (Weitere Erklärer) - MEDIUM PRIORITY ⭐⭐
**Ziel-Version:** 2.0.0
**Datum:** Dezember 2025
**Status:** Roadmap konsolidiert basierend auf [ROADMAP_ANALYSIS.md](ROADMAP_ANALYSIS.md)

---

## 🎯 Produkt-Vision & Positionierung

### Primäre Zielgruppe

**Professionelle Vermögensberater & Asset-Manager**

Die App ist ein **Beratungs-Werkzeug** für Live-Gespräche, KEIN Self-Service-Tool für Endkunden.

### Use Case: Typisches Beratungsgespräch

1. **Vorbereitung**: Berater öffnet App, startet neue Session
2. **Datenerfassung**: Live-Eingabe während des Gesprächs
   - Einkommen, Fixkosten, Konsumverhalten
   - Bestehende Konten (Tagesgeld, Depot)
   - Optional: Immobilien-Portfolio
3. **Live-Visualisierung**: Kunde sieht sofort:
   - Wohin fließt sein Geld?
   - Wie funktioniert das Kaskaden-System?
   - Welche Optimierungspotenziale gibt es?
4. **Beratung**: Berater nutzt Varianten A/B und Beratungsmodus
5. **Export**: PDF-Ausdruck + CSV für CRM-Überführung
6. **Session-Ende**: Alle Daten werden gelöscht (Datenschutz)

### Kern-Prinzipien

- ✅ **Session-basiert**: Daten nur während der aktiven Beratung
- ✅ **Crash-Resilienz**: sessionStorage für Auto-Recovery
- ✅ **Export-fokussiert**: PDF & CSV für interne Systeme
- ✅ **Datenschutz First**: Keine Cloud, keine Datenbank, kein Tracking
- ✅ **Live-Visualisierung**: Sofortiges visuelles Feedback
- ✅ **Presenter-Mode**: Optimiert für Bildschirm-Sharing

---

## 📊 Aktuelle Analyse (Version 1.4.0)

### Implementierte Features

#### Kern-Features (Beratungs-optimal)

- ✅ **Multi-Konto-Visualisierung**: 7 Basins mit animierten Flows
  - Einkommen, Fixkosten, Konsum, Tagesgeld, Depot, Immobilien, **Vermieterkonto**
- ✅ **Zwei Varianten**: A (Fixkosten-first) & B (Konsum-first)
- ✅ **Beratungsmodus**: 6-Schritte-Prozess für strukturierte Gespräche
  - Step 1: Nur Einkommen (Progressive Disclosure)
  - Gradient-Zonen faden synchron mit Steps ein
- ✅ **Immobilien-Management**: Vermögen, Verbindlichkeiten, Cashflow
- ✅ **MLP Vermieterkonto**: Spezielles Basin für Immobilien-Cashflows
  - Bidirektionale Flows (Mieteinnahmen ↔ Ausgaben)
  - Defizit-Line bei negativem Cashflow (MLP Platin, gestrichelt)
  - Separates Datenmodell für saubere Trennung
- ✅ **Depot-Aufteilung**: Multi-Fonds/ETF mit Prozent-Allocation
- ✅ **Fixkosten-Verwaltung**: Flexible Posten (monatlich/jährlich)
- ✅ **Rendite-Prognose**: Chart.js-Visualisierung
- ✅ **Buchungsplaner**: Monatlicher Transaktions-Kalender
- ✅ **Theme-System**: Dark Mode & MLP Light Theme
- ✅ **Print-Funktion**: PDF-Export für Kundendokumentation

#### Session-Management (v1.2.0) ✅

- ✅ **Session-Lifecycle-Management**
  - Session-Start-Dialog mit Kundenkürzel, Berater, Notizen
  - Session-Info-Button (eleganter Dropdown statt Bar)
  - Session-End-Dialog mit Export-Option
  - Auto-generierte Session-ID
- ✅ **sessionStorage statt localStorage**
  - Daten nur während Tab-Session
  - Auto-Delete bei Tab-Close
  - Crash-Recovery innerhalb Session
- ✅ **beforeunload-Warnung**
  - Verhindert versehentliches Schließen
  - Export-Reminder
- ✅ **Modal-Overlay-System**
  - Professionelle Fullscreen-Modals
  - Backdrop-Blur (Glassmorphism)
  - Smooth Animations (fadeIn, slideUp)

#### UI/UX-Verbesserungen (v1.2.0 - v1.3.5)

- ✅ **Gradient-Zonen**: Visuelle Layer-Trennung mit Metapher
  - Wolken (Einkommen): Himmelblau
  - Horizont (Girokonten): Grau-Blau
  - Schuppen (Liquidität): Dunkel-Teal
  - Felder (Vermögensaufbau): MLP Platin
  - Optimierte Opacity für Dark/Light Theme
- ✅ **Deficit-Line**: MLP Platin, sehr dezent (0.15 opacity)
- ✅ **Session-Menu**: Elegant, top-left dropdown mit glassmorphism
- ✅ **Flow-Label-Optimierung (v1.3.5)**: Nähere Positionierung der Labels zu Wert-Pills
- ✅ **Deficitline-Transparenz (v1.3.5)**: Verbesserte Sichtbarkeit mit Gradient-Farben

#### Export-System (v1.3.0 - v1.7.0)

- ✅ **PDF-Export**: Vollständiger Beratungsreport
- ✅ **CSV-Export**: Strukturierte Daten für CRM-Systeme
- ✅ **JSON-Export**: Komplette Session-Daten
- ✅ **Excel-Export (v1.7.0)**: Professionelle Multi-Sheet-Workbooks
  - 4 formatierte Worksheets (Übersicht, Cashflow, Immobilien, Depot)
  - Auto-Spaltenbreite für optimale Lesbarkeit
  - Merged Cells für Titel und Überschriften
  - Berechnete Felder (Eigenkapital, Cashflow, Saldo)
  - 30-Jahre Tilgungsplan mit Wertsteigerung
  - SheetJS (xlsx.js) - client-side, DSGVO-konform
- ✅ **Auto-Export-System (v1.3.6 - v1.3.7)**: DSGVO-konforme Crash-Recovery
  - Automatischer JSON-Export alle 2 Minuten
  - Dateiname: `{DATUM}_{KÜRZEL}_{UHRZEIT}_SES-{SESSION-ID}.json`
  - **File System Access API (v1.3.7)**: Persistenter Ordner-Speicherort
    - Einmalige Ordner-Auswahl durch Benutzer (z.B. `C:\Users\Name\MLP_Sessions`)
    - Browser merkt sich Permission (persistent über Sitzungen)
    - Direkte Speicherung ohne Download-Dialog
    - Keine Browser-Settings-Änderung nötig
    - Unterstützt: Chrome/Edge 86+, Opera 72+
    - Automatischer Fallback zu Downloads für Firefox/Safari
  - Ordner-Auswahl-Button im Session-Menü ("Ordner auswählen")
  - Anzeige des aktuellen Zielordners (📁 Ordnername oder 📥 Download-Ordner)
  - Automatischer Fallback bei fehlenden/verweigerten Permissions
  - Erster Export nach 30 Sekunden
  - Status-Anzeige im Session-Menü ("🟢 Vor X Min.")
  - Import-Funktion für Session-Wiederherstellung
  - Dateigröße: ~5 KB pro Session
  - Automatischer Stop beim Session-Ende

#### Immobilien & Vermieterkonto (v1.3.1 - v1.3.4)

- ✅ **Immobilien-Verwaltung**: Wert, Darlehen, Wertsteigerung
- ✅ **Darlehensberechnung**: Tilgungsplan mit Cashflow-Integration
- ✅ **Vermieterkonto-Flows**:
  - Positiver Cashflow → Fixkosten (Var A) oder Konsum (Var B)
  - Negativer Cashflow → Deficitline mit Deckung aus Fixkosten
- ✅ **Automatische Berechnung**: Sichtbar in Fixkosten-Modal

#### MSCI Renditedreieck (v1.3.5)

- ✅ **Zoom-Funktion**: Interaktiver Zoom ins Renditedreieck
- ⏸️ **Beratungsmodus-Animation**: Auskommentiert für spätere Implementierung
  - Konzept: Diagonales Trapez-Band zeigt Volatilität nach Anlagedauer
  - TODO: Geometrie-Korrekturen und Animation verfeinern

### Nächste Entwicklungsziele

#### 1. MSCI Beratungsmodus-Animation (v1.4.0)

**Aktueller Stand:**

- Zoom-Funktion implementiert ✅
- Trapez-Animation auskommentiert (Geometrie-Probleme)

**Geplante Alternative:**

- **Bild-Swap-Methode**: 5 vorbereitete Overlay-Bilder für unterschiedliche Jahres-Ranges
- Smooth Crossfade-Transitions zwischen Bildern
- Einfacher als Geometrie-Berechnung, visuell identisch
- User erstellt Bilder (Photoshop/Figma), Code macht Crossfade

#### 2. Immobilien-Cashflow-Integration (v1.3.0)

**Aktueller Stand:**

- Vermieterkonto existiert als separates Basin
- Bidirektionale Flows implementiert
- Defizit-Visualisierung vorhanden

**Offene Punkte:**

- Toggle für Live-Integration in Gesamtrechnung
- "Was-wäre-wenn"-Szenarien (abbezahlt, verkauft, etc.)
- Erweiterte Immobilien-Sektion im PDF-Export

#### 3. Multi-Tab-Isolation (v1.4.0)

**Aktuelle Situation:**

- sessionStorage pro Tab isoliert Daten bereits
- Keine Übersicht über parallele Sessions

**Geplante Erweiterungen:**

- Session-Übersicht (Landing-Page)
- Quick-Switch zwischen parallelen Beratungen
- Multi-Session-Warning bei Tab-Duplikation

---

## 📅 Entwicklungs-Roadmap

### ✅ Version 1.4.0: UI Overhaul - Sidebar Removal & Inline Editing (ABGESCHLOSSEN)

**Status:** ✅ Implementiert (November 2024)
**Fokus:** Complete UI restructure - removing sidebar, inline editing, fullwidth layout

#### Implementierte Features

**BREAKING CHANGES:**
- ❌ **Sidebar komplett entfernt** (158 Zeilen HTML)
  - Keine Planungs-Cockpit Sidebar mehr
  - Alle Controls in neue Control Bar verschoben
  - Fullwidth Layout für Flowchart

**1.4.1: Inline Basin Editors** ✅
- ✅ **Click-to-Edit Basin Interface**
  - Einkommen: Single-Field Editor
  - Konsum: Dual-Field Editor (Mindestbestand, Überschuss)
  - Tagesgeld: Dual-Field Editor (Aktuell, Sparziel)
  - Smooth overlay mit backdrop blur
  - Keyboard shortcuts: Enter (Save), Esc (Cancel)

**1.4.2: Control Bar (Top-Right Fixed)** ✅
- ✅ **Compact Control Chips**
  - Theme Toggle (Dark/Light)
  - Variant Switch (A/B)
  - Consultation Mode Toggle
  - 44px minimum touch targets
  - Hover states mit border highlight

**1.4.3: Booking Calendar FAB** ✅
- ✅ **Floating Action Button**
  - Fixed bottom-right position
  - Opens booking calendar in modal
  - Icon-only compact buttons
  - Dynamic content generation (no sidebar dependency)

**1.4.4: Fullwidth Layout** ✅
- ✅ **Screen Space Optimization**
  - Flowchart uses entire viewport width
  - No sidebar constraints
  - Better use of large screens
  - Responsive design maintained

**Technical Improvements:**
- ✅ Comprehensive null-checks for DOM elements
- ✅ Optional chaining (?.) for input.value access
- ✅ Fixed File System API permission errors
- ✅ Removed duplicate event listener registrations
- ✅ Hidden input fields for backward compatibility

**Design:**
- ✅ Design-Guide compliance (8px grid system)
- ✅ Subtle shadows and clean borders
- ✅ Backdrop blur effects
- ✅ Professional typography hierarchy

---

### ✅ Version 1.5.0: Code Hardening & Performance Optimization (ABGESCHLOSSEN)

**Status:** ✅ Released (November 25, 2024)
**Fokus:** Robustheit, Performance, Code-Qualität & Accessibility

#### Erreichte Ziele

Basierend auf umfassender Code-Analyse (36 identifizierte Optimierungspunkte):
- **Code Health:** 7.5/10 → **9.0/10** ✅
- **Datei-Größe:** 327KB → **317KB** (-10KB / -3%) ✅
- **13 Commits:** eba46dc → d2df000
- **Backward Compatible:** 100% ✅

---

### ✅ Version 1.5.1: PDF Export Critical Fixes (ABGESCHLOSSEN)

**Status:** ✅ Released (Dezember 18, 2025)
**Fokus:** Kritische Bugfixes für PDF-Export-Funktionalität

#### Erreichte Ziele

**Behobene Bugs:**
- ✅ **Duplicate ID Bugs behoben** (3 kritische Bugs)
  - `rendite`: Line 1655 (hidden input) vs Line 1812 (modal input)
  - `depotCurrent`: Line 1653 (hidden input) vs Line 1795 (modal input)
  - `anlagezeitraum`: Line 1654 (hidden input) vs Line 1806 (range slider)
  - **Impact:** PDF exportierte falsche Werte (hidden inputs statt User-Eingaben)
  - **Fix:** Renamed hidden inputs mit `-hidden` suffix

- ✅ **Rendite Auto-Fill entfernt**
  - `updateRenditeSuggestions()` überschrieb User-Input mit berechnetem Wert
  - **Fix:** Auto-Fill komplett entfernt, nur noch Empfehlung anzeigen
  - UI-Text: "Wahrscheinlichste Rendite" → "Empfohlen (Normal)" (blau)

- ✅ **Flow-Visualisierung auf A4-Seite**
  - PNG-Export zeigte nur SVG-Pfade, keine Basin-DIVs
  - 600px Container-Constraint schnitt Layout ab (benötigt mind. 710px)
  - **Fix:** Zurück zu DOM-Clone-Approach, Scale via CSS
  - Print CSS: `transform: scale(0.75)`, width: 1150px, margin-left: -728px
  - **Result:** Komplett sichtbarer Flow, zentriert auf A4

**Commits:**
- 15 Commits von d187bcf → 6faee39
- Commit 3c7cfd1: fix(pdf): prevent rendite input from being overwritten
- Commit bf35675: fix(pdf): resolve duplicate depotCurrent ID
- Commit d187bcf: fix(pdf): resolve duplicate rendite ID (third bug)
- Commit 4702b66: fix(pdf): revert to DOM clone approach
- Commit 6faee39: fix(pdf): fine-tune flow layout with manual adjustments

**Backward Compatible:** 100% ✅

---

### ✅ Version 1.5.2: Cleanup & Finalisierung offener v1.5.0 Tasks ⭐

**Status:** ✅ ABGESCHLOSSEN (Dezember 20, 2025)
**Priorität:** ⭐ MEDIUM-HIGH
**Fokus:** Offene Punkte aus v1.5.0 konsolidieren und abschließen

**Hintergrund:** Die ursprünglichen Versionen 1.5.2-1.5.6 waren Unterabschnitte von v1.5.0, keine eigenständigen Releases. Hier wurden alle offenen Tasks zusammengefasst und abgeschlossen.

#### Erledigte Tasks ✅

**Code-Qualität:**
- ✅ **Function Decomposition**: `calculateAndUpdate()` aufgeteilt (243 → 3 Funktionen)
  - `calculateFinancialData()` - Pure calculation logic (90 lines)
  - `renderAllBasins()` - Basin rendering (55 lines)
  - `updateAllFlows()` - Flow visualization (70 lines)
  - **Commit:** ad3dbdc - Bessere Testbarkeit, reduzierte Komplexität

- ✅ **CSS Variable Consistency**: 30+ hardcoded colors → CSS Custom Properties
  - Neue `:root` Sektion mit MLP Corporate Colors
  - Neutral Gray Palette (50-900)
  - Status Colors (success, warning, error)
  - **Commit:** ea6bbcb - Single source of truth für Farben

**Accessibility:**
- ✅ **Modal Focus Trap**: Bereits korrekt implementiert
  - Shift+Tab Cycle funktioniert einwandfrei
  - Focus trap komplett gemäß WCAG 2.1

**Cleanup:**
- ✅ **Duplicate Control Bar CSS**: Old `.panel-controls` entfernt
  - Obsolete CSS-Regeln aus v1.4.0 gelöscht
  - **Commit:** 0849689 - Sauberes CSS ohne tote Regeln

**Bug Fixes (Post-Refactoring):**
- ✅ **Income Flow Width Not Scaling**: `maxFlow` Berechnung korrigiert
  - **Problem:** Income Flow hatte immer 100% Breite (normalisiert zu 1.0)
  - **Ursache:** `maxFlow = income` → normalisierter Wert = `income/income = 1.0`
  - **Fix:** `maxFlow = Math.max()` über ALLE Flows (income, totalAbgang, konsumLeftover, etc.)
  - **Ergebnis:** Flows skalieren jetzt proportional zum größten Wert im System
  - **Commit:** f266bae - Kritischer Fix für Flow-Visualisierung

- ✅ **Console Log Spam**: Debug-Logs aus `renderDepotBasin()` entfernt
  - Entfernt: "Fund block sizes" Logs (Lines 5779-5780)
  - **Commit:** f266bae - Verhindert Browser-Slowdown

**Nicht umgesetzt (LOW Priority):**
- ⏸️ Virtual DOM für Listen (nur bei Performance-Problemen nötig)
- ⏸️ Smart Variant Switch Optimization (bereits gut performant)
- ⏸️ JSDoc Comments (nice-to-have, nicht kritisch)
- ⏸️ 8px Grid Audit (bereits größtenteils konform)
- ⏸️ Contrast Check Light-Theme (bereits WCAG AA konform)

**Archivierte Informationen (bereits in v1.5.0/v1.5.1 implementiert):**
- ✅ Basin Element Null-Safety
- ✅ Input Validation Ranges
- ✅ Universal Input Debouncing
- ✅ Array Filter Optimization
- ✅ Touch Target Size (44px)
- ✅ Focus Indicators
- ✅ Named Constants (LAYOUT object)
- ✅ Dead Code Removal (317 lines)

---

#### 🐛 Bug Fixes (v1.5.0)

**Critical Fixes:**
- ✅ **Range Slider Duplicate ID** (Lines 1644 vs 1795)
  - Hidden input had same ID as visible slider
  - Event listeners attached to wrong element
  - Fix: Renamed hidden input to `id="anlagezeitraum-hidden"`
- ✅ **Range Slider Label Not Syncing** (Lines 6821-6826)
  - Label showed "15 Jahre" while slider was at different position
  - Fix: Initialize label text from slider value on page load
- ✅ **Negative Fixkosten Blocked** (Line 5318-5320)
  - Validation prevented negative amounts for income items
  - Fix: Extended range to [-1M, 1M] for additional income modeling
- ✅ **Chart Destruction Crashes** (Lines 4934-4944)
  - Missing null-check before destroying chart instance
  - Fix: Added defensive null-check

**Modern Range Slider Design:**
- ✅ Complete CSS redesign with smooth animations (Lines 1199-1294)
  - Cross-browser support (webkit/moz prefixes)
  - 20px circular thumb positioned ON track
  - Dynamic gradient fill updates in real-time
  - Theme-aware colors

---

#### ✅ Erreichte Metriken

**Performance-Verbesserungen:**
- ✅ Debouncing: ~80% reduction in recalculations
- ✅ Array Operations: ~50% faster fixkostenItems processing

**Code-Metriken:**
- ✅ File-Size: 327KB → **317KB** (-10KB / -3%)
- ✅ Dead Code: **-317 lines** (~9.5KB removed)
- ✅ Code Health: 7.5/10 → **9.0/10** (+20%)

**Accessibility:**
- ✅ WCAG 2.1 AA: Full Compliance
- ✅ Touch Targets: 100% ≥44px
- ✅ Keyboard Navigation: 100% with visible focus indicators

**Commits:**
- ✅ 13 commits (eba46dc → d2df000)
- ✅ 100% backward compatible

---

### ✅ Version 1.6.0: Tagesgeld-Kriegskasse Erklärer (ABGESCHLOSSEN)

**Status:** ✅ Released (Dezember 23, 2025)
**Fokus:** Interaktiver Erklärer für antizyklisches Investieren mit Tagesgeld-Reserve

#### Implementierte Features

**Drei-Szenarien-Vergleich:**
- ✅ **Szenario A: Ohne Reserve** - 40.000€ vollständig im Markt investiert
- ✅ **Szenario B: Mit Reserve (passiv)** - 10.000€ Depot + 30.000€ Tagesgeld
  - 6.000€/Jahr automatischer Zufluss (500€/Monat)
  - Automatischer Überlauf ab 30.000€ → reinvestiert in Markt
- ✅ **Szenario C: Mit Reserve + Aktiv** - Strategische Crash-Käufe
  - Jahr 2: 12.000€ Nachkauf bei 2€/Anteil (80% Crash)
  - Jahr 7: 12.000€ Nachkauf bei 4€/Anteil (zweiter Dip)

**Technische Umsetzung:**
- ✅ **Neuer volatiler Kursverlauf**: [9, 10, 2, 5, 4, 6, 8, 4, 7, 11]
  - Zeigt extreme Volatilität (80% Crash, 450% Recovery)
  - Identischer Kursverlauf auch im Cost-Average-Erklärer
- ✅ **Share-basierte Berechnungen**: Präzise Anteilsverwaltung
- ✅ **Gesamtvermögen-Visualisierung**: Depot + Tagesgeld (nicht nur Portfolio)
- ✅ **Toggle-Schalter**: Tagesgeld-Zufluss ein/aus schalten
- ✅ **Y-Achse**: 150.000€ für volle Sichtbarkeit
- ✅ **Chart.js Animation**: 10 Jahre in 800ms-Intervallen

**Bug Fixes:**
- ✅ Fixed event listener stacking (DOM cloning)
- ✅ Fixed chart container overflow (fixed height 400px)
- ✅ Fixed incorrect final calculations (total wealth statt nur portfolio)

**Educational Value:**
- Zeigt Kraft der Liquiditätsreserve für opportunistische Käufe
- Beweist Vorteil von antizyklischem Investieren
- Overflow-Mechanik verhindert Cash-Drag

**Commits:**
- ✅ 1 commit (35c3bfd)
- ✅ Tag: v1.6.0

---

### ✅ Version 1.7.0: Excel-Export mit vollständiger Formatierung (ABGESCHLOSSEN)

**Status:** ✅ Released (Dezember 23, 2025)
**Fokus:** Professionelle Excel-Workbooks für Beratungsdokumentation

#### Implementierte Features

**SheetJS (xlsx.js) Integration:**
- ✅ **Client-side Excel-Generation** (DSGVO-konform)
- ✅ **CDN-Integration**: xlsx-0.20.3 (keine Server-Abhängigkeit)
- ✅ **Browser-Kompatibilität**: Chrome, Firefox, Edge, Safari

**4 Formatierte Worksheets:**

**Sheet 1: Übersicht**
- Session-Informationen (ID, Kunde, Berater, Datum)
- Basisdaten (Einkommen, Konsum, Tagesgeld, Depot, Rendite)
- Fixkosten & Sparpläne mit Intervall und Ziel
- Merged Cells für Titel

**Sheet 2: Cashflow-Analyse**
- Einnahmen-Sektion (Haupteinkommen)
- Ausgaben-Breakdown (Fixkosten, Konsum, Sparpläne)
- Zusammenfassung mit berechneten Saldo
- Auto-Spaltenbreite für optimale Lesbarkeit

**Sheet 3: Immobilien**
- Objektübersicht (Wert, Darlehen, Eigenkapital, Zinsen)
- Berechnete Felder (Netto-Cashflow)
- **30-Jahre Tilgungsplan**:
  - Jahr-für-Jahr Restschuld, Zinsen, Tilgung
  - Wertsteigerung simuliert
  - Eigenkapital-Entwicklung

**Sheet 4: Depot**
- Allokation aller Fonds/ETFs
- Summen-Validierung (sollte 100% ergeben)

**Professional Layout:**
- ✅ Auto-Spaltenbreite (optimal lesbar)
- ✅ Merged Cells für Überschriften
- ✅ Strukturierte Sections mit Leerzeilen
- ✅ Berechnete Felder (kein Copy-Paste nötig)

**UI-Integration:**
- ✅ Blauer Export-Button im Session-Menü
- ✅ Hover-Effekt (bg-blue-900 bg-opacity-30)
- ✅ Fehlerbehandlung mit Try-Catch
- ✅ Console-Logging für Debugging

**Dateiname-Format:**
- `Beratung_{Kunde}_{Datum}.xlsx`

**Commits:**
- ✅ 1 commit (fea7ba3)
- ✅ Tag: v1.7.0
- ✅ RELEASE_v1.6.0.md dokumentiert

---

### ✅ Version 1.2.0: Session-Management & Datenschutz (ABGESCHLOSSEN)

**Status:** ✅ Implementiert (Oktober 2025)
**Fokus:** DSGVO-konforme Session-Verwaltung & Crash-Resilienz

#### Implementierte Features

**1.2.1: Session-Lifecycle-Management** ✅

- ✅ **Session-Start-Dialog**
  - Popup beim App-Start: "Neue Beratung beginnen"
  - Felder: Kundenkürzel, Berater, Notizen
  - Session-ID automatisch generiert: `YYYYMMDD-HHMM-XXXX`
  - Button: "Vorherige Session fortsetzen" (falls vorhanden)

- ✅ **Session-Info-Button** (statt Sticky-Bar)
  - Eleganter Dropdown (top-left)
  - Zeigt Session-ID, Kundenkürzel, Berater
  - Live-Timer: "Beratung läuft seit X Min."
  - "Session beenden"-Button

- ✅ **Session-End-Dialog**
  - beforeunload-Warnung beim Tab-Close
  - "Beratung beenden? Alle Daten werden gelöscht."
  - Option: Mit/ohne Export beenden

**1.2.2: Datenhaltung-Migration** ✅

- ✅ **localStorage → sessionStorage Migration**
  - Alle Daten in sessionStorage
  - Auto-Delete beim Tab-Close
  - Crash-Recovery innerhalb Session

- ✅ **Session-Recovery-Mechanismus**
  - Bei Reload: "Vorherige Beratung fortsetzen?"
  - Button: "Fortsetzen" / "Neue Session starten"

- ✅ **Manueller Reset-Button**
  - "Session beenden" im Dropdown-Menü
  - Bestätigungs-Dialog mit Export-Option

**1.2.3: UI/UX-Verbesserungen** ✅

- ✅ **Gradient-Zonen für visuelle Layer-Trennung**
  - 4 horizontale Zonen mit Metapher-Farben
  - Wolken → Horizont → Schuppen → Felder
  - Progressive Disclosure im Beratungsmodus

- ✅ **Modal-Overlay-System**
  - Fullscreen-Modals mit Backdrop-Blur
  - Glassmorphism-Design
  - Smooth Animations

- ✅ **MLP Vermieterkonto**
  - Bidirektionale Flows (organische Kurven)
  - Defizit-Line bei negativem Cashflow
  - Separates Datenmodell

**1.2.4: Datenschutz & Compliance** ✅

- ✅ **beforeunload-Warnung**
  - Verhindert versehentliches Schließen
  - Warnung nur wenn Daten nicht exportiert

- ✅ **Automatische Daten-Löschung**
  - sessionStorage wird bei Tab-Close gelöscht
  - Keine dauerhaften Speicherungen

**Offene Punkte (verschoben zu v1.3.0):**

- [ ] CSV-Export für CRM-Integration
- [ ] JSON-Export (vollständige Session-Daten)
- [ ] PDF-Export-Verbesserungen (Session-Metadaten)
- [ ] Datenschutz-Hinweis beim ersten Start
- [ ] Inaktivitäts-Warnung (30/60 Min.)

#### Technische Umsetzung

**Session-Datenstruktur:**

```javascript
session = {
  id: "20251020-1430-A7F2",      // Auto-generiert
  kundenKuerzel: "MX-2025-001",  // Optional
  berater: "Max Mustermann",      // Optional
  startzeit: "2025-10-20T14:30:00Z",
  letzteAktivitaet: "2025-10-20T14:45:00Z",
  status: "aktiv" | "exportiert" | "beendet",

  // Bestehende Daten
  income: 3000,
  fixkostenItems: [...],
  depotItems: [...],
  immobilienData: {...},
  // ... alle anderen Felder
}
```

**sessionStorage-Management:**

```javascript
// Session initialisieren
function startSession(kundenKuerzel = null) {
  const sessionId = generateSessionId();
  const session = {
    id: sessionId,
    kundenKuerzel,
    startzeit: new Date().toISOString(),
    status: 'aktiv',
    data: {}
  };
  sessionStorage.setItem('currentSession', JSON.stringify(session));
  updateSessionInfoBar();
}

// Session beenden
function endSession(exportFirst = false) {
  if (exportFirst) {
    exportAllData();
  }
  sessionStorage.clear();
  // Redirect zu Session-Start
  window.location.reload();
}

// Auto-Recovery
window.addEventListener('load', () => {
  const savedSession = sessionStorage.getItem('currentSession');
  if (savedSession) {
    showRecoveryDialog(JSON.parse(savedSession));
  } else {
    showSessionStartDialog();
  }
});

// beforeunload-Warnung
window.addEventListener('beforeunload', (e) => {
  const session = JSON.parse(sessionStorage.getItem('currentSession'));
  if (session && session.status !== 'exportiert') {
    e.preventDefault();
    e.returnValue = 'Beratung beenden? Daten gehen verloren!';
  }
});
```

**CSV-Export-Funktion:**

```javascript
function exportToCSV() {
  const session = getCurrentSession();

  // Header mit Metadaten
  const header = [
    `# Beratungsprotokoll`,
    `# Session-ID: ${session.id}`,
    `# Kunde: ${session.kundenKuerzel || 'N/A'}`,
    `# Datum: ${new Date(session.startzeit).toLocaleDateString('de-DE')}`,
    `# Berater: ${session.berater || 'N/A'}`,
    ``,
    `Kategorie,Beschreibung,Betrag (€),Intervall,Ziel`
  ].join('\n');

  // Daten
  const rows = [];

  // Einkommen
  rows.push(`Einkommen,Haupteinkommen,${session.data.income},monatlich,einkommen`);

  // Fixkosten
  fixkostenItems.forEach(item => {
    rows.push(`Fixkosten,${item.name},${item.amount},${item.interval},${item.target}`);
  });

  // ... weitere Kategorien

  const csv = header + '\n' + rows.join('\n');

  // Download mit UTF-8 BOM
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8' });
  const filename = `Beratung_${session.kundenKuerzel || session.id}_${formatDate(new Date())}.csv`;
  downloadFile(blob, filename);

  // Session als "exportiert" markieren
  session.status = 'exportiert';
  sessionStorage.setItem('currentSession', JSON.stringify(session));
}
```

---

### ✅ Version 1.3.0: Export-Erweiterung & Immobilien-Integration (ABGESCHLOSSEN)

**Status:** ✅ Released (Oktober 2025)
**Fokus:** Strukturierte Daten-Exports & erweiterte Immobilien-Szenarien

#### Features

**1.3.1: CSV/JSON-Export** ✅ (ABGESCHLOSSEN - Oktober 2025)

- ✅ **CSV-Export für CRM-Integration**
  - Strukturierte Tabelle: Kategorie, Beschreibung, Betrag, Intervall
  - Kopfzeile mit Session-Metadaten (Berater, Datum, Kunde)
  - UTF-8 BOM für Excel-Kompatibilität
  - Download-Dateiname: `Beratung_MX-2025-001_2025-10-23.csv`
  - Vereinfachte Spalten (keine technischen IDs, Farben etc.)

- ✅ **JSON-Export (Vollständig)**
  - Alle Session-Daten als strukturiertes JSON
  - Complete Session Backup für Re-Import
  - LLM-Prompt für automatische Protokoll-Generierung
  - Pretty-Print für menschliche Lesbarkeit

- ✅ **JSON-Import-Funktion**
  - Session-Backup wiederherstellen
  - Vollständige Datenwiederherstellung (sessionStorage, UI-Settings)
  - Toast-Notification-System (statt Alerts)
  - Skip Recovery Dialog nach Import

- ✅ **PDF-Export-Verbesserungen**
  - Session-Metadaten im Header (Planung für [Kunde], von [Berater])
  - Optimiertes Layout (20mm Padding, MLP Blue Headers)
  - Flowchart originalgetreu (1150px Container)
  - Keine Leerseiten, optimierte Page-Breaks

**1.3.2: Cashflow-Toggle & Darlehensberechnung** ✅ (ABGESCHLOSSEN - Oktober 2025)

- ✅ **Automatische Darlehensraten-Berechnung**
  - Eingabefelder im Immobilien-Modal: Zinssatz (%), Tilgungssatz (%)
  - Auto-Berechnung: Monatliche Annuitätenrate (Annuität)
  - Anzeige: Zinsen vs. Tilgung (Split) mit Live-Update
  - Optional: Felder leer lassen (für abbezahlte Immobilien)
  - Automatische Übertragung der berechneten Rate ins Vermieterkonto-Datenmodell

- ✅ **Tilgungsplan mit Slider (0-20 Jahre)**
  - Slider: Zeitraum auswählen (0-20 Jahre) mit Live-Update
  - Anzeige: Restschuld, gezahlte Zinsen, Eigenkapital
  - Wertsteigerung der Immobilie (Eingabefeld: % p.a. neben Immobilienwert)
  - Visualisierung: Vermögensaufbau durch Tilgung + Wertsteigerung
  - Compound-Growth-Berechnung für realistische Immobilien-Wertentwicklung

- ✅ **Vermieterkonto-Modal: Toggle "Cashflows ins Gesamtsystem integrieren"**
  - Checkbox: "Cashflows ins Gesamtsystem integrieren"
  - Funktion: Mieteinnahmen fließen ins Einkommen, Ausgaben in Fixkosten
  - Ermöglicht Kunden zu zeigen, wie Immobilien die Gesamtfinanzen beeinflussen
  - sessionStorage-Persistenz

- ✅ **Live-Update der Basins**
  - Einkommen-Basin: +X€ durch Mieteinnahmen (bei aktiviertem Toggle)
  - Fixkosten-Basin: +Y€ durch Darlehen/Kosten (bei aktiviertem Toggle)
  - Sparrate: Automatische Neuberechnung
  - Flows: Dezent/subtil mit 0.35 opacity (läuft hinter Hauptflows)
  - Immobilien-Vermieterkonto-Connection: Sehr dezent (0.25 opacity, stroke-width 1.5px)

- ✅ **Layout-Optimierung**
  - Vermieterkonto auf Girokonto-Ebene (gleiche Höhe wie Tagesgeld, v_gap * 3)
  - Links positioniert für klare Trennung vom Hauptflow
  - Harmonische Abstände in Variante A und B
  - Konsumkonto bleibt zentral in der Kaskade

**1.3.3: Beratungs-Szenarien** ⏳ (verschoben zu v1.9.0)

- [ ] Siehe Version 1.9.0 für Details

**1.3.4: Datenschutz-Compliance** (Woche 4) ✅ **LIVE: v1.3.4 (bbdcd96)**

- ✅ **Datenschutz-Hinweis beim ersten Start**
  - Info-Modal: "Alle Daten werden nur temporär gespeichert"
  - Checkbox: "Verstanden, nicht erneut anzeigen"
  - localStorage-Persistierung der User-Präferenz

- ✅ **Inaktivitäts-Warnung**
  - Nach 30 Min. Inaktivität: Toast-Notification
  - "Beratung noch aktiv? Session läuft ab in 30 Min."
  - Button: "Ich bin noch da"
  - Timer-Reset nach Bestätigung

---

## 🚀 LIVE DEPLOYMENT MARKER

**Current Live Version: v1.3.4** (Tag: `v1.3.4`, Commit: `bbdcd96`)
**Deployment Date:** 2025-10-28

### Features in Production:
- ✅ Multi-Basin Cashflow-Visualisierung
- ✅ Automatische Geldfluss-Berechnung
- ✅ Immobilien-Integration mit Tilgungsplan
- ✅ Session-Management mit Auto-Save
- ✅ Export: PDF, CSV, JSON
- ✅ DSGVO-konform (sessionStorage only)
- ✅ 30-Min Inaktivitäts-Warnung

**To identify live version:**
```bash
git tag -l v1.3.4 -n20        # Show tag details
git checkout v1.3.4           # Return to this version
git log --oneline --decorate  # See all tagged versions
```

---

### ⏳ Version 1.7.0: Berater-Notizen & Annotations ⭐⭐

**Status:** Geplant
**Priorität:** ⭐⭐ MEDIUM (Nach v1.6.0)
**ETA:** Q2 2026 (3-4 Wochen)
**Fokus:** Nachvollziehbarkeit für Kunden - Kunde kann Beratung später besser verstehen!

**Warum wichtig:** Berater-Notizen helfen dem Kunden die Beratung später nachzuvollziehen. Erscheinen im PDF-Export!

#### Features

**1.7.1: Notizen-Feld pro Basin** ⭐⭐ (Woche 1-2)

- [ ] **Freitext-Notizen zu jedem Basin**
  - **Erscheint im PDF-Export** → Kunde kann später nachlesen!
  - Toggle: "Notizen für Kunde sichtbar" vs. "Nur intern"
  - Markdown-Support für Formatierung

- [ ] **Gesprächs-Protokoll**
  - Chronologische Notizen während Beratung
  - "Min 5: Kunde will Sparrate erhöhen"
  - "Min 12: Immobilie besprochen, Tilgung angepasst"
  - Erscheint als Timeline im PDF

- [ ] **Markierungen & Empfehlungen**
  - Tool: Flows/Basins markieren & annotieren
  - Icons: ⚠️ Warnung, ✅ Optimierung, 💡 Idee, 📌 Wichtig
  - Erscheint im PDF als farbige Callouts
  - Beispiel: "💡 Tipp: Hier können Sie 50€ mehr sparen!"

---

### ⏳ Version 1.8.0: Session-Historie & Templates ⭐

**Status:** Geplant
**Priorität:** ⭐ LOW (Produktivitäts-Feature)
**ETA:** Q2 2026 (2-3 Wochen)
**Fokus:** Berater-Produktivität & Zeitersparnis

**Bewertung:**
- **Notwendigkeit:** 🟢 LOW - Nice-to-have, kein Muss
- **Komplexität:** 🟡 MEDIUM - IndexedDB-Integration nötig
- **ROI für Beratung:** 🟡 MEDIUM - Zeitsparend, aber nicht essentiell

#### Features

**1.8.1: Session-Historie** (Woche 1)

- [ ] **Letzte 10 Sessions**
  - Gespeicherte JSON-Sessions anzeigen
  - Liste: Session-ID, Kundenkürzel, Datum, Status
  - Quick-Reload: "Letzte Session fortsetzen"
  - Session löschen / umbenennen

**1.8.2: Template-System** (Woche 2)

- [ ] **Beratungs-Templates**
  - Vordefinierte Szenarien: "Gutverdiener", "Familie", "Rentner"
  - Schnellstart mit typischen Werten
  - Anpassbar im Gespräch

- [ ] **Template-Export**
  - Erfolgreiche Beratung als Template speichern
  - Wiederverwendbar für ähnliche Kunden
  - Anonymisiert (nur Struktur, keine echten Daten)

---

### ⏳ Version 1.9.0: Beratungs-Szenarien ⭐⭐

**Status:** Geplant
**Priorität:** ⭐⭐ MEDIUM (Q3 2026)
**ETA:** Q3 2026 (2 Wochen)
**Fokus:** "Was-wäre-wenn"-Szenarien für Beratungsgespräche

**Bewertung:**
- **Notwendigkeit:** 🟡 MEDIUM - Nice-to-have, aber nicht kritisch
- **Komplexität:** 🔴 HIGH - Braucht State-Management für Szenarien
- **ROI für Beratung:** 🟢 HIGH - Sehr wertvoll für "Was-wäre-wenn"-Gespräche

#### Features

**1.9.1: Szenario-Vergleich** (Woche 1)

- [ ] **"Was wäre wenn..."-Vergleiche**
  - Button: "Was wäre wenn... Immobilie abbezahlt?"
  - Side-by-Side: Aktuell vs. Szenario
  - Highlight: Unterschiede in Cashflow/Sparrate

**1.9.2: Quick-Szenarien** (Woche 2)

- [ ] **Vordefinierte Szenarien**
  - "Immobilie verkaufen" (Einmalzahlung ins Depot)
  - "Immobilie vermieten statt selbst nutzen"
  - "Zweite Immobilie kaufen"
  - "Abbezahlt - wie ändert sich mein Cashflow?"

---

### ⏳ Version 1.10.0: Excel-Export & Advanced Export ⭐

**Status:** Geplant
**Priorität:** ⭐ LOW (Q3 2026)
**ETA:** Q3 2026 (2 Wochen)
**Fokus:** Excel-Export mit Live-Formeln

**Bewertung:**
- **Notwendigkeit:** 🟢 LOW - Excel-Power-Users profitieren
- **Komplexität:** 🔴 HIGH - Excel-Export technisch aufwendig
- **ROI für Beratung:** 🟡 MEDIUM - Nützlich, aber nicht essentiell

#### Features

**1.10.1: Multi-Sheet-Workbook** (Woche 1)

- [ ] **Excel-Export mit mehreren Sheets**
  - Sheet 1: Übersicht (Dashboard)
  - Sheet 2: Einnahmen & Ausgaben (Detailliert)
  - Sheet 3: Immobilien-Analyse (falls vorhanden)
  - Sheet 4: Depot-Aufteilung
  - Sheet 5: Prognose (10 Jahre)

**1.10.2: Live-Formeln** (Woche 2)

- [ ] **Interaktive Excel-Formeln**
  - Excel-Formeln statt statische Werte
  - Kunde kann später selbst anpassen
  - Conditional Formatting für Warnungen (rot bei Engpässen)

---

### ✅ Version 1.6.1: Tagesgeld-Schutzschild-Visualisierung (ABGESCHLOSSEN)

**Status:** ✅ Released (Dezember 22, 2025)
**Fokus:** Visualisierung des Schutzschild-Konzepts mit interaktiven Elementen

#### Implementierte Features

**Level 1: Click-Triggered Info-Badge** ✅
- ✅ **Dezentes Badge außerhalb des Flows**
  - Klick auf Schutzschild zeigt Badge (kein Permanent-Display)
  - Positioniert außerhalb der Flow-Geometrie
  - Geometrisch ausgerichtet mit Flow-Container
  - Badge schließt sich bei Klick außerhalb

**Level 2: Hover-Tooltip mit Live-Berechnung** ✅
- ✅ **Puffer-Berechnung beim Hover**
  - Formel: `Tagesgeld / (Einkommen - Sparraten)`
  - Werte aus Input-Feldern (nicht aus Basin-Display)
  - Farbcodierung:
    - 🟢 Grün: Puffer ≥ 3 Monate → Slow flash (1.5s)
    - 🟡 Gelb: Puffer 1-3 Monate → Medium flash (1s)
    - 🔴 Rot: Puffer < 1 Monat → Fast flash (0.6s)
  - Flow-Line: Tagesgeld → Tooltip (oberhalb z-index)
  - Enterprise-Style Shield Animation (brightness-based impact flash)

**Design-Entscheidungen:**
- ✅ Simple Flow-Line Syntax: `"element-id.position -> element-id.position"`
- ✅ Position-Mapping: top, bottom, left, right, center, corners
- ✅ Z-Index Layering für "through tooltip" Effekt
- ✅ Korrekte Datenquellen (inputs statt basins)

**Level 3 & 4: NICHT implementiert** ⏸️
- ⏸️ 5-Sekunden-Demo-Animation (User: "lassen wir einfach weg")
- ⏸️ Modal mit Zahlen-Vergleich (zu komplex für aktuellen Bedarf)

**Commits:**
- 466f06c: fix(v1.6.1): redesign badge - dezent, click-triggered, outside flow
- c261078: feat(v1.6.1): implement Level 1 - Schutzschild Info-Badge
- [Current]: feat(v1.6.1): complete Level 2 - Hover-Tooltip with shield animation

---

### ✅ Version 1.6.2: Cost-Average-Effekt Erklärer (ABGESCHLOSSEN)

**Status:** ✅ Released (Dezember 22, 2025)
**Fokus:** Interaktiver Erklärer für Cost-Average-Effekt bei Sparraten

#### Implementierte Features

**Side-by-Side Kursvergleich** ✅
- ✅ **Zwei Kursverläufe über 10 Jahre**
  - Kurs A (MLP Blau): Stabil steigend (10 → 18,9 €)
  - Kurs B (Error Red): Volatil mit Crash (10 → 2 → 10,5 €)
  - Chart.js Visualisierung mit Jahr-Labels (J1-J10)

**Click-by-Click Animation** ✅
- ✅ **User-gesteuerte Fortschritt**
  - Klick auf Kurs-Box startet nächstes Jahr
  - Keine automatische Animation mehr
  - Volle Kontrolle über Tempo
  - Share-Bars bleiben auf fixer Position (kein Scrollen)

**Live-Berechnung & Visualisierung** ✅
- ✅ **Dynamische Anteils-Berechnung**
  - 1.200 € pro Jahr investiert
  - Live-Counter: Jahr, Investiert, Anteile gesamt
  - Share-Bars zeigen gekaufte Anteile pro Jahr
  - Jahr 2 (Crash) mit 💥 Emoji markiert

**Chart-Month-Highlighting** ✅
- ✅ **Aktuelles Jahr im Chart hervorgehoben**
  - Größerer Punkt (radius 10) in MLP Green (#47A190)
  - Crash-Jahr (J2) extra Betonung (radius 12, orange)
  - Beide Charts synchron aktualisiert

**Ergebnis-Vergleich** ✅
- ✅ **Überraschende Zahlen**
  - Kurs A (stabil): 7.857 Anteile, 28.495 € Gewinn (3,8%)
  - Kurs B (volatil): 23.733 Anteile, 129.200 € Gewinn (13,0%) ✅
  - **Endkurs angezeigt:** "Kurs im Jahr 10: 18,90 €" / "10,50 €"
  - Crash-Vorteil erklärt: "600 Anteile für 1.200 € beim Crash!"

**UX-Optimierungen** ✅
- ✅ **Vereinfachter Text:** "Vergleich zweier Kursverläufe - Einzahlung: 1.200 € pro Jahr!"
- ✅ **Monate → Jahre** (aussagekräftiger für 1.200 € Jahresrate)
- ✅ **Kein Button mehr:** Klick auf Box startet Animation
- ✅ **Crash-Hintergrund entfernt:** Nur 💥 Emoji (vorher rot-auf-rot Problem)
- ✅ **Click-to-Close:** Klick irgendwo auf Ergebnis schließt Modal

**Integration** ✅
- ✅ **Button im Depot-Modal:** "💡 Warum welcher Fonds?" (Cost-Average-Effekt)
- ✅ **Vollbild-Overlay** mit Side-by-Side Vergleich
- ✅ **Zurück zum Depot** via Click-anywhere

**Commits:**
- 7765474: feat(v1.6.2): redesign Cost-Average Modal with crash-highlight concept
- d1a4873: refactor(v1.6.2): redesign Cost-Average animation - click-by-click control
- 2a15e1f: refactor(v1.6.2): UX improvements - simplified Cost-Average animation

---

### ✅ Version 1.6.3: Tagesgeld-Kriegskasse Erklärer (ABGESCHLOSSEN)

**Status:** ✅ Implementiert (22. Dezember 2025)
**Fokus:** Visualisierung der Wichtigkeit einer Investitionsreserve (Tagesgeld)

#### Implementierte Features

**Kriegskasse-Modal (Investitionsreserve Erklärer)** ✅

- ✅ **Side-by-Side Animation**
  - Szenario A: OHNE Tagesgeld (Panikverkauf im Crash)
  - Szenario B: MIT Tagesgeld (Durchhalten mit Puffer)

- ✅ **Click-by-Click Animation** (10 Jahre Marktverlauf)
  - Wiederverwendung von courseData.B (volatiler Kurs mit Crash)
  - Jahr 2: Crash von 10€ → 2€ (-80%)
  - Szenario A: Verkauf bei 2€, Wiedereinstieg bei 10.5€ (Jahr 5)
  - Szenario B: Durchhalten, volle Erholung profitieren

- ✅ **Interaktive Charts mit Chart.js**
  - Portfolio-Wert-Verlauf über 10 Jahre
  - Crash-Punkt extra hervorgehoben (größerer Punkt, orange)
  - Live-Update bei jedem Klick

- ✅ **Timeline-Display**
  - Live-Events für beide Szenarien
  - Letzte 5 Events sichtbar
  - Emoji-basierte visuelle Indikatoren

- ✅ **Ergebnis-Vergleich**
  - Szenario A: Endwert, Verlust, Details zum Panikverkauf
  - Szenario B: Endwert, Gewinn, Durchhalten-Strategie
  - Differenz-Berechnung zeigt konkreten Mehrwert der Kriegskasse

- ✅ **Insight-Box**
  - Erklärt psychologischen Aspekt (Panik vs. Ruhe)
  - Zeigt konkrete Zahlen des Unterschieds
  - Betont Schutzfunktion der Tagesgeld-Reserve

**Integration** ✅

- ✅ **Info-Button bei Tagesgeld-Basin**
  - Button: "💰 Warum Tagesgeld?"
  - Positioniert zwischen Tagesgeld und Depot
  - Grüner Gradient (emerald) passend zu Tagesgeld-Thema
  - Hover-Effekt mit scale-transform

- ✅ **Vollbild-Modal** mit Side-by-Side Vergleich
  - Klick auf Szenarien startet Animation
  - Klick auf Ergebnis schließt Modal
  - Konsistentes UX-Pattern wie Cost-Average Erklärer

**Technische Implementierung** ✅

- ✅ **Scenario-basierte State-Verwaltung**
  - scenarioA: Portfolio-Wert, Verkaufspunkt, Wiedereinstieg, Shares
  - scenarioB: Portfolio-Wert, kontinuierliche Berechnung

- ✅ **Marktdaten-Wiederverwendung**
  - courseData.B von Cost-Average wiederverwendet
  - Crash-Szenario bereits vorhanden (Jahr 2: 10 → 2)
  - Erholung bis Jahr 10: 10.5€

- ✅ **Chart-Management**
  - Separate Charts für Szenario A und B
  - Dynamische Point-Highlighting
  - Memory-Cleanup bei Modal-Close

**Commits:**
- (Wird beim nächsten Commit hinzugefügt)

---

### Version 1.6.0: UX-Polish & Kunden-Verständnis ⭐⭐⭐

**ETA:** Q1 2026 (2-3 Wochen verbleibend)
**Fokus:** Kunden-Verständnis durch interaktive Erklärer

**Mission:** Kunde soll verstehen wie sein Geld "automatisch fließt" und WARUM bestimmte Strategien funktionieren

#### Features

**1.6.3: Tagesgeld-Kriegskasse Erklärer** ⭐⭐⭐ (Woche 3-4)

**Warum wichtig:** Erklärt dem Kunden, warum eine Investitionsrücklage (Tagesgeld/Geldmarkt) wichtig ist, um in Crashzeiten günstig nachzukaufen.

- [ ] **Szenario-Vergleich**
  - OHNE Tagesgeld-Puffer:
    - Crash -30% → Notverkauf im Tief → Verluste realisiert
    - Rendite: 4,2% p.a.
  - MIT Tagesgeld-Puffer (5.000€):
    - Crash -30% → Liquidität aus Tagesgeld → Kein Verkauf
    - Depot erholt sich → Rendite: 7,0% p.a.
    - **Mehrertrag: +47.000€ über 15 Jahre**

- [ ] **Interaktive Crash-Simulation**
  - Chart zeigt Portfolio-Entwicklung
  - Button: "Crash simulieren"
  - Animation: Depot-Kurve stürzt ab
  - OHNE Puffer: Rote Verkaufs-Marker im Tief
  - MIT Puffer: Grüne "Gehalten"-Marker

- [ ] **Stress-Test Stats**
  - "In 87% der letzten Krisen hätte dein Puffer gereicht"
  - Historische Daten: 2000, 2008, 2020, 2022
  - Konkrete Zahlen statt Theorie

- [ ] **Integration**
  - Button im Tagesgeld-Basin: "🛡️ Warum ist Tagesgeld wichtig?"
  - Vollbild-Overlay
  - Chart.js für Vergleichs-Grafik

**1.6.4: Presenter-Mode** (Woche 4-5)

- [ ] **Vollbild-Modus**
  - F11-ähnlich, aber mit Controls
  - Versteckt Berater-Tools (Notizen, Export, Menü)
  - Fokus rein auf Visualisierung
  - Perfekt für Bildschirm-Sharing

- [ ] **Highlight-Modus**
  - Click auf Basin: Spot-Light-Effekt
  - Temporäres Dimmen anderer Elemente
  - "Kunde fokussiert auf dieses Basin"

**1.6.5: Animierte Transitionen** ⭐ (Woche 5)

- [ ] **Smooth Beratungsmodus-Steps**
  - Fade-In/Out statt hartes Show/Hide
  - Highlight: "Hier erscheint jetzt..."
  - Flow-Animation beim Aktivieren (Wasser fließt!)

- [ ] **Flow-Pulse-Effekt**
  - Kleine Wellen-Animation entlang der Flows
  - Zeigt "Geld fließt automatisch"
  - Dezent, nicht ablenkend

**1.6.6: Kunden-Verständnis-Features** ⭐⭐ (Woche 6)

- [ ] **Tooltip-System**
  - Hover auf Basin: Kurze Erklärung
  - "Was ist ein Tagesgeldkonto?"
  - "Warum ist die Sparrate wichtig?"
  - "Was passiert bei finanziellen Engpässen?"

- [ ] **Info-Overlays mit Beispielen**
  - Click auf "?" neben Basin-Titel
  - Modal mit:
    - Ausführliche Erklärung
    - Konkretes Beispiel (mit Zahlen!)
    - Visuelle Illustration
  - Kunde versteht sofort den Zweck

- [ ] **"Wie funktioniert das?"-Button**
  - Erklärt automatische Logik
  - "Ihr Geld fließt automatisch in dieser Reihenfolge..."
  - Zeigt Priorisierung visuell


---

### Version 2.0.0: Vermögensverzehr-Modus (Ruhestandsplanung)

**ETA:** Q2 2027 (10-12 Wochen)
**Fokus:** Paradigmenwechsel - Von "Vermögensaufbau" zu "Vermögensverzehr"

**Zielgruppe:** Pensionäre, Rentner, Menschen vor dem Ruhestand

#### Konzept-Überblick

**Problem:**
Kunde ist Pensionär. Depot ist nicht mehr Ziel, sondern **Einkommensquelle**.
Frage: "Wie lange reicht mein Vermögen bei gewünschtem Lebensstandard?"

**Lösung:**
- Modus-Toggle (wie Variante A/B): "Vermögensaufbau" ⇄ "Vermögensverzehr"
- Umgekehrte Flow-Logik: Depot → Entnahme → Ausgaben → Reserve → Rückfluss Depot
- Berechnung: Vermögensprognose, Entnahmedauer, Risiko-Analyse
- Immobilien-Verkaufs-Simulation bei Fehlbetrag

**Neue Logik:**
```
Einnahmen-Quellen:
1. Depot-Entnahme (berechnet)
2. Immobilien (Mieteinnahmen netto)
3. Gesetzliche Renten (netto)
4. Sonstige Einkünfte (netto)
        ↓
    Konsum-Konto (IMMER zuerst!)
        ↓
    Dauerauftrag → Fixkosten
        ↓
    Überschuss → Tagesgeld
        ↓
    Bei Tagesgeld-Ziel erreicht → Rückfluss ins Depot
```

#### Features

**2.0.1: Modus-Toggle & Datenmodell** (Woche 1-2)

- [ ] **App-Modus-Switch**
  - Toggle-Button (wie Variante A/B): "Vermögensaufbau" ⇄ "Vermögensverzehr"
  - `let appMode = 'AUFBAU' | 'VERZEHR'`
  - Persistierung in sessionStorage
  - UI passt sich komplett an

- [ ] **Neues Datenmodell für Verzehr-Modus**
  ```javascript
  const verzehrData = {
    // Vermögen
    depotStart: 500000,
    tagesgeldStart: 50000,
    tagesgeldZiel: 50000,

    // Passive Einkünfte
    gesetzlicheRenteNetto: 1800,
    betriebsrenteNetto: 0,
    immobilienMieteNetto: 800,
    sonstigeEinkuenfte: 0,

    // Gewünschte Ausgaben (USER-Eingabe!)
    fixkostenMonatlich: 1200,
    gewuenschterKonsum: 2000,

    // Zeitraum
    aktuellesAlter: 67,
    gewuenschtesEndalter: 95,

    // Annahmen
    depotRendite: 0.05,
    inflation: 0.02,
    steuersatz: 0.26375
  };
  ```

- [ ] **Eingabe-Panel für Verzehr-Modus**
  - Neue Eingabefelder: Gesetzliche Rente, Aktuelles Alter, Endalter
  - Gewünschter Konsum (statt berechnet)
  - Depot-Startwert, Rendite, Inflation

**2.0.2: Berechnungs-Engine** (Woche 2-4)

- [ ] **Vermögensverzehr-Algorithmus**
  - Berechne monatliche Depot-Entnahme
  - Formel: Annuitätenberechnung (umgekehrt)
  - Input: Depot, Passive Einkünfte, Ausgaben, Rendite, Inflation
  - Output: Wie lange reicht das Vermögen?

- [ ] **Entnahmedauer-Berechnung**
  ```javascript
  function berechneEntnahmeDauer(startkapital, jaehrlicheEntnahme, rendite) {
    // Annuitätenformel umgestellt nach n (Laufzeit)
    // n = -ln(1 - K*r/E) / ln(1+r)
    return -Math.log(1 - (startkapital * rendite / jaehrlicheEntnahme))
            / Math.log(1 + rendite);
  }
  ```

- [ ] **Risiko-Analyse**
  - Vergleich: Depot-Erschöpfung vs. Gewünschtes Endalter
  - Status: ✅ SICHER | ⚠️ RISIKO | 🚨 KRITISCH
  - Fehlbetrag-Berechnung bei Risiko

- [ ] **4%-Regel-Validator**
  - Nachhaltige Entnahmerate berechnen
  - Warnung: "Sie entnehmen 6% p.a. - empfohlen: max. 4%"

**2.0.3: UI/UX - Umgekehrte Flows** (Woche 4-6)

- [ ] **Neue Basin-Anordnung (Verzehr-Modus)**
  ```
  Ebene 1 (Einnahmen):
  - [Depot-Entnahme] [Immobilie] [Renten] [Sonstige]

  Ebene 2 (Ausgaben):
  - [Konsum-Konto] ──Dauerauftrag──> [Fixkosten]

  Ebene 3 (Reserve):
  - [Tagesgeld] ──bei Ziel erreicht──> [Depot]
  ```

- [ ] **Umgekehrte Flow-Visualisierung**
  - Depot → Konsum (grüner Flow, nach UNTEN)
  - Konsum → Fixkosten (Dauerauftrag, IMMER aktiv)
  - Überschuss → Tagesgeld → Depot (Rückfluss!)

- [ ] **Depot-Entnahme-Anzeige**
  - Basin zeigt: "Entnahme: 1.400€/Monat"
  - Depot-Restlaufzeit: "Reicht noch: 28 Jahre"
  - Progress-Bar: Vermögen vs. Verbrauch

- [ ] **Tagesgeld-Rückfluss-Logik**
  - WICHTIG: Erst Tagesgeld auf Ziel (50k)
  - Dann Überschuss zurück ins Depot
  - Visual: Grüner Rückfluss-Pfeil Tagesgeld → Depot

**2.0.4: Prognose-Chart (Must-Have)** (Woche 6-7)

- [ ] **Vermögensverlaufs-Chart**
  - X-Achse: Alter (67 → 105 Jahre)
  - Y-Achse: Vermögen (€)
  - Linie 1: Depot-Verlauf (rot, wird weniger)
  - Linie 2: Tagesgeld (grün, konstant)
  - Vertikale Linie: Gewünschtes Endalter (orange)
  - Farbige Zone: Risiko-Bereich (rot) vs. Sicher (grün)

- [ ] **Inflation-Berücksichtigung**
  - Toggle: "Mit Inflation" / "Ohne Inflation"
  - Chart zeigt Kaufkraft-bereinigte Werte
  - Tooltip: "In heutiger Kaufkraft: X€"

- [ ] **Interaktive Szenarien**
  - Slider: "Was wenn Rendite nur 3% statt 5%?"
  - Chart aktualisiert live
  - Vergleich: Optimistisch / Realistisch / Pessimistisch

**2.0.5: Immobilien-Verkaufs-Simulation** (Woche 7-8)

- [ ] **Automatischer Vorschlag bei Fehlbetrag**
  ```
  ⚠️ WARNUNG: Vermögen reicht nur 23 Jahre (bis Alter 90)
  Gewünscht: 28 Jahre (bis Alter 95)
  Fehlbetrag: ca. 120.000 €

  💡 EMPFEHLUNG: Immobilie verkaufen
  - Verkaufserlös: 285.000 € (netto, -5% Kosten)
  - Vermögen reicht dann: 35 Jahre (bis Alter 102)
  - Zusätzliche Sicherheit: +12 Jahre

  ⚠️ HINWEIS: Bei Verkauf eigener Immobilie
  → Bitte Mietausgabe in Fixkosten nachtragen!

  [Immobilien-Verkauf simulieren] [Mietausgabe hinzufügen]
  ```

- [ ] **Szenario-Vergleich: Mit/Ohne Verkauf**
  - Side-by-Side Chart
  - Links: Ohne Immobilienverkauf
  - Rechts: Mit Immobilienverkauf
  - Highlight: Unterschiede (Laufzeit, Sicherheit)

- [ ] **Mietausgabe-Erinnerung**
  - Bei Immobilienverkauf: Modal
  - "Bitte Mietausgabe in Fixkosten eintragen!"
  - Input-Feld direkt im Modal
  - Automatisches Hinzufügen zu Fixkosten

**2.0.6: Depot-Verzehr-Szenarien** (Woche 8-9)

- [ ] **Szenario-Auswahl**
  - Checkbox 1: "Depot-Verzehr aktivieren" (Standard)
  - Checkbox 2: "Immobilien-Verkauf einberechnen"
  - Kombinierbar: Beide, nur Depot, nur Immobilie

- [ ] **Vergleichs-Tabelle**
  ```
  | Szenario              | Laufzeit | Bis Alter | Status   |
  |-----------------------|----------|-----------|----------|
  | Nur passive Einkünfte | 8 Jahre  | 75        | 🚨 KRITISCH |
  | + Depot-Verzehr       | 23 Jahre | 90        | ⚠️ RISIKO   |
  | + Immobilien-Verkauf  | 35 Jahre | 102       | ✅ SICHER   |
  ```

- [ ] **Empfehlungs-Logik**
  - Automatische Berechnung aller Szenarien
  - Highlight: Beste Option für gewünschtes Endalter
  - Erklärung: "Warum dieses Szenario?"

**2.0.7: Export-Erweiterung für Verzehr-Modus** (Woche 9-10)

- [ ] **PDF-Export: Ruhestandsplanung**
  - Sektion: "Vermögensverzehr-Analyse"
  - Tabelle: Passive Einkünfte, Ausgaben, Depot-Entnahme
  - Chart: Vermögensverlauf eingebettet
  - Szenarien-Vergleich
  - Risiko-Bewertung & Empfehlungen

- [ ] **CSV-Export: Jahres-Prognose**
  - Spalten: Jahr, Alter, Depot, Tagesgeld, Entnahme, Rendite
  - 50 Jahre vorausberechnet
  - Excel-kompatibel (UTF-8 BOM)

**2.0.8: Testing & Finalisierung** (Woche 10-12)

- [ ] **Modus-Wechsel testen**
  - Aufbau ↔ Verzehr ohne Datenverlust
  - Session-Daten korrekt migriert
  - UI vollständig angepasst

- [ ] **Edge Cases**
  - Depot-Rendite = 0%
  - Negative Rendite (Crash-Szenario)
  - Passive Einkünfte > Ausgaben (kein Depot-Verzehr nötig)
  - Immobilie ohne Wert

- [ ] **Dokumentation**
  - Benutzerhandbuch: Verzehr-Modus
  - Berechnungs-Formeln dokumentiert
  - Screenshots & Beispiele

---

## 🔐 Datenschutz & Compliance-Strategie

### Aktuelle Situation (v1.1.0)

- ⚠️ **localStorage**: Daten persistieren dauerhaft
- ⚠️ **Keine Lösch-Mechanik**: Manuelle Browser-Löschung nötig
- ⚠️ **Keine Session-Trennung**: Alle Beratungen im selben Speicher

### Ziel-Architektur (v1.2.0+)

#### Daten-Speicherung

```
┌─────────────────────────────────────────┐
│  sessionStorage (nur während Tab offen) │
│  ├─ Session-ID: Auto-generiert          │
│  ├─ Kundendaten: Temporär               │
│  ├─ Crash-Recovery: Ja (bis Tab-Close)  │
│  └─ Auto-Delete: Bei Tab-Close          │
└─────────────────────────────────────────┘

Optional (v1.4.0+):
┌─────────────────────────────────────────┐
│  IndexedDB (nur für Templates)          │
│  ├─ Berater-Templates (anonymisiert)    │
│  ├─ Keine Kundendaten                   │
│  └─ Manuell löschbar                    │
└─────────────────────────────────────────┘
```

#### Daten-Lifecycle

```
Start → Session-Start-Dialog
  ↓
Erfassung → sessionStorage (live)
  ↓
Crash/Reload → Recovery-Dialog
  ↓
Export → PDF/CSV Download
  ↓
Tab-Close → sessionStorage.clear()
```

#### Compliance-Checkliste

- ✅ **DSGVO Art. 25 (Privacy by Design)**
  - Daten nur temporär (sessionStorage)
  - Auto-Delete bei Tab-Close
  - Keine Cloud-Übertragung

- ✅ **Datensparsamkeit**
  - Nur notwendige Daten
  - Optional: Kundenkürzel (kein Name!)
  - Keine PII (Personally Identifiable Information)

- ✅ **Transparenz**
  - Datenschutz-Hinweis beim Start
  - Sichtbare Session-Info
  - Export-Protokoll

---

## 🚀 Quick Wins (Nächste 2-4 Wochen) - v1.3.0

### Prio 1: CSV/JSON-Export

- [ ] CSV-Export-Funktion (6h)
- [ ] UTF-8 BOM für Excel (1h)
- [ ] Session-Metadaten im Header (2h)
- [ ] JSON-Export (vollständige Session-Daten) (3h)

### Prio 2: PDF-Export-Verbesserungen

- [ ] Session-Metadaten in PDF-Header (2h)
- [ ] Footer mit Export-Timestamp (1h)
- [ ] Erweiterte Immobilien-Sektion (4h)

### Prio 3: Compliance & UX

- [ ] Datenschutz-Hinweis beim ersten Start (3h)
- [ ] Inaktivitäts-Warnung (30/60 Min.) (4h)
- [ ] Export-Status-Indikator verbessern (2h)

**Gesamtaufwand:** ~28 Stunden (ca. 1 Woche)

---

## 📈 Erfolgs-Metriken

### Version 1.2.0 (Session-Management)

- [ ] **Datenschutz**: 0 dauerhafte Speicherungen
- [ ] **Crash-Recovery**: 100% innerhalb Session
- [ ] **Export-Rate**: > 90% der Sessions werden exportiert
- [ ] **Session-Dauer**: Durchschnittlich 20-40 Min.

### Version 2.0.0 (Enterprise)

- [ ] **Berater-Adoption**: > 80% nutzen regelmäßig
- [ ] **Export-Formate**: PDF + CSV Standard
- [ ] **Offline-Fähigkeit**: PWA installiert
- [ ] **Performance**: < 2s Ladezeit

---

## 🤝 Feedback & Weiterentwicklung

**Zielgruppe für Feedback:**

- Vermögensberater (Hauptnutzer)
- Compliance-Team (Datenschutz)
- IT-Abteilung (Integration)

**Feedback-Kanäle:**

- Issues auf GitHub
- Berater-Umfragen nach v1.2.0
- Usability-Tests im Beratungs-Kontext

---

## 📝 Changelog

### v1.3.0 (Oktober 2025) - IN PROGRESS

**Export-Erweiterung & Immobilien-Integration**

- ✅ **CSV-Export**: CRM-Integration mit UTF-8 BOM, Session-Metadaten
- ✅ **JSON-Export**: Complete Session Backup mit LLM-Prompt
- ✅ **JSON-Import**: Vollständige Session-Wiederherstellung
- ✅ **Toast-System**: Elegante Benachrichtigungen statt Alerts
- ✅ **PDF-Optimierung**: Session-Daten im Header, optimiertes Layout
- ✅ **Darlehensberechnung**: Automatische Annuitätenrate im Immobilien-Modal (Zinssatz + Tilgung)
- ✅ **Tilgungsplan**: 0-20 Jahre Slider mit Wertsteigerung & Compound-Growth
- ✅ **Cashflow-Integration**: Toggle für Immobilien-Flows ins Gesamtsystem
- ✅ **Layout-Optimierung**: Vermieterkonto auf Girokonto-Ebene, dezente Immobilien-Flows (0.35 opacity)
- ✅ **UX-Verbesserung**: Logische Feld-Gruppierung (Wertsteigerung neben Immobilienwert, Zinssatz/Tilgung unter Darlehen)

**Commits:**
- 99366b0: PDF fixes and import UX optimization
- 342ac9b: Suppress browser reload confirmation
- dd306c3: Restore flowchart original layout
- 8c96384: Rename "MLP Vermieterkonto" to "Vermieterkonto" (style consistency)
- e7c6bf6: Move loan fields to Immobilien modal, implement auto-calculation & Tilgungsplan
- 8bc5ddb: Complete v1.3.2 with cashflow integration and layout optimization

### v1.2.0 (Oktober 2025) ✅

**Session-Management & UI/UX-Verbesserungen**

- ✅ **Session-Lifecycle**: Start/End-Dialogs, Session-Recovery
- ✅ **sessionStorage-Migration**: Daten nur während Tab-Session
- ✅ **Vermieterkonto**: 7. Basin mit bidirektionalen Flows
- ✅ **Gradient-Zonen**: Visuelle Layer-Trennung (Wolken → Felder)
- ✅ **Modal-Overlay-System**: Fullscreen-Modals mit Backdrop-Blur
- ✅ **Session-Menu**: Eleganter Dropdown statt Bar
- ✅ **Defizit-Line**: MLP Platin, dezent (0.15 opacity)
- ✅ **Beratungsmodus-Fix**: Step 1 nur Einkommen

**Commits:**
- e860bec: Session lifecycle management
- ffe2da1, a2d9e1b, eaebe66: Vermieterkonto mit Flows
- 29f4ac6, b713b41, ad5f173, 085a3ee: Gradient-Zonen
- 00c4173, 9a931a3, 1cc1b9f: Modal-System & UI-Polish

### v1.1.0 (Oktober 2025)

- ✅ Immobilien-Basin mit Cashflow-Verwaltung
- ✅ Optimierte Basin-Positionierung
- ✅ Beratungsmodus Step 6 (Immobilien)

### v1.0.0 (September 2025)

- ✅ Basis-System mit 5 Basins
- ✅ SVG-Flow-Visualisierung
- ✅ Varianten A & B
- ✅ Beratungsmodus (5 Steps)
- ✅ Print-Funktion

---

---

## 📋 Prioritäten-Übersicht (Q1-Q3 2026)

| Version | Feature | Priorität | ETA | ROI Beratung |
|---------|---------|-----------|-----|--------------|
| **v1.6.1** | **Tagesgeld-Schutzschild-Visualisierung** | ⭐⭐⭐ HIGH | ✅ DONE | 🟢 HIGH |
| **v1.6.2** | **Cost-Average-Effekt Erklärer** | ⭐⭐⭐ HIGH | ✅ DONE | 🟢 HIGH |
| **v1.6.3** | **Tagesgeld-Kriegskasse Erklärer** | ⭐⭐⭐ HIGHEST | ✅ DONE | 🟢 HIGHEST |
| **v1.6.4** | **Presenter-Mode** | ⭐⭐ MEDIUM | 1 Woche | 🟡 MEDIUM |
| **v1.7.0** | **Berater-Notizen & Annotations** | ⭐⭐ MEDIUM | 3-4 Wochen | 🟢 HIGH |
| **v1.8.0** | **Session-Historie & Templates** | ⭐ LOW | 2-3 Wochen | 🟡 MEDIUM |
| **v1.9.0** | **Beratungs-Szenarien** | ⭐⭐ MEDIUM | 2 Wochen | 🟢 HIGH |
| **v1.10.0** | **Excel-Export mit Formeln** | ⭐ LOW | 2 Wochen | 🟡 MEDIUM |

**Empfohlener Entwicklungspfad:**
1. ✅ **Abgeschlossen:** v1.6.1 (Schutzschild-Visualisierung)
2. ✅ **Abgeschlossen:** v1.6.2 (Cost-Average-Effekt Erklärer)
3. ✅ **Abgeschlossen:** v1.6.3 (Tagesgeld-Kriegskasse Erklärer)
4. ⏳ **Jetzt:** v1.6.4 (Presenter-Mode)
5. ⏳ Q2 2026: v1.7.0 (Berater-Notizen)
6. ⏳ Q2 2026: v1.8.0 (Session-Historie)
7. ⏳ Q3 2026: v1.9.0 + v1.10.0 (optional)

---

## 🎯 Roadmap-Ziele

**🎯 Ziel: Version 2.0.0 (Vermögensverzehr-Modus) bis Q1-Q2 2027**
**📅 Nächster Meilenstein: v1.6.4 (Presenter-Mode) - Q1 2026**

**Langfristige Vision:**
- v1.x: Vermögensaufbau-Fokus (Erwerbstätige)
- v2.0: Vermögensverzehr-Modus (Pensionäre/Rentner)
- v3.0: Unified Platform (beide Modi, nahtloser Übergang)

---

*Letzte Aktualisierung: 22. Dezember 2025*
*Version: 3.3 (v1.6.3 abgeschlossen)*
*Aktuelle Version: v1.6.3 ✅*
*Nächste Version: v1.6.4 (Presenter-Mode) - MEDIUM PRIORITY ⭐⭐*

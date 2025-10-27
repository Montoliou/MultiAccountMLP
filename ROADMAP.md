# 🗺️ Roadmap: Das strategische Vermögensmanagement

**Aktuelle Version:** 1.2.0
**Ziel-Version:** 2.0.0
**Datum:** Oktober 2025

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

## 📊 Aktuelle Analyse (Version 1.2.0)

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

#### UI/UX-Verbesserungen (v1.2.0)

- ✅ **Gradient-Zonen**: Visuelle Layer-Trennung mit Metapher
  - Wolken (Einkommen): Himmelblau
  - Horizont (Girokonten): Grau-Blau
  - Schuppen (Liquidität): Dunkel-Teal
  - Felder (Vermögensaufbau): MLP Platin
  - Optimierte Opacity für Dark/Light Theme
- ✅ **Deficit-Line**: MLP Platin, sehr dezent (0.15 opacity)
- ✅ **Session-Menu**: Elegant, top-left dropdown mit glassmorphism

### Nächste Entwicklungsziele

#### 1. Export-Erweiterung (v1.3.0)

**Aktuelle Einschränkungen:**

- Nur PDF-Print verfügbar
- Keine strukturierten Daten-Exports (CSV/JSON)
- Fehlende Session-Metadaten im Export

**Geplante Verbesserungen:**

- CSV-Export für CRM-Integration
- JSON-Export für vollständige Session-Daten
- Excel-kompatibel mit UTF-8 BOM
- Automatische Metadaten (Berater, Datum, Session-ID)

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

### Version 1.3.0: Export-Erweiterung & Immobilien-Integration (IN PROGRESS)

**ETA:** Q4 2025 / Q1 2026 (4-6 Wochen)
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

**1.3.3: Beratungs-Szenarien** (Woche 3-4)

- [ ] **Szenario-Vergleich**
  - Button: "Was wäre wenn... Immobilie abbezahlt?"
  - Side-by-Side: Aktuell vs. Szenario
  - Highlight: Unterschiede in Cashflow/Sparrate

- [ ] **Quick-Szenarien**
  - "Immobilie verkaufen" (Einmalzahlung ins Depot)
  - "Immobilie vermieten statt selbst nutzen"
  - "Zweite Immobilie kaufen"

**1.3.4: Datenschutz-Compliance** (Woche 4)

- [ ] **Datenschutz-Hinweis beim ersten Start**
  - Info-Modal: "Alle Daten werden nur temporär gespeichert"
  - Checkbox: "Verstanden, nicht erneut anzeigen"

- [ ] **Inaktivitäts-Warnung**
  - Nach 30 Min. Inaktivität: Toast-Notification
  - "Beratung noch aktiv? Session läuft ab in 30 Min."
  - Button: "Ich bin noch da"

---

### Version 1.4.0: Session-Historie & Templates

**ETA:** Q2 2026 (2-3 Wochen)
**Fokus:** Session-Management & Berater-Produktivität

#### Features

**1.4.1: Session-Historie** (Woche 1)

- [ ] **Letzte 10 Sessions**
  - Gespeicherte JSON-Sessions anzeigen
  - Liste: Session-ID, Kundenkürzel, Datum, Status
  - Quick-Reload: "Letzte Session fortsetzen"
  - Session löschen / umbenennen

**1.4.2: Template-System** (Woche 2)

- [ ] **Beratungs-Templates**
  - Vordefinierte Szenarien: "Gutverdiener", "Familie", "Rentner"
  - Schnellstart mit typischen Werten
  - Anpassbar im Gespräch

- [ ] **Template-Export**
  - Erfolgreiche Beratung als Template speichern
  - Wiederverwendbar für ähnliche Kunden
  - Anonymisiert (nur Struktur, keine echten Daten)

---

### Version 1.5.0: Berater-Notizen & Excel-Export ⭐⭐

**ETA:** Q2 2026 (3-4 Wochen)
**Fokus:** Nachvollziehbarkeit für Kunden & erweiterte Export-Formate

**Warum wichtig:** Berater-Notizen helfen Kunde die Beratung später besser nachzuvollziehen!

#### Features

**1.5.1: Berater-Notizen & Annotations** ⭐⭐ (Woche 1-2)

- [ ] **Notizen-Feld pro Basin**
  - Freitext-Notizen zu jedem Basin
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

**1.5.2: Excel-Export mit Formeln** (Woche 3-4)

- [ ] **Multi-Sheet-Workbook**
  - Sheet 1: Übersicht (Dashboard)
  - Sheet 2: Einnahmen & Ausgaben (Detailliert)
  - Sheet 3: Immobilien-Analyse (falls vorhanden)
  - Sheet 4: Depot-Aufteilung
  - Sheet 5: Prognose (10 Jahre)

- [ ] **Live-Formeln**
  - Excel-Formeln statt statische Werte
  - Kunde kann später selbst anpassen
  - Conditional Formatting für Warnungen (rot bei Engpässen)

---

### Version 1.6.0: UX-Polish & Kunden-Verständnis ⭐⭐⭐

**ETA:** Q3 2026 (4-5 Wochen)
**Fokus:** MEGA! Je schöner für Kunden, desto einfacher zu verstehen

**Mission:** Kunde soll auf einen Blick verstehen wie sein Geld "automatisch fließt"

#### Features

**1.6.1: Presenter-Mode** (Woche 1)

- [ ] **Vollbild-Modus**
  - F11-ähnlich, aber mit Controls
  - Versteckt Berater-Tools (Notizen, Export, Menü)
  - Fokus rein auf Visualisierung
  - Perfekt für Bildschirm-Sharing

- [ ] **Highlight-Modus**
  - Click auf Basin: Spot-Light-Effekt
  - Temporäres Dimmen anderer Elemente
  - "Kunde fokussiert auf dieses Basin"

**1.6.2: Animierte Transitionen** ⭐ (Woche 2)

- [ ] **Smooth Beratungsmodus-Steps**
  - Fade-In/Out statt hartes Show/Hide
  - Highlight: "Hier erscheint jetzt..."
  - Flow-Animation beim Aktivieren (Wasser fließt!)

- [ ] **Flow-Pulse-Effekt**
  - Kleine Wellen-Animation entlang der Flows
  - Zeigt "Geld fließt automatisch"
  - Dezent, nicht ablenkend

**1.6.3: Kunden-Verständnis-Features** ⭐⭐ (Woche 3-4)

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

### Version 1.7.0: Verständnis-Features - Schutzschild & Automatik ⭐⭐⭐

**ETA:** Q4 2026 (3-4 Wochen)
**Fokus:** Kunde soll SEHEN & VERSTEHEN wie das System ihn schützt

**Mission-Critical:** Tagesgeld = Schutzschild vor Depot-Entnahmen visuell zeigen!

#### Features

**1.7.1: Schutzschild-Visualisierung** ⭐⭐⭐ (Woche 1-2)

- [ ] **Visueller Schutz-Effekt**
  - Tagesgeld zeigt "🛡️ Schutzschild aktiv" wenn Limit erreicht
  - Animation: Bei Engpass → Tagesgeld springt ein (leuchtet kurz auf)
  - Depot zeigt "Geschützt durch Tagesgeld"
  - Kunde **SIEHT** wie Schutz funktioniert!

- [ ] **Depot-Schutz-Indikator**
  - Visuelles Schild-Icon zwischen Tagesgeld und Depot
  - Zeigt: "Depot vor Entnahmen geschützt"
  - Bei Tagesgeld < Limit: Icon wird orange/rot
  - Kunde versteht sofort den Zusammenhang

**1.7.2: Automatik-Indicator** ⭐⭐ (Woche 2)

- [ ] **"🤖 Automatik aktiv"-Badge**
  - Kleine Animation/Icon bei jedem Basin
  - Zeigt: "System reagiert automatisch"
  - Bei Änderungen: Kurz aufleuchten "Auto-Anpassung erfolgt"
  - Verstärkt Gefühl: "Eine KI managed das für mich"

- [ ] **Priorisierungs-Animation**
  - Visuell zeigen: "1. Tagesgeld auffüllen → 2. Depot"
  - Zahlen-Badges an Flows: "Priorität 1", "Priorität 2"
  - Bei Überschuss: Animation zeigt Reihenfolge

**1.7.3: Liquiditäts-Ampel** ⭐⭐ (Woche 3)

- [ ] **Status-Ampel am Tagesgeld**
  - 🟢 Grün: Tagesgeld > Limit → "Alles sicher!"
  - 🟡 Gelb: Tagesgeld < Limit → "Depot geschützt, aber knapp"
  - 🔴 Rot: Tagesgeld fast leer → "Nur noch X€ bis Notfall"
  - Kunde **versteht sofort** seinen Liquiditäts-Status

- [ ] **Puffer-Anzeige**
  - "Ihr Puffer: 3 Monate abgesichert"
  - Berechnung: Tagesgeld / monatliche Fixkosten
  - Visueller Balken zeigt Puffer-Monate

---

### Version 1.8.0: Flow-Animationen & Interaktive Erklärungen ⭐⭐

**ETA:** Q1 2027 (3-4 Wochen)
**Fokus:** Geld-Fluss wird "lebendig" - Kunde sieht die Automatik in Aktion

#### Features

**1.8.1: Animierte Geld-Flows** ⭐⭐ (Woche 1-2)

- [ ] **Flow-Partikel-System**
  - Kleine "Geld-Partikel" (💶) fließen entlang der Flows
  - Geschwindigkeit proportional zur Höhe des Betrags
  - Dezent, aber sichtbar → "Geld fließt automatisch"

- [ ] **Hover-Effekte auf Flows**
  - Hover: Flow wird heller, zeigt Details
  - Tooltip: "Dieser Flow transportiert monatlich X€"
  - Click: Detaillierte Aufschlüsselung

**1.8.2: Szenario-Simulation** ⭐ (Woche 2-3)

- [ ] **"Was passiert wenn..."-Modus**
  - Slider: "Einkommen -500€ diesen Monat"
  - Live-Animation: System reagiert automatisch
  - Zeigt: Tagesgeld wird angezapft, Depot bleibt unangetastet
  - Kunde **SIEHT** die Flexibilität

- [ ] **Engpass-Simulation**
  - Button: "Zeig mir einen schwierigen Monat"
  - Animation: Konsumkonto wird knapp → Tagesgeld springt ein
  - Text: "So reagiert Ihr System automatisch auf Engpässe"

---

### Version 1.9.0: Dual-Monitor-Support ⭐

**ETA:** Q1 2027 (2-3 Wochen)
**Fokus:** Berater-Monitor (mit Menü) + Kunden-Monitor (clean)

**Warum jetzt:** Kurz vor v2.0, für beste Präsentation

#### Features

**1.9.1: Presenter-View-Synchronisation** (Woche 1-2)

- [ ] **Dual-Monitor-Mode**
  - Button: "Presenter-View öffnen"
  - Monitor 1 (Berater): Alle Tools, Menü, Notizen sichtbar
  - Monitor 2 (Kunde): Clean View, nur Visualisierung
  - Live-Synchronisation: Änderungen sofort auf beiden Screens

- [ ] **Kunden-View-Optimierung**
  - Versteckt: Menü, Export-Buttons, Berater-Notizen
  - Zeigt: Nur Flows, Basins, Werte
  - Größere Schrift für bessere Lesbarkeit
  - Perfekt für Beamer/großen Monitor

**1.9.2: Synchronisations-Kontrolle** (Woche 2)

- [ ] **Lock/Unlock-Modus**
  - Berater kann Kunden-View "einfrieren"
  - Nützlich für Fotos/Screenshots
  - "Sync pausiert" - Indikator

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

**🎯 Ziel: Version 2.0.0 (Vermögensverzehr-Modus) bis Q1-Q2 2027**
**📅 Nächster Meilenstein: v1.3.0 (Export-Erweiterung) - Q4 2025 / Q1 2026**

**Langfristige Vision:**
- v1.x: Vermögensaufbau-Fokus (Erwerbstätige)
- v2.0: Vermögensverzehr-Modus (Pensionäre/Rentner)
- v3.0: Unified Platform (beide Modi, nahtloser Übergang)

---

*Letzte Aktualisierung: 23. Oktober 2025*
*Version: 2.2 (Roadmap - v2.0 Konzept: Vermögensverzehr-Modus)*

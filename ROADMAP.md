# 🗺️ Roadmap: Das strategische Vermögensmanagement

**Aktuelle Version:** 1.1.0
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

## 📊 Aktuelle Analyse (Version 1.1.0)

### Implementierte Features

#### Kern-Features (Beratungs-optimal)

- ✅ **Multi-Konto-Visualisierung**: 6 Basins mit animierten Flows
- ✅ **Zwei Varianten**: A (Fixkosten-first) & B (Konsum-first)
- ✅ **Beratungsmodus**: 6-Schritte-Prozess für strukturierte Gespräche
- ✅ **Immobilien-Management**: Vermögen, Verbindlichkeiten, Cashflow
- ✅ **Depot-Aufteilung**: Multi-Fonds/ETF mit Prozent-Allocation
- ✅ **Fixkosten-Verwaltung**: Flexible Posten (monatlich/jährlich)
- ✅ **Rendite-Prognose**: Chart.js-Visualisierung
- ✅ **Buchungsplaner**: Monatlicher Transaktions-Kalender
- ✅ **Theme-System**: Dark Mode & MLP Light Theme
- ✅ **Print-Funktion**: PDF-Export für Kundendokumentation

#### Datenhaltung (AKTUELL)

- ⚠️ **localStorage**: Persistiert über Sessions hinweg (problematisch!)
- ✅ Vorteil: Crash-Recovery funktioniert
- ❌ Nachteil: Daten bleiben dauerhaft gespeichert (Datenschutz!)

### Kritische Limitationen für Beratungs-Kontext

#### 1. Datenschutz-Problem: localStorage

**Problem:**

- Daten bleiben dauerhaft im Browser gespeichert
- Nächster Kunde könnte Vorherige Daten sehen
- DSGVO-Konflikt: Keine Einwilligung für dauerhafte Speicherung

**Lösung (v1.2.0):**

- Migration zu **sessionStorage** (nur während Tab/Session)
- **Auto-Clear** beim Schließen des Tabs
- **Manueller Reset-Button**: "Session beenden & Daten löschen"

#### 2. Fehlende Session-Verwaltung

**Problem:**

- Kein klarer Start/Ende einer Beratung
- Keine Session-Metadaten (Kundenkürzel, Datum)
- Keine Warnung bei verwaisten Daten

**Lösung (v1.2.0):**

- **Session-Start-Dialog**: "Neue Beratung beginnen"
- **Session-ID**: Automatische Generierung (Datum + Zufalls-ID)
- **Session-Info-Bar**: Zeigt Dauer und Kundenkürzel
- **Session-End-Prompt**: Bestätigung beim Schließen

#### 3. Export-Funktionalität zu basic

**Problem:**

- Nur PDF-Print, kein strukturierter CSV-Export
- Keine Metadaten im Export (Berater, Datum, Session-ID)
- Kein Export-Protokoll für Compliance

**Lösung (v1.3.0):**

- **CSV-Export**: Strukturierte Daten für CRM-Import
- **JSON-Export**: Vollständige Session-Daten
- **Excel-kompatibel**: UTF-8 BOM für deutsche Umlaute
- **Metadaten**: Automatische Kopfzeilen mit Session-Info

#### 4. Keine Mandanten-Trennung

**Problem:**

- Bei mehreren geöffneten Tabs werden Daten gemischt
- Kein Schutz vor versehentlichem Überschreiben

**Lösung (v1.4.0):**

- **Tab-Isolation**: Jeder Tab = eigene Session
- **Multi-Session-Warning**: Warnung bei mehreren aktiven Sessions
- **Session-Liste**: Übersicht aller offenen Beratungen

---

## 📅 Entwicklungs-Roadmap

### Version 1.2.0: Session-Management & Datenschutz

**ETA:** Q4 2025 (3-4 Wochen)
**Fokus:** DSGVO-konforme Session-Verwaltung & Crash-Resilienz

#### Features

**1.2.1: Session-Lifecycle-Management** (Woche 1)

- [ ] **Session-Start-Dialog**
  - Popup beim App-Start: "Neue Beratung beginnen"
  - Optionale Felder: Kundenkürzel (z.B. "MX-2025-001"), Notizen
  - Session-ID automatisch generiert: `YYYYMMDD-HHMM-XXXX`
  - Button: "Vorherige Session fortsetzen" (falls vorhanden)

- [ ] **Session-Info-Bar**
  - Sticky-Header: Zeigt Session-ID, Kundenkürzel, Dauer
  - Live-Timer: "Beratung läuft seit 23 Min."
  - Status-Indikator: "Ungespeichert" / "Exportiert"

- [ ] **Session-End-Dialog**
  - Beim Versuch, Tab zu schließen: Warnung
  - "Beratung beenden? Alle Daten werden gelöscht."
  - Buttons: "Abbrechen" / "Exportieren & Beenden" / "Ohne Export beenden"

**1.2.2: Datenhaltung-Migration** (Woche 2)

- [ ] **localStorage → sessionStorage Migration**
  - Alle bestehenden `localStorage.setItem()` → `sessionStorage.setItem()`
  - Daten werden automatisch beim Tab-Close gelöscht
  - Vorteil: Crash-Recovery bleibt erhalten (innerhalb Session)

- [ ] **Session-Recovery-Mechanismus**
  - Bei Reload/Crash: "Vorherige Beratung gefunden (vor 5 Min.)"
  - Button: "Fortsetzen" / "Neue Session starten"
  - Auto-Cleanup: Sessions älter als 24h werden verworfen

- [ ] **Manueller Reset-Button**
  - Prominent im UI: "Session beenden & Daten löschen"
  - Bestätigungs-Dialog mit Checkbox "Export erstellt?"
  - Nach Reset: Weiterleitung zu Session-Start-Dialog

**1.2.3: Erweiterte Export-Funktionen** (Woche 3)

- [ ] **CSV-Export für CRM-Integration**
  - Strukturierte Tabelle: Kategorie, Beschreibung, Betrag, Interval
  - Kopfzeile mit Session-Metadaten (Berater, Datum, Kunde)
  - UTF-8 BOM für Excel-Kompatibilität
  - Download-Dateiname: `Beratung_MX-2025-001_2025-10-20.csv`

- [ ] **JSON-Export (Vollständig)**
  - Alle Session-Daten als strukturiertes JSON
  - Verwendung: Backup, Re-Import, Automatisierung
  - Pretty-Print für menschliche Lesbarkeit

- [ ] **PDF-Export-Verbesserungen**
  - Session-Metadaten im Header (Berater, Datum, Kunde)
  - Footer: "Exportiert am [Datum] um [Uhrzeit]"
  - Optional: Berater-Logo/Signatur

**1.2.4: Datenschutz & Compliance** (Woche 4)

- [ ] **Daten-Löschung-Protokoll**
  - Console-Log: "Session [ID] gelöscht am [Timestamp]"
  - Optional: Export-Protokoll (wann wurde exportiert?)

- [ ] **Datenschutz-Hinweis**
  - Beim ersten Start: Info-Modal
  - "Alle Daten werden nur temporär gespeichert und beim Schließen gelöscht."
  - Checkbox: "Verstanden, nicht erneut anzeigen"

- [ ] **Inaktivitäts-Warnung**
  - Nach 30 Min. Inaktivität: Toast-Notification
  - "Beratung noch aktiv? Daten werden bei Inaktivität nach 60 Min. gelöscht."
  - Button: "Ich bin noch da"

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

### Version 1.3.0: Immobilien-Cashflow-Integration

**ETA:** Q1 2026 (4-6 Wochen)
**Fokus:** Live-Visualisierung von Immobilien-Cashflows im Beratungsgespräch

#### Features

**1.3.1: Cashflow-Toggle im Beratungsgespräch** (Woche 1-2)

- [ ] **Immobilien-Modal: Toggle "Flows aktivieren"**
  - Checkbox: "Cashflows ins Gesamtsystem integrieren"
  - Live-Preview: Zeigt Auswirkung auf Einkommen/Fixkosten
  - Tooltip: "Aktivieren, um dem Kunden die Auswirkungen zu zeigen"

- [ ] **Live-Update der Basins**
  - Einkommen-Basin: +X€ durch Mieteinnahmen
  - Fixkosten-Basin: +Y€ durch Darlehen/Kosten
  - Sparrate: Automatische Neuberechnung

**1.3.2: Flow-Visualisierung** (Woche 2-3)

- [ ] **Grüner Flow: Immobilien → Einkommen**
  - Mieteinnahmen als dicker grüner Pfeil
  - Label: "Mieteinnahmen +1.250€"
  - Animation: Fließt elegant nach oben

- [ ] **Roter Flow: Fixkosten → Immobilien**
  - Ausgaben als gestrichelter roter Pfeil
  - Label: "Darlehen & Kosten -1.330€"
  - Tooltip: "Davon 100€ Tilgung = Vermögensaufbau"

**1.3.3: Beratungs-Szenarien** (Woche 3-4)

- [ ] **Szenario-Vergleich**
  - Button: "Was wäre wenn... Immobilie abbezahlt?"
  - Side-by-Side: Aktuell vs. Szenario
  - Highlight: Unterschiede in Cashflow/Sparrate

- [ ] **Quick-Szenarien**
  - "Immobilie verkaufen" (Einmalzahlung ins Depot)
  - "Immobilie vermieten statt selbst nutzen"
  - "Zweite Immobilie kaufen"

**1.3.4: Export-Erweiterung** (Woche 4)

- [ ] **Immobilien-Sektion im PDF**
  - Übersicht: Vermögen, Verbindlichkeiten, Cashflow
  - Tabelle: Einnahmen & Ausgaben detailliert
  - Berechnung: Nettovermögen, ROI, Tilgungsplan

---

### Version 1.4.0: Multi-Client-Session-Management

**ETA:** Q2 2026 (4-5 Wochen)
**Fokus:** Mehrere parallele Beratungen, Session-Isolation

#### Features

**1.4.1: Multi-Tab-Support** (Woche 1-2)

- [ ] **Tab-Isolation**
  - Jeder Tab = eigene Session mit eigenem sessionStorage-Namespace
  - Eindeutige Tab-ID in URL-Parameter: `?session=ABC123`
  - Keine Daten-Überschneidungen zwischen Tabs

- [ ] **Session-Übersicht**
  - Landing-Page: Liste aller offenen Sessions
  - Karten: Session-ID, Kundenkürzel, Dauer, Status
  - Actions: "Fortsetzen" / "Export" / "Löschen"

**1.4.2: Quick-Session-Switch** (Woche 2-3)

- [ ] **Session-Switcher im UI**
  - Dropdown in Session-Info-Bar
  - Schnelles Wechseln zwischen parallelen Beratungen
  - Warnung: "Ungespeicherte Änderungen in Session XYZ"

**1.4.3: Template-System** (Woche 3-4)

- [ ] **Beratungs-Templates**
  - Vordefinierte Szenarien: "Gutverdiener", "Familie", "Rentner"
  - Schnellstart mit typischen Werten
  - Anpassbar im Gespräch

- [ ] **Template-Export**
  - Erfolgreiche Beratung als Template speichern
  - Wiederverwendbar für ähnliche Kunden
  - Anonymisiert (nur Struktur, keine echten Daten)

---

### Version 1.5.0: Erweiterte Export-Formate & Berater-Tools

**ETA:** Q3 2026 (5-6 Wochen)
**Fokus:** CRM-Integration, Automatisierung, Berater-Produktivität

#### Features

**1.5.1: Excel-Export mit Formeln** (Woche 1-2)

- [ ] **Multi-Sheet-Workbook**
  - Sheet 1: Übersicht (Dashboard)
  - Sheet 2: Einnahmen & Ausgaben (Detailliert)
  - Sheet 3: Immobilien-Analyse
  - Sheet 4: Depot-Aufteilung
  - Sheet 5: Prognose (10 Jahre)

- [ ] **Live-Formeln**
  - Excel-Formeln statt statische Werte
  - Kunde kann später selbst anpassen
  - Conditional Formatting für Warnungen

**1.5.2: CRM-Integration (API-Vorbereitung)** (Woche 2-3)

- [ ] **Standardisierte JSON-Struktur**
  - Schema-Definition für externe Systeme
  - Mapping-Dokumentation
  - Validierung vor Export

- [ ] **Webhook-Support (optional)**
  - POST-Request nach Export
  - Direkt ins CRM-System
  - Authentifizierung (API-Key)

**1.5.3: Berater-Notizen & Annotations** (Woche 3-4)

- [ ] **Notizen-Feld**
  - Pro Basin: Freitext-Notizen
  - Erscheint im PDF-Export
  - Nicht sichtbar in Live-Ansicht (nur Berater)

- [ ] **Screenshots & Markierungen**
  - Tool: Flows markieren & annotieren
  - Erscheint im PDF als "Empfehlung"
  - Icons: ⚠️ Warnung, ✅ Optimierung, 💡 Idee

**1.5.4: Berater-Dashboard** (Woche 4-5)

- [ ] **Session-Statistiken**
  - Anzahl Beratungen heute/Woche/Monat
  - Durchschnittliche Dauer
  - Häufigste Export-Formate

- [ ] **Quick-Actions**
  - "Letzte Session fortsetzen"
  - "Template laden"
  - "Neue Beratung mit Standardwerten"

---

### Version 1.6.0: Präsentations-Modus & UX-Polish

**ETA:** Q4 2026 (4-5 Wochen)
**Fokus:** Optimierung für Bildschirm-Sharing & Kundenpräsentation

#### Features

**1.6.1: Presenter-Mode** (Woche 1-2)

- [ ] **Vollbild-Modus**
  - F11-ähnlich, aber mit Controls
  - Versteckt Berater-Tools (Notizen, Export)
  - Fokus auf Visualisierung

- [ ] **Highlight-Modus**
  - Click auf Basin: Spot-Light-Effekt
  - Temporäres Dimmen anderer Elemente
  - Gut für Bildschirm-Sharing

**1.6.2: Animierte Transitionen** (Woche 2-3)

- [ ] **Smooth Beratungsmodus-Steps**
  - Fade-In/Out statt hartes Show/Hide
  - Highlight: "Hier erscheint jetzt..."
  - Flow-Animation beim Aktivieren

**1.6.3: Kunden-Verständnis-Features** (Woche 3-4)

- [ ] **Tooltip-System**
  - Hover auf Basin: Erklärung
  - "Was ist ein Tagesgeldkonto?"
  - "Warum Sparrate wichtig ist"

- [ ] **Info-Overlays**
  - Click auf "?" neben Titel
  - Modal: Ausführliche Erklärung
  - Schließbar, non-modal

**1.6.4: Dark/Light-Theme für Präsentationen** (Woche 4)

- [ ] **Auto-Theme basierend auf Umgebung**
  - Hell: Für Räume mit viel Licht
  - Dunkel: Für gedämpfte Beratungsräume

---

### Version 2.0.0: Enterprise-Berater-Platform

**ETA:** Q1 2027 (12-14 Wochen)
**Fokus:** Skalierung, White-Label, Multi-Mandanten

#### Features

**2.0.1: Mandanten-System** (Woche 1-4)

- [ ] **Multi-Berater-Support**
  - Jeder Berater: eigenes Login
  - Eigene Session-Historie
  - Keine Daten-Vermischung

- [ ] **Berater-Profile**
  - Name, Logo, Signatur
  - Erscheint in PDFs
  - Customization pro Berater

**2.0.2: White-Label für MLP-Partner** (Woche 4-6)

- [ ] **Branding-Anpassung**
  - Eigenes Logo, Farben
  - Custom Domain (z.B. finanzplanung.berater-mueller.de)
  - Eigene Texte/Disclaimer

**2.0.3: Offline-Modus** (Woche 6-8)

- [ ] **PWA (Progressive Web App)**
  - Installierbar auf Desktop
  - Funktioniert ohne Internet
  - Service-Worker für Caching

- [ ] **Offline-Export-Queue**
  - Exports werden gespeichert
  - Bei Internet-Rückkehr: Auto-Upload

**2.0.4: Analytics für Berater-Leitung** (Woche 8-10)

- [ ] **Aggregierte Statistiken (Anonymisiert)**
  - Durchschnittliche Beratungsdauer
  - Häufigste Optimierungen
  - Depot-Allocation-Trends

**2.0.5: React/TypeScript-Migration** (Woche 10-14)

- [ ] **Moderne Architektur**
  - Component-basiert
  - Type-Safety
  - Unit-Tests (80% Coverage)

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

## 🚀 Quick Wins (Nächste 2-4 Wochen)

### Prio 1: Session-Management-MVP

- [ ] localStorage → sessionStorage Migration (2h)
- [ ] Session-Start-Dialog (4h)
- [ ] Manueller "Session beenden"-Button (2h)
- [ ] beforeunload-Warnung (1h)

### Prio 2: CSV-Export

- [ ] CSV-Export-Funktion (6h)
- [ ] UTF-8 BOM für Excel (1h)
- [ ] Session-Metadaten im Header (2h)

### Prio 3: UX-Verbesserungen

- [ ] Session-Info-Bar (Sticky Header) (4h)
- [ ] Timer "Beratung läuft seit..." (2h)
- [ ] Export-Status-Indikator (2h)

**Gesamtaufwand:** ~26 Stunden (ca. 1 Woche)

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

**🎯 Ziel: Version 2.0.0 bis Q1 2027**
**📅 Nächster Meilenstein: v1.2.0 (Session-Management) - Q4 2025**

---

*Letzte Aktualisierung: Oktober 2025*
*Version: 2.0 (Roadmap - Beratungs-Fokus)*

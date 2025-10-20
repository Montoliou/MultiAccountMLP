# 🗺️ Roadmap: Das strategische Vermögensmanagement

**Aktuelle Version:** 1.1.0
**Ziel-Version:** 2.0.0
**Datum:** Oktober 2025

---

## 📊 Aktuelle Analyse (Version 1.1.0)

### ✅ Implementierte Features

#### **Kern-Features:**
- ✅ **Multi-Konto-System**: Einkommen, Fixkosten, Konsum, Tagesgeld, Depot, Immobilien
- ✅ **Interaktive SVG-Flows**: Animierte Geldflüsse zwischen Basins
- ✅ **Zwei Varianten**: A (Fixkosten-first) & B (Konsum-first)
- ✅ **Beratungsmodus**: 6-Schritte-Prozess für Beratungsgespräche
- ✅ **Immobilien-Management**: Vermögen, Verbindlichkeiten, Einnahmen, Ausgaben
- ✅ **Depot-Aufteilung**: Multi-Fonds/ETF-Verwaltung mit Prozent-Allocation
- ✅ **Fixkosten-Verwaltung**: Flexible Posten mit monatlich/jährlich
- ✅ **Rendite-Prognose**: Chart.js-basierte Visualisierung mit historischen Daten
- ✅ **Buchungsplaner**: Kalender für tägliche Transaktionen
- ✅ **Theme-System**: Dark Mode & MLP Light Theme
- ✅ **Print-Funktion**: Export als PDF-Report
- ✅ **localStorage**: Persistente Datenspeicherung

#### **Technische Infrastruktur:**
- ✅ Single-Page-Application (2660 Zeilen)
- ✅ Tailwind CSS + Custom Styling
- ✅ Chart.js für Diagramme
- ✅ Accessibility (ARIA-Labels, Keyboard-Navigation)
- ✅ Responsive Design
- ✅ 81+ JavaScript-Funktionen

### 🔴 Aktuelle Limitationen

#### **1. Immobilien-Cashflow nicht integriert**
- Immobilien-Basin ist isoliert
- Mieteinnahmen fließen nicht ins System
- Ausgaben (Darlehen, Instandhaltung) werden nicht berücksichtigt
- Keine Verbindung zu anderen Basins

#### **2. Datenmodell-Einschränkungen**
- Nur eine Immobilie möglich
- Keine historische Daten-Verfolgung
- Keine Szenarien-Vergleiche
- localStorage kann gelöscht werden

#### **3. UX-Verbesserungspotenzial**
- Keine Onboarding-Tour
- Keine Tooltips/Hilfe-Texte
- Kein Undo/Redo
- Keine Export-Formate außer Print

#### **4. Fehlende Analyse-Features**
- Keine Cashflow-Analyse über Zeit
- Keine Budget-Warnungen
- Keine Optimierungsvorschläge
- Keine Vergleichswerte/Benchmarks

---

## 🎯 Vision für Version 2.0

**Leitmotiv:** "Von isolierten Basins zu einem integrierten Finanz-Ökosystem"

### **Kernziele:**
1. **Vollständige Cashflow-Integration** aller Einkommens- und Ausgabenquellen
2. **Multi-Asset-Management** (mehrere Immobilien, Depots, etc.)
3. **Zeitbasierte Analyse** mit historischen Daten & Prognosen
4. **Intelligente Assistenz** mit Optimierungsvorschlägen
5. **Export & Sharing** für Berater und Kunden

---

## 📅 Entwicklungs-Roadmap

### **Version 1.2.0: Immobilien-Cashflow-Integration**
**ETA:** Q4 2025 (4-6 Wochen)
**Fokus:** Integration der Immobilien-Cashflows ins Gesamtsystem

#### **Features:**

**1.2.1: Einnahmen-Integration** (Woche 1-2)
- [ ] Mieteinnahmen fließen automatisch ins Einkommen-Basin
- [ ] Neuer Flow: `Immobilien → Einkommen` (monatlich)
- [ ] Sonstige Einnahmen (Stellplatz) ebenfalls integriert
- [ ] Toggle: "Immobilien-Einnahmen aktivieren/deaktivieren"

**1.2.2: Ausgaben-Integration** (Woche 2-3)
- [ ] Darlehensrate wird von Fixkosten abgezogen
- [ ] Instandhaltung als Fixkosten-Posten
- [ ] Steuern & Nebenkosten als Fixkosten-Posten
- [ ] Automatische Synchronisation mit Fixkosten-Modal

**1.2.3: Flow-Visualisierung** (Woche 3-4)
- [ ] Neuer Flow: `Immobilien → Einkommen` (grüner Pfeil)
- [ ] Gestrichelter Flow: `Fixkosten → Immobilien` (Ausgaben, roter Pfeil)
- [ ] Nettoberechnung im Immobilien-Basin
- [ ] Hover-Info: "Netto-Cashflow nach Ausgaben"

**1.2.4: Beratungsmodus-Erweiterung** (Woche 4)
- [ ] Step 6: Immobilien-Einnahmen werden sichtbar
- [ ] Erklärung: "Passive Einkommensströme"
- [ ] Optional: Immobilien-Ausgaben-Overlay

#### **Technische Umsetzung:**

```javascript
// Neue Datenstruktur
immobilienData = {
  wert: 350000,
  darlehen: 250000,
  miete: 1200,
  sonstigeEinnahmen: 50,
  rate: 1100,
  instandhaltung: 150,
  steuern: 80,
  // NEU:
  cashflowAktiv: true,  // Toggle für Integration
  einnahmenZiel: 'einkommen',  // Wohin fließen Einnahmen?
  ausgabenZiel: 'fixkosten'    // Woher werden Ausgaben gezogen?
}

// Berechnung in calculateAndUpdate()
const immoEinnahmen = immobilienData.cashflowAktiv
  ? (immobilienData.miete + immobilienData.sonstigeEinnahmen)
  : 0;

const immoAusgaben = immobilienData.cashflowAktiv
  ? (immobilienData.rate + immobilienData.instandhaltung + immobilienData.steuern)
  : 0;

// Zu Einkommen addieren
const totalIncome = income + immoEinnahmen;

// Zu Fixkosten addieren
const totalAbgang = totalFixkosten + immoAusgaben;
```

#### **UX-Verbesserungen:**
- [ ] Checkbox im Immobilien-Modal: "Cashflows ins System integrieren"
- [ ] Visuelles Feedback: Grüner/roter Indikator bei aktiver Integration
- [ ] Tooltip: "Einnahmen fließen automatisch ins Einkommen"

---

### **Version 1.3.0: Multi-Asset-Management**
**ETA:** Q1 2026 (6-8 Wochen)
**Fokus:** Mehrere Immobilien, Depots, Konten verwalten

#### **Features:**

**1.3.1: Multi-Immobilien** (Woche 1-3)
- [ ] Liste von Immobilien statt einzelnem Objekt
- [ ] Immobilien-Tabelle mit Add/Edit/Delete
- [ ] Gesamtansicht: Aggregierte Werte im Basin
- [ ] Detail-Modal: Einzelne Immobilie bearbeiten
- [ ] Kategorien: "Eigengenutzt", "Vermietet", "Gewerbe"

**1.3.2: Multi-Depot** (Woche 3-4)
- [ ] Mehrere Depots (z.B. "ETF-Depot", "Riester", "Betriebliche AV")
- [ ] Depot-Auswahl im Modal
- [ ] Aggregierte Darstellung im Basin
- [ ] Unterschiedliche Renditen pro Depot

**1.3.3: Zusätzliche Einkommensquellen** (Woche 4-5)
- [ ] Nebeneinkommen (Freelance, Dividenden, etc.)
- [ ] Passive Einkommensströme
- [ ] Getrennte Flows für verschiedene Quellen

**1.3.4: Ausgaben-Kategorien** (Woche 5-6)
- [ ] Fixkosten-Kategorien (Wohnen, Mobilität, Versicherungen)
- [ ] Konsum-Kategorien (Lebensmittel, Freizeit, Shopping)
- [ ] Pie-Chart-Visualisierung

#### **Datenmodell:**

```javascript
assets = {
  immobilien: [
    { id: 1, name: "Wohnung Berlin", wert: 350000, ... },
    { id: 2, name: "Ferienhaus Ostsee", wert: 180000, ... }
  ],
  depots: [
    { id: 1, name: "ETF-Depot", current: 25000, allocation: [...] },
    { id: 2, name: "Riester", current: 12000, ... }
  ],
  einkommensquellen: [
    { id: 1, name: "Hauptgehalt", amount: 3000, interval: 'monthly' },
    { id: 2, name: "Freelance", amount: 800, interval: 'monthly' }
  ]
}
```

---

### **Version 1.4.0: Zeitbasierte Analyse**
**ETA:** Q2 2026 (8-10 Wochen)
**Fokus:** Historische Daten, Trends, Prognosen

#### **Features:**

**1.4.1: Daten-Historie** (Woche 1-3)
- [ ] Monatliche Snapshots (letztes Jahr)
- [ ] Zeitstrahl-Visualisierung
- [ ] Vergleich: "Vormonat", "Vorjahr"
- [ ] Export: CSV, JSON

**1.4.2: Trend-Analyse** (Woche 3-5)
- [ ] Sparklines für Konten-Entwicklung
- [ ] Cashflow-Trends (aufwärts/abwärts)
- [ ] Automatische Mustererkennung

**1.4.3: Erweiterte Prognosen** (Woche 5-7)
- [ ] 5-Jahres-Prognose mit Szenarien
- [ ] Monte-Carlo-Simulation
- [ ] "Was-wäre-wenn"-Rechner
- [ ] Inflationsanpassung

**1.4.4: Dashboard** (Woche 7-8)
- [ ] Übersichtsseite mit KPIs
- [ ] Sparquote-Tracking
- [ ] Vermögensaufbau-Verlauf
- [ ] Ziel-Tracking (z.B. "1 Mio. in 20 Jahren")

#### **Backend-Überlegung:**
- **Optional:** Firebase/Supabase für Cloud-Sync
- **Alternative:** IndexedDB für lokale Datenbank
- **Export:** JSON-Download für Backup

---

### **Version 1.5.0: Intelligente Assistenz**
**ETA:** Q3 2026 (6-8 Wochen)
**Fokus:** Optimierungsvorschläge, Warnungen, Insights

#### **Features:**

**1.5.1: Budget-Überwachung** (Woche 1-2)
- [ ] Warnungen bei Überschreitung
- [ ] Notifications: "Konsumkonto über Minimum"
- [ ] Farbcodierung: Rot/Gelb/Grün

**1.5.2: Optimierungsvorschläge** (Woche 2-4)
- [ ] "Sparrate um X€ erhöhen → +Y€ in 10 Jahren"
- [ ] "Fixkosten-Optimierung: -150€/Monat möglich"
- [ ] "Tagesgeld-Limit zu niedrig: +500€ empfohlen"

**1.5.3: Benchmarking** (Woche 4-5)
- [ ] Vergleichswerte: "Durchschnitt in deiner Altersgruppe"
- [ ] Sparquote-Benchmarks
- [ ] Depot-Diversifikation-Score

**1.5.4: Szenarien-Planer** (Woche 5-6)
- [ ] "Jobwechsel: -500€ Einkommen"
- [ ] "Immobilienkauf: +1000€ Darlehen"
- [ ] "Renteneintritt: -70% Einkommen"

---

### **Version 1.6.0: Export & Sharing**
**ETA:** Q4 2026 (4-6 Wochen)
**Fokus:** Berater-Integration, Sharing, Export

#### **Features:**

**1.6.1: PDF-Export 2.0** (Woche 1-2)
- [ ] Professionelles Layout (Multi-Page)
- [ ] Alle Diagramme eingebettet
- [ ] Tabellen mit Detaildaten
- [ ] Branding-Option (Logo, Farben)

**1.6.2: Excel-Export** (Woche 2-3)
- [ ] Multi-Sheet: Übersicht, Cashflow, Prognose, Immobilien
- [ ] Formeln für Berechnungen
- [ ] Pivot-Tabellen

**1.6.3: Berater-Modus** (Woche 3-4)
- [ ] QR-Code für Kunden-Link
- [ ] Read-Only-Ansicht mit Kommentaren
- [ ] Vergleich: Aktuell vs. Empfehlung

**1.6.4: Cloud-Sync (Optional)** (Woche 4-6)
- [ ] Multi-Device-Sync
- [ ] Versionierung
- [ ] Sharing mit Berater

---

### **Version 2.0.0: Enterprise-Reife**
**ETA:** Q1 2027 (12-16 Wochen)
**Fokus:** Architektur-Refactoring, Performance, Skalierung

#### **Features:**

**2.0.1: Architektur-Refactoring** (Woche 1-6)
- [ ] Migration zu **React** oder **Vue.js**
- [ ] Component-basierte Architektur
- [ ] State-Management (Zustand/Pinia)
- [ ] TypeScript für Type-Safety
- [ ] Unit-Tests (Jest/Vitest)

**2.0.2: Design-System** (Woche 6-8)
- [ ] Component-Library (Storybook)
- [ ] Konsistente UI-Patterns
- [ ] Accessibility-Audit
- [ ] Mobile-First Responsive

**2.0.3: Performance** (Woche 8-10)
- [ ] Code-Splitting
- [ ] Lazy-Loading
- [ ] WebWorkers für Berechnungen
- [ ] IndexedDB statt localStorage

**2.0.4: API-Integration** (Woche 10-12)
- [ ] REST-API für Backend
- [ ] Echtzeit-Kurse (Depot)
- [ ] Bank-API-Integration (optional)
- [ ] Steuer-API (Automatische Berechnung)

**2.0.5: Enterprise-Features** (Woche 12-14)
- [ ] Multi-User (Familien-Accounts)
- [ ] Rollen & Berechtigungen
- [ ] Audit-Log
- [ ] DSGVO-Compliance

**2.0.6: White-Label** (Woche 14-16)
- [ ] Vollständige Customization
- [ ] Eigenes Branding
- [ ] Plugin-System
- [ ] API für Drittanbieter

---

## 🏗️ Spezial-Fokus: Immobilien-Cashflow-Integration (v1.2.0)

### **Konzept: Bidirektionale Flows**

#### **Szenario 1: Vermietete Immobilie (Positiver Cashflow)**

**Setup:**
- Immobilienwert: 350.000€
- Restdarlehen: 250.000€
- **Einnahmen:** 1.200€ Miete + 50€ Stellplatz = **1.250€/Monat**
- **Ausgaben:** 1.100€ Rate + 150€ Instandhaltung + 80€ Steuern = **1.330€/Monat**
- **Netto-Cashflow:** **-80€/Monat** (negativ, aber Vermögensaufbau!)

**Flow-Visualisierung:**
```
[Immobilien] --+1.250€--> [Einkommen]  (grüner Flow)
[Fixkosten] --1.330€--> [Immobilien]   (roter gestrichelter Flow)

Netto im Immobilien-Basin: -80€/Monat
Aber: +100€ Tilgung = Vermögensaufbau!
```

**UX-Features:**
- Tooltip auf Immobilien-Basin: "Cashflow: -80€, aber +100€ Tilgung = Vermögen steigt"
- Toggle im Modal: "Cashflow-Integration aktivieren"
- Farbcodierung: Rot (negativ) mit Info-Icon

#### **Szenario 2: Abbezahlte Immobilie (Hoher positiver Cashflow)**

**Setup:**
- Immobilienwert: 350.000€
- Restdarlehen: **0€** (abbezahlt!)
- **Einnahmen:** 1.250€/Monat
- **Ausgaben:** 150€ Instandhaltung + 80€ Steuern = **230€/Monat**
- **Netto-Cashflow:** **+1.020€/Monat** 🎉

**Flow-Visualisierung:**
```
[Immobilien] --+1.020€--> [Einkommen]  (dicker grüner Flow)

Einkommen steigt von 3.000€ auf 4.020€
Sparrate kann massiv erhöht werden!
```

**UX-Features:**
- Achievement-Badge: "Passives Einkommen freigeschaltet! 🏆"
- Highlight-Animation beim ersten Mal
- Automatische Prognose-Anpassung

#### **Szenario 3: Eigengenutzte Immobilie**

**Setup:**
- Keine Mieteinnahmen
- Nur Ausgaben (Darlehen, Instandhaltung)
- **Cashflow-Integration:** Optional (Nutzer entscheidet)

**Flow-Visualisierung:**
```
[Fixkosten] --1.330€--> [Immobilien]   (roter Flow)

Fixkosten steigen, aber keine Einnahmen
Alternative: "Gesparte Miete" als virtuelles Einkommen?
```

**UX-Features:**
- Checkbox: "Eigengenutzt (keine Mieteinnahmen)"
- Optional: "Gesparte Miete" als positiver Cashflow anzeigen
- Vergleich: "Miete vs. Eigentum"

### **Technische Implementierung (v1.2.0)**

#### **Neue Funktionen:**

```javascript
// 1. Berechnung Immobilien-Cashflow
function calculateImmobilienCashflow() {
  if (!immobilienData.cashflowAktiv) return { einnahmen: 0, ausgaben: 0 };

  const einnahmen = immobilienData.miete + immobilienData.sonstigeEinnahmen;
  const ausgaben = immobilienData.rate + immobilienData.instandhaltung + immobilienData.steuern;

  return {
    einnahmen,
    ausgaben,
    netto: einnahmen - ausgaben,
    tilgung: calculateTilgung(immobilienData.rate, immobilienData.zinssatz)
  };
}

// 2. Integration in calculateAndUpdate()
function calculateAndUpdate() {
  // ... bestehender Code ...

  const immoCF = calculateImmobilienCashflow();

  // Einnahmen zu Einkommen addieren
  const totalIncome = income + immoCF.einnahmen;

  // Ausgaben zu Fixkosten addieren
  const totalAbgang = calculateTotalAbgang() + immoCF.ausgaben;

  // Flows zeichnen
  if (immoCF.einnahmen > 0) {
    drawFlow('immobilien-einkommen-flow', basins.immobilien, basins.einkommen,
             immoCF.einnahmen, maxFlow, 'Mieteinnahmen');
  }

  if (immoCF.ausgaben > 0) {
    drawFlow('fixkosten-immobilien-flow', basins.fixkosten, basins.immobilien,
             immoCF.ausgaben, maxFlow, 'Darlehen & Kosten');
  }

  // ... Rest der Berechnung ...
}

// 3. Immobilien-Basin Update
renderBasin(
  basins.immobilien,
  'Immobilien',
  formatCurrency(immoNettovermoegen),
  '',
  `Cashflow: ${formatCurrency(immoCF.netto)} / Monat ${
    immoCF.tilgung > 0 ? `(+${formatCurrency(immoCF.tilgung)} Tilgung)` : ''
  }`,
  {},
  createHouseSVG()
);
```

#### **UI-Erweiterungen im Modal:**

```html
<!-- Im Immobilien-Modal nach der Zusammenfassung: -->
<div class="mt-6 bg-gray-900 p-4 rounded-lg border-2 border-blue-500">
  <div class="flex items-center gap-3 mb-3">
    <input
      type="checkbox"
      id="immo-cashflow-aktiv"
      class="w-5 h-5"
      onchange="toggleImmobilienCashflow(this.checked)">
    <label for="immo-cashflow-aktiv" class="font-bold text-white">
      Cashflows ins Gesamtsystem integrieren
    </label>
  </div>

  <p class="text-sm text-gray-400">
    Aktiviere diese Option, um Mieteinnahmen automatisch ins Einkommen
    fließen zu lassen und Ausgaben von den Fixkosten abzuziehen.
  </p>

  <div id="cashflow-preview" class="mt-3 p-3 bg-gray-800 rounded hidden">
    <p class="text-xs text-gray-400 mb-2">Vorschau:</p>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div>
        <span class="text-green-400">↑ Einkommen:</span>
        <span class="font-bold">+1.250€</span>
      </div>
      <div>
        <span class="text-red-400">↑ Fixkosten:</span>
        <span class="font-bold">+1.330€</span>
      </div>
    </div>
  </div>
</div>
```

---

## 🎨 Design-Prinzipien für v2.0

### **1. Progressive Disclosure**
- Einfacher Einstieg, komplexe Features optional
- Tooltips & Onboarding-Tour
- "Experten-Modus" für Power-User

### **2. Visual Hierarchy**
- Primäre Flows (Einkommen → Depot) dick und prominent
- Sekundäre Flows (Immobilien) dünner, gestrichelt
- Farbcodierung: Grün (Einnahmen), Rot (Ausgaben), Blau (Transfers)

### **3. Data-Driven Insights**
- Automatische Erkennung von Optimierungspotenzial
- Proaktive Vorschläge statt nur Anzeige
- Gamification: Achievements, Meilensteine

### **4. Accessibility First**
- WCAG 2.1 AAA-Standard
- Screen-Reader-optimiert
- Keyboard-Navigation für alle Features

---

## 📈 Metriken & KPIs für v2.0

### **Performance-Ziele:**
- [ ] Initiales Laden: < 2s
- [ ] Interaktionszeit: < 100ms
- [ ] Lighthouse-Score: > 95

### **UX-Metriken:**
- [ ] Onboarding-Completion: > 80%
- [ ] Feature-Adoption (Immobilien): > 40%
- [ ] User-Retention (30 Tage): > 60%

### **Code-Qualität:**
- [ ] Test-Coverage: > 80%
- [ ] TypeScript-Migration: 100%
- [ ] Bundle-Size: < 500KB (gzip)

---

## 🚀 Quick Wins (Nächste 2 Wochen)

**Prio 1: Immobilien-Cashflow (v1.2.0-alpha)**
1. Checkbox "Cashflow aktivieren" im Modal
2. Einfache Addition zu Einkommen/Fixkosten
3. Grüner/roter Flow ohne Animation (MVP)

**Prio 2: UX-Polishing**
1. Tooltips für alle Basins
2. Hilfe-Icon mit Erklärungen
3. Keyboard-Shortcuts (ESC für Modal-Close)

**Prio 3: Bugfixes & Stabilität**
1. localStorage-Fallback bei Quota-Exceeded
2. Mobile-Responsive-Tests
3. Browser-Compatibility (Firefox, Safari)

---

## 🤝 Mitwirkende & Feedback

**Entwicklung:** Claude Code (AI-Assistant)
**Konzept:** MLP-Strategie & Beratungsansatz
**Feedback:** Issues auf GitHub willkommen!

**Kontakt für Roadmap-Diskussion:**
[GitHub Issues](https://github.com/your-repo/issues) | [Discussions](https://github.com/your-repo/discussions)

---

## 📝 Changelog (Historie)

### v1.1.0 (Oktober 2025)
- ✅ Immobilien-Basin mit Vermögensverwaltung
- ✅ Optimierte Basin-Positionierung (Depot/Immobilien-Tausch)
- ✅ Beratungsmodus Step 6 (Immobilien)
- ✅ Häuschen-SVG-Design

### v1.0.0 (September 2025)
- ✅ Basis-System mit 5 Basins
- ✅ SVG-Flow-Animation
- ✅ Varianten A & B
- ✅ Beratungsmodus (5 Steps)
- ✅ Rendite-Prognose
- ✅ Theme-System
- ✅ Print-Funktion

---

**🎯 Ziel: Version 2.0.0 bis Q1 2027**
**📅 Nächster Meilenstein: v1.2.0 (Immobilien-Cashflow) - Q4 2025**

---

*Letzte Aktualisierung: Oktober 2025*
*Version: 1.0 (Roadmap)*

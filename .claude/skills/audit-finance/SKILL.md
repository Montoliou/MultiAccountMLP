---
name: audit-finance
description: Audit the financial calculation pipeline, formulas, variable usage, and code hygiene in the MultiAccountMLP app. Checks for correctness, redundancy, zero-masking bugs, scope issues, and const/let misuse.
---

# Financial Audit Skill — MultiAccountMLP

Systematisches Audit der Finanzmathematik und Code-Qualität. Prüft Formeln, Variablen, Redundanzen und typische JS-Fehler.

## Wann aufrufen

- Nach Änderungen an `calculateFinancialData()`, `calculateAndUpdate()`, oder Basin-Rendering
- Nach neuen Fixkosten/Depot-Items oder Intervall-Logik
- Bei Verdacht auf Rechenfehler oder inkonsistente Werte
- Regelmäßig als Code-Hygiene-Check

## Audit-Checkliste

### 1. Kaskaden-Logik (Kern-Pipeline)

Die Kaskade muss in BEIDEN Varianten korrekt sein:

**Variante A (Fixkosten-first):**
```
Einkommen → Fixkosten → Konsum → Tagesgeld → Depot
totalAbgang = fixkostenTotal + depotSparplanTotal
konsumInflow = Math.max(0, income - totalAbgang)
```

**Variante B (Konsum-first):**
```
Einkommen → Konsum → Fixkosten → Tagesgeld → Depot
konsumInflow = Math.max(0, income)  [direkt]
```

**Prüfpunkte:**
- [ ] `calculateFinancialData()` (~Zeile 7988): Summiert sich alles korrekt auf?
- [ ] Vermieterkonto-Saldo: Wird negativer Saldo korrekt zu Fixkosten addiert (Variante A) bzw. abgezogen (Variante B)?
- [ ] `calculateOverflow()` (~Zeile 8534): Tagesgeld-Limit-Logik korrekt? Overflow geht zu Depot?
- [ ] `konsumLeftover` wird korrekt als Sparrate weiterverarbeitet?
- [ ] Kein Geld "verschwindet" — Einkommen = Summe aller Abflüsse + Reste

### 2. Formel-Korrektheit

**Zinseszins** (`calculateCompoundInterest`, ~Zeile 8388):
- [ ] Monatliche Verzinsung: `monthlyRate = annualRate / 12`
- [ ] Formel: `totalCapital = totalCapital * (1 + monthlyRate) + monthly`
- [ ] Beiträge werden VOR der Verzinsung addiert (End-of-Period) oder NACH (Begin-of-Period)?
- [ ] Jahres-Labels korrekt generiert?

**Anleihen-Bewertung** (`calculateBondPrice`, ~Zeile 10250):
- [ ] PV = Σ(Kupon/(1+r)^t) + 100/(1+r)^n — Standard-Formel?
- [ ] `kuponRate` ist als Prozent oder Dezimal? Konsistent?
- [ ] Duration-Sensitivity: Schock-Zinsen korrekt angewendet?

**Darlehensrate** (`berechneDarlehensrate`, ~Zeile 11413):
- [ ] `jahresrate = darlehen * (zinssatz + tilgungssatz) / 100`
- [ ] Division durch 12 für Monatsrate korrekt?
- [ ] Edge Case: zinssatz = 0 UND tilgungssatz = 0 → gibt {0,0,0} zurück?

**Immobilien-Wertsteigerung** (~Zeile 11653):
- [ ] `wertMitSteigerung = immowert * Math.pow(1 + wertsteigerung / 100, jahre)`
- [ ] Wertsteigerung als Prozent eingegeben, korrekt zu Dezimal konvertiert?

### 3. Zero-Value / NaN Bugs (KRITISCH)

**Das `||`-Problem:**
```javascript
// ❌ FALSCH: parseFloat("0") || 3000 ergibt 3000!
var val = parseFloat(input.value) || defaultValue;

// ✅ RICHTIG: 0 bleibt 0
var val = isNaN(parseFloat(input.value)) ? defaultValue : parseFloat(input.value);
```

**Prüfpunkte:**
- [ ] `item.amount || 0` in `getMonthlyAmount()` (~Zeile 6838): Maskiert legitime Nullwerte? Besser: `item.amount ?? 0`
- [ ] Input-Recovery (~Zeile 12465): `inputValues.income || 3000` — ersetzt echte 0 mit 3000!
- [ ] Alle `parseFloat(x) || default` Patterns suchen und auf `isNaN`-Pattern umstellen
- [ ] `Math.max(0, ...)` an allen Stellen wo negative Werte unmöglich sein sollten?

**Suche nach Problemstellen:**
```
Grep: parseFloat.*\|\|
Grep: \.value\)?\s*\|\|\s*\d
Grep: amount\s*\|\|
```

### 4. Redundante Berechnungen

Bekannte Redundanzen (Zustand März 2026):

| Berechnung | Wo berechnet | Redundant in | Fix |
|------------|-------------|-------------|-----|
| `depotSparplanTotal` | `calculateFinancialData()` Zeile ~8000 | ~8339, ~11843, `renderDepotBasin()` ~7304 | Aus `calculateFinancialData()` zurückgeben |
| `fixkostenSumme` | `calculateFinancialData()` als `totalAbgang` | `prepareAndPrint()` ~11970 | Gespeicherten Wert nutzen |

**Prüfpunkte:**
- [ ] Wird `depotSparplanTotal` an mehreren Stellen unabhängig berechnet?
- [ ] Stimmen die Berechnungen überein? (verschiedene Filter-Logik = verschiedene Ergebnisse!)
- [ ] Gibt es eine zentrale "Source of Truth" für berechnete Werte?
- [ ] `calculateFinancialData()` Rückgabewert: Enthält er ALLE Werte die andere Funktionen brauchen?

### 5. const/let/var Hygiene

**Regeln:**
- `const` nur für Werte die sich WIRKLICH nicht ändern (Timeouts, Konfiguration, DOM-Referenzen)
- `let` für Werte die reassigned werden
- `var` vermeiden (Function-Scope statt Block-Scope = Bugs)

**Prüfpunkte:**
- [ ] `const` wo der Wert sich ändert? (z.B. in Schleifen, bedingte Zuweisungen)
- [ ] `let` wo `const` reichen würde? (Nicht schlimm, aber unsauber)
- [ ] `var` in neuerem Code? (Nur in Legacy-Bereichen akzeptabel)
- [ ] Globale `let` Deklarationen (~Zeile 6834): `inputs, basins, flowContainer, flowSvg` — werden die vor DOMContentLoaded geschützt?
- [ ] IIFE-Patterns für `fixkostenItems`, `depotItems` — sind die noch nötig?

### 6. Scope & Timing

**Prüfpunkte:**
- [ ] Werden globale Variablen vor Initialisierung gelesen?
- [ ] `inputs` Objekt (~Zeile 6834): Wird es VOR `DOMContentLoaded` referenziert?
- [ ] Event-Listener die auf nicht-existierende Elemente zugreifen?
- [ ] Race Conditions bei `async` Funktionen (z.B. `prepareAndPrint()`)?

### 7. Intervall-Konvertierung

Fixkosten und Depot-Items können monatlich, quartalsweise oder jährlich sein:

```javascript
// getMonthlyAmount()
case 'quarterly': return a / 3;
case 'annually': return a / 12;
default: return a;  // monatlich
```

**Prüfpunkte:**
- [ ] Wird überall `getMonthlyAmount()` genutzt oder gibt es manuelle Konvertierungen?
- [ ] `prepareAndPrint()` (~Zeile 11970): Eigene Konvertierungslogik statt `getMonthlyAmount()`?
- [ ] Stimmt die manuelle Logik mit `getMonthlyAmount()` überein?
- [ ] Neue Intervalle (z.B. "halbjährlich") — wären sie konsistent behandelt?

## Ausgabe-Format

Der Audit produziert einen strukturierten Bericht:

```
## Finance Audit Report

### ✅ Korrekt
- [Liste der geprüften und korrekten Formeln]

### ⚠️ Warnungen
- [Redundanzen, unsauberer Code, potenzielle Probleme]

### ❌ Fehler
- [Echte Bugs, falsche Formeln, Zero-Masking]

### 📋 Empfehlungen
- [Vorgeschlagene Refactorings, bessere Patterns]
```

## Bekannte akzeptierte Abweichungen

- Compound Interest nutzt vereinfachtes monatliches Modell (kein Tagesgenau) — bewusste Design-Entscheidung
- `var` in älterem Code (~vor v1.5) ist akzeptiert, nur in neuem Code vermeiden
- Hardcoded Defaults (3000 Einkommen, 7% Rendite) sind gewollt als sinnvolle Startwerte

---
name: pre-deploy
description: Pre-deployment checklist for MultiAccountMLP. Runs automated checks before deploying to production (montolio.de). Catches common issues like console.logs, missing try/catch, theme problems, and known regressions.
---

# Pre-Deploy Skill — MultiAccountMLP

Automatisierte Checkliste vor jedem Deploy zu montolio.de. Verhindert bekannte Fehlerklassen.

## Wann aufrufen

- **VOR jedem `deploy-curl-sftp.ps1`** — PFLICHT!
- Nach größeren Änderungen an index.html
- Wenn unsicher ob die App stabil ist

## Ablauf

Der Pre-Deploy-Check läuft in dieser Reihenfolge:

### Phase 1: Schnelle Syntaxprüfung

```bash
# HTML nicht kaputt?
grep -c '</html>' index.html  # Muss genau 1 sein

# Keine offenen Template-Literal-Bugs?
# (Unclosed backticks können den gesamten Parser brechen)
```

**Prüfpunkte:**
- [ ] `index.html` hat genau ein `</html>` Tag
- [ ] Keine Syntax-Fehler die den Browser-Parser brechen würden
- [ ] Datei-Größe plausibel (aktuell ~620-640 KB, drastische Änderung = Alarm)

### Phase 2: Bekannte Regressions-Checks

Dinge die in der Vergangenheit kaputt gegangen sind:

**v1.7.6-Regression (Basin-Crash → alle Flows weg):**
- [ ] `renderBasin()` Aufrufe sind in `try/catch` gewrappt
- [ ] `calculateAndUpdate()` hat Error-Handling

```bash
# Check: try/catch um Basin-Rendering
grep -n "renderBasin\|renderDepotBasin\|renderImmoBasin" index.html | head -20
# Jeder Aufruf sollte in einem try-Block sein
```

**PDF-Flow-Bug (v2.0, BEKANNT OFFEN):**
- [ ] Status prüfen: Ist der Bug noch offen oder wurde er gefixt?
- [ ] Wenn offen: User informieren dass PDF-Flows noch nicht korrekt drucken

**Theme-Kontrast:**
- [ ] Keine neuen `color: #033D5D` auf dunklen Hintergründen eingeführt?
- [ ] Keine hardcoded `#2B2B2B` in Elementen die im Dark Mode sichtbar sind?

### Phase 3: Code-Hygiene

**Console.log Cleanup:**
```bash
grep -n "console\.log\|console\.warn\|console\.debug" index.html | grep -v "console\.error" | head -20
```

- [ ] Keine Debug-`console.log()` mehr im Code?
- [ ] `console.error()` ist OK (Fehler-Logging bleibt)
- [ ] `console.warn()` evaluieren: Ist es ein bewusster Hinweis oder Debug-Überbleibsel?

**Auskommentierter Code:**
- [ ] Keine großen auskommentierten Code-Blöcke? (Legacy-Müll)
- [ ] `// TODO` oder `// FIXME` Kommentare: Sind sie noch relevant?

### Phase 4: Funktions-Kritische Checks

**Kaskaden-Integrität:**
- [ ] `calculateFinancialData()` existiert und ist aufrufbar
- [ ] `calculateAndUpdate()` ruft `calculateFinancialData()` auf
- [ ] `positionCascade()` wird aufgerufen
- [ ] `drawFlow()` oder `updateAllFlows()` wird aufgerufen

**SVG-Flow-Engine:**
- [ ] `#flow-svg` Element existiert im HTML
- [ ] `#flow-gradient` LinearGradient existiert in `<defs>`
- [ ] `#flow-mask` Mask existiert in `<defs>`
- [ ] `#flow-visuals` Group existiert
- [ ] Alle 7 Flow-Pfade vorhanden (flow-path-1, flow-path-2, konsum-tagesgeld, tagesgeld-depot, fixkosten-depot, vermieterkonto-einkommen, fixkosten-vermieterkonto)

```bash
# Check: Alle Flow-Elemente vorhanden
grep -c "class=\"flow-path\"" index.html        # Erwartung: 7
grep -c "class=\"flow-erase\"" index.html       # Erwartung: 7
grep -c "class=\"flow-mask-stroke\"" index.html  # Erwartung: 7
```

**Session-System:**
- [ ] `sessionStorage` (NICHT localStorage) für Sitzungsdaten?
- [ ] `getCurrentSession()` Funktion existiert?
- [ ] Erklärer-Tracking: `erklaererBesucht` Objekt korrekt?

**Theme-System:**
- [ ] `applyTheme()` existiert
- [ ] Theme-Tokens in `:root` / `.theme-dark` definiert
- [ ] Flow-Gradient wird in `applyTheme()` aktualisiert

### Phase 5: Deployment-Vorbereitung

**Git-Status:**
```bash
git status
git log --oneline -3
```

- [ ] Alle Änderungen committed?
- [ ] Commit-Message beschreibt die Änderung korrekt?
- [ ] Kein ungewollter Datei-Müll im Staging?

**Credentials:**
- [ ] `.ftp-credentials` existiert und ist nicht im Git?
- [ ] Deploy-Script `deploy-curl-sftp.ps1` vorhanden?

**Versionierung:**
- [ ] Versions-Kommentar in index.html aktualisiert (falls vorhanden)?
- [ ] ROADMAP.md aktualisiert?
- [ ] `dev-tools/design-preview.html` aktualisiert?

### Phase 6: Deploy-Befehl

Wenn alle Checks bestanden:

```powershell
powershell -ExecutionPolicy Bypass -File deploy-curl-sftp.ps1 -Force
```

**Nach dem Deploy:**
- [ ] https://montolio.de aufrufen und prüfen
- [ ] Console auf Fehler checken
- [ ] Theme-Switch testen (Light ↔ Dark)
- [ ] Mindestens einen Basin anklicken
- [ ] PDF-Export testen (bekannter Bug beachten)

## Ausgabe-Format

```
## Pre-Deploy Check Report

### ✅ Bestanden (X/Y)
- [Liste bestandener Checks]

### ⚠️ Warnungen
- [Nicht-kritische Probleme die beachtet werden sollten]

### ❌ Blocker
- [Kritische Probleme die VOR dem Deploy gefixt werden müssen]

### 📋 Empfehlung
- DEPLOY FREIGEGEBEN ✅ / DEPLOY BLOCKIERT ❌
```

## Known Issues (bei Deploy nicht blockieren)

Diese Bugs sind bekannt und akzeptiert — KEIN Deploy-Blocker:

1. **PDF-Flow dunkle Striche** — `.flow-erase` Pfade sichtbar im Print (v2.0 Bug, in Arbeit)

## Deployment-Unfälle (Lessons Learned)

| Datum | Was passiert | Ursache | Lektion |
|-------|-------------|---------|---------|
| v1.7.6 | Production gecrasht | Basin-Rendering ohne try/catch | IMMER Error-Handling! |
| v2.0 Session 4 | PDF-Flows kaputt | SVG-Manipulation im Print-Klon | SVG nicht anfassen im Klon |

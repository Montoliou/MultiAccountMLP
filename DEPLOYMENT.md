# 🚀 Deployment zu Ionos (montolio.de)

Automatisches Deployment via FTP mit PowerShell-Script.

## 📋 Einmaliges Setup

### 1. FTP-Credentials einrichten

```bash
# Beispiel-Datei kopieren
copy .ftp-credentials.example .ftp-credentials

# WICHTIG: Datei .ftp-credentials bearbeiten und dein echtes Passwort eintragen!
# Diese Datei ist in .gitignore und wird NICHT ins Git committed!
```

**Datei `.ftp-credentials` ausfüllen:**
```ini
FTP_HOST=home13500050.1and1-data.host
FTP_USER=p4509868
FTP_PASS=DEIN_ECHTES_PASSWORT_HIER  ← Hier dein Passwort eintragen!
FTP_PORT=21
FTP_TARGET_DIR=/
```

### 2. FTP-Verbindung testen

```powershell
./deploy-ionos.ps1 -Test
```

Sollte ausgeben:
```
✅ FTP-Verbindung erfolgreich!
ℹ️  Server: home13500050.1and1-data.host
ℹ️  User: p4509868
```

## 🎯 Deployment-Workflow

### Standard-Deployment (Empfohlen)

**Nur getaggte Versionen werden deployed!**

```bash
# 1. Änderungen committen
git add .
git commit -m "feat: neue Funktion"

# 2. Version taggen (z.B. v1.3.5)
git tag -a v1.3.5 -m "🚀 LIVE DEPLOYMENT v1.3.5"

# 3. Deployen
./deploy-ionos.ps1
```

**Output:**
```
========================================
   🚀 Ionos Deployment zu montolio.de
========================================

🔹 Git-Status prüfen...
✅ Aktueller Commit ist getagged: v1.3.5
🔹 Dateien prüfen...
✅ 1 Datei(en) bereit für Deployment

⚠️  Bereit zum Deployment!
ℹ️  Server: home13500050.1and1-data.host
ℹ️  Ziel: /
ℹ️  Dateien: index.html
ℹ️  Version: v1.3.5

Fortfahren? (y/n): y

🔹 Upload gestartet...
🔹 Uploading index.html zu ftp://...
✅ Upload erfolgreich: index.html (231 KB)

========================================
✅ Deployment erfolgreich abgeschlossen!

ℹ️  Version: v1.3.5
ℹ️  Dateien: 1
ℹ️  🌐 https://montolio.de

========================================
```

## 🛠️ Weitere Optionen

### Dry-Run (Zeigt nur, was passieren würde)

```powershell
./deploy-ionos.ps1 -DryRun
```

Zeigt alle Dateien und Einstellungen, macht aber **keinen echten Upload**.

### Force-Deployment (ohne Tag)

```powershell
./deploy-ionos.ps1 -Force
```

⚠️ **Nicht empfohlen für Production!** Deployed auch ohne Git-Tag.

### Test-Deployment (FTP-Verbindung testen)

```powershell
./deploy-ionos.ps1 -Test
```

Testet nur die FTP-Verbindung, macht keinen Upload.

## 📁 Welche Dateien werden deployed?

Aktuell nur:
- `index.html`

**Weitere Dateien hinzufügen:**

Bearbeite `deploy-ionos.ps1`, Zeile 20:
```powershell
$FILES_TO_DEPLOY = @(
    "index.html",
    "style.css",      # ← Weitere Dateien hier hinzufügen
    "script.js"
)
```

## 📊 Deployment-Log

Alle Deployments werden geloggt in: `deployment-log.txt`

```
2025-10-28 15:30:45 | SUCCESS | v1.3.4
2025-10-28 16:15:22 | SUCCESS | v1.3.5
```

## 🔒 Sicherheit

✅ **Passwort NIEMALS ins Git committen!**
- `.ftp-credentials` ist in `.gitignore`
- Nur `.ftp-credentials.example` ist im Repo (ohne Passwort)

✅ **Nur getaggte Versionen deployen**
- Script prüft automatisch ob Commit getagged ist
- Verhindert versehentliche Test-Deployments

✅ **Bestätigung vor Upload**
- Script zeigt alle Details an
- Wartet auf deine Bestätigung (außer mit `-Force`)

## 🐛 Troubleshooting

### "Credentials-Datei nicht gefunden"
```
❌ Credentials-Datei nicht gefunden: .ftp-credentials
```
→ Erstelle `.ftp-credentials` basierend auf `.ftp-credentials.example`

### "FTP-Verbindung fehlgeschlagen"
```
❌ FTP-Verbindung fehlgeschlagen!
```
→ Prüfe:
- Passwort korrekt in `.ftp-credentials`?
- Server erreichbar?
- Internet-Verbindung OK?

### "Aktueller Commit hat keinen Tag"
```
❌ Aktueller Commit hat keinen Tag!
```
→ Erstelle einen Tag:
```bash
git tag -a v1.3.5 -m "Release v1.3.5"
```

### "Es gibt uncommitted changes"
```
⚠️  Es gibt uncommitted changes!
```
→ Committe zuerst alle Änderungen:
```bash
git add .
git commit -m "deine Nachricht"
```

## 🎓 Tipps

### Deployment nach erfolgreichem Test

```bash
# 1. Änderungen testen (lokal)
start index.html

# 2. Alles OK? → Committen & Taggen
git add .
git commit -m "fix: Bug behoben"
git tag -a v1.3.5 -m "🚀 LIVE v1.3.5"

# 3. Erst Dry-Run
./deploy-ionos.ps1 -DryRun

# 4. Dann echtes Deployment
./deploy-ionos.ps1
```

### Server-Verzeichnis aufräumen

Dein Server sieht etwas unaufgeräumt aus (viele alte Ordner).

**Empfehlung:**
1. Lege einen neuen Ordner `/mlp-app/` an
2. Ändere in `.ftp-credentials`: `FTP_TARGET_DIR=/mlp-app/`
3. Deployment geht nur in diesen Ordner
4. Alte Ordner können bestehen bleiben (oder aufräumen)

## 📞 Support

Bei Problemen:
1. Prüfe `deployment-log.txt`
2. Teste FTP-Verbindung: `./deploy-ionos.ps1 -Test`
3. Dry-Run zum Debuggen: `./deploy-ionos.ps1 -DryRun`

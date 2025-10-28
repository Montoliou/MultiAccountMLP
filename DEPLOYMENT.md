# 🚀 Deployment zu Ionos (montolio.de)

Automatisches Deployment via SFTP (curl-basiert) mit PowerShell-Script.

## 📋 Einmaliges Setup

### 1. SFTP-Credentials einrichten

```bash
# Beispiel-Datei kopieren
copy .ftp-credentials.example .ftp-credentials

# WICHTIG: Datei .ftp-credentials bearbeiten und dein echtes Passwort eintragen!
# Diese Datei ist in .gitignore und wird NICHT ins Git committed!
```

**Datei `.ftp-credentials` ausfüllen:**
```ini
FTP_HOST=home13500050.1and1-data.host
FTP_USER=p450986
FTP_PASS=DEIN_ECHTES_PASSWORT_HIER  ← Hier dein Passwort eintragen!
FTP_PORT=22
FTP_TARGET_DIR=/MLP_MultiAccount_App/
```

### 2. SFTP-Verbindung testen

```powershell
./deploy-curl-sftp.ps1 -Test -Force
```

Sollte ausgeben:
```
✅ SFTP-Verbindung erfolgreich!
ℹ️  Server: home13500050.1and1-data.host
ℹ️  User: p450986
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
./deploy-curl-sftp.ps1
```

**Output:**
```
========================================
   Ionos SFTP Deployment (CURL)
========================================

[OK] Credentials geladen
[OK] Version: v1.3.5
[STEP] Dateien pruefen...
[OK] 1 Datei(en) bereit

[INFO] Server: home13500050.1and1-data.host
[INFO] User: p450986
[INFO] Port: 22 (SFTP)
[INFO] Ziel: /MLP_MultiAccount_App/

Fortfahren? (y/n): y

[STEP] SFTP Upload gestartet...
[STEP] Uploading index.html...
[OK] Upload erfolgreich: index.html (229.56 KB)

========================================
[OK] Deployment erfolgreich!
[INFO] Version: v1.3.5
[INFO] URL: https://montolio.de
========================================
```

## 🛠️ Weitere Optionen

### Test-Modus (Zeigt Dateien auf Server)

```powershell
./deploy-curl-sftp.ps1 -Test -Force
```

Zeigt alle Dateien im Zielverzeichnis, macht aber **keinen Upload**.

### Force-Deployment (ohne Tag + ohne Bestätigung)

```powershell
./deploy-curl-sftp.ps1 -Force
```

⚠️ **Vorsicht!** Deployed auch ohne Git-Tag und ohne Bestätigung.

## 📁 Welche Dateien werden deployed?

Aktuell nur:
- `index.html`

**Weitere Dateien hinzufügen:**

Bearbeite `deploy-curl-sftp.ps1`, Zeile 14:
```powershell
$FILES = @(
    "index.html",
    "style.css",      # ← Weitere Dateien hier hinzufügen
    "script.js"
)
```

## 📊 Deployment-Log

Alle Deployments werden geloggt in: `deployment-log.txt`

```
2025-10-28 12:40:42 | SUCCESS | v1.3.4
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
[ERR] Datei .ftp-credentials nicht gefunden!
```
→ Erstelle `.ftp-credentials` basierend auf `.ftp-credentials.example`

### "SFTP-Verbindung fehlgeschlagen"
```
[ERR] SFTP Verbindung fehlgeschlagen!
curl: (67) Authentication failure
```
→ Prüfe:
- **Username** korrekt? Muss `p450986` sein (nicht `p4509868`)
- Passwort korrekt in `.ftp-credentials`?
- Server erreichbar?
- Internet-Verbindung OK?

### "Aktueller Commit hat keinen Tag"
```
[WARN] Aktueller Commit hat keinen Tag!
[ERR] Erstelle einen Tag oder nutze -Force
```
→ Erstelle einen Tag:
```bash
git tag -a v1.3.5 -m "Release v1.3.5"
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

# 3. Erst Test-Modus
./deploy-curl-sftp.ps1 -Test -Force

# 4. Dann echtes Deployment
./deploy-curl-sftp.ps1
```

### Wichtige Hinweise

- **SFTP, nicht FTP!** Der Server nutzt Port 22 (SFTP/SSH), nicht Port 21 (FTP)
- **Username:** Achte auf korrekten Username `p450986` (7 Zeichen, nicht 8!)
- **curl mit SFTP:** Das Script nutzt curl mit SFTP-Support (in Windows 10/11 enthalten)

## 📞 Support

Bei Problemen:
1. Prüfe `deployment-log.txt`
2. Teste SFTP-Verbindung: `./deploy-curl-sftp.ps1 -Test -Force`
3. Verbose-Modus: Öffne Script und füge `--verbose` zu curl-Befehlen hinzu

# ========================================
# Ionos FTP Deployment Script
# ========================================
# Automatisches Deployment zu montolio.de
# Nur getaggte Git-Versionen werden deployed!
# ========================================

param(
    [switch]$Force,      # Deploy ohne Tag-Prüfung
    [switch]$DryRun,     # Nur zeigen, was passieren würde
    [switch]$Test        # Test-Modus (FTP-Verbindung testen)
)

$ErrorActionPreference = "Stop"

# ========================================
# KONFIGURATION
# ========================================

$FILES_TO_DEPLOY = @(
    "index.html"
    # Füge hier weitere Dateien hinzu, falls nötig
    # "style.css",
    # "script.js"
)

$CREDENTIALS_FILE = ".ftp-credentials"
$LOG_FILE = "deployment-log.txt"

# ========================================
# FARBEN FÜR OUTPUT
# ========================================

function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Info { param($msg) Write-Host "ℹ️  $msg" -ForegroundColor Cyan }
function Write-Step { param($msg) Write-Host "🔹 $msg" -ForegroundColor Blue }

# ========================================
# CREDENTIALS LADEN
# ========================================

function Load-FtpCredentials {
    if (-not (Test-Path $CREDENTIALS_FILE)) {
        Write-Error "Credentials-Datei nicht gefunden: $CREDENTIALS_FILE"
        Write-Info "Bitte erstelle die Datei '.ftp-credentials' basierend auf '.ftp-credentials.example'"
        Write-Info "Füge dein FTP-Passwort in die Datei ein (wird nicht ins Git committed!)"
        exit 1
    }

    $creds = @{}
    Get-Content $CREDENTIALS_FILE | ForEach-Object {
        if ($_ -match '^([^=]+)=(.+)$') {
            $creds[$matches[1].Trim()] = $matches[2].Trim()
        }
    }

    # Validierung
    $required = @("FTP_HOST", "FTP_USER", "FTP_PASS", "FTP_TARGET_DIR")
    foreach ($key in $required) {
        if (-not $creds.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($creds[$key])) {
            Write-Error "Fehlende Konfiguration in $CREDENTIALS_FILE : $key"
            exit 1
        }
    }

    # Passwort-Check
    if ($creds["FTP_PASS"] -eq "DEIN_PASSWORT_HIER") {
        Write-Error "Bitte trage dein echtes FTP-Passwort in $CREDENTIALS_FILE ein!"
        exit 1
    }

    return $creds
}

# ========================================
# GIT STATUS PRÜFEN
# ========================================

function Check-GitStatus {
    Write-Step "Git-Status prüfen..."

    # Uncommitted changes?
    $status = git status --porcelain
    if ($status) {
        Write-Warning "Es gibt uncommitted changes!"
        Write-Host $status
        if (-not $Force) {
            Write-Error "Bitte committe zuerst alle Änderungen oder nutze -Force"
            exit 1
        }
    }

    # Aktueller Commit getagged?
    $currentCommit = git rev-parse HEAD
    $tag = git tag --points-at HEAD

    if (-not $tag) {
        Write-Warning "Aktueller Commit ($($currentCommit.Substring(0,7))) hat keinen Tag!"
        if (-not $Force) {
            Write-Error "Nur getaggte Versionen sollten deployed werden!"
            Write-Info "Erstelle einen Tag: git tag -a v1.3.5 -m 'Release v1.3.5'"
            Write-Info "Oder nutze -Force zum Deployen ohne Tag"
            exit 1
        }
        return $null
    }

    Write-Success "Aktueller Commit ist getagged: $tag"
    return $tag
}

# ========================================
# FTP UPLOAD (Native PowerShell)
# ========================================

function Upload-File {
    param(
        [string]$LocalFile,
        [string]$FtpHost,
        [string]$FtpUser,
        [string]$FtpPass,
        [string]$FtpTargetDir,
        [int]$FtpPort = 21
    )

    $fileName = Split-Path $LocalFile -Leaf
    $ftpUri = "ftp://$FtpHost`:$FtpPort$FtpTargetDir$fileName"

    Write-Step "Uploading $fileName zu $ftpUri"

    try {
        # Datei lesen
        $fileContent = [System.IO.File]::ReadAllBytes($LocalFile)

        # FTP Request erstellen
        $request = [System.Net.FtpWebRequest]::Create($ftpUri)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $request.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)
        $request.UseBinary = $true
        $request.UsePassive = $true
        $request.KeepAlive = $false

        # Upload
        $requestStream = $request.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()

        # Response
        $response = $request.GetResponse()
        Write-Success "Upload erfolgreich: $fileName ($([Math]::Round($fileContent.Length / 1024, 2)) KB)"
        $response.Close()

        return $true
    }
    catch {
        Write-Error "Upload fehlgeschlagen: $fileName"
        Write-Host $_.Exception.Message -ForegroundColor Red
        return $false
    }
}

# ========================================
# FTP VERBINDUNG TESTEN
# ========================================

function Test-FtpConnection {
    param($creds)

    Write-Step "FTP-Verbindung testen..."

    try {
        $ftpUri = "ftp://$($creds.FTP_HOST):$($creds.FTP_PORT)/"
        $request = [System.Net.FtpWebRequest]::Create($ftpUri)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
        $request.Credentials = New-Object System.Net.NetworkCredential($creds.FTP_USER, $creds.FTP_PASS)
        $request.Timeout = 10000

        $response = $request.GetResponse()
        Write-Success "FTP-Verbindung erfolgreich!"
        Write-Info "Server: $($creds.FTP_HOST)"
        Write-Info "User: $($creds.FTP_USER)"
        $response.Close()
        return $true
    }
    catch {
        Write-Error "FTP-Verbindung fehlgeschlagen!"
        Write-Host $_.Exception.Message -ForegroundColor Red
        return $false
    }
}

# ========================================
# DEPLOYMENT LOG
# ========================================

function Write-DeploymentLog {
    param($tag, $success)

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $status = if ($success) { "SUCCESS" } else { "FAILED" }
    $logEntry = "$timestamp | $status | $tag"

    Add-Content -Path $LOG_FILE -Value $logEntry
}

# ========================================
# MAIN DEPLOYMENT
# ========================================

function Start-Deployment {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host "   🚀 Ionos Deployment zu montolio.de" -ForegroundColor Magenta
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host ""

    # 1. Credentials laden
    $creds = Load-FtpCredentials

    # 2. Test-Modus?
    if ($Test) {
        Test-FtpConnection -creds $creds
        exit 0
    }

    # 3. Git-Status prüfen
    $tag = Check-GitStatus

    # 4. Dateien prüfen
    Write-Step "Dateien prüfen..."
    $missingFiles = @()
    foreach ($file in $FILES_TO_DEPLOY) {
        if (-not (Test-Path $file)) {
            $missingFiles += $file
        }
    }

    if ($missingFiles.Count -gt 0) {
        Write-Error "Folgende Dateien fehlen:"
        $missingFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
        exit 1
    }

    Write-Success "$($FILES_TO_DEPLOY.Count) Datei(en) bereit für Deployment"

    # 5. Dry-Run?
    if ($DryRun) {
        Write-Warning "DRY-RUN Modus - Keine echten Uploads!"
        Write-Info "Würde folgende Dateien hochladen:"
        $FILES_TO_DEPLOY | ForEach-Object { Write-Host "  ✓ $_" -ForegroundColor Cyan }
        Write-Info "FTP-Ziel: $($creds.FTP_HOST)$($creds.FTP_TARGET_DIR)"
        Write-Info "Version: $tag"
        exit 0
    }

    # 6. Bestätigung
    Write-Host ""
    Write-Warning "Bereit zum Deployment!"
    Write-Info "Server: $($creds.FTP_HOST)"
    Write-Info "Ziel: $($creds.FTP_TARGET_DIR)"
    Write-Info "Dateien: $($FILES_TO_DEPLOY -join ', ')"
    Write-Info "Version: $tag"
    Write-Host ""

    if (-not $Force) {
        $confirm = Read-Host "Fortfahren? (y/n)"
        if ($confirm -ne 'y') {
            Write-Warning "Deployment abgebrochen"
            exit 0
        }
    }

    # 7. FTP Upload
    Write-Host ""
    Write-Step "Upload gestartet..."
    Write-Host ""

    $uploadSuccess = $true
    foreach ($file in $FILES_TO_DEPLOY) {
        $success = Upload-File `
            -LocalFile $file `
            -FtpHost $creds.FTP_HOST `
            -FtpUser $creds.FTP_USER `
            -FtpPass $creds.FTP_PASS `
            -FtpTargetDir $creds.FTP_TARGET_DIR `
            -FtpPort ([int]$creds.FTP_PORT)

        if (-not $success) {
            $uploadSuccess = $false
        }
    }

    # 8. Log schreiben
    Write-DeploymentLog -tag $tag -success $uploadSuccess

    # 9. Ergebnis
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Magenta

    if ($uploadSuccess) {
        Write-Success "Deployment erfolgreich abgeschlossen!"
        Write-Host ""
        Write-Info "Version: $tag"
        Write-Info "Dateien: $($FILES_TO_DEPLOY.Count)"
        Write-Info "🌐 https://montolio.de"
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Magenta
    }
    else {
        Write-Error "Deployment fehlgeschlagen!"
        Write-Warning "Bitte überprüfe die Logs und versuche es erneut"
        Write-Host "========================================" -ForegroundColor Magenta
        exit 1
    }
}

# ========================================
# SCRIPT STARTEN
# ========================================

Start-Deployment

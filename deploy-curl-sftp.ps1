# ========================================
# Ionos SFTP Deployment mit CURL
# ========================================
# Nutzt curl (mit SFTP Support) fuer Upload
# ========================================

param(
    [switch]$Force,
    [switch]$Test
)

$FILES = @("index.html")
$CRED_FILE = ".ftp-credentials"
$LOG_FILE = "deployment-log.txt"

# ========================================
# FARBEN
# ========================================

function OK { param($m) Write-Host "[OK] $m" -ForegroundColor Green }
function ERR { param($m) Write-Host "[ERR] $m" -ForegroundColor Red }
function WARN { param($m) Write-Host "[WARN] $m" -ForegroundColor Yellow }
function INFO { param($m) Write-Host "[INFO] $m" -ForegroundColor Cyan }
function STEP { param($m) Write-Host "[STEP] $m" -ForegroundColor Blue }

# ========================================
# BANNER
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "   Ionos SFTP Deployment (CURL)" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# ========================================
# CREDENTIALS
# ========================================

if (-not (Test-Path $CRED_FILE)) {
    ERR "Datei $CRED_FILE nicht gefunden!"
    exit 1
}

$creds = @{}
Get-Content $CRED_FILE | ForEach-Object {
    if ($_ -match '^([^=#]+)=(.+)$') {
        $creds[$matches[1].Trim()] = $matches[2].Trim()
    }
}

if (-not $creds.FTP_PASS -or $creds.FTP_PASS -eq "DEIN_PASSWORT_HIER") {
    ERR "Bitte trage dein echtes Passwort in $CRED_FILE ein!"
    exit 1
}

OK "Credentials geladen"

# ========================================
# GIT CHECK
# ========================================

if (-not $Force) {
    $tag = git tag --points-at HEAD 2>$null
    if (-not $tag) {
        WARN "Aktueller Commit hat keinen Tag!"
        ERR "Erstelle einen Tag oder nutze -Force"
        exit 1
    }
    OK "Version: $tag"
} else {
    $tag = "untagged"
}

# ========================================
# DATEIEN
# ========================================

STEP "Dateien pruefen..."
foreach ($file in $FILES) {
    if (-not (Test-Path $file)) {
        ERR "Datei fehlt: $file"
        exit 1
    }
}
OK "$($FILES.Count) Datei(en) bereit"

# ========================================
# TEST MODUS
# ========================================

Write-Host ""
INFO "Server: $($creds.FTP_HOST)"
INFO "User: $($creds.FTP_USER)"
INFO "Port: 22 (SFTP)"
INFO "Ziel: $($creds.FTP_TARGET_DIR)"
Write-Host ""

if ($Test) {
    STEP "Test-Modus: Liste Dateien auf Server..."
    Write-Host ""

    $sftpUrl = "sftp://$($creds.FTP_HOST)$($creds.FTP_TARGET_DIR)"

    $output = & curl.exe `
        --user "$($creds.FTP_USER):$($creds.FTP_PASS)" `
        --insecure `
        $sftpUrl `
        2>&1

    if ($LASTEXITCODE -eq 0) {
        OK "SFTP Verbindung erfolgreich!"
        Write-Host ""
        Write-Host "Dateien auf Server:" -ForegroundColor Cyan
        Write-Host $output
        Write-Host ""
        OK "Test abgeschlossen!"
    } else {
        ERR "SFTP Verbindung fehlgeschlagen!"
        Write-Host $output -ForegroundColor Red
        exit 1
    }
    exit 0
}

# ========================================
# BESTAETIGUNG
# ========================================

if (-not $Force) {
    $confirm = Read-Host "Fortfahren? (y/n)"
    if ($confirm -ne 'y') {
        WARN "Abgebrochen"
        exit 0
    }
}

# ========================================
# UPLOAD
# ========================================

Write-Host ""
STEP "SFTP Upload gestartet..."
Write-Host ""

$uploadSuccess = $true

foreach ($file in $FILES) {
    $localPath = (Resolve-Path $file).Path
    $fileName = [System.IO.Path]::GetFileName($file)
    $remotePath = $creds.FTP_TARGET_DIR + $fileName
    $sftpUrl = "sftp://$($creds.FTP_HOST)$remotePath"

    STEP "Uploading $fileName..."

    $output = & curl.exe `
        --upload-file $localPath `
        --user "$($creds.FTP_USER):$($creds.FTP_PASS)" `
        --insecure `
        $sftpUrl `
        2>&1

    if ($LASTEXITCODE -eq 0) {
        $fileSize = [Math]::Round((Get-Item $file).Length / 1KB, 2)
        OK "Upload erfolgreich: $fileName ($fileSize KB)"
    } else {
        ERR "Upload fehlgeschlagen: $fileName"
        Write-Host $output -ForegroundColor Red
        $uploadSuccess = $false
    }
}

# ========================================
# LOG
# ========================================

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$status = if ($uploadSuccess) { "SUCCESS" } else { "FAILED" }
Add-Content -Path $LOG_FILE -Value "$timestamp | $status | $tag"

# ========================================
# ERGEBNIS
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
if ($uploadSuccess) {
    OK "Deployment erfolgreich!"
    INFO "Version: $tag"
    INFO "URL: https://montolio.de"
} else {
    ERR "Deployment fehlgeschlagen!"
}
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

exit $(if ($uploadSuccess) { 0 } else { 1 })

# One-Click GitHub Deployment Script (Raibos Simulator)

$projPath = "c:\Users\dogye\.gemini\antigravity\scratch\raibos-simulator"
Set-Location $projPath

Write-Host "--- RAIBOS ONE-CLICK DEPLOY ---" -ForegroundColor Cyan

# 1. Check Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git not found!" -ForegroundColor Red
    Pause; exit
}

# 2. Check Repo
if (!(Test-Path ".git")) {
    Write-Host "Initializing new repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    $url = Read-Host "Enter GitHub Repository URL"
    git remote add origin $url
}

# 3. Add & Commit
Write-Host "Capturing changes..." -ForegroundColor Blue
git add .
$msg = "Auto-update: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
git commit -m "$msg"

# 4. Push
Write-Host "Uploading to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "`nDEPLOYMENT TRIGGERED!" -ForegroundColor Green
Write-Host "Wait 1-2 minutes for Render.com to refresh." -ForegroundColor White
Start-Sleep -Seconds 3

# GitHub Online Deployment Script (Raibos Simulator) - Improved Version

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host "Please download it from: https://git-scm.com/" -ForegroundColor Yellow
    Write-Host "==========================================" -ForegroundColor Red
    Pause
    exit
}

# Identity Check
$userName = git config user.name
$userEmail = git config user.email

if ([string]::IsNullOrWhiteSpace($userName)) {
    Write-Host "Git identity is not set." -ForegroundColor Yellow
    $userName = Read-Host "Please enter your Name (for Git commit)"
    git config --global user.name "$userName"
}

if ([string]::IsNullOrWhiteSpace($userEmail)) {
    $userEmail = Read-Host "Please enter your Email (for Git commit)"
    git config --global user.email "$userEmail"
}

$repoUrl = Read-Host "Enter your GitHub Repository URL (e.g., https://github.com/user/repo.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "URL cannot be empty. Exiting." -ForegroundColor Red
    Pause
    exit
}

Write-Host "Initializing local repository..." -ForegroundColor Cyan
# Clean existing git if any to start fresh
if (Test-Path ".git") { Remove-Item -Recurse -Force ".git" }

git init
git branch -M main

Write-Host "Adding files and committing..." -ForegroundColor Cyan
git add .
git commit -m "Initial Deployment for Raibos Simulator"

Write-Host "Linking to GitHub..." -ForegroundColor Cyan
git remote add origin $repoUrl

Write-Host "Pushing to GitHub (A login window may appear)..." -ForegroundColor Green
git push -f -u origin main

Write-Host "`nDone! Your code is now on GitHub." -ForegroundColor Green
Write-Host "Next Step: Go to Render.com and connect this repository." -ForegroundColor Yellow
Pause

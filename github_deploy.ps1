# GitHub Online Deployment Script (Raibos Simulator) - Auto Update Version

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host "Please download it from: https://git-scm.com/" -ForegroundColor Yellow
    Write-Host "==========================================" -ForegroundColor Red
    Start-Sleep -Seconds 5
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

if (!(Test-Path ".git")) {
    $repoUrl = Read-Host "Enter your GitHub Repository URL (e.g., https://github.com/user/repo.git)"
    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host "URL cannot be empty. Exiting." -ForegroundColor Red
        Start-Sleep -Seconds 5
        exit
    }
    Write-Host "Initializing local repository..." -ForegroundColor Cyan
    git init
    git branch -M main
    git remote add origin $repoUrl
}

Write-Host "Adding files and committing..." -ForegroundColor Cyan
git add .
$commitMessage = "Auto deploy update: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
$commitOutput = git commit -m $commitMessage 2>&1

if ($commitOutput -match "nothing to commit") {
    Write-Host "No new changes to commit." -ForegroundColor Yellow
} else {
    Write-Host $commitOutput -ForegroundColor Gray
}

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "`nDone! Your code is now updated on GitHub." -ForegroundColor Green
Start-Sleep -Seconds 3

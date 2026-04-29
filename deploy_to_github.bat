@echo off
title Raibos Simulator - Auto GitHub Push
color 0a
echo ==========================================
echo    RAIBOS SIMULATOR - AUTO DEPLOY
echo ==========================================
echo.
echo [1/2] Preparing scripts...
powershell -ExecutionPolicy Bypass -File github_deploy.ps1
echo.
echo [2/2] Done!
echo If your GitHub is linked to Render, the site will update automatically.
echo ------------------------------------------
pause

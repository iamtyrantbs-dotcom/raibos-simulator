@echo off
title Raibos Simulator Standalone
color 0b
echo ==========================================
echo    RAIBOS SIMULATOR - STANDALONE MODE
echo ==========================================
echo.
echo [1/2] Checking dependencies...

if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo.
echo [2/2] Starting server and serving game...
echo.
echo ------------------------------------------
echo Open your browser at: http://localhost:3000
echo ------------------------------------------
node server.js
pause

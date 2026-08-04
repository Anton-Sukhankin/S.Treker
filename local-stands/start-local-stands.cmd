@echo off
setlocal
cd /d "%~dp0"
start "S-Tracker local stands" /min cmd /c "npm.cmd run dev"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4175/"
endlocal

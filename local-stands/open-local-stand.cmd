@echo off
setlocal

set "standRoute=%~1"
set "standRoot=%~dp0"
set "standBaseUrl=http://127.0.0.1:4175"

cd /d "%standRoot%"

powershell.exe -NoProfile -Command "try { $response = Invoke-WebRequest -UseBasicParsing -Uri '%standBaseUrl%/' -TimeoutSec 1; if ($response.Content -match 'local-stands-hub') { exit 0 }; exit 1 } catch { exit 1 }"
if not errorlevel 1 goto open

start "S-Tracker local stands" /min cmd /c "npm.cmd run dev"

for /L %%I in (1,1,15) do (
  timeout /t 1 /nobreak >nul
  powershell.exe -NoProfile -Command "try { $response = Invoke-WebRequest -UseBasicParsing -Uri '%standBaseUrl%/' -TimeoutSec 1; if ($response.Content -match 'local-stands-hub') { exit 0 }; exit 1 } catch { exit 1 }"
  if not errorlevel 1 goto open
)

echo S-Tracker local stand did not start on %standBaseUrl%.
echo Check that Node.js is available and port 4175 is free.
pause
exit /b 1

:open
start "" "%standBaseUrl%/%standRoute%"
endlocal

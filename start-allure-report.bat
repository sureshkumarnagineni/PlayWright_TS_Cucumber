@echo off
echo.
echo ================================
echo Launching Allure Reports
echo ================================
echo.
echo 📊 Starting Allure server on http://localhost:4040
echo 🔄 Press Ctrl+C to stop
echo.

cd /d d:\PW_TS_Project

REM Kill any existing Java processes
taskkill /F /IM java.exe 2>nul

REM Wait a moment
timeout /t 1 /nobreak

REM Start Allure server
cmd /c "npx allure serve Reports\allure-report\output --port 4040"

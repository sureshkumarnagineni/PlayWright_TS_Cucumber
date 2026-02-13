@echo off
setlocal enabledelayedexpansion

echo ================================
echo Test_PW_TS - Automation Reports
echo ================================
echo.

echo 0/2 Cleaning old test results...
if exist "Reports\cucumber-html\cucumber-report.html" (
    del "Reports\cucumber-html\cucumber-report.html" >nul 2>&1
)
echo [OK] Cleaned old test data
echo.

echo 1/2 Running tests...
cmd /c npx cucumber-js
if errorlevel 1 (
    echo.
    echo Warning: Some tests failed, but continuing to generate reports...
    echo.
)

echo.
echo 2/2 Opening Cucumber report in browser...
echo Project: Test_PW_TS
echo.
echo Cucumber HTML Report:  http://localhost:3000
echo.
start http://localhost:3000
timeout /t 2 /nobreak >nul
echo Starting Cucumber report server...
cmd /c start node serve-report.js

endlocal

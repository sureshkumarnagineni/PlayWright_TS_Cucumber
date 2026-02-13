@echo off
setlocal enabledelayedexpansion

echo ================================
echo Test_PW_TS - Automation Report
echo ================================
echo.

echo 1/3 Running tests...
cmd /c npx cucumber-js
if errorlevel 1 (
    echo.
    echo Warning: Some tests failed, but continuing to generate report...
    echo.
)

echo.
echo 2/3 Generating Allure report (IST, dd/MM/yyyy format)...
cmd /c node generate-report.js

echo.
echo 3/3 Opening report in browser...
echo Project: Test_PW_TS
echo Report available at: http://localhost:8765
echo Timezone: IST (Asia/Kolkata)
echo Date Format: dd/MM/yyyy
echo.
if exist "Reports\allure-report" start http://localhost:8765
cmd /c node serve-allure.js

endlocal

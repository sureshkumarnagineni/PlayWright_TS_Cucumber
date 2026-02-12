@echo off
REM Script to generate Allure report from Cucumber JSON

echo.
echo 🔄 Generating Allure report from Cucumber JSON...
echo.

REM Check if cucumber.json exists
if not exist "Reports\allure-report\cucumber.json" (
    echo ❌ Error: cucumber.json not found at Reports\allure-report\cucumber.json
    echo Make sure to run: npm run test:html
    exit /b 1
)

REM Generate Allure HTML report
echo 📊 Creating Allure HTML report...
call npx allure generate Reports\allure-report\cucumber.json --clean -o Reports\allure-report\output

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ Allure report generated successfully!
    echo 📁 Location: Reports\allure-report\output\index.html
    echo.
    echo To view report, run: npm run allure:serve
    echo.
) else (
    echo.
    echo ❌ Failed to generate Allure report
    exit /b 1
)

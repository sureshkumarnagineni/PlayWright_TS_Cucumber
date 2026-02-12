@echo off
REM Batch script to setup and run tests on Windows

setlocal enabledelayedexpansion

color 0B
title Playwright Cucumber Allure - Test Runner

cls
echo.
echo ================================
echo Playwright + Cucumber + Allure
echo ================================
echo.

REM Check if Node.js is installed
echo 11 Checking prerequisites...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo xx Node.js is not installed!
    echo Download from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js is installed: %NODE_VERSION%

REM Install dependencies if needed
if not exist "node_modules\" (
    echo.
    echo 11 Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo xx Failed to install dependencies
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
) else (
    echo [OK] Dependencies already installed
)

REM Menu
echo.
echo ================================
echo What would you like to do?
echo ================================
echo 1. Run tests only
echo 2. Run tests + generate reports
echo 3. Run tests + view Allure live
echo 4. View existing Allure report
echo 5. Clean all reports
echo 6. Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    cls
    echo.
    echo 11 Running tests...
    echo.
    call npm test
    goto :end
)

if "%choice%"=="2" (
    cls
    echo.
    echo 11 Running tests and generating reports...
    echo.
    call npm run test:report
    echo.
    echo [OK] Reports generated:
    echo   - HTML: Reports\cucumber-html\cucumber-report.html
    echo   - Allure: Reports\allure-report\output\index.html
    echo.
    goto :end
)

if "%choice%"=="3" (
    cls
    echo.
    echo 11 Running tests, generating reports, and starting Allure server...
    echo.
    call npm run test:allure
    goto :end
)

if "%choice%"=="4" (
    cls
    echo.
    echo 11 Launching Allure report server...
    echo.
    call npm run allure:serve
    goto :end
)

if "%choice%"=="5" (
    cls
    echo.
    echo 11 Cleaning all reports...
    echo.
    call npm run clean:reports
    echo [OK] Reports cleaned
    echo.
    goto :end
)

if "%choice%"=="6" (
    cls
    echo.
    echo Goodbye!
    echo.
    exit /b 0
)

echo.
echo xx Invalid choice
echo.
pause
exit /b 1

:end
echo.
echo [OK] Done!
echo.
pause

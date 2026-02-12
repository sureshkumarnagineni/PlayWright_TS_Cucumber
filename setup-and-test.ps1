# PowerShell script to setup and run tests
# Usage: .\setup-and-test.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Playwright + Cucumber + Allure" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Verify Allure is available
Write-Host ""
Write-Host "🔍 Verifying Allure command..." -ForegroundColor Yellow
try {
    $allureVersion = npx allure --version
    Write-Host "✅ Allure is available: $allureVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Allure might not be properly installed" -ForegroundColor Yellow
    Write-Host "Attempting to install globally..." -ForegroundColor Yellow
    npm install -g allure-commandline
}

# Menu
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "1. Run tests only" -ForegroundColor White
Write-Host "2. Run tests + generate reports" -ForegroundColor White
Write-Host "3. Run tests + view Allure live" -ForegroundColor White
Write-Host "4. View existing Allure report" -ForegroundColor White
Write-Host "5. Clean all reports" -ForegroundColor White
Write-Host "6. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-6)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🧪 Running tests..." -ForegroundColor Yellow
        npm test
    }
    "2" {
        Write-Host ""
        Write-Host "🧪 Running tests and generating reports..." -ForegroundColor Yellow
        npm run test:report
        Write-Host ""
        Write-Host "📁 Reports generated:" -ForegroundColor Green
        Write-Host "  - HTML: Reports\cucumber-html\cucumber-report.html" -ForegroundColor White
        Write-Host "  - Allure: Reports\allure-report\output\index.html" -ForegroundColor White
    }
    "3" {
        Write-Host ""
        Write-Host "🧪 Running tests, generating reports, and starting Allure server..." -ForegroundColor Yellow
        npm run test:allure
    }
    "4" {
        Write-Host ""
        Write-Host "📊 Launching Allure report server..." -ForegroundColor Yellow
        npm run allure:serve
    }
    "5" {
        Write-Host ""
        Write-Host "🗑️  Cleaning all reports..." -ForegroundColor Yellow
        npm run clean:reports
        Write-Host "✅ Reports cleaned" -ForegroundColor Green
    }
    "6" {
        Write-Host "👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green
Write-Host ""
